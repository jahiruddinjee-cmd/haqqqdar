export interface InterestingFact {
  id: number;
  text: string;
  textHi: string;
  category: "Village" | "Patriotic" | "Welfare" | "History" | "Fact";
  categoryHi: "ग्राम" | "देशभक्ति" | "कल्याण" | "इतिहास" | "तथ्य";
  source?: string;
  author?: string;
}

export const INTERESTING_FACTS_LIST: InterestingFact[] = [
  {
    id: 1,
    text: "The first biometric Aadhaar card in India was issued on September 29, 2010 to Ranjana Sonawane in Tembhli, a small tribal village in Maharashtra's Nandurbar district.",
    textHi: "भारत में पहला बायोमेट्रिक आधार कार्ड 29 सितंबर 2010 को महाराष्ट्र के नंदुरबार जिले के एक छोटे से आदिवासी गांव टेम्भली की रंजना सोनावणे को जारी किया गया था।",
    category: "History",
    categoryHi: "इतिहास",
    source: "UIDAI National Archives"
  },
  {
    id: 2,
    text: "India's Direct Benefit Transfer (DBT) has successfully prevented leakages of over ₹3 Lakh Crore, bypassing corrupt middlemen and routing funds directly into bank accounts via the NPCI switch.",
    textHi: "भारत के डायरेक्ट बेनिफिट ट्रांसफर (DBT) ने भ्रष्टाचार और बिचौलियों को बाईपास करके सीधे NPCI स्विच के माध्यम से बैंक खातों में ₹3 लाख करोड़ से अधिक की लीकेज को सफलतापूर्वक रोका है।",
    category: "Welfare",
    categoryHi: "कल्याण",
    source: "Economic Survey of India"
  },
  {
    id: 3,
    text: "The soul of India lives in its villages. A nation's progress is incomplete until the last citizen in the remotest hamlet receives their rightful share.",
    textHi: "भारत की आत्मा उसके गांवों में बसती है। देश की प्रगति तब तक अधूरी है जब तक कि सबसे दूरदराज के क्षेत्र के अंतिम नागरिक को उसका अधिकार न मिल जाए।",
    category: "Village",
    categoryHi: "ग्राम",
    author: "Mahatma Gandhi"
  },
  {
    id: 4,
    text: "Jai Jawan, Jai Kisan, Jai Vigyan! The safety of our borders guarded by our soldiers and the abundance of our crop fields tilled by our farmers form the dual pillars of national integrity.",
    textHi: "जय जवान, जय किसान, जय विज्ञान! हमारे वीर सैनिकों द्वारा सुरक्षित सीमाएं और हमारे अन्नदाता किसानों द्वारा सींचे गए खेत ही राष्ट्र की अखंडता के दो मजबूत स्तंभ हैं।",
    category: "Patriotic",
    categoryHi: "देशभक्ति",
    author: "Lal Bahadur Shastri & Atal Bihari Vajpayee"
  },
  {
    id: 5,
    text: "Ayushman Bharat PM-JAY is the largest fully state-sponsored health protection program in the world, securing cashless emergency cover for over 550 million vulnerable citizens.",
    textHi: "आयुष्मान भारत पीएम-जेएवाई विश्व का सबसे बड़ा पूर्णतः राज्य प्रायोजित स्वास्थ्य सुरक्षा कार्यक्रम है, जो 55 करोड़ से अधिक कमजोर नागरिकों के लिए कैशलेस आपातकालीन कवर सुरक्षित करता है।",
    category: "Welfare",
    categoryHi: "कल्याण",
    source: "National Health Authority"
  },
  {
    id: 6,
    text: "The word 'Haqqdar' (हक़दार) carries deep democratic significance—referring to the rightful, legal possessor of an entitlement, emphasizing citizen dignity over charity.",
    textHi: "शब्द 'हक़दार' (Haqqdar) गहरा लोकतांत्रिक महत्व रखता है—यह किसी अधिकार या पात्रता के वैध और हकदार स्वामी को संदर्भित करता है, जो दान के बजाय नागरिक गरिमा पर जोर देता है।",
    category: "Fact",
    categoryHi: "तथ्य",
    author: "Democratic Lexicon"
  }
];
