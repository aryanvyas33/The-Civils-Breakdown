const fs = require('fs');
const path = require('path');

const gs2New = [
  // 2026
  {
    year: 2026,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs2-con',
    text: 'Right to privacy relating to self-identity is very dear to every human being and well protected under Article 21 of the Constitution. In this context, examine the effect of the amendment in 2026, to the Transgender Persons (Protection of Rights) Act, 2019.',
    tags: ['Article 21 Right to Privacy', 'Transgender Persons Act', 'Self-Identity Recognition', 'Fundamental Rights', 'NALSA Judgment']
  },
  {
    year: 2026,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs2-par',
    text: '"Women as a class neither belong to a minority group nor are they regarded as forming a backward class." In the light of this statement, discuss the evolution of women\'s reservation from local bodies to Parliament.',
    tags: ["Women's Reservation in Parliament", 'Nari Shakti Vandan Adhiniyam', '73rd and 74th Amendments', 'Gender Representation in Politics', 'Affirmative Action']
  },
  {
    year: 2026,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs2-par',
    text: 'Examine whether the constitutional office of the Lok Sabha Speaker has become vulnerable to partisan politics under the current anti-defection regime. What institutional changes are required to ensure the neutrality of the Lok Sabha Speaker in managing a polarised House ?',
    tags: ['Office of the Speaker Neutrality', 'Anti-Defection Law (Tenth Schedule)', 'Kihoto Hollohan Doctrine', 'Parliamentary Reforms', 'Managing Legislative Business']
  },
  {
    year: 2026,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs2-bod',
    text: 'Is the right to vote a fundamental right ? Discuss the position of the Election Commission of India while undertaking the revision of electoral rolls. Can it also examine the question of citizenship of voters ?',
    tags: ['Right to Vote (Article 326)', 'Election Commission of India', 'Electoral Roll Revision', 'Citizenship & Voter Eligibility', 'Constitutional Rights']
  },
  {
    year: 2026,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs2-bod',
    text: 'Do constitutional bodies like the National Commission for Scheduled Castes (NCSC) and the National Commission for Scheduled Tribes (NCST) possess adequate enforcement powers to secure substantive social equality ? Suggest measures to enhance their institutional effectiveness.',
    tags: ['NCSC and NCST (Articles 338 & 338A)', 'Constitutional Commissions', 'Substantive Equality', 'Civil Court Powers Limitations', 'Institutional Effectiveness']
  },
  {
    year: 2026,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs2-soc',
    text: "Does India's tribal development policy reflect the aspirations for a socially grounded and equity-based governance ? Justify your answer.",
    tags: ['Tribal Development Policy', 'PESA Act 1996', 'Fifth & Sixth Schedules', 'Tribal Self-Governance', 'Social Equity in Administration']
  },
  {
    year: 2026,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs2-soc',
    text: 'Malnutrition in India is not merely a public health concern; it is also a challenge of social equity, human development and effective welfare governance. Discuss.',
    tags: ['Malnutrition in India', 'POSHAN Abhiyaan', 'Hidden Hunger & Child Stunting', 'Welfare Governance', 'Public Health Equity']
  },
  {
    year: 2026,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs2-gov',
    text: 'Analyse the advantages and limitations of the generalist structure of the Indian Civil Services in contemporary governance.',
    tags: ['Civil Services Structure', 'Generalists vs Specialists Debate', 'Lateral Entry Reforms', 'Administrative Capability', 'Policy Making Expertise']
  },
  {
    year: 2026,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs2-ir',
    text: '"IPMDA (Indo-Pacific Partnership for Maritime Domain Awareness) bridges the gap between India\'s SAGAR (Security and Growth for All in the Region) vision and the Quad\'s collective Indo-Pacific strategy." Make a critical assessment of the statement focusing on IPMDA.',
    tags: ['IPMDA Indo-Pacific Initiative', 'Quad Security Architecture', 'SAGAR Vision (Security & Growth for All)', 'Maritime Domain Awareness', 'Indian Ocean Geopolitics']
  },
  {
    year: 2026,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs2-ir',
    text: '"BRICS acts as a powerful counterweight in global governance, actively amplifying the voice and influence of the Global South." Explain the role of BRICS in projecting itself as an alternative to other groupings.',
    tags: ['BRICS Expansion', 'Global South Voice', 'De-dollarisation & Trade Settlement', 'Reforming Multilateralism', 'New Development Bank (NDB)']
  },
  {
    year: 2026,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'Discuss the position of the Governor in the federal polity of India. What is the nature of his power while giving assent to a bill passed by the State Legislature ? Is he bound by the aid and advice of his Council of Ministers in all his functions ?',
    tags: ['Office of the Governor (Article 200)', 'Assent to State Bills', 'Discretionary Powers of Governor', 'Sarkaria & Punchhi Recommendations', 'Cooperative Federalism']
  },
  {
    year: 2026,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'What is meant by judicial legislation ? In this context, discuss the verdicts of the apex court allowing "passive euthanasia" and a "living will".',
    tags: ['Judicial Legislation & Activism', 'Passive Euthanasia (Common Cause)', 'Living Will & Advance Directives', 'Separation of Powers', 'Right to Die with Dignity (Article 21)']
  },
  {
    year: 2026,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'How far has the Indian federal framework been successful in accommodating regional and cultural diversities ? Highlight the role of asymmetric federalism and suggest measures to make dispute resolution mechanisms more effective.',
    tags: ['Asymmetric Federalism (Article 371)', 'Inter-State Council (Article 263)', 'Regional Diversities Accommodation', 'Dispute Resolution Mechanisms', 'Federal Integrity']
  },
  {
    year: 2026,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'Examine how the separation of powers is practised in India compared to the rigid presidential model of the United States of America. In this context, compare the actual authority of the Indian Prime Minister with that of the President of the USA.',
    tags: ['Separation of Powers (India vs USA)', 'Parliamentary Executive vs Presidential Model', 'Powers of Prime Minister vs US President', 'Checks and Balances', 'Constitutional Systems Comparison']
  },
  {
    year: 2026,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs2-gov',
    text: 'To what extent do pressure groups, social movements and corporate lobbies deepen pluralistic democracy in India by representing excluded interests ? Analyse whether the growing convergence of corporate wealth and political power poses a threat to the autonomy of formal democratic institutions.',
    tags: ['Pressure Groups & Corporate Lobbies', 'Pluralistic Democracy in India', 'Electoral Bond Debate & Cronyism', 'Social Movements', 'Democratic Autonomy']
  },
  {
    year: 2026,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs2-gov',
    text: '"Transparency and accountability in governance are not about controlling corruption but about creating the trust of stakeholders in the policy process by following the Rule of Law and Participatory Governance." Comment.',
    tags: ['Transparency in Governance', 'Accountability & Stakeholder Trust', 'Rule of Law', 'Participatory Governance', 'Social Audit & RTI']
  },
  {
    year: 2026,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'Can the constitutional mandate of rights-based welfare be effectively realised in the context of non-integrated governance and minimal public investment ? Examine.',
    tags: ['Rights-Based Welfare Approach', 'Public Investment in Social Sector', 'Fragmented Governance', 'Constitutional Mandates (DPSP)', 'Social Security Implementation']
  },
  {
    year: 2026,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs2-soc',
    text: 'Should education be treated primarily as a welfare obligation of the state or as a strategic investment for building a globally competitive, knowledge-driven nation ? Critically evaluate.',
    tags: ['Education Policy Paradigm', 'Right to Education (RTE Act)', 'National Education Policy (NEP 2020)', 'Human Capital Formation', 'Knowledge-Driven Economy']
  },
  {
    year: 2026,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs2-ir',
    text: '"India\'s global diaspora acts as a living bridge, as a critical economic factor and knowledge network in transforming cultural heritage into geopolitical influence and strategic leverage worldwide." Critically examine this statement.',
    tags: ['Indian Diaspora Diplomacy', 'Remittances and Knowledge Transfer', 'Soft Power Geopolitics', 'Overseas Citizen Advocacy', 'Bilateral Ties Leverage']
  },
  {
    year: 2026,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs2-ir',
    text: '"China\'s Belt and Road Initiative (BRI) has transformed South Asia from a regional space into a theatre of great power competition." Analyse the strategic implications of the BRI for India\'s security and regional influence in South Asia.',
    tags: ['China Belt and Road Initiative (BRI)', 'String of Pearls & Debt-Trap Diplomacy', 'India Strategic Encirclement', 'Neighbourhood First Policy', 'South Asian Security Dynamics']
  },

  // 2025
  {
    year: 2025,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs2-con',
    text: "Discuss the 'corrupt practices' for the purpose of the Representation of the People Act, 1951. Analyze whether the increase in the assets of the legislators and/or their associates, disproportionate to their known sources of income, would constitute 'undue influence' and consequently a corrupt practice.",
    tags: ['Representation of the People Act 1951', 'Corrupt Practices (Section 123)', 'Disproportionate Assets of Legislators', 'Electoral Transparency', 'Undue Influence in Elections']
  },
  {
    year: 2025,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs2-bod',
    text: 'Comment on the need of administrative tribunals as compared to the court system. Assess the impact of the recent tribunal reforms through rationalization of tribunals made in 2021.',
    tags: ['Administrative Tribunals (Article 323A)', 'Tribunal Reforms Act 2021', 'Judicial Independence of Tribunals', 'Specialized Adjudication', 'Decongestion of Courts']
  },
  {
    year: 2025,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs2-con',
    text: "Compare and contrast the President's power to pardon in India and in the USA. Are there any limits to it in both the countries? What are 'preemptive pardons'?",
    tags: ["President's Pardoning Power (Article 72)", 'US Presidential Pardon (Article II)', 'Judicial Review of Clemency (Epuru Sudhakar)', 'Preemptive Pardons', 'Constitutional Law Comparison']
  },
  {
    year: 2025,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs2-par',
    text: 'Discuss the nature of Jammu and Kashmir Legislative Assembly after the Jammu and Kashmir Reorganization Act, 2019. Briefly describe the powers and functions of the Assembly of the Union Territory of Jammu and Kashmir.',
    tags: ['J&K Reorganisation Act 2019', 'Legislative Assembly of UT of J&K', 'Puducherry Model Governance', 'Lieutenant Governor Powers', 'Delimitation of Constituencies']
  },
  {
    year: 2025,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs2-bod',
    text: '"The Attorney General of India plays a crucial role in guiding the legal framework of the Union Government and ensuring sound governance through legal counsel." Discuss his responsibilities, rights and limitations in this regard.',
    tags: ['Attorney General of India (Article 76)', 'Highest Law Officer of the Land', 'Right of Audience in All Courts', 'Parliamentary Participation without Vote', 'Limitations on Private Practice']
  },
  {
    year: 2025,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs2-soc',
    text: "Women's social capital complements in advancing empowerment and gender equity. Explain.",
    tags: ['Women Social Capital', 'Self Help Groups (SHGs)', 'Kudumbashree & NRLM Models', 'Gender Equality & Collective Agency', 'Microfinance & Leadership']
  },
  {
    year: 2025,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs2-gov',
    text: 'e-governance projects have a built-in bias towards technology and back-end integration than user-centric designs. Examine.',
    tags: ['E-Governance Implementation', 'Digital Exclusion & Tech Bias', 'User-Centric Service Delivery', 'Accessibility in Public Services', 'Digital India Usability']
  },
  {
    year: 2025,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs2-gov',
    text: 'Civil Society Organizations are often perceived as being anti-State actors than non-State actors. Do you agree? Justify.',
    tags: ['Civil Society Organizations (CSOs)', 'FCRA Regulation & Scrutiny', 'NGOs as Development Partners', 'Rights Advocacy vs State Security', 'Participatory Democracy']
  },
  {
    year: 2025,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs2-ir',
    text: 'India-Africa digital partnership is achieving mutual respect, co-development and long-term institutional partnerships. Elaborate.',
    tags: ['India-Africa Digital Partnership', 'Pan-African e-Network', 'UPI & Digital Public Infrastructure (DPI)', 'South-South Cooperation', 'African Union Collaboration']
  },
  {
    year: 2025,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs2-ir',
    text: '"With the waning of globalization, post-Cold War world is becoming a site of sovereign nationalism." Elucidate.',
    tags: ['Deglobalization Trends', 'Resurgent Sovereign Nationalism', 'Weaponized Interdependence', 'Protectionism & Reshoring', 'Fragmentation of International Order']
  },
  {
    year: 2025,
    questionNumber: 11,
    marks: 15,
    subjectId: 'gs2-con',
    text: '"Constitutional morality is the fulcrum which acts as an essential check upon the high functionaries and citizens alike. ..." In view of the above observation of the Supreme Court, explain the concept of constitutional morality and its application to ensure balance between judicial independence and judicial accountability in India.',
    tags: ['Constitutional Morality (Dr. Ambedkar)', 'Judicial Independence vs Accountability', 'Checks on High Functionaries', 'Basic Structure Safeguard', 'Supreme Court Doctrines']
  },
  {
    year: 2025,
    questionNumber: 12,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'Indian Constitution has conferred the amending power on the ordinary legislative institutions with a few procedural hurdles. In view of this statement, examine the procedural and substantive limitations on the amending power of the Parliament to change the Constitution.',
    tags: ['Amending Power of Parliament (Article 368)', 'Basic Structure Doctrine (Kesavananda)', 'Substantive Limitations on Amendment', 'Judicial Review of Amendments', 'Federal Ratification Requirements']
  },
  {
    year: 2025,
    questionNumber: 13,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'Discuss the evolution of collegium system in India. Critically examine the advantages and disadvantages of the system of appointment of the Judges of the Supreme Court of India and that of the USA.',
    tags: ['Collegium System Evolution', 'Three Judges Cases', 'Judicial Appointments in USA vs India', 'NJAC Judgment & Memorandum of Procedure', 'Judicial Transparency']
  },
  {
    year: 2025,
    questionNumber: 14,
    marks: 15,
    subjectId: 'gs2-con',
    text: 'Examine the evolving pattern of Centre-State financial relations in the context of planned development in India. How far have the recent reforms impacted the fiscal federalism in India?',
    tags: ['Centre-State Financial Relations', 'Fiscal Federalism & Finance Commission', 'GST Council Co-operative Dynamics', 'Cess and Surcharges Debate', 'Centrally Sponsored Schemes (CSS)']
  },
  {
    year: 2025,
    questionNumber: 15,
    marks: 15,
    subjectId: 'gs2-gov',
    text: 'What are environmental pressure groups? Discuss their role in raising awareness, influencing policies and advocating for environmental protection in India.',
    tags: ['Environmental Pressure Groups', 'Chipko & Narmada Bachao Andolan', 'Environmental Impact Assessment (EIA)', 'Climate Activism & Policy Advocacy', 'National Green Tribunal (NGT) Petitions']
  },
  {
    year: 2025,
    questionNumber: 16,
    marks: 15,
    subjectId: 'gs2-soc',
    text: "Inequality in the ownership pattern of resources is one of the major causes of poverty. Discuss in the context of 'paradox of poverty'.",
    tags: ['Resource Ownership Inequality', 'Paradox of Poverty (Poverty Amidst Plenty)', 'Land Reforms and Wealth Concentration', 'Inclusive Growth Barriers', 'Multidimensional Poverty']
  },
  {
    year: 2025,
    questionNumber: 17,
    marks: 15,
    subjectId: 'gs2-gov',
    text: '"In contemporary development models, decision-making and problem-solving responsibilities are not located close to the source of information and execution defeating the objectives of development." Critically evaluate.',
    tags: ['Decentralized Planning', 'Principle of Subsidiarity', 'Top-Down vs Bottom-Up Governance', 'Local Self Government Empowerment', 'Administrative Bureaucracy Gaps']
  },
  {
    year: 2025,
    questionNumber: 18,
    marks: 15,
    subjectId: 'gs2-bod',
    text: 'The National Commission for Protection of Child Rights has to address the challenges faced by children in the digital era. Examine the existing policies and suggest measures the Commission can initiate to tackle the issue.',
    tags: ['NCPCR (Child Rights Protection)', 'Child Safety in Digital Age', 'POCSO and Online Child Abuse', 'Screen Addiction & Cyberbullying', 'DPDP Act Child Data Protections']
  },
  {
    year: 2025,
    questionNumber: 19,
    marks: 15,
    subjectId: 'gs2-ir',
    text: '"Energy security constitutes the dominant kingpin of India\'s foreign policy, and is linked with India\'s overarching influence in Middle Eastern countries." How would you integrate energy security with India\'s foreign policy trajectories in the coming years?',
    tags: ['India Energy Security Diplomacy', 'India-Middle East Foreign Policy (West Asia)', 'Strategic Petroleum Reserves (SPR)', 'I2U2 and IMEC Corridors', 'Crude Oil Import Diversification']
  },
  {
    year: 2025,
    questionNumber: 20,
    marks: 15,
    subjectId: 'gs2-ir',
    text: '"The reform process in the United Nations remains unresolved, because of the delicate imbalance of East and West and entanglement of the USA vs. Russo-Chinese alliance." Examine and critically evaluate the East-West policy confrontations in this regard.',
    tags: ['UN Security Council Reforms', 'G4 Nations Bid for Permanent Seat', 'Veto Power Deadlock', 'US vs Russia-China Polarization', 'Multilateralism Crisis']
  }
];

fs.writeFileSync(
  path.join(__dirname, 'data/gs2_new.json'),
  JSON.stringify(gs2New, null, 2),
  'utf8'
);
console.log('Saved gs2_new.json');
