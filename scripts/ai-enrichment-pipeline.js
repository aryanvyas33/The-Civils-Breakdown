require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { generateContent } = require('./gemini-client');

// Vertex AI / OpenAPI 3.0 compliant response schema
const extractionSchema = {
  type: 'object',
  properties: {
    question_id: { type: 'string' },
    taxonomy_mapping: {
      type: 'object',
      properties: {
        primary_anchor: { type: 'string' },
        secondary_anchors: { type: 'array', items: { type: 'string' } },
        micro_themes: { type: 'array', items: { type: 'string' } }
      },
      required: ['primary_anchor', 'secondary_anchors', 'micro_themes']
    },
    deconstruction: {
      type: 'object',
      properties: {
        core_concepts: { type: 'array', items: { type: 'string' } },
        directive: {
          type: 'object',
          properties: {
            word: { type: 'string' },
            demand_of_the_question: { type: 'string' }
          },
          required: ['word', 'demand_of_the_question']
        },
        dimensions_asked: { type: 'array', items: { type: 'string' } }
      },
      required: ['core_concepts', 'directive', 'dimensions_asked']
    },
    note_making_dimensions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          dimension_type: { type: 'string' },
          extraction: { type: 'array', items: { type: 'string' } }
        },
        required: ['dimension_type', 'extraction']
      }
    },
    stakeholders: { type: 'array', items: { type: 'string' } },
    relatability_hooks: { type: 'array', items: { type: 'string' } }
  },
  required: [
    'question_id',
    'taxonomy_mapping',
    'deconstruction',
    'note_making_dimensions',
    'stakeholders',
    'relatability_hooks'
  ]
};

const SYSTEM_PROMPT = `You are an expert UPSC CSE mentor and curriculum designer. 
Your task is to analyze UPSC Previous Year Questions and extract highly structured metadata.
Strictly adhere to the provided JSON schema. 
For taxonomy_mapping.primary_anchor, strictly use standard UPSC Micro-syllabus formatting (e.g., GS2-POL-FEDERALISM-SEPARATION, GS3-ECO-MACRO-INCLUSIVE, GS1-HIS-MODERN-FREEDOM, GS4-ETH-PHIL-FOUNDATIONS, etc.).
Extract precise core concepts. Do not extract generic filler words.
Identify exactly what dimensions of the micro-topic were asked (dimensions_asked).`;

async function processQuestion(questionObj) {
  const paperStr = questionObj.paperId ? questionObj.paperId.toUpperCase() : 'UNKNOWN';
  const userPrompt = `Question ID: ${questionObj.id}\nPaper: ${paperStr}\nYear: ${questionObj.year || 'N/A'}\nSubject: ${questionObj.subjectName || 'General Studies'}\nText: "${questionObj.text}"\n\nAnalyze this question and generate the structured JSON extraction.`;

  try {
    const result = await generateContent({
      prompt: userPrompt,
      systemInstruction: SYSTEM_PROMPT,
      responseSchema: extractionSchema,
      temperature: 0.1
    });

    if (!result || typeof result !== 'object') {
      throw new Error('Received empty or invalid object from Gemini.');
    }

    // Ensure question_id matches input question
    result.question_id = questionObj.id;
    return result;
  } catch (error) {
    console.error(`❌ Error processing question ${questionObj.id}: ${error.message}`);
    return null;
  }
}

