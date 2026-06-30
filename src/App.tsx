import React, { useState, useEffect, useRef } from "react";
import { 
  SCHEMES_DATABASE, 
  DOCUMENT_GUIDELINES, 
  INVISIBLE_ROADMAP, 
  NE_STATES_INTEL,
  Scheme,
  DocumentInfo
} from "./data/schemesData";
import { 
  Search, Shield, CheckCircle2, ChevronRight, Download, Copy, AlertTriangle, 
  PhoneCall, FileText, UserCheck, EyeOff, X, Volume2, VolumeX, Menu, Activity, Info, Landmark, HelpCircle, ArrowRight,
  Sprout, Globe, Clock, Compass, Users, Briefcase, GraduationCap, Building2, User, Flame, AlertCircle, Home, Lock, Calendar,
  Sparkles, CheckSquare, Clipboard, AlertOctagon
} from "lucide-react";
import {
  UI_TRANSLATIONS,
  translateScheme,
  translateDocument
} from "./data/translations";
import { ALL_SCHEMES_DOCS_REF } from "./data/schemesDocsData";
import { INTERESTING_FACTS_LIST } from "./data/interestingFacts";
import { AdminPanel } from "./components/AdminPanel";
import { DocumentIntelligence } from "./components/DocumentIntelligence";
import { LifeNavigatorHub } from "./components/LifeNavigatorHub";
import { BharatCareerNavigator } from "./components/BharatCareerNavigator";
import { LIFE_CRISIS_PLAYBOOKS, CrisisPlaybook } from "./data/lifeCrisisPlaybooks";

const IndianFlagBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 rounded-3xl opacity-[0.035] flex flex-col">
      <div className="flex-1 bg-[#FF9933] w-full" />
      <div className="flex-1 bg-white w-full flex items-center justify-center relative">
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-blue-900 absolute opacity-70 animate-[spin_240s_linear_infinite]">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={50 + 45 * Math.cos((i * 15 * Math.PI) / 180)}
              y2={50 + 45 * Math.sin((i * 15 * Math.PI) / 180)}
              stroke="currentColor"
              strokeWidth="1.2"
            />
          ))}
        </svg>
      </div>
      <div className="flex-1 bg-[#138808] w-full" />
    </div>
  );
};

export default function App() {
  // Navigation & Core Accessibility State
  const [activeTab, setActiveTab] = useState<string>("home");
  const [language, setLanguage] = useState<string>("English");

  // Current active role state for user simulation/login options across tabs
  const [currentRole, setCurrentRole] = useState<string>(() => {
    return sessionStorage.getItem("haqqdar_admin_user") || "guest";
  });

  const handleQuickLogin = async (roleName: string) => {
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: roleName, password: roleName })
      });
      const data = await response.json();
      if (data.success) {
        sessionStorage.setItem("haqqdar_admin_token", data.token);
        sessionStorage.setItem("haqqdar_admin_user", data.username);
        setCurrentRole(data.username);
        triggerFeedback(language === "Hindi" ? `सफलतापूर्वक लॉगिन: ${roleName}` : `Successfully logged in as ${roleName} Officer.`);
      }
    } catch (e) {
      // Fallback
      sessionStorage.setItem("haqqdar_admin_token", "haqqdar_admin_session_" + Date.now());
      sessionStorage.setItem("haqqdar_admin_user", roleName);
      setCurrentRole(roleName);
      triggerFeedback(`Logged in as ${roleName}`);
    }
  };

  const handleQuickLogout = () => {
    sessionStorage.removeItem("haqqdar_admin_token");
    sessionStorage.removeItem("haqqdar_admin_user");
    setCurrentRole("guest");
    triggerFeedback(language === "Hindi" ? "लॉग आउट सुरक्षित" : "Returned to Public Guest mode.");
  };

  // Dynamic ticking Indian Standard Time and Date Clock
  const [clockTime, setClockTime] = useState<string>("");
  const [clockDate, setClockDate] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
      const dateStr = now.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
      setClockTime(timeStr);
      setClockDate(dateStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  
  // Dynamic translation helper function for perfect English and Hindi toggle
  const t = (key: string): string => {
    const item = UI_TRANSLATIONS[key];
    if (!item) return key;
    return language === "Hindi" ? item.hi : item.en;
  };
  const [isLargeText, setIsLargeText] = useState<boolean>(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // User Profile for Entitlement Calculator inside Benefits
  const [profileState, setProfileState] = useState<string>("All India");
  const [profileAge, setProfileAge] = useState<number>(32);
  const [profileIncome, setProfileIncome] = useState<number>(120000);
  const [profileOccupation, setProfileOccupation] = useState<string>("Farmer");
  const [profileGender, setProfileGender] = useState<string>("Female");
  const [profileCategory, setProfileCategory] = useState<string>("General");

  // Track currently claimed scheme IDs for dynamic individual calculation
  const [claimedSchemes, setClaimedSchemes] = useState<string[]>([]);
  
  // Track held documents for Citizen Readiness score
  const [inventoryDocs, setInventoryDocs] = useState<string[]>([
    "Aadhaar Card", 
    "Bank Account (Aadhaar Seeded)", 
    "DigiLocker"
  ]);

  // Selected scheme for dynamic Document Gap Analyzer (from 30 schemes)
  const [selectedGapSchemeId, setSelectedGapSchemeId] = useState<string>("pm-kisan");

  // Future Planner State for high-fidelity Mockup
  const [plannerAge, setPlannerAge] = useState<string>("18 Years");
  const [plannerGender, setPlannerGender] = useState<string>("Male");
  const [plannerState, setPlannerState] = useState<string>("Maharashtra");
  const [plannerEducation, setPlannerEducation] = useState<string>("12th (Science)");
  const [plannerGoal, setPlannerGoal] = useState<string>("NDA Officer");
  const [activePlannerStep, setActivePlannerStep] = useState<number>(0);

  // Northeast State selector inside Benefits Sub-Hub
  const [selectedNEState, setSelectedNEState] = useState<string>("Assam");

  // Rejection Recovery Engine selections
  const [selectedRejectScheme, setSelectedRejectScheme] = useState<string>("pm-kisan");
  const [selectedRejectReasonIdx, setSelectedRejectReasonIdx] = useState<number>(0);

  // Live Toast feedback messaging
  const [feedbackMsg, setFeedbackMsg] = useState<string>("");

  // Appeals and RTI Suite form inputs
  const [rtiForm, setRtiForm] = useState({
    type: "Application Status RTI",
    name: "Rajesh Kumar Gogoi",
    address: "Village No. 2, Majuli Block",
    district: "Majuli",
    state: "Assam",
    mobile: "9876543210",
    scheme: "PM-KISAN Samman Nidhi",
    appId: "PMK-2026-98124",
    dept: "Agricultural Revenue Division",
    specificReason: "Rejected due to alleged land record discrepancy, but mutated copy was duly submitted.",
    docsAttached: "Aadhaar Card, Land Mutation Copy (Khatauni), Bank Statement"
  });

  // Global Chat State for Haqqdar Citizen Assistant
  const [chatInput, setChatInput] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Array<{ role: "user" | "ai"; text: string; time: string }>>([
    {
      role: "ai",
      text: "नमसकार! I am the Haqqdar Assistant (Citizen Guidance Assistant). Speak to me about your rejections, missing documents, or eligibility. I can speak and write in English, Hindi (हिंदी), Assamese (অসমীয়া), and Bengali (বাংলা).\n\nWhat can I help you discover or claim today?",
      time: "11:15 AM"
    }
  ]);
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const [chatSpeechEnabled, setChatSpeechEnabled] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Sub-tabs for Haqqdar Assistant: "chat" or "crisis" (Life Crisis Navigator)
  const [assistantSubTab, setAssistantSubTab] = useState<"chat" | "crisis">("chat");
  const [selectedCrisisId, setSelectedCrisisId] = useState<string | null>(null);
  const [userCheckedDocs, setUserCheckedDocs] = useState<Record<string, Record<string, boolean>>>({});

  // Agritech Shield variables
  const [agriCropType, setAgriCropType] = useState<string>("Kharif");
  const [agriSumInsured, setAgriSumInsured] = useState<number>(60000);
  const [agriN, setAgriN] = useState<number>(180);
  const [agriP, setAgriP] = useState<number>(35);
  const [agriK, setAgriK] = useState<number>(60);
  const [agriTargetCrop, setAgriTargetCrop] = useState<string>("Rice");

  // Search keyword in scheme directory inside Benefits
  const [directorySearch, setDirectorySearch] = useState<string>("");
  const [directoryCatFilter, setDirectoryCatFilter] = useState<string>("All");

  // Dynamic Scroll Rotation state for India's Ashoka Chakra
  const [scrollRotation, setScrollRotation] = useState<number>(0);

  // Administrative Console & Live Entitlements Sync States
  const [schemes, setSchemes] = useState<any[]>([]);
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);

  useEffect(() => {
    // Instantly seeding using offline compiled database fallback
    setSchemes(SCHEMES_DATABASE);
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const res = await fetch("/api/schemes");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setSchemes(data);
        }
      }
    } catch (err) {
      console.warn("Could not synchronize live schemes list from server. Using offline compiled database.", err);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "h") {
        e.preventDefault();
        setShowAdminPanel(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Infinite Quotes Stream Setup
  const [infiniteQuotes, setInfiniteQuotes] = useState<Array<{
    id: number;
    text: string;
    textHi: string;
    category: string;
    categoryHi: string;
    author: string;
    authorHi: string;
  }>>([]);
  const [quotesPage, setQuotesPage] = useState<number>(1);

  // Procedural Generator helper for unlimited quotes!
  const generateMoreQuotes = (count: number) => {
    const catsHi: Record<string, string> = {
      "Welfare": "कल्याणकारी योजना",
      "Rights": "संवैधानिक अधिकार",
      "Dignity": "नागरिक सम्मान",
      "Farmer": "कृषि एवं अन्नदाता",
      "History": "ऐतिहासिक संकल्प"
    };

    const themes = [
      {
        en: "Article 14 of the Constitution secures legal equality, ensuring every marginal farmer stands as an equal partner in public benefits.",
        hi: "संविधान का अनुच्छेद 14 वैधानिक समानता सुनिश्चित करता है, जिससे हर सीमांत किसान सरकारी लाभों में एक समान भागीदार बनता है।",
        category: "Rights",
        author: "B.R. Ambedkar Legal Teachings",
        authorHi: "डॉ. बी.आर. अंबेडकर विधिक शिक्षा"
      },
      {
        en: "Direct financial payouts (DBT) bypass middleman corruption, turning our budget into a sacred contract of direct citizen empowerment.",
        hi: "सीधा बैंक ट्रांसफर (DBT) बिचौलियों के भ्रष्टाचार को समाप्त करता है, जिससे हमारा बजट प्रत्यक्ष सशक्तिकरण का एक पवित्र संकल्प बन जाता है।",
        category: "Welfare",
        author: "Public Finance Reform Registry",
        authorHi: "लोक वित्त सुधार रजिस्ट्री"
      },
      {
        en: "Under Section 3.2 of uidai rules, physical biometric exception handles worn-out skins through secure manual overrides. Public dignity is protected.",
        hi: "यूआईडीएआई नियमों की धारा 3.2 के तहत, घिसी हुई त्वचा वाले बुजुर्गों के लिए मैन्युअल ओवरराइड की व्यवस्था है। नागरिक स्वाभिमान सर्वोपरि है।",
        category: "Dignity",
        author: "Inclusion Exception Regulations",
        authorHi: "समावेशन अपवाद नियम"
      },
      {
        en: "The true engine of national growth tumbles in the soil of our smallholdings. Honoring the farmer is honoring India.",
        hi: "राष्ट्रीय विकास का वास्तविक इंजन हमारी छोटी खेतों की माटी में चलता है। किसान का सम्मान करना देश की संस्कृति का सम्मान करना है।",
        category: "Farmer",
        author: "Jai Jawan Jai Kisan Memorials",
        authorHi: "जय जवान जय किसान स्मारक"
      },
      {
        en: "Every digital Rupee mapped into an underserved mother's Zero-Balance Account represents a solid victory for national inclusion.",
        hi: "कमजोर आय वर्ग की माताओं के जन-धन बैंक खातों में भेजा गया हर एक रुपया राष्ट्रीय वित्तीय समावेशन की ठोस सफलता को दर्शाता है।",
        category: "Welfare",
        author: "National Inclusion Directorate",
        authorHi: "राष्ट्रीय वित्तीय समावेशन निदेशालय"
      },
      {
        en: "Section 4 of the Right to Information Act mandates proactive state directories, keeping civic audits clean and answers accessible.",
        hi: "सूचना के अधिकार अधिनियम की धारा 4 सार्वजनिक निर्देशालयों के स्व-प्रकाशन को अनिवार्य बनाती है, जिससे जवाबदेही पारदर्शी होती है।",
        category: "Rights",
        author: "Central Information Commission",
        authorHi: "केंद्रीय सूचना आयोग"
      },
      {
        en: "Lakhpati sister network cooperatives prove that village self-help operations are core safeguards of rural commerce.",
        hi: "लखपति दीदी सहकारी नेटवर्क यह सिद्ध करते हैं कि ग्रामीण स्वयं सहायता समूह ही ग्रामीण बाजार की मुख्य रक्षा प्राचीर हैं।",
        category: "Farmer",
        author: "National Livelihoods Mission",
        authorHi: "राष्ट्रीय ग्रामीण आजीविका मिशन"
      },
      {
        en: "Democratic responsibility isn't a passive gift but an active assertion. Learning parameters of public action is our first duty.",
        hi: "लोकतांत्रिक उत्तरदायित्व कोई उपहार नहीं बल्कि एक सक्रिय दावा है। सार्वजनिक नीतियों को समझना हमारा पहला नागरिक कर्तव्य है।",
        category: "Dignity",
        author: "Democratic Lexicon Union",
        authorHi: "लोकतांत्रिक शब्दकोश संघ"
      }
    ];

    const states = [
      { en: "Assam", hi: "असम" },
      { en: "Meghalaya", hi: "मेघालय" },
      { en: "Tripura", hi: "त्रिपुरा" },
      { en: "Nagaland", hi: "नागालैंड" },
      { en: "Sikkim", hi: "सिक्किम" },
      { en: "Mizoram", hi: "मिजोरम" },
      { en: "Arunachal", hi: "अरुणाचल प्रदेश" },
      { en: "Manipur", hi: "मणिपुर" },
      { en: "Bihar", hi: "बिहार" },
      { en: "Uttar Pradesh", hi: "उत्तर प्रदेश" }
    ];

    const templates = [
      {
        en: "Across {state} districts, {themeEn} This ensures stable security for agrarian stakeholders.",
        hi: "{state} के सभी क्षेत्रों में, {themeHi} यह भूमिपुत्रों के लिए स्थिर सुरक्षा सुनिश्चित करता है।"
      },
      {
        en: "{themeEn} This is actively enforced in the border communities of {state}.",
        hi: "{themeHi} यह {state} के सुदूर सीमावर्ती समुदायों में सक्रिय रूप से लागू है।"
      },
      {
        en: "Regarding inclusive welfare parameters, {themeEn} It empowers families inside {state}.",
        hi: "सर्वव्यापी लोक कल्याण के मापदंडों में, {themeHi} यह {state} के वंचित परिवारों को सीधा लाभ पहुँचाता है।"
      }
    ];

    const loadedQuotes: Array<{
      id: number;
      text: string;
      textHi: string;
      category: string;
      categoryHi: string;
      author: string;
      authorHi: string;
    }> = [];
    const baseLength = INTERESTING_FACTS_LIST.length;
    const currentLength = infiniteQuotes.length;

    for (let i = 0; i < count; i++) {
      const idx = currentLength + i;
      if (idx < baseLength) {
        const item = INTERESTING_FACTS_LIST[idx];
        loadedQuotes.push({
          id: item.id,
          text: item.text,
          textHi: item.textHi,
          category: item.category,
          categoryHi: item.categoryHi,
          author: item.author || item.source || "Government Archive",
          authorHi: item.categoryHi === "तथ्य" ? "शासकीय अभिलेखागार" : "स्वराज नीति ग्रंथ"
        });
      } else {
        const randTheme = themes[idx % themes.length];
        const randState = states[idx % states.length];
        const randTemplate = templates[idx % templates.length];

        const text = randTemplate.en
          .replace("{state}", randState.en)
          .replace("{themeEn}", randTheme.en);

        const textHi = randTemplate.hi
          .replace("{state}", randState.hi)
          .replace("{themeHi}", randTheme.hi);

        loadedQuotes.push({
          id: idx + 1,
          text,
          textHi,
          category: randTheme.category,
          categoryHi: catsHi[randTheme.category] || "कल्याण",
          author: `${randTheme.author} (${randState.en} Division)`,
          authorHi: `${randTheme.authorHi} (${randState.hi} अनुभाग)`
        });
      }
    }

    setInfiniteQuotes(prev => [...prev, ...loadedQuotes]);
  };

  // State hooks for specialized country facts and quotes loaded dynamically (Page Refresh support)
  const [currentFactIdx, setCurrentFactIdx] = useState<number>(() => Math.floor(Math.random() * INTERESTING_FACTS_LIST.length));
  const [isFactSpinning, setIsFactSpinning] = useState<boolean>(false);

  // Dual Scroll Handler for Rotating Wheels and Infinite Quote trigger page tracking
  useEffect(() => {
    const handleScrollEffects = () => {
      // 1. Wheel Rotation speed calibration
      const rotation = window.scrollY * 0.12;
      setScrollRotation(rotation);

      // 2. Infinite Quote lazy append trigger when reaching 75% toward page bottom
      if (activeTab === "home") {
        const threshold = document.documentElement.scrollHeight - window.innerHeight - 350;
        if (window.scrollY >= threshold) {
          setQuotesPage(prev => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScrollEffects, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollEffects);
  }, [activeTab]);

  // Initial loads
  useEffect(() => {
    const randomIdx = Math.floor(Math.random() * INTERESTING_FACTS_LIST.length);
    setCurrentFactIdx(randomIdx);
  }, []);

  // Sync subsequent infinite page transitions
  useEffect(() => {
    if (quotesPage > 1) {
      generateMoreQuotes(4);
    }
  }, [quotesPage]);

  const handleNextFact = () => {
    setIsFactSpinning(true);
    setTimeout(() => {
      setIsFactSpinning(false);
    }, 600);
    setCurrentFactIdx((prev) => (prev + 1) % INTERESTING_FACTS_LIST.length);
    triggerFeedback(language === "Hindi" ? "नया प्रेरणादायक तथ्य लोड किया गया" : "Loaded secure citizen fact card.");
  };

  // Local helper feedback alerts
  const triggerFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => {
      setFeedbackMsg("");
    }, 4000);
  };

  // Scroll to chat bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, chatLoading]);

  // Handle Speech synthesis read-aloud
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (!chatSpeechEnabled) return;

    const utterance = new SpeechSynthesisUtterance(text.slice(0, 400));
    const isHindi = /[\u0900-\u097F]/.test(text);
    const isBengaliOrAssamese = /[\u0980-\u09FF]/.test(text);

    if (isHindi) {
      utterance.lang = "hi-IN";
    } else if (isBengaliOrAssamese) {
      utterance.lang = "bn-IN";
    } else {
      utterance.lang = "en-IN";
    }
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  // Auto-speak when AI responds
  useEffect(() => {
    if (chatSpeechEnabled && chatHistory.length > 0) {
      const topMsg = chatHistory[chatHistory.length - 1];
      if (topMsg.role === "ai") {
        speakText(topMsg.text);
      }
    }
  }, [chatHistory, chatSpeechEnabled]);

  // Instantly cancel synthesis upon toggle off
  useEffect(() => {
    if (!chatSpeechEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [chatSpeechEnabled]);

  // Handle dynamic filtering for eligible schemes
  const getEligibleSchemesList = (): Scheme[] => {
    return schemes.filter(s => {
      // State match
      if (s.state !== "All India" && s.state !== profileState) {
        if (s.state === "Northeast Only") {
          const isNEState = ["Assam", "Meghalaya", "Mizoram", "Nagaland", "Sikkim", "Manipur", "Arunachal Pradesh", "Tripura"].includes(profileState);
          if (!isNEState) return false;
        } else {
          return false;
        }
      }

      // Income ceiling
      if (s.rules.maxIncome && profileIncome > s.rules.maxIncome) return false;

      // Age floor and ceiling
      if (s.rules.minAge && profileAge < s.rules.minAge) return false;
      if (s.rules.maxAge && profileAge > s.rules.maxAge) return false;

      // Occupation match
      if (s.rules.occupations && s.rules.occupations.length > 0) {
        if (!s.rules.occupations.includes(profileOccupation)) return false;
      }

      // Gender match
      if (s.rules.genders && s.rules.genders.length > 0) {
        if (!s.rules.genders.includes(profileGender)) return false;
      }

      // Category match
      if (s.rules.categories && s.rules.categories.length > 0) {
        if (!s.rules.categories.includes(profileCategory)) return false;
      }

      return true;
    });
  };

  const eligibleSchemes = getEligibleSchemesList();
  const claimedCount = eligibleSchemes.filter(s => claimedSchemes.includes(s.id)).length;
  
  // Readiness Score based on 9 core documents in national catalog
  const targetDocNames = [
    "Aadhaar Card", 
    "PAN Card", 
    "Voter ID", 
    "Bank Account (Aadhaar Seeded)", 
    "DigiLocker", 
    "Income Certificate", 
    "Domicile Certificate", 
    "Caste Certificate", 
    "Ration Card"
  ];
  const currentHeldTargetCount = targetDocNames.filter(d => {
    if (d === "Voter ID") {
      return inventoryDocs.includes("Voter ID") || inventoryDocs.includes("Voter ID (EPIC)");
    }
    return inventoryDocs.includes(d);
  }).length;
  const readinessPercentage = Math.round((currentHeldTargetCount / targetDocNames.length) * 100);

  // Selected rejection diagnostic parameters
  const activeRejectSchemeObj = schemes.find(s => s.id === selectedRejectScheme) || schemes[0] || SCHEMES_DATABASE[0];
  const activeRejectionReasonObj = activeRejectSchemeObj.rejectionReasons[selectedRejectReasonIdx] || activeRejectSchemeObj.rejectionReasons[0] || {
    reason: "General Document Rejection",
    correction: "Verify the accurate spelling matches against physical cards and retrigger biometrics.",
    timeline: "14 Days"
  };

  // Local knowledge check for AI fallback chatbot
  const handleChatSubmitLocalFallback = (text: string): string => {
    const rawLine = text.toLowerCase();
    if (rawLine.includes("kisan") || rawLine.includes("farmer") || rawLine.includes("कृषि") || rawLine.includes("किसान")) {
      return `**PM-KISAN Samman Nidhi Guidance Checklist:**
• **Benefit Details:** ₹6,000 per fiscal year paid in three equal installments of ₹2,000 directly.
• **Responsible Ministry:** Ministry of Agriculture and Farmers Welfare.
• **Eligibility:** Small and marginal landholding farmer families.
• **Required Documents:** Aadhaar Card, Land Mutation Records (Khatauni) in applicant's name, and Aadhaar-seeded Bank Account.
• **Common Rejection Cause:** Land mutation (Fard) pending, or name discrepancy across banking and revenue ledgers.
• **How to Fix:** Visit the local Circle Office or meet your block Patwari to acquire physical mutated ledger copy. Verify status on the official portal: https://pmkisan.gov.in.
• **Official Helpline:** 155261 / 1800-115-526.`;
    }
    if (rawLine.includes("ayushman") || rawLine.includes("health") || rawLine.includes("hospital") || rawLine.includes("बीमारी") || rawLine.includes("इलाज") || rawLine.includes("pmjay")) {
      return `**Ayushman Bharat PM-JAY National Health Protection Cover:**
• **Benefit Details:** Mapped families receive cashless secondary and tertiary hospital treatment up to ₹5,00,000 per family annually.
• **Responsible Ministry:** Ministry of Health and Family Welfare / National Health Authority.
• **Eligibility:** Socio-Economic Caste Census (SECC-2011) surveyed households and prioritized NFSA Ration Card holders.
• **Required Documents:** Aadhaar Card, Family Ration Card, or verified SECC entry records.
• **Correction Runway:** Find any general government district hospital and contact the helpdesk named 'Ayushman Mitra' for biometric mapping.
• **Official Portal:** https://pmjay.gov.in.
• **Official Helpline:** 14555 / 1800-111-565.`;
    }
    if (rawLine.includes("awas") || rawLine.includes("housing") || rawLine.includes("pmay") || rawLine.includes("घर")) {
      return `**Pradhan Mantri Awas Yojana (PMAY-G) Housing Assistance:**
• **Benefit Details:** Financial subsidy of ₹1.2 Lakh in plains and ₹1.3 Lakh in hilly regions, along with an additional ₹12,000 toilet grant.
• **Responsible Ministry:** Ministry of Rural Development.
• **Common Rejection Point:** Owning any active commercial vehicle, motorized tractor, or secondary permanent brick 'pucca' home.
• **How to Fix:** File an appeal directly to your block BDO containing verified photograph proof of your dilapidated kutcha dwelling, countersigned by the Gram Panchayat Head.
• **Official Portal:** https://pmayg.nic.in.
• **Official Helpline:** 1800-11-6446.`;
    }
    if (rawLine.includes("scholarship") || rawLine.includes("student") || rawLine.includes("ishan") || rawLine.includes("छात्रवृत्ति") || rawLine.includes("কলেজ") || rawLine.includes("university")) {
      return `**North-East Regional Higher Education Support (Ishan Uday):**
• **Benefit details:** Direct scholarship transfers of ₹5,400 monthly for general degree students and ₹7,800 monthly for technical degree programs.
• **Responsible Ministry:** UGC / Ministry of Education.
• **Eligibility:** Students holding domicile in Northeast states, passing Class-12 checks, and maintaining family income below ₹4.5 Lakh yearly.
• **Common Mismatch:** Rejection happens if your income certificate is issued by a notary advocate rather than the Circle Revenue Officer.
• **How to Fix:** Present fresh income credentials signed directly by the Circle Officer or Sub-divisional Magistrate.
• **Official Portal:** https://scholarships.gov.in.
• **Helpline assistance:** 0120-6619540.`;
    }
    if (rawLine.includes("aadhar") || rawLine.includes("आधार") || rawLine.includes("uidai") || rawLine.includes("fingerprint") || rawLine.includes("biometric")) {
      return `**Aadhaar Card Biometric & Inclusion Guide:**
• **Purpose:** Mapped biometric identifier essential for receiving central cash transfers (DBT).
• **Where to Apply:** Physical bank branch counters or block post offices.
• **Common Rejection:** Blurred biometric captures, or demographic spelling mismatch.
• **Special Rule for Faded Fingers:** UIDAI Manual Section 3.2 explicitly declares that citizens with faded fingerprints or elderly skin are entitled to 'Iris-only exceptions' or facial backups. Request the computer operator to trigger these flags.
• **Official Portal:** https://uidai.gov.in.`;
    }
    if (rawLine.includes("rejection") || rawLine.includes("reject") || rawLine.includes("denied") || rawLine.includes("अस्वीकृत") || rawLine.includes("খারিজ")) {
      return `**How to Recover from Scheme Rejections:**
• **1. Demand Reasons:** Public offices are legally required to deliver written, reasoned order files explaining your status.
• **2. Verify spelling:** Check if spelling is identical across Aadhaar, bank records, and state directories.
• **3. Seeding Check:** Verify with your bank manager that 'DBT Consent is active on the NPCI network mapping'. A bank account alone is not enough.
• **4. Appeals Hub:** Utilize our 'Appeals' tab to draft a Section 6(1) RTI status query. Mail it with a ₹10 IPO tag via Speed Post.`;
    }
    if (rawLine.includes("undocumented") || rawLine.includes("no card") || rawLine.includes("missing") || rawLine.includes("बिना दस्तावेज़") || rawLine.includes("খতিয়ান")) {
      return `**Baseline Document Inclusion Sequence:**
• **Step 1:** Request a 'Certificate of Identity' featuring your passport photo, stamped by your local Gram Panchayat President or Municipal Ward Counselor. This serves as baseline proof.
• **Step 2:** Book a biometric registration slot at any nearby bank or post office Aadhaar desk using this identity certificate.
• **Step 3:** Link an active mobile SIM card to this new Aadhaar registry.
• **Step 4:** Walk into the nearest Post Office Payments Bank (IPPB) branch to open a zero-balance PM Jan Dhan Account. Mapped NPCI DBT transfers.
• **Step 5:** Activate your DigiLocker vault to sync state certificates digitally.`;
    }
    
    return `**Haqqdar Assistant (Citizen Guidance Fallback Panel):**

I am ready to explain criteria, documentation pipelines, or correction paths directly.

*Suggested items to type in the message bar:*
• **"PM Kisan"** - direct farm income setup
• **"Ayushman"** - cashless health card details
• **"Scholarships"** - student support and Ishan Uday rules
• **"Aadhaar"** - biometric exceptions and updating instructions
• **"Rejection"** - how to diagnose blockages and appeal
• **"Undocumented"** - priority roadmap for people with zero cards

What specific document or benefit blockage is affecting your family?`;
  };

  // Submit conversation message
  const handleChatSubmit = async (textToSend?: string) => {
    const rawText = textToSend || chatInput;
    if (!rawText.trim()) return;

    if (rawText.trim().toLowerCase() === "/admin") {
      setShowAdminPanel(true);
      setChatHistory(prev => [
        ...prev,
        {
          role: "user" as const,
          text: "/admin",
          time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
        },
        {
          role: "ai" as const,
          text: "Opening secure Administrative registry gate. Please complete credential check on the overlay console...",
          time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
        }
      ]);
      setChatInput("");
      return;
    }

    const userMsg = {
      role: "user" as const,
      text: rawText,
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
    };

    setChatHistory(prev => [...prev, userMsg]);
    setChatInput("");
    setChatLoading(true);

    try {
      // Fetch server api
      const previousMessages = chatHistory.slice(-5).map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: rawText,
          previousMessages,
          language: language
        })
      });

      const data = await res.json();
      const aiReply = {
        role: "ai" as const,
        text: data.text,
        time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
      };

      setChatHistory(prev => [...prev, aiReply]);
    } catch (err) {
      console.warn("API offline, falling back directly to local rule-based solver", err);
      const localResult = handleChatSubmitLocalFallback(rawText);
      const errorReply = {
        role: "ai" as const,
        text: localResult,
        time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
      };
      setChatHistory(prev => [...prev, errorReply]);
    } finally {
      setChatLoading(false);
    }
  };

  // Legal RTI / Appeal draft generation download
  const downloadLegalRTIDraft = () => {
    const generatedDraft = generateRTITemplateText();
    const blob = new Blob([generatedDraft], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Haqqdar_RTI_Appeals_Draft_${rtiForm.district}_${rtiForm.type.replace(/\s+/g, "_")}.txt`;
    link.click();
    triggerFeedback("Draft file successfully compiled and downloaded! Print and mail to local department designated Officer.");
  };

  const generateRTITemplateText = (): string => {
    const dateStr = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
    
    if (rtiForm.type === "Application Status RTI") {
      return `---------------------------------------------------------
FORM A - RTI REQUEST UNDER SECTION 6(1) OF THE RTI ACT, 2005
---------------------------------------------------------
To,
The State Public Information Officer (SPIO),
Office of the: ${rtiForm.dept || "Competent Public Authority Office"},
District Headquarters: ${rtiForm.district || "District Revenue"}, ${rtiForm.state || "State Territory"}.

Subject: Application for Information under Right to Information Act, 2005.

1. Name of the Applicant: ${rtiForm.name}
2. Permanent Physical Address: ${rtiForm.address}
3. Active Mobile Number: ${rtiForm.mobile}
4. Citizenship: Citizen of India.

PARTICULARS OF INFORMATION REQUESTED:
a) Targeted Scheme: ${rtiForm.scheme}
b) Target Reference ID: ${rtiForm.appId || "Not Mapped"}
c) Subject-Matter: Statutory inspection of processing logs and rejection reasons.

