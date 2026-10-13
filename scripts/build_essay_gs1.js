const fs = require('fs');
const path = require('path');

// We will construct the rich dataset for 2025 and 2026
// and merge them into scripts/data/gs1.js, gs2.js, gs3.js, gs4.js, and essay.js.

// 1. Essay 2025 & 2026
const essayNew = [
  // 2026
  {
    year: 2026,
    questionNumber: 1,
    section: 'A',
    marks: 125,
    subjectId: 'ess-phi',
    text: 'Oxymorons reflect the ironies of life.',
    tags: ['Philosophy & Abstract Thought', 'Ironies of Life', 'Paradoxes of Existence', 'Philosophical Reflection']
  },
  {
    year: 2026,
    questionNumber: 2,
    section: 'A',
    marks: 125,
    subjectId: 'ess-phi',
    text: 'A grateful mind is very beautiful.',
    tags: ['Gratitude', 'Human Values', 'Moral Aesthetics', 'Spiritual Philosophy']
  },
  {
    year: 2026,
    questionNumber: 3,
    section: 'A',
    marks: 125,
    subjectId: 'ess-phi',
    text: 'A thorn is a changed bud.',
    tags: ['Transformation', 'Adversity to Strength', 'Dialectics of Growth', 'Philosophical Wisdom']
  },
  {
    year: 2026,
    questionNumber: 4,
    section: 'A',
    marks: 125,
    subjectId: 'ess-int',
    text: 'When two elephants fight, it is the grass that gets trampled.',
    tags: ['Geopolitical Rivalry', 'Great Power Competition', 'Global South Impact', 'Third World Vulnerability']
  },
  {
    year: 2026,
    questionNumber: 5,
    section: 'B',
    marks: 125,
    subjectId: 'ess-sci',
    text: 'Nature is the symbol of the spirit.',
    tags: ['Ecology and Spirituality', 'Nature Philosophy', 'Ecological Consciousness', 'Environmental Ethics']
  },
  {
    year: 2026,
    questionNumber: 6,
    section: 'B',
    marks: 125,
    subjectId: 'ess-cul',
    text: 'A well-educated mind will always have more questions than answers.',
    tags: ['Critical Enquiry', 'True Education', 'Scientific Temper', 'Socratic Questioning']
  },
  {
    year: 2026,
    questionNumber: 7,
    section: 'B',
    marks: 125,
    subjectId: 'ess-eth',
    text: 'Shelving hard decisions is the least ethical course.',
    tags: ['Ethical Leadership', 'Decision Making Ethics', 'Moral Courage', 'Administrative Accountability']
  },
  {
    year: 2026,
    questionNumber: 8,
    section: 'B',
    marks: 125,
    subjectId: 'ess-pol',
    text: 'A good leader is one who follows the followers.',
    tags: ['Servant Leadership', 'Democratic Governance', 'Citizen-Centric Leadership', 'Public Administration']
  },

  // 2025
  {
    year: 2025,
    questionNumber: 1,
    section: 'A',
    marks: 125,
    subjectId: 'ess-phi',
    text: 'Truth knows no color.',
    tags: ['Universal Truth', 'Impartiality', 'Moral Philosophy', 'Justice and Equality']
  },
  {
    year: 2025,
    questionNumber: 2,
    section: 'A',
    marks: 125,
    subjectId: 'ess-phi',
    text: 'The supreme art of war is to subdue the enemy without fighting.',
    tags: ['Strategic Thought', 'Sun Tzu Philosophy', 'Diplomacy over Conflict', 'Statecraft']
  },
  {
    year: 2025,
    questionNumber: 3,
    section: 'A',
    marks: 125,
    subjectId: 'ess-phi',
    text: 'Thought finds a world and creates one also.',
    tags: ['Power of Ideas', 'Human Consciousness', 'Constructivism', 'Intellectual Creation']
  },
  {
    year: 2025,
    questionNumber: 4,
    section: 'A',
    marks: 125,
    subjectId: 'ess-phi',
    text: 'Best lessons are learnt through bitter experiences.',
    tags: ['Experiential Wisdom', 'Resilience', 'Overcoming Failure', 'Human Development']
  },
  {
    year: 2025,
    questionNumber: 5,
    section: 'B',
    marks: 125,
    subjectId: 'ess-phi',
    text: 'Muddy water is best cleared by leaving it alone.',
    tags: ['Non-Intervention', 'Mindfulness & Patience', 'Crisis Management', 'Taoist Wisdom']
  },
  {
    year: 2025,
    questionNumber: 6,
    section: 'B',
    marks: 125,
    subjectId: 'ess-phi',
    text: 'The years teach much which the days never know.',
    tags: ['Long-Term Perspective', 'Historical Wisdom', 'Patience in Policy', 'Maturity']
  },
  {
    year: 2025,
    questionNumber: 7,
    section: 'B',
    marks: 125,
    subjectId: 'ess-phi',
    text: 'It is best to see life as a journey, not as a destination.',
    tags: ['Existential Philosophy', 'Process over Outcome', 'Mindful Living', 'Human Fulfilment']
  },
  {
    year: 2025,
    questionNumber: 8,
    section: 'B',
    marks: 125,
    subjectId: 'ess-eco',
    text: 'Contentment is natural wealth; luxury is artificial poverty.',
    tags: ['Consumerism Critique', 'Sustainable Living', 'Gandhian Economics', 'Simple Living High Thinking']
  }
];

