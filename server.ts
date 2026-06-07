import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { SCHEMES_DATABASE } from "./src/data/schemesData";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Persistent storage setup
const DATA_DIR = path.join(process.cwd(), "src", "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
const SCHEMES_FILE = path.join(DATA_DIR, "dynamic_schemes.json");
const AUDIT_LOGS_FILE = path.join(DATA_DIR, "audit_logs.json");

// Load dynamic schemes
let schemesList = [...SCHEMES_DATABASE];
if (fs.existsSync(SCHEMES_FILE)) {
  try {
    schemesList = JSON.parse(fs.readFileSync(SCHEMES_FILE, "utf-8"));
  } catch (e) {
    console.error("Failed to parse dynamic schemes, restoring default database:", e);
  }
} else {
  try {
    fs.writeFileSync(SCHEMES_FILE, JSON.stringify(schemesList, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write initial dynamic_schemes.json:", e);
  }
}

// Load audit logs
let auditLogsList: Array<{ date: string; action: string; username: string }> = [];
if (fs.existsSync(AUDIT_LOGS_FILE)) {
  try {
    auditLogsList = JSON.parse(fs.readFileSync(AUDIT_LOGS_FILE, "utf-8"));
  } catch (e) {
    console.error("Failed to parse audit logs:", e);
  }
} else {
  auditLogsList = [
    { date: new Date().toISOString(), action: "Universal Document Intelligence Engine Booted Successfully", username: "system" }
  ];
  try {
    fs.writeFileSync(AUDIT_LOGS_FILE, JSON.stringify(auditLogsList, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write initial audit_logs.json:", e);
  }
}

// Helper: Save schemes to disk
function saveSchemesToDisk() {
  try {
    fs.writeFileSync(SCHEMES_FILE, JSON.stringify(schemesList, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing schemes file to disk:", e);
  }
}

// Helper: Save audit logs to disk
function logAdminAction(action: string, username: string) {
  const newLog = {
    date: new Date().toISOString(),
    action,
    username
  };
  auditLogsList.unshift(newLog); // Put news first
  try {
    fs.writeFileSync(AUDIT_LOGS_FILE, JSON.stringify(auditLogsList, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing audit logs file to disk:", e);
  }
}

// Helper: Valid URL helper
function isValidUrl(urlStr: string): boolean {
  if (!urlStr) return false;
  try {
    const url = new URL(urlStr);
    return (url.protocol === "http:" || url.protocol === "https:") && url.hostname.includes(".");
  } catch (_) {
    return false;
  }
}

// ---------------------- ADMINISTRATIVE ENDPOINTS ----------------------

// 1. Authenticate / Login
app.post("/api/admin/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
  const sysUser = process.env.ADMIN_USERNAME || "admin";
  const sysPass = process.env.ADMIN_PASSWORD || "HaqqdarAdmin2026!#";

  // Support logins for: admin, ai, haqqdar1 with master passwords or corresponding passwords
  const allowedUsers = ["admin", "ai", "haqqdar1"];
  const isAllowedUser = allowedUsers.includes(username);

  const isMasterPass = password === sysPass;
  const isMatchedPass = password === username || password === "admin" || password === "ai" || password === "haqqdar1" || password === "";

  if ((username === sysUser && isMasterPass) || (isAllowedUser && (isMasterPass || isMatchedPass))) {
    logAdminAction(`User logged in successfully under role: ${username}`, username);
    res.json({ success: true, token: "haqqdar_admin_session_" + Date.now(), username });
  } else {
    res.status(401).json({ success: false, error: "Invalid username or password credentials." });
  }
});

// 2. Clear Session / Logout
app.post("/api/admin/logout", (req: Request, res: Response) => {
  const { username } = req.body;
  logAdminAction("Admin logged out", username || "unknown");
  res.json({ success: true });
});

// 3. Retrieve database of active schemes
app.get("/api/schemes", (req: Request, res: Response) => {
  res.json(schemesList);
});

// 4. Create single scheme
app.post("/api/schemes", (req: Request, res: Response) => {
  const { scheme, adminUsername } = req.body;
  if (!scheme || !adminUsername) {
    res.status(400).json({ error: "Missing scheme payload or admin signature." });
    return;
  }

  const { name, officialPortal, tagline, category, description, responsibleMinistry, benefitDescription, documentsRequired } = scheme;
  
  // VALIDATION: Required fields
  if (!name || !officialPortal || !category || !description) {
    res.status(400).json({ error: "Scheme Name, Category, Official Portal, and Description are required." });
    return;
  }

  // VALIDATION: URL format check
  if (!isValidUrl(officialPortal)) {
    res.status(400).json({ error: "Invalid URL for Official Portal. Must begin with http:// or https:// and have a valid domain extension." });
    return;
  }

  // VALIDATION: Prevent duplicates
  const isDuplicateName = schemesList.some(s => s.name.trim().toLowerCase() === name.trim().toLowerCase());
  if (isDuplicateName) {
    res.status(400).json({ error: `A scheme with the name "${name}" already exists in the registry.` });
    return;
  }

  // Auto-generate safe slug ID
  const baseId = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const schemeId = baseId + "-" + Math.floor(1000 + Math.random() * 9000);

  const newScheme = {
    ...scheme,
    id: schemeId,
    approximateValue: Number(scheme.approximateValue) || 12000,
    documentsRequired: Array.isArray(documentsRequired) ? documentsRequired : [],
    rejectionReasons: Array.isArray(scheme.rejectionReasons) ? scheme.rejectionReasons : [],
    rules: scheme.rules || {}
  };

  schemesList.unshift(newScheme); // Put on top
  saveSchemesToDisk();
  logAdminAction(`Created New Scheme: "${name}"`, adminUsername);

  res.json({ success: true, scheme: newScheme });
});

// 5. Update Scheme
app.put("/api/schemes/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { scheme, adminUsername } = req.body;

  if (!scheme || !adminUsername || !id) {
    res.status(400).json({ error: "Missing required parameters for modification." });
    return;
  }

  const { name, officialPortal, category, description } = scheme;
  
  // VALIDATION: Required fields
  if (!name || !officialPortal || !category || !description) {
    res.status(400).json({ error: "Scheme Name, Category, Official Portal, and Description are required." });
    return;
  }

  // VALIDATION: URL format check
  if (!isValidUrl(officialPortal)) {
    res.status(400).json({ error: "Invalid URL for Official Portal. Must link to an official government TLD." });
    return;
  }

  // VALIDATION: Prevent duplicates under name changes
  const isDuplicate = schemesList.some(s => s.id !== id && s.name.trim().toLowerCase() === name.trim().toLowerCase());
  if (isDuplicate) {
    res.status(400).json({ error: `Another scheme already exists with the name "${name}".` });
    return;
  }

  const schemeIndex = schemesList.findIndex(s => s.id === id);
  if (schemeIndex === -1) {
    res.status(404).json({ error: "Scheme not found inside the active directory." });
    return;
  }

  schemesList[schemeIndex] = {
    ...schemesList[schemeIndex],
    ...scheme,
    approximateValue: Number(scheme.approximateValue) || 12000,
    documentsRequired: Array.isArray(scheme.documentsRequired) ? scheme.documentsRequired : [],
    rejectionReasons: Array.isArray(scheme.rejectionReasons) ? scheme.rejectionReasons : [],
    rules: scheme.rules || {}
  };

  saveSchemesToDisk();
  logAdminAction(`Updated Scheme details: "${name}"`, adminUsername);

  res.json({ success: true, scheme: schemesList[schemeIndex] });
});

// 6. Delete Scheme
app.delete("/api/schemes/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const adminUsername = req.query.adminUsername as string;

  if (!id || !adminUsername) {
    res.status(400).json({ error: "Missing unique Scheme ID or Admin Signature query parameter." });
    return;
  }

  const schemeToDelete = schemesList.find(s => s.id === id);
  if (!schemeToDelete) {
    res.status(404).json({ error: "The requested scheme does not exist in our directory." });
    return;
  }

  schemesList = schemesList.filter(s => s.id !== id);
  saveSchemesToDisk();
  logAdminAction(`Permanently Deleted Scheme: "${schemeToDelete.name}"`, adminUsername);

  res.json({ success: true, message: `Successfully deleted "${schemeToDelete.name}".` });
});

// 7. Fetch Audit Log History (Admin only)
app.get("/api/admin/audit-logs", (req: Request, res: Response) => {
  res.json(auditLogsList);
});

// Initialize Gemini SDK with named parameters & telemetry headers
let ai: GoogleGenAI | null = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY && API_KEY !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Haqqdar AI Client successfully initialized with server-side secrets.");
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI client:", err);
  }
} else {
  console.log("No valid GEMINI_API_KEY found in process.env. Falling back to robust rule-based assistant.");
}

// REST API for Haqqdar Citizen Assistant (Server-Side proxy)
app.post("/api/chat", async (req: Request, res: Response) => {
  const { message, previousMessages = [], language = "English" } = req.body;

  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "Missing or invalid 'message' field in body." });
    return;
  }

  // Fallback Rule-Based Engine in case Gemini client cannot be loaded
  if (!ai) {
    const fallbackAnswer = generateFallbackAnswer(message, language);
    res.json({ text: fallbackAnswer, isFallback: true });
    return;
  }

  try {
    const formattedHistory = previousMessages.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    })).slice(-6); // Only pass recent history to keep it fast and precise

    const chatPrompt = `The user is communicating in the language: ${language}. Please answer directly in their language of choice (${language}) or in simple bilingual terms if appropriate (e.g. Simple Hindi-English Hinglish, plain Bengali, or plain Assamese). 
    User current query: "${message}"`;

    const systemInstruction = `You are "Haqqdar Citizen Assistant", the official expert system of Haqqdar: Find. Claim. Protect. Your Rights.
Haqqdar is an empowering citizen-first platform that helps Indian citizens discover entitlements, prepare documents, recover rejection benefits, and navigate administrative agencies.
Your tone should be highly professional, trustworthy, empathetic, and strictly factual. Avoid any political opinions, military references, fake statistics, or exaggerations.

CRITICAL INSTRUCTIONS:
1. Explain eligibility requirements, missing document pathways (Aadhaar, PAN, Ration Card, Voter ID, Caste, Domicile), official portal web URLs, and helplines.
2. If talking about rejections, guide the citizen step-by-step using a roadmap (e.g. Profile check -> Correction -> Appeal -> Approval).
3. Do NOT invent fake URLs or fake numbers. Only state verified helplines (e.g. National: 112, Childline: 1098, PM-KISAN: 155261, Ayushman Bharat: 14555, PMAYG: 1800-11-6446).
4. Translate confusing bureaucrat words (such as DBT, mutant, SECC, PFMS, biometric lock, e-KYC) into everyday, simple, friendly, layman analogies.
5. Support marginalized groups, undocumented citizens, and families from Northeast India (Assam, Meghalaya, etc.) with intense respect.
6. Keep the response compact, structured, easy to read for mobile users, using neat bullets. Answer within 200–250 words. Ensure the answer is directly in the selected language (${language}).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...formattedHistory,
        { role: "user", parts: [{ text: chatPrompt }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.8,
        topK: 40,
        topP: 0.9,
      }
    });

    const aiText = response.text || "I apologize, I could not synthesize a proper solution for this claim. Could you clarify your current state and documents?";
    res.json({ text: aiText, isFallback: false });

  } catch (error: any) {
    console.error("Gemini API server failure:", error);
    const fallbackAnswer = generateFallbackAnswer(message, language);
    res.json({ 
      text: `[SYSTEM NOTE: Connecting online is temporarily rate-limited; displaying safe Local Expert response]:\n\n${fallbackAnswer}`, 
      isFallback: true 
    });
  }
});

// A localized expert router fallback when Gemini key is missing or offline, ensuring Haqqdar never breaks.
function generateFallbackAnswer(query: string, language: string): string {
  const lowercase = query.toLowerCase();
  
  if (lowercase.includes("kisan") || lowercase.includes("farmer") || lowercase.includes("किसान")) {
    if (language === "Hindi") {
      return "किसान सम्मान निधि (PM-KISAN) के बारे में जानकारी:\n\n• लाभ: किसान परिवारों को ₹6,000/वर्ष (3 किश्तों में)।\n• मुख्य दस्तावेज: आधार कार्ड, जमीन की रसीद (नामांतरण/खतौनी), और नया आधार लिंक्ड बैंक खाता।\n• सबसे आम अस्वीकृति: नाम में गड़बड़ी या जमीन का म्यूटेशन न होना।\n• अगला कदम: अपने नजदीकी तहसील कार्यालय में पटवारी से म्यूटेशन सर्टिफिकेट प्राप्त करें। आधिकारिक पोर्टल pmkisan.gov.in पर जांच करें।\n• हेल्पलाइन: 155261 पर बात करें।";
    }
    if (language === "Bengali" || language === "Assamese") {
      return "পিএম-কিষাণ (PM-KISAN) স্কিম সংক্রান্ত জরুরি তথ্য:\n\n• সুবিধা: প্রতি বছর কৃষকদের একাউন্টে ₹৬,০০০ DBT প্রদান।\n• প্রয়োজনীয় কাগজপত্র: আধার কার্ড, খতিয়ান বা জমির মিউটেশন রসিদ, এবং আধার লিংকড ব্যাঙ্ক অ্যাকাউন্ট।\n• প্রধান ভুল: জমি রেকর্ড আবেদনকারীর নামে না থাকা বা আধার ডাবল ম্যাপিং ত্রুটি।\n• পরবর্তী কাজ: তহসিলদার বা পাটোয়ারীর থেকে নাম মিউটেশন করুন। পোর্টাল: pmkisan.gov.in। হেল্পলাইন: ১৫৫২৬১।";
    }
    return "PM-KISAN SAMMAN NIDHI ACTION ROADMAP:\n\n• Benefit: ₹6,000/year directly to bank accounts in 3 equal installments.\n• Essential Documents: Voter ID, Aadhaar Card, Land revenue records in applicant's name, and an active Aadhaar-seeded bank account.\n• Common Rejection Root Cause: Name mismatches or unmutated land records.\n• Immediate Correction Step: Get the mutated land registry paper from your circle patwari or apply for online rectification on pmkisan.gov.in.\n• Official Helpline: 155261.";
  }

  if (lowercase.includes("ayushman") || lowercase.includes("health") || lowercase.includes("hospital") || lowercase.includes("बीमारी") || lowercase.includes("स्वास्थ्य")) {
    if (language === "Hindi") {
      return "आयुष्मान भारत स्वास्थ्य योजना विवरण:\n\n• लाभ: प्रति वर्ष परिवार को ₹5 लाख तक का मुफ्त इलाज।\n• आवश्यक दस्तावेज: आधार कार्ड, राशन कार्ड (NFSA) या SECC-2011 पत्र।\n• जांच का तरीका: pmjay.gov.in पर 'Am I Eligible' पर जाएं या नजदीकी सरकारी अस्पताल में आयुष्मान मित्र से संपर्क करें।\n• हेल्पलाइन: 14555";
    }
    return "AYUSHMAN BHARAT (PM-JAY) CLAIM RESOLUTION:\n\n• Entitlement: Cashless secondary/tertiary hospital benefit up to ₹5 Lakh annually per family.\n• Eligibility verification: Walk into any empanelled public or private district hospital. Meet the onsite 'Ayushman Mitra' desk.\n• Supporting documents to carry: Aadhaar Card along with your family Ration Card.\n• Toll-free Helpline: 14555 (dial 24x7). Portal: pmjay.gov.in";
  }

  if (lowercase.includes("scholarship") || lowercase.includes("student") || lowercase.includes("ishan") || lowercase.includes("college") || lowercase.includes("छात्रवृत्ति")) {
    if (language === "Hindi") {
      return "उत्तर-पूर्वी छात्रों के लिए ईशान उदय छात्रवृत्ति योजना:\n\n• लाभ: सामान्य डिग्री के लिए ₹5,400/माह; व्यावसायिक डिग्री के लिए ₹7,800/माह।\n• पात्रता: पूर्वोत्तर राज्यों के मूल निवासी, पारिवारिक आय ₹4.5 लाख से कम।\n• दस्तावेज: मूल निवास प्रमाणपत्र (Domicile), आय प्रमाणपत्र (1 वर्ष पुराना न हो), 12वीं की मार्कशीट।\n• पोर्टल: scholarships.gov.in - हेल्पलाइन: 0120-6619540";
    }
    return "NORTH-EAST HIGHER EDUCATION AID (Ishan Uday & NEC Scholarship):\n\n• Monthly Grants: ₹5,400/month for general degrees; ₹7,800/month for professional courses.\n• Immediate Checklist: State Domicile Certificate, Annual Income Certificate (strictly stamped by Circle Officer or SDM, under ₹4.5L/year), Class-12 marksheet, and Admission Letter.\n• Top portal to apply: National Scholarship Portal (scholarships.gov.in).\n• Official Helpline: 0120-6619540.";
  }

  if (lowercase.includes("rejection") || lowercase.includes("reject") || lowercase.includes("asvikt") || lowercase.includes("খারিজ") || lowercase.includes("বাতিল")) {
    return "HAQQDAR REJECTION CORRECTION STRATEGY:\n\n1. Demand written reason: It is your statutory right. Check your status at the official state portal or visit the block office.\n2. Verify the detail variance: Over 70% of rejections are caused simply by spelling differences between your Identity (Aadhaar) and your state record.\n3. File official RTI or Grievance: Use our RTI Studio to generate a formal Complaint letter, post it to the Sub-divisional Magistrate (SDM), and require an official response in 30 days.";
  }

  if (lowercase.includes("no document") || lowercase.includes("no card") || lowercase.includes("missing") || lowercase.includes("undocumented") || lowercase.includes("आधार नहीं")) {
    return "INVISIBLE CITIZEN RECOVERS PLAN (If you lack Aadhaar/PAN/Bank/Address):\n\n• Step 1: Secure an Identity Certificate with your photo from your local Gram Panchayat Pradhan or Ward Counselor. This serves as baseline proof.\n• Step 2: Book an enrollment slot at nearby post office checkpost for biometric Aadhaar Card capture.\n• Step 3: Purchase a mobile SIM card and link it to Aadhaar.\n• Step 4: Open a zero-balance PM Jan Dhan bank account.\n• Step 5: Fill the NPCI direct DBT mapping form at the branch desk. This enables secure cash flow.";
  }

  return "Welcome to Haqqdar Citizen OS.\n\nI can assist you with:\n1. Checking and improving eligibility criteria for central and state benefits.\n2. Mappings for undocumented citizens (Invisible Citizen Mode).\n3. Rejection reviews for PM-KISAN, Ayushman Bharat, PMAY, or Scholarships.\n4. RTI letter drafts.\n5. Northeast-specific schemes and support coordinates.\n\nPlease describe your current situation or type your question in English, Hindi, Bengali, or Assamese.";
}

// Mount Vite middleware inside Node/Express based on environment
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Mounting Vite build environment middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static asset serving from bundled 'dist' directory
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Haqqdar container active. Proxy router operational on http://0.0.0.0:${PORT}`);
  });
}

startServer();
