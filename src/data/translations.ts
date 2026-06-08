// Unified dynamic translations dictionary for Haqqdar Platform
// Supports complete instantaneous bilingual transition (English <=> Hindi) with zero flaws.

export interface KeyTranslation {
  en: string;
  hi: string;
}

export const UI_TRANSLATIONS: Record<string, KeyTranslation> = {
  // Navigation Tabs
  "tab.home": { en: "Home", hi: "मुख्य पृष्ठ" },
  "tab.navigator": { en: "Life Navigator", hi: "लाइफ नेविगेटर" },
  "tab.documents": { en: "Gap Analyzer", hi: "गैप विश्लेषक" },
  "tab.recovery": { en: "Recovery Engine", hi: "सुधार इंजन" },
  "tab.benefits": { en: "Benefits Console", hi: "सरकारी योजनाएं" },
  "tab.agriculture": { en: "Agritech Shield", hi: "कृषि संवर्धन" },
  "tab.appeals": { en: "Appeals & RTI", hi: "आरटीआई और अपील" },
  "tab.assistant": { en: "Guardian Network", hi: "अभिभावक नेटवर्क" },
  "tab.northeast": { en: "Northeast Hub", hi: "उत्तर-पूर्वी हब" },

  // Header and Taglines
  "site.title": { en: "HAQQDAR", hi: "हकदार" },
  "site.tagline": { en: "SECURE CITIZEN OS", hi: "सुरक्षित सिटिजन ओएस" },
  "site.description": { 
    en: "Democratic Inclusion • Verified Government Directory", 
    hi: "लोकतांत्रिक समावेशन • सत्यापित सरकारी निर्देशिका" 
  },
  "site.emergency.btn": { en: "EMERGENCY", hi: "आपातकालीन" },
  "site.toast.lang": { en: "Language set to English", hi: "भाषा हिंदी में बदल दी गई है" },

  // Hero Section
  "hero.title1": { en: "Find the Benefits", hi: "वह सरकारी लाभ पाएं" },
  "hero.title2": { en: "You Deserve.", hi: "जिसके आप हकदार हैं।" },
  "hero.desc": {
    en: "Discover government schemes, evaluate document status, recover from arbitrary application rejections, and secure your statutory rights with confidence.",
    hi: "सरकारी योजनाओं की खोज करें, अपने दस्तावेज़ों की स्थिति जांचें, मनमाने आवेदन अस्वीकरणों को सुधारें, और आत्मविश्वास के साथ अपने वास्तविक कानूनी अधिकारों को प्राप्त करें।"
  },
  "hero.badge": { en: "Verified National Inclusion System", hi: "सत्यापित राष्ट्रीय समावेशन प्रणाली" },
  "hero.btn.eligibility": { en: "Check Eligibility", hi: "पात्रता जांचें" },
  "hero.btn.docs": { en: "Document Readiness", hi: "दस्तावेज़ तैयारी स्थिति" },
  "hero.note": {
    en: "Calculated dynamically based on physical profile coordinates in real-time. No false simulation of results.",
    hi: "आपके वास्तविक प्रोफाइल विवरणों के आधार पर लाइव गणना। कोई नकली आंकड़े या कृत्रिम आंकड़े नहीं।"
  },

  // Trust Section
  "trust.title": { en: "Democratic Public Infrastructure", hi: "लोकतांत्रिक लोक अवसंरचना" },
  "trust.subtitle": { 
    en: "Designed strictly for citizens to access entitlements directly, free from middlemen, fee-seeking agents, or tracking.",
    hi: "नागरिकों के लिए सीधे लाभ प्राप्त करने हेतु डिज़ाइन की गई सुरक्षित प्रणाली, दलालों या छिपे शुल्कों से पूर्णतः मुक्त।" 
  },
  "trust.item1.title": { en: "Official Directives", hi: "सत्यापित आधिकारिक स्रोत" },
  "trust.item1.desc": { en: "Every scheme is cataloged directly from verified government gazette entries.", hi: "प्रत्येक योजना का विवरण सीधे सरकारी अधिसूचनाओं (.gov.in) से सत्यापित किया गया है।" },
  "trust.item2.title": { en: "No Brokerage Fees", hi: "पूर्णतः निःशुल्क" },
  "trust.item2.desc": { en: "Haqqdar never acts as an intermediary or charges commissions. Links are 100% official.", hi: "हकदार कभी भी बिचौलिये के रूप में काम नहीं करता। सभी लिंक्स पूरी तरह आधिकारिक और सीधे हैं।" },
  "trust.item3.title": { en: "Strict Privacy Sync", hi: "कठोर व्यक्तिगत गोपनीयता" },
  "trust.item3.desc": { en: "Computations run offline inside your browser. No personal data ever leaks to external trackers.", hi: "सारी गणना आपके ब्राउज़र के भीतर ऑफलाइन चलती है। कोई भी डेटा बाहरी सर्वर पर संग्रहीत नहीं होता।" },
  "trust.item4.title": { en: "Legal Empowerment", hi: "कानूनी अधिकार संरक्षण" },
  "trust.item4.desc": { en: "Integrated with legal templates under Section 4(1)(b) of the RTI Act for self-advocacy.", hi: "नागरिक अधिकारों की सुरक्षा के लिए सूचना का अधिकार (RTI) की धारा 4(1)(b) के प्रारूपों से सुसज्जित।" },

  // Citizen Stories
  "stories.title": { en: "Real Cases We Help Resolve", hi: "वास्तविक समस्याएं जो हम हल करते हैं" },
  "stories.subtitle": { en: "Typical administrative blockages and our exact pathways to complete successful recoveries.", hi: "आम प्रशासनिक बाधाएं और लाभ प्राप्ति के लिए हमारे द्वारा बताए गए ठोस और सरल उपाय।" },
  "stories.item1.badge": { en: "Farmer Assistance Relief", hi: "किसान राहत" },
  "stories.item1.title": { en: "Agricultural Devastation Assistance Relief", hi: "फसल नुकसान मुआवजा अस्वीकरण" },
  "stories.item1.desc": { en: "A smallholder had crop compensation blocked because agricultural land remained registered under their deceased grandfather's name, triggering PFMS rejection.", hi: "एक छोटे किसान का बाढ़ मुआवजा अस्वीकार हुआ क्योंकि जमीन उनके मृत दादाजी के नाम पर ही दर्ज थी, जिससे बैंक खाता सत्यापन विफल हुआ।" },
  "stories.item1.path": { en: "Use Agritech Shield to download a physical Mutation Form, get verified Gram Panchayat certificates, and update bank registration.", hi: "कृषि संवर्धन टूल द्वारा नामांतरण (म्यूटेशन) फॉर्म प्राप्त करें, ग्राम पंचायत से सत्यापन कराएं, और बैंक खाता अपडेट करें।" },
  
  "stories.item2.badge": { en: "Student Academic Support", hi: "छात्र सहायता" },
  "stories.item2.title": { en: "Scholarship Blockage due to Minor Spelling Discrepancy", hi: "नाम वर्तनी विसंगति से छात्रवृत्ति रुकावट" },
  "stories.item2.desc": { en: "A high-performing student in Assam had their Ishan Uday scholarship blocked on National Scholarship Portal due to a one-letter Aadhaar mismatch.", hi: "एक मेधावी छात्र की ईशान उदय छात्रवृत्ति राष्ट्रीय पोर्टल पर इसलिए रुक गई क्योंकि उनके आधार और स्कूल प्रमाण पत्र में स्पेलिंग अलग थी।" },
  "stories.item2.path": { en: "Utilize Appeals Room to generate an official affidavit draft and use e-District options to align Aadhaar biometric profiles.", hi: "अपील स्टूडियो के माध्यम से आधिकारिक हलफनामा (Affidavit) ड्राफ्ट तैयार करें और आधार वर्तनी सुधार केंद्र पर जमा करें।" },

  "stories.item3.badge": { en: "Pension Rights", hi: "वृद्धावस्था पेंशन" },
  "stories.item3.title": { en: "Pension Suspended Due to Faded Fingerprints", hi: "फिंगरप्रिंट न मिलने से रुकी हुई पेंशन" },
  "stories.item3.desc": { en: "An elderly widow suffered immediate pension suspension after biometric check-in failed consecutively at local banking points.", hi: "एक बुजुर्ग महिला की मासिक सामाजिक पेंशन बैंक में बायोमेट्रिक सत्यापन (फिंगरप्रिंट) बार-बार विफल होने के कारण रोक दी गई थी।" },
  "stories.item3.path": { en: "Secure Aadhaar authentication bypass using Section 3.2 Eye-Iris exception protocols guided by our Documents Portal.", hi: "हमारे दस्तावेज़ पोर्टल की मदद से आधार विनियमन की धारा 3.2 (आईरिस / आंख की पुतली द्वारा सत्यापन) का लाभ उठाकर पेंशन पुनः चालू करें।" },

  // Common UI Actions and labels
  "act.apply": { en: "Apply Now", hi: "अभी आवेदन करें" },
  "act.markheld": { en: "Mark Held", hi: "मेरे पास है" },
  "act.heldstatus": { en: "Held on File", hi: "दस्तावेज़ उपलब्ध है" },
  "lbl.copydraft": { en: "Copy Draft Text", hi: "प्रारूप कॉपी करें" },
  "lbl.savedraft": { en: "Save as Document", hi: "प्रारूप डाउनलोड करें" },
  "lbl.category": { en: "Category", hi: "श्रेणी" },
  "lbl.helpline": { en: "Helpline", hi: "हेल्पलाइन नंबर" },
  "lbl.state": { en: "State", hi: "राज्य" },

  // Tab - Benefits Console
  "ben.title": { en: "Entitlements Eligibility Simulator", hi: "सरकारी पात्रता एवं योजनाएं" },
  "ben.desc": { en: "Adjust your socio-economic parameters below to estimate precisely what schemes and direct payments (DBT) you qualify for.", hi: "नीचे दिए गए मापदंडों में अपनी सामाजिक-आर्थिक स्थिति भरें, योजनाएं और बैंक ट्रांसफर (DBT) की तुरंत पात्रता सूची पाएं।" },
  "ben.profile.title": { en: "Configure Profile Coordinates", hi: "अपना सामाजिक प्रोफाइल विवरण भरें" },
  "ben.profile.state": { en: "Domicile State", hi: "मूल निवासी राज्य" },
  "ben.profile.age": { en: "Age (Years)", hi: "आयु (वर्ष में)" },
  "ben.profile.income": { en: "Annual Household Income", hi: "वार्षिक पारिवारिक आय" },
  "ben.profile.occ": { en: "Primary Occupation", hi: "मुख्य व्यवसाय" },
  "ben.profile.gender": { en: "Gender Ident", hi: "लिंग वर्गीकरण" },
  "ben.profile.social": { en: "Social Category", hi: "सामाजिक वर्ग (जाति)" },
  "ben.results.title": { en: "Your Individual Performance Summary", hi: "आपकी व्यक्तिगत पात्रता सारांश" },
  "ben.results.match": { en: "Matching Schemes", hi: "पात्र योजनाएं" },
  "ben.results.active": { en: "Active Schemes", hi: "सक्रिय योजनाएं" },
  "ben.results.claimed": { en: "Claimed Value", hi: "दावा की गई आर्थिक सहायता" },
  "ben.search.placeholder": { en: "Search matching entitlements (e.g. Kisan, Awas, Health, Mudra)...", hi: "योजना खोजें (जैसे: किसान, आवास, आयुष्मान, मुद्रा)..." },
  "ben.statehub.title": { en: "Northeast India State Welfare Hub", hi: "उत्तर-पूर्वी भारतीय राज्य कल्याण कंसोल" },
  "ben.statehub.desc": { en: "Access verified state circulars, tribal protections, customary land rules, and dedicated local directories.", hi: "सत्यापित राज्य सरकारी परिपत्र, जनजातीय संरक्षण कानून और स्थानीय दिशानिर्देशों वाले विशिष्ट क्षेत्रीय केंद्र।" },

  // Tab - Agritech Precision Shield
  "agri.title": { en: "Agriculture Precision Shield", hi: "कृषि परिशुद्धता एवं सुरक्षा कवच" },
  "agri.subtitle": { en: "Evaluate Crop Insurance, estimate Fasal Bima reliefs, diagnose Soil Health, and query our Crop Disease expert system.", hi: "फसल बीमा दावों को ट्रैक करें, प्राकृतिक आपदा राहत का अनुमान लगाएं, मृदा स्वास्थ्य की जांच करें और फसल रोग विशेषज्ञों का परामर्श लें।" },
  "agri.insurance.unit": { en: "Crop Insurance & Disaster Relief Assistant", hi: "प्रधानमंत्री फसल बीमा योजना दावे" },
  "agri.insurance.crop": { en: "Cultivated Crop Type", hi: "फसल का प्रकार" },
  "agri.insurance.loss": { en: "Estimated Crop Loss Area", hi: "अनुमानित फसल क्षति सीमा" },
  "agri.insurance.reason": { en: "Cause of Damage", hi: "फसल नुकसान का मुख्य कारण" },
  "agri.insurance.btn": { en: "Calculate Estimate & Action Checklist", hi: "अनुमानित राहत और कानूनी प्रक्रिया जानें" },
  "agri.soil.unit": { en: "Soil NPK Chemistry Diagnostics", hi: "मृदा स्वास्थ्य (NPK) रसायन रिपोर्ट" },
  "agri.soil.n": { en: "Nitrogen (N) Status", hi: "नाइट्रोजन स्तर (N)" },
  "agri.soil.p": { en: "Phosphorus (P) Status", hi: "फॉस्फोरस स्तर (P)" },
  "agri.soil.k": { en: "Potassium (K) Status", hi: "पोटेशियम स्तर (K)" },
  "agri.soil.btn": { en: "Analyze Soil Macro-Nutrients", hi: "मृदा पोषक तत्वों की जांच करें" },
  "agri.disease.unit": { en: "Crop Health & Damage Diagnostic AI Advisor", hi: "फसल रोग निदान एवं उपचार विशेषज्ञ एआई" },
  "agri.disease.placeholder": { en: "Describe symptoms (e.g. wheat leaves turning yellow with brown spots, rice blast)...", hi: "फसल के लक्षण लिखें (जैसे: धान के पौधों पर भूरे कीड़े लग गए हैं, पत्तियां पीली पड़ रही हैं)..." },
  "agri.disease.btn": { en: "Synthesize Agricultural Remedy", hi: "कीटनाशक एवं उपचार सुझाव प्राप्त करें" },
  "agri.compliance.warning": { en: "Critical Rule: Damage claims must be reported within 72 hours of unseasonal weather event for PMFBY validation.", hi: "फसल बीमा नियम: प्राकृतिक आपदा के 72 घंटे के भीतर नुकसान की सूचना बीमा कंपनी को देना अनिवार्य है।" },

  // Tab - Documents readiness 
  "doc.title": { en: "National Document Readiness Index", hi: "दस्तावेज़ उपलब्धता एवं तैयारी केंद्र" },
  "doc.desc": { en: "Verify if you hold essential identity proofs. Check competent issuers, processing times, and cost details to prevent rejection.", hi: "सुनिश्चित करें कि आपके पास सभी आवश्यक पहचान प्रमाण उपलब्ध हैं। अस्वीकृति से बचने हेतु कानूनी शुल्क और समय सीमा की जांच करें।" },
  "doc.score.title": { en: "Consolidated Document Health Level", hi: "दस्तावेज़ सुदृढ़ता स्तर संकेतक" },
  "doc.score.perfect": { en: "Perfect! Mapped profile completely protected from paper-based rejections.", hi: "उत्कृष्ट! आपके पास सभी आवश्यक दस्तावेज़ उपलब्ध हैं, आप कागजी अस्वीकृति से पूर्णतः सुरक्षित हैं।" },
  "doc.score.mid": { en: "Substantial coverage. Complete remaining forms checked below for smooth direct payments (DBT).", hi: "काफी दस्तावेज़ तैयार हैं। बचे हुए दस्तावेज़ों को भी जल्द पूरा करें ताकि डीबीटी (DBT) सीधे बिना रुके प्राप्त हो।" },
  "doc.score.low": { en: "Severe gaps. Under-documented. Utilize our priority sequence below next.", hi: "गंभीर कमी। भविष्य में रिजेक्शन हो सकता है। कृपया नीचे दी गई प्राथमिकता अनुक्रम का अनुसरण करें।" },
  "doc.roadmap.title": { en: "Zero Document Entry Protocol (Undocumented Mode)", hi: "शून्य दस्तावेज़ प्रवेश नियमप्रणाली (नागरिक समावेशन क्रम)" },
  "doc.roadmap.desc": { en: "If you have zero credentials, you are structurally isolated. Follow this priority sequence to unlock legal identity from scratch.", hi: "यदि आपके पास एक भी पहचान पत्र नहीं है, तो आप सरकारी लाभों से वंचित हो सकते हैं। एक वैध पहचान हासिल करने के लिए दी गई प्रक्रिया का पालन करें।" },

  // Tab - Rejection Recovery Engine
  "rec.title": { en: "Rejection Recovery & Diagnostic Engine", hi: "आवेदन अस्वीकृति सुधार केंद्र" },
  "rec.desc": { en: "Provide the reason listed on your rejected application page. Haqqdar analyzes bureaucratic blocks and returns structural correction steps.", hi: "अपने अस्वीकृत आवेदन पर प्रदर्शित टिप्पणी (Remarks) दर्ज करें। हकदार बाधाओं का विश्लेषण कर आपको सुधार के कदम बताएगा।" },
  "rec.form.scheme": { en: "Target Government Welfare Scheme", hi: "सरकारी योजना का चयन करें" },
  "rec.form.remark": { en: "State Administrative Status / Official Rejection remarks", hi: "आवेदन अस्वीकृति के सरकारी टिप्पणी (Remarks)" },
  "rec.verdict.title": { en: "REMEDY & TECHNICAL CORRECTION INSTRUCTIONS", hi: "सुधार के लिए आवश्यक उपाय और निर्देश" },
  "rec.timeline": { en: "Official Repair Timeline", hi: "सुधार की समय सीमा" },
  "rec.portal": { en: "Official Direct State Portal", hi: "आधिकारिक सरकारी वेबसाइट" },
  "rec.notice": { en: "Right to Written Order: Officers must share a signed reason for any rejection. Seek RTI on failure.", hi: "लिखित आदेश का अधिकार: कर्मचारी किसी भी अस्वीकृति पर हस्ताक्षर सहित लिखित कारण देने के लिए बाध्य हैं।" },

  // Tab - Appeals and RTI Studio
  "app.title": { en: "Statutory Appeals & RTI Drafting Studio", hi: "सूचना का अधिकार (RTI) एवं अपील स्टूडियो" },
  "app.desc": { en: "Draft Section 6(1) Right to Information queries or Section 19(1) Appeals to contest delays. Affix ₹10 Postal Order to mail.", hi: "देरी या अस्वीकृति के विरुद्ध सूचना का अधिकार (RTI) की धारा 6(1) के तहत आवेदन पत्र या शिकायत पत्र तैयार करें।" },
  "app.form.type": { en: "Select Legal Action Draft", hi: "कानूनी प्रारूप का चयन करें" },
  "app.form.name": { en: "Applicant Full Legal Name", hi: "आवेदक का पूरा कानूनी नाम" },
  "app.form.district": { en: "District Headquarters", hi: "जिला मुख्यालय" },
  "app.form.state": { en: "State Territory", hi: "राज्य" },
  "app.form.address": { en: "Residential Mail Address", hi: "स्थायी पत्राचार का पता" },
  "app.form.dept": { en: "Responding Authority Branch", hi: "संबंधित सरकारी विभाग" },
  "app.form.scheme": { en: "Target Scheme Name", hi: "योजना का नाम" },
  "app.form.id": { en: "Application Registration ID", hi: "आवेदन पंजीकरण (Reference) संख्या" },
  "app.form.reason": { en: "Detailed Grievance / Injustice Remarks", hi: "शिकायत का विस्तृत विवरण" },
  "app.draft.title": { en: "Foresight Legal Document Compiler", hi: "कंपाइल किया गया कानूनी दस्तावेज प्रारूप" },
  "app.instructions.title": { en: "📬 Mailing & Filing Guidelines", hi: "📬 सूचना पत्र भेजने और जमा करने के निर्देश" },

  // Tab - AI Assistant
  "ast.title": { en: "Haqqdar Citizen Assistant", hi: "हकदार सिटिजन एआई सहायक" },
  "ast.desc": { en: "Ask questions on entitlement policies, missing card applications, or crop damage. Real-time translation ready.", hi: "सरकारी पात्रता नीतियों, लापता पहचान पत्र अनुप्रयोगों, या फसल नुकसान मुआवजा पर सवाल पूछें। लाइव एआई अनुवाद उपलब्ध है।" },
  "ast.header": { en: "Haqqdar Secure M3 Guard Assistant", hi: "हकदार सिटिजन एआई सहायक" },
  "ast.subheader": { en: "Interactive Legal Guidance", hi: "इंटरैक्टिव कानूनी और सामाजिक सहायता" },
  "ast.voice.on": { en: "Voice Support Active", hi: "आवाज सहायक चालू है" },
  "ast.voice.off": { en: "Voice Support Disabled", hi: "आवाज सहायक बंद है" },
  "ast.input.placeholder": { en: "Ask anything (e.g. why am I rejected from PM Kisan? How to get crop insurance?)...", hi: "सवाल पूछें (जैसे: पीएम किसान सम्मान निधि का पैसा नहीं आया तो क्या करें? फसल नुकसान का मुआवजा कैसे लें?)..." },
  "ast.btn.ask": { en: "Ask AI", hi: "एआई से पूछें" },

  // Emergency Modal
  "em.title": { en: "National Verified Emergency Hotlines", hi: "राष्ट्रीय आपातकालीन हेल्पलाइन नंबर" },
  "em.subtitle": { en: "24/7 Toll-Free Emergency Support & Grievance Desks for Social Protection", hi: "सामाजिक सुरक्षा और शिकायतों के लिए चौबीसों घंटे चालू टोल-फ्री आपातकालीन सेवा" },
  "em.warning": { en: "All emergency numbers are completely free of charge to call from any active mobile connection, backed by acts of Parliament of India. Satyameva Jayate.", hi: "सभी आपातकालीन नंबर संसद के अधिनियमों द्वारा संरक्षित हैं और शून्य टॉकटाइम बैलेंस में भी पूरी तरह निःशुल्क काम करते हैं। सत्यमेव जयते।" },
  "em.dismiss": { en: "Dismiss Portal", hi: "कंसोल बंद करें" },

  // Footer
  "ft.brand": { en: "HAQQDAR", hi: "हकदार" },
  "ft.sec": { en: "Verified Inclusion", hi: "सत्यापित समावेशन" },
  "ft.act": { en: "An activist digital administrative platform built to satisfy Section 4(1)(b) of the Right to Information Act, requiring proactive public disclosures.", hi: "एक सक्रिय नागरिक प्रशासनिक मंच जो सूचना का अधिकार अधिनियम की धारा 4(1)(b) के तहत लोक प्रकटीकरण मानदंडों को पूरा करता है।" },
  "ft.cop": { en: "Mapped in compliance with democratic welfare access and security principles. Satyameva Jayate.", hi: "लोकतांत्रिक कल्याणकारी पहुंच और सुरक्षा मानदंडों के अनुपालन में डिजाइन किया गया। सत्यमेव जयते।" },
};

