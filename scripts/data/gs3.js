// UPSC CSE Mains GS Paper 3 Questions (2013 - 2024)
// Total 240 questions: 20 questions per year (Q1-10: 10 marks, Q11-20: 15 marks)

const gs3Questions = [
  // ====================================================
  // 2024 (20 questions)
  // ====================================================
  {
    year: 2024,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs3-eco',
    text: 'Examine the pattern and trend of public expenditure on social services in the post-reforms period in India. To what extent has this been in consonance with achieving the objective of inclusive growth?',
    tags: ['Public Expenditure', 'Social Services Spending', 'Post-Reform Era', 'Inclusive Growth', 'Fiscal Policy']
  },
  {
    year: 2024,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs3-eco',
    text: 'What are the causative factors behind the persistence of high food inflation in India despite robust foodgrains production? Suggest supply chain measures to stabilize prices.',
    tags: ['Food Inflation', 'Supply Chain Bottlenecks', 'Tomato Onion Potato (TOP)', 'Cold Chain Logistics', 'Price Stabilization Fund']
  },
  {
    year: 2024,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs3-agr',
    text: 'Discuss the institutional, legal, and technological requirements for the successful implementation of modern land records modernization and land leasing reforms in India.',
    tags: ['Land Reforms', 'DILRMP Project', 'SVAMITVA Scheme', 'Model Land Leasing Act', 'Agricultural Productivity']
  },
  {
    year: 2024,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs3-agr',
    text: 'Analyze the role of millets (Shree Anna) in ensuring climate resilience and nutritional security in India. What are the key bottlenecks in scaling millet value chains?',
    tags: ['Millets / Shree Anna', 'Nutritional Security', 'Climate-Resilient Agriculture', 'International Year of Millets', 'Millet Value Chain']
  },
  {
    year: 2024,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs3-eco',
    text: 'Discuss the merits and demerits of the four Labour Codes introduced to consolidate and simplify India\'s central labour laws.',
    tags: ['Four Labour Codes', 'Ease of Doing Business', 'Social Security for Gig Workers', 'Hiring and Firing Flexibility', 'Labour Law Reforms']
  },
  {
    year: 2024,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs3-inf',
    text: 'Evaluate the success of the UDAN (Ude Desh ka Aam Nagrik) scheme in enhancing regional air connectivity and boosting regional tourism and trade in India.',
    tags: ['UDAN Scheme', 'Regional Air Connectivity', 'Tier-2 and Tier-3 Airports', 'Viability Gap Funding', 'Aviation Sector']
  },
  {
    year: 2024,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs3-agr',
    text: 'What are the major challenges confronting the Indian irrigation system? Discuss how micro-irrigation systems under PMKSY can address water-use inefficiency.',
    tags: ['Irrigation Challenges', 'Micro-Irrigation', 'PM Krishi Sinchayee Yojana', 'Per Drop More Crop', 'Water Use Efficiency']
  },
  {
    year: 2024,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs3-agr',
    text: 'Explain the importance of buffer stocks in Indian agriculture. How do buffer stock norms balance price stability, food security, and fiscal carrying costs?',
    tags: ['Buffer Stocks', 'Food Corporation of India (FCI)', 'Open Market Sale Scheme', 'Food Security', 'Fiscal Carrying Costs']
  },
  {
    year: 2024,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs3-sci',
    text: 'Discuss the relationship between Intellectual Property Rights (IPR) and living materials. How does Section 3(d) of the Indian Patent Act prevent evergreening of patents?',
    tags: ['IPR & Biotechnology', 'Section 3(d) Patent Act', 'Evergreening of Patents', 'Novartis Case', 'Affordable Medicines']
  },
  {
    year: 2024,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs3-inf',
    text: 'Explain the working of Radio Frequency Identification (RFID) technology behind FASTag electronic toll collection and analyze its socio-economic impacts on national transport logistics.',
    tags: ['FASTag RFID Technology', 'Electronic Toll Collection', 'Logistics Efficiency', 'Congestion Reduction', 'Intelligent Transport Systems']
  },
  {
    year: 2024,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs3-sci',
    text: 'What are the emerging technological solutions for solving the acute freshwater crisis, with special reference to seawater desalination and wastewater recycling? Discuss their economic viability.',
    tags: ['Seawater Desalination', 'Wastewater Recycling', 'Freshwater Scarcity', 'Reverse Osmosis Technology', 'Circular Water Economy']
  },
  {
    year: 2024,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs3-sci',
    text: 'Discuss the potential hazards posed by Near-Earth Objects (NEOs) and asteroids to life on Earth. How do planetary defense missions like NASA\'s DART test mitigation strategies?',
    tags: ['Asteroids & NEOs', 'Planetary Defense', 'NASA DART Mission', 'Kinetic Impactor Technique', 'Space Science']
  },
  {
    year: 2024,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs3-env',
    text: 'Examine the major sources of industrial effluents contaminating Indian river systems. What technological and regulatory interventions are required for zero liquid discharge (ZLD)?',
    tags: ['Industrial River Pollution', 'Zero Liquid Discharge (ZLD)', 'Effluent Treatment Plants (ETPs)', 'Namami Gange Mission', 'Water Quality Monitoring']
  },
  {
    year: 2024,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs3-env',
    text: 'Evaluate the role of environmental non-governmental organizations (NGOs) and local community stakeholders in the Environmental Impact Assessment (EIA) process in India.',
    tags: ['Environmental Impact Assessment (EIA)', 'Public Consultations', 'Environmental NGOs', 'Sustainable Development', 'Ecological Clearance']
  },
  {
    year: 2024,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs3-dis',
    text: 'Discuss the concept of "disaster resilience" in the context of the Sendai Framework for Disaster Risk Reduction (2015-2030). How can India operationalize "Build Back Better" across infrastructure projects?',
    tags: ['Sendai Framework (SFDRR)', 'Disaster Resilience', 'Build Back Better', 'CDRI Initiative', 'Resilient Infrastructure']
  },
  {
    year: 2024,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs3-dis',
    text: 'What are the primary anthropogenic and meteorological causes of urban flooding in Indian mega-cities? Discuss how the "Sponge City" concept can be adapted in Indian urban planning.',
    tags: ['Urban Flooding Causes', 'Sponge City Concept', 'Stormwater Encroachment', 'Impervious Surfaces', 'Blue-Green Infrastructure']
  },
  {
    year: 2024,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'Social media platforms and encrypted messaging services have emerged as serious national security challenges by facilitating recruitment, terror financing, and fake news propagation. Discuss comprehensive countermeasures.',
    tags: ['Social Media Security Threats', 'End-to-End Encryption', 'Radicalization Online', 'IT Rules 2021', 'Cyber Coordination Center (I4C)']
  },
  {
    year: 2024,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'Analyze the key features and safeguards under the Digital Personal Data Protection (DPDP) Act, 2023. To what extent does it balance individual privacy with legitimate state surveillance requirements?',
    tags: ['DPDP Act 2023', 'Data Protection Board', 'Right to Privacy', 'Exemptions for State Agencies', 'Digital Sovereignty']
  },
  {
    year: 2024,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'Discuss the menace of narco-terrorism along India\'s western and northeastern borders. How do Golden Crescent and Golden Triangle cartels threaten internal security?',
    tags: ['Narco-Terrorism', 'Golden Crescent & Triangle', 'Terror Financing', 'Drone Smuggling across Border', 'Narcotics Control Bureau (NCB)']
  },
  {
    year: 2024,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'Examine India\'s persistent border security vulnerabilities with China and Pakistan. How does the "Comprehensive Integrated Border Management System" (CIBMS) enhance electronic surveillance?',
    tags: ['Border Management', 'CIBMS Electronic Fencing', 'Line of Actual Control (LAC)', 'Line of Control (LoC)', 'Smart Borders']
  },

  // ====================================================
  // 2023 (20 questions)
  // ====================================================
  {
    year: 2023,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs3-eco',
    text: 'Faster economic growth requires increased share of the manufacturing sector in GDP, particularly of MSMEs. Comment on the present policies of the Government in this regard.',
    tags: ['Manufacturing Share in GDP', 'MSME Sector', 'PLI Schemes', 'Make in India', 'Industrial Policy']
  },
  {
    year: 2023,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs3-agr',
    text: 'What are the main constraints in transport and marketing of agricultural produce in India? How does e-NAM overcome these challenges?',
    tags: ['Agricultural Marketing', 'e-NAM Platform', 'APMC Reforms', 'Cold Chain Infrastructure', 'Supply Chain Intermediaries']
  },
  {
    year: 2023,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs3-agr',
    text: 'Explain the changes in cropping pattern in India in the context of changes in consumption diet and new technologies.',
    tags: ['Cropping Pattern Shifts', 'Dietary Transition', 'Horticulture & Millets', 'Green Revolution Monoculture', 'Crop Diversification']
  },
  {
    year: 2023,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs3-sci',
    text: 'What is the main task of India\'s third moon exploration mission (Chandrayaan-3)? How is it distinct from the previous moon missions?',
    tags: ['Chandrayaan-3', 'ISRO Lunar Mission', 'Soft Landing on South Pole', 'Pragyan Rover', 'Space Exploration']
  },
  {
    year: 2023,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs3-env',
    text: 'Discuss the consequences of climate change on food security in tropical countries. What adaptation practices can mitigate these shocks?',
    tags: ['Climate Change & Food Security', 'Tropical Crop Vulnerability', 'Heat Stress on Wheat', 'Climate-Smart Agriculture', 'Adaptation Practices']
  },
  {
    year: 2023,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs3-dis',
    text: 'Explain the mechanism and causes of landslides in the Himalayan region and Western Ghats. Suggest modern warning mechanisms.',
    tags: ['Landslides Causes', 'Himalayas vs Western Ghats', 'Early Warning Systems', 'Geotechnical Slope Stabilization', 'Disaster Mitigation']
  },
  {
    year: 2023,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs3-sec',
    text: 'Winning of \'Hearts and Minds\' in terrorism-affected areas is an essential step in restoring the trust of the population. Discuss in the context of Jammu and Kashmir.',
    tags: ['Operation Sadbhavana', 'Counter-Terrorism', 'Winning Hearts and Minds', 'Jammu & Kashmir', 'Civic Action Programmes']
  },
  {
    year: 2023,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs3-sec',
    text: 'The use of unmanned aerial vehicles (drones) by our adversaries for weapon delivery and surveillance poses a grave border threat. Discuss countermeasures.',
    tags: ['Drone Warfare', 'Anti-Drone Systems', 'Cross-Border Weapon Smuggling', 'Border Security', 'Counter-UAS Technology']
  },
  {
    year: 2023,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs3-eco',
    text: 'What are the major challenges faced by the Indian economy in generating adequate formal employment opportunities? Suggest policy solutions.',
    tags: ['Jobless Growth Debate', 'Informal Economy', 'Labour Market Rigidity', 'Skill Mismatch', 'Labour-Intensive Manufacturing']
  },
  {
    year: 2023,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs3-inf',
    text: 'Explain the concept of National Logistics Policy (NLP) 2022. How does it aim to bring down logistics costs to single digits of GDP?',
    tags: ['National Logistics Policy 2022', 'Logistics Cost Reduction', 'Multimodal Connectivity', 'Unified Logistics Interface Platform (ULIP)', 'Supply Chain Efficiency']
  },
  {
    year: 2023,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs3-eco',
    text: 'Explain the meaning of investment in infrastructure in the context of economic development. How does the National Infrastructure Pipeline (NIP) address infrastructure gaps?',
    tags: ['Infrastructure Investment', 'National Infrastructure Pipeline', 'Capital Expenditure Multiplier', 'Public-Private Partnerships', 'Economic Growth']
  },
  {
    year: 2023,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs3-agr',
    text: 'What are the direct and indirect subsidies provided to farm sector in India? Discuss the issues raised by the World Trade Organization (WTO) in relation to these subsidies.',
    tags: ['Farm Subsidies', 'Direct vs Indirect Subsidies', 'WTO Amber Box Limits', 'MSP Peace Clause', 'Fertilizer & Power Subsidies']
  },
  {
    year: 2023,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs3-agr',
    text: 'Discuss the role of organic farming in sustainable food production in India. What are the key bottlenecks faced by smallholders adopting Paramparagat Krishi Vikas Yojana?',
    tags: ['Organic Farming', 'PKVY Scheme', 'Certification Cost (PGS)', 'Yield Gaps during Transition', 'Soil Health']
  },
  {
    year: 2023,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs3-sci',
    text: 'Introduce the concept of Artificial Intelligence (AI) and Machine Learning. How can AI revolutionize healthcare diagnostics and personalized medicine in India?',
    tags: ['Artificial Intelligence in Healthcare', 'Machine Learning Diagnostics', 'Ayushman Bharat Digital Mission', 'Telemedicine & Radiology AI', 'Ethical AI']
  },
  {
    year: 2023,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs3-sci',
    text: 'Discuss the potential applications of the James Webb Space Telescope (JWST) in uncovering the origins of the universe and atmospheric characterization of exoplanets.',
    tags: ['James Webb Space Telescope', 'Infrared Astronomy', 'Cosmic Dawn & First Galaxies', 'Exoplanet Atmospheres', 'Astrophysics']
  },
  {
    year: 2023,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs3-env',
    text: 'Explain the purpose and importance of COP28 UAE Consensus regarding the tripling of global renewable energy capacity and transition away from fossil fuels.',
    tags: ['COP28 UAE Consensus', 'Tripling Renewable Energy', 'Phase Out vs Transition Away', 'Fossil Fuels', 'Global Stocktake']
  },
  {
    year: 2023,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs3-env',
    text: 'What is coastal regulation zone (CRZ) notification? How does CRZ 2019 balance economic development with coastal ecological preservation?',
    tags: ['CRZ Notification 2019', 'Coastal Ecology', 'Blue Flag Beaches', 'High Tide Line Regulations', 'Eco-Tourism vs Conservation']
  },
  {
    year: 2023,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs3-dis',
    text: 'Dam safety in India requires an institutional framework. Discuss the key provisions of the Dam Safety Act, 2021 in mitigating catastrophic dam burst risks.',
    tags: ['Dam Safety Act 2021', 'National Dam Safety Authority', 'Ageing Dam Infrastructure', 'Flood Moderation', 'Disaster Prevention']
  },
  {
    year: 2023,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'Cross-border cyber-attacks targeting critical national infrastructure (CNI) have become a weapon of hybrid warfare. Discuss India\'s cybersecurity preparedness.',
    tags: ['Cybersecurity Infrastructure', 'Critical Information Infrastructure (NCIIPC)', 'CERT-In Guidelines', 'Hybrid Warfare', 'Cyber Espionage']
  },
  {
    year: 2023,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'Examine the nexus between transnational organized crime, money laundering, and illicit financing of terrorist outfits. How does the Financial Action Task Force (FATF) counter this menace?',
    tags: ['Transnational Organized Crime', 'Money Laundering (PMLA)', 'FATF Grey List', 'Terror Financing', 'Hawala Networks']
  },

  // ====================================================
  // 2022 (20 questions)
  // ====================================================
  {
    year: 2022,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs3-eco',
    text: 'Why is Public-Private Partnership (PPP) required in infrastructural projects? Examine the role of Hybrid Annuity Model (HAM) in road construction.',
    tags: ['Public-Private Partnership (PPP)', 'Hybrid Annuity Model (HAM)', 'National Highways Infrastructure', 'Risk Sharing', 'Infratech']
  },
  {
    year: 2022,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs3-eco',
    text: 'Is inclusive growth possible under market economy? State the significance of financial inclusion in achieving economic growth in India.',
    tags: ['Inclusive Growth', 'Market Economy vs Social Equity', 'Financial Inclusion (PMJDY)', 'Direct Benefit Transfers', 'Poverty Reduction']
  },
  {
    year: 2022,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs3-agr',
    text: 'What are the major challenges of Public Distribution System (PDS) in India? How can food grain leakages be minimized through technology?',
    tags: ['PDS Challenges', 'Biometric Authentication (e-PoS)', 'End-to-End Computerization', 'Grain Leakages & Ghost Beneficiaries', 'Food Security']
  },
  {
    year: 2022,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs3-agr',
    text: 'Elaborate the scope and significance of the food processing industry in enhancing farm incomes and reducing post-harvest losses in India.',
    tags: ['Food Processing Sector', 'PM Formalisation of Micro Food Processing (PMFME)', 'Mega Food Parks', 'Value Addition', 'Post-Harvest Losses']
  },
  {
    year: 2022,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs3-sci',
    text: 'What is the basic principle behind vaccine development? How do mRNA vaccines differ from traditional inactivated viral vaccines?',
    tags: ['Vaccine Technology', 'mRNA Vaccines (Pfizer/Moderna)', 'Inactivated Vaccines (Covaxin)', 'Antigen Presentation', 'Biotechnology']
  },
  {
    year: 2022,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs3-sci',
    text: 'Discuss the concept of Web 3.0 and explain how it decentralizes the internet compared to Web 2.0.',
    tags: ['Web 3.0', 'Decentralized Web', 'Blockchain Architecture', 'Smart Contracts', 'Web 2.0 Big Tech Platforms']
  },
  {
    year: 2022,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs3-env',
    text: 'Explain the causes and consequences of coastal erosion in India. How does the National Centre for Sustainable Coastal Management (NCSCM) assess vulnerability?',
    tags: ['Coastal Erosion', 'Sea Level Rise', 'Wave Action & Storm Surges', 'Hard vs Soft Engineering Solutions', 'Shoreline Vulnerability']
  },
  {
    year: 2022,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs3-dis',
    text: 'Explain the mechanism and triggers of cloudburst incidents in the Himalayan region. What disaster management measures can save lives during such sudden hazards?',
    tags: ['Cloudburst Triggers', 'Orographic Uplift', 'Himalayan Flash Floods', 'Doppler Weather Radars', 'Early Warning Systems']
  },
  {
    year: 2022,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs3-sec',
    text: 'Discuss the different types of cyber crimes and measures required for comprehensive cyber hygiene among citizens and government organizations.',
    tags: ['Cyber Crimes', 'Ransomware & Phishing', 'Cyber Hygiene', 'National Cyber Security Strategy', 'Indian Cyber Crime Coordination Centre']
  },
  {
    year: 2022,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs3-sec',
    text: 'Naxalism is a socio-economic and developmental issue manifested in armed insurgency. Discuss the government\'s two-pronged strategy to eradicate Left Wing Extremism (LWE).',
    tags: ['Left Wing Extremism (LWE)', 'SAMADHAN Strategy', 'Security + Development Strategy', 'Red Corridor', 'Tribal Rights & Development']
  },
  {
    year: 2022,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs3-eco',
    text: 'Economic growth in the recent past has been accompanied by increasing inequality. Analyze whether growth has trickled down to the lowest quintiles of the population.',
    tags: ['Economic Inequality', 'Trickle-Down Economics Failure', 'Oxfam Inequality Report', 'K-Shaped Recovery', 'Fiscal Redistribution']
  },
  {
    year: 2022,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs3-eco',
    text: 'What are the main causes of Non-Performing Assets (NPAs) in the Indian banking system? How does the Insolvency and Bankruptcy Code (IBC) facilitate asset resolution?',
    tags: ['Non-Performing Assets (NPAs)', 'Insolvency and Bankruptcy Code (IBC)', 'Bad Bank (NARCL)', 'Twin Balance Sheet Problem', 'Banking Reforms']
  },
  {
    year: 2022,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs3-agr',
    text: 'Integrated Farming System (IFS) is an effective approach to ensure food security, nutrition and sustainable livelihood for small and marginal farmers. Elaborate.',
    tags: ['Integrated Farming System (IFS)', 'Small & Marginal Farmers', 'Crop-Livestock Synergy', 'Sustainable Livelihoods', 'Agro-Ecology']
  },
  {
    year: 2022,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs3-inf',
    text: 'Renewable energy transition is key to achieving net-zero emissions by 2070. What are the technological and financial challenges in integrating solar and wind power with the national electricity grid?',
    tags: ['Renewable Energy Grid Integration', 'Intermittent Power', 'Battery Energy Storage Systems (BESS)', 'Net-Zero 2070', 'DISCOM Financial Health']
  },
  {
    year: 2022,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs3-sci',
    text: 'What are the key features and scientific objectives of India\'s first human spaceflight mission "Gaganyaan"? Discuss the technological milestones achieved by ISRO for this mission.',
    tags: ['Gaganyaan Mission', 'Human Spaceflight', 'ISRO Crew Module', 'Life Support Systems (ECLSS)', 'Astronaut Training']
  },
  {
    year: 2022,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs3-env',
    text: 'Discuss the concept of "Panchamrit" pledges announced by India at COP26 Glasgow. How do these commitments align with the principle of Common but Differentiated Responsibilities (CBDR)?',
    tags: ['Panchamrit COP26 Pledges', 'Net-Zero Target 2070', 'CBDR-RC Principle', 'Non-Fossil Energy Capacity', 'Climate Justice']
  },
  {
    year: 2022,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs3-env',
    text: 'Each year Delhi-NCR suffers from catastrophic air pollution during the winter season. Critically analyze the interplay of agricultural, industrial, and meteorological factors and evaluate CAQM\'s interventions.',
    tags: ['Delhi Air Pollution', 'Stubble Burning', 'Winter Inversion Layer', 'CAQM Interventions', 'Graded Response Action Plan (GRAP)']
  },
  {
    year: 2022,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs3-dis',
    text: 'Explain the role of coastal ecosystems like mangroves, coral reefs, and sand dunes in acting as bio-shields against coastal natural disasters.',
    tags: ['Coastal Bio-Shields', 'Mangrove Ecosystems', 'Cyclone Protection', 'Tsunami Attenuation', 'Nature-Based Solutions']
  },
  {
    year: 2022,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'Analyze the internal security implications of illicit arms smuggling, counterfeit currency, and drug trafficking in India\'s northeastern border states.',
    tags: ['Northeast Internal Security', 'Cross-Border Smuggling', 'FICN', 'Insurgent Safe Havens', 'Assam Rifles']
  },
  {
    year: 2022,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'Maritime security in the Indian Ocean Region is critical for India\'s energy and trade flows. Discuss the role of the Indian Navy and Coast Guard in establishing Maritime Domain Awareness (MDA).',
    tags: ['Maritime Domain Awareness (MDA)', 'Information Fusion Centre (IFC-IOR)', 'Indian Navy & Coast Guard', 'Chokepoints Security', 'SAGAR Vision']
  },

  // ====================================================
  // 2021 (20 questions)
  // ====================================================
  {
    year: 2021,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs3-eco',
    text: 'Explain the difference between computing methodology of India\'s Gross Domestic Product (GDP) before the year 2015 and after the year 2015.',
    tags: ['GDP Methodology Change', 'Base Year 2011-12 Revision', 'GVA at Basic Prices', 'MCA-21 Database', 'National Accounts Statistics']
  },
  {
    year: 2021,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs3-eco',
    text: 'Distinguish between Capital Budget and Revenue Budget. Explain the components of both these Budgets.',
    tags: ['Capital vs Revenue Budget', 'Capital Receipts & Expenditure', 'Fiscal Deficit', 'Asset Creation', 'Government Budgeting']
  },
  {
    year: 2021,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs3-agr',
    text: 'How and to what extent would micro-irrigation help in solving India\'s water crisis?',
    tags: ['Micro-Irrigation', 'Drip & Sprinkler Systems', 'Water Crisis Solutions', 'Fertigation Technology', 'Water Use Efficiency']
  },
  {
    year: 2021,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs3-agr',
    text: 'How did land reforms in some parts of the country help to improve the socio-economic conditions of marginal and small farmers?',
    tags: ['Land Reforms Success', 'Tenancy Reforms', 'Operation Barga in West Bengal', 'Land Ceiling Acts', 'Agrarian Transformation']
  },
  {
    year: 2021,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs3-sci',
    text: 'Discuss the applications of biotechnology in the field of agriculture. What are the biosafety concerns regarding genetically modified (GM) crops?',
    tags: ['Agricultural Biotechnology', 'GM Crops (Bt Cotton/GM Mustard)', 'GEAC Clearance', 'Biosafety Concerns', 'Gene Editing']
  },
  {
    year: 2021,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs3-sci',
    text: 'What are the research achievements in Blue LED technology that led to the Nobel Prize in Physics 2014? How has it transformed energy efficiency in lighting?',
    tags: ['Blue LED Technology', 'Nobel Prize in Physics', 'Solid-State Lighting', 'Energy Efficiency', 'Semiconductor Physics']
  },
  {
    year: 2021,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs3-env',
    text: 'Describe the key points of the revised Global Air Quality Guidelines (AQGs) recently released by the World Health Organization (WHO). How are these different from its 2005 guidelines?',
    tags: ['WHO Air Quality Guidelines 2021', 'PM2.5 & PM10 Limits', 'Air Pollution Health Risks', 'Comparison with 2005 Guidelines', 'Environmental Health']
  },
  {
    year: 2021,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs3-dis',
    text: 'Discuss the vulnerability of India to earthquake hazards with reference to its tectonic framework and seismological zonation map.',
    tags: ['Earthquake Vulnerability', 'Seismic Zonation Map', 'Himalayan Collision Zone', 'Bureau of Indian Standards (BIS)', 'Disaster Risk Reduction']
  },
  {
    year: 2021,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs3-sec',
    text: 'Analyze the external state and non-state actors in promoting cross-border terrorism in India. What measures have been undertaken to disrupt terror financing?',
    tags: ['State and Non-State Actors', 'Cross-Border Terrorism', 'FATF Standards', 'National Investigation Agency (NIA)', 'Terror Financing Networks']
  },
  {
    year: 2021,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs3-sec',
    text: 'What are the maritime security challenges faced by India? Discuss the organizational and technological steps taken to ensure coastal security post-26/11.',
    tags: ['Coastal Security Post-26/11', 'Multi-Tiered Maritime Surveillance', 'Sagar Prahari Bal', 'Coastal Radar Network', 'National Maritime Security Coordinator']
  },
  {
    year: 2021,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs3-eco',
    text: 'Do you agree that the Indian economy has recently experienced V-shaped recovery? Give reasons in support of your answer.',
    tags: ['V-Shaped Recovery Debate', 'Post-COVID Economic Revival', 'High-Frequency Indicators', 'Pent-Up Demand vs Structural Growth', 'Macroeconomic Health']
  },
  {
    year: 2021,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs3-inf',
    text: '"Investment in infrastructure is essentially a prerequisite for rapid and inclusive economic growth." Evaluate this in the context of the PM GatiShakti National Master Plan.',
    tags: ['PM GatiShakti Master Plan', 'Multi-Modal Logistics', 'Infrastructure De-bottlenecking', 'Capital Expenditure', 'Inclusive Growth']
  },
  {
    year: 2021,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs3-agr',
    text: 'What are the salient features of the National Mission on Edible Oils - Oil Palm (NMEO-OP)? What are the ecological concerns associated with oil palm expansion in Northeast India?',
    tags: ['NMEO-OP Mission', 'Edible Oil Import Dependency', 'Oil Palm Expansion', 'Deforestation in Northeast', 'Biodiversity Threats']
  },
  {
    year: 2021,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs3-agr',
    text: 'What are the main bottlenecks in the adoption of farm mechanization among small and marginal farmers in India? How do Custom Hiring Centers (CHCs) alleviate this?',
    tags: ['Farm Mechanization Bottlenecks', 'Custom Hiring Centers (CHCs)', 'Sub-Mission on Agricultural Mechanization', 'Land Fragmentation', 'Farm Productivity']
  },
  {
    year: 2021,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs3-sci',
    text: 'How does nanotechnology contribute to targeted drug delivery systems in cancer therapy? Discuss its advantages over conventional chemotherapy.',
    tags: ['Nanotechnology in Medicine', 'Targeted Drug Delivery', 'Nanoparticles in Cancer Therapy', 'Minimizing Side Effects', 'Biomedical Engineering']
  },
  {
    year: 2021,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs3-env',
    text: 'Explain the purpose and value of the Glasgow Climate Pact agreed upon at COP26. Analyze India\'s updated Nationally Determined Contributions (NDCs).',
    tags: ['Glasgow Climate Pact', 'COP26 Summit', 'Updated NDCs of India', '500 GW Non-Fossil Fuel Target', 'Carbon Intensity Reduction']
  },
  {
    year: 2021,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs3-env',
    text: 'Discuss the menace of plastic pollution in terrestrial and marine ecosystems. Evaluate the efficacy of the Plastic Waste Management (Amendment) Rules, 2021 in phasing out single-use plastics.',
    tags: ['Plastic Waste Pollution', 'Single-Use Plastic Ban', 'Extended Producer Responsibility (EPR)', 'Marine Microplastics', 'Circular Economy']
  },
  {
    year: 2021,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs3-dis',
    text: 'Analyze the causes of frequent forest fires in India, especially in the Himalayan and Central Indian deciduous forests. Suggest institutional measures for fire risk management.',
    tags: ['Forest Fires in India', 'Himalayan Chir Pine Vulnerability', 'National Action Plan on Forest Fires', 'Forest Fire Monitoring (FSI)', 'Community Involvement']
  },
  {
    year: 2021,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'Discuss the cyber security threats posed by ransomware attacks on critical health and financial infrastructure. What legal and technical frameworks exist to combat cyber extortion?',
    tags: ['Ransomware Attacks', 'Cyber Extortion', 'Critical Health & Banking Security', 'CERT-In Mandates', 'Data Protection Measures']
  },
  {
    year: 2021,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'Analyze the internal security challenges arising out of the influx of illegal immigrants and cross-border ethnic linkages along India\'s eastern borders.',
    tags: ['Illegal Immigration', 'Eastern Border Management', 'Indo-Myanmar Free Movement Regime', 'Border Fencing', 'Ethnic Conflict Dynamics']
  },

  // ====================================================
  // 2020 (20 questions)
  // ====================================================
  {
    year: 2020,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs3-eco',
    text: 'Explain intra-generational and inter-generational issues of equity from the perspective of inclusive growth and sustainable development.',
    tags: ['Intra and Inter-generational Equity', 'Brundtland Report', 'Inclusive Growth', 'Resource Depletion', 'Sustainable Development']
  },
  {
    year: 2020,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs3-eco',
    text: 'Define potential GDP and explain its determinants. What are the factors that have been inhibiting India from realizing its potential GDP?',
    tags: ['Potential GDP', 'Capacity Utilization', 'Factor Productivity', 'Capital Formation Deficit', 'Structural Bottlenecks']
  },
  {
    year: 2020,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs3-agr',
    text: 'What are the main constraints in transport and marketing of agricultural produce in India?',
    tags: ['Agri Transport Constraints', 'Cold Chain Infrastructure Deficit', 'Intermediaries & Middlemen', 'APMC Fragmentation', 'Agricultural Logistics']
  },
  {
    year: 2020,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs3-agr',
    text: 'What are the major challenges of Public Distribution System (PDS) in India? How can it be made effective and transparent?',
    tags: ['PDS Modernization', 'Targeting Inefficiencies', 'Biometric End-to-End Tracking', 'NFSA 2013', 'Transparency Portals']
  },
  {
    year: 2020,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs3-sci',
    text: 'What is India\'s plan to have its own space station and how will it benefit our space programme?',
    tags: ['Indian Space Station (Bharatiya Antariksh Station)', 'ISRO Space Roadmap', 'Microgravity Research', 'Gaganyaan Base', 'Space Technology']
  },
  {
    year: 2020,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs3-sci',
    text: 'How is science interwoven deeply with our lives? What are the important contributions of Indian scientists in the fields of science and technology in the 20th century?',
    tags: ['Indian Scientists 20th Century', 'C.V. Raman & Raman Effect', 'J.C. Bose & S.N. Bose', 'Homi Bhabha', 'Indigenous Scientific Progress']
  },
  {
    year: 2020,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs3-env',
    text: 'How does the draft Environmental Impact Assessment (EIA) Notification, 2020 differ from the existing EIA Notification, 2006?',
    tags: ['Draft EIA 2020 Differences', 'Post-Facto Clearance Controversy', 'Public Hearing Notice Period', 'Strategic Project Exemptions', 'Environmental Governance']
  },
  {
    year: 2020,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs3-dis',
    text: 'Discuss the disaster risk mitigation measures in the context of recent urban floods in metropolitan cities of India.',
    tags: ['Urban Floods Mitigation', 'Drainage Master Plans', 'Encroachment of Water Bodies', 'Early Warning Radars', 'NDMA Urban Flood Guidelines']
  },
  {
    year: 2020,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs3-sec',
    text: 'What are the internal security challenges being faced by India in the cyber domain? Discuss the organizational framework established to combat them.',
    tags: ['Cyber Security Challenges', 'Critical Infrastructure Attacks', 'NCIIPC & CERT-In', 'National Cyber Security Coordinator', 'Cyber Warfare']
  },
  {
    year: 2020,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs3-sec',
    text: 'For effective border area management, discuss the steps required to be taken to pacify a local population and integrate them into the national mainstream.',
    tags: ['Border Area Development Programme (BADP)', 'Border Community Hearts & Minds', 'Border Infrastructure', 'Civic Action Programmes', 'National Integration']
  },
  {
    year: 2020,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs3-eco',
    text: 'Explain the rationale behind the Goods and Services Tax (Compensation to States) Act, 2017. How has the shortfall in GST compensation fund affected Centre-State relations?',
    tags: ['GST Compensation Cess', 'GST Act 2017', 'Fiscal Federalism Tensions', 'Borrowing Window Mechanism', 'State Revenue Autonomy']
  },
  {
    year: 2020,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs3-inf',
    text: 'What are the main features of the National Clean Air Programme (NCAP) initiated by the Government of India? What are its limitations?',
    tags: ['National Clean Air Programme (NCAP)', 'Non-Attainment Cities', 'PM Reduction Targets', 'Aerosol Monitoring', 'Funding Bottlenecks']
  },
  {
    year: 2020,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs3-agr',
    text: 'What are the major challenges faced by the sugar industry in India? Discuss the recommendations of the Rangarajan Committee for de-regulating the sugar sector.',
    tags: ['Sugar Industry Challenges', 'Fair and Remunerative Price (FRP)', 'Cane Price Arrears', 'Rangarajan Committee', 'Ethanol Blending Synergy']
  },
  {
    year: 2020,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs3-agr',
    text: 'Explain the significance of the National Livestock Mission in diversifying rural household incomes and promoting sustainable dairy and small ruminant farming.',
    tags: ['National Livestock Mission', 'Rural Income Diversification', 'Breed Improvement', 'Fodder Security', 'Dairy & Poultry Development']
  },
  {
    year: 2020,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs3-sci',
    text: 'Discuss the concept of Quantum Computing and explain how it differs from classical computing. What are the objectives of the National Quantum Mission?',
    tags: ['Quantum Computing', 'Qubits & Superposition', 'Quantum Supremacy', 'National Quantum Mission', 'Post-Quantum Cryptography']
  },
  {
    year: 2020,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs3-env',
    text: 'Explain the causes and consequences of depletion of mangroves in coastal regions of India. Highlight the role of the MISHTI scheme in mangrove restoration.',
    tags: ['Mangroves Depletion', 'Coastal Protection', 'MISHTI Scheme', 'Sundarbans & Bhitarkanika', 'Carbon Sequestration']
  },
  {
    year: 2020,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs3-env',
    text: 'Analyze the significance of the Paris Agreement\'s Article 6 regarding international carbon markets. How can carbon credit trading incentivize emission reductions in India?',
    tags: ['Paris Agreement Article 6', 'Carbon Markets', 'Carbon Credit Trading Scheme (CCTS)', 'Cap-and-Trade', 'Decarbonization']
  },
  {
    year: 2020,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs3-dis',
    text: 'Disaster management in India has shifted from relief-centric to a proactive prevention and preparedness approach. Analyze with reference to the NDMA framework.',
    tags: ['Paradigm Shift in Disaster Management', 'Relief to Prevention', 'DM Act 2005', 'Preparedness & Capacity Building', 'Community-Based DRM']
  },
  {
    year: 2020,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'Analyze the internal security challenges of illegal weapons trafficking and drug money laundering along India\'s western border corridor.',
    tags: ['Cross-Border Smuggling', 'Western Border Corridor', 'Terror-Drug Nexus', 'BSF Surveillance', 'Anti-Infiltration Measures']
  },
  {
    year: 2020,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'Discuss the historical background and key provisions of the Armed Forces Special Powers Act (AFSPA), 1958. Examine the arguments for and against its phased withdrawal.',
    tags: ['AFSPA 1958', 'Disturbed Areas Declaration', 'Armed Forces Protection', 'Human Rights Concerns', 'Phased Withdrawal in Northeast']
  },

  // ====================================================
  // 2019 (20 questions)
  // ====================================================
  {
    year: 2019,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs3-eco',
    text: 'Enumerate the indirect taxes which have been subsumed in the Goods and Services Tax (GST) in India. Also, comment on the revenue implications of the GST introduced in India since July 2017.',
    tags: ['GST Subsumed Taxes', 'Indirect Tax Reform', 'Revenue Implications', 'Tax Buoyancy', 'One Nation One Tax']
  },
  {
    year: 2019,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs3-eco',
    text: 'Do you think India can meet 50 percent of its energy requirements from renewable energy by 2030? Justify your answer. How will the gradual switch from fossil fuels to renewables assist in meeting climate commitments?',
    tags: ['Renewable Energy 2030', '50 Percent Clean Energy Goal', 'Panchamrit Targets', 'Fossil Fuel Transition', 'Decarbonization']
  },
  {
    year: 2019,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs3-agr',
    text: 'How can the biotechnology help to improve the living standards of farmers? Discuss with suitable examples.',
    tags: ['Biotechnology in Agriculture', 'Bio-fertilizers & Biopesticides', 'Tissue Culture', 'Drought-Resistant Crops', 'Farmer Incomes']
  },
  {
    year: 2019,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs3-agr',
    text: 'Elaborate the policy initiatives taken by the Government of India for the development of the food processing industry.',
    tags: ['Food Processing Policy', 'PM Kisan SAMPADA Yojana', '100% FDI in Food Retail', 'Agro-Processing Clusters', 'Value Addition']
  },
  {
    year: 2019,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs3-sci',
    text: 'How is the Government of India protecting traditional knowledge from biopiracy? Explain the functioning of the Traditional Knowledge Digital Library (TKDL).',
    tags: ['Traditional Knowledge Protection', 'Biopiracy Prevention', 'TKDL Database', 'Turmeric & Neem Patents', 'IPR Safeguards']
  },
  {
    year: 2019,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs3-sci',
    text: 'What is the significance of the indigenously developed ballistic missile defense (BMD) shield for India\'s strategic defense?',
    tags: ['Ballistic Missile Defense (BMD)', 'Prithvi Air Defence (PAD)', 'Advanced Air Defence (AAD)', 'Two-Tier BMD Shield', 'Strategic Deterrence']
  },
  {
    year: 2019,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs3-env',
    text: 'Define the concept of carrying capacity of an ecosystem as relevant to an environment. Explain how understanding this concept is vital while planning for sustainable development.',
    tags: ['Carrying Capacity', 'Ecological Footprint', 'Sustainable Development', 'Urban Carrying Capacity', 'Environmental Sustainability']
  },
  {
    year: 2019,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs3-dis',
    text: 'Disaster management in India has undergone a major transition from reactive response to proactive mitigation and prevention. Discuss.',
    tags: ['Disaster Management Transition', 'DM Act 2005 Paradigm', 'Sendai Framework Compliance', 'Early Warning Upgrades', 'Community Resilience']
  },
  {
    year: 2019,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs3-sec',
    text: 'The cross-border movement of insurgents in the Northeast is a major security challenge. Discuss the topography, ethnic ties and international border agreements that influence this.',
    tags: ['Northeast Insurgency Cross-Border', 'Indo-Myanmar Border', 'Free Movement Regime (FMR)', 'Jungle Terrain Safe Havens', 'Assam Rifles']
  },
  {
    year: 2019,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs3-sec',
    text: 'What is CyberDome Project? Explain how it assists the police in tracking internet crimes and countering radicalization.',
    tags: ['CyberDome Project', 'Kerala Police Initiative', 'Darknet Surveillance', 'Predictive Policing', 'Counter-Radicalization']
  },
  {
    year: 2019,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs3-eco',
    text: 'It is argued that the strategy of inclusive growth must focus on financial inclusion, health, and skill formation. Elucidate with reference to current developmental programs.',
    tags: ['Inclusive Growth Strategy', 'Financial Inclusion (JAM)', 'Ayushman Bharat', 'Skill India Mission', 'Human Capital Formation']
  },
  {
    year: 2019,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs3-inf',
    text: 'Examine the development of Dedicated Freight Corridors (DFCs) in India. How will they decongest passenger tracks and reduce logistics turnaround time?',
    tags: ['Dedicated Freight Corridors (DFCs)', 'Eastern & Western DFC', 'Rail Logistics Speed', 'Carbon Emission Reductions', 'Freight Modal Share']
  },
  {
    year: 2019,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs3-agr',
    text: 'How far is Integrated Farming System (IFS) helpful in sustaining agricultural production and enhancing income of small and marginal farmers in rainfed regions?',
    tags: ['Integrated Farming System (IFS)', 'Rainfed Agriculture', 'Multi-Enterprise Farming', 'Livestock Integration', 'Climate Resilience']
  },
  {
    year: 2019,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs3-agr',
    text: 'What are the reformative steps taken by the Government to make food grain procurement and distribution efficient and transparent?',
    tags: ['PDS Procurement Reforms', 'Direct Benefit Transfer in PDS', 'Decentralized Procurement Scheme (DCP)', 'FCI Modernization', 'Shanta Kumar Committee']
  },
  {
    year: 2019,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs3-sci',
    text: 'What are the research achievements in the field of 5G telecommunication technology? How will 5G enable the Internet of Things (IoT) and smart cities in India?',
    tags: ['5G Telecom Technology', 'Ultra-Low Latency', 'Internet of Things (IoT)', 'Smart City Applications', 'Spectrum Allocation']
  },
  {
    year: 2019,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs3-env',
    text: 'Coastal sand mining, both legal and illegal, is posing serious threats to our environment. Analyze the impact of sand mining on river mouths and coastal ecosystems.',
    tags: ['Coastal Sand Mining', 'River Bed Erosion', 'Saline Water Ingress', 'Beach Destruction', 'Sustainable Sand Mining Guidelines']
  },
  {
    year: 2019,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs3-env',
    text: 'Assess the impact of electronic waste (e-waste) generation in India. Critically examine the implementation of E-Waste (Management) Rules.',
    tags: ['E-Waste Management', 'Informal Recycling Sector', 'Toxic Heavy Metals', 'Extended Producer Responsibility (EPR)', 'Circular Economy']
  },
  {
    year: 2019,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs3-dis',
    text: 'Vulnerability is an essential element for defining disaster impacts and its threat to people. How and in what ways can vulnerability to disasters be assessed? Discuss with examples.',
    tags: ['Disaster Vulnerability Assessment', 'Physical & Socio-Economic Vulnerability', 'Capacity Mapping', 'Risk Hazard Vulnerability Analysis (HVRA)', 'Sendai Priority 1']
  },
  {
    year: 2019,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'The banning of certain organizations under the Unlawful Activities (Prevention) Act (UAPA) is a vital weapon against terrorism. Discuss the recent amendments to UAPA and the human rights concerns raised.',
    tags: ['UAPA Amendment 2019', 'Designating Individuals as Terrorists', 'NIA Confiscation Powers', 'Due Process & Civil Liberties', 'National Security']
  },
  {
    year: 2019,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'Cross-border smuggling of narcotics and psychotropic substances is directly linked with illicit terror funding. Discuss India\'s multi-agency institutional response.',
    tags: ['Narco-Terror Nexus', 'Terror Funding', 'Narcotics Control Bureau (NCB)', 'Multi-Agency Coordination Centre (MAC)', 'Financial Intelligence Unit (FIU)']
  },

  // ====================================================
  // 2018 (20 questions)
  // ====================================================
  {
    year: 2018,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs3-eco',
    text: '"Access to affordable, reliable, sustainable and modern energy is the sine qua non to achieve Sustainable Development Goals (SDGs)." Comment on the progress made in India in this regard.',
    tags: ['SDG 7 Affordable Clean Energy', 'Saubhagya Scheme', 'Ujjwala Yojana', 'Renewable Energy Progress', 'Sustainable Development']
  },
  {
    year: 2018,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs3-eco',
    text: 'Comment on the important changes introduced in the Public Expenditure Management in India in recent years.',
    tags: ['Public Expenditure Management', 'Merger of Plan & Non-Plan Budget', 'Advancement of Budget Date', 'PFMS System', 'Outcome Budgeting']
  },
  {
    year: 2018,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs3-agr',
    text: 'What do you mean by minimum support price (MSP)? How will MSP rescue the farmers from the low-income trap?',
    tags: ['Minimum Support Price (MSP)', 'CACP Formula (A2+FL vs C2)', 'Low Income Trap', 'Farm Price Assurance', 'Procurement Realities']
  },
  {
    year: 2018,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs3-agr',
    text: 'Examine the role of supermarkets in supply chains of agricultural produce. How do they affect the small retail vendors and local mandi traders?',
    tags: ['Organized Retail & Mandis', 'Contract Farming', 'Disintermediation', 'Impact on Small Vendors', 'Farm-to-Fork Model']
  },
  {
    year: 2018,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs3-sci',
    text: 'Discuss the work of Bose-Einstein Statistics done by Prof. Satyendra Nath Bose and its impact on the development of modern quantum mechanics.',
    tags: ['Satyendra Nath Bose', 'Bose-Einstein Statistics', 'Bosons', 'Bose-Einstein Condensate', 'Quantum Physics History']
  },
  {
    year: 2018,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs3-sci',
    text: 'Why is there so much excitement about the launch of the James Webb Space Telescope (JWST)? What capabilities does it possess over Hubble Space Telescope?',
    tags: ['James Webb Space Telescope', 'JWST vs Hubble', 'Infrared Spectrum', 'Deep Space Exploration', 'Early Universe Observation']
  },
  {
    year: 2018,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs3-env',
    text: 'How does biodiversity vary in India along the climatic gradients? What are the key anthropogenic pressures threatening biodiversity hotspots in Western Ghats and Himalayas?',
    tags: ['Biodiversity Gradients', 'Biodiversity Hotspots', 'Western Ghats Ecology', 'Habitat Fragmentation', 'Gadgil & Kasturirangan Reports']
  },
  {
    year: 2018,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs3-dis',
    text: 'Describe various measures taken in India for Disaster Risk Reduction (DRR) before and after signing ‘Sendai Framework for DRR (2015-2030)’.',
    tags: ['Sendai Framework for DRR', 'National Disaster Management Plan (NDMP)', 'Pre-Disaster Preparedness', 'Early Warning Modernization', 'Community Resilience']
  },
  {
    year: 2018,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs3-sec',
    text: 'Data security has assumed utmost importance in the digital world. Discuss the key recommendations of Justice B.N. Srikrishna Committee on data protection.',
    tags: ['Justice Srikrishna Committee', 'Data Protection Framework', 'Data Fiduciaries & Principals', 'Data Localization', 'Digital Sovereignty']
  },
  {
    year: 2018,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs3-sec',
    text: 'Left Wing Extremism (LWE) is showing a downward trend, but still affects several states. Briefly explain the Government of India\'s approach to counter the LWE challenge.',
    tags: ['LWE Downward Trend', 'Security & Development Approach', 'Surrender and Rehabilitation Policy', 'Bastariya Battalion', 'Infrastructure Development']
  },
  {
    year: 2018,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs3-eco',
    text: 'How are the principles of inclusive growth addressed in the flagship schemes of the Government of India like Jan Dhan Yojana, PM Awas Yojana, and Ayushman Bharat?',
    tags: ['Inclusive Growth Schemes', 'PMJDY Financial Inclusion', 'PMAY Housing for All', 'PM-JAY Universal Healthcare', 'Vulnerable Sections Welfare']
  },
  {
    year: 2018,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs3-inf',
    text: 'Analyze the significance of the Bharatmala Pariyojana in improving freight logistics efficiency and highway connectivity across economic corridors.',
    tags: ['Bharatmala Pariyojana', 'Economic Corridors', 'Logistics Parks', 'Border Roads & Coastal Highways', 'Highway Development']
  },
  {
    year: 2018,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs3-agr',
    text: 'Assess the role of National Mission on Sustainable Agriculture (NMSA) in climate adaptation strategies for Indian farmers.',
    tags: ['NMSA Mission', 'Climate Adaptation Agriculture', 'Rainfed Area Development', 'Soil Health Management', 'Water Conservation']
  },
  {
    year: 2018,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs3-agr',
    text: 'What are the main causes of post-harvest losses of fruits and vegetables in India? Discuss the measures required to establish robust cold chain networks.',
    tags: ['Post-Harvest Losses', 'Cold Chain Infrastructure', 'Operation Greens', 'Perishable Food Logistics', 'Farmer Producer Organizations (FPOs)']
  },
  {
    year: 2018,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs3-sci',
    text: 'What is India\'s third-stage nuclear power programme? How does it aim to utilize vast domestic thorium reserves for long-term energy security?',
    tags: ['Three-Stage Nuclear Programme', 'Homi Bhabha Roadmap', 'Fast Breeder Reactors (AHWR)', 'Thorium Utilization', 'Nuclear Energy Security']
  },
  {
    year: 2018,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs3-env',
    text: 'What are the key provisions of the Wetland (Conservation and Management) Rules, 2017? How do they decentralize wetland protection to the states?',
    tags: ['Wetlands Rules 2017', 'State Wetland Authorities', 'Decentralized Management', 'Ramsar Sites in India', 'Wetland Conservation']
  },
  {
    year: 2018,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs3-env',
    text: 'Solid Waste Management continues to be an acute urban challenge. Critically evaluate the implementation of the Solid Waste Management Rules, 2016.',
    tags: ['Solid Waste Management Rules 2016', 'Source Segregation', 'Waste-to-Energy Plants', 'Landfill Remediation (Biomining)', 'Swachh Bharat Mission']
  },
  {
    year: 2018,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs3-dis',
    text: 'The 2018 Kerala floods highlighted the vulnerability of river basins to extreme rainfall and dam management. Analyze the lessons for reservoir operation during extreme weather.',
    tags: ['Kerala Floods 2018', 'Dam Operations Rule Curves', 'Mullaperiyar & Idukki', 'Extreme Precipitation', 'Integrated Reservoir Management']
  },
  {
    year: 2018,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'Discuss the role of social media in spreading fake news, communal discord, and mob lynchings in India. What regulatory measures can check this menace without violating free speech?',
    tags: ['Fake News on Social Media', 'Mob Lynching Incidents', 'WhatsApp Viral Rumours', 'Intermediary Guidelines', 'Free Speech Balance']
  },
  {
    year: 2018,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'India\'s border management is a multifaceted challenge due to porous borders, complex terrain, and hostile neighbours. Analyze the challenges in securing the Indo-Bangladesh and Indo-Pakistan borders.',
    tags: ['Indo-Bangladesh Border', 'Indo-Pak Border Management', 'Riverine Frontiers (Chhar areas)', 'Cross-Border Infiltration', 'Smart Fencing & BSF']
  },

  // ====================================================
  // 2017 (20 questions)
  // ====================================================
  {
    year: 2017,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs3-eco',
    text: 'Among several factors for India\'s potential growth, savings rate is the most effective one. Do you agree? What are the other factors that determine the growth potential?',
    tags: ['Savings Rate & Growth', 'Gross Capital Formation', 'Total Factor Productivity', 'Demographic Dividend', 'Potential Growth']
  },
  {
    year: 2017,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs3-eco',
    text: 'Account for the failure of manufacturing sector in achieving the targeted goal of labor-intensive exports. Suggest corrective measures.',
    tags: ['Manufacturing Exports', 'Labour-Intensive Sectors (Textiles/Leather)', 'Inverted Duty Structure', 'Logistics & Ease of Doing Business', 'Special Economic Zones']
  },
  {
    year: 2017,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs3-agr',
    text: 'Explain various reasons for the failure of agricultural marketing in India. How does the model APMC Act proposed by the Centre attempt to address these?',
    tags: ['Agricultural Marketing Failure', 'Model APMC Act', 'Direct Marketing', 'Single Point Levy', 'Private Wholesale Markets']
  },
  {
    year: 2017,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs3-agr',
    text: 'How do subsidies affect the cropping pattern, crop diversity and food security of small and marginal farmers? What should be the ideal subsidy structure?',
    tags: ['Farm Subsidies Impact', 'Cropping Pattern Distortions', 'Fertilizer & Power Subsidies', 'Direct Cash Support', 'Crop Diversity']
  },
  {
    year: 2017,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs3-sci',
    text: 'India has achieved remarkable successes in unmanned space exploration with missions like Chandrayaan and Mars Orbiter Mission (Mangalyaan). What are the next planned frontiers?',
    tags: ['Mars Orbiter Mission (Mangalyaan)', 'Chandrayaan Programme', 'Aditya L1 Solar Mission', 'Venus Mission (Shukrayaan)', 'Deep Space Exploration']
  },
  {
    year: 2017,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs3-sci',
    text: 'Give an account of the growth and development of nuclear science and technology in India. What is the advantage of fast breeder reactor technology?',
    tags: ['Nuclear Science Growth', 'Fast Breeder Reactors (PFBR)', 'Kalpakkam Prototype', 'Plutonium Fuel Cycle', 'Self-Sustaining Nuclear Fuel']
  },
  {
    year: 2017,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs3-env',
    text: '\'Climate change\' is a global problem. How will India be affected by climate change? How Himalayan and coastal states of India a affect a particularly vulnerable state?',
    tags: ['Climate Change Vulnerability', 'Himalayan Glacial Retreat', 'Coastal Sea Level Rise', 'Extreme Rainfall & Cyclones', 'National Action Plan on Climate Change']
  },
  {
    year: 2017,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs3-dis',
    text: 'On December 2004, tsumani brought havoc on 14 countries including India. Discuss the factors responsible for the occurrence of Tsunami and describe the warning system developed thereafter.',
    tags: ['2004 Indian Ocean Tsunami', 'Subduction Zone Earthquakes', 'INCOIS Tsunami Early Warning System', 'Ocean Bottom Pressure Recorders', 'Coastal Preparedness']
  },
  {
    year: 2017,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs3-sec',
    text: 'The North-East region of India has been infested with insurgency since independence. Analyze the major reasons for the survival of insurgent groups in this region.',
    tags: ['Northeast Insurgency Survival', 'Difficult Terrain & Porous Borders', 'Ethnic Fractures & Demands', 'Safe Havens in Neighbouring Countries', 'Extortion Economy']
  },
  {
    year: 2017,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs3-sec',
    text: 'Mob violence and vigilantism pose a grave challenge to internal law and order. Discuss the socio-legal mechanisms needed to curb mobocracy.',
    tags: ['Mob Violence & Vigilantism', 'Tehseen Poonawalla Guidelines', 'Rule of Law Breakdown', 'Social Media Rumour Control', 'Law & Order Machinery']
  },
  {
    year: 2017,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs3-eco',
    text: 'What are the salient features of the \'inclusive growth\'? Has India been experiencing such a growth process? Analyze with reference to employment and poverty indicators.',
    tags: ['Inclusive Growth Features', 'Poverty Reduction vs Job Creation', 'Labour Force Participation Rate', 'Informalization of Labour', 'Social Safety Nets']
  },
  {
    year: 2017,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs3-inf',
    text: 'Examine the development of inland waterways as an alternative mode of transport in India. What are the economic, environmental and navigational challenges involved?',
    tags: ['Inland Waterways Development', 'National Waterway 1 (Ganga)', 'Jal Marg Vikas Project', 'Low Carbon Transport', 'River Siltation & Dredging']
  },
  {
    year: 2017,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs3-agr',
    text: 'What are the major reasons for declining public investment in Indian agriculture? How does it affect agricultural growth and farm productivity?',
    tags: ['Public Investment in Agriculture', 'Gross Capital Formation in Agri', 'Revenue Expenditure vs Capital Outlay', 'Subsidies Crowding Out R&D', 'Irrigation Investment']
  },
  {
    year: 2017,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs3-agr',
    text: 'Assess the importance of the Pradhan Mantri Fasal Bima Yojana (PMFBY) in mitigating agricultural risk for farmers. What are the main implementation issues faced by states and farmers?',
    tags: ['PMFBY Crop Insurance', 'Actuarial Premium Rates', 'Crop Cutting Experiments (CCEs)', 'Delayed Claim Settlements', 'Private Insurer Participation']
  },
  {
    year: 2017,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs3-sci',
    text: 'Stem cell therapy is gaining popularity in India to treat a wide variety of medical conditions. Describe briefly what stem cell therapy is and what are the advantages it has over other treatments.',
    tags: ['Stem Cell Therapy', 'Pluripotent Stem Cells', 'Regenerative Medicine', 'Bone Marrow Transplants', 'Ethical & Regulatory Guidelines']
  },
  {
    year: 2017,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs3-env',
    text: '\'The Namami Gange project aims at comprehensive river conservation.\' Analyze the multi-sectoral interventions underway to clean River Ganga and evaluate the progress achieved.',
    tags: ['Namami Gange Project', 'Sewage Treatment Plants (STPs)', 'Industrial Effluents Abatement', 'Riverfront Development', 'Ecological Flow (E-Flow)']
  },
  {
    year: 2017,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs3-env',
    text: 'Discuss the concept of wildlife corridors. How do they mitigate human-wildlife conflicts and assist in genetic exchange among isolated animal populations?',
    tags: ['Wildlife Corridors', 'Human-Wildlife Conflict', 'Habitat Fragmentation', 'Elephant & Tiger Corridors', 'Eco-Sensitive Zones']
  },
  {
    year: 2017,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs3-dis',
    text: 'Urban heat islands (UHIs) have emerged as significant micro-climatic disasters in expanding Indian cities. Explain their causes, impacts, and urban planning solutions.',
    tags: ['Urban Heat Islands (UHIs)', 'Concrete Jungle Effect', 'Cool Roofs & Urban Green Spaces', 'Thermal Discomfort', 'Sustainable Urban Planning']
  },
  {
    year: 2017,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'Use of Internet and social media by non-state actors for subversive propaganda and radicalization is a grave internal security concern. Suggest comprehensive counter-measures.',
    tags: ['Subversive Online Propaganda', 'Cyber Radicalization', 'Counter-Narratives', 'Dark Web & Telegram Channels', 'National Security']
  },
  {
    year: 2017,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'The coastal security framework of India was revamped following the 26/11 attacks. Evaluate the existing institutional coordination between the Navy, Coast Guard, and Marine Police.',
    tags: ['Coastal Security Architecture', 'Navy & Coast Guard Coordination', 'Marine Police Stations', 'Joint Operations Centres (JOCs)', 'Fishermen as Eyes & Ears']
  },

  // ====================================================
  // 2016 (20 questions)
  // ====================================================
  {
    year: 2016,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs3-eco',
    text: 'How globalization has led to the reduction of employment in the formal sector of the Indian economy? Is increased informalization detrimental to the development of the country?',
    tags: ['Informalization of Labour', 'Globalisation & Formal Jobs', 'Contractual Employment', 'Social Security Deficit', 'Economic Development']
  },
  {
    year: 2016,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs3-eco',
    text: 'Women entrepreneurship in India faces diverse cultural, financial and institutional barriers. Discuss how government schemes like Stand Up India promote women entrepreneurs.',
    tags: ['Women Entrepreneurship', 'Stand Up India Scheme', 'Collateral-Free Credit', 'Socio-Cultural Barriers', 'Start-Up Ecosystem']
  },
  {
    year: 2016,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs3-agr',
    text: 'Explain the technical and economic reasons for the slow pace of agricultural diversification towards high-value crops in India.',
    tags: ['Crop Diversification Bottlenecks', 'High-Value Crops (Fruits/Vegetables)', 'Price Volatility & Risk', 'Storage & Logistics Deficit', 'Cereal Dominance']
  },
  {
    year: 2016,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs3-agr',
    text: 'Discuss the role of land reforms in addressing agrarian distress and rural poverty in India. Why have tenancy reforms been largely unsuccessful?',
    tags: ['Land Reforms Evaluation', 'Tenancy Reforms Failure', 'Informal & Concealed Tenancy', 'Land Ceilings', 'Agrarian Transformation']
  },
  {
    year: 2016,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs3-sci',
    text: 'Discuss India\'s achievements in the development of indigenous cryogenic engine technology for satellite launch vehicles.',
    tags: ['Cryogenic Engine Technology', 'GSLV Mk II & Mk III', 'Liquid Hydrogen & Liquid Oxygen', 'ISRO Self-Reliance', 'Heavy Satellite Launches']
  },
  {
    year: 2016,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs3-sci',
    text: 'What are the main applications of nanotechnology in the agricultural sector, particularly in precision farming and soil health monitoring?',
    tags: ['Nanotechnology in Agriculture', 'Nano-Fertilizers (Nano Urea)', 'Nano-Sensors for Soil', 'Precision Farming', 'Sustainable Agriculture']
  },
  {
    year: 2016,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs3-env',
    text: 'Rehabilitation of human settlements is one of the major environmental and social impacts of developmental projects. Discuss with examples from river valley projects.',
    tags: ['Resettlement & Rehabilitation (R&R)', 'Narmada Bachao Andolan', 'Submergence of Lands', 'LARR Act 2013', 'Development vs Ecology']
  },
  {
    year: 2016,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs3-dis',
    text: 'With reference to the National Disaster Management Authority (NDMA) guidelines, discuss the measures to be adopted to mitigate the impact of urban floods.',
    tags: ['NDMA Urban Flood Guidelines', 'Drainage De-silting', 'Rainwater Harvesting', 'Wetland Encroachment Ban', 'Early Warning Dissemination']
  },
  {
    year: 2016,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs3-sec',
    text: 'The use of technology in border management has become indispensable. Discuss the role of laser walls, thermal imagers and smart sensors along international borders.',
    tags: ['Technology in Border Management', 'Laser Walls & Thermal Imagers', 'CIBMS Smart Fencing', 'Riverine & Desert Border Security', 'Border Surveillance']
  },
  {
    year: 2016,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs3-sec',
    text: 'The problem of international terrorism has been aggravated by illicit funds generated through drug trafficking and arms trade. Discuss.',
    tags: ['Terror Financing & Narco-Trade', 'Transnational Crime Syndicates', 'Hawala Channels', 'Golden Crescent Proximity', 'Counter-Terrorism Finance']
  },
  {
    year: 2016,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs3-eco',
    text: 'Justify the need for Monetary Policy Committee (MPC) in India. How does the inflation-targeting framework adopted by the Reserve Bank of India function?',
    tags: ['Monetary Policy Committee (MPC)', 'Flexible Inflation Targeting (4±2%)', 'RBI Act Amendment 2016', 'Monetary Policy Transmission', 'Price Stability']
  },
  {
    year: 2016,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs3-inf',
    text: 'Examine the potential of renewable energy in India with special reference to the National Solar Mission. What are the key financing and technological hurdles?',
    tags: ['National Solar Mission', 'Solar Energy Tariffs', 'Discom Financial Losses', 'Solar Photovoltaic Cell Imports', 'Energy Transition']
  },
  {
    year: 2016,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs3-agr',
    text: 'Discuss the concept of Minimum Support Price (MSP) and evaluate its impact on farmers\' cropping choices and groundwater depletion in northwestern India.',
    tags: ['MSP Distortions', 'Paddy-Wheat Monoculture', 'Groundwater Depletion in Punjab/Haryana', 'Crop Diversification Need', 'Sustainable Agriculture']
  },
  {
    year: 2016,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs3-agr',
    text: 'How can the biotechnology help to improve the living standards of farmers? Discuss the economic and ecological impact of Bt cotton in India.',
    tags: ['Bt Cotton Impact', 'Pest Resistance (Pink Bollworm)', 'Yield Stagnation', 'Seed Monopolies', 'Biotechnology Economics']
  },
  {
    year: 2016,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs3-sci',
    text: 'What are the main principles and applications of CRISPR-Cas9 gene editing technology? Discuss the ethical dilemmas associated with germline editing.',
    tags: ['CRISPR-Cas9 Gene Editing', 'Molecular Scissors', 'Genetic Diseases Therapy', 'Germline Modification Ethics', 'Designer Babies Controversy']
  },
  {
    year: 2016,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs3-env',
    text: 'Give an account of the consequences of the 2015 Paris Climate Agreement (COP21). What are the main commitments made by India under its Intended Nationally Determined Contributions (INDCs)?',
    tags: ['Paris Agreement (COP21)', 'INDCs of India', '33-35% Emission Intensity Cut', '40% Non-Fossil Electricity Target', 'Carbon Sink 2.5-3 Gt']
  },
  {
    year: 2016,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs3-env',
    text: 'Analyze the causes and impacts of rising instances of forest fires in the Himalayan states of Uttarakhand and Himachal Pradesh. Suggest mitigation measures.',
    tags: ['Himalayan Forest Fires', 'Pine Needle Accumulation', 'Dry Spell & Heatwaves', 'Loss of Biodiversity & Soil Carbon', 'Community Forest Van Panchayats']
  },
  {
    year: 2016,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs3-dis',
    text: 'Major cities in India are located in seismically active zones. Discuss the earthquake vulnerability of Delhi-NCR and suggest building bye-law compliance measures.',
    tags: ['Earthquake Vulnerability of Delhi', 'Seismic Zone IV', 'Non-Engineered Buildings', 'Structural Retrofitting', 'National Building Code']
  },
  {
    year: 2016,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'Cyber warfare has emerged as the fifth domain of warfare. Analyze the vulnerabilities of India\'s critical infrastructure and evaluate the National Cyber Security Policy.',
    tags: ['Cyber Warfare 5th Domain', 'Critical Infrastructure Protection', 'National Cyber Security Policy 2013', 'SCADA Vulnerabilities', 'Cyber Deterrence']
  },
  {
    year: 2016,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'Left Wing Extremism (LWE) thrives on exploitation of tribal grievances regarding land, water and forest rights. Discuss how forest rights implementation can help eliminate LWE.',
    tags: ['Forest Rights Act (FRA 2006)', 'Jal Jungle Zameen', 'LWE Root Causes', 'Tribal Title Deeds', 'Grassroots Democracy']
  },

  // ====================================================
  // 2015 (20 questions)
  // ====================================================
  {
    year: 2015,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs3-eco',
    text: 'The concept of \'Make in India\' aims to transform India into a global manufacturing hub. What are the major manufacturing bottlenecks that must be resolved to achieve this objective?',
    tags: ['Make in India', 'Manufacturing Bottlenecks', 'Land Acquisition & Labour Laws', 'Logistics Infrastructure', 'Ease of Doing Business']
  },
  {
    year: 2015,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs3-eco',
    text: 'What are the main causes of the ongoing slowdown in Indian exports? Suggest policy measures to enhance export competitiveness in the global market.',
    tags: ['Export Slowdown Causes', 'Global Trade Stagnation', 'Overvalued Currency', 'Non-Tariff Barriers', 'Export Competitiveness']
  },
  {
    year: 2015,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs3-agr',
    text: 'Explain the significance of the Pradhan Mantri Krishi Sinchayee Yojana (PMKSY) in addressing the irrigation crisis. How does "Har Khet Ko Pani" bridge the irrigation gap?',
    tags: ['PM Krishi Sinchayee Yojana (PMKSY)', 'Har Khet Ko Pani', 'Accelerated Irrigation Benefits Programme (AIBP)', 'Water Use Efficiency', 'Command Area Development']
  },
  {
    year: 2015,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs3-agr',
    text: 'Livestock rearing is a key supplementary source of income for small and marginal farmers. Discuss the potential of the National Dairy Plan in transforming rural incomes.',
    tags: ['Livestock & Dairy Economy', 'National Dairy Plan', 'Artificial Insemination & Breed Improvement', 'Milk Processing Cooperatives', 'Smallholder Incomes']
  },
  {
    year: 2015,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs3-sci',
    text: 'Discuss the advantages and challenges of fuel cell electric vehicles (FCEVs) compared to conventional battery electric vehicles (BEVs).',
    tags: ['Fuel Cell Electric Vehicles (FCEVs)', 'Hydrogen Fuel Cells', 'Battery Electric Vehicles (BEVs)', 'Hydrogen Infrastructure', 'Clean Mobility']
  },
  {
    year: 2015,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs3-sci',
    text: 'What is the indigenously developed Regional Navigation Satellite System (NavIC)? Discuss its civilian and military applications for India.',
    tags: ['NavIC / IRNSS', 'Satellite Navigation', 'Positioning Accuracy', 'Civilian & Strategic Applications', 'ISRO Constellation']
  },
  {
    year: 2015,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs3-env',
    text: 'Explain the concept of Intended Nationally Determined Contributions (INDCs) submitted under the UNFCCC. How does India\'s climate action plan reflect climate justice?',
    tags: ['INDCs under UNFCCC', 'Climate Justice', 'Common but Differentiated Responsibilities', 'Per Capita Emissions', 'National Climate Action']
  },
  {
    year: 2015,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs3-dis',
    text: 'The 2015 Chennai floods revealed the severe urban planning vulnerabilities of coastal metropolitan cities. Discuss the anthropogenic causes of the disaster.',
    tags: ['Chennai Floods 2015', 'Encroachment of Pallikaranai Marshland', 'Stormwater Drain Clogging', 'Excessive Reservoir Release', 'Urban Flood Governance']
  },
  {
    year: 2015,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs3-sec',
    text: 'Cross-border infiltration along the western border is aided by tunnels and difficult terrain. Discuss the technological countermeasures deployed under smart border management.',
    tags: ['Cross-Border Infiltration Tunnels', 'Western Border Security', 'Ground Penetrating Radars', 'Smart Fencing (CIBMS)', 'Anti-Tunneling Protocols']
  },
  {
    year: 2015,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs3-sec',
    text: 'Human trafficking has emerged as a major form of organized crime affecting women and children. Discuss the socio-economic factors and legal frameworks to prevent trafficking.',
    tags: ['Human Trafficking Prevention', 'Organized Crime Syndicates', 'Ujjawala Scheme', 'Section 370 IPC', 'Inter-State Police Coordination']
  },
  {
    year: 2015,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs3-eco',
    text: 'The Fourteenth Finance Commission (FFC) increased the tax devolution to states from 32% to 42%. Analyze how this structural shift enhances fiscal federalism and state expenditure autonomy.',
    tags: ['14th Finance Commission Devolution', '32 to 42 Percent Share', 'Fiscal Autonomy of States', 'Untied Funds', 'Centrally Sponsored Schemes Restructuring']
  },
  {
    year: 2015,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs3-inf',
    text: 'Analyze the reasons for the acute financial distress of power distribution companies (DISCOMs) in India. How does the Ujwal DISCOM Assurance Yojana (UDAY) address these structural issues?',
    tags: ['DISCOM Losses & AT&C Loss', 'UDAY Scheme', 'Power Sector Debt Restructuring', 'Tariff Revisions', 'Power Distribution Reforms']
  },
  {
    year: 2015,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs3-agr',
    text: 'Critically analyze the role of Agricultural Produce Market Committees (APMCs) in agricultural trade. What reforms are necessary to create a unified national market for agricultural commodities?',
    tags: ['APMC Reforms', 'National Agriculture Market (e-NAM)', 'Monopolistic Mandi Practices', 'Intermediaries & Commission Agents', 'Unified National Market']
  },
  {
    year: 2015,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs3-agr',
    text: 'Soil health degradation is a silent crisis in Indian agriculture due to excessive and imbalanced chemical fertilizer use. Discuss the role of the Soil Health Card scheme in restoring soil fertility.',
    tags: ['Soil Health Degradation', 'NPK Imbalance', 'Urea Subsidy Distortion', 'Soil Health Card Scheme', 'Customized Fertilizer Applications']
  },
  {
    year: 2015,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs3-sci',
    text: 'Discuss the concept of Internet of Things (IoT) and explain how smart devices connected over high-speed networks can transform urban infrastructure and industrial manufacturing.',
    tags: ['Internet of Things (IoT)', 'Industrial IoT (Industry 4.0)', 'Smart Cities Applications', 'Sensor Networks & Data Analytics', 'Digital Transformation']
  },
  {
    year: 2015,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs3-env',
    text: 'Discuss the ecological and socio-economic importance of wetlands in India. Why are urban wetlands rapidly vanishing and what are the conservation strategies?',
    tags: ['Wetlands Ecological Importance', 'Vanishing Urban Wetlands', 'Flood Cushioning & Aquifer Recharge', 'Ramsar Convention', 'Wetland Conservation']
  },
  {
    year: 2015,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs3-env',
    text: 'Examine the problem of electronic waste (e-waste) management in India. How can the Extended Producer Responsibility (EPR) principle enforce corporate accountability?',
    tags: ['E-Waste Crisis', 'Extended Producer Responsibility (EPR)', 'Informal E-Waste Recyclers', 'Heavy Metal Poisoning', 'Circular Economy']
  },
  {
    year: 2015,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs3-dis',
    text: 'Analyze the institutional response of the National Disaster Response Force (NDRF) during the Nepal earthquake and other major disasters. What are the key areas for upgrading search and rescue capabilities?',
    tags: ['NDRF Disaster Operations', 'Nepal Earthquake Search & Rescue', 'Canine Squads & Specialized Equipment', 'First Responders Training', 'Disaster Response Modernization']
  },
  {
    year: 2015,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'Analyze the internal security challenges posed by maritime piracy in the Western Indian Ocean and Gulf of Aden. How does the Indian Navy protect merchant shipping lines?',
    tags: ['Maritime Piracy', 'Gulf of Aden Patrols', 'Somali Pirates Threat', 'Indian Navy Escort Operations', 'Anti-Maritime Piracy Bill']
  },
  {
    year: 2015,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'Left Wing Extremism (LWE) cannot be resolved through military action alone. Discuss the socio-economic, administrative and forest rights measures essential for eliminating Naxalism.',
    tags: ['LWE Comprehensive Solution', 'Forest Rights Implementation', 'Tribal Land Alienation Prevention', 'Road Connectivity in Bastar', 'Inclusive Development']
  },

  // ====================================================
  // 2014 (20 questions)
  // ====================================================
  {
    year: 2014,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs3-eco',
    text: 'Normally countries shift from agriculture to industry and then later to services, but India shifted directly from agriculture to services. What are the reasons for the huge growth of services sector in India?',
    tags: ['Structural Transformation Paradox', 'Services-Led Growth', 'IT & BPO Boom', 'Manufacturing Lag', 'Economic Development Pattern']
  },
  {
    year: 2014,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs3-eco',
    text: 'Capital account convertibility involves both opportunities and vulnerabilities for a developing economy. In this context, analyze India\'s gradualist approach to capital account convertibility.',
    tags: ['Capital Account Convertibility', 'Tarapore Committee Recommendations', 'Foreign Exchange Volatility', 'Gradualist Capital Inflows', 'Macroeconomic Stability']
  },
  {
    year: 2014,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs3-agr',
    text: '"In the context of food security, the Public Distribution System (PDS) in India requires radical overhaul." Discuss the key recommendations of the Shanta Kumar Committee on restructuring of Food Corporation of India (FCI).',
    tags: ['Shanta Kumar Committee', 'FCI Restructuring', 'PDS Reform & Cash Transfers', 'Decentralized Procurement', 'Buffer Stock Rationalization']
  },
  {
    year: 2014,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs3-agr',
    text: 'India is the largest producer of pulses in the world, yet it continues to import massive quantities to meet domestic demand. Analyze the reasons for stagnating pulses production in India.',
    tags: ['Pulses Production Deficit', 'Rainfed Cultivation of Pulses', 'MSP Procurement Gaps', 'Import Dependency', 'Protein Inflation']
  },
  {
    year: 2014,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs3-sci',
    text: 'Scientific research in Indian universities has declined compared to specialized research laboratories. Discuss the reasons and suggest measures to revitalize university-level R&D.',
    tags: ['University Research Decline', 'R&D Funding Deficit', 'Higher Education Research', 'Industry-University Linkages', 'National Research Foundation']
  },
  {
    year: 2014,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs3-sci',
    text: 'What are the main principles and applications of three-dimensional (3D) printing? How can additive manufacturing transform industrial production in India?',
    tags: ['3D Printing / Additive Manufacturing', 'Rapid Prototyping', 'Aerospace & Healthcare Applications', 'National Strategy for Additive Manufacturing', 'Manufacturing Revolution']
  },
  {
    year: 2014,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs3-env',
    text: 'Environmental clearance process in India is often perceived as an impediment to economic development. Critically analyze how the EIA process can balance environmental protection with ease of doing business.',
    tags: ['EIA Process Streamlining', 'Ease of Doing Business', 'Environmental Clearances', 'Polluter Pays Principle', 'Sustainable Industrial Growth']
  },
  {
    year: 2014,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs3-dis',
    text: 'Analyze the causes and administrative shortcomings responsible for the massive devastation during the 2014 Kashmir floods. What flood management lessons can be drawn?',
    tags: ['Kashmir Floods 2014', 'Jhelum River Overflow', 'Wetlands Reclamation in Srinagar', 'Drainage Siltation', 'Disaster Preparedness Gaps']
  },
  {
    year: 2014,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs3-sec',
    text: 'Cross-border terrorism remains India\'s primary national security challenge. Discuss the institutional measures established to coordinate intelligence sharing among security agencies.',
    tags: ['Intelligence Sharing Mechanism', 'Multi-Agency Centre (MAC)', 'NATGRID Framework', 'Cross-Border Terrorism', 'Security Coordination']
  },
  {
    year: 2014,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs3-sec',
    text: 'The Prevention of Money Laundering Act (PMLA) has undergone several amendments to combat financial terrorism. Discuss the powers of the Enforcement Directorate (ED) under PMLA.',
    tags: ['PMLA & Financial Terrorism', 'Enforcement Directorate (ED) Powers', 'Attachment of Property', 'FATF Guidelines Compliance', 'Money Laundering Control']
  },
  {
    year: 2014,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs3-eco',
    text: 'Discuss the rationale and significance of the Fiscal Responsibility and Budget Management (FRBM) Act, 2003. How far has it succeeded in enforcing fiscal discipline in India?',
    tags: ['FRBM Act 2003', 'Fiscal Deficit Targets (3% of GDP)', 'Revenue Deficit Elimination', 'Escape Clauses & NK Singh Committee', 'Fiscal Consolidation']
  },
  {
    year: 2014,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs3-inf',
    text: 'The infrastructure deficit in India has been a major drag on economic growth. Examine the role of Infrastructure Debt Funds (IDFs) and Real Estate Investment Trusts (REITs) in mobilizing long-term capital.',
    tags: ['Infrastructure Financing', 'Infrastructure Debt Funds (IDFs)', 'REITs & InvITs', 'Asset Monetization', 'Long-Term Pension & Insurance Capital']
  },
  {
    year: 2014,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs3-agr',
    text: 'Evaluate the role of agricultural subsidies (fertilizer, power and water) in Indian agriculture. Why is there a compelling case for transitioning from input subsidies to direct income transfers?',
    tags: ['Input Subsidies vs Direct Income Transfers', 'Fertilizer & Power Subsidies', 'Depletion of Aquifers', 'Nutrient Imbalance', 'PM-KISAN Model']
  },
  {
    year: 2014,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs3-agr',
    text: 'Discuss the concept of food security under the National Food Security Act (NFSA), 2013. How does the life-cycle approach address the nutritional vulnerability of mothers and infants?',
    tags: ['National Food Security Act (NFSA 2013)', 'Life-Cycle Approach', 'Maternity Benefits (Article 4)', 'Supplementary Nutrition', 'Targeted Public Distribution']
  },
  {
    year: 2014,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs3-sci',
    text: 'What are the main scientific achievements and technological breakthroughs of the Mars Orbiter Mission (Mangalyaan)? Why is it considered a triumph of frugal engineering?',
    tags: ['Mars Orbiter Mission (MOM)', 'Mangalyaan Frugal Engineering', 'Hohmann Transfer Orbit', 'ISRO Interplanetary Milestone', 'Cost-Effective Space Exploration']
  },
  {
    year: 2014,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs3-env',
    text: 'Examine the recommendations of the Madhav Gadgil Committee and Kasturirangan Committee on the Western Ghats ecology. Why has the declaration of Ecologically Sensitive Areas (ESAs) faced stiff resistance from local communities?',
    tags: ['Western Ghats Ecology', 'Gadgil vs Kasturirangan Report', 'Ecologically Sensitive Areas (ESA)', 'Local Community Resistance', 'Development vs Conservation']
  },
  {
    year: 2014,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs3-env',
    text: 'What is climate finance? Discuss the deadlock between developed and developing countries regarding the 100 billion dollars annual climate fund promised under the Copenhagen Accord.',
    tags: ['Climate Finance Deadlock', '100 Billion Dollar Promise', 'Green Climate Fund (GCF)', 'Loss and Damage Debate', 'Common but Differentiated Responsibilities']
  },
  {
    year: 2014,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs3-dis',
    text: 'Analyze the disaster management preparedness during Cyclone Phailin (2013) in Odisha. How did effective early warning and mass evacuation minimize human casualties compared to the 1999 Super Cyclone?',
    tags: ['Cyclone Phailin 2013', 'Odisha Disaster Preparedness', 'Zero Casualty Vision', 'Mass Evacuation Shelters', 'IMD Accurate Track Forecasting']
  },
  {
    year: 2014,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'Left Wing Extremism (LWE) poses a severe internal security challenge. Discuss how security operations like \'Operation Green Hunt\' coupled with developmental schemes can permanently neutralize LWE.',
    tags: ['Operation Green Hunt', 'Counter-Insurgency Strategy', 'Civic Action in Red Corridor', 'Road Connectivity Project (RRP)', 'Surrender Policy for Naxals']
  },
  {
    year: 2014,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'Analyze the threats posed by cyber espionage and advanced persistent threats (APTs) to India\'s national security and evaluate the capabilities of the National Technical Research Organisation (NTRO).',
    tags: ['Cyber Espionage & APTs', 'National Technical Research Organisation (NTRO)', 'National Cyber Security Coordinator', 'Critical Infrastructure Defense', 'Cyber Intelligence']
  },

  // ====================================================
  // 2013 (20 questions)
  // ====================================================
  {
    year: 2013,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs3-eco',
    text: 'What are the main reasons for the persistent high Current Account Deficit (CAD) in India? Discuss the policy measures undertaken to rein in CAD and stabilize the rupee.',
    tags: ['Current Account Deficit (CAD)', 'Gold & Crude Imports', 'Rupee Depreciation', 'Export Promotion Measures', 'Balance of Payments Crisis']
  },
  {
    year: 2013,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs3-eco',
    text: 'Examine the impact of volatile foreign institutional investment (FII) flows on the Indian macroeconomic stability. How does foreign direct investment (FDI) provide more stable capital?',
    tags: ['FII vs FDI Inflows', 'Hot Money Volatility', 'Capital Outflows Shock', 'Taper Tantrum 2013', 'Stable Long-Term Investment']
  },
  {
    year: 2013,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs3-agr',
    text: 'Discuss the role of institutional credit in Indian agriculture. Why are small and marginal farmers still largely dependent on non-institutional moneylenders?',
    tags: ['Agricultural Credit', 'Kisan Credit Card (KCC)', 'Moneylenders Grip', 'Informal Credit Burden', 'Priority Sector Lending']
  },
  {
    year: 2013,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs3-agr',
    text: 'Analyze the significance of the National Food Security Act (NFSA), 2013 in creating a legal entitlement to food. What are the fiscal and operational burdens it places on the Union and States?',
    tags: ['NFSA 2013 Legal Right to Food', 'Food Subsidy Bill', 'Procurement & Storage Logistics', 'Fiscal Burden on Union', 'PDS Revamping Mandate']
  },
  {
    year: 2013,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs3-sci',
    text: 'Discuss the concept of shale gas and analyze its potential as an unconventional energy source in India. What are the environmental concerns related to hydraulic fracturing (fracking)?',
    tags: ['Shale Gas Potential in India', 'Hydraulic Fracturing (Fracking)', 'Cambay & Krishna-Godavari Basins', 'Groundwater Contamination', 'Methane Leaks']
  },
  {
    year: 2013,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs3-sci',
    text: 'What are the salient features of the Intellectual Property Rights (IPR) policy in India? How does India balance intellectual property protection with public health imperatives under TRIPS?',
    tags: ['TRIPS Flexibilities', 'Compulsory Licensing (Natco Pharma)', 'Affordable Generic Drugs', 'Public Health Safeguards', 'Indian Patent Act Section 3(d)']
  },
  {
    year: 2013,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs3-env',
    text: 'Analyze the causes and consequences of rapid loss of biodiversity in India. What are the objectives of the Biological Diversity Act, 2002 and the role of National Biodiversity Authority (NBA)?',
    tags: ['Biological Diversity Act 2002', 'National Biodiversity Authority (NBA)', 'Access and Benefit Sharing (ABS)', 'Biodiversity Loss Causes', 'Peoples Biodiversity Registers']
  },
  {
    year: 2013,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs3-dis',
    text: 'The Uttarakhand tragedy of June 2013 was a classic example of an anthropogenic disaster precipitated by an extreme weather event. Critically analyze.',
    tags: ['Uttarakhand Tragedy 2013', 'Kedarnath Disaster', 'Unplanned Construction & Hydro Projects', 'Cloudburst & Glacial Outburst', 'Ecological Fragility of Himalayas']
  },
  {
    year: 2013,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs3-sec',
    text: 'Discuss the internal security threats arising from the illicit proliferation of small arms and light weapons in conflict zones of India.',
    tags: ['Small Arms Proliferation', 'Illicit Gun Running', 'Internal Security Threat', 'Insurgency & Gang Violence', 'Border Weapon Seizures']
  },
  {
    year: 2013,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs3-sec',
    text: 'Money laundering through hawala channels provides the lifeblood for terrorist networks. Discuss the international and domestic frameworks established to combat hawala financing.',
    tags: ['Hawala Channels', 'Terror Financing Networks', 'Financial Action Task Force (FATF)', 'FIU-IND Role', 'PMLA Regulatory Framework']
  },
  {
    year: 2013,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs3-eco',
    text: 'Critically examine whether high fiscal deficit necessarily leads to inflation. In this context, analyze India\'s fiscal consolidation road map post the 2008 global financial crisis.',
    tags: ['Fiscal Deficit & Inflation Nexus', 'Monetization of Deficit', 'Fiscal Consolidation Post-2008', 'Public Debt Sustainability', 'Kelkar Committee Report']
  },
  {
    year: 2013,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs3-inf',
    text: 'Examine the major impediments to private investment in infrastructure projects in India, with particular reference to land acquisition and environmental clearances.',
    tags: ['Infrastructure Bottlenecks', 'Land Acquisition Delays (RFCTLARR)', 'Environmental & Forest Clearances', 'Stalled PPP Projects', 'Bank NPAs in Infrastructure']
  },
  {
    year: 2013,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs3-agr',
    text: 'Discuss the impact of the Green Revolution on Indian agriculture. How has intensive monoculture farming contributed to the degradation of soil fertility and decline of water tables?',
    tags: ['Green Revolution Impacts', 'Paddy-Wheat Monoculture', 'Soil Salinization & Micronutrient Depletion', 'Groundwater Overdraft in Punjab', 'Sustainable Agricultural Transition']
  },
  {
    year: 2013,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs3-agr',
    text: 'What are the main objectives of the National Horticulture Mission (NHM)? How does diversification into horticulture crops boost farmer incomes and nutritional security?',
    tags: ['National Horticulture Mission', 'Horticulture Diversification', 'Cold Chain & Packhouses', 'Nutritional Security', 'High-Value Agriculture']
  },
  {
    year: 2013,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs3-sci',
    text: 'What is the Large Hadron Collider (LHC)? Explain the significance of the discovery of the Higgs Boson particle in confirming the Standard Model of particle physics.',
    tags: ['Large Hadron Collider (LHC)', 'Higgs Boson / God Particle', 'Standard Model of Physics', 'CERN Experiments', 'Origin of Mass']
  },
  {
    year: 2013,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs3-env',
    text: 'Analyze the causes and impacts of rising pollution levels in River Yamuna despite substantial expenditure on the Yamuna Action Plan (YAP). Suggest lasting ecological solutions.',
    tags: ['Yamuna River Pollution', 'Yamuna Action Plan Failures', 'Untreated Municipal Sewage', 'Lack of Environmental Flow (E-Flow)', 'Biological Oxygen Demand (BOD)']
  },
  {
    year: 2013,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs3-env',
    text: 'Examine the phenomenon of coral bleaching. What are the climatic and anthropogenic triggers leading to the destruction of coral reefs in Lakshadweep and Gulf of Mannar?',
    tags: ['Coral Bleaching Triggers', 'El Nino & Sea Warming', 'Gulf of Mannar & Lakshadweep', 'Zooxanthellae Expulsion', 'Ocean Acidification']
  },
  {
    year: 2013,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs3-dis',
    text: 'Analyze the institutional coordination between the National Disaster Management Authority (NDMA), State Disaster Management Authorities (SDMAs), and local administrations during major natural catastrophes.',
    tags: ['NDMA and SDMAs Coordination', 'Disaster Management Act 2005', 'District Disaster Management Authority (DDMA)', 'Resource Mobilization Gaps', 'Inter-Agency Command']
  },
  {
    year: 2013,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'Discuss the strategic threat of cyber attacks launched by state-sponsored actors against national security installations. Evaluate the mandate of the National Critical Information Infrastructure Protection Centre (NCIIPC).',
    tags: ['NCIIPC Mandate', 'State-Sponsored Cyber Attacks', 'Critical Information Infrastructure Protection', 'Section 70A IT Act', 'Cyber Warfare Readiness']
  },
  {
    year: 2013,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs3-sec',
    text: 'The vast and porous Indo-Nepal border has been exploited for smuggling of fake Indian currency notes (FICN) and infiltration of terrorists. Analyze the border management challenges along this open frontier.',
    tags: ['Indo-Nepal Open Border', 'Sashastra Seema Bal (SSB)', 'Fake Indian Currency (FICN)', 'Cross-Border Infiltration Risks', 'Treaty of Peace and Friendship 1950']
  }
];

module.exports = gs3Questions;
