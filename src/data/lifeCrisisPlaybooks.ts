export interface CrisisPlaybook {
  id: string;
  title_en: string;
  title_hi: string;
  iconName: string; // Helper to match with Lucide Icons
  desc_en: string;
  desc_hi: string;
  expectedTimeline_en: string;
  expectedTimeline_hi: string;
  citizenRoleQuote_en: string;
  citizenRoleQuote_hi: string;
  readinessScore: number; // Simulated readiness tracker score
  officesRequired_en: string[];
  officesRequired_hi: string[];
  documents: {
    name_en: string;
    name_hi: string;
    purpose_en: string;
    purpose_hi: string;
    isCritical: boolean;
  }[];
  roadmap: {
    step: number;
    title_en: string;
    title_hi: string;
    desc_en: string;
    desc_hi: string;
    office: string;
  }[];
}

export const LIFE_CRISIS_PLAYBOOKS: CrisisPlaybook[] = [
  {
    id: "family-loss",
    title_en: "A family member passed away",
    title_hi: "परिवार के सदस्य की मृत्यु हुई",
    iconName: "Users",
    desc_en: "Secure legal inheritance, settle claims, update banking nominations, and claim survivors' state benefits safely.",
    desc_hi: "कानूनी विरासत सुरक्षित करें, दावों का निपटान करें, बैंकिंग नामांकन अपडेट करें और जीवित बचे लोगों के राज्य लाभों का सुरक्षित रूप से दावा करें।",
    expectedTimeline_en: "30 - 45 Days",
    expectedTimeline_hi: "30 - 45 दिन",
    citizenRoleQuote_en: "\"My father passed away. I need to transfer his pension to my mother and update land papers.\"",
    citizenRoleQuote_hi: "\"मेरे पिता का निधन हो गया। मुझे उनकी पेंशन मेरी मां को स्थानांतरित करनी है और जमीन के कागजात अपडेट करने हैं।\"",
    readinessScore: 6,
    officesRequired_en: ["Local Registrar of Births and Deaths", "Revenue Circle Officer / Tehsildar", "Nationalized Bank Branch", "District Civil Court"],
    officesRequired_hi: ["जन्म और मृत्यु स्थानीय रजिस्ट्रार", "राजस्व सर्कल अधिकारी / तहसीलदार", "राष्ट्रीयकृत बैंक शाखा", "जिला सिविल न्यायालय"],
    documents: [
      { name_en: "Death Certificate", name_hi: "मृत्यु प्रमाण पत्र", purpose_en: "Official death statement required within 21 days from local municipality.", purpose_hi: "स्थानीय नगर पालिका से 21 दिनों के भीतर आवश्यक आधिकारिक मृत्यु विवरण।", isCritical: true },
      { name_en: "Legal Heir Certificate", name_hi: "कानूनी उत्तराधिकारी प्रमाण पत्र", purpose_en: "Confirms authentic blood lineage, issued by the Revenue Circle Officer.", purpose_hi: "राजस्व सर्कल अधिकारी द्वारा जारी वास्तविक रक्त वंश की पुष्टि करता है।", isCritical: true },
      { name_en: "Bank Nominee Update", name_hi: "बैंक नामांकित व्यक्ति (नॉमिनी) अपडेट", purpose_en: "Enables immediate asset withdrawal of savings without courts.", purpose_hi: "न्यायालयों के बिना बचत की तत्काल संपत्ति वापस लेने में सक्षम बनाता है।", isCritical: true },
      { name_en: "Pension Transfer Form", name_hi: "पेंशन ट्रांसफर फॉर्म", purpose_en: "Redirects central/state retirement pensions to surviving partner.", purpose_hi: "जीवित साथी को केंद्र/राज्य सेवानिवृत्ति पेंशन पुनर्निर्देशित करता है।", isCritical: false },
      { name_en: "Insurance claim (PMJJBY/PMSBY)", name_hi: "बीमा दावा (PMJJBY/PMSBY)", purpose_en: "Claims term insurance safety payout of ₹2L.", purpose_hi: "₹2 लाख का टर्म बीमा सुरक्षा भुगतान का दावा करता है।", isCritical: false },
      { name_en: "Property Mutation documents", name_hi: "संपत्ति नामांतरण (म्यूटेशन) दस्तावेज", purpose_en: "Saves and shifts land records in the target heir's name.", purpose_hi: "लक्ष्य उत्तराधिकारी के नाम पर भूमि रिकॉर्ड को सहेजता और स्थानांतरित करता है।", isCritical: false },
      { name_en: "Succession Certificate", name_hi: "उत्तराधिकार प्रमाण पत्र", purpose_en: "Required from District Judge for high-value properties without nominees.", purpose_hi: "बिना नामांकित लोगों के उच्च मूल्य वाली संपत्तियों के लिए जिला न्यायाधीश से आवश्यक।", isCritical: false }
    ],
    roadmap: [
      { step: 1, title_en: "File Death Record", title_hi: "मृत्यु रिकॉर्ड दर्ज करें", desc_en: "Submit hospital or cremation slip to local Registrar of Births and Deaths matching official Aadhaar.", desc_hi: "आधिकारिक आधार से मेल खाने वाले जन्म और मृत्यु के स्थानीय रजिस्ट्रार को अस्पताल या श्मशान घाट की पर्ची जमा करें।", office: "Municipality / Panchayat Office" },
      { step: 2, title_en: "Acquire Legal Heir Card", title_hi: "उत्तराधिकारी प्रमाण पत्र प्राप्त करें", desc_en: "Apply online or via circle patwari with affidavits to legally establish true survivor titles.", desc_hi: "सच्चे उत्तरजीवियों के अधिकारों को कानूनी रूप से स्थापित करने के लिए हलफनामों के साथ ऑनलाइन या सर्कल पटवारी के माध्यम से आवेदन करें।", office: "Revenue Circle Office" },
      { step: 3, title_en: "Submit Bank Nomination Claim", title_hi: "बैंक नामांकन दावा जमा करें", desc_en: "Carry Death Certificate to home bank branch to release holdings or add mother's account.", desc_hi: "धारकों को मुक्त करने या मां का खाता जोड़ने के लिए बैंक शाखा में मृत्यु प्रमाण पत्र साथ ले जाएं।", office: "Home Bank Branch" },
      { step: 4, title_en: "Initiate Mutual Land Mutation", title_hi: "पारस्परिक भूमि नामांतरण शुरू करें", desc_en: "Apply to mutation registrar with Legal Heir Certificate to safely update land registry papers.", desc_hi: "जमीन रजिस्ट्री कागजात को सुरक्षित रूप से अपडेट करने के लिए कानूनी उत्तराधिकारी प्रमाणपत्र के साथ दाखिल-खारिज रजिस्ट्रार के पास आवेदन करें।", office: "Tehsil / Circle Office" }
    ]
  },
  {
    id: "lost-job",
    title_en: "I lost my job",
    title_hi: "मेरी नौकरी चली गई",
    iconName: "Briefcase",
    desc_en: "Secure unemployment compensation, transfer statutory Provident Fund (EPFO), and access digital skilling scholarships.",
    desc_hi: "बेरोजगारी मुआवजा सुरक्षित करें, वैधानिक भविष्य निधि (EPFO) स्थानांतरित करें, और डिजिटल कौशल छात्रवृत्तियों तक पहुंचें।",
    expectedTimeline_en: "15 - 30 Days",
    expectedTimeline_hi: "15 - 30 दिन",
    citizenRoleQuote_en: "\"I was down-sized from my retail jobs/contracts. How can I get my EPFO savings and find state aid?\"",
    citizenRoleQuote_hi: "\"मुझे खुदरा नौकरियों/अनुबंधों से हटा दिया गया था। मैं अपनी ईपीएफओ बचत कैसे प्राप्त कर सकता हूं और सहायता खोज सकता हूं?\"",
    readinessScore: 8,
    officesRequired_en: ["EPFO Field Commissioner desk", "ESIC District Branch Dispensary", "Local Common Service Centre (CSC)"],
    officesRequired_hi: ["EPFO फील्ड कमिश्नर डेस्क", "ESIC जिला शाखा औषधालय", "स्थानीय कॉमन सर्विस सेंटर (CSC)"],
    documents: [
      { name_en: "Experience & Relieving Letter", name_hi: "अनुभव और कार्यमुक्ति पत्र", purpose_en: "Confirms non-delinquent termination of employment certified by company.", purpose_hi: "कंपनी द्वारा प्रमाणित रोजगार की गैर-अपराधी समाप्ति की पुष्टि करता है।", isCritical: true },
      { name_en: "EPFO UAN Card", name_hi: "EPFO यूएएन कार्ड", purpose_en: "Universal Account Number to access retirement provident balances.", purpose_hi: "सेवानिवृत्ति भविष्य निधि शेष तक पहुँचने के लिए यूनिवर्सल खाता संख्या।", isCritical: true },
      { name_en: "ESIC Registration slip", name_hi: "ESIC पंजीकरण पर्ची", purpose_en: "Unlocks unemployment cash benefits under Rajiv Gandhi scheme.", purpose_hi: "राजीव गांधी योजना के तहत बेरोजगारी नकद लाभ को अनलॉक करता है।", isCritical: false },
      { name_en: "PMKVY Skilling Voucher", name_hi: "PMKVY कौशल विकास वाउचर", purpose_en: "Allows free enrollment into certified skill training classes.", purpose_hi: "प्रमाणित कौशल प्रशिक्षण कक्षाओं में मुफ्त नामांकन की अनुमति देता है।", isCritical: false },
      { name_en: "Bank Account with ECS active", name_hi: "ईसीएस सक्रिय बैंक खाता", purpose_en: "Provides direct destination for EPFO withdrawals.", purpose_hi: "ईपीएफओ निकासी के लिए सीधा गंतव्य प्रदान करता है।", isCritical: true }
    ],
    roadmap: [
      { step: 1, title_en: "Execute EPF Transfer or Advance", title_hi: "EPF ट्रांसफर या अग्रिम राशि का दावा करें", desc_en: "Log into Unified Member Portal using UAN to request up to 75% non-refundable COVID/unemployment advance.", desc_hi: "यूएएन का उपयोग करके एकीकृत सदस्य पोर्टल पर लॉग इन करें और अधिकतम 75% गैर-वापसी योग्य बेरोजगारी अग्रिम का अनुरोध करें।", office: "EPFO Online Portal" },
      { step: 2, title_en: "File for ESIC Cash Relief", title_hi: "ESIC नकद राहत के लिए दावा करें", desc_en: "Submit Atal Beemari Kalyan scheme Form-IV if prior contributions match.", desc_hi: "यदि पिछले योगदान मेल खाते हैं तो अटल बीमित व्यक्ति कल्याण योजना फॉर्म-IV जमा करें।", office: "ESIC Field Office" },
      { step: 3, title_en: "Enroll into National Career Service", title_hi: "राष्ट्रीय करियर सेवा में नामांकित हों", desc_en: "Register with ncs.gov.in database to match skill profile against public block positions.", desc_hi: "सार्वजनिक ब्लॉक पदों के साथ कौशल प्रोफाइल का मिलान करने के लिए ncs.gov.in डेटाबेस पर पंजीकरण करें।", office: "District Employment Exchange" }
    ]
  },
  {
    id: "scholarship-rejected",
    title_en: "My scholarship was rejected",
    title_hi: "मेरी छात्रवृत्ति अस्वीकृत हुई",
    iconName: "GraduationCap",
    desc_en: "Remedy demographic mismatches, secure a Circle-Officer level Income statement, and appeal online within the portal limits.",
    desc_hi: "जनसांख्यिकीय विसंगतियों को दूर करें, सर्कल-अधिकारी स्तर का आय विवरण प्राप्त करें, और ऑनलाइन अपील करें।",
    expectedTimeline_en: "7 - 15 Days",
    expectedTimeline_hi: "7 - 15 दिन",
    citizenRoleQuote_en: "\"My Ishan Uday scholarship status shows 'Rejected by District Officer'. I need to rectify it now.\"",
    citizenRoleQuote_hi: "\"मेरी ईशान उदय छात्रवृत्ति स्थिति 'जिला अधिकारी द्वारा अस्वीकृत' दिखा रही है। मुझे इसे तुरंत ठीक करने की आवश्यकता है।\"",
    readinessScore: 5,
    officesRequired_en: ["College Scholarship Helpdesk", "Revenue Circle Office", "Directorate of Higher Education"],
    officesRequired_hi: ["कॉलेज छात्रवृत्ति सहायता डेस्क", "राजस्व सर्कल कार्यालय", "उच्च शिक्षा निदेशालय"],
    documents: [
      { name_en: "Circle Officer Income Certificate", name_hi: "राजस्व अधिकारी द्वारा जारी आय प्रमाण पत्र", purpose_en: "Income statement certified by Circle Officer or SDM (Notary affidavit is NOT valid).", purpose_hi: "राजस्व मंडल अधिकारी या एसडीएम द्वारा प्रमाणित आय विवरण (नोटरी शपथ पत्र मान्य नहीं है)।", isCritical: true },
      { name_en: "State Domicile / PRC", name_hi: "राज्य अधिवास प्रमाण पत्र (PRC)", purpose_en: "Establishes permanent residence in target beneficiary state.", purpose_hi: "लक्ष्य लाभार्थी राज्य में स्थायी निवास स्थापित करता है।", isCritical: true },
      { name_en: "Attested Academic Marksheets", name_hi: "सत्यापित शैक्षणिक अंक तालिका (मार्कशीट)", purpose_en: "Class 12 standard mark card with verified registration code.", purpose_hi: "सटीक पंजीकरण कोड के साथ सत्यापित कक्षा 12वीं की अंक तालिका।", isCritical: true },
      { name_en: "Fee Structure Receipt", name_hi: "कॉलेज वार्षिक शुल्क रसीद", purpose_en: "Paid clearance receipt stamped by institutional accounts head.", purpose_hi: "संस्थागत खातों के प्रमुख द्वारा मुहर लगी सशुल्क निकासी रसीद।", isCritical: true }
    ],
    roadmap: [
      { step: 1, title_en: "Fetch Official Rejection Reason", title_hi: "अस्वीकृति का वास्तविक कारण खोजें", desc_en: "Log onto National Scholarship Portal (scholarships.gov.in) to query exact remarks.", desc_hi: "सटीक टिप्पणियों की जांच करने के लिए राष्ट्रीय छात्रवृत्ति पोर्टल (scholarships.gov.in) पर लॉग इन करें।", office: "NSP Digital Portal" },
      { step: 2, title_en: "Apply for CO-level Income Cert", title_hi: "आधिकारिक आय प्रमाण पत्र के लिए आवेदन करें", desc_en: "Never use commercial notary stamps. Submit application on state RTPS node for official Circle Officer signature.", desc_hi: "कभी भी कमर्शियल नोटरी स्टैम्प का उपयोग न करें। आधिकारिक अंचल अधिकारी के हस्ताक्षर के लिए राज्य RTPS पोर्टल पर आवेदन जमा करें।", office: "Local Revenue Office" },
      { step: 3, title_en: "Request Nodal Officer Push", title_hi: "कॉलेज नोडल अधिकारी से संपर्क करें", desc_en: "Meet the appointed college scholarship nodal teacher to re-survey inside institutional console.", desc_hi: "संस्थागत कंसोल के भीतर पुनः जांच करने के लिए नियुक्त कॉलेज छात्रवृत्ति नोडल शिक्षक से मिलें।", office: "College Admin Desk" }
    ]
  },
  {
    id: "start-business",
    title_en: "I want to start a business",
    title_hi: "मैं खुद का व्यवसाय शुरू करना चाहता हूँ",
    iconName: "Building2",
    desc_en: "Establish MSME status instantly for free, secure current bank accounts, and claim 35% state subsidies on credit bounds.",
    desc_hi: "मुफ्त में तुरंत एमएसएमई दर्जा स्थापित करें, चालू बैंक खाते सुरक्षित करें, और ऋण सीमा पर 35% सरकारी सब्सिडी का दावा करें।",
    expectedTimeline_en: "10 - 20 Days",
    expectedTimeline_hi: "10 - 20 दिन",
    citizenRoleQuote_en: "\"I want to open a welding workshop / food packing plant. How do I get a cheap Mudra Loan?\"",
    citizenRoleQuote_hi: "\"मैं एक वेल्डिंग वर्कशॉप / फूड पैकिंग प्लांट खोलना चाहता हूं। मुझे सस्ता मुद्रा लोन कैसे मिलेगा?\"",
    readinessScore: 7,
    officesRequired_en: ["District Industries Centre (DIC)", "Nationalized Commercial Bank branch", "Local Municipal Tax counter"],
    officesRequired_hi: ["जिला उद्योग केंद्र (DIC)", "राष्ट्रीयकृत कमर्शियल बैंक शाखा", "स्थानीय नगर पालिका कर काउंटर"],
    documents: [
      { name_en: "Udyam MSME Registration Certificate", name_hi: "उद्यम एमएसएमई पंजीकरण प्रमाण पत्र", purpose_en: "Completely free, instant central MSME identification number.", purpose_hi: "पूरी तरह से मुफ्त, त्वरित केंद्रीय एमएसएमई पहचान संख्या।", isCritical: true },
      { name_en: "PMEGP Project DPR Report", name_hi: "PMEGP प्रोजेक्ट रिपोर्ट (DPR)", purpose_en: "Project financial outline report to claim up to 35% capital grant.", purpose_hi: "35% तक के पूंजीगत अनुदान का दावा करने के लिए वित्तीय परियोजना रिपोर्ट।", isCritical: true },
      { name_en: "Partnership / Sole Propriety declaration", name_hi: "साझेदारी / एकल स्वामित्व घोषणा पत्र", purpose_en: "Legal setup blueprint of business entity.", purpose_hi: "व्यावसायिक इकाई का कानूनी खाका।", isCritical: false },
      { name_en: "Municipal Trade License", name_hi: "नगर पालिका व्यापार लाइसेंस", purpose_en: "Permits commercial operations within city geographical bounds.", purpose_hi: "शहर की भौगोलिक सीमाओं के भीतर वाणिज्यिक संचालन की अनुमति देता है।", isCritical: true }
    ],
    roadmap: [
      { step: 1, title_en: "Generate Free Udyam Certificate", title_hi: "निःशुल्क उद्यम प्रमाण पत्र जनरेट करें", desc_en: "Go to official udyamregistration.gov.in using Aadhaar to instantly print MSME certificate.", desc_hi: "तत्काल एमएसएमई प्रमाणपत्र प्रिंट करने के लिए आधार का उपयोग करके आधिकारिक udyamregistration.gov.in पर जाएं।", office: "Udyam MSME Portal" },
      { step: 2, title_en: "Submit PMEGP Loan Application", title_hi: "PMEGP ऋण आवेदन पत्र जमा करें", desc_en: "Upload project reports on KVIB/KVIC interface to route your capital subsidy directly to underwriting bank.", desc_hi: "अपनी पूंजी सब्सिडी को सीधे अंडरराइटिंग बैंक में भेजने के लिए KVIB/KVIC पोर्टल पर प्रोजेक्ट रिपोर्ट अपलोड करें।", office: "District Industries Centre" },
      { step: 3, title_en: "Open Commercial Current Account", title_hi: "व्यावसायिक चालू (करंट) खाता खोलें", desc_en: "Take Trade license and Udyam certification to home branch to create business current account.", desc_hi: "व्यापार चालू खाता बनाने के लिए ट्रेड लाइसेंस और उद्यम प्रमाणपत्र गृह शाखा में ले जाएं।", office: "Commercial Bank" }
    ]
  },
  {
    id: "parent-birth",
    title_en: "I became a parent",
    title_hi: "मैं माता/पिता बन गया हूँ",
    iconName: "User",
    desc_en: "Acquire mandatory birth registries, maternal nutrition cash incentives, and zero-age Aadhaar biometric identities.",
    desc_hi: "अनिवार्य जन्म पंजीकरण, मातृ पोषण नकद प्रोत्साहन, और शून्य-आयु आधार बायोमेट्रिक पहचान प्राप्त करें।",
    expectedTimeline_en: "10 - 15 Days",
    expectedTimeline_hi: "10 - 15 दिन",
    citizenRoleQuote_en: "\"We had an institutional delivery at CHC hospital. How do we claim PM Matru Vandana Yojana?\"",
    citizenRoleQuote_hi: "\"हमारा सीएचसी अस्पताल में संस्थागत प्रसव हुआ था। हम पीएम मातृ वंदना योजना का दावा कैसे कर सकते हैं?\"",
    readinessScore: 9,
    officesRequired_en: ["Local Primary/Community Health Centre (CHC)", "Nationalized Post Office / IPPB", "Local Anganwadi Centre"],
    officesRequired_hi: ["स्थानीय प्राथमिक/सामुदायिक स्वास्थ्य केंद्र (CHC)", "राष्ट्रीयकृत डाकघर / IPPB", "स्थानीय आंगनवाड़ी केंद्र"],
    documents: [
      { name_en: "Birth Registration Slip", name_hi: "जन्म प्रसव पंजीकरण पर्ची", purpose_en: "Issued by delivery hospital validating time and date.", purpose_hi: "प्रसव अस्पताल द्वारा जारी समय और तारीख की वैधता।", isCritical: true },
      { name_en: "MCP Card (Mother Child Protection)", name_hi: "एमसीपी कार्ड (मां और बच्चा सुरक्षा)", purpose_en: "Essential health card tracking vaccine schedules and claims.", purpose_hi: "टीका समय सारिणी और दावों पर नज़र रखने वाली आवश्यक स्वास्थ्य कार्ड।", isCritical: true },
      { name_en: "PMMVY Form 1A / 1B", name_hi: "PMMVY फॉर्म 1A / 1B", purpose_en: "Enables direct ₹5,000 maternal health cash transfer.", purpose_hi: "सीधे ₹5,000 के मातृ स्वास्थ्य नकद हस्तांतरण को सक्षम बनाता है।", isCritical: true },
      { name_en: "Aadhaar Card of Mother", name_hi: "माता का आधार कार्ड", purpose_en: "Identity check for beneficiary matching.", purpose_hi: "लाभार्थी मिलान के लिए पहचान जाँच।", isCritical: true }
    ],
    roadmap: [
      { step: 1, title_en: "Claim Birth Certificate", title_hi: "जन्म प्रमाण पत्र प्राप्त करें", desc_en: "Apply within 21 days from registrar using institutional hospital slip copy.", desc_hi: "संस्थागत अस्पताल की पर्ची प्रति का उपयोग करके रजिस्ट्रार से 21 दिनों के भीतर आवेदन करें।", office: "Municipality / Panchayat Office" },
      { step: 2, title_en: "Register with Anganwadi Worker", title_hi: "आंगनवाड़ी कार्यकर्ता के पास पंजीकरण करें", desc_en: "Update Mother Child Protection (MCP) registry to verify vaccination sequence.", desc_hi: "टीकाकरण अनुक्रम सत्यापित करने के लिए मातृ शिशु संरक्षण (MCP) रजिस्ट्री अपडेट करें।", office: "Anganwadi Center" },
      { step: 3, title_en: "Submit PMMVY DBT claims", title_hi: "PMMVY डीबीटी दावों को सबमिट करें", desc_en: "Submit forms at any local health desk to release direct cash incentive benefits.", desc_hi: "सीधे नकद प्रोत्साहन लाभ जारी करने के लिए किसी भी स्थानीय स्वास्थ्य डेस्क पर फॉर्म जमा करें।", office: "Primary Health Center / ASHA" }
    ]
  },
  {
    id: "medical-help",
    title_en: "I need medical help",
    title_hi: "मुझे चिकित्सा सहायता चाहिए",
    iconName: "Activity",
    desc_en: "Verify Ayushman Bharat health insurance eligibility, create an ABHA card, and locate cashless empanelled private clinics.",
    desc_hi: "आयुष्मान भारत स्वास्थ्य बीमा पात्रता की पुष्टि करें, आभा (ABHA) कार्ड बनाएं, और सूचीबद्ध क्लीनिकों का पता लगाएं।",
    expectedTimeline_en: "1 - 2 Days",
    expectedTimeline_hi: "1 - 2 दिन",
    citizenRoleQuote_en: "\"My family member requires immediate surgery. How do we access cashless PM-JAY hospital treatment?\"",
    citizenRoleQuote_hi: "\"मेरे परिवार के सदस्य को तत्काल सर्जरी की आवश्यकता है। हम कैशलेस पीएम-जेएवाई अस्पताल उपचार का उपयोग कैसे करें?\"",
    readinessScore: 7,
    officesRequired_en: ["Nearest District Civil Hospital", "Empanelled Private Hospital Helpdesk", "Ayushman Mitra Onsite Desk"],
    officesRequired_hi: ["नजदीकी जिला नागरिक अस्पताल", "सूचीबद्ध निजी अस्पताल हेल्प डेस्क", "स्वास्थ्यमित्र डेस्क"],
    documents: [
      { name_en: "Ayushman Board eligibility slip", name_hi: "आयुष्मान गोल्ड कार्ड / पात्रता पर्ची", purpose_en: "Secures ₹5 Lakh cashless coverage per family.", purpose_hi: "प्रति परिवार ₹5 लाख का कैशलेस उपचार कवच सुरक्षित करता है।", isCritical: true },
      { name_en: "Family NFSA Ration Card", name_hi: "पारिवारिक राशन कार्ड (NFSA)", purpose_en: "Mandatory supporting document linked to SECC database.", purpose_hi: "SECC डेटाबेस से जुड़ा अनिवार्य सहायक दस्तावेज।", isCritical: true },
      { name_en: "Aadhaar Card of Patient", name_hi: "मरीज का आधार कार्ड", purpose_en: "Biometric proof to authorize cashless admission.", purpose_hi: "कैशलेस उपचार को अधिकृत करने के लिए बायोमेट्रिक प्रमाण।", isCritical: true }
    ],
    roadmap: [
      { step: 1, title_en: "Check Portal Eligibility", title_hi: "पोर्टल पात्रता की जांच करें", desc_en: "Visit pmjay.gov.in and click 'Am I Eligible' using ration card detail codes.", desc_hi: "राशन कार्ड विनिर्देशों का उपयोग करके pmjay.gov.in पर जाएं और 'Am I Eligible' पर जाएं।", office: "PM-JAY Online Portal" },
      { step: 2, title_en: "Locate Ayushman Mitra Desk", title_hi: "आयुष्मान मित्र हेल्पडेस्क खोजें", desc_en: "Meet the specialized officer inside any public medical center to run biometric search.", desc_hi: "बायोमेट्रिक खोज चलाने के लिए किसी भी सार्वजनिक चिकित्सा केंद्र के भीतर विशिष्ट अधिकारी से मिलें।", office: "District Civil Hospital Room" },
      { step: 3, title_en: "Generate Instant ABHA Health Card", title_hi: "त्वरित आभा हेल्थ कार्ड बनाएं", desc_en: "Submit Aadhaar with OTP response to instantly configure Unified Health Records.", desc_hi: "एकीकृत स्वास्थ्य रिकॉर्ड को तुरंत कॉन्फ़िगर करने के लिए ओटीपी प्रतिक्रिया के साथ आधार जमा करें।", office: "Hospital Registration Desk" }
    ]
  },
  {
    id: "scammed-online",
    title_en: "I got scammed online",
    title_hi: "मेरे साथ ऑनलाइन धोखाधड़ी हुई",
    iconName: "AlertTriangle",
    desc_en: "Trigger banking golden-hour protocols, file cyber crime records, freeze destinations, and claim full RBI liability protection.",
    desc_hi: "बैंकिंग गोल्डन-ऑवर प्रोटोकॉल ट्रिगर करें, साइबर अपराध शिकायत दर्ज करें, और आरबीआई रिफंड नीति का दावा करें।",
    expectedTimeline_en: "1 - 3 Days",
    expectedTimeline_hi: "1 - 3 दिन",
    citizenRoleQuote_en: "\"I entered my OTP on a fake lottery app. They debited ₹50,000 from my savings. Please block!\"",
    citizenRoleQuote_hi: "\"मैंने फर्जी लॉटरी ऐप पर अपना ओटीपी डाला। उन्होंने मेरी बचत से ₹50,000 निकाल लिए। कृपया ब्लॉक करें!\"",
    readinessScore: 5,
    officesRequired_en: ["National Cyber Crime Portal (24/7 Helpline)", "Local Police Station / Cyber Cell", "Home Bank Branch Manager"],
    officesRequired_hi: ["राष्ट्रीय साइबर अपराध पोर्टल (24/7 हेल्पलाइन)", "स्थानीय पुलिस स्टेशन / साइबर सेल", "मुख्य बैंक शाखा प्रबंधक"],
    documents: [
      { name_en: "Transaction Statement PDF", name_hi: "लेनदेन बैंक विवरणी (स्टेटमेंट) पीडीएफ", purpose_en: "Shows transaction date, exact time, and merchant gateway ID codes.", purpose_hi: "लेनदेन की तारीख, सटीक समय और मर्चेंट गेटवे आईडी कोड दिखाता है।", isCritical: true },
      { name_en: "UPI Scammer Details (Phone/ID)", name_hi: "संदेहास्पद यूपीआई आईडी या फोन नंबर", purpose_en: "Target address where funds were routed.", purpose_hi: "लक्ष्य का पता जहां धन हस्तांतरित किया गया था।", isCritical: true },
      { name_en: "Cyber Crime Docket ID Receipt", name_hi: "साइबर अपराध डिजिटल पावती रसीद", purpose_en: "Statutory ticket proof required by banking underwriters.", purpose_hi: "बैंकिंग बीमाकर्ताओं द्वारा आवश्यक वैधानिक टिकट प्रमाण पत्र।", isCritical: true },
      { name_en: "RBI Zero-Liability Application", name_hi: "आरबीआई शून्य-देयता आवेदन पत्र", purpose_en: "Invokes RBI guidelines to refund unauthorized digital debits reported within 72 hours.", purpose_hi: "72 घंटों के भीतर रिपोर्ट की गई अनधिकृत डिजिटल डेबिट वापसी के लिए आरबीआई परिपत्र लागू करें।", isCritical: true }
    ],
    roadmap: [
      { step: 1, title_en: "Dial National Helpline 1930", title_hi: "राष्ट्रीय हेल्पलाइन 1930 पर तुरंत कॉल करें", desc_en: "Absolute Golden Hour Priority: Call 1930 within 2 hours to freeze fund transfers inside beneficiary bank.", desc_hi: "परम गोल्डन ऑवर प्राथमिकता: लाभार्थी बैंक के भीतर फंड ट्रांसफर को फ्रीज करने के लिए 2 घंटे के भीतर 1930 पर कॉल करें।", office: "Cyber Emergency Helpline" },
      { step: 2, title_en: "File National Cyber Complaint", title_hi: "साइबर शिकायत ऑनलाइन दर्ज करें", desc_en: "Log on to cybercrime.gov.in to detail scam event. Preserve transactional screenshots.", desc_hi: "घोटाले के विवरण के साथ cybercrime.gov.in पर शिकायत दर्ज करें। लेनदेन के स्क्रीनशॉट सुरक्षित रखें।", office: "Cybercrime Portal Website" },
      { step: 3, title_en: "Submit Dispute to Branch Manager", title_hi: "बैंक शाखा में विवाद पत्र जमा करें", desc_en: "Submit typed dispute together with Cyber Docket receipt within 72 hours to legally seek full insurance refunds.", desc_hi: "कानूनी रूप से पूर्ण बीमा रिफंड मांगने के लिए 72 घंटों के भीतर साइबर शिकायत रसीद के साथ लिखित आवेदन जमा करें।", office: "Local Bank Branch" }
    ]
  },
  {
    id: "crop-failure",
    title_en: "My crop failed",
    title_hi: "मेरी फसल नष्ट हो गई है",
    iconName: "Sprout",
    desc_en: "Register crop losses under PM Fasal Bima within 72 hours, coordinate Revenue Spot Checks, and request KCC loan restructuring.",
    desc_hi: "72 घंटों के भीतर पीएम फसल बीमा के तहत फसल नुकसान दर्ज करें, राजस्व स्पॉट जांच का समन्वय करें, और केसीसी ऋण पुनर्गठन का अनुरोध करें।",
    expectedTimeline_en: "14 - 30 Days",
    expectedTimeline_hi: "14 - 30 दिन",
    citizenRoleQuote_en: "\"Floods/pests damaged my paddy crop in Assam. How do I get insurance claim and KCC interest relief?\"",
    citizenRoleQuote_hi: "\"असम में बाढ़/कीड़ों ने मेरी धान की फसल को नष्ट कर दिया। मुझे बीमा दावा और केसीसी ब्याज राहत कैसे मिलेगी?\"",
    readinessScore: 6,
    officesRequired_en: ["Block Agriculture Development Officer (ADO)", "PMFBY Insurance desk", "Revenue Circle Office"],
    officesRequired_hi: ["ब्लॉक कृषि विकास अधिकारी (ADO)", "पीएम फसल बीमा कंपनी डेस्क", "राजस्व मंडल (सर्कल) कार्यालय"],
    documents: [
      { name_en: "Crop Insurance Policy Slip", name_hi: "फसल बीमा पॉलिसी पर्ची (PMFBY)", purpose_en: "Policy proof containing active coverage premium IDs.", purpose_hi: "सक्रिय कवरेज प्रीमियम आईडी वाली पॉलिसी पर्ची प्रमाण पत्र।", isCritical: true },
      { name_en: "Land Possession Certificate", name_hi: "भूमि स्वामित्व प्रमाण पत्र (LPC)", purpose_en: "Validates ownership/tenancy checked against revenue records.", purpose_hi: "राजस्व रिकॉर्ड के विरुद्ध स्वामित्व या किरायेदारी को मान्य करता है।", isCritical: true },
      { name_en: "Spot Physical Damage Report", name_hi: "स्पॉट भौतिक क्षति आकलन रिपोर्ट", purpose_en: "Signed evaluation stamped by the local block agricultural extensions patwari.", purpose_hi: "स्थानीय ब्लॉक कृषि विस्तार पटवारी द्वारा हस्ताक्षरित मूल्यांकन रिपोर्ट।", isCritical: true },
      { name_en: "State Disaster Relief Grant (SDRF)", name_hi: "राज्य आपदा त्वरित राहत अनुदान आवेदन", purpose_en: "Access input subsidy funds for non-insured farmers.", purpose_hi: "गैर-बीमाकृत किसानों के लिए निवेश सब्सिडी निधि तक पहुँच।", isCritical: false }
    ],
    roadmap: [
      { step: 1, title_en: "Intimate Insurance within 72 Hours", title_hi: "72 घंटे के भीतर फसल क्षति की सूचना दें", desc_en: "Call toll-free number or open Crop Insurance App to submit initial damage notification.", desc_hi: "प्रारंभिक क्षति सूचना दर्ज करने के लिए बीमा टोल-फ्री नंबर पर कॉल करें या 'Crop Insurance App' खोलें।", office: "Insurance Nodal Desk" },
      { step: 2, title_en: "Organize Revenue Patwari Spot Visit", title_hi: "पटवारी स्पॉट जांच का आयोजन करें", desc_en: "Coordinate with Patwari or Circle Officer to execute formal physical damage percentage assessment.", desc_hi: "औपचारिक भौतिक क्षति प्रतिशत मूल्यांकन करने के लिए पटवारी या मंडल अधिकारी के साथ समन्वय करें।", office: "Agriculture Block Department" },
      { step: 3, title_en: "Request KCC Loan Restructuring", title_hi: "KCC ऋण पुनर्गठन का अनुरोध करें", desc_en: "Submit physical damage certificate to your bank to convert short term crop loans into medium term credit.", desc_hi: "अल्पकालिक फसल ऋण को मध्यम अवधि के ऋण में बदलने के लिए बैंक में भौतिक क्षति प्रमाण पत्र जमा करें।", office: "Underwriting KCC Bank Branch" }
    ]
  },
  {
    id: "travel-abroad",
    title_en: "I want to travel abroad",
    title_hi: "मैं विदेश जाना चाहता हूँ",
    iconName: "Globe",
    desc_en: "Apply for standard passport, prepare asset credentials under Circle Office, and secure national education loans.",
    desc_hi: "मानक पासपोर्ट के लिए आवेदन करें, राजस्व अंचल कार्यालय के तहत संपत्ति दस्तावेज तैयार करें, और राष्ट्रीय शिक्षा ऋण सुरक्षित करें।",
    expectedTimeline_en: "15 - 30 Days",
    expectedTimeline_hi: "15 - 30 दिन",
    citizenRoleQuote_en: "\"I got an offer to study or work overseas. What are the passport blocks and income proof limits?\"",
    citizenRoleQuote_hi: "\"मुझे विदेश में अध्ययन या काम करने का प्रस्ताव मिला है। पासपोर्ट प्रक्रिया और आय प्रमाण सीमा क्या है?\"",
    readinessScore: 8,
    officesRequired_en: ["Passport Seva Kendra (PSK)", "Regional Passport Office", "Circle Revenue Officer", "Centralized Education Loan Portal"],
    officesRequired_hi: ["पासपोर्ट सेवा केंद्र (PSK)", "क्षेत्रीय पासपोर्ट कार्यालय", "सर्कल राजस्व अधिकारी", "केंद्रीय शिक्षा ऋण पोर्टल (विद्या लक्ष्मी)"],
    documents: [
      { name_en: "Aadhaar Card with consistent spelling", name_hi: "आधार कार्ड (स्पष्ट वर्तनी के साथ)", purpose_en: "Primary citizenship proof. Must exactly match Matriculation Certificate spelling.", purpose_hi: "प्राथमिक नागरिकता प्रमाण पत्र। मैट्रिक प्रमाणपत्र की वर्तनी से बिल्कुल मेल खाना चाहिए।", isCritical: true },
      { name_en: "Matriculation (10th) Certificate", name_hi: "मैट्रिक (10वीं) बोर्ड प्रमाणपत्र", purpose_en: "Verifies birthdate check and exempts applicant from Non-ECR restrictions.", purpose_hi: "जन्म तिथि की जांच करता है और आवेदक को गैर-ECR प्रतिबंधों से छूट देता है।", isCritical: true },
      { name_en: "Circle Officer Valuation Certificate", name_hi: "अंचल अधिकारी स्तर का वित्तीय मूल्यांकन पत्र", purpose_en: "Required by visa departments to prove local financial roots.", purpose_hi: "स्थानीय वित्तीय जड़ों को साबित करने के लिए वीजा विभागों द्वारा आवश्यक।", isCritical: false },
      { name_en: "Vidya Lakshmi Loan Sanction", name_hi: "विद्या लक्ष्मी राष्ट्रीय शिक्षा ऋण मंजूरी", purpose_en: "Government backed scholarship or student credit flow.", purpose_hi: "सरकार द्वारा समर्थित छात्रवृत्ति या छात्र क्रेडिट प्रवाह।", isCritical: false }
    ],
    roadmap: [
      { step: 1, title_en: "File Online Passport Request", title_hi: "ऑनलाइन पासपोर्ट अनुरोध पत्र दर्ज करें", desc_en: "Create profile on passportindia.gov.in. Schedule physical biometric checks at closest PSK.", desc_hi: "passportindia.gov.in पर प्रोफाइल बनाएं। निकटतम PSK पर भौतिक बायोमेट्रिक जांच निर्धारित करें।", office: "Passport Seva Kendra PSK" },
      { step: 2, title_en: "Facilitate Police Verification Desk", title_hi: "स्थानीय पुलिस सत्यापन डेस्क से समन्वय", desc_en: "Provide native landlord, local address proof check, and character confirmation references.", desc_hi: "स्थानीय पता प्रमाण जांच और चरित्र पुष्टि संदर्भ प्रदान करें।", office: "Home Police Station Precinct" },
      { step: 3, title_en: "Verify Asset Records", title_hi: "सर्कल संपत्तियों का सत्यापन कराएं", desc_en: "Obtain Income and Domicile files stamped by Tehsildar to complete loan sanctioning.", desc_hi: "ऋण मंजूरी को पूरा करने के लिए तहसीलदार द्वारा मुहर लगी आय और अधिवास फाइलें प्राप्त करें।", office: "Revenue Circle Office" }
    ]
  },
  {
    id: "govt-job",
    title_en: "I want a government job",
    title_hi: "मैं सरकारी नौकरी चाहता हूँ",
    iconName: "Landmark",
    desc_en: "Register with the local Employment Exchange, acquire OBC / Non-Creamy Layer checks, and obtain Domicile (PRC) flags.",
    desc_hi: "स्थानीय रोजगार कार्यालय (एम्पलॉयमेंट एक्सचेंज) में पंजीकरण करें, ओबीसी एनसीएल और डोमिसाइल (PRC) सुरक्षित करें।",
    expectedTimeline_en: "15 - 30 Days",
    expectedTimeline_hi: "15 - 30 दिन",
    citizenRoleQuote_en: "\"I am preparing for state recruitment examinations. How do I get an Employment Card and EWS certificate?\"",
    citizenRoleQuote_hi: "\"मैं सरकारी भर्ती परीक्षाओं की तैयारी कर रहा हूँ। मुझे रोजगार एक्सचेंज कार्ड और EWS प्रमाणपत्र कैसे मिलेगा?\"",
    readinessScore: 6,
    officesRequired_en: ["District Employment Exchange Office", "Local Revenue Circle Office (SDM)", "State Recruitment portal helpdesk"],
    officesRequired_hi: ["जिला रोजगार कार्यालय", "स्थानीय राजस्व कार्यालय (SDM)", "राज्य भर्ती बोर्ड पोर्टल"],
    documents: [
      { name_en: "Employment Exchange Card", name_hi: "रोजगार कार्यालय (एम्पलॉयमेंट एक्सचेंज) कार्ड", purpose_en: "Proof of active employment seeker state status. Mandatory for many examinations.", purpose_hi: "सक्रिय रोजगार चाहने वाले राज्य की स्थिति का प्रमाण पत्र। कई परीक्षाओं के लिए अनिवार्य।", isCritical: true },
      { name_en: "Permanent Resident Certificate (PRC)", name_hi: "स्थायी निवासी प्रमाण पत्र (PRC)", purpose_en: "Validates local job reservation quotas under state policies.", purpose_hi: "राज्य की नीतियों के तहत स्थानीय नौकरी आरक्षण कोटा को मान्य करता है।", isCritical: true },
      { name_en: "Caste / reservation Certificate (OBC/SC/ST)", name_hi: "जाति / आरक्षण प्रमाण पत्र (OBC/SC/ST)", purpose_en: "Enables age concessions and statutory scores quotas.", purpose_hi: "आयु छूट और वैधानिक स्कोर कोटा आरक्षण सक्षम करता है।", isCritical: false },
      { name_en: "EWS Income Assessed Certificate", name_hi: "EWS श्रेणी आय और संपत्ति प्रमाण पत्र", purpose_en: "Unlocks 10% separate quota if family income falls below ₹8L per annum.", purpose_hi: "पारिवारिक आय ₹8 लाख प्रति वर्ष से कम होने पर 10% अलग कोटा सक्षम।", isCritical: false }
    ],
    roadmap: [
      { step: 1, title_en: "Apply State Employment Exchange", title_hi: "राज्य रोजगार कार्यालय में पंजीकरण करें", desc_en: "Submit intermediate academic marksheets together with state Domicile to lock Employment registration ID.", desc_hi: "रोजगार पंजीकरण आईडी प्राप्त करने के लिए राज्य अधिवास के साथ इंटरमीडिएट शैक्षणिक अंक तालिका जमा करें।", office: "Employment Exchange Center" },
      { step: 2, title_en: "Acquire Reservation Credentials", title_hi: "प्रमाणित आरक्षण दस्तावेज प्राप्त करें", desc_en: "Submit caste records backed by grandfather land revenue documents to Circle Officer.", desc_hi: "अंचल अधिकारी को दादा के भूमि राजस्व दस्तावेजों वाले जाति रिकॉर्ड जमा करवाकर सर्टिफिकेट लें।", office: "Tehsil Circle Office" },
      { step: 3, title_en: "Submit Central EWS Application", title_hi: "EWS कोटा प्रमाणपत्र के लिए आवेदन करें", desc_en: "If family income is below ₹8 Lakhs yearly, apply on state portal for SDM verification seals.", desc_hi: "यदि पारिवारिक आय वार्षिक ₹8 लाख से कम है, तो एसडीएम सत्यापन के लिए राज्य पोर्टल पर आवेदन करें।", office: "Sub-Divisional Officer Office" }
    ]
  },
  {
    id: "buy-house",
    title_en: "I want to buy a house",
    title_hi: "मैं घर/जमीन खरीदना चाहता हूँ",
    iconName: "Home",
    desc_en: "Request Land Title Search reports, secure clean Encumbrance Certificates (EC), and apply for home credit subsidies.",
    desc_hi: "भूमि स्वामित्व खोज रिपोर्ट का अनुरोध करें, ऋण-मुक्त गैर-भार प्रमाण पत्र (EC) प्राप्त करें, और आवास ऋण सब्सिडी का दावा करें।",
    expectedTimeline_en: "30 - 45 Days",
    expectedTimeline_hi: "30 - 45 दिन",
    citizenRoleQuote_en: "\"I am planning to buy an apartment/plot. How do I verify there are no disputes and claim PMAY benefits?\"",
    citizenRoleQuote_hi: "\"मैं एक अपार्टमेंट/जमीन खरीदने की सोच रहा हूँ। मैं यह कैसे सत्यापित करूँ कि कोई विवाद नहीं है?\"",
    readinessScore: 7,
    officesRequired_en: ["Sub-Registrar of Assurances Office", "Municipal Development Authority", "Nationalized Housing Finance Branch"],
    officesRequired_hi: ["पंजीकरण और आश्वासन उप-रजिस्ट्रार कार्यालय", "नगर पालिका विकास प्राधिकरण", "राष्ट्रीयकृत हाउसिंग फाइनेंस बैंक"],
    documents: [
      { name_en: "Sale Deed papers of Seller", name_hi: "विक्रेता के मूल भूमि हस्तांतरण कागजात (बैनामा)", purpose_en: "Establishes chain of historical ownership.", purpose_hi: "ऐतिहासिक स्वामित्व की श्रृंखला स्थापित करता है।", isCritical: true },
      { name_en: "Encumbrance Certificate (EC)", name_hi: "भार-मुक्त प्रमाण पत्र (Encumbrance Cert)", purpose_en: "Proves that the land/building has zero current collateral hypothecation.", purpose_hi: "साबित करता है कि भूमि/भवन पर कोई वित्तीय बंधक या बकाया कर्ज नहीं है।", isCritical: true },
      { name_en: "Land revenue receipts (Khajana)", name_hi: "नवीनतम भू-राजस्व कर भुगतान रसीद (लगान)", purpose_en: "Confirms zero municipal or tax default liabilities.", purpose_hi: "शून्य नगर पालिका या कर चूक देनदारियों की पुष्टि करता है।", isCritical: true },
      { name_en: "Approved Layout Plan map", name_hi: "स्वीकृत साइट लेआउट योजना मानचित्र", purpose_en: "Official blueprint map signed by municipal planners.", purpose_hi: "नगर निगम नियोजकों द्वारा हस्ताक्षरित आधिकारिक खाका मानचित्र।", isCritical: false }
    ],
    roadmap: [
      { step: 1, title_en: "Acquire Encumbrance Certificate", title_hi: "भार-मुक्त (EC) प्रमाण पत्र प्राप्त करें", desc_en: "Apply to the registry office to trace historical transactions of the property for the last 15 years.", desc_hi: "पिछले 15 वर्षों के संपत्ति के ऐतिहासिक लेनदेन का पता लगाने के लिए रजिस्ट्री कार्यालय में आवेदन करें।", office: "Sub-Registrar Office" },
      { step: 2, title_en: "Obtain Title Legal Opinion Certificate", title_hi: "कानूनी मालिकाना मालिकाना राय प्राप्त करें", desc_en: "Appoint an empanelled bank panel advocate to issue a formal clean ownership check.", desc_hi: "स्वामित्व की औपचारिक जांच जारी करने के लिए बैंक के सूचीबद्ध पैनल वकील की सेवा लें।", office: "Authorized Advocate Chamber" },
      { step: 3, title_en: "Apply or Register for PMAY Subsidy", title_hi: "PMAY आवास सब्सिडी के लिए आवेदन करें", desc_en: "File for credit-linked interest subsidies when linking with underwriting home loans.", desc_hi: "गृह ऋण के साथ जोड़ते समय क्रेडिट-लिंक्ड ब्याज सब्सिडी के लिए फाइल सबमिट करें।", office: "Home Finance Bank Branch" }
    ]
  },
  {
    id: "turned-18",
    title_en: "I turned 18",
    title_hi: "मैं १८ वर्ष का हो गया हूँ",
    iconName: "User",
    desc_en: "Unlock adult citizenship rights, voting power, PAN cards, individual banking, and adult biometric Aadhaar card updates.",
    desc_hi: "वयस्क नागरिकता अधिकार, मतदान शक्ति, पैन कार्ड, व्यक्तिगत बैंकिंग, और आधार रिकॉर्ड बायोमेट्रिक अपडेट अनलॉक करें।",
    expectedTimeline_en: "10 - 20 Days",
    expectedTimeline_hi: "10 - 20 दिन",
    citizenRoleQuote_en: "\"I just turned 18 other than studying. How do I acquire dynamic voting and taxable ID cards?\"",
    citizenRoleQuote_hi: "\"मैं अभी-अभी 18 वर्ष का हुआ हूँ। मैं वयस्क मतदान अधिकार और कर पहचान आईडी कैसे प्राप्त करूँ?\"",
    readinessScore: 9,
    officesRequired_en: ["Nearest Aadhaar Enrollment Center", "District Election Office", "Nationalized Public Bank branch"],
    officesRequired_hi: ["निकटतम आधार नामांकन केंद्र", "जिला निर्वाचन कार्यालय", "राष्ट्रीयकृत सार्वजनिक बैंक शाखा"],
    documents: [
      { name_en: "Aadhaar Card Adult Update", name_hi: "वयस्क आधार बायोमेट्रिक नवीनीकरण", purpose_en: "Mandatory adult biometric profile registration.", purpose_hi: "अनिवार्य वयस्क बायोमेट्रिक प्रोफाइल और फोटो पंजीकरण।", isCritical: true },
      { name_en: "PAN Card Registration", name_hi: "पैन कार्ड आवेदन", purpose_en: "Allows creation of taxation accounts, savings accounts, and salary lines.", purpose_hi: "कर खातों, बचत खातों और वेतन खातों के संचालन की अनुमति देता है।", isCritical: true },
      { name_en: "Voter ID card (EPIC Card)", name_hi: "मतदाता पहचान पत्र (EPIC/Voter ID)", purpose_en: "Constitutional voting rights identifier.", purpose_hi: "संवैधानिक मतदान अधिकार पहचान पत्र।", isCritical: true },
      { name_en: "Aadhaar Seeded bank account", name_hi: "आधार सीडेड बैंक बचत खाता", purpose_en: "Zero-balance savings account essential for direct social support DBT payout access.", purpose_hi: "प्रत्यक्ष सामाजिक सहायता DBT भुगतान प्राप्त करने के लिए आधार सीडेड बैंक खाता।", isCritical: true }
    ],
    roadmap: [
      { step: 1, title_en: "Submit Voter ID form online", title_hi: "ऑनलाइन वोटर आईडी फॉर्म जमा करें", desc_en: "Go to voters.eci.gov.in and fill Form-6 with matriculation class cert and photographs.", desc_hi: "voters.eci.gov.in पर जाएं और बोर्ड परीक्षा प्रमाणपत्र और फोटो के साथ फॉर्म-6 भरें।", office: "NVSP Portal / BLO Desk" },
      { step: 2, title_en: "Undergo Aadhaar Adult Biometric capture", title_hi: "आधार वयस्क बायोमेट्रिक फिंगरप्रिंट दें", desc_en: "Visit nearby Aadhaar/Post counter to execute full biometric refresh to avoid automatic locks.", desc_hi: "स्वचालित आधार बायोमेट्रिक लॉक को रोकने के लिए फिंगरप्रिंट और आईरिस का बायोमेट्रिक रिफ्रेश पूरा करें।", office: "Aadhaar Center Node" },
      { step: 3, title_en: "Acquire Permanent PAN Card online", title_hi: "ऑनलाइन परमानेंट पैन कार्ड प्राप्त करें", desc_en: "Submit quick paperless e-PAN application using Aadhaar mobile SMS verification online.", desc_hi: "आधार मोबाइल एसएमएस सत्यापन का उपयोग करके त्वरित ऑनलाइन ई-पैन आवेदन जमा करें।", office: "NSDL / UTITSL Portal" }
    ]
  }
];