// Map Scheme translations on the fly specifically to ensure 100% Hindi accuracy under Hindi state
export const translateScheme = (scheme: any, language: string) => {
  if (language !== "Hindi") return scheme;

  const overrides: Record<string, any> = {
    "pm-kisan": {
      name: "पीएम-किसान सम्मान निधि (कृषि आय सहायता)",
      tagline: "छोटे किसानों के लिए सीधी वार्षिक आय सहायता",
      benefitDescription: "₹6,000 प्रति वर्ष सीधे बैंक खाते में (3 समान किश्तें)",
      description: "छोटे और सीमांत किसान परिवारों को कृषि इनपुट, बीज और उर्वरक खरीदने के लिए सीधे वित्तीय सहायता प्रदान करना। सीधे बैंक डीबीटी से जुड़े।",
      responsibleMinistry: "कृषि एवं किसान कल्याण मंत्रालय",
      rejectionReasons: [
        {
          reason: "भूमि रिकॉर्ड और म्यूटेशन का आवेदनकर्ता के नाम पर न होना",
          correction: "स्थानीय पटवारी से संपर्क कर म्यूटेशन रिकॉर्ड (दाखिल-खारिज) की हस्ताक्षरित कॉपी लें और पोर्टल पर अपलोड करें।",
          timeline: "15 दिन"
        },
        {
          reason: "आधार और बैंक खाते में नाम की वर्तनी (Spelling) में विसंगति",
          correction: "बैंक शाखा में आधार कार्ड जमा कर ई-केवाईसी (e-KYC) कराएं और नाम सुधार का फॉर्म भरें।",
          timeline: "7 दिन"
        }
      ]
    },
    "pmay-g": {
      name: "प्रधानमंत्री आवास योजना (ग्रामीण)",
      tagline: "ग्रामीण इलाकों में सभी के लिए पक्का मकान",
      benefitDescription: "₹1.2 लाख (मैदानी) से ₹1.3 लाख (पहाड़ी क्षेत्र) + ₹12,000 शौचालय विकास अनुदान",
      description: "कच्चे या जीर्ण-शीर्ण घरों में रहने वाले गरीब ग्रामीण परिवारों को पक्के और सुरक्षित घर बनाने के लिए वित्तीय सहायता देना।",
      responsibleMinistry: "ग्रामीण विकास मंत्रालय",
      rejectionReasons: [
        {
          reason: "आवेदक के पास पहले से पक्का मकान होना या दोपहिया वाहन होना",
          correction: "यदि पुराना रिकॉर्ड त्रुटिपूर्ण है, तो ग्राम पंचायत और सचिव से पक्के घर न होने का सत्यापन भौतिक फोटो के साथ बीडीओ को भेजें।",
          timeline: "20 दिन"
        }
      ]
    },
    "pm-mudra": {
      name: "प्रधानमंत्री मुद्रा ऋण योजना",
      tagline: "छोटे ग्रामीण व्यापारों के लिए बिना गारंटी का ऋण",
      benefitDescription: "सूक्ष्म व्यवसायों को ₹10 लाख तक का संपार्श्विक-मुक्त व्यापार ऋण",
      description: "सूक्ष्म उद्यमों को बिना किसी गारंटी के सिलाई, दुकान, या लघु व्यापार शुरू करने के लिए तीन श्रेणियों (शिशु, किशोर, तरुण) में बैंक ऋण।",
      responsibleMinistry: "वित्त मंत्रालय, भारत सरकार",
      rejectionReasons: [
        {
          reason: "विस्तृत व्यापार योजना (Business Plan) या कोटेशन न होना",
          correction: "मुद्रा के आधिकारिक प्रारूप में अनुमानित लाभ-हानि रिपोर्ट और स्थानीय डीलर से मशीनरी कोटेशन पत्र बैंक में जमा करें।",
          timeline: "7-10 दिन"
        }
      ]
    },
    "mgnregs": {
      name: "मनरेगा (रोजगार जॉब कार्ड)",
      tagline: "सामाजिक और कार्य सुरक्षा गारंटी",
      benefitDescription: "प्रति परिवार प्रति वर्ष न्यूनतम 100 दिनों का अकुशल शारीरिक रोजगार",
      description: "ग्रामीण व्यस्कों को उनके घर के पास 15 दिनों के भीतर कानूनी रूप से काम का अधिकार देने वाली अधिकार-आधारित सुरक्षा योजना।",
      responsibleMinistry: "ग्रामीण विकास मंत्रालय",
      rejectionReasons: [
        {
          reason: "आवेदक का पता शहरी नगरपालिका में दर्ज होना",
          correction: "ग्रामीण पते का नया अधिवास प्रमाणपत्र (Domicile) या राशन कार्ड ग्राम सचिव के पास सत्यापित कराकर आवेदन करें।",
          timeline: "7 दिन"
        }
      ]
    },
    "orunodoi": {
      name: "अरुणोदय 2.0 (असम राज्य योजना)",
      tagline: "महिला मुखियाओं के लिए प्राथमिक वित्तीय सुरक्षा कवच",
      benefitDescription: "₹1,250 प्रति माह सीधे महिला मुखिया के बैंक खाते में सीधे ट्रांसफर",
      description: "असम राज्य सरकार की प्रमुख महिला अधिकार योजना जिसके तहत गरीब परिवारों की महिला मुखिया को आवश्यक खर्चों के लिए सीधी सहायता दी जाती है।",
      responsibleMinistry: "वित्त विभाग, असम सरकार",
      rejectionReasons: [
        {
          reason: "चुना गया बैंक खाता महिला के नाम पर न होकर संयुक्त (Joint) होना",
          correction: "महिला मुखिया के एकल नाम पर एक नया बचत खाता नजदीकी डाकघर भुगतान बैंक या बैंक शाखा में खुलवाकर पासबुक संलग्न करें।",
          timeline: "5 दिन"
        }
      ]
    },
    "ishan-uday": {
      name: "ईशान उदय छात्रवृत्ति (UGC)",
      tagline: "पूर्वोत्तर राज्यों के लिए उच्च शिक्षा मेरिट छात्रवृत्ति",
      benefitDescription: "₹5,400 प्रति माह (सामान्य यूजी) और ₹7,800 प्रति माह (व्यावसायिक पाठ्यक्रम)",
      description: "विश्वविद्यालय अनुदान आयोग द्वारा पूर्वोत्तर राज्यों के कॉलेज जाने वाले मेधावी छात्र-छात्राओं के उच्च अध्ययन हेतु बड़ी विशेष सहायता योजना।",
      responsibleMinistry: "शिक्षा मंत्रालय / विश्वविद्यालय अनुदान आयोग",
      rejectionReasons: [
        {
          reason: "आय प्रमाणपत्र सक्षम प्राधिकारी द्वारा जारी न होना",
          correction: "तहसीलदार, राजस्व वृत्त अधिकारी (Circle Officer) अथवा एसडीएम द्वारा सत्यापित डिजिटल आय प्रमाण अपलोड करें। वकील के हलफनामे मान्य नहीं हैं।",
          timeline: "10 दिन"
        }
      ]
    },
    "lakhpati-baideo": {
      name: "लखपति बैदेव योजना (असम)",
      tagline: "ग्रामीण महिला समूहों को उद्यमिता प्रशिक्षण एवं अनुदान",
      benefitDescription: "₹35,000 व्यापार अनुदान और स्थायी सहायता मूल्यवान आजीविका",
      description: "ग्रामीण स्वयं सहायता समूह (SHG) की महिलाओं को सूक्ष्म व्यवसायों में बढ़ावा देकर ₹1 लाख प्रति वर्ष से अधिक की निश्चित आय दिलाना।",
      responsibleMinistry: "असम राज्य ग्रामीण आजीविका मिशन",
      rejectionReasons: [
        {
          reason: "एसएचजी विवरण मुख्य पंचायत सर्वर पर अपडेट न होना",
          correction: "एसएचजी के प्रस्ताव पत्र (Resolution Book) की फोटोकॉपी ब्लॉक समन्वयक के पास ले जाकर डेटा एंट्री पुनः सत्यापित कराएं।",
          timeline: "14 दिन"
        }
      ]
    }
  };

  const override = overrides[scheme.id];
  if (override) {
    return { ...scheme, ...override };
  }
  return scheme;
};

