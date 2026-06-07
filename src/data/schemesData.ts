export interface Scheme {
  id: string;
  name: string;
  tagline: string;
  category: "Agriculture" | "Housing" | "Health" | "Business" | "Education" | "Welfare" | "Pensions" | "Citizen ID";
  state: string;
  benefitDescription: string;
  approximateValue: number;
  documentsRequired: string[];
  description: string;
  officialPortal: string;
  helpline: string;
  responsibleMinistry: string;
  rejectionReasons: { reason: string; correction: string; timeline: string }[];
  rules: {
    minAge?: number;
    maxAge?: number;
    maxIncome?: number;
    occupations?: string[];
    genders?: string[];
    categories?: string[];
    states?: string[];
  };
}

export interface DocumentInfo {
  name: string;
  purpose: string;
  whereToApply: string;
  officialPortal: string;
  fee: string;
  processingTime: string;
  requiredProofDocs: string[];
  commonRejections: string[];
  proTip: string;
}

export const SCHEMES_DATABASE: Scheme[] = [
  {
    id: "pm-kisan",
    name: "PM-KISAN Samman Nidhi",
    tagline: "Direct Income Support for Small & Marginal Farmers",
    category: "Agriculture",
    state: "All India",
    benefitDescription: "₹6,000 per year paid in three equal installments of ₹2,000",
    approximateValue: 6000,
    documentsRequired: ["Aadhaar Card", "Land Mutation Records (Khatauni)", "Bank Account (Aadhaar Seeded)", "Mobile Number Linked to Aadhaar"],
    description: "Direct Benefit Transfer (DBT) safety net to support agricultural landholding families for purchasing inputs.",
    officialPortal: "https://pmkisan.gov.in",
    helpline: "155261 / 1800-115-526",
    responsibleMinistry: "Ministry of Agriculture and Farmers Welfare",
    rejectionReasons: [
      {
        reason: "Land records not in applicant's name / Mutation pending",
        correction: "Submit updated Mutation Copy (Fard/Khatauni) from the Tehsildar or Revenue Dept showing the applicant's name directly.",
        timeline: "15–30 Days"
      },
      {
        reason: "Aadhaar status not seeded in bank / PFMS rejection",
        correction: "Submit Aadhaar DBT Seeding Form to your local bank manager. Verify state on PFMS portal.",
        timeline: "7–10 Days"
      },
      {
        reason: "Name mismatch between Aadhaar card, Land Record, and Bank Account",
        correction: "Update name on Aadhaar or submit a certified affidavit from Executive Magistrate resolving the spelling variance.",
        timeline: "7–14 Days"
      }
    ],
    rules: {
      occupations: ["Farmer"],
      maxIncome: 250000
    }
  },
  {
    id: "ayushman-bharat",
    name: "Ayushman Bharat PM-JAY",
    tagline: "National Health Protection Mission",
    category: "Health",
    state: "All India",
    benefitDescription: "₹5,00,000 per family per year for secondary & tertiary hospitalization",
    approximateValue: 500000,
    documentsRequired: ["Aadhaar Card", "Ration Card (NFSA)", "SECC 2011 Inclusion Proof / PMJAY Letter"],
    description: "The world's largest government-funded health assurance scheme covering cashless treatment at empanelled public & private hospitals.",
    officialPortal: "https://pmjay.gov.in",
    helpline: "14555 / 1800-111-565",
    responsibleMinistry: "Ministry of Health and Family Welfare / National Health Authority",
    rejectionReasons: [
      {
        reason: "Name missing from SECC-2011 Database / NFSA list",
        correction: "If eligible, link Ration card with NFSA state portal, or present verified Gram Sabha resolution for inclusion.",
        timeline: "30 Days"
      },
      {
        reason: "Gender or Age mismatch against old 2011 survey data",
        correction: "Apply for a Correction request with the local Ayushman Mitra at any general empanelled district hospital by showcasing matching Aadhaar.",
        timeline: "3–5 Days"
      }
    ],
    rules: {
      maxIncome: 180000
    }
  },
  {
    id: "pmay-g",
    name: "Pradhan Mantri Awas Yojana (Gramin)",
    tagline: "Housing for All (Rural)",
    category: "Housing",
    state: "All India",
    benefitDescription: "Financial assistance of ₹1.2 Lakh (Plains) to ₹1.3 Lakh (Hilly/Difficult areas) + ₹12,000 toilet subsidy",
    approximateValue: 142000,
    documentsRequired: ["Aadhaar Card", "Bank Account Passbook", "Ration Card", "MGNREGA Job Card", "Consent for Aadhaar Usage"],
    description: "Financial assistance to rural households living in kutcha or dilapidated houses for construction of durable pucca houses.",
    officialPortal: "https://pmayg.nic.in",
    helpline: "1800-11-6446 / 1800-11-8111",
    responsibleMinistry: "Ministry of Rural Development",
    rejectionReasons: [
      {
        reason: "Owning a two/three/four-wheeler or motorized boat",
        correction: "If vehicle is commercial/rented or database has stale records, file an appeal to BDO with self-declaration form verified by Gram Panchayat.",
        timeline: "20 Days"
      },
      {
        reason: "Applicant already listed as owner of a permanent pucca house",
        correction: "Submit photo verification of current dilapidated housing via state georeferencing app and a Panchayat certificate.",
        timeline: "15 Days"
      }
    ],
    rules: {
      maxIncome: 120000
    }
  },
  {
    id: "pm-mudra",
    name: "Pradhan Mantri MUDRA Yojana",
    tagline: "Collateral-Free Institutional Funding for Micro-Enterprises",
    category: "Business",
    state: "All India",
    benefitDescription: "Mudra Loans up to ₹10 Lakh (Shishu up to ₹50K, Kishor up to ₹5L, Tarun up to ₹10L)",
    approximateValue: 500000,
    documentsRequired: ["Aadhaar Card", "PAN Card", "Business Address Proof (electricity bill, rent agreement)", "Business Plan / Project Quotation", "Bank Statement (Last 6 Months)"],
    description: "Enables micro-enterprises to access commercial bank loans for starting or expanding non-farm businesses without providing collateral.",
    officialPortal: "https://www.mudra.org.in",
    helpline: "1800-180-1111 / 1800-345-1200",
    responsibleMinistry: "Ministry of Finance",
    rejectionReasons: [
      {
        reason: "Lack of a detailed business plan / quotation documentation",
        correction: "Utilize Mudra's standard template to detail projected profits, machine quotation from GST registered dealer, and expected output.",
        timeline: "5–10 Days"
      },
      {
        reason: "Poor individual bureau credit rating statement (CIBIL score)",
        correction: "Clear any current default/NPA indicators and produce statements proving resolution of previous trade debts.",
        timeline: "15 Days"
      }
    ],
    rules: {
      minAge: 18,
      maxAge: 65,
      occupations: ["Self Employed / Business"]
    }
  },
  {
    id: "mgnregs",
    name: "MGNREGS (Job Card)",
    tagline: "Guaranteed Climate & Social Protection Work",
    category: "Welfare",
    state: "All India",
    benefitDescription: "Guaranteed 100 days of manual wage employment per fiscal year per household",
    approximateValue: 24000,
    documentsRequired: ["Aadhaar Card", "Passport Sized Photograph", "Bank Savings Passbook", "Proof of Residence"],
    description: "Rights-based safety net guaranteeing legal right to work to rural adults willing to do casual, unskilled manual labor near their homes.",
    officialPortal: "https://nrega.nic.in",
    helpline: "1800-111-555 / 1800-110-707",
    responsibleMinistry: "Ministry of Rural Development",
    rejectionReasons: [
      {
        reason: "Address listed as Urban municipal area on database",
        correction: "Submit corrected Gram Panchayat residence certificate or Domicile confirming rural block boundaries.",
        timeline: "7 Days"
      },
      {
        reason: "No active bank account linked for wage DBT processing",
        correction: "Open a zero-balance PM Jan Dhan Account at nearest Post Office or bank, and provide account details with biometric verification.",
        timeline: "3 Days"
      }
    ],
    rules: {
      minAge: 18
    }
  },
  {
    id: "orunodoi",
    name: "Orunodoi 2.0 (Assam)",
    tagline: "Primary Financial Safety Net for Female Household Heads",
    category: "Welfare",
    state: "Assam",
    benefitDescription: "Direct cash transfer of ₹1,250 per month to bank account of designated female head",
    approximateValue: 15000,
    documentsRequired: ["Assam Domicile Certificate", "Aadhaar Card", "Ration Card (Priority Household)", "Bank Passbook showing Female Name", "Income Certificate (< ₹2 Lakh/year)"],
    description: "The largest welfare entitlement program in Assam's history, targeting economic stability for vulnerable, female-headed families.",
    officialPortal: "https://orunodoi.assam.gov.in",
    helpline: "1800-345-3611",
    responsibleMinistry: "Finance Department, Government of Assam",
    rejectionReasons: [
      {
         reason: "Selected bank account is a general joint account with a male member",
         correction: "Produce an exclusive individual bank account passbook registered solely under the female head's name.",
         timeline: "5 Days"
      },
      {
        reason: "Household owns an active 4-wheeler or tractor",
        correction: "If the vehicle does not belong to the primary family or was sold, submit official RTO transaction details confirming disposal.",
        timeline: "14 Days"
      }
    ],
    rules: {
      genders: ["Female"],
      states: ["Assam"],
      maxIncome: 200000
    }
  },
  {
    id: "ishan-uday",
    name: "Ishan Uday Scholarship for NER",
    tagline: "Higher Education Merit-cum-Means Scheme for Northeast Students",
    category: "Education",
    state: "Northeast Only",
    benefitDescription: "₹5,400/month for General degree and ₹7,800/month for Professional/Technical programs",
    approximateValue: 78000,
    documentsRequired: ["Northeast State Domicile Certificate", "Income Certificate (< ₹4.5 Lakh/year)", "Class 12 Marksheet", "College Admission letter with fee receipt", "Joint Declaration signed by Head of Institution"],
    description: "A flagship incentive by University Grants Commission (UGC) to promote professional/technical higher education among Northeast youths.",
    officialPortal: "https://scholarships.gov.in",
    helpline: "0120-6619540",
    responsibleMinistry: "Ministry of Education / University Grants Commission (UGC)",
    rejectionReasons: [
      {
        reason: "Institution not recognized under UGC Act section 2(f) and 12(B)",
        correction: "Obtain official certification or shift application status to regular affiliated colleges of a recognized central/state university.",
        timeline: "15 Days"
      },
      {
        reason: "Income certificate issued by unauthorized authority",
        correction: "Provide fresh income document strictly stamped by Circle Officer, Tehsildar, or SDM. Notary affidavits are invalid.",
        timeline: "10 Days"
      }
    ],
    rules: {
      states: ["Assam", "Arunachal Pradesh", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Sikkim", "Tripura"],
      occupations: ["Student"],
      maxIncome: 450000
    }
  },
  {
    id: "lakhpati-baideo",
    name: "Lakhpati Baideo Scheme (Assam)",
    tagline: "Empowering Rural Women towards Micro-Entrepreneurship",
    category: "Business",
    state: "Assam",
    benefitDescription: "₹35,000 entrepreneurship grant given in phases + business support worth ₹1,00,000 target",
    approximateValue: 35000,
    documentsRequired: ["Self-Help Group (SHG) Membership Certificate", "Livelihood Development Plan", "Aadhaar Card", "Assam Domicile Certificate", "Bank Passbook"],
    description: "Support for rural women SHG members to scale up enterprise plans and achieve sustainable annual household incomes exceeding ₹1 Lakh.",
    officialPortal: "https://asrlms.assam.gov.in",
    helpline: "1800-345-3611",
    responsibleMinistry: "Assam State Rural Livelihoods Mission / Govt of Assam",
    rejectionReasons: [
      {
        reason: "SHG details not updated on Panchasutra or SRLM Central Portal",
        correction: "Submit updated SHG resolutions with signature of the block coordinator to reflect active standing on ASRLMS port.",
        timeline: "7–14 Days"
      }
    ],
    rules: {
      genders: ["Female"],
      states: ["Assam"],
      occupations: ["SHG Member"]
    }
  }
];

export const DOCUMENT_GUIDELINES: DocumentInfo[] = [
  {
    name: "Aadhaar Card",
    purpose: "Fundamental national biometric identity and resident proof.",
    whereToApply: "Nearest authorized Aadhaar Enrolment Centre or online via UIDAI portal for minor demographic updates.",
    officialPortal: "https://uidai.gov.in",
    fee: "Free for first-time enrollment. ₹50 for demographic updates, ₹100 for biometric updates.",
    processingTime: "15 to 30 Days",
    requiredProofDocs: ["Proof of Identity (Voter ID, School Marksheet)", "Proof of Address (Ration Card, Electricity Bill, Bank Statement)"],
    commonRejections: ["Biometric mismatch or blur during fingerprint capture.", "Supporting documents not meeting official list standards.", "Inconsistent date of birth format."],
    proTip: "Keep your mobile number linked to Aadhaar. This is the single most important enabler for online DBT consent verification."
  },
  {
    name: "PAN Card",
    purpose: "Mandatory for taxation audits, major banking, and Mudra/start-up business credit facilities.",
    whereToApply: "Protean (formerly NSDL) or UTIITSL online portal, or physical PAN centers.",
    officialPortal: "https://www.onlineservices.nsdl.com",
    fee: "₹107 (Physical card within India), ₹72 (e-PAN only)",
    processingTime: "7 to 10 Days for physical; 10 minutes for Instant e-PAN via Aadhaar e-KYC",
    requiredProofDocs: ["Aadhaar Card linking with active mobile number for authentication matching."],
    commonRejections: ["Name spelling in parent documents does not match Aadhaar exactly.", "Signature image or photo upload is blurry or unrecognized."],
    proTip: "If you have an active Aadhaar card with updated mobile, use the income tax portal to get a free digital e-PAN instantly!"
  },
  {
    name: "Voter ID (EPIC)",
    purpose: "Legal proof of adult age, Indian citizenship, and physical constituency domicile.",
    whereToApply: "Voter Service Portal or mobile Voter Helpline App.",
    officialPortal: "https://voters.eci.gov.in",
    fee: "Free",
    processingTime: "15 to 30 Days",
    requiredProofDocs: ["Age Proof (10th pass sheet, Birth Certificate)", "Address Proof (Ration Card, Water / Gas bill)"],
    commonRejections: ["Uploaded photo does not meet specifications (must be white background).", "Constituency address match error during physical BLO visit."],
    proTip: "Download your e-EPIC digital copy. It holds the same legal validity as a physical plastic card."
  },
  {
    name: "Bank Account (Aadhaar Seeded)",
    purpose: "Receipt of direct government funds (DBT) such as scholarships, pensions, and subsidies.",
    whereToApply: "Any public/private commercial bank branch, or nearby Post Office Payments Bank (IPPB).",
    officialPortal: "https://pmjdy.gov.in",
    fee: "Free (Zero-Balance account under PM Jan Dhan Yojana)",
    processingTime: "Same Day",
    requiredProofDocs: ["Aadhaar Card", "2 Passport photographs", "Voter ID / Ration Card"],
    commonRejections: ["Incomplete KYC details.", "Failure to verify mobile OTP."],
    proTip: "Explicitly request 'DBT / Aadhaar Seeding mapping on NPCI mapper' when opening the bank account. Having a bank account is not enough — it must be mapped to NPCI for direct DBT!"
  },
  {
    name: "Income Certificate",
    purpose: "Proof of annual household earnings to determine means-test eligibility for scholarships and free welfare.",
    whereToApply: "Online via District e-District portal or physical Tehsildar / Revenue Circle Office.",
    officialPortal: "https://serviceonline.gov.in",
    fee: "₹10 to ₹50 (CSC charges may apply)",
    processingTime: "10 to 15 Days",
    requiredProofDocs: ["Salary slip / ITR copy (if employed) or Land holding revenue receipts.", "Panchayat/Lakhpat Report.", "Aadhaar Card."],
    commonRejections: ["Outdated validity (most income certificates are valid only for 1 fiscal year).", "Submitted by notary affidavit instead of competent circle authority."],
    proTip: "Always renew your Income Certificate in April-May immediately after the financial year ends. Do not wait for scholarship portal deadlines!"
  },
  {
    name: "Domicile Certificate",
    purpose: "Legal proof of permanent residence in a specific state, critical for state-level quotas and state scholarships.",
    whereToApply: "State e-District portal or Deputy Commissioner / Sub-Divisional Magistrate office.",
    officialPortal: "https://serviceonline.gov.in",
    fee: "₹20 to ₹50",
    processingTime: "15 to 21 Days",
    requiredProofDocs: ["Proof of native land holding or 10+ years resident records in school TC / Voter list.", "Aadhaar Card."],
    commonRejections: ["Parents' domicile not attached for minor/student applicants.", "Insufficient years of historic residency proof shown on voter roll copy."],
    proTip: "Particularly for Northeastern students applying for Ishan Uday, obtain this state domicile early from your home district before relocating elsewhere for higher studies."
  },
  {
    name: "DigiLocker",
    purpose: "Government-hosted paperless document storage locker to verify credentials instantly.",
    whereToApply: "DigiLocker Web Portal or Android/iOS Application.",
    officialPortal: "https://www.digilocker.gov.in",
    fee: "Free",
    processingTime: "Instant Profile Creation",
    requiredProofDocs: ["Aadhaar Card with active Aadhaar-linked mobile phone number."],
    commonRejections: ["Mobile number mismatch with Aadhaar record, preventing OTP generation."],
    proTip: "State departments and academic boards are mandated under Information Technology rules to treat DigiLocker documents same as physical originals."
  },
  {
    name: "Caste Certificate",
    purpose: "Official certification of social group status (SC/ST/OBC) used for reservation benefits and scholarships.",
    whereToApply: "State e-District portal, Sub-Divisional Magistrate (SDM) or Tehsildar office.",
    officialPortal: "https://serviceonline.gov.in",
    fee: "Free to ₹30",
    processingTime: "15 to 30 Days",
    requiredProofDocs: ["Panchayat/Municipal report, father's Caste Certificate, Aadhaar, residential proof."],
    commonRejections: ["Lack of legacy genealogical lineage proof showing father's caste status in records."],
    proTip: "If father's certificate is absent, bring a signed certification from three blood relatives along with a land deed showing community listing."
  },
  {
    name: "Ration Card",
    purpose: "Food security card enabling highly subsidized food grain access and acts as primary family proof.",
    whereToApply: "State Food and Civil Supplies Department office or official state NFSA portal.",
    officialPortal: "https://nfsa.gov.in",
    fee: "₹10 to ₹50",
    processingTime: "30 Days",
    requiredProofDocs: ["Family head's photograph, income certificate, Aadhaar copies of all household members, electricity bill."],
    commonRejections: ["Members already included in separate ration rosters elsewhere, causing double entry errors."],
    proTip: "Splitting from a joint family requires obtaining a signed 'Surrender Certificate' first from the previous Food block officer."
  },
  {
    name: "Driving Licence",
    purpose: "Official certification of authorized driving ability and serves as universally recognized identity, age, and address proof.",
    whereToApply: "Sarathi Parivahan portal online or nearest State Regional Transport Office (RTO).",
    officialPortal: "https://sarathi.parivahan.gov.in",
    fee: "₹200 to ₹1200 depending on vehicle class.",
    processingTime: "30 to 45 Days (includes physical skill trials and a Learner phase).",
    requiredProofDocs: ["Age Proof (Aadhaar, School Marksheet)", "Address Proof (Ration Card, Electricity Bill, Domicile)", "Form 1A Medical Fitness Certificate (if age > 40)."],
    commonRejections: ["Failure during physical driving track assessment.", "Mismatched names across medical reports and Aadhaar identity card."],
    proTip: "An active digital Driving Licence fetched via DigiLocker carries absolute equal legal standing to a physical smart card under Section 139 of Central Motor Vehicle Rules!"
  },
  {
    name: "Disability Certificate (UDID)",
    purpose: "Mandatory unified certification of persistent physical, sensory, or mental disability to unlock pensions and free concessions.",
    whereToApply: "Swavlamban Card portal online or Government District Civil Hospital Board.",
    officialPortal: "https://www.swavlambancard.gov.in",
    fee: "Free",
    processingTime: "30 to 60 Days",
    requiredProofDocs: ["Aadhaar Card", "Recent clear color photograph highlighting nature of disability", "Clinical reports from certified medical experts."],
    commonRejections: ["Failure to attend physical evaluation board on targeted date.", "Disability level listed below 40%, failing standard concession thresholds."],
    proTip: "The UDID cards work seamlessly across different states, removing the hassle of carrying physical papers or local hospital slips!"
  },
  {
    name: "Electricity Connection Bill",
    purpose: "Universal proof of address and dynamic verification record required for home energy and solar schemes (PM Surya Ghar).",
    whereToApply: "Local Electricity Distribution Company (DISCOM) office or billing portal.",
    officialPortal: "National Portal for Rooftop Solar",
    fee: "Free. Setup meter charges vary.",
    processingTime: "Instant to view; 7 to 10 days for new service lines.",
    requiredProofDocs: ["Adjoining land deed, municipal tax receipts, and active Aadhaar Card."],
    commonRejections: ["Discrepancy in names where ancestral property claims have not completed official revenue mutation."],
    proTip: "A bill matching the Aadhaar spelling exactly speeds up your Solar subsidies by 3x because banking approval is automated!"
  }
];

export const INVISIBLE_ROADMAP = {
  title: "Invisible Citizen Document Recovery",
  tagline: "Priority sequential action plan for citizens with zero baseline documentation.",
  steps: [
    {
      id: 1,
      title: "Secure a Municipal Birth Records Check or Community Certification",
      action: "Identify your local Village Headman / Panchayat President / Ward Councilor. Apply for a certified Certificate of Identity with standard passport photos. This acts as raw baseline supporting proof.",
      whyRequired: "Provides a zero-cost entry document to verify primary presence before applying for biometrics.",
      approximateTime: "3–5 Days",
      fee: "Free"
    },
    {
      id: 2,
      title: "Obtain first Baseline Aadhaar Card",
      action: "Book a slot or walk in to nearest Public Bank / Post Office Aadhaar desk. Show your local community identifier certificate. Record finger-prints and iris scanning biometric records on standard UIDAI templates.",
      whyRequired: "Provides the 12-digit permanent national biometric identifier core to 95% of state DBT systems.",
      approximateTime: "15–30 Days",
      fee: "Free"
    },
    {
      id: 3,
      title: "Activate an Aadhaar-Linked Active Mobile SIM Card",
      action: "Visit any mobile vendor with Aadhaar. Opt for biometric e-KYC. Immediately request the Aadhaar enrollment center to write this exact telephone number on your Aadhaar record file.",
      whyRequired: "Required to receive multi-factor OTPs for logging into digital beneficiary systems and DigiLocker.",
      approximateTime: "1 Day",
      fee: "₹50–150"
    },
    {
      id: 4,
      title: "Open zero-balance PM Jan Dhan Bank Account & Link NPCI Mapping",
      action: "Visit any nationalized bank or local Post Office Payments Bank block. Open a Jan Dhan Account using Aadhaar e-KYC. Fill out the direct transfer consent option to link database mapped payments.",
      whyRequired: "Without active mapping on national payments switch (NCPI), cash benefits cannot reach your account even if the scheme application is fully approved.",
      approximateTime: "Same Day",
      fee: "Free"
    },
    {
      id: 5,
      title: "Create DigiLocker Cloud Vault",
      action: "Install DigiLocker App. Log in with Aadhaar details and mobile OTP. Instantly download digital formats of Birth, Class-10 marksheet or Ration Card.",
      whyRequired: "Ensures secure cloud access to official digital copies, preventing rejections due to physical certificate losses or paper deterioration.",
      approximateTime: "5 Minutes",
      fee: "Free"
    }
  ]
};

export const NE_STATES_INTEL: Record<string, {
  capital: string;
  focusArea: string;
  regionalCrisisNote: string;
  helplines: { agency: string; number: string }[];
  localWelfareSchemes: { name: string; target: string; value: string; portal: string }[];
  specialRightsNotice: string;
}> = {
  "Assam": {
    capital: "Dispur",
    focusArea: "Flood Mitigation Grants, Tea Garden Labour Protection, Domicile Recovery, indigenous Bodo and Karbi tribal welfare.",
    regionalCrisisNote: "Annual floods affect 4 million households. 85% of tiny landholders lose their SDRF relief right because they fail to submit crop devastation proof within the official 60-day assessment window.",
    helplines: [
      { agency: "Assam State Disaster Management", number: "1070 / 0361-2237219" },
      { agency: "CM's Grievance Cell Assam", number: "181 / 1800-345-3611" }
    ],
    localWelfareSchemes: [
      { name: "Orunodoi 2.0", target: "Vulnerable women, widows, and specially-abled individuals", value: "₹1,250/month DBT cash", portal: "https://orunodoi.assam.gov.in" },
      { name: "Lakhpati Baideo", target: "Female SHG members transitioning to micro-business", value: "₹35,000 Phase-wise subsidy", portal: "https://asrlms.assam.gov.in" },
      { name: "Sujanya / Pragyan Bharati", target: "Undergraduate student textbook and local travel grants", value: "₹10,000 One-time support", portal: "https://scholarships.gov.in" }
    ],
    specialRightsNotice: "Under Assam's Right to Public Services Act (ARTPS), government circles must provide caste and land mutation papers within 15 working days. Citizens hold the right to file appeals directly to the state commission for delay compensation."
  },
  "Meghalaya": {
    capital: "Shillong",
    focusArea: "Tribal Clan Domicile Rights, Sixth Schedule Customary Laws, Horticulture subsidies (strawberry/organic ginger cash crops), Khasi, Jaintia, and Garo student aids.",
    regionalCrisisNote: "Due to communal/clan land ownership models, standardized land mutation records do not exist for 70% of hill farmers. Customary clan head certificates are legal substitutes. We guide you on obtaining matching gazetted attestations.",
    helplines: [
      { agency: "Meghalaya Citizens Helpline", number: "1917" },
      { agency: "State Scholarship Help Line", number: "0364-2224879" }
    ],
    localWelfareSchemes: [
      { name: "Chief Minister's Scholarship Scheme", target: "Post-matric tribal merit student communities", value: "Tuition waiver + ₹1,200 monthly allowance", portal: "https://megscholarship.nic.in" },
      { name: "FOCUS (Farmers' Collectives)", target: "Small horticultural farm producers", value: "₹5,000 cash grant per member", portal: "https://focus.meghalaya.gov.in" }
    ],
    specialRightsNotice: "Customary land certificates verified by Syiem (Khasi customary chieftains) or Nokmas (Garo clan leaders) must be formally endorsed by Assistant Commissioner countersigns to pass central bank Mudra audits. Use our document compiler to map this process."
  },
  "Manipur": {
    capital: "Imphal",
    focusArea: "Hill area student scholarships, weavers' credit cards, youth entrepreneurship startup funds.",
    regionalCrisisNote: "Administrative blockades and disruption in rural communication channels often lead to missed deadlines on National Scholarship portals. Manipur students can appeal directly to regional nodal centers with manual backup profiles.",
    helplines: [
      { agency: "Manipur State Portal Help", number: "1800-345-3818" },
      { agency: "Department of Tribals Affairs Help", number: "0385-2443653" }
    ],
    localWelfareSchemes: [
      { name: "Manipur State Merit-cum-Means", target: "College tribal candidates crossing 60% class-12 threshold", value: "₹24,000 per academic term", portal: "https://scholarships.gov.in" },
      { name: "Chief Minister’s Laiyeng Shen (Health)", target: "Vulnerable state families in non-salaried occupations", value: "₹15,000 grant for health emergencies", portal: "https://manipur.gov.in" }
    ],
    specialRightsNotice: "Special Central Assistance grants are reserved for border area development programmes surrounding Manipur sectors. Local youths qualify for fully funded vocational training setups via the State Skill Mission."
  },
  "Arunachal Pradesh": {
    capital: "Itanagar",
    focusArea: "Free medical cover (CMAAY), organic kiwi and cardamom value chains, boarding school incentives for remote border tribes.",
    regionalCrisisNote: "Extremely remote physical geography results in low digital enrollment. Over 60% of rural household members have unrecognized health eligibility due to outdated SECC parameters. Apply for CMAAY instead.",
    helplines: [
      { agency: "CMAAY Arunachal Helpline", number: "1800-233-5555" },
      { agency: "Arunachal State Board Secretariat", number: "0360-2292351" }
    ],
    localWelfareSchemes: [
      { name: "Chief Minister's Arogya Arunachal Yojana", target: "All local indigenous tribal families", value: "₹5 Lakh family hospitalization cover", portal: "https://cmaay.com" },
      { name: "Arunachal Tribal Student Merit Aid", target: "ST post-matric students registered in state universities", value: "₹20,000 per term stipend", portal: "https://scholarships.gov.in" }
    ],
    specialRightsNotice: "Arunachal Scheduled Tribes are 100% exempt from paying personal Income Tax under Section 10(26) of the direct Income Tax Act. Present your tribal certificate instead of ITR/PAN when registering bank deposits."
  },
  "Mizoram": {
    capital: "Aizawl",
    focusArea: "Young local entrepreneur micro-equity, bamboo growers' board subsidies, high-altitude sports scholarships.",
    regionalCrisisNote: "Extreme reliance on localized printed documents leads to high DigiLocker integration gaps. We map the step-by-step conversion of native Mizo certificates into central digital lockers.",
    helplines: [
      { agency: "Mizoram State Secretariat Contact", number: "0389-2321453" },
      { agency: "Youth Welfare Department", number: "0389-2336040" }
    ],
    localWelfareSchemes: [
      { name: "Mizoram Skill & Entrepreneurship Support", target: "Unemployed tribal youth starting small-scale trades", value: "Zero-interest micro capital up to ₹2 Lakh", portal: "https://mizoram.gov.in" },
      { name: "Bamboo Craft Board Grants", target: "Artisans registered under Village Councils", value: "₹10,000 equipment subsidy toolkits", portal: "https://commerce.mizoram.gov.in" }
    ],
    specialRightsNotice: "Mizoram residents are protected under the Inner Line Permit (ILP) framework, but state tribal rights extend robustly to all central banking and DBT schemes. Local Mizo certificates hold legal precedence."
  },
  "Nagaland": {
    capital: "Kohima",
    focusArea: "Village Council customary welfare, rural bamboo design boards, post-matric ST scholarship quotas.",
    regionalCrisisNote: "Nagaland scholars suffer 45% post-matric scholarship rejections due to variations in tribe spellings against standard lists. Learn how to verify your spelling before submit.",
    helplines: [
      { agency: "Department of Underdeveloped Areas", number: "0370-2270410" },
      { agency: "Nagaland Higher Education Desk", number: "0370-2271012" }
    ],
    localWelfareSchemes: [
      { name: "Nagaland State Merit Scholarship", target: "ST college students with 60%+ performance records", value: "₹15,000 per academic session", portal: "https://scholarships.gov.in" },
      { name: "DUDA Border Area Development", target: "Youths in under-developed Eastern Nagaland blocks", value: "Fully-funded vocational sponsorship", portal: "https://duda.nagaland.gov.in" }
    ],
    specialRightsNotice: "Article 371A of the India Constitution secures Nagaland's unique ownership rights over land and natural wealth. Village council land certificates hold equal standing to standard Revenue department mutation documents."
  },
  "Sikkim": {
    capital: "Gangtok",
    focusArea: "Organic agriculture compliance premiums, eco-tourism startup loans, Sikkimese of local origin rights.",
    regionalCrisisNote: "While Sikkim maintains high welfare literacy, cardholders often miss newer direct DBT schemes because local records are in ancient physical formats. Use our conversion tools.",
    helplines: [
      { agency: "Sikkim Organic Board Helpline", number: "03592-231154" },
      { agency: "Disaster Management Sikkim", number: "1077 / 03592-202461" }
    ],
    localWelfareSchemes: [
      { name: "Sikkim Organic Mission Subsidy", target: "Registered certified pure-organic farmers", value: "₹12,000 cash support and free seeds", portal: "http://sikkimagrisnet.gov.in" },
      { name: "Chief Minister’s Startup Scheme", target: "Local tourist home developers", value: "Up to 35% state seed equity funding", portal: "https://sikkim.gov.in" }
    ],
    specialRightsNotice: "Under historic protocols, native Sikkimese holding the legacy Sikkim Subject documents are entitled to specialized administrative quotas across all state services."
  },
  "Tripura": {
    capital: "Agartala",
    focusArea: "Rubber plantation grants, Reang/Bru refugee rehabilitation DBT, tribal council business assistance.",
    regionalCrisisNote: "Reang tribal refugees resettling under multi-government accords miss basic card proofs. Use our custom priority framework to secure fast documentation.",
    helplines: [
      { agency: "Tripura Tribal Council Secretariat", number: "0381-2225301" },
      { agency: "State Grievance Redressal Portal", number: "1905" }
    ],
    localWelfareSchemes: [
      { name: "Tripura Rubber Planters Assistance", target: "Small land rubbers plantation growers", value: "₹25,000 per hectare maintenance subsidy", portal: "https://tripura.gov.in" },
      { name: "Post-Matric Education Support for minorities", target: "Tribal and minority SC/ST students in professional colleges", value: "Full tuition + stipend match", portal: "https://scholarships.gov.in" }
    ],
    specialRightsNotice: "Tripura Tribal Areas Autonomous District Council (TTAADC) administers specialized developmental initiatives for 19 local indigenous groups, completely separate from general municipal allocations."
  }
};
