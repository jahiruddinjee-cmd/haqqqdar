import React, { useState, useMemo } from "react";
import { 
  Compass, Calculator, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, 
  Coins, Landmark, FileText, ClipboardList, Info, GraduationCap, 
  HelpCircle, Sparkles, RefreshCw, Award, PlusCircle, CheckCircle, 
  ExternalLink, ChevronRight, HelpCircle as HelpIcon, Play, Save
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DocumentItem {
  id: string;
  name_en: string;
  name_hi: string;
  purpose_en: string;
  purpose_hi: string;
  critical: boolean;
}

interface ScholarshipItem {
  name_en: string;
  name_hi: string;
  amount: string;
  eligibility_en: string;
  eligibility_hi: string;
  documents_en: string;
  documents_hi: string;
  applyLink: string;
}

interface LoanItem {
  name_en: string;
  name_hi: string;
  maxAmount_en: string;
  maxAmount_hi: string;
  interest: string;
  eligibility_en: string;
  eligibility_hi: string;
  applyLink: string;
}

interface CareerGoalTemplate {
  goalId: string;
  title_en: string;
  title_hi: string;
  overview_en: string;
  overview_hi: string;
  successRate: string;
  ageLimit: string;
  conductedBy: string;
  nextExam: string;
  nextExam_hi: string;
  eligibilityDetail_en: string;
  eligibilityDetail_hi: string;
  timeline_en: string[];
  timeline_hi: string[];
  subjects_en: { subject: string; weight: string }[];
  subjects_hi: { subject: string; weight: string }[];
  backupPaths_en: string[];
  backupPaths_hi: string[];
  recommendedBooks_en: string[];
  recommendedBooks_hi: string[];
}

// ---------------- DATABASE DEFINITIONS ----------------

const CAREER_GOALS_DB: Record<string, CareerGoalTemplate> = {
  nda: {
    goalId: "nda",
    title_en: "NDA Commissioned Officer",
    title_hi: "एनडीए कमीशंड अधिकारी",
    overview_en: "Serve as a Lieutenant/Sub-Lieutenant/Flying Officer in the Indian Army, Navy, or Air Force via the prestigious National Defence Academy.",
    overview_hi: "राष्ट्रीय रक्षा अकादमी के माध्यम से थल सेना, नौसेना या वायु सेना में लेफ्टिनेंट/फ्लाइंग ऑफिसर के रूप में गौरवशाली सेवा।",
    successRate: "0.3%",
    ageLimit: "16.5 - 19.5 Years",
    conductedBy: "Union Public Service Commission (UPSC)",
    nextExam: "April / September 2026",
    nextExam_hi: "अप्रैल / सितंबर २०२६",
    eligibilityDetail_en: "Passed/appearing 12th with Physics & Math (for Navy/Air Force). Strict physical criteria (157 cm height chest expansion, perfect vision). Single citizens only.",
    eligibilityDetail_hi: "भौतिकी और गणित के साथ १२वीं उत्तीर्ण/अध्ययनरत। कठोर शारीरिक मानदंड (१५७ सेमी न्यूनतम ऊंचाई, उत्कृष्ट दृष्टि)। केवल अविवाहित नागरिक पात्र।",
    timeline_en: [
      "Class 11: Build robust foundations in Mathematics (Algebra, Trigonometry) and General Science.",
      "Class 12: Rigorous practice of Previous Year Papers & General Ability Tests.",
      "Written Exam: Two papers (Mathematics 300 marks + General Ability 600 marks).",
      "Services Selection Board (SSB): 5-day psychological, aptitude, and intelligence checks.",
      "Medical Evaluation: Strict screening for organ health, posture, and fitness coordinates.",
      "Final Merit List & Cadet training: 3-year intense academic and physical drill at Khadakwasla.",
      "Commissioning: Appointed as a Class-A Gazetted Officer in the Armed Forces."
    ],
    timeline_hi: [
      "कक्षा ११: गणित (बीजगणित, त्रिकोणमिति) और सामान्य विज्ञान का सुदृढ़ आधार बनाएं।",
      "कक्षा १२: पिछले वर्षों के प्रश्नपत्रों और सामान्य योग्यता परीक्षण का लगातार अभ्यास।",
      "लिखित परीक्षा: दो मुख्य प्रश्नपत्र (गणित ३०० अंक + सामान्य योग्यता टेस्ट ६०० अंक)।",
      "सेवा चयन बोर्ड (SSB): ५ दिवसीय मनोवैज्ञानिक, दृष्टिकोण और व्यक्तित्व परीक्षण परीक्षा।",
      "चिकित्सा मूल्यांकन: कड़े अंगों के स्वास्थ्य, शारीरिक ढांचा और दृष्टि मानकों की जांच।",
      "अंतिम मेरिट सूची और सीडीसी प्रशिक्षण: खड़कवासला में ३ वर्षीय गहन शैक्षणिक एवं सैन्य प्रशिक्षण।",
      "कमीशनिंग: भारतीय सशस्त्र बलों में एक राजपत्रित अधिकारी (लेफ्टिनेंट) के रूप में नियुक्ति।"
    ],
    subjects_en: [
      { subject: "Mathematics (Algebra, Trig, Calculus)", weight: "33% (300 Marks)" },
      { subject: "English Language & Grammatical Ability", weight: "22% (200 Marks)" },
      { subject: "General Science & Physics", weight: "20% (180 Marks)" },
      { subject: "History, Freedom Movement & Geography", weight: "15% (140 Marks)" },
      { subject: "Current Affairs & Strategic Defense Affairs", weight: "10% (80 Marks)" }
    ],
    subjects_hi: [
      { subject: "गणित (बीजगणित, त्रिकोणमिति, कलन)", weight: "३३% (३०० अंक)" },
      { subject: "अंग्रेजी भाषा और व्याकरणिक योग्यता", weight: "२२% (२०० अंक)" },
      { subject: "सामान्य विज्ञान और भौतिकी", weight: "२०% (१८० अंक)" },
      { subject: "इतिहास, राष्ट्रीय आंदोलन और भूगोल", weight: "१५% (१४० अंक)" },
      { subject: "सामयिक विषय और सामरिक रक्षा मामले", weight: "१०% (८० अंक)" }
    ],
    backupPaths_en: [
      "Path A → Technical Entry Scheme (TES 10+2 Direct SSB)",
      "Path B → Navy B.Tech Cadet Scheme (Direct SSB on JEE score)",
      "Path C → Graduation in Science followed by AFCAT / CDS Entry",
      "Path D → State Police Sub-Inspector / Agniveer Recruitment"
    ],
    backupPaths_hi: [
      "पथ क → तकनीकी प्रवेश योजना (TES 10+2 डायरेक्ट SSB)",
      "पथ ख → नौसेना बी.टेक कैडेट योजना (JEE स्कोर पर डायरेक्ट SSB)",
      "पथ ग → विज्ञान में स्नातक के उपरांत AFCAT / CDS अधिकारी प्रवेश",
      "पथ घ → राज्य पुलिस सब-इंस्पेक्टरेट / अग्निवीर सैन्य भर्ती"
    ],
    recommendedBooks_en: [
      "Pathfinder for NDA/NA by Arihant Publications",
      "Mathematics for NDA/NA (Volume 1 & 2) by R S Aggarwal",
      "Wren & Martin English Grammar and Composition",
      "Manorama Yearbook (for Current Affairs & GK)"
    ],
    recommendedBooks_hi: [
      "अरिहंत पब्लिकेशन्स द्वारा एनडीए/एनए पाथफाइंडर",
      "आर एस अग्रवाल द्वारा गणित एनडीए/एनए खंड १ और २",
      "रेन एंड मार्टिन इंग्लिश ग्रामर एंड कंपोज़ीशन",
      "मनोरमा ईयरबुक (करंट अफेयर्स हेतु)"
    ]
  },
  jee: {
    goalId: "jee",
    title_en: "IIT Software / Core Engineer",
    title_hi: "आईआईटी सॉफ्टवेयर / कोर इंजीनियर",
    overview_en: "Acquire admission into premier Indian Institutes of Technology (IITs) or NITs, forging careers in Computer Science, Aerospace, or Artificial Intelligence.",
    overview_hi: "भारतीय प्रौद्योगिकी संस्थान (IIT) या एनआईटी में प्रवेश पाकर कंप्यूटर साइंस, डेटा साइंस या कोर इंजीनियरिंग में अपनी विशेषज्ञता और करियर स्थापित करना।",
    successRate: "0.8%",
    ageLimit: "No limit (Within 2 consecutive years of Class 12)",
    conductedBy: "National Testing Agency (NTA) & IIT JAB",
    nextExam: "Session 1: Jan 2026 / Session 2: April 2026",
    nextExam_hi: "प्रथम सत्र: जनवरी २०२६ / द्वितीय सत्र: अप्रैल २०२६",
    eligibilityDetail_en: "Must qualify Class 12 with aggregate 75% marks (65% for SC/ST) in Physics, Chemistry, and Mathematics.",
    eligibilityDetail_hi: "भौतिकी, रसायन विज्ञान और गणित में कक्षा १२वीं न्यूनतम ७५% सामान्य वर्ग (SC/ST हेतु ६५%) अंकों के साथ उत्तीर्ण होना आवश्यक।",
    timeline_en: [
      "Grade 11: Deep dive in Mechanics, Organic Chemistry, and coordinate algebraic formulas.",
      "Grade 12: Advanced topics like Calculus, electrodynamics, and mock papers.",
      "JEE Main Exam: National computer-based test over Physics, Chemistry, Math to qualify for Advanced.",
      "JEE Advanced Exam: Ultra-hard application-based paper for top 2.5 Lakh rank holders.",
      "JoSAA Counselling: Nationwide seat allocation based on All India Rank and choices.",
      "B.Tech Program & Internships: 4-year intense professional engineering curriculum.",
      "Industry Placement: Recruited as a technology consultant, software engineer, or entrepreneur."
    ],
    timeline_hi: [
      "कक्षा ११: यांत्रिकी (Mechanics), कार्बनिक रसायन विज्ञान और निर्देशांक ज्यामिति सूत्रों का गहन अध्ययन।",
      "कक्षा १२: कलन (Calculus), विद्युत गतिशीलता, और राष्ट्रीय स्तर के मॉक प्रश्नपत्र हल करना।",
      "जेईई मेन परीक्षा: जेईई एडवांस्ड परीक्षा हेतु अर्हता प्राप्त करने के लिए राष्ट्रीय ऑनलाइन टेस्ट।",
      "जेईई एडवांस्ड परीक्षा: शीर्ष २.५ लाख आवेदकों हेतु अत्यंत कठिन विश्लेषणात्मक प्रश्नपत्र।",
      "जोसा (JoSAA) काउंसलिंग: ऑल इंडिया रैंक तथा प्राथमिकताओं के अनुसार पसंदीदा संस्थान अलॉटमेंट।",
      "बी.टेक कार्यक्रम: ४-वर्षीय गहन और व्यावहारिक वैश्विक स्तर का इंजीनियरिंग पाठ्यक्रम।",
      "उद्योग प्लेसमेंट: वैश्विक टेक कंपनियों में सॉफ्टवेयर आर्किटेक्ट या अनुसंधान विकास केंद्र में प्रवेश।"
    ],
    subjects_en: [
      { subject: "Mathematics (Calculus, Algebra, Vectors)", weight: "33% (120 Marks)" },
      { subject: "Physics (Mechanics, Thermo, Electromagnetism)", weight: "33% (120 Marks)" },
      { subject: "Chemistry (Physical, Organic & Inorganic)", weight: "33% (120 Marks)" }
    ],
    subjects_hi: [
      { subject: "गणित (कलन, बीजगणित, सदिश बीजगणित)", weight: "३३% (१२० अंक)" },
      { subject: "भौतिकी (यांत्रिकी, ऊष्मागतिकी, विद्युतचुंबकत्व)", weight: "३३% (१२० अंक)" },
      { subject: "रसायन विज्ञान (भौतिक, कार्बनिक और अकार्बनिक)", weight: "३३% (१२० अंक)" }
    ],
    backupPaths_en: [
      "Path A → National Institutes of Technology (NIT via JEE Main merit)",
      "Path B → State Engineering Entrance Exams (MHT-CET, WBJEE, COMEDK)",
      "Path C → Top Private University Tracks (BITSAT, VITEEE, Amrita)",
      "Path D → Career specialization in BCA / BSc Data Science & Cloud Computing"
    ],
    backupPaths_hi: [
      "पथ क → राष्ट्रीय प्रौद्योगिकी संस्थान (NIT - जेईई मेन मेरिट के आधार पर)",
      "पथ ख → राज्य इंजीनियरिंग प्रवेश परीक्षा (WBJEE, MHT-CET, COMEDK)",
      "पथ ग → शीर्ष निजी विश्वविद्यालय स्कॉलरशिप मार्ग (BITSAT, VITEEE)",
      "पथ घ → BCA या बीएससी डेटा साइंस / क्लाउड कंप्यूटिंग के विशेष कौशल कार्यक्रम"
    ],
    recommendedBooks_en: [
      "HC Verma Concepts of Physics (Part 1 & 2)",
      "IIT Mathematics by RD Sharma / Cengage Series",
      "Organic Chemistry by Morrison & Boyd",
      "JEE Main & Advanced Previous Years Chapterwise Solved Papers"
    ],
    recommendedBooks_hi: [
      "एच सी वर्मा द्वारा भौतिकी की अवधारणाएं (भाग १ और २)",
      "सी एंगेज सीरीज / आर डी शर्मा द्वारा गणित",
      "मौरिसन और बॉयड द्वारा कार्बनिक रसायन विज्ञान",
      "जेईई मेन व एडवांस्ड पिछले वर्षों के अध्याय-वार हल किए प्रश्नपत्र"
    ]
  },
  upsc: {
    goalId: "upsc",
    title_en: "Civil Servant (IAS / IPS / IFS)",
    title_hi: "लोक सेवक (आईएएस / आईपीएस / आईएफएस)",
    overview_en: "Secure administrative power to drive civic policy and leadership across Indian districts as an IAS, IPS or IFS officer.",
    overview_hi: "आईएएस, आईपीएस या आईएफएस अधिकारी के रूप में भारतीय जिलों में नीति-निर्माण और शासकीय नेतृत्व का प्रभार संभालना।",
    successRate: "0.1%",
    ageLimit: "21 - 32 Years (Relaxed for OBC/SC/ST)",
    conductedBy: "Union Public Service Commission (UPSC)",
    nextExam: "Prelims: May 2026 / Mains: October 2026",
    nextExam_hi: "प्रारंभिक परीक्षा: मई २०२६ / मुख्य परीक्षा: अक्टूबर २०२६",
    eligibilityDetail_en: "Candidate must possess an undergraduate degree in any discipline from a recognized University.",
    eligibilityDetail_hi: "उम्मीदवार के पास किसी भी मान्यता प्राप्त विश्वविद्यालय से स्नातक (Undergraduate) की डिग्री होना अनिवार्य है।",
    timeline_en: [
      "Phase 1 Foundation: Consistently study NCERTs (Class 6-12) covering Indian polity, history & economics.",
      "Current Affairs Sync: Daily reading of leading national newspapers and policy briefs.",
      "UPSC Prelims: Screening phase consisting of General Studies-I and qualifying GS-II (CSAT).",
      "UPSC Mains: Extremely rigorous descriptive phase with 9 subjective written papers.",
      "Optional Subject selection: Deep academic specialization in one elective subject (500 marks).",
      "Personality Test: Final interview before the UPSC board evaluating integrity and leadership.",
      "LBSNAA Training: Comprehensive administrative and elite leadership training in Mussoorie."
    ],
    timeline_hi: [
      "चरण १ आधार: भारतीय राजव्यवस्था, इतिहास और अर्थशास्त्र के लिए नियमित एनसीईआरटी पुस्तकें पढ़ना।",
      "करंट अफेयर्स: राष्ट्रीय समाचार पत्रों (द हिंदू/दैनिक जागरण) और सरकारी नीतियों का दैनिक अध्ययन।",
      "यूपीएससी प्रारंभिक परीक्षा: सामान्य अध्ययन-१ और क्वालीफाइंग सामान्य अध्ययन-२ (CSAT) एमसीक्यू पेपर।",
      "यूपीएससी मुख्य परीक्षा: लिखित वर्णात्मक परीक्षा जिसमें ९ विस्तृत विषय-आधारित प्रश्नपत्र होते हैं।",
      "वैकल्पिक विषय चयन: ५०० अंकों के लिए किसी एक पसंदीदा विषय में स्नातक स्तर की अकादमिक तैयारी।",
      "व्यक्तित्व परीक्षण: सत्यनिष्ठा, निर्णय लेने की क्षमता और नेतृत्व का परीक्षण करने वाला साक्षात्कार।",
      "लबासना (LBSNAA) प्रशिक्षण: मसूरी में लोक प्रशासन, आपदा प्रबंधन एवं नीति कार्यान्वयन का व्यावहारिक प्रशिक्षण।"
    ],
    subjects_en: [
      { subject: "General Studies (Polity, History, Economy, Geo)", weight: "55% (Prelims + Main GS)" },
      { subject: "Selected Optional Subject Papers", weight: "25% (500 Marks)" },
      { subject: "Essay Writing & Analytical Composition", weight: "12% (250 Marks)" },
      { subject: "Personality Interview Evaluation", weight: "8% (275 Marks)" }
    ],
    subjects_hi: [
      { subject: "सामान्य अध्ययन (राजव्यवस्था, इतिहास, अर्थव्यवस्था)", weight: "५५% (प्रारंभिक + मुख्य जीएस)" },
      { subject: "चयनित वैकल्पिक विषय प्रश्नपत्र", weight: "२५% (५०० अंक)" },
      { subject: "निबंध लेखन और विश्लेषणात्मक गद्य रचना", weight: "१२% (२५० अंक)" },
      { subject: "व्यक्तित्व साक्षात्कार मूल्यांकन", weight: "८% (२७५ अंक)" }
    ],
    backupPaths_en: [
      "Path A → State Civil Services (State-specific PSC e.g., MPSC, APSC, UPPSC, BPSC)",
      "Path B → Staff Selection Commission (SSC CGL - Grade B Gazetted Executive posts)",
      "Path C → Assistant Commandant in CAPF / Deputy SP in Paramilitary",
      "Path D → Master's Degree & Academic Tenure (UGC NET / Corporate Public Policy roles)"
    ],
    backupPaths_hi: [
      "पथ क → राज्य सिविल सेवा (राज्य विशिष्ट लोक सेवा आयोग जैसे MPSC, APSC, UPPSC, BPSC)",
      "पथ ख → कर्मचारी चयन आयोग (SSC CGL - ग्रेड बी राजपत्रित / कार्यकारी अधिकारी पद)",
      "पथ ग → सहायक कमांडेंट CAPF / केंद्रीय सशस्त्र बलों में पुलिस उपाधीक्षक",
      "पथ घ → स्नातकोत्तर डिग्री (UGC NET के माध्यम से अकादमिक प्रोफेसर या कॉर्पोरेट नीति विश्लेषक)"
    ],
    recommendedBooks_en: [
      "Indian Polity by M. Laxmikanth",
      "A Brief History of Modern India by Rajiv Ahir (Spectrum)",
      "Indian Economy by Ramesh Singh or Nitin Singhania",
      "Certificate Physical and Human Geography by G.C. Leong"
    ],
    recommendedBooks_hi: [
      "एम. लक्ष्मीकांत द्वारा भारतीय राजव्यवस्था",
      "राजीव अहीर द्वारा आधुनिक भारत का संक्षिप्त इतिहास (स्पेक्ट्रम)",
      "नितिन सिंघानिया या रमेश सिंह द्वारा भारतीय अर्थव्यवस्था",
      "जी सी लियोंग द्वारा सर्टिफिकेट फिजिकल एंड ह्यूमन ज्योग्राफी"
    ]
  },
  neet: {
    goalId: "neet",
    title_en: "Medical Doctor (MBBS / AIIMS Path)",
    title_hi: "चिकित्सा डॉक्टर (एमबीबीएस / एम्स मार्ग)",
    overview_en: "Dedicate your life to healthcare excellence, gaining seats in top government medical colleges and AIIMS via NEET-UG.",
    overview_hi: "नीट-यूजी राष्ट्रीय परीक्षा उत्तीर्ण कर शीर्ष सरकारी मेडिकल कॉलेजों और एम्स में प्रवेश पाकर चिकित्सा सेवा में शामिल होना।",
    successRate: "0.5%",
    ageLimit: "17+ Years (No upper limit as per recent supreme directives)",
    conductedBy: "National Testing Agency (NTA)",
    nextExam: "May 2026",
    nextExam_hi: "मई २०२६",
    eligibilityDetail_en: "Passed/appearing Class 12 with Physics, Chemistry, Biology/Biotechnology and English with aggregate 50% (40% for SC/ST/OBC).",
    eligibilityDetail_hi: "भौतिकी, रसायन विज्ञान, जीव विज्ञान/बायोटेक्नोलॉजी और अंग्रेजी के साथ १२वीं उत्तीर्ण/अध्ययनरत, सामान्य वर्ग हेतु कुल ५०% (SC/ST/OBC हेतु ४०%) अंक अनिवार्य।",
    timeline_en: [
      "Class 11 Biology: Intense study of Human Physiology, Plant Anatomy, and cell divisions.",
      "Class 12 Prep: Mastery over Genetics, Ecology, and organic functional compounds.",
      "NEET Exam Day: 3-hour 20-minute pen-paper exam consisting of 200 MCQ questions.",
      "MCC Counselling: Dynamic online seat distribution based on National NEET ranks (AIQ + State Quotas).",
      "MBBS Journey: 4.5 years of exhaustive preclinical, paraclinical, and clinical academics.",
      "Rotatory Internship: 1 year compulsory physical rotary service in attached government hospitals.",
      "Licensure & PG: Cleared NEXT exam for national registration and pursuing MD/MS super-specialization."
    ],
    timeline_hi: [
      "कक्षा ११ जीव विज्ञान: मानव शरीर रचना विज्ञान, पादप शरीर क्रिया विज्ञान और कोशिका विभाजन का विस्तृत अध्ययन।",
      "कक्षा १२ जीव विज्ञान: आनुवंशिकी, जैव प्रौद्योगिकी, पारिस्थितिकी चक्रों और रासायनिक समीकरणों का पूर्ण अभ्यास।",
      "नीट परीक्षा दिवस: ३ घंटे २० मिनट की लिखित परीक्षा जिसमें २०० वस्तुनिष्ठ प्रश्न होते हैं (जीव विज्ञान १०% भारी)।",
      "एमसीसी काउंसलिंग: अखिल भारतीय कोटा (AIQ) और राज्य कोटे के अंतर्गत कॉलेजों का काउंसलिंग आवंटन।",
      "एमबीबीएस यात्रा: साढे चार वर्षों का गहन शैक्षणिक पाठ्यक्रम जिसमें शरीर रचना, विकृति और औषध विज्ञान शामिल है।",
      "अस्पताल इंटर्नशिप: संबद्ध सरकारी अस्पतालों में एक वर्ष की अनिवार्य व्यावहारिक चिकित्सक इंटर्नशिप सेवा।",
      "लाइसेंस और पीजी: राष्ट्रीय पंजीकरण हेतु 'नेक्स्ट' परीक्षा पास करना और विशेषज्ञता उच्च शिक्षा (MD/MS) हेतु आगे बढ़ना।"
    ],
    subjects_en: [
      { subject: "Biology (Botany + Zoology)", weight: "50% (360 Marks)" },
      { subject: "Chemistry (Organic, Physical & Inorganic)", weight: "25% (180 Marks)" },
      { subject: "Physics (Modern Physics, Mechanics, Optics)", weight: "25% (180 Marks)" }
    ],
    subjects_hi: [
      { subject: "जीव विज्ञान (वनस्पति विज्ञान + प्राणी विज्ञान)", weight: "५०% (३६० अंक)" },
      { subject: "रसायन विज्ञान (कार्बनिक, भौतिक और अकार्बनिक)", weight: "२५% (१८० अंक)" },
      { subject: "भौतिकी (आधुनिक भौतिकी, यांत्रिकी, प्रकाशिकी)", weight: "२५% (१८० अंक)" }
    ],
    backupPaths_en: [
      "Path A → Bachelor of Dental Surgery (BDS) / Veterinary Sciences (BVSc)",
      "Path B → Ayurveda, Yoga, Unani, Siddha, Homeopathy (AYUSH - BAMS / BHMS)",
      "Path C → Professional Nursing (B.Sc Nursing) or Allied Health Sciences",
      "Path D → Pharmacy (B.Pharm) / Bio-technology Research Specialist"
    ],
    backupPaths_hi: [
      "पथ क → बैचलर ऑफ डेंटल सर्जरी (BDS) / पशु चिकित्सा विज्ञान (BVSc)",
      "पथ ख → आयुष चिकित्सा पद्धतियां (BAMS / BHMS राजकीय छात्रवृत्तियां उपलब्ध)",
      "पथ ग → प्रोफेशनल नर्सिंग प्रोग्राम (बीएससी नर्सिंग) या संबद्ध स्वास्थ्य तकनीकी विज्ञान",
      "पथ घ → फार्मेसी डिग्री (बी.फार्म) / बायोटेक्नोलॉजी अनुसंधान लैब वैज्ञानिक"
    ],
    recommendedBooks_en: [
      "NCERT Biology Textbook for Class 11 & 12 (Read line-by-line 10 times)",
      "Concepts of Physics by H.C. Verma",
      "Physical Chemistry by O.P. Tandon",
      "MTG NEET Champion Biology with Explanatory solutions"
    ],
    recommendedBooks_hi: [
      "एनसीईआरटी कक्षा ११ और १२ जीव विज्ञान पाठ्यपुस्तक (१० बार पंक्ति-वार गहराई से पढ़ें)",
      "एच सी वर्मा द्वारा भौतिकी की अवधारणाएं",
      "ओ पी टंडन द्वारा भौतिक रसायन",
      "एमटीजी नीट चैंपियन बायोलॉजी विस्तृत हल प्रश्न बैंक"
    ]
  },
  ca: {
    goalId: "ca",
    title_en: "Chartered Accountant (CA)",
    title_hi: "चार्टर्ड अकाउंटेंट (सीए)",
    overview_en: "Secure status as a financial expert, handling audits, national taxation registries, and financial advice of premier corporates.",
    overview_hi: "प्रमुख कॉर्पोरेट्स और नागरिकों के कर मामलों, वैधानिक ऑडिट, और वित्तीय सलाह के शासकीय विशेषज्ञ विशेषज्ञ के रूप में करियर बनाना।",
    successRate: "5-10% (Final level)",
    ageLimit: "No upper age limit",
    conductedBy: "The Institute of Chartered Accountants of India (ICAI)",
    nextExam: "Foundation: June / December 2026",
    nextExam_hi: "फाउंडेशन परीक्षा: जून / दिसंबर २०२६",
    eligibilityDetail_en: "Register after Class 10; eligible to sit for Foundation after passing Class 12 exams. No minimum percentage bar.",
    eligibilityDetail_hi: "कक्षा १०वीं के बाद पंजीकरण की अनुमति; कक्षा १२वीं की परीक्षा उत्तीर्ण करने के बाद परीक्षा देने के पात्र। कोई न्यूनतम अंकों की सीमा नहीं।",
    timeline_en: [
      "CA Foundation: Pass 4 descriptive & objective papers covering Accounting, Law, Economics.",
      "CA Intermediate: Clean 8 highly complex accounting papers split into 2 groups.",
      "Practical Articleship: Perform 2 years of mandatory, exhaustive physical audit training under a practicing CA.",
      "Advanced ICITSS: Comprehensive computer training on advanced financial software and databases.",
      "CA Final Exam: Overcome 8 papers on advanced auditing, direct tax laws, and financial reporting.",
      "ICAI Enrollment: Admitted as an Associate Member of the ICAI (ACA), authorized to audit."
    ],
    timeline_hi: [
      "सीए फाउंडेशन: अकाउंटिंग, बिजनेस लॉ और इकोनॉमिक्स से जुड़े ४ वस्तुनिष्ठ और वर्णनात्मक प्रश्नपत्र उत्तीर्ण करें।",
      "सीए इंटरमीडिएट: २ समूहों में विभाजित ८ अत्यधिक जटिल एडवांस ऑडिटिंग और अकाउंटिंग पेपर पास करें।",
      "प्रैक्टिकल आर्टिकलशिप: किसी अभ्यास करने वाले सीए के तहत २ वर्ष का अनिवार्य मैदानी ऑडिट काम काम सीखें।",
      "एडवांस्ड आईसीआईटीएसएस: उन्नत वित्तीय सॉफ्टवेयर और डेटाबेस का व्यापक कंप्यूटर व्यावहारिक प्रशिक्षण।",
      "सीए फाइनल परीक्षा: उन्नत ऑडिटिंग, प्रत्यक्ष कर कानूनों और रणनीतिक प्रबंधन पर ८ बहु-स्तरीय पेपर पास करें।",
      "आईसीएआई नामांकन: आईसीएआई के सहयोगी सदस्य (ACA) के रूप में प्रवेश, कंपनियों के ऑडिट हेतु अधिकृत।"
    ],
    subjects_en: [
      { subject: "Advanced Accounting & Financial Management", weight: "30%" },
      { subject: "Corporate Taxation Laws & Auditing", weight: "30%" },
      { subject: "Business & Economic Laws", weight: "20%" },
      { subject: "Costing & Strategic Performance Evaluation", weight: "20%" }
    ],
    subjects_hi: [
      { subject: "उन्नत लेखांकन और वित्तीय प्रबंधन", weight: "३०%" },
      { subject: "कॉर्पोरेट कराधान कानून और ऑडिटिंग", weight: "३०%" },
      { subject: "बिजनेस और आर्थिक कानून", weight: "२०%" },
      { subject: "लागत (Costing) और रणनीतिक प्रदर्शन मूल्यांकन", weight: "२०%" }
    ],
    backupPaths_en: [
      "Path A → Certified Management Accountant (CMA) / BBA Finance",
      "Path B → Company Secretary (CS - expert in Corporate Governance)",
      "Path C → MBA in Investment Banking or Corporate Finance with high-tier placement",
      "Path D → Bank Probationary Officer (PO) / Tax Auditor in CAG office"
    ],
    backupPaths_hi: [
      "पथ क → प्रमाणित प्रबंधन लेखाकार (CMA) / बीबीए फाइनेंस",
      "पथ ख → कंपनी सेक्रेटरी (CS - कॉर्पोरेट कानूनों के वैधानिक विशेषज्ञ)",
      "पथ ग → प्रमुख बिजनेस स्कूलों से इन्वेस्टमेंट बैंकिंग या कॉर्पोरेट वित्त में एमबीए",
      "पथ घ → बैंक प्रोबेशनरी ऑफिसर (PO) / नियंत्रक महालेखा परीक्षक (CAG) में टैक्स सॉलिसिटर"
    ],
    recommendedBooks_en: [
      "ICAI Study Material (The holy grail, highly precise and sufficient)",
      "Taxmann Direct & Indirect Taxes",
      "Padhuka's Student Handbook on Advanced Accounting"
    ],
    recommendedBooks_hi: [
      "आईसीएआई (ICAI) स्वयं की अध्ययन सामग्री (सर्वश्रेष्ठ एवं पूर्णतः सटीक)",
      "टैक्समैन द्वारा प्रत्यक्ष और अप्रत्यक्ष कर मैन्युअल",
      "पदुका स्टूडेंट्स गाइड टू एडवांस्ड अकाउंटिंग"
    ]
  }
};

// ---------------- STATE-SPECIFIC DATA ----------------

const STATE_SCHEMES_DB: Record<string, ScholarshipItem[]> = {
  Assam: [
    {
      name_en: "Ishan Uday Special Scholarship for NER",
      name_hi: "उत्तर-पूर्वी क्षेत्र के लिए ईशान उदय विशेष छात्रवृत्ति",
      amount: "₹5,400 to ₹7,800 monthly (Up to ₹93,600 recurring yearly support)",
      eligibility_en: "Domicile of Northeast states, attending General/Technical degree. Household income strictly under ₹4.5 Lakhs per year.",
      eligibility_hi: "उत्तर-पूर्वी राज्यों का मूल निवासी, सामान्य/तकनीकी डिग्री कॉलेज में अध्ययनरत। वार्षिक पारिवारिक आय ₹४.५ लाख से कम होनी चाहिए।",
      documents_en: "Aadhaar, Assam Domicile certificate, Income affidavit endorsed by Revenue Circle Officer, Admission fee slip.",
      documents_hi: "आधार कार्ड, असम मूल निवास प्रमाण पत्र, राजस्व सर्किल अधिकारी द्वारा हस्ताक्षरित आय हलफनामा, कॉलेज फीस रसीद।",
      applyLink: "https://scholarships.gov.in"
    },
    {
      name_en: "Assam State Merit Scholarship Scheme",
      name_hi: "असम राज्य मेरिट छात्रवृत्ति योजना",
      amount: "₹12,000 to ₹25,000 annually",
      eligibility_en: "Endorsed Assam resident with 60% standard marks in Class 10/12 exams, attending state public colleges.",
      eligibility_hi: "असम के सत्यापित निवासी, जिन्होंने १०वीं/१२वीं में ६०% अधिक अंक प्राप्त किए हैं और राज्यीय सार्वजनिक कॉलेज के छात्र हैं।",
      documents_en: "Previous marksheet transcript, Assam Bank Passbook, Active Domicile confirmation letter.",
      documents_hi: "पिछली परीक्षा की अंकतालिका, असम राज्य बैंक पासबुक, मूल निवास प्रमाण पत्र प्रति।",
      applyLink: "https://directorateofhighereducation.assam.gov.in"
    }
  ],
  Maharashtra: [
    {
      name_en: "Rajarshi Chhatrapati Shahu Maharaj Fee Reimbursement",
      name_hi: "राजर्षि छत्रपति शाहू महाराज शुल्क प्रतिपूर्ति योजना",
      amount: "50% to 100% of Tuition fees waiver directly mapped into accounts",
      eligibility_en: "Domicile of Maharashtra, admitted under CAP round inside Professional Degree (JEE/CET). Family income under ₹8 Lakhs.",
      eligibility_hi: "महाराष्ट्र का मूल निवासी, सीईटी/जेईई काउंसलिंग के तहत व्यावसायिक डिग्री का छात्र। पारिवारिक वार्षिक आय ₹८ लाख से कम होनी चाहिए।",
      documents_en: "CAP Admission slip, Maharashtra Domicile papers, Caste verification transcript (if applicable), Income tax returns.",
      documents_hi: "काउंसलिंग अलॉटमेंट पत्र, महाराष्ट्र मूल निवास प्रमाण पत्र, जाति प्रमाण पत्र और जाति सत्यापन पत्र, आय प्रमाण पत्र।",
      applyLink: "https://mahadbt.maharashtra.gov.in"
    },
    {
      name_en: "Dr. Punjabrao Deshmukh Hostel Maintenance Allowance",
      name_hi: "डॉ. पंजाबराव देशमुख छात्रावास निर्वाह भत्ता योजना",
      amount: "Up to ₹30,000 yearly directly for hostel lodging fees support",
      eligibility_en: "Registered student in professional courses, ward of registered smallholder farmers as per land Khatauni.",
      eligibility_hi: "व्यावसायिक पाठ्यक्रमों के पंजीकृत छात्र, जो महाराष्ट्र के पंजीकृत लघु एवं सीमांत किसानों के पुत्र/पुत्री हैं।",
      documents_en: "Land records mutation (7/12 Abstract), Registered Rent agreement / Hostel allocation voucher, Income Slip.",
      documents_hi: "कृषि भूमि रिकॉर्ड (७/१२ उतारा), पंजीकृत छात्रावास प्रमाणपत्र या किराया अनुबंध पत्र, आय प्रमाण पत्र।",
      applyLink: "https://mahadbt.maharashtra.gov.in"
    }
  ],
  "Uttar Pradesh": [
    {
      name_en: "UP Post Matric Scholarship Scheme",
      name_hi: "उत्तर प्रदेश पोस्ट मैट्रिक स्कॉलरशिप योजना",
      amount: "Complete academic fees reimbursement + monthly stipend of ₹1,200",
      eligibility_en: "Domicile of UP, enrolled in Class 11, 12, Degree, Master, PhD. Annual family income under ₹2.5 Lakhs (SC/ST) or ₹2 Lakhs (Gen/OBC).",
      eligibility_hi: "यूपी का मूल निवासी, ११वीं, १२वीं, डिग्री, परास्नातक या पीएचडी का छात्र। पारिवारिक वार्षिक आय SC/ST हेतु ₹२.५ लाख, अन्य हेतु ₹२ लाख की सीमा में।",
      documents_en: "UP Income Certificate verified online, Caste certificate, High school marksheet, Bank account with Aadhaar seed active.",
      documents_hi: "यूपी तहसील द्वारा जारी सत्यापित आय प्रमाण पत्र, जाति प्रमाण पत्र, १०वीं की अंकतालिका, आधार से जुड़ा बैंक खाता।",
      applyLink: "https://scholarship.up.gov.in"
    }
  ],
  Bihar: [
    {
      name_en: "Bihar Post Matric BC/EBC/SC/ST Merit Scholarship",
      name_hi: "बिहार पोस्ट मैट्रिक पिछड़ा और अनुसूचित जनजाति छात्रवृत्ति",
      amount: "Full non-refundable college fee component waiver",
      eligibility_en: "Domicile of Bihar, attending authorized Board/University with family income under ₹3 Lakhs.",
      eligibility_hi: "बिहार राज्य का मूल निवासी, मान्यता प्राप्त बोर्ड या विश्वविद्यालय में अध्ययनरत, पारिवारिक वार्षिक आय ₹३ लाख से कम।",
      documents_en: "Bonafide student certificate with fee structure, Bihar Residential certificate, Caste certificate, Income slip.",
      documents_hi: "कॉलेज बोनाफाइड प्रमाणपत्र (फीस विवरण के साथ), बिहार स्थायी निवास प्रमाण पत्र, जाति और आय प्रमाण पत्र।",
      applyLink: "https://pmsonline.bih.nic.in"
    }
  ],
  Others: [
    {
      name_en: "National Scholarship Portal Standard Central Sector Support",
      name_hi: "राष्ट्रीय छात्रवृत्ति पोर्टल केंद्रीय क्षेत्र सहायता योजना",
      amount: "₹12,000 to ₹20,000 recurring annually",
      eligibility_en: "Family Income under ₹4.5 Lakhs, Top 80th percentile of successful candidates in respective Class 12 Boards.",
      eligibility_hi: "पारिवारिक आय ₹४.५ लाख से कम, बारहवीं कक्षा की बोर्ड परीक्षा में संबंधित संवर्ग में शीर्ष २०% रैंक धारक छात्र।",
      documents_en: "Class 12 board marksheet, Domicile verification paper, Aadhaar number mapping.",
      documents_hi: "१२वीं बोर्ड परीक्षा की अंकतालिका, मूल निवास प्रमाण पत्र, आधार बायोमेट्रिक प्रमाणीकरण कार्ड।",
      applyLink: "https://scholarships.gov.in"
    },
    {
      name_en: "AICTE Pragati Scholarship for Girl Students",
      name_hi: "एआईसीटीई प्रगति महिला मेधावी स्कॉलरशिप",
      amount: "₹50,000 annually for tuition and educational aids",
      eligibility_en: "Maximum 2 girl children per family, admitted into AICTE technical degree/diploma programs. Income under ₹8 Lakhs.",
      eligibility_hi: "प्रति परिवार अधिकतम २ बालिकाएं, जो एआईसीटीई मान्यता प्राप्त तकनीकी संस्थान या डिप्लोमा में प्रवेशित हैं। आय सीमा ₹८ लाख।",
      documents_en: "AICTE allotment letter, Class 10/12 transcript, Affidavit of single/double girl child status.",
      documents_hi: "प्रवेश आवंटन पत्र, १०वीं/१२वीं बोर्ड अंकतालिका, बालिकाओं के संख्या संबंधों तहसील स्तर का हलफनामा।",
      applyLink: "https://scholarships.gov.in"
    }
  ]
};

const EDUCATION_LOANS: LoanItem[] = [
  {
    name_en: "Vidya Lakshmi Government Interest Subsidy Scheme (CSIS)",
    name_hi: "विद्या लक्ष्मी सरकारी ब्याज सब्सिडी योजना (CSIS)",
    maxAmount_en: "Up to ₹7.5 Lakhs with 100% government guarantee & zero collateral",
    maxAmount_hi: "बिना बंधक (No Collateral) ₹७.५ लाख तक की १००% सरकारी गारंटी ऋण",
    interest: "Base Floating Repo-linked rate (approx 8.5% with full interest subsidy during studies)",
    eligibility_en: "Family income under ₹4.5 Lakhs, admitted to accredited Professional/Technical courses in India. No security required.",
    eligibility_hi: "पारिवारिक आय ₹४.५ लाख से कम, मान्यता प्राप्त तकनीकी महाविद्यालय में प्रवेश सुरक्षित। कोई जमानत या गारंटी की आवश्यकता नहीं।",
    applyLink: "https://www.vidyalakshmi.co.in"
  },
  {
    name_en: "SBI Student Loan Scheme",
    name_hi: "एसबीआई छात्र ऋण योजना",
    maxAmount_en: "Up to ₹20 Lakhs for India, Up to ₹1.5 Crore for international studies",
    maxAmount_hi: "भारत में अध्ययन हेतु ₹२० लाख और विदेश में ₹१.५ करोड़ तक का ऋण",
    interest: "9.55% to 10.5% (0.50% concession for girl students)",
    eligibility_en: "Admitted into a recognized college through entrance exams/merit selection. Co-borrower (parents) is required.",
    eligibility_hi: "प्रवेश परीक्षा या योग्यता चयन परीक्षा के माध्यम से मान्यता प्राप्त संस्थान में प्रवेशित होना अनिवार्य। माता-पिता सह-आवेदक होंगे।",
    applyLink: "https://www.sbi.co.in"
  },
  {
    name_en: "Canara Bank Joint Vidya Tur Loan",
    name_hi: "केनरा बैंक संयुक्त विद्या तुर ऋण योजना",
    maxAmount_en: "Premium technical institutions (IIT/IIM/NIT) have pre-approved limits up to ₹40 Lakhs with no physical security",
    maxAmount_hi: "शीर्ष संस्थानों (IIT/IIM/NIT) हेतु ₹४० लाख तक बिना किसी भौतिक गारंटी के ऋण उपलब्ध",
    interest: "8.6% to 9.25% highly competitive tailored rates",
    eligibility_en: "Confirmed admission in designated list of 150+ premier national institutions.",
    eligibility_hi: "देश के १५० से अधिक शीर्ष संस्थानों (सूचीबद्ध) में नियमित आवंटन प्रवेश पत्र धारक उम्मीदवार।",
    applyLink: "https://canarabank.com"
  }
];

const GENERAL_DOCUMENTS: DocumentItem[] = [
  { id: "aadhaar", name_en: "Aadhaar Card with Mobile Link", name_hi: "आधार कार्ड (मोबाइल सुसज्जित लिंक सहित)", purpose_en: "Biometric and OTP identity verification for all benefits.", purpose_hi: "सभी लाभों की प्राप्ति हेतु बायोमेट्रिक और ओटीपी सत्यापन साधन।", critical: true },
  { id: "domicile", name_en: "State Domicile Certificate", name_hi: "मूल निवास प्रमाण पत्र", purpose_en: "Prerequisite to unlock state-specific quotas & scholarships.", purpose_hi: "राज्य स्तरीय आरक्षण और छात्रवृत्ति को अनलॉक करने की प्राथमिक आवश्यकता।", critical: true },
  { id: "income", name_en: "Income Certificate (Current Fiscal)", name_hi: "सत्यापित आय प्रमाण पत्र", purpose_en: "Required to claim low-interest loans & merit scholarships.", purpose_hi: "कम ब्याज ऋण और आर्थिक छात्रवृत्ति कार्यक्रमों हेतु अनिवार्य।", critical: true },
  { id: "marks10", name_en: "Class 10 Matric Marksheet", name_hi: "१०वीं बोर्ड प्रमाण पत्र (जन्म तिथि हेतु)", purpose_en: "Acts as age proof verification and basic qualification.", purpose_hi: "आयु प्रमाण और प्राथमिक योग्यता सत्यापन के रूप में उपयोगी।", critical: true },
  { id: "marks12", name_en: "Class 12 Intermediate Certificate", name_hi: "१२वीं बोर्ड अंकतालिका और प्रमाणपत्र", purpose_en: "Required for admissions & competitive exam registrations.", purpose_hi: "प्रवेश परीक्षाओं और कॉलेज डिग्री में पंजीकरण हेतु आवश्यक।", critical: true },
  { id: "caste", name_en: "Caste / Category Certificate (If SC/ST/OBC)", name_hi: "सक्षम अधिकारी द्वारा जारी जाति प्रमाण पत्र", purpose_en: "Required for age relaxation & constitutional seat quotas.", purpose_hi: "आयु सीमा में छूट और संवैधानिक आरक्षण सीट कोटे के लाभ हेतु आवश्यक।", critical: false },
  { id: "ews", name_en: "EWS Income & Asset Certificate", name_hi: "ईडब्ल्यूएस (EWS) आर्थिक पिछड़ा वर्ग प्रमाणपत्र", purpose_en: "To secure 10% Reservation in general competitive seats.", purpose_hi: "सामान्य श्रेणी सीटों के तहत १०% आरक्षण लाभ प्राप्त करने हेतु आवश्यक।", critical: false },
  { id: "ncc", name_en: "NCC Certificate (A/B/C) Or Sports Record", name_hi: "एनसीसी प्रमाण पत्र (A/B/C) अथवा राष्ट्रीय खेल रिकॉर्ड", purpose_en: "Secures bonus marks and reservation margins in Defense recruitment.", purpose_hi: "सशस्त्र बल भर्तियों में अतिरिक्त बोनस अंक और शारीरिक परीक्षण में छूट का साधन।", critical: false }
];

export const BharatCareerNavigator: React.FC<{
  language: string;
  triggerFeedback: (msg: string) => void;
}> = ({ language, triggerFeedback }) => {
  const isHindi = language === "Hindi";

  // State Management
  const [activeStep, setActiveStep] = useState<"profile" | "dashboard">("profile");

  // Selection state
  const [profileState, setProfileState] = useState<string>(" महाराष्ट्र (Maharashtra)");
  const [profileClass, setProfileClass] = useState<string>("Class 11-12");
  const [profileStream, setProfileStream] = useState<string>("Science (PCM)");
  const [profileInterest, setProfileInterest] = useState<string>("Defence");
  const [selectedGoalId, setSelectedGoalId] = useState<string>("nda");

  // Document Readiness check states
  const [docReadiness, setDocReadiness] = useState<Record<string, boolean>>({
    aadhaar: true,
    domicile: false,
    income: false,
    marks10: true,
    marks12: false,
    caste: false,
    ews: false,
    ncc: false
  });

  // Finance calculator state
  const [loanPrincipal, setLoanPrincipal] = useState<number>(300000);
  const [loanTenure, setLoanTenure] = useState<number>(5); // years
  const [loanInterest, setLoanInterest] = useState<number>(8.5); // %

  // Analyzer inputs
  const [scoreMock, setScoreMock] = useState<number>(65);
  const [scoreStudyHrs, setScoreStudyHrs] = useState<number>(6);
  const [scoreBoardMarks, setScoreBoardMarks] = useState<number>(80);

  // States list mapper
  const INDIAN_STATES = [
    "Assam", "Maharashtra", "Uttar Pradesh", "Bihar", "Delhi", "Karnataka", "West Bengal", "Rajasthan", "Madhya Pradesh", "Gujarat"
  ];

  // Map user parameters into matching goals
  const dynamicGoalOptions = useMemo(() => {
    // Determine possible goals based on stream & interest
    const goalsList = [];
    if (profileStream === "Science (PCM)" && profileInterest === "Defence") {
      goalsList.push({ id: "nda", label: isHindi ? "एनडीए कमीशंड अधिकारी (NDA Officer)" : "NDA Commissioned Officer" });
    }
    if (profileStream === "Science (PCM)" && profileInterest === "Technology") {
      goalsList.push({ id: "jee", label: isHindi ? "आईआईटी इंजीनियर (IIT / JEE Path)" : "IIT Software / Core Engineer" });
    }
    if (profileStream === "Science (PCB)" && profileInterest === "Medical") {
      goalsList.push({ id: "neet", label: isHindi ? "नीट डॉक्टर (NEET / MBBS Path)" : "Medical Doctor (MBBS / AIIMS Path)" });
    }
    if (profileInterest === "Government Service" || profileInterest === "Law") {
      goalsList.push({ id: "upsc", label: isHindi ? "यूपीएससी सिविल सेवक (IAS / IPS)" : "Civil Servant (IAS / IPS / IFS)" });
    }
    if (profileStream === "Commerce" || profileInterest === "Business") {
      goalsList.push({ id: "ca", label: isHindi ? "चार्टर्ड अकाउंटेंट (CA)" : "Chartered Accountant (CA)" });
    }

    // Default fallbacks so there is never an empty option
    if (goalsList.length === 0) {
      goalsList.push({ id: "nda", label: isHindi ? "एनडीए कमीशंड अधिकारी" : "NDA Commissioned Officer" });
      goalsList.push({ id: "jee", label: isHindi ? "आईआईटी कोर इंजीनियर" : "IIT Software / Core Engineer" });
      goalsList.push({ id: "upsc", label: isHindi ? "यूपीएससी सिविल सेवक (IAS)" : "Civil Servant (IAS / IPS / IFS)" });
      goalsList.push({ id: "neet", label: isHindi ? "चिकित्सा डॉक्टर (MBBS)" : "Medical Doctor (MBBS)" });
      goalsList.push({ id: "ca", label: isHindi ? "चार्टर्ड अकाउंटेंट (CA)" : "Chartered Accountant (CA)" });
    }
    return goalsList;
  }, [profileStream, profileInterest, isHindi]);

  // Handle dynamic auto-selection of goal when options change
  React.useEffect(() => {
    if (dynamicGoalOptions.length > 0) {
      const match = dynamicGoalOptions.find(g => g.id === selectedGoalId);
      if (!match) {
        setSelectedGoalId(dynamicGoalOptions[0].id);
      }
    }
  }, [dynamicGoalOptions, selectedGoalId]);

  // Retrieve current active goal template from database
  const activeGoalData = useMemo(() => {
    return CAREER_GOALS_DB[selectedGoalId] || CAREER_GOALS_DB.nda;
  }, [selectedGoalId]);

  // Compute live readiness score from toggle checks
  const readyDocCount = useMemo(() => {
    return Object.values(docReadiness).filter(Boolean).length;
  }, [docReadiness]);

  // Map state name for scholarship filters
  const stateQueryKey = useMemo(() => {
    const matched = Object.keys(STATE_SCHEMES_DB).find(s => profileState.includes(s));
    return matched || "Others";
  }, [profileState]);

  // Retrieve state scholarships
  const stateScholarships = useMemo(() => {
    return STATE_SCHEMES_DB[stateQueryKey] || STATE_SCHEMES_DB.Others;
  }, [stateQueryKey]);

  // EMI Calculator formula
  const emiCalculation = useMemo(() => {
    const P = loanPrincipal;
    const r = (loanInterest / 12) / 100;
    const n = loanTenure * 12;
    if (r === 0) return { emi: Math.round(P / n), totalInterest: 0, totalPayment: P };
    
    const emiValue = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emiValue * n;
    const totalInterest = totalPayment - P;
    return {
      emi: Math.round(emiValue),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment)
    };
  }, [loanPrincipal, loanTenure, loanInterest]);

  // Estimator / success readiness analyzer algorithm
  const analyzerResult = useMemo(() => {
    let base = 40;
    // add study hours impact
    base += Math.min(scoreStudyHrs * 4, 40);
    // add mock scores impact
    base += Math.min((scoreMock / 100) * 20, 20);
    // board score impact
    if (scoreBoardMarks > 85) base += 10;
    else if (scoreBoardMarks > 70) base += 5;

    // cap at 98% (realistic)
    const prob = Math.min(base, 98);

    let priorityItemsEn = [];
    let priorityItemsHi = [];

    if (scoreStudyHrs < 8) {
      priorityItemsEn.push("Increase study hours to 8+ daily.");
      priorityItemsHi.push("दैनिक अध्ययन के समय को ८+ घंटे तक बढ़ाएं।");
    }
    if (scoreMock < 75) {
      priorityItemsEn.push("Focus heavily on weak chapters in Mathematics.");
      priorityItemsHi.push("प्राथमिकता के साथ गणित के कमजोर सूत्रों का अभ्यास करें।");
    }
    if (readyDocCount < 5) {
      priorityItemsEn.push("Apply for Missing State Domicile & Income Papers inside e-District portal.");
      priorityItemsHi.push("तहसील केंद्र द्वारा मूल निवास और आर्थिक आय प्रमाण पत्र तुरंत तैयार कराएं।");
    }

    if (priorityItemsEn.length === 0) {
      priorityItemsEn.push("Maintain current mock exam tempos. Ready for final stretch!");
      priorityItemsHi.push("वर्तमान मॉक परीक्षा चक्र बनाए रखें। आप अंतिम चरण हेतु सुदृढ़ रूप से तैयार हैं!");
    }

    return {
      percentage: prob,
      weaknessesEn: priorityItemsEn,
      weaknessesHi: priorityItemsHi
    };
  }, [scoreMock, scoreStudyHrs, scoreBoardMarks, readyDocCount]);

  // Calculate Funding Stats block
  const totalFundingScore = useMemo(() => {
    // Estimations based on goal:
    let baseScholarshipValue = 20000;
    if (stateScholarships.length > 0) {
      // parse approximate scholarship support
      baseScholarshipValue = stateQueryKey === "Assam" ? 93600 : 50000;
    }
    const maxLoanCapability = 750000; // CSIS limit
    return baseScholarshipValue + maxLoanCapability;
  }, [stateScholarships, stateQueryKey]);

  return (
    <div className="space-y-8" id="bharat-navigator-container">
      {/* 🚀 BANNER HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <span className="text-[10px] font-black text-saffron bg-[#FF9933]/10 border border-[#FF9933]/20 px-2.5 py-1 rounded inline-block tracking-widest uppercase">
            {isHindi ? "भारत राष्ट्रीय कैरियर गाइड" : "BHARAT PUBLIC INCLUSION HUB"}
          </span>
          <h2 className="font-serif text-2xl font-black text-white tracking-tight mt-1">
            🎯 {isHindi ? "भारत कैरियर नेविगेटर" : "Bharat Career Navigator"}
          </h2>
          <p className="text-[10px] sm:text-xs text-gray-400 max-w-2xl">
            {isHindi 
              ? "छात्रों हेतु पूर्ण मार्गदर्शन तंत्र: योजनाओं, छात्रवृत्ति, ऋण, सरकारी पाठ्यपुस्तकों और परीक्षाओं का प्रामाणिक समन्वय।" 
              : "A robust national student pathway mapping exams, physical standards, verified scholarships, financial backup, and contingency planning."}
          </p>
        </div>

        {activeStep === "dashboard" && (
          <button
            onClick={() => {
              setActiveStep("profile");
              triggerFeedback(isHindi ? "प्रोफ़ाइल संपादन प्रपत्र" : "Returned to Profile Setup Preferences.");
            }}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{isHindi ? "विकल्प बदलें" : "Modify Parameters"}</span>
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* ================= STAGE 1: PROFILE BUILDER ================= */}
        {activeStep === "profile" && (
          <motion.div
            key="profile-setup"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Column: Flow Inputs Cards */}
            <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border-white/5 space-y-6 bg-[#08080c]/90">
              <span className="text-[10px] font-bold text-[#FF9933] uppercase tracking-wider block">
                {isHindi ? "चरण १: अपने शैक्षणिक क्रेडेंशियल चुनें" : "STAGE 1: DEFINE ACADEMIC COORDINATES"}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* 1. Domicile State */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-wider text-gray-300">
                    {isHindi ? "📍 मूल निवासी राज्य" : "📍 Domicile State"}
                  </label>
                  <select 
                    value={profileState}
                    onChange={(e) => setProfileState(e.target.value)}
                    className="w-full bg-zinc-950/80 border border-white/10 rounded-xl p-3 text-xs text-white font-bold outline-none cursor-pointer focus:border-amber-500 hover:bg-zinc-900 transition-colors"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  <span className="text-[9px] text-gray-500 block leading-tight">
                    {isHindi ? "राज्य कोटे की छात्रवृत्ति और सीटों का आकलन करने के लिए महत्वपूर्ण।" : "Ensures automatic filtering of native state schemes and land-related allowances."}
                  </span>
                </div>

                {/* 2. Class Level */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-wider text-gray-300">
                    {isHindi ? "🎓 वर्तमान शैक्षणिक श्रेणी" : "🎓 Academic Class"}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Class 8-10", "Class 11-12", "Graduate", "Postgraduate"].map((cls) => (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => setProfileClass(cls)}
                        className={`p-2 rounded-xl text-center text-xs font-bold border transition-all ${
                          profileClass === cls
                            ? "bg-[#FF9933] text-black border-transparent font-black"
                            : "bg-zinc-950/40 border-white/5 text-gray-300 hover:bg-zinc-900"
                        }`}
                      >
                        {cls}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Stream Choice */}
                <div className="space-y-2 col-span-1 sm:col-span-2">
                  <label className="text-[11px] font-black uppercase tracking-wider text-gray-300">
                    {isHindi ? "🔬 विधा / स्ट्रीम (Stream)" : "🔬 Academic Stream"}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {["Science (PCM)", "Science (PCB)", "Commerce", "Arts/Humanities"].map((stream) => (
                      <button
                        key={stream}
                        type="button"
                        onClick={() => setProfileStream(stream)}
                        className={`p-2.5 rounded-xl text-center text-[11px] font-bold border transition-all ${
                          profileStream === stream
                            ? "bg-[#FF9933] text-black border-transparent font-black"
                            : "bg-zinc-950/40 border-white/5 text-gray-300 hover:bg-zinc-900"
                        }`}
                      >
                        {stream}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Core Interest Selection */}
                <div className="space-y-2 col-span-1 sm:col-span-2">
                  <label className="text-[11px] font-black uppercase tracking-wider text-gray-300">
                    {isHindi ? "❤️ प्राथमिक रुचि क्षेत्र" : "❤️ Core Career Interest"}
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {[
                      { id: "Government Service", label: isHindi ? "🇮🇳 सरकारी सेवा" : "🇮🇳 Public Service" },
                      { id: "Defence", label: isHindi ? "🛡️ सशस्त्र बल" : "🛡️ Defense" },
                      { id: "Medical", label: isHindi ? "⚕️ चिकित्सा" : "⚕️ Healthcare" },
                      { id: "Technology", label: isHindi ? "💻 प्रौद्योगिकी" : "💻 Technology" },
                      { id: "Law", label: isHindi ? "⚖️ कानून" : "⚖️ Judiciary & Law" },
                      { id: "Business", label: isHindi ? "📈 उद्योग / CA" : "📈 Business & Finance" }
                    ].map((interest) => (
                      <button
                        key={interest.id}
                        type="button"
                        onClick={() => setProfileInterest(interest.id)}
                        className={`p-2.5 rounded-xl text-left text-xs font-semibold border transition-all ${
                          profileInterest === interest.id
                            ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 font-extrabold"
                            : "bg-zinc-950/40 border-white/5 text-gray-400 hover:bg-zinc-900"
                        }`}
                      >
                        {interest.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Dynamically Generated Career Goals list */}
                <div className="space-y-2 col-span-1 sm:col-span-2 bg-zinc-950/40 border border-white/5 p-4 rounded-2xl">
                  <label className="text-[11px] font-black uppercase tracking-wider text-[#FF9933] block mb-2">
                    {isHindi ? "🎯 आपके मानदंड के आधार पर अनुशंसित लक्ष्य" : "🎯 MATCHED LICENSED GOAL TARGETS"}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {dynamicGoalOptions.map((g) => (
                      <div
                        key={g.id}
                        onClick={() => setSelectedGoalId(g.id)}
                        className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                          selectedGoalId === g.id
                            ? "bg-emerald-550/10 border-emerald-500/50 text-white"
                            : "bg-black/30 border-white/5 text-gray-400 hover:border-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <GraduationCap className={`w-4 h-4 ${selectedGoalId === g.id ? "text-emerald-400 animate-pulse" : "text-gray-500"}`} />
                          <span className="text-[11px] sm:text-xs font-black">{g.label}</span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedGoalId === g.id ? "border-emerald-400 bg-emerald-500/10 text-emerald-400" : "border-gray-600"}`}>
                          {selectedGoalId === g.id && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <div className="flex justify-end pt-2 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => {
                    setActiveStep("dashboard");
                    triggerFeedback(isHindi ? "करियर डैशबोर्ड जनरेट किया गया" : "Successfully constructed career ecosystem! Activating layout.");
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF9933] to-[#FF9933]/90 text-black font-black text-xs flex items-center gap-1.5 shadow-lg shadow-[#FF9933]/15 active:scale-95 duration-100 cursor-pointer"
                >
                  <span>{isHindi ? "कैरियर मार्ग नेविगेट करें" : "Navigate Career Path"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Pre-computation Shimmer */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass-panel p-6 rounded-3xl border-white/5 bg-[#0a0a10]/80 space-y-5">
                <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                  <Compass className="w-5 h-5 text-saffron shrink-0" />
                  <span className="font-serif font-black text-xs uppercase tracking-wider text-white">
                    {isHindi ? "रीयल-टाइम इंटेलिजेंस आँकड़े" : "LIFELONG GUIDANCE PROTOCOLS"}
                  </span>
                </div>

                <div className="bg-black/40 p-4 rounded-2xl border border-white/5 space-y-3.5">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-400">{isHindi ? "संभावित छात्रवृत्ति सहायता" : "State Scholarships Estimated"}</span>
                    <span className="font-mono font-black text-emerald-400">
                      {isHindi ? "सत्यापित लाइव डेटा" : "100% Accredited"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-400">{isHindi ? "न्यूनतम ब्याज दर ऋण" : "Subsidized Public Credit"}</span>
                    <span className="font-mono font-black text-[#FF9933]">{isHindi ? "८.४% से प्रारंभ" : "Starting @ 8.4%"}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-400">{isHindi ? "वैकल्पिक बैकअप रोडमैप" : "Failure Countermeasures"}</span>
                    <span className="font-mono font-black text-white">{isHindi ? "४ समर्थित विकल्प" : "4 Backup Paths"}</span>
                  </div>
                </div>

                {/* Stream advisor card */}
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl space-y-2">
                  <span className="text-[10px] uppercase font-black text-emerald-400 tracking-wider block">
                    🌟 {isHindi ? "स्ट्रीम स्विच सलाहकार (AI Guidance)" : "Stream Selection Advisor"}
                  </span>
                  <p className="text-[11px] text-gray-300 leading-normal font-sans">
                    {isHindi 
                      ? "लक्षित परीक्षा के लिए ग्यारहवीं-बारहवीं में भौतिकी और गणित (PCM) वैकल्पिक विषय लेना कानूनी दृष्टिकोण से सशस्त्र बल तकनीकी प्रवेश योजनाओं हेतु वैधानिक अनिवार्यता है।" 
                      : "For Defense tech & Research careers, choosing Science with Physics, Chemistry & Math is highly recommended to qualify for direct entry options like Technical Entry Scheme (TES)."}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= STAGE 2: CAREER INTELLIGENCE DASHBOARD ================= */}
        {activeStep === "dashboard" && (
          <motion.div
            key="dashboard-active"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6"
          >
            {/* 🪙 TOP MONETARY STATS BAR */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="navigator-monetary-meters">
              {/* Counter 1: Ready metrics */}
              <div className="p-4 bg-[#FF9933]/5 border border-[#FF9933]/15 rounded-2xl text-left select-none relative overflow-hidden">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-saffron uppercase tracking-widest">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isHindi ? "तैयारी पूर्णता सूचकांक" : "Credential Readiness Index"}</span>
                </div>
                <div className="text-2xl font-serif font-black text-white mt-1.5 flex items-baseline gap-1.5">
                  <span>{readyDocCount} / 8</span>
                  <span className="text-xs text-gray-400 font-sans font-medium">({Math.round((readyDocCount/8)*100)}% {isHindi ? "पूर्ण" : "Ready"})</span>
                </div>
                <p className="text-[10px] text-zinc-500 mt-1">{isHindi ? "जैसे ही आप आवश्यक दस्तावेजों को चेक करेंगे यह मीटर अपडेट होगा।" : "Calculated instantly as document checks are updated below."}</p>
              </div>

              {/* Counter 2: Potential funding capability */}
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/15 rounded-2xl text-left select-none relative overflow-hidden">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 uppercase tracking-widest">
                  <Coins className="w-3.5 h-3.5" />
                  <span>{isHindi ? "संभावित सहायता निधि" : "Potential Funding Support Available"}</span>
                </div>
                <div className="text-2xl font-serif font-[#138808] font-black text-emerald-400 mt-1.5">
                  ₹{totalFundingScore.toLocaleString("en-IN")}
                </div>
                <p className="text-[10px] text-zinc-500 mt-1">
                  {isHindi 
                    ? "संभावित छात्रवृत्ति अनुदान और शासकीय गारंटी शिक्षा ऋण का संचित योग।" 
                    : "Estimated sum of active central/state scholar grants + Vidya Lakshmi collateral-free loans."}
                </p>
                <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Counter 3: Core Exam parameters */}
              <div className="p-4 bg-zinc-950 border border-white/5 rounded-2xl text-left font-mono">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  {isHindi ? "🎯 सक्रिय करियर लक्ष्य" : "🎯 ACTIVE RECRUITMENT PATHWAY"}
                </div>
                <div className="text-xs font-black text-[#FF9933] mt-1.5 truncate leading-tight uppercase">
                  {activeGoalData.title_en}
                </div>
                <div className="text-[9px] text-zinc-400 mt-0.5 font-sans">
                  {isHindi ? "संचालक संस्था: " : "Administered by: "} {activeGoalData.conductedBy}
                </div>
              </div>
            </div>

            {/* BENTO GRID MATRIX */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* LEFT MAJOR COLUMN: Exam specifications & Path Timeline */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* 1. EXAM OVERVIEW & DETAILS MAP */}
                <div className="glass-panel p-6 rounded-3xl border-white/5 space-y-4 bg-[#07070a]/95">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <h3 className="font-serif text-lg font-black text-white flex items-center gap-2">
                      <Compass className="w-5 h-5 text-saffron shrink-0" />
                      <span>{isHindi ? "१. चयन प्रक्रिया एवं नियम अवलोकन" : "1. System Recruitment & Exam Overview"}</span>
                    </h3>
                    <span className="text-[10px] px-2.5 py-1 bg-red-550/10 border border-red-500/20 rounded-full font-mono font-black text-red-400">
                      {isHindi ? `सफलता दर: ${activeGoalData.successRate}` : `Success Rate ~ ${activeGoalData.successRate}`}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 leading-normal leading-relaxed">
                    {isHindi ? activeGoalData.overview_hi : activeGoalData.overview_en}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono pt-1">
                    <div className="bg-black/40 border border-white/5 p-3 rounded-xl">
                      <span className="text-[9px] text-zinc-500 uppercase block mb-0.5">{isHindi ? "आयु सीमा" : "Age Limit Requirements"}</span>
                      <span className="font-black text-white leading-normal">{activeGoalData.ageLimit}</span>
                    </div>

                    <div className="bg-black/40 border border-white/5 p-3 rounded-xl">
                      <span className="text-[9px] text-zinc-500 uppercase block mb-0.5">{isHindi ? "संचालन प्राधिकरण" : "Conducted Agency"}</span>
                      <span className="font-black text-emerald-400 leading-tight block truncate">{activeGoalData.conductedBy}</span>
                    </div>

                    <div className="bg-black/40 border border-white/5 p-3 rounded-xl">
                      <span className="text-[9px] text-zinc-500 uppercase block mb-0.5">{isHindi ? "अगला राष्ट्रीय चक्र" : "Next Exam Date"}</span>
                      <span className="font-black text-saffron leading-normal">{isHindi ? activeGoalData.nextExam_hi : activeGoalData.nextExam}</span>
                    </div>
                  </div>

                  {/* Eligibility compass subsection */}
                  <div className="bg-zinc-950/40 p-4 border border-white/5 rounded-2xl space-y-1 text-xs">
                    <span className="font-extrabold text-white leading-normal block flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-saffron shrink-0" />
                      {isHindi ? "संवैधानिक पात्रता निर्देशिका" : "Statutory Eligibility Protocols"}
                    </span>
                    <p className="text-gray-400 text-[11px] leading-relaxed">
                      {isHindi ? activeGoalData.eligibilityDetail_hi : activeGoalData.eligibilityDetail_en}
                    </p>
                  </div>
                </div>

                {/* 2. CORE COMPREHENSIVE ROADMAP TIMELINE */}
                <div className="glass-panel p-6 rounded-3xl border-white/5 space-y-4 bg-[#07070a]/95">
                  <h3 className="font-serif text-lg font-black text-white border-b border-white/5 pb-3 flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>{isHindi ? "२. जीवन-चक्र चरण-दर-चरण समयरेखा" : "2. Lifelong Achievement Timeline & Roadmap"}</span>
                  </h3>

                  {/* Flow Timeline container items */}
                  <div className="space-y-4 relative pl-5 border-l border-white/10 ml-2.5 py-1">
                    {(isHindi ? activeGoalData.timeline_hi : activeGoalData.timeline_en).map((step, idx) => (
                      <div key={idx} className="relative group">
                        {/* Bullet count pointer */}
                        <span className="absolute -left-8 top-0.5 w-5 h-5 rounded-full bg-zinc-900 border border-[#FF9933]/50 text-[#FF9933] font-mono text-[10px] font-black flex items-center justify-center shadow-lg group-hover:bg-[#FF9933] group-hover:text-black transition-all">
                          {idx + 1}
                        </span>
                        <div className="p-3 bg-black/30 border border-white/5 rounded-xl text-xs space-y-1 select-none">
                          <p className="text-gray-200 font-sans leading-relaxed">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. SYLLABUS WEIGHTAGE METRICS */}
                <div className="glass-panel p-6 rounded-3xl border-white/5 space-y-4 bg-[#07070a]/95">
                  <h3 className="font-serif text-lg font-black text-white border-b border-white/5 pb-3">
                    📚 {isHindi ? "३. विषय-वार परीक्षा पाठ्यक्रम और भारांश" : "3. Subjects & Exam Mark Weightage"}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(isHindi ? activeGoalData.subjects_hi : activeGoalData.subjects_en).map((sub, idx) => (
                      <div key={idx} className="p-3.5 bg-[#0e0e14] border border-white/5 rounded-2xl flex justify-between items-center text-xs">
                        <span className="font-bold text-gray-300 pr-2 leading-relaxed">{sub.subject}</span>
                        <span className="shrink-0 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-black rounded-lg text-[10px]">
                          {sub.weight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. SUCCESS PROBABILITY ANALYZER & DIAGNOSTICS */}
                <div className="glass-panel p-6 rounded-3xl border-white/5 space-y-5 bg-[#07070a]/95">
                  <div className="border-b border-white/5 pb-3">
                    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full block w-fit mb-1">
                      {isHindi ? "कौशल आकलन" : "PREDICTION SCORE MACHINE"}
                    </span>
                    <h3 className="font-serif text-lg font-black text-white">
                      📊 {isHindi ? "४. व्यक्तिगत सफलता संभावना विश्लेषक" : "4. Target Success Probability Analyzer"}
                    </h3>
                    <p className="text-[10px] text-gray-500 mt-1">
                      {isHindi 
                        ? "अपने वर्तमान तैयारी मापदंडों को दर्ज करें, हमारी प्रणाली आपकी तैयारी स्तर का आकलन करेगी।" 
                        : "Configure your current preparation rates below to estimate dynamic entrance readiness."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Slider 1: Mock Marks */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-gray-300">
                        <span>{isHindi ? "मॉक टेस्ट स्कोर (%)" : "Mock Test Score (%)"}</span>
                        <span className="font-mono text-saffron">{scoreMock}%</span>
                      </div>
                      <input 
                        type="range" min="30" max="100" value={scoreMock} 
                        onChange={(e) => setScoreMock(Number(e.target.value))}
                        className="w-full accent-[#FF9933]"
                      />
                    </div>

                    {/* Slider 2: Daily Study */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-gray-300">
                        <span>{isHindi ? "दैनिक स्वाध्याय घंटे" : "Daily Study Hours"}</span>
                        <span className="font-mono text-saffron">{scoreStudyHrs} Hrs</span>
                      </div>
                      <input 
                        type="range" min="2" max="16" value={scoreStudyHrs} 
                        onChange={(e) => setScoreStudyHrs(Number(e.target.value))}
                        className="w-full accent-[#FF9933]"
                      />
                    </div>

                    {/* Slider 3: Board Marks */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-gray-300">
                        <span>{isHindi ? "१०वीं/१२वीं प्रतिशत (%)" : "Prior Board Marks (%)"}</span>
                        <span className="font-mono text-saffron">{scoreBoardMarks}%</span>
                      </div>
                      <input 
                        type="range" min="50" max="100" value={scoreBoardMarks} 
                        onChange={(e) => setScoreBoardMarks(Number(e.target.value))}
                        className="w-full accent-[#FF9933]"
                      />
                    </div>
                  </div>

                  {/* Output display */}
                  <div className="p-4 bg-black/60 rounded-2xl border border-white/5 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                    <div className="md:col-span-4 text-center md:border-r md:border-white/5 py-1">
                      <span className="text-[10px] text-gray-400 uppercase font-black block tracking-wider">{isHindi ? "अपेक्षित तत्परता दर" : "Estimated Readiness"}</span>
                      <span className="text-3xl font-serif font-black text-rose-500 mt-1 block">
                        {analyzerResult.percentage}%
                      </span>
                    </div>

                    <div className="md:col-span-8 space-y-1.5 text-xs text-left">
                      <span className="font-extrabold text-gray-200 block">{isHindi ? "सुधार हेतु ३०-दिवसीय कार्य योजना:" : "30-Day Automated Corrective Plan:"}</span>
                      <ul className="space-y-1 text-gray-400 font-mono text-[10px] leading-relaxed">
                        {(isHindi ? analyzerResult.weaknessesHi : analyzerResult.weaknessesEn).map((wk, i) => (
                          <li key={i} className="flex gap-1.5 items-start">
                            <span className="text-rose-500">🔻</span>
                            <span>{wk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 5. ALTERNATIVE PATHWAYS ("WHAT IF I FAIL?") */}
                <div className="glass-panel p-6 rounded-3xl border-white/5 space-y-4 bg-[#07070a]/95">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                    <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
                    <h3 className="font-serif text-lg font-black text-white">
                      ⚠️ {isHindi ? "५. आपातकालीन वैकल्पिक योजना (Failure Alternative Plans)" : "5. Defensive Fail-Safe Counters ('What If I Fail?')"}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-400 leading-normal">
                    {isHindi 
                      ? "परीक्षा की अत्यंत कठिन प्रतिस्पर्धी प्रकृति को देखते हुए, एक परिपक्व छात्र हमेशा इन समानांतर सरकारी प्रवेश योजनाओं और राज्य स्तरीय करियर सुरक्षा द्वारों को लागू रखता है:"
                      : "Due to tiny statutory intake rates, successful candidates deploy backup strategies in parallel to secure high-tier placements without losing critical years."}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {(isHindi ? activeGoalData.backupPaths_hi : activeGoalData.backupPaths_en).map((bk, idx) => (
                      <div key={idx} className="p-3 bg-red-500/5 hover:bg-red-550/10 border border-red-500/10 rounded-xl text-xs font-mono text-zinc-300 leading-relaxed">
                        {bk}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* RIGHT MINOR COLUMN: Scholarship, Loans & Document Checklist */}
              <div className="lg:col-span-4 space-y-6">

                {/* 6. DOCUMENT READINESS CHECKLIST */}
                <div className="glass-panel p-5 rounded-3xl border-white/5 bg-[#07070a]/95 space-y-4" id="dashboard-docs-checklist">
                  <div className="border-b border-white/5 pb-2">
                    <span className="text-[9px] font-black text-[#FF9933] uppercase block tracking-wider mb-0.5">{isHindi ? "सत्यापन चेकलिस्ट" : "MANDATORY RECORDS SYNC"}</span>
                    <h3 className="font-serif text-md font-bold text-white flex items-center gap-1.5">
                      📂 {isHindi ? "आवश्यक दस्तावेज की स्थिति" : "Credential Checklist"}
                    </h3>
                  </div>

                  <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                    {GENERAL_DOCUMENTS.map((doc) => (
                      <div 
                        key={doc.id}
                        onClick={() => {
                          const currentChecked = docReadiness[doc.id];
                          setDocReadiness(prev => ({ ...prev, [doc.id]: !currentChecked }));
                          triggerFeedback(isHindi ? `दस्तावेज स्थिति बदली गई` : `Status updated for: ${doc.name_en}`);
                        }}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-2.5 select-none ${
                          docReadiness[doc.id]
                            ? "bg-emerald-500/5 border-emerald-500/30 text-white"
                            : "bg-black/30 border-white/5 text-gray-400 hover:border-white/10"
                        }`}
                      >
                        <div className="pt-0.5 shrink-0">
                          {docReadiness[doc.id] ? (
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-gray-600 bg-black" />
                          )}
                        </div>

                        <div className="text-xs space-y-0.5 leading-snug">
                          <div className="font-black text-gray-200">
                            {isHindi ? doc.name_hi : doc.name_en}
                          </div>
                          <div className="text-[9px] text-zinc-500 leading-normal">
                            {isHindi ? doc.purpose_hi : doc.purpose_en}
                          </div>
                          {doc.critical && (
                            <span className="text-[8px] bg-red-650/15 border border-red-500/20 text-red-500 px-1 py-0.2 rounded font-mono font-black uppercase text-rose-500">
                              {isHindi ? "अति-आवश्यक" : "Mandatory"}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 7. SCHOLARSHIP INTELLIGENCE (STATE FILTERED DYNAMIC) */}
                <div className="glass-panel p-5 rounded-3xl border-white/5 bg-[#07070a]/95 space-y-4">
                  <div className="border-b border-white/5 pb-2 flex justify-between items-center">
                    <div>
                      <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">{profileState} {isHindi ? "विशिष्ट" : "Target"}</span>
                      <h3 className="font-serif text-md font-bold text-white">
                        🎓 {isHindi ? "छात्रवृत्ति इंटेलिजेंस" : "Active Scholarships"}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    {stateScholarships.map((sch, idx) => (
                      <div key={idx} className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl space-y-2.5">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-mono font-black text-emerald-400 block tracking-wider">
                            ₹ {sch.amount}
                          </span>
                          <h4 className="text-xs font-serif font-black text-gray-100 leading-snug">
                            {isHindi ? sch.name_hi : sch.name_en}
                          </h4>
                        </div>

                        <div className="space-y-1 text-[10px] border-t border-white/5 pt-2 text-zinc-400">
                          <p className="leading-snug">
                            <strong>{isHindi ? "योग्यता: " : "Eligibility: "}</strong>
                            {isHindi ? sch.eligibility_hi : sch.eligibility_en}
                          </p>
                          <p className="leading-snug mt-1">
                            <strong>{isHindi ? "कागजात: " : "Required: "}</strong>
                            {isHindi ? sch.documents_hi : sch.documents_en}
                          </p>
                        </div>

                        <a 
                          href={sch.applyLink} target="_blank" rel="noopener noreferrer"
                          className="w-full py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-xl text-[10px] font-bold text-gray-300 flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>{isHindi ? "स्कॉलरशिप पोर्टल खोलें" : "Apply via Official Portal"}</span>
                          <ExternalLink className="w-3 h-3 text-emerald-500" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 8. EDUCATION FINANCE HUB */}
                <div className="glass-panel p-5 rounded-3xl border-white/5 bg-[#07070a]/95 space-y-4">
                  <div className="border-b border-white/5 pb-2">
                    <span className="text-[9px] font-black text-saffron uppercase block tracking-widest">{isHindi ? "ऋण सहायता" : "Subsidized Public Credit"}</span>
                    <h3 className="font-serif text-md font-bold text-white">
                      🏛️ {isHindi ? "विद्या लक्ष्मी शिक्षा ऋण" : "Education Finance Hub"}
                    </h3>
                  </div>

                  <div className="space-y-3.5">
                    {EDUCATION_LOANS.map((loan, idx) => (
                      <div key={idx} className="p-3 bg-zinc-950 border border-white/5 rounded-2xl space-y-2">
                        <div className="space-y-1">
                          <h4 className="text-xs font-serif font-black text-gray-200 leading-snug">
                            {isHindi ? loan.name_hi : loan.name_en}
                          </h4>
                          <p className="text-[10px] text-[#FF9933] font-mono leading-relaxed">
                            {isHindi ? loan.maxAmount_hi : loan.maxAmount_en}
                          </p>
                          <p className="text-[8px] text-[#138808] font-mono leading-none">
                            Interest: {loan.interest}
                          </p>
                        </div>

                        <p className="text-[9px] text-gray-500 leading-snug">
                          <strong>{isHindi ? "पात्रता: " : "Eligibility: "}</strong>
                          {isHindi ? loan.eligibility_hi : loan.eligibility_en}
                        </p>

                        <a 
                          href={loan.applyLink} target="_blank" rel="noopener noreferrer"
                          className="w-full py-1.5 bg-[#FF9933]/10 hover:bg-[#FF9933]/15 border border-[#FF9933]/20 rounded-xl text-[10px] text-saffron font-bold flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>{isHindi ? "ऋण आवेदन पोर्टल" : "Apply on Vidya Lakshmi Portal"}</span>
                          <ExternalLink className="w-3 h-3 text-[#FF9933]" />
                        </a>
                      </div>
                    ))}

                    {/* EMI Calculator subsection */}
                    <div className="p-4 bg-black/50 border border-white/5 rounded-2xl space-y-3">
                      <span className="text-[10px] uppercase font-black text-[#FF9933] tracking-wider block">
                        🧮 {isHindi ? "तत्काल ईएमआई (EMI) गणक" : "Education Loan EMI Calculator"}
                      </span>

                      <div className="space-y-2.5 text-[10px] text-gray-300">
                        {/* Principal amount */}
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>{isHindi ? "ऋण राशि (₹)" : "Loan Principal (₹)"}</span>
                            <span className="font-mono text-white">₹{loanPrincipal.toLocaleString("en-IN")}</span>
                          </div>
                          <input 
                            type="range" min="50000" max="1500000" step="50000" value={loanPrincipal} 
                            onChange={(e) => setLoanPrincipal(Number(e.target.value))}
                            className="w-full accent-emerald-500"
                          />
                        </div>

                        {/* Calculations outputs summary */}
                        <div className="border-t border-white/5 pt-2 grid grid-cols-2 gap-2 text-center text-xs">
                          <div className="bg-white/5 p-2 rounded">
                            <span className="text-[8px] text-zinc-500 block">{isHindi ? "अनुमानित EMI" : "Approx. EMI / mo"}</span>
                            <span className="font-serif font-black text-[#FF9933]">₹{emiCalculation.emi.toLocaleString("en-IN")}</span>
                          </div>
                          <div className="bg-white/5 p-2 rounded">
                            <span className="text-[8px] text-zinc-500 block">{isHindi ? "कुल ब्याज" : "Total Interest"}</span>
                            <span className="font-serif font-black text-emerald-400">₹{emiCalculation.totalInterest.toLocaleString("en-IN")}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 9. RECOMMENDED SUBJECT PREPARATION STUDY BOOKS */}
                <div className="glass-panel p-5 rounded-3xl border-white/5 bg-[#07070a]/95 space-y-3">
                  <h3 className="font-serif text-sm font-bold text-white flex items-center gap-1.5">
                    📚 {isHindi ? "अनुशंसित अध्ययन सामग्री" : "Official Books & Catalog"}
                  </h3>
                  <div className="space-y-2 text-xs">
                    {(isHindi ? activeGoalData.recommendedBooks_hi : activeGoalData.recommendedBooks_en).map((bk, i) => (
                      <div key={i} className="p-2 bg-black/40 border border-white/5 rounded-xl text-zinc-300 leading-snug">
                        {bk}
                      </div>
                    ))}
                    <div className="text-[9px] text-[#22c55e] font-mono block mt-1">
                      {isHindi ? "• राष्ट्रीय एनसीईआरटी पुस्तकें ई-पाठशाला पर मुफ्त उपलब्ध हैं।" : "• NCERT textbooks can be downloaded legally for free via ePathshala Portal."}
                    </div>
                  </div>
                </div>

              </div>
              
            </div>

            {/* Direct Back navigation */}
            <div className="flex justify-start">
              <button
                type="button"
                onClick={() => {
                  setActiveStep("profile");
                  triggerFeedback(isHindi ? "प्रोफ़ाइल संपादन प्रपत्र" : "Returned to Profile Setup Preferences.");
                }}
                className="px-5 py-2.5 bg-zinc-950/80 hover:bg-zinc-900 border border-white/10 text-xs text-gray-300 font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>← {isHindi ? "वापस जाएं" : "Back to Profile Setup"}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
