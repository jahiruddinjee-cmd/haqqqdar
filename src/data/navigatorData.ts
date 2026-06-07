export interface NavigatorEvent {
  id: string;
  title_en: string;
  title_hi: string;
  description_en: string;
  description_hi: string;
  documents: {
    name_en: string;
    name_hi: string;
    purpose_en: string;
    purpose_hi: string;
    isMandatory: boolean;
    normName: string; // to map with inventoryDocs
  }[];
  schemes: {
    name_en: string;
    name_hi: string;
    desc_en: string;
    desc_hi: string;
    portal_en: string;
    portal_hi: string;
  }[];
  insurance: {
    name_en: string;
    name_hi: string;
    desc_en: string;
    desc_hi: string;
  }[];
  portals: {
    name_en: string;
    name_hi: string;
    url: string;
  }[];
  emergency: {
    label_en: string;
    label_hi: string;
    number: string;
  }[];
  roadmap: {
    step: number;
    title_en: string;
    title_hi: string;
    desc_en: string;
    desc_hi: string;
    isCritical: boolean;
  }[];
  specialTab1?: {
    first_en: string[];
    first_hi: string[];
    wait_en: string[];
    wait_hi: string[];
  };
  specialTab2?: {
    scholarships_en: { name: string; benefit: string; deadline: string }[];
    scholarships_hi: { name: string; benefit: string; deadline: string }[];
  };
  specialTab10?: {
    timeline_en: string;
    timeline_hi: string;
    rejections_en: string[];
    rejections_hi: string[];
  };
}