// 2. GS1 2025 & 2026
const gs1New = [
  // 2026
  {
    year: 2026,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs1-her',
    text: 'Analyze the importance of Ashokan inscriptions for reconstructing Mauryan history.',
    tags: ['Ashokan Inscriptions', 'Mauryan Empire', 'Dhamma Edicts', 'Epigraphy', 'Ancient Indian History']
  },
  {
    year: 2026,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs1-mod',
    text: "Discuss the impact of Macaulay's Minute on colonial administration and education in India.",
    tags: ["Macaulay's Minute 1835", 'English Education Act', 'Colonial Administration', 'Downward Filtration Theory', 'British Education Policy']
  },
  {
    year: 2026,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs1-fre',
    text: 'The significance of the Gandhian movements lay in the masses they mobilized. Elucidate.',
    tags: ['Gandhian Mass Movements', 'Non-Cooperation Movement', 'Civil Disobedience', 'Mass Mobilisation', 'Subaltern Participation']
  },
  {
    year: 2026,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'What is the Fujiwhara effect? Explain its impact on the movement and intensity of tropical cyclones.',
    tags: ['Fujiwhara Effect', 'Tropical Cyclones', 'Binary Cyclone Interaction', 'Meteorology', 'Climatology']
  },
  {
    year: 2026,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs1-geo',
    text: '"Tundra regions are ecologically fragile but economically important." Examine this statement critically.',
    tags: ['Tundra Biome', 'Permafrost Thawing', 'Arctic Mineral Resources', 'Ecological Fragility', 'Climate Vulnerability']
  },
  {
    year: 2026,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Discuss the role of aeolian processes in desertification and land degradation.',
    tags: ['Aeolian Processes', 'Wind Erosion', 'Desertification', 'Land Degradation', 'Arid Geomorphology']
  },
  {
    year: 2026,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs1-geo',
    text: '"Water resources are both an asset and a source of conflict in South Asia." Examine this statement giving examples.',
    tags: ['Transboundary Water Sharing', 'Indus Waters Treaty', 'Teesta Dispute', 'Hydropolitics in South Asia', 'River Basin Conflict']
  },
  {
    year: 2026,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'Unity in diversity remains the defining feature of Indian society despite the challenges from communalism and regionalism. Comment.',
    tags: ['Unity in Diversity', 'Indian Pluralism', 'Communalism Challenges', 'Regional Identity Politics', 'Social Cohesion']
  },
  {
    year: 2026,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'How do you understand disability? Substantiate the need for inclusive policy framework in India in this regard.',
    tags: ['Disability Rights (RPwD Act)', 'Inclusive Infrastructure', 'Accessible India Campaign', 'Social Vulnerability', 'Divyangjan Empowerment']
  },
  {
    year: 2026,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'Do you think digital technology promotes social empowerment? Explain with examples.',
    tags: ['Digital Empowerment', 'Digital Divide in India', 'Financial Inclusion (JAM)', 'Women Social Capital', 'Tech in Governance']
  },
  {
    year: 2026,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs1-her',
    text: 'Vijayanagara architecture exemplifies the amalgamation of past traditions with contemporary practices. Elucidate with examples.',
    tags: ['Vijayanagara Architecture', 'Hampi Monuments', 'Kalyana Mandapa', 'Raya Gopuram', 'Indo-Islamic Architectural Fusion']
  },
  {
    year: 2026,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs1-post',
    text: 'Linguistic reorganization of Indian States was driven by popular pressure from below. Comment.',
    tags: ['Linguistic Reorganization', 'States Reorganisation Commission (SRC)', 'Fazal Ali Commission', 'Potti Sreeramulu Agitation', 'Post-Independence Integration']
  },
  {
    year: 2026,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs1-post',
    text: 'The model of planned economy was adopted in India to address the regional imbalances left behind by colonial rule. Comment.',
    tags: ['Five Year Plans', 'Planning Commission Era', 'Regional Disparities', 'Mahalanobis Model', 'Industrial Backwardness Redressal']
  },
  {
    year: 2026,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Compare the Loo, Chinook and Foehn winds with respect to their regions of prevalence, their nature and climatic impacts.',
    tags: ['Local Winds Climatology', 'Loo Wind in Indo-Gangetic Plain', 'Chinook Snow Eater', 'Foehn European Alps', 'Adiabatic Heating']
  },
  {
    year: 2026,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Analyze the role of satellite-based technologies in achieving climate-smart agriculture and food security in India.',
    tags: ['Satellite Remote Sensing', 'Precision Agriculture', 'ISRO FASAL Programme', 'Crop Yield Estimation', 'Climate-Smart Farming']
  },
  {
    year: 2026,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs1-geo',
    text: '"The centre of global trade is gradually shifting from the Atlantic region to the Indo-Pacific region." Examine this statement.',
    tags: ['Indo-Pacific Geoeconomics', 'Global Maritime Trade Routes', 'Strait of Malacca', 'Shifting Economic Gravitas', 'Trans-Pacific Trade']
  },
  {
    year: 2026,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Analyze the major drivers of human-induced land-use changes in India and their geographical consequences.',
    tags: ['Land Use Change (LULC)', 'Deforestation and Urban Sprawl', 'Soil Degradation', 'Ecological Imbalance', 'Hydrological Disruption']
  },
  {
    year: 2026,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Is caste disappearing in urban India? Illustrate your answer with examples.',
    tags: ['Caste in Urban Spaces', 'Occupational Mobility', 'Subtle Caste Discrimination', 'Residential Segregation', 'Marriage and Social Network']
  },
  {
    year: 2026,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Critically examine the challenges of demographic transition in contemporary India.',
    tags: ['Demographic Dividend', 'Population Ageing', 'Total Fertility Rate (TFR)', 'Youth Employment', 'Healthcare for Elderly']
  },
  {
    year: 2026,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Evaluate the impact of globalization on Indian youths with reference to social, political, economic and cultural spheres.',
    tags: ['Globalization Impact on Youth', 'Cultural Hybridization', 'Gig Economy & Aspirations', 'Social Media Influence', 'Political Awareness']
  },

  // 2025
  {
    year: 2025,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs1-her',
    text: 'Discuss the salient features of the Harappan architecture.',
    tags: ['Harappan Architecture', 'Town Planning', 'Great Bath & Granaries', 'Drainage System', 'Indus Valley Civilisation']
  },
  {
    year: 2025,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs1-her',
    text: "Examine the main aspects of Akbar's religious syncretism.",
    tags: ["Akbar's Religious Policy", 'Sulh-i-Kul', 'Ibadat Khana', 'Din-i-Ilahi', 'Mughal Cultural Syncretism']
  },
  {
    year: 2025,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs1-her',
    text: "'The sculptors filled the Chandella artform with resilient vigor and breadth of life.' Elucidate.",
    tags: ['Chandella Dynasty Art', 'Khajuraho Temples', 'Nagara Temple Architecture', 'Erotic Sculptures', 'Medieval Indian Art']
  },
  {
    year: 2025,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'How are climate change and the sea level rise affecting the very existence of many island nations? Discuss with examples.',
    tags: ['Sea Level Rise', 'Small Island Developing States (SIDS)', 'Tuvalu and Maldives Crisis', 'Coastal Inundation', 'Climate Induced Displacement']
  },
  {
    year: 2025,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'What are non-farm primary activities? How are these activities related to physiographic features in India? Discuss with suitable examples.',
    tags: ['Non-Farm Primary Activities', 'Fisheries & Forestry', 'Physiographic Regions of India', 'Livestock Rearing', 'Mining & Quarrying']
  },
  {
    year: 2025,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Explain briefly the ecological and economic benefits of solar energy generation in India with suitable examples.',
    tags: ['Solar Energy Transition', 'National Solar Mission', 'PM-KUSUM Scheme', 'Carbon Footprint Mitigation', 'Renewable Energy Economy']
  },
  {
    year: 2025,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'What are Tsunamis? How and where are they formed? What are their consequences? Explain with examples.',
    tags: ['Tsunamis Geophysics', 'Subduction Zone Earthquakes', 'Ocean Wave Dynamics', 'Coastal Inundation Hazard', 'Early Warning Systems (INCOIS)']
  },
  {
    year: 2025,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'How does smart city in India, address the issues of urban poverty and distributive justice?',
    tags: ['Smart Cities Mission', 'Urban Poverty Alleviation', 'Distributive Justice in Urban Planning', 'Slum Redevelopment', 'Inclusive Urban Amenities']
  },
  {
    year: 2025,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'The ethos of civil service in India stand for the combination of professionalism with nationalistic consciousness - Elucidate.',
    tags: ['Civil Service Ethos', 'Sardar Patel Steel Frame', 'Public Service Professionalism', 'Nation Building', 'Constitutional Values in Administration']
  },
  {
    year: 2025,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'Do you think that globalization results in only an aggressive consumer culture? Justify your answer.',
    tags: ['Globalization & Consumerism', 'Cultural Homogenization', 'Glocalization of Culture', 'Local Art Revitalization', 'Consumerist Ethics']
  },
  {
    year: 2025,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs1-mod',
    text: "Mahatma Jotirao Phule's writings and efforts of social reforms touched issues of almost all subaltern classes. Discuss.",
    tags: ['Jyotirao Phule', 'Satyashodhak Samaj', 'Gulamgiri', 'Anti-Caste Movement', 'Subaltern Education for Women & Dalits']
  },
  {
    year: 2025,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs1-post',
    text: "Trace India's consolidation process during early phase of independence in terms of polity, economy, education and international relations.",
    tags: ['Post-Independence Consolidation', 'Integration of Princely States (Patel)', 'Non-Aligned Movement (NAM)', 'IIT & IIM Institution Building', 'Constitutional Integration']
  },
  {
    year: 2025,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs1-wh',
    text: 'The French Revolution has enduring relevance to the contemporary world. Explain.',
    tags: ['French Revolution 1789', 'Liberty Equality Fraternity', 'Democratic Constitutionalism', 'Human Rights Declaration', 'Fall of Feudalism']
  },
  {
    year: 2025,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Give a geographical explanation of the distribution of off-shore oil reserves of the world. How are they different from the on-shore occurrences of oil reserves?',
    tags: ['Off-shore Oil Reserves', 'Continental Shelves & Deep Sea Drilling', 'Bombay High & Persian Gulf', 'Petroleum Geology', 'Hydrocarbon Exploration']
  },
  {
    year: 2025,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'How can Artificial Intelligence (AI) and drones be effectively used along with GIS and RS techniques in locational and areal planning?',
    tags: ['AI and Drones in Planning', 'Geographic Information Systems (GIS)', 'Remote Sensing (RS)', 'Urban and Regional Planning', 'Land Record Digitization (SVAMITVA)']
  },
  {
    year: 2025,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Discuss how the changes in shape and sizes of continents and ocean basins of the planet take place due to tectonic movements of the crustal masses.',
    tags: ['Plate Tectonics Theory', 'Continental Drift', 'Seafloor Spreading', 'Subduction and Orogeny', 'Crustal Dynamics']
  },
  {
    year: 2025,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Discuss the distribution and density of population in the Ganga River Basin with special reference to land, soil and water resources.',
    tags: ['Ganga River Basin', 'Alluvial Soil Fertility', 'Population Density Geography', 'Agricultural Carrying Capacity', 'Water Resource Depletion']
  },
  {
    year: 2025,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'How do you account for the growing fast food industries given that there are increased health concerns in modern society? Illustrate your answer with the Indian experience.',
    tags: ['Fast Food Consumption', 'Lifestyle Diseases & NCDs', 'Urbanisation and Fast Pace Life', 'Nutritional Transition', 'Food Culture in India']
  },
  {
    year: 2025,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs1-soc',
    text: "Achieving sustainable growth with emphasis on environmental protection could come into conflict with poor people's needs in a country like India - Comment.",
    tags: ['Environment vs Development Dilemma', 'Tribal Livelihoods vs Forest Conservation', 'Just Transition in Energy', 'Poverty Eradication', 'Ecological Equity']
  },
  {
    year: 2025,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Does tribal development in India centre around two axes, those of displacement and of rehabilitation? Give your opinion.',
    tags: ['Tribal Development Paradigm', 'Development-Induced Displacement', 'Forest Rights Act (FRA 2006)', 'Rehabilitation and Resettlement', 'Fifth Schedule Areas']
  }
];

// Let's create scripts/data/new_questions.js exporting essayNew and gs1New, and then define gs2New, gs3New, gs4New
fs.writeFileSync(
  path.join(__dirname, 'data/essay_new.json'),
  JSON.stringify(essayNew, null, 2),
  'utf8'
);
fs.writeFileSync(
  path.join(__dirname, 'data/gs1_new.json'),
  JSON.stringify(gs1New, null, 2),
  'utf8'
);
console.log('Saved essay_new.json and gs1_new.json');