// Map Document translations to ensure perfect Hindi transition
export const translateDocument = (doc: any, language: string) => {
  if (language !== "Hindi") return doc;

  const overrides: Record<string, any> = {
    "Aadhaar Card": {
      name: "आधार कार्ड",
      purpose: "भारत के निवासियों के लिए अद्वितीय 12-अंकीय बायोमेट्रिक पहचान और डीबीटी का आधार पत्र।",
      whereToApply: "नजदीकी अधिकृत आधार नामांकन केंद्र (बैंक/डाकघर या सरकारी शिविर में)।",
      fee: "नया नामांकन पूरी तरह निःशुल्क। पता सुधार के लिए ₹50, बायोमेट्रिक्स अपडेट के लिए ₹100।",
      processingTime: "15 से 30 दिन",
      requiredProofDocs: ["पहचान प्रमाण (वोटर आईडी, पैन, स्कूल प्रमाण पत्र)", "निवास प्रमाण (राशन कार्ड, बैंक पासबुक)"],
      commonRejections: ["बायोमेट्रिक्स (अंगूठे के निशान) का साफ न होना या फोटो का मिलान न होना।"],
      proTip: "हमेशा अपना चालू मोबाइल नंबर आधार से लिंक रखें ताकि घर बैठे डीबीटी सहमति सत्यापन हेतु ओटीपी मिल सके।"
    },
    "PAN Card": {
      name: "पैन कार्ड (स्थायी खाता संख्या)",
      purpose: "बैंकिंग सेवाओं, मुद्रा व्यापार ऋण आवेदन तथा कर ऑडिट के लिए भारत सरकार का विशिष्ट कर पहचान पत्र।",
      whereToApply: "Protean (पूर्व में NSDL) या UTIITSL के आधिकारिक पोर्टल पर ऑनलाइन आवेदन करें।",
      fee: "भौतिक कार्ड के लिए ₹107; केवल ई-पैन के लिए ₹72",
      processingTime: "भौतिक कार्ड हेतु 7-10 दिन; आधार ई-केवाईसी द्वारा तत्काल ई-पैन 10 मिनट में उपलब्ध।",
      requiredProofDocs: ["आधार कार्ड लिंक मोबाइल सहमति के साथ।"],
      commonRejections: ["माता-पिता के नाम की स्पेलिंग विसंगति या पिता का गलत नाम।"],
      proTip: "यदि आधार में मोबाइल नंबर लिंक है, तो आयकर विभाग की वेबसाइट से तत्काल निःशुल्क ई-पैन प्राप्त करें।"
    },
    "Voter ID (EPIC)": {
      name: "वोटर आईडी (मतदाता पहचान पत्र)",
      purpose: "वयस्कता का अकाट्य कानूनी पहचान प्रमाण, भारतीय नागरिकता पत्र और निर्वाचन क्षेत्र निवास पत्र।",
      whereToApply: "राष्ट्रीय मतदाता सेवा पोर्टल (NVSP) अथवा मतदाता हेल्पलाइन मोबाइल ऐप पर।",
      fee: "पूर्णतः निःशुल्क",
      processingTime: "15 से 30 दिन",
      requiredProofDocs: ["आयु प्रमाण पत्र (10वीं बोर्ड प्रमाणपत्र या जन्म प्रमाण पत्र)", "निवास प्रमाण पत्र (राशन कार्ड, बिजली बिल)"],
      commonRejections: ["अपलोड की गई फोटो का सफेद बैकग्राउंड न होना या धुंधला होना।"],
      proTip: "ऑनलाइन ई-इपिक (e-EPIC) कॉपी डाउनलोड करें, इसे हर जगह भौतिक कार्ड के समान वैध माना जाता है।"
    },
    "Bank Account (Aadhaar Seeded)": {
      name: "बैंक खाता (आधार लिंक और सीडेड)",
      purpose: "सभी सरकारी प्रत्यक्ष नकदी लाभों (DBT), छात्रवृत्ति और ऋण अनुदान की राशि सीधे प्राप्त करने की तिजोरी।",
      whereToApply: "किसी भी राष्ट्रीयकृत बैंक, निजी बैंक शाखा या नजदीकी पोस्ट ऑफिस पेमेंट्स बैंक (IPPB) में।",
      fee: "प्रधानमंत्री जन धन योजना (PMJDY) के अधीन पूरी तरह निःशुल्क (जीरो-बैलेंस खाता)।",
      processingTime: "उसी दिन तत्काल चालू",
      requiredProofDocs: ["आधार कार्ड", "दो रंगीन पासपोर्ट फोटो", "वोटर आईडी अथवा राशन कार्ड की कॉपी"],
      commonRejections: ["पूरा केवाईसी फार्म न भरना या समय पर हस्ताक्षर अपलोड न होना।"],
      proTip: "खाता खुलवाते समय कर्मचारी से कहें कि 'इसे एनपीसीआई मैपर (NPCI) पर सीमलेस डीबीटी के लिए मैप करें'। केवल खाता काफी नहीं, डीबीटी मैपिंग होना अनिवार्य है!"
    },
    "Income Certificate": {
      name: "आय प्रमाण पत्र",
      purpose: "छात्रवृत्ति, शुल्क छूट तथा समाज कल्याण योजनाओं की पात्रता हेतु परिवार की कुल वार्षिक आय का वैध प्रमाण।",
      whereToApply: "राज्य के ई-डिस्ट्रिक्ट (e-District) पोर्टल पर ऑनलाइन अथवा नजदीकी तहसील/राजस्व वृत्त कार्यालय में।",
      fee: "₹10 से ₹50",
      processingTime: "10 से 15 दिन",
      requiredProofDocs: ["वेतन पर्ची या जमीन के लगान की रसीद", "ग्राम पंचायत/पटवारी की जांच रिपोर्ट", "आधार कार्ड"],
      commonRejections: ["अवधि समाप्त होना (आय प्रमाण पत्र केवल एक वित्तीय वर्ष के लिए वैध होते हैं)। हलफनामे (Affidavit) मान्य नहीं होते।"],
      proTip: "वित्त वर्ष समाप्त होने पर हर साल अप्रैल-मई में अपना नया आय प्रमाण पत्र बनवाएं, कॉलेज फॉर्म जमा करने की अंतिम तिथि का इंतजार न करें!"
    },
    "Domicile Certificate": {
      name: "मूल निवास प्रमाण पत्र",
      purpose: "राज्य विशेष का निवासी होने का आधिकारिक साक्ष्य, विशिष्ट राज्य छात्रवृत्ति और नौकरियों के लिए अनिवार्य।",
      whereToApply: "राज्य के ई-डिस्ट्रिक्ट पोर्टल पर या जिला एसडीएम / तहसीलदार कार्यालय में।",
      fee: "₹20 से ₹50",
      processingTime: "15 से 21 दिन",
      requiredProofDocs: ["जमीन की रसीद या कम से कम 10 साल पुराना स्थानीय निवासी होने का प्रमाण, स्कूल टीसी या वोटर लिस्ट।"],
      commonRejections: ["माता-पिता के निवास का साक्ष्य साथ संलग्न न करना।"],
      proTip: "पूर्वोत्तर राज्यों के छात्र अपनी उच्च शिक्षा के लिए अन्य प्रदेशों में जाने से पूर्व अपने गृह जिले से इसे अवश्य बनवा लें।"
    },
    "DigiLocker": {
      name: "डिजीलॉकर",
      purpose: "भारत सरकार का क्लाउड-आधारित डिजिटल स्टोरेज वॉलेट, जहां सभी सरकारी प्रमाणपत्र ऑनलाइन सत्यापित रहते हैं।",
      whereToApply: "डिजीलॉकर आधिकारिक वेबसाइट या मोबाइल ऐप पर।",
      fee: "पूर्णतः निःशुल्क",
      processingTime: "तत्काल प्रोफाइल एक्टिवेशन",
      requiredProofDocs: ["आधार कार्ड जिसमें चालू मोबाइल नंबर जुड़ा हो।"],
      commonRejections: ["आधार का मोबाइल नंबर वर्तमान में बंद होना, जिससे ओटीपी सत्यापन न हो पाना।"],
      proTip: "आईटी अधिनियम (IT Act) के नियमों के अनुसार डिजीलॉकर में उपलब्ध सभी डिजिटल दस्तावेज भौतिक दस्तावेजों के समान कानूनी मान्यता रखते हैं।"
    },
    "Caste Certificate": {
      name: "जाति प्रमाण पत्र (SC/ST/OBC)",
      purpose: "सामाजिक रूप से पिछड़े वर्गों, जातियों और अनुसूचित जनजातियों को आरक्षण एवं विशेष भत्ते प्रदान करने का वैध प्रमाण।",
      whereToApply: "ई-डिस्ट्रिक्ट पोर्टल या तहसीलदार/एसडीएम कार्यालय में।",
      fee: "निःशुल्क से ₹30",
      processingTime: "15 से 30 दिन",
      requiredProofDocs: ["पंचायत/पटवारी रिपोर्ट, पिता का जाति प्रमाण पत्र, वंश वृक्ष और आधार कार्ड।"],
      commonRejections: ["पिता या परिवार के किसी रक्त संबंधी का पुराना जाति रिकॉर्ड न उपलब्ध होना।"],
      proTip: "यदि पिता का प्रमाणपत्र नही है, तो तीन रक्त संबंधियों के शपथ पत्र और दादा परदादा की जमीन की जमाबंदी दिखाएं जिसपर सामाजिक वर्ग दर्ज हो।"
    },
    "Ration Card": {
      name: "राशन कार्ड (खाद्य सुरक्षा पत्र)",
      purpose: "अति रियायती दरों पर राशन अनाज प्राप्त करने का अधिकार पत्र और परिवार के सदस्यों का सर्वमान्य पहचान प्रमाण।",
      whereToApply: "खाद्य एवं नागरिक आपूर्ति विभाग के स्थानीय ब्लॉक कार्यालय में अथवा राज्य राशन पोर्टल पर।",
      fee: "₹10 से ₹50",
      processingTime: "30 दिन तक",
      requiredProofDocs: ["परिवार की महिला मुखिया की फोटो, पूरे परिवार का आधार कार्ड, आय प्रमाणपत्र, बिजली बिल की रसीद।"],
      commonRejections: ["नाम पहले से किसी अन्य राशन कार्ड में जुड़े होने से 'डबल एंट्री' त्रुटि आना।"],
      proTip: "संयुक्त परिवार से अलग होने पर ब्लॉक आपूर्ति अधिकारी से आधिकारिक समर्पण प्रमाणपत्र (Surrender Certificate) अवश्य लें।"
    }
  };

  const override = overrides[doc.name];
  if (override) {
    return { ...doc, ...override };
  }
  return doc;
};
