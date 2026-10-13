// UPSC CSE Mains GS Paper 1 Questions (2013 - 2024)
// Total 240 questions: 20 questions per year (Q1-10: 10 marks, Q11-20: 15 marks)

const gs1Questions = [
  // ====================================================
  // 2024 (20 questions)
  // ====================================================
  {
    year: 2024,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs1-her',
    text: 'Highlight the significant changes in the sphere of society and economy from the Rigvedic to the later-Vedic period.',
    tags: ['Vedic Period', 'Ancient History', 'Rigvedic Society', 'Later Vedic Economy', 'Social Stratification']
  },
  {
    year: 2024,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs1-her',
    text: 'Assess the contribution of the Pallavas of Kanchi to the development of art and literature in South India.',
    tags: ['Pallava Dynasty', 'Dravidian Architecture', 'Mahabalipuram', 'Sanskrit & Tamil Literature', 'Temple Art']
  },
  {
    year: 2024,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs1-fre',
    text: 'Discuss the factors and circumstances that led to the Quit India Movement of 1942. How was it different from the earlier mass movements?',
    tags: ['Quit India Movement', '1942 Movement', 'Mahatma Gandhi', 'Cripps Mission', 'Freedom Movement']
  },
  {
    year: 2024,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs1-wh',
    text: 'To what extent did the First World War upset the existing balance of power in Europe and trigger new geopolitical configurations?',
    tags: ['World War I', 'Balance of Power', 'Treaty of Versailles', 'European Hegemony', 'Decolonisation']
  },
  {
    year: 2024,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'Distinguish between gender equality and women empowerment. Why is it essential to integrate gender considerations into the formulation and implementation of public policies in India?',
    tags: ['Gender Equality', 'Women Empowerment', 'Public Policy', 'Gender Budgeting', 'Social Justice']
  },
  {
    year: 2024,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'Analyze the emerging trends in inter-caste and inter-religious marriages in contemporary India. What are the key social obstacles hindering their broader acceptance?',
    tags: ['Inter-Caste Marriage', 'Caste System', 'Secularism in Society', 'Social Change', 'Honour Crimes']
  },
  {
    year: 2024,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'How does the collaboration among the government, non-governmental organizations (NGOs), and private corporate sectors contribute to addressing socio-economic developmental challenges in India?',
    tags: ['Civil Society', 'NGOs & Governance', 'CSR Initiatives', 'Public-Private Partnerships', 'Socio-Economic Development']
  },
  {
    year: 2024,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Explain the formation of aurora borealis and aurora australis. What are the geophysical and atmospheric triggers responsible for these phenomena?',
    tags: ['Auroras', 'Solar Wind', 'Magnetosphere', 'Atmospheric Physics', 'Geomagnetic Storms']
  },
  {
    year: 2024,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'What are "twisters"? Why is the region around the Gulf of Mexico particularly vulnerable to frequent and severe tornado occurrences?',
    tags: ['Tornadoes', 'Twisters', 'Gulf of Mexico', 'Atmospheric Instability', 'Severe Weather']
  },
  {
    year: 2024,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Examine the causes and consequences of declining groundwater potential in the Indo-Gangetic Plains. How does this threaten the long-term food security of India?',
    tags: ['Groundwater Depletion', 'Indo-Gangetic Plains', 'Food Security', 'Tube Well Irrigation', 'Water Resource Management']
  },
  {
    year: 2024,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs1-her',
    text: 'The art and architecture under the Imperial Cholas reached the zenith of Dravidian aesthetic perfection. Elaborate with suitable examples of temple architecture and bronze sculpture.',
    tags: ['Chola Dynasty', 'Brihadeeswarar Temple', 'Dravidian Architecture', 'Bronze Sculpture', 'Nataraja Iconography']
  },
  {
    year: 2024,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs1-mod',
    text: 'The Industrial Revolution in Britain acted as a double-edged sword for the traditional Indian cottage and textile industries. Critically evaluate the process of de-industrialization during the nineteenth century.',
    tags: ['De-industrialisation', 'British Economic Policy', 'Handicraft Decline', 'Drain of Wealth', 'Colonial Impact']
  },
  {
    year: 2024,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs1-fre',
    text: 'Subhas Chandra Bose\'s approach to achieving Indian independence was distinct from the Gandhian methodology, yet both complemented the ultimate national objective. Discuss.',
    tags: ['Subhas Chandra Bose', 'Mahatma Gandhi', 'Indian National Army', 'Ideological Divergence', 'Freedom Struggle']
  },
  {
    year: 2024,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs1-post',
    text: 'Examine the challenges encountered during the linguistic reorganization of Indian states in the 1950s. How did this reorganization strengthen national unity rather than weaken it?',
    tags: ['Linguistic Reorganisation', 'Fazal Ali Commission', 'States Reorganisation 1956', 'National Integration', 'Federal Unity']
  },
  {
    year: 2024,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Critically analyze how the underprivileged and marginalized sections in India continue to face challenges in accessing the benefits of affirmative action and welfare entitlements.',
    tags: ['Affirmative Action', 'Reservation Policy', 'Marginalised Communities', 'Social Justice', 'Structural Inequality']
  },
  {
    year: 2024,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'How has rapid globalization and urban labor market integration influenced personal freedom, marriage choices, and family structures among educated young women in urban India?',
    tags: ['Urbanisation & Women', 'Globalisation Impact', 'Family Structures', 'Nuclear Families', 'Women Autonomy']
  },
  {
    year: 2024,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'India is characterized by rich cultural diversities that often coincide with deep-seated socio-economic marginalities. Discuss how policy interventions can bridge this intersectional disparity.',
    tags: ['Cultural Diversity', 'Socio-Economic Disparities', 'Intersectional Deprivation', 'Tribal Welfare', 'Inclusive Development']
  },
  {
    year: 2024,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Explain the concept of "demographic winter". Are developed and middle-income nations moving irreversibly toward this phenomenon? Discuss its socio-economic ramifications.',
    tags: ['Demographic Winter', 'Total Fertility Rate', 'Ageing Population', 'Population Geography', 'Labour Shortages']
  },
  {
    year: 2024,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Account for the persistence of acute regional disparities in economic development across different states of India despite decades of planned regional planning.',
    tags: ['Regional Disparities', 'Special Category States', 'Industrial Clustering', 'Economic Geography', 'Balanced Regional Growth']
  },
  {
    year: 2024,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Discuss the factors responsible for the occurrence of flash floods in Himalayan river valleys and suggest comprehensive disaster mitigation and urban planning measures for mountain settlements.',
    tags: ['Flash Floods', 'Himalayan Ecology', 'Cloudbursts', 'Mountain Settlement Planning', 'Disaster Mitigation']
  },

  // ====================================================
  // 2023 (20 questions)
  // ====================================================
  {
    year: 2023,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs1-her',
    text: 'Explain the role of the geographical factors towards the development of Ancient India.',
    tags: ['Ancient India', 'Geographical Factors', 'River Valley Civilizations', 'Monsoon Influence', 'Frontier Passes']
  },
  {
    year: 2023,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs1-her',
    text: 'What was the difference between Mahatma Gandhi and Rabindranath Tagore in their approach towards education and nationalism?',
    tags: ['Mahatma Gandhi', 'Rabindranath Tagore', 'Nai Talim', 'Universalism vs Nationalism', 'Santiniketan']
  },
  {
    year: 2023,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs1-mod',
    text: 'Bring out the socio-economic effects of the introduction of railways in different countries of the world during the nineteenth century.',
    tags: ['Railways Impact', 'Industrial Revolution', 'World History', 'Economic Modernization', 'Colonial Infrastructure']
  },
  {
    year: 2023,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Discuss the consequences of climate change on the food security in tropical countries.',
    tags: ['Climate Change', 'Food Security', 'Tropical Agriculture', 'Crop Yields', 'Extreme Weather']
  },
  {
    year: 2023,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Why is the world today faced with a crisis of availability of and access to freshwater resources?',
    tags: ['Freshwater Crisis', 'Water Scarcity', 'Aquifer Depletion', 'Hydrological Cycle', 'Water Governance']
  },
  {
    year: 2023,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'How are the fjords formed? Why do they constitute some of the most picturesque areas of the world?',
    tags: ['Fjords', 'Glacial Landforms', 'Geomorphology', 'Coastal Landscapes', 'Norway & New Zealand']
  },
  {
    year: 2023,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Why is the South-West Monsoon called "Purvaiya" (easterly) in Bhojpur region? How has this directional seasonal wind system influenced the cultural ethos of the region?',
    tags: ['South-West Monsoon', 'Purvaiya', 'Bhojpur Culture', 'Monsoon Winds', 'Agrarian Folklore']
  },
  {
    year: 2023,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'Do you think marriage as a social institution is losing its value in modern India? Discuss with reasons.',
    tags: ['Institution of Marriage', 'Live-in Relationships', 'Modernity & Family', 'Divorce Trends', 'Social Change']
  },
  {
    year: 2023,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'Explain why suicide among young women is increasing in Indian society. Highlight the causative factors.',
    tags: ['Mental Health', 'Female Suicide Rates', 'Domestic Violence', 'Academic Stress', 'Patriarchal Pressure']
  },
  {
    year: 2023,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'Child cuddling is now being replaced by mobile phones. Discuss its impact on the socialization of children.',
    tags: ['Child Socialization', 'Digital Screen Addiction', 'Parenting in Digital Age', 'Emotional Development', 'Early Childhood']
  },
  {
    year: 2023,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs1-her',
    text: 'What are the main features of Vedic society and religion? Do you think some of the features are still prevailing in Indian society?',
    tags: ['Vedic Religion', 'Varna System', 'Rituals & Yagnas', 'Cultural Continuity', 'Hindu Philosophy']
  },
  {
    year: 2023,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs1-mod',
    text: 'What were the major technological changes introduced during the Sultanate period? How did those technological changes influence Indian society?',
    tags: ['Delhi Sultanate', 'Medieval Technology', 'Persian Wheel', 'Spinning Wheel', 'Paper Manufacturing']
  },
  {
    year: 2023,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs1-post',
    text: 'How did the colonial rule affect the tribals in India and what was the tribal response to the colonial oppression?',
    tags: ['Tribal Uprisings', 'Forest Acts', 'Santhal Rebellion', 'Birsa Munda', 'Colonial Exploitation']
  },
  {
    year: 2023,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Comment on the resource potentials of the long coastline of India and highlight the status of natural hazard preparedness in these areas.',
    tags: ['Coastal Resources', 'Blue Economy', 'Natural Hazards', 'Cyclone Preparedness', 'Coastal Zone Management']
  },
  {
    year: 2023,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Identify and discuss the factors responsible for diversity of natural vegetation in India and assess the significance of wildlife sanctuaries in rainforest regions.',
    tags: ['Natural Vegetation', 'Tropical Rainforests', 'Biomes of India', 'Wildlife Sanctuaries', 'Biodiversity Conservation']
  },
  {
    year: 2023,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs1-wh',
    text: 'Why did human development fail to keep pace with economic growth in many parts of the developing world post-WWII?',
    tags: ['Human Development', 'Economic Growth vs Development', 'Inequality', 'Amartya Sen', 'Post-War Development']
  },
  {
    year: 2023,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'From being a predominantly rural nation, India is experiencing urban transformation. Discuss the post-liberalization challenges of urbanization with special reference to slums.',
    tags: ['Urbanization in India', 'Slums & Housing', 'Urban Infrastructure', 'Smart Cities', 'Rural-Urban Migration']
  },
  {
    year: 2023,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Does caste hierarchy still determine the occupational choices and social mobility in modern India? Give reasons.',
    tags: ['Caste Mobility', 'Occupational Diversity', 'Affirmative Action', 'Dalit Capitalism', 'Modern Economy']
  },
  {
    year: 2023,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Analyze the impact of ethnic identities and communal consciousness on Indian secularism. How does constitutional morality resolve this tension?',
    tags: ['Communalism', 'Secularism in India', 'Constitutional Morality', 'Minority Rights', 'Social Cohesion']
  },
  {
    year: 2023,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Discuss the consequence of extreme weather events on agricultural yield and agrarian economies across the Indian subcontinent.',
    tags: ['Extreme Weather Events', 'Agrarian Economy', 'Crop Failure', 'Drought & Heatwaves', 'Climate Adaptation']
  },

  // ====================================================
  // 2022 (20 questions)
  // ====================================================
  {
    year: 2022,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs1-her',
    text: 'How will you explain that medieval Indian temple sculptures represent the social life of those days?',
    tags: ['Temple Sculptures', 'Medieval India', 'Social Life in Art', 'Khajuraho & Konark', 'Cultural Iconography']
  },
  {
    year: 2022,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs1-her',
    text: 'Why did the armies of the British East India Company – mostly comprising of Indian soldiers – win consistently against the more numerous and better equipped armies of the then Indian rulers? Give reasons.',
    tags: ['British East India Company', 'Military Organization', 'Battle of Plassey & Buxar', 'Discipline & Regular Pay', 'Colonial Conquest']
  },
  {
    year: 2022,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs1-mod',
    text: 'Why was there a sudden spurt in famines in colonial India since the mid-eighteenth century? Give reasons.',
    tags: ['Colonial Famines', 'Commercialisation of Agriculture', 'Drain of Wealth', 'Bengal Famine', 'Food Insecurity']
  },
  {
    year: 2022,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Describe the characteristics and types of primary rocks. Why are primary rocks significant in mineral wealth?',
    tags: ['Igneous Rocks', 'Primary Rocks', 'Mineral Wealth', 'Petrology', 'Earth Crust']
  },
  {
    year: 2022,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Discuss the meaning of colour-coded weather warnings for cyclone prone areas given by India Meteorological Department (IMD).',
    tags: ['IMD Warnings', 'Colour-Coded Weather Alerts', 'Cyclone Preparedness', 'Disaster Early Warning', 'Meteorology']
  },
  {
    year: 2022,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Discuss the natural resource potential of the "Deccan Trap" and its significance for the agro-industrial development of India.',
    tags: ['Deccan Trap', 'Black Soil (Regur)', 'Basaltic Lava', 'Cotton Cultivation', 'Agro-Industry']
  },
  {
    year: 2022,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Examine the potential of wind energy in India and explain the reasons for its limited spatial spread.',
    tags: ['Wind Energy Potential', 'Renewable Energy', 'Coastal Wind Turbines', 'Western Ghats', 'Energy Infrastructure']
  },
  {
    year: 2022,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'Explore the key characteristics of the "work from home" culture that emerged post-COVID-19 and analyze its impact on family relationships in India.',
    tags: ['Work from Home', 'Post-COVID Society', 'Family Dynamics', 'Work-Life Balance', 'Gender Roles']
  },
  {
    year: 2022,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'How is the growth of Tier 2 and Tier 3 cities giving rise to a new culture of consumption and urban lifestyle in India?',
    tags: ['Tier 2 and 3 Cities', 'Consumerism', 'Urbanisation', 'Aspirational India', 'Retail Revolution']
  },
  {
    year: 2022,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'Given the diversities among tribal communities in India, in which specific contexts should they be considered as a single category?',
    tags: ['Tribal Diversity', 'Scheduled Tribes', 'Fifth Schedule', 'Indigenous Rights', 'Cultural Identity']
  },
  {
    year: 2022,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs1-fre',
    text: 'The political and administrative reorganization of states and territories has been a continuous process since the mid-nineteenth century. Discuss with examples.',
    tags: ['Territorial Reorganisation', 'British Provinces', 'Integration of States', 'Sardar Patel', 'States Reorganisation']
  },
  {
    year: 2022,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs1-her',
    text: 'Discuss the main contributions of Gupta period and Chola period towards Indian heritage and culture.',
    tags: ['Gupta Golden Age', 'Chola Architecture', 'Classical Literature', 'Temple Sculpture', 'Indian Heritage']
  },
  {
    year: 2022,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs1-wh',
    text: 'Discuss the significance of the lion and bull figures in Indian mythology, art and architecture.',
    tags: ['Ashoka Pillar', 'Animal Motifs', 'Indus Valley Bull', 'Sarnath Capital', 'Indian Iconography']
  },
  {
    year: 2022,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'What are the forces that influence ocean currents? Describe their role in fishing industry of the world.',
    tags: ['Ocean Currents', 'Coriolis Force', 'Upwelling', 'Fishing Grounds', 'Grand Banks & Kuroshio']
  },
  {
    year: 2022,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Describing the distribution of rubber producing countries, indicate the major environmental issues faced by them.',
    tags: ['Rubber Cultivation', 'Plantation Agriculture', 'Southeast Asia', 'Deforestation', 'Monoculture Impacts']
  },
  {
    year: 2022,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Mention the significance of straits and isthmus in international trade. Illustrate with suitable global examples.',
    tags: ['Straits & Isthmus', 'Strait of Malacca', 'Suez Canal', 'Panama Isthmus', 'Maritime Chokepoints']
  },
  {
    year: 2022,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Troposphere is a very significant atmospheric layer that determines weather processes. How?',
    tags: ['Troposphere', 'Lapse Rate', 'Weather Phenomena', 'Atmospheric Circulation', 'Convection']
  },
  {
    year: 2022,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Analyze the salience of "sect" in Indian society. How does sect membership cut across caste barriers and create new social equations?',
    tags: ['Sects in India', 'Bhakti Sects', 'Lingayats', 'Social Stratification', 'Religious Pluralism']
  },
  {
    year: 2022,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Are tolerance, assimilation and pluralism the key elements in the making of an Indian form of secularism? Justify your answer.',
    tags: ['Indian Secularism', 'Pluralism', 'Sarva Dharma Sambhava', 'Tolerance', 'Constitutional Values']
  },
  {
    year: 2022,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Elucidate the relationship between globalization and new technology in the context of changing status of women in rural Indian households.',
    tags: ['Globalisation & Rural Women', 'Digital Literacy', 'SHGs', 'Feminisation of Agriculture', 'Rural Empowerment']
  },

  // ====================================================
  // 2021 (20 questions)
  // ====================================================
  {
    year: 2021,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs1-her',
    text: 'Evaluate the nature of the Bhakti Literature and its contribution to Indian culture.',
    tags: ['Bhakti Movement', 'Vernacular Literature', 'Kabir & Mirabai', 'Social Egalitarianism', 'Indian Culture']
  },
  {
    year: 2021,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs1-fre',
    text: 'Trace the rise and growth of socio-religious reform movements with special reference to Young Bengal and Brahmo Samaj.',
    tags: ['Socio-Religious Reform', 'Brahmo Samaj', 'Raja Ram Mohan Roy', 'Young Bengal Movement', 'Henry Derozio']
  },
  {
    year: 2021,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs1-mod',
    text: 'To what extent did the role of the Moderates prepare a base for the wider freedom movement in India? Analyze.',
    tags: ['Moderate Phase', 'Economic Drain Theory', 'Dadabhai Naoroji', 'Constitutional Agitation', 'Indian National Congress']
  },
  {
    year: 2021,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Differentiate the causes of landslides in the Himalayan region and Western Ghats.',
    tags: ['Landslides', 'Himalayas vs Western Ghats', 'Tectonic Instability', 'Anthropogenic Pressure', 'Disaster Vulnerability']
  },
  {
    year: 2021,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Mention the global occurrence of volcanic eruptions in 2021 and their impact on regional environment.',
    tags: ['Volcanic Eruptions', 'Ring of Fire', 'Atmospheric Cooling', 'Volcanic Ash', 'Geophysics']
  },
  {
    year: 2021,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Why is India considered as a subcontinent? Elaborate your answer with geographical arguments.',
    tags: ['Indian Subcontinent', 'Physiography', 'Geographical Isolation', 'Himalayan Barrier', 'Monsoonal Climate']
  },
  {
    year: 2021,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Briefly mention the alignment of major mountain ranges of the world and explain their impact on local weather conditions.',
    tags: ['Mountain Ranges', 'Orogenic Belts', 'Rain Shadow Effect', 'Orographic Precipitation', 'Local Winds']
  },
  {
    year: 2021,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'How does Indian society maintain continuity in traditional social values in the face of rapid globalization and modernization?',
    tags: ['Cultural Continuity', 'Tradition vs Modernity', 'Indian Social Values', 'Family System', 'Adaptability']
  },
  {
    year: 2021,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'What are the main socio-economic implications arising out of the development of IT hubs in major metropolitan cities of India?',
    tags: ['IT Hubs & Urbanisation', 'Urban Growth', 'Gentrification', 'Dual Economy', 'Real Estate Boom']
  },
  {
    year: 2021,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'Discuss the main objectives of Population Education and point out the measures to achieve them in India in detail.',
    tags: ['Population Education', 'Demographic Dividend', 'Reproductive Health', 'Family Welfare', 'Social Awareness']
  },
  {
    year: 2021,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs1-fre',
    text: 'Bring out the constructive programmes of Mahatma Gandhi during the Non-Cooperation Movement and Civil Disobedience Movement.',
    tags: ['Constructive Programme', 'Mahatma Gandhi', 'Khadi & Charkha', 'Removal of Untouchability', 'National Education']
  },
  {
    year: 2021,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs1-wh',
    text: '"There arose a serious challenge to the Democratic State System between the two World Wars." Evaluate the statement.',
    tags: ['Inter-war Period', 'Fascism & Nazism', 'Collapse of Democracy', 'Mussolini & Hitler', 'Totalitarianism']
  },
  {
    year: 2021,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Discuss the multi-dimensional implications of uneven distribution of mineral oil in the world.',
    tags: ['Mineral Oil Distribution', 'Petropolitics', 'OPEC', 'Energy Geopolitics', 'Resource Curse']
  },
  {
    year: 2021,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'What are the environmental implications of the reclamation of water bodies and wetlands in urban areas? Cite examples.',
    tags: ['Wetland Reclamation', 'Urban Flooding', 'Urban Lakes', 'Chennai Floods', 'Ecosystem Services']
  },
  {
    year: 2021,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'The process of desertification does not have climate boundaries. Justify with examples.',
    tags: ['Desertification', 'Land Degradation', 'UNCCD', 'Soil Erosion', 'Overgrazing']
  },
  {
    year: 2021,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'How do the melting of the Arctic ice and glaciers of the Antarctic differently affect the weather patterns and human activities on the Earth?',
    tags: ['Polar Ice Melt', 'Sea Level Rise', 'Jet Streams', 'Arctic Ocean Shipping', 'Global Climate Impacts']
  },
  {
    year: 2021,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Discuss whether the COVID-19 pandemic accelerated class inequalities and poverty in India.',
    tags: ['COVID-19 Impact', 'Economic Inequality', 'Migrant Crisis', 'Informal Economy', 'Oxfam Report']
  },
  {
    year: 2021,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Do you agree that regionalism in India appears to be a consequence of rising cultural assertiveness? Validate.',
    tags: ['Regionalism', 'Sub-national Identity', 'Cultural Assertiveness', 'Linguistic Politics', 'National Integration']
  },
  {
    year: 2021,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Critically examine whether growing cryptocurrency adoption and digital assets are creating a new form of digital divide among Indian youth.',
    tags: ['Digital Divide', 'Cryptocurrency', 'Financial Inclusion', 'Youth Economic Disparity', 'Digital Literacy']
  },
  {
    year: 2021,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Analyze the salience of customs and traditions in sustaining eco-friendly practices in tribal communities of India.',
    tags: ['Sacred Groves', 'Tribal Ecology', 'Indigenous Knowledge', 'Community Conservation', 'Sustainable Living']
  },

  // ====================================================
  // 2020 (20 questions)
  // ====================================================
  {
    year: 2020,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs1-her',
    text: 'The rock-cut architecture represents one of the most important sources of our knowledge of early Indian art and history. Discuss.',
    tags: ['Rock-Cut Architecture', 'Ajanta & Ellora', 'Barabar Caves', 'Chaityas & Viharas', 'Early Indian Art']
  },
  {
    year: 2020,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs1-her',
    text: 'Pala period is the most significant phase in the history of Buddhism in India. Enumerate.',
    tags: ['Pala Empire', 'Vajrayana Buddhism', 'Nalanda & Vikramashila', 'Buddhist Bronzes', 'Eastern Indian Art']
  },
  {
    year: 2020,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs1-mod',
    text: 'Evaluate the policies of Lord Curzon and their long-term implications on the national movement.',
    tags: ['Lord Curzon', 'Partition of Bengal 1905', 'Swadeshi Movement', 'Imperialist Policies', 'Indian Nationalism']
  },
  {
    year: 2020,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Discuss the geophysical characteristics of Circum-Pacific Zone.',
    tags: ['Ring of Fire', 'Circum-Pacific Belt', 'Plate Tectonics', 'Subduction Zones', 'Volcanoes & Earthquakes']
  },
  {
    year: 2020,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'The process of desertification does not have climate boundaries. Explain with examples.',
    tags: ['Desertification', 'Land Degradation', 'Deforestation', 'Over-cultivation', 'Arid Ecosystems']
  },
  {
    year: 2020,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'How will the melting of Himalayan glaciers have a far-reaching impact on the water resources of India?',
    tags: ['Himalayan Glaciers', 'Third Pole', 'River Runoff', 'Perennial Rivers', 'Glacial Lake Outburst Floods']
  },
  {
    year: 2020,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Account for the present location of iron and steel industries away from the source of raw material, by giving examples.',
    tags: ['Iron and Steel Industry', 'Industrial Location Theory', 'Weber Model', 'Coastal Steel Plants', 'Market Proximity']
  },
  {
    year: 2020,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'Has caste lost its relevance in understanding the multi-cultural Indian society? Elaborate your answer with illustrations.',
    tags: ['Caste in India', 'Multiculturalism', 'Social Stratification', 'Caste Politics', 'Urban Modernity']
  },
  {
    year: 2020,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'COVID-19 pandemic accelerated class inequalities and poverty in India. Comment.',
    tags: ['Class Inequality', 'Poverty', 'COVID-19 Impact', 'Vulnerable Sections', 'Informal Labour']
  },
  {
    year: 2020,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'Do you agree that regionalism in India appears to be a consequence of rising cultural assertiveness? Validate.',
    tags: ['Regionalism', 'Cultural Assertiveness', 'Linguistic Movements', 'Federal Tensions', 'Identity Politics']
  },
  {
    year: 2020,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs1-her',
    text: 'Indian philosophy and tradition played a significant role in conceiving and shaping the monuments and their art in India. Discuss.',
    tags: ['Indian Philosophy', 'Buddhist Stupa', 'Hindu Temple Architecture', 'Mandala Concept', 'Cosmic Symbolism']
  },
  {
    year: 2020,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs1-her',
    text: 'Persian literary sources of medieval India reflect the spirit of the age. Comment.',
    tags: ['Persian Sources', 'Baburnama & Ain-i-Akbari', 'Abul Fazl', 'Medieval Historiography', 'Court Chronicles']
  },
  {
    year: 2020,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs1-fre',
    text: 'Since the decade of the 1920s, the national movement acquired various ideological strands and thereby expanded its social base. Discuss.',
    tags: ['National Movement 1920s', 'Socialist Ideology', 'Trade Union Movement', 'Kisan Sabha', 'Revolutionary Youth']
  },
  {
    year: 2020,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'The interlinking of rivers can provide viable solutions to the multi-dimensional inter-related problems of droughts, floods and interrupted navigation. Critically examine.',
    tags: ['Interlinking of Rivers', 'Ken-Betwa Link', 'National River Linking Project', 'Flood & Drought Mitigation', 'Ecological Concerns']
  },
  {
    year: 2020,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Account for the huge flooding of million cities in India including the smart ones like Hyderabad and Pune. Suggest lasting remedial measures.',
    tags: ['Urban Flooding', 'Stormwater Drainage', 'Hyderabad & Pune Floods', 'Encroachment of Wetlands', 'Sponge Cities']
  },
  {
    year: 2020,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'India has immense potential of solar energy though there are regional variations in its developments. Elaborate.',
    tags: ['Solar Energy Potential', 'National Solar Mission', 'Regional Variations', 'Thar Desert', 'Rooftop Solar']
  },
  {
    year: 2020,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Examine the status of forest resources of India and its resultant impact on climate change.',
    tags: ['Forest Resources of India', 'State of Forest Report', 'Carbon Sink', 'Afforestation', 'Biodiversity']
  },
  {
    year: 2020,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Is diversity and pluralism under threat due to the globalization in Indian context? Justify your answer.',
    tags: ['Diversity & Pluralism', 'Globalisation', 'Cultural Homogenisation', 'Glocalisation', 'Indian Heritage']
  },
  {
    year: 2020,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Customs and traditions suppress reason leading to obscurantism. Do you agree?',
    tags: ['Tradition vs Reason', 'Scientific Temper', 'Social Reform', 'Obscurantism', 'Raja Ram Mohan Roy']
  },
  {
    year: 2020,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'How have digital technologies affected the social fabric of rural communities in India? Analyze both positive and negative consequences.',
    tags: ['Digital Infiltration', 'Rural Society', 'BharatNet', 'Smartphone Adoption', 'Social Isolation vs Connectivity']
  },

  // ====================================================
  // 2019 (20 questions)
  // ====================================================
  {
    year: 2019,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs1-her',
    text: 'Highlight the Central Asian and Greco-Bactrian elements in the Gandhara art.',
    tags: ['Gandhara Art', 'Greco-Bactrian Art', 'Kushan Empire', 'Buddha Drapery', 'Central Asian Influence']
  },
  {
    year: 2019,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs1-fre',
    text: 'The 1857 Uprising was the culmination of the recurrent big and small local rebellions that had occurred in the preceding hundred years of British rule. Elucidate.',
    tags: ['1857 Revolt', 'Peasant & Tribal Rebellions', 'Sannyasi Revolt', 'Paika Rebellion', 'Colonial Discontent']
  },
  {
    year: 2019,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs1-wh',
    text: 'Explain how the foundations of the modern world were laid by the American and French Revolutions.',
    tags: ['American Revolution', 'French Revolution', 'Liberty, Equality, Fraternity', 'Democracy & Constitutionalism', 'Modern World']
  },
  {
    year: 2019,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'What is water stress? How and why does it differ regionally in India?',
    tags: ['Water Stress', 'NITI Aayog Composite Water Index', 'Groundwater Depletion', 'Monsoon Variability', 'Regional Disparity']
  },
  {
    year: 2019,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'How can the mountain ecosystem be restored from the negative impact of development initiatives and tourism?',
    tags: ['Mountain Ecosystem', 'Himalayan Ecology', 'Eco-Tourism', 'Carrying Capacity', 'Sustainable Mountain Development']
  },
  {
    year: 2019,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'How is efficient and affordable urban public transport key to the rapid economic development of India?',
    tags: ['Urban Public Transport', 'Metro Rail & BRTS', 'Transit Oriented Development', 'Urban Economy', 'Decarbonisation']
  },
  {
    year: 2019,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'How do ocean currents and water masses differ in their impacts on marine life and the coastal environment? Give suitable examples.',
    tags: ['Ocean Currents', 'Water Masses', 'Marine Ecosystem', 'Nutrient Upwelling', 'Coral Reefs']
  },
  {
    year: 2019,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'Do we have cultural pockets of small India all over the nation? Elaborate with examples from modern urban centers.',
    tags: ['Mini-Indias', 'Internal Migration', 'Urban Cosmopolitanism', 'Cultural Enclaves', 'National Integration']
  },
  {
    year: 2019,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'What are the continued challenges for Women\'s Movement in India with special reference to patriarchal mindset?',
    tags: ['Women Movement', 'Patriarchal Mindset', 'Gender Stereotypes', 'Domestic Violence', 'Women in Leadership']
  },
  {
    year: 2019,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'Are we losing our local identity for the global identity? Discuss with illustrations.',
    tags: ['Local vs Global Identity', 'Cultural Homogenisation', 'Globalisation', 'Indigenous Traditions', 'Glocalisation']
  },
  {
    year: 2019,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs1-fre',
    text: 'Many voices had strengthened and enriched the nationalist movement during the Gandhian phase. Elaborate.',
    tags: ['Gandhian Phase', 'Women in Freedom Struggle', 'Working Class Movements', 'Dalit Voices & Ambedkar', 'Tribal Participation']
  },
  {
    year: 2019,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs1-mod',
    text: 'Assess the significance of the coastal regions in early modern Indian history, particularly during European maritime expansion.',
    tags: ['Maritime History', 'European Trading Posts', 'Surat, Calicut & Masulipatnam', 'Naval Power', 'Early Modern Commerce']
  },
  {
    year: 2019,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Assess the impact of global warming on the coral life system with examples from different parts of the world.',
    tags: ['Coral Bleaching', 'Ocean Acidification', 'Great Barrier Reef', 'Marine Heatwaves', 'Coral Reef Ecosystems']
  },
  {
    year: 2019,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Discuss the causes of depletion of mangroves and explain their importance in maintaining coastal ecology.',
    tags: ['Mangroves Conservation', 'Sundarbans', 'Coastal Protection', 'Cyclone Buffers', 'Ecosystem Services']
  },
  {
    year: 2019,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Can the strategy of chemical fertilizers and high-yielding varieties continue to ensure long-term food security in India? Discuss alternative ecological farming models.',
    tags: ['Chemical Fertilizers', 'Soil Degradation', 'Natural Farming (ZBNF)', 'Ecological Agriculture', 'Food Security']
  },
  {
    year: 2019,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'What is the role of solar energy in transforming rural Indian livelihoods? Discuss.',
    tags: ['Solar Energy', 'PM KUSUM', 'Rural Electrification', 'Decentralized Renewable Energy', 'Agrarian Productivity']
  },
  {
    year: 2019,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Customs and traditions suppress reason leading to obscurantism. Do you agree?',
    tags: ['Tradition vs Reason', 'Social Reform', 'Superstitions', 'Scientific Temper', 'Rationality']
  },
  {
    year: 2019,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Empowering women is the key to control population growth. Discuss.',
    tags: ['Women Empowerment', 'Fertility Rates', 'Female Literacy', 'Family Planning', 'Demographic Transition']
  },
  {
    year: 2019,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'What are the challenges to our cultural practices in the name of secularism?',
    tags: ['Secularism vs Tradition', 'Religious Practices', 'Judicial Interventions', 'Sabarimala Issue', 'Constitutional Morality']
  },
  {
    year: 2019,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Communalism arises either due to power struggle or relative deprivation. Argue by giving suitable illustrations from post-independence India.',
    tags: ['Communalism', 'Relative Deprivation', 'Identity Politics', 'Vote Bank Politics', 'Social Conflict']
  },

  // ====================================================
  // 2018 (20 questions)
  // ====================================================
  {
    year: 2018,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs1-her',
    text: 'Safeguarding the Indian art heritage is the need of the moment. Discuss.',
    tags: ['Art Heritage Conservation', 'Antiquities Act', 'ASI', 'Illicit Trafficking', 'Cultural Preservation']
  },
  {
    year: 2018,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs1-her',
    text: 'Assess the importance of the accounts of the Chinese and Arab travellers in the reconstruction of the history of India.',
    tags: ['Travelogue Literature', 'Hiuen Tsang & Fa-Hien', 'Al-Biruni & Ibn Battuta', 'Ancient & Medieval History', 'Historiography']
  },
  {
    year: 2018,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs1-fre',
    text: 'Throw light on the significance of the thoughts of Mahatma Gandhi in the present day.',
    tags: ['Gandhian Thought', 'Satyagraha & Ahimsa', 'Sarvodaya', 'Trusteeship', 'Contemporary Relevance']
  },
  {
    year: 2018,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Why is Indian Regional Navigation Satellite System (IRNSS) needed? How does it help in navigation?',
    tags: ['NavIC / IRNSS', 'Satellite Navigation', 'Geospatial Technology', 'Disaster Management', 'Strategic Autonomy']
  },
  {
    year: 2018,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Why is the South-West Monsoon called "Purvaiya" in Bhojpur region? How has this wind influenced the cultural ethos of the region?',
    tags: ['Bhojpur Region', 'Purvaiya', 'South-West Monsoon', 'Folk Culture', 'Agrarian Life']
  },
  {
    year: 2018,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Define mantle plume and explain its role in plate tectonics.',
    tags: ['Mantle Plume', 'Hotspots', 'Plate Tectonics', 'Deccan Traps Formation', 'Hawaii Volcanism']
  },
  {
    year: 2018,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'What are the consequences of spreading of "Dead Zones" on marine ecosystems?',
    tags: ['Dead Zones', 'Ocean Hypoxia', 'Eutrophication', 'Agricultural Runoff', 'Marine Ecology']
  },
  {
    year: 2018,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs1-soc',
    text: '"Caste system is assuming new identities and associational forms. Hence, caste system cannot be eradicated in India." Comment.',
    tags: ['Caste Associations', 'Caste Mobilization', 'Identity Politics', 'Modern Caste Forms', 'Social Stratification']
  },
  {
    year: 2018,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs1-soc',
    text: '\'Despite comprehensive policies for inclusive growth, the poverty lines in India fail to reflect the real destitution.\' Discuss.',
    tags: ['Poverty Estimation', 'Tendulkar Committee', 'Multidimensional Poverty', 'Inequality', 'Social Deprivation']
  },
  {
    year: 2018,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'How does the women\'s movement in contemporary India differ from the nineteenth-century social reform movement concerning women?',
    tags: ['Women Movement', '19th Century Reform', 'Agency of Women', 'Feminist Consciousness', 'Social Transformation']
  },
  {
    year: 2018,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs1-her',
    text: 'The Bhakti movement received a remarkable re-orientation with the advent of Chaitanya Mahaprabhu. Discuss.',
    tags: ['Chaitanya Mahaprabhu', 'Gaudiya Vaishnavism', 'Kirtan Tradition', 'Bhakti Reorientation', 'Bengal Culture']
  },
  {
    year: 2018,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs1-wh',
    text: 'Why did the industrial revolution first occur in England? Discuss the quality of life of the people there during the industrialization. How does it compare with that in India at present?',
    tags: ['Industrial Revolution', 'Why Britain First', 'Working Class Conditions', 'Urban Squats', 'Comparative Development']
  },
  {
    year: 2018,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs1-fre',
    text: 'To what extent did the Quit India Movement solidify the mass character of the Indian National Movement? Analyze.',
    tags: ['Quit India Movement', 'Mass Mobilization', 'Underground Resistance', 'Parallel Governments', 'Decisive Struggle']
  },
  {
    year: 2018,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'What are the viable alternative technologies to combat stubble burning in northwestern India?',
    tags: ['Stubble Burning', 'Crop Residue Management', 'Happy Seeder', 'Pusa Bio-Decomposer', 'Air Pollution in NCR']
  },
  {
    year: 2018,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Define and explain the significance of "Sea Surface Temperature" (SST) in the formation and intensity of tropical cyclones.',
    tags: ['Sea Surface Temperature', 'Tropical Cyclones', 'Bay of Bengal', 'Cyclone Intensification', 'Ocean Warming']
  },
  {
    year: 2018,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'What is the spatial pattern of distribution of iron and steel industries in India? Why are mini steel plants gaining prominence?',
    tags: ['Iron and Steel Distribution', 'Chota Nagpur Plateau', 'Mini Steel Plants', 'Electric Arc Furnaces', 'Secondary Steel']
  },
  {
    year: 2018,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Assess the impact of climate change on the hydrological cycle in India.',
    tags: ['Hydrological Cycle', 'Precipitation Patterns', 'Glacier Retreat', 'Groundwater Recharge', 'Climate Change']
  },
  {
    year: 2018,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs1-soc',
    text: '"Globalization has dramatically transformed communal identities into transnational communities." Critically analyze with reference to the Indian diaspora.',
    tags: ['Indian Diaspora', 'Transnational Communities', 'Soft Power', 'Cultural Identity Abroad', 'Globalisation']
  },
  {
    year: 2018,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'How is communalism different from secularism in practice in India? Does competitive politics promote communal polarization?',
    tags: ['Communalism vs Secularism', 'Electoral Polarization', 'Identity Politics', 'Social Cohesion', 'Majoritarianism vs Minoritism']
  },
  {
    year: 2018,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Discuss the concept of smart cities in India and evaluate whether it promotes inclusive urban spaces or intensifies spatial segregation.',
    tags: ['Smart Cities Mission', 'Spatial Segregation', 'Urban Inclusivity', 'Urban Gentrification', 'Slum Redevelopment']
  },

  // ====================================================
  // 2017 (20 questions)
  // ====================================================
  {
    year: 2017,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs1-her',
    text: 'How do you justify the view that the level of excellence of the Gupta numismatic art is not at all noticeable in later times?',
    tags: ['Gupta Coinage', 'Numismatics', 'Gold Dinars', 'Metallurgy', 'Ancient Art Excellence']
  },
  {
    year: 2017,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs1-mod',
    text: 'Clarify how mid-eighteenth century India was beset with the spectre of a fragmented polity.',
    tags: ['18th Century India', 'Mughal Decline', 'Successor States', 'Maratha Confederacy', 'Fragmentation']
  },
  {
    year: 2017,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs1-wh',
    text: 'Why did the Moderates fail to carry precision about their political goals and methods during the early phase of the Congress?',
    tags: ['Early Congress', 'Moderates', 'Pray, Petition & Protest', 'Constitutional Limits', 'Socio-Political Base']
  },
  {
    year: 2017,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs1-wh',
    text: 'What problems were germane to the decolonization process in the Malay Peninsula?',
    tags: ['Decolonization in Malaya', 'Malayan Emergency', 'Ethnic Pluralism', 'British Colonialism', 'Southeast Asia']
  },
  {
    year: 2017,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'How does the cryosphere influence global climate?',
    tags: ['Cryosphere', 'Albedo Effect', 'Polar Ice Caps', 'Sea Level Rise', 'Climate Feedback Loops']
  },
  {
    year: 2017,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'In spite of adverse environmental impacts, coal mining is still inevitable for development. Discuss.',
    tags: ['Coal Mining', 'Thermal Power', 'Energy Security', 'Environmental Degradation', 'Just Transition']
  },
  {
    year: 2017,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Mention the advantages of the cultivation of pulses because of which the year 2016 was celebrated as the International Year of Pulses by the United Nations.',
    tags: ['Pulses Cultivation', 'Nitrogen Fixation', 'Soil Health', 'Nutritional Security', 'Dryland Agriculture']
  },
  {
    year: 2017,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'In the context of the diversity of India, can it be said that the regions form cultural units rather than the states? Elaborate with examples.',
    tags: ['Cultural Regions', 'Linguistic States', 'Regional Diversity', 'Bhojpur, Mithila, Saurashtra', 'Composite Culture']
  },
  {
    year: 2017,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'What are the the two major legal initiatives by the State since Independence addressing discrimination against Scheduled Tribes (STs)?',
    tags: ['Scheduled Tribes Protection', 'Forest Rights Act (FRA)', 'SC/ST Prevention of Atrocities Act', 'Fifth & Sixth Schedules', 'Tribal Justice']
  },
  {
    year: 2017,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'The spirit of tolerance and love is not only an interesting feature of Indian society from very early times, but it is also playing an important part at the present. Elaborate.',
    tags: ['Tolerance & Pluralism', 'Vasudhaiva Kutumbakam', 'Syncretic Traditions', 'Bhakti & Sufi', 'Social Cohesion']
  },
  {
    year: 2017,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs1-her',
    text: 'The temple architecture of the Kakatiyas displays a unique blend of Chalukyan and Dravidian architectural traditions. Analyze with reference to Ramappa Temple.',
    tags: ['Kakatiya Architecture', 'Ramappa Temple', 'Sandbox Technique', 'Vesara Influence', 'Deccan Heritage']
  },
  {
    year: 2017,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs1-fre',
    text: 'Highlight the differences in the approach of Subhas Chandra Bose and Mahatma Gandhi in the struggle for India\'s freedom.',
    tags: ['Subhas Chandra Bose', 'Mahatma Gandhi', 'INA', 'Militant vs Non-violent Struggle', 'Nationalism']
  },
  {
    year: 2017,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs1-post',
    text: 'Has the formation of linguistic States strengthened the cause of Indian unity? Critically examine.',
    tags: ['Linguistic States', 'National Integration', 'SRC 1956', 'Cultural Sub-nationalism', 'Federal Strength']
  },
  {
    year: 2017,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Account for the variations in oceanic salinity and discuss its multi-dimensional effects.',
    tags: ['Ocean Salinity', 'Halocline', 'Thermohaline Circulation', 'Evaporation & Precipitation', 'Marine Ecosystem']
  },
  {
    year: 2017,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Petroleum refineries are not necessarily located nearer to crude oil producing areas, particularly in developing countries. Explain its implications.',
    tags: ['Petroleum Refineries', 'Market-oriented Refineries', 'Coastal Refineries', 'Transport Logistics', 'Energy Economy']
  },
  {
    year: 2017,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'In what way can flood control be linked to drought mitigation? Discuss in the context of major river basins of India.',
    tags: ['Flood Control', 'Drought Mitigation', 'River Basin Management', 'Canal Reservoirs', 'Integrated Water Management']
  },
  {
    year: 2017,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'What characteristics can be assigned to monsoon climate that succeeds in feeding more than 50 percent of the world population residing in Monsoon Asia?',
    tags: ['Monsoon Asia', 'Wet Rice Agriculture', 'Seasonal Reversal of Winds', 'Agrarian Geography', 'Food Security']
  },
  {
    year: 2017,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs1-soc',
    text: '"The growth of cities as hubs of development has resulted in their growth as hubs of squalor and deprivation." Critically evaluate.',
    tags: ['Urban Deprivation', 'Slums Growth', 'Urban Squalor', 'Inequality in Cities', 'Basic Services Deficit']
  },
  {
    year: 2017,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Analyze the causes for the declining sex ratio in India and examine the socio-cultural factors responsible for son meta-preference.',
    tags: ['Child Sex Ratio', 'Son Meta-Preference', 'Economic Survey 2018', 'Female Foeticide', 'Beti Bachao Beti Padhao']
  },
  {
    year: 2017,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Distinguish between religiousness/religiosity and communalism giving one example of how the former has got transformed into the latter in independent India.',
    tags: ['Religiosity vs Communalism', 'Identity Politics', 'Communal Mobilization', 'Religious Festivals & Politics', 'Social Harmony']
  },

  // ====================================================
  // 2016 (20 questions)
  // ====================================================
  {
    year: 2016,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs1-her',
    text: 'Early Buddhist Stupa-art, while depicting folk motifs and narratives, successfully expounds Buddhist ideals. Elucidate.',
    tags: ['Buddhist Stupa Art', 'Sanchi & Bharhut', 'Jataka Tales', 'Folk Motifs', 'Buddhist Symbolism']
  },
  {
    year: 2016,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs1-her',
    text: 'Krishnadeva Raya, the King of Vijayanagar, was not only an accomplished scholar himself but was also a great patron of learning and literature. Discuss.',
    tags: ['Krishnadeva Raya', 'Vijayanagara Empire', 'Amuktamalyada', 'Ashtadiggajas', 'Telugu Literature']
  },
  {
    year: 2016,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs1-wh',
    text: 'Explain how the uprising of 1857 constituted an important watershed in the evolution of British policies towards colonial India.',
    tags: ['1857 Watershed', 'Queen Victoria Proclamation', 'Government of India Act 1858', 'Army Reorganisation', 'British Colonial Policy']
  },
  {
    year: 2016,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs1-wh',
    text: 'Discuss the role of women in the freedom struggle especially during the Gandhian phase.',
    tags: ['Women in Freedom Struggle', 'Sarojini Naidu', 'Usha Mehta', 'Non-Cooperation Movement', 'Civil Disobedience']
  },
  {
    year: 2016,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs1-mod',
    text: 'Highlight the differences in the approach of revolutionaries from that of the constitutionalists in the Indian national movement.',
    tags: ['Revolutionary Movement', 'Bhagat Singh & HSRA', 'Constitutionalists', 'Means vs Ends', 'Armed Struggle vs Agitation']
  },
  {
    year: 2016,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs1-wh',
    text: 'The anti-colonial struggles in West Africa were led by the new elite of Western-educated Africans. Examine.',
    tags: ['West African Decolonization', 'Pan-Africanism', 'Kwame Nkrumah', 'Western Educated Elite', 'World History']
  },
  {
    year: 2016,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'How does the draft National Water Policy 2016 address the challenges of water governance in India?',
    tags: ['National Water Policy', 'Water Governance', 'River Basin Management', 'Groundwater Over-extraction', 'Water Conservation']
  },
  {
    year: 2016,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Enumerate the problems and prospects of inland water transport in India.',
    tags: ['Inland Water Transport', 'National Waterways Act', 'Inland Waterways Authority', 'Logistics Cost', 'River Dredging']
  },
  {
    year: 2016,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'In what way Micro-watershed development projects help in water conservation in drought-prone and semi-arid regions of India?',
    tags: ['Watershed Development', 'Check Dams & Farm Ponds', 'Soil Moisture', 'Drought-Prone Areas', 'Ralegan Siddhi']
  },
  {
    year: 2016,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'Has the Indian caste system been weakened by modern education and industrialization? Critically assess.',
    tags: ['Caste System Decline', 'Modern Education', 'Urbanization & Caste', 'Caste Consciousness', 'Social Mobility']
  },
  {
    year: 2016,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs1-her',
    text: 'Assess the contributions of Vijayanagara architecture with special reference to Hampi monuments.',
    tags: ['Vijayanagara Architecture', 'Hampi', 'Virupaksha Temple', 'Kalyana Mandapa', 'Stone Chariot']
  },
  {
    year: 2016,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs1-fre',
    text: 'Explain the circumstances that led to the partition of India. Could it have been avoided?',
    tags: ['Partition of India', 'Cabinet Mission', 'Direct Action Day', 'Mountbatten Plan', 'Communal Politics']
  },
  {
    year: 2016,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs1-post',
    text: 'Critically examine the role of Sardar Vallabhbhai Patel in the integration of princely states into the Indian Union.',
    tags: ['Sardar Vallabhbhai Patel', 'Integration of Princely States', 'Instrument of Accession', 'Junagadh & Hyderabad', 'Bismarck of India']
  },
  {
    year: 2016,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Major hot deserts in northern hemisphere are located between 20-30 degree north and on the western side of the continents. Why?',
    tags: ['Deserts Location', 'Subtropical High Pressure', 'Trade Winds', 'Cold Ocean Currents', 'Off-shore Winds']
  },
  {
    year: 2016,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Bring out the causes for the more frequent occurrences of landslides in the Himalayas than in the Western Ghats.',
    tags: ['Landslides Comparison', 'Himalayas vs Western Ghats', 'Young Fold Mountains', 'Seismic Activity', 'Slope Instability']
  },
  {
    year: 2016,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'The effective management of flood hazards in India depends upon dynamic understanding of river hydrology. Discuss.',
    tags: ['Flood Hazard Management', 'River Hydrology', 'Embankments & Reservoirs', 'CWC Early Warnings', 'Disaster Mitigation']
  },
  {
    year: 2016,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'The spatial distribution of smart cities in India reveals regional biases. Critically analyze.',
    tags: ['Smart Cities Distribution', 'Regional Disparities', 'Urban Policy', 'Industrial Corridors', 'Balanced Regional Development']
  },
  {
    year: 2016,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'To what extent globalization has influenced the core values of Indian family system? Give illustrations.',
    tags: ['Indian Family System', 'Nuclearisation of Families', 'Elderly Care', 'Globalisation', 'Individualism vs Collectivism']
  },
  {
    year: 2016,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Why are the tribals in India referred to as Scheduled Tribes? Indicate the major characteristics of tribal communities.',
    tags: ['Scheduled Tribes Criteria', 'Fifth & Sixth Schedules', 'Primitive Traits', 'Geographical Isolation', 'Article 342']
  },
  {
    year: 2016,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Critically examine whether diversity in India is a source of national strength or a catalyst for socio-political divisiveness.',
    tags: ['Diversity in India', 'Unity in Diversity', 'Ethnic Assertiveness', 'Pluralism', 'Nation-State Building']
  },

  // ====================================================
  // 2015 (20 questions)
  // ====================================================
  {
    year: 2015,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs1-her',
    text: 'The ancient civilization in Indian sub-continent differed from those of Egypt, Mesopotamia and Greece in that its culture and traditions have been preserved without a breakdown to the present day. Comment.',
    tags: ['Continuity of Indian Culture', 'Indus Valley vs Mesopotamia', 'Vedic Traditions', 'Living Civilisation', 'Cultural Heritage']
  },
  {
    year: 2015,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs1-her',
    text: 'Mesolithic rock architecture of India not only reflects the cultural life of the times but also a fine aesthetic sense comparable to modern painting. Critically evaluate this comment.',
    tags: ['Bhimbetka Caves', 'Mesolithic Rock Art', 'Prehistoric Aesthetics', 'Hunting Scenes', 'Pigments & Ochre']
  },
  {
    year: 2015,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs1-mod',
    text: 'How different would have been the achievement of Indian independence without Mahatma Gandhi? Discuss.',
    tags: ['Mahatma Gandhi', 'Mass Nationalism', 'Ahimsa & Satyagraha', 'Alternative Leadership', 'Freedom Struggle']
  },
  {
    year: 2015,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs1-wh',
    text: 'Why did the New Economic Policy (NEP) introduced by Lenin in 1921 represent a tactical retreat in Soviet Russia?',
    tags: ['Lenin New Economic Policy', 'War Communism', 'Soviet Russia', 'Tactical Retreat', 'State Capitalism']
  },
  {
    year: 2015,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Explain the formation of thousands of islands in Indonesian and Philippines archipelagos.',
    tags: ['Island Arcs', 'Subduction & Volcanism', 'Indonesian Archipelago', 'Plate Tectonics', 'Pacific Ring of Fire']
  },
  {
    year: 2015,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Tropical cyclones are largely confined to South China Sea, Bay of Bengal and Gulf of Mexico. Why?',
    tags: ['Tropical Cyclones Formation', 'Coriolis Force', 'Warm Ocean Waters', 'Atmospheric Disturbances', 'Bay of Bengal']
  },
  {
    year: 2015,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Bring out the relationship between the shrinking Himalayan glaciers and the symptoms of climate change in the sub-continent.',
    tags: ['Himalayan Glaciers Shrinking', 'Climate Change Indicators', 'Ganga & Brahmaputra Discharge', 'Flash Floods', 'GLOFs']
  },
  {
    year: 2015,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'Discuss the changes in the trends of composition and growth of India\'s population since 1951.',
    tags: ['Population Growth Trends', 'Census of India', 'Demographic Transition', 'Fertility Decline', 'Sex Ratio Trends']
  },
  {
    year: 2015,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'Critically examine whether growing urbanization necessarily results in the breakdown of joint family system in India.',
    tags: ['Joint Family System', 'Urbanisation & Family', 'Modified Nuclear Families', 'Kinship Ties', 'Social Change']
  },
  {
    year: 2015,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'Discuss the positive and negative effects of globalization on women in India.',
    tags: ['Globalisation on Women', 'Employment in Services', 'Feminisation of Poverty', 'Consumerism', 'Autonomy']
  },
  {
    year: 2015,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs1-her',
    text: 'Taxila university was one of the oldest universities of the ancient world with which were associated a number of renowned personalities of different disciplines. Its strategic location contributed to its glory. Discuss.',
    tags: ['Taxila University', 'Gandhara Civilization', 'Chanakya & Panini', 'Ancient Education', 'Silk Route Node']
  },
  {
    year: 2015,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs1-fre',
    text: 'It would have been difficult for the Constituent Assembly to complete its historic task of drafting the Constitution for independent India without the prior constitutional experiments under the British rule. Discuss.',
    tags: ['Constitutional Experiments', 'Government of India Act 1935', 'Constituent Assembly', 'Nehru Report', 'Colonial Legacy']
  },
  {
    year: 2015,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs1-post',
    text: 'Has the green revolution been accompanied by regional and social disparities in India? Explain.',
    tags: ['Green Revolution Disparities', 'Punjab, Haryana & Western UP', 'Inter-Regional Disparity', 'Large vs Small Farmers', 'Agrarian Impacts']
  },
  {
    year: 2015,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'India is well endowed with fresh water resources. Critically examine why it still suffers from water scarcity.',
    tags: ['Water Scarcity Paradox', 'Spatial Distribution of Water', 'Agricultural Over-extraction', 'Water Pollution', 'Rainwater Harvesting Deficit']
  },
  {
    year: 2015,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'The states of Jammu and Kashmir, Himachal Pradesh and Uttarakhand are reaching the limits of their ecological carrying capacity due to tourism. Critically evaluate.',
    tags: ['Carrying Capacity', 'Himalayan Tourism', 'Environmental Degradation', 'Solid Waste & Traffic', 'Sustainable Tourism']
  },
  {
    year: 2015,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'How far do you agree that the behavior of the Indian monsoon has changed due to climate change? Give examples.',
    tags: ['Monsoon Behaviour Change', 'El Nino & La Nina', 'Extreme Rain Events', 'Monsoon Breaks', 'Climate Variability']
  },
  {
    year: 2015,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Smart cities in India cannot flourish without smart villages. Discuss this statement in the context of rural-urban integration.',
    tags: ['Smart Cities & Smart Villages', 'Rurban Mission', 'Rural-Urban Migration', 'Agrarian Linkages', 'Balanced Urbanisation']
  },
  {
    year: 2015,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Analyze the impact of growing elder population in India and evaluate the institutional mechanisms in place to address their vulnerability.',
    tags: ['Ageing Population', 'Elderly Care', 'Senior Citizens Welfare', 'Pensions & Healthcare', 'Demographic Shift']
  },
  {
    year: 2015,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'How does patriarchy manifest itself in the daily life of Indian women across diverse socio-economic classes?',
    tags: ['Patriarchy Everyday Manifestation', 'Unpaid Domestic Labour', 'Freedom of Movement', 'Decision Making', 'Class & Gender']
  },
  {
    year: 2015,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Discuss whether communalism in India is merely an outcome of electoral politics or has deeper socio-psychological roots.',
    tags: ['Roots of Communalism', 'Social Psychology', 'Electoral Divides', 'Prejudices & Stereotypes', 'Communal Riots']
  },

  // ====================================================
  // 2014 (20 questions)
  // ====================================================
  {
    year: 2014,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs1-her',
    text: 'To what extent has the urban planning and culture of the Indus Valley Civilization provided inputs to the present day urbanization? Discuss.',
    tags: ['Indus Valley Urban Planning', 'Grid Pattern & Drainage', 'Burnt Bricks', 'Modern Urban Planning', 'Civilization Legacy']
  },
  {
    year: 2014,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs1-her',
    text: 'Gandhara sculpture owed as much to the Romans as to the Greeks. Explain.',
    tags: ['Gandhara Sculpture', 'Graeco-Roman Art', 'Buddha Drapery', 'Apollo Prototypes', 'Kushan Art']
  },
  {
    year: 2014,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs1-her',
    text: 'Taxila university was one of the oldest universities of the ancient world. Elaborate on its educational and cultural role.',
    tags: ['Taxila University', 'Ancient Education', 'Higher Learning Center', 'Buddhist & Vedic Knowledge', 'Cultural Synthesis']
  },
  {
    year: 2014,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs1-mod',
    text: 'The third battle of Panipat was fought in 1761. Why were so many empire-shaking battles fought at Panipat?',
    tags: ['Battles of Panipat', 'Strategic Geography', 'Grand Trunk Road', 'Proximity to Delhi', 'Battlefield Logistics']
  },
  {
    year: 2014,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs1-wh',
    text: 'What were the major political, economic and social developments in the world which motivated the anti-colonial struggle in India?',
    tags: ['Global Anti-Colonial Motivation', 'Russo-Japanese War 1905', 'Irish Home Rule', 'Russian Revolution 1917', 'World Wars']
  },
  {
    year: 2014,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs1-wh',
    text: 'What were the events that led to the Suez Crisis in 1956? How did it deal a final blow to Britain\'s self-image as a world power?',
    tags: ['Suez Crisis 1956', 'Gamal Abdel Nasser', 'Nationalisation of Suez Canal', 'Decline of British Empire', 'Cold War Politics']
  },
  {
    year: 2014,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Explain the formation of thousands of islands in Indonesian and Philippines archipelagos.',
    tags: ['Archipelagos Formation', 'Subduction Zones', 'Volcanic Island Arcs', 'Tectonic Plates', 'Southeast Asian Geography']
  },
  {
    year: 2014,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Why are the world\'s fold mountain systems located along the margins of continents? Bring out the association between the global distribution of Fold Mountains and the earthquakes and volcanoes.',
    tags: ['Fold Mountains', 'Continental Margins', 'Plate Margins (Convergent)', 'Earthquakes & Volcanoes', 'Orogeny']
  },
  {
    year: 2014,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Explain the factors responsible for the distribution of major iron and steel industries in the world with special reference to USA and Western Europe.',
    tags: ['Iron and Steel Location', 'Great Lakes Region', 'Ruhr Valley', 'Raw Material Proximity', 'Industrial Geography']
  },
  {
    year: 2014,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs1-soc',
    text: 'How does patriarchal ideology affect women\'s reproductive rights and bodily autonomy in India?',
    tags: ['Reproductive Rights', 'Bodily Autonomy', 'Patriarchal Control', 'Maternal Health', 'Family Pressures']
  },
  {
    year: 2014,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs1-her',
    text: 'Sufis and medieval mystic saints failed to modify either the religious ideas and practices or the outward structure of Hindu / Muslim societies to any appreciable extent. Comment.',
    tags: ['Sufism & Bhakti', 'Religious Synthesis', 'Orthodoxy Resistance', 'Syncretic Tradition', 'Medieval Social Impact']
  },
  {
    year: 2014,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs1-fre',
    text: 'Analyze the circumstances that compelled the British to withdraw from India in 1947.',
    tags: ['British Withdrawal 1947', 'Post-War Exhaustion', 'INA Trials', 'Royal Indian Navy Mutiny', 'Mass Awakening']
  },
  {
    year: 2014,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs1-post',
    text: 'Critically examine whether the integration of Jammu and Kashmir with the Indian Union resolved the geopolitical vulnerabilities of the northern frontier.',
    tags: ['Integration of J&K', 'Article 370', 'Northern Frontier', 'Indo-Pak Wars', 'Geopolitics']
  },
  {
    year: 2014,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs1-wh',
    text: 'The New Economic Policy – 1921 of Lenin had influenced the political leadership of independent India in formulating its economic policies. Comment.',
    tags: ['Lenin NEP Influence', 'Nehruvian Mixed Economy', 'Planning Commission', 'Public Sector Primacy', 'Socialist Pattern']
  },
  {
    year: 2014,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'How does the heating of the Tibetan Plateau influence the onset and intensity of monsoon in the Indian subcontinent?',
    tags: ['Tibetan Plateau Heating', 'Thermal Engine', 'Tropical Easterly Jet', 'South-West Monsoon', 'Atmospheric Dynamics']
  },
  {
    year: 2014,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Bring out the significance of the Southern Ocean in controlling global oceanic currents and marine ecological productivity.',
    tags: ['Southern Ocean', 'Antarctic Circumpolar Current', 'Thermohaline Circulation', 'Nutrient Cycling', 'Ocean Geography']
  },
  {
    year: 2014,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Account for the location of sugar industry in India. Why is the sugar industry gradually shifting from North India to Peninsular India?',
    tags: ['Sugar Industry Location', 'Shift to South India', 'Longer Crushing Season', 'Higher Sucrose Content', 'Cooperative Sector']
  },
  {
    year: 2014,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Discuss the factors responsible for the rise of regionalism in post-independence India and evaluate its implications on nation building.',
    tags: ['Regionalism Factors', 'Economic Disparities', 'Linguistic Reorganisation', 'Sons of the Soil', 'Nation Building']
  },
  {
    year: 2014,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Growing urbanization is leading to mushrooming of slums which face severe health and civic challenges. Discuss strategies for slum rejuvenation.',
    tags: ['Slum Rejuvenation', 'Dharavi Model', 'In-situ Slum Redevelopment', 'PMAY Urban', 'Civic Amenities']
  },
  {
    year: 2014,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'How does the secular character of the Indian State protect its diverse religious and cultural ethos? Examine in the light of constitutional provisions.',
    tags: ['Secular Character', 'Freedom of Religion', 'Articles 25-28', 'Principled Distance', 'Indian Secularism']
  },

  // ====================================================
  // 2013 (20 questions)
  // ====================================================
  {
    year: 2013,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs1-her',
    text: 'Though not very useful from the point of view of a connected political history of South India, the Sangam literature portrays the social and economic conditions of its time with remarkable verve. Comment.',
    tags: ['Sangam Literature', 'Ancient South India', 'Tinai Ecosystem', 'Sangam Economy & Society', 'Roman Trade']
  },
  {
    year: 2013,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs1-her',
    text: 'Discuss the Tandava dance as recorded in the early Indian inscriptions and art texts.',
    tags: ['Tandava Dance', 'Nataraja', 'Indian Classical Dance', 'Shiva Iconography', 'Art Inscriptions']
  },
  {
    year: 2013,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs1-her',
    text: 'Chola architecture represents a high watermark in the evolution of temple architecture in South India. Discuss.',
    tags: ['Chola Architecture', 'Brihadisvara Temple', 'Dravida Style', 'Gopurams & Vimana', 'Temple Architecture']
  },
  {
    year: 2013,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs1-mod',
    text: 'Defying the barriers of religion, caste and gender, the Swadeshi Movement witnessed unprecedented mass participation. Elaborate.',
    tags: ['Swadeshi Movement 1905', 'Partition of Bengal', 'Boycott of Foreign Goods', 'Mass Participation', 'Nationalist Awakening']
  },
  {
    year: 2013,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs1-fre',
    text: 'Analyze the significance of the Poona Pact of 1932 in shaping the political representation of the depressed classes in India.',
    tags: ['Poona Pact 1932', 'Dr B R Ambedkar', 'Mahatma Gandhi', 'Communal Award', 'Depressed Classes Representation']
  },
  {
    year: 2013,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs1-post',
    text: 'Critically assess the political and administrative challenges faced during the integration of the princely states of Junagadh and Hyderabad.',
    tags: ['Princely States Integration', 'Operation Polo', 'Junagadh Referendum', 'Sardar Patel', 'National Consolidation']
  },
  {
    year: 2013,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs1-wh',
    text: 'The American Revolution was an economic revolt against mercantilism. Substantiate.',
    tags: ['American Revolution', 'Mercantilism', 'Navigation Acts', 'Boston Tea Party', 'No Taxation Without Representation']
  },
  {
    year: 2013,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs1-wh',
    text: 'What were the policy consequences of the Great Depression of 1929 on industrialized capitalist democracies?',
    tags: ['Great Depression 1929', 'Keynesian Economics', 'New Deal (Roosevelt)', 'Welfare State Emergence', 'Economic Regulation']
  },
  {
    year: 2013,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'What do you understand by the phenomenon of "temperature inversion" in meteorology? How does it affect local weather and air quality?',
    tags: ['Temperature Inversion', 'Winter Smog', 'Radiation Inversion', 'Air Quality in Valleys', 'Meteorology']
  },
  {
    year: 2013,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs1-geo',
    text: 'Major hot deserts of the world are located on the western margins of continents in the subtropics. Discuss the climatological reasons.',
    tags: ['Hot Deserts Climatology', 'Subtropical Highs', 'Cold Ocean Currents', 'Off-shore Trade Winds', 'Desiccating Effects']
  },
  {
    year: 2013,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Bring out the causes and consequences of continental drift theory as proposed by Alfred Wegener. What paleoclimatic evidences support it?',
    tags: ['Continental Drift Theory', 'Alfred Wegener', 'Pangaea & Panthalassa', 'Paleoclimatic Evidence', 'Plate Tectonics']
  },
  {
    year: 2013,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Critically examine the factors influencing the location of petroleum refineries in India, highlighting the recent trends towards coastal orientation.',
    tags: ['Petroleum Refineries Location', 'Coastal Refineries', 'Crude Oil Import Dependency', 'Jamnagar Refinery', 'Energy Infrastructure']
  },
  {
    year: 2013,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Analyze the causes and vulnerability of coastal regions of eastern India to tropical cyclones. Why is the Bay of Bengal more prone than the Arabian Sea?',
    tags: ['Bay of Bengal vs Arabian Sea', 'Tropical Cyclones Vulnerability', 'Eastern Coast Cyclones', 'Odisha & Andhra Coast', 'Disaster Resilience']
  },
  {
    year: 2013,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs1-geo',
    text: 'Examine the potential and challenges of geothermal energy and tidal energy as renewable energy sources in India.',
    tags: ['Geothermal Energy', 'Tidal Energy', 'Puga Valley', 'Gulf of Khambhat', 'Non-Conventional Energy']
  },
  {
    year: 2013,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Discuss the various dimensions of poverty in India and analyze why poverty alleviation programmes have yielded mixed results.',
    tags: ['Dimensions of Poverty', 'Multidimensional Deprivation', 'Poverty Alleviation Schemes', 'Targeting Inefficiencies', 'Social Welfare']
  },
  {
    year: 2013,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Evaluate the role of women in grassroots Panchayati Raj Institutions. Has "Panchayat Pati" syndrome undermined their real empowerment?',
    tags: ['Panchayat Pati Syndrome', '73rd Constitutional Amendment', 'Grassroots Democracy', 'Women in PRIs', 'Political Empowerment']
  },
  {
    year: 2013,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Explain how the process of Sanskritization co-exists with Westernization in contemporary Indian society as explained by M.N. Srinivas.',
    tags: ['Sanskritization', 'Westernization', 'M.N. Srinivas', 'Social Mobility', 'Caste Emulation']
  },
  {
    year: 2013,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Discuss the phenomenon of regionalism in India. How does developmental imbalance fuel regional aspirations and demands for separate states?',
    tags: ['Regionalism', 'Demand for Separate States', 'Development Imbalance', 'Vidarbha & Bodoland', 'Federal Polity']
  },
  {
    year: 2013,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Analyze the impact of population growth and unplanned urbanization on the degradation of municipal civic infrastructure and quality of life in metro cities.',
    tags: ['Unplanned Urbanization', 'Municipal Governance', 'Civic Infrastructure Deficit', 'Urban Solid Waste', 'Quality of Urban Life']
  },
  {
    year: 2013,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs1-soc',
    text: 'Critically analyze how globalization has reshaped youth culture and values in India. Does it lead to cultural alienation or hybridity?',
    tags: ['Youth Culture', 'Globalisation Impact', 'Cultural Hybridity', 'Consumerism among Youth', 'Value Shifts']
  }
];

module.exports = gs1Questions;
