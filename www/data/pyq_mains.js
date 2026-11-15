/* UPSC CSE Mains GS Paper II — Polity & Governance questions (2013–2025) with answer frameworks.
   Question wording follows the official papers; a few long questions are lightly abridged. */
(function(){
const Q=[];
const M=(year,marks,ch,q,intro,body,conclusion,value,model)=>Q.push({id:'m'+year+'-'+(Q.filter(x=>x.year===year).length+1),year,marks,ch,q,fw:{intro,body,conclusion,value,model}});

/* 2013 */
M(2013,10,['anti-defection','parliament'],'The role of individual MPs has diminished over the years and as a result healthy constructive debates on policy issues are not usually witnessed. How far can this be attributed to the anti-defection law which was legislated but with a different intention?',
'The Tenth Schedule (52nd Amendment, 1985) aimed to curb opportunistic floor-crossing ("Aaya Ram Gaya Ram"). It has also bound MPs to the party whip on every vote.',
['**How the law contributes**: whip applies to all votes, not only confidence and money matters; dissent risks disqualification; MPs vote by party line, so debate becomes performative.','**Other causes** (so not only the law): fewer sitting days (17th LS: about 55 a year), disruptions, guillotine, low committee referral (16% in the 17th LS), ordinances, executive dominance, party centralisation and ticket distribution.','**Evidence**: falling quality of debate on major Bills (farm laws 2020, criminal law Bills 2023 passed with mass suspensions).'],
'Partly attributable. Reforms: limit whips to confidence and money Bills (Dinesh Goswami, Law Commission 170th), decision by President/Governor on ECI advice, mandatory committee scrutiny, fixed sitting days (NCRWC: 120).',
['**Kihoto Hollohan (1992)**','**Dinesh Goswami Committee (1990)**','**Law Commission 170th Report (1999)**','**NCRWC (2002)**: 120 sitting days','PRS data on sittings and committee referrals']);
M(2013,10,['fundamental-rights','rti-transparency'],'Discuss Section 66A of IT Act, with reference to its alleged violation of Article 19 of the Constitution.',
'Section 66A of the IT Act, 2000 (added 2008) punished sending "grossly offensive" or "menacing" information, or information causing "annoyance" or "inconvenience".',
['**Violation of Art 19(1)(a)**: vague and over-broad terms; not covered by any Art 19(2) ground; chilling effect; arbitrary arrests (Palghar Facebook case, 2012).','**Government\'s defence**: need to curb online abuse, fake news, incitement.','**Shreya Singhal (2015)**: struck down in full. Distinguished discussion, advocacy and incitement; only incitement can be restricted.','**After**: police continued to use it; SC (2022) directed States to stop registering cases.'],
'Online speech regulation must be precise, proportionate and within Art 19(2). Current tools: IT Rules 2021, BNS provisions, DPDP Act.',
['**Shreya Singhal (2015)**','**PUCL v Union (2022)** directions','**Anuradha Bhasin (2020)**: internet as a medium']);
M(2013,10,['basic-structure','amendment'],'The Supreme Court of India keeps a check on arbitrary power of the Parliament in amending the Constitution. Discuss critically.',
'Art 368 gives Parliament constituent power; the SC has limited it through the basic structure doctrine.',
['**Evolution**: Shankari Prasad (1951) → Golaknath (1967) → Kesavananda (1973) → Minerva Mills (1980).','**Checks applied**: 39th Amdt (Art 329A) struck down in Indira Gandhi v Raj Narain; 42nd Amdt clauses struck in Minerva Mills; NJAC (2015).','**Critique**: judge-made, vague, counter-majoritarian; judiciary as final arbiter of its own powers.','**Defence**: protects core identity against transient majorities; adopted abroad (Bangladesh, Kenya).'],
'The doctrine balances parliamentary sovereignty and judicial supremacy. Restraint and clarity in its use sustain legitimacy.',
['**Kesavananda (1973)**','**Minerva Mills (1980)**','**I.R. Coelho (2007)**','**NJAC (2015)**']);
M(2013,10,['federal-system','union-territory'],'Many State Governments further bifurcate geographical administrative areas like Districts and Talukas for better governance. In light of the above, can it also be justified that more number of smaller States would bring in effective governance at State level? Discuss.',
'Art 3 lets Parliament create new States. The small States debate resurfaces with demands like Vidarbha, Gorkhaland, Bundelkhand.',
['**For**: administrative efficiency, closer government, identity and aspirations; examples: Uttarakhand, Chhattisgarh growth after 2000.','**Against**: viability and revenue, new disputes (water, capital, assets: AP–Telangana), duplication of costs, political instability (Jharkhand early years), regionalism.','**Districts vs States**: districts are administrative; States involve legislatures, finances and federal balance.'],
'Size is not the only factor; governance capacity, finances and consensus matter. A second States Reorganisation Commission could set objective criteria.',
['**Fazl Ali Commission (1955)**','**Srikrishna Committee (2010)**','**Art 3**']);
M(2013,10,['federal-system','inter-state-relations'],'The concept of cooperative federalism has been increasingly emphasized in recent years. Highlight the drawbacks in the existing structure and the extent to which cooperative federalism would answer the shortcomings.',
'Co-operative federalism means the Centre and States work together as partners (Granville Austin).',
['**Drawbacks**: centralising features (Art 249, 356, Governor), fiscal imbalance, centrally sponsored schemes, dormant ISC, Zonal Councils underused.','**Co-operative tools**: NITI Aayog (2015), GST Council (2016), ISC, Zonal Councils, FC devolution 42%/41%.','**Limits**: GST Council voting gives the Centre a veto; Governor disputes; central agencies; borrowing limits.'],
'Co-operative federalism helps but needs institutional strengthening: regular ISC meetings, fiscal autonomy, consultation on Concurrent List laws.',
['**Sarkaria**, **Punchhi**','**Mohit Minerals (2022)**','**S.R. Bommai (1994)**']);
M(2013,10,['inter-state-relations'],'Constitutional mechanisms to resolve the inter-state water disputes have failed to address and solve the problems. Is the failure due to structural or process inadequacy or both? Discuss.',
'Art 262 and the ISRWD Act 1956 provide for ad hoc tribunals; disputes like Cauvery and Krishna took decades.',
['**Structural**: no permanent body; River Boards Act unused; water is a State subject; SC jurisdiction barred.','**Process**: delays in tribunal setup and awards (Cauvery: 1990 → 2007 → 2018), no time limits until 2002, weak enforcement, lack of data.','**Political**: electoral incentives, protests.','**Reforms**: ISRWD Amendment Bill 2019 (permanent tribunal, DRC), river basin organisations, data agency, Mihir Shah Committee.'],
'Both. Need a permanent tribunal with time-bound awards, credible data and basin-level cooperation.',
['**Cauvery verdict (2018)**','**ISRWD (Amendment) Bill 2019**','**Mihir Shah Committee (2016)**']);

/* 2014 */
M(2014,12.5,['federal-system','centre-state-relations'],'Though the federal principle is dominant in our Constitution and that principle is one of its basic features, but it is equally true that federalism under the Indian Constitution leans in favour of a strong Centre, a feature that militates against the concept of strong federalism. Discuss.',
'India is a holding-together federation; S.R. Bommai made federalism a basic feature.',
['**Federal features**: dual polity, division of powers, rigid constitution, independent judiciary, bicameralism.','**Centralising features**: residuary powers, Arts 249–253, Governor, Arts 356, 360, AIS, single constitution, integrated judiciary, Art 3.','**Justification**: unity after partition, diversity, security, planning needs.','**Recent**: GST pooled sovereignty, cesses, Governor disputes, J&K 2019.'],
'A strong Centre need not mean weak States. Co-operative federalism, fiscal devolution and restraint in Art 356 make it work.',
['**K.C. Wheare**: quasi-federal','**S.R. Bommai (1994)**','**Sarkaria**']);
M(2014,12.5,['parliament'],'The "Powers, Privileges and Immunities of Parliament and its Members" as envisaged in Article 105 of the Constitution leave room for a large number of uncodified and unenumerated privileges to continue. Assess the reasons for the absence of legal codification of the "parliamentary privileges". How can this problem be addressed?',
'Art 105(3) leaves privileges as those of the House of Commons (as on 1950, via the 44th Amendment wording) until Parliament codifies them.',
['**Reasons for non-codification**: flexibility, fear of judicial scrutiny once codified (it becomes "law" under Art 13), legislative self-interest, British tradition.','**Problems**: conflict with Art 19(1)(a) (press), arbitrary use, uncertainty (Keshav Singh 1965).','**Way forward**: codify with clear definitions; Ethics Committees; judicial review (Raja Ram Pal 2007); Sita Soren (2024) narrowed immunity.'],
'Codification with safeguards would balance the dignity of Parliament with citizens\' rights.',
['**Keshav Singh (1965)**','**Raja Ram Pal (2007)**','**Sita Soren (2024)**','**NCRWC** recommended codification']);
M(2014,12.5,['judicial-activism','basic-structure'],'Starting from inventing the "basic structure" doctrine, the judiciary has played a highly proactive role in ensuring that India develops into a thriving democracy. In light of the statement, evaluate the role played by judicial activism in achieving the ideals of democracy.',
'Judicial activism: proactive use of judicial power to protect rights and good governance.',
['**Positive**: basic structure (Kesavananda), PIL (Hussainara), Art 21 expansion (Maneka, Puttaswamy), electoral transparency (ADR 2002, NOTA 2013, electoral bonds 2024), Vishaka, environment.','**Concerns**: overreach (highway liquor ban, national anthem order), separation of powers, unaccountable, pendency.','**Recent**: Governor timelines (2025) checked by the Art 143 opinion.'],
'Activism has strengthened democracy where institutions failed, but legitimacy depends on restraint.',
['**Kesavananda (1973)**','**Vishaka (1997)**','**ADR (2002)**','**Presidential Reference (2025)**']);
M(2014,12.5,['president'],'Instances of President\'s delay in commuting death sentences has come under public debate as denial of justice. Should there be a time limit specified for the President to accept/reject such petitions? Analyse.',
'Art 72 pardoning power is exercised on CoM advice; no time limit is prescribed.',
['**Problem**: years-long delays (Rajiv Gandhi assassination convicts, Devender Pal Singh Bhullar), "death row phenomenon".','**SC**: Shatrughan Chauhan (2014): undue delay is a ground for commutation; guidelines.','**For a time limit**: fairness, Art 21, certainty.','**Against**: complex cases need careful consideration; executive discretion.','**BNSS 2023**: fixes timelines for filing petitions and for prison authorities; still no limit for the President.'],
'A reasonable timeline with written reasons would balance mercy and justice.',
['**Shatrughan Chauhan (2014)**','**Kehar Singh (1989)**','**BNSS Sec 472**']);
M(2014,12.5,['council-of-ministers'],'The size of the cabinet should be as big as governmental work justifies and as big as the Prime Minister can manage as a team. How far is the efficacy of a government then inversely related to the size of the cabinet? Discuss.',
'The 91st Amendment capped the CoM at 15% of the LS (Art 75(1A)).',
['**Big cabinets**: coordination problems, coalition compulsions, fragmented ministries, cost.','**Small cabinets**: efficiency, but overload and concentration of power.','**Evidence**: "minimum government, maximum governance" (2014), ministries merged; States\' parliamentary secretaries to bypass the cap.'],
'Efficacy depends on organisation, coordination (cabinet committees) and capacity, not just size.',
['**91st Amendment**','**2nd ARC**: ministries to be grouped','**NCRWC**: 10% cap']);

/* 2015 */
M(2015,12.5,['dpsp'],'Discuss the possible factors that inhibit India from enacting for its citizens a uniform civil code as provided for in the Directive Principles of State Policy.',
'Art 44 directs the State to endeavour to secure a UCC. Goa has one; Uttarakhand enacted the first State UCC (2024, in force 2025).',
['**Factors**: religious diversity and minority fears, Art 25–26 freedoms, political sensitivity, lack of consensus, tribal customary laws (Art 371A, Sixth Schedule), federalism (Concurrent List).','**Courts**: Shah Bano (1985), Sarla Mudgal (1995), Shayara Bano (2017) urged reform.','**Law Commission (2018)**: "neither necessary nor desirable at this stage"; suggested reforming personal laws.'],
'A UCC should be built through consensus, gender justice and gradual codification.',
['**Shah Bano (1985)**','**Sarla Mudgal (1995)**','**21st Law Commission (2018)**','**Uttarakhand UCC (2025)**']);
M(2015,12.5,['president','governor'],'Resorting to ordinances has always raised concern on violation of the spirit of separation of power doctrine. While noting the rationales justifying the power to promulgate, analyse whether the decisions of the Supreme Court on the issue have further facilitated to resort to this power. Should the power to promulgate the ordinances be repealed?',
'Arts 123 and 213 allow the President and Governors to legislate when the legislature is not in session.',
['**Rationale**: urgency, unforeseen situations.','**Concerns**: bypassing Parliament (e.g. Land Acquisition ordinance re-promulgated 2015), executive law-making.','**SC**: Cooper (1970) justiciable; D.C. Wadhwa (1987) re-promulgation fraud; Krishna Kumar Singh (2017) stricter scrutiny; so the SC has curbed, not facilitated.','**Repeal?** No; restrict through conventions, time limits and laying requirements.'],
'Retain the power with stronger safeguards and political restraint.',
['**D.C. Wadhwa (1987)**','**Krishna Kumar Singh (2017)**']);
M(2015,12.5,['fundamental-rights','judicial-activism'],'Does the right to clean environment entail legal regulations on burning crackers during Diwali? Discuss in the light of Article 21 of Indian Constitution and Judgement(s) of the apex court in this regard.',
'Art 21 includes the right to a pollution-free environment (Subhash Kumar, 1991).',
['**Yes**: health impacts, PM2.5 spikes; precautionary principle; Art 48A and 51A(g).','**SC**: Arjun Gopal (2018): green crackers, time limits; bans in Delhi NCR.','**Balance**: Art 25 (religion) and Art 19(1)(g) (trade) vs health; essential practice test.'],
'Regulation (not blanket bans) consistent with proportionality.',
['**Arjun Gopal (2018)**','**Subhash Kumar (1991)**','**M.C. Mehta** series']);

/* 2016 */
M(2016,12.5,['preamble'],'Discuss each adjective attached to the word "Republic" in the "Preamble". Are they defendable in the present circumstances?',
'The Preamble describes India as Sovereign, Socialist, Secular, Democratic Republic.',
['**Sovereign**: independent internally and externally; global interdependence doesn\'t dilute it.','**Socialist**: welfare State, mixed economy; post-1991 still relevant (Dr Balram Singh, 2024).','**Secular**: equal respect; challenges from communalism.','**Democratic**: free elections, rights; challenges: money, criminalisation.','**Republic**: elected head.'],
'All remain defensible as normative goals; their content evolves.',
['**Kesavananda (1973)**','**S.R. Bommai (1994)**','**Dr Balram Singh (2024)**']);
M(2016,12.5,['cag'],'Exercise of CAG\'s powers in relation to the accounts of the Union and the States is derived from Article 149 of the Indian Constitution. Discuss whether audit of the Government\'s policy implementation could amount to overstepping its own (CAG) jurisdiction.',
'Art 149 and the CAG (DPC) Act 1971 define the CAG\'s duties.',
['**Performance audit**: efficiency, economy, effectiveness; recognised in practice and by courts (Arvind Gupta, 2013).','**Not overstepping**: auditing implementation, not policy choice; accountability to Parliament.','**Concerns**: "presumptive loss" (2G), policy second-guessing.'],
'Performance audit is legitimate as long as it evaluates implementation, not policy wisdom.',
['**Arvind Gupta (2013)**','2G, coal audits']);
M(2016,12.5,['union-territories'],'Discuss the essentials of the 69th Constitutional Amendment Act and anomalies, if any, that have led to recent reported conflicts between the elected representatives and the institution of the Lieutenant Governor in the administration of Delhi. Do you think that this will give rise to a new trend in the functioning of the Indian federal politics?',
'The 69th Amendment (1991) inserted Arts 239AA and 239AB.',
['**Essentials**: Assembly, CoM, reserved subjects (police, public order, land), LG–CoM difference referred to President.','**Anomalies**: "any matter" referral, services ambiguity, dual control.','**Judgments**: GNCTD 2018, 2023; GNCTD Amendment Acts 2021, 2023.','**Trend**: asymmetric federalism; contest between elected governments and nominated heads (Governors too).'],
'Clarity through law and conventions; possibly a fresh look at Delhi\'s status.',
['**GNCTD v Union (2018, 2023)**','**Balakrishnan Committee**']);
M(2016,12.5,['jammu-kashmir'],'To what extent is Article 370 of the Indian Constitution, bearing a marginal note "Temporary provision with respect to the State of Jammu and Kashmir", temporary? Discuss the future prospects of this provision in the context of Indian polity.',
'Art 370 was placed in Part XXI as a temporary provision.',
['**Arguments for permanence (pre-2019)**: Constituent Assembly dissolved without recommending abrogation (Sampat Prakash).','**Temporary**: marginal note; gradual integration through Presidential Orders.','**Update**: abrogated in Aug 2019; upheld in Dec 2023 (In Re Art 370).'],
'(Updated answer) Art 370 is now inoperative; future questions concern statehood and democratic restoration.',
['**In Re Art 370 (2023)**','**Prem Nath Kaul (1959)**']);
M(2016,12.5,['historical-background','federal-system'],'Did the Government of India Act, 1935 lay down a federal constitution? Discuss.',
'The 1935 Act proposed an All-India Federation.',
['**Federal features**: three lists, provincial autonomy, Federal Court, bicameral federal legislature.','**Non-federal**: federation never came into being; Governor-General\'s special powers; residuary powers with GG; dyarchy at the Centre not implemented.'],
'A federal blueprint, but not a functioning federation; it shaped the 1950 Constitution.',
['Nehru: "a machine with strong brakes but no engine"']);

/* 2017 */
M(2017,10,['one-nation-one-election'],'"Simultaneous election to the Lok Sabha and the State Assemblies will limit the amount of time and money spent in electioneering but it will reduce the government\'s accountability to the people." Discuss.',
'Simultaneous elections were held until 1967.',
['**Benefits**: cost, MCC paralysis, administrative efficiency.','**Accountability concern**: fewer elections; State issues subsumed; fixed terms vs confidence.','**Proposals**: Law Commission (1999, 2018), Kovind Committee (2024), 129th Amendment Bill.'],
'A careful design (constructive no-confidence, safeguards) can preserve accountability.',
['**Kovind Committee (2024)**','**129th Amdt Bill (2024)**']);
M(2017,15,['fundamental-rights'],'Examine the scope of Fundamental Rights in the light of the latest judgement of the Supreme Court on Right to Privacy.',
'K.S. Puttaswamy (2017, 9 judges) declared privacy a fundamental right.',
['**Holding**: privacy under Art 21 and Part III; overruled M.P. Sharma and Kharak Singh.','**Tests**: legality, legitimate aim, proportionality.','**Impact**: Navtej (2018), Joseph Shine (2018), Aadhaar (2018), data protection (DPDP Act 2023), surveillance (Pegasus committee, 2021).'],
'Puttaswamy expanded FRs to informational and decisional autonomy; implementation depends on robust data protection.',
['**Puttaswamy (2017)**','**DPDP Act 2023**']);
M(2017,10,['parliamentary-committees'],'Discuss the role of Public Accounts Committee in establishing accountability of the government to the people.',
'The PAC (1921) examines CAG audit reports.',
['**Role**: ensures money spent as authorised; examines irregularities; 22 members; Opposition chair.','**Impact**: 2G, CWG reports.','**Limits**: post-mortem, advisory, no expert staff beyond CAG.'],
'Strengthen with timely CAG reports and follow-up (Action Taken Reports).',
['**CAG**: friend, philosopher and guide']);
M(2017,15,['supreme-court','basic-structure'],'Critically examine the Supreme Court\'s judgement on "National Judicial Appointments Commission Act, 2014" with reference to appointment of judges of higher judiciary in India.',
'The 99th Amendment created the NJAC; struck down in 2015 (4:1).',
['**Holding**: judicial primacy is part of independence; eminent persons and Law Minister could veto.','**Criticism**: collegium opacity; judges appointing judges.','**After**: MoP impasse; collegium publishing reasons (2017–).'],
'A transparent collegium or a reformed commission with judicial majority.',
['**Fourth Judges case (2015)**','**Justice Chelameswar\'s dissent**']);

/* 2018 */
M(2018,10,['emergency'],'Under what circumstances can the Financial Emergency be proclaimed by the President of India? What consequences follow when such a declaration remains in force?',
'Art 360.',
['**Grounds**: threat to financial stability or credit of India or any part.','**Approval**: both Houses within 2 months, simple majority; indefinite once approved.','**Consequences**: directions to States, salary cuts including judges, Money Bills reserved.','Never used.'],
'A last-resort provision with federal implications.',
['**Art 360**']);
M(2018,10,['parliamentary-committees'],'Why do you think the committees are considered to be useful for parliamentary work? Discuss, in this context, the role of the Estimates Committee.',
'Committees as "mini-Parliaments".',
['**Usefulness**: expertise, time, bipartisanship, detailed scrutiny.','**Estimates Committee**: 30 LS members; examines estimates; suggests economies.','**Limits**: post-vote examination, advisory.'],
'Committees should be strengthened with research support.',
['**PRS** data on committee referrals']);
M(2018,15,['panchayati-raj'],'Assess the importance of the Panchayat system in India as a part of local government. Apart from government grants, what sources the Panchayats can look out for financing developmental projects?',
'73rd Amendment, Part IX.',
['**Importance**: grassroots democracy, participation, women\'s leadership.','**Own sources**: property tax, user charges, fees, markets, CSR, community contributions, PPP.','**Issues**: low own revenue.'],
'Fiscal decentralisation is key.',
['**15th FC** grants','**eGramSwaraj**']);
M(2018,15,['election-commission','electoral-reforms'],'In the light of recent controversy regarding the use of Electronic Voting Machines (EVM), what are the challenges before the Election Commission of India to ensure the trustworthiness of elections in India?',
'EVMs used since 2004 nationally; VVPAT since 2013.',
['**Challenges**: public trust, VVPAT counting, transparency, misinformation.','**Steps**: VVPAT in all seats, randomisation, mock polls.','**SC**: ADR v ECI (2024).'],
'Trust requires transparency and audits.',
['**ADR v ECI (2024)**']);
M(2018,15,['union-territories'],'Whether the Supreme Court Judgement (July 2018) can settle the political tussle between the Lt. Governor and elected government of Delhi? Examine.',
'GNCTD v Union (2018).',
['**Holding**: LG bound by aid and advice except reserved subjects.','**Limits**: services left open → 2023 judgment → 2023 Act.'],
'Not fully; legislation reopened the contest.',
['**GNCTD 2018, 2023**']);
M(2018,15,['finance-commission'],'How is the Finance Commission of India constituted? What do you know about the terms of reference of the recently constituted Finance Commission? Discuss.',
'Art 280.',
['**Constitution**: President, chairman + 4, qualifications by Parliament.','**15th FC ToR**: 2011 census, performance incentives, defence fund.','**16th FC**: 41% retained (2026).'],
'FC remains central to fiscal federalism.',
['**15th FC**','**16th FC**']);
M(2018,15,['ncsc'],'Whether National Commission for Scheduled Castes (NCSC) can enforce the implementation of constitutional reservation for the Scheduled Castes in the religious minority institutions? Examine.',
'Art 338; Art 30 minority rights; Art 15(5) excludes minority institutions.',
['**NCSC powers**: investigate, civil court powers, recommend.','**Limits**: cannot enforce reservation where Art 15(5) excludes minority institutions.'],
'NCSC cannot enforce; it can investigate discrimination.',
['**Art 15(5)**','**Pramati (2014)**']);

/* 2019 */
M(2019,15,['basic-structure','amendment'],'"Parliament\'s power to amend the Constitution is a limited power and it cannot be enlarged into absolute power." In the light of this statement explain whether Parliament under Article 368 of the Constitution can destroy the Basic Structure of the Constitution by expanding its amending power?',
'Art 368; basic structure.',
['**Kesavananda**, **Minerva Mills**: limited amending power is basic.','42nd Amendment\'s 368(4),(5) struck down.'],
'No; Parliament cannot expand its own power.',
['**Minerva Mills (1980)**']);
M(2019,10,['centre-state-relations','judicial-review'],'From the resolution of contentious issues regarding distribution of legislative powers by the courts, "Principle of Federal Supremacy" and "Harmonious Construction" have emerged. Explain.',
'Art 246, Seventh Schedule.',
['**Federal supremacy**: Union List prevails (Art 246, 254).','**Harmonious construction**: read entries to avoid conflict.','**Pith and substance**, colourable legislation.'],
'Judicial doctrines keep federal balance.',
['**F.N. Balsara (1951)**','**MADA v SAIL (2024)**']);
M(2019,10,['comparison-constitutions','preamble'],'What can France learn from the Indian Constitution\'s approach to secularism?',
'French laïcité vs Indian positive secularism.',
['**India**: equal respect, State can reform, minority rights.','**France**: strict separation, headscarf bans.','**Lessons**: accommodation, pluralism.'],
'Contextual secularism fosters inclusion.',
['**S.R. Bommai**']);
M(2019,10,['parliamentary-system'],'Do you think that Constitution of India does not accept principle of strict separation of powers rather it is based on the principle of "checks and balance"? Explain.',
'Separation of powers is basic structure (Indira Gandhi 1975), but not strict.',
['Overlaps: executive in legislature, ordinances, judicial review, impeachment.'],
'Checks and balances define India.',
['**Ram Jawaya Kapur (1955)**']);
M(2019,10,['tribunals'],'"The Central Administrative Tribunal which was established for redressal of grievances and complaints by or against central government employees, nowadays is exercising its powers as an independent judicial authority." Explain.',
'Art 323A; CAT (1985).',
['Judicial members, independence; L. Chandra Kumar (HC review).'],
'CAT functions as a court of first instance.',
['**L. Chandra Kumar (1997)**']);
M(2019,10,['parliament'],'Individual Parliamentarian\'s role as the national lawmaker is on a decline, which in turn, has adversely impacted the quality of debates and their outcome. Discuss.',
'Decline of Parliament.',
['Whips, anti-defection, fewer sittings, disruptions.'],
'Reforms needed.',
['PRS data']);
M(2019,10,['election-laws'],'On what grounds a people\'s representative can be disqualified under the Representation of People Act, 1951? Also mention the remedies available to such person against his disqualification.',
'RPA Secs 8–11.',
['Conviction, corrupt practices, contracts, expense accounts; remedies: appeal, stay of conviction, ECI Sec 11.'],
'Balance probity and fairness.',
['**Lily Thomas (2013)**']);
M(2019,15,['panchayati-raj','municipalities'],'"The reservation of seats for women in the institutions of local self-government has had a limited impact on the patriarchal character of the Indian political process." Comment.',
'73rd/74th Amendments: 1/3 (50% in many States).',
['Proxy representation vs real empowerment.'],
'Capacity building and action against proxies.',
['**MoPR advisory (2023–25)**']);

/* 2020 */
M(2020,15,['federal-system'],'Indian Constitution exhibits centralising tendencies to maintain unity and integrity of the nation. Elucidate in the perspective of the Epidemic Diseases Act, 1897; The Disaster Management Act, 2005 and recently passed Farm Acts.',
'Centralising tendencies.',
['COVID-19 use of DM Act; Farm Acts (2020) on State subjects; repealed 2021.'],
'Unity needs co-operation, not only centralisation.',
['**DM Act 2005**']);
M(2020,15,['judicial-activism'],'Judicial Legislation is antithetical to the doctrine of separation of powers as envisaged in the Indian Constitution. In this context justify the filing of large number of public interest petitions praying for issuing guidelines to executive authorities.',
'PIL and judicial guidelines.',
['Vishaka, D.K. Basu, Prakash Singh; overreach concerns.'],
'Guidelines are interim and fill vacuums.',
['**Vishaka (1997)**']);
M(2020,10,['parliament'],'"Once a Speaker, Always a Speaker"! Do you think this practice should be adopted to impart objectivity to the office of the Speaker of Lok Sabha? What could be its implications for the robust functioning of parliamentary business in India?',
'British convention.',
['Neutrality; Tenth Schedule decisions; implications.'],
'Adopt with safeguards.',
['**Kihoto Hollohan**']);
M(2020,10,['federal-system'],'How far do you think cooperation, competition and confrontation have shaped the nature of federation in India? Cite some recent examples to validate your answer.',
'Three Cs of federalism.',
['GST Council (co-operation); indices (competition); Governor, CBI consent (confrontation).'],
'A mix; trust-building needed.',
['**Mohit Minerals (2022)**']);
M(2020,15,['parliament'],'Rajya Sabha has been transformed from a "useless stepney tyre" to the most useful supporting organ in past few decades. Highlight the factors as well as the areas in which this transformation could be visible.',
'RS role.',
['Coalition era, revising chamber, committees.'],
'RS adds deliberation.',
['**Money Bill debate**']);
M(2020,15,['welfare-schemes-vulnerable'],'Which steps are required for constitutionalization of a commission? Do you think imparting constitutionality to the National Commission for Women would ensure greater gender justice and empowerment in India? Give reasons.',
'Constitutional amendment (like NCBC).',
['NCW powers; constitutional status alone not enough.'],
'Powers and resources matter more.',
['**102nd Amendment**']);
M(2020,10,['election-laws'],'"There is a need for simplification of procedure for disqualification of persons found guilty of corrupt practices under the Representation of Peoples Act." Comment.',
'Sec 8A RPA.',
['Delays; President on ECI opinion.'],
'Time-bound procedure.',
['**Law Commission 255th**']);

/* 2021 */
M(2021,10,['basic-structure','preamble'],'"Constitutional Morality" is rooted in the Constitution itself and is founded on its essential facets. Explain the doctrine of "Constitutional Morality" with the help of relevant judicial decisions.',
'Constitutional morality.',
['Navtej (2018), Sabarimala (2018), NCT Delhi (2018).'],
'Guides interpretation.',
['**Navtej (2018)**']);
M(2021,10,['comparison-constitutions','fundamental-rights'],'Analyse the distinguishing features of the notion of Equality in the Constitutions of the USA and India.',
'Equality in India vs USA.',
['India: substantive equality, reservations; USA: equal protection, affirmative action limits (SFFA v Harvard, 2023).'],
'India more substantive.',
['**Indra Sawhney**']);
M(2021,15,['state-legislature'],'Explain the constitutional provisions under which Legislative Councils are established. Review the working and current status of Legislative Councils with suitable illustrations.',
'Arts 168–169.',
['Six States; AP saga.'],
'Uniform policy needed.',
['**Art 169**']);
M(2021,15,['parliamentary-committees'],'Do Department-related Parliamentary Standing Committees keep the administration on its toes and inspire reverence for parliamentary control? Evaluate the working of such committees with suitable examples.',
'24 DRSCs since 1993.',
['Budget scrutiny; falling referrals.'],
'Mandatory referrals.',
['PRS data']);
M(2021,10,['parliament'],'To what extent, in your view, the Parliament is able to ensure accountability of the executive in India?',
'Parliamentary accountability.',
['Questions, motions, committees; limits.'],
'Partial; reforms.',
['NCRWC']);
M(2021,15,['supreme-court'],'Discuss the desirability of greater representation to women in the higher judiciary to ensure diversity, equity and inclusiveness.',
'Women in judiciary.',
['Few women SC judges; Nagarathna as CJI in 2027.'],
'Diversity improves legitimacy.',
['**Collegium**']);
M(2021,15,['ngos-shgs'],'Can Civil Society and Non-Governmental Organisations present an alternative model of public service delivery to benefit the common citizen? Discuss the challenges of this alternative model.',
'Civil society in service delivery.',
['Examples; FCRA, accountability challenges.'],
'Complement, not substitute.',
['**FCRA 2020**']);

/* 2022 */
M(2022,10,['vice-president'],'Discuss the role of the Vice-President of India as the Chairman of the Rajya Sabha.',
'Art 64.',
['Presiding role, neutrality, casting vote.'],
'Impartiality is key.',
['2024 removal notice']);
M(2022,15,['election-laws'],'Discuss the procedures to decide the disputes arising out of the election of a Member of the Parliament or State Legislature under The Representation of the People Act, 1951. What are the grounds on which the election of any returned candidate may be declared void? What remedy is available to the aggrieved party against the decision? Refer to the case laws.',
'RPA Part VI.',
['HC petition, grounds Sec 100, appeal to SC.'],
'Speedier disposal.',
['**Abhiram Singh (2017)**']);
M(2022,15,['fundamental-rights'],'"Right to privacy is intrinsic to life and personal liberty and is inherently protected under Article 21 of the constitution." Explain. In this context, discuss the law relating to D.N.A. testing of child in the womb to establish its paternity.',
'Puttaswamy.',
['Privacy; DNA testing only when necessary (Bhabani Prasad Jena, 2010).'],
'Balance.',
['**Puttaswamy**']);
M(2022,10,['governor'],'Discuss the essential conditions for exercise of the legislative powers by the Governor. Discuss the legality of re-promulgation of ordinances by the Governor without placing them before the Legislature.',
'Art 213.',
['Conditions; Krishna Kumar Singh (2017).'],
'Re-promulgation is a fraud.',
['**Krishna Kumar Singh (2017)**']);
M(2022,10,['judicial-activism'],'"The most significant achievement of modern law in India is the constitutionalization of environmental problems by the Supreme Court." Discuss this statement with the help of relevant case laws.',
'Environmental jurisprudence.',
['M.C. Mehta, Godavarman, Ranjitsinh (2024).'],
'Judiciary has shaped environmental law.',
['**M.K. Ranjitsinh (2024)**']);
M(2022,15,['comparison-constitutions','president'],'Critically examine the procedures through which the Presidents of India and France are elected.',
'Indirect vs direct.',
['India: electoral college, STV; France: direct, two rounds.'],
'Different system logics.',
['**Art 54, 55**']);

/* 2023 */
M(2023,15,['comparison-constitutions','parliament'],'Compare and contrast the British and Indian approaches to Parliamentary sovereignty.',
'UK: Dicey\'s parliamentary sovereignty; India: constitutional supremacy.',
['Written constitution, judicial review, federalism, basic structure.'],
'India blends both.',
['**Kesavananda**']);
M(2023,15,['parliamentary-committees'],'Explain the structure of the Parliamentary Committee system. How far have the financial committees helped in the institutionalisation of Indian Parliament?',
'Committees.',
['PAC, Estimates, COPU.'],
'Strengthen.',
['PAC reports']);
M(2023,15,['emergency'],'Account for the legal and political factors responsible for the reduced frequency of using Article 356 by the Union Governments since mid 1990s.',
'Art 356.',
['Bommai (1994), coalition era, judicial review, public opinion.'],
'Bommai changed practice.',
['**S.R. Bommai**']);
M(2023,15,['gst-council'],'Explain the significance of the 101st Constitutional Amendment Act. To what extent does it reflect the accommodative spirit of federalism?',
'GST.',
['Art 246A, 279A; GST Council; Mohit Minerals.'],
'Co-operative but centralising.',
['**Mohit Minerals (2022)**']);
M(2023,15,['state-legislature'],'Discuss the role of Presiding Officers of state legislatures in maintaining order and impartiality in conducting legislative work and in facilitating best democratic practices.',
'Speaker.',
['Order, Tenth Schedule, neutrality.'],
'Neutrality.',
['**Subhash Desai (2023)**']);
M(2023,15,['supreme-court'],'"Constitutionally guaranteed judicial independence is a prerequisite of democracy." Comment.',
'Judicial independence.',
['Tenure, salary, collegium, contempt.'],
'Essential.',
['**NJAC case**']);
M(2023,10,['subordinate-courts'],'Who are entitled to receive free legal aid? Assess the role of the National Legal Services Authority (NALSA) in rendering free legal aid in India.',
'Art 39A, LSA Act 1987.',
['Eligibility; Lok Adalats; LADCS.'],
'Expand reach.',
['**NALSA**']);

/* 2024 */
M(2024,10,['fundamental-rights'],'"The Constitution of India is a living instrument with capabilities of enormous dynamism. It is a constitution made for a progressive society." Illustrate with special reference to the expanding horizons of the right to life and personal liberty.',
'Living constitution.',
['Maneka, Puttaswamy, climate change (2024).'],
'Art 21 shows dynamism.',
['**Maneka Gandhi**']);
M(2024,15,['one-nation-one-election','electoral-reforms'],'Examine the need for electoral reforms as suggested by various committees with particular reference to "One Nation – One Election" principle.',
'Electoral reforms.',
['Goswami, Indrajit Gupta, Kovind.'],
'Balanced reforms.',
['**Kovind (2024)**']);
M(2024,15,['centre-state-relations'],'What changes has the Union Government recently introduced in the domain of Centre-State relations? Suggest measures to be adopted to build the trust between the Centre and the States and for strengthening federalism.',
'Recent changes.',
['GST, cesses, CBI consent, Governors.'],
'Trust-building.',
['**Punchhi**']);
M(2024,10,['cag'],'"The duty of the Comptroller and Auditor General is not merely to ensure the legality of expenditure but also its propriety." Comment.',
'CAG.',
['Legal, propriety, performance audits.'],
'Broader accountability.',
['**CAG Act 1971**']);

/* 2025 */
M(2025,10,['election-laws'],'Would the rising assets of legislators, beyond their known sources of income, amount to "undue influence" as a corrupt practice under the Representation of the People Act, 1951? Examine.',
'Sec 123(2) RPA defines undue influence as interference with the free exercise of electoral right.',
['Disproportionate assets are not per se undue influence; Sec 33A affidavits; Lok Prahari (2018): non-disclosure of assets of associates can be undue influence.'],
'Disclosure plus monitoring.',
['**Lok Prahari (2018)**']);
M(2025,10,['president','comparison-constitutions'],'Compare the pardoning powers of the President of India and the President of the USA. What are the limits on this power, and what are "pre-emptive pardons"?',
'Art 72 vs US Art II.',
['India: CoM advice, judicial review; USA: own discretion, pre-emptive pardons (Ford–Nixon 1974; 2025 pardons).'],
'India\'s model is more accountable.',
['**Maru Ram**','**Kehar Singh**']);
M(2025,15,['jammu-kashmir','union-territories'],'Discuss the nature of the Legislative Assembly of the Union Territory of Jammu and Kashmir after 2019, and its powers and functions.',
'J&K Reorganisation Act 2019.',
['90 seats, LG\'s powers, statehood.'],
'Limited powers.',
['**In Re Art 370**']);
M(2025,10,['attorney-general'],'Examine the responsibilities, rights and limitations of the office of the Attorney General of India.',
'Art 76.',
['Duties, rights, limitations.'],
'Independence matters.',
['**Art 76, 88, 105**']);
M(2025,15,['tribunals'],'Why are administrative tribunals needed alongside courts? Examine the impact of the Tribunals Reforms Act, 2021 on the rationalisation of tribunals.',
'Arts 323A, 323B.',
['Specialisation, speed; 2021 Act abolished tribunals; MBA cases; 2026 Act.'],
'Independence key.',
['**MBA (2021)**']);
M(2025,15,['amendment','basic-structure'],'Discuss the procedural and substantive limits on Parliament\'s power to amend the Constitution.',
'Art 368.',
['Procedural: special majority, ratification; substantive: basic structure.'],
'Balanced.',
['**Kesavananda**']);
M(2025,15,['finance-commission','centre-state-relations'],'How have Centre–State financial relations evolved under planned development, and how far have recent reforms affected fiscal federalism?',
'Fiscal federalism.',
['Planning Commission → NITI; GST; FCs.'],
'Mixed.',
['**16th FC**']);

window.PYQ_MAINS=Q;
})();

