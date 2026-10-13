/**
 * Gemini Client for UPSC PYQ Vault
 * Authenticated via GCP (aryanvyas5454@gmail.com) Vertex AI with active credits.
 */
const { execSync } = require('child_process');

let cachedToken = null;
let tokenExpiresAt = 0;

function getAccessToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpiresAt) {
    return cachedToken;
  }
  const gcloudPath = 'C:\\Users\\Aryan\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd';
  try {
    cachedToken = execSync(`"${gcloudPath}" auth print-access-token`, { encoding: 'utf8' }).trim();
    // Google access tokens typically valid for 60 minutes; cache for 50 min
    tokenExpiresAt = now + 50 * 60 * 1000;
    return cachedToken;
  } catch (err) {
    throw new Error('Failed to obtain GCP access token: ' + err.message);
  }
}

async function generateContent({
  prompt,
  systemInstruction,
  model = process.env.GEMINI_MODEL || 'gemini-2.5-flash',
  responseSchema = null,
  temperature = 0.2
}) {
  const project = process.env.GCP_PROJECT_ID || 'project-77819c3a-8a9c-4bf7-afb';
  const location = process.env.GCP_REGION || 'us-central1';
  const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/publishers/google/models/${model}:generateContent`;

  const requestBody = {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      temperature
    }
  };

  if (systemInstruction) {
    requestBody.systemInstruction = {
      parts: [{ text: systemInstruction }]
    };
  }

  if (responseSchema) {
    requestBody.generationConfig.responseMimeType = 'application/json';
    requestBody.generationConfig.responseSchema = responseSchema;
  }

  let retries = 5;
  let delay = 2000;

  while (true) {
    const token = getAccessToken();
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if ((res.status === 429 || res.status >= 500) && retries > 0) {
      console.warn(`Vertex AI returned ${res.status}. Retrying in ${delay}ms (${retries} attempts left)...`);
      await new Promise(r => setTimeout(r, delay));
      delay *= 2;
      retries--;
      continue;
    }

    if (res.status === 401 && retries > 0) {
      console.warn(`Token expired (401). Refreshing token and retrying...`);
      cachedToken = null;
      tokenExpiresAt = 0;
      retries--;
      continue;
    }

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(`Vertex AI Error (${res.status}): ${errorData}`);
    }

    const data = await res.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (responseSchema) {
      try {
        return JSON.parse(candidateText);
      } catch {
        return candidateText;
      }
    }

    return candidateText;
  }
}

module.exports = {
  getAccessToken,
  generateContent
};