export const LIFE_NAVIGATOR_EVENTS: NavigatorEvent[] = [
  {
    id: "turned-18",
    title_en: "I Turned 18",
    title_hi: "मैं १८ वर्ष का हो गया हूँ",
    description_en: "Unlock adult citizenship rights, voting power, career foundations, and digital identity mapping in India.",
    description_hi: "भारत में वयस्क नागरिकता अधिकार, मतदान अधिकार, करियर की नींव और डिजिटल पहचान मैपिंग अनलॉक करें।",
    documents: [
      { name_en: "Aadhaar Card", name_hi: "आधार कार्ड", purpose_en: "Foundational identity and biometrics update (recommended at age 18)", purpose_hi: "बुनियादी पहचान और बायोमेट्रिक अपडेट (वयस्क होने पर अनुशंसित)", isMandatory: true, normName: "Aadhaar Card" },
      { name_en: "PAN Card", name_hi: "पैन कार्ड", purpose_en: "Required for opening savings bank accounts, taxable jobs, and investments", purpose_hi: "बचत खाता खोलने, कर योग्य नौकरियों और निवेश के लिए आवश्यक", isMandatory: true, normName: "PAN Card" },
      { name_en: "Voter ID Card", name_hi: "मतदाता पहचान पत्र (Voter ID)", purpose_en: "Enables constitutional voting rights and state domicile registration", purpose_hi: "संवैधानिक मतदान अधिकार और राज्य अधिवास पंजीकरण सक्षम करता है", isMandatory: true, normName: "Voter ID (EPIC)" },
      { name_en: "Bank Account (Aadhaar Seeded)", name_hi: "बैंक खाता (आधार सीडेड)", purpose_en: "First adult zero-balance bank savings registry", purpose_hi: "पहला वयस्क शून्य-शेष बचत बैंक खाता पंजीकरण", isMandatory: true, normName: "Bank Account (Aadhaar Seeded)" },
      { name_en: "UPI Registration", name_hi: "यूपीआई पंजीकरण", purpose_en: "Instant digital transaction setup linked to adult mobile phone number", purpose_hi: "वयस्क मोबाइल फोन नंबर से जुड़ा त्वरित डिजिटल लेनदेन सेटअप", isMandatory: false, normName: "Mobile Number Linked to Aadhaar" },
      { name_en: "DigiLocker Setup", name_hi: "डिजीलॉकर सेटअप", purpose_en: "Store matriculation sheets and identity credentials securely in cloud", purpose_hi: "मैट्रिकुलेशन शीट और पहचान प्रमाण पत्रों को क्लाउड में सुरक्षित रूप से सहेजें", isMandatory: false, normName: "DigiLocker" },
      { name_en: "ABHA Health ID", name_hi: "आभा (ABHA) स्वास्थ्य आईडी", purpose_en: "Unified digital health card under Ayushman Bharat", purpose_hi: "आयुष्मान भारत के तहत एकीकृत डिजिटल स्वास्थ्य कार्ड", isMandatory: false, normName: "Ayushman Card" },
      { name_en: "Driving License", name_hi: "ड्राइविंग लाइसेंस", purpose_en: "Legal permission to operate motor vehicles across India", purpose_hi: "पूरे भारत में मोटर वाहन चलाने की कानूनी अनुमति", isMandatory: false, normName: "Driving License" },
      { name_en: "Passport", name_hi: "पासपोर्ट", purpose_en: "Global travel credential and permanent citizenship proof", purpose_hi: "वैश्विक यात्रा क्रेडेंशियल और स्थायी नागरिकता प्रमाण", isMandatory: false, normName: "Passport" }
    ],
    schemes: [
      { name_en: "PM Shram Yogi Maandhan (PM-SYM)", name_hi: "पीएम श्रम योगी मानधन योजना", desc_en: "Voluntary pension scheme for unorganized young youths.", desc_hi: "असंगठित युवा वर्ग के लिए स्वैच्छिक पेंशन योजना।", portal_en: "https://maandhan.in", portal_hi: "https://maandhan.in" }
    ],
    insurance: [
      { name_en: "Pradhan Mantri Suraksha Bima Yojana (PMSBY)", name_hi: "प्रधानमंत्री सुरक्षा बीमा योजना", desc_en: "Accidental life cover of ₹2,00,000 for just ₹20 per year.", desc_hi: "मात्र ₹२० प्रति वर्ष में ₹२,००,००० का दुर्घटना जीवन कवरेज।" },
      { name_en: "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)", name_hi: "प्रधानमंत्री जीवन ज्योति बीमा योजना", desc_en: "Term life insurance of ₹2,00,000 for premium of ₹436 per year.", desc_hi: "₹४३६ प्रति वर्ष के प्रीमियम पर ₹२,००,००० का टर्म लाइफ इंश्योरेंस।" },
      { name_en: "Atal Pension Yojana (APY)", name_hi: "अटल पेंशन योजना", desc_en: "Co-contributory pension ensuring ₹1,000 to ₹5,000 monthly output starting from age 60.", desc_hi: "६० वर्ष की आयु से शुरू होने वाली ₹१,००० से ₹५,००० तक की मासिक पेंशन सुनिश्चित करने वाली योजना।" }
    ],
    portals: [
      { name_en: "National Voters Service Portal (NVSP)", name_hi: "राष्ट्रीय मतदाता सेवा पोर्टल (NVSP)", url: "https://voters.eci.gov.in" },
      { name_en: "UIDAI Portal", name_hi: "यूआईडीएआई आधार पोर्टल", url: "https://uidai.gov.in" }
    ],
    emergency: [
      { label_en: "National Emergency Helpline", label_hi: "राष्ट्रीय आपातकालीन हेल्पलाइन", number: "112" }
    ],
    roadmap: [
      { step: 1, title_en: "Enroll for Voter ID", title_hi: "मतदाता सूची में नाम दर्ज कराएं", desc_en: "Register online via Voters Portal immediately upon turning 18.", desc_hi: "१८ वर्ष के होते ही तुरंत मतदाता पोर्टल के माध्यम से ऑनलाइन पंजीकरण करें।", isCritical: true },
      { step: 2, title_en: "Convert Minor Bank Account", title_hi: "माइनर बैंक खाते को बालिग खाते में बदलें", desc_en: "Submit physical KYC verification and Aadhaar update at your active branch.", desc_hi: "अपनी सक्रिय बैंक शाखा में भौतिक केवाईसी सत्यापन और आधार अपडेट जमा करें।", isCritical: true },
      { step: 3, title_en: "Acquire Adult PAN Card", title_hi: "वयस्क पैन कार्ड प्राप्त करें", desc_en: "Use instant Aadhaar paperless e-PAN route in 10 minutes.", desc_hi: "१० मिनट में तत्काल आधार पेपरलेस ई-पैन मार्ग का उपयोग करें।", isCritical: true },
      { step: 4, title_en: "Affix DigiLocker with Mobile App", title_hi: "मोबाइल ऐप में डिजीलॉकर स्थापित करें", desc_en: "Pull digital records including high school certificates directly.", desc_hi: "हाई स्कूल प्रमाणपत्रों सहित डिजिटल रिकॉर्ड सीधे सिंक करें।", isCritical: false }
    ],
    specialTab1: {
      first_en: ["Aadhaar Mobile Link", "PAN Card Setup", "Voter ID Registration", "Adult Bank Conversion"],
      first_hi: ["आधार मोबाइल लिंक", "पैन कार्ड सेटअप", "वोटर आईडी पंजीकरण", "वयस्क बैंक खाता परिवर्तन"],
      wait_en: ["Passport Enrolment", "Driving License", "ABHA Health Profile"],
      wait_hi: ["पासपोर्ट नामांकन", "ड्राइविंग लाइसेंस", "आभा स्वास्थ्य प्रोफाइल"]
    }
  },
  {
    id: "student",
    title_en: "I am a Student",
    title_hi: "मैं एक छात्र हूँ",
    description_en: "Access merit/means scholarships, educational support concessions, domicile registration, and state student credit cards.",
    description_hi: "योग्यता सह साधन छात्रवृत्ति, शैक्षणिक सहायता रियायतें, मूल निवास पंजीकरण और राज्य छात्र क्रेडिट कार्ड प्राप्त करें।",
    documents: [
      { name_en: "Income Certificate", name_hi: "आय प्रमाण पत्र", purpose_en: "Verifies threshold compliance for scholarship disbursements", purpose_hi: "छात्रवृत्ति वितरण के लिए वित्तीय पात्रता सीमा की पुष्टि करता है", isMandatory: true, normName: "Income Certificate" },
      { name_en: "Domicile Certificate", name_hi: "मूल निवास प्रमाण पत्र (Domicile)", purpose_en: "Required to claim native state reservation and college aids", purpose_hi: "मूल राज्य आरक्षण और कॉलेज सहायता का दावा करने के लिए आवश्यक", isMandatory: true, normName: "Domicile Certificate" },
      { name_en: "Caste Certificate", name_hi: "जाति प्रमाण पत्र", purpose_en: "Enables reservation-based fee concession and category scholarships", purpose_hi: "आरक्षण आधारित शुल्क रियायत और श्रेणी छात्रवृत्ति सक्षम करता है", isMandatory: false, normName: "Caste Certificate" },
      { name_en: "10th Class Marksheet", name_hi: "१०वीं कक्षा की मार्कशीट", purpose_en: "Official age and high school academic qualification record", purpose_hi: "आधिकारिक आयु और हाई स्कूल शैक्षणिक योग्यता रिकॉर्ड", isMandatory: true, normName: "10th Class Marksheet" },
      { name_en: "12th Class Marksheet", name_hi: "१२वीं कक्षा की मार्कशीट", purpose_en: "Crucial for undergrad scholarship entry points", purpose_hi: "अंडरग्रेजुएट छात्रवृत्ति में प्रवेश के लिए महत्वपूर्ण", isMandatory: false, normName: "12th Class Marksheet" }
    ],
    schemes: [
      { name_en: "National Scholarship Portal (NSP)", name_hi: "राष्ट्रीय छात्रवृत्ति पोर्टल (NSP)", desc_en: "Unified central portal hosts pre-matric and post-matric academic awards.", desc_hi: "एकीकृत केंद्रीय पोर्टल जो प्री-मैट्रिक और पोस्ट-मैट्रिक छात्रवृत्ति प्रदान करता है।", portal_en: "https://scholarships.gov.in", portal_hi: "https://scholarships.gov.in" },
      { name_en: "Ishan Uday Special Scholarship", name_hi: "ईशान उदय विशेष छात्रवृत्ति (UGC)", desc_en: "Dedicated financial award for NER students pursuing higher professional education.", desc_hi: "उच्च व्यावसायिक शिक्षा प्राप्त करने वाले पूर्वोत्तर क्षेत्र के छात्रों के लिए विशेष वित्तीय सहायता।", portal_en: "https://www.ugc.gov.in", portal_hi: "https://www.ugc.gov.in" },
      { name_en: "AICTE Pragati Scholarship for Girls", name_hi: "एआईसीटीई प्रगति महिला छात्रवृत्ति", desc_en: "Technical degree scholarship promoting girl education.", desc_hi: "लड़कियों की शिक्षा को बढ़ावा देने के लिए तकनीकी डिग्री छात्रवृत्ति योजना।", portal_en: "https://www.aicte-india.org", portal_hi: "https://www.aicte-india.org" }
    ],
    insurance: [],
    portals: [
      { name_en: "National Scholarship Portal", name_hi: "राष्ट्रीय छात्रवृत्ति पोर्टल", url: "https://scholarships.gov.in" },
      { name_en: "Vidya Lakshmi education loan portal", name_hi: "विद्या लक्ष्मी शिक्षा ऋण पोर्टल", url: "https://www.vidyalakshmi.co.in" }
    ],
    emergency: [],
    roadmap: [
      { step: 1, title_en: "Produce digital Income Certificate", title_hi: "डिजिटल आय प्रमाण पत्र तैयार करवाएं", desc_en: "Ensure validity falls in current fiscal year. Simple affidavits are rejected.", desc_hi: "सुनिश्चित करें कि वैधता वर्तमान वित्तीय वर्ष की हो। साधारण शपथ पत्र अस्वीकार कर दिए जाते हैं।", isCritical: true },
      { step: 2, title_en: "Generate state Domicile", title_hi: "राज्य का मूल निवास प्रमाण पत्र बनवाएं", desc_en: "Required to apply under native student reserved quotas.", desc_hi: "मूल राज्य छात्र आरक्षित कोटे के तहत आवेदन करने के लिए आवश्यक।", isCritical: true },
      { step: 3, title_en: "Register on NSP or State e-District", title_hi: "NSP या राज्य ई-डिस्ट्रिक्ट पोर्टल पर पंजीकरण करें", desc_en: "Match name letter-by-letter with high school certificates.", desc_hi: "हाई स्कूल प्रमाणपत्रों के साथ अक्षर-दर-अक्षर नाम का मिलान करें।", isCritical: true }
    ],
    specialTab2: {
      scholarships_en: [
        { name: "Post-Matric Scholarship Scheme", benefit: "Up to ₹12,000 per year + full tuition waiver", deadline: "31-Oct-2026" },
        { name: "Ishan Uday Special Scholarship for NER", benefit: "₹5,400 to ₹7,800 monthly stipend direct to bank", deadline: "30-Nov-2026" },
        { name: "Central Sector Merit Scholarship", benefit: "₹20,000 per academic year for top rankers", deadline: "31-Oct-2026" }
      ],
      scholarships_hi: [
        { name: "पोस्ट-मैट्रिक छात्रवृत्ति योजना", benefit: "₹१२,००० प्रति वर्ष तक + पूर्ण ट्यूशन शुल्क छूट", deadline: "३१-अक्टूबर-२०२६" },
        { name: "पूर्वोत्तर राज्यों के लिए ईशान उदय छात्रवृत्ति", benefit: "₹५,४०० से ₹७,८०० मासिक वजीफा सीधे बैंक खाते में", deadline: "३०-नवम्बर-२०२६" },
        { name: "केंद्रीय क्षेत्र मेरिट छात्रवृत्ति", benefit: "शीर्ष प्रदर्शनकर्ताओं के लिए ₹२०,००० प्रति शैक्षणिक वर्ष", deadline: "३१-अक्टूबर-२०२६" }
      ]
    }
  },
  {
    id: "first-job",
    title_en: "I Got My First Job",
    title_hi: "मुझे मेरी पहली नौकरी मिल गई है",
    description_en: "Secure employment records, EPFO provident fund setups, ESIC healthcare cards, and National Pension Scheme allocation.",
    description_hi: "रोजगार रिकॉर्ड सुरक्षित करें, EPFO भविष्य निधि सेटअप, ESIC स्वास्थ्य देखभाल कार्ड और राष्ट्रीय पेंशन योजना आवंटन प्राप्त करें।",
    documents: [
      { name_en: "PAN Card", name_hi: "पैन कार्ड", purpose_en: "Mandatory for salary taxation withholding (TDS) compliance", purpose_hi: "वेतन कराधान कटौती (TDS) अनुपालन के लिए अनिवार्य", isMandatory: true, normName: "PAN Card" },
      { name_en: "Bank Account (Aadhaar Seeded)", name_hi: "बैंक खाता (आधार सीडेड)", purpose_en: "Active single-name bank account to receive direct salary credits", purpose_hi: "सीधे वेतन प्राप्त करने के लिए सक्रिय एकल-नाम बैंक खाता", isMandatory: true, normName: "Bank Account (Aadhaar Seeded)" },
      { name_en: "Aadhaar Card", name_hi: "आधार कार्ड", purpose_en: "Linked to UAN for Provident Fund (EPFO) deposits", purpose_hi: "भविष्य निधि (EPFO) जमा के लिए यूएएन (UAN) से जुड़ा हुआ", isMandatory: true, normName: "Aadhaar Card" }
    ],
    schemes: [
      { name_en: "Employees' Provident Fund Organization (EPFO)", name_hi: "कर्मचारी भविष्य निधि संगठन (EPFO)", desc_en: "Compulsory social security savings for formal workers.", desc_hi: "औपचारिक औद्योगिक कर्मचारियों के लिए अनिवार्य सामाजिक सुरक्षा बचत योजना।", portal_en: "https://www.epfindia.gov.in", portal_hi: "https://www.epfindia.gov.in" },
      { name_en: "Employees' State Insurance Corporation (ESIC)", name_hi: "कर्मचारी राज्य बीमा निगम (ESIC)", desc_en: "Full family medical cover and sick leave pay benefits.", desc_hi: "पूर्ण पारिवारिक चिकित्सा कवरेज और बीमारी अवकाश वेतन लाभ।", portal_en: "https://www.esic.gov.in", portal_hi: "https://www.esic.gov.in" },
      { name_en: "National Pension Scheme (NPS)", name_hi: "राष्ट्रीय पेंशन योजना (NPS)", desc_en: "Voluntary market-linked pension accumulation plan.", desc_hi: "स्वैच्छिक बाजार से जुड़ी पेंशन संचय योजना।", portal_en: "https://www.npscra.nsdl.co.in", portal_hi: "https://www.npscra.nsdl.co.in" }
    ],
    insurance: [
      { name_en: "Group Term Life Insurance", name_hi: "समूह टर्म लाइफ इंश्योरेंस", desc_en: "Mandatory base life assurance covered by employer rules.", desc_hi: "नियोक्ता के नियमों के तहत अनिवार्य बुनियादी जीवन बीमा कवरेज।" },
      { name_en: "ESIC Health Benefit Scheme", name_hi: "ESIC स्वस्थ्य लाभ योजना", desc_en: "Completely free healthcare in dedicated ESIC smart hospitals for wage earners.", desc_hi: "वेतनभोगी लोगों को समर्पित ESIC स्मार्ट अस्पतालों में पूरी तरह से मुफ्त स्वास्थ्य देखभाल।" }
    ],
    portals: [
      { name_en: "EPFO Member Unified Portal", name_hi: "EPF सदस्य एकीकृत पोर्टल", url: "https://unifiedportal-mem.epfindia.gov.in" },
      { name_en: "NPS Registration Portal", name_hi: "NPS पंजीकरण नया पोर्टल", url: "https://www.npscra.nsdl.co.in" }
    ],
    emergency: [
      { label_en: "EPFO Helpline Toll-Free", label_hi: "EPF हेल्पडेस्क टोल-फ्री", number: "1800118005" }
    ],
    roadmap: [
      { step: 1, title_en: "Validate PAN-Aadhaar Linking", title_hi: "पैन-आधार लिंकिंग सत्यापित करें", desc_en: "Crucial steps to avoid 20% flat tax on salary if unlinked.", desc_hi: "लिंक न होने पर वेतन पर २०% फ्लैट कर से बचने के लिए महत्वपूर्ण कदम।", isCritical: true },
      { step: 2, title_en: "Generate your Universal Account Number (UAN)", title_hi: "यूएएन (UAN) संख्या जेनरेट करें", desc_en: "Insist company HR allocates UAN to compile EPFO corpus.", desc_hi: "EPF कोष जमा करने के लिए कंपनी एचआर से आग्रह कर यूएएन (UAN) आवंटित कराएं।", isCritical: true },
      { step: 3, title_en: "Complete e-Nomination form", title_hi: "ई-नामांकन फॉर्म भरें", desc_en: "Nominate family members on the EPF Member portal immediately.", desc_hi: "EPF सदस्य पोर्टल पर तुरंत परिवार के सदस्यों को नामांकित करें।", isCritical: false }
    ]
  },
  {
    id: "lost-job",
    title_en: "I Lost My Job",
    title_hi: "मेरी नौकरी चली गई है",
    description_en: "Find safety nets, state unemployment registries, employment exchange placements, Skill India masterclasses, and e-Shram unorganized aids.",
    description_hi: "सुरक्षा कवच, राज्य बेरोजगारी रजिस्ट्रियां, रोजगार विनिमय प्लेसमेंट, स्किल इंडिया मास्टरक्लास और ई-श्रम भत्ते खोजें।",
    documents: [
      { name_en: "e-Shram Card", name_hi: "ई-श्रम कार्ड", purpose_en: "Registration proof for unorganized or transition labor status", purpose_hi: "असंगठित या संक्रमणकालीन श्रम स्थिति का पंजीकरण प्रमाण", isMandatory: true, normName: "e-Shram Card" },
      { name_en: "Skill Registry Card", name_hi: "स्किल इंडिया पंजीकरण (Skill Card)", purpose_en: "Enables free skill training courses and national certificates", purpose_hi: "निशुल्क कौशल प्रशिक्षण पाठ्यक्रमों और राष्ट्रीय प्रमाणपत्रों को सक्षम बनाता है", isMandatory: false, normName: "Skill Registry Card" },
      { name_en: "Bank Passbook", name_hi: "बैंक पासबुक", purpose_en: "Record of previous salary cessations", purpose_hi: "पिछले वेतन मिलने की समाप्ति का रिकॉर्ड दिखाने हेतु", isMandatory: true, normName: "Bank Passbook" }
    ],
    schemes: [
      { name_en: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)", name_hi: "प्रधानमंत्री कौशल विकास योजना (PMKVY)", desc_en: "Free industry-relevant skill training courses and incentive rewards.", desc_hi: "निशुल्क उद्योग-प्रासंगिक कौशल प्रशिक्षण पाठ्यक्रम और प्रोत्साहन पुरस्कार।", portal_en: "https://www.pmkvyofficial.org", portal_hi: "https://www.pmkvyofficial.org" },
      { name_en: "Atal Beema Vyakti Kalyan Yojana (ABVKY)", name_hi: "अटल बीमित व्यक्ति कल्याण योजना", desc_en: "Unemployment relief card pays up to 50% salary wages for 90 days if redundant.", desc_hi: "अनावश्यक होने पर ९० दिनों के लिए ५०% तक वेतन देने वाली बेरोजगारी राहत योजना (ESIC)।", portal_en: "https://www.esic.gov.in", portal_hi: "https://www.esic.gov.in" },
      { name_en: "National Career Service (NCS)", name_hi: "राष्ट्रीय करियर सेवा पोर्टल", desc_en: "Central registry connecting jobseekers with thousands of companies.", desc_hi: "नौकरी चाहने वालों को हजारों कंपनियों से जोड़ने वाली केंद्रीय सरकारी रजिस्ट्री।", portal_en: "https://www.ncs.gov.in", portal_hi: "https://www.ncs.gov.in" }
    ],
    insurance: [
      { name_en: "ESIC ABVKY", name_hi: "अटल बीमित व्यक्ति कल्याण योजना", desc_en: "ESIC unemployment cash benefit.", desc_hi: "ESIC बेरोजगारी नकद राहत लाभ।" }
    ],
    portals: [
      { name_en: "National Career Service Portal", name_hi: "राष्ट्रीय करियर सेवा पोर्टल", url: "https://www.ncs.gov.in" },
      { name_en: "e-Shram Registration Portal", name_hi: "ई-श्रम पंजीकरण पोर्टल", url: "https://eshram.gov.in" }
    ],
    emergency: [
      { label_en: "NCS Job Seekers Support Helpline", label_hi: "NCS नौकरी चाहने वालों की सहायता हेल्पलाइन", number: "1514" }
    ],
    roadmap: [
      { step: 1, title_en: "Register on local Employment Exchange", title_hi: "स्थानीय रोजगार कार्यालय में पंजीकरण करें", desc_en: "Update qualification levels to get priority state-sponsored vacancy notices.", desc_hi: "प्राथमिकता राज्य-प्रायोजित रिक्ति नोटिस प्राप्त करने के लिए योग्यता स्तर अपडेट करें।", isCritical: true },
      { step: 2, title_en: "File for ESIC ABVKY Relief if applicable", title_hi: "ESIC ABVKY राहत के लिए दावा दायर करें", desc_en: "Claim should be submitted within 2 months of job loss through corporate branch.", desc_hi: "नौकरी जाने के २ महीने के भीतर कॉर्पोरेट शाखा के माध्यम से दावा जमा किया जाना चाहिए।", isCritical: false },
      { step: 3, title_en: "Join Skill India PMKVY courses", title_hi: "स्किल इंडिया PMKVY पाठ्यक्रमों में शामिल हों", desc_en: "Attain certified digital masterclasses to re-skill.", desc_hi: "पुनः कुशल होने के लिए प्रमाणित डिजिटल मास्टरक्लास प्राप्त करें।", isCritical: false }
    ]
  },
  {
    id: "start-business",
    title_en: "I Want to Start a Business",
    title_hi: "मैं व्यापार शुरू करना चाहता हूँ",
    description_en: "Get verified trading approvals, Udyam MSME certificates, GST compliance numbers, Mudra collateral-free funding, and Startup India mentor circles.",
    description_hi: "सत्यापित ट्रेडिंग अनुमोदन, उद्यम एमएसएमई प्रमाणपत्र, जीएसटी अनुपालन संख्या, मुद्रा संपार्श्विक-मुक्त वित्तपोषण और स्टार्टअप इंडिया मेंटर सर्कल प्राप्त करें।",
    documents: [
      { name_en: "PAN Card", name_hi: "पैन कार्ड", purpose_en: "Business organization or proprietorship compliance reference", purpose_hi: "व्यवसाय संगठन या स्वामित्व अनुपालन संदर्भ", isMandatory: true, normName: "PAN Card" },
      { name_en: "Udyam ID", name_hi: "उद्यम पंजीकरण (MSME)", purpose_en: "Official MSME certificate to secure state priority loan subsidies", purpose_hi: "कल्याण प्राथमिकता ऋण सब्सिडी सुरक्षित करने के लिए आधिकारिक एमएसएमई प्रमाणपत्र", isMandatory: true, normName: "Udyam Certificate" },
      { name_en: "GST Registration Certificate", name_hi: "जीएसटी पंजीकरण प्रमाणपत्र", purpose_en: "Required for inter-state trading and tax invoice generation", purpose_hi: "अंतर-राज्यीय व्यापार और कर इनवॉइस तैयार करने के लिए आवश्यक", isMandatory: false, normName: "GST Registration" },
      { name_en: "Trade License", name_hi: "व्यापार लाइसेंस (Trade License)", purpose_en: "Municipal permit ensuring legality of local premises", purpose_hi: "स्थानीय परिसरों की कानूनी वैधता सुनिश्चित करने वाला नगरपालिका परमिट", isMandatory: false, normName: "Trade License" }
    ],
    schemes: [
      { name_en: "PM MUDRA Yojana (PMMY)", name_hi: "प्रधानमंत्री मुद्रा योजना", desc_en: "Collateral-free business loans up to ₹10 lakh across Shishu, Kishor, and Tarun classes.", desc_hi: "शिशु, किशोर और तरुण श्रेणियों में ₹१० लाख तक के संपार्श्विक-मुक्त व्यापार ऋण।", portal_en: "http://www.mudra.org.in", portal_hi: "http://www.mudra.org.in" },
      { name_en: "Startup India Scheme", name_hi: "स्टार्टअप इंडिया योजना", desc_en: "Income tax exemption regimes and capital funding schemes.", desc_hi: "आयकर छूट के नियम और नई वित्तीय पूंजी व्यवस्था योजनाएं।", portal_en: "https://www.startupindia.gov.in", portal_hi: "https://www.startupindia.gov.in" },
      { name_en: "Stand-Up India Scheme", name_hi: "स्टैंड-अप इंडिया योजना", desc_en: "Loans of ₹10 lakh to ₹1 crore for SC/ST and Women entrepreneurs.", desc_hi: "अनुसूचित जाति/अनुसूचित जनजाति और महिला उद्यमियों के लिए ₹१० लाख से ₹१ करोड़ तक का ऋण।", portal_en: "https://www.standupmitra.in", portal_hi: "https://www.standupmitra.in" }
    ],
    insurance: [
      { name_en: "MSME Group Insurance", name_hi: "एमएसएमई समूह सुरक्षा", desc_en: "Tailored commercial asset coverages from cooperative banks.", desc_hi: "सहकारी बैंकों द्वारा विशेष रूप से तैयार वाणिज्यिक संपत्ति बीमा सुरक्षा।" }
    ],
    portals: [
      { name_en: "Udyam Registration Portal", name_hi: "उद्यम एमएसएमई पंजीकरण पोर्टल", url: "https://udyamregistration.gov.in" },
      { name_en: "GST Council Portal", name_hi: "जीएसटी परिषद आधिकारिक पोर्टल", url: "https://www.gst.gov.in" },
      { name_en: "Mudra Loan Portal", name_hi: "मुद्रा आधिकारिक ऋण पोर्टल", url: "https://www.mudra.org.in" }
    ],
    emergency: [],
    roadmap: [
      { step: 1, title_en: "Formulate Business Plan Proposal", title_hi: "व्यवसाय योजना प्रस्ताव तैयार करें", desc_en: "Estimate 12-month balance sheet sheets to apply for bank funding.", desc_hi: "बैंक ऋण के लिए आवेदन करने हेतु १२-महीने के अनुमानित वित्तीय आंकड़े तैयार करें।", isCritical: true },
      { step: 2, title_en: "Register for Udyam MSME certificate", title_hi: "उद्यम एमएसएमई प्रमाणपत्र प्राप्त करें", desc_en: "Completely free online registration using Aadhaar. Avoid fake sites.", desc_hi: "आधार का उपयोग करके पूरी तरह से मुफ्त ऑनलाइन पंजीकरण। नकली वेबसाइटों से बचें।", isCritical: true },
      { step: 3, title_en: "Initiate Mudra Loan Request", title_hi: "मुद्रा ऋण आवेदन प्रारंभ करें", desc_en: "Approach nationalized banks with Udyam ID and equipment projection lists.", desc_hi: "उद्यम आईडी और मशीनरी अनुमानित खर्चों की सूची के साथ राष्ट्रीयकृत बैंकों से संपर्क करें।", isCritical: true }
    ]
  },
  {
    id: "farmer",
    title_en: "I am a Farmer",
    title_hi: "मैं एक किसान हूँ",
    description_en: "Maximize direct yield bank pay, robust PM-KISAN cash offsets, Kisam Credit Cards, and PMFBY crop security protections.",
    description_hi: "सीधे कृषि बैंक भुगतान बढ़ाएं, ठोस पीएम-किसान नकद लाभ, किसान क्रेडिट कार्ड (KCC) और फसल सुरक्षा बीमा सुरक्षा प्राप्त करें।",
    documents: [
      { name_en: "Land Records Copy / Khatauni", name_hi: "भू-अभिलेख कॉपी (खतौनी)", purpose_en: "Legal ownership paper proving cultivable soil holdings", purpose_hi: "कृषि योग्य जोत साबित करने वाला कानूनी स्वामित्व पत्र", isMandatory: true, normName: "Land Records / Khatauni" },
      { name_en: "Soil Health Card", name_hi: "मृदा स्वास्थ्य कार्ड (Soil Card)", purpose_en: "Indicates crop nutrient needs and fertilizer optimization rates", purpose_hi: "फसल पोषक तत्वों की आवश्यकता और उर्वरक अनुकूलन दर को दर्शाता है", isMandatory: false, normName: "Soil Health Card" },
      { name_en: "Kisan Credit Card (KCC)", name_hi: "किसान क्रेडिट कार्ड (KCC)", purpose_en: "Agricultural credit line ensuring ultra-low interest crop loans", purpose_hi: "अति-निम्न ब्याज पर कृषि ऋण प्रदान करने वाला कार्ड", isMandatory: false, normName: "KCC" },
      { name_en: "Aadhaar Card", name_hi: "आधार कार्ड", purpose_en: "Mandatory identifier for PM-KISAN integration", purpose_hi: "पीएम-किसान एकीकरण के लिए अनिवार्य पहचानकर्ता", isMandatory: true, normName: "Aadhaar Card" }
    ],
    schemes: [
      { name_en: "PM-KISAN Samman Nidhi", name_hi: "पीएम-किसान सम्मान निधि", desc_en: "₹6,000 yearly income support paid in 3 dynamic instalments directly to bank accounts.", desc_hi: "३ समान किस्तों में ₹६,००० की वार्षिक आय सहायता सीधे किसानों के बैंक खातों में।", portal_en: "https://pmkisan.gov.in", portal_hi: "https://pmkisan.gov.in" },
      { name_en: "Kisan Credit Card Scheme (KCC)", name_hi: "किसान क्रेडिट कार्ड (KCC)", desc_en: "Flexible farming credits up to ₹3 lakh at dynamic 4% interest rates.", desc_hi: "४% रियायती ब्याज दर पर ₹३ लाख तक का लचीला कृषि ऋण लाभ।", portal_en: "https://pmkisan.gov.in", portal_hi: "https://pmkisan.gov.in" },
      { name_en: "PM Fasal Bima Yojana (PMFBY)", name_hi: "प्रधानमंत्री फसल बीमा योजना (PMFBY)", desc_en: "Crop safety shield against natural catastrophes, drought, and cyclones.", desc_hi: "प्राकृतिक आपदाओं, सूखे और चक्रवात के खिलाफ व्यापक फसल बीमा कवच।", portal_en: "https://pmfby.gov.in", portal_hi: "https://pmfby.gov.in" }
    ],
    insurance: [
      { name_en: "PMFBY Crop Insurance", name_hi: "प्रधानमंत्री फसल बीमा (PMFBY)", desc_en: "Dynamic crop damage yield recovery assurance.", desc_hi: "प्राकृतिक नुकसान होने पर फसल उपज क्षति भरपाई कवरेज भारत सरकार द्वारा।" }
    ],
    portals: [
      { name_en: "PM-KISAN Official Portal", name_hi: "पीएम-किसान प्रमुख पोर्टल", url: "https://pmkisan.gov.in" },
      { name_en: "PMFBY Crop Insurance Portal", name_hi: "फसल बीमा सरकारी पोर्टल", url: "https://pmfby.gov.in" }
    ],
    emergency: [
      { label_en: "Kisan Call Center (KCC) Support", label_hi: "किसान कॉल सेंटर (KCC) टोल-फ्री", number: "18001801551" }
    ],
    roadmap: [
      { step: 1, title_en: "Secure Updated Land Khatauni", title_hi: "अद्यतन भूमि खतौनी प्राप्त करें", desc_en: "Contact Lekhpal/Patwari to ensure local land registry displays your name correctly.", desc_hi: "पटवारी या राजस्व अधिकारी से संपर्क कर सुनिश्चित करें कि खतौनी में आपका नाम सही है।", isCritical: true },
      { step: 2, title_en: "Apply for PMKisan integration", title_hi: "पीएम-किसान एकीकरण के लिए आवेदन करें", desc_en: "E-KYC is mandatory to receive recurring quarterly payouts.", desc_hi: "तिमाही वित्तीय किस्तों की निर्बाध प्राप्ति के लिए ई-केवाईसी अनिवार्य है।", isCritical: true },
      { step: 3, title_en: "Get Kisan Credit Card (KCC) from Branch", title_hi: "बैंक शाखा से किसान क्रेडिट कार्ड (KCC) लें", desc_en: "Submit land survey maps and farming certification to avail low-interest credits.", desc_hi: "कम ब्याज पर कृषि ऋण के लिए भूमि मानचित्र और कृषि प्रमाणपत्र जमा करें।", isCritical: false }
    ]
  },
  {
    id: "woman",
    title_en: "I am a Woman",
    title_hi: "मैं एक महिला हूँ",
    description_en: "Avail maternity financial aid PM-MVY, Sukanya Samriddhi girl child funds, Self-Help Group microloans, and Lakhpati Didi grants.",
    description_hi: "मातृत्व वित्तीय सहायता पीएम-एमवीवाई, सुकन्या समृद्धि बालिका शिक्षा कोष, स्वयं सहायता समूह (SHG) ऋण और लखपति दीदी अनुदान प्राप्त करें।",
    documents: [
      { name_en: "Aadhaar Card", name_hi: "आधार कार्ड", purpose_en: "Maternal direct benefit verification marker", purpose_hi: "मातृत्व प्रत्यक्ष लाभ हस्तांतरण (DBT) सत्यापन पहचान पत्र", isMandatory: true, normName: "Aadhaar Card" },
      { name_en: "SHG Member Certificate", name_hi: "स्वयं सहायता समूह (SHG) सदस्यता पत्र", purpose_en: "Confirms inclusion in state women cooperative enterprise networks", purpose_hi: "राज्य महिला सहकारी उद्यम नेटवर्क में शामिल होने की पुष्टि करता है", isMandatory: false, normName: "SHG Certificate" },
      { name_en: "Ration Card", name_hi: "राशन कार्ड (महिला मुखिया के नाम पर)", purpose_en: "Ensures subsidized family nutrition foods under NFSA", purpose_hi: "राष्ट्रीय खाद्य सुरक्षा के तहत रियायती पारिवारिक राशन सामग्री सुनिश्चित करता है", isMandatory: true, normName: "Ration Card" }
    ],
    schemes: [
      { name_en: "Pradhan Mantri Matru Vandana Yojana (PMMVY)", name_hi: "प्रधानमंत्री मातृ वंदना योजना", desc_en: "₹5,000 direct cash assistance for pregnant and lactating mothers.", desc_hi: "गर्भवती और स्तनपान कराने वाली माताओं के लिए ₹५,००० की सीधी नकद वित्तीय सहायता।", portal_en: "https://wcd.nic.in", portal_hi: "https://wcd.nic.in" },
      { name_en: "Sukanya Samriddhi Yojana (SSY)", name_hi: "सुकन्या समृद्धि योजना (SSY)", desc_en: "High-interest savings scheme focused on securing the future of girl children.", desc_hi: "बालिकाओं के भविष्य को सुरक्षित करने के लिए उच्च ब्याज वाली छोटी बचत योजना।", portal_en: "https://www.indiapost.gov.in", portal_hi: "https://www.indiapost.gov.in" },
      { name_en: "Lakhpati Didi Program", name_hi: "लखपति दीदी योजना", desc_en: "Financial training and enterprise tools support rural self-help group members to earn ₹1 lakh+ annually.", desc_hi: "ग्रामीण स्वयं सहायता समूह सदस्यों को व्यावसायिक प्रशिक्षण और अनुदान ताकि वे प्रति वर्ष ₹१ लाख कमा सकें।", portal_en: "https://daynrlm.gov.in", portal_hi: "https://daynrlm.gov.in" }
    ],
    insurance: [],
    portals: [
      { name_en: "Ministry of Women & Child Development", name_hi: "महिला एवं बाल विकास मंत्रालय", url: "https://wcd.nic.in" },
      { name_en: "India Post Sukanya Seva", name_hi: "भारतीय डाक सुकन्या समृद्धि सेवा", url: "https://www.indiapost.gov.in" }
    ],
    emergency: [
      { label_en: "Women Helpline (National)", label_hi: "महिला हेल्पलाइन (राष्ट्रीय हॉटलाइन)", number: "181" },
      { label_en: "Emergency Response Support System", label_hi: "आपातकालीन त्वरित प्रतिक्रिया हेल्पलाइन", number: "112" }
    ],
    roadmap: [
      { step: 1, title_en: "Establish SSY Account for Girl Child", title_hi: "बालिका के नाम सुकन्या समृद्धि खाता खोलें", desc_en: "Open at post office or authorized bank for girl child under 10 years of age.", desc_hi: "१० वर्ष से कम आयु की बालिका के लिए नजदीकी डाकघर या अधिकृत बैंक में खाता खुलवाएं।", isCritical: true },
      { step: 2, title_en: "Join local Block Self-Help Group (SHG)", title_hi: "स्थानीय ब्लॉक स्वयं सहायता समूह से जुड़ें", desc_en: "Gain entry to community revolving credit grants and Lakhpati mentorship.", desc_hi: "सामुदायिक ऋण अनुदान और लखपति दीदी व्यावसायिक प्रशिक्षण तक पहुंच प्राप्त करें।", isCritical: false },
      { step: 3, title_en: "Claim PMMVY Maternal Benefits", title_hi: "PMMVY मातृत्व लाभ का दावा करें", desc_en: "Submit vaccination progress sheets to local ASHA workers for cash transfers.", desc_hi: "वित्तीय नकद हस्तांतरण के लिए स्थानीय आशा कार्यकर्ताओं के पास टीकाकरण कार्ड जमा करें।", isCritical: true }
    ]
  },
  {
    id: "senior-citizen",
    title_en: "I am a Senior Citizen",
    title_hi: "मैं एक वरिष्ठ नागरिक हूँ",
    description_en: "Access secure central pensions, Ayushman Bharat senior exception health covers, and transport concessions.",
    description_hi: "सुरक्षित केंद्रीय या राज्य पेंशन, आयुष्मान भारत वरिष्ठ अपवाद स्वास्थ्य बीमा और परिवहन रियायत प्राप्त करें।",
    documents: [
      { name_en: "Aadhaar Card", name_hi: "आधार कार्ड", purpose_en: "Critical age-proof verify marker (Age 60+)", purpose_hi: "महत्वपूर्ण आयु प्रमाण सत्यापन पत्र (६० वर्ष से अधिक)", isMandatory: true, normName: "Aadhaar Card" },
      { name_en: "Bank Passbook (Joint/Single)", name_hi: "बैंक पासबुक (पेंशन सीडेड)", purpose_en: "Account details for recurring pension direct transfer", purpose_hi: "मासिक वृद्धवस्था पेंशन सीधे डीबीडी द्वारा प्राप्त करने हेतु", isMandatory: true, normName: "Bank Passbook" },
      { name_en: "Income Certificate", name_hi: "आय प्रमाण पत्र", purpose_en: "Determines eligibility for state-sponsored social welfare pensions", purpose_hi: "राज्य सरकार द्वारा प्रायोजित वृद्धावस्था पेंशन पात्रता निर्धारित करता है", isMandatory: false, normName: "Income Certificate" }
    ],
    schemes: [
      { name_en: "Indira Gandhi National Old Age Pension", name_hi: "इन्दिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन", desc_en: "Monthly financial pension assistance paid to seniors under BPL.", desc_hi: "गरीबी रेखा के नीचे रहने वाले ६०-७९ आयु वर्ग के वरिष्ठों को मासिक पेंशन सहायता।", portal_en: "https://nsap.nic.in", portal_hi: "https://nsap.nic.in" },
      { name_en: "Pradhan Mantri Vaya Vandana Yojana (PMVVY)", name_hi: "प्रधानमंत्री वय वंदना योजना", desc_en: "Guaranteed investment returns scheme via LIC providing safe payout values.", desc_hi: "वरिष्ठ नागरिकों के लिए सुनिश्चित मासिक रिटर्न प्रदान करने वाली सुरक्षित बचत योजना (LIC)।", portal_en: "https://www.licindia.in", portal_hi: "https://www.licindia.in" },
      { name_en: "Ayushman Bharat PM-JAY", name_hi: "आयुष्मान भारत स्वास्थ्य योजना", desc_en: "Free super-specialty health insurance card up to ₹5,000,000 per family.", desc_hi: "प्रतिष्ठित सुपर-स्पेशियलिटी अस्पतालों में ₹५,००,००० तक का बिल्कुल मुफ्त इलाज कार्ड।", portal_en: "https://pmjay.gov.in", portal_hi: "https://pmjay.gov.in" }
    ],
    insurance: [
      { name_en: "PM-JAY Senior Citizens Health Shield", name_hi: "PM-JAY वरिष्ठ नागरिक स्वास्थ्य कवच", desc_en: "Cashless secondary, tertiary treatment cover at listed empanelled hospitals.", desc_hi: "सूचीबद्ध अस्पतालों में कैशलेस गंभीर स्वास्थ्य उपचार कवरेज।" }
    ],
    portals: [
      { name_en: "NSAP Pension Directory", name_hi: "NSAP पेंशन केंद्रीय पोर्टल", url: "https://nsap.nic.in" },
      { name_en: "Ayushman Card Portal", name_hi: "आयुष्मान भारत आधिकारिक पोर्टल", url: "https://dashboard.pmjay.gov.in" }
    ],
    emergency: [
      { label_en: "Elder Helpline (National Portal)", label_hi: "एल्डर हेल्पलाइन (राष्ट्रीय सेवा)", number: "14567" }
    ],
    roadmap: [
      { step: 1, title_en: "Obtain Digitally Signed Age Certificate", title_hi: "डिजिटल हस्ताक्षरित आयु प्रमाण पत्र प्राप्त करें", desc_en: "Match age strictly to 60+ on Aadhaar; run biometric Iris correction if print is faded.", desc_hi: "आधार पर आयु का ६०+ से मिलान करें; फिंगरप्रिंट धुंधले होने पर आईरिस स्कैनर द्वारा आधार अपडेट कराएं।", isCritical: true },
      { step: 2, title_en: "File NSAP Request on State Portal", title_hi: "NSAP पेंशन के लिए राज्य पोर्टल पर आवेदन करें", desc_en: "Affix zero-balance bank details; verify and map to NPCI and secure DBT validation.", desc_hi: "शून्य-शेष बैंक विवरण संलग्न करें; वित्तीय डीबीटी अनुमोदन हेतु एनपीसीआई मैपिंग सुनिश्चित करें।", isCritical: true },
      { step: 3, title_en: "Acquire your Ayushman Golden Smart Card", title_hi: "अपना आयुष्मान गोल्डन स्मार्ट कार्ड प्राप्त करें", desc_en: "Verify family registration on NHM rosters through local government centers.", desc_hi: "स्थानीय सरकारी अस्पताल या सेवा केंद्र के माध्यम से आयुष्मान परिवार सूची में नाम सत्यापित कराएं।", isCritical: true }
    ]
  },
  {
    id: "pwd",
    title_en: "I am a Person with Disability",
    title_hi: "मैं एक दिव्यांगजन हूँ",
    description_en: "Unlock central UDID smart cards, disability welfare pensions, customized aids/appliances, and reservation allowances.",
    description_hi: "केंद्रीय विशिष्ट दिव्यांगता पहचान (UDID) स्मार्ट कार्ड, दिव्यांगता कल्याण पेंशन, सहायक उपकरण और आरक्षण लाभ प्राप्त करें।",
    documents: [
      { name_en: "UDID Card", name_hi: "यूडीआईडी (UDID) विशिष्ट दिव्यांगता कार्ड", purpose_en: "Unique Disability ID card valid across all Indian states and services", purpose_hi: "सभी भारतीय राज्यों और सेवाओं में मान्य विशिष्ट दिव्यांगता पहचान पत्र", isMandatory: true, normName: "UDID Card" },
      { name_en: "Disability Certificate", name_hi: "दिव्यांगता चिकित्सा प्रमाण पत्र", purpose_en: "Authorized medical certificate specifying percent of biological impairment", purpose_hi: "शारीरिक अक्षमता प्रतिशत निर्दिष्ट करने वाला अधिकृत चिकित्सा प्रमाण पत्र", isMandatory: true, normName: "Disability Certificate" },
      { name_en: "Aadhaar Card", name_hi: "आधार कार्ड", purpose_en: "Foundational DBT verification proof", purpose_hi: "बुनियादी डीबीटी और सरकारी सत्यापन प्रमाण", isMandatory: true, normName: "Aadhaar Card" }
    ],
    schemes: [
      { name_en: "Indira Gandhi National Disability Pension (IGNDPS)", name_hi: "इन्दिरा गांधी राष्ट्रीय दिव्यांगता पेंशन", desc_en: "Monthly income support for persons with severe or profound (80%+) disability.", desc_hi: "गंभीर या पूर्ण (८०% से अधिक) दिव्यांगता वाले व्यक्तियों के लिए मासिक वित्तीय पेंशन सहायता।", portal_en: "https://nsap.nic.in", portal_hi: "https://nsap.nic.in" },
      { name_en: "Niramaya Health Insurance Scheme", name_hi: "निरामया स्वास्थ्य बीमा योजना", desc_en: "Dedicated insurance scheme up to ₹1 Lakh for individuals with autism, cerebral palsy, and multiple intellectual disabilities.", desc_hi: "ऑटिज्म और बौद्धिक दिव्यांगताओं से ग्रसित लोगों के लिए ₹१ लाख तक की समर्पित स्वास्थ्य उपचार बीमा योजना।", portal_en: "https://www.thenationaltrust.gov.in", portal_hi: "https://www.thenationaltrust.gov.in" },
      { name_en: "ADIP Scheme", name_hi: "एडीआईपी (ADIP) सहायता योजना", desc_en: "Free high-quality assistive aids, wheelchairs, and localized prosthetics under central ministry.", desc_hi: "मंत्रालय के अधीन निशुल्क उच्च गुणवत्ता वाले कृत्रिम अंग, ट्राई-साइकिल और सहायक संवर्धन उपकरण योजना।", portal_en: "https://disabilityaffairs.gov.in", portal_hi: "https://disabilityaffairs.gov.in" }
    ],
    insurance: [
      { name_en: "Niramaya Disability Health Insurance", name_hi: "निरामया दिव्यांगता स्वास्थ्य सुरक्षा योजना", desc_en: "Comprehensive cashless outpatient and inpatient health cover.", desc_hi: "विशेष दिव्यांग संरक्षण हेतु कैशलेस ओपीडी और अस्पताल चिकित्सा आवरण।" }
    ],
    portals: [
      { name_en: "Swavlamban Card UDID Portal", name_hi: "स्वावलंबन कार्ड विशिष्ट आईडी पोर्टल", url: "https://www.swavlambancard.gov.in" },
      { name_en: "National Trust for Welfare of Persons", name_hi: "नेशनल ट्रस्ट दिव्यांग कल्याण पोर्टल", url: "https://www.thenationaltrust.gov.in" }
    ],
    emergency: [
      { label_en: "Social Justice Relief toll-free", label_hi: "सामाजिक न्याय राहत टोल-फ्री", number: "1800110180" }
    ],
    roadmap: [
      { step: 1, title_en: "Schedule Disability Medical Evaluation", title_hi: "दिव्यांगता चिकित्सा मूल्यांकन निर्धारित करें", desc_en: "Apply on Swavlamban portal; visit authorized district hospital panel to evaluate percentage (>40% mandatory).", desc_hi: "स्वावलंबन पोर्टल पर आवेदन करें; अधिकृत जिला अस्पताल बोर्ड से अक्षमता प्रतिशत (>४०% आवश्यक) का प्रमाण प्राप्त करें।", isCritical: true },
      { step: 2, title_en: "Acquire Swavlamban UDID Smart Card", title_hi: "स्वावलंबन UDID स्मार्ट कार्ड प्राप्त करें", desc_en: "Download digitally signed PDF; card serves as universal and sole document proof across banks, trains.", desc_hi: "डिजिटल हस्ताक्षरित पीडीएफ डाउनलोड करें; यह कार्ड ट्रेन टिकट, बैंक और नौकरियों में एकल वैध दस्तावेज़ के रूप में कार्य करता है।", isCritical: true },
      { step: 3, title_en: "Apply for IGNDPS Welfare Pension", title_hi: "IGNDPS कल्याण पेंशन के लिए आवेदन करें", desc_en: "Submit UDID to local Social Welfare Block desk to unlock DBT monthly payouts.", desc_hi: "मासिक डीबीटी वित्तीय लाभ शुरू करने के लिए स्थानीय समाज कल्याण कार्यालय में अपना यूडीआईडी जमा करें।", isCritical: true }
    ]
  },
  {
    id: "travel-abroad",
    title_en: "I Want to Travel Abroad",
    title_hi: "मैं विदेश यात्रा करना चाहता हूँ",
    description_en: "Set up international passports, visa guidelines, verified tax declarations, travel insurance rules, and Passport Seva timelines.",
    description_hi: "अंतरराष्ट्रीय पासपोर्ट, वीजा दिशानिर्देश, प्रमाणित कर घोषणाएं, यात्रा बीमा नियम और पासपोर्ट सेवा आवेदन समय सीमाएं जानें।",
    documents: [
      { name_en: "Passport", name_hi: "पासपोर्ट", purpose_en: "Primary credential valid across global territories", purpose_hi: "वैश्विक क्षेत्रों में मान्य प्राथमिक पहचान क्रेडेंशियल", isMandatory: true, normName: "Passport" },
      { name_en: "Aadhaar Card", name_hi: "आधार कार्ड", purpose_en: "Address evidence for passport verification", purpose_hi: "पासपोर्ट पुलिस सत्यापन के लिए निवास का प्रमुख दस्तावेजी साक्ष्य", isMandatory: true, normName: "Aadhaar Card" },
      { name_en: "PAN Card", name_hi: "पैन कार्ड", purpose_en: "Verifies foreign conversion and remittance tracking (LRS)", purpose_hi: "विदेशी मुद्रा विनिमय और प्रेषण ट्रैकिंग (LRS) की पुष्टि करता है", isMandatory: true, normName: "PAN Card" },
      { name_en: "Bank Statement (3-6 Months)", name_hi: "बैंक स्टेटमेंट (३-६ महीने)", purpose_en: "Proof of financial solvency for visa approval", purpose_hi: "वीजा देश की शर्तों के अनुसार वित्तीय शोधन क्षमता और बैंक बैलेंस का प्रमाण", isMandatory: true, normName: "Bank Passbook" }
    ],
    schemes: [],
    insurance: [
      { name_en: "Overseas Travel Insurance", name_hi: "विदेशी यात्रा बीमा", desc_en: "Covers emergency international medical sickness, luggage delays, and passport loss.", desc_hi: "आपातकालीन विदेशी चिकित्सा, सामान की देरी और पासपोर्ट खोने की वित्तीय भरपाई सुरक्षा।" }
    ],
    portals: [
      { name_en: "Passport Seva Official website", name_hi: "पासपोर्ट सेवा आधिकारिक वेबसाइट", url: "https://passportindia.gov.in" },
      { name_en: "Consular Services Portals (Ministry of External Affairs)", name_hi: "MEA कांसुलर प्रवासी सेवा पोर्टल", url: "https://www.mea.gov.in" }
    ],
    emergency: [
      { label_en: "MEA Consular Control Room", label_hi: "MEA प्रवासी नियंत्रण कक्ष", number: "+911149015132" }
    ],
    roadmap: [
      { step: 1, title_en: "Book Slot on Passport Seva Kendras", title_hi: "पासपोर्ट सेवा केंद्र पर स्लॉट बुक करें", desc_en: "Fill out online forms, pay ₹1,500 standard fee, and choose PSK appointment date.", desc_hi: "ऑनलाइन फॉर्म भरें, ₹१,५०० का मानक शुल्क चुकाएं और पीएसके स्लॉट बुक करें।", isCritical: true },
      { step: 2, title_en: "Prepare original high school sheets and Aadhaar", title_hi: "मूल हाई स्कूल मार्कशीट और आधार तैयार रखें", desc_en: "Non-ECR status requires matriculation certificate verification on PSK.", desc_hi: "गैर-ईसीआर (Non-ECR) का दर्जा पाने हेतु दसवीं की मूल मार्कशीट दिखाना आवश्यक है।", isCritical: true },
      { step: 3, title_en: "Undergo Local Police Verification", title_hi: "स्थानीय पुलिस सत्यापन प्रक्रिया पूरी करें", desc_en: "Keep address proof copy ready for local beat officers within 5 days of PSK check.", desc_hi: "पासपोर्ट कार्यालय सत्यापन के ५ दिनों के भीतर स्थानीय पुलिस जांच के लिए निवास प्रमाण की प्रति तैयार रखें।", isCritical: true }
    ],
    specialTab10: {
      timeline_en: "15 to 20 business days (Normal path); 3 business days under Tatkaal fastpass.",
      timeline_hi: "१५ से २० कार्य दिवस (सामान्य मार्ग); तत्काल श्रेणी के तहत ३ कार्य दिवस।",
      rejections_en: ["Mismatch in father's name spelling across Aadhaar and PAN", "Active criminal case or pending local court bails", "Police report failing due to tenant verification issues"],
      rejections_hi: ["आधार और पैन में पिता के नाम की वर्तनी (Spelling) में विसंगति होना।", "सक्रिय आपराधिक मामला या स्थानीय अदालत में लंबित ज़मानत आवेदन।", "किरायेदार सत्यापन न होने के कारण पुलिस रिपोर्ट का प्रतिकूल आना।"]
    }
  },
  {
    id: "married",
    title_en: "I Got Married",
    title_hi: "मेरी शादी हो गई है",
    description_en: "Register legal marriage certificates, update Aadhaar post-nuptial names, revise nominee credentials, and update passport and bank profiles.",
    description_hi: "कानूनी विवाह प्रमाण पत्र पंजीकृत करें, शादी के बाद आधार प्रोफाइल नाम अपडेट करें, नामांकित विवरण बदलें और संयुक्त बैंक खाते खोलें।",
    documents: [
      { name_en: "Marriage Certificate", name_hi: "विवाह प्रमाण पत्र", purpose_en: "Legal certificate confirming validity under Hindu Marriage Act / Special Marriage Act", purpose_hi: "हिंदू विवाह अधिनियम / विशेष विवाह अधिनियम के तहत वैधता की पुष्टि करने वाला कानूनी प्रमाण पत्र", isMandatory: true, normName: "Marriage Certificate" },
      { name_en: "Aadhaar Card", name_hi: "आधार कार्ड", purpose_en: "Updated identity with revised marital surname and husband's name", purpose_hi: "संशोधित उपनाम और पति के नाम के साथ अपडेटेड आधार कार्ड", isMandatory: true, normName: "Aadhaar Card" }
    ],
    schemes: [],
    insurance: [],
    portals: [
      { name_en: "State e-District portal for Marriage registration", name_hi: "ऑनलाइन विवाह पंजीकरण राज्य पोर्टल", url: "https://serviceonline.gov.in" }
    ],
    emergency: [],
    roadmap: [
      { step: 1, title_en: "Secure Legally Signed Marriage Certificate", title_hi: "कानूनी रूप से हस्ताक्षरित विवाह प्रमाण पत्र लें", desc_en: "Register marriage online via state e-District portal within 60 days of event.", desc_hi: "विवाह संपन्न होने के ६० दिनों के भीतर राज्य के ऑनलाइन ई-डिस्ट्रिक्ट पोर्टल के माध्यम से विवाह दर्ज करें।", isCritical: true },
      { step: 2, title_en: "Update Marital Surname on Aadhaar", title_hi: "आधार कार्ड पर नया उपनाम व पता अपडेट करें", desc_en: "Submit marriage certificate and joint photo proof at nearest Aadhaar center.", desc_hi: "शादी के प्रमाणपत्र और संयुक्त फोटो के साथ नजदीकी आधार केंद्र पर विवरण सुधारें।", isCritical: true },
      { step: 3, title_en: "Amend Spousal Nominee details on Bank Account", title_hi: "बैंक खातों में पति/पत्नी को नामांकित (Nominee) करें", desc_en: "Visit bank branch or use online dashboard profile utilities.", desc_hi: "पेंशन और बैंक जमा की सुरक्षा के लिए अपनी बैंक शाखा या ऑनलाइन ऐप पर नोमिनी विवरण अपडेट करें।", isCritical: false }
    ]
  },
  {
    id: "parent",
    title_en: "I Became a Parent",
    title_hi: "मैं माता-पिता बन गया हूँ",
    description_en: "Obtain statutory birth registration, secure pediatric vaccination records, open ABHA minor health profiles, and launch future academic investment pools.",
    description_hi: "वैधानिक जन्म पंजीकरण प्राप्त करें, बाल टीकाकरण रिकॉर्ड सुरक्षित करें, आभा (ABHA) माइनर स्वास्थ्य प्रोफाइल खोलें और भविष्य की बचत शुरू करें।",
    documents: [
      { name_en: "Birth Certificate", name_hi: "जन्म प्रमाण पत्र", purpose_en: "Statutory birth registration proof and digital age record", purpose_hi: "वैधानिक जन्म पंजीकरण प्रमाण और डिजिटल आयु रिकॉर्ड", isMandatory: true, normName: "Birth Certificate" },
      { name_en: "Aadhaar minor Card", name_hi: "बाल आधार कार्ड (Blue Aadhaar)", purpose_en: "Juvenile biometrics-free card (valid until age 5) linked to parent", purpose_hi: "माता-पिता से लिंक ५ वर्ष की आयु तक के बच्चों के लिए नीले रंग का बाल आधार", isMandatory: true, normName: "Aadhaar Card" }
    ],
    schemes: [
      { name_en: "Mission Indradhanush Vaccination Plan", name_hi: "मिशन इन्द्रधनुष पूर्ण टीकाकरण", desc_en: "Compulsory and free pediatric immunization registry against 12 diseases.", desc_hi: "१२ जानलेवा बीमारियों के खिलाफ बच्चों का पूर्ण और निशुल्क राष्ट्रीय टीकाकरण कार्यक्रम।", portal_en: "https://www.nhm.gov.in", portal_hi: "https://www.nhm.gov.in" }
    ],
    insurance: [
      { name_en: "Ayushman Bharat PMJAY child inclusion", name_hi: "आयुष्मान भारत नवजात शिशु सुरक्षा", desc_en: "Auto-protects newborns cash-free in panel hospitals from birth.", desc_hi: "अस्पताल में जन्म के दिन से ही नवजात शिशु को बिल्कुल मुफ्त आयुष्मान उपचार सुरक्षा।" }
    ],
    portals: [
      { name_en: "Civil Registration System (CRS)", name_hi: "नागरिक पंजीकरण प्रणाली (जन्म-मृत्यु सेवा)", url: "https://crsorgi.gov.in" }
    ],
    emergency: [
      { label_en: "Childline (National Welfare)", label_hi: "बाल संरक्षण संकटकालीन चाइल्डलाइन", number: "1098" }
    ],
    roadmap: [
      { step: 1, title_en: "Register Birth within 21 Days of Event", title_hi: "जन्म के २१ दिनों के भीतर पंजीकरण कराएं", desc_en: "CRS portal provides free birth certificate within 21 days; late applications require executive magistrate orders.", desc_hi: "CRS पोर्टल २१ दिनों के भीतर मुफ्त प्रमाणपत्र प्रदान करता है; देरी से आवेदन करने पर मजिस्ट्रेट आदेश की आवश्यकता होती है।", isCritical: true },
      { step: 2, title_en: "Apply for Child Blue Aadhaar Card", title_hi: "बच्चे के लिए नीले रंग का बाल आधार कार्ड बनवाएं", desc_en: "Aadhaar enrollment requires child birth certificate and parent's active biometric validation on site.", desc_hi: "आधार केंद्र पर बच्चे के जन्म प्रमाणपत्र और माता-पिता के बायोमेट्रिक्स का उपयोग करके बाल आधार कार्ड बनवाएं।", isCritical: true },
      { step: 3, title_en: "Activate child ABHA Health profile", title_hi: "बच्चे की आभा (ABHA) स्वास्थ्य आईडी सक्रिय करें", desc_en: "Saves computerized vaccination histories on public servers for life.", desc_hi: "भविष्य के लिए बच्चे के टीकाकरण इतिहास को क्लाउड जन स्वास्थ्य सर्वर से सुरक्षित रूप से जोड़ें।", isCritical: false }
    ]
  },
  {
    id: "buy-house",
    title_en: "I Want to Buy a House",
    title_hi: "मैं घर खरीदना चाहता हूँ",
    description_en: "Access PM Awas Yojana (PMAY) subsidies, stamp duty land checks, registry procedures, loan tools, and municipal validation proofs.",
    description_hi: "प्रधानमंत्री आवास योजना (PMAY) सब्सिडी, स्टांप ड्यूटी सत्यापन, रजिस्ट्री प्रक्रिया, ऋण उपकरण और नगरपालिका अनुमति पत्र प्राप्त करें।",
    documents: [
      { name_en: "Aadhaar Card", name_hi: "आधार कार्ड", purpose_en: "Mandatory address proof mapping and subsidy link", purpose_hi: "सरकारी अनुदान लिंक और पक्के पते का कानूनी दस्तावेजी साक्ष्य", isMandatory: true, normName: "Aadhaar Card" },
      { name_en: "Income Certificate", name_hi: "आय प्रमाण पत्र", purpose_en: "Eligibility classification across PMAY EWS and LIG blocks", purpose_hi: "पीएमएवाई ईडब्ल्यूएस और एलआईजी वर्गों के तहत पात्रता वर्गीकरण", isMandatory: true, normName: "Income Certificate" },
      { name_en: "Land Ownership Record Copy", name_hi: "राजस्व भूमि रजिस्ट्री (रजिस्ट्री/पट्टा)", purpose_en: "Proof of title and non-encumbrance status", purpose_hi: "भूमि के मालिकाना हक का प्रमाण और भारमुक्त स्थिति की स्पष्टता", isMandatory: true, normName: "Land Records / Khatauni" }
    ],
    schemes: [
      { name_en: "Pradhan Mantri Awas Yojana (PMAY)", name_hi: "प्रधानमंत्री आवास योजना (PMAY)", desc_en: "Affordable housing grants and interest subsidies up to ₹2.67 lakh for eligible EWS/LIG families.", desc_hi: "पात्र परिवारों को सुलभ पक्का मकान निर्माण हेतु ₹२.६७ लाख तक का सीधा क्रेडिट सब्सिडी लाभ।", portal_en: "https://pmay-urban.gov.in", portal_hi: "https://pmay-urban.gov.in" }
    ],
    insurance: [
      { name_en: "Home Mortgage Protection Cover", name_hi: "गृह ऋण बंधक बीमा कवच", desc_en: "Covers balance home loan amount against unexpected breadwinner expiry.", desc_hi: "ऋण चुकाने के दौरान मुख्य कमाने वाले की मृत्यु पर गृह ऋण बंद करने वाला बीमा कवच।" }
    ],
    portals: [
      { name_en: "PMAY Urban / Gramin Portal", name_hi: "पी.एम. आवास योजना आधिकारिक पोर्टल", url: "https://pmayurban.gov.in" },
      { name_en: "State Land Registry Stamp duty site", name_hi: "राज्य राजस्व भूमि स्टांप एवं रजिस्ट्री साइट", url: "https://serviceonline.gov.in" }
    ],
    emergency: [],
    roadmap: [
      { step: 1, title_en: "Acquire Land Non-Encumbrance Certificate", title_hi: "जमीन का भारमुक्ति प्रमाण पत्र (EC) प्राप्त करें", desc_en: "Verify registry search books for past 13 years to avoid disputed plots.", desc_hi: "विवादित भूखंडों से बचने के लिए पिछले १३ वर्षों के रजिस्ट्री रिकॉर्ड की जांच जिला उप-पंजीयक कार्यालय से कराएं।", isCritical: true },
      { step: 2, title_en: "Check Class-wise eligibility for PMAY", title_hi: "PMAY के तहत अपनी श्रेणी-वार पात्रता जांचें", desc_en: "Ensure household income matches EWS limit; verify that you do not hold any other brick house.", desc_hi: "सुनिश्चित करें कि पारिवारिक आय गरीबी सीमा के अनुकूल हो; देश में किसी अन्य पक्के मकान के मालिक न हों।", isCritical: true },
      { step: 3, title_en: "Submit Municipal Stamp Register", title_hi: "तहसीलदार/नगरपालिका स्टांप रजिस्ट्री जमा करें", desc_en: "Complete stamp payment to execute legal transfer of real-estate deeds.", desc_hi: "अचल संपत्ति के कानूनी हस्तांतरण निष्पादन हेतु पूर्ण स्टांप शुल्क का भुगतान तहसील में पूरा करें।", isCritical: true }
    ]
  },
  {
    id: "buy-vehicle",
    title_en: "I Want to Buy a Vehicle",
    title_hi: "मैं वाहन खरीदना चाहता हूँ",
    description_en: "Guide to driving licensing tests, third-party mandatory motor insurance protection, and bank vehicle loan paperwork checklists.",
    description_hi: "ड्राइविंग लाइसेंस परीक्षाओं, तृतीय-पक्ष अनिवार्य वाहन सुरक्षा और बैंक वाहन ऋण फाइलों के लिए मार्गदर्शिका।",
    documents: [
      { name_en: "Driving License", name_hi: "ड्राइविंग लाइसेंस", purpose_en: "Mandatory driving authorization across pathways", purpose_hi: "सार्वजनिक सड़कों पर गाड़ी चलाने की आवश्यक अनुमति और शारीरिक पहचान पत्र", isMandatory: true, normName: "Driving License" },
      { name_en: "PAN Card", name_hi: "पैन कार्ड", purpose_en: "Required to register high-value motor assets and check bank loans", purpose_hi: "उच्च मूल्य की गाड़ियों के पंजीकरण और बैंक वाहन ऋण लेने के लिए आवश्यक", isMandatory: true, normName: "PAN Card" },
      { name_en: "Aadhaar Card", name_hi: "आधार कार्ड", purpose_en: "Identity and address proof for state RTO records", purpose_hi: "राज्य आरटीओ (RTO) वाहन पंजीकरण हेतु पहचान और पते का साक्ष्य", isMandatory: true, normName: "Aadhaar Card" }
    ],
    schemes: [],
    insurance: [
      { name_en: "Mandatory Third Party Motor Insurance", name_hi: "अनिवार्य तृतीय-पक्ष मोटर वाहन बीमा", desc_en: "Compulsory legal protection under Motor Vehicles Act compensating accident victims.", desc_hi: "मोटर वाहन अधिनियम के तहत अनिवार्य कानूनी सुरक्षा जो दुर्घटना पीड़ितों को मुआवजा देती है।" },
      { name_en: "Commerical Comprehensive Car Insurance", name_hi: "व्यापक वाहन बीमा सुरक्षा", desc_en: "Protection against self-damage, fire, theft, and natural floods.", desc_hi: "स्वयं की गाड़ी के नुकसान, आग, चोरी और प्राकृतिक बाढ़ के खिलाफ वित्तीय सुरक्षा कवच।" }
    ],
    portals: [
      { name_en: "Parivahan Sewa Portal (Vahan/Sarathi)", name_hi: "परिवहन सेवा केंद्रीय पोर्टल (Vahan/Sarathi)", url: "https://parivahan.gov.in" }
    ],
    emergency: [
      { label_en: "Road Accident National helpline", label_hi: "सड़क दुर्घटना राष्ट्रीय सुरक्षा नंबर", number: "1073" }
    ],
    roadmap: [
      { step: 1, title_en: "Procure Learner's License on Sarathi", title_hi: "सारथी पोर्टल पर लर्नर लाइसेंस हेतु आवेदन करें", desc_en: "Pass online traffic and road-signs test; Learner's license remains valid for 6 months.", desc_hi: "ऑनलाइन यातायात नियमों की परीक्षा उत्तीर्ण करें; लर्नर लाइसेंस ६ महीने के लिए वैध रहता है।", isCritical: true },
      { step: 2, title_en: "Apply for Permanent Driving License", title_hi: "स्थायी ड्राइविंग लाइसेंस के लिए आवेदन करें", desc_en: "Attempt driving simulator and physical ground test after 30 days of Learner card approval.", desc_hi: "लर्नर कार्ड जारी होने के ३0 दिन बाद स्कूल परीक्षण ग्राउंड में गाड़ी चलाने की व्यावहारिक परीक्षा दें।", isCritical: true },
      { step: 3, title_en: "Acquire Vahan RC registration", title_hi: "आरटीओ से वाहन आरसी (RC) प्राप्त करें", desc_en: "Confirm high-security registration plates (HSRP) and third-party insurance validation before driving.", desc_hi: "सड़कों पर वाहन निकालने से पहले हाई-सिक्योरिटी नंबर प्लेट (HSRP) और वैध बीमा होना अनिवार्य है।", isCritical: true }
    ]
  },
  {
    id: "emergency",
    title_en: "Emergency Help",
    title_hi: "आपातकालीन मदद",
    description_en: "Fast triage dashboards for medical ambulance calls, cyber fraud reporting, women safety desks, natural catastrophes, and farmer agricultural crises.",
    description_hi: "चिकित्सा एम्बुलेंस, साइबर धोखाधड़ी, महिला सुरक्षा केंद्र, प्राकृतिक आपदा और किसान फसल संकट सहायता केंद्र।",
    documents: [
      { name_en: "Aadhaar Card", name_hi: "आधार कार्ड", purpose_en: "Required on government emergency hospital admissions", purpose_hi: "सरकारी अस्पतालों में आपातकालीन निःशुल्क चिकित्सा प्रवेश के लिए आवश्यक", isMandatory: false, normName: "Aadhaar Card" },
      { name_en: "Ayushman Card", name_hi: "आयुष्मान गोल्डन स्वास्थ्य कार्ड", purpose_en: "Instant cashless admissions proof for catastrophic illness hospitalizations", purpose_hi: "गंभीर बीमारी की स्थिति में कैशलेस निःशुल्क इलाज लाभ का स्वर्ण स्मार्ट सुरक्षा पत्र", isMandatory: false, normName: "Ayushman Card" }
    ],
    schemes: [],
    insurance: [],
    portals: [
      { name_en: "National Cyber Crime Reporting", name_hi: "राष्ट्रीय साइबर अपराध वेब रिपोर्टिंग", url: "https://cybercrime.gov.in" },
      { name_en: "National Disaster Management Authority", name_hi: "राष्ट्रीय आपदा प्रबंधन प्राधिकरण", url: "https://ndma.gov.in" }
    ],
    emergency: [
      { label_en: "National Emergency Combined Line", label_hi: "राष्ट्रीय आपातकालीन एकीकृत सेवा", number: "112" },
      { label_en: "Medical Ambulance Relief Express", label_hi: "चिकित्सा स्वास्थ्य एम्बुलेंस राहत", number: "102" },
      { label_en: "Women Helpline SOS Desk", label_hi: "महिला सुरक्षा संकटकालीन हेल्पलाइन", number: "181" },
      { label_en: "National Cyber Fraud Grievance Desk", label_hi: "राष्ट्रीय साइबर वित्तीय धोखाधड़ी शिकायत केंद्र", number: "1930" },
      { label_en: "Farmer Emergency Disaster Relief", label_hi: "किसान आपदा आपात राहत नंबर", number: "18001801551" }
    ],
    roadmap: [
      { step: 1, title_en: "Dial 1930 Immediately for Cyber Financial Fraud", title_hi: "साइबर वित्तीय धोखाधड़ी के लिए तुरंत १९३० डायल करें", desc_en: "Urgent gold-hour report blocks frozen money in banking pathways immediately.", desc_hi: "धोखाधड़ी के तुरंत बाद डायल करने पर बैंकों में फर्जी निकासी राशि तुरंत फ्रीज कर दी जाती है।", isCritical: true },
      { step: 2, title_en: "Utilize 112 for Consolidated Law and Fire Response", title_hi: "एकीकृत पुलिस और अग्नि प्रतिक्रिया हेतु ११२ का उपयोग करें", desc_en: "Toll-free, works even without active cellular SIM balance or signal roaming.", desc_hi: "टोल-फ्री नंबर, मोबाइल में रिचार्ज बैलेंस न होने पर या बिना सिम के भी काम करता है।", isCritical: true },
      { step: 3, title_en: "Present Ayushman Card during Emergency Admissions", title_hi: "आपातकालीन भर्ती के दौरान आयुष्मान गोल्डन कार्ड दिखाएं", desc_en: "Private empanelled hospitals cannot refuse initial triage treatment.", desc_hi: "अस्पताल में गंभीर चिकित्सा उपचार और कैशलेस भर्ती से निजी एम्पेनेल्ड अस्पताल मना नहीं कर सकते।", isCritical: false }
    ]
  },
  {
    id: "insurance",
    title_en: "Insurance & Protection",
    title_hi: "बीमा और सामाजिक सुरक्षा",
    description_en: "Compare PMJJBY term life, PMSBY accident protections, crop insurances, Ayushman health cards, and pension shields in one pane.",
    description_hi: "पीएमजेजेबीवाई टर्म जीवन बीमा, पीएमएसबीवाई दुर्घटना सुरक्षा, फसल बीमा, आयुष्मान कार्ड और पेंशन सुरक्षा की तुलना एक ही स्थान पर करें।",
    documents: [
      { name_en: "Aadhaar Card", name_hi: "आधार कार्ड", purpose_en: "Foundational biometric linkage for premium validation", purpose_hi: "बीमा प्रीमियम सत्यापन और नामांकन सुरक्षा हेतु आधार नंबर", isMandatory: true, normName: "Aadhaar Card" },
      { name_en: "Bank Account (Aadhaar Seeded)", name_hi: "बैंक खाता (पेंशन संरेखित)", purpose_en: "Enables annual auto-debit triggers securely", purpose_hi: "प्रति वर्ष बीमा किस्तों के ऑटो-डेबिट (स्वचालित भुगतान) को सक्षम बनाता है", isMandatory: true, normName: "Bank Account (Aadhaar Seeded)" }
    ],
    schemes: [
      { name_en: "Pradhan Mantri Suraksha Bima Yojana", name_hi: "प्रधानमंत्री सुरक्षा बीमा योजना (PMSBY)", desc_en: "Accidental permanent disability and death coverage of ₹2 Lakh for just ₹20 per year.", desc_hi: "शानदार ₹२० प्रति वर्ष की किस्त पर ₹२ लाख का दुर्घटना स्थायी दिव्यांगता एवं मृत्यु कवर लाभ।", portal_en: "https://jansuraksha.gov.in", portal_hi: "https://jansuraksha.gov.in" },
      { name_en: "Pradhan Mantri Jeevan Jyoti Bima Yojana", name_hi: "प्रधानमंत्री जीवन ज्योति बीमा योजना (PMJJBY)", desc_en: "Term life insurance corpus of ₹2 Lakh for premium of ₹436 annually.", desc_hi: "₹४३६ प्रति वर्ष की बेहद रियायती दर पर ₹२ लाख का टर्म जीवन बीमा सुरक्षा।", portal_en: "https://jansuraksha.gov.in", portal_hi: "https://jansuraksha.gov.in" },
      { name_en: "Pradhan Mantri Fasal Bima Yojana", name_hi: "प्रधानमंत्री फसल बीमा योजना (PMFBY)", desc_en: "Crop security insurance coverage protecting yields from extreme unseasonal rains.", desc_hi: "असमय बेमौसम तेज बारिश और सूखे से फसल नुकसान आवरण मुआवजा सुरक्षा।", portal_en: "https://pmfby.gov.in", portal_hi: "https://pmfby.gov.in" }
    ],
    insurance: [
      { name_en: "Ayushman Bharat PMJAY", name_hi: "आयुष्मान भारत योजना (PM-JAY)", desc_en: "Health cash-free hospitality protection of ₹5 Lakh per year for the whole family.", desc_hi: "प्रति परिवार प्रति वर्ष ₹५ लाख तक का कैशलेस अस्पताल चिकित्सा लाभ आवरण सरकार द्वारा।" }
    ],
    portals: [
      { name_en: "Jan Suraksha Portal", name_hi: "जन सुरक्षा एकीकृत सरकारी पोर्टल", url: "https://jansuraksha.gov.in" }
    ],
    emergency: [
      { label_en: "Jan Suraksha National Hotline", label_hi: "जन सुरक्षा राष्ट्रीय टोल-फ्री हॉटलाइन", number: "18001801111" }
    ],
    roadmap: [
      { step: 1, title_en: "Authorize Bank Auto-Debit Mandate", title_hi: "बैंक में ऑटो-डेबिट मैंडेट सक्षम करें", desc_en: "Submit signed consent cards in June of every year to keep PMSBY & PMJJBY layers live.", desc_hi: "बीमा सुरक्षा कवर चालू बनाए रखने के लिए हर साल जून में बैंक जाकर ऑटो-डेबिट सहमति फॉर्म भरें।", isCritical: true },
      { step: 2, title_en: "Sync Ayushman KYC mapping", title_hi: "आयुष्मान केवाईसी मिलान पूरा करें", desc_en: "Double check family listing on PMJAY portal; download printed golden PVC card.", desc_hi: "पीएम-जेएआई पोर्टल पर परिवार की सूची की जांच करें; अपना आयुष्मान गोल्डन पीवीसी कार्ड डाउनलोड करें।", isCritical: true },
      { step: 3, title_en: "Register Nominees across your Savings Passbook", title_hi: "बचत पासबुक में नामांकित व्यक्तियों को दर्ज करें", desc_en: "Ensures legal heirs receive quick benefit claims without litigation.", desc_hi: "सुनिश्चित करें कि आपके जाने के बाद परिवार के वारिस को बीमे की राशि बिना मुकदमेबाजी के मिल सके।", isCritical: false }
    ]
  }
];
