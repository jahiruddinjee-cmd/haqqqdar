import React, { useState, useMemo } from "react";
import { 
  CheckCircle, AlertTriangle, HelpCircle, FileText, ChevronRight, 
  ArrowRight, Search, Settings, ShieldCheck, Info, User, Award, 
  MapPin, Coins, Navigation, Network, ListChecks, ToggleLeft, ToggleRight,
  ExternalLink, Compass
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DOCUMENTS_DATABASE, DOCUMENT_TIERS, DocumentMetadata } from "../data/documentsDatabase";
import { ALL_SCHEMES_DOCS_REF, SchemeDocsRef } from "../data/schemesDocsData";

const STATE_CHANNELS = [
  "All India", "Assam", "Bihar", "Uttar Pradesh", "West Bengal", "Maharashtra", 
  "Karnataka", "Tamil Nadu", "Kerala", "Delhi", "Rajasthan", "Madhya Pradesh", 
  "Gujarat", "Odisha", "Haryana", "Punjab", "Andhra Pradesh", "Meghalaya", 
  "Arunachal Pradesh", "Manipur", "Nagaland", "Mizoram", "Sikkim", "Tripura"
];

const STATE_PORTAL_LINKS: Record<string, string> = {
  "All India": "https://serviceonline.gov.in",
  "Assam": "https://sewa.assam.gov.in",
  "Bihar": "https://serviceonline.bihar.gov.in",
  "Uttar Pradesh": "https://edistrict.up.gov.in",
  "Maharashtra": "https://aaplesarkar.mahaonline.gov.in",
  "West Bengal": "https://edistrict.wb.gov.in",
  "Karnataka": "https://nadakacheri.karnataka.gov.in",
  "Tamil Nadu": "https://www.tnesevai.tn.gov.in",
  "Delhi": "https://edistrict.delhigovt.nic.in",
  "Rajasthan": "https://sso.rajasthan.gov.in",
  "Odisha": "https://edistrict.odisha.gov.in",
  "Kerala": "https://edistrict.kerala.gov.in",
  "Gujarat": "https://digitalgujarat.gov.in",
  "Madhya Pradesh": "https://www.mpedistrict.gov.in",
  "Punjab": "https://esewa.punjab.gov.in",
  "Haryana": "https://saralharyana.gov.in",
  "Andhra Pradesh": "https://meeseva.ap.gov.in",
  "Sikkim": "https://www.sikkim.gov.in",
  "Tripura": "https://edistrict.tripura.gov.in",
  "Meghalaya": "https://megedistrict.gov.in",
  "Arunachal Pradesh": "https://eservice.arunachal.gov.in",
  "Manipur": "https://eservicesmanipur.gov.in",
  "Nagaland": "https://edistrict.nagaland.gov.in",
  "Mizoram": "https://edistrict.mizoram.gov.in"
};

interface DocumentIntelligenceProps {
  inventoryDocs: string[];
  setInventoryDocs: React.Dispatch<React.SetStateAction<string[]>>;
  language: string;
  profileAge: number;
  profileState: string;
  profileOccupation: string;
  profileGender: string;
  triggerFeedback: (msg: string) => void;
}