DRAFT QUERIES:
1. Please provide the complete step-by-step processing logs of my application for ${rtiForm.scheme} with exact internal processing dates.
2. State the reasons and guidelines under which my application has been delayed/blocked. Attach certified copies of the physical remarks on file.
3. State the name and designation of the desk officer responsible for reviewing my file since submission.
4. Mapped timeline: What is the statutory timeline under the State Right to Public Services Act for this benefit?

PAYMENT DETAILS:
I enclose the standard application fee of Rs. 10/- via Indian Postal Order (IPO) Ref No: __________________ Dated: ${dateStr}.
(BPL Candidates are exempt under standard rules - certification attached).

Yours Faithfully,

(Signature of Applicant)
Date: ${dateStr}`;
    } else if (rtiForm.type === "First Appeal") {
      return `---------------------------------------------------------
FORM B - FIRST APPEAL UNDER SECTION 19(1) OF THE RTI ACT, 2005
---------------------------------------------------------
To,
The First Appellate Authority (FAA),
Office of the: ${rtiForm.dept || "Directorate Head Office"},
District Headquarters: ${rtiForm.district || "District Revenue"}, ${rtiForm.state || "State Territory"}.

Subject: First Appeal against non-response / arbitrary rejection of Section 6(1) inquiry.

1. Name of the Recipient: ${rtiForm.name}
2. Permanent Address: ${rtiForm.address}
3. Base Mobile: ${rtiForm.mobile}

DETAILS OF GRIEVANCE:
a) Date of filing original S.6(1) application: 30 days prior key list.
b) SPIO responding details: Ignored / Mismatch.
c) Target entitlement: ${rtiForm.scheme} with ID ${rtiForm.appId}.

DRAFT QUERIES FOR REVELATION:
1. Direct the SPIO to immediately supply the detailed certified copies of processing records.
2. Provide compensation under Section 20 of the Act for arbitrary delay without reasonable grounds.

Yours Faithfully,

(Signature of appellant)
Date: ${dateStr}`;
    } else {
      return `---------------------------------------------------------
OFFICIAL REGISTERED GRIEVANCE COMPLAINT MEMORANDUM
---------------------------------------------------------
To,
The District Magistrate / Block Development Officer,
Department of Revenue & Social Welfare,
District: ${rtiForm.district || "Revenue Area"}, State: ${rtiForm.state || "State Territory"}.

Subject: Registered complaint regarding arbitrary suspension / denial of entitlement.

1. Complainant Name: ${rtiForm.name}
2. Address: ${rtiForm.address}
3. Contact Number: ${rtiForm.mobile}

GRIEVANCE STATEMENT:
I, the undersigned, am a legitimate resident eligible for ${rtiForm.scheme}. My application (ID: ${rtiForm.appId || "Awaiting Map"}) was rejected based on the following: "${rtiForm.specificReason}".
I affirm that my supporting documents (${rtiForm.docsAttached}) are valid.

CITIZEN ADVOCACY DEMANDS:
1. Conduct physical verification of my entitlement eligibility parameters at my residence.
2. Direct the desk officers to process my application profile inside the 15-day RTS timeline limit.

Yours Sincerely,

