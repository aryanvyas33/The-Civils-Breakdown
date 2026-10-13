const fs = require('fs');
const path = require('path');

const gs4New = [
  // 2026
  {
    year: 2026,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs4-eth',
    text: '(a) Owing to paucity of time, a university professor generates a Ph.D. evaluation report using Artificial Intelligence and submits it with some modifications. Discuss this from the perspective of accountability and integrity.',
    tags: ['AI Ethics in Academia', 'Professional Integrity', 'Academic Accountability', 'Intellectual Plagiarism', 'Ethics of Automation']
  },
  {
    year: 2026,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs4-eth',
    text: '(b) A business house is working on a project that could displace a forest community from their habitat. As the administrative officer of that district, what ethical challenges are you likely to face?',
    tags: ['Development Induced Displacement', 'Tribal Rights vs Industrial Growth', 'Administrative Ethics', 'Free Prior Informed Consent', 'Distributive Justice']
  },
  {
    year: 2026,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs4-eth',
    text: '(a) An endangered tribe has developed a severe skeletal deformity. A university research has identified a mineral supplement as a possible remedy, though clinical trials are yet to be conducted. Should the District Magistrate (DM) use this research on the tribe? Discuss from the perspective of medical and administrative ethics.',
    tags: ['Medical Ethics & Clinical Trials', 'Vulnerable Tribal Groups (PVTGs)', 'Beneficence vs Non-Maleficence', 'Informed Consent Dilemma', 'Administrative Responsibility']
  },
  {
    year: 2026,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs4-eth',
    text: '(b) Discuss how national security can be balanced with concerns of human rights.',
    tags: ['National Security vs Human Rights', 'Proportionality Principle', 'Civil Liberties Safeguards', 'State Sovereign Authority', 'Constitutional Balance']
  },
  {
    year: 2026,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs4-phi',
    text: "(a) Dr. B. R. Ambedkar had cautioned that employing civil disobedience within a constitutional democracy equates to endorsing 'anarchy'. How should modern democracies navigate the ethical dilemmas posed by civil disobedience movements that aim to promote social justice against policies that may raise genuine concerns?",
    tags: ['Ambedkar on Constitutional Morality', 'Grammar of Anarchy', 'Civil Disobedience in Democracy', 'Right to Protest Ethos', 'Democratic Dissent']
  },
  {
    year: 2026,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs4-phi',
    text: "(b) In what ways can an Indian Administrative Officer apply Gandhi's notion of 'trusteeship' to ensure fairness in governance?",
    tags: ["Gandhian Trusteeship in Governance", 'Custodians of Public Wealth', 'Ethical Public Administration', 'Serving the Weakest (Antyodaya)', 'Moral Stewardship']
  },
  {
    year: 2026,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '(c) Shakespeare in Henry IV says, "The arms are fair when the intent of bearing them is just". What ethical implications does this have in governance?',
    tags: ['Just War Theory (Jus ad Bellum)', 'Moral Intent in State Action', 'Ethical Use of Coercive Power', 'Means and Ends Alignment', 'Philosophy of Power']
  },
  {
    year: 2026,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs4-eth',
    text: "Citing the serious adverse effects of long-term medication, a doctor convinces the family of a female patient for surgery. This led the patient to reluctantly consent for the surgery, though her original choice was to opt for medication. Explain the concepts of paternalism and beneficence by analysing the doctor's action.",
    tags: ['Medical Paternalism', 'Principle of Beneficence', 'Patient Autonomy and Consent', 'Doctor-Patient Relationship', 'Bioethics Dilemmas']
  },
  {
    year: 2026,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs4-pro',
    text: 'Efficiency is doing things right, while effectiveness is doing the right thing. How do you strike a balance between the two to enhance productivity?',
    tags: ['Efficiency vs Effectiveness (Drucker)', 'Value-Driven Productivity', 'Administrative Probity', 'Procedural vs Substantive Goals', 'Public Sector Excellence']
  },
  {
    year: 2026,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs4-pro',
    text: 'Usually schools, working in remote areas, do not fully comply with government regulations. However, if the rules are enforced strictly, it would lead to most schools closing down. How should an administrator strike a balance between enforcement of rules and educational rights of children?',
    tags: ['Letter vs Spirit of the Law', 'Educational Rights (RTE)', 'Compassionate Pragmatism', 'Administrative Discretion', 'Rural Education Infrastructure']
  },
  {
    year: 2026,
    questionNumber: 11,
    marks: 10,
    subjectId: 'gs4-eth',
    text: 'In international relations, ethical considerations are often subjugated to the strategic interests of nation-states. Discuss this from an ethical perspective.',
    tags: ['Realism vs Idealism in Foreign Policy', 'Ethics in International Relations', 'National Strategic Interest', 'Global Humanitarian Norms', 'Machiavellian Statecraft Critique']
  },
  {
    year: 2026,
    questionNumber: 12,
    marks: 10,
    subjectId: 'gs4-ei',
    text: 'On the request of his Personal Assistant (PA), the District Magistrate (DM) stops the transfer of a schoolteacher who takes private tuition for his daughter diagnosed with learning disability. In this context, discuss the aspects of empathy versus compliance with rules.',
    tags: ['Empathy vs Rule of Law', 'Emotional Intelligence in Bureaucracy', 'Conflict of Interest & Favoritism', 'Public Service Impartiality', 'Special Needs Compassion']
  },
  {
    year: 2026,
    questionNumber: 13,
    marks: 10,
    subjectId: 'gs4-phi',
    text: 'Some moral philosophers argue that spending some of your resources—without significantly affecting your financial stability—to help other people who badly suffer is our moral duty and not merely a matter of charity. Justify this claim by explaining the distinction between duty and charity.',
    tags: ['Duty vs Charity (Peter Singer)', 'Effective Altruism', 'Moral Obligation of Affluence', 'Distributive Justice', 'Deontological Ethics']
  },
  {
    year: 2026,
    questionNumber: 14,
    marks: 20,
    subjectId: 'gs4-case',
    text: "Lata, a mother of two children, was admitted to a hospital for acute abdominal pain. Her sister-in-law, Sujatha, accompanied her. Dr. Mansi recommended a diagnostic laparoscopy under general anesthesia. During the procedure, Dr. Mansi discovered a suspected malignant tumor in Lata's uterus. Sujatha consented in writing for immediate hysterectomy to avoid a second surgery. Lata was informed next day, felt betrayed and approached police and court. (a) Discuss the ethical issues involved in this case. (b) Discuss the moral conduct of the doctor in this situation.",
    tags: ['Case Study on Medical Consent', 'Informed Consent vs Proxy Consent', 'Emergency Medical Exception', 'Professional Duty of Care', 'Doctor-Patient Trust Breach']
  },
  {
    year: 2026,
    questionNumber: 15,
    marks: 20,
    subjectId: 'gs4-case',
    text: "Ravi is SP of a riot-prone district. He installed an AI-enabled predictive policing system using crowd biometric data that successfully brought down crime in an immigrant neighborhood. Community leaders and civil rights lawyers submitted a memorandum alleging algorithmic bias, discriminatory historical data, and climate of fear. (a) What are the ethical issues including biases involved in AI policing? (b) Place yourself in Ravi's role and discuss alternatives justifying the action that optimizes ethics.",
    tags: ['Case Study on AI Predictive Policing', 'Algorithmic Bias and Civil Liberties', 'Data Privacy vs Crime Prevention', 'Targeted Surveillance of Minorities', 'Accountable Law Enforcement']
  },
  {
    year: 2026,
    questionNumber: 16,
    marks: 20,
    subjectId: 'gs4-case',
    text: "Seema is District Collector of Surinder Nagar where an industrial area is expanding. A huge backlog of Change of Land Use (CLU) applications has piled up because a touts-official nexus demands bribes for selective approvals, intimidating honest subordinates. Seema must dismantle this corruption without disrupting daily operations or facing labour union backlash. (a) What are the ethical issues? (b) Discuss options and justify recommended strategy.",
    tags: ['Case Study on Administrative Corruption', 'Combating Extortion & Bribery Networks', 'Whistleblower Protection in Office', 'E-Governance for Citizen Grievance', 'Administrative Leadership Integrity']
  },
  {
    year: 2026,
    questionNumber: 17,
    marks: 20,
    subjectId: 'gs4-case',
    text: "Vikas is DC in a remote hilly district where biometric authentication in PDS frequently fails for children, manual labourers, and the elderly due to low connectivity. Distributors using personal discretion risk leakages, while strict rules violate poor beneficiaries' right to life under Article 21. (a) What options are open to Vikas balancing fiscal probity with empathy? (b) Discuss ethics of technology as a welfare gatekeeper.",
    tags: ['Case Study on PDS Biometric Failure', 'Technology as Welfare Gatekeeper', 'Right to Food (Article 21)', 'Fiscal Probity vs Compassion', 'Exclusion Errors in DBT']
  },
  {
    year: 2026,
    questionNumber: 18,
    marks: 20,
    subjectId: 'gs4-case',
    text: "Rajapuram is a border district torn by ethnic violence between Jhara and Biru communities. The rivalry has seeped into local administration and police, eroding state neutrality while neighboring country exploits insurgent unrest. DM Rajan must reopen highways and initiate peace talks. (a) Discuss ethical issues. (b) Discuss options to protect non-partisan image without compromising ethics.",
    tags: ['Case Study on Communal Violence', 'Bureaucratic Impartiality Under Pressure', 'Conflict Resolution & Peace Building', 'Border Insecurity & Insurgency', 'Restoring State Credibility']
  },
  {
    year: 2026,
    questionNumber: 19,
    marks: 20,
    subjectId: 'gs4-case',
    text: "Ajit is Head of Department of Weapon Sales. Country A (stable developing nation with R&D cooperation, needs long-term loan for self-defense) and Country B (authoritarian, nuclear-armed, cuts welfare for arms, offers cash advance, in economic bloc negotiations) both want to buy domestically produced missiles. Production capacity allows only one order. (a) Discuss options and justify recommendation. (b) Balance economic/strategic interests with ethics.",
    tags: ['Case Study on Arms Export Ethics', 'Strategic Partnership vs Financial Gain', 'Human Rights Record in Defense Sales', 'National Economic Interest', 'Responsible Defense Trade']
  },

  // 2025
  {
    year: 2025,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs4-eth',
    text: 'In the present digital age, social media has revolutionised our way of communication and interaction. However, it has raised several ethical issues and challenges. Describe the key ethical dilemmas in this regard.',
    tags: ['Social Media Ethics', 'Digital Surveillance & Echo Chambers', 'Online Disinformation', 'Privacy Degradation', 'Mental Health & Cyberbullying']
  },
  {
    year: 2025,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs4-pro',
    text: '"Constitutional morality is not a natural sentiment but a product of civil education and adherence of the rule of law." Examine the significance of constitutional morality for public servant highlighting the role in promoting good governance and ensuring accountability in public administration.',
    tags: ['Constitutional Morality for Bureaucrats', 'Rule of Law in Governance', 'Civil Service Values', 'Democratic Accountability', 'Ethical Public Administration']
  },
  {
    year: 2025,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs4-phi',
    text: 'Carl von Clausewitz once said, "War is a diplomacy by other means." Critically analyse the above statement in the present context of contemporary geo-political conflict.',
    tags: ['Clausewitz Philosophy of War', 'Diplomacy and Armed Conflict', 'Ethics of Warfare', 'Contemporary Geopolitical Conflicts', 'Humanitarian Law (Geneva Conventions)']
  },
  {
    year: 2025,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs4-eth',
    text: 'Keeping the national security in mind, examine the ethical dilemmas related to controversies over environmental clearance of development projects in ecologically sensitive border areas in the country.',
    tags: ['National Security vs Ecological Protection', 'Border Road Infrastructure', 'Ecologically Fragile Borderlands', 'Intergenerational Equity', 'Environmental Clearance Ethics']
  },
  {
    year: 2025,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"Those who in trouble untroubled are, Will trouble trouble itself." - Thiruvalluvar',
    tags: ['Thirukkural Moral Philosophy', 'Equanimity in Crisis', 'Emotional Resilience', 'Courage Under Adversity', 'Ancient Indian Wisdom']
  },
  {
    year: 2025,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs4-att',
    text: '"The greatest discovery of my generation is that a human being can alter his life by altering his attitudes." - William James',
    tags: ['Attitude Transformation (William James)', 'Psychological Agency', 'Cognitive Reframing', 'Self-Efficacy in Public Life', 'Moral Growth']
  },
  {
    year: 2025,
    questionNumber: 7,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"The strength of a society is not in its laws, but in the morality of its people." - Swami Vivekananda',
    tags: ['Swami Vivekananda Teachings', 'Societal Moral Strength', 'Internalized Ethics vs External Law', 'Character Building', 'Spiritual Humanism']
  },
  {
    year: 2025,
    questionNumber: 8,
    marks: 10,
    subjectId: 'gs4-pro',
    text: '"For any kind of social re-engineering by successfully implementing welfare schemes, a civil servant must use reason and critical thinking in an ethical framework." Justify this statement with suitable examples.',
    tags: ['Critical Thinking in Administration', 'Reason and Ethical Decision Making', 'Social Re-Engineering Through Welfare', 'Evidence-Based Policymaking', 'Compassionate Governance']
  },
  {
    year: 2025,
    questionNumber: 9,
    marks: 10,
    subjectId: 'gs4-phi',
    text: 'What are the major teachings of Mahavir? Explain their relevance in the contemporary world.',
    tags: ['Lord Mahavira Teachings', 'Ahimsa (Non-Violence)', 'Anekantavada (Many-Sided Reality)', 'Aparigraha (Non-Possessiveness)', 'Jain Ethical Relevance']
  },
  {
    year: 2025,
    questionNumber: 10,
    marks: 10,
    subjectId: 'gs4-eth',
    text: '"One who is devoted to one\'s duty attains highest perfection in life." Analyse this statement with reference to sense of responsibility and personal fulfilment as a civil servant.',
    tags: ['Nishkama Karma (Gita Philosophy)', 'Duty Bound Administration (Dharma)', 'Sense of Responsibility', 'Personal Fulfilment in Public Service', 'Professional Vocation']
  },
  {
    year: 2025,
    questionNumber: 11,
    marks: 10,
    subjectId: 'gs4-pro',
    text: 'To achieve holistic development goal, a civil servant acts as an enabler and active facilitator of growth rather than a regulator. What specific measures will you suggest to achieve this goal?',
    tags: ['Civil Servant as Facilitator', 'Mission Karmayogi Ethos', 'Citizen-Centric Administration', 'Ease of Living Facilitation', 'Regulatory Overreach Mitigation']
  },
  {
    year: 2025,
    questionNumber: 12,
    marks: 10,
    subjectId: 'gs4-pro',
    text: 'It is said that for an ethical work culture, there must be code of ethics in place in every organisation. To ensure value-based and compliance-based work culture, what suitable measures would you adopt in your work place?',
    tags: ['Code of Ethics vs Code of Conduct', 'Value-Based Organisational Culture', 'Whistleblower Mechanisms', 'Workplace Integrity & Inclusivity', 'Ethical Leadership in Bureaucracy']
  },
  {
    year: 2025,
    questionNumber: 13,
    marks: 10,
    subjectId: 'gs4-pro',
    text: 'India is an emerging economic power of the world as it has recently secured the status of fourth largest economy of the world as per IMF projection. However, it has been observed that in some sectors, allocated funds remain either under-utilised or misutilised. What specific measures would you recommend for ensuring accountability in this regard to stop leakages and gaining the status of third largest economy of the world in near future?',
    tags: ['Public Financial Accountability', 'Under-Utilisation of Budgetary Funds', 'PFMS and Real-Time Tracking', 'Stopping Financial Leakages', 'Fiscal Efficiency in Development']
  },
  {
    year: 2025,
    questionNumber: 14,
    marks: 20,
    subjectId: 'gs4-case',
    text: "Vijay was Deputy Commissioner of a remote district in Hilly Northern State. Heavy cloudbursts caused flash floods, destroying bridges and cutting off villages. A major contractor, close to the local MLA, was awarded emergency relief work without tendering. Sub-standard food supplies and faulty temporary shelters caused public outrage, and relief funds were suspected of being siphoned off. (a) What are the options available with Vijay? (b) What are the ethical dilemmas faced by Vijay? (c) Critically evaluate each option. (d) Which option is most appropriate and why?",
    tags: ['Case Study on Disaster Relief Embezzlement', 'Emergency Procurement vs Probity', 'Political Nexus & Contractor Intimidation', 'Accountability to Vulnerable Citizens', 'Administrative Courage']
  },
  {
    year: 2025,
    questionNumber: 15,
    marks: 20,
    subjectId: 'gs4-case',
    text: "Subash is Secretary, PWD in the State Government. A major river bridge project under construction by a well-connected infrastructure firm developed structural cracks during inspection. The Chief Minister's office wants the bridge inaugurated before upcoming elections, pressuring Subash to issue a conditional fitness certificate based on an expedited internal review rather than a rigorous independent safety audit. (a) Discuss the ethical issues involved. (b) Critically examine options available to Subash. (c) Which would be most appropriate and why?",
    tags: ['Case Study on Infrastructure Safety', 'Public Safety vs Political Expediency', 'Integrity under Executive Pressure', 'Independent Technical Audit', 'Bureaucratic Backbone']
  },
  {
    year: 2025,
    questionNumber: 16,
    marks: 20,
    subjectId: 'gs4-case',
    text: "Ashok is Commandant of Border Guarding Police. A tense confrontation occurs at a border checkpoint when a group of off-duty military soldiers in uniform attempt to cross without mandatory civil contraband checks, leading to a violent scuffle and detention of army personnel. Army local commanders demand their unconditional release, threatening inter-force clash. (a) What options are available to Ashok? (b) What ethical and legal dilemmas are faced? (c) Which option is most appropriate and why? (d) What precautionary measures should be taken?",
    tags: ['Case Study on Inter-Agency Conflict', 'Armed Forces Discipline and Civil Law', 'Rule of Law at Sensitive Borders', 'De-escalation of Inter-Force Tension', 'Institutional Protocol Integrity']
  }
];

fs.writeFileSync(
  path.join(__dirname, 'data/gs4_new.json'),
  JSON.stringify(gs4New, null, 2),
  'utf8'
);
console.log('Saved gs4_new.json');
