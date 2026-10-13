// UPSC CSE Mains Essay Questions (2013 - 2024)
// Total 96 questions (8 topics per year: 4 in Section A, 4 in Section B)

const essayQuestions = [
  // ----------------------------------------------------
  // 2024
  // ----------------------------------------------------
  {
    year: 2024,
    questionNumber: 1,
    section: 'A',
    subjectId: 'ess-sci',
    marks: 125,
    text: 'Forests precede civilizations and deserts follow them.',
    tags: ['Forest Conservation', 'Civilization & Environment', 'Deforestation', 'Ecological Collapse', 'Sustainable Development']
  },
  {
    year: 2024,
    questionNumber: 2,
    section: 'A',
    subjectId: 'ess-phi',
    marks: 125,
    text: 'The empires of the future will be the empires of the mind.',
    tags: ['Knowledge Economy', 'Human Capital', 'Intellectual Power', 'Innovation & Ideas', 'Philosophy of Power']
  },
  {
    year: 2024,
    questionNumber: 3,
    section: 'A',
    subjectId: 'ess-phi',
    marks: 125,
    text: 'There is no path to happiness; Happiness is the path.',
    tags: ['Happiness & Well-being', 'Philosophy of Life', 'Mindfulness', 'Inner Peace', 'Purpose of Life']
  },
  {
    year: 2024,
    questionNumber: 4,
    section: 'A',
    subjectId: 'ess-sci',
    marks: 125,
    text: 'The doubter is a true man of science.',
    tags: ['Scientific Temper', 'Rationalism', 'Questioning Spirit', 'Scientific Method', 'Inquiry & Knowledge']
  },
  {
    year: 2024,
    questionNumber: 5,
    section: 'B',
    subjectId: 'ess-soc',
    marks: 125,
    text: "Social media is triggering 'Fear of Missing Out' (FOMO) amongst the youth, precipitating depression and loneliness.",
    tags: ['Social Media Impact', 'Youth & Mental Health', 'Digital Well-being', 'Loneliness & Alienation', 'Modern Society']
  },
  {
    year: 2024,
    questionNumber: 6,
    section: 'B',
    subjectId: 'ess-eth',
    marks: 125,
    text: 'Nearly all men can stand adversity, but to test the character, give him power.',
    tags: ['Power & Ethics', 'Character Testing', 'Moral Responsibility', 'Leadership Integrity', 'Governance & Power']
  },
  {
    year: 2024,
    questionNumber: 7,
    section: 'B',
    subjectId: 'ess-phi',
    marks: 125,
    text: 'All ideas having large consequences are always simple.',
    tags: ['Simplicity & Impact', 'Power of Ideas', 'Philosophy of Thought', 'Paradigm Shifts', 'Innovation']
  },
  {
    year: 2024,
    questionNumber: 8,
    section: 'B',
    subjectId: 'ess-eth',
    marks: 125,
    text: 'The cost of being wrong is less than the cost of doing nothing.',
    tags: ['Action vs Inaction', 'Decision Making', 'Risk & Leadership', 'Bureaucratic Inertia', 'Courage to Act']
  },

  // ----------------------------------------------------
  // 2023
  // ----------------------------------------------------
  {
    year: 2023,
    questionNumber: 1,
    section: 'A',
    subjectId: 'ess-phi',
    marks: 125,
    text: 'Thinking is like a game, it does not begin unless there is an opposite team.',
    tags: ['Critical Thinking', 'Dialectics', 'Constructive Disagreement', 'Intellectual Debate', 'Pluralism']
  },
  {
    year: 2023,
    questionNumber: 2,
    section: 'A',
    subjectId: 'ess-phi',
    marks: 125,
    text: 'Visionary decision-making happens at the intersection of intuition and logic.',
    tags: ['Decision Making', 'Intuition vs Reason', 'Strategic Leadership', 'Rationality', 'Visionary Governance']
  },
  {
    year: 2023,
    questionNumber: 3,
    section: 'A',
    subjectId: 'ess-phi',
    marks: 125,
    text: 'Not all who wander are lost.',
    tags: ['Exploration', 'Purpose of Life', 'Creativity & Curiosity', 'Non-conformity', 'Human Journey']
  },
  {
    year: 2023,
    questionNumber: 4,
    section: 'A',
    subjectId: 'ess-phi',
    marks: 125,
    text: 'Inspiration for creativity springs from the effort to look for the magical in the mundane.',
    tags: ['Creativity & Innovation', 'Mindfulness', 'Everyday Aesthetics', 'Human Spirit', 'Observation']
  },
  {
    year: 2023,
    questionNumber: 5,
    section: 'B',
    subjectId: 'ess-soc',
    marks: 125,
    text: 'Girls are weighed down by restrictions, boys with demands – two equally harmful extremes.',
    tags: ['Gender Stereotypes', 'Patriarchy', 'Youth Conditioning', 'Gender Justice', 'Social Conditioning']
  },
  {
    year: 2023,
    questionNumber: 6,
    section: 'B',
    subjectId: 'ess-sci',
    marks: 125,
    text: 'Mathematics is the music of reason.',
    tags: ['Logic & Reason', 'Beauty of Mathematics', 'Scientific Temper', 'Philosophy of Knowledge', 'Rational Thought']
  },
  {
    year: 2023,
    questionNumber: 7,
    section: 'B',
    subjectId: 'ess-soc',
    marks: 125,
    text: 'A society that has more justice is a society that needs less charity.',
    tags: ['Social Justice', 'Charity vs Justice', 'Inequality & Rights', 'Welfare State', 'Egalitarian Society']
  },
  {
    year: 2023,
    questionNumber: 8,
    section: 'B',
    subjectId: 'ess-cul',
    marks: 125,
    text: 'Education is what remains after one has forgotten what one has learned in school.',
    tags: ['True Education', 'Character Building', 'Lifelong Learning', 'Value Education', 'Critical Inquiry']
  },

  // ----------------------------------------------------
  // 2022
  // ----------------------------------------------------
  {
    year: 2022,
    questionNumber: 1,
    section: 'A',
    subjectId: 'ess-eco',
    marks: 125,
    text: 'Forests are the best case studies for economic excellence.',
    tags: ['Circular Economy', 'Ecological Economics', 'Forest Ecology', 'Resource Efficiency', 'Sustainability']
  },
  {
    year: 2022,
    questionNumber: 2,
    section: 'A',
    subjectId: 'ess-phi',
    marks: 125,
    text: 'Poets are the unacknowledged legislators of the world.',
    tags: ['Literature & Society', 'Moral Conscience', 'Art & Imagination', 'Cultural Impact', 'Power of Ideas']
  },
  {
    year: 2022,
    questionNumber: 3,
    section: 'A',
    subjectId: 'ess-sci',
    marks: 125,
    text: 'History is a series of victories won by the scientific man over the romantic man.',
    tags: ['Rationalism vs Romanticism', 'Enlightenment', 'Scientific Progress', 'Human Progress', 'Modernity']
  },
  {
    year: 2022,
    questionNumber: 4,
    section: 'A',
    subjectId: 'ess-phi',
    marks: 125,
    text: 'A ship in harbour is safe, but that is not what ship is built for.',
    tags: ['Risk-Taking & Courage', 'Human Potential', 'Comfort Zone', 'Resilience', 'Purpose & Destiny']
  },
  {
    year: 2022,
    questionNumber: 5,
    section: 'B',
    subjectId: 'ess-phi',
    marks: 125,
    text: 'The time to repair the roof is when the sun is shining.',
    tags: ['Preparedness & Foresight', 'Crisis Management', 'Policy Planning', 'Preventive Governance', 'Resilience']
  },
  {
    year: 2022,
    questionNumber: 6,
    section: 'B',
    subjectId: 'ess-phi',
    marks: 125,
    text: 'You cannot step twice into the same river.',
    tags: ['Philosophy of Change', 'Impermanence', 'Heraclitus', 'Adaptability', 'Dynamic Reality']
  },
  {
    year: 2022,
    questionNumber: 7,
    section: 'B',
    subjectId: 'ess-eth',
    marks: 125,
    text: 'A smile is the chosen vehicle for all ambiguities.',
    tags: ['Human Empathy', 'Diplomacy & Restraint', 'Interpersonal Harmony', 'Subtlety & Wisdom', 'Social Graces']
  },
  {
    year: 2022,
    questionNumber: 8,
    section: 'B',
    subjectId: 'ess-phi',
    marks: 125,
    text: 'Just because you have a choice, it does not mean that any of them has to be right.',
    tags: ['Moral Dilemmas', 'Ethical Pluralism', 'Decision Making', 'Limits of Choice', 'Moral Philosophy']
  },

  // ----------------------------------------------------
  // 2021
  // ----------------------------------------------------
  {
    year: 2021,
    questionNumber: 1,
    section: 'A',
    subjectId: 'ess-sci',
    marks: 125,
    text: 'The process of self-discovery has now been technologically outsourced.',
    tags: ['Technology & Self', 'Artificial Intelligence', 'Digital Alienation', 'Mindfulness', 'Algorithmic Society']
  },
  {
    year: 2021,
    questionNumber: 2,
    section: 'A',
    subjectId: 'ess-phi',
    marks: 125,
    text: 'Your perception of me is a reflection of you; my reaction to you is an awareness of me.',
    tags: ['Self-Awareness', 'Emotional Intelligence', 'Psychology of Projection', 'Empathy', 'Human Relations']
  },
  {
    year: 2021,
    questionNumber: 3,
    section: 'A',
    subjectId: 'ess-phi',
    marks: 125,
    text: 'Philosophy of wantlessness is Utopian, while materialism is a chimera.',
    tags: ['Asceticism vs Consumerism', 'Materialism', 'Middle Path', 'Gandhian Economics', 'Happiness']
  },
  {
    year: 2021,
    questionNumber: 4,
    section: 'A',
    subjectId: 'ess-phi',
    marks: 125,
    text: 'The real is rational and the rational is real.',
    tags: ['Hegelian Dialectics', 'Rationality & Reality', 'Reason in History', 'Philosophical Realism', 'Enlightenment']
  },
  {
    year: 2021,
    questionNumber: 5,
    section: 'B',
    subjectId: 'ess-soc',
    marks: 125,
    text: 'The hand that rocks the cradle rules the world.',
    tags: ['Women Empowerment', 'Motherhood & Society', 'Gender Equity', 'Values Transmission', 'Social Progress']
  },
  {
    year: 2021,
    questionNumber: 6,
    section: 'B',
    subjectId: 'ess-sci',
    marks: 125,
    text: 'What is research, but a blind date with knowledge!',
    tags: ['Scientific Inquiry', 'Research & Curiosity', 'Intellectual Exploration', 'Discovery & Innovation', 'Knowledge Society']
  },
  {
    year: 2021,
    questionNumber: 7,
    section: 'B',
    subjectId: 'ess-phi',
    marks: 125,
    text: 'History repeats itself, first as a tragedy, second as a farce.',
    tags: ['Lessons of History', 'Historical Cycles', 'Marxian Philosophy', 'Political Folly', 'Human Fallibility']
  },
  {
    year: 2021,
    questionNumber: 8,
    section: 'B',
    subjectId: 'ess-pol',
    marks: 125,
    text: 'There are better practices to "best practices".',
    tags: ['Governance Innovation', 'Contextual Solutions', 'Reforms', 'Decentralization', 'Administrative Agility']
  },

  // ----------------------------------------------------
  // 2020
  // ----------------------------------------------------
  {
    year: 2020,
    questionNumber: 1,
    section: 'A',
    subjectId: 'ess-eth',
    marks: 125,
    text: 'Life is a long journey between human being and being humane.',
    tags: ['Humanity & Empathy', 'Compassion', 'Moral Evolution', 'Civilization Values', 'Character Building']
  },
  {
    year: 2020,
    questionNumber: 2,
    section: 'A',
    subjectId: 'ess-phi',
    marks: 125,
    text: 'Mindful manifesto is the catalyst to a tranquil self.',
    tags: ['Mindfulness', 'Inner Peace', 'Mental Health', 'Modern Stress', 'Self-Realization']
  },
  {
    year: 2020,
    questionNumber: 3,
    section: 'A',
    subjectId: 'ess-eth',
    marks: 125,
    text: 'Ships do not sink because of water around them; ships sink because of water that gets into them.',
    tags: ['Integrity & Character', 'Resilience', 'Moral Fortitude', 'Corruption Within', 'Values & Ethics']
  },
  {
    year: 2020,
    questionNumber: 4,
    section: 'A',
    subjectId: 'ess-phi',
    marks: 125,
    text: 'Simplicity is the ultimate sophistication.',
    tags: ['Simplicity in Life', 'Minimalism', 'Gandhian Ethics', 'Elegance & Truth', 'Clarity of Purpose']
  },
  {
    year: 2020,
    questionNumber: 5,
    section: 'B',
    subjectId: 'ess-cul',
    marks: 125,
    text: 'Culture and civilization are not the same; culture is what we are, civilization is what we have.',
    tags: ['Culture vs Civilization', 'Material vs Spiritual', 'Heritage', 'Identity', 'Human Evolution']
  },
  {
    year: 2020,
    questionNumber: 6,
    section: 'B',
    subjectId: 'ess-eco',
    marks: 125,
    text: 'There can be no social justice without economic prosperity but economic prosperity without social justice is meaningless.',
    tags: ['Inclusive Growth', 'Social Justice & Economy', 'Income Inequality', 'Welfare State', 'Human Development']
  },
  {
    year: 2020,
    questionNumber: 7,
    section: 'B',
    subjectId: 'ess-soc',
    marks: 125,
    text: 'Patriarchy is the least noticed yet the most significant structure of social inequality.',
    tags: ['Patriarchy', 'Gender Inequality', 'Structural Discrimination', 'Feminism', 'Social Reform']
  },
  {
    year: 2020,
    questionNumber: 8,
    section: 'B',
    subjectId: 'ess-int',
    marks: 125,
    text: 'Technology as the silent factor in international relations.',
    tags: ['Tech Diplomacy', 'Cyber Warfare', 'Geopolitics of Technology', 'Digital Sovereignty', 'Global Order']
  },

  // ----------------------------------------------------
  // 2019
  // ----------------------------------------------------
  {
    year: 2019,
    questionNumber: 1,
    section: 'A',
    subjectId: 'ess-soc',
    marks: 125,
    text: 'Best for an individual is not necessarily best for the society.',
    tags: ['Individual vs Collectivity', 'Common Good', 'Utilitarianism', 'Social Contract', 'Civic Responsibility']
  },
  {
    year: 2019,
    questionNumber: 2,
    section: 'A',
    subjectId: 'ess-pol',
    marks: 125,
    text: 'Biased media is a real threat to Indian democracy.',
    tags: ['Fourth Estate', 'Media Independence', 'Fake News & Polarisation', 'Democratic Health', 'Freedom of Speech']
  },
  {
    year: 2019,
    questionNumber: 3,
    section: 'A',
    subjectId: 'ess-soc',
    marks: 125,
    text: 'Neglect of primary health care and education in India are reasons for its backwardness.',
    tags: ['Primary Healthcare', 'Universal Education', 'Human Capital Development', 'Inclusive Growth', 'Amartya Sen']
  },
  {
    year: 2019,
    questionNumber: 4,
    section: 'A',
    subjectId: 'ess-int',
    marks: 125,
    text: 'South Asian societies are woven not around the state, but around their plural cultures and plural identities.',
    tags: ['South Asia Geopolitics', 'Pluralism', 'Shared Heritage', 'Subcontinental Identity', 'Cultural Diplomacy']
  },
  {
    year: 2019,
    questionNumber: 5,
    section: 'B',
    subjectId: 'ess-sci',
    marks: 125,
    text: 'Rise of Artificial Intelligence: the threat of jobless future or better job opportunities through reskilling and upskilling.',
    tags: ['Artificial Intelligence', 'Future of Work', 'Automation & Jobs', 'Reskilling & Upskilling', 'Technological Transition']
  },
  {
    year: 2019,
    questionNumber: 6,
    section: 'B',
    subjectId: 'ess-eth',
    marks: 125,
    text: 'Courage to accept and dedication to improve are two keys to success.',
    tags: ['Resilience', 'Growth Mindset', 'Self-Improvement', 'Accountability', 'Leadership Character']
  },
  {
    year: 2019,
    questionNumber: 7,
    section: 'B',
    subjectId: 'ess-eth',
    marks: 125,
    text: 'Values are not what humanity is, but what humanity ought to be.',
    tags: ['Moral Ideals', 'Ethics & Norms', 'Human Dignity', 'Ethical Aspirations', 'Virtue Ethics']
  },
  {
    year: 2019,
    questionNumber: 8,
    section: 'B',
    subjectId: 'ess-phi',
    marks: 125,
    text: 'Wisdom finds truth.',
    tags: ['Wisdom & Truth', 'Epistemology', 'Critical Inquiry', 'Philosophical Pursuit', 'Discernment']
  },

  // ----------------------------------------------------
  // 2018
  // ----------------------------------------------------
  {
    year: 2018,
    questionNumber: 1,
    section: 'A',
    subjectId: 'ess-sci',
    marks: 125,
    text: 'Alternative technologies for a climate change resilient India.',
    tags: ['Climate Change Resilience', 'Renewable Energy', 'Green Technology', 'Sustainable Agriculture', 'Eco-Innovation']
  },
  {
    year: 2018,
    questionNumber: 2,
    section: 'A',
    subjectId: 'ess-eth',
    marks: 125,
    text: 'A good life is one inspired by love and guided by knowledge.',
    tags: ['Bertrand Russell', 'Philosophy of Life', 'Compassion & Reason', 'Human Fulfillment', 'Virtue Ethics']
  },
  {
    year: 2018,
    questionNumber: 3,
    section: 'A',
    subjectId: 'ess-eco',
    marks: 125,
    text: 'Poverty anywhere is a threat to prosperity everywhere.',
    tags: ['Global Poverty', 'Interconnected World', 'Inclusive Development', 'ILO Declaration', 'Economic Equality']
  },
  {
    year: 2018,
    questionNumber: 4,
    section: 'A',
    subjectId: 'ess-int',
    marks: 125,
    text: 'Management of Indian border disputes – a complex task.',
    tags: ['Border Management', 'National Security', 'Cross-Border Diplomacy', 'Territorial Sovereignty', 'Neighbourhood Policy']
  },
  {
    year: 2018,
    questionNumber: 5,
    section: 'B',
    subjectId: 'ess-eth',
    marks: 125,
    text: 'Customary morality cannot be a guide to modern life.',
    tags: ['Constitutional Morality', 'Customary Practices', 'Social Reform', 'Modernity & Rights', 'Progressive Values']
  },
  {
    year: 2018,
    questionNumber: 6,
    section: 'B',
    subjectId: 'ess-cul',
    marks: 125,
    text: "'The past' is a permanent dimension of human consciousness and values.",
    tags: ['Historical Memory', 'Heritage & Values', 'Identity Formation', 'Cultural Continuity', 'Human Consciousness']
  },
  {
    year: 2018,
    questionNumber: 7,
    section: 'B',
    subjectId: 'ess-eth',
    marks: 125,
    text: 'A people that values its privileges above its principles loses both.',
    tags: ['Principles vs Privilege', 'Moral Compromise', 'Democratic Duty', 'Civic Integrity', 'Ethical Governance']
  },
  {
    year: 2018,
    questionNumber: 8,
    section: 'B',
    subjectId: 'ess-phi',
    marks: 125,
    text: 'Reality does not conform to the ideal, but confirms it.',
    tags: ['Idealism vs Realism', 'Pragmatism', 'Moral Aspirations', 'Philosophy of Action', 'Truth & Action']
  },

  // ----------------------------------------------------
  // 2017
  // ----------------------------------------------------
  {
    year: 2017,
    questionNumber: 1,
    section: 'A',
    subjectId: 'ess-eco',
    marks: 125,
    text: 'Farming has lost the ability to be a source of subsistence for the majority of farmers in India.',
    tags: ['Agrarian Crisis', 'Farmer Subsistence', 'Rural Distress', 'Agriculture Reforms', 'Food Security']
  },
  {
    year: 2017,
    questionNumber: 2,
    section: 'A',
    subjectId: 'ess-pol',
    marks: 125,
    text: 'Impact of the new economic measures on fiscal ties between the union and states in India.',
    tags: ['Fiscal Federalism', 'GST Reforms', 'Centre-State Relations', 'Financial Decentralization', 'Tax Reforms']
  },
  {
    year: 2017,
    questionNumber: 3,
    section: 'A',
    subjectId: 'ess-cul',
    marks: 125,
    text: 'Destiny of a nation is shaped in its classrooms.',
    tags: ['Education & Nation Building', 'Kothari Commission', 'Schooling Quality', 'Human Capital', 'Values in Education']
  },
  {
    year: 2017,
    questionNumber: 4,
    section: 'A',
    subjectId: 'ess-int',
    marks: 125,
    text: 'Has the Non-Alignment Movement (NAM) lost its relevance in a multipolar world?',
    tags: ['Non-Alignment Movement', 'Multipolar World', 'Strategic Autonomy', 'Indian Foreign Policy', 'Global Order']
  },
  {
    year: 2017,
    questionNumber: 5,
    section: 'B',
    subjectId: 'ess-eth',
    marks: 125,
    text: 'Joy is the simplest form of gratitude.',
    tags: ['Gratitude & Joy', 'Contentment', 'Emotional Well-being', 'Positive Psychology', 'Spiritual Values']
  },
  {
    year: 2017,
    questionNumber: 6,
    section: 'B',
    subjectId: 'ess-soc',
    marks: 125,
    text: "Fulfillment of 'new woman' in India is a myth.",
    tags: ['Women Empowerment', 'Gender Inequality', 'Glass Ceiling', 'Dual Burden of Women', 'Social Realities']
  },
  {
    year: 2017,
    questionNumber: 7,
    section: 'B',
    subjectId: 'ess-sci',
    marks: 125,
    text: 'We may brave human laws but cannot resist natural laws.',
    tags: ['Ecological Limits', 'Natural Laws', 'Climate Retribution', 'Environmental Conservation', 'Human Hubris']
  },
  {
    year: 2017,
    questionNumber: 8,
    section: 'B',
    subjectId: 'ess-soc',
    marks: 125,
    text: "'Social media' is inherently a selfish medium.",
    tags: ['Social Media Narcissism', 'Digital Society', 'Echo Chambers', 'Online Behavior', 'Human Connection']
  },

  // ----------------------------------------------------
  // 2016
  // ----------------------------------------------------
  {
    year: 2016,
    questionNumber: 1,
    section: 'A',
    subjectId: 'ess-soc',
    marks: 125,
    text: 'If development is not engendered, it is endangered.',
    tags: ['Gender Mainstreaming', 'Mahbub ul Haq', 'Inclusive Growth', 'Women in Development', 'Human Development']
  },
  {
    year: 2016,
    questionNumber: 2,
    section: 'A',
    subjectId: 'ess-eth',
    marks: 125,
    text: 'Need brings greed, if greed increases it spoils breed.',
    tags: ['Greed vs Need', 'Consumerism', 'Moral Degradation', 'Generational Ethics', 'Gandhian Values']
  },
  {
    year: 2016,
    questionNumber: 3,
    section: 'A',
    subjectId: 'ess-pol',
    marks: 125,
    text: 'Water disputes between states in federal India.',
    tags: ['Inter-State Water Disputes', 'Cooperative Federalism', 'River Basin Management', 'Federal Governance', 'Resource Conflicts']
  },
  {
    year: 2016,
    questionNumber: 4,
    section: 'A',
    subjectId: 'ess-eco',
    marks: 125,
    text: 'Innovation is the key determinant of economic growth and social welfare.',
    tags: ['Innovation & Growth', 'Schumpeterian Economics', 'R&D Investment', 'Technological Progress', 'Social Welfare']
  },
  {
    year: 2016,
    questionNumber: 5,
    section: 'B',
    subjectId: 'ess-pol',
    marks: 125,
    text: 'Cooperative federalism: Myth or reality.',
    tags: ['Cooperative Federalism', 'Centre-State Dynamics', 'Competitive Federalism', 'Constitutional Balance', 'Inter-State Council']
  },
  {
    year: 2016,
    questionNumber: 6,
    section: 'B',
    subjectId: 'ess-sci',
    marks: 125,
    text: 'Cyberspace and internet: Blessing or curse to the human civilization in the long run.',
    tags: ['Cyberspace & Internet', 'Digital Revolution', 'Information Age', 'Cyber Threats', 'Future of Civilization']
  },
  {
    year: 2016,
    questionNumber: 7,
    section: 'B',
    subjectId: 'ess-eco',
    marks: 125,
    text: 'Near jobless growth in India: An anomaly or an outcome of economic reforms.',
    tags: ['Jobless Growth', 'Economic Reforms 1991', 'Demographic Dividend', 'Labour Markets', 'Manufacturing Sector']
  },
  {
    year: 2016,
    questionNumber: 8,
    section: 'B',
    subjectId: 'ess-eco',
    marks: 125,
    text: 'Digital economy: A leveller or a source of economic inequality.',
    tags: ['Digital Economy', 'Digital Divide', 'Financial Inclusion', 'Economic Inequality', 'Tech Monopoly']
  },

  // ----------------------------------------------------
  // 2015
  // ----------------------------------------------------
  {
    year: 2015,
    questionNumber: 1,
    section: 'A',
    subjectId: 'ess-soc',
    marks: 125,
    text: 'Lending hands to someone is better than giving a dole.',
    tags: ['Empowerment vs Charity', 'Capacity Building', 'Self-Reliance', 'Social Welfare Models', 'Poverty Alleviation']
  },
  {
    year: 2015,
    questionNumber: 2,
    section: 'A',
    subjectId: 'ess-phi',
    marks: 125,
    text: 'Quick but steady wins the race.',
    tags: ['Patience & Agility', 'Sustainable Progress', 'Strategic Execution', 'Resilience', 'Success Principles']
  },
  {
    year: 2015,
    questionNumber: 3,
    section: 'A',
    subjectId: 'ess-eth',
    marks: 125,
    text: 'Character of an institution is reflected in its leader.',
    tags: ['Institutional Leadership', 'Organizational Culture', 'Ethics in Leadership', 'Governance Integrity', 'Role Models']
  },
  {
    year: 2015,
    questionNumber: 4,
    section: 'A',
    subjectId: 'ess-cul',
    marks: 125,
    text: 'Education without values, as useful as it is, seems rather to make a man more clever devil.',
    tags: ['Value-Based Education', 'C.S. Lewis', 'Ethics & Morality', 'Character Formation', 'Misuse of Knowledge']
  },
  {
    year: 2015,
    questionNumber: 5,
    section: 'B',
    subjectId: 'ess-sci',
    marks: 125,
    text: 'Technology cannot replace manpower.',
    tags: ['Human Labour vs Machines', 'Artificial Intelligence', 'Dignity of Labour', 'Human Touch', 'Automation']
  },
  {
    year: 2015,
    questionNumber: 6,
    section: 'B',
    subjectId: 'ess-eth',
    marks: 125,
    text: 'Crisis faced in India – moral or economic.',
    tags: ['Moral vs Economic Crisis', 'Probity in Public Life', 'Ethical Foundations', 'Governance Deficit', 'Values Erosion']
  },
  {
    year: 2015,
    questionNumber: 7,
    section: 'B',
    subjectId: 'ess-pol',
    marks: 125,
    text: 'Dreams which should not let India sleep.',
    tags: ['Vision for India', 'A.P.J. Abdul Kalam', 'Youth Aspirations', 'Poverty Eradication', 'National Progress']
  },
  {
    year: 2015,
    questionNumber: 8,
    section: 'B',
    subjectId: 'ess-eco',
    marks: 125,
    text: 'Can capitalism bring inclusive growth?',
    tags: ['Capitalism & Inequality', 'Inclusive Growth', 'Wealth Distribution', 'Crony Capitalism', 'Welfare State']
  },

  // ----------------------------------------------------
  // 2014
  // ----------------------------------------------------
  {
    year: 2014,
    questionNumber: 1,
    section: 'A',
    subjectId: 'ess-eth',
    marks: 125,
    text: 'With greater power comes greater responsibility.',
    tags: ['Power & Accountability', 'Ethical Responsibility', 'Constitutional Trust', 'Leadership Duty', 'Probity']
  },
  {
    year: 2014,
    questionNumber: 2,
    section: 'A',
    subjectId: 'ess-soc',
    marks: 125,
    text: 'Is the growing level of competition good for the youth?',
    tags: ['Youth & Competition', 'Mental Stress', 'Excellence vs Anxiety', 'Cooperative Learning', 'Education System']
  },
  {
    year: 2014,
    questionNumber: 3,
    section: 'A',
    subjectId: 'ess-cul',
    marks: 125,
    text: 'Are the standardized tests good measure of academic ability or progress?',
    tags: ['Standardized Testing', 'Educational Assessment', 'Holistic Evaluation', 'Rote Learning vs Creativity', 'Pedagogy']
  },
  {
    year: 2014,
    questionNumber: 4,
    section: 'A',
    subjectId: 'ess-phi',
    marks: 125,
    text: 'Words are sharper than the two-edged sword.',
    tags: ['Power of Words', 'Rhetoric & Discourse', 'Free Speech & Responsibility', 'Harm of Propaganda', 'Communication Ethics']
  },
  {
    year: 2014,
    questionNumber: 5,
    section: 'B',
    subjectId: 'ess-pol',
    marks: 125,
    text: 'Was it the policy paralysis or the paralysis of implementation which slowed the growth of our country?',
    tags: ['Policy Paralysis', 'Bureaucratic Delays', 'Administrative Reforms', 'Governance Execution', 'Economic Stagnation']
  },
  {
    year: 2014,
    questionNumber: 6,
    section: 'B',
    subjectId: 'ess-pol',
    marks: 125,
    text: 'Is sting operation an invasion on privacy?',
    tags: ['Right to Privacy', 'Investigative Journalism', 'Sting Operations', 'Media Ethics', 'Public Interest']
  },
  {
    year: 2014,
    questionNumber: 7,
    section: 'B',
    subjectId: 'ess-cul',
    marks: 125,
    text: 'Fifty Golds in Olympics: Can this be a reality for India?',
    tags: ['Sports Development', 'Sports Infrastructure', 'Olympic Culture', 'Youth Potential', 'Grassroots Sports']
  },
  {
    year: 2014,
    questionNumber: 8,
    section: 'B',
    subjectId: 'ess-eco',
    marks: 125,
    text: 'Tourism: Can this be the next big thing for India?',
    tags: ['Tourism Potential', 'Eco-Tourism', 'Heritage Tourism', 'Job Creation', 'Economic Growth']
  },

  // ----------------------------------------------------
  // 2013
  // ----------------------------------------------------
  {
    year: 2013,
    questionNumber: 1,
    section: 'A',
    subjectId: 'ess-eth',
    marks: 125,
    text: '"Be the change you want to see in others" – Gandhiji.',
    tags: ['Mahatma Gandhi', 'Personal Integrity', 'Exemplary Leadership', 'Self-Reform', 'Moral Courage']
  },
  {
    year: 2013,
    questionNumber: 2,
    section: 'A',
    subjectId: 'ess-cul',
    marks: 125,
    text: 'Character of a nation is reflected in its people\'s ethos.',
    tags: ['National Character', 'Civic Sense', 'Cultural Ethos', 'Public Ethics', 'Moral Fabric']
  },
  {
    year: 2013,
    questionNumber: 3,
    section: 'A',
    subjectId: 'ess-soc',
    marks: 125,
    text: 'Is the Colonial mentality hindering India\'s success?',
    tags: ['Colonial Mentality', 'Decolonisation of Mind', 'Indigenous Systems', 'Self-Confidence', 'National Pride']
  },
  {
    year: 2013,
    questionNumber: 4,
    section: 'A',
    subjectId: 'ess-phi',
    marks: 125,
    text: 'Truth is the ultimate foundation of moral character.',
    tags: ['Truth & Morality', 'Satya', 'Ethical Foundations', 'Philosophical Truth', 'Integrity']
  },
  {
    year: 2013,
    questionNumber: 5,
    section: 'B',
    subjectId: 'ess-eco',
    marks: 125,
    text: 'GDP (Gross Domestic Product) along with GDH (Gross Domestic Happiness) would be the right indices for judging the well-being of a country.',
    tags: ['Gross Domestic Happiness', 'GDP & Well-Being', 'Beyond GDP', 'Human Development', 'Quality of Life']
  },
  {
    year: 2013,
    questionNumber: 6,
    section: 'B',
    subjectId: 'ess-sci',
    marks: 125,
    text: 'Science and Technology is the panacea for the growth and security of the nation.',
    tags: ['Science & National Power', 'Technological Self-Reliance', 'National Security', 'Innovation', 'Socio-Economic Development']
  },
  {
    year: 2013,
    questionNumber: 7,
    section: 'B',
    subjectId: 'ess-pol',
    marks: 125,
    text: 'Creation of smaller states and the consequent administrative and political implications.',
    tags: ['Reorganisation of States', 'Smaller States', 'Administrative Efficiency', 'Regional Aspirations', 'Federal Balance']
  },
  {
    year: 2013,
    questionNumber: 8,
    section: 'B',
    subjectId: 'ess-eco',
    marks: 125,
    text: 'Can capitalism bring inclusive growth in developing countries?',
    tags: ['Capitalism', 'Inclusive Growth', 'Market Economy vs Welfare', 'Inequality in Developing Nations', 'Sustainable Growth']
  }
];

module.exports = essayQuestions;
