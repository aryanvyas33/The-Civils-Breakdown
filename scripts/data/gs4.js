// UPSC CSE Mains GS Paper 4 Questions (2013 - 2024)
// Total 144 questions: 12 questions per year (Q1-Q6: 10 marks, Q7-Q12: 20 marks case studies)

const gs4Questions = [
  // ====================================================
  // 2024 (12 questions)
  // ====================================================
  {
    year: 2024,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs4-eth',
    text: 'Ethics encompasses several key dimensions crucial in guiding individuals and organizations towards morally responsible behaviour. Explain the key dimensions of ethics and their significance in public life.',
    tags: ['Dimensions of Ethics', 'Public Morality', 'Ethical Guidance', 'Moral Responsibility', 'Applied Ethics']
  },
  {
    year: 2024,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs4-ei',
    text: 'The application of Artificial Intelligence as a dependable source of input for administrative rational decision-making is a debatable issue. Critically examine the statement from an ethical and emotional intelligence point of view.',
    tags: ['AI in Governance', 'Administrative Decision Making', 'Algorithmic Bias', 'Emotional Intelligence', 'Ethical Dilemmas in Tech']
  },
  {
    year: 2024,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"Learn everything good from others, but bring it in and in your own way absorb it. Do not become others." – Swami Vivekananda. Analyze the relevance of this quote in cultivating cultural tolerance and personal integrity.',
    tags: ['Swami Vivekananda Quote', 'Assimilation vs Imitation', 'Personal Integrity', 'Cultural Self-Confidence', 'Moral Philosophy']
  },
  {
    year: 2024,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"In law, a man is guilty when he violates the rights of others. In ethics, he is guilty if he only thinks of doing so." – Immanuel Kant. Explain how Kantian deontological ethics demands purity of inner intention.',
    tags: ['Immanuel Kant', 'Deontological Ethics', 'Categorical Imperative', 'Purity of Intention', 'Law vs Ethics']
  },
  {
    year: 2024,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs4-att',
    text: '"Faith is of no avail in the absence of strength. Faith and strength are essential to accomplish any great work." – Sardar Patel. Discuss how foundational civil service values require both moral conviction and administrative firmness.',
    tags: ['Sardar Patel', 'Civil Service Values', 'Moral Conviction', 'Administrative Firmness', 'Iron Will']
  },
  {
    year: 2024,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs4-pro',
    text: 'Distinguish between a "Code of Ethics" and a "Code of Conduct". Why is reliance on a mere Code of Conduct insufficient without internalizing ethical values?',
    tags: ['Code of Ethics vs Conduct', 'Probity in Governance', 'Value Internalization', 'Nolan Principles', 'Administrative Integrity']
  },
  {
    year: 2024,
    questionNumber: 7,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are a District Collector in a backward tribal district. A massive multi-crore infrastructure project of national importance has been cleared by the central government. However, the local tribal population vehemently opposes land acquisition, fearing displacement and destruction of their sacred groves. Local activists threaten violent protests, while top political and administrative superiors pressure you to execute land acquisition by deploying police force. (a) Identify the ethical dilemmas faced by you. (b) What course of action will you adopt to balance developmental imperatives with tribal rights and cultural sensitivities?',
    tags: ['Tribal Displacement Case', 'Development vs Ecology', 'Sacred Groves', 'Ethical Governance', 'Conflict Resolution']
  },
  {
    year: 2024,
    questionNumber: 8,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are heading the public health department in a municipal corporation during an outbreak of a mysterious infectious respiratory illness. Early epidemiological data suggests high virulence. If you impose an immediate strict lockdown and quarantine, thousands of daily-wage labourers and street vendors face immediate starvation and ruin. If you delay, the infection could overwhelm hospital intensive care capacities. Powerful business lobbies lobby against any commercial restrictions. (a) Evaluate the ethical principles governing your crisis decision-making. (b) Outline your plan of action to mitigate human suffering while containing the epidemic.',
    tags: ['Epidemic Crisis Case', 'Public Health vs Livelihoods', 'Utilitarian Calculation', 'Vulnerable Labour', 'Crisis Leadership']
  },
  {
    year: 2024,
    questionNumber: 9,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: An honest and upright junior engineer in a municipal engineering wing discovers that substandard cement and compromised structural designs were used in a newly constructed flyover, approved by his predecessor and contracted to an influential political leader\'s family firm. The contractor threatens the engineer with severe personal and career consequences if he blows the whistle. The senior municipal commissioner advises him to ignore the issue to preserve departmental peace. (a) What are the options available to the engineer? (b) Evaluate each option and recommend the most ethical and legally sound course of action.',
    tags: ['Whistleblowing Dilemma', 'Substandard Infrastructure', 'Political Intimidation', 'Public Safety vs Career', 'Professional Integrity']
  },
  {
    year: 2024,
    questionNumber: 10,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the superintendent of police in a communally sensitive border district. A minor communal clash erupts following provocative social media posts by members of two different communities. Influential politicians from the ruling party demand the arrest of only one community\'s youths and press you to turn a blind eye to inflammatory counter-rallies. Your own subordinate officers display subtle communal bias in their policing response. (a) Identify the core ethical challenges confronting you as the police chief. (b) What decisive steps will you take to restore peace, ensure non-partisan justice, and re-instill professionalism among your force?',
    tags: ['Communal Riots Case', 'Police Neutrality', 'Political Pressure on Police', 'Rule of Law', 'Subordinate Bias']
  },
  {
    year: 2024,
    questionNumber: 11,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the director of a state regulatory agency reviewing environmental clearances for a proposed chemical manufacturing plant in an economically depressed region. The plant promises thousands of direct jobs and huge tax revenue. However, confidential technical findings show that the plant will emit trace toxic effluents into an aquifer that feeds drinking water to twenty rural villages. The state industry minister urges you to grant conditional approval and relax effluent standards. (a) What are the ethical issues involved in prioritizing economic growth over public health? (b) As the regulatory head, what decision will you take and why?',
    tags: ['Environmental Clearance Dilemma', 'Aquifer Contamination', 'Job Creation vs Public Health', 'Regulatory Independence', 'Precautionary Principle']
  },
  {
    year: 2024,
    questionNumber: 12,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the CEO of a major public sector hospital. A critically injured poor road accident victim is brought to the emergency ward requiring immediate life-saving surgery. Hospital guidelines require advance deposit of fee or verified health card credentials, which the victim\'s accompanying daily-wager brother cannot produce. The on-duty resident doctor refuses to begin surgery without administrative sign-off due to strict audit objections in the past. (a) What ethical values should guide hospital administration in life-or-death scenarios? (b) How would you resolve the immediate crisis and what institutional protocol reforms will you institutionalize?',
    tags: ['Hospital Ethics Case', 'Right to Health & Life', 'Bureaucratic Inflexibility', 'Compassion in Administration', 'Audit vs Humanity']
  },

  // ====================================================
  // 2023 (12 questions)
  // ====================================================
  {
    year: 2023,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs4-eth',
    text: 'What do you understand by "moral integrity" and "professional competence" in civil services? Can one compensate for the lack of the other in public administration?',
    tags: ['Moral Integrity', 'Professional Competence', 'Civil Service Values', 'Foundational Values', 'Public Administration']
  },
  {
    year: 2023,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs4-att',
    text: 'Explain how political attitude is shaped in individuals. How does a partisan political attitude in a civil servant undermine administrative objectivity?',
    tags: ['Political Attitude', 'Administrative Objectivity', 'Civil Service Neutrality', 'Non-Partisanship', 'Democratic Governance']
  },
  {
    year: 2023,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs4-ei',
    text: '"Emotional Intelligence is the ability to monitor one\'s own and other people\'s emotions, to discriminate between different emotions, and to use emotional information to guide thinking and behavior." Elucidate its role in conflict resolution.',
    tags: ['Emotional Intelligence', 'Conflict Resolution', 'Daniel Goleman Model', 'Empathy & Self-Regulation', 'Crisis Management']
  },
  {
    year: 2023,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"The simple path of doing good and avoiding harm is the essence of morality." Discuss this principle in the light of the Buddhist eightfold path and utilitarian philosophy.',
    tags: ['Buddhist Eightfold Path', 'Utilitarianism', 'Ahimsa & Compassion', 'Ethical Foundations', 'Moral Philosophy']
  },
  {
    year: 2023,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs4-pro',
    text: 'What are the main components of "Probity in Governance"? How does institutional transparency through social audits check administrative corruption?',
    tags: ['Probity in Governance', 'Social Audits', 'Transparency & Integrity', 'Corruption Countermeasures', 'Citizen Oversight']
  },
  {
    year: 2023,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"To see what is right and not do it is a want of courage, or of principle." – Confucius. In the context of civil services, discuss the courage of conviction.',
    tags: ['Confucius Quote', 'Courage of Conviction', 'Moral Fortitude', 'Ethical Leadership', 'Whistleblowing Duty']
  },
  {
    year: 2023,
    questionNumber: 7,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the Sub-Divisional Magistrate (SDM) in an agricultural belt experiencing acute groundwater depletion. An illegal commercial water bottling plant is operating with tacit backing from local influential politicians and criminal syndicates. When you issue a closure notice, you receive life threats and political warnings of immediate transfer to an undesirable posting. Meanwhile, farmers whose tube wells have run dry organize a road blockade. (a) Discuss the ethical and professional dilemmas in this case. (b) What steps will you take to enforce environmental laws and protect your officers?',
    tags: ['Illegal Groundwater Extraction', 'Political Threat Case', 'SDM Integrity', 'Water Mafia', 'Rule of Law Enforcement']
  },
  {
    year: 2023,
    questionNumber: 8,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the head of an elite national scientific research laboratory. A senior research fellow discovers that a major clinical research paper co-authored by you and a world-renowned scientist contains manipulated data and fabricated trial results. If the paper is retracted, the laboratory will lose international funding and your career reputation will be ruined. If the drug goes to production, patient safety is at grave risk. (a) What are the ethical issues involved? (b) Outline your plan of action to address scientific misconduct.',
    tags: ['Scientific Misconduct Case', 'Research Integrity', 'Fabricated Clinical Trials', 'Patient Safety', 'Academic Ethics']
  },
  {
    year: 2023,
    questionNumber: 9,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the managing director of a State Transport Undertaking. The bus fleet is ageing and financially bleeding. The private maintenance contractor offers low bids but is known to use re-treaded tires and poor brake spares. The drivers union warns of fatal accidents, while the state finance department refuses additional subsidies and threatens privatization if operating costs are not slashed immediately. (a) Evaluate the ethical tradeoffs between cost cutting and passenger safety. (b) What balanced course of action will you take?',
    tags: ['Public Transport Safety', 'Fiscal Deficit vs Human Lives', 'Procurement Integrity', 'Contractor Malpractice', 'Public Administration']
  },
  {
    year: 2023,
    questionNumber: 10,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are an education officer in a rural district. You discover that a group of teachers in a government school has been running an organized cheating racket during state board examinations in exchange for money from parents. Several honest students who refused to pay were intimidated and given low practical marks. The local MLA whose relative is a key accused requests you to hush up the matter. (a) Identify the stakeholders and the ethical concerns. (b) How will you handle the investigation to restore educational integrity?',
    tags: ['School Cheating Racket', 'Educational Integrity', 'Political Interference', 'Protecting Honest Students', 'Administrative Probity']
  },
  {
    year: 2023,
    questionNumber: 11,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are a probationer IAS officer serving as Assistant Collector. You notice that your Collector and immediate mentor regularly diverts disaster relief funds for beautifying administrative offices and purchasing luxury vehicles. When you politely seek clarification, the Collector suggests that "flexibility in budgeting is necessary for administrative efficiency" and reminds you that your appraisal report is under his pen. (a) Discuss the ethical dilemma of a subordinate against a superior. (b) What steps will you take while upholding administrative propriety?',
    tags: ['Probationer Dilemma', 'Misappropriation of Relief Funds', 'Subordinate vs Superior', 'Appraisal Threat', 'Whistleblower Ethics']
  },
  {
    year: 2023,
    questionNumber: 12,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: In a drought-prone district, an international NGO has introduced a micro-dam construction program that employs hundreds of destitute rural households. However, you discover that the NGO is secretly indulging in religious conversion by exploiting the poverty and despair of the villagers. Local community elders demand the expulsion of the NGO, which would halt the water project and employment. (a) Analyze the conflict between material welfare and freedom of conscience. (b) As the district administrator, how will you resolve this issue?',
    tags: ['NGO Misconduct Case', 'Religious Conversion vs Welfare', 'Drought Relief Project', 'Freedom of Conscience', 'District Administration']
  },

  // ====================================================
  // 2022 (12 questions)
  // ====================================================
  {
    year: 2022,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs4-eth',
    text: 'Ethics is knowing the difference between what you have the right to do and what is right to do. Discuss this in the context of civil servants exercising discretionary executive powers.',
    tags: ['Discretionary Powers', 'Right to Do vs What is Right', 'Administrative Ethics', 'Potter Stewart Quote', 'Rule of Law']
  },
  {
    year: 2022,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs4-att',
    text: 'Explain how positive attitude contributes to administrative efficiency and resilience in civil servants when dealing with public grievances and socio-economic distress.',
    tags: ['Positive Attitude', 'Administrative Resilience', 'Public Grievance Redressal', 'Empathy & Patience', 'Civil Service Aptitude']
  },
  {
    year: 2022,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs4-ei',
    text: 'What are the main components of emotional intelligence according to Daniel Goleman? How can civil servants apply emotional intelligence to defuse mob anger during communal or agrarian protests?',
    tags: ['Daniel Goleman Model', 'Defusing Mob Anger', 'Crowd Psychology', 'Empathy & Communication', 'Emotional Intelligence']
  },
  {
    year: 2022,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"An unexamined life is not worth living." – Socrates. Discuss how self-reflection and introspection help public officials adhere to highest ethical standards in public service.',
    tags: ['Socrates Quote', 'Introspection & Self-Reflection', 'Ethical Standards', 'Moral Conscience', 'Virtue Ethics']
  },
  {
    year: 2022,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs4-pro',
    text: 'What do you understand by "Conflict of Interest"? How can public officials prevent personal interest from compromising official decision-making? Give examples.',
    tags: ['Conflict of Interest', 'Pecuniary & Non-Pecuniary Bias', 'Recusal Principle', 'Code of Conduct', 'Probity in Public Life']
  },
  {
    year: 2022,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"We must become the change we want to see in the world." – Mahatma Gandhi. Evaluate the role of personal moral exemplary behaviour in inspiring subordinates in an organization.',
    tags: ['Mahatma Gandhi Quote', 'Exemplary Leadership', 'Leading by Example', 'Organizational Culture', 'Moral Authority']
  },
  {
    year: 2022,
    questionNumber: 7,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the municipal commissioner of a crowded historic city. A sudden major fire in a commercial high-rise leaves twenty dead. Investigation reveals that the building violated fire safety regulations and lacked emergency exits. It was granted fire safety certificates by corrupt junior inspectors under political pressure. Prominent traders associations threaten citywide strikes if you seal similar non-compliant commercial complexes, claiming thousands will lose livelihood. (a) What are the ethical issues at stake? (b) What steps will you take to enforce life safety without completely destroying local trade?',
    tags: ['Commercial Fire Tragedy', 'Urban Safety vs Livelihood', 'Building Bye-Law Corruption', 'Enforcement of Fire Norms', 'Municipal Administration']
  },
  {
    year: 2022,
    questionNumber: 8,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the chief vigilance officer in a public sector bank. You discover that a high-profile corporate borrower was granted unsecured credit worth hundreds of crores based on inflated collateral valuations endorsed by your bank\'s top management. If you escalate the findings to the CBI, the bank\'s stock will crash and public trust in the banking system will be severely dented. If you remain silent, the massive bad debt will eventually be written off at public taxpayer cost. (a) Identify the moral dilemmas. (b) What course of action will you take?',
    tags: ['Bank NPA Fraud Case', 'Chief Vigilance Officer', 'Whistleblowing to CBI', 'Public Trust vs Bank Solvency', 'Financial Integrity']
  },
  {
    year: 2022,
    questionNumber: 9,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are a young police officer posted as Deputy Superintendent of Police (DSP). During a student protest against examination paper leaks, a fellow senior police officer orders an unprovoked and brutal lathi-charge that leaves several peaceful students grievously injured. The senior officer asks you to fabricate evidence showing students attacked first with petrol bombs to justify police brutality before human rights commissions. (a) What are your ethical duties in this situation? (b) How will you respond to the unlawful instruction?',
    tags: ['Police Brutality Case', 'Fabricating False Evidence', 'Unlawful Orders', 'Human Rights & Police Ethics', 'Integrity under Pressure']
  },
  {
    year: 2022,
    questionNumber: 10,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the project director of a national highway expansion project. The sanctioned alignment passes through an ancient, revered tribal shrine. Realigning the highway to save the shrine would cost an additional Rs 100 crore and delay the project by two years. However, proceeding with demolition will cause acute distress to the tribal community and may lead to widespread civil unrest. (a) Discuss the ethical dilemma between infrastructure efficiency and religious-cultural preservation. (b) What solutions can balance both objectives?',
    tags: ['Highway Alignment vs Sacred Shrine', 'Infrastructure vs Heritage', 'Tribal Sentiments', 'Cost Overrun vs Cultural Rights', 'Project Management Ethics']
  },
  {
    year: 2022,
    questionNumber: 11,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are an honest food safety officer. Routine testing reveals that a popular baby food brand manufactured by a multinational conglomerate contains carcinogenic heavy metal contaminants above permissible limits. The corporate entity approaches you with an astronomical bribe and warns that disclosing the results will cause global panic, destroy the state\'s investment climate, and lead to your sudden elimination. (a) Evaluate the ethical principles involved. (b) What immediate and institutional steps will you take?',
    tags: ['Baby Food Contamination', 'MNC Bribery & Threat', 'Public Health vs Investment Climate', 'Food Safety Enforcement', 'Courage of Integrity']
  },
  {
    year: 2022,
    questionNumber: 12,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the director of a state social welfare department. Audits reveal that nearly 30% of disability pension beneficiaries in a particular district are fraudulent, enabled by fake medical certificates issued by corrupt government doctors. Stopping pensions immediately without re-verification will cause severe hardship to genuine destitute beneficiaries who depend on it for survival. (a) What are the ethical challenges in rectifying welfare leakage? (b) Outline a humane and foolproof plan of action to weed out fake beneficiaries.',
    tags: ['Welfare Pension Fraud', 'Disability Verification', 'Humane Administration', 'Weeding Out Ghost Beneficiaries', 'Public Service Delivery']
  },

  // ====================================================
  // 2021 (12 questions)
  // ====================================================
  {
    year: 2021,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs4-eth',
    text: 'Identify five ethical traits on which one can plot the performance of a civil servant. Justify their inclusion in the performance evaluation framework.',
    tags: ['Ethical Traits of Civil Servants', 'Integrity, Empathy, Objectivity', 'Impartiality & Accountability', 'Performance Evaluation', 'Public Administration']
  },
  {
    year: 2021,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs4-att',
    text: 'What are the main factors responsible for the formation of attitude in an individual? How can persuasive communication be used to change public attitudes toward vaccination and sanitation?',
    tags: ['Attitude Formation', 'Persuasive Communication', 'Swachh Bharat Behavioral Change', 'Vaccine Hesitancy', 'Social Psychology']
  },
  {
    year: 2021,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs4-ei',
    text: '"Empathy towards weaker sections is not just a virtue, but a constitutional imperative for public administrators." Discuss in the context of inclusive governance.',
    tags: ['Empathy towards Weaker Sections', 'Constitutional Values', 'Compassion in Administration', 'Inclusive Governance', 'Social Justice']
  },
  {
    year: 2021,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"Every human being has a right to be treated with dignity and as an end in oneself, never merely as a means." In the light of Kant\'s categorical imperative, evaluate modern corporate labour practices.',
    tags: ['Kant Categorical Imperative', 'Human Dignity as End', 'Corporate Labour Exploitation', 'Gig Economy Ethics', 'Deontology']
  },
  {
    year: 2021,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs4-pro',
    text: 'Explain the role of citizen charters in making administration transparent and accountable. Why have most citizen charters in India remained paper tigers?',
    tags: ['Citizen Charters Deficit', 'Administrative Accountability', 'Service Delivery Standards', 'Grievance Redressal Gaps', 'Public Service Guarantees']
  },
  {
    year: 2021,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"A man is but the product of his thoughts. What he thinks, he becomes." – Mahatma Gandhi. Explain how cultivation of ethical thoughts leads to moral character.',
    tags: ['Mahatma Gandhi Quote', 'Cultivation of Thoughts', 'Moral Character Building', 'Ethical Reflection', 'Human Values']
  },
  {
    year: 2021,
    questionNumber: 7,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: During the peak of the COVID-19 pandemic, you are the chief medical officer of a district hospital facing an acute shortage of medical oxygen. You have two patients requiring the last ventilator: Patient A is an 80-year-old retired freedom fighter and respected philanthropist, and Patient B is a 28-year-old daily-wage worker with a wife and three young children. The families and local community plead passionately for each. (a) Discuss the bioethical principles applicable to ventilator triage. (b) As the medical administrator, how will you decide and what is your ethical justification?',
    tags: ['Ventilator Triage Dilemma', 'Bioethics in Pandemic', 'Utilitarian vs Deontological Triage', 'Allocation of Scarce Resources', 'Medical Ethics']
  },
  {
    year: 2021,
    questionNumber: 8,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are a District Collector. A major pharmaceutical company operating in your district has manufactured adulterated cough syrups that caused the deaths of several children. The company belongs to the sibling of an influential state cabinet minister. The minister pressures you to attribute the deaths to seasonal viral fever and delay forensic toxicology reports. Protesting parents and civil society surround your office demanding immediate arrests and factory sealing. (a) What are the ethical challenges faced by you? (b) Outline your plan of action upholding rule of law.',
    tags: ['Pharma Adulteration Case', 'Child Deaths Investigation', 'Political Pressure on Collector', 'Forensic Integrity', 'Rule of Law']
  },
  {
    year: 2021,
    questionNumber: 9,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the head of procurement in a defense research organization. A foreign defense contractor offers an advanced surveillance radar system that matches critical requirements. During private negotiations, the contractor offers your son a fully funded scholarship and guaranteed employment at their headquarters abroad. The procurement committee members urge you to finalize the contract as the system is desperately needed at the borders. (a) Identify the ethical dilemma and conflict of interest. (b) How will you handle this situation with absolute integrity?',
    tags: ['Defense Procurement Integrity', 'Conflict of Interest', 'Nepotism & Bribery Offer', 'National Security vs Probity', 'Procurement Ethics']
  },
  {
    year: 2021,
    questionNumber: 10,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the superintendent of a central prison. You discover that high-profile political prisoners and mafia dons are receiving five-star luxury amenities, mobile phones, and outside food inside their cells, facilitated by corrupt prison wardens and senior jail superintendents. When you attempt to seize the contraband, you face death threats from the inmates and warnings of fabricated departmental inquiries from corrupt colleagues. (a) Discuss the ethical collapse of the prison administration. (b) What comprehensive actions will you take to clean up the prison?',
    tags: ['Prison Corruption Case', 'VIP Amenities to Mafia', 'Jail Wardens Complicity', 'Prison Reforms', 'Administrative Courage']
  },
  {
    year: 2021,
    questionNumber: 11,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are an executive magistrate in charge of flood relief distribution. Due to logistical constraints, food and relief packets are limited. The local village sarpanch insists that relief must be distributed exclusively to upper-caste residents first, arguing that distributing to Dalit hamlets simultaneously will cause caste conflict and rioting. The Dalit community members are stranded on rooftops without food or water for three days. (a) What are the ethical and constitutional issues in this situation? (b) How will you ensure fair, non-discriminatory relief distribution while maintaining peace?',
    tags: ['Disaster Relief Caste Bias', 'Non-Discriminatory Aid', 'Dalit Rights in Disaster', 'Constitutional Morality', 'Emergency Administration']
  },
  {
    year: 2021,
    questionNumber: 12,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the HR director of a prominent IT corporation. A female software engineer files a formal complaint of sexual harassment against the company\'s chief technology officer (CTO), who is responsible for 60% of client revenues. The internal complaints committee is pressured by the board of directors to settle the matter privately with monetary compensation and hush up the inquiry to protect the company\'s upcoming IPO. The complainant insists on a formal probe. (a) Discuss the ethical responsibilities of corporate governance. (b) How will you ensure justice for the complainant under POSH Act?',
    tags: ['POSH Workplace Harassment', 'Corporate Ethics vs Revenue', 'Internal Complaints Committee', 'Protection of Complainant', 'Corporate Governance']
  },

  // ====================================================
  // 2020 (12 questions)
  // ====================================================
  {
    year: 2020,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs4-eth',
    text: 'What are the broad dimensions of ethics in human action? How do ethical dilemmas arise in public administration when laws and conscience collide?',
    tags: ['Dimensions of Ethics', 'Law vs Conscience', 'Ethical Dilemmas in Administration', 'Moral Dilemmas', 'Public Administration']
  },
  {
    year: 2020,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs4-att',
    text: 'Distinguish between "attitude" and "aptitude". Why is aptitude without appropriate ethical attitude dangerous in civil servants holding immense administrative authority?',
    tags: ['Attitude vs Aptitude', 'Civil Service Values', 'Dangerous Competence', 'Ethical Attitude', 'Public Leadership']
  },
  {
    year: 2020,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs4-ei',
    text: 'Explain the utility of Emotional Intelligence for a police officer handling violent communal clashes and delicate hostage negotiations.',
    tags: ['Emotional Intelligence in Policing', 'Hostage Negotiations', 'Communal Clash De-escalation', 'Self-Control Under Fire', 'Crisis Management']
  },
  {
    year: 2020,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"Hatred does not cease by hatred, but only by love; this is the eternal rule." – Gautama Buddha. Explain the application of this Buddhist moral teaching in resolving communal disharmony.',
    tags: ['Gautama Buddha Quote', 'Ahimsa & Compassion', 'Communal Harmony', 'Forgiveness vs Retribution', 'Moral Philosophy']
  },
  {
    year: 2020,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs4-pro',
    text: 'What are the key elements of Probity in Governance? How does the Right to Information (RTI) Act promote probity and check abuse of administrative power?',
    tags: ['Probity in Governance', 'RTI Act Role', 'Checking Abuse of Power', 'Transparency in Public Life', 'Nolan Committee Principles']
  },
  {
    year: 2020,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"There is a sufficiency in the world for man\'s need but not for man\'s greed." – Mahatma Gandhi. Discuss this quote in the context of global environmental degradation and resource depletion.',
    tags: ['Mahatma Gandhi Quote', 'Need vs Greed', 'Environmental Ethics', 'Consumerism vs Sustainability', 'Resource Conservation']
  },
  {
    year: 2020,
    questionNumber: 7,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the District Collector of an aspirational district. A migrant workers crisis unfolds during the lockdown as thousands walk back home on highways without food, water, or transport. State borders are officially sealed by higher governmental orders to prevent disease transmission. If you arrange state buses to transport them, you violate explicit state protocol and risk disciplinary action. If you turn them back, pregnant women and children face death and exhaustion. (a) What are the ethical dilemmas in adhering to strict orders vs humanitarian duty? (b) What proactive administrative steps will you take?',
    tags: ['Migrant Worker Crisis', 'Strict Protocol vs Humanitarian Duty', 'District Administration', 'Compassionate Governance', 'Crisis Ethics']
  },
  {
    year: 2020,
    questionNumber: 8,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are heading a municipal health licensing department. A prominent multi-specialty private hospital is found guilty of overcharging COVID patients exorbitant fees, hoarding essential drugs, and turning away poor emergency patients. The hospital is owned by a powerful business tycoon with deep political connections. The health minister calls you to dismiss the complaints as "minor clerical errors". (a) Identify the ethical conflicts. (b) What steps will you take to enforce medical justice and penalize malpractice?',
    tags: ['Hospital Overcharging Case', 'Medical Exploitation in Crisis', 'Political Intimidation', 'Regulatory Action', 'Public Interest']
  },
  {
    year: 2020,
    questionNumber: 9,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the chief town planner of a burgeoning metropolis. A builder consortium proposes an upscale residential township on a designated flood catchment basin. To secure clearance, they submit fraudulent environmental clearance certificates and offer you an expensive penthouse. They also imply that your career progression will be stalled if you raise red flags. (a) What are the professional and ethical challenges before you? (b) How will you proceed to protect urban ecological safety?',
    tags: ['Urban Town Planning Bribery', 'Flood Basin Encroachment', 'Bribery & Career Threats', 'Ecological Safety of Cities', 'Professional Duty']
  },
  {
    year: 2020,
    questionNumber: 10,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are an honest district sports officer. You discover that funds allocated for grassroots training of rural underprivileged athletes and procuring sports kits were embezzled by local sports association office-bearers, who are prominent political figures. Talented athletes are forced to train barefoot without nutrition. The association president threatens to terminate your contract if you proceed with an audit. (a) Discuss the ethical degradation of sports administration. (b) What action plan will you pursue?',
    tags: ['Sports Fund Embezzlement', 'Rural Athlete Deprivation', 'Political Muscle in Sports', 'Whistleblowing Audit', 'Integrity in Sports']
  },
  {
    year: 2020,
    questionNumber: 11,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the superintendent of police in an area with deep-rooted caste tensions. A Dalit groom riding a horse in his wedding procession is assaulted and his house set on fire by dominant caste villagers who claim this violates their village traditions. Dominant community elders pressure local police to file a compromise agreement without FIR, warning of caste riots if any arrests are made. (a) Discuss the conflict between traditional customary claims and constitutional rights. (b) How will you enforce the law and ensure dignity for the victim?',
    tags: ['Dalit Wedding Assault', 'Customary Oppression vs Rights', 'SC/ST Prevention of Atrocities', 'Police Duty', 'Constitutional Morality']
  },
  {
    year: 2020,
    questionNumber: 12,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the director of a state public procurement agency. Bids are invited for procuring life-saving medical equipment for rural PHCs. The lowest bidder (L1) has a history of supply delays and dubious quality, whereas the second lowest bidder (L2) offers certified, superior equipment but at a 10% higher price. Financial rules mandate awarding the tender to L1 unless severe irregularities are proven. (a) Analyze the conflict between rigid adherence to tender rules and the moral imperative of patient care. (b) How would you navigate this procurement dilemma?',
    tags: ['Public Procurement Rules', 'Lowest Bidder (L1) Dilemma', 'Quality vs Cost', 'Rural Health Equipment', 'Procurement Probity']
  },

  // ====================================================
  // 2019 (12 questions)
  // ====================================================
  {
    year: 2019,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs4-eth',
    text: 'What are the basic principles of public life according to the Nolan Committee? Explain the significance of "Selflessness" and "Integrity" in the context of civil services.',
    tags: ['Nolan Committee Principles', 'Selflessness & Integrity', 'Seven Principles of Public Life', 'Civil Service Values', 'Probity']
  },
  {
    year: 2019,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs4-att',
    text: 'How does attitude influence human behavior? In the context of civil servants, explain how democratic attitude differs from bureaucratic authoritarian attitude.',
    tags: ['Democratic vs Authoritarian Attitude', 'Attitude and Behavior', 'Citizen-Centric Governance', 'Civil Service Aptitude', 'Administrative Culture']
  },
  {
    year: 2019,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs4-ei',
    text: 'What is emotional intelligence? How does it help a district magistrate in maintaining emotional balance while handling political pressures and public crises?',
    tags: ['Emotional Intelligence in Administration', 'Handling Political Pressure', 'Emotional Balance in Crisis', 'Self-Awareness', 'Public Administration']
  },
  {
    year: 2019,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"In matters of conscience, the law of majority has no place." – Mahatma Gandhi. Discuss this statement in the context of constitutional morality and civil disobedience.',
    tags: ['Mahatma Gandhi Quote', 'Conscience vs Majority Rule', 'Constitutional Morality', 'Moral Courage', 'Civil Disobedience']
  },
  {
    year: 2019,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs4-pro',
    text: 'Explain the philosophical basis of governance and probity. What are the institutional mechanisms required to ensure probity in financial dealings of the government?',
    tags: ['Philosophical Basis of Probity', 'CAG & CVC', 'Financial Integrity', 'Public Accounts Scrutiny', 'Anti-Corruption Framework']
  },
  {
    year: 2019,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"Integrity is doing the right thing, even when no one is watching." – C.S. Lewis. Discuss how integrity differs from mere honesty in public administration.',
    tags: ['C.S. Lewis Quote', 'Integrity vs Honesty', 'Moral Character', 'Ethical Consistency', 'Public Trust']
  },
  {
    year: 2019,
    questionNumber: 7,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are a Sub-Divisional Magistrate (SDM). A major chemical factory in your jurisdiction experiences a toxic gas leak late at night. The factory management attempts to conceal the leak, claiming it is an internal non-toxic discharge. However, dozens of slum dwellers living nearby develop severe respiratory distress and are rushed to clinics. The factory owner is a prominent campaign donor to the ruling political party and calls you to avoid creating public panic. (a) What are the immediate and long-term ethical duties before you? (b) How will you manage the emergency while holding the guilty accountable?',
    tags: ['Industrial Gas Leak Case', 'Bhopal Gas Leak Parallel', 'Corporate Negligence', 'Political Protection of Industrialist', 'Disaster Response']
  },
  {
    year: 2019,
    questionNumber: 8,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are heading a state electricity board. Rural power theft through illegal hooking is rampant, causing financial bankruptcy of the utility. When you launch a strict enforcement drive to disconnect illegal lines and penalize culprits, local politicians mobilize villagers to attack the inspection teams and hold a massive dharna, demanding free power. (a) What are the ethical and governance issues involved in power theft? (b) How will you handle the crisis without compromising on revenue integrity or triggering violence?',
    tags: ['Rural Power Theft Case', 'DISCOM Financial Health', 'Law Enforcement vs Mob Resistance', 'Populist Demands', 'Administrative Strategy']
  },
  {
    year: 2019,
    questionNumber: 9,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the director of an orphanage funded partially by government grants and public donations. An anonymous tip reveals that senior staff members are physically abusing and exploiting inmate children. A surprise inspection confirms evidence of abuse. However, the trustee board includes respected public dignitaries who urge you to settle the issue internally without filing an FIR, arguing that police involvement will ruin the orphanage\'s reputation and force its closure, leaving 200 children homeless. (a) What are the ethical dilemmas? (b) What steps will you take to protect the children and punish the abusers?',
    tags: ['Child Abuse in Orphanage', 'Institutional Cover-Up', 'Child Protection (POCSO)', 'Duty of Care', 'Administrative Courage']
  },
  {
    year: 2019,
    questionNumber: 10,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are a newly appointed civil surgeon in a district hospital. You find that doctors routinely refer poor patients to their private diagnostic clinics and pharmacies where prices are inflated, ignoring the free generic medicine counter in the hospital. When you issue show-cause notices, the doctors association threatens an indefinite medical strike, leaving emergency wards unstaffed. (a) Identify the ethical transgressions of the medical staff. (b) How will you resolve the deadlock while safeguarding poor patients?',
    tags: ['Medical Private Practice Nexus', 'Hospital Administration', 'Doctor Strike Threat', 'Hippocratic Oath & Ethics', 'Access to Healthcare']
  },
  {
    year: 2019,
    questionNumber: 11,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the District Collector. A large infrastructure company constructing a national highway is destroying a fertile green agricultural belt. Small farmers whose land has not yet been acquired complain that construction runoff has ruined their standing crops. When they protest peacefully, company bouncers assault them. The local police station refuses to file an FIR against the company due to corporate influence. (a) What are the ethical issues in corporate bullying of farmers? (b) What steps will you take to deliver justice to the aggrieved farmers?',
    tags: ['Corporate Land Encroachment', 'Farmer Rights Protection', 'Police Inaction on FIR', 'District Magistrate Authority', 'Social Justice']
  },
  {
    year: 2019,
    questionNumber: 12,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are an upright bank manager. A drought-stricken small farmer with an unpaid crop loan of Rs 50,000 approaches you with tears, stating that his daughter is critically ill and requires immediate hospitalization. Bank regulations strictly mandate freezing further credit and issuing asset seizure notices for defaulting accounts. Approving an emergency top-up loan violates lending guidelines and may lead to audit penalties on you. (a) Analyze the conflict between rigid adherence to banking rules and moral compassion. (b) What solutions can you provide within or outside institutional channels?',
    tags: ['Farmer Loan Default Case', 'Banking Rules vs Human Compassion', 'Agrarian Distress', 'Financial Discretion', 'Empathy in Public Life']
  },

  // ====================================================
  // 2018 (12 questions)
  // ====================================================
  {
    year: 2018,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs4-eth',
    text: 'State the three basic values which, in your opinion, are indispensable on civil servants. Justify your answer with suitable real-life administrative situations.',
    tags: ['Civil Service Values', 'Integrity, Compassion, Objectivity', 'Administrative Ethics', 'Public Trust', 'Ethical Standards']
  },
  {
    year: 2018,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs4-att',
    text: 'What do you understand by "values" and "ethics"? In what ways is it important in the system of civil services to have a value-based administration rather than rule-bound administration alone?',
    tags: ['Values vs Ethics', 'Value-Based Administration', 'Spirit of Law vs Letter of Law', 'Bureaucratic Discretion', 'Foundational Values']
  },
  {
    year: 2018,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs4-ei',
    text: 'Emotional Intelligence is an essential tool for effective leadership in civil services. Explain how emotional self-regulation prevents bureaucratic burnout and enhances empathy towards citizens.',
    tags: ['Emotional Self-Regulation', 'Bureaucratic Burnout', 'Empathy Towards Citizens', 'Leadership in Civil Services', 'Emotional Intelligence']
  },
  {
    year: 2018,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"Falsehood takes the place of truth when it results in unblemished common good." – Tirukkural. Critically evaluate this statement in the context of public administrative decision-making.',
    tags: ['Tirukkural Moral Philosophy', 'Truth vs Common Good', 'Utilitarian Ethics', 'Moral Dilemmas in Statecraft', 'Ethical Justification']
  },
  {
    year: 2018,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs4-pro',
    text: 'What are the main functions of the Central Vigilance Commission (CVC) in enforcing probity in governance? What are the limitations in its mandate regarding prosecution sanctions?',
    tags: ['CVC Mandate & Powers', 'Probity in Governance', 'Sanction for Prosecution', 'Single Directive Doctrine', 'Anti-Corruption Measures']
  },
  {
    year: 2018,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"The unexamined life is not worth living." – Socrates. Discuss the relevance of continuous moral introspection for public servants exercising sovereign power.',
    tags: ['Socrates Philosophy', 'Moral Introspection', 'Ethical Self-Examination', 'Sovereign Power Accountability', 'Public Duty']
  },
  {
    year: 2018,
    questionNumber: 7,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the District Collector in a communally sensitive district. A holy religious festival of one community coincides with an important procession of another community. Both communities insist on taking out their processions through the same narrow market corridor at the exact same hour. Intelligence warns of severe communal rioting if either procession is altered or halted. Community leaders refuse to compromise, claiming it is an infringement of their constitutional religious freedom. (a) Discuss the ethical and administrative challenges in maintaining public order without curtailing religious liberty. (b) What strategy will you implement to avert communal clashes?',
    tags: ['Communal Procession Clash', 'Public Order vs Religious Freedom', 'Intelligence Inputs on Riots', 'Community Negotiation', 'Crisis Management']
  },
  {
    year: 2018,
    questionNumber: 8,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are an honest and upright officer in the state civil supplies department. You uncover an organized pilferage racket where subsidized wheat and rice meant for the Antyodaya Anna Yojana (AAY) poor families are diverted to private flour mills. The racket involves top political figures and your immediate departmental commissioner. You are offered a massive bribe to look away, accompanied by warnings that refusal will lead to your immediate transfer to a remote area and fabricated departmental charges. (a) Identify the ethical issues involved. (b) What actions will you take to bust the racket?',
    tags: ['PDS Food Grain Pilferage', 'Antyodaya Scheme Diversion', 'Corrupt Superior & Politician', 'Whistleblowing Ethics', 'Public Distribution Integrity']
  },
  {
    year: 2018,
    questionNumber: 9,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the chief executive officer of a municipal corporation. A private construction company building a luxury commercial complex has encroached upon an important municipal stormwater drain, causing artificial flooding in nearby low-income shanties during monsoons. When you issue an immediate demolition order for the illegal structures, a local court issues a temporary status quo order based on forged municipal approvals. (a) What are the ethical responsibilities of the municipal administration? (b) How will you proceed to protect the poor residents while respecting the judicial process?',
    tags: ['Stormwater Drain Encroachment', 'Urban Slum Flooding', 'Judicial Stay on Forged Papers', 'Municipal Responsibility', 'Disaster Mitigation']
  },
  {
    year: 2018,
    questionNumber: 10,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are heading a state environmental pollution control board. A large tannery cluster employing thousands of workers is discharging untreated chromium-laden toxic sludge directly into a sacred river, leading to high rates of cancer and skin diseases in downstream farming villages. Closing the tanneries immediately will throw thousands of daily-wage labourers into poverty, while keeping them open destroys the health and ecology of millions downstream. (a) What ethical dilemma arises between employment and right to life? (b) Outline a phased, enforceable transition plan.',
    tags: ['Tannery Pollution in Sacred River', 'Chromium Toxicity', 'Livelihood vs Right to Life', 'Environmental Law Enforcement', 'Sustainable Industrialization']
  },
  {
    year: 2018,
    questionNumber: 11,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are an honest junior officer in the department of social justice. You find that scholarship funds sanctioned for Scheduled Caste and Scheduled Tribe university students have been delayed for eight months because senior officers are demanding illegal commissions from the colleges to clear the electronic fund transfers. Many poor students are being expelled from hostels for non-payment of mess dues. (a) Discuss the ethical failure of bureaucratic apathy. (b) What steps will you take to expedite disbursements and bring the corrupt officials to book?',
    tags: ['SC/ST Scholarship Delay', 'Bureaucratic Apathy & Bribery', 'Student Eviction Crisis', 'Direct Benefit Transfer Scrutiny', 'Administrative Courage']
  },
  {
    year: 2018,
    questionNumber: 12,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the district magistrate. An elderly widow with no surviving family visits your office claiming that her ancestral agricultural plot was grabbed by her powerful nephews using forged revenue documents with the connivance of the local revenue official (Patwari). Revenue appeal processes take years, and the woman is on the verge of starvation. (a) What ethical duty does an administrator owe to the marginalized and destitute? (b) What immediate legal and executive measures will you take to restore her rights?',
    tags: ['Land Grabbing of Elderly Widow', 'Patwari Corruption', 'Speedy Administrative Relief', 'Compassion in Governance', 'Access to Justice']
  },

  // ====================================================
  // 2017 (12 questions)
  // ====================================================
  {
    year: 2017,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs4-eth',
    text: 'Conflict of interest in the public sector arises when \'official duties, public interest, and personal interest are taking priority one above the other.\' How can this conflict in administration be resolved? Describe with examples.',
    tags: ['Conflict of Interest', 'Public vs Personal Interest', 'Recusal & Code of Conduct', 'Administrative Decisions', 'Probity in Public Life']
  },
  {
    year: 2017,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs4-att',
    text: 'Young people with ethical conduct are not only changing themselves, but are also bringing about a radical change in the society. Discuss with examples of youth-led social movements.',
    tags: ['Youth Ethical Conduct', 'Social Transformation', 'Youth Movements', 'Moral Leadership', 'Social Values']
  },
  {
    year: 2017,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs4-ei',
    text: 'What are the main components of emotional intelligence (EI)? Can they be learned? Discuss how EI helps civil servants manage workplace stress and foster team morale.',
    tags: ['Components of EI', 'Can EI Be Learned', 'Workplace Stress Management', 'Team Morale in Administration', 'Emotional Intelligence']
  },
  {
    year: 2017,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"Great ambition is the passion of a great character. Those endowed with it may perform very good or very bad acts. All depends on the principles which direct them." – Napoleon Bonaparte. Explain in the light of ethics in public leadership.',
    tags: ['Napoleon Bonaparte Quote', 'Ambition and Character', 'Moral Principles', 'Ethical Leadership', 'Power & Morality']
  },
  {
    year: 2017,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs4-pro',
    text: 'Discipline generally implies following the order and not questioning it. Do you agree that in public administration, unquestioning obedience may lead to moral blindness? Discuss.',
    tags: ['Discipline vs Moral Blindness', 'Unquestioning Obedience', 'Nuremberg Defense', 'Conscientious Objection', 'Administrative Ethics']
  },
  {
    year: 2017,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"The right of self-defense is not only a right, but a moral duty when the life and honor of innocent persons are in peril." Discuss this in the context of ethical principles governing law enforcement.',
    tags: ['Self-Defense Moral Duty', 'Protection of the Innocent', 'Proportional Use of Force', 'Police Ethics', 'Moral Philosophy']
  },
  {
    year: 2017,
    questionNumber: 7,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the District Magistrate. A massive building collapses in a congested area, burying scores of workers under rubble. While search and rescue operations are ongoing, a violent mob gathers, blaming the municipal administration and pelting stones at the rescue teams and police. The local corporator demands immediate public announcement of Rs 50 lakh compensation per victim, threatening to burn down the nearby municipal office if not agreed within an hour. (a) What are the immediate priorities before you? (b) How will you handle the angry mob while ensuring search and rescue continues without hindrance?',
    tags: ['Building Collapse Tragedy', 'Search & Rescue Crisis', 'Mob Violence & Extortion', 'Disaster Management', 'Crisis Leadership']
  },
  {
    year: 2017,
    questionNumber: 8,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are an honest and diligent officer in the state tax department. You discover that a multi-billion multinational retail corporation has engaged in systematic tax fraud by misdeclaring import values and utilizing shell companies, depriving the state of hundreds of crores in revenue. The state finance minister sends you an unwritten message through your principal secretary to close the file with a nominal settlement, stating that aggressive tax enforcement will damage the state\'s investment climate. (a) What are the ethical dilemmas in this situation? (b) How will you discharge your legal duty while handling executive pressure?',
    tags: ['Corporate Tax Fraud', 'Multinational Tax Evasion', 'Ministerial Intervention', 'Investment Climate vs Revenue Probity', 'Tax Administration']
  },
  {
    year: 2017,
    questionNumber: 9,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the director of a state pharmaceutical testing laboratory. Test results of a popular generic painkiller tablet manufactured by an influential domestic firm show that the active pharmaceutical ingredient (API) is sub-potent and contaminated with heavy metals. When you prepare to issue an immediate recall and ban, the company\'s managing director visits your office, offers an expensive luxury car, and threatens that your family\'s safety cannot be guaranteed if you sign the recall order. (a) Identify the moral issues. (b) What actions will you take to ensure public health and your own protection?',
    tags: ['Sub-Potent Drug Recall', 'Pharma Corruption & Threat', 'Patient Safety', 'Bribery vs Integrity', 'Public Health Protection']
  },
  {
    year: 2017,
    questionNumber: 10,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are a Sub-Divisional Police Officer (SDPO). An influential local politician\'s son is involved in a hit-and-run accident that kills two homeless people sleeping on the pavement. The politician attempts to substitute the driver with an elderly family servant who confesses under coercion. Your senior police superintendent advises you to accept the driver\'s confession to avoid friction with the ruling political party. (a) What are the ethical obligations of a police investigator? (b) How will you ensure that the real culprit is brought to book?',
    tags: ['Hit and Run Case', 'Driver Substitution Racket', 'Political Cover-Up in Crime', 'Police Investigation Integrity', 'Rule of Law']
  },
  {
    year: 2017,
    questionNumber: 11,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are an officer in the rural water supply department. A major central scheme has sanctioned funds to install solar-powered reverse osmosis (RO) water purification plants in villages affected by severe fluorosis. The local MLA insists that the plants be installed only in villages dominated by his caste and electoral supporters, leaving out severely affected poorer hamlets inhabited by lower castes. (a) Discuss the ethical failure of electoral favoritism in basic public services. (b) How will you ensure fair, need-based allocation of water plants?',
    tags: ['Fluorosis Affected Villages', 'Electoral Favoritism in Water', 'Caste Discrimination in Welfare', 'Need-Based Resource Allocation', 'Public Service Ethics']
  },
  {
    year: 2017,
    questionNumber: 12,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the principal of a prestigious government medical college. A senior professor with international acclaim is accused of sexual harassment and academic victimization by several postgraduate female resident doctors. The internal committee report confirms prima facie guilt. However, senior faculty members petition you to drop charges, warning that the professor\'s removal will cancel international research collaborations and harm the college\'s prestige. (a) Evaluate the ethical principles governing academic institutions. (b) What decisive action will you take?',
    tags: ['Medical College Harassment', 'Academic Victimization', 'Institutional Prestige vs Justice', 'POSH Act Compliance', 'Ethical Leadership']
  },

  // ====================================================
  // 2016 (12 questions)
  // ====================================================
  {
    year: 2016,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs4-eth',
    text: 'Explain how ethics contributes to human social well-being and personal fulfillment. Why is an ethical society more stable and prosperous in the long run?',
    tags: ['Ethics in Human Life', 'Social Well-Being', 'Personal Fulfillment', 'Social Cohesion', 'Ethical Society']
  },
  {
    year: 2016,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs4-att',
    text: 'What are the main functions of attitude in guiding human behavior? How can positive civil service attitudes bridge the trust deficit between citizens and the state?',
    tags: ['Functions of Attitude', 'Citizen-State Trust Deficit', 'Civil Service Dedication', 'Public Service Attitude', 'Social Psychology']
  },
  {
    year: 2016,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs4-ei',
    text: 'Discuss the role of emotional intelligence in public administration. How does empathy prevent bureaucratic arrogance and insensitive decision-making?',
    tags: ['Emotional Intelligence Role', 'Empathy in Decision Making', 'Bureaucratic Arrogance', 'Civil Service Sensitivity', 'Administrative Leadership']
  },
  {
    year: 2016,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"Maxims of integrity, impartiality and non-partisanship are the bedrock of civil services." Explain how these values protect democratic governance from authoritarian abuse.',
    tags: ['Integrity, Impartiality, Non-partisanship', 'Democratic Safeguards', 'Civil Service Foundational Values', 'Authoritarian Resistance', 'Rule of Law']
  },
  {
    year: 2016,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs4-pro',
    text: 'What is the role of information sharing and transparency in government? How does the Right to Information Act dismantle the culture of administrative secrecy?',
    tags: ['Information Sharing in Government', 'Culture of Secrecy', 'RTI Act Impact', 'Transparency in Governance', 'Administrative Accountability']
  },
  {
    year: 2016,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"In law a man is guilty when he violates the rights of others. In ethics he is guilty if he only thinks of doing so." – Immanuel Kant. Discuss this distinction between legal guilt and moral guilt.',
    tags: ['Immanuel Kant Quote', 'Legal vs Moral Guilt', 'Inner Morality', 'Deontological Ethics', 'Virtue and Law']
  },
  {
    year: 2016,
    questionNumber: 7,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the municipal commissioner of a large city. A private developer has built a multi-story shopping mall on an encroached public lake bed using forged documents and connivance of previous municipal officials. Demolishing the complex will cause economic loss of Rs 500 crores and unemployment for 2000 shop employees, but sparing it sets a dangerous precedent and worsens urban flooding. Political leaders urge you to regularize the mall by imposing a token fine. (a) Discuss the ethical issues involved. (b) What course of action will you take?',
    tags: ['Lake Bed Encroachment Mall', 'Urban Flooding Precedent', 'Regularization with Token Fine', 'Rule of Law vs Sunk Capital', 'Municipal Administration']
  },
  {
    year: 2016,
    questionNumber: 8,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are an honest superintendent of police. An innocent young man from a minority community is arrested by your subordinate officers on suspicion of involvement in a bomb blast. Under interrogation torture, the youth confesses to the crime. However, independent forensic and call record evidence clearly establishes that he was 500 km away during the blast. Your senior officers urge you to keep him in custody to show swift police progress to the media. (a) What are the ethical and legal violations in this case? (b) How will you ensure justice for the innocent youth while disciplining your officers?',
    tags: ['Custodial Torture & False Confession', 'Minority Scapegoating', 'Police Accountability', 'Forensic Truth vs Media Pressure', 'Human Rights in Policing']
  },
  {
    year: 2016,
    questionNumber: 9,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the director of a state public service commission. You receive a call from an influential political figure who demands that a specific candidate related to a minister be awarded top interview marks to ensure appointment as Deputy Collector. He hints that rejecting his request will lead to corruption allegations and your unceremonious removal. The candidate in question has performed moderately in the written examination. (a) What are the ethical challenges before the commission head? (b) What steps will you take to safeguard the sanctity of the selection process?',
    tags: ['Public Service Commission Nepotism', 'Interview Marks Rigging', 'Political Threats to Chairman', 'Merit System Integrity', 'Constitutional Body Ethics']
  },
  {
    year: 2016,
    questionNumber: 10,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the chief medical officer of a district hospital. An undocumented poor pregnant woman from a neighbouring country arrives at the hospital in advanced obstructed labour. Hospital staff refuse admission, citing strict local administration orders prohibiting treatment of illegal immigrants without police verification. Delaying medical intervention by even an hour will result in the death of the mother and unborn child. (a) Discuss the conflict between legal immigration status and the fundamental humanitarian right to emergency healthcare. (b) What will be your decision and how will you justify it?',
    tags: ['Illegal Immigrant Emergency Care', 'Right to Health vs Citizenship Law', 'Hippocratic Duty of Doctors', 'Humanitarian Emergency', 'Hospital Administration']
  },
  {
    year: 2016,
    questionNumber: 11,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are a sub-divisional magistrate. A local chemical fertilizer plant has been discharging untreated acidic effluents into an irrigation canal, destroying the crops of five villages. Villagers have blocked the national highway in protest. The factory owner claims that closing the factory will jeopardize national fertilizer supply during the sowing season and seeks 3 months to install treatment equipment. The angry farmers refuse to move until the factory is sealed immediately. (a) Evaluate the conflicting claims of agrarian livelihood and industrial continuity. (b) What resolution will you broker?',
    tags: ['Fertilizer Effluent Canal Contamination', 'Highway Blockade by Farmers', 'National Supply vs Local Rights', 'Administrative Mediation', 'Environmental Justice']
  },
  {
    year: 2016,
    questionNumber: 12,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are an upright public relations officer in a state power corporation. An internal technical inquiry finds that a recent massive grid collapse that plunged millions into darkness was caused by negligence and deferred maintenance by senior engineers, rather than a lightning strike as claimed in official press releases. Your department head orders you to draft a press release blaming natural weather events to prevent public outrage and regulatory fines. (a) Discuss the ethical dilemma between organizational loyalty and public truth. (b) What course of action will you adopt?',
    tags: ['Grid Failure Cover-Up', 'Public Truth vs Official Spin', 'PR Ethics in Public Sector', 'Accountability for Negligence', 'Integrity in Communication']
  },

  // ====================================================
  // 2015 (12 questions)
  // ====================================================
  {
    year: 2015,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs4-eth',
    text: 'What is meant by \'environmental ethics\'? Why is it important to cultivate environmental ethics among corporate leaders and policy makers? Discuss.',
    tags: ['Environmental Ethics', 'Anthropocentrism vs Biocentrism', 'Corporate Social Responsibility', 'Inter-generational Justice', 'Sustainable Development']
  },
  {
    year: 2015,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs4-att',
    text: 'Differentiate between the moral attitude and political attitude. How does a partisan political attitude in a bureaucrat damage the non-partisan character of the civil service?',
    tags: ['Moral Attitude vs Political Attitude', 'Bureaucratic Neutrality', 'Non-Partisanship', 'Civil Service Values', 'Democratic Governance']
  },
  {
    year: 2015,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs4-ei',
    text: 'How will you apply emotional intelligence in administration to motivate demoralized subordinates and resolve interpersonal disputes in a government department?',
    tags: ['Emotional Intelligence Application', 'Motivating Demoralized Staff', 'Interpersonal Conflict Resolution', 'Empathy in Leadership', 'Organizational Climate']
  },
  {
    year: 2015,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"Nearly all men can stand adversity, but if you want to test a man\'s character, give him power." – Abraham Lincoln. Examine this statement in the context of administrative discretion.',
    tags: ['Abraham Lincoln Quote', 'Power and Character', 'Administrative Discretion', 'Corruption and Hubris', 'Ethics in Governance']
  },
  {
    year: 2015,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs4-pro',
    text: 'What do you understand by "whistleblowing"? Discuss the moral dilemmas faced by a whistleblower and analyze the institutional protections available in India.',
    tags: ['Whistleblowing Dilemmas', 'Whistleblowers Protection Act', 'Public Interest vs Loyalty', 'Protection Against Victimization', 'Probity in Public Life']
  },
  {
    year: 2015,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"Compassion is the basis of all morality." – Arthur Schopenhauer. Explain how compassion serves as a vital compass for a civil servant working in underdeveloped rural regions.',
    tags: ['Arthur Schopenhauer Quote', 'Compassion as Basis of Morality', 'Rural Administration', 'Empathy Towards Poor', 'Civil Service Aptitude']
  },
  {
    year: 2015,
    questionNumber: 7,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the District Magistrate. A massive fire accident in an illegal fireworks manufacturing unit operating in a residential area results in the deaths of fifteen child labourers. Investigation reveals that the unit was operating without municipal licenses, but with the active connivance of local police and fire officials who collected regular bribes. The factory owner is a prominent local politician. Grieving families and local residents attack the police station. (a) What are the ethical and administrative failures in this tragedy? (b) How will you take immediate control of the situation and ensure impartial prosecution?',
    tags: ['Illegal Fireworks Unit Fire', 'Child Labour Tragedy', 'Police-Factory Owner Nexus', 'Mob Attack on Police Station', 'Disaster Administration']
  },
  {
    year: 2015,
    questionNumber: 8,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are an upright public sector infrastructure executive. A multi-crore flyover construction contract was awarded to an infrastructure firm during your predecessor\'s tenure. Structural safety audits show that low-grade steel was used in the support pillars, posing catastrophic collapse risks. The contractor offers you a kickback of Rs 2 crores to suppress the audit report and threatens to ruin your career through political connections if you do not comply. (a) What are the ethical challenges faced by you? (b) What steps will you take to protect public safety and prosecute the corrupt contractor?',
    tags: ['Flyover Structural Failure', 'Kickback Offer vs Safety', 'Substandard Material Fraud', 'Public Safety Imperative', 'Executive Integrity']
  },
  {
    year: 2015,
    questionNumber: 9,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are an honest food and drug administration commissioner. Routine testing of food samples in a mid-day meal scheme in several government primary schools reveals dangerous levels of pesticide contamination and dead insects. When you order an immediate probe, the suppliers association, backed by local politicians, threatens to suspend all mid-day meal supplies across the state, leaving millions of poor children hungry. (a) What ethical values should guide your decision? (b) How will you ensure food safety without interrupting children\'s nutrition?',
    tags: ['Mid-Day Meal Contamination', 'Supplier Strike Threat', 'Child Nutrition vs Food Safety', 'Regulatory Enforcement', 'Public Administration']
  },
  {
    year: 2015,
    questionNumber: 10,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the superintendent of police. An honest social activist who has been exposing illegal sand mining along a major river is brutally attacked and critically injured by the mining mafia. The activist\'s family names three prominent local mafia leaders, who are close relatives of a state cabinet minister. The minister calls you directly, asking you to register an FIR against "unknown miscreants" and not harass his relatives. (a) What are the ethical dilemmas of the police chief? (b) How will you ensure an impartial, fearless investigation?',
    tags: ['Sand Mining Mafia Attack', 'Social Activist Protection', 'Ministerial Pressure on Police', 'Impartial FIR Registration', 'Rule of Law']
  },
  {
    year: 2015,
    questionNumber: 11,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the director of a state tourism department. A plan is proposed to develop a luxury eco-resort in a pristine coastal zone inhabited by traditional fishermen. The project promises huge tourism revenue and state prestige, but the construction will destroy the breeding grounds of rare marine turtles and displace local fishing communities from their beach access. Environmental groups protest vehemently. (a) Analyze the conflict between economic tourism growth and ecological-livelihood preservation. (b) What decision will you recommend?',
    tags: ['Eco-Tourism vs Fishermen Livelihood', 'Turtle Breeding Grounds', 'Coastal Zone Conservation', 'Public Consultation', 'Sustainable Tourism']
  },
  {
    year: 2015,
    questionNumber: 12,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are an assistant commissioner of income tax. You unearth massive undisclosed offshore assets and undeclared bank accounts belonging to a prominent media baron whose television channels strongly shape public opinion. Your senior commissioner hints that pursuing this case will trigger media attacks on the department and derail your upcoming promotion. (a) What are the ethical challenges in enforcing tax compliance against powerful media moguls? (b) How will you proceed to uphold tax probity?',
    tags: ['Media Baron Tax Evasion', 'Media Intimidation of Bureaucracy', 'Tax Administration Integrity', 'Promotion Threat', 'Public Duty']
  },

  // ====================================================
  // 2014 (12 questions)
  // ====================================================
  {
    year: 2014,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs4-eth',
    text: 'What do you understand by "values" and "ethics"? In what ways is it important in the system of civil services to have an ethics-based administration rather than rule-bound administration alone?',
    tags: ['Values vs Ethics', 'Ethics-Based Administration', 'Civil Service Values', 'Bureaucratic Rigidity', 'Foundational Values']
  },
  {
    year: 2014,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs4-att',
    text: 'How does attitude influence an individual\'s behavior? Explain how democratic attitude differs from authoritarian attitude in civil servants.',
    tags: ['Attitude and Behavior', 'Democratic vs Authoritarian', 'Civil Service Conduct', 'Public Dealing', 'Social Psychology']
  },
  {
    year: 2014,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs4-ei',
    text: 'What is Emotional Intelligence and how can it be developed in people? How does emotional intelligence help in resolving interpersonal conflicts in administration?',
    tags: ['Emotional Intelligence Development', 'Interpersonal Conflict Resolution', 'Self-Awareness & Empathy', 'Administrative Efficiency', 'Emotional Competencies']
  },
  {
    year: 2014,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light." – Plato. Discuss this statement in the context of transparency in governance.',
    tags: ['Plato Quote', 'Afraid of the Light', 'Transparency in Governance', 'Culture of Secrecy', 'Moral Courage']
  },
  {
    year: 2014,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs4-pro',
    text: 'What do you understand by "probity in governance"? What are the key prerequisites for establishing probity in public life in India?',
    tags: ['Probity in Governance', 'Prerequisites of Probity', 'Integrity in Public Service', 'Anti-Corruption Framework', 'Nolan Committee Principles']
  },
  {
    year: 2014,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"Educating the mind without educating the heart is no education at all." – Aristotle. Explain the importance of moral education along with intellectual training.',
    tags: ['Aristotle Quote', 'Educating the Heart', 'Moral Education', 'Value-Based Learning', 'Character Formation']
  },
  {
    year: 2014,
    questionNumber: 7,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the District Magistrate. A chemical factory in an industrial zone experiences a catastrophic boiler explosion resulting in twelve worker fatalities and severe chemical burns to dozens more. An angry mob of factory workers and local residents surrounds the factory gates, lynches one private security guard, and threatens to burn down the entire industrial complex. The factory management has fled the scene. (a) What are the immediate and long-term administrative priorities? (b) How will you control the violent mob while ensuring medical treatment and chemical containment?',
    tags: ['Boiler Explosion Tragedy', 'Industrial Mob Violence', 'Chemical Disaster Containment', 'Crisis Leadership', 'District Administration']
  },
  {
    year: 2014,
    questionNumber: 8,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are heading a municipal health licensing department. A prominent multi-specialty private hospital is found guilty of operating an illegal human kidney trafficking racket with the complicity of senior surgeons. The hospital is owned by a powerful business tycoon who is a close relative of a prominent state minister. The minister calls you, urging you to register cases only against minor middlemen and spare the hospital and surgeons. (a) Identify the ethical dilemmas. (b) What steps will you take to enforce medical justice and bust the racket?',
    tags: ['Organ Trafficking Racket', 'Hospital Management Complicity', 'Ministerial Interference', 'Medical Ethics Violations', 'Rule of Law']
  },
  {
    year: 2014,
    questionNumber: 9,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the chief town planner of a burgeoning metropolis. A private builder consortium has illegally constructed high-rise luxury towers in violation of coastal zone regulations and fire safety codes. The apartments have already been purchased by hundreds of innocent middle-class families. Sparing the towers violates ecological laws, while demolishing them will ruin innocent home buyers. (a) Discuss the ethical dilemma between environmental law enforcement and protecting innocent buyers. (b) What solution will you propose?',
    tags: ['Illegal High-Rise Towers (Maradu Parallel)', 'Innocent Homebuyers Dilemma', 'CRZ Violations', 'Enforcement vs Compassion', 'Urban Governance']
  },
  {
    year: 2014,
    questionNumber: 10,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are an honest district sports officer. You discover that funds allocated for grassroots training of rural underprivileged athletes and procuring sports kits were embezzled by local sports association office-bearers, who are prominent political figures. Talented athletes are forced to train barefoot without nutrition. The association president threatens to terminate your contract if you proceed with an audit. (a) Discuss the ethical degradation of sports administration. (b) What action plan will you pursue?',
    tags: ['Grassroots Sports Embezzlement', 'Rural Athlete Exploitation', 'Political Mafia in Sports', 'Whistleblowing Audit', 'Integrity in Sports']
  },
  {
    year: 2014,
    questionNumber: 11,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the superintendent of police in an area with deep-rooted caste tensions. A Dalit groom riding a horse in his wedding procession is assaulted and his house set on fire by dominant caste villagers who claim this violates their village traditions. Dominant community elders pressure local police to file a compromise agreement without FIR, warning of caste riots if any arrests are made. (a) Discuss the conflict between traditional customary claims and constitutional rights. (b) How will you enforce the law and ensure dignity for the victim?',
    tags: ['Caste Atrocity in Wedding', 'Customary Oppression vs Rights', 'SC/ST Prevention of Atrocities', 'Police Protection of Victims', 'Constitutional Morality']
  },
  {
    year: 2014,
    questionNumber: 12,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the director of a state public procurement agency. Bids are invited for procuring life-saving medical equipment for rural PHCs. The lowest bidder (L1) has a history of supply delays and dubious quality, whereas the second lowest bidder (L2) offers certified, superior equipment but at a 10% higher price. Financial rules mandate awarding the tender to L1 unless severe irregularities are proven. (a) Analyze the conflict between rigid adherence to tender rules and the moral imperative of patient care. (b) How would you navigate this procurement dilemma?',
    tags: ['Tender Procurement Dilemma', 'Lowest Bidder (L1) Rule', 'Quality vs Strict Compliance', 'Rural Healthcare Equipment', 'Probity in Procurement']
  },

  // ====================================================
  // 2013 (12 questions)
  // ====================================================
  {
    year: 2013,
    questionNumber: 1,
    marks: 10,
    subjectId: 'gs4-eth',
    text: 'What do you understand by "moral values"? Discuss the essence, determinants and consequences of ethics in human actions.',
    tags: ['Moral Values', 'Essence of Ethics', 'Determinants of Ethics', 'Consequences of Ethics', 'Human Interface']
  },
  {
    year: 2013,
    questionNumber: 2,
    marks: 10,
    subjectId: 'gs4-att',
    text: 'What are the foundational values of civil services? Why are integrity, objectivity, dedication to public service, and empathy towards the weaker sections considered essential for civil servants?',
    tags: ['Foundational Values of Civil Services', 'Integrity & Objectivity', 'Dedication to Public Service', 'Empathy Towards Weaker Sections', 'Civil Service Aptitude']
  },
  {
    year: 2013,
    questionNumber: 3,
    marks: 10,
    subjectId: 'gs4-ei',
    text: 'Define Emotional Intelligence. What are its main components and how does it assist civil servants in discharging their duties under high pressure?',
    tags: ['Emotional Intelligence Definition', 'Components of EI', 'Pressure Management', 'Decision Making Under Stress', 'Public Administration']
  },
  {
    year: 2013,
    questionNumber: 4,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"Seven Social Sins" identified by Mahatma Gandhi in Young India (1925) include Politics without Principle, Wealth without Work, and Commerce without Morality. Discuss their contemporary relevance.',
    tags: ['Mahatma Gandhi Seven Social Sins', 'Politics without Principle', 'Commerce without Morality', 'Ethical Statecraft', 'Moral Philosophy']
  },
  {
    year: 2013,
    questionNumber: 5,
    marks: 10,
    subjectId: 'gs4-pro',
    text: 'What are the main causes of corruption in public life in India? Discuss the institutional and legal measures required to eradicate corruption and promote probity.',
    tags: ['Causes of Corruption', 'Eradication of Corruption', 'Probity in Public Life', 'CVC & Lokpal', 'Prevention of Corruption Act']
  },
  {
    year: 2013,
    questionNumber: 6,
    marks: 10,
    subjectId: 'gs4-phi',
    text: '"Happiness is when what you think, what you say, and what you do are in harmony." – Mahatma Gandhi. Explain how internal moral consistency leads to ethical integrity.',
    tags: ['Mahatma Gandhi Quote', 'Internal Harmony & Integrity', 'Moral Consistency', 'Authenticity', 'Character Building']
  },
  {
    year: 2013,
    questionNumber: 7,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the District Magistrate. A massive landslide cuts off a remote tribal valley in your district during severe rains. Communication lines are down, food supplies are dwindling, and an outbreak of water-borne disease is reported. State disaster relief helicopters cannot fly due to heavy fog. The local MLA insists that you personally accompany him by road with limited relief to his own vote-bank village first, threatening to complain to the Chief Minister if you prioritize the most vulnerable tribal hamlet. (a) What are your administrative and ethical responsibilities? (b) How will you manage the disaster response fairly and effectively?',
    tags: ['Landslide Relief Crisis', 'Political Favoritism in Disaster', 'Tribal Area Cut Off', 'Emergency Logistics', 'District Magistrate Leadership']
  },
  {
    year: 2013,
    questionNumber: 8,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are an honest and efficient sub-divisional officer in the state irrigation department. You find that a major canal embankment construction contract was executed with substandard earthwork and inadequate compaction by an influential contractor. With the onset of monsoons, the embankment is at imminent risk of breaching, which would submerge ten villages. When you issue a notice to rebuild the embankment, your departmental executive engineer advises you to keep quiet as the contractor is related to a senior minister. (a) What are the ethical issues involved? (b) What immediate steps will you take to prevent disaster and fix accountability?',
    tags: ['Canal Embankment Substandard Work', 'Imminent Breach Risk', 'Political Contractor Nexus', 'Public Safety vs Career Risk', 'Engineering Integrity']
  },
  {
    year: 2013,
    questionNumber: 9,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the head of the municipal solid waste management department. An international waste-to-energy firm submits a proposal to build a modern incinerator plant in the city. The project promises to eliminate municipal waste mountains. However, confidential technical evaluations reveal that the plant will emit toxic dioxins and furans above permissible standards, threatening the health of nearby densely populated residential colonies. The city mayor urges you to clear the file quickly ahead of upcoming municipal elections. (a) What are the ethical conflicts? (b) How will you handle the mayor\'s pressure and protect citizen health?',
    tags: ['Waste-to-Energy Toxic Emissions', 'Dioxins & Public Health', 'Electoral Pressure on Bureaucrat', 'Environmental Ethics', 'Municipal Governance']
  },
  {
    year: 2013,
    questionNumber: 10,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the superintendent of police in a communally sensitive industrial town. A Hindu factory supervisor is stabbed to death by a Muslim worker following a heated wage dispute. Vested communal elements seize the opportunity to portray the murder as a communal attack, organizing rallies and calling for a general strike. Rumours of impending communal riots circulate rapidly on social media and SMS. (a) Identify the immediate challenges before the police chief. (b) What preventive and enforcement measures will you adopt to preserve communal peace?',
    tags: ['Communal Rumour Control', 'Wage Dispute Turned Communal', 'Preventive Policing', 'Social Media Rumour Management', 'Crisis Leadership']
  },
  {
    year: 2013,
    questionNumber: 11,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are an upright block development officer (BDO). You discover that local village heads (Panchayat Pradhans) in collusion with junior block engineers have generated fake muster rolls under MGNREGS, embezzling millions of rupees of wages meant for landless poor labourers. When you initiate an inquiry and freeze payments, the pradhans stage a sit-in protest outside your office, claiming you are anti-development and harassing elected rural representatives. (a) What ethical duties do you owe to the poor labourers? (b) How will you conduct the investigation and safeguard public funds?',
    tags: ['MGNREGS Fake Muster Rolls', 'Panchayat Pradhan Collusion', 'Embezzlement of Poor Wages', 'Administrative Investigation', 'Grassroots Accountability']
  },
  {
    year: 2013,
    questionNumber: 12,
    marks: 20,
    subjectId: 'gs4-case',
    text: 'Case Study: You are the chief vigilance officer of a public sector oil marketing company. You uncover a large-scale fuel adulteration racket involving company depot managers and transport contractors who blend cheap subsidized kerosene into commercial diesel and petrol. The racket generates huge illicit profits and enjoys the patronage of local criminal syndicates. Two whistleblowing tank-truck drivers have already been murdered under mysterious circumstances. (a) What are the ethical issues and risks in investigating this racket? (b) What comprehensive strategy will you pursue to dismantle the adulteration mafia and protect whistleblowers?',
    tags: ['Fuel Adulteration Mafia (Manjunath Parallel)', 'Whistleblower Murder Risk', 'Depot Corruption', 'Chief Vigilance Officer Role', 'Corporate Probity']
  }
];

module.exports = gs4Questions;