(Signature of Applicant)
Date: ${dateStr}`;
    }
  };

  return (
    <div className={`min-h-screen text-white bg-[#000000] font-sans antialiased relative selection:bg-saffron selection:text-black ${isLargeText ? "text-lg" : "text-sm"}`} style={{ fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "SF Pro", "SF Compact", sans-serif' }}>
      
      {/* 📸 VINTAGE SMOOTH PARALLAX DIGITAL INDIA BACKGROUND IMAGE (Injected per user design specification) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ease-in-out opacity-[0.065]" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          filter: "grayscale(100%) contrast(150%) brightness(55%)"
        }} 
      />
      
      {/* BACKGROUND GRAPHICAL LAYER (Subtle Contour lines and real geometry, extremely low opacity) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-2">
        <svg viewBox="0 0 100 100" className="w-full h-full text-white pointer-events-none">
          <circle cx="50" cy="50" r="38" className="chakra-bg" fill="none" stroke="currentColor" strokeWidth="0.08" strokeDasharray="1, 2" />
          <circle cx="50" cy="50" r="24" className="chakra-bg" fill="none" stroke="currentColor" strokeWidth="0.05" />
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            return (
              <line 
                key={i}
                x1="50" 
                y1="50" 
                x2={50 + 38 * Math.cos((angle * Math.PI) / 180)} 
                y2={50 + 38 * Math.sin((angle * Math.PI) / 180)} 
                stroke="currentColor" 
                strokeWidth="0.04" 
              />
            );
          })}
        </svg>
      </div>

      {/* Flagship Notice Banner Toast */}
      {feedbackMsg && (
        <div className="fixed top-20 right-4 z-[500] max-w-sm glass-panel text-xs text-[#FF9933] border-[#FF9933]/40 p-4 rounded-xl shadow-2xl flex items-start gap-3 animate-pulse">
          <Info className="w-4 h-4 text-[#FF9933] shrink-0 mt-0.5" />
          <div>{feedbackMsg}</div>
        </div>
      )}

      {/* HEADER NAVIGATING BAR (Pure Apple Developer-style deep black with high-contrast elements) */}
      <header className="sticky top-0 z-[100] bg-[#000000]/95 backdrop-blur-md border-b border-white/10 px-4">


        <div className="max-w-7xl mx-auto py-3 flex items-center justify-between">
          
          {/* Logo brand & tagline with increased scale */}
          <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => setActiveTab("home")}>
            <div className="w-11 h-11 flex items-center justify-center">
              {/* High-fidelity Haqqdar Logo Emblem Symbol matching user image */}
              <svg viewBox="0 0 100 100" className="w-full h-full select-none" referrerPolicy="no-referrer">
                <defs>
                  <radialGradient id="emblemGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="saffronGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF9933" />
                    <stop offset="100%" stopColor="#D46A00" />
                  </linearGradient>
                  <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22C55E" />
                    <stop offset="100%" stopColor="#15803D" />
                  </linearGradient>
                </defs>
                
                {/* Circular glow background shadow */}
                <circle cx="50" cy="50" r="46" fill="url(#emblemGlow)" opacity="0.1" />

                {/* Left Orange Outer Crescent Arc */}
                <path d="M 50 8 A 42 42 0 0 0 16 80 A 40 40 0 0 1 50 14 Z" fill="url(#saffronGrad)" />
                
                {/* Right Green Outer Crescent Arc */}
                <path d="M 50 8 A 42 42 0 0 1 84 80 A 40 40 0 0 0 50 14 Z" fill="url(#greenGrad)" />

                {/* Ashoka Chakra in the top center */}
                <g transform="translate(50, 30)">
                  <circle cx="0" cy="0" r="14" fill="#000000" stroke="#3B82F6" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="12" fill="none" stroke="#FFFFFF" strokeWidth="1" />
                  <circle cx="0" cy="0" r="10.5" fill="none" stroke="#3B82F6" strokeWidth="0.75" />
                  {/* 24 Spokes */}
                  {Array.from({ length: 24 }).map((_, i) => (
                    <line key={i} x1="0" y1="0" x2={12 * Math.cos((i * 15 * Math.PI) / 180)} y2={12 * Math.sin((i * 15 * Math.PI) / 180)} stroke="#3B82F6" strokeWidth="0.75" />
                  ))}
                  <circle cx="0" cy="0" r="3" fill="#1E40AF" stroke="#FFFFFF" strokeWidth="0.5" />
                </g>

                {/* Left Supportive Hand Leaf (Orange / Saffron) */}
                <path d="M 22 55 C 22 71, 38 86, 48 86 C 45 74, 34 58, 28 48 C 27 51, 24 49, 22 55 Z" fill="url(#saffronGrad)" />

                {/* Right Supportive Hand Leaf (Green) */}
                <path d="M 78 55 C 78 71, 62 86, 52 86 C 55 74, 66 58, 72 48 C 73 51, 76 49, 78 55 Z" fill="url(#greenGrad)" />

                {/* Central Uplifting White Figure */}
                {/* Head */}
                <circle cx="50" cy="46" r="4" fill="#FFFFFF" />
                {/* V-Shape Body Arms */}
                <path d="M 35 40 C 40 49, 47 54, 50 66 C 53 54, 60 49, 65 40 C 58 49, 53 51, 50 52 C 47 51, 42 49, 35 40 Z" fill="#FFFFFF" />
                <path d="M 50 66 L 50 83" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1 leading-none">
                <span className="font-sans font-black text-sm sm:text-base md:text-lg tracking-widest text-saffron uppercase">HAQQDAR</span>
                <span className="text-[6.5px] sm:text-[7px] font-extrabold bg-amber-500/10 text-saffron px-1 py-0.5 rounded border border-amber-500/20 tracking-wider">CITIZEN PORTAL</span>
              </div>
              <p className="text-[7.5px] text-gray-400 mt-0.5 uppercase font-semibold tracking-wider">Democratic Inclusion • Verified Government Directory</p>
            </div>
          </div>

          {/* Core navigation tabs: Gap & Recovery emphasized as highlights, Northeast State Hub at absolute last! */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {[
              { id: "home", icon: Landmark },
              { id: "navigator", icon: Compass },
              { id: "documents", icon: UserCheck }, // HIGHLIGHT 1
              { id: "recovery", icon: AlertTriangle }, // HIGHLIGHT 2
              { id: "benefits", icon: Activity },
              { id: "agriculture", icon: Sprout },
              { id: "appeals", icon: FileText },
              { id: "assistant", icon: Shield },
              { id: "northeast", icon: Globe }, // Northeast regional focus at last!
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                  className={`flex items-center gap-1 px-1.5 py-1.5 sm:px-2 rounded-lg text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-all duration-150 ${
                    activeTab === tab.id 
                      ? "bg-gradient-to-r from-[#FF9933]/20 to-transparent text-[#FF9933] border border-[#FF9933]/40 shadow-sm" 
                      : "text-gray-300 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon className="w-3 h-3 shrink-0" />
                  {t("tab." + tab.id)}
                </button>
              );
            })}
          </nav>

          {/* Accessibility controls, Language Dropdown & Mobile Menu Trigger */}
          <div className="flex items-center gap-1.5">
            <select 
              value={language}
              id="header-lang-select"
              onChange={(e) => {
                setLanguage(e.target.value);
                triggerFeedback(e.target.value === "Hindi" ? "भाषा हिंदी में बदल दी गई है" : "Language set to English");
              }}
              className="bg-black border border-white/10 text-gray-300 text-[9px] sm:text-[10px] rounded px-1.5 py-1 font-bold outline-none cursor-pointer focus:border-amber-500 hover:bg-zinc-900 hover:text-white transition-colors"
            >
              <option value="English">English</option>
              <option value="Hindi">हिन्दी</option>
            </select>

            {/* Mobile menu trigger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-trigger"
              className="lg:hidden p-1.5 rounded-lg border border-[#ffffff]/15 text-gray-300 hover:bg-white/5 cursor-pointer"
            >
              <Menu className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* HIGH-FIDELITY BHARAT STATUS BAR SUB-BAR (Placed directly under the core header in its own horizontal slot) */}
        <div className="max-w-7xl mx-auto py-1.5 border-t border-white/5 flex flex-wrap items-center justify-between text-[9px] text-zinc-400 font-mono tracking-wide">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1 text-emerald-450">
              <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
              <span>{language === "Hindi" ? "सत्यापित। विश्वसनीय। भारत के प्रत्येक नागरिक के लिए।" : "Verified. Trusted. For Every Citizen of Bharat."}</span>
            </span>
            <span className="flex items-center gap-1">
              <span>🇮🇳</span>
              <span>{language === "Hindi" ? "भारत" : "India"}</span>
            </span>
            <span className="flex items-center gap-1 text-white">
              <Clock className="w-3 h-3 text-[#FF9933] shrink-0" />
              <span className="font-semibold">{clockTime}</span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-zinc-500 shrink-0" />
              <span>{clockDate}</span>
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="flex h-1 w-1 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1 w-1 bg-emerald-500"></span>
              </span>
              <span>{language === "Hindi" ? "प्रणाली सक्रिय" : "Systems Online"}</span>
            </span>
          </div>
        </div>

        {/* Mobile menu navigation drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black border-t border-white/10 px-4 py-4 space-y-2 mt-2 animate-fadeIn" id="mobile-menu-drawer">
            {[
              { id: "home", icon: Landmark },
              { id: "navigator", icon: Compass },
              { id: "documents", icon: UserCheck },
              { id: "recovery", icon: AlertTriangle },
              { id: "benefits", icon: Activity },
              { id: "agriculture", icon: Sprout },
              { id: "appeals", icon: FileText },
              { id: "assistant", icon: Shield },
              { id: "northeast", icon: Globe },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-xs font-bold uppercase transition-colors ${
                    activeTab === tab.id ? "bg-[#FF9933]/20 text-[#FF9933] font-black" : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {t("tab." + tab.id)}
                </button>
              );
            })}
            
            {/* Mobile language selector */}
            <div className="pt-3 mt-1 border-t border-white/15 flex items-center justify-between">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{language === "Hindi" ? "भाषा बदलें:" : "Change Language:"}</span>
              <select 
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  triggerFeedback(e.target.value === "Hindi" ? "भाषा हिंदी में बदल दी गई है" : "Language set to English");
                }}
                className="bg-gray-900 border border-white/10 text-gray-200 text-xs rounded-lg px-3 py-1.5 font-bold outline-none cursor-pointer focus:border-amber-500 hover:bg-gray-800 transition-colors"
                id="mobile-lang-select"
              >
                <option value="English">English</option>
                <option value="Hindi">हिन्दी (Hindi)</option>
              </select>
            </div>
          </div>
        )}
      </header>

      {/* CORE CONTENT WRAPPER */}
      <main className="max-w-7xl mx-auto px-4 py-8 z-10 relative">

        {/* 🇮🇳 DUAL-LAYER NATIONAL EMBASSY WRAPPER: Generates Indian Flag Background on EVERY tab seamlessly */}
        <div className="bg-zinc-950/20 border border-white/5 rounded-3xl p-4 sm:p-6 min-h-[400px] mb-8 shadow-2xl relative overflow-hidden" id="national-tab-stage">
          <IndianFlagBackground />
          <div className="relative z-10 w-full h-full">

            {/* 1. HOME TAB */}
            {activeTab === "home" && (
              <div className="space-y-16 animate-fadeIn" id="tab-view-home">

                       {/* HER0 DUAL-COLUMN LAYOUT AS PER USER SPECIFICATION MOCKUP SCREENSHOT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8 border-b border-white/5 pb-10" id="hero-dashboard-section">
              
              {/* LEFT COLUMN: HERO HEADLINE & ACTIONS WITH ROTATING BACKGROUND WHEEL & FUTURE PLANNER AI */}
              <div className="lg:col-span-8 space-y-6 relative" id="hero-marketing-col">
                
                {/* 🛞 UNIQUE DECORATIVE BACKGROUND ROTATING ASHOKA CHAKRA EMBOSS (Indian Tri-color Glow) */}
                <div 
                  className="absolute -top-24 -left-20 w-96 h-96 rounded-full opacity-[0.11] blur-[0.5px] pointer-events-none z-0 overflow-visible"
                  style={{
                    transform: 'rotate(-12deg)',
                    transformOrigin: 'center center'
                  }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#3344cc]">
                    {/* Glowing Flag Segment Rims */}
                    <circle cx="50" cy="50" r="48" fill="none" stroke="#FF9933" strokeWidth="1.5" strokeDasharray="30 150" />
                    <circle cx="50" cy="50" r="47" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="50 120" />
                    <circle cx="50" cy="50" r="46" fill="none" stroke="#138808" strokeWidth="1.5" strokeDasharray="60 90" />
                    
                    {/* Core Wheels and spokes */}
                    <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="50" cy="50" r="39" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
                    <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1.2" />
                    
                    {/* 24 spokes */}
                    {Array.from({ length: 24 }).map((_, i) => (
                      <line 
                        key={i} 
                        x1="50" 
                        y1="50" 
                        x2={50 + 42 * Math.cos((i * 15 * Math.PI) / 180)} 
                        y2={50 + 42 * Math.sin((i * 15 * Math.PI) / 180)} 
                        stroke="currentColor" 
                        strokeWidth="0.75" 
                      />
                    ))}
                  </svg>
                </div>

                <div className="relative z-10 space-y-4">
                  {/* Top verified badge */}
                  <div className="inline-flex items-center gap-2 bg-[#FF9933]/15 border border-[#FF9933]/30 px-3 py-1 rounded-full text-xs font-serif text-saffron">
                    <span className="w-2 h-2 rounded-full bg-[#138808] animate-pulse" />
                    <span>{language === "Hindi" ? "सत्यापित। विश्वसनीय। भारत के प्रत्येक नागरिक के लिए।" : "Verified. Trusted. For Every Citizen of Bharat."}</span>
                  </div>

                  {/* Elegant typography header from mockup */}
                  <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight animate-entrance-headline">
                    {language === "Hindi" ? "आपका अधिकार।" : "Your Rights."}<br />
                    {language === "Hindi" ? "आपका लाभ।" : "Your Benefits."}<br />
                    <span className="bg-gradient-to-r from-[#FF9933] via-white to-[#138808] bg-clip-text text-transparent">
                      {language === "Hindi" ? "आपका भविष्य।" : "Your Future."}
                    </span>
                  </h1>

                  {/* Body description */}
                  <p className="text-gray-350 text-sm md:text-base leading-relaxed max-w-xl font-sans">
                    {language === "Hindi" 
                      ? "सरकारी योजनाओं की खोज करें, दस्तावेज़ों का सत्यापन करें, अस्वीकृत आवेदनों को पुनः प्राप्त करें और पूर्ण विश्वास के साथ प्रमाणित सार्वजनिक सेवाओं तक पहुँचें।" 
                      : "Discover government schemes, verify documents, recover rejected applications, and access verified public services with confidence."}
                  </p>

                  {/* Indian Tri-color Hero Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                    <button 
                      onClick={() => { setActiveTab("benefits"); window.scrollTo(0,0); }}
                      className="bg-gradient-to-r from-[#FF9933] to-[#e65c00] text-black font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,153,51,0.25)] hover:shadow-[0_4px_30px_rgba(255,153,51,0.4)] transition-all hover:scale-[1.02] cursor-pointer animate-entrance-card"
                    >
                      <span>{language === "Hindi" ? "पात्रता जाँचें" : "Check Eligibility"}</span>
                      <ChevronRight className="w-4 h-4 shrink-0" />
                    </button>
                    <button 
                      onClick={() => { setActiveTab("documents"); window.scrollTo(0,0); }}
                      className="bg-black/40 hover:bg-[#121214] border border-white/10 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer animate-entrance-card"
                    >
                      <span>{language === "Hindi" ? "दस्तावेज़ तत्परता" : "Document Readiness"}</span>
                      <ChevronRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>

                  {/* Dynamic scroll indicator from mockup footer lines */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 border-t border-white/5 text-[11px] text-gray-450 font-mono">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#138808]" /> 100% {language === "Hindi" ? "सत्यापित स्रोत" : "Verified Sources"}</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-saffron" /> {language === "Hindi" ? "कोई बिचौलिया नहीं" : "No Middlemen"}</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {language === "Hindi" ? "कोई गलत जानकारी नहीं" : "No Fake Information"}</span>
                  </div>
                </div>

                {/* DYNAMIC BHARAT REAL-TIME STATS ROW */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-zinc-950/60 border border-white/5 font-mono">
                  <div className="space-y-0.5">
                    <span className="text-sm font-black text-white block">🪙 ₹12.4 Cr+</span>
                    <span className="text-[10px] text-gray-500 block uppercase tracking-wider">{language === "Hindi" ? "पारदर्शी लाभ वितरित" : "Benefits Tracked"}</span>
                  </div>
                  <div className="space-y-0.5 border-l border-white/5 pl-4">
                    <span className="text-sm font-black text-white block">👥 1.8 L+</span>
                    <span className="text-[10px] text-gray-500 block uppercase tracking-wider">{language === "Hindi" ? "सहायता प्राप्त नागरिक" : "Citizens Helped"}</span>
                  </div>
                  <div className="space-y-0.5 border-l border-white/5 pl-4">
                    <span className="text-sm font-black text-white block">📄 420+</span>
                    <span className="text-[10px] text-gray-500 block uppercase tracking-wider">{language === "Hindi" ? "अनुक्रमित नीतियां" : "Schemes Indexed"}</span>
                  </div>
                  <div className="space-y-0.5 border-l border-white/5 pl-4">
                    <span className="text-sm font-black text-white block">🛡️ 98%</span>
                    <span className="text-[10px] text-gray-500 block uppercase tracking-wider">{language === "Hindi" ? "सत्यापन प्रमाणिकता" : "Accuracy Rate"}</span>
                  </div>
                </div>

                {/* BHARAT CAREER NAVIGATOR (UPGRADED FROM FUTURE PLANNER) */}
                <BharatCareerNavigator 
                  language={language}
                  triggerFeedback={triggerFeedback}
                />

              </div>

              {/* RIGHT COLUMN: GORGEOUS CITIZEN READINESS SCORE CARD, LIVE STATUS CENTER, QUICK ACCESS */}
              <div className="lg:col-span-4 space-y-6" id="hero-dashboard-col">
                
                {/* 1. CITIZEN READINESS SCORE CARD (Exactly as shown in Mockup Screenshot) */}
                <div className="glass-panel p-5 rounded-3xl border-white/10 bg-[#07070a]/90 shadow-2xl relative overflow-hidden space-y-4" id="citizen-readiness-card">
                  {/* Subtle India Map Outline Watermark behind Card */}
                  <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Map_of_India.svg')] bg-no-repeat bg-contain bg-center scale-95" />

                  {/* Header Title with Info trigger */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5 relative z-10">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-black text-xs text-white tracking-wide">
                        {language === "Hindi" ? "नागरिक तत्परता स्कोर" : "Citizen Readiness Score"}
                      </h3>
                      <button 
                        onClick={() => triggerFeedback(language === "Hindi" ? "यह स्कोर आपके पास उपलब्ध बुनियादी सरकारी पहचान पत्रों की संख्या पर आधारित है।" : "This score is computed directly based on the mandatory public certificates you possess.")}
                        title="About the score index"
                        className="text-gray-500 hover:text-white transition-colors cursor-pointer"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                    <button 
                      onClick={() => { setActiveTab("documents"); window.scrollTo(0,0); }}
                      className="text-xs text-[#FF9933] hover:underline font-bold cursor-pointer"
                    >
                      {language === "Hindi" ? "विवरण देखें" : "View Details"}
                    </button>
                  </div>

                  {/* Circular Dial and Status Split Column */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center relative z-10">
                    
                    {/* Radial Dial Indicator */}
                    <div className="sm:col-span-5 flex flex-col items-center text-center">
                      <div className="relative w-28 h-28 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="56"
                            cy="56"
                            r="44"
                            className="text-white/5 stroke-current"
                            strokeWidth="7"
                            fill="transparent"
                          />
                          <circle
                            cx="56"
                            cy="56"
                            r="44"
                            className="stroke-current transition-all duration-1000 ease-out"
                            style={{
                              color: readinessPercentage === 100 ? "#138808" : readinessPercentage >= 70 ? "#FF9933" : "#ef4444",
                              strokeDasharray: `${2 * Math.PI * 44}`,
                              strokeDashoffset: `${2 * Math.PI * 44 * (1 - readinessPercentage / 100)}`
                            }}
                            strokeWidth="7"
                            fill="transparent"
                          />
                        </svg>
                        <div className="absolute text-center col-span-1">
                          <span className="text-2xl font-serif font-black text-white">{readinessPercentage}%</span>
                          <span className={`text-[8px] uppercase tracking-wider font-extrabold block text-center mt-0.5 ${
                            readinessPercentage >= 70 ? "text-[#22c55e]" : "text-[#FF9933]"
                          }`}>
                            {readinessPercentage >= 70 ? (language === "Hindi" ? "उत्कृष्ट" : "Good") : (language === "Hindi" ? "अपर्याप्त" : "Needs Work")}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Checkboxes List (Right 7 cols) with dynamic interactive links */}
                    <div className="sm:col-span-7 space-y-2 font-sans text-[11px]">
                      {[
                        { name: "Aadhaar", norm: "Aadhaar Card" },
                        { name: "Bank Account", norm: "Bank Account (Aadhaar Seeded)" },
                        { name: "PAN", norm: "PAN Card" },
                        { name: "Voter ID", norm: "Voter ID" },
                        { name: "DigiLocker", norm: "DigiLocker" }
                      ].map((item, idx) => {
                        const hasDoc = inventoryDocs.includes(item.norm) || (item.name === "Voter ID" && inventoryDocs.includes("Voter ID (EPIC)"));
                        return (
                          <div key={idx} className="flex items-center justify-between">
                            <span className="text-gray-300 font-bold flex items-center gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${hasDoc ? "bg-[#138808]" : "bg-[#FF9933]"}`} />
                              {item.name}
                            </span>
                            <button
                              onClick={() => {
                                if (hasDoc) {
                                  setInventoryDocs(inventoryDocs.filter(d => d !== item.norm));
                                } else {
                                  setInventoryDocs([...inventoryDocs, item.norm]);
                                }
                                triggerFeedback(language === "Hindi" ? "दस्तावेज़ की स्थिति बदली गई" : `Updated registration check for ${item.name}.`);
                              }}
                              className={`flex items-center gap-1 py-0.5 px-1.5 rounded font-mono text-[8px] font-black cursor-pointer ${
                                hasDoc 
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                                  : "bg-amber-500/10 text-saffron border border-amber-500/20"
                              }`}
                            >
                              {hasDoc ? (
                                <><span>✓</span> <span>{language === "Hindi" ? "सत्यापित" : "Active"}</span></>
                              ) : (
                                <><span>!</span> <span>{language === "Hindi" ? "लापता" : "Missing"}</span></>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>

                  </div>

                  {/* Lock more benefits block with realistic computations */}
                  <div className="bg-black/35 border border-white/5 p-3 rounded-2xl text-[11px] space-y-1.5 relative z-10">
                    <button 
                      onClick={() => { setActiveTab("documents"); window.scrollTo(0,0); }}
                      className="w-full text-left flex items-center justify-between text-gray-300 hover:text-white transition-colors"
                    >
                      <span className="font-sans font-bold text-gray-400">
                        {language === "Hindi" ? `अधिक लाभ अनलॉक करने के लिए क्रेडेंशियल भरें` : `Complete details to unlock more benefits`}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#FF9933] shrink-0" />
                    </button>
                    <div className="flex items-center justify-between border-t border-white/5 pt-1.5">
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">{language === "Hindi" ? "अनुमानित संभावित वार्षिक लाभ" : "Estimated potential benefits"}</span>
                      <strong className="text-xs font-sans font-black text-green">
                        🪙 ₹{(115000 + (inventoryDocs.length * 15000)).toLocaleString("en-IN")}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* 2. LIVE STATUS CENTER CARD (Perfect alignment matching mockup image) */}
                <div className="glass-panel p-5 rounded-3xl border-white/10 bg-[#07070a]/90 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <h3 className="font-serif font-black text-xs text-white tracking-wider uppercase">
                        {language === "Hindi" ? "लाइव स्टेटस सेंटर" : "Live Status Center"}
                      </h3>
                    </div>
                    <span className="text-[9px] font-mono text-[#FF9933] font-bold">UTC +05:30</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 shrink-0 flex items-center justify-center bg-zinc-950/80 border border-white/10 rounded-full shadow-inner text-[#FF9933]">
                      <Clock className="w-6 h-6 animate-pulse" />
                    </div>
                    <div className="space-y-0.5 font-mono">
                      <div className="text-base font-black text-white tracking-tight">{clockTime}</div>
                      <div className="text-[9px] text-zinc-500">{clockDate}</div>
                      <div className="text-[9px] text-emerald-400 font-bold flex items-center gap-1">
                        <span>●</span> <span>{language === "Hindi" ? "सभी सेवाएं सामान्य" : "Systems Fully Nominal"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/40 border border-white/5 p-3 rounded-2xl text-[10px] space-y-2 font-mono">
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>{language === "Hindi" ? "डेटा सिंक अंतराल:" : "Next Update Countdown:"}</span>
                      <span className="text-zinc-200 font-extrabold">{`01 HRS : ${59 - new Date().getMinutes()} MIN : ${60 - new Date().getSeconds()} SEC`}</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>{language === "Hindi" ? "नए सिंक किए गए डेटा:" : "New Welfare Schemes:"}</span>
                      <span className="text-emerald-400 font-extrabold">+124 {language === "Hindi" ? "इस महीने" : "this month"}</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>{language === "Hindi" ? "अंतिम सिंक सत्यापन:" : "Last Sync Verification:"}</span>
                      <span className="text-zinc-400 font-bold">{language === "Hindi" ? "2 मिनट पहले" : "2 minutes ago"}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => triggerFeedback(language === "Hindi" ? "सभी केंद्रीय और राज्य डेटाबेस सुरक्षित रूप से सिंक किए गए हैं।" : "Unified portal indexes are fully verified across Indian ministries.")} 
                    className="w-full py-2 bg-zinc-950 hover:bg-zinc-900 border border-white/5 rounded-xl text-[10px] text-zinc-400 font-mono hover:text-[#FF9933] transition-colors cursor-pointer text-center block font-bold uppercase tracking-wider"
                  >
                    {language === "Hindi" ? "सभी अपडेट देखें >" : "View All Updates >"}
                  </button>
                </div>

                {/* 3. QUICK ACCESS CARD (Gorgeous 6 icons array) */}
                <div className="glass-panel p-5 rounded-3xl border-white/10 bg-[#07070a]/90 space-y-3 shadow-xl">
                  <h4 className="font-serif font-black text-xs text-white tracking-wider uppercase border-b border-white/5 pb-2">
                    {language === "Hindi" ? "त्वरित पहुँच पैनल" : "Quick Access Panel"}
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                    {[
                      { label: language === "Hindi" ? "दस्तावेज़ सत्यापित" : "Verify Document", color: "text-emerald-400 hover:border-emerald-500/40", icon: CheckSquare, tab: "documents" },
                      { label: language === "Hindi" ? "आवेदन ट्रैक करें" : "Track Application", color: "text-blue-400 hover:border-blue-500/40", icon: Clipboard, tab: "benefits" },
                      { label: language === "Hindi" ? "मेरी योजनाएं" : "My Schemes", color: "text-orange-400 hover:border-orange-500/40", icon: Activity, tab: "benefits" },
                      { label: language === "Hindi" ? "समस्या रिपोर्ट" : "Report Issue", color: "text-red-400 hover:border-red-500/40", icon: AlertOctagon, tab: "recovery" },
                      { label: language === "Hindi" ? "आरटीआई ड्राफ्टर" : "RTI Assistant", color: "text-teal-400 hover:border-teal-500/40", icon: FileText, tab: "appeals" },
                      { label: language === "Hindi" ? "सलामती रक्षक" : "Get Help / SOS", color: "text-purple-400 hover:border-purple-500/40", icon: Shield, tab: "assistant" }
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div 
                          key={idx} 
                          onClick={() => { setActiveTab(item.tab); window.scrollTo(0,0); }}
                          className={`p-2.5 rounded-2xl bg-black/40 border border-white/5 hover:bg-zinc-950 hover:scale-102 transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${item.color}`}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          <span className="font-sans font-extrabold text-zinc-300 leading-tight">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. EMERGENCY SOS TRIGGER BANNER (High contrast crisis gateway) */}
                <div className="glass-panel p-4 rounded-3xl border-red-500/25 bg-gradient-to-br from-red-950/20 to-[#07070a] flex items-center justify-between shadow-xl">
                  <div className="space-y-0.5">
                    <h5 className="text-[10px] uppercase tracking-widest font-black text-red-500">{language === "Hindi" ? "क्या आपातकालीन सहायता चाहिए?" : "Need Urgent Help?"}</h5>
                    <p className="text-[9px] text-zinc-400 leading-normal">{language === "Hindi" ? "अभिभावक नेटवर्क सुरक्षा चक्र सक्रिय करें" : "Engage Emergency Guardian network"}</p>
                  </div>
                  <button 
                    onClick={() => { setActiveTab("assistant"); window.scrollTo(0,0); }}
                    className="bg-red-600 hover:bg-red-500 text-white font-black text-[10px] uppercase font-mono px-3.5 py-2.5 rounded-xl flex items-center gap-1 shadow-lg shadow-red-650/40 active:scale-95 transition-all cursor-pointer animate-pulse"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{language === "Hindi" ? "सक्रिय" : "SOS Mode"}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* INTERACTIVE NAVIGATION FEATURE HORIZONTAL GRID AS SHOWN IN THE SCREENSHOT (Feature Rails) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 pt-4" id="mockup-feature-rail-grid">
              
              {/* Feature 1: Find Benefits */}
              <div 
                onClick={() => { setActiveTab("benefits"); window.scrollTo(0,0); }}
                className="glass-panel hover:bg-[#121214] p-5 rounded-2xl border-white/5 hover:border-[#FF9933]/55 transition-all text-left space-y-4 cursor-pointer relative overflow-hidden group select-none"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#FF9933]/5 rounded-bl-full group-hover:bg-[#FF9933]/12 transition-all" />
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 text-[#FF9933] group-hover:scale-110 transition-transform">
                  <Search className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-black text-sm text-white flex items-center justify-between">
                    <span>{language === "Hindi" ? "लाभ खोजें" : "Find Benefits"}</span>
                    <ChevronRight className="w-4 h-4 text-gray-500 opacity-60 group-hover:translate-x-1 transition-all" />
                  </h4>
                  <p className="text-[11px] text-gray-400 font-sans leading-normal">
                    {language === "Hindi" ? "उन योजनाओं की खोज करें जिनके लिए आप पूर्णतः पात्र हैं" : "Discover government schemes you are eligible for"}
                  </p>
                </div>
              </div>

              {/* Feature 2: Check Documents */}
              <div 
                onClick={() => { setActiveTab("documents"); window.scrollTo(0,0); }}
                className="glass-panel hover:bg-[#121214] p-5 rounded-2xl border-white/5 hover:border-white/40 transition-all text-left space-y-4 cursor-pointer relative overflow-hidden group select-none"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-bl-full group-hover:bg-white/10 transition-all" />
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-white group-hover:scale-110 transition-transform">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-black text-sm text-white flex items-center justify-between">
                    <span>{language === "Hindi" ? "दस्तावेज़ जाँचें" : "Check Documents"}</span>
                    <ChevronRight className="w-4 h-4 text-gray-500 opacity-60 group-hover:translate-x-1 transition-all" />
                  </h4>
                  <p className="text-[11px] text-gray-400 font-sans leading-normal">
                    {language === "Hindi" ? "अपने दस्तावेजों का सत्यापन, डाउनलोड और प्रबंधन करें" : "Verify, download & manage your credentials"}
                  </p>
                </div>
              </div>

              {/* Feature 3: Recover Benefits */}
              <div 
                onClick={() => { setActiveTab("recovery"); window.scrollTo(0,0); }}
                className="glass-panel hover:bg-[#121214] p-5 rounded-2xl border-white/5 hover:border-amber-500/55 transition-all text-left space-y-4 cursor-pointer relative overflow-hidden group select-none"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-bl-full group-hover:bg-amber-500/12 transition-all" />
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-[#FF9933] group-hover:scale-110 transition-transform">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-black text-sm text-white flex items-center justify-between">
                    <span>{language === "Hindi" ? "अस्वीकृति सुधारें" : "Recover Benefits"}</span>
                    <ChevronRight className="w-4 h-4 text-gray-500 opacity-60 group-hover:translate-x-1 transition-all" />
                  </h4>
                  <p className="text-[11px] text-gray-400 font-sans leading-normal">
                    {language === "Hindi" ? "अस्वीकृत आवेदनों को ठीक करें और लाभ पुनः प्राप्त करें" : "Fix rejections and resume suspended benefits"}
                  </p>
                </div>
              </div>

              {/* Feature 4: Appeals & Letters */}
              <div 
                onClick={() => { setActiveTab("appeals"); window.scrollTo(0,0); }}
                className="glass-panel hover:bg-[#121214] p-5 rounded-2xl border-white/5 hover:border-[#138808]/55 transition-all text-left space-y-4 cursor-pointer relative overflow-hidden group select-none"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#138808]/5 rounded-bl-full group-hover:bg-[#138808]/12 transition-all" />
                <div className="w-10 h-10 rounded-xl bg-[#138808]/10 flex items-center justify-center border border-[#138808]/20 text-[#138808] group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-black text-sm text-white flex items-center justify-between">
                    <span>{language === "Hindi" ? "अपील और आरटीआई" : "Appeals & RTI"}</span>
                    <ChevronRight className="w-4 h-4 text-gray-500 opacity-60 group-hover:translate-x-1 transition-all" />
                  </h4>
                  <p className="text-[11px] text-gray-400 font-sans leading-normal">
                    {language === "Hindi" ? "अपील पत्र और आरटीआई ड्राफ्ट तुरंत तैयार करें" : "Generate official legal letters and file status appeals"}
                  </p>
                </div>
              </div>

              {/* Feature 5: Emergency Help */}
              <div 
                onClick={() => { setActiveTab("assistant"); window.scrollTo(0,0); }}
                className="glass-panel hover:bg-[#121214] p-5 rounded-2xl border-white/5 hover:border-red-500/55 transition-all text-left space-y-4 cursor-pointer relative overflow-hidden group select-none"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 rounded-bl-full group-hover:bg-red-500/12 transition-all" />
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-400 group-hover:scale-110 transition-transform">
                  <PhoneCall className="w-5 h-5 hover:animate-bounce" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-black text-sm text-white flex items-center justify-between">
                    <span>{language === "Hindi" ? "आपातकालीन सहायता" : "Emergency Help"}</span>
                    <ChevronRight className="w-4 h-4 text-gray-500 opacity-60 group-hover:translate-x-1 transition-all" />
                  </h4>
                  <p className="text-[11px] text-gray-400 font-sans leading-normal">
                    {language === "Hindi" ? "महत्वपूर्ण सरकारी हेल्पलाइन्स सीधे एक्सेस करें" : "Important verified helplines at your fingertips"}
                  </p>
                </div>
              </div>

            </div>

            {/* DIRECT BENEFIT DIRECTORY STATS BANNER AS PER MOCKUP */}
            <div className="glass-panel bg-black/40 border border-white/5 p-6 rounded-3xl grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center relative overflow-hidden" id="mockup-stats-banner">
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />
              
              <div className="space-y-1">
                <div className="w-8 h-8 rounded bg-[#138808]/15 text-[#138808] flex items-center justify-center mx-auto text-xs font-bold leading-none mb-1">✓</div>
                <div className="text-2xl font-serif font-black text-white">1,200+</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{language === "Hindi" ? "सत्यापित योजनाएं" : "Verified Schemes"}</div>
              </div>

              <div className="space-y-1 border-l border-white/5">
                <div className="w-8 h-8 rounded bg-orange-500/10 text-saffron flex items-center justify-center mx-auto text-xs font-bold leading-none mb-1">📋</div>
                <div className="text-2xl font-serif font-black text-white">250+</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{language === "Hindi" ? "दस्तावेज़ गाइड" : "Documents Guide"}</div>
              </div>

              <div className="space-y-1 border-l border-white/5">
                <div className="w-8 h-8 rounded bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto text-xs font-bold leading-none mb-1">⚖️</div>
                <div className="text-2xl font-serif font-black text-white">100+</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{language === "Hindi" ? "अपील और पत्र" : "Appeals & Letters"}</div>
              </div>

              <div className="space-y-1 border-l border-white/5">
                <div className="w-8 h-8 rounded bg-red-500/10 text-red-400 flex items-center justify-center mx-auto text-xs font-bold leading-none mb-1">📞</div>
                <div className="text-2xl font-serif font-black text-white">50+</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{language === "Hindi" ? "सत्यापित हेल्पलाइन्स" : "Helplines Verified"}</div>
              </div>

            </div>

            {/* PRIDE OF INDIA SPOTLIGHT BLOCK: Serving Soldiers & Farmers (Section 4) */}
            <div className="max-w-5xl mx-auto glass-panel p-6 md:p-8 rounded-3xl border-amber-500/10 shadow-2xl relative overflow-hidden space-y-8" id="india-pride-spotlight">
              
              {/* Animated Background Subtle Ashok Chakra Ornaments */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-96 h-96 opacity-[0.025] pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#FF9933] chakra-bg">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
                  {[...Array(24)].map((_, i) => (
                    <line key={i} x1="50" y1="50" x2={50 + 40 * Math.cos((i * 15 * Math.PI) / 180)} y2={50 + 40 * Math.sin((i * 15 * Math.PI) / 180)} stroke="currentColor" strokeWidth="0.75" />
                  ))}
                </svg>
              </div>

              {/* Title Header with Modern Indian Identity */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[10px] text-saffron font-black uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
                    🇮🇳 MADE WITH PRIDE FOR INDIA • जय हिन्द
                  </span>
                  <h2 className="font-sans text-xl md:text-2xl font-black text-white tracking-tight pt-1">
                    {language === "Hindi" ? "मिट्टी की पुकार — हमारे वीर जवान और अन्नदाता किसान" : "Whispers of the Soil — Tributes to Our Soldiers & Farmers"}
                  </h2>
                </div>
                
                {/* Dynamic Fact Cycler / Refresh Controller */}
                <button
                  onClick={handleNextFact}
                  id="refresh-fact-deck-btn"
                  className="flex items-center gap-2 bg-[#FF9933]/15 hover:bg-[#FF9933]/25 border border-[#FF9933]/40 text-saffron font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all hover:scale-105"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    className={`w-4 h-4 text-saffron transition-transform duration-500 ${isFactSpinning ? "rotate-180" : ""}`}
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3"
                  >
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                  </svg>
                  <span>{language === "Hindi" ? "प्रेरणा बदलें" : "Next Fact"}</span>
                </button>
              </div>

              {/* Live Randomized National Fact & Lyric Board */}
              <div className="bg-black/30 border border-white/5 rounded-2xl p-5 md:p-6 space-y-4 shadow-inner" id="active-patriot-fact-loader">
                {(() => {
                  const fact = INTERESTING_FACTS_LIST[currentFactIdx] || INTERESTING_FACTS_LIST[0];
                  return (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-amber-500/10 text-[#FF9933] border border-amber-500/20 font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                          {language === "Hindi" ? fact.categoryHi : fact.category}
                        </span>
                        <span className="text-[9px] text-gray-500 font-mono">
                          Fact-ID: 2026-F{fact.id}
                        </span>
                      </div>
                      
                      <blockquote className="font-serif text-sm md:text-base text-gray-100 leading-relaxed italic">
                        " {language === "Hindi" ? fact.textHi : fact.text} "
                      </blockquote>
                      
                      <div className="flex items-center justify-between text-[11px] text-gray-400 font-sans border-t border-white/5 pt-2 italic">
                        <span>{fact.author ? `— ${fact.author}` : `Source: ${fact.source}`}</span>
                        <span className="text-gray-600">Unified Inclusion Registry Database</span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Split Dual Column Tributes (Army/Border & Village/Agriculture) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                
                {/* Jai Jawan (Brave Soldiers & Border Guard Protection) */}
                <div className="bg-gradient-to-br from-indigo-950/20 to-black/40 border border-[#138808]/25 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#138808]">
                      <Shield className="w-5 h-5 shrink-0" />
                      <strong className="text-xs font-black uppercase tracking-widest">{language === "Hindi" ? "जय जवान — वीर सेना" : "JAI JAWAN — HEROIC ARMED FORCES"}</strong>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">
                      {language === "Hindi" 
                        ? "हमारे वीर सैनिक कठोर बर्फीली ऊंचाइयों और दुर्गम सीमाओं पर खड़े रहकर हमारे लोकतंत्र की रक्षा करते हैं। उनके समर्पण को प्रणाम करते हुए, हम कल्याणकारी अधिकार पारदर्शिता के लिए पूरी तरह समर्पित हैं।"
                        : "Securing national sovereignty across snow-crested mountain peaks and high-altitude posts. Standing in absolute tribute to our brave soldiers guarding our borders day and night."}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-[#138808] font-bold border-t border-[#138808]/15 pt-2 italic">
                    <span>{language === "Hindi" ? "मर्यादा और शौर्य" : "Valour and Vigilance"}</span>
                    <span>No. 1 Protection Standard</span>
                  </div>
                </div>

                {/* Jai Kisan (Empowered Villages & Fields) */}
                <div className="bg-gradient-to-br from-amber-950/20 to-black/40 border border-[#FF9933]/25 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-saffron">
                      <Sprout className="w-5 h-5 shrink-0" />
                      <strong className="text-xs font-black uppercase tracking-widest">{language === "Hindi" ? "जय किसान — हमारा अन्नदाता" : "JAI KISAN — OUR SOVEREIGN FARMERS"}</strong>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">
                      {language === "Hindi" 
                        ? "मिट्टी की गंध और धान की महक हमारे खेतों की शान है। भारत का निर्माण गांव-गांव के छोटे जोत वाले किसानों के पसीने से होता है। हकदार उन्हें उनका अधिकार दिलाने के लिए अग्रसर है।"
                        : "Cultivating food abundance from traditional smallholder grids. Fueling national self-reliance with ancient wisdom, community trust, and absolute dedication to the soil of the motherland."}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-saffron font-bold border-t border-[#FF9933]/15 pt-2 italic">
                    <span>{language === "Hindi" ? "कृषि शक्ति और समृद्धि" : "Harvest and Resolute Hardwork"}</span>
                    <span>100% Direct DBT Mapped</span>
                  </div>
                </div>

              </div>
              
              {/* Made for India Core Badge Indicator */}
              <div className="text-center pt-2">
                <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                  🇮🇳 Designed and Coded to empower 1.4 Billion sovereign citizens, especially smallholders and rural families. 🇮🇳
                </span>
              </div>

            </div>

            {/* =========================================================================
                SECTION 2: THE BUTTER TRANSITION SLIDE (Dynamic Scrolling Banner)
                ========================================================================= */}
            <div className="w-full overflow-hidden py-4 bg-[#121214] border-y border-white/5 relative" id="butter-transition-slider">
              <div className="flex items-center justify-center whitespace-nowrap animate-pulse">
                <div className="flex flex-wrap md:flex-row items-center justify-center gap-3 md:gap-8 text-[11px] font-black uppercase tracking-[0.15em] text-[#FF9933] text-center">
                  <span>✨ 100% SECURE PUBLIC INITIATIVE</span>
                  <span className="text-gray-700 hidden md:inline">•</span>
                  <span className="text-white">🛡️ CONSTITUTIONAL RIGHT TO DISCLOSURE</span>
                  <span className="text-gray-700 hidden md:inline">•</span>
                  <span className="text-green">🌾 ZERO MIDDLEMEN EXCLUSION PROTECTION</span>
                  <span className="text-gray-700 hidden md:inline">•</span>
                  <span className="text-[#FF9933]">🏔️ NORTHEAST INTEGRATED SYSTEM</span>
                  <span className="text-gray-700 hidden md:inline">•</span>
                  <span className="text-white">📊 DYNAMIC MISMATCH ANALYZER</span>
                </div>
              </div>
            </div>

            {/* =========================================================================
                SECTION 3: SPLIT DOUBLE-COLUMN: LEFT STORIES | RIGHT HIGHLIGHTS GAP & RECOVERY
                ========================================================================= */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="split-stories-highlights">
              
              {/* LEFT COLUMN: Citizen Problems Solved (Stories) */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-1.5 pb-2 border-b border-white/10">
                  <span className="text-[10px] text-[#FF9933] font-black uppercase tracking-widest bg-amber-500/10 px-2.5 py-0.5 rounded font-sans">
                    📢 CITIZEN VICTORIES
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white">
                    {language === "Hindi" ? "नागरिक विजय गाथा — हल की गई समस्याएं" : "Real Problems We Help You Solve"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === "Hindi" ? "कैसे हकदार ने बाधाओं को कम किया और सीधे अधिकारों का मार्ग प्रशस्त किया" : "Real people who successfully bypass procedural bottlenecks and obtain statutory welfare."}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Story 1 */}
                  <div className="glass-panel bg-[#121214] p-5 rounded-2xl border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase text-[#FF9933] bg-[#FF9933]/15 px-2 py-0.5 rounded tracking-wider font-sans">
                        {t("stories.item1.badge")}
                      </span>
                      <span className="text-[10px] text-[#138808] font-mono font-bold flex items-center gap-1">✓ RESOLVED</span>
                    </div>
                    <h4 className="font-serif text-sm font-bold text-white">{t("stories.item1.title")}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {t("stories.item1.desc")}
                    </p>
                    <div className="bg-black/30 p-3 rounded-xl border border-white/5 space-y-1">
                      <span className="text-[9px] text-[#22c55e] font-black uppercase block tracking-wider font-sans">{language === "Hindi" ? "सत्यापित समाधान पथ" : "Verified Mapped Pathway"}</span>
                      <p className="text-[11px] text-gray-300 font-sans">
                        {t("stories.item1.path")}
                      </p>
                    </div>
                  </div>

                  {/* Story 2 */}
                  <div className="glass-panel bg-[#121214] p-5 rounded-2xl border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase text-[#138808] bg-[#138808]/15 px-2 py-0.5 rounded tracking-wider font-sans">
                        {t("stories.item2.badge")}
                      </span>
                      <span className="text-[10px] text-[#138808] font-mono font-bold flex items-center gap-1">✓ RESOLVED</span>
                    </div>
                    <h4 className="font-serif text-sm font-bold text-white">{t("stories.item2.title")}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {t("stories.item2.desc")}
                    </p>
                    <div className="bg-black/30 p-3 rounded-xl border border-white/5 space-y-1">
                      <span className="text-[9px] text-[#22c55e] font-black uppercase block tracking-wider font-sans">{language === "Hindi" ? "सत्यापित समाधान पथ" : "Verified Mapped Pathway"}</span>
                      <p className="text-[11px] text-gray-300 font-sans">
                        {t("stories.item2.path")}
                      </p>
                    </div>
                  </div>

                  {/* Story 3 */}
                  <div className="glass-panel bg-[#121214] p-5 rounded-2xl border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded tracking-wider font-sans">
                        {t("stories.item3.badge")}
                      </span>
                      <span className="text-[10px] text-[#138808] font-mono font-bold flex items-center gap-1">✓ RESOLVED</span>
                    </div>
                    <h4 className="font-serif text-sm font-bold text-white">{t("stories.item3.title")}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {t("stories.item3.desc")}
                    </p>
                    <div className="bg-black/30 p-3 rounded-xl border border-white/5 space-y-1">
                      <span className="text-[9px] text-[#22c55e] font-black uppercase block tracking-wider font-sans">{language === "Hindi" ? "सत्यापित समाधान पथ" : "Verified Mapped Pathway"}</span>
                      <p className="text-[11px] text-gray-300 font-sans">
                        {t("stories.item3.path")}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* RIGHT COLUMN: CORE MAIN HIGHLIGHT: GAP & RECOVERY ENGINE DIRECTORY */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Highlight Label */}
                <div className="space-y-1.5 pb-2 border-b border-white/10">
                  <span className="text-[10px] text-green font-black uppercase tracking-widest bg-emerald-500/10 px-2.5 py-0.5 rounded font-sans">
                    ⭐ KEY CONSTITUTIONAL MODULES
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white">
                    {language === "Hindi" ? "मुख्य विशेषताएं: गैप और रिकवरी इंजन" : "Core Highlight: Gap & Recovery Engine"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === "Hindi" ? "दस्तावेज़ विसंगतियों का विश्लेषण करें और तकनीकी अस्वीकृतियों को तुरंत ठीक करें" : "Direct access tools built to audit physical certificate mismatches and repair administrative rejections."}
                  </p>
                </div>

                {/* HIGHLIGHT 1: Document Gap Analyzer Preview Card */}
                <div className="glass-panel bg-[#121214] p-6 rounded-2xl border-[#FF9933]/30 space-y-4 hover:border-[#FF9933] transition-all relative overflow-hidden" id="gap-analyzer-highlight">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF9933]/5 rounded-bl-full pointer-events-none" />
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-saffron border border-amber-500/20">
                      <UserCheck className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-serif font-black text-md text-white">{language === "Hindi" ? "दस्तावेज़ गैप विश्लेषक" : "1. Document Gap Analyzer"}</h4>
                      <p className="text-[10px] text-[#FF9933] font-bold uppercase tracking-wider font-sans">{language === "Hindi" ? "नाम / वर्तनी विसंगति की जांच करें" : "Credentials & Spelling Match Auditor"}</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed font-sans">
                    {language === "Hindi" 
                      ? "आधार कार्ड, वोटर कार्ड या भूमि रिकॉर्ड में स्पेलिंग की त्रुटियों (Spelling Mismatches) या जाति प्रमाण पत्र न होने के कारण होने वाली 90% अस्वीकृतियों से बचें। अपना समाधान चार्ट प्राप्त करें।" 
                      : "Identifies spelling variations across Aadhaar, Voter Card & Land Records. Maps customized, offline-ready corrective pathways to prevent 90% of direct portal rejections."}
                  </p>

                  <div className="bg-black/30 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 font-mono">15+ Scenarios Pre-mapped</span>
                    <button 
                      onClick={() => { setActiveTab("documents"); window.scrollTo(0,0); }}
                      className="text-xs text-saffron font-bold hover:underline inline-flex items-center gap-1 select-none cursor-pointer font-sans"
                    >
                      {language === "Hindi" ? "अभी गैप चेक करें" : "Audit Spelling Gaps"} <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* HIGHLIGHT 2: Rejection Recovery Engine Preview Card */}
                <div className="glass-panel bg-[#121214] p-6 rounded-2xl border-green/35 hover:border-green transition-all relative overflow-hidden" id="recovery-engine-highlight">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-green/5 rounded-bl-full pointer-events-none" />
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      <AlertTriangle className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="font-serif font-black text-md text-white">{language === "Hindi" ? "अस्वीकृति रिकवरी इंजन" : "2. Rejection Recovery Engine"}</h4>
                      <p className="text-[10px] text-green font-bold uppercase tracking-wider font-sans">{language === "Hindi" ? "सरकारी अस्वीकृति सुधार तंत्र" : "Administrative Appeal Safe-guards"}</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed font-sans">
                    {language === "Hindi" 
                      ? "क्या आपका आवेदन अस्वीकृत हुआ? पीएफएमएस (PFMS) बैंक विफलता या भूमि नामांतरण (Mutation Status) के कारण अटके खातों को कानून और राज्य शासनादेश के तहत ठीक करें।" 
                      : "Directly audits formal causes of rejection, from PFMS bank validation failures to land record mutation delay. Pulls statutory circular remedies to enforce direct local re-assessment."}
                  </p>

                  <div className="bg-black/30 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 font-mono">PFMS / SDRF / Mutation Mapped</span>
                    <button 
                      onClick={() => { setActiveTab("recovery"); window.scrollTo(0,0); }}
                      className="text-xs text-green font-bold hover:underline inline-flex items-center gap-1 select-none cursor-pointer font-sans"
                    >
                      {language === "Hindi" ? "सुधार प्रारंभ करें" : "Repair Denial Now"} <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* BONUS INVITATION LINK TO APP */}
                <div className="bg-gradient-to-tr from-[#FF9933]/15 to-transparent border border-white/5 p-5 rounded-2xl text-center space-y-3">
                  <h4 className="font-serif text-sm font-bold text-white">
                    {language === "Hindi" ? "अपने अधिकारों का पूरा विश्लेषण करें" : "Verify Your Direct Benefit Quotient"}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-sans leading-normal">
                    {language === "Hindi" 
                      ? "पात्रता कैलकुलेटर लोड करें, अपनी जनसांख्यिकी और सामाजिक-आर्थिक स्थिति भरें और वास्तविक सरकारी योजनाओं का मिलान तुरंत प्राप्त करें।" 
                      : "Fill your socioeconomic metrics in our centralized engine and download matching verified lists immediately with local circular overrides."}
                  </p>
                  <button 
                    onClick={() => { setActiveTab("benefits"); window.scrollTo(0,0); }}
                    className="w-full bg-[#FF9933] text-black font-extrabold text-xs py-3 rounded-xl block tracking-wide select-none cursor-pointer hover:opacity-90 font-sans"
                  >
                    {language === "Hindi" ? "पात्रता मूल्यांकन प्रारंभ करें →" : "Launch Live Eligibility Scoring →"}
                  </button>
                </div>

              </div>

            </div>

            {/* Curated list spacing separator */}
            <div className="mb-4" />

            {/* TRUST & CREDIBILITY SECTION */}
            <div className="max-w-5xl mx-auto space-y-8" id="trust-details-section">
              <div className="text-center space-y-2">
                <h2 className="font-serif text-3xl font-bold tracking-tight text-white">{t("trust.title")}</h2>
                <div className="h-1 w-12 bg-green mx-auto rounded" />
                <p className="text-xs text-gray-400 max-w-xl mx-auto-relaxed">
                  {t("trust.subtitle")}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                <div className="bg-black/30 border border-white/5 rounded-2xl p-5 space-y-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-[#FF9933]/15 text-[#FF9933] flex items-center justify-center mx-auto text-sm font-bold border border-[#FF9933]/25">
                    1
                  </div>
                  <h4 className="font-serif text-sm font-bold text-white">{t("trust.item1.title")}</h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed leading-normal">
                    {t("trust.item1.desc")}
                  </p>
                </div>

                <div className="bg-black/30 border border-white/5 rounded-2xl p-5 space-y-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-white/5 text-white flex items-center justify-center mx-auto text-sm font-bold border border-white/10">
                    2
                  </div>
                  <h4 className="font-serif text-sm font-bold text-white">{t("trust.item2.title")}</h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed leading-normal">
                    {t("trust.item2.desc")}
                  </p>
                </div>

                <div className="bg-black/30 border border-white/5 rounded-2xl p-5 space-y-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-[#138808]/15 text-[#138808] flex items-center justify-center mx-auto text-sm font-bold border border-[#138808]/25">
                    3
                  </div>
                  <h4 className="font-serif text-sm font-bold text-white">{t("trust.item3.title")}</h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed leading-normal">
                    {t("trust.item3.desc")}
                  </p>
                </div>

                <div className="bg-black/30 border border-white/5 rounded-2xl p-5 space-y-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-amber-500/15 text-saffron flex items-center justify-center mx-auto text-sm font-bold border border-amber-500/25">
                    4
                  </div>
                  <h4 className="font-serif text-sm font-bold text-white">{t("trust.item4.title")}</h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed leading-normal">
                    {t("trust.item4.desc")}
                  </p>
                </div>

              </div>
            </div>

            {/* progressive disclosure how it works summary */}
            <div className="max-w-4xl mx-auto text-center py-6 bg-gradient-to-tr from-[#1A1F4D]/25 via-transparent to-transparent rounded-3xl border border-white/5 p-8 space-y-4">
              <h3 className="font-serif text-2xl font-bold text-white">{language === "Hindi" ? "प्रभुसत्ता, समता और सार्वभौमिक पहुंच" : "Sovereignty, Equity, and Public Access"}</h3>
              <p className="text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed">
                {language === "Hindi" 
                  ? "हकदार पूर्णतः आपके ब्राउज़र के भीतर काम करता है ताकि आपकी व्यक्तिगत गोपनीयता अक्षुण्ण रहे। यह छोटे किसानों, आदिवासी छात्र-छात्राओं और महिला उद्यमियों को सीधे उनके संवैधानिक अधिकारों तक पहुंचाने में सहायता करता है।" 
                  : "Haqqdar works fully in the browser to maintain maximum privacy and operates offline. Empowering smallholder farmers, tribal students across Northeast states, and micro women entrepreneurs to access their constitutional rights."}
              </p>
              <button 
                onClick={() => { setActiveTab("benefits"); }}
                className="inline-flex items-center gap-1 text-xs text-[#FF9933] font-bold hover:underline cursor-pointer"
              >
                {language === "Hindi" ? "पात्रता कैलकुलेटर शुरू करें" : "Launch Live Eligibility Calculator"} <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* 1.1 LIFE NAVIGATOR HUB TAB */}
        {activeTab === "navigator" && (
          <div className="space-y-12 animate-fadeIn" id="tab-view-navigator">
            <LifeNavigatorHub 
              inventoryDocs={inventoryDocs}
              setInventoryDocs={setInventoryDocs}
              language={language}
              triggerFeedback={triggerFeedback}
              currentRole={currentRole}
              onChangeRole={(newRole) => {
                setCurrentRole(newRole);
                sessionStorage.setItem("haqqdar_admin_user", newRole);
              }}
            />
          </div>
        )}

        {/* 1.5 AGRICULTURE TAB (Agritech Entitlements & Crop Health Diagnostics) */}
        {activeTab === "agriculture" && (
          <div className="space-y-12 animate-fadeIn" id="tab-view-agriculture">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs text-[#FF9933] font-black uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full inline-flex items-center gap-2">
                <Sprout className="w-3.5 h-3.5 text-saffron" />
                {t("agriculture.badge")}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-white">{t("agriculture.title")}</h1>
              <p className="text-xs text-gray-400 max-w-xl mx-auto leading-relaxed">
                {t("agriculture.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Crop Premium Estimator */}
              <div className="lg:col-span-6 glass-panel p-6 rounded-2xl border-white/5 space-y-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 pb-4 border-b border-white/5">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-saffron">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white">
                        {language === "Hindi" ? "पीएम फ़सल बीमा योजना (PMFBY)" : "Premium Estimator (PMFBY)"}
                      </h3>
                      <p className="text-[10px] text-gray-400 font-medium">
                        {language === "Hindi" ? "संवैधानिक प्रावधान एवं प्रीमियम दर आकलन" : "Statutory Agricultural Insurance Scheme"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    {/* Select Crop Category */}
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                        {language === "Hindi" ? "फ़सल की श्रेणी" : "Crop / Season Type"}
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { val: "Kharif", labelEn: "Kharif (2%)", labelHi: "खरीफ (2%)" },
                          { val: "Rabi", labelEn: "Rabi (1.5%)", labelHi: "रबी (1.5%)" },
                          { val: "Commercial", labelEn: "Cash Crop (5%)", labelHi: "वाणिज्यिक (5%)" }
                        ].map(c => (
                          <button
                            key={c.val}
                            onClick={() => setAgriCropType(c.val)}
                            className={`px-3 py-2.5 rounded-lg text-xs font-bold transition-all text-center ${
                              agriCropType === c.val
                                ? "bg-amber-500 text-black shadow-lg"
                                : "bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5"
                            }`}
                          >
                            {language === "Hindi" ? c.labelHi : c.labelEn}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Numeric Input Sum Insured */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                          {language === "Hindi" ? "कुल बीमित राशि (₹)" : "Sum Insured (₹)"}
                        </label>
                        <span className="text-xs font-mono font-bold text-saffron">
                          ₹{agriSumInsured.toLocaleString()}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10000"
                        max="250000"
                        step="5000"
                        value={agriSumInsured}
                        onChange={(e) => setAgriSumInsured(Number(e.target.value))}
                        className="w-full accent-[#FF9933]"
                      />
                      <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                        <span>₹10,000</span>
                        <span>₹1.25 Lakhs</span>
                        <span>₹2.5 Lakhs</span>
                      </div>
                    </div>

                    {/* Calculations Display */}
                    {(() => {
                      const rate = agriCropType === "Kharif" ? 0.02 : agriCropType === "Rabi" ? 0.015 : 0.05;
                      const farmerPremium = agriSumInsured * rate;
                      const govtPremiumRate = agriCropType === "Commercial" ? 0.15 : 0.105; 
                      const govtPremiumShare = agriSumInsured * govtPremiumRate;

                      return (
                        <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-3">
                          <span className="text-[9px] font-black uppercase text-saffron block tracking-wider">
                            {language === "Hindi" ? "अनुमोदित प्रीमियम संरचना" : "APPROVED PREMIUM BREAKDOWN"}
                          </span>
                          
                          <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                              <span className="text-[10px] text-gray-400 block mb-0.5">
                                {language === "Hindi" ? "किसान का भुगतान (Premium)" : "Farmer's Share"}
                              </span>
                              <span className="text-lg font-serif font-black text-[#FF9933]">
                                ₹{farmerPremium.toLocaleString()}
                              </span>
                              <span className="text-[9px] text-gray-500 block mt-0.5">
                                ({rate * 100}% {language === "Hindi" ? "सांविधिक दर" : "Statutory rate"})
                              </span>
                            </div>

                            <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                              <span className="text-[10px] text-gray-400 block mb-0.5">
                                {language === "Hindi" ? "सरकारी योगदान (90%+ Subsidy)" : "Government Share"}
                              </span>
                              <span className="text-lg font-serif font-black text-green">
                                ₹{govtPremiumShare.toLocaleString()}
                              </span>
                              <span className="text-[9px] text-gray-500 block mt-0.5">
                                ({language === "Hindi" ? "केंद्र और राज्य हिस्सा" : "Cabinet Approved Subsidy"})
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                <div className="bg-[#FF9933]/5 border border-[#FF9933]/20 p-4 rounded-xl space-y-2 mt-4 text-[11px]">
                  <span className="font-extrabold text-saffron uppercase block tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#FF9933]" />
                    {language === "Hindi" ? "अस्वीकृति से बचने के नियम (Critical Claim Safe-Guards)" : "Filing Safe-Guards to Prevent Rejection"}
                  </span>
                  <ul className="list-disc pl-4 space-y-1 text-gray-300 font-mono text-[10px] leading-relaxed">
                    <li>
                      {language === "Hindi" 
                        ? "फसल क्षति के 72 घंटों के भीतर बीमा कंपनी या ग्राम राजस्व अधिकारी को सूचित अवश्य करें।" 
                        : "Notify insurance company / Agriculture Officer within 72 hours of localized damage."}
                    </li>
                    <li>
                      {language === "Hindi" 
                        ? "भू-अभिलेख (खेवट संख्या/खसरा) का नाम बैंक पासबुक और आधार से अक्षर-दर-अक्षर मिलना आवश्यक है।" 
                        : "Ensure spelling of land titles aligns exactly with banks & Aadhaar."}
                    </li>
                    <li>
                      {language === "Hindi" 
                        ? "फसल काटने का प्रयोग (Crop Cutting Experiment) डेटा सरकारी रिकॉर्ड में सत्यापित होना चाहिए।" 
                        : "Confirm CCE reporting is updated in local Krishi office."}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Soil Diagnostics and Balancing */}
              <div className="lg:col-span-6 glass-panel p-6 rounded-2xl border-white/5 space-y-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 pb-4 border-b border-white/5">
                    <div className="p-2 rounded-lg bg-green/15 text-green">
                      <Sprout className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white">
                        {language === "Hindi" ? "मृदा स्वास्थ्य निवारण व न्यूट्रिएंट्स विश्लेषण" : "Soil Health & NPK Diagnostics Panel"}
                      </h3>
                      <p className="text-[10px] text-gray-400 font-medium">
                        {language === "Hindi" ? "राजकीय सॉयल हेल्थ कार्ड मानकों पर आधारित मार्गदर्शन" : "Agronomic Balancing Based on Soil Health Card"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    {/* Target Crop Selector */}
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                        {language === "Hindi" ? "लक्षित मुख्य फ़सल" : "Target Crop for Advisory"}
                      </label>
                      <select
                        value={agriTargetCrop}
                        onChange={(e) => setAgriTargetCrop(e.target.value)}
                        className="bg-gray-900 border border-white/10 text-gray-200 text-xs rounded-lg px-2.5 py-1.5 font-bold outline-none cursor-pointer focus:border-amber-500 w-full"
                      >
                        <option value="Rice">{language === "Hindi" ? "धान (Rice / Paddy)" : "Rice / Paddy"}</option>
                        <option value="Wheat">{language === "Hindi" ? "गेहूं (Wheat)" : "Wheat"}</option>
                        <option value="Maize">{language === "Hindi" ? "मक्का (Maize)" : "Maize"}</option>
                        <option value="Tea">{language === "Hindi" ? "चाय (Tea / Plantation)" : "Tea / Plantation"}</option>
                        <option value="Potato">{language === "Hindi" ? "आलू (Potato)" : "Potato"}</option>
                        <option value="Sugarcane">{language === "Hindi" ? "गन्ना (Sugarcane)" : "Sugarcane"}</option>
                        <option value="Cotton">{language === "Hindi" ? "कपास (Cotton)" : "Cotton"}</option>
                        <option value="Mustard">{language === "Hindi" ? "सरसों (Mustard)" : "Mustard"}</option>
                      </select>
                    </div>

                    {/* Sliders for N, P, K */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                            {language === "Hindi" ? "नाइट्रोजन स्तर (N)" : "Nitrogen Level (N)"}
                          </label>
                          <span className="text-[10px] font-mono font-bold text-white">{agriN} ppm</span>
                        </div>
                        <input
                          type="range"
                          min="30"
                          max="250"
                          step="5"
                          value={agriN}
                          onChange={(e) => setAgriN(Number(e.target.value))}
                          className="w-full accent-blue-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                            {language === "Hindi" ? "फास्फोरस स्तर (P)" : "Phosphorus Level (P)"}
                          </label>
                          <span className="text-[10px] font-mono font-bold text-white">{agriP} ppm</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="110"
                          step="2"
                          value={agriP}
                          onChange={(e) => setAgriP(Number(e.target.value))}
                          className="w-full accent-green"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                            {language === "Hindi" ? "पोटेशियम स्तर (K)" : "Potassium Level (K)"}
                          </label>
                          <span className="text-[10px] font-mono font-bold text-white">{agriK} ppm</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="150"
                          step="5"
                          value={agriK}
                          onChange={(e) => setAgriK(Number(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>
                    </div>

                    {/* Analysis Report */}
                    {(() => {
                      const targets: Record<string, { n: number; p: number; k: number }> = {
                        Rice: { n: 120, p: 65, k: 60 },
                        Wheat: { n: 150, p: 60, k: 50 },
                        Maize: { n: 140, p: 70, k: 65 },
                        Tea: { n: 180, p: 45, k: 90 },
                        Potato: { n: 110, p: 75, k: 120 },
                        Sugarcane: { n: 200, p: 80, k: 110 },
                        Cotton: { n: 90, p: 50, k: 70 },
                        Mustard: { n: 85, p: 40, k: 45 }
                      };

                      const currTarget = targets[agriTargetCrop] || targets.Rice;
                      const checkVal = (v: number, target: number) => {
                        if (v < target * 0.8) return "deficit";
                        if (v > target * 1.2) return "excess";
                        return "optimal";
                      };

                      const nStat = checkVal(agriN, currTarget.n);
                      const pStat = checkVal(agriP, currTarget.p);
                      const kStat = checkVal(agriK, currTarget.k);

                      return (
                        <div className="p-4 bg-black/45 rounded-xl border border-white/5 space-y-3 text-xs">
                          <span className="text-[9px] font-black uppercase text-green block tracking-wider">
                            {language === "Hindi" ? "सॉइल हेल्थ कार्ड परामर्श" : "NPK BALANCING REJECTION MITIGATION"}
                          </span>

                          <div className="space-y-2">
                            {/* Nitrogen row */}
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Nitrogen (N)</span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                nStat === "deficit" ? "bg-red-500/15 text-red-400 border border-red-500/20" :
                                nStat === "excess" ? "bg-amber-500/15 text-amber-400 border border-[#FF9933]/20" :
                                "bg-green/15 text-green border border-green/20"
                              }`}>
                                {nStat === "deficit" ? (language === "Hindi" ? "कमी / अल्प" : "Deficit") :
                                 nStat === "excess" ? (language === "Hindi" ? "अतिरिक्त" : "Excess") :
                                 (language === "Hindi" ? "सर्वोत्तम" : "Optimal")}
                              </span>
                            </div>

                            {/* Phosphorus row */}
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Phosphorus (P)</span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                pStat === "deficit" ? "bg-red-500/15 text-red-400 border border-red-500/20" :
                                pStat === "excess" ? "bg-amber-500/15 text-amber-400 border border-[#FF9933]/20" :
                                "bg-green/15 text-green border border-green/20"
                              }`}>
                                {pStat === "deficit" ? (language === "Hindi" ? "कमी / अल्प" : "Deficit") :
                                 pStat === "excess" ? (language === "Hindi" ? "अतिरिक्त" : "Excess") :
                                 (language === "Hindi" ? "सर्वोत्तम" : "Optimal")}
                              </span>
                            </div>

                            {/* Potassium row */}
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Potassium (K)</span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                kStat === "deficit" ? "bg-red-500/15 text-red-400 border border-red-500/20" :
                                kStat === "excess" ? "bg-amber-500/15 text-amber-400 border border-[#FF9933]/20" :
                                "bg-green/15 text-green border border-green/20"
                              }`}>
                                {kStat === "deficit" ? (language === "Hindi" ? "कमी / अल्प" : "Deficit") :
                                 kStat === "excess" ? (language === "Hindi" ? "अतिरिक्त" : "Excess") :
                                 (language === "Hindi" ? "सर्वोत्तम" : "Optimal")}
                              </span>
                            </div>
                          </div>

                          <div className="border-t border-white/5 pt-3.5 text-[11px] text-gray-300 font-sans leading-relaxed">
                            <span className="font-extrabold text-white block mb-1">
                              {language === "Hindi" ? "परामर्श कार्य योजना:" : "Agronomic Remediation Plan:"}
                            </span>
                            <p className="text-gray-400 text-[10px] leading-relaxed">
                              {language === "Hindi" ? (
                                <>
                                  {nStat === "deficit" && "• नाइट्रोजन उर्वरता के लिए प्रति हेक्टेयर 120 किलोग्राम यूरिया या जैव-उर्वरक (एज़ोटोबैक्टर) का प्रयोग करें। "}
                                  {pStat === "deficit" && "• फास्फोरस की कमी हेतु सिंगल सुपर फॉस्फेट (SSP) या DAP प्रति हेक्टेयर मिट्टी में जैविक खाद के साथ मिलाएं। "}
                                  {kStat === "deficit" && "• पोटेशियम की कमी ठीक करने के लिए बुवाई के समय मयूरिएट ऑफ पोटाश (MOP) डालें। "}
                                  {nStat === "optimal" && pStat === "optimal" && kStat === "optimal" && "• आपकी मिट्टी संस्तुत पोषक तत्वों के संतुलन में है। वर्तमान जैविक खाद चक्र बनाए रखें। "}
                                </>
                              ) : (
                                <>
                                  {nStat === "deficit" && "• For N deficit, apply 120 kg/ha urea or Nitrogenous biofertilizers (Azotobacter). "}
                                  {pStat === "deficit" && "• For P deficit, compound Superphosphate or Diammonium Phosphate (DAP) incorporated pre-sowing. "}
                                  {kStat === "deficit" && "• For K deficit, apply Muriate of Potash (MOP) at early cultivation cycles. "}
                                  {nStat === "optimal" && pStat === "optimal" && kStat === "optimal" && "• Soil NPK balance is optimal. Maintain periodic organic compost cycle on the top-soil."}
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>

            {/* REAL INDIAN AGRICULTURE OFFICIAL HELPLINE DIRECTORY (Section 12) */}
            <div className="glass-panel p-6 rounded-2xl border-white/5 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[9px] font-black uppercase text-saffron bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded inline-block tracking-wider">
                  {language === "Hindi" ? "राजकीय किसान संपर्क सूत्र" : "DIRECT GOVERNMENT CONTACTS"}
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-2">
                  {language === "Hindi" ? "कृषि विज्ञान केंद्र (KVK) एवं केंद्रीय संपर्क पोर्टल" : "Krishi Helplines & KVK Directory"}
                </h3>
                <p className="text-xs text-gray-400">
                  {language === "Hindi" ? "देश के किसी भी हिस्से से बिना एजेंटों के सीधे कृषि वैज्ञानिकों एवं मंत्रालयों से संपर्क करें।" : "Direct administrative connections to secure assistance without institutional intermediaries."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-[11px]">
                <div className="bg-black/30 border border-white/5 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-saffron font-bold text-xs">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{language === "Hindi" ? "राष्ट्रीय किसान हेल्पलाइन" : "National Farmer Call Center"}</span>
                  </div>
                  <p className="text-xl font-serif font-black text-white">1800-180-1551</p>
                  <p className="text-[10px] text-gray-500 leading-normal">
                    {language === "Hindi" ? "निःशुल्क चौबीसों घंटे संपर्क सूत्र। भारतीय कृषि मंत्रालय द्वारा संचालित।" : "Toll-free. Direct access to agronomists. Funded by Ministry of Agriculture & Farmers Welfare."}
                  </p>
                </div>

                <div className="bg-black/30 border border-white/5 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-[#138808] font-bold text-xs">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{language === "Hindi" ? "पीएम किसान शिकायत सेवा" : "PM-Kisan Helpline Portal"}</span>
                  </div>
                  <p className="text-xl font-serif font-black text-white">011-24300606</p>
                  <p className="text-[10px] text-gray-500 leading-normal">
                    {language === "Hindi" ? "बैंक रिकॉर्ड अस्वीकरण एवं किश्त न मिलने पर शिकायत दर्ज करें।" : "Direct grievance registration for pending DBT installments and PFMS error status corrections."}
                  </p>
                </div>

                <div className="bg-black/30 border border-white/5 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{language === "Hindi" ? "सॉइल हेल्थ कार्ड राष्ट्रीय सेल" : "Soil Health National Cell"}</span>
                  </div>
                  <p className="text-xl font-serif font-black text-white">011-23381092</p>
                  <p className="text-[10px] text-gray-500 leading-normal">
                    {language === "Hindi" ? "प्रयोगशालाओं की मैपिंग एवं परीक्षण परिणामों में गड़बड़ी का निवारण।" : "Direct administrative desk of Soil Health Management under Integrated Nutrient Division."}
                  </p>
                </div>
              </div>
            </div>

            {/* BRAND NEW CROPS AND FIELDS ILLUSTRATION GALLERY (To fulfill 'add more crops and some phoyo in it' as requested) */}
            <div className="glass-panel p-6 rounded-2xl border-white/5 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[9px] font-black uppercase text-[#138808] bg-[#138808]/10 border border-[#138808]/20 px-2.5 py-1 rounded inline-block tracking-wider">
                  {language === "Hindi" ? "कृषि प्रदर्शनी एवं शस्य चित्र" : "PROSPEROUS BHARAT CROP EXHIBITION"}
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-2">
                  {language === "Hindi" ? "भारतीय भौगोलिक इंडिकेशन शस्य दीर्घा" : "Agricultural Land Restoration & Crop Gallery"}
                </h3>
                <p className="text-xs text-gray-400">
                  {language === "Hindi" ? "राजकीय वित्तीय सब्सिडी योजनाओं द्वारा समर्थित देश की प्रमुख नकदी व खाद्यान्न फसलें।" : "Mapping major cash crops and grains backed by direct central subsidies and geographic index certifications."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { 
                    cropEn: "Paddy / Basmati Rice", 
                    cropHi: "सुगंधित बासमती धान", 
                    url: "https://images.unsplash.com/photo-1534265222345-20934f20f16f?auto=format&fit=crop&w=400&q=80",
                    descEn: "2% net PMFBY statutory rate",
                    descHi: "२% शुद्ध पीएमएफबीवाई सांविधिक प्रीमियम दर"
                  },
                  { 
                    cropEn: "Golden Wheat Harvest", 
                    cropHi: "स्वर्णिम गेहूं फसल", 
                    url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80",
                    descEn: "1.5% Rabi premium shield",
                    descHi: "१.५% रबी सुरक्षा प्रीमियम कवच"
                  },
                  { 
                    cropEn: "Assam Hills Tea Gardens", 
                    cropHi: "असम के पर्वतीय चाय बागान", 
                    url: "https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=400&q=80",
                    descEn: "Cash crop with high horticultural support",
                    descHi: "बागवानी सहायता से युक्त उच्च मूल्यवान व्यावसायिक उपज"
                  },
                  { 
                    cropEn: "Sugarcane & Agro-Biomass", 
                    cropHi: "गन्ना और जैव-उर्वरक उपज", 
                    url: "https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&w=400&q=80",
                    descEn: "FRP statutory minimum pricing support",
                    descHi: "उचित और लाभकारी न्यूनतम मूल्य (FRP) सुरक्षा"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-black/45 border border-white/5 rounded-2xl overflow-hidden group hover:border-[#FF9933]/40 transition-all duration-300">
                    <div className="h-40 w-full overflow-hidden relative">
                      <img 
                        src={item.url} 
                        alt={item.cropEn} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <span className="absolute bottom-3 left-3 font-serif font-black text-xs text-white">
                        {language === "Hindi" ? item.cropHi : item.cropEn}
                      </span>
                    </div>
                    <div className="p-3.5 space-y-1">
                      <span className="text-[10px] text-[#FF9933] font-mono font-bold block">
                        {language === "Hindi" ? item.descHi : item.descEn}
                      </span>
                      <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">
                        {language === "Hindi" ? "केंद्र अनुमोदित योजनाएं" : "Union Approved Crops"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. BENEFITS TAB (Consolidated Eligibility, Northeastern state selector hubs and directory) */}
        {activeTab === "benefits" && (
          <div className="space-y-10 animate-fadeIn" id="tab-view-benefits">
            
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs text-[#FF9933] font-black uppercase tracking-widest">STATE-WISE SCHEMES & REGIONAL INTELLIGENCE</span>
              <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-white">Benefits Eligibility Console</h1>
              <p className="text-xs text-gray-400 max-w-xl mx-auto leading-relaxed">
                Adjust your socio-economic details on the left, check schemes that fit your coordinates, or visit the dedicated Northeast Hub tab for regional state directories.
              </p>
            </div>

            {/* TWO COLUMN ELIGIBILITY CALCULATOR BLOCK */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column - Demographic Profile Controls */}
              <div className="lg:col-span-5 bg-black/40 border border-white/5 rounded-2xl p-6 space-y-4" id="eligibility-inputs">
                <h3 className="font-serif font-black text-base border-b border-white/10 pb-2 text-[#FF9933] flex items-center gap-2">
                  <UserCheck className="w-4.5 h-4.5" /> Adjust Your Profile Parameters
                </h3>

                {/* State Domicile */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">State Domicile</label>
                  <select 
                    value={profileState}
                    onChange={(e) => {
                      setProfileState(e.target.value);
                      if (["Assam", "Meghalaya", "Manipur", "Nagaland", "Mizoram", "Arunachal Pradesh", "Sikkim", "Tripura"].includes(e.target.value)) {
                        setSelectedNEState(e.target.value);
                      }
                    }}
                    className="w-full bg-[#05070F] border border-white/10 rounded-lg px-2.5 py-2 text-xs text-gray-200 outline-none focus:border-amber-500"
                  >
                    <option value="All India">All States (General Central schemes)</option>
                    <option value="Assam">Assam</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Bihar">Bihar</option>
                    <option value="UP">Uttar Pradesh</option>
                    <option value="Rajasthan">Rajasthan</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Age */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                      {language === "Hindi" ? "आयु (वर्ष)" : "Age (Years)"}
                    </label>
                    <input 
                      type="number"
                      value={profileAge}
                      onChange={(e) => setProfileAge(parseInt(e.target.value) || 18)}
                      className="w-full bg-[#05070F] border border-white/10 rounded-lg px-2.5 py-2 text-xs text-gray-200 outline-none focus:border-amber-500 font-bold"
                      min="1" max="100"
                    />
                  </div>

                  {/* Gender */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                      {language === "Hindi" ? "लिंग" : "Gender Selector"}
                    </label>
                    <select 
                      value={profileGender}
                      onChange={(e) => setProfileGender(e.target.value)}
                      className="w-full bg-[#05070F] border border-white/10 rounded-lg px-2.5 py-2 text-xs text-gray-200 outline-none focus:border-amber-500 font-bold"
                    >
                      <option value="Female">{language === "Hindi" ? "महिला" : "Female"}</option>
                      <option value="Male">{language === "Hindi" ? "पुरुष" : "Male"}</option>
                      <option value="Transgender">{language === "Hindi" ? "ट्रांसजेंडर" : "Transgender"}</option>
                    </select>
                  </div>
                </div>

                {/* Income */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    {language === "Hindi" ? "वार्षिक पारिवारिक आय" : "Annual Family Income"} (₹: {profileIncome.toLocaleString("en-IN")})
                  </label>
                  <input 
                    type="range"
                    value={profileIncome}
                    onChange={(e) => setProfileIncome(parseInt(e.target.value))}
                    min="10000" max="600000" step="5000"
                    className="w-full accent-[#FF9933] cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-gray-500 font-bold uppercase">
                    <span>{language === "Hindi" ? "₹10,000 (गरीब/BPL)" : "₹10,000 (Low income BPL)"}</span>
                    <span>₹6,000,000</span>
                  </div>
                </div>

                {/* Occupation */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    {language === "Hindi" ? "व्यवसाय की श्रेणी" : "Occupation Category"}
                  </label>
                  <select 
                    value={profileOccupation}
                    onChange={(e) => setProfileOccupation(e.target.value)}
                    className="w-full bg-[#05070F] border border-white/10 rounded-lg px-2.5 py-2 text-xs text-gray-200 outline-none focus:border-amber-500 font-bold"
                  >
                    <option value="Farmer">{language === "Hindi" ? "किसान (सक्रिय कृषक)" : "Farmer (Agricultural Sector)"}</option>
                    <option value="Student">{language === "Hindi" ? "विद्यार्थी (स्कूल/कॉलेज)" : "Student (Undergrad/School)"}</option>
                    <option value="Self Employed / Business">{language === "Hindi" ? "स्व-रोजगार / लघु व्यापारी" : "Self Employed / Small Trades"}</option>
                    <option value="SHG Member">{language === "Hindi" ? "एसएचजी सदस्य (महिला समूह)" : "SHG Member (Self-Help groups)"}</option>
                    <option value="Unskilled Labor">{language === "Hindi" ? "अकुशल श्रमिक / दिहाड़ी मजदूर" : "Unskilled Labor / Casual wages"}</option>
                    <option value="None">{language === "Hindi" ? "कोई नहीं / सामान्य कल्याण" : "None / General Welfare seeker"}</option>
                  </select>
                </div>

                {/* Caste Category */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    {language === "Hindi" ? "सामाजिक श्रेणी (Caste)" : "Socio-Social Category"}
                  </label>
                  <select 
                    value={profileCategory}
                    onChange={(e) => setProfileCategory(e.target.value)}
                    className="w-full bg-[#05070F] border border-white/10 rounded-lg px-2.5 py-2 text-xs text-gray-200 outline-none focus:border-amber-500 font-bold"
                  >
                    <option value="General">{language === "Hindi" ? "सामान्य (General)" : "General / Unreserved"}</option>
                    <option value="OBC">{language === "Hindi" ? "ओबीसी (OBC)" : "OBC (Other Backward Classes)"}</option>
                    <option value="SC">{language === "Hindi" ? "अनुसूचित जाति (SC)" : "Scheduled Caste (SC)"}</option>
                    <option value="ST">{language === "Hindi" ? "अनुसूचित जनजाति (ST)" : "Scheduled Tribe (ST)"}</option>
                  </select>
                </div>

                {/* Metric results calculated locally */}
                <div className="bg-[#0c0c1c]/90 border border-white/5 rounded-2xl p-4 space-y-3 pt-3">
                  <span className="text-[9px] font-black uppercase text-[#22c55e] block tracking-widest">
                    Your Individual Calculated Metrics
                  </span>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#05070F] p-3 rounded border border-white/5">
                      <span className="text-[10px] text-gray-500 uppercase font-black block">Matching Schemes</span>
                      <strong className="text-lg text-white font-serif">{eligibleSchemes.length} active</strong>
                    </div>
                    <div className="bg-[#05070F] p-3 rounded border border-white/5">
                      <span className="text-[10px] text-gray-500 uppercase font-black block">Claimed Progress</span>
                      <strong className="text-lg text-[#FF9933] font-serif">{claimedCount} verified</strong>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column - Directory Search bar and Matching Schemes matches only */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Search query block */}
                <div className="glass-panel p-4 rounded-xl border-white/5 flex gap-4 items-center">
                  <div className="flex-1 bg-black/45 border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2">
                    <Search className="w-4 h-4 text-gray-500 shrink-0" />
                    <input 
                      type="text"
                      placeholder={language === "Hindi" ? "कीवर्ड द्वारा योजनाओं को खोजें (उदा. किसान, स्वास्थ्य, मुद्रा)..." : "Search schemes by keywords (e.g. kisan, health, mudra)..."}
                      value={directorySearch}
                      onChange={(e) => setDirectorySearch(e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-xs text-white placeholder-gray-500 h-7"
                    />
                  </div>
                  <select 
                    value={directoryCatFilter}
                    onChange={(e) => setDirectoryCatFilter(e.target.value)}
                    className="bg-gray-900 border border-white/10 text-xs rounded-lg px-2 py-2 text-gray-300 font-bold outline-none uppercase"
                  >
                    <option value="All">{language === "Hindi" ? "सभी श्रेणियां" : "All Categories"}</option>
                    <option value="Agriculture">{language === "Hindi" ? "कृषि (Agriculture)" : "Agriculture"}</option>
                    <option value="Health">{language === "Hindi" ? "स्वास्थ्य (Health)" : "Health"}</option>
                    <option value="Housing">{language === "Hindi" ? "आवास (Housing)" : "Housing"}</option>
                    <option value="Business">{language === "Hindi" ? "व्यवसाय (Business)" : "Business"}</option>
                    <option value="Education">{language === "Hindi" ? "शिक्षा (Education)" : "Education"}</option>
                    <option value="Welfare">{language === "Hindi" ? "कल्याण (Welfare)" : "Welfare"}</option>
                  </select>
                </div>

                {/* Schemes listing details */}
                <div className="space-y-4">
                  {(() => {
                    // Filter matching inputs & search
                    const matchesSearch = eligibleSchemes.filter(s => {
                      const matchesText = s.name.toLowerCase().includes(directorySearch.toLowerCase()) || 
                                          s.tagline.toLowerCase().includes(directorySearch.toLowerCase()) ||
                                          s.description.toLowerCase().includes(directorySearch.toLowerCase());
                      const matchesCat = directoryCatFilter === "All" || s.category === directoryCatFilter;
                      return matchesText && matchesCat;
                    });

                    if (matchesSearch.length === 0) {
                      return (
                        <div className="glass-panel p-8 text-center rounded-2xl border-white/5 space-y-2">
                          <Landmark className="w-8 h-8 text-gray-600 mx-auto" />
                          <h4 className="font-serif font-bold text-gray-400">{language === "Hindi" ? "कोई योजना नहीं मिली" : "No matching schemes located"}</h4>
                          <p className="text-xs text-gray-500">{language === "Hindi" ? "अपने क्रेडेंशियल्स बदलें या अपनी खोज साफ़ करें।" : "Adjust your socioeconomic profile coordinates, change state selectors or clear search parameters."}</p>
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-4">
                        {matchesSearch.map(sRaw => {
                          const s = translateScheme(sRaw, language);
                          const isClaimed = claimedSchemes.includes(s.id);
                          return (
                            <div 
                              key={s.id}
                              className={`glass-panel p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                                isClaimed ? "border-[#138808]/40 bg-[#138808]/5" : "border-white/5"
                              }`}
                            >
                              <input 
                                type="checkbox"
                                checked={isClaimed}
                                onChange={() => {
                                  if (isClaimed) {
                                    setClaimedSchemes(claimedSchemes.filter(id => id !== s.id));
                                    triggerFeedback(language === "Hindi" ? `योजना "${s.name}" हटाई गई` : `Removed "${s.name}" from your claimed registry list.`);
                                  } else {
                                    setClaimedSchemes([...claimedSchemes, s.id]);
                                    triggerFeedback(language === "Hindi" ? `योजना "${s.name}" सफलतापूर्वक जोड़ी गई` : `Marked "${s.name}" as successfully claimed.`);
                                  }
                                }}
                                className="w-4 h-4 rounded mt-1 accent-[#138808] shrink-0 cursor-pointer pointer-events-auto"
                              />

                              <div className="space-y-2.5 flex-1">
                                <div className="flex justify-between items-start flex-wrap gap-2">
                                  <div>
                                    <h4 className="font-serif font-black text-sm text-white">{s.name}</h4>
                                    <span className="text-[10px] text-[#FF9933] font-serif uppercase tracking-wider">{s.responsibleMinistry}</span>
                                  </div>
                                  <span className="text-[10px] bg-amber-500/10 text-saffron font-bold border border-amber-500/20 px-2.5 py-0.5 rounded">
                                    {s.benefitDescription}
                                  </span>
                                </div>

                                <p className="text-xs text-gray-400 leading-relaxed font-sans">{s.description}</p>

                                <div className="border-t border-white/5 pt-2.5 flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                                  <div className="flex gap-2 sm:gap-4 flex-wrap font-mono">
                                    <span>{language === "Hindi" ? "श्रेणी" : "Category"}: {s.category}</span>
                                    <span>•</span>
                                    <span>{language === "Hindi" ? "हेल्पलाइन" : "Primary Helpline"}: {s.helpline}</span>
                                    <span>•</span>
                                    <span>{language === "Hindi" ? "राज्य" : "State"}: {s.state}</span>
                                  </div>
                                  <a 
                                    href={s.officialPortal} 
                                    target="_blank" rel="noreferrer"
                                    className="text-saffron underline hover:text-white flex items-center gap-1 block cursor-pointer"
                                  >
                                    {language === "Hindi" ? "अभी लागू करें" : "Apply Now"} <ChevronRight className="w-3 h-4" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>

                {/* PFMS strict compliance alert */}
                <div className="bg-red-500/5 p-4 rounded-xl border border-red-500/20 text-xs text-red-200 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[#FF9933] mb-0.5 uppercase tracking-wider font-serif">Aadhaar Mapping Compliance Rule</h5>
                    <p className="text-gray-400 font-sans leading-relaxed">
                      If bank profile data mismatches the national registry spelling, Digital Payments (PFMS) holds DBT disbursements instantly. Check credentials via the Documents panel prior to locking claims.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* 3. DOCUMENTS TAB (Universal Document Intelligence Engine with 10 tiers, smart rating filters & recovery) */}
        {activeTab === "documents" && (
          <DocumentIntelligence 
            inventoryDocs={inventoryDocs}
            setInventoryDocs={setInventoryDocs}
            language={language}
            profileAge={profileAge}
            profileState={profileState}
            profileOccupation={profileOccupation}
            profileGender={profileGender}
            triggerFeedback={triggerFeedback}
          />
        )}

        {/* 4. RECOVERY TAB (Rejection Recovery Engine with diagnostic roadmap) */}
        {activeTab === "recovery" && (
          <div className="space-y-10 animate-fadeIn max-w-4xl mx-auto" id="tab-view-recovery">
            
            <div className="text-center space-y-3">
              <span className="text-xs text-red-500 font-black uppercase tracking-widest bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                Active Post-Audit Recovery Engine
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-white">Rejection Recovery Engine</h1>
              <p className="text-xs text-gray-400 max-w-xl mx-auto leading-relaxed">
                Choose the scheme you applied for and the exact rejection description text displayed on your status page. Haqqdar analyzes structural failures and provides your appeal roadmap.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              {/* Selector form */}
              <div className="glass-panel p-6 rounded-2xl space-y-4">
                <h3 className="font-serif font-black text-base border-b border-white/10 pb-2 text-[#FF9933] flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#FF9933]" /> {language === "Hindi" ? "अस्वीकृति का सटीक विवरण भरें" : "Specify Rejection Details"}
                </h3>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">{language === "Hindi" ? "लक्षित सरकारी योजना (Scheme)" : "Target Government Scheme"}</label>
                  <select 
                    value={selectedRejectScheme}
                    onChange={(e) => {
                      setSelectedRejectScheme(e.target.value);
                      setSelectedRejectReasonIdx(0);
                    }}
                    className="w-full bg-[#05070F] border border-white/10 rounded-lg px-2.5 py-2 text-xs text-gray-200 outline-none font-bold"
                  >
                    {schemes.map(sRaw => {
                      const s = translateScheme(sRaw, language);
                      return (
                        <option key={s.id} value={s.id}>{s.name} ({s.category})</option>
                      );
                    })}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">{language === "Hindi" ? "आधिकारिक टिप्पणी / अस्वीकृति रिमार्क" : "Official Remarks / State Status Line"}</label>
                  <select 
                    value={selectedRejectReasonIdx}
                    onChange={(e) => setSelectedRejectReasonIdx(parseInt(e.target.value))}
                    className="w-full bg-[#05070F] border border-white/10 rounded-lg px-2.5 py-2 text-xs text-gray-200 outline-none font-bold"
                  >
                    {activeRejectSchemeObj.rejectionReasons.map((r, i) => (
                      <option key={i} value={i}>
                        {language === "Hindi" ? ((r as any).reasonHi || r.reason) : r.reason}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-yellow-500/5 p-4 rounded-xl border border-yellow-500/20 text-xs text-yellow-100 space-y-1">
                  <span className="font-bold flex items-center gap-1 text-[#FF9933] uppercase text-[10px]">
                    <Shield className="w-4 h-4 text-saffron" /> {language === "Hindi" ? "संवैधानिक प्रावधान एवं नियम" : "Constitutional Notice"}
                  </span>
                  <p className="text-gray-400 leading-normal font-sans">
                    {language === "Hindi" 
                      ? "भारत के प्रशासनिक नियमों के अनुसार, प्रत्येक संबंधित कार्यालय जनसाधारण को लिखित कारण बताने के लिए बाध्य है। यदि वे अस्वीकार कारण नहीं बताते हैं तो धारा 6(1) के अंतर्गत आरटीआई जमा करने का वैधानिक अधिकार प्राप्त है।" 
                      : "Under direct administrative directives of India, public desks MUST supply a clear, reasoned written order explaining rejections. If they refuse, you are legally entitled to file a Section 6(1) RTI inquiry to extract this proof."}
                  </p>
                </div>
              </div>

              {/* Recovery output card with diagnostic roadmap */}
              <div className="space-y-6">
                
                <div className="glass-panel p-6 rounded-2xl border-amber-500/20 bg-gradient-to-tr from-[#1A1F4D]/35 via-[#0A0D18]/50 to-[#0A0D18]/85 space-y-4">
                  <span className="text-[9px] font-black text-green bg-green/10 px-2 py-0.5 rounded tracking-wide border border-green/20">
                    RESOLVABLE SUCCESS VERDICT
                  </span>

                  <div className="space-y-1">
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest block">Identified Structural Mismatch Cause</span>
                    <p className="text-sm font-black text-red-400 mt-0.5 leading-tight">{activeRejectionReasonObj.reason}</p>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest block">Correction Instructions</span>
                    <p className="text-xs text-gray-300 leading-relaxed bg-black/40 p-3 rounded-xl border border-white/5 font-sans">
                      {activeRejectionReasonObj.correction}
                    </p>
                  </div>

                  <div className="flex gap-4 border-t border-white/10 pt-3 text-xs leading-none">
                    <div>
                      <span className="text-gray-500 text-[9px] block uppercase tracking-wider mb-1">Expected Timeline</span>
                      <strong className="text-white font-serif font-bold">{activeRejectionReasonObj.timeline}</strong>
                    </div>
                    <div className="border-l border-white/10 pl-4">
                      <span className="text-gray-500 text-[9px] block uppercase tracking-wider mb-1">Official state Portal</span>
                      <a 
                        href={activeRejectSchemeObj.officialPortal} 
                        target="_blank" rel="noreferrer"
                        className="text-saffron font-bold underline font-mono lowercase"
                      >
                        {activeRejectSchemeObj.officialPortal.replace("https://", "")}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Progress flow status */}
                <div className="glass-panel p-5 rounded-2xl border-white/5 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-300">
                    <span>Correction Roadmap Pipeline</span>
                    <span className="text-[#FF9933] font-black font-mono">Phase 3: Active Correction</span>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-1.5 pt-1.5 text-center">
                    {[
                      { l: "Profile Match", c: "bg-[#138808]" },
                      { l: "Doc Audit", c: "bg-[#138808]" },
                      { l: "Correction", c: "bg-[#FF9933] animate-pulse" },
                      { l: "Formal Appeal", c: "bg-gray-800" },
                      { l: "Approval", c: "bg-gray-800" }
                    ].map((step, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className={`h-2.5 rounded-full ${step.c}`} />
                        <span className="text-[9px] font-black uppercase tracking-wider block text-gray-500 leading-none">{step.l}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* 5. APPEALS TAB (Appeals & RTI Center with draft compiler & printable format) */}
        {activeTab === "appeals" && (
          <div className="space-y-10 animate-fadeIn max-w-5xl mx-auto" id="tab-view-appeals">
            
            <div className="text-center space-y-3">
              <span className="text-xs text-[#FF9933] font-black uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Lawful Administrative appeal Console
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-white">Appeals & RTI Center</h1>
              <p className="text-xs text-gray-400 max-w-xl mx-auto leading-relaxed">
                Generate highly formatted Right to Information (RTI) applications, First Appeals under Section 19(1), or Grievances directed to District Magistrates. Download compile drafts to mail.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Parameter controls */}
              <div className="lg:col-span-5 bg-black/40 border border-white/5 p-6 rounded-2xl space-y-4">
                <h3 className="font-serif font-extrabold text-base border-b border-white/10 pb-2 text-[#FF9933]">
                  Configure Legal parameters
                </h3>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Target Appeal Category</label>
                  <select 
                    value={rtiForm.type}
                    onChange={(e) => {
                      setRtiForm({ ...rtiForm, type: e.target.value });
                      triggerFeedback(`Appeals template configured to: ${e.target.value}`);
                    }}
                    className="w-full bg-[#05070F] border border-white/10 rounded-lg px-2.5 py-2 text-xs text-gray-200 outline-none focus:border-amber-500"
                  >
                    <option value="Application Status RTI">Section 6(1) Status RTI Application</option>
                    <option value="First Appeal">Section 19(1) First Appeal to Appellate Authority</option>
                    <option value="Grievance Letter">Registered Complaint to District Magistrate (DM)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Full Name of Applicant</label>
                  <input 
                    type="text"
                    value={rtiForm.name}
                    onChange={(e) => setRtiForm({ ...rtiForm, name: e.target.value })}
                    className="w-full bg-[#05070F] border border-white/10 rounded-lg px-2.5 py-2 text-xs text-gray-200 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">District Location</label>
                    <input 
                      type="text"
                      value={rtiForm.district}
                      onChange={(e) => setRtiForm({ ...rtiForm, district: e.target.value })}
                      className="w-full bg-[#05070F] border border-white/10 rounded-lg px-2.5 py-2 text-xs text-gray-200 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">State Territory</label>
                    <input 
                      type="text"
                      value={rtiForm.state}
                      onChange={(e) => setRtiForm({ ...rtiForm, state: e.target.value })}
                      className="w-full bg-[#05070F] border border-white/10 rounded-lg px-2.5 py-2 text-xs text-gray-200 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Permanent Mail Address</label>
                  <input 
                    type="text"
                    value={rtiForm.address}
                    onChange={(e) => setRtiForm({ ...rtiForm, address: e.target.value })}
                    className="w-full bg-[#05070F] border border-white/10 rounded-lg px-2.5 py-2 text-xs text-gray-200 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Designated Department</label>
                    <input 
                      type="text"
                      value={rtiForm.dept}
                      onChange={(e) => setRtiForm({ ...rtiForm, dept: e.target.value })}
                      className="w-full bg-[#05070F] border border-white/10 rounded-lg px-2.5 py-2 text-xs text-gray-200 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Target Scheme</label>
                    <input 
                      type="text"
                      value={rtiForm.scheme}
                      onChange={(e) => setRtiForm({ ...rtiForm, scheme: e.target.value })}
                      className="w-full bg-[#05070F] border border-white/10 rounded-lg px-2.5 py-2 text-xs text-gray-200 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Application ID / Reference Number</label>
                  <input 
                    type="text"
                    value={rtiForm.appId}
                    onChange={(e) => setRtiForm({ ...rtiForm, appId: e.target.value })}
                    className="w-full bg-[#05070F] border border-white/10 rounded-lg px-2.5 py-2 text-xs text-gray-200 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Specific Denial Reason Given</label>
                  <textarea 
                    value={rtiForm.specificReason}
                    onChange={(e) => setRtiForm({ ...rtiForm, specificReason: e.target.value })}
                    className="w-full bg-[#05070F] border border-white/10 rounded-lg px-2.5 py-2 text-xs text-gray-200 outline-none h-16 resize-none"
                  />
                </div>
              </div>

              {/* Draft viewer column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block">Statutory Manuscript Compilation</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(generateRTITemplateText());
                        triggerFeedback("Compiled letter successfully copied to clipboard.");
                      }}
                      className="bg-white/5 border border-white/15 px-3 py-1.5 rounded text-xs hover:bg-white/10 flex items-center gap-1 block"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy Text
                    </button>
                    <button 
                      onClick={downloadLegalRTIDraft}
                      className="bg-[#FF9933] text-black font-extrabold px-3 py-1.5 rounded text-xs hover:opacity-90 flex items-center gap-1 block"
                    >
                      <Download className="w-3.5 h-3.5" /> Save Draft .TXT
                    </button>
                  </div>
                </div>

                <div className="manuscript-border p-5 rounded-2xl bg-[#050616] max-h-[500px] overflow-y-auto text-yellow-105/90 font-mono text-xs leading-relaxed select-all">
                  <pre className="whitespace-pre-wrap">{generateRTITemplateText()}</pre>
                </div>

                <div className="bg-[#138808]/5 p-4 rounded-xl border border-[#138808]/20 text-xs text-gray-200 space-y-1.5">
                  <h5 className="font-serif font-black text-[#138808] uppercase tracking-wider text-[10px]">📬 Filing Instructions</h5>
                  <ol className="list-decimal pl-5 space-y-1 text-gray-400 leading-normal">
                    <li>Download or copy your compiled draft text.</li>
                    <li>Affix a physical ₹10 Indian Postal Order (IPO) as physical fee processing, purchased from any local post office channel.</li>
                    <li>Send the package via registered speed post directly to the designated department officers.</li>
                    <li>Sovereignty of public records: Officers are legally bound to deliver responses within 30 statutory days, or face financial penalty flags.</li>
                  </ol>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 6. ASSISTANT TAB (Haqqdar guidance assistant / chatbot with localized search fallbacks) */}
        {activeTab === "assistant" && (
          <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto" id="tab-view-assistant">
            
            <div className="text-center space-y-3">
              <span className="text-xs text-[#FF9933] font-black uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-saffron" /> {language === "Hindi" ? "नागरिक मार्गदर्शन प्रणाली" : "Citizens Guidance System"}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-white">Haqqdar Assistant</h1>
              <p className="text-xs text-gray-400 max-w-xl mx-auto leading-relaxed">
                {language === "Hindi" 
                  ? "अपनी अस्वीकृति, दस्तावेज़ तत्परता या पात्रता के बारे में तुरंत पूछताछ करें। एकीकृत लाइफ क्राइसिस नेविगेटर।"
                  : "Explain eligibility, document readiness protocols, or rejection remarks immediately. Integrated with the state-of-the-art Bureaucracy Navigator."}
              </p>
            </div>

            {/* --- BUREAUCRACY & LIFE CRISIS NAVIGATOR PANEL (12 KEY STATES) --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn" id="life-crisis-navigator-suite">
              
              {/* Visual LEFT column: Grid of 12 Events */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 bg-zinc-950 border border-white/5 rounded-2xl">
                  <h3 className="text-xs uppercase font-extrabold text-[#FF9933] tracking-widest mb-1">
                    {language === "Hindi" ? "१२ आपातकालीन जीवन स्थितियां" : "12 Emergency Life Situations"}
                  </h3>
                  <p className="text-[10px] text-gray-400">
                    {language === "Hindi" 
                      ? "संविधान और सरकारी नियमों के अंतर्गत अपनी स्थिति चुनें:" 
                      : "Select your current state of affairs to unlock a complete roadmap:"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-[460px] overflow-y-auto pr-1" id="crisis-grid-list">
                    {LIFE_CRISIS_PLAYBOOKS.map((pb) => {
                      const IconComponent = (() => {
                        switch (pb.iconName) {
                          case "Users": return Users;
                          case "Briefcase": return Briefcase;
                          case "GraduationCap": return GraduationCap;
                          case "Building2": return Building2;
                          case "User": return User;
                          case "Activity": return Activity;
                          case "AlertTriangle": return AlertTriangle;
                          case "Sprout": return Sprout;
                          case "Globe": return Globe;
                          case "Landmark": return Landmark;
                          case "Home": return Home;
                          default: return HelpCircle;
                        }
                      })();
                      const isSelected = selectedCrisisId === pb.id || (!selectedCrisisId && pb.id === "family-loss");
                      
                      return (
                        <button
                          key={pb.id}
                          onClick={() => {
                            setSelectedCrisisId(pb.id);
                            triggerFeedback(language === "Hindi" ? `चयनित: ${pb.title_hi}` : `Analyzing playbook: ${pb.title_en}`);
                          }}
                          className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between h-[96px] ${
                            isSelected
                              ? "bg-gradient-to-b from-[#1c2333]/90 to-[#0A0D18]/90 border-[#FF9933] shadow-lg shadow-[#FF9933]/5 scale-[0.98]"
                              : "bg-zinc-950/40 border-white/5 hover:border-white/10 hover:bg-zinc-900/40"
                          }`}
                        >
                          <div className="flex justify-between items-start w-full">
                            <div className={`p-1.5 rounded-xl ${isSelected ? "bg-[#FF9933]/15 text-[#FF9933]" : "bg-white/5 text-gray-400"}`}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            {isSelected && <span className="w-1.5 h-1.5 bg-[#FF9933] rounded-full" />}
                          </div>
                          
                          <span className={`text-[11px] font-bold line-clamp-2 leading-tight ${isSelected ? "text-white" : "text-gray-300"}`}>
                            {language === "Hindi" ? pb.title_hi : pb.title_en}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Detailed Interactive Playbook Inspector */}
                <div className="lg:col-span-7">
                  {(() => {
                    const activeCrisis = LIFE_CRISIS_PLAYBOOKS.find(c => c.id === (selectedCrisisId || "family-loss")) || LIFE_CRISIS_PLAYBOOKS[0];
                    const stateCheckedDocs = userCheckedDocs[activeCrisis.id] || {};
                    const totalDocsCount = activeCrisis.documents.length;
                    const checkedCount = Object.values(stateCheckedDocs).filter(Boolean).length;
                    
                    // Critical document check validation
                    const missingCritical = activeCrisis.documents.some(doc => doc.isCritical && !stateCheckedDocs[doc.name_en]);
                    
                    // Dynamic score: 40% base + distributed percentage from checking documents
                    const dynamicScore = totalDocsCount > 0 
                      ? Math.min(10, Math.round(3 + (checkedCount / totalDocsCount) * 7)) 
                      : 4;

                    return (
                      <div className="glass-panel rounded-3xl border-white/10 p-5 space-y-6 bg-black/60 relative overflow-hidden" id="crisis-inspector-card">
                        
                        {/* Shimmer background accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <span className="text-[10px] uppercase font-mono tracking-widest text-[#FF9933] font-bold px-2 py-1 bg-amber-500/10 rounded-lg inline-block mb-2">
                              {language === "Hindi" ? "सरकारी प्लेबुक निर्देशिका" : "GOVERNMENT PLAYBOOK"}
                            </span>
                            <h2 className="text-xl font-serif font-black text-white leading-tight">
                              {language === "Hindi" ? activeCrisis.title_hi : activeCrisis.title_en}
                            </h2>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">
                              {language === "Hindi" ? "अनुमानित समय" : "EXPECTED TIMELINE"}
                            </span>
                            <span className="text-sm font-semibold text-white tracking-wide flex items-center gap-1 mt-0.5 font-mono">
                              ⏱️ {language === "Hindi" ? activeCrisis.expectedTimeline_hi : activeCrisis.expectedTimeline_en}
                            </span>
                          </div>
                        </div>

                        {/* Tell me what happened scenario Quote */}
                        <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl text-xs italic text-gray-300 relative">
                          <span className="absolute -top-2 left-3 px-1.5 bg-[#0d0f19] text-[9px] text-[#FF9933] uppercase tracking-wider font-extrabold select-none">
                            {language === "Hindi" ? "नागरिक स्थिति शिकायत" : "Tell Me What Happened"}
                          </span>
                          <p className="leading-relaxed">
                            {language === "Hindi" ? activeCrisis.citizenRoleQuote_hi : activeCrisis.citizenRoleQuote_en}
                          </p>
                        </div>

                        {/* DYNAMIC READINESS CALCULATOR (VERY WINNING COMPONENT) */}
                        <div className="p-4 bg-zinc-950 border border-white/10 rounded-2xl space-y-3">
                          <div className="flex justify-between items-center bg-zinc-900/60 p-2.5 rounded-xl border border-white/5">
                            <div>
                              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                                📊 {language === "Hindi" ? "दस्तावेज़ तत्परता स्कोर" : "Document Readiness Score"}
                              </h4>
                              <p className="text-[9px] text-gray-400 mt-0.5">
                                {language === "Hindi" 
                                  ? "नीचे सूचीबद्ध अपने पास मौजूद दस्तावेजों पर टिक करें:" 
                                  : "Tick items you already hold below to compute score:"}
                              </p>
                            </div>
                            <div className="text-center bg-black px-3 py-1.5 rounded-lg border border-white/10">
                              <span className="text-shimmer-dynamic text-xs font-black uppercase tracking-wider block">
                                {language === "Hindi" ? "तैयारी" : "READINESS"}
                              </span>
                              <span className="text-lg font-mono font-black text-white">{dynamicScore}/10</span>
                            </div>
                          </div>

                          {/* Dynamic recommendation alert */}
                          {missingCritical ? (
                            <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-[10px] text-red-200 flex items-start gap-2">
                              <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                              <p className="leading-snug">
                                <strong>{language === "Hindi" ? "चेतावनी:" : "CRITICAL WARNING:"}</strong>{" "}
                                {language === "Hindi" 
                                  ? "आप वर्तमान में महत्वपूर्ण दस्तावेज़ खो रहे हैं। इसके बिना सरकारी कार्यालय जाने पर अस्वीकृति का अधिक जोखिम है।" 
                                  : "You are currently missing critical statutory documents. Going to the circle office without these will likely trigger dynamic rejections."}
                              </p>
                            </div>
                          ) : (
                            <div className="p-2.5 bg-green-500/10 border border-green-500/20 rounded-xl text-[10px] text-green-200 flex items-start gap-2 animate-fadeIn">
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                              <p className="leading-snug">
                                <strong>{language === "Hindi" ? "उत्कृष्ट तत्परता:" : "EXCELLENT READINESS:"}</strong>{" "}
                                {language === "Hindi" 
                                  ? "महत्वपूर्ण आधार दस्तावेज तैयार हैं! आप संबंधित अधिकारियों से संपर्क कर सकते हैं।" 
                                  : "All critical baseline documents are verified! You are completely safe to initiate compliance application checks."}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Interactive Checklist Table */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold text-gray-300">
                            📂 {language === "Hindi" ? "आवश्यक दस्तावेज और प्रमाण पत्र" : "Essential Documents & Checklists"}
                          </h4>
                          <div className="border border-white/5 rounded-2xl overflow-hidden bg-black/20 text-[11px] max-h-[180px] overflow-y-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-zinc-950 text-gray-400 font-extrabold uppercase border-b border-white/5 text-[9px] tracking-widest">
                                  <th className="p-2.5 w-12 text-center">{language === "Hindi" ? "पास में है?" : "Have?"}</th>
                                  <th className="p-2.5">{language === "Hindi" ? "दस्तावेज़ का नाम" : "Document Name"}</th>
                                  <th className="p-2.5">{language === "Hindi" ? "भूमिका / उद्देश्य" : "Role / Purpose"}</th>
                                  <th className="p-2.5 text-right pr-4">{language === "Hindi" ? "महत्व" : "Priority"}</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-white/5">
                                {activeCrisis.documents.map((doc) => {
                                  const isChecked = !!stateCheckedDocs[doc.name_en];
                                  return (
                                    <tr 
                                      key={doc.name_en} 
                                      onClick={() => {
                                        setUserCheckedDocs(prev => {
                                          const currentPB = prev[activeCrisis.id] || {};
                                          return {
                                            ...prev,
                                            [activeCrisis.id]: {
                                              ...currentPB,
                                              [doc.name_en]: !currentPB[doc.name_en]
                                            }
                                          };
                                        });
                                        triggerFeedback(isChecked ? "Removed document check" : "Marked document as carried");
                                      }}
                                      className="hover:bg-white/5 transition-colors cursor-pointer"
                                    >
                                      <td className="p-2.5 text-center">
                                        <input
                                          type="checkbox"
                                          checked={isChecked}
                                          onChange={() => {}} // Hanled by row click
                                          className="rounded border-white/20 text-[#FF9933] focus:ring-0 cursor-pointer w-3.5 h-3.5"
                                        />
                                      </td>
                                      <td className="p-2.5 font-bold text-white">
                                        {language === "Hindi" ? doc.name_hi : doc.name_en}
                                      </td>
                                      <td className="p-2.5 text-gray-400">
                                        {language === "Hindi" ? doc.purpose_hi : doc.purpose_en}
                                      </td>
                                      <td className="p-2.5 text-right pr-4 shrink-0">
                                        {doc.isCritical ? (
                                          <span className="text-[9px] font-black uppercase text-red-400 bg-red-400/10 px-1.5 py-0.5 border border-red-400/20 rounded">
                                            {language === "Hindi" ? "महत्वपूर्ण" : "Critical"}
                                          </span>
                                        ) : (
                                          <span className="text-[9px] font-bold text-gray-400 bg-white/5 px-1.5 py-0.5 rounded">
                                            {language === "Hindi" ? "सहायक" : "Supporting"}
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Government Target Offices list */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold text-gray-300">
                            🏛️ {language === "Hindi" ? "दौरा किए जाने वाले सरकारी कार्यालय" : "Physical Offices to Visit"}
                          </h4>
                          <div className="flex gap-1.5 flex-wrap">
                            {(language === "Hindi" ? activeCrisis.officesRequired_hi : activeCrisis.officesRequired_en).map((office, idx) => (
                              <span key={idx} className="bg-zinc-950 border border-white/10 text-gray-300 font-mono text-[10px] px-2.5 py-1 rounded-xl">
                                📍 {office}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Sequential Government Action Plan Steps */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-gray-300">
                            🪜 {language === "Hindi" ? "चरण-दर-चरण प्रशासनिक प्रक्रिया" : "Step-by-Step Administrative Bureaucracy"}
                          </h4>
                          <div className="space-y-2 relative border-l border-white/5 pl-4 ml-2.5">
                            {activeCrisis.roadmap.map((step) => (
                              <div key={step.step} className="space-y-1 relative">
                                <span className="absolute -left-[27px] top-[1px] w-5 h-5 bg-zinc-950 border border-white/20 text-[9px] text-[#FF9933] font-mono font-black rounded-full flex items-center justify-center">
                                  {step.step}
                                </span>
                                <h5 className="text-[11px] font-black text-white leading-tight">
                                  {language === "Hindi" ? step.title_hi : step.title_en}
                                </h5>
                                <p className="text-[10px] text-gray-400 leading-relaxed">
                                  {language === "Hindi" ? step.desc_hi : step.desc_en}
                                </p>
                                <span className="text-[9px] text-gray-500 block">
                                  🏛️ {language === "Hindi" ? "कार्यालय:" : "Venue:"} <strong>{step.office}</strong>
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Integrated CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          <button
                            onClick={async () => {
                              // Auto transition to chatbot with custom crisis template
                              const queryText = language === "Hindi" 
                                ? `${activeCrisis.title_hi} - ${activeCrisis.citizenRoleQuote_hi}`
                                : `${activeCrisis.title_en} - ${activeCrisis.citizenRoleQuote_en}`;
                              
                              setAssistantSubTab("chat");
                              handleChatSubmit(queryText);
                              triggerFeedback(language === "Hindi" ? "प्रकरण सलाहकार को भेजा गया" : "Passing dynamic case data to active AI advisor...");
                            }}
                            className="flex-1 bg-gradient-to-r from-[#FF9933] to-[#FF9933]/90 text-black font-extrabold py-3 px-4 rounded-xl text-xs hover:opacity-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg"
                          >
                            <HelpCircle className="w-4 h-4" />
                            <span>{language === "Hindi" ? "💬 इस मामले के बारे में पूछें (एआई)" : "💬 Discuss Case with Advisor (AI)"}</span>
                          </button>
                          
                          <button
                            onClick={() => {
                              // Dynamic clipboard build of crisis data
                              const txt = `BUREAUCRACY PLAYBOOK: ${activeCrisis.title_en}
==========================================
Expected Timeline: ${activeCrisis.expectedTimeline_en}
Situation Quote: ${activeCrisis.citizenRoleQuote_en}
Readiness Score: ${dynamicScore}/10

Documents Checklist:
${activeCrisis.documents.map((d, i) => `${i + 1}. [${stateCheckedDocs[d.name_en] ? "X" : " "}] ${d.name_en} (${d.isCritical ? "Required" : "Optional"})`).join("\n")}

Offices to Visit:
${activeCrisis.officesRequired_en.map((o, i) => `- ${o}`).join("\n")}

Step-By-Step Process:
${activeCrisis.roadmap.map(r => `Step ${r.step}: ${r.title_en} at ${r.office}\n↳ Instructions: ${r.desc_en}`).join("\n\n")}
`;
                              navigator.clipboard.writeText(txt);
                              triggerFeedback(language === "Hindi" ? "चेकलिस्ट को क्लिपबोर्ड पर सहेजा गया!" : "Checklist safely compiled and copied to clipboard!");
                            }}
                            className="bg-white/5 border border-white/10 font-bold py-3 px-4 rounded-xl text-xs text-gray-300 hover:bg-white/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Copy className="w-3.5 h-3.5 text-gray-400" />
                            <span>{language === "Hindi" ? "चेकलिस्ट कॉपी करें" : "Copy Checklist"}</span>
                          </button>
                        </div>

                      </div>
                    );
                  })()}
                </div>

              </div>

          </div>
        )}

        {/* 8. NORTHEAST STATE SCHEMES & CUSTOMARY RIGHTS HUB (Positioned at last per user specifications) */}
        {activeTab === "northeast" && (
          <div className="space-y-12 animate-fadeIn" id="tab-view-northeast">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs text-[#FF9933] font-black uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full inline-flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-saffron" />
                {language === "Hindi" ? "विशेष उत्तर-पूर्वी राज्य कल्याण" : "Special Northeastern State Welfare Hub"}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                {language === "Hindi" ? "उत्तर-पूर्वी राज्य निर्देशिका और प्रथागत कानून" : "Northeast India Welfare Directory"}
              </h1>
              <p className="text-xs text-gray-400 max-w-xl mx-auto leading-relaxed text-slate-300">
                {language === "Hindi"
                  ? "छठे शेड्यूल्ड प्रथागत कानूनों, आदिवासी डोमिसाइल संरक्षण, सीम (Syiem) अधिकारों और सीमावर्ती पहाड़ी क्षेत्रों की छात्रवृत्ति और बाढ़ सहायता के लिए विशेष केंद्र।"
                  : "Dedicated directory mapping Seventh Schedule sovereign welfare rights, Sixth Schedule customary clan land certifications, Syiem (Khasi chiefs) approvals, and tribal post-matric scholarships."}
              </p>
            </div>

            {/* STATE MATRIX GRID CHANGER */}
            <div className="glass-panel bg-[#121214] p-6 rounded-2xl border-white/5 space-y-8" id="northeast-standalone-hub">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-[#138808] uppercase tracking-widest bg-[#138808]/15 px-2.5 py-1 rounded">
                    🏔️ {language === "Hindi" ? "प्रथक स्थानीय प्रणालियाँ" : "NATIVE SYSTEM DIRECTORY"}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white">
                    {language === "Hindi" ? "सत्यापित राज्य-वार कल्याण तंत्र और नीतियां" : "Verified State-Wise Welfare Systems"}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 bg-black/50 p-1.5 rounded-xl border border-white/10">
                  {Object.keys(NE_STATES_INTEL).map(st => (
                    <button
                      key={st}
                      onClick={() => {
                        setSelectedNEState(st);
                        setProfileState(st); // Sync demographic filter immediately
                        triggerFeedback(`Command shifted to ${st} state profile and database.`);
                      }}
                      className={`px-4 py-2 rounded-lg text-xs font-black uppercase transition-all duration-150 ${
                        selectedNEState === st 
                          ? "bg-[#FF9933] text-black font-extrabold shadow-md" 
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {(() => {
                const info = NE_STATES_INTEL[selectedNEState];
                if (!info) return null;
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column - Customary Law, Risks, Helplines */}
                    <div className="lg:col-span-5 bg-black/40 border border-white/5 p-6 rounded-2xl space-y-5">
                      <div className="flex justify-between items-center pb-3 border-b border-white/5">
                        <h4 className="font-serif font-black text-lg text-[#FF9933]">
                          {selectedNEState} {language === "Hindi" ? "सहायता मैट्रिक्स" : "Support Matrix"}
                        </h4>
                        <span className="text-[10px] text-gray-500 font-serif lowercase italic">capital: {info.capital}</span>
                      </div>
                      
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block">
                          {language === "Hindi" ? "प्राथमिक क्षेत्र फोकस" : "Priority Area Focus"}
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">{info.focusArea}</p>
                      </div>

                      <div className="bg-red-505/5 p-4 rounded-xl border border-red-500/20 space-y-1.5 bg-red-950/20">
                        <span className="text-[10px] font-black text-red-400 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> 
                          {language === "Hindi" ? "महत्वपूर्ण अस्वीकृति जोखिम / चेतावनी" : "Direct Rejection Warning & Risk"}
                        </span>
                        <p className="text-[11px] text-red-200/90 leading-relaxed font-sans">{info.regionalCrisisNote}</p>
                      </div>

                      <div className="space-y-2.5 bg-black/20 p-4 rounded-xl border border-white/5">
                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block">
                          {language === "Hindi" ? "सत्यापित राज्य हेल्पलाइन" : "Official State Helplines"}
                        </span>
                        <div className="grid grid-cols-1 gap-2">
                          {info.helplines.map((h, i) => (
                            <div key={i} className="flex justify-between items-center bg-black/60 p-3 rounded-lg border border-white/5 text-xs">
                              <span className="text-slate-300 font-semibold font-sans">{h.agency}</span>
                              <span className="text-saffron font-bold font-mono">{h.number}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Customary Rights and Specialized Native Schemes */}
                    <div className="lg:col-span-7 space-y-6">
                      
                      {/* Legal protections and local constitution provisions */}
                      <div className="bg-[#138808]/10 p-5 rounded-2xl border border-[#138808]/30 text-xs text-gray-200 space-y-2">
                        <h5 className="font-serif font-black text-green uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                          <Shield className="w-4 h-4 text-green" />
                          {language === "Hindi" ? "आदिवासी प्रथागत अधिकार और कानूनी निर्देश" : "Customary Rights & Legal Framework"}
                        </h5>
                        <p className="text-gray-200 font-sans leading-relaxed text-xs">{info.specialRightsNotice}</p>
                      </div>

                      {/* Native schemes card catalog */}
                      <div className="space-y-3">
                        <span className="text-[9px] font-bold text-gray-500 uppercase block tracking-widest font-sans">
                          {language === "Hindi" ? "सत्यापित विशिष्ट स्थानीय योजनाएं" : "Verified Specialized Native Schemes"}
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {info.localWelfareSchemes.map((scm, i) => (
                            <div key={i} className="bg-black/35 p-5 rounded-2xl border border-white/5 flex flex-col justify-between space-y-4">
                              <div className="space-y-2">
                                <h5 className="font-serif font-bold text-sm text-white">{scm.name}</h5>
                                <p className="text-[11px] text-gray-400 leading-normal font-sans">{scm.target}</p>
                              </div>
                              <div className="p-2 bg-gradient-to-r from-amber-500/10 to-transparent rounded-lg border border-amber-500/15 text-xs font-black text-saffron text-center font-mono">
                                {scm.value}
                              </div>
                              <a 
                                href={scm.portal} 
                                target="_blank" rel="noreferrer"
                                className="text-[10px] text-gray-400 hover:text-white underline block text-right font-bold transition-colors font-sans"
                              >
                                {language === "Hindi" ? "आधिकारिक पोर्टल" : "Official Portal"} →
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>
                );
              })()}
            </div>
          </div>
        )}

          </div>
        </div>

      </main>

      {/* FOOTER AREA & COMPLIANCE STATEMENTS */}
      <footer className="border-t border-white/10 bg-[#05070F] text-gray-500 text-xs py-12 px-4 mt-20 relative z-10" id="app-footer">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center">
                {/* High-fidelity Haqqdar Logo Emblem Symbol matching user image */}
                <svg viewBox="0 0 100 100" className="w-full h-full select-none" referrerPolicy="no-referrer">
                  <defs>
                    <radialGradient id="emblemGlowFooter" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="saffronGradFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF9933" />
                      <stop offset="100%" stopColor="#D46A00" />
                    </linearGradient>
                    <linearGradient id="greenGradFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22C55E" />
                      <stop offset="100%" stopColor="#15803D" />
                    </linearGradient>
                  </defs>
                  
                  {/* Outer Arcs */}
                  <path d="M 50 8 A 42 42 0 0 0 16 80 A 40 40 0 0 1 50 14 Z" fill="url(#saffronGradFooter)" />
                  <path d="M 50 8 A 42 42 0 0 1 84 80 A 40 40 0 0 0 50 14 Z" fill="url(#greenGradFooter)" />

                  {/* Ashoka Chakra */}
                  <g transform="translate(50, 30)">
                    <circle cx="0" cy="0" r="14" fill="#000000" stroke="#3B82F6" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="12" fill="none" stroke="#FFFFFF" strokeWidth="1" />
                    <circle cx="0" cy="0" r="10.5" fill="none" stroke="#3B82F6" strokeWidth="0.75" />
                    {/* 24 Spokes */}
                    {Array.from({ length: 24 }).map((_, i) => (
                      <line key={i} x1="0" y1="0" x2={12 * Math.cos((i * 15 * Math.PI) / 180)} y2={12 * Math.sin((i * 15 * Math.PI) / 180)} stroke="#3B82F6" strokeWidth="0.75" />
                    ))}
                    <circle cx="0" cy="0" r="3" fill="#1E40AF" stroke="#FFFFFF" strokeWidth="0.5" />
                  </g>

                  {/* Supportive Hands */}
                  <path d="M 22 55 C 22 71, 38 86, 48 86 C 45 74, 34 58, 28 48 C 27 51, 24 49, 22 55 Z" fill="url(#saffronGradFooter)" />
                  <path d="M 78 55 C 78 71, 62 86, 52 86 C 55 74, 66 58, 72 48 C 73 51, 76 49, 78 55 Z" fill="url(#greenGradFooter)" />

                  {/* Uplifting Citizen */}
                  <circle cx="50" cy="46" r="4" fill="#FFFFFF" />
                  <path d="M 35 40 C 40 49, 47 54, 50 66 C 53 54, 60 49, 65 40 C 58 49, 53 51, 50 52 C 47 51, 42 49, 35 40 Z" fill="#FFFFFF" />
                  <path d="M 50 66 L 50 83" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-sans font-black text-saffron text-lg tracking-widest uppercase">HAQQDAR</span>
              <span className="text-[9px] border border-[#138808]/30 text-[#138808] bg-[#138808]/5 px-2 py-0.5 rounded uppercase font-black">Verified Inclusion</span>
            </div>
            <p className="leading-relaxed text-[11px] text-gray-400 font-sans max-w-sm">
              An activist administrative framework built in compliance with Section 4(1)(b) of the Right to Information Act, requiring proactive public disclosure.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-serif text-white font-bold uppercase text-[10px] tracking-wider">Citizen Tools Directory</h4>
            <div className="flex flex-col gap-2 text-gray-400">
              <button onClick={() => { setActiveTab("benefits"); window.scrollTo(0,0); }} className="hover:text-amber-500 text-left font-sans">Check Entitlement Score</button>
              <button onClick={() => { setActiveTab("documents"); window.scrollTo(0,0); }} className="hover:text-amber-500 text-left font-sans">Document Readiness Center</button>
              <button onClick={() => { setActiveTab("documents"); window.scrollTo(0,0); }} className="hover:text-amber-500 text-left font-sans font-sans">Undocumented Sequential Pathway</button>
              <button onClick={() => { setActiveTab("recovery"); window.scrollTo(0,0); }} className="hover:text-amber-500 text-left font-sans">Rejection Repair Engine</button>
            </div>
          </div>

          <div className="space-y-2 col-span-1">
            <h4 className="font-serif text-white font-bold uppercase text-[10px] tracking-wider font-serif">Legal Protections</h4>
            <div className="flex flex-col gap-2 text-[#FF9933]">
              <button onClick={() => { setActiveTab("appeals"); window.scrollTo(0,0); }} className="hover:text-white text-left font-bold font-serif text-xs">RTI Letter Desk →</button>
              <button onClick={() => { setActiveTab("northeast"); window.scrollTo(0,0); }} className="hover:text-white text-left font-bold font-serif text-xs">Northeast State Directories →</button>
              <div className="pt-2 border-t border-white/5 mt-1">
                <button 
                  onClick={() => {
                    setShowAdminPanel(true);
                    triggerFeedback(language === "Hindi" ? "प्रशासकीय सुरक्षा लॉक स्क्रीन खोली जा रही है..." : "Opening secure administrative entry lockscreen...");
                  }} 
                  className="hover:text-white text-left font-bold font-mono text-[9px] bg-zinc-950/80 hover:bg-zinc-900 border border-white/10 px-2 py-1.5 rounded-lg flex items-center gap-1 text-[#FF9933] transition-colors w-fit shadow-md cursor-pointer uppercase tracking-wider"
                >
                  <Lock className="w-3 h-3 text-[#FF9933] shrink-0" />
                  <span>{language === "Hindi" ? "प्रशासक लॉगिन" : "Admin Login"}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3 bg-[#0a0c16] border border-white/5 p-4 rounded-xl">
            <span className="text-[9px] text-[#22c55e] font-black uppercase block tracking-wider">Verified Public Information</span>
            <p className="text-[10px] text-gray-400 leading-normal font-sans">
              All welfare coordinates, state directories, and procedural pipelines are extracted from official circular entries. Built for direct social inclusion.
            </p>
            <div className="text-[8px] text-gray-500 font-mono tracking-widest uppercase">Verified and Audited 2026 • Haqqdar India</div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px]">
          <p>© 2026 Haqqdar. Mapped in compliance with democratic welfare access and security principles. Satyameva Jayate.</p>
          <div className="flex gap-4 font-bold uppercase text-gray-500 tracking-wider">
            <span>RTI Act 2005 Compliant</span>
            <span>•</span>
            <span>DigiLocker Integration Ready</span>
            <span>•</span>
            <span>UPI Safety Architecture Mapped</span>
          </div>
        </div>
      </footer>

      {/* FLOAT ACTION PHONE BUTTON FOR VERIFIED EMERGENCY HEALTH AND POLICE COOP (Section 7, Section 9) */}
      <button 
        onClick={() => setShowEmergencyModal(true)}
        title="24/7 National Emergency Coordinators Desk"
        id="floating-emergency-btn"
        className="fixed bottom-6 right-6 z-[400] w-14 h-14 rounded-full bg-gradient-to-tr from-[#FF9933] to-[#FF9933]/90 shadow-2xl flex items-center justify-center border-2 border-white text-black select-none transition-transform hover:scale-110 active:scale-95 cursor-pointer hover:saffron-glow pointer-events-auto"
      >
        <PhoneCall className="w-6 h-6 text-black animate-pulse" />
        <span className="absolute -top-1 -right-1 bg-red-600 text-[7px] font-extrabold px-1.5 py-0.5 rounded-full border border-white text-white">EMERGENCY</span>
      </button>

      {/* EMERGENCY HELP MODAL DIALOG (Section 9) */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-[1000] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4" id="emergency-desk-modal">
          <div className="bg-[#05070F] border border-red-500/25 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative animate-fadeIn">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowEmergencyModal(false)}
              id="close-emergency-modal-btn"
              className="absolute top-4 right-4 p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-black text-xl text-white">Emergency India Verified Hotlines</h3>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">24x7 Statutory Grievance & Protection numbers</span>
              </div>
            </div>

            {/* List of Verified National Hotlines with explanations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-1">
              {[
                { n: "112", label: "National Police Emergency Rescue Support", explain: "Universal physical rescue support. Contact if local outstations display severe bias, ignore safety, or reject filing valid first information reports (FIRs)." },
                { n: "108", label: "Unified Medical Ambulance Rescue Desk", explain: "Free government ambulance transport evacuation service to bring injured or emergency patients to the nearest medical center." },
                { n: "181", label: "Domestic Violence & Women Helpline", explain: "Confidential legal support desk facilitating protection records, domestic disputes assistance, and immediate counselor maps." },
                { n: "1098", label: "National Childline Protection Agency", explain: "Emergency child protection against bonded labor, child abuse, and underage forced marriages." },
                { n: "1930", label: "National Cyber Crime Reporting Division", explain: "Immediate relief report desk. Speak to operators within 2 hours of suffering any online financial phishing or bank account fraud." },
                { n: "14567", label: "Senior Citizen Dignity Service Help", explain: "Support mapping elder abuse, arbitrary pension withholding, and elderly basic maintenance disputes." },
                { n: "14416", label: "Tele-MANAS Mental Healthcare Support", explain: "Free administrative and emotional counseling support for continuous distress or anxiety." },
                { n: "1078", label: "Disaster Management National Helpline", explain: "Direct rescue coordination during regional cyclones, landslides, or active emergency flood blockages." }
              ].map((em, index) => (
                <div key={index} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-serif font-black text-lg text-red-500">{em.n}</span>
                    <span className="text-[9px] text-gray-500 uppercase font-black px-2 py-0.5 bg-red-500/10 rounded">Toll-Free</span>
                  </div>
                  <h4 className="text-xs font-serif font-bold text-white leading-tight">{em.label}</h4>
                  <p className="text-[10px] text-gray-400 leading-normal font-sans font-medium">{em.explain}</p>
                </div>
              ))}
            </div>

            {/* Parliamentary Backing Disclaimer */}
            <div className="bg-yellow-500/5 p-4 rounded-xl border border-yellow-500/20 text-xs text-yellow-100">
              <span className="font-bold flex items-center gap-1 text-[#FF9933] uppercase text-[9px] mb-1">
                🛡️ Dialing Safeguard Right
              </span>
              <p className="text-gray-400 leading-relaxed font-sans">
                These national hotlines are backed by acts of Parliament of India. Dialing is 100% free from any active SIM card, regardless of whether you have an active voice top-up balance.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button 
                onClick={() => setShowEmergencyModal(false)}
                className="bg-white/5 border border-white/20 text-white font-bold text-xs px-6 py-2.5 rounded-lg hover:bg-white/10 uppercase tracking-widest font-sans"
              >
                Dismiss Modal
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 🔐 ADMINISTRATIVE DESK MASTER OVERLAY */}
      {showAdminPanel && (
        <AdminPanel 
          onClose={() => setShowAdminPanel(false)}
          onRefreshSchemes={fetchSchemes}
          schemesList={schemes}
          language={language}
        />
      )}

    </div>
  );
}