async function runPipeline() {
  const inputPath = path.join(__dirname, '../src/data/questions.json');
  const outputPath = path.join(__dirname, '../src/data/ai-deconstructions.json');

  if (!fs.existsSync(inputPath)) {
    console.error(`ERROR: Input questions file not found at ${inputPath}`);
    process.exit(1);
  }

  console.log('='.repeat(60));
  console.log('🚀 UPSC PYQ AI Enrichment Pipeline (GCP Vertex AI / Gemini)');
  console.log(`Model:   ${process.env.GEMINI_MODEL || 'gemini-2.5-flash'}`);
  console.log(`Project: ${process.env.GCP_PROJECT_ID || 'project-77819c3a-8a9c-4bf7-afb'}`);
  console.log(`Region:  ${process.env.GCP_REGION || 'us-central1'}`);
  console.log('='.repeat(60));

  const allQuestions = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  console.log(`Loaded ${allQuestions.length} total questions from ${inputPath}`);

  let results = [];
  let processedIds = new Set();

  if (fs.existsSync(outputPath)) {
    try {
      const fileData = fs.readFileSync(outputPath, 'utf8').trim();
      if (fileData) {
        results = JSON.parse(fileData);
        results.forEach(r => {
          if (r && r.question_id) processedIds.add(r.question_id);
        });
        console.log(`Found ${results.length} already processed questions in existing output. Resuming...`);
      }
    } catch (e) {
      console.log('Existing output file could not be parsed as JSON. Starting fresh.');
      results = [];
    }
  }

  // Parse command line arguments (e.g., --limit=1 or --test)
  const args = process.argv.slice(2);
  const isTestMode = args.includes('--test') || args.includes('--dry-run');
  const limitArg = args.find(a => a.startsWith('--limit='));
  let limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : (isTestMode ? 1 : null);

  let pendingQuestions = allQuestions.filter(q => !processedIds.has(q.id));
  console.log(`Questions pending enrichment: ${pendingQuestions.length}`);

  if (limit && limit > 0) {
    console.log(`Applying execution limit of ${limit} question(s) [Test/Dry-run mode].`);
    pendingQuestions = pendingQuestions.slice(0, limit);
  }

  if (pendingQuestions.length === 0) {
    console.log('All questions are already processed! Nothing to do.');
    return;
  }

  // Safe concurrency limit between 3-5 concurrent requests to avoid quota 429 errors
  const CONCURRENCY_LIMIT = 4;
  const DELAY_BETWEEN_BATCHES_MS = 1000;
  let count = 0;
  const totalToProcess = pendingQuestions.length;
  const startTime = Date.now();

  for (let i = 0; i < pendingQuestions.length; i += CONCURRENCY_LIMIT) {
    const batch = pendingQuestions.slice(i, i + CONCURRENCY_LIMIT);
    const batchNum = Math.floor(i / CONCURRENCY_LIMIT) + 1;
    const totalBatches = Math.ceil(pendingQuestions.length / CONCURRENCY_LIMIT);

    console.log(
      `\n[Batch ${batchNum}/${totalBatches}] Processing ${batch.length} questions: ${batch.map(q => q.id).join(', ')}...`
    );

    const batchStartTime = Date.now();
    const batchPromises = batch.map(q => processQuestion(q));
    const batchResults = await Promise.all(batchPromises);

    const successfulResults = batchResults.filter(r => r !== null);
    results.push(...successfulResults);
    successfulResults.forEach(r => processedIds.add(r.question_id));
    count += successfulResults.length;

    // Persist progress immediately after each batch
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');

    const batchDuration = ((Date.now() - batchStartTime) / 1000).toFixed(1);
    console.log(
      `✓ Batch ${batchNum} completed in ${batchDuration}s. Saved: ${results.length}/${allQuestions.length} total (${count}/${totalToProcess} in this run)`
    );

    // Sleep between batches to stay comfortably within rate limits
    if (i + CONCURRENCY_LIMIT < pendingQuestions.length) {
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES_MS));
    }
  }

  const totalDuration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('\n' + '='.repeat(60));
  console.log(`✅ Pipeline run complete in ${totalDuration}s!`);
  console.log(`Enriched ${count} questions in this run.`);
  console.log(`Total questions in ${outputPath}: ${results.length}`);
  console.log('='.repeat(60));
}

runPipeline().catch(err => {
  console.error('Fatal Pipeline Error:', err);
  process.exit(1);
});
