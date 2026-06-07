export interface SchemeDocsRef {
  id: string;
  name: string;
  nameHi: string;
  fullName: string;
  fullNameHi: string;
  category: string;
  categoryHi: string;
  requiredDocuments: string[];
  requiredDocumentsHi: string[];
}

export const ALL_SCHEMES_DOCS_REF: SchemeDocsRef[] = [
  {
    id: "pmay-g",
    name: "PMAY-G",
    nameHi: "पीएमएवाई-जी (ग्रामीण)",
    fullName: "Pradhan Mantri Awas Yojana (Gramin)",
    fullNameHi: "प्रधानमंत्री आवास योजना (ग्रामीण)",
    category: "Housing",
    categoryHi: "आवास",
    requiredDocuments: ["Aadhaar Card", "SECC Inclusion Proof", "Bank Account (Aadhaar Seeded)", "Caste Certificate"],
    requiredDocumentsHi: ["आधार कार्ड", "एसईसीसी (SECC) सूची प्रमाण", "बैंक खाता (आधार लिंक्ड)", "जाति प्रमाण पत्र"]
  },
  {
    id: "pmay-u",
    name: "PMAY-U",
    nameHi: "पीएमएवाई-यू (शहरी)",
    fullName: "Pradhan Mantri Awas Yojana (Urban)",
    fullNameHi: "प्रधानमंत्री आवास योजना (शहरी)",
    category: "Housing",
    categoryHi: "आवास",
    requiredDocuments: ["Aadhaar Card", "Income Certificate", "Property/Land Documents", "Caste Certificate"],
    requiredDocumentsHi: ["आधार कार्ड", "आय प्रमाण पत्र", "संपत्ति/भूमि दस्तावेज", "जाति प्रमाण पत्र"]
  },
  {
    id: "mgnregs",
    name: "MGNREGS",
    nameHi: "मनरेगा (MGNREGS)",
    fullName: "Mahatma Gandhi National Rural Employment Guarantee Scheme",
    fullNameHi: "महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी योजना",
    category: "Welfare",
    categoryHi: "कल्याण",
    requiredDocuments: ["Job Card / Labour Card", "Aadhaar Card", "Bank Account (Aadhaar Seeded)"],
    requiredDocumentsHi: ["जॉब कार्ड / श्रम कार्ड", "आधार कार्ड", "बैंक खाता (आधार लिंक्ड)"]
  },
  {
    id: "pm-mudra",
    name: "PM Mudra",
    nameHi: "पीएम मुद्रा योजना",
    fullName: "Pradhan Mantri MUDRA Yojana",
    fullNameHi: "प्रधानमंत्री मुद्रा योजना",
    category: "Business",
    categoryHi: "व्यवसाय",
    requiredDocuments: ["Aadhaar Card", "PAN Card", "Business Plan/Project Report", "Bank Statements (6 Months)"],
    requiredDocumentsHi: ["आधार कार्ड", "पैन कार्ड", "व्यापार योजना/परियोजना रिपोर्ट", "बैंक स्टेटमेंट (6 महीने)"]
  },
  {
    id: "pm-kisan",
    name: "PM-KISAN",
    nameHi: "पीएम-किसान",
    fullName: "Pradhan Mantri Kisan Samman Nidhi",
    fullNameHi: "प्रधानमंत्री किसान सम्मान निधि",
    category: "Agriculture",
    categoryHi: "कृषि",
    requiredDocuments: ["Aadhaar Card", "Land Records / Possession Proof", "Bank Account (Aadhaar Seeded)"],
    requiredDocumentsHi: ["आधार कार्ड", "भूमि रिकॉर्ड / कब्ज़ा प्रमाण", "बैंक खाता (आधार लिंक्ड)"]
  },
  {
    id: "pmfby",
    name: "PMFBY",
    nameHi: "पीएमएफबीवाई (फसल बीमा)",
    fullName: "Pradhan Mantri Fusal Bima Yojana",
    fullNameHi: "प्रधानमंत्री फसल बीमा योजना",
    category: "Agriculture",
    categoryHi: "कृषि",
    requiredDocuments: ["Aadhaar Card", "Land Records / Possession Proof", "Bank Account (Aadhaar Seeded)", "Sowing Certificate"],
    requiredDocumentsHi: ["आधार कार्ड", "भूमि रिकॉर्ड / कब्ज़ा प्रमाण", "बैंक खाता (आधार लिंक्ड)", "बुआई प्रमाण पत्र"]
  },
  {
    id: "ayushman-bharat",
    name: "Ayushman Bharat PMJAY",
    nameHi: "आयुष्मान भारत पीएमजेएवाई",
    fullName: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana",
    fullNameHi: "आयुष्मान भारत प्रधानमंत्री जन आरोग्य योजना",
    category: "Health",
    categoryHi: "स्वास्थ्य",
    requiredDocuments: ["Aadhaar Card", "NFSA Ration Card", "SECC Inclusion Proof"],
    requiredDocumentsHi: ["आधार कार्ड", "एनएफएसए राशन कार्ड", "एसईसीसी (SECC) सूची प्रमाण"]
  },
  {
    id: "pmmvy",
    name: "PMMVY",
    nameHi: "पीएमएमवीवाई (मातृ वंदना)",
    fullName: "Pradhan Mantri Matru Vandana Yojana",
    fullNameHi: "प्रधानमंत्री मातृ वंदना योजना",
    category: "Welfare",
    categoryHi: "कल्याण",
    requiredDocuments: ["Aadhaar Card", "MCP Card (Mother-Child)", "Bank Account (Aadhaar Seeded)"],
    requiredDocumentsHi: ["आधार कार्ड", "एमसीपी कार्ड (माता-बाल सुरक्षा)", "बैंक खाता (आधार लिंक्ड)"]
  },
  {
    id: "pre-matric-scholarship",
    name: "Pre-Matric Scholarship",
    nameHi: "प्री-मैट्रिक छात्रवृत्ति",
    fullName: "National Pre-Matric Scholarship Scheme",
    fullNameHi: "राष्ट्रीय प्री-मैट्रिक छात्रवृत्ति योजना",
    category: "Education",
    categoryHi: "शिक्षा",
    requiredDocuments: ["Aadhaar Card", "Caste Certificate", "Income Certificate", "Bank Account (Aadhaar Seeded)", "Marksheet / School Certificate"],
    requiredDocumentsHi: ["आधार कार्ड", "जाति प्रमाण पत्र", "आय प्रमाण पत्र", "बैंक खाता (आधार लिंक्ड)", "अंकपत्र / स्कूल प्रमाण पत्र"]
  },
  {
    id: "post-matric-scholarship",
    name: "Post-Matric Scholarship",
    nameHi: "पोस्ट-मैट्रिक छात्रवृत्ति",
    fullName: "National Post-Matric Scholarship Scheme",
    fullNameHi: "राष्ट्रीय पोस्ट-मैट्रिक छात्रवृत्ति योजना",
    category: "Education",
    categoryHi: "शिक्षा",
    requiredDocuments: ["Aadhaar Card", "Caste Certificate", "Income Certificate", "Fee Receipt / Admission Proof", "Bank Account (Aadhaar Seeded)"],
    requiredDocumentsHi: ["आधार कार्ड", "जाति प्रमाण पत्र", "आय प्रमाण पत्र", "फीस रसीद / प्रवेश प्रमाण", "बैंक खाता (आधार लिंक्ड)"]
  },
  {
    id: "nfsa-pds",
    name: "NFSA/PDS",
    nameHi: "एनएफएसए / सार्वजनिक वितरण",
    fullName: "National Food Security Act / Public Distribution System",
    fullNameHi: "राष्ट्रीय खाद्य सुरक्षा अधिनियम / राशन",
    category: "Welfare",
    categoryHi: "कल्याण",
    requiredDocuments: ["Aadhaar Card", "Domicile Certificate", "Family Details (Ration Photo)"],
    requiredDocumentsHi: ["आधार कार्ड", "मूल निवास प्रमाण पत्र", "पारिवारिक विवरण (राशन फोटो)"]
  },
  {
    id: "pm-ujjwala",
    name: "PM Ujjwala",
    nameHi: "पीएम उज्ज्वला योजना",
    fullName: "Pradhan Mantri Ujjwala Yojana (Free LPG)",
    fullNameHi: "प्रधानमंत्री उज्ज्वला योजना (मुफ्त गैस)",
    category: "Welfare",
    categoryHi: "कल्याण",
    requiredDocuments: ["Aadhaar Card", "NFSA Ration Card", "SECC Inclusion Proof", "Bank Account (Aadhaar Seeded)"],
    requiredDocumentsHi: ["आधार कार्ड", "एनएफएसए राशन कार्ड", "एसईसीसी (SECC) सूची प्रमाण", "बैंक खाता (आधार लिंक्ड)"]
  },
  {
    id: "pm-jandhan",
    name: "PM Jan Dhan Yojana",
    nameHi: "जन धन योजना",
    fullName: "Pradhan Mantri Jan Dhan Yojana (Zero Balance)",
    fullNameHi: "प्रधानमंत्री जन धन योजना (जीरो बैलेंस)",
    category: "Business",
    categoryHi: "व्यवसाय",
    requiredDocuments: ["Aadhaar Card", "Voter ID"],
    requiredDocumentsHi: ["आधार कार्ड", "वोटर आईडी कार्ड"]
  },
  {
    id: "pmjjby",
    name: "PMJJBY",
    nameHi: "पीएमजेजेबीवाई (जीवन ज्योति)",
    fullName: "Pradhan Mantri Jeevan Jyoti Bima Yojana",
    fullNameHi: "प्रधानमंत्री जीवन ज्योति बीमा योजना",
    category: "Welfare",
    categoryHi: "कल्याण",
    requiredDocuments: ["Aadhaar Card", "Bank Account (Aadhaar Seeded)"],
    requiredDocumentsHi: ["आधार कार्ड", "बैंक खाता (आधार लिंक्ड)"]
  },
  {
    id: "pmsby",
    name: "PMSBY",
    nameHi: "पीएमएसबीवाई (सुरक्षा बीमा)",
    fullName: "Pradhan Mantri Suraksha Bima Yojana",
    fullNameHi: "प्रधानमंत्री सुरक्षा बीमा योजना",
    category: "Welfare",
    categoryHi: "कल्याण",
    requiredDocuments: ["Aadhaar Card", "Bank Account (Aadhaar Seeded)"],
    requiredDocumentsHi: ["आधार कार्ड", "बैंक खाता (आधार लिंक्ड)"]
  },
  {
    id: "apy",
    name: "APY",
    nameHi: "अटली पेंशन योजना (APY)",
    fullName: "Atal Pension Yojana",
    fullNameHi: "अटल पेंशन योजना",
    category: "Pensions",
    categoryHi: "पेंशन",
    requiredDocuments: ["Aadhaar Card", "Bank Account (Aadhaar Seeded)", "Mobile Number Linked to Aadhaar"],
    requiredDocumentsHi: ["आधार कार्ड", "बैंक खाता (आधार लिंक्ड)", "आधार से लिंक मोबाइल नंबर"]
  },
  {
    id: "pm-vishwakarma",
    name: "PM Vishwakarma",
    nameHi: "पीएम विश्वकर्मा योजना",
    fullName: "PM Vishwakarma Artisan Support Scheme",
    fullNameHi: "प्रधानमंत्री विश्वकर्मा कारीगर सहायता योजना",
    category: "Business",
    categoryHi: "व्यवसाय",
    requiredDocuments: ["Aadhaar Card", "Craft / Skill Proof Certificate", "Bank Account (Aadhaar Seeded)"],
    requiredDocumentsHi: ["आधार कार्ड", "शिल्प / कौशल प्रमाण पत्र", "बैंक खाता (आधार लिंक्ड)"]
  },
  {
    id: "svamitva",
    name: "SVAMITVA",
    nameHi: "स्वामित्व योजना",
    fullName: "Survey of Villages and Mapping with Improvised Technology",
    fullNameHi: "ग्राम आबादी सर्वेक्षण और ड्रोन मैपिंग योजना",
    category: "Agriculture",
    categoryHi: "कृषि",
    requiredDocuments: ["Aadhaar Card", "Land Records / Possession Proof"],
    requiredDocumentsHi: ["आधार कार्ड", "भूमि रिकॉर्ड / कब्ज़ा प्रमाण"]
  },
  {
    id: "pm-surya-ghar",
    name: "PM Surya Ghar",
    nameHi: "पीएम सूर्य घर (मुफ्त बिजली)",
    fullName: "PM Surya Ghar Muft Bijli Yojana (Solar)",
    fullNameHi: "पीएम सूर्य घर मुफ्त बिजली योजना (सोलर)",
    category: "Housing",
    categoryHi: "आवास",
    requiredDocuments: ["Aadhaar Card", "Electricity Consumer Bill", "Bank Account (Aadhaar Seeded)", "Property/Land Documents"],
    requiredDocumentsHi: ["आधार कार्ड", "बिजली कनेक्शन नंबर / बिल", "बैंक खाता (आधार लिंक्ड)", "संपत्ति/भूमि दस्तावेज"]
  },
  {
    id: "emrs",
    name: "EMRS",
    nameHi: "ईएमआरएस आवासीय विद्यालय",
    fullName: "Eklavya Model Residential School Admission",
    fullNameHi: "एकलव्य मॉडल आवासीय विद्यालय प्रवेश",
    category: "Education",
    categoryHi: "शिक्षा",
    requiredDocuments: ["Caste Certificate", "Age Proof", "Marksheet / School Certificate", "Aadhaar Card", "Domicile Certificate"],
    requiredDocumentsHi: ["जाति प्रमाण पत्र", "आयु प्रमाण", "अंकपत्र / स्कूल प्रमाण पत्र", "आधार कार्ड", "मूल निवास प्रमाण पत्र"]
  },
  {
    id: "nec-merit-scholarship",
    name: "NEC Merit Scholarship",
    nameHi: "एनईसी मेरिट स्कॉलरशिप",
    fullName: "North Eastern Council Merit Scholarship",
    fullNameHi: "उत्तर पूर्वी परिषद मेरिट छात्रवृत्ति",
    category: "Education",
    categoryHi: "शिक्षा",
    requiredDocuments: ["Domicile Certificate", "Marksheet / School Certificate", "Income Certificate", "Aadhaar Card", "Bank Account (Aadhaar Seeded)"],
    requiredDocumentsHi: ["मूल निवास प्रमाण पत्र", "अंकपत्र / स्कूल प्रमाण पत्र", "आय प्रमाण पत्र", "आधार कार्ड", "बैंक खाता (आधार लिंक्ड)"]
  },
  {
    id: "ishan-uday-scholarship",
    name: "Ishan Uday Scholarship",
    nameHi: "ईशान उदय छात्रवृत्ति",
    fullName: "Ishan Uday Special Scholarship for NER",
    fullNameHi: "ईशान उदय विशेष छात्रवृत्ति योजना",
    category: "Education",
    categoryHi: "शिक्षा",
    requiredDocuments: ["Marksheet / School Certificate", "Fee Receipt / Admission Proof", "Income Certificate", "Aadhaar Card", "Bank Account (Aadhaar Seeded)"],
    requiredDocumentsHi: ["अंकपत्र / स्कूल प्रमाण पत्र", "फीस रसीद / प्रवेश प्रमाण", "आय प्रमाण पत्र", "आधार कार्ड", "बैंक खाता (आधार लिंक्ड)"]
  },
  {
    id: "orunodoi-assam",
    name: "Orunodoi Assam",
    nameHi: "अरुणोदय योजना (असम)",
    fullName: "Orunodoi 2.0 Financial Scheme (Assam)",
    fullNameHi: "अरुणोदय 2.0 कल्याणकारी योजना (असम)",
    category: "Welfare",
    categoryHi: "कल्याण",
    requiredDocuments: ["Aadhaar Card", "NFSA Ration Card", "Bank Account (Aadhaar Seeded)", "Income Certificate", "Domicile Certificate"],
    requiredDocumentsHi: ["आधार कार्ड", "एनएफएसए राशन कार्ड", "बैंक खाता (आधार लिंक्ड)", "आय प्रमाण पत्र", "मूल निवास प्रमाण पत्र"]
  },
  {
    id: "lakhpati-baideo",
    name: "Lakhpati Baideo",
    nameHi: "लखपति बैदेव योजना (असम)",
    fullName: "Lakhpati Baideo Self-Help Group Grant (Assam)",
    fullNameHi: "लखपति बैदेव स्वयं सहायता समूह अनुदान",
    category: "Business",
    categoryHi: "व्यवसाय",
    requiredDocuments: ["SHG Membership Certificate", "Aadhaar Card", "Bank Account (Aadhaar Seeded)"],
    requiredDocumentsHi: ["एसएचजी सदस्यता प्रमाण पत्र", "आधार कार्ड", "बैंक खाता (आधार लिंक्ड)"]
  },
  {
    id: "svayem-assam",
    name: "SVAYEM Assam",
    nameHi: "स्वायेम योजना (असम)",
    fullName: "Swami Vivekananda Assam Youth Empowerment",
    fullNameHi: "स्वामी विवेकानंद असम युवा अधिकारिता",
    category: "Business",
    categoryHi: "व्यवसाय",
    requiredDocuments: ["Aadhaar Card", "Age Proof", "Business Plan/Project Report", "Bank Account (Aadhaar Seeded)"],
    requiredDocumentsHi: ["आधार कार्ड", "आयु प्रमाण", "व्यापार योजना/परियोजना रिपोर्ट", "बैंक खाता (आधार लिंक्ड)"]
  },
  {
    id: "cmsm-meghalaya",
    name: "CMSM Meghalaya",
    nameHi: "सीएमएसएम मेघालय",
    fullName: "Chief Minister's Scholarship Scheme (Meghalaya)",
    fullNameHi: "मुख्यमंत्री छात्रवृत्ति योजना (मेघालय)",
    category: "Education",
    categoryHi: "शिक्षा",
    requiredDocuments: ["Aadhaar Card", "Domicile Certificate", "Marksheet / School Certificate", "Income Certificate", "Bank Account (Aadhaar Seeded)"],
    requiredDocumentsHi: ["आधार कार्ड", "मूल निवास प्रमाण पत्र", "अंकपत्र / स्कूल प्रमाण पत्र", "आय प्रमाण पत्र", "बैंक खाता (आधार लिंक्ड)"]
  },
  {
    id: "manipur-scholarship",
    name: "Manipur Scholarship",
    nameHi: "मणिपुर छात्रवृत्ति",
    fullName: "Manipur State Post-Matric ST Scholarship",
    fullNameHi: "मणिपुर राज्य पोस्ट-मैट्रिक छात्रवृत्ति",
    category: "Education",
    categoryHi: "शिक्षा",
    requiredDocuments: ["Aadhaar Card", "Domicile Certificate", "Marksheet / School Certificate", "Income Certificate", "Bank Account (Aadhaar Seeded)"],
    requiredDocumentsHi: ["आधार कार्ड", "मूल निवास प्रमाण पत्र", "अंकपत्र / स्कूल प्रमाण पत्र", "आय प्रमाण पत्र", "बैंक खाता (आधार लिंक्ड)"]
  },
  {
    id: "nagaland-scholarship",
    name: "Nagaland Scholarship",
    nameHi: "नागालैंड छात्रवृत्ति",
    fullName: "Nagaland State Post-Matric Merit Scholarship",
    fullNameHi: "नागालैंड राज्य पोस्ट-मैट्रिक शैक्षणिक योजना",
    category: "Education",
    categoryHi: "शिक्षा",
    requiredDocuments: ["Aadhaar Card", "Caste Certificate", "Income Certificate", "Marksheet / School Certificate", "Bank Account (Aadhaar Seeded)"],
    requiredDocumentsHi: ["आधार कार्ड", "जाति प्रमाण पत्र", "आय प्रमाण पत्र", "अंकपत्र / स्कूल प्रमाण पत्र", "बैंक खाता (आधार लिंक्ड)"]
  },
  {
    id: "mizoram-scholarship",
    name: "Mizoram Scholarship",
    nameHi: "मिजोरम छात्रवृत्ति",
    fullName: "Mizoram State Post-Matric Merit Scholarship",
    fullNameHi: "मिजोरम राज्य पोस्ट-मैट्रिक वित्तीय सहायता",
    category: "Education",
    categoryHi: "शिक्षा",
    requiredDocuments: ["Aadhaar Card", "Caste Certificate", "Income Certificate", "Marksheet / School Certificate", "Bank Account (Aadhaar Seeded)"],
    requiredDocumentsHi: ["आधार कार्ड", "जाति प्रमाण पत्र", "आय प्रमाण पत्र", "अंकपत्र / स्कूल प्रमाण पत्र", "बैंक खाता (आधार लिंक्ड)"]
  },
  {
    id: "cmaay-arunachal",
    name: "CMAAY Arunachal",
    nameHi: "सीएमएएवाई अरुणाचल",
    fullName: "Chief Minister Arogya Arunachal Yojana",
    fullNameHi: "मुख्य मंत्री आरोग्य अरुणाचल योजना",
    category: "Health",
    categoryHi: "स्वास्थ्य",
    requiredDocuments: ["Aadhaar Card", "Domicile Certificate", "Family Details (Ration Photo)", "Bank Account (Aadhaar Seeded)"],
    requiredDocumentsHi: ["आधार कार्ड", "मूल निवास प्रमाण पत्र", "पारिवारिक विवरण (राशन फोटो)", "बैंक खाता (आधार लिंक्ड)"]
  }
];