window.MAINS_TOOLKIT=[
{t:'🧭 Decode the demand word',b:'- **Discuss**: both sides, broad coverage.\n- **Examine / Analyse**: break into parts, find causes and effects.\n- **Critically examine / evaluate**: merits **and** demerits, then a reasoned judgement.\n- **Comment**: your opinion with evidence.\n- **Elucidate / Explain**: clarify with examples.\n- **To what extent / How far**: degree, with both sides.'},
{t:'🧱 The 3-part structure',b:'**Intro (2–3 lines)**: define the term, cite the Article, or give a recent hook (judgment, data, event).\n\n**Body (70%)**: 3–5 sub-headings matching every part of the question. Each point: claim + constitutional provision / case / committee / data.\n\n**Conclusion (2–3 lines)**: balanced, forward-looking; use a committee recommendation or constitutional value.'},
{t:'💎 Value-addition bank',b:'- **Articles**: always cite the precise Article.\n- **Cases**: Kesavananda, Maneka, Bommai, Puttaswamy, Indra Sawhney, Minerva Mills.\n- **Committees**: Sarkaria, Punchhi, NCRWC, 2nd ARC, Law Commission.\n- **Data**: PRS sitting days, NJDG pendency, ADR criminal records.\n- **Quotes**: Ambedkar, Granville Austin.'},
{t:'⏱️ Time and words',b:'- **10-marker**: 150 words, **7 minutes**.\n- **15-marker**: 250 words, **11 minutes**.\n- 20 questions in 3 hours = no time to waste. Practise with the timer here.'},
{t:'✍️ Presentation',b:'- Underline keywords sparingly.\n- Use flowcharts or tables for comparisons (e.g. NCSC vs NCST).\n- Short paragraphs; numbered points.\n- Never leave a question unattempted.'},
{t:'🔄 Recent developments to quote (2024–26)',b:'- **Presidential Reference (Nov 2025)** on Governor\'s assent.\n- **16th FC (2026)**: 41%.\n- **SIR verdict (2026)**.\n- **131st Bill defeat (2026)**.\n- **Electoral bonds (2024)**, **Sita Soren (2024)**, **Davinder Singh (2024)**.\n- **New criminal laws (2024)**, **Tribunals Reforms Act (2026)**.'},
];
