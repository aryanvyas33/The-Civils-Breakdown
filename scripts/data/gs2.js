// UPSC CSE Mains GS Paper 2 Questions (2013 - 2024)
// Total 240 questions: 20 questions per year (Q1-10: 10 marks, Q11-20: 15 marks)

const gs2Questions = [
  // ====================================================
  // 2024 (20 questions)
  // ====================================================
  {
    year: 2024,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs2-con',
    text: 'Explain the constitutional significance of the "Basic Structure Doctrine". How has it served as a safety valve against majoritarianism?',
    tags: ['Basic Structure Doctrine', 'Kesavananda Bharati', 'Judicial Review', 'Constitutionalism', 'Separation of Powers']
  },
  {
    year: 2024,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs2-par',
    text: 'Discuss the concept of "One Nation, One Election" in India. What are the key constitutional, legal, and operational hurdles in implementing simultaneous elections?',
    tags: ['Simultaneous Elections', 'One Nation One Election', 'Election Commission', 'Kovind Committee', 'Federalism']
  },
  {
    year: 2024,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs2-con',
    text: 'Explain and distinguish between Lok Adalats and Arbitration Tribunals. How effective have they been in reducing the pendency of cases in formal courts?',
    tags: ['Alternative Dispute Resolution', 'Lok Adalats', 'NALSA Act', 'Arbitration & Conciliation', 'Judicial Pendency']
  },
  {
    year: 2024,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs2-par',
    text: 'The growth of the cabinet system and executive dominance has contributed to the marginalization of parliamentary supremacy in India. Critically examine.',
    tags: ['Parliamentary Supremacy', 'Cabinet System', 'Decline of Parliament', 'Executive Dominance', 'Legislative Scrutiny']
  },
  {
    year: 2024,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs2-bod',
    text: 'Assess the role of the Comptroller and Auditor General (CAG) of India in ensuring financial accountability of the executive, especially in public-private partnerships (PPPs).',
    tags: ['Comptroller and Auditor General', 'Article 148', 'Public-Private Partnerships', 'Financial Accountability', 'Audit of Welfare Schemes']
  },
  {
    year: 2024,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs2-gov',
    text: 'Local self-governing bodies are vital pillars of grassroots democracy, but they continue to suffer from the "3Fs" crisis—Funds, Functions, and Functionaries. Discuss.',
    tags: ['Panchayati Raj', '73rd and 74th Amendments', 'Devolution of Funds', 'State Finance Commission', 'Local Self Governance']
  },
  {
    year: 2024,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs2-soc',
    text: 'Public charitable trusts and NGOs play an indispensable role in welfare delivery, yet face increased regulatory scrutiny under FCRA. Analyze this balance between state regulation and civil society autonomy.',
    tags: ['FCRA Regulations', 'NGOs & Civil Society', 'Charitable Trusts', 'Welfare Delivery', 'State Regulation']
  },
  {
    year: 2024,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs2-soc',
    text: 'Despite significant economic expansion, multidimensional poverty continues to plague several regional pockets in India. Discuss targeted policy interventions needed to tackle deprivation.',
    tags: ['Multidimensional Poverty', 'NITI Aayog MPI', 'Regional Inequality', 'Social Safety Nets', 'Poverty Alleviation']
  },
  {
    year: 2024,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs2-ir',
    text: 'Analyze the strategic significance of the India-Middle East-Europe Economic Corridor (IMEC) in the backdrop of changing geopolitical alignments in West Asia.',
    tags: ['IMEC Corridor', 'West Asia Geopolitics', 'Connectivity Projects', 'India-EU Ties', 'Abraham Accords']
  },
  {
    year: 2024,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs2-ir',
    text: 'Discuss India\'s role in the Global South during its G20 Presidency. How did India amplify the voice of developing nations on multilateral forums?',
    tags: ['Global South', 'G20 Presidency', 'Voice of Global South Summit', 'Multilateralism', 'African Union Inclusion']
  },
  {
    year: 2024,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'Examine the contentious role of the Governor in state administration with specific reference to the reservation of bills for Presidential assent and discretionary powers.',
    tags: ['Office of the Governor', 'Discretionary Powers', 'Article 200 & 201', 'Federal Tensions', 'Sarkaria Commission']
  },
  {
    year: 2024,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'The Right to Privacy under Article 21 has undergone a transformative evolution following the Puttaswamy verdict. Evaluate its implications on digital data governance and personal liberties.',
    tags: ['Right to Privacy', 'Justice K.S. Puttaswamy', 'Article 21', 'DPDP Act 2023', 'Surveillance & Civil Liberties']
  },
  {
    year: 2024,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs2-par',
    text: 'The anti-defection law (Tenth Schedule) was enacted to curb opportunistic political defections, but its implementation has raised serious questions about the Speaker\'s role. Discuss with suggested reforms.',
    tags: ['Anti-Defection Law', 'Tenth Schedule', 'Speaker Neutrality', 'Kihoto Hollohan Case', 'Electoral Reforms']
  },
  {
    year: 2024,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs2-gov',
    text: 'E-governance initiatives in India have substantially improved service delivery, but digital illiteracy and infrastructural deficits risk deepening exclusion. Suggest measures for inclusive digital governance.',
    tags: ['E-Governance', 'Digital Divide', 'Direct Benefit Transfer', 'Citizen Charters', 'Last-Mile Delivery']
  },
  {
    year: 2024,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs2-bod',
    text: 'Quasi-judicial tribunals were established to decongest traditional courts and provide specialized adjudication, but issues of judicial independence and executive interference persist. Evaluate.',
    tags: ['Quasi-Judicial Bodies', 'Tribunalisation of Justice', 'National Green Tribunal', 'Executive Interference', 'Tribunals Reforms Act']
  },
  {
    year: 2024,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'Critically examine the effectiveness of the National Education Policy (NEP) 2020 in addressing learning poverty and bridging the rural-urban divide in school education.',
    tags: ['NEP 2020', 'Learning Poverty', 'Foundational Literacy (NIPUN)', 'Digital Divide in Education', 'Vocational Training']
  },
  {
    year: 2024,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'The universal health coverage goal of Ayushman Bharat has expanded tertiary healthcare access, but primary healthcare infrastructure requires revitalized funding and staffing. Discuss.',
    tags: ['Ayushman Bharat (PMJAY)', 'Health & Wellness Centres', 'Primary Healthcare', 'Out-of-Pocket Expenditure', 'Public Health Spending']
  },
  {
    year: 2024,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs2-ir',
    text: 'Analyze the evolving dynamics of the Quad grouping in the Indo-Pacific. How does India balance its continental security obligations with maritime security partnerships?',
    tags: ['Quad Grouping', 'Indo-Pacific Security', 'Maritime Domain Awareness', 'Continental vs Maritime Security', 'China Challenge']
  },
  {
    year: 2024,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs2-ir',
    text: 'India\'s "Neighbourhood First" policy has encountered severe stress due to political instabilities and foreign economic incursions in South Asia. Examine with recent examples.',
    tags: ['Neighbourhood First', 'South Asia Geopolitics', 'Sri Lanka Crisis', 'Bangladesh Political Transition', 'Chinese Debt Trap']
  },
  {
    year: 2024,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs2-ir',
    text: 'Evaluate the role and relevance of the United Nations Security Council (UNSC) in resolving contemporary global conflicts. Why is comprehensive reform of the UNSC imperative for representative global order?',
    tags: ['UNSC Reforms', 'Veto Power', 'G4 Nations', 'Ukraine & Gaza Conflicts', 'Multilateral Inefficiency']
  },

  // ====================================================
  // 2023 (20 questions)
  // ====================================================
  {
    year: 2023,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs2-con',
    text: '"Constitutionally guaranteed judicial independence is a prerequisite of democracy." Comment.',
    tags: ['Judicial Independence', 'Collegium System', 'Basic Structure', 'Rule of Law', 'Democracy']
  },
  {
    year: 2023,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs2-con',
    text: 'Who are entitled to receive free legal aid? Assess the role of the National Legal Services Authority (NALSA) in rendering free legal aid in India.',
    tags: ['NALSA', 'Article 39A', 'Free Legal Aid', 'Legal Services Authorities Act', 'Access to Justice']
  },
  {
    year: 2023,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs2-par',
    text: 'The states in India seem reluctant to empower urban local bodies both functionally as well as financially. Comment.',
    tags: ['74th Amendment Act', 'Urban Local Bodies', 'Municipal Finance', 'Devolution of Powers', 'Smart Cities']
  },
  {
    year: 2023,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs2-par',
    text: 'Compare and contrast the British and Indian approaches to Parliamentary Sovereignty.',
    tags: ['Parliamentary Sovereignty', 'UK vs India Constitution', 'Constitutional Supremacy', 'Judicial Review', 'Written Constitution']
  },
  {
    year: 2023,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs2-con',
    text: 'Discuss the role of the Competition Commission of India in containing the abuse of a dominant position by multinational corporations in digital markets.',
    tags: ['Competition Commission of India (CCI)', 'Digital Markets', 'Anti-Trust Regulation', 'Big Tech Dominance', 'Quasi-Judicial Regulation']
  },
  {
    year: 2023,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs2-gov',
    text: 'E-governance is not only about technology; it is about citizen empowerment and delivery of government services. Elucidate.',
    tags: ['E-Governance', 'Citizen Empowerment', 'Digital India', 'Accountability & Transparency', 'Service Delivery']
  },
  {
    year: 2023,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs2-soc',
    text: '"The hunger index ranking of India has generated wide controversy." Examine the methodology of calculating Global Hunger Index and its relevance in India.',
    tags: ['Global Hunger Index (GHI)', 'Malnutrition in India', 'Child Wasting & Stunting', 'Food Security', 'Methodological Flaws']
  },
  {
    year: 2023,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs2-soc',
    text: 'Analyze the significance of the 103rd Constitutional Amendment Act providing reservation for Economically Weaker Sections (EWS).',
    tags: ['103rd Amendment', 'EWS Reservation', 'Economic Criteria', 'Janki Prasad Case', 'Basic Structure Review']
  },
  {
    year: 2023,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs2-ir',
    text: '\'India is an age-old friend of Sri Lanka.\' Discuss India\'s role in helping Sri Lanka tide over its recent economic and financial crisis.',
    tags: ['India-Sri Lanka Relations', 'Sri Lanka Economic Crisis', 'Currency Swap & Aid', 'Neighbourhood First', 'Colombo Security Conclave']
  },
  {
    year: 2023,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs2-ir',
    text: 'Do you think that BIMSTEC is a parallel organization like the SAARC? What are the similarities and dissimilarities between the two?',
    tags: ['BIMSTEC vs SAARC', 'Regional Integration', 'Bay of Bengal Community', 'Pakistan Stumbling Block', 'Act East Policy']
  },
  {
    year: 2023,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'Explain the significance of the 101st Constitutional Amendment Act. To what extent does the GST Council accommodate the federal spirit of the Constitution?',
    tags: ['101st Amendment Act', 'GST Council', 'Fiscal Federalism', 'One Nation One Tax', 'Consensus Decision Making']
  },
  {
    year: 2023,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'Explain the constitutional provisions regarding the appointment, terms and conditions, and independence of Election Commissioners in India.',
    tags: ['Election Commission of India', 'Article 324', 'Anoop Baranwal Case', 'Chief Election Commissioner Act', 'Electoral Integrity']
  },
  {
    year: 2023,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs2-par',
    text: 'Analyze the contribution of Parliamentary Departmentally-Related Standing Committees (DRSCs) in examining bills and holding the executive accountable.',
    tags: ['Standing Committees (DRSCs)', 'Legislative Scrutiny', 'Executive Accountability', 'Bypassing Committees', 'Parliamentary Quality']
  },
  {
    year: 2023,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs2-gov',
    text: 'Development processes in India are characterized by increasing role of civil society organizations and SHGs. Discuss their contribution in women empowerment.',
    tags: ['Self-Help Groups (SHGs)', 'Civil Society Organizations', 'Women Microfinance', 'DAY-NRLM', 'Grassroots Leadership']
  },
  {
    year: 2023,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs2-gov',
    text: 'The Central Bureau of Investigation (CBI) has often been criticized for being politically influenced. Discuss the issues concerning its autonomy and credibility.',
    tags: ['CBI Autonomy', 'General Consent of States', 'Vineet Narain Case', 'DPSE Act', 'Investigative Agencies']
  },
  {
    year: 2023,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'Can the civil services in India adapt to the emerging demands of specialized governance and technological disruption? Discuss with reference to Mission Karmayogi.',
    tags: ['Mission Karmayogi', 'Civil Services Reforms', 'Capacity Building', 'Generalist vs Specialist', 'Administrative Agility']
  },
  {
    year: 2023,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'Critically examine the performance of the National Skill Development Mission in bridging the skill gap and generating gainful employment in India.',
    tags: ['Skill India Mission', 'Employability & VET', 'Demographic Dividend', 'Apprenticeships', 'Informal Sector Skilling']
  },
  {
    year: 2023,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs2-ir',
    text: 'The expansion of BRICS to include new members signals a shifting balance in the global geopolitical and financial architecture. Analyze India\'s stance.',
    tags: ['BRICS Expansion', 'De-dollarisation', 'New Development Bank', 'Global Geopolitics', 'Strategic Autonomy']
  },
  {
    year: 2023,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs2-ir',
    text: '\'The SCO has emerged as an important platform for regional security and connectivity.\' Discuss India\'s stakes and challenges in the Shanghai Cooperation Organisation.',
    tags: ['SCO', 'Central Asia Connectivity', 'RATS-SCO', 'Terrorism & Extremism', 'Chabahar Port']
  },
  {
    year: 2023,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs2-ir',
    text: 'Evaluate the role of the Indian diaspora in promoting India\'s soft power and acting as a bridge for bilateral economic and technological partnerships.',
    tags: ['Indian Diaspora', 'Soft Power Diplomacy', 'Remittances', 'Lobbying & Bilateral Ties', 'Pravasi Bharatiya Divas']
  },

  // ====================================================
  // 2022 (20 questions)
  // ====================================================
  {
    year: 2022,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs2-con',
    text: 'The most significant achievement of modern law in India is the constitutionalization of environmental problems by the Supreme Court. Discuss with relevant case laws.',
    tags: ['Environmental Jurisprudence', 'Article 21 & Environment', 'Public Trust Doctrine', 'MC Mehta Cases', 'Judicial Activism']
  },
  {
    year: 2022,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs2-con',
    text: 'Right of movement and residence throughout the territory of India are freely available to the Indian citizens, but these rights are not absolute. Comment.',
    tags: ['Article 19(1)(d) & (e)', 'Reasonable Restrictions', 'Inner Line Permit', 'Public Order & Morality', 'Tribal Area Protections']
  },
  {
    year: 2022,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs2-par',
    text: 'To what extent, in your opinion, has the decentralization of power in India changed the governance landscape at the grassroot level?',
    tags: ['Decentralization of Power', 'Panchayati Raj (73rd Amendment)', 'Grassroots Governance', 'Gram Sabha Empowerment', 'Local Democracy']
  },
  {
    year: 2022,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs2-par',
    text: 'Discuss the role of the Vice-President of India as the Chairman of the Rajya Sabha.',
    tags: ['Vice-President of India', 'Chairman of Rajya Sabha', 'Parliamentary Conduct', 'Casting Vote', 'Council of States']
  },
  {
    year: 2022,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs2-bod',
    text: 'Discuss the role of the National Commission for Backward Classes in the wake of its transformation from a statutory body to a constitutional body.',
    tags: ['NCBC', '102nd Constitutional Amendment', 'Article 338B', 'OBC Classification', 'Constitutional Bodies']
  },
  {
    year: 2022,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs2-gov',
    text: 'The Gati-Shakti Yojana needs meticulous coordination between the government and the private sector to achieve the goal of connectivity. Discuss.',
    tags: ['PM Gati-Shakti', 'Multimodal Connectivity', 'Inter-Ministerial Coordination', 'Logistics Infrastructure', 'Infrastructure Governance']
  },
  {
    year: 2022,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs2-soc',
    text: 'The need for cooperation among various ministries and departments is a crucial element of the policy on early childhood care and education. Elaborate.',
    tags: ['Early Childhood Care & Education (ECCE)', 'Anganwadi System', 'Inter-Ministerial Convergence', 'POSHAN Abhiyaan', 'Child Health & Nutrition']
  },
  {
    year: 2022,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs2-soc',
    text: 'The Right to Education (RTE) Act has achieved near-universal enrolment, but learning outcomes continue to remain sub-optimal. Analyze.',
    tags: ['Right to Education (RTE)', 'ASER Report Findings', 'Learning Outcomes Deficit', 'Pedagogical Quality', 'School Infrastructure']
  },
  {
    year: 2022,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs2-ir',
    text: 'How will I2U2 (India, Israel, UAE and USA) grouping transform India\'s position in global politics?',
    tags: ['I2U2 Grouping', 'West Asian Quad', 'Food Security Corridor', 'Clean Energy Investment', 'Middle East Diplomacy']
  },
  {
    year: 2022,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs2-ir',
    text: '\'Clean energy is the order of the day.\' Describe the brief characteristics of the International Solar Alliance (ISA) and India\'s role in leading it.',
    tags: ['International Solar Alliance (ISA)', 'Solar Energy Diplomacy', 'One Sun One World One Grid', 'Clean Energy Transition', 'Climate Leadership']
  },
  {
    year: 2022,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'Analyze the distinguishing features of the notion of Equality in the Constitutions of the USA and India.',
    tags: ['Concept of Equality', 'Equal Protection vs Equality Before Law', 'Fourteenth Amendment USA', 'Article 14 India', 'Affirmative Action Comparison']
  },
  {
    year: 2022,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'Explain the constitutional perspective of Gender Justice with the help of relevant constitutional provisions and case laws.',
    tags: ['Gender Justice', 'Article 15(3)', 'Uniform Civil Code Debate', 'Triple Talaq & Sabarimala', 'Judicial Pronouncements']
  },
  {
    year: 2022,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs2-par',
    text: 'The Representation of People Act, 1951 provides for the disqualification of representatives. Discuss the legal provisions and judicial interpretations with reference to criminalization of politics.',
    tags: ['RPA 1951', 'Disqualification of MPs/MLAs', 'Lily Thomas Case', 'Criminalization of Politics', 'Section 8 RPA']
  },
  {
    year: 2022,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs2-gov',
    text: 'Has the Right to Information (RTI) Act generated a culture of transparency and accountability in governance? Examine the impact of recent legislative amendments.',
    tags: ['RTI Act 2005', 'RTI Amendment Act 2019', 'Information Commissioners Autonomy', 'Transparency in Governance', 'Social Audits']
  },
  {
    year: 2022,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs2-bod',
    text: 'National Human Rights Commission (NHRC) has played an important role in the protection of human rights in India, yet it is often called a "toothless tiger". Suggest measures to strengthen it.',
    tags: ['NHRC', 'Human Rights Protection Act', 'Toothless Tiger Criticism', 'Powers of Investigation', 'Enforcement of Recommendations']
  },
  {
    year: 2022,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'Besides the welfare schemes for the differently-abled persons, what institutional and societal interventions are required to ensure their dignified inclusion?',
    tags: ['Persons with Disabilities (PwDs)', 'RPwD Act 2016', 'Accessible India Campaign (Sugamya Bharat)', 'Universal Accessibility', 'Social Inclusion']
  },
  {
    year: 2022,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'Can the SHG movement be leveraged as an effective vehicle for rural economic revival and financial empowerment of women in post-pandemic India?',
    tags: ['Self-Help Groups (SHGs)', 'Micro-enterprises', 'Lakhpati Didi Scheme', 'Post-Pandemic Revival', 'Rural Credit']
  },
  {
    year: 2022,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs2-ir',
    text: 'Critically analyze how the Russian-Ukraine conflict has tested India\'s policy of strategic autonomy in its foreign relations.',
    tags: ['Russia-Ukraine War', 'Strategic Autonomy', 'Energy Security & Discounted Oil', 'Western Sanctions', 'UN Voting Stand']
  },
  {
    year: 2022,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs2-ir',
    text: 'Discuss the key elements of India\'s "Act East" policy. How has connectivity through Myanmar and ASEAN evolved in recent years?',
    tags: ['Act East Policy', 'ASEAN-India Ties', 'Kaladan Multi-Modal Project', 'India-Myanmar-Thailand Trilateral Highway', 'Northeast Connectivity']
  },
  {
    year: 2022,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs2-ir',
    text: '\'The WTO is facing a crisis of relevance due to the paralysis of its Appellate Body.\' Discuss its implications on international trade rules and India\'s options.',
    tags: ['WTO Appellate Body', 'Dispute Settlement Mechanism', 'Global Trade Rules', 'Multilateral Trade Order', 'India Trade Strategy']
  },

  // ====================================================
  // 2021 (20 questions)
  // ====================================================
  {
    year: 2021,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs2-con',
    text: '\'Constitutional Morality\' is rooted in the Constitution itself and is founded on its essential facets. Explain the doctrine of \'Constitutional Morality\' with the help of relevant judicial decisions.',
    tags: ['Constitutional Morality', 'Dr B R Ambedkar', 'Navtej Johar Case', 'Sabarimala Verdict', 'Judicial Doctrine']
  },
  {
    year: 2021,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs2-con',
    text: 'Discuss the desirability of greater representation to women in the higher judiciary to ensure a diversity-oriented judiciary.',
    tags: ['Women in Judiciary', 'Gender Diversity on Bench', 'Collegium Appointments', 'Access to Justice', 'Judicial Diversity']
  },
  {
    year: 2021,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs2-par',
    text: 'Analyze the distinguishing features of the notion of Right to Equality in the Constitutions of the USA and India.',
    tags: ['Right to Equality', 'Article 14', 'US Equal Protection Clause', 'Affirmative Action', 'Comparative Constitutional Law']
  },
  {
    year: 2021,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs2-par',
    text: 'Explain the policy of the Government of India regarding the Departmentally Related Parliamentary Standing Committees (DRSCs) in ensuring executive accountability.',
    tags: ['DRSCs', 'Parliamentary Scrutiny', 'Accountability of Ministers', 'Committee Reports', 'Legislative Oversight']
  },
  {
    year: 2021,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs2-bod',
    text: 'Can Civil Services Reforms in India succeed without depoliticizing the civil service? Discuss in the light of the Prakash Singh verdict on police reforms.',
    tags: ['Civil Services Reforms', 'Police Reforms', 'Prakash Singh Case', 'Security of Tenure', 'Depoliticization']
  },
  {
    year: 2021,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs2-gov',
    text: 'How far has the citizen charter movement achieved its intended objectives of enhancing transparency and accountability in public administration in India?',
    tags: ['Citizen Charters', 'Sevottam Model', 'Public Service Delivery', 'Administrative Accountability', 'Grievance Redressal']
  },
  {
    year: 2021,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs2-soc',
    text: 'Can the cycle of poverty and malnutrition in India be broken through Cash Transfers instead of in-kind food transfers through PDS? Examine.',
    tags: ['Cash Transfers vs In-Kind PDS', 'National Food Security Act', 'Direct Benefit Transfer', 'Nutritional Security', 'Poverty Cycle']
  },
  {
    year: 2021,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs2-soc',
    text: 'Has the digital divide in school education during the pandemic created a permanent learning deficit for underprivileged children in India? Discuss.',
    tags: ['Digital Divide in Education', 'COVID-19 School Closures', 'Learning Loss', 'Online Education Equity', 'Samagra Shiksha']
  },
  {
    year: 2021,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs2-ir',
    text: '\'The USA is facing an existential threat in the form of a rising China.\' How does this strategic rivalry impact the geopolitical landscape of the Indo-Pacific?',
    tags: ['US-China Rivalry', 'Indo-Pacific Geopolitics', 'Thucydides Trap', 'Taiwan Strait', 'Balance of Power']
  },
  {
    year: 2021,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs2-ir',
    text: 'What are the main areas of divergence and convergence between India and the United States in their approaches towards the Middle East and Afghanistan?',
    tags: ['India-US Strategic Ties', 'Afghanistan Post-Taliban', 'West Asia Policy', 'Chabahar vs Sanctions', 'Counter-Terrorism']
  },
  {
    year: 2021,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'To what extent does the federal design of the Indian Constitution accommodate sub-national identities and asymmetrical provisions? Discuss with examples.',
    tags: ['Asymmetrical Federalism', 'Article 371 Special Provisions', 'Sixth Schedule', 'Sub-national Aspirations', 'Cooperative Federalism']
  },
  {
    year: 2021,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'Analyze the powers and procedures of the Judicial Committee of the Privy Council and discuss how its legacy impacted the evolution of the Supreme Court of India.',
    tags: ['Privy Council Legacy', 'Supreme Court Evolution', 'Common Law System', 'Appellate Jurisdiction', 'Constitutional History']
  },
  {
    year: 2021,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs2-par',
    text: 'The role of the Speaker in the Lok Sabha is crucial for maintaining legislative decorum and safeguarding minority party rights. Evaluate recent concerns over bias.',
    tags: ['Office of the Speaker', 'Neutrality of Speaker', 'Guillotine Procedure', 'Disruption of House', 'Parliamentary Democracy']
  },
  {
    year: 2021,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs2-gov',
    text: 'Discuss the concept of "Social Audit" and analyze its institutionalization in various welfare schemes, particularly MGNREGS.',
    tags: ['Social Audit', 'MGNREGS Transparency', 'Community Oversight', 'Grassroots Accountability', 'CAG Social Audit Guidelines']
  },
  {
    year: 2021,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs2-bod',
    text: 'Assess the working of the National Commission for Scheduled Castes (NCSC) in safeguarding the rights and welfare of Dalit communities.',
    tags: ['NCSC', 'Article 338', 'Dalit Welfare', 'Constitutional Safeguards', 'Inquiry Powers']
  },
  {
    year: 2021,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'Analyze the significance of the PM POSHAN Scheme in tackling malnutrition among primary school children and evaluate its implementation challenges.',
    tags: ['PM POSHAN Scheme', 'Mid-Day Meal Scheme', 'School Nutrition', 'Hunger & Stunting', 'Monitoring Mechanisms']
  },
  {
    year: 2021,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'The elderly population in India is projected to double by 2050. Examine the adequacy of public healthcare, pension, and eldercare frameworks.',
    tags: ['Elderly Care in India', 'National Policy for Senior Citizens', 'Old Age Pensions', 'Geriatric Healthcare', 'Demographic Shift']
  },
  {
    year: 2021,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs2-ir',
    text: '\'Aukus\' alliance represents a major realignment in Pacific security architecture. How does it complement or conflict with the Quad and India\'s interests?',
    tags: ['AUKUS Security Pact', 'Nuclear Submarines', 'Indo-Pacific Security', 'Quad Dynamics', 'Strategic Balance']
  },
  {
    year: 2021,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs2-ir',
    text: 'Critically analyze India\'s engagement with Central Asian republics under the "Connect Central Asia" policy and the security implications of the Afghan situation.',
    tags: ['Connect Central Asia', 'India-Central Asia Summit', 'INSTC & Chabahar', 'TAPI Pipeline', 'Afghanistan Geopolitics']
  },
  {
    year: 2021,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs2-ir',
    text: 'Evaluate the role of the World Health Organization (WHO) during the COVID-19 pandemic. What structural reforms are required to enhance global pandemic preparedness?',
    tags: ['WHO Reforms', 'COVID-19 Response', 'International Health Regulations', 'Pandemic Treaty', 'Global Health Governance']
  },

  // ====================================================
  // 2020 (20 questions)
  // ====================================================
  {
    year: 2020,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs2-con',
    text: 'There is a need for simplification of procedure under the Representation of People Act, 1951 to ensure speedy disposal of election disputes. Discuss.',
    tags: ['RPA 1951', 'Election Petitions', 'High Court Jurisdiction', 'Speedy Trial', 'Electoral Reforms']
  },
  {
    year: 2020,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs2-con',
    text: 'Recent amendments to the Right to Information Act will have a profound impact on the autonomy and independence of the Information Commissions. Discuss.',
    tags: ['RTI Amendment 2019', 'Information Commission Autonomy', 'Terms and Salary Discretion', 'Transparency in Governance', 'Federalism']
  },
  {
    year: 2020,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs2-par',
    text: 'How far do you agree that the Rajya Sabha has transformed from a mere "revising chamber" to an active stakeholder in federal consensus building?',
    tags: ['Rajya Sabha Role', 'Federal Chamber', 'Equal Representation Debate', 'Bicameralism', 'Special Powers Article 249']
  },
  {
    year: 2020,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs2-par',
    text: 'What are the main functions of Parliamentary Committees? How have ad-hoc and joint committees helped in resolving contentious national issues?',
    tags: ['Parliamentary Committees', 'Joint Parliamentary Committees (JPC)', 'Select Committees', 'Consensus Building', 'Executive Oversight']
  },
  {
    year: 2020,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs2-bod',
    text: 'The National Commission for Women (NCW) is mandated to protect and promote the interests of women. How effective has it been in addressing violence against women?',
    tags: ['NCW', 'Women Rights Protection', 'Statutory Powers', 'Violence Against Women', 'Advisory Role']
  },
  {
    year: 2020,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs2-gov',
    text: '"The institutionalization of Citizen Charters has failed to realize its full potential due to weak grievance redressal." Elaborate.',
    tags: ['Citizen Charter Deficiencies', 'Grievance Redressal Bill', 'Public Service Guarantees', 'Administrative Accountability', 'Service Delivery']
  },
  {
    year: 2020,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs2-soc',
    text: 'In order to enhance the prospects of social development, sound and effective healthcare management is essential. Discuss in the light of the National Health Policy 2017.',
    tags: ['National Health Policy 2017', 'Public Health Expenditure', 'Universal Health Care', 'Primary Health Centres', 'Social Development']
  },
  {
    year: 2020,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs2-soc',
    text: '"In the scheme of welfare development, vulnerability of the disabled requires specialized multi-sectoral convergence." Discuss.',
    tags: ['Disabled Welfare', 'Multi-Sectoral Convergence', 'Accessible Infrastructure', 'Job Reservations', 'Social Dignity']
  },
  {
    year: 2020,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs2-ir',
    text: '\'The Indo-Pacific has emerged as a key geopolitical theatre.\' In this context, analyze India\'s maritime vision of SAGAR (Security and Growth for All in the Region).',
    tags: ['SAGAR Doctrine', 'Indo-Pacific Maritime Security', 'Indian Ocean Region', 'Net Security Provider', 'Blue Economy']
  },
  {
    year: 2020,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs2-ir',
    text: 'Critically analyze how the political changes in the Maldives impact India\'s strategic interests in the Indian Ocean.',
    tags: ['India-Maldives Relations', 'Indian Ocean Geopolitics', 'Greater Male Connectivity', 'China Presence', 'Neighbourhood Diplomacy']
  },
  {
    year: 2020,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'The French model of secularism strictly separates church and state, while the Indian model embodies "principled distance" and equal respect for all faiths. Compare and contrast.',
    tags: ['Indian vs French Secularism', 'Laïcité', 'Principled Distance', 'Sarva Dharma Sambhava', 'Comparative Constitutionalism']
  },
  {
    year: 2020,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'Examine the scope of Article 356 in the light of the landmark S.R. Bommai judgment. How has it protected federal principles from arbitrary executive action?',
    tags: ['Article 356', 'President\'s Rule', 'S.R. Bommai Case', 'Federal Protections', 'Floor Test Requirement']
  },
  {
    year: 2020,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs2-par',
    text: 'Critically analyze the role of the Finance Commission as a balancing wheel of fiscal federalism in India with reference to the 15th Finance Commission recommendations.',
    tags: ['15th Finance Commission', 'Devolution Formula', 'Horizontal & Vertical Devolution', 'Fiscal Federalism', 'Cess and Surcharges']
  },
  {
    year: 2020,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs2-gov',
    text: 'The use of Internet and information technology in governance has brought administration closer to the people, but data privacy concerns loom large. Evaluate.',
    tags: ['Digital Governance', 'Data Privacy', 'Surveillance State', 'National Data Governance Policy', 'Cyber Governance']
  },
  {
    year: 2020,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs2-bod',
    text: 'Examine the role of the Central Vigilance Commission (CVC) in curbing corruption in public administration and evaluate the challenges faced by it.',
    tags: ['CVC', 'Vigilance Mechanism', 'Public Corruption', 'Whistleblower Protection', 'Superintendence over CBI']
  },
  {
    year: 2020,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'Examine the socio-economic impacts of the lockdown on migrant workers during COVID-19. Evaluate the adequacy of the "One Nation, One Ration Card" scheme in mitigating distress.',
    tags: ['Migrant Worker Crisis', 'One Nation One Ration Card', 'Inter-State Migrant Workmen Act', 'Social Security for Informal Labour', 'Portability of Welfare']
  },
  {
    year: 2020,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'Despite constitutional guarantees and targeted welfare legislation, manual scavenging continues to exist in India. Analyze the socio-economic and technological impediments to its complete eradication.',
    tags: ['Manual Scavenging Eradication', 'PEMSR Act', 'Sewer Cleaning Mechanization', 'Caste Stigma', 'Namaste Scheme']
  },
  {
    year: 2020,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs2-ir',
    text: 'The border standoff with China along the Line of Actual Control (LAC) has underscored the imperative of asymmetric deterrence and infrastructure push along the northern frontiers. Discuss.',
    tags: ['India-China LAC Standoff', 'Border Infrastructure', 'Galwan Valley Clash', 'Asymmetric Deterrence', 'Northern Frontier Security']
  },
  {
    year: 2020,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs2-ir',
    text: 'Evaluate the strategic significance of the Abraham Accords for West Asian stability and discuss how India can leverage its ties with both the Arab states and Israel.',
    tags: ['Abraham Accords', 'West Asia Diplomacy', 'India-Israel-Arab Ties', 'De-hyphenation Policy', 'Regional Normalization']
  },
  {
    year: 2020,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs2-ir',
    text: '\'The COVID-19 pandemic has exposed the limits of multilateralism.\' Critically evaluate the response of global multilateral bodies like the UN, G20, and WTO during the crisis.',
    tags: ['Multilateralism Crisis', 'Vaccine Nationalism', 'Global Governance Deficit', 'UN Inaction', 'WTO TRIPS Waiver Debate']
  },

  // ====================================================
  // 2019 (20 questions)
  // ====================================================
  {
    year: 2019,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs2-con',
    text: 'Do you think that constitution of India does not accept principle of strict separation of powers rather it is based on \'checks and balances\'? Explain.',
    tags: ['Separation of Powers', 'Checks and Balances', 'Constitutional Scheme', 'Judicial Review', 'Executive-Legislature Link']
  },
  {
    year: 2019,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs2-con',
    text: '"The Central Administrative Tribunal which was established for redressal of grievances and complaints by or against central government employees nowadays is exercising powers as an independent judicial body." Explain its functioning and jurisdiction.',
    tags: ['Central Administrative Tribunal (CAT)', 'Article 323A', 'Administrative Tribunals', 'L. Chandra Kumar Case', 'Public Service Adjudication']
  },
  {
    year: 2019,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs2-par',
    text: 'What are the methods used by the Farmers\' organizations to influence the policy-makers in India and how effective are these methods?',
    tags: ['Farmers Organizations', 'Pressure Groups', 'Agrarian Protests', 'Policy Lobbying', 'Farm Bill Negotiations']
  },
  {
    year: 2019,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs2-par',
    text: 'From the resolution of contentious issues to the conduct of business in the Parliament, the role of Parliamentary Standing Committees is indispensable. Elucidate.',
    tags: ['Parliamentary Standing Committees', 'Consensus Politics', 'Legislative Scrutiny', 'In-camera Discussions', 'Committee System']
  },
  {
    year: 2019,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs2-bod',
    text: 'The Comptroller and Auditor General (CAG) has a very vital role to play. Explain how this is reflected in the method and terms of his appointment as well as the range of powers he can exercise.',
    tags: ['CAG Appointment & Removal', 'Article 148', 'Public Accounts Audit', 'Guardian of Public Purse', 'Constitutional Safeguards']
  },
  {
    year: 2019,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs2-gov',
    text: '"Policy contradictions among various ministries and departments impede administrative efficiency." Discuss the need for seamless whole-of-government coordination.',
    tags: ['Inter-Ministerial Coordination', 'Whole-of-Government Approach', 'Policy Implementation', 'Bureaucratic Silos', 'Cabinet Secretariat']
  },
  {
    year: 2019,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs2-soc',
    text: '\'In the context of the performance of India\'s social sector, vulnerability to poverty is more critical than income poverty.\' Discuss.',
    tags: ['Vulnerability to Poverty', 'Multidimensional Deprivation', 'Health Shocks', 'Social Protection Floors', 'Income vs Capability']
  },
  {
    year: 2019,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs2-soc',
    text: 'The penetration of Self Help Groups (SHGs) in rural areas has played an indispensable role in fostering grassroots entrepreneurship among women. Discuss.',
    tags: ['SHGs & Rural Women', 'Micro-Finance', 'Livelihoods Mission', 'Social Capital', 'Grassroots Entrepreneurship']
  },
  {
    year: 2019,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs2-ir',
    text: '\'The long-sustained image of India as a leader of the non-aligned movement has given way to active engagement with multiple global alignments.\' Discuss.',
    tags: ['Non-Alignment to Multi-Alignment', 'Issue-Based Alignments', 'Strategic Autonomy', 'Foreign Policy Transformation', 'Major Power Balancing']
  },
  {
    year: 2019,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs2-ir',
    text: 'What introduces friction into the ties between India and the United States is that Washington is still unable to find for India a position in its global strategy, which would satisfy India\'s National self-esteem and ambitions. Explain with suitable examples.',
    tags: ['India-US Strategic Friction', 'CAATSA Sanctions Waiver', 'Trade Disputes & GSP', 'Strategic Autonomy vs Alliance', 'National Interest']
  },
  {
    year: 2019,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'On what grounds a people\'s representative can be disqualified under the Representation of People Act, 1951? Also mention the remedies available to such person against his disqualification.',
    tags: ['RPA Disqualification Grounds', 'Section 8 Criminal Conviction', 'Corrupt Practices', 'Lily Thomas Precedent', 'Appellate Remedies']
  },
  {
    year: 2019,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs2-con',
    text: '"Parliament\'s power to amend the Constitution is a limited power and it cannot be enlarged into an absolute power." In the light of this statement explain whether Parliament under Article 368 of the Constitution can destroy the Basic Structure of the Constitution by expanding its amending power?',
    tags: ['Article 368 Limits', 'Minerva Mills Case', 'Basic Structure Doctrine', 'Limited Amending Power', 'Judicial Review']
  },
  {
    year: 2019,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs2-par',
    text: '"The reservation of seats for women in the institutions of local self-government has had a limited impact on the patriarchal character of the Indian Political Process." Comment.',
    tags: ['Women Reservation in PRIs', 'Sarpanch Pati', 'Patriarchal Politics', 'Proxy Leadership', 'Substantive Empowerment']
  },
  {
    year: 2019,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs2-gov',
    text: 'The Attorney-General is the chief legal adviser and lawyer of the Government of India. Examine his role and constitutional position.',
    tags: ['Attorney-General of India', 'Article 76', 'Rights in Parliament (Article 88)', 'Legal Advice to Union', 'Constitutional Law Officer']
  },
  {
    year: 2019,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs2-bod',
    text: 'Individual citizen\'s right to information is closely linked with the democratic values of accountability and transparency. Discuss the structural hurdles in the effective realization of RTI.',
    tags: ['RTI Structural Hurdles', 'Pendency of Appeals', 'Threats to Whistleblowers', 'Official Secrets Act', 'Proactive Disclosures (Sec 4)']
  },
  {
    year: 2019,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'Despite persistent efforts, the persistence of malnutrition and hidden hunger poses an immense developmental challenge for India. Discuss the multi-pronged strategy required.',
    tags: ['Hidden Hunger & Malnutrition', 'Micro-nutrient Deficiency', 'POSHAN Abhiyaan', 'Food Fortification', 'Multi-Sectoral Approach']
  },
  {
    year: 2019,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'Higher education in India suffers from obsolete curricula, regulatory bottlenecks, and low global ranking. Analyze the corrective interventions proposed in recent education reforms.',
    tags: ['Higher Education Reforms', 'HECI Proposed Body', 'Global University Rankings', 'Academic Freedom & R&D', 'Curricular Flexibility']
  },
  {
    year: 2019,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs2-ir',
    text: '\'The development of Chabahar port by India represents a vital gateway to Afghanistan and Central Asia bypassing Pakistan.\' Discuss its strategic and economic significance.',
    tags: ['Chabahar Port', 'Afghanistan Transit Corridor', 'Central Asia Trade', 'Bypassing Pakistan', 'India-Iran-Afghanistan Agreement']
  },
  {
    year: 2019,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs2-ir',
    text: 'Analyze the significance of the Belt and Road Initiative (BRI) of China and evaluate India\'s objections regarding the China-Pakistan Economic Corridor (CPEC).',
    tags: ['China Belt and Road Initiative', 'CPEC', 'Sovereignty & Territorial Integrity', 'PoK Transit', 'Debt Trap Diplomacy']
  },
  {
    year: 2019,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs2-ir',
    text: '\'Too little mechanism, too much politics characterizes the reform of the United Nations Security Council.\' Critically evaluate.',
    tags: ['UNSC Reform Impasse', 'Veto Powers Resistance', 'Coffee Club Obstruction', 'Expansion of Permanent Seats', 'Global Governance Legitimacy']
  },

  // ====================================================
  // 2018 (20 questions)
  // ====================================================
  {
    year: 2018,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs2-con',
    text: 'Whether National Commission for Scheduled Castes (NCSC) can enforce the implementation of constitutional reservation for Scheduled Castes in the religious minority institutions? Examine.',
    tags: ['NCSC Powers', 'Minority Institutions (Article 30)', 'Reservation Safeguards', 'Article 338', 'Constitutional Exceptions']
  },
  {
    year: 2018,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs2-con',
    text: 'Under what circumstances can the Financial Emergency be declared by the President of India? What are the consequences of such a declaration?',
    tags: ['Financial Emergency', 'Article 360', 'Reduction of Salaries', 'State Financial Subordination', 'Presidential Proclamation']
  },
  {
    year: 2018,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs2-par',
    text: 'Why do you think the committees are considered to be indispensable for the conduct of business of the Parliament? Discuss.',
    tags: ['Committee System', 'Detailed Legislative Review', 'Non-partisan Deliberation', 'Parliamentary Time Efficiency', 'Accountability']
  },
  {
    year: 2018,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs2-par',
    text: 'In the light of recent controversy regarding the use of Electronic Voting Machines (EVMs), what measures have been taken by the Election Commission of India to ensure voter confidence?',
    tags: ['EVM Integrity', 'VVPAT Verifiability', 'Election Commission Measures', 'Electoral Transparency', 'Voter Trust']
  },
  {
    year: 2018,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs2-bod',
    text: 'How is the Central Vigilance Commission (CVC) constituted? Discuss its advisory jurisdiction and limitations in acting as an effective anti-corruption watchdog.',
    tags: ['CVC Constitution', 'Anti-Corruption Watchdog', 'Sanction for Prosecution', 'Advisory Limitations', 'Single Directive Doctrine']
  },
  {
    year: 2018,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs2-gov',
    text: '"The Right to Information Act is not just for citizens, but it is an instrument to ensure good governance." Discuss.',
    tags: ['RTI as Governance Tool', 'Transparency & Good Governance', 'Citizen Empowerment', 'Reducing Corruption', 'Administrative Reforms']
  },
  {
    year: 2018,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs2-soc',
    text: 'Appropriate local community-level healthcare intervention is the prerequisite to achieve "Health for All" in India. Explain.',
    tags: ['Health for All', 'Community Healthcare', 'ASHA Workers', 'Primary Healthcare', 'Universal Health Coverage']
  },
  {
    year: 2018,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs2-soc',
    text: 'Analyze the significance of the National Health Protection Scheme (Ayushman Bharat) in mitigating catastrophic health expenditure for poor families.',
    tags: ['Ayushman Bharat (PM-JAY)', 'Catastrophic Health Outflow', 'Health Insurance for Poor', 'Secondary & Tertiary Care', 'Hospital Empanelment']
  },
  {
    year: 2018,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs2-ir',
    text: '\'India\'s relations with Israel have, of late, acquired a depth and diversity, which cannot be rolled back.\' Discuss.',
    tags: ['India-Israel Strategic Partnership', 'Defence & Intelligence Ties', 'Agriculture & Water Tech', 'De-hyphenation from Palestine', 'Strategic Cooperation']
  },
  {
    year: 2018,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs2-ir',
    text: 'What are the key geopolitical challenges confronting the BIMSTEC grouping as it attempts to reposition itself as a dynamic regional forum in South Asia?',
    tags: ['BIMSTEC Geopolitical Challenges', 'Bay of Bengal Connectivity', 'FTA Negotiations Delay', 'Rohingya Crisis Friction', 'Institutional Capacity']
  },
  {
    year: 2018,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'Whether the Supreme Court Judgment (July 2018) can settle the political tussle between the Lt. Governor and elected government of Delhi? Critically examine.',
    tags: ['Delhi Power Tussle', 'Article 239AA', 'Lt. Governor vs Chief Minister', 'Aid and Advice of Council', 'Constitutional Bench Verdict']
  },
  {
    year: 2018,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'How far do you agree with the view that tribunals in India have undermined the traditional judicial hierarchy and compromised judicial independence?',
    tags: ['Tribunalisation of Justice', 'Judicial Hierarchy', 'Executive Dominance in Appointments', 'Appeals to High Court', 'Article 323B']
  },
  {
    year: 2018,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs2-par',
    text: 'In what ways does the Rajya Sabha protect the rights of the states against unilateral parliamentary centralism? Give examples of legislative checks.',
    tags: ['Rajya Sabha Federal Safeguards', 'State Rights Protection', 'Constitutional Amendments', 'Special Majority', 'Legislative Veto']
  },
  {
    year: 2018,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs2-gov',
    text: 'E-governance is not merely about automation of government processes, but a paradigm shift in accountability, responsiveness and transparency. Discuss with successful case studies.',
    tags: ['E-Governance Paradigm Shift', 'PRAGATI Platform', 'Direct Benefit Transfer', 'Faceless Assessment', 'Citizen Responsive Governance']
  },
  {
    year: 2018,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs2-bod',
    text: 'The Election Commission of India has been a model electoral management body, but concerns over post-retirement appointments and administrative neutrality persist. Suggest reforms.',
    tags: ['Election Commission Reforms', 'Neutrality of Commissioners', 'Post-Retirement Appointments', 'Funding from Consolidated Fund', 'Model Code Enforcement']
  },
  {
    year: 2018,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'The Rights of Persons with Disabilities Act, 2016 introduced significant progressive rights. How far has its implementation realized barrier-free accessibility?',
    tags: ['RPwD Act 2016', 'Barrier-Free Environment', 'Disability Rights', 'Public Transport Accessibility', 'Social Inclusion']
  },
  {
    year: 2018,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'Analyze the reasons behind the persistent agrarian distress in India and evaluate whether direct income support schemes provide a sustainable solution.',
    tags: ['Agrarian Distress Causes', 'Direct Income Support (PM-KISAN)', 'Farm Indebtedness', 'Remunerative Prices', 'Structural Agricultural Reforms']
  },
  {
    year: 2018,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs2-ir',
    text: '\'A unique relationship between India and Bhutan is built on exemplary trust and mutual security interdependence.\' In the backdrop of Doklam standoff, analyze this relationship.',
    tags: ['India-Bhutan Relations', 'Doklam Standoff', 'Treaty of Friendship 2007', 'Hydroelectric Cooperation', 'Strategic Buffer']
  },
  {
    year: 2018,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs2-ir',
    text: 'Analyze the impact of US withdrawal from the Joint Comprehensive Plan of Action (JCPOA) on India\'s energy security and regional connectivity projects in Iran.',
    tags: ['US Withdrawal from JCPOA', 'Iran Sanctions', 'Chabahar Port Exemption', 'Crude Oil Import from Iran', 'Energy Security']
  },
  {
    year: 2018,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs2-ir',
    text: 'Discuss the strategic importance of the Indian Ocean for India\'s economic growth and national security. How does India counter China\'s "String of Pearls" strategy?',
    tags: ['Indian Ocean Security', 'String of Pearls Counter', 'Naval Modernization', 'Changi & Duqm Base Access', 'SAGAR Initiative']
  },

  // ====================================================
  // 2017 (20 questions)
  // ====================================================
  {
    year: 2017,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs2-con',
    text: '\'The local self-government system in India has not proved to be an effective instrument of governance.\' Critically examine the statement and give your suggestions to improve the situation.',
    tags: ['Local Self-Government', '73rd and 74th Amendments', 'Devolution Deficit', 'Fiscal Autonomy of Panchayats', 'Capacity Building']
  },
  {
    year: 2017,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs2-con',
    text: 'Critically examine the Supreme Court\'s judgment on \'National Anthem\' in cinema halls in the context of fundamental duties and constitutional patriotism.',
    tags: ['National Anthem Verdict', 'Fundamental Duties (Article 51A)', 'Constitutional Patriotism', 'Judicial Overreach', 'Civil Liberties']
  },
  {
    year: 2017,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs2-par',
    text: 'Examine the scope of Article 142 of the Indian Constitution. Does the exercise of "complete justice" power blur the boundary between judicial activism and judicial overreach?',
    tags: ['Article 142', 'Complete Justice Inherent Power', 'Judicial Activism vs Overreach', 'Separation of Powers', 'Supreme Court Discretion']
  },
  {
    year: 2017,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs2-par',
    text: 'Simultaneous election to the Lok Sabha and the State Assemblies will limit the amount of time and money spent in electioneering but it will reduce the government\'s accountability to the people. Discuss.',
    tags: ['Simultaneous Elections Debate', 'Executive Accountability', 'Frequent Elections Pros & Cons', 'National vs Regional Issues', 'Electoral Reforms']
  },
  {
    year: 2017,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs2-bod',
    text: 'How do you justify the view that the National Institution for Transforming India (NITI) Aayog is fundamentally distinct from the former Planning Commission?',
    tags: ['NITI Aayog vs Planning Commission', 'Cooperative Federalism', 'Think Tank vs Fund Allocator', 'Bottom-Up Planning', 'Team India']
  },
  {
    year: 2017,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs2-gov',
    text: 'Explain the role of NGOs and voluntary organizations in poverty alleviation and community mobilization in rural India.',
    tags: ['Role of NGOs', 'Poverty Alleviation', 'Community Mobilization', 'Grassroots Development', 'Social Capital']
  },
  {
    year: 2017,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs2-soc',
    text: '\'The growth of health sector in India continues to be stymied by acute shortages of medical personnel and skewed geographical distribution.\' Discuss.',
    tags: ['Healthcare Workforce Shortage', 'Doctor-Patient Ratio', 'Rural-Urban Medical Divide', 'Medical Colleges Expansion', 'Ayush Integration']
  },
  {
    year: 2017,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs2-soc',
    text: 'Has the digital push in welfare delivery helped in eliminating bogus beneficiaries, or has it resulted in wrongful exclusion of genuine poor? Discuss with examples.',
    tags: ['Aadhaar & Welfare Delivery', 'Direct Benefit Transfer Exclusion', 'Biometric Authentication Failures', 'PDS Exclusion', 'Welfare Rights']
  },
  {
    year: 2017,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs2-ir',
    text: '\'Indian diaspora has a vital role to play in South-East Asian countries\' economy and society.\' Appraise the role of Indian Diaspora in South- East Asia in this context.',
    tags: ['Indian Diaspora in Southeast Asia', 'Cultural Soft Power', 'Economic Remittances', 'Look East / Act East', 'Bilateral Ties']
  },
  {
    year: 2017,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs2-ir',
    text: 'How does India see its place in the economic space of rising natural resource rich Africa?',
    tags: ['India-Africa Partnership', 'Natural Resources in Africa', 'Lines of Credit', 'South-South Cooperation', 'Critical Minerals']
  },
  {
    year: 2017,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'Examine the constitutional validity of declaring legislative bills as "Money Bills" by the Speaker. How does it circumvent the scrutiny of the Rajya Sabha?',
    tags: ['Money Bill Definition', 'Article 110', 'Speaker Finality Challenge', 'Aadhaar Act Case', 'Bicameral Scrutiny']
  },
  {
    year: 2017,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'Analyze the significance of the 99th Constitutional Amendment Act and the subsequent NJAC judgment in the context of judicial appointments and executive participation.',
    tags: ['NJAC Verdict', '99th Amendment Struck Down', 'Collegium System', 'Judicial Independence', 'Memorandum of Procedure (MoP)']
  },
  {
    year: 2017,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs2-par',
    text: 'The anti-defection law has largely prevented political horse-trading, but it has stifled inner-party dissent and turned MPs into voting machines. Discuss.',
    tags: ['Tenth Schedule Critiques', 'Stifling Dissent', 'Whip Enforcement', 'Inner-Party Democracy', 'Anti-Defection Law Reforms']
  },
  {
    year: 2017,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs2-gov',
    text: 'Discuss the role of Public Interest Litigation (PIL) in expanding access to justice for the marginalized and evaluate the concerns regarding its frivolous misuse.',
    tags: ['Public Interest Litigation (PIL)', 'Locus Standi Relaxation', 'Justice P.N. Bhagwati', 'Frivolous PILs', 'Access to Justice']
  },
  {
    year: 2017,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs2-bod',
    text: 'The Central Information Commission (CIC) is a vital transparency institution. What are the major administrative bottlenecks that restrict its effective functioning?',
    tags: ['Central Information Commission', 'RTI Compliance Deficit', 'Vacancies of Commissioners', 'Pendency of Second Appeals', 'Penalty Enforcement']
  },
  {
    year: 2017,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'Hunger and malnutrition are not just issues of food production, but of food distribution, purchasing power and social determinants. Discuss in the Indian context.',
    tags: ['Hunger & Malnutrition', 'Amartya Sen Entitlement Theory', 'PDS Distribution Bottlenecks', 'Purchasing Power Deficit', 'Sanitation & Clean Water']
  },
  {
    year: 2017,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'Evaluate the role of the Stand Up India and MUDRA Yojana schemes in fostering entrepreneurship among Scheduled Castes, Scheduled Tribes, and Women.',
    tags: ['MUDRA Yojana', 'Stand Up India', 'Collateral-Free Credit', 'Financial Inclusion', 'Affirmative Entrepreneurship']
  },
  {
    year: 2017,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs2-ir',
    text: 'The China-Pakistan Economic Corridor (CPEC) passes through Pakistan-occupied Kashmir (PoK). Analyze India\'s sovereignty concerns and geopolitical responses.',
    tags: ['CPEC', 'PoK Sovereignty Concerns', 'Belt and Road Initiative', 'India Boycott of BRI', 'Northern Frontier Security']
  },
  {
    year: 2017,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs2-ir',
    text: '\'The Asia-Pacific Economic Cooperation (APEC) has emerged as an engine of trade liberalization in the Pacific Rim.\' What are the pros and cons of India joining APEC?',
    tags: ['APEC Membership for India', 'Trade Liberalization', 'Pacific Rim Trade', 'Reforms Compatibility', 'Regional Economic Integration']
  },
  {
    year: 2017,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs2-ir',
    text: 'Evaluate the strategic importance of the INSTC (International North-South Transport Corridor) in expanding India\'s trade and connectivity with Russia and Eurasia.',
    tags: ['INSTC Corridor', 'Eurasian Connectivity', 'Bandar Abbas Transit', 'Trade Logistics Cost', 'Russia-India Economic Links']
  },

  // ====================================================
  // 2016 (20 questions)
  // ====================================================
  {
    year: 2016,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs2-con',
    text: 'Discuss the essentials of the 69th Constitutional Amendment Act and the anomalies, if any, that have led to recent conflicts between the elected representatives and the institution of the Lieutenant Governor in the administration of Delhi.',
    tags: ['69th Amendment Act', 'Article 239AA', 'Delhi Administration', 'Lt. Governor Discretion', 'Special Status of NCT']
  },
  {
    year: 2016,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs2-con',
    text: 'To what extent is Article 370 of the Indian Constitution an example of asymmetrical federalism? Discuss its constitutional rationale.',
    tags: ['Article 370', 'Asymmetrical Federalism', 'Special Status of J&K', 'Constituent Assembly of J&K', 'Federal Integration']
  },
  {
    year: 2016,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs2-par',
    text: '"The exercise of executive ordinance-making power under Article 123 must be restricted to emergent situations and not used to bypass legislative debate." Discuss in the light of D.C. Wadhwa case.',
    tags: ['Ordinance Making Power', 'Article 123', 'D.C. Wadhwa Case', 'Re-promulgation of Ordinances', 'Executive Usurpation']
  },
  {
    year: 2016,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs2-par',
    text: 'What is the significance of the Public Accounts Committee (PAC) in scrutinizing government expenditures and enforcing executive accountability?',
    tags: ['Public Accounts Committee', 'CAG Audit Reports', 'Financial Accountability', 'Opposition Chairperson', 'Financial Scrutiny']
  },
  {
    year: 2016,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs2-bod',
    text: 'The Union Public Service Commission (UPSC) is the premier recruiting agency for civil services. Discuss its constitutional functions and advisory role under Article 320.',
    tags: ['UPSC Functions', 'Article 320', 'Civil Services Recruitment', 'Merit System Safeguard', 'Consultation Mandate']
  },
  {
    year: 2016,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs2-gov',
    text: '"Effectiveness of the government service delivery depends heavily on the morale and ethical climate of the civil service." Discuss with measures to foster civil service integrity.',
    tags: ['Civil Service Ethics', 'Service Delivery Efficiency', 'Whistleblower Safeguards', 'Administrative Morale', 'Code of Conduct']
  },
  {
    year: 2016,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs2-soc',
    text: 'Examine the main provisions of the National Food Security Act, 2013 and analyze the operational bottlenecks in reaching the vulnerable targeted households.',
    tags: ['NFSA 2013', 'Targeted Public Distribution System (TPDS)', 'Antyodaya Anna Yojana', 'Identification of Beneficiaries', 'Leakages & Diversions']
  },
  {
    year: 2016,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs2-soc',
    text: 'Analyze the impact of the Right to Education Act, 2009 on elementary schooling with special reference to Section 12(1)(c) providing 25% quota for disadvantaged groups.',
    tags: ['RTE Act Section 12(1)(c)', '25 Percent EWS Quota', 'Private School Enrolment', 'Reimbursement Bottlenecks', 'Educational Inclusivity']
  },
  {
    year: 2016,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs2-ir',
    text: '\'The concept of Indian Ocean as a "Zone of Peace" remains relevant in the context of growing naval militarization by extra-regional powers.\' Discuss.',
    tags: ['Zone of Peace Concept', 'Indian Ocean Militarization', 'Chinese Naval Presence', 'Djibouti Base', 'Regional Maritime Stability']
  },
  {
    year: 2016,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs2-ir',
    text: 'Evaluate the role of the South Asian Association for Regional Cooperation (SAARC) in promoting trade under SAFTA and analyze reasons for its sluggish progress.',
    tags: ['SAARC & SAFTA', 'Intra-Regional Trade Barriers', 'India-Pakistan Impasse', 'Non-Tariff Barriers', 'Regional Integration']
  },
  {
    year: 2016,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'The Uniform Civil Code (UCC) under Article 44 remains a contentious issue. How can the State reconcile the constitutional commitment to UCC with religious freedom under Article 25?',
    tags: ['Uniform Civil Code', 'Article 44', 'Article 25 Freedom of Religion', 'Personal Laws Reforms', 'Gender Justice']
  },
  {
    year: 2016,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'Discuss the evolution of the Collegium system for appointment of judges to the Supreme Court and High Courts. What safeguards are necessary to ensure institutional transparency?',
    tags: ['Collegium System Evolution', 'Three Judges Cases', 'Memorandum of Procedure', 'Judicial Transparency', 'Merit vs Seniority']
  },
  {
    year: 2016,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs2-par',
    text: 'The decline in the number of parliamentary sittings and frequent disruptions impair legislative quality. Suggest reforms to revitalize parliamentary debate and scrutiny.',
    tags: ['Decline of Sittings', 'Parliamentary Disruptions', 'Quality of Legislation', 'Shadow Cabinet Idea', 'Fixed Sitting Days Norm']
  },
  {
    year: 2016,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs2-gov',
    text: 'Analyze the working of the Lokpal and Lokayuktas Act, 2013. What are the institutional impediments that have delayed the full operationalization of the Lokpal?',
    tags: ['Lokpal and Lokayuktas Act', 'Anti-Corruption Framework', 'Search & Selection Committee', 'Jurisdiction over Prime Minister', 'Whistleblower Protection']
  },
  {
    year: 2016,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs2-bod',
    text: 'The Election Commission of India has proposed state funding of elections and caps on anonymous donations. Critically evaluate these proposals in the fight against illicit money in politics.',
    tags: ['Electoral Finance Reforms', 'State Funding of Elections', 'Anonymous Electoral Bonds', 'Indrajit Gupta Committee', 'Black Money in Elections']
  },
  {
    year: 2016,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'Child labour continues to be a blot on Indian society despite legal prohibitions. Critically examine the Child Labour (Prohibition and Regulation) Amendment Act, 2016.',
    tags: ['Child Labour Amendment 2016', 'Family Enterprises Exemption', 'Adolescent Hazardous Work', 'ILO Conventions 138 & 182', 'Child Rights Protection']
  },
  {
    year: 2016,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'Discuss the concept of Universal Health Coverage (UHC) in India. How can a mixed healthcare delivery system involving public and private sectors achieve equitable health outcomes?',
    tags: ['Universal Health Coverage', 'Public-Private Healthcare Mix', 'Out-of-Pocket Expenditure', 'Highkin Committee', 'Primary Health Focus']
  },
  {
    year: 2016,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs2-ir',
    text: '\'Project Mausam\' and the \'Cotton Route\' are perceived as India\'s cultural and economic responses to China\'s Maritime Silk Road. Examine their scope and progress.',
    tags: ['Project Mausam', 'Maritime Silk Road Counter', 'Cotton Route', 'Cultural Diplomacy', 'Indian Ocean Littorals']
  },
  {
    year: 2016,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs2-ir',
    text: 'Analyze the significance of the Nuclear Suppliers Group (NSG) and examine the obstacles India faces in securing full membership of the grouping.',
    tags: ['NSG Membership', 'NPT Non-Signatory Issue', 'Chinese Opposition', 'Civil Nuclear Cooperation', 'Non-Proliferation Regimes']
  },
  {
    year: 2016,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs2-ir',
    text: 'Evaluate the role of the International Court of Justice (ICJ) in peaceful settlement of international disputes, with specific reference to cases involving India.',
    tags: ['International Court of Justice (ICJ)', 'Kulbhushan Jadhav Case', 'Maritime Boundary Adjudication', 'Compulsory Jurisdiction', 'International Law']
  },

  // ====================================================
  // 2015 (20 questions)
  // ====================================================
  {
    year: 2015,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs2-con',
    text: 'Discuss the possible factors that inhibit India from enacting for its citizens a uniform civil code as provided for in the Directive Principles of State Policy.',
    tags: ['Uniform Civil Code (UCC)', 'Article 44', 'Directive Principles vs Fundamental Rights', 'Plural Personal Laws', 'Consensus Building']
  },
  {
    year: 2015,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs2-con',
    text: 'The concept of cooperative federalism has been increasingly emphasized in recent years. Highlight the issues and challenges in realizing this goal in practice.',
    tags: ['Cooperative Federalism', 'Inter-State Council', 'GST Implementation', 'Centrally Sponsored Schemes', 'Fiscal Devolution']
  },
  {
    year: 2015,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs2-par',
    text: 'In the absence of a well-educated and organized public opinion, the system of Parliamentary Democracy in India is prone to populist tendencies. Comment.',
    tags: ['Parliamentary Democracy', 'Populism in Politics', 'Voter Awareness', 'Freebie Culture vs Development', 'Public Opinion']
  },
  {
    year: 2015,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs2-par',
    text: 'Discuss the procedure for the removal of a Judge of the Supreme Court of India. Does the Judges (Inquiry) Act, 1968 provide an effective mechanism for accountability?',
    tags: ['Impeachment of Judges', 'Judges Inquiry Act 1968', 'Article 124(4)', 'Misbehaviour & Incapacity', 'Judicial Accountability']
  },
  {
    year: 2015,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs2-bod',
    text: 'What are the major functions and constitutional status of the Finance Commission of India? How does it balance equity and efficiency in revenue distribution?',
    tags: ['Finance Commission', 'Article 280', 'Horizontal Tax Devolution', 'Revenue Deficit Grants', 'Equity vs Efficiency']
  },
  {
    year: 2015,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs2-gov',
    text: 'Examine the role of the Central Information Commission in strengthening citizens\' right to know and examine the challenges arising from non-compliance by public authorities.',
    tags: ['Central Information Commission', 'Public Authority Compliance', 'Right to Information', 'Section 4 Disclosures', 'Administrative Resistance']
  },
  {
    year: 2015,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs2-soc',
    text: 'Examine the main reasons behind the phenomenon of farmer suicides in India and evaluate the institutional support systems in addressing agrarian distress.',
    tags: ['Farmer Suicides', 'Agrarian Distress', 'Indebtedness & Crop Failure', 'Institutional Credit Deficit', 'Kisan Credit Card']
  },
  {
    year: 2015,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs2-soc',
    text: 'Critically analyze how the Beti Bachao Beti Padhao initiative aims to prevent female foeticide and improve the adverse child sex ratio in India.',
    tags: ['Beti Bachao Beti Padhao', 'Child Sex Ratio', 'PC-PNDT Act', 'Female Foeticide Prevention', 'Girl Child Education']
  },
  {
    year: 2015,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs2-ir',
    text: '\'The Land Boundary Agreement (LBA) with Bangladesh demonstrates how political consensus and border dispute settlement can unlock regional cooperation.\' Discuss.',
    tags: ['India-Bangladesh LBA', '100th Constitutional Amendment', 'Enclave Exchange', 'Border Settlement', 'Cooperative Diplomacy']
  },
  {
    year: 2015,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs2-ir',
    text: 'Discuss the strategic importance of Seychelles and Mauritius for India\'s maritime security architecture in the south-western Indian Ocean.',
    tags: ['Seychelles & Mauritius', 'Assumption Island Project', 'Agalega Development', 'Western Indian Ocean', 'Maritime Security Architecture']
  },
  {
    year: 2015,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'Does the Right to Life and Personal Liberty under Article 21 encompass the "Right to Die with Dignity"? Discuss in the light of the Gian Kaur and Aruna Shanbaug cases.',
    tags: ['Right to Die with Dignity', 'Article 21', 'Aruna Shanbaug Case', 'Passive Euthanasia', 'Living Will Doctrine']
  },
  {
    year: 2015,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'Analyze the constitutional scheme of distribution of legislative powers between the Union and the States under Article 246 with reference to the Doctrine of Pith and Substance.',
    tags: ['Distribution of Legislative Powers', 'Article 246 & Seventh Schedule', 'Doctrine of Pith and Substance', 'Harmonious Construction', 'Federal Scheme']
  },
  {
    year: 2015,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs2-par',
    text: 'How far has the anti-defection law helped in providing political stability? Does it restrict legislators from acting as genuine representatives of their constituencies?',
    tags: ['Anti-Defection Law', 'Political Stability', 'Representative Democracy', 'Party Whip Strictness', 'Dinesh Goswami Committee']
  },
  {
    year: 2015,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs2-gov',
    text: 'The Citizen Charter is an instrument of accountability, yet its implementation suffers from lack of public awareness and absence of statutory backing. Evaluate.',
    tags: ['Citizen Charter Implementation', 'Statutory Backing for Charters', 'Right of Citizens for Time Bound Delivery', 'Sevottam Framework', 'Accountability']
  },
  {
    year: 2015,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs2-bod',
    text: 'Examine the powers and role of the National Green Tribunal (NGT) in environmental adjudication and evaluate how its orders have balanced development and ecology.',
    tags: ['National Green Tribunal (NGT)', 'NGT Act 2010', 'Environmental Justice', 'Polluter Pays Principle', 'Sustainable Development Orders']
  },
  {
    year: 2015,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'The Jan Dhan-Aadhaar-Mobile (JAM) trinity has the potential to eliminate leakages in social security subsidies. Discuss its architecture, promise and security risks.',
    tags: ['JAM Trinity', 'Direct Benefit Transfer', 'Financial Inclusion', 'Biometric Authentication', 'Digital Privacy Risks']
  },
  {
    year: 2015,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'Skill development is an essential driver of economic growth, but the National Skill Development Policy faces severe challenges in quality standardization and industry alignment. Discuss.',
    tags: ['National Skill Development Policy', 'NSQF Standards', 'Industry-Academia Interface', 'Apprenticeships Deficit', 'Demographic Dividend']
  },
  {
    year: 2015,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs2-ir',
    text: '\'Project Mausam\' is considered a strategic outreach by India to its maritime neighbours in the Indian Ocean. Discuss its cultural and strategic ramifications.',
    tags: ['Project Mausam', 'Maritime Silk Route Counter', 'Indian Ocean Littoral Outreach', 'Cultural Diplomacy', 'Trans-Oceanic Heritage']
  },
  {
    year: 2015,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs2-ir',
    text: 'Evaluate the role of the New Development Bank (NDB) and Asian Infrastructure Investment Bank (AIIB) in reshaping global financial governance. What are India\'s stakes?',
    tags: ['New Development Bank (NDB)', 'AIIB', 'Bretton Woods Alternates', 'Global Financial Architecture', 'Infrastructure Financing']
  },
  {
    year: 2015,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs2-ir',
    text: 'Analyze the factors responsible for the persistent deadlock in the WTO Doha Development Agenda. How do India\'s positions on food security and public stockholding protect domestic farmers?',
    tags: ['WTO Doha Round Deadlock', 'Public Stockholding for Food Security', 'Peace Clause', 'Agricultural Subsidies (Amber Box)', 'India Farm Interests']
  },

  // ====================================================
  // 2014 (20 questions)
  // ====================================================
  {
    year: 2014,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs2-con',
    text: 'Starting from inventing the \'basic structure\' doctrine, the judiciary has played a highly proactive role in ensuring that India develops into a thriving democracy. In light of the statement, evaluate the role conducted by judicial activism in safeguarding constitutional values.',
    tags: ['Basic Structure Doctrine', 'Judicial Activism', 'Constitutional Safeguards', 'Public Interest Litigation', 'Rule of Law']
  },
  {
    year: 2014,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs2-con',
    text: 'Discuss the recommendations of the Sarkaria Commission and Punchhi Commission regarding the appointment and role of the Governor.',
    tags: ['Office of the Governor', 'Sarkaria Commission', 'Punchhi Commission', 'Inter-State Relations', 'Appointment Guidelines']
  },
  {
    year: 2014,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs2-par',
    text: 'Though the federal principle is prevalent in our Constitution and that principle is one of its basic features, it is equally true that federalism under the Indian Constitution leans in favour of a strong Center, a feature that militates against the concept of strong, autonomous states. Discuss.',
    tags: ['Unitary Bias', 'Quasi-Federal Constitution', 'Strong Centre Design', 'K.C. Wheare Observation', 'State Autonomy']
  },
  {
    year: 2014,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs2-par',
    text: 'The role of individual MPs has diminished significantly due to strict enforcement of the whip under the anti-defection law. Evaluate its impact on intra-parliamentary deliberation.',
    tags: ['Anti-Defection Law', 'Role of MPs Diminished', 'Party Whip Rigidity', 'Parliamentary Debate Quality', 'Tenth Schedule Reform']
  },
  {
    year: 2014,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs2-bod',
    text: 'Explain the composition, powers and functions of the National Human Rights Commission (NHRC). What are the main statutory handicaps in its enforcement mechanism?',
    tags: ['NHRC Composition & Powers', 'Statutory Handicaps', 'Armed Forces Section 19 Limit', 'Non-Binding Recommendations', 'Human Rights Act']
  },
  {
    year: 2014,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs2-gov',
    text: 'Electronic voting machines (EVMs) have revolutionized elections in India, but transparency demands continuous technological auditing and introduction of paper audit trails. Discuss.',
    tags: ['EVM Technology', 'VVPAT Rollout', 'Electoral Transparency', 'Subramanian Swamy vs ECI', 'Free and Fair Elections']
  },
  {
    year: 2014,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs2-soc',
    text: 'The National Policy on Skill Development and Entrepreneurship aims to address India\'s demographic challenge. What are the key bottlenecks in scaling vocational training programs?',
    tags: ['Vocational Education Bottlenecks', 'Skill Development Policy', 'ITI Infrastructure Deficit', 'Social Prestige of Skills', 'Apprenticeships']
  },
  {
    year: 2014,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs2-soc',
    text: 'Critically examine whether legal provisions prohibiting manual scavenging have succeeded on the ground in the absence of mechanized municipal waste systems.',
    tags: ['Prohibition of Manual Scavenging', 'Mechanized Sanitation', 'Municipal Sewer Cleaning', 'Caste Rehabilitation', 'Sanitation Workers Rights']
  },
  {
    year: 2014,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs2-ir',
    text: '\'The Look East Policy of India is gaining momentum through economic and strategic integration with ASEAN.\' Evaluate the significance of India-ASEAN FTA in goods.',
    tags: ['Look East Policy', 'ASEAN-India FTA', 'Trade Deficit Concerns', 'Act East Transition', 'Regional Connectivity']
  },
  {
    year: 2014,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs2-ir',
    text: 'Examine the geopolitical significance of the Central Asian region for India\'s energy security and discuss the strategic potential of the TAPI pipeline.',
    tags: ['TAPI Gas Pipeline', 'Central Asia Energy Security', 'Geopolitical Hurdles in Transit', 'Turkmenistan Gas', 'Connect Central Asia']
  },
  {
    year: 2014,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'The Right to Information Act, 2005 has significantly transformed bureaucratic functioning from secrecy to openness. However, official reluctance and backlog of appeals remain serious challenges. Discuss.',
    tags: ['RTI Act Transformation', 'Culture of Secrecy', 'Pendency in SICs', 'Whistleblower Protection', 'Public Accountability']
  },
  {
    year: 2014,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'Examine whether the creation of smaller states promotes administrative efficiency and economic development or exacerbates inter-state disputes. Illustrate with recent examples.',
    tags: ['Creation of Smaller States', 'Telangana Formation', 'Administrative Efficiency', 'Inter-State River Disputes', 'Regional Development']
  },
  {
    year: 2014,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs2-par',
    text: 'Discuss the constitutional role of the Leader of the Opposition (LoP) in parliamentary democracy and its statutory significance in appointment to statutory integrity institutions.',
    tags: ['Leader of Opposition (LoP)', 'Statutory Selection Committees', 'CVC & Lokpal Appointments', '10 Percent Rule Controversy', 'Parliamentary Democracy']
  },
  {
    year: 2014,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs2-gov',
    text: 'Examine the role of civil society organizations in advocating the rights of vulnerable groups, and evaluate the balance between state regulation and freedom of association under Article 19(1)(c).',
    tags: ['Civil Society Advocacy', 'Freedom of Association', 'FCRA Regulatory Scrutiny', 'Article 19(1)(c)', 'Democratic Participation']
  },
  {
    year: 2014,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs2-bod',
    text: 'Discuss the constitutional jurisdiction and advisory powers of the Attorney-General for India. How does the office maintain independence from political executive pressures?',
    tags: ['Attorney-General of India', 'Article 76', 'Legal Advisory Role', 'Executive Autonomy', 'Private Practice Guidelines']
  },
  {
    year: 2014,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'The Millennium Development Goals (MDGs) revealed uneven progress in India, particularly regarding maternal mortality and child undernutrition. Analyze the gaps and future roadmaps.',
    tags: ['Millennium Development Goals (MDGs)', 'Maternal Mortality Ratio (MMR)', 'Infant Mortality Rate (IMR)', 'SDG Transition', 'Health Infrastructure']
  },
  {
    year: 2014,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'Analyze the impact of Self-Help Groups (SHGs) on the financial inclusion and social empowerment of marginalized rural women in India.',
    tags: ['SHGs & Financial Inclusion', 'Microcredit Delivery', 'NABARD Bank Linkage', 'Social Empowerment', 'Rural Poverty Alleviation']
  },
  {
    year: 2014,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs2-ir',
    text: '\'China\'s aggressive posturing in the South China Sea affects freedom of navigation and maritime security in the Indo-Pacific.\' Discuss India\'s stakes and stance.',
    tags: ['South China Sea Disputes', 'UNCLOS Principles', 'Freedom of Navigation', 'India Oil Exploration (OVL)', 'Indo-Pacific Maritime Rules']
  },
  {
    year: 2014,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs2-ir',
    text: 'Examine the geopolitical implications of the rise of Islamic State (ISIS) in West Asia and evaluate the security and diaspora challenges for India.',
    tags: ['Rise of ISIS in West Asia', 'Indian Diaspora Security', 'Crude Oil Supply Vulnerability', 'Counter-Radicalization', 'National Security']
  },
  {
    year: 2014,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs2-ir',
    text: 'Analyze the significance of the 6th BRICS Summit in Fortaleza (2014) in establishing the New Development Bank and Contingent Reserve Arrangement.',
    tags: ['Fortaleza BRICS Summit 2014', 'New Development Bank Creation', 'Contingent Reserve Arrangement', 'Alternative Multilateral Lending', 'South-South Cooperation']
  },

  // ====================================================
  // 2013 (20 questions)
  // ====================================================
  {
    year: 2013,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs2-con',
    text: 'The judicial activism in India has brought about revolution in the fields of human rights and environmental protection, but it has blurred the boundary between judicial activism and judicial overreach. Discuss.',
    tags: ['Judicial Activism vs Overreach', 'Human Rights Expansion', 'Environmental PILs', 'Separation of Powers', 'Judicial Self-Restraint']
  },
  {
    year: 2013,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs2-con',
    text: 'Examine the constitutional scheme of distribution of financial powers between the Union and the States. How does vertical fiscal imbalance necessitate institutional transfers?',
    tags: ['Financial Relations (Articles 268-293)', 'Vertical Fiscal Imbalance', 'Finance Commission Transfers', 'Resource Mobilization', 'Fiscal Federalism']
  },
  {
    year: 2013,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs2-par',
    text: 'What are the main causes behind the frequent logjams and disruptions in parliamentary sessions in India? Suggest institutional remedies to improve legislative productivity.',
    tags: ['Parliamentary Disruptions', 'Legislative Productivity', 'Disciplinary Powers of Speaker', 'Structured Debate Rules', 'Code of Conduct for MPs']
  },
  {
    year: 2013,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs2-par',
    text: 'Explain the mechanism of Parliamentary control over the executive through Question Hour, Zero Hour, and Adjournment Motions.',
    tags: ['Parliamentary Control Devices', 'Question Hour', 'Zero Hour', 'Adjournment Motion', 'Executive Accountability']
  },
  {
    year: 2013,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs2-bod',
    text: 'Critically analyze the role of the Election Commission of India in regulating hate speech and communal appeals during electoral campaigning.',
    tags: ['Election Commission of India', 'Model Code of Conduct', 'Hate Speech Regulation', 'Section 123 RPA 1951', 'Electoral Decorum']
  },
  {
    year: 2013,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs2-gov',
    text: 'Discuss the importance of Citizen Charters in enhancing public administrative accountability and explain why most charters in India have failed to deliver visible results.',
    tags: ['Citizen Charters Failure Causes', 'Lack of Legal Enforceability', 'Absence of Compensation Clauses', 'Administrative Apathy', 'Public Grievance Redressal']
  },
  {
    year: 2013,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs2-soc',
    text: 'Critically examine whether the Mahatma Gandhi National Rural Employment Guarantee Scheme (MGNREGS) has served as an effective social safety net for rural labour.',
    tags: ['MGNREGS Safety Net', 'Rural Wage Rates', 'Asset Creation Quality', 'Delay in Wage Payments', 'Livelihood Security']
  },
  {
    year: 2013,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs2-soc',
    text: 'Examine the role of the Integrated Child Development Services (ICDS) in combating infant malnutrition and maternal anemia in rural India.',
    tags: ['ICDS Scheme', 'Anganwadi Services', 'Supplementary Nutrition', 'Child Malnutrition', 'Maternal Health']
  },
  {
    year: 2013,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs2-ir',
    text: 'Discuss the strategic importance of Afghanistan for India\'s geopolitical security and regional connectivity post-US troop withdrawal.',
    tags: ['India-Afghanistan Strategic Partnership', 'Salma Dam & Zaranj-Delaram', 'Post-US Withdrawal Security', 'Regional Stability', 'Taliban Resurgence Risk']
  },
  {
    year: 2013,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs2-ir',
    text: '\'The South China Sea maritime dispute has become a focal point of geopolitical contestation.\' What are India\'s core economic and navigational interests in the region?',
    tags: ['South China Sea Geopolitics', 'Freedom of Sea Lanes', 'Oil & Gas Exploration', 'UNCLOS Compliance', 'Malacca Strait Proximity']
  },
  {
    year: 2013,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'The Constitution (Seventy-Third Amendment) Act, 1992 has completed two decades. How far has it succeeded in bringing about socio-political empowerment of women and marginalized sections?',
    tags: ['73rd Amendment Impact', 'Women in Panchayats', 'SC/ST Reservations', 'Socio-Political Empowerment', 'Grassroots Democracy']
  },
  {
    year: 2013,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'Analyze the significance of the Lily Thomas (2013) judgment by the Supreme Court concerning Section 8(4) of the Representation of the People Act, 1951.',
    tags: ['Lily Thomas Judgment 2013', 'Section 8(4) Struck Down', 'Instant Disqualification of Convicted MPs', 'Criminalization of Politics', 'Electoral Decency']
  },
  {
    year: 2013,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs2-par',
    text: 'Examine the role of the Comptroller and Auditor General (CAG) in conducting "performance audits" and evaluate the executive\'s objections to policy critique by the auditor.',
    tags: ['CAG Performance Audit', '2G & Coal Block Audits', 'Policy vs Implementation Audit', 'Vinod Rai Tenure', 'Executive-Auditor Friction']
  },
  {
    year: 2013,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs2-gov',
    text: 'The Whistleblowers Protection Act aims to establish a mechanism to receive complaints relating to disclosure on any allegation of corruption or wilful misuse of power. Evaluate its adequacy.',
    tags: ['Whistleblowers Protection Act', 'Protection from Victimization', 'CVC Role', 'Corporate Whistleblowing', 'Safeguards for Complainants']
  },
  {
    year: 2013,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs2-bod',
    text: 'Discuss the composition, mandate, and achievements of the National Disaster Management Authority (NDMA) in steering disaster preparedness and response in India.',
    tags: ['NDMA Mandate', 'Disaster Management Act 2005', 'Preparedness & Mitigation', 'Uttarakhand Floods 2013 Lessons', 'Early Warning Coordination']
  },
  {
    year: 2013,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'Analyze the socio-economic factors responsible for the persistent gap in male and female literacy rates across major states in India and suggest corrective measures.',
    tags: ['Gender Gap in Literacy', 'Female Literacy Barriers', 'Early Marriage & Domestic Duties', 'KGBV Schools', 'Targeted Educational Interventions']
  },
  {
    year: 2013,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'The National Rural Health Mission (NRHM) was launched to provide accessible and affordable healthcare in rural areas. Critically evaluate its impact on reducing maternal and infant mortality.',
    tags: ['NRHM Evaluation', 'ASHA Worker Empowerment', 'Janani Suraksha Yojana', 'Institutional Deliveries', 'Rural Health Upgradation']
  },
  {
    year: 2013,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs2-ir',
    text: '\'The Look East Policy initiated in 1991 has evolved into a strategic partnership with ASEAN and East Asian powers.\' Examine the economic and security dimensions of this evolution.',
    tags: ['Look East Evolution', 'ASEAN Strategic Partnership', 'East Asia Summit (EAS)', 'Maritime Security', 'Trade and Investment Links']
  },
  {
    year: 2013,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs2-ir',
    text: 'Critically examine India\'s stand on the Comprehensive Nuclear-Test-Ban Treaty (CTBT) and Treaty on the Non-Proliferation of Nuclear Weapons (NPT). What are India\'s principled objections?',
    tags: ['NPT & CTBT', 'Discriminatory Treaties', 'Nuclear Disarmament', 'Universal & Non-discriminatory', 'India Nuclear Doctrine']
  },
  {
    year: 2013,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs2-ir',
    text: 'Evaluate the role of the World Trade Organization (WTO) Bali Ministerial Conference (2013) with special reference to Trade Facilitation Agreement (TFA) and food security concerns.',
    tags: ['WTO Bali Ministerial 2013', 'Trade Facilitation Agreement (TFA)', 'Peace Clause for Food Security', 'Public Stockholding', 'Multilateral Negotiations']
  }
];

module.exports = gs2Questions;