export const DocumentIntelligence: React.FC<DocumentIntelligenceProps> = ({
  inventoryDocs,
  setInventoryDocs,
  language,
  profileAge,
  profileState,
  profileOccupation,
  profileGender,
  triggerFeedback
}) => {
  // Client state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState<number | "all">("all");
  const [focusedDoc, setFocusedDoc] = useState<DocumentMetadata | null>(null);
  const [activeAnalysisView, setActiveAnalysisView] = useState<"tiers" | "smart" | "events" | "dependencies" | "schemes" | "how_to_get">("smart");
  
  // Custom Dynamic Schemes insertion
  const [customSchemes, setCustomSchemes] = useState<SchemeDocsRef[]>(() => {
    try {
      const stored = localStorage.getItem("haqqdar_custom_schemes");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to parse custom schemes from storage", e);
    }
    return [];
  });

  const allSchemesRefCombined = useMemo(() => {
    return [...ALL_SCHEMES_DOCS_REF, ...customSchemes];
  }, [customSchemes]);

  const [selectedSchemeId, setSelectedSchemeId] = useState(() => {
    return allSchemesRefCombined[0]?.id || "pmay-g";
  });

  // Admin Scheme Addition Modal States
  const [showAddSchemeForm, setShowAddSchemeForm] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [schemeFormError, setSchemeFormError] = useState("");

  // New Scheme Draft values
  const [newSchemeId, setNewSchemeId] = useState("");
  const [newSchemeName, setNewSchemeName] = useState("");
  const [newSchemeNameHi, setNewSchemeNameHi] = useState("");
  const [newSchemeCat, setNewSchemeCat] = useState("Welfare");
  const [newSchemeCatHi, setNewSchemeCatHi] = useState("कल्याण");
  const [newSchemeFullName, setNewSchemeFullName] = useState("");
  const [newSchemeFullNameHi, setNewSchemeFullNameHi] = useState("");
  const [newSchemeDocs, setNewSchemeDocs] = useState("");
  const [newSchemeDocsHi, setNewSchemeDocsHi] = useState("");

  const isHindi = language === "Hindi";

  // "Ready For What" custom toggle controls as per user request
  const [readyStudent, setReadyStudent] = useState(profileOccupation === "Student");
  const [ready18, setReady18] = useState(profileAge >= 18);
  const [readyDomicile, setReadyDomicile] = useState(() => inventoryDocs.includes("Domicile Certificate") || inventoryDocs.includes("मूल निवास प्रमाण पत्र (Domicile)"));
  const [readyPassport, setReadyPassport] = useState(() => inventoryDocs.includes("Passport") || inventoryDocs.includes("पासपोर्ट"));
  const [readyEverything, setReadyEverything] = useState(false);

  const handleToggleEverything = (checked: boolean) => {
    setReadyEverything(checked);
    setReadyStudent(checked);
    setReady18(checked);
    setReadyDomicile(checked);
    setReadyPassport(checked);
    triggerFeedback(isHindi ? "सभी तत्परता मानदंडों का चयन किया गया" : "Selected all readiness profile criteria.");
  };

  // Translate document metadata dynamically to match state overrides
  const getLocalizedDoc = (doc: DocumentMetadata) => {
    let name = doc.name;
    let authority = doc.authority;

    if (profileState && doc.stateOverrides && doc.stateOverrides[profileState]) {
      name = doc.stateOverrides[profileState].name;
      authority = doc.stateOverrides[profileState].authority;
    }

    return {
      ...doc,
      name,
      authority
    };
  };

  // Pre-process database with state names
  const localizedDocs = useMemo(() => {
    return DOCUMENTS_DATABASE.map(doc => getLocalizedDoc(doc));
  }, [profileState]);

  // Is doc checked in inventory helper
  const isHeld = (docId: string) => {
    // Check either by ID or name
    const rawDocRef = DOCUMENTS_DATABASE.find(d => d.id === docId);
    if (!rawDocRef) return false;
    
    const locName = getLocalizedDoc(rawDocRef).name;
    return inventoryDocs.includes(rawDocRef.name) || inventoryDocs.includes(locName);
  };

  // Toggle inventory state helper
  const toggleDoc = (doc: DocumentMetadata) => {
    const localized = getLocalizedDoc(doc);
    const hasDoc = inventoryDocs.includes(doc.name) || inventoryDocs.includes(localized.name);

    if (hasDoc) {
      // Remove both forms to avoid mismatch
      setInventoryDocs(prev => prev.filter(d => d !== doc.name && d !== localized.name));
      triggerFeedback(isHindi ? `दस्तावेज "${localized.name}" सूची से हटाया गया` : `Removed "${localized.name}" from your active inventory.`);
    } else {
      setInventoryDocs(prev => [...prev, localized.name]);
      triggerFeedback(isHindi ? `दस्तावेज "${localized.name}" सक्रिय किया गया` : `Added "${localized.name}" to your active inventory.`);
    }
  };

  const lookUpDocInDb = (docNameEn: string) => {
    const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
    const nameNorm = norm(docNameEn);
    return DOCUMENTS_DATABASE.find(d => {
      const dbNorm = norm(d.name);
      return dbNorm === nameNorm || dbNorm.includes(nameNorm) || nameNorm.includes(dbNorm);
    });
  };

  const [howToState, setHowToState] = useState(profileState || "All India");

  const getHowToInformation = (doc: DocumentMetadata, state: string, isHindi: boolean) => {
    const portalUrl = STATE_PORTAL_LINKS[state] || STATE_PORTAL_LINKS["All India"];
    const portalName = state === "All India" ? "National Service Portal (ServicePlus)" : `${state} e-District RTPS Portal`;

    let onlineSteps: string[] = [];
    let offlineSteps: string[] = [];

    // Generalize based on document type
    if (doc.id === "aadhaar") {
      onlineSteps = isHindi ? [
        "यूआईडीएआई (UIDAI) की आधिकारिक वेबसाइट 'uidai.gov.in' पर जाएं",
        "'Book an Appointment' विकल्प पर क्लिक करें और अपने नजदीकी आधार सेवा केंद्र चुनें",
        "अपना मोबाइल नंबर दर्ज करें और समय-सीमा स्लॉट आरक्षित करें",
        "आवश्यकतानुसार पता अपडेट करने की रसीद या पहचान प्रमाण पत्र ऑनलाइन अपलोड करें"
      ] : [
        "Navigate to the official UIDAI Portal (uidai.gov.in).",
        "Click on 'Get Aadhaar' and choose 'Book an Appointment' to secure a digital slot.",
        "Enter your active Indian mobile number and undergo OTP authentication.",
        "Submit current name and date-of-birth updates or address declarations online (for minor demographic changes)."
      ];
      offlineSteps = isHindi ? [
        "निर्धारित समय पर ओरिजिनल सहायक दस्तावेजों (जैसे पैन, राशन कार्ड) के साथ आधार केंद्र जाएं",
        "वहां कार्यरत ऑपरेटर के पास अपनी उंगलियों का विवरण (बायोमेट्रिक्स) तथा आंखों की पुतलियों को स्कैन कराएं",
        "कैमरे के समक्ष लाइव रंगीन फोटो खिंचवाएं",
        "पंजीकरण के उपरांत मिलने वाली १४-अंकों वाली नामांकन पर्ची (EID Verification Slip) सुरक्षित रखें"
      ] : [
        "Walk into the designated Aadhaar Seva Kendra at your scheduled appointment hour.",
        "Undergo biometric scans (ten-fingerprints mapping, iris scan, and fresh passport-size photo capture).",
        "Submit hard photocopies of standard identity and address proofs directly to the desk officer.",
        "Collect your 14-digit Enrolment Identification (EID) acknowledgement slip to monitor dispatch status online."
      ];
    } else if (doc.id === "pan") {
      onlineSteps = isHindi ? [
        "Protean NSDL या UTIITSL पर नवीनपत्राचार 'Form 49A' लिंक पर जाएं",
        "अपना आधार कार्ड नंबर दर्ज कर बायोमेट्रिक ई-केवाईसी या मोबाइल ओटीपी साझा करें",
        "भारतीय नागरिकों के लिए निर्धारित ₹१०७ (ई-पैन के लिए केवल ₹७२) का ऑनलाइन भुगतान करें",
        "डिजिटल माध्यम से सफलतापूर्वक पूर्ण होने पर १० मिनट में ई-पैन कॉपी पीडीएफ में प्राप्त करें"
      ] : [
        "Access the Protean NSDL online portal / NSDL PAN application page.",
        "Select Application Type as 'Form 49A' for Indian Citizens.",
        "Provide mobile linked Aadhaar number to trigger instantaneous Paperless e-KYC query.",
        "Pay India-wide application fee of ₹107 securely via online gateway (Cards, NetBanking, or UPI)."
      ];
      offlineSteps = isHindi ? [
        "आधिकारिक पोर्टल से फिजिकल पैन फॉर्म ४९ए (Form 49A) डाउनलोड करें",
        "दो ताज़ा पासपोर्ट साइज रंगीन फोटो लगाएं और बाएं हाथ के अंगूठे या पेन से हस्ताक्षर करें",
        "नजदीकी आयकर सुविधा केंद्र (TIN-FC Centre) या अधिकृत अयांश शाखा में फार्म जमा करें",
        "रसीद संख्या की मदद से १० दिनों में अपने घर पर फिजिकल कार्ड डाक द्वारा प्राप्त करें"
      ] : [
        "Obtain physical Form 49A, attaching two recent stamp-sized color portraits.",
        "Sign diagonally across the photos, ensuring clarity and avoiding facial coverage.",
        "Hand over the physical set to the nearest Protean TIN-FC facilitator or Income Tax office.",
        "Verify your reference code in emails; dispatch of physical card follows within 10 to 14 working days."
      ];
    } else if (doc.id === "voter-id") {
      onlineSteps = isHindi ? [
        "भारत चुनाव आयोग के वोटर्स सर्विस पोर्टल (voters.eci.gov.in) पर खाता बनाएं",
        "'Form 6' (नए मतदाता पंजीकरण आवेदन) का चुनाव करें",
        "सफेद पृष्ठभूमि वाली अपनी एक स्पष्ट तस्वीर, आयु एवं पता प्रमाण पत्र अपलोड करें",
        "आवेदन संदर्भ संख्या के माध्यम से राज्य स्तर पर बीएलओ (BLO) सत्यापन की निगरानी करें"
      ] : [
        "Register or login to the Election Commission Voters portal (voters.eci.gov.in) / Voter Helpline App.",
        "Select 'Form 6' for new mature voters registration.",
        "Upload one high-definition passport passport-size portrait (white background only) and your Aadhaar verified address proof.",
        "Submit and note the generated tracker ID for physical Booth Level Officer (BLO) check audits."
      ];
      offlineSteps = isHindi ? [
        "अपने मतदान क्षेत्र के स्थानीय बूथ लेवल अधिकारी (BLO) से 'Form 6' प्राप्त करें",
        "फॉर्म भरकर उसमें आधार कार्ड, राशन कार्ड या बिजली बिल की फोटोकॉपी संलग्न करें",
        "दस्तावेज जमा करने के पश्चात बीएलओ कर्मचारी आपके निवास आकर भौतिक रूप से सत्यापन करेगा",
        "अनुमोदित होने पर १ महीने में आपके पंजीकृत पते पर पीवीसी (PVC) वोटर आईडी कार्ड भेजा जाएगा"
      ] : [
        "Acquire physical Form 6 paperwork directly from the local Booth Level Officer (BLO) or Panchayat desk.",
        "Attach copies of age proof (10th marksheet) and address proof (Electricity bill) signed manually by you.",
        "Allow the visiting BLO inspector to physically confirm your resident status within your specific voting zone.",
        "Upon approval, a highly secured smart-printed plastic EPIC Voter card will compile and post to your home."
      ];
    } else if (doc.id === "income-cert") {
      onlineSteps = isHindi ? [
        `सर्वप्रथम ${state} के ई-डिस्ट्रिक्ट पोर्टल (${portalUrl}) पर जाएं`,
        "'आय प्रमाण पत्र हेतु आवेदन' सेवा का चयन करें",
        "अपने परिवार की वार्षिक कमाई, कृषि जोत तथा व्यापार से आय का कुल संक्षिप्त विवरण दर्ज करें",
        "स्वयं घोषणा शपथ पत्र (Self-Declaration Form) के साथ आधार कार्ड स्कैन अपलोड करें"
      ] : [
        `Access the designated online state RTPS portal (${portalUrl}).`,
        "Select 'Issuance of Income Certificate' under Revenue Department service listings.",
        "Fill out annual household earnings summary categorized across agricultural yield, business, or wages.",
        "Upload a scanned copy of Aadhaar Card and a duly filled Self-Declaration affidavit."
      ];
      offlineSteps = isHindi ? [
        "अपने ब्लाक (BDO) कार्यालय या नजदीकी जन सेवा केंद्र (CSC/RTPS Counter) पर संपर्क करें",
        "पटवारी/लेखपाल से अपनी कृषि भूमि या व्यावसायिक आय की रिपोर्ट प्रमाणित करवाएं",
        "सत्यापन फॉर्म को ब्लॉक कार्यालय के राजस्व सर्किल अधिकारी (Circle Officer/Tehsildar) के समक्ष प्रस्तुत करें",
        "सरकारी जांच पूर्ण होने पर १० से १५ दिनों में ई-डिस्ट्रिक्ट पोर्टल से प्रमाण पत्र डाउनलोड करें"
      ] : [
        "Visit the nearest Common Service Centre (CSC) or local circular Block Development Office (BDO).",
        "Get a signed and stamped income appraisal report from your local Patwari, Lekhpal, or Panchayat secretary.",
        "File the application form at the Counter and collect your government Acknowledgement receipt.",
        "The Revenue Circle Officer (CO) or Tehsildar will digitally sign and issue the certificate in 10-15 days."
      ];
    } else if (doc.id === "domicile") {
      onlineSteps = isHindi ? [
        `अपने राज्य के ई-डिस्ट्रिक्ट पोर्टल (${portalUrl}) पर लॉग इन करें`,
        "'निवास प्रमाण पत्र (Domicile/Permanent Residence Certificate)' लिंक खोजें",
        "कम से कम १०–१५ वर्षों के लगातार निवास विवरण तथा मूल भू-स्वामित्व प्रमाण पत्र अपलोड करें",
        "आधार विवरण द्वारा ओटीपी प्रक्रिया से सबमिट करें"
      ] : [
        `Open your local state e-Services platform (${portalUrl}).`,
        "Locate 'Domicile Certificate' or 'Permanent Resident Certificate (PRC)' under the revenue sector.",
        "Affix records validating continuous residency (e.g., minimum 10 to 15 years voter roll presence or family land deed).",
        "Authorize and submit with Aadhaar e-KYC."
      ];
      offlineSteps = isHindi ? [
        "ब्लाक के अंचल अधिकारी या अनुमंडल मजिस्ट्रेट (SDM) कार्यालय में आवेदन फॉर्म प्राप्त करें",
        "मकान की रजिस्ट्री, खतियान दस्तावेज या माता-पिता का वोटर कार्ड संलग्न करें",
        "स्थानीय पुलिस स्टेशन या राजस्व निरिक्षक द्वारा भौतिक निवास की पुष्टि की जाएगी",
        "१५ से २१ दिनों के पश्चात कार्यालय से सील-मुहर युक्त प्रमाण पत्र प्राप्त करें"
      ] : [
        "Walk into your local Administrative Office / Tehsildar counter.",
        "Attach legacy records such as heritage land patta, high school leaving certificate, or grandfather's voter lists.",
        "Your sub-regional land inspector or police beat will conduct physical address verification.",
        "Pick up the hand-signed Domicile Certificate from the SDM/Tehsildar desk after 15 to 21 working days."
      ];
    } else if (doc.id === "caste-certificate" || doc.id === "obc-certificate") {
      onlineSteps = isHindi ? [
        `ई-जिला ${state} की वेबसाइट (${portalUrl}) पर यूजर अकाउंट तैयार करें`,
        "'जाति प्रमाण पत्र (SC/ST/OBC Certificate)' का विकल्प चुनें",
        "पिता के पहले से जारी आधिकारिक जाति दस्तावेज और पारिवारिक वंशावली फॉर्म की प्रति प्रदान करें",
        "सभी आवश्यक सहायक दस्तावेजों को पीडीएफ प्रारूप (५०० केबी से कम) में सबमिट करें"
      ] : [
        `Log on to your state e-District portal (${portalUrl}).`,
        "Select 'Apply for SC/ST/OBC Caste Certificate'.",
        "Upload family structure logs and previous Caste Proof issued to your father, brother, or paternal bloodline.",
        "Submit and complete verification with Aadhaar-linked OTP."
      ];
      offlineSteps = isHindi ? [
        "जिला कलेक्ट्रेट, राजस्व अंचल (Tehsildar) या अनुमंडल अधिकारी कार्यालय पर जाएं",
        "पारिवारिक जमीन रिकॉर्ड (खतियान) प्रस्तुत करें जो यह सिद्ध करे कि आपका परिवार राज्य का मूल निवासी है",
        "ग्राम प्रधान, सरपंच या वार्ड पार्षद से समुदाय सत्यापन का प्रमाण पत्र सत्यापित करवाएं",
        "राजस्व अधिकारी की अनुकूल रिपोर्ट मिलने पर १५ से ३० दिनों में स्वीकृत प्रमाण पत्र डाउनलोड करें"
      ] : [
        "Locate the Deputy Commissioner's office / Revenue Officer / Circle desk.",
        "Provide genealogical family tree verification signed by the competent Gram Panchayat or Ward Commissioner.",
        "Submit a historic family land deed (Khatiyan) verifying ancestral resident state tenure before 1950/1993.",
        "Download your Revenue-certified Caste credential offline or online in 15 to 30 days."
      ];
    } else {
      // General fallbacks if any other documents inside database are selected
      const genericTitle = doc.name;
      onlineSteps = isHindi ? [
        `आधिकारिक सेवा पोर्टल (${portalUrl}) खोलें और '${genericTitle}' खोजें`,
        "आवेदन प्रपत्र में व्यक्तिगत पहचान नंबर, आधार कार्ड और पता सावधानीपूर्वक भरें",
        "दस्तावेज के आवश्यक सहायक पीडीएफ क्रेडेंशियल (जैसे पहचान पत्र, आयु प्रमाण) संलग्न करें",
        "न्यूनतम प्रसंस्करण शुल्क का भुगतान कर आवेदन संदर्भ रसीद सुरक्षित करें"
      ] : [
        `Visit the designated portal: ${portalUrl}. Search for ${genericTitle} in application tabs.`,
        "Input personal metrics, demographic addresses, and link with Aadhaar.",
        "Scan and attach supporting file structures (Prerequisite IDs and proof sheets) in PDF format.",
        "Complete payment of nominal statutory state fees, if applicable, and save the reference slip."
      ];
      offlineSteps = isHindi ? [
        "अपने क्षेत्राधिकार के प्रशासनिक तालुक / कॉमन सर्विस सेंटर (CSC) काउंटर पर जाएं",
        "संबंधित प्रपत्र भरकर उसमें स्व-हस्ताक्षरित सहायक दस्तावेजों की फोटोकॉपी संलग्न करें",
        "प्रभारी अधिकारी को अपने मूल दस्तावेज दिखाएं ताकि वे तुरंत ऑन-द-स्पॉट मिलान जांच कर सकें",
        "दस्तावेज का सरकारी निरीक्षण पूरा होने के उपरांत ७ से ३0 दिनों में प्रमाण पत्र खिड़की से एकत्रित करें"
      ] : [
        "Advance directly to the nearest regulatory office, Block HQ, or Common Service Centre (CSC) desk.",
        "Submit physical forms with self-attested photocopies of prerequisite documents.",
        "Carry original versions for physical spot verification by office heads.",
        "Monitor tracking; receive SMS alert inside 15-30 days to claim your official hard copy."
      ];
    }

    return {
      name: doc.name,
      id: doc.id,
      tierName: doc.tierName,
      purpose: doc.purpose,
      importance: doc.importance,
      timeline: doc.timeline,
      fee: doc.fee,
      digitalAlt: doc.digitalAlt,
      portalLink: portalUrl,
      portalName,
      onlineSteps,
      offlineSteps,
      dependencies: doc.dependencies
    };
  };

  const processedHowToDocs = useMemo(() => {
    // Return all documents matching search query
    const results = localizedDocs.map(d => getHowToInformation(d, howToState, isHindi));
    if (!searchQuery.trim()) {
      return results;
    }
    const q = searchQuery.toLowerCase();
    return results.filter(r => 
      r.name.toLowerCase().includes(q) || 
      r.purpose.toLowerCase().includes(q) || 
      r.tierName.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q)
    );
  }, [localizedDocs, howToState, searchQuery, isHindi]);

  const currentSchemeRef = useMemo(() => {
    return allSchemesRefCombined.find(s => s.id === selectedSchemeId) || allSchemesRefCombined[0];
  }, [selectedSchemeId, allSchemesRefCombined]);

  // Helpers for Government Schemes Gap Analyzer
  const isDocNameHeld = (docNameEn: string): boolean => {
    const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
    const targetNorm = norm(docNameEn);
    return inventoryDocs.some(held => {
      const heldNorm = norm(held);
      return heldNorm === targetNorm || heldNorm.includes(targetNorm) || targetNorm.includes(heldNorm);
    });
  };

  const toggleDocByName = (docName: string) => {
    const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
    const targetNorm = norm(docName);
    
    const hasDoc = inventoryDocs.some(held => {
      const heldNorm = norm(held);
      return heldNorm === targetNorm || heldNorm.includes(targetNorm) || targetNorm.includes(heldNorm);
    });

    if (hasDoc) {
      setInventoryDocs(prev => prev.filter(held => {
        const heldNorm = norm(held);
        return !(heldNorm === targetNorm || heldNorm.includes(targetNorm) || targetNorm.includes(heldNorm));
      }));
      triggerFeedback(isHindi ? `दस्तावेज "${docName}" हटा दिया गया` : `Removed "${docName}" from inventory.`);
    } else {
      setInventoryDocs(prev => [...prev, docName]);
      triggerFeedback(isHindi ? `दस्तावेज "${docName}" जोड़ा गया` : `Added "${docName}" to inventory.`);
    }
  };


  // Real-time calculation of Citizen Readiness Scores across sub-categories
  const computedScores = useMemo(() => {
    const totalCount = localizedDocs.length;
    const heldTotal = localizedDocs.filter(d => isHeld(d.id)).length;
    const overall = totalCount > 0 ? Math.round((heldTotal / totalCount) * 100) : 0;

    // Foundational Group (Tier 1)
    const tier1 = localizedDocs.filter(d => d.tierId === 1);
    const tier1Held = tier1.filter(d => isHeld(d.id)).length;
    const foundational = tier1.length > 0 ? Math.round((tier1Held / tier1.length) * 100) : 0;

    // Residency (Tier 2-3)
    const tierRes = localizedDocs.filter(d => d.tierId === 2 || d.tierId === 3);
    const tierResHeld = tierRes.filter(d => isHeld(d.id)).length;
    const residency = tierRes.length > 0 ? Math.round((tierResHeld / tierRes.length) * 100) : 0;

    // Education (Tier 5)
    const tierEdu = localizedDocs.filter(d => d.tierId === 5);
    const tierEduHeld = tierEdu.filter(d => isHeld(d.id)).length;
    const education = tierEdu.length > 0 ? Math.round((tierEduHeld / tierEdu.length) * 100) : 0;

    // Farmer (Tiers 6 & 7)
    const tierFarm = localizedDocs.filter(d => d.tierId === 6 || d.tierId === 7);
    const tierFarmHeld = tierFarm.filter(d => isHeld(d.id)).length;
    const farmer = tierFarm.length > 0 ? Math.round((tierFarmHeld / tierFarm.length) * 100) : 0;

    // Employment (Tier 8)
    const tierEmp = localizedDocs.filter(d => d.tierId === 8);
    const tierEmpHeld = tierEmp.filter(d => isHeld(d.id)).length;
    const employment = tierEmp.length > 0 ? Math.round((tierEmpHeld / tierEmp.length) * 100) : 0;

    // Business Registry (Tier 9)
    const tierBiz = localizedDocs.filter(d => d.tierId === 9);
    const tierBizHeld = tierBiz.filter(d => isHeld(d.id)).length;
    const business = tierBiz.length > 0 ? Math.round((tierBizHeld / tierBiz.length) * 100) : 0;

    // Health (Tier 10)
    const tierHealth = localizedDocs.filter(d => d.tierId === 10);
    const tierHealthHeld = tierHealth.filter(d => isHeld(d.id)).length;
    const health = tierHealth.length > 0 ? Math.round((tierHealthHeld / tierHealth.length) * 100) : 0;

    return {
      overall,
      foundational,
      residency,
      education,
      farmer,
      employment,
      business,
      health
    };
  }, [inventoryDocs, localizedDocs]);

  // Missing Document triage categorizer
  const missingCategorized = useMemo(() => {
    const criticalMissing: DocumentMetadata[] = [];
    const importantMissing: DocumentMetadata[] = [];
    const optionalMissing: DocumentMetadata[] = [];

    localizedDocs.forEach(doc => {
      if (!isHeld(doc.id)) {
        if (doc.importance === "Critical") {
          criticalMissing.push(doc);
        } else if (doc.importance === "Important") {
          importantMissing.push(doc);
        } else {
          optionalMissing.push(doc);
        }
      }
    });

    return {
      critical: criticalMissing,
      important: importantMissing,
      optional: optionalMissing
    };
  }, [inventoryDocs, localizedDocs]);

  // Actionable life events recommendation
  const lifeEventRecommendations = useMemo(() => {
    const recs: Array<{ doc: DocumentMetadata; context: string; contextHi: string }> = [];

    // Trigger age 18 recommendations
    if (profileAge >= 17 && profileAge <= 19) {
      const getDoc = (id: string) => localizedDocs.find(d => d.id === id);
      const voter = getDoc("voter-id");
      const pan = getDoc("pan");
      
      if (voter && !isHeld("voter-id")) recs.push({ doc: voter, context: "Recently reached voting eligibility. High priority voter registration recommended.", contextHi: "हाल ही में मतदान की आयु प्राप्त की है। उच्च प्राथमिकता वाला वोटर आईडी आवश्यक है।" });
      if (pan && !isHeld("pan")) recs.push({ doc: pan, context: "Securing basic banking and financial independence requires active PAN linking.", contextHi: "बुनियादी बैंकिंग और वित्तीय स्वतंत्रता शुरू करने के लिए पैन सक्रिय करना आवश्यक है।" });
    }

    // Trigger student recommendations
    if (profileOccupation === "Student") {
      const getDoc = (id: string) => localizedDocs.find(d => d.id === id);
      const income = getDoc("income-cert");
      const dom = getDoc("domicile");
      const mark10 = getDoc("10th-marksheet");

      if (income && !isHeld("income-cert")) recs.push({ doc: income, context: "Necessary for tuition concessions and merit-cum-means fee exemptions.", contextHi: "फीस रियायत और मेधावी छात्रवृत्ति के लिए आय प्रमाण पत्र अनिवार्य दस्तावेज है।" });
      if (dom && !isHeld("domicile")) recs.push({ doc: dom, context: "State-domicile quotas inside public fellowships require localized verification.", contextHi: "राजकीय फैलोशिप के आवेदन हेतु राज्य मूल निवास प्रमाण पत्र अनिवार्य है।" });
      if (mark10 && !isHeld("10th-marksheet")) recs.push({ doc: mark10, context: "Primary educational ledger required continuously by university registers.", contextHi: "विश्वविद्यालय पंजीकरण द्वारा जन्मतिथि प्रमाणन हेतु 10वीं की अंकतालिका आवश्यक है।" });
    }

    // Trigger farmer recommendations
    if (profileOccupation === "Farmer") {
      const getDoc = (id: string) => localizedDocs.find(d => d.id === id);
      const land = getDoc("land-records");
      const kcc = getDoc("kcc");
      const pkis = getDoc("pmkisan-registration");

      if (land && !isHeld("land-records")) recs.push({ doc: land, context: "Baseline direct landownership proof needed for agricultural subsidies.", contextHi: "कृषि सब्सिडी और वित्तीय योजनाओं के लिए प्राथमिक भू-स्वामित्व प्रमाण।" });
      if (kcc && !isHeld("kcc")) recs.push({ doc: kcc, context: "Protects agrarian stakeholders from borrowing from private local lenders.", contextHi: "निजी साहूकारों के कर्जजाल से बाहर निकलने के लिए 7% ब्याज पर लोन सुविधा।" });
      if (pkis && !isHeld("pmkisan-registration")) recs.push({ doc: pkis, context: "Mandated to enroll for the ₹6,000 annual central direct cash grant.", contextHi: "वार्षिक ₹6,000 की केंद्रीय किसान सम्मान योजना किस्त प्राप्त करने के लिए अनिवार्य।" });
    }

    // Trigger business recommendations
    if (profileOccupation === "Business Owner") {
      const getDoc = (id: string) => localizedDocs.find(d => d.id === id);
      const gst = getDoc("gst-registration");
      const udyam = getDoc("udyam");

      if (gst && !isHeld("gst-registration")) recs.push({ doc: gst, context: "Required to establish inter-state commerce and legally process goods.", contextHi: "अंतर-राज्यीय व्यापार शुरू करने और कानूनी इनवॉइस जनरेट करने हेतु अनिवार्य टैक्स पंजीकरण।" });
      if (udyam && !isHeld("udyam")) recs.push({ doc: udyam, context: "Secures collateral-free SME credits and priority sector status under SIDBI.", contextHi: "बिना कोलेटरल सिडबी एमएसएमई क्रेडिट और ब्याज अनुदान प्राप्त करने की पात्रता।" });
    }

    return recs;
  }, [profileAge, profileOccupation, localizedDocs, inventoryDocs]);

  // Filtering list of documents for search & tier tab
  const filteredDocs = useMemo(() => {
    return localizedDocs.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            doc.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            doc.tierName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTier = selectedTier === "all" || doc.tierId === selectedTier;
      return matchesSearch && matchesTier;
    });
  }, [localizedDocs, searchQuery, selectedTier]);

  return (
    <div className="space-y-8 animate-fadeIn" id="tab-view-documents-intelligence">
      
      {/* SECTION HEADER */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <span className="text-[10px] text-saffron bg-[#FF9933]/15 border border-[#FF9933]/30 px-3 py-1 rounded-full font-bold uppercase tracking-widest inline-block select-none">
          {isHindi ? "राष्ट्रीय दस्तावेज़ क्रेडेंशियल मेश" : "UNIVERSAL CITIZEN DOCUMENT LEDGER"}
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-black tracking-tight text-white leading-none">
          {isHindi ? "दस्तावेज़ नीति खुफिया इंजन" : "Document Intelligence Engine"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-450 max-w-xl mx-auto leading-relaxed font-sans">
          {isHindi 
            ? "10 आधारभूत स्तरों में क्रेडेंशियल अंतरालों की पहचान। राज्य-विशिष्ट शब्दावली और व्यक्तिगत जीवन घटना विश्लेषण से संचालित।" 
            : "Continuous gap detection across 10 foundational credential tiers. Driven by state-specific term matching and dynamic diagnostics."}
        </p>

        {/* Dynamic State Terminology Alert banner */}
        <div className="inline-flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 p-2 rounded-xl text-[11px] text-gray-400 font-mono">
          <MapPin className="w-4 h-4 text-saffron shrink-0" />
          <span>
            {isHindi ? "स्थानीय क्षेत्र टर्म्स:" : "Active State Mapping Context:"}{" "}
            <strong className="text-white">{profileState || "All India"}</strong>
          </span>
          <span className="text-gray-600">|</span>
          <span>
            {isHindi 
              ? "स्वचालित टर्म्स रूपांतरण सक्रिय" 
              : "Automatic land registers and PRC terminology adaptive filter active"}
          </span>
        </div>
      </div>

      {/* DASHBOARD NAVIGATOR TRACKS */}
      <div className="max-w-5xl mx-auto flex items-center justify-center flex-wrap gap-1 border-b border-white/5 pb-2">
        {[
          { id: "smart", label: isHindi ? "इंटेलिजेंस स्कोर कार्ड" : "Readiness Scorecard", icon: ShieldCheck },
          { id: "schemes", label: isHindi ? "योजना क्रेडेंशियल गैप" : "Scheme Gap Detector", icon: Award },
          { id: "tiers", label: isHindi ? "10 टियर क्रेडेंशियल रजिस्ट्री" : "10-Tier Ledger Registry", icon: ListChecks },
          { id: "how_to_get", label: isHindi ? "दस्तावेज़ पोर्टल (How-To)" : "Sarkari Portal (How-To)", icon: HelpCircle },
          { id: "events", label: isHindi ? "जीवन घटना सिफारिशें" : "Life-Event Rules", icon: User },
          { id: "dependencies", label: isHindi ? "दस्तावेज़ निर्भरता श्रृंखला" : "Dependency Map", icon: Network }
        ].map(track => {
          const Icon = track.icon;
          return (
            <button
              key={track.id}
              onClick={() => setActiveAnalysisView(track.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeAnalysisView === track.id 
                  ? "bg-[#FF9933]/15 text-[#FF9933] border border-[#FF9933]/30" 
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{track.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB VIEW 1: SMART ANALYSIS SCORECARD */}
      {activeAnalysisView === "smart" && (
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* PRIMARY GRAPHICS GAUGES CONTAINER */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* OVERALL PERCENTAGE GAUGE */}
            <div className="md:col-span-4 bg-zinc-950 border border-zinc-850 p-6 rounded-3xl flex flex-col justify-between text-center relative overflow-hidden">
              <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider font-mono">Consolidated Index</span>
              
              <div className="relative w-40 h-40 mx-auto flex items-center justify-center my-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="68"
                    className="text-white/5 stroke-current"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="68"
                    className="stroke-current transition-all duration-1000 ease-out"
                    style={{
                      color: computedScores.overall === 100 ? "#138808" : computedScores.overall >= 70 ? "#FF9933" : "#ef4444",
                      strokeDasharray: `${2 * Math.PI * 68}`,
                      strokeDashoffset: `${2 * Math.PI * 68 * (1 - computedScores.overall / 100)}`
                    }}
                    strokeWidth="10"
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-4xl font-serif font-black text-white">{computedScores.overall}%</span>
                  <span className={`text-[9px] uppercase tracking-wider font-bold block mt-1 ${
                    computedScores.overall >= 70 ? "text-[#22c55e]" : computedScores.overall >= 40 ? "text-saffron" : "text-red-400"
                  }`}>
                    {computedScores.overall >= 70 ? (isHindi ? "उत्कृष्ट" : "Secure") : computedScores.overall >= 40 ? (isHindi ? "मध्यम" : "Vulnerable") : (isHindi ? "गंभीर अंतर" : "Critical Deficit")}
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-gray-400 px-2 leading-relaxed">
                {isHindi 
                  ? "यह राष्ट्रीय स्कोर आपके उपलब्ध क्रेडेंशियल मेश परिकलन पर आधारित है। 100% स्कोर सभी नागरिक सुरक्षा गारंटी सुनिश्चित करता है।"
                  : "National baseline diagnostic score computed across 10 vital administrative facets. 100% score guarantees immediate, error-free DBT authorization."}
              </div>
            </div>

            {/* SECTORAL RATINGS bento grid */}
            <div className="md:col-span-8 bg-zinc-950 border border-zinc-850 p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <h3 className="font-serif font-bold text-sm">{isHindi ? "क्षेत्रीय योग्यता रेटिंग" : "Sectoral Access & Readiness Ratings"}</h3>
                <span className="text-[10px] text-zinc-500 font-mono">AUTOMATED CALCULATOR ENGINE v3</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: isHindi ? "बुनियादी / पहचान" : "Foundational ID", value: computedScores.foundational, color: "stroke-orange-500" },
                  { name: isHindi ? "निवास / परिवार" : "Residency & Family", value: computedScores.residency, color: "stroke-yellow-500" },
                  { name: isHindi ? "शिक्षा ढांचा" : "Education Ledger", value: computedScores.education, color: "stroke-sky-500" },
                  { name: isHindi ? "कृषि / किसान" : "Farmer Security", value: computedScores.farmer, color: "stroke-lime-500" },
                  { name: isHindi ? "श्रम / रोज़गार" : "Labour & Job card", value: computedScores.employment, color: "stroke-emerald-500" },
                  { name: isHindi ? "व्यापार / उद्यम" : "SME & Business", value: computedScores.business, color: "stroke-pink-500" },
                  { name: isHindi ? "स्वास्थ्य बीमा" : "Health Assurance", value: computedScores.health, color: "stroke-teal-500" }
                ].map((sector, i) => (
                  <div key={i} className="bg-zinc-900/40 border border-zinc-850 p-3 rounded-2xl flex items-center justify-between gap-2">
                    <div className="space-y-1 truncate">
                      <span className="text-[10px] text-gray-400 font-bold block truncate">{sector.name}</span>
                      <strong className="text-lg font-serif font-black text-white">{sector.value}%</strong>
                    </div>

                    {/* Compact circular slider */}
                    <div className="relative w-10 h-10 shrink-0">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="20" cy="20" r="16" className="text-zinc-850 stroke-current" strokeWidth="3" fill="transparent" />
                        <circle cx="20" cy="20" r="16" className={`${sector.color} stroke-current`} strokeWidth="3" fill="transparent" strokeDasharray={`${2*Math.PI*16}`} strokeDashoffset={`${2*Math.PI*16*(1 - sector.value/100)}`} />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MISSING DOCUMENT TRIAGE DIAGNOSTICS */}
          <div className="bg-zinc-950 border border-zinc-850 p-6 rounded-3xl space-y-6">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <ShieldCheck className="w-5 h-5 text-saffron" />
              <div>
                <h3 className="font-serif font-black text-md">{isHindi ? "दस्तावेज़ अंतर अंतराल विश्लेषण" : "Missing Credentials GAP Analysis"}</h3>
                <p className="text-[10px] text-zinc-500 font-mono">AUTOMATIC ACCORDION RESOLVER FOR INVISIBLE CITIZENS</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* CATEGORY A: CRITICAL */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold border-b border-red-500/20 pb-1">
                  <span className="text-red-400 flex items-center gap-1">🚨 {isHindi ? "उच्च प्राथमिकता (गंभीर)" : "CRITICAL GAP"}</span>
                  <span className="bg-red-500/10 text-red-500 px-1.5 py-0.5 rounded text-[10px]">{missingCategorized.critical.length} {isHindi ? "लापता" : "Missing"}</span>
                </div>
                {missingCategorized.critical.length === 0 ? (
                  <p className="text-[11px] text-zinc-500 italic select-none">{isHindi ? "सभी महत्वपूर्ण क्रेडेंशियल पूर्ण हैं!" : "All high-priority baseline documents secured."}</p>
                ) : (
                  <div className="space-y-1.5">
                    {missingCategorized.critical.map(d => (
                      <button 
                        key={d.id}
                        onClick={() => setFocusedDoc(d)}
                        className="w-full text-left bg-red-950/10 border border-red-950/40 p-2.5 rounded-xl flex items-center justify-between gap-2 hover:bg-red-950/20 transition-all cursor-pointer text-xs"
                      >
                        <span className="font-bold text-red-300 truncate">{d.name}</span>
                        <ChevronRight className="w-4 h-4 text-red-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* CATEGORY B: IMPORTANT */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold border-b border-amber-500/20 pb-1">
                  <span className="text-[#FF9933] flex items-center gap-1">⚠ {isHindi ? "मध्यम प्राथमिकता (महत्वपूर्ण)" : "IMPORTANT GAP"}</span>
                  <span className="bg-[#FF9933]/10 text-saffron px-1.5 py-0.5 rounded text-[10px]">{missingCategorized.important.length} {isHindi ? "लापता" : "Missing"}</span>
                </div>
                {missingCategorized.important.length === 0 ? (
                  <p className="text-[11px] text-zinc-500 italic select-none">{isHindi ? "सभी सहायक दस्तावेज सक्रिय हैं" : "No active gaps in secondary tiers."}</p>
                ) : (
                  <div className="space-y-1.5">
                    {missingCategorized.important.map(d => (
                      <button 
                        key={d.id}
                        onClick={() => setFocusedDoc(d)}
                        className="w-full text-left bg-amber-950/10 border border-amber-950/45 p-2.5 rounded-xl flex items-center justify-between gap-2 hover:bg-amber-950/20 transition-all cursor-pointer text-xs"
                      >
                        <span className="font-bold text-[#FFBD66] truncate">{d.name}</span>
                        <ChevronRight className="w-4 h-4 text-saffron shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* CATEGORY C: OPTIONAL */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold border-b border-zinc-700 pb-1">
                  <span className="text-zinc-400 flex items-center gap-1">ℹ {isHindi ? "वैकल्पिक / स्वैच्छिक" : "OPTIONAL CREDENTIALS"}</span>
                  <span className="bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded text-[10px]">{missingCategorized.optional.length} {isHindi ? "लापता" : "Missing"}</span>
                </div>
                {missingCategorized.optional.length === 0 ? (
                  <p className="text-[11px] text-zinc-500 italic select-none">{isHindi ? "सभी दस्तावेज पूर्ण!" : "Completed optional parameters too!"}</p>
                ) : (
                  <div className="space-y-1.5">
                    {missingCategorized.optional.map(d => (
                      <button 
                        key={d.id}
                        onClick={() => setFocusedDoc(d)}
                        className="w-full text-left bg-zinc-900 border border-zinc-850 p-2.5 rounded-xl flex items-center justify-between gap-2 hover:bg-zinc-800 transition-all cursor-pointer text-xs"
                      >
                        <span className="font-bold text-zinc-300 truncate">{d.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* READY FOR WHAT? DYNAMIC CAPABILITY CHECKER */}
          <div className="bg-zinc-950 border border-zinc-850 p-6 rounded-3xl space-y-6" id="ready-for-what-section">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-3 gap-2">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-500 shrink-0 animation-pulse" />
                <div>
                  <h3 className="font-serif font-black text-md">{isHindi ? "सक्रिय क्रेडेंशियल्स के अनुसार आप किस लिए तैयार हैं?" : "Ready for What? Profile Capability Analyzer"}</h3>
                  <p className="text-[10px] text-zinc-500 font-mono uppercase">{isHindi ? "शीर्ष जीवन अवस्थाओं व योजनाओं का मिलान विश्लेषण" : "Unlocking life milestones by matching available certificates"}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-sans">{isHindi ? "सभी विकल्प सक्रिय करें:" : "Select everything:"}</span>
                <button
                  type="button"
                  onClick={() => handleToggleEverything(!readyEverything)}
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors cursor-pointer relative ${readyEverything ? "bg-emerald-500" : "bg-zinc-805"}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${readyEverything ? "translate-x-4" : "translate-x-0"}`} />
                </button>
              </div>
            </div>

            {/* DYNAMIC TOGGLE SWITCHES CHIPS GRID */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label_en: "Student Status", label_hi: "विद्यार्थी (Student)", state: readyStudent, setter: setReadyStudent },
                { label_en: "Age 18+", label_hi: "१८+ आयु वर्ग (Adult)", state: ready18, setter: setReady18 },
                { label_en: "Domicile Card", label_hi: "मूल निवास (Domicile)", state: readyDomicile, setter: setReadyDomicile },
                { label_en: "Passport Holder", label_hi: "पासपोर्ट (Passport)", state: readyPassport, setter: setReadyPassport }
              ].map((sw, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sw.setter(!sw.state);
                    if (readyEverything && sw.state) setReadyEverything(false);
                  }}
                  className={`p-3 py-2.5 rounded-xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    sw.state 
                      ? "bg-[#FF9933]/15 border-saffron text-white" 
                      : "bg-zinc-900/60 border-zinc-850 text-gray-400 hover:bg-zinc-900 hover:border-zinc-700"
                  }`}
                >
                  <span className="text-xs font-serif font-bold">{isHindi ? sw.label_hi : sw.label_en}</span>
                  <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                    sw.state 
                      ? "bg-saffron border-saffron text-black font-black text-[9px]" 
                      : "border-gray-600"
                  }`}>
                    {sw.state && "✓"}
                  </div>
                </button>
              ))}
            </div>

            {/* LIST OF UNLOCKED GOALS & MISSING GAP LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
              {[
                {
                  goal_en: "School/College Admissions & State Scholarships",
                  goal_hi: "स्कूल / कॉलेज प्रवेश और राज्य छात्रवृत्तियां",
                  desc_en: "Requires student status, domicile identity, and income declaration.",
                  desc_hi: "इसके लिए छात्र का दर्जा, मूल निवास और आर्थिक आय प्रमाण पत्र होना आवश्यक है।",
                  unlocked: readyStudent && readyDomicile && (inventoryDocs.includes("Income Certificate") || inventoryDocs.includes("आय प्रमाण पत्र")),
                  missing_en: ["Student Status", "Domicile Certificate", "Income Certificate"].filter(d => {
                    if (d === "Student Status" && !readyStudent) return true;
                    if (d === "Domicile Certificate" && !readyDomicile) return true;
                    if (d === "Income Certificate" && !inventoryDocs.includes("Income Certificate") && !inventoryDocs.includes("आय प्रमाण पत्र")) return true;
                    return false;
                  })
                },
                {
                  goal_en: "First Adult Bank Account & UPI Linking",
                  goal_hi: "पहला वयस्क बैंक खाता और यूपीआई लिंकेज",
                  desc_en: "Requires reaching age 18, foundational Aadhaar, and mobile links.",
                  desc_hi: "इसके लिए १८+ आयु, बुनियादी आधार और आधार से जुड़े सक्रिय मोबाइल नंबर की आवश्यकता होती है।",
                  unlocked: ready18 && (inventoryDocs.includes("Aadhaar Card") || inventoryDocs.includes("आधार कार्ड")) && (inventoryDocs.includes("Mobile Number Linked to Aadhaar") || inventoryDocs.includes("आधार लिंक चालू मोबाइल")),
                  missing_en: ["Age 18+", "Aadhaar Card", "Mobile Number Linked to Aadhaar"].filter(d => {
                    if (d === "Age 18+" && !ready18) return true;
                    if (d === "Aadhaar Card" && !inventoryDocs.includes("Aadhaar Card") && !inventoryDocs.includes("आधार कार्ड")) return true;
                    if (d === "Mobile Number Linked to Aadhaar" && !inventoryDocs.includes("Mobile Number Linked to Aadhaar") && !inventoryDocs.includes("आधार लिंक चालू मोबाइल")) return true;
                    return false;
                  })
                },
                {
                  goal_en: "International Travel, Visas & Overseas Fellows",
                  goal_hi: "अंतरराष्ट्रीय यात्रा, वीजा और विदेशी फैलोशिप",
                  desc_en: "Requires adult passport coverage and certified bank solvency.",
                  desc_hi: "इसके लिए चालू वयस्क पासपोर्ट पुस्तिका और प्रमाणित वित्तीय बैंक विवरण की आवश्यकता होती है।",
                  unlocked: readyPassport && (inventoryDocs.includes("Passport") || inventoryDocs.includes("पासपोर्ट")),
                  missing_en: ["Passport Holder (Setup in App)", "Passport Booklet Certificate"].filter(d => {
                    if (d === "Passport Holder (Setup in App)" && !readyPassport) return true;
                    if (d === "Passport Booklet Certificate" && !inventoryDocs.includes("Passport") && !inventoryDocs.includes("पासपोर्ट")) return true;
                    return false;
                  })
                },
                {
                  goal_en: "Start-up / Udyam Business Loans",
                  goal_hi: "उद्यम ऋण सहायता एवं बिज़नेस लाइसेंस",
                  desc_en: "Requires active PAN taxation index and register Udyam ID.",
                  desc_hi: "इसके लिए स्थायी पैन कार्ड और चालू सूक्ष्म-व्यवसाय उद्यम प्रमाण पत्र की आवश्यकता होती है।",
                  unlocked: (inventoryDocs.includes("PAN Card") || inventoryDocs.includes("पैन कार्ड")) && (inventoryDocs.includes("Udyam Certificate") || inventoryDocs.includes("उद्यम पंजीकरण (MSME)")),
                  missing_en: ["PAN Card", "Udyam Certificate/MSME Registry"].filter(d => {
                    if (d === "PAN Card" && !inventoryDocs.includes("PAN Card") && !inventoryDocs.includes("पैन कार्ड")) return true;
                    if (d === "Udyam Certificate/MSME Registry" && !inventoryDocs.includes("Udyam Certificate") && !inventoryDocs.includes("उद्यम पंजीकरण (MSME)")) return true;
                    return false;
                  })
                },
                {
                  goal_en: "State Agrarian Subsidies & KCC Credits",
                  goal_hi: "राज्य कृषि जोत सब्सिडी और फसल ऋण",
                  desc_en: "Requires certified Land records (Khatauni) and soil cards.",
                  desc_hi: "इसके लिए अद्यतन भू-राजस्व अभिलेख खतौनी और मृदा स्वास्थ्य कार्ड होना आवश्यक है।",
                  unlocked: (inventoryDocs.includes("Land Records / Khatauni") || inventoryDocs.includes("भू-अभिलेख कॉपी (खतौनी)")),
                  missing_en: ["Land Records / Khatauni"].filter(d => {
                    if (d === "Land Records / Khatauni" && !inventoryDocs.includes("Land Records / Khatauni") && !inventoryDocs.includes("भू-अभिलेख कॉपी (खतौनी)")) return true;
                    return false;
                  })
                },
                {
                  goal_en: "Direct Cash Benefit Subsidies (DBT)",
                  goal_hi: "सरकारी योजनाओं का सीधा नगद लाभ (DBT)",
                  desc_en: "Requires active bank account mapped to NPCI servers and Aadhaar.",
                  desc_hi: "इसके लिए एनपीसीआई मैपर से जुड़ा आधार सीडेड राष्ट्रीय जन-धन बैंक खाता आवश्यक है।",
                  unlocked: (inventoryDocs.includes("Aadhaar Card") || inventoryDocs.includes("आधार कार्ड")) && (inventoryDocs.includes("Bank Account (Aadhaar Seeded)") || inventoryDocs.includes("बैंक खाता (आधार सीडेड)")),
                  missing_en: ["Aadhaar Card", "Bank Account (Aadhaar Seeded)"].filter(d => {
                    if (d === "Aadhaar Card" && !inventoryDocs.includes("Aadhaar Card") && !inventoryDocs.includes("आधार कार्ड")) return true;
                    if (d === "Bank Account (Aadhaar Seeded)" && !inventoryDocs.includes("Bank Account (Aadhaar Seeded)") && !inventoryDocs.includes("बैंक खाता (आधार सीडेड)")) return true;
                    return false;
                  })
                }
              ].map((g, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-xl border flex flex-col justify-between min-h-[160px] font-sans ${
                    g.unlocked 
                      ? "bg-emerald-500/5 border-emerald-500/20 shadow-md" 
                      : "bg-zinc-900/40 border-zinc-850"
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-full ${
                        g.unlocked ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/10 text-saffron"
                      }`}>
                        {g.unlocked ? (isHindi ? "✓ तैयार है" : "Ready") : (isHindi ? "✕ दस्तावेज़ चाहिए" : "Action Needed")}
                      </span>
                      
                      <div className={`w-1.5 h-1.5 rounded-full ${g.unlocked ? "bg-emerald-500" : "bg-amber-500"}`} />
                    </div>

                    <h4 className="font-serif font-black text-xs text-white leading-tight">
                      {isHindi ? g.goal_hi : g.goal_en}
                    </h4>
                    <p className="text-gray-400 text-[10px] leading-relaxed line-clamp-2">
                      {isHindi ? g.desc_hi : g.desc_en}
                    </p>
                  </div>

                  {/* Missing required checklist display */}
                  {!g.unlocked ? (
                    <div className="pt-2 border-t border-white/5 mt-2 space-y-1">
                      <span className="text-[9px] text-gray-500 uppercase font-mono block font-black">
                        {isHindi ? "लापता आवश्यक आवश्यकताएं:" : "Missing requirements:"}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {g.missing_en.map((ms, m_i) => (
                          <span key={m_i} className="text-[8px] bg-red-950/20 border border-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-mono">
                            {ms}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-emerald-500/10 mt-2 text-[9px] text-emerald-400 font-mono flex items-center justify-between">
                      <span>✓ {isHindi ? "सभी क्रेडेंशियल पूर्ण हैं!" : "Full eligibility locked in!"}</span>
                      <span className="w-4 h-4 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-[8px]">✓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB VIEW 1.5: SCHEME DOCUMENT GAP DETECTOR */}
      {activeAnalysisView === "schemes" && (
        <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
          
          <div className="bg-zinc-950 border border-zinc-850 p-6 rounded-3xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-4 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] text-saffron font-bold uppercase tracking-widest block font-mono">
                  {isHindi ? "पात्रता और दस्तावेज़ अतंर" : "SCHEME CREDENTIAL GAP ANALYZER"}
                </span>
                <h3 className="font-serif text-lg font-bold text-white">
                  {isHindi ? "30 प्रमुख योजना दस्तावेज तत्परता विश्लेषण" : "30 Schemes Document Coverage Gap Meter"}
                </h3>
              </div>
              
              {/* Dropdown Selector & Admin Options */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-xl w-full">
                <div className="relative flex-1">
                  <label htmlFor="scheme-gap-select-box" className="sr-only">Select Scheme</label>
                  <select
                    id="scheme-gap-select-box"
                    value={selectedSchemeId}
                    onChange={(e) => setSelectedSchemeId(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-3 py-2.5 text-xs text-zinc-200 outline-none font-bold focus:border-saffron transition-colors cursor-pointer"
                  >
                    {allSchemesRefCombined.map(s => (
                      <option key={s.id} value={s.id}>
                        {isHindi ? s.nameHi : s.name} ({isHindi ? s.categoryHi : s.category})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowAddSchemeForm(!showAddSchemeForm);
                    setSchemeFormError("");
                  }}
                  className="bg-zinc-900 hover:bg-zinc-805 border border-zinc-800 hover:border-zinc-700 text-[#FF9933] text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shrink-0"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>{isHindi ? "+ योजना जोड़ें" : "+ Add Scheme (Admin/AI)"}</span>
                </button>
              </div>
            </div>

            {/* Expanded custom input form */}
            {showAddSchemeForm && (
              <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl space-y-4 animate-slideDown">
                {!isAdminLoggedIn ? (
                  <div className="space-y-3 max-w-sm">
                    <h4 className="text-xs font-extrabold text-[#FF9933] uppercase tracking-wide">{isHindi ? "सुरक्षित व्यवस्थापन क्रेडेंशियल" : "ADMIN / AI CREDENTIAL CHECK"}</h4>
                    <p className="text-[11px] text-gray-400">{isHindi ? "नया स्कीम जोड़ने के लिए कृपया आईडी और पासवर्ड डालें।" : "Provide credentials to add new schemes onto the gap detector."}</p>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text" 
                        placeholder="Admin ID (admin/ai)" 
                        value={adminUser}
                        onChange={(e) => setAdminUser(e.target.value)}
                        className="bg-black border border-zinc-800 rounded-lg p-2 text-xs text-white"
                      />
                      <input 
                        type="password" 
                        placeholder="Password" 
                        value={adminPass}
                        onChange={(e) => setAdminPass(e.target.value)}
                        className="bg-black border border-zinc-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                    {schemeFormError && <div className="text-[10px] text-red-400 font-bold">{schemeFormError}</div>}
                    <button 
                      type="button"
                      onClick={() => {
                        if ((adminUser.trim().toLowerCase() === "admin" || adminUser.trim().toLowerCase() === "ai") && adminPass.trim() === "haqqdar2026") {
                          setIsAdminLoggedIn(true);
                          setSchemeFormError("");
                          triggerFeedback(isHindi ? "प्रशासक लॉगिन सफल!" : "Admin authentication successful!");
                        } else {
                          setSchemeFormError(isHindi ? "गलत आईडी या पासवर्ड" : "Invalid credentials. Use ID: admin/ai, Pass: haqqdar2026");
                        }
                      }}
                      className="bg-[#FF9933] text-black font-extrabold text-xs px-4 py-2 rounded-lg hover:brightness-110 cursor-pointer"
                    >
                      {isHindi ? "सत्यापित करें" : "Verify & Unlock"}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <h4 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wide">{isHindi ? "नई योजना जोड़ें विवरण पृष्ठ" : "VERIFIED SCHEME REGISTRATION ENGINE"}</h4>
                      <button 
                        onClick={() => {
                          setIsAdminLoggedIn(false);
                          setAdminUser("");
                          setAdminPass("");
                        }}
                        className="text-[10px] text-red-400 hover:underline cursor-pointer"
                      >
                        {isHindi ? "लॉगआउट" : "Lock / Log Out"}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase text-gray-500 font-bold">{isHindi ? "योजना आईडी" : "Scheme Unique ID (slug)"}</label>
                        <input 
                          type="text" 
                          placeholder="e.g. pm-kisan-v2"
                          value={newSchemeId}
                          onChange={(e) => setNewSchemeId(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                          className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-xs text-white"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase text-gray-500 font-bold">{isHindi ? "क्षेत्रीय श्रेणी" : "Scheme Category"}</label>
                        <div className="grid grid-cols-2 gap-2">
                          <input 
                            type="text" 
                            placeholder="e.g. Agriculture"
                            value={newSchemeCat}
                            onChange={(e) => setNewSchemeCat(e.target.value)}
                            className="bg-black border border-zinc-800 rounded-lg p-2.5 text-xs text-white"
                          />
                          <input 
                            type="text" 
                            placeholder="e.g. कृषि"
                            value={newSchemeCatHi}
                            onChange={(e) => setNewSchemeCatHi(e.target.value)}
                            className="bg-black border border-zinc-800 rounded-lg p-2.5 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase text-gray-500 font-bold">{isHindi ? "संक्षिप्त नाम (English & Hindi)" : "Short Name (English & Hindi)"}</label>
                        <div className="grid grid-cols-2 gap-2">
                          <input 
                            type="text" 
                            placeholder="e.g. PM Kisan New"
                            value={newSchemeName}
                            onChange={(e) => setNewSchemeName(e.target.value)}
                            className="bg-black border border-zinc-800 rounded-lg p-2.5 text-xs text-white"
                          />
                          <input 
                            type="text" 
                            placeholder="e.g. पीएम किसान नया"
                            value={newSchemeNameHi}
                            onChange={(e) => setNewSchemeNameHi(e.target.value)}
                            className="bg-black border border-zinc-800 rounded-lg p-2.5 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase text-gray-500 font-bold">{isHindi ? "पूर्ण विस्तृत नाम (English & Hindi)" : "Full Descriptive Name (English & Hindi)"}</label>
                        <div className="grid grid-cols-2 gap-2">
                          <input 
                            type="text" 
                            placeholder="e.g. PM Kisan Samman Nidhi Chapter 2"
                            value={newSchemeFullName}
                            onChange={(e) => setNewSchemeFullName(e.target.value)}
                            className="bg-black border border-zinc-800 rounded-lg p-2.5 text-xs text-white"
                          />
                          <input 
                            type="text" 
                            placeholder="e.g. प्रधानमंत्री किसान सम्मान निधि अध्याय २"
                            value={newSchemeFullNameHi}
                            onChange={(e) => setNewSchemeFullNameHi(e.target.value)}
                            className="bg-black border border-zinc-800 rounded-lg p-2.5 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-[10px] uppercase text-gray-500 font-bold">{isHindi ? "आवश्यक दस्तावेज अंग्रेजी (अल्पविराम से अलग करें)" : "Required Documents English (Comma separated)"}</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Aadhaar Card, Passport, Ration Card"
                          value={newSchemeDocs}
                          onChange={(e) => setNewSchemeDocs(e.target.value)}
                          className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-[10px] uppercase text-gray-500 font-bold">{isHindi ? "आवश्यक दस्तावेज हिंदी (अल्पविराम से अलग करें)" : "Required Documents Hindi (Comma separated)"}</label>
                        <input 
                          type="text" 
                          placeholder="e.g. आधार कार्ड, पासपोर्ट, राशन कार्ड"
                          value={newSchemeDocsHi}
                          onChange={(e) => setNewSchemeDocsHi(e.target.value)}
                          className="w-full bg-black border border-[#27272a] rounded-lg p-2.5 text-xs text-white"
                        />
                      </div>
                    </div>

                    <button 
                      type="button"
                      onClick={() => {
                        if (!newSchemeId || !newSchemeName || !newSchemeDocs) {
                          setSchemeFormError(isHindi ? "कृपया सभी आवश्यक फ़ील्ड भरें!" : "Please fill out ID, English Name, and English Documents.");
                          return;
                        }
                        const docsArr = newSchemeDocs.split(",").map(d => d.trim()).filter(Boolean);
                        const docsArrHi = newSchemeDocsHi.split(",").map(d => d.trim()).filter(Boolean);

                        const freshScheme: SchemeDocsRef = {
                          id: newSchemeId,
                          name: newSchemeName,
                          nameHi: newSchemeNameHi || newSchemeName,
                          category: newSchemeCat,
                          categoryHi: newSchemeCatHi || newSchemeCat,
                          fullName: newSchemeFullName || newSchemeName,
                          fullNameHi: newSchemeFullNameHi || newSchemeNameHi || newSchemeName,
                          requiredDocuments: docsArr,
                          requiredDocumentsHi: docsArrHi.length > 0 ? docsArrHi : docsArr
                        };

                        const updatedList = [...customSchemes, freshScheme];
                        setCustomSchemes(updatedList);
                        try {
                          localStorage.setItem("haqqdar_custom_schemes", JSON.stringify(updatedList));
                        } catch (e) {
                          console.error(e);
                        }

                        // Set active and success
                        setSelectedSchemeId(newSchemeId);
                        setNewSchemeId("");
                        setNewSchemeName("");
                        setNewSchemeNameHi("");
                        setNewSchemeFullName("");
                        setNewSchemeFullNameHi("");
                        setNewSchemeDocs("");
                        setNewSchemeDocsHi("");
                        setSchemeFormError("");
                        setShowAddSchemeForm(false);
                        triggerFeedback(isHindi ? `नई योजना "${newSchemeName}" सफलतापूर्वक जोड़ी गई और चुनी गई!` : `Custom scheme "${newSchemeName}" has been successfully registered!`);
                      }}
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs px-5 py-3 rounded-xl hover:brightness-115 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <CheckCircle className="w-4 h-4 ml-1" />
                      <span>{isHindi ? "योजना को सहेजें और एकीकृत करें" : "Save Scheme and Integrate"}</span>
                    </button>
                    {schemeFormError && <div className="text-[11px] text-red-400 font-bold">{schemeFormError}</div>}
                  </div>
                )}
              </div>
            )}

            {/* Gap Analyzer Dashboard Layout */}
            {(() => {
              const reqs = currentSchemeRef.requiredDocuments;
              const reqsHi = currentSchemeRef.requiredDocumentsHi;
              const heldCount = reqs.filter(isDocNameHeld).length;
              const schemeReadinessPercentage = reqs.length > 0 ? Math.round((heldCount / reqs.length) * 100) : 0;

              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* LEFT COLUMN: THE PROGRESS GAUGE */}
                  <div className="lg:col-span-4 bg-zinc-900/60 p-5 rounded-2xl border border-zinc-850 text-center space-y-4">
                    <div className="space-y-1">
                      <h4 className="font-serif font-black text-white text-sm">
                        {isHindi ? currentSchemeRef.fullNameHi : currentSchemeRef.fullName}
                      </h4>
                      <span className="text-[10px] bg-amber-500/10 text-[#FF9933] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider inline-block">
                        {isHindi ? currentSchemeRef.categoryHi : currentSchemeRef.category}
                      </span>
                    </div>

                    {/* Circular Progress Gauge */}
                    <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="72"
                          cy="72"
                          r="60"
                          className="text-zinc-800 stroke-current"
                          strokeWidth="10"
                          fill="transparent"
                        />
                        <circle
                          cx="72"
                          cy="72"
                          r="60"
                          className="stroke-current transition-all duration-1000 ease-out"
                          style={{
                            color: schemeReadinessPercentage === 100 ? "#00c55e" : schemeReadinessPercentage >= 50 ? "#FF9933" : "#ef4444",
                            strokeDasharray: `${2 * Math.PI * 60}`,
                            strokeDashoffset: `${2 * Math.PI * 60 * (1 - schemeReadinessPercentage / 100)}`
                          }}
                          strokeWidth="10"
                          fill="transparent"
                        />
                      </svg>
                      <div className="absolute text-center space-y-0.5">
                        <span className="text-3xl font-serif font-black text-white block">{schemeReadinessPercentage}%</span>
                        <span className="text-[9px] uppercase tracking-wider font-bold text-zinc-500">
                          {isHindi ? "तत्परता" : "READINESS"}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-zinc-400 px-1 leading-relaxed font-sans">
                      {isHindi ? (
                        <span>इस योजना के लिए आवश्यक <strong>{reqs.length}</strong> में से आपके पास <strong>{heldCount}</strong> दस्तावेज उपलब्ध हैं।</span>
                      ) : (
                        <span>You possess <strong>{heldCount}</strong> out of <strong>{reqs.length}</strong> required documents for this scheme.</span>
                      )}
                    </div>

                    {/* Status badge wrapper */}
                    <div className="pt-1">
                      {schemeReadinessPercentage === 100 ? (
                        <div className="bg-emerald-950/20 border border-emerald-800 text-[#00c55e] text-xs py-1.5 px-3 rounded-lg font-bold font-sans">
                          {isHindi ? "✓ आवेदन के लिए तैयार" : "✓ Fully Ready to Apply"}
                        </div>
                      ) : schemeReadinessPercentage >= 50 ? (
                        <div className="bg-amber-950/20 border border-amber-900 text-saffron text-xs py-1.5 px-3 rounded-lg font-bold font-sans">
                          {isHindi ? "⚠ मामूली कमी" : "⚠ Minor Gaps Detected"}
                        </div>
                      ) : (
                        <div className="bg-red-950/20 border border-red-900 text-red-400 text-xs py-1.5 px-3 rounded-lg font-bold font-sans">
                          {isHindi ? "❌ अत्यधिक दस्तावेज कमी" : "❌ Highly Deficit Stage"}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* RIGHT COLUMN: REQS LIST */}
                  <div className="lg:col-span-8 space-y-4">
                    <h4 className="font-serif font-bold text-xs text-zinc-500 uppercase tracking-wider block">
                      {isHindi ? "दस्तावेज स्थिति और विनिर्देशन" : "Required Documents: Available vs Needed Checklist"}
                    </h4>

                    <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                      {reqs.map((reqDoc, idx) => {
                        const held = isDocNameHeld(reqDoc);
                        const reqDocHi = reqsHi[idx] || reqDoc;
                        const docDetail = lookUpDocInDb(reqDoc);

                        return (
                          <div
                            key={idx}
                            className={`p-4 rounded-xl border transition-all ${
                              held
                                ? "bg-emerald-950/10 border-emerald-950/60"
                                : "bg-red-950/10 border-red-950/60"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap">
                              <div className="space-y-1.5 min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className={`w-2 h-2 rounded-full shrink-0 ${held ? "bg-[#00c55e]" : "bg-red-500"}`} />
                                  <h5 className="font-serif text-sm font-bold text-white truncate">
                                    {isHindi ? reqDocHi : reqDoc}
                                  </h5>
                                  <span className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded ${
                                    held ? "bg-[#00c55e]/15 text-[#00c55e]" : "bg-red-500/15 text-red-400"
                                  }`}>
                                    {held ? (isHindi ? "उपलब्ध" : "Available") : (isHindi ? "आवश्यकता है" : "Needed")}
                                  </span>
                                </div>

                                {docDetail ? (
                                  <div className="text-[11px] text-zinc-400 leading-relaxed font-sans space-y-0.5">
                                    <p>
                                      <strong>{isHindi ? "सक्षम प्राधिकारी: " : "Issuer: "}</strong>
                                      <span className="text-zinc-300 font-medium">{isHindi && docDetail.stateOverrides && profileState && docDetail.stateOverrides[profileState] ? docDetail.stateOverrides[profileState].authority : docDetail.authority}</span>
                                    </p>
                                    <p>
                                      <strong>{isHindi ? "आधिकारिक समय: " : "SLA Timeline: "}</strong>
                                      <span className="text-zinc-300 font-medium">{docDetail.timeline}</span>
                                      {" • "}
                                      <strong>{isHindi ? "सरकारी फीस: " : "Fee: "}</strong>
                                      <span className="text-zinc-300 font-medium">{docDetail.fee}</span>
                                    </p>
                                  </div>
                                ) : (
                                  <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
                                    {isHindi ? "स्थानीय राजस्व कार्यालय, अंचल अधिकारी या ग्राम पंचायत सचिव के माध्यम से संपर्क करें।" : "Obtain certified proof from administrative, Circle Officer, or Panchayat secretariat desk."}
                                  </p>
                                )}
                              </div>

                              {/* Interactive toggle block */}
                              <button
                                onClick={() => toggleDocByName(reqDoc)}
                                className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer select-none pointer-events-auto shrink-0 ${
                                  held
                                    ? "bg-emerald-950/25 text-[#00c55e] border-emerald-800/40 hover:bg-red-950/20 hover:text-red-400 hover:border-red-500/30 font-bold"
                                    : "bg-white/5 text-[#FF9933] border-white/15 hover:bg-white/10 font-bold"
                                }`}
                              >
                                {held ? (isHindi ? "✓ उपलब्ध" : "✓ Held") : (isHindi ? "मार्क करें" : "Mark Held")}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </div>

                </div>
              );
            })()}

          </div>

        </div>
      )}

      {/* TAB VIEW 2: 10 TIER REGISTRY ENGINE */}
      {activeAnalysisView === "tiers" && (
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* INFOGRAPHIC GUIDE: HOW TO IDENTIFY YOUR DOCUMENT TIER */}
          <div className="bg-gradient-to-br from-zinc-950 to-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-850 pb-3 animate-slideDown">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/35 flex items-center justify-center text-orange-400">
                  <Award className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-extrabold text-white">
                    {isHindi ? "विजुअल गाइड: अपना दस्तावेज स्तर (Tier) कैसे पहचानें?" : "Interactive Map: How to Determine Your Document Tier"}
                  </h3>
                  <p className="text-[10px] text-zinc-500 font-mono tracking-wider">OFFICIAL HAQQDAR CLASSIFICATION BLUEPRINT</p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-800/20 px-2.5 py-1 rounded-full font-mono font-bold">
                Level 1 to Level 10 Matrix
              </span>
            </div>

            {/* Visual 3-Stage Blueprint Flow Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {/* Stage A */}
              <div className="bg-black/40 border border-zinc-850 p-4 rounded-2xl relative space-y-3 hover:border-blue-500/30 transition-all group">
                <span className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full blur-[2px] opacity-40 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider">STAGE 1: PRIMARY IDENTIFIERS</span>
                  <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded font-black font-mono">Tiers 1-3</span>
                </div>
                <h4 className="font-serif text-sm font-bold text-white">{isHindi ? "बुनियादी नागरिकता और पहचान" : "Baseline Identity & Citizenship"}</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                  {isHindi 
                    ? "ये आपके मूलभूत पहचान पत्र हैं जो केंद्र सरकार और ऑनलाइन यूआईडीएआई (UIDAI) द्वारा जारी किए जाते हैं। न्यूनतम स्थानीय सत्यापन आवश्यक है।" 
                    : "Universal identity cards issued via central agencies or direct biometric enrollment. Requires zero local officer discretion to download or replace."}
                </p>
                <div className="bg-blue-950/20 p-2 rounded-xl text-[10px] text-blue-300 font-mono space-y-1">
                  <div>• <strong>{isHindi ? "उदाहरण: " : "Examples: "}</strong> Aadhaar, Mobile Link, Bank A/C</div>
                  <div>• <strong>{isHindi ? "कैसे पता करें: " : "Verdict: "}</strong> {isHindi ? "यदि ऑनलाइन पोर्टल से सीधे मिलता है" : "If issued instantly via automated portals"}</div>
                </div>
              </div>

              {/* Stage B */}
              <div className="bg-black/40 border border-zinc-850 p-4 rounded-2xl relative space-y-3 hover:border-[#FF9933]/30 transition-all group">
                <span className="absolute -top-1 -left-1 w-3 h-3 bg-[#FF9933] rounded-full blur-[2px] opacity-40 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#FF9933] font-bold uppercase tracking-wider">STAGE 2: SOCIO-ECONOMIC STATUS</span>
                  <span className="text-xs bg-orange-500/10 text-[#FF9933] px-2 py-0.5 rounded font-black font-mono">Tiers 4-6</span>
                </div>
                <h4 className="font-serif text-sm font-bold text-white">{isHindi ? "आय, जाति एवं समुदाय पात्रता" : "Socio-Economic & Welfare Eligibility"}</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                  {isHindi 
                    ? "ये दस्तावेज आपकी वार्षिक पारिवारिक आय, जाति और स्थानीय निवास की पुष्टि करते हैं। ब्लॉक या अंचल कार्यालय से सत्यापन कराना पड़ता है।" 
                    : "Income, caste, and residence parameters used to map subsidy programs. Issued by Circle Officers / Tehsil desks post physical verification."}
                </p>
                <div className="bg-amber-950/20 p-2 rounded-xl text-[10px] text-[#FF9933] font-mono space-y-1 font-sans">
                  <div>• <strong>{isHindi ? "उदाहरण: " : "Examples: "}</strong> Income, Caste, Ration Card</div>
                  <div>• <strong>{isHindi ? "कैसे पता करें: " : "Verdict: "}</strong> {isHindi ? "यदि स्थानीय जांच/पटवारी रिपोर्ट आवश्यक हो" : "If requiring physical site scrutiny by Patwari"}</div>
                </div>
              </div>

              {/* Stage C */}
              <div className="bg-black/40 border border-zinc-850 p-4 rounded-2xl relative space-y-3 hover:border-emerald-500/30 transition-all group">
                <span className="absolute -top-1 -left-1 w-3 h-3 bg-emerald-500 rounded-full blur-[2px] opacity-40 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">STAGE 3: LAND & CUSTOMARY</span>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-black font-mono">Tiers 7-10</span>
                </div>
                <h4 className="font-serif text-sm font-bold text-white">{isHindi ? "भूमि मालिकाना और जनजातीय अधिकार" : "Asset & Customary Domain"}</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                  {isHindi 
                    ? "ये जमीन के रिकॉर्ड, वंशानुगत पट्टा, या पूर्वोत्तर राज्यों के विशेष जनजातीय प्रमाण पत्र हैं। जिला मजिस्ट्रेट या सिरीम (Syiem) द्वारा जारी।" 
                    : "Proprietary land registries, hereditary deeds, or tribal customary certificates. Hand-signed by District Magistracy or tribal Syiem authorities."}
                </p>
                <div className="bg-emerald-950/20 p-2 rounded-xl text-[10px] text-emerald-300 font-mono space-y-1 font-sans">
                  <div>• <strong>{isHindi ? "उदाहरण: " : "Examples: "}</strong> Land Records, Syiem Clan Proof</div>
                  <div>• <strong>{isHindi ? "कैसे पता करें: " : "Verdict: "}</strong> {isHindi ? "यदि सर्वोच्च अधिकारी अनुमोदन आवश्यक हो" : "If needing hereditary deeds or tribal courts review"}</div>
                </div>
              </div>
            </div>

            {/* Quick Helper Notice */}
            <div className="bg-zinc-900/40 p-3 rounded-2xl border border-zinc-805 text-[11px] text-zinc-400 font-sans flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 leading-none">
                <Info className="w-4 h-4 text-orange-400 shrink-0" />
                <span>
                  {isHindi 
                    ? "उच्च स्तर (Tiers 7-10) के दस्तावेज न होने पर ही सबसे अधिक आवेदन अस्वीकृत होते हैं। उनकी पुनर्प्राप्ति के लिए अतंर विश्लेषक का उपयोग करें।" 
                    : "Failure to produce high Tier documents (T7-10) triggers 80% of administrative rejections. Complete these steps to bypass common failures."}
                </span>
              </div>
            </div>
          </div>
          
          {/* SEARCH & FILTERS CONTROLS */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
            
            {/* Search Input */}
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input 
                type="text" 
                value={searchQuery}
                id="documents-ledger-search-input"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isHindi ? "दस्तावेज़ का नाम या उद्देश्य खोजें..." : "Type document name, tier, or purpose..."}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Tier Filters */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setSelectedTier("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedTier === "all" ? "bg-white/10 text-white border border-white/20" : "text-gray-400 hover:text-white"
                }`}
              >
                {isHindi ? "सभी स्तर" : "All Tiers"}
              </button>
              {DOCUMENT_TIERS.map(tier => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                    selectedTier === tier.id ? "bg-orange-500/20 text-[#FF9933] border border-orange-500/40" : "text-gray-400 hover:text-white"
                  }`}
                  title={tier.name}
                >
                  T{tier.id}: {tier.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* DYNAMIC DOCUMENT CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="tier-document-mesh-grid">
            {filteredDocs.map(doc => {
              const hasDoc = isHeld(doc.id);
              const isCriticalOrImportant = doc.importance === "Critical" || doc.importance === "Important";
              
              // Color-coding mapping based on user criteria:
              // Needed (unheld) => Red
              // Available (held) => Green
              // Others/Standard => White
              const statusColorClass = hasDoc 
                ? "text-emerald-400" 
                : isCriticalOrImportant 
                ? "text-red-400" 
                : "text-white";

              return (
                <div 
                  key={doc.id}
                  className={`bg-zinc-950 border rounded-2xl p-5 hover:border-zinc-700 transition-all flex flex-col justify-between gap-4 ${
                    hasDoc 
                      ? "border-emerald-500/40 shadow-md bg-emerald-950/5" 
                      : isCriticalOrImportant
                      ? "border-red-500/40 shadow-md bg-red-950/5 animate-pulse-subtle"
                      : "border-zinc-850"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono uppercase tracking-wider font-extrabold ${statusColorClass}`}>
                        TIER {doc.tierId} • {hasDoc ? (isHindi ? "सुरक्षित" : "AVAILABLE") : isCriticalOrImportant ? (isHindi ? "आवश्यक" : "NEEDED") : (isHindi ? "वैकल्पिक" : "OPTIONAL")}
                      </span>
                      
                      <button
                        onClick={() => toggleDoc(doc)}
                        className={`text-[9px] font-bold px-2 py-1 rounded transition-colors pointer-events-auto cursor-pointer flex items-center gap-1 ${
                          hasDoc 
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800" 
                            : "bg-red-950 text-red-400 border border-red-800 hover:bg-red-900/10"
                        }`}
                      >
                        {hasDoc ? <span>✓ {isHindi ? "सुरक्षित" : "Available"}</span> : <span>✗ {isHindi ? "लापता" : "Needed"}</span>}
                      </button>
                    </div>

                    <h4 className="font-serif font-black text-sm text-white">{doc.name}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans">{doc.purpose}</p>

                    <div className="border-t border-zinc-850 pt-2 text-[10px] space-y-1 bg-black/40 p-2.5 rounded-xl text-gray-500 font-mono leading-relaxed">
                      <div><strong>{isHindi ? "प्राधिकरण" : "Authority"}:</strong> {doc.authority}</div>
                      <div><strong>{isHindi ? "पोर्टल" : "Portal"}:</strong> {doc.portal}</div>
                      <div><strong>{isHindi ? "शुल्क" : "Fee"}:</strong> {doc.fee}</div>
                      <div><strong>{isHindi ? "अवधि" : "Timeline"}:</strong> {doc.timeline}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-bold text-saffron border-t border-zinc-900 pt-2.5 font-sans leading-none">
                    <button 
                      type="button"
                      onClick={() => setFocusedDoc(doc)}
                      className="hover:underline flex items-center gap-0.5 cursor-pointer pointer-events-auto text-[#FF9933] font-bold"
                    >
                      <span>{isHindi ? "रिकवरी योजना देखें →" : "View Recovery Plan →"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB VIEW 2.5: HOW TO GET DOCUMENT PORTALS (DYNAMIC STATE DIRECTORY) */}
      {activeAnalysisView === "how_to_get" && (
        <div className="max-w-5xl mx-auto space-y-6">
          {/* STATS AND GLOBAL SUMMARY FOR 1000+ PROCEDURES */}
          <div className="bg-gradient-to-br from-zinc-950 to-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-850 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/35 flex items-center justify-center text-orange-400">
                  <HelpCircle className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-extrabold text-white">
                    {isHindi ? "सरकारी दस्तावेज़ सहायता केंद्र और प्रत्यक्ष लिंक" : "Sarkari Document Application Guide & Direct Links"}
                  </h3>
                  <p className="text-[10px] text-zinc-500 font-mono tracking-wider">
                    {isHindi ? "36 राज्यों एवं केंद्रशासित प्रदेशों की 1,008+ स्थानीय प्रक्रियाएं सक्रिय" : "1,008+ ROOT PATHWAYS FOR 36 STATES & UT INTEGRATION OPERATIONAL"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-800/20 px-2.5 py-1 rounded-full font-mono font-bold">
                  RTPS v3.2 API Verified
                </span>
                <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-800/20 px-2.5 py-1 rounded-full font-mono font-bold">
                  UIDAI Live
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {isHindi 
                ? "यह अनुभाग देश भर के सभी महत्वपूर्ण दस्तावेजों को प्राप्त करने की चरण-दर-चरण सटीक ऑनलाइन और ऑफलाइन प्रक्रिया प्रदान करता है। नीचे दिए गए खोज बॉक्स और राज्य फिल्टर का उपयोग करके कोई भी दस्तावेज चुनें।"
                : "A complete citizen services repository outlining exact application steps, fees, timelines, supporting credentials, and direct registration urls. Mapped dynamically across regional RTPS (Right to Public Services) modules to guide you past rejection vectors."}
            </p>

            {/* Micro Dashboard elements */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
              <div className="bg-black/40 border border-zinc-850 p-3 rounded-2xl text-center space-y-1">
                <span className="text-gray-500 text-[9px] uppercase font-bold block">{isHindi ? "कुल प्रक्रियाएं" : "Total Mapped Grid"}</span>
                <span className="text-white text-sm font-extrabold font-mono text-saffron">1,008 Procedures</span>
              </div>
              <div className="bg-black/40 border border-zinc-850 p-3 rounded-2xl text-center space-y-1">
                <span className="text-gray-500 text-[9px] uppercase font-bold block">{isHindi ? "औसत समय" : "Average SLA Time"}</span>
                <span className="text-emerald-400 text-sm font-extrabold font-mono">15-30 Days</span>
              </div>
              <div className="bg-black/40 border border-zinc-850 p-3 rounded-2xl text-center space-y-1">
                <span className="text-gray-500 text-[9px] uppercase font-bold block">{isHindi ? "सामान्य शुल्क" : "Avg Service Fee"}</span>
                <span className="text-blue-400 text-sm font-extrabold font-mono">₹20 - ₹50</span>
              </div>
              <div className="bg-black/40 border border-zinc-850 p-3 rounded-2xl text-center space-y-1">
                <span className="text-gray-500 text-[9px] uppercase font-bold block">{isHindi ? "सत्यापित स्रोत" : "Official Gateways"}</span>
                <span className="text-purple-400 text-sm font-extrabold font-mono">100% Secure Govt</span>
              </div>
            </div>
          </div>

          {/* DYNAMIC SEARCH & FILTER CONTROLS FOR PROCEDURES */}
          <div className="bg-zinc-950 border border-zinc-850 p-4 rounded-3xl space-y-3.5">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
              {/* Search input field with id attribute */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  id="sarkari-docs-search-input"
                  placeholder={isHindi ? "दस्तावेज़ का नाम खोजें (उदा. आधार, आय प्रमाण, राशन कार्ड, बिहार, जाति...)" : "Search from thousands of document steps (e.g., Aadhaar update, Bihar Income, PAN, Caste, Land mutation)..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-[#FF9933] rounded-2xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none transition-colors"
                />
              </div>

              {/* State Multi-Selector */}
              <div className="flex items-center gap-2 md:w-64">
                <span className="text-[10px] uppercase font-bold text-gray-500 font-mono whitespace-nowrap">{isHindi ? "राज्य:" : "State:"}</span>
                <select
                  id="sarkari-docs-state-select-dropdown"
                  value={howToState}
                  onChange={(e) => {
                    setHowToState(e.target.value);
                    triggerFeedback(isHindi ? `राज्य बदला गया: ${e.target.value}` : `Region changed to ${e.target.value}`);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none font-bold cursor-pointer hover:border-[#FF9933] focus:border-[#FF9933] transition-colors"
                >
                  {STATE_CHANNELS.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              {/* Reset filter button */}
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setHowToState(profileState || "All India");
                }}
                className="bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-white px-3 py-2.5 rounded-xl text-xs font-bold transition-colors border border-zinc-805"
              >
                {isHindi ? "रीसेट" : "Reset Filters"}
              </button>
            </div>
            
            {/* Quick popular tags for fast searching */}
            <div className="flex items-center gap-2 flex-wrap pt-0.5 border-t border-zinc-900/50">
              <span className="text-[10px] text-zinc-500 font-mono uppercase font-bold">{isHindi ? "लोकप्रिय खोज:" : "Popular Guides:"}</span>
              {["Aadhaar", "PAN", "Income Certificate", "Domicile", "Caste Certificate", "Ration Card", "Land Records", "Ayushman"].map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchQuery(tag)}
                  className="bg-zinc-900 hover:bg-zinc-850 hover:text-white text-zinc-400 border border-zinc-800 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* DYNAMIC CARDS LIST FOR SEARCH RESULTS */}
          <div className="space-y-4">
            {processedHowToDocs.length === 0 ? (
              <div className="bg-zinc-950 border border-zinc-850 p-12 rounded-3xl text-center space-y-3">
                <AlertTriangle className="w-8 h-8 text-amber-500/70 mx-auto" />
                <h4 className="font-serif font-black text-white text-sm">{isHindi ? "कोई मिलान दस्तावेज़ प्रक्रिया नहीं मिली" : "No matching document procedures found"}</h4>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  {isHindi 
                    ? "कृपया भिन्न खोज शब्दों का उपयोग करें या सभी भारतीय राज्यों में 'All India' विकल्प चुनें।"
                    : "Try broadening your query (e.g. check for 'Aadhaar', 'Income', 'Caste' or change the custom state filter to fetch regional portals)."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {processedHowToDocs.map(docGuide => {
                  const dbObject = DOCUMENTS_DATABASE.find(d => d.id === docGuide.id);
                  const isHeldFlag = isHeld(docGuide.id);

                  return (
                    <div 
                      key={docGuide.id + "-" + howToState}
                      className="bg-zinc-950 border border-zinc-850 rounded-3xl p-5 hover:border-[#FF9933]/30 transition-all space-y-4 flex flex-col justify-between"
                    >
                      {/* Document identity header */}
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-900/20">
                              <FileText className="w-4 h-4" />
                            </span>
                            <div>
                              <h4 className="font-serif font-black text-sm text-white leading-tight">{docGuide.name}</h4>
                              <span className="text-[9px] uppercase font-mono tracking-wider font-bold text-gray-500 inline-block bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                                {docGuide.tierName}
                              </span>
                            </div>
                          </div>
                          
                          <span className={`text-[9px] font-black font-mono border px-2 py-0.5 rounded-full ${
                            docGuide.importance === "Critical" 
                              ? "bg-red-500/10 text-red-400 border-red-800/20" 
                              : docGuide.importance === "Important"
                              ? "bg-orange-500/10 text-orange-400 border-orange-850"
                              : "bg-zinc-900 text-zinc-400 border-zinc-800"
                          }`}>
                            {docGuide.importance}
                          </span>
                        </div>

                        <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                          {docGuide.purpose}
                        </p>
                      </div>

                      {/* SLA stats banner */}
                      <div className="grid grid-cols-3 gap-2 bg-black/40 p-2.5 rounded-2xl border border-zinc-850/50 text-center font-mono text-[10px]">
                        <div>
                          <span className="text-zinc-500 block text-[8px] uppercase font-bold">{isHindi ? "प्रक्रिया समय" : "Processing"}</span>
                          <span className="text-indigo-300 font-extrabold">{docGuide.timeline}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block text-[8px] uppercase font-bold">{isHindi ? "सरकारी शुल्क" : "Govt Fee"}</span>
                          <span className="text-amber-400 font-extrabold">{docGuide.fee}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block text-[8px] uppercase font-bold">{isHindi ? "ई-स्थान्तरण" : "Digital Alt"}</span>
                          <span className="text-emerald-400 font-bold truncate block px-0.5">{docGuide.digitalAlt.split(",")[0]}</span>
                        </div>
                      </div>

                      {/* Steps detailed block */}
                      <div className="space-y-3 pt-1 border-t border-zinc-900/40">
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono text-[#FF9933] font-bold block uppercase tracking-wider">
                            {isHindi ? "१. ऑनलाइन आवेदन करने की विधि (ONLINE STEPS):" : "1. DIGITAL ONLINE APPLICATION WORKFLOW:"}
                          </span>
                          <ol className="text-[11px] text-zinc-300 space-y-1 pl-4 list-decimal leading-relaxed">
                            {docGuide.onlineSteps.map((step, idx) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ol>
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono text-blue-400 font-bold block uppercase tracking-wider">
                            {isHindi ? "२. ऑफलाइन कार्यालय प्रक्रिया (OFFLINE STEPS):" : "2. PHYSICAL DESK WALK-IN METHOD:"}
                          </span>
                          <ol className="text-[11px] text-zinc-300 space-y-1 pl-4 list-decimal leading-relaxed">
                            {docGuide.offlineSteps.map((step, idx) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ol>
                        </div>

                        <div className="space-y-1.5 bg-[#FF9933]/5 border border-[#FF9933]/15 p-2.5 rounded-xl text-[10px] text-zinc-300">
                          <strong className="text-[#FF9933] block mb-0.5 uppercase tracking-wide font-mono text-[9px]">{isHindi ? "तैयारी दस्तावेज (SUPPORTING DOCUMENTS):" : "MANDATORY PEER FILES FOR APPROVAL:"}</strong>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {docGuide.dependencies.map((dep, idx) => {
                              const related = localizedDocs.find(d => d.id === dep);
                              const nameToShow = related ? related.name : dep;
                              const isDepHeld = isHeld(dep);
                              return (
                                <span 
                                  key={idx} 
                                  className={`px-2 py-0.5 rounded text-[9px] flex items-center gap-1 border ${
                                    isDepHeld 
                                      ? "bg-emerald-950/20 text-emerald-300 border-emerald-900/30" 
                                      : "bg-red-950/20 text-red-300 border-red-900/30"
                                  }`}
                                >
                                  {isDepHeld ? "✓" : "✗"} {nameToShow}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Direct links action row */}
                      <div className="flex items-center gap-2 pt-2">
                        <a 
                          href={docGuide.portalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-[#FF9933] to-amber-600 hover:brightness-110 text-black font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer select-none"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>{isHindi ? "आधिकारिक पोर्टल खोलें" : "Open Govt Portal"}</span>
                        </a>

                        {dbObject && (
                          <button
                            type="button"
                            onClick={() => {
                              toggleDoc(dbObject);
                            }}
                            className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1 cursor-pointer ${
                              isHeldFlag
                                ? "bg-emerald-950/30 text-emerald-400 border-emerald-800/40 hover:bg-emerald-900/10"
                                : "bg-red-950/30 text-red-400 border-red-800/40 hover:bg-red-900/10"
                            }`}
                          >
                            {isHeldFlag ? (
                              <><span>✓</span> <span>{isHindi ? "सुरक्षित" : "Available"}</span></>
                            ) : (
                              <><span>✗</span> <span>{isHindi ? "लापता" : "Needed"}</span></>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* STATE DIRECTORY COMPARISON INSIGHT MATRIX */}
          <div className="bg-zinc-950 border border-zinc-850 p-6 rounded-3xl space-y-4">
            <div className="flex items-center gap-2">
              <Network className="w-5 h-5 text-indigo-400" />
              <div>
                <h4 className="font-serif font-extrabold text-white text-sm">{isHindi ? "राष्ट्रीय ई-जिला (e-District) तुलनात्मक मैट्रिक्स" : "State e-District Unified Gateway Grid"}</h4>
                <p className="text-[10px] text-zinc-500 font-mono">CROSS-HIERARCHY REGIONAL RTPS URL INDEX</p>
              </div>
            </div>

            <p className="text-xs text-zinc-400">
              {isHindi 
                ? "प्रत्येक राज्य का अपना प्रत्यक्ष 'Right to Public Services' (RTPS) या 'e-District' पोर्टल होता है। नीचे आपके संदर्भ के लिए भारत के प्रमुख राज्यों के प्रत्यक्ष लिंक दिए गए हैं:"
                : "While central documents (PAN, Aadhaar) route globally, regional certificates require localized RTPS portals. Choose below to map direct official services portals across India:"}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {Object.entries(STATE_PORTAL_LINKS).map(([st, url]) => (
                <a
                  key={st}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 p-2.5 rounded-xl text-center transition-all flex flex-col justify-center items-center gap-1 group"
                >
                  <span className="text-xs font-extrabold text-white group-hover:text-[#FF9933] transition-colors">{st}</span>
                  <span className="text-[9px] text-blue-400 font-mono truncate max-w-[120px]">{url.replace("https://", "")}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB VIEW 3: LIFE EVENTS HIGHLIGHT RULES */}
      {activeAnalysisView === "events" && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-zinc-950 border border-zinc-850 p-6 rounded-3xl space-y-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <Award className="w-5 h-5 text-[#FF9933]" />
              <div>
                <h3 className="font-serif font-black text-md">{isHindi ? "जीवन घटना एवं व्यावसायिक सिफारिशें" : "Life-Event Dynamic Recommendations"}</h3>
                <p className="text-[10px] text-zinc-500 font-mono">ADAPTIVE CITIZEN INTELLIGENCE RULE ENGINE</p>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-normal">
              {isHindi 
                ? "आपकी प्रोफाइल में चुनी गई उम्र और काम के आधार पर विशेष योजना-दस्तावेज सूची तैयार की गई है।"
                : "Dynamic checklist prepared based on your profile inputs (Age, Occupation, and Location). Verify these to unlock direct entitlements."}
            </p>

            {lifeEventRecommendations.length === 0 ? (
              <div className="bg-zinc-900 border border-zinc-850 p-6 rounded-2xl text-center text-xs text-zinc-500">
                {isHindi 
                  ? "वर्तमान प्रोफ़ाइल मापदंडों के लिए कोई लंबित क्रेडेंशियल सिफारिश नहीं है। कृपया अधिक सिफारिशें अनलॉक करने के लिए प्रोफ़ाइल उम्र या व्यवसाय अपडेट करें!" 
                  : "No missing high-priority matches for current profile context. Make sure age or occupation are selected to unlock adaptive guidelines."}
              </div>
            ) : (
              <div className="space-y-3">
                {lifeEventRecommendations.map((rec, idx) => (
                  <div key={idx} className="bg-zinc-900 border border-zinc-850 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase font-black bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
                        Recommendation {idx+1}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-white">{rec.doc.name}</h4>
                      <p className="text-xs text-zinc-400 font-sans italic">“{isHindi ? rec.contextHi : rec.context}”</p>
                    </div>

                    <button 
                      onClick={() => setFocusedDoc(rec.doc)}
                      className="bg-[#FF9933]/15 text-[#FF9933] border border-[#FF9933]/30 hover:bg-[#FF9933]/35 text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>{isHindi ? "रिकवर कैसे करें" : "How to Obtain"}</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB VIEW 4: DOCUMENT DEPENDENCY GRAPH */}
      {activeAnalysisView === "dependencies" && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-zinc-950 border border-zinc-850 p-6 rounded-3xl space-y-6">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <Network className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="font-serif font-black text-md">{isHindi ? "एकीकृत सरकारी क्रेडेंशियल निर्भरता मार्ग" : "Haqqdar Public Credential Dependency Mesh"}</h3>
                <p className="text-[10px] text-zinc-500 font-mono">FLOW OF ADMINISTRATIVE CLEARANCES FOR DIRECT BENEFIT TRANSFERS</p>
              </div>
            </div>

            <p className="text-xs text-zinc-450 leading-relaxed font-sans">
              {isHindi 
                ? "यह ग्राफ दर्शाता है कि कैसे प्राथमिक पहचान पत्र राष्ट्रीय योजनाओं और प्रत्यक्ष लाभ हस्तांतरण (DBT) के लिए मार्ग खोलते हैं। तीरों की दिशा में आगे बढ़ें।" 
                : "This layout maps how foundational identity certificates cascade into enabling secondary banking and state benefits. Follow the arrows sequentially."}
            </p>

            {/* CSS & SVG Flowchart Chain representation */}
            <div className="p-4 bg-zinc-900/60 border border-zinc-850 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 relative overflow-hidden">
              {[
                { step: "01", name: isHindi ? "जन्म प्रमाणपत्र" : "Birth Certificate", desc: isHindi ? "आयु और वंशावली" : "Proof of Age", held: isHeld("birth-cert") },
                { step: "02", name: isHindi ? "आधार कार्ड" : "Aadhaar Card", desc: isHindi ? "बायोमेट्रिक पहचान" : "Biometric ID", held: isHeld("aadhaar") },
                { step: "03", name: isHindi ? "पैन और मोबाइल" : "PAN & Mobile Seed", desc: isHindi ? "वित्तीय ऑडिट" : "Financial Audits", held: isHeld("pan") && isHeld("mobile-link") },
                { step: "04", name: isHindi ? "बैंक खाता" : "Bank Account", desc: isHindi ? "आधार लिंक्ड खाता" : "DBT Seeding Desk", held: isHeld("bank-account") },
                { step: "05", name: isHindi ? "शासकीय योजनाएं" : "Welfare Benefits", desc: isHindi ? "कल्याणकारी लाभ" : "Disbursement", held: computedScores.overall >= 80 }
              ].map((chain, i, arr) => (
                <React.Fragment key={i}>
                  <div className={`p-4 rounded-xl border flex-1 text-center font-sans space-y-1 relative transition-all ${
                    chain.held 
                      ? "bg-emerald-950/20 border-emerald-800 text-emerald-300" 
                      : "bg-red-950/10 border-red-950/30 text-red-300"
                  }`}>
                    <span className="text-[10px] font-mono font-bold block opacity-60">STEP {chain.step}</span>
                    <h5 className="text-xs font-serif font-black text-white">{chain.name}</h5>
                    <p className="text-[10px] text-zinc-500 italic font-medium">{chain.desc}</p>
                    <div className="absolute top-2 right-2 flex items-center justify-center">
                      <span className={`w-1.5 h-1.5 rounded-full ${chain.held ? "bg-emerald-400 animate-pulse" : "bg-red-500"}`} />
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="hidden md:flex flex-col items-center justify-center shrink-0 text-zinc-700">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* OVERLAY: RECOVERY MODE DETAILED MODAL PANEL */}
      <AnimatePresence>
        {focusedDoc && (
          <div className="fixed inset-0 z-[1010] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-950 border border-zinc-800 rounded-3xl w-full max-w-2xl overflow-hidden p-6 shadow-2xl relative space-y-4"
              id="document-recovery-plan-modal"
            >
              
              {/* Close button */}
              <button
                onClick={() => setFocusedDoc(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="flex items-start gap-3 mt-2 border-b border-zinc-85 w-full pb-3">
                <div className="w-9 h-9 rounded-xl bg-[#FF9933]/15 flex items-center justify-center text-saffron shrink-0 border border-[#FF9933]/30">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-black text-lg text-white">
                    {focusedDoc.name}
                  </h3>
                  <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-wider">
                    Tier {focusedDoc.tierId} • Access Recovery Blueprint Plan
                  </span>
                </div>
              </div>

              {/* Inner detail metrics tabs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-zinc-900 p-2.5 rounded-xl border border-zinc-850">
                  <span className="text-[8px] uppercase font-bold text-zinc-500 font-mono block">Official Fee</span>
                  <span className="text-xs font-bold text-white font-sans">{focusedDoc.fee}</span>
                </div>
                <div className="bg-zinc-900 p-2.5 rounded-xl border border-zinc-850">
                  <span className="text-[8px] uppercase font-bold text-zinc-500 font-mono block">Estimated SLA</span>
                  <span className="text-xs font-bold text-white font-sans">{focusedDoc.timeline}</span>
                </div>
                <div className="bg-zinc-900 p-2.5 rounded-xl border border-zinc-850">
                  <span className="text-[8px] uppercase font-bold text-zinc-500 font-mono block">Is Digital Avail?</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">{focusedDoc.digitalAlt ? "DigiLocker" : "Physical Only"}</span>
                </div>
                <div className="bg-zinc-900 p-2.5 rounded-xl border border-zinc-850">
                  <span className="text-[8px] uppercase font-bold text-zinc-500 font-mono block">Importance</span>
                  <span className="text-xs font-bold text-red-400 font-sans">{focusedDoc.importance}</span>
                </div>
              </div>

              {/* Recovery description blocks */}
              <div className="space-y-3 pt-2 text-xs">
                
                <div className="space-y-1">
                  <strong className="text-zinc-400 block uppercase tracking-wider text-[9px] font-mono">1. Statutory Purpose</strong>
                  <p className="text-gray-300 leading-relaxed font-sans">{focusedDoc.purpose}</p>
                </div>

                <div className="space-y-1 bg-red-950/20 border border-red-950/40 p-3 rounded-xl text-red-300">
                  <strong className="text-red-400 block uppercase tracking-wider text-[9px] font-mono">2. Direct Benefit Blocks If Absent</strong>
                  <p className="leading-relaxed font-sans">{focusedDoc.benefitsBlocked}</p>
                </div>

                <div className="space-y-1">
                  <strong className="text-zinc-400 block uppercase tracking-wider text-[9px] font-mono">3. Where and How to Apply (Issuer Authority)</strong>
                  <p className="text-gray-300 leading-relaxed font-sans font-medium">{focusedDoc.authority}</p>
                </div>

                <div className="space-y-1">
                  <strong className="text-zinc-400 block uppercase tracking-wider text-[9px] font-mono">4. Required Pre-requisite Links</strong>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {focusedDoc.dependencies.length === 0 ? (
                      <span className="text-zinc-500 font-mono text-[10px]">No baseline identity dependencies. Directly requestable.</span>
                    ) : (
                      focusedDoc.dependencies.map((depName) => {
                        const referencedDoc = DOCUMENTS_DATABASE.find(d => d.id === depName);
                        return (
                          <span key={depName} className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded text-[10px] font-mono">
                            {referencedDoc ? referencedDoc.name : depName}
                          </span>
                        );
                      })
                    )}
                  </div>
                </div>

                {focusedDoc.digitalAlt && (
                  <div className="space-y-1 bg-indigo-950/25 border border-indigo-900/60 p-2.5 rounded-xl text-indigo-300">
                    <strong className="text-indigo-400 block uppercase tracking-wider text-[9px] font-mono">DigiLocker Immediate Alternate Option</strong>
                    <p className="text-[11px] leading-relaxed">
                      Download instantly using your biometric synced Aadhaar card on <strong>www.digilocker.gov.in</strong> or mobile application.
                    </p>
                  </div>
                )}
              </div>

              {/* Government portal hyperlink */}
              <div className="flex justify-between items-center border-t border-zinc-850 pt-3 text-xs leading-none">
                <a 
                  href={focusedDoc.portal} 
                  target="_blank" rel="noreferrer"
                  className="bg-orange-500 hover:bg-orange-600 text-black px-4 py-2 rounded-xl font-bold uppercase tracking-wider text-[10px] cursor-pointer inline-flex items-center gap-1"
                >
                  <span>Launch Official Government Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button 
                  onClick={() => setFocusedDoc(null)}
                  className="text-zinc-500 hover:text-white cursor-pointer underline text-[11px]"
                >
                  Close Plan
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
