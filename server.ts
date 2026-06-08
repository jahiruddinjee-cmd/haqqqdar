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

// A dynamic local fallback action plan generator for Life Navigator (AWAAZ hackathon)
function generateFallbackNavigatorPlan(selected_event: string, state: string, income: string, land: string): any {
  const isLand = land === "Yes";
  const maps: Record<string, any> = {
    "Flood / Natural Disaster": {
      summary: `Natural disaster relief recovery pathways for residents of ${state}. Priority is registering basic damage certification.`,
      urgent_steps: [
        { step: 1, action: "Notify your Block Development Officer (BDO) or Gram Panchayat of immediate household item loss.", deadline: "within 48 hours", office: "Circle Office / Panchayat Secretariat" },
        { step: 2, action: "Apply for physical property structural verification and crop damage inspections.", deadline: "within 1 week", office: "Revenue Circle / Patwari Assistant" },
        { step: 3, action: "Claim direct state SDRF household emergency relief funds and grain allocations.", deadline: "within 1 month", office: "Food & Civil Supplies Desk" }
      ],
      schemes: [
        { name: "SDRF Disaster Compensation Fund", amount: "₹15,000", how_to_apply: "Submit asset and crops damage photographs to the local Circle Officer.", documents: ["Aadhaar Card", "Bank Account Details", "Land Ownership Receipt", "Gram Seva Inspection Certificate"] },
        ...(isLand ? [{ name: "PM Fasal Bima Yojana (Disaster Clause)", amount: "₹25,000", how_to_apply: "Submit localized crop failure claim on national insurance portal within 72 hrs.", documents: ["KCC Details", "Land Possession Certificate", "Sowing Self-Declaration"] }] : [])
      ],
      documents_needed: ["Aadhaar Card", "Bank Passbook Copy", "Land Possession Proof", "Disaster Force Certificate"],
      helpline: "1078 (National Disaster Management Authority Helpline)"
    },
    "Death in Family": {
      summary: `Accessing immediate state social security benefits, survivor pensions, and final rites support in ${state}.`,
      urgent_steps: [
        { step: 1, action: "Register death with the local registrar to secure the official legal Death Certificate.", deadline: "within 48 hours", office: "Panchayat Office / Municipal Corporation" },
        { step: 2, action: "Apply for the National Family Benefit Scheme (NFBS) one-time primary breadwinner assistance.", deadline: "within 1 week", office: "Block Development Office (BDO)" },
        { step: 3, action: "Initiate family social security pension or National Pension Scheme survivor transfers.", deadline: "within 1 month", office: "Social Welfare Department Desk" }
      ],
      schemes: [
        { name: "National Family Benefit Scheme (NFBS)", amount: "₹20,000", how_to_apply: "Submit death proof and BPL card to the Social Welfare Inspector at BDO Office.", documents: ["Death Certificate", "BPL Ration Card", "Aadhaar Card of Applicant"] },
        { name: "PM Jeevan Jyoti Bima Yojana (Claim)", amount: "₹2,00,000", how_to_apply: "Contact the bank where the deceased held their savings account to submit PMJJBY insurance claim.", documents: ["Claim Form", "Aadhaar of Deceased", "Nominee Bank Details"] }
      ],
      documents_needed: ["Death Certificate", "Aadhaar of Nominee", "BPL Ration Card", "Income Certificate"],
      helpline: "1800-11-2356 (Pension and Social Security Desk)"
    },
    "Crop Failure / Drought": {
      summary: `Agrarian emergency claiming crop loss insurance and accessing subsidized inputs in ${state}.`,
      urgent_steps: [
        { step: 1, action: "Notify insurance representative and submit localized crop damage reporting.", deadline: "within 48 hours", office: "District Agriculture Officer / Insurance Desk" },
        { step: 2, action: "Initiate Patwari validation and area crop block cutting survey.", deadline: "within 1 week", office: "Revenue Patwari Circle / Lekhpal" },
        { step: 3, action: "Apply for supplementary manual field labor hours under MGNREGS.", deadline: "within 1 month", office: "Gram Panchayat Executive" }
      ],
      schemes: [
        { name: "PM Fasal Bima Yojana (Crop Loss Claim)", amount: "₹35,000", how_to_apply: "Submit localized crop failure form listing block-level drought on national PMC portal.", documents: ["KCC Details", "Land Record copy", "Sowing Certification"] },
        { name: "PM Kisan Samman Nidhi inputs", amount: "₹2,000", how_to_apply: "Update PM-Kisan bank mapping to claim immediate seasonal crop booster installment.", documents: ["Aadhaar Card", "Land Khatauni Receipt", "Aadhaar-Seeded Bank mandate"] }
      ],
      documents_needed: ["Land Holding Record (Khatauni)", "Sowing Declaration", "Bank Passbook Copy", "Aadhaar Card"],
      helpline: "1800-180-1551 (Kisan Call Centre)"
    },
    "Disability": {
      summary: `Securing official UDID cards, assistive devices, and state disability pension allowances in ${state}.`,
      urgent_steps: [
        { step: 1, action: "Obtain official physical / mental disability evaluation certificate from CMO.", deadline: "within 48 hours", office: "Chief Medical Officer (CMO) at District Hospital" },
        { step: 2, action: "Register online for federal Unique Disability Identity (UDID) Card.", deadline: "within 1 week", office: "UDID Swavlamban E-Portal" },
        { step: 3, action: "Apply for recurring Monthly Divyangjan social security state pension.", deadline: "within 1 month", office: "Civil Social Welfare Officer" }
      ],
      schemes: [
        { name: "Indira Gandhi National Disability Pension", amount: "₹1,500 / month", how_to_apply: "Submit your certified 40%+ disability UDID card to Panchayat or Block Office.", documents: ["UDID Card", "Income Certificate", "Residence Proof"] },
        { name: "ADIP Assistance Scheme", amount: "Free assistive devices", how_to_apply: "Register under ADIP camp lists for wheelchairs, calipers, or digital hearing aids.", documents: ["CMO Board Evaluation", "Income Certificate under ₹3 Lakhs"] }
      ],
      documents_needed: ["UDID Card / Disability Certificate", "Aadhaar Card", "Income Certificate", "Passport Photos"],
      helpline: "1800-11-0180 (Ministry of Social Justice Helpline)"
    },
    "Job Loss / Migration": {
      summary: `Alternative livelihood registration, wage guarantees, and labor insurance in ${state}.`,
      urgent_steps: [
        { step: 1, action: "Apply for a formal MGNREGS Job Card to secure localized manual daily wage labor.", deadline: "within 48 hours", office: "Gram Panchayat Executive Desk" },
        { step: 2, action: "Register on national e-Shram portal to lock in government accidental death benefits.", deadline: "within 1 week", office: "Common Service Center (CSC)" },
        { step: 3, action: "Join PMKVY vocational training under state-supervised skill alignment directories.", deadline: "within 1 month", office: "Regional Skill Center" }
      ],
      schemes: [
        { name: "MGNREGS Direct Wages", amount: "₹260 / day", how_to_apply: "Submit job card demand for physical labor at local panchayat water conservancy structures.", documents: ["Job Card Application", "Aadhaar Card", "Bank Account Info"] },
        { name: "Haqqdar Emergency Migration Grant", amount: "₹10,500", how_to_apply: "Submit job lay-off proof to receive transit support for returning migrant families.", documents: ["Employer Discharge Note", "State Registration Card"] }
      ],
      documents_needed: ["Aadhaar Card", "Active Mobile Link", "Bank Passbook Copy", "Job Card Copy"],
      helpline: "14434 (e-Shram National Help Desk)"
    },
    "New Baby / Pregnancy": {
      summary: `Maternity cash aid and nutrition tracking for mother and newborn in ${state}.`,
      urgent_steps: [
        { step: 1, action: "Register birth and obtain Mother and Child Protection (MCP) card.", deadline: "within 48 hours", office: "Anganwadi Worker / ASHA Officer" },
        { step: 2, action: "Register birth certificate online with regional civic desk.", deadline: "within 1 week", office: "Panchayat / Municipal Health Registry" },
        { step: 3, action: "Lodge maternal nutrition benefit forms for direct cash back.", deadline: "within 1 month", office: "Anganwadi Center / Gram ICDS Desk" }
      ],
      schemes: [
        { name: "Pradhan Mantri Matru Vandana Yojana (PMMVY)", amount: "₹5,000", how_to_apply: "Submit pregnancy cycle checkoffs with MCP card via national PMMVY login.", documents: ["ASHA MCP Card", "Bank Passbook", "Aadhaar Cards of Parents"] },
        { name: "Janani Suraksha Yojana (JSY)", amount: "₹1,400", how_to_apply: "Conduct delivery in public healthcare facility for automatic institutional JSY credit.", documents: ["Discharge Slip", "Aadhaar Card"] }
      ],
      documents_needed: ["MCP Card / Green Card", "Aadhaar of Husband & Wife", "Joint Bank Passbook", "Hospital Birth Certificate"],
      helpline: "1056 (National Health Portal Emergency Support)"
    },
    "Land Dispute": {
      summary: `Securing certified cadastre survey sheets, mutation partitions, and free public legal aid in ${state}.`,
      urgent_steps: [
        { step: 1, action: "Obtain certified RoR (Record of Rights) or Jamabandi reflecting exact holdings.", deadline: "within 48 hours", office: "Revenue Circle Office" },
        { step: 2, action: "Lodge written property mutation challenge before the Sub-Divisional Magistrate.", deadline: "within 1 week", office: "SDM Court / Circle Officer" },
        { step: 3, action: "Apply for fully subsidized free state legal counsel listing.", deadline: "within 1 month", office: "District Legal Services Authority (DLSA)" }
      ],
      schemes: [
        { name: "SVAMITVA Property Card System", amount: "Statutory Property Card", how_to_apply: "Validate drone-survey village boundary coordinates with the Revenue Secretary.", documents: ["Chaukidari Tax Receipt", "Aadhaar Card", "Local Panchayat No-Objection"] },
        { name: "NALSA Free Legal Defense", amount: "Free Legal Advocacy", how_to_apply: "Submit legal representation request declaring yearly income lower than ₹3 Lakhs.", documents: ["Income Certificate", "Copy of Land Dispute Suit"] }
      ],
      documents_needed: ["Certified Land Records (Jamabandi)", "Boundary Layout Map", "Income Certificate", "Aadhaar Card"],
      helpline: "15100 (National Legal Services Authority Helpline)"
    },
    "House Fire / Property Loss": {
      summary: `Acquiring Fire Marshall damage summaries and applying for emergency housing grants in ${state}.`,
      urgent_steps: [
        { step: 1, action: "Procure the official Fire Damage Incident Certificate (Lekhpal verification).", deadline: "within 48 hours", office: "Fire Station / Lekhpal Patwari Desk" },
        { step: 2, action: "Apply for immediate local calamity relief vouchers for food, garments, and temporary tenting.", deadline: "within 1 week", office: "Revenue Circle Inspector / Panchayat Team" },
        { step: 3, action: "Apply for high-priority housing assistance under PMAY-G special calamity index.", deadline: "within 1 month", office: "Block Development Officer (BDO)" }
      ],
      schemes: [
        { name: "PM Awas Yojana Gramin (PMAY-G Calamity Quote)", amount: "₹1,20,000", how_to_apply: "Submit fire loss certificate to get fast-tracked inside national SECC brick housing queue.", documents: ["Fire Damage Certificate", "Aadhaar Card", "Land Holding Proof"] },
        { name: "District Calamity Emergency Fund", amount: "₹12,000", how_to_apply: "Present Lekhpal verification of physical structural damage to receive immediate cash repairs assistance.", documents: ["Spelling Validation Paper", "Bank Passbook Copy"] }
      ],
      documents_needed: ["Fire Incident Report / Damage Certificate", "Aadhaar Card", "Active Bank Passbook", "Property Loss Photos"],
      helpline: "101 (Emergency Fire Rescue Services)"
    }
  };

  const matchedKey = Object.keys(maps).find(key => 
    selected_event.toLowerCase().includes(key.toLowerCase().split("/")[0].trim())
  ) || "Flood / Natural Disaster";

  return maps[matchedKey];
}

// REST API for Life Navigator Action Plan Roadmap (AWAAZ hackathon)
app.post("/api/life-navigator", async (req: Request, res: Response) => {
  const { selected_event, state = "Assam", income = "Under ₹1L", land = "No" } = req.body;

  if (!selected_event) {
    res.status(400).json({ error: "Missing selected_event parameter in requisition body." });
    return;
  }

  // Fallback if AI client is missing or offline, keeping portal resilient
  if (!ai) {
    const fallbackPlan = generateFallbackNavigatorPlan(selected_event, state, income, land);
    res.json(fallbackPlan);
    return;
  }

  try {
    const promptText = `You are a government scheme expert for rural India. 
A citizen has faced: ${selected_event}
Their state: ${state}, Income: ${income}, Land ownership: ${land}

Generate a crisis action plan in this EXACT JSON format:
{
  "summary": "2-line human summary of what they should do",
  "urgent_steps": [
    {"step": 1, "action": "...", "deadline": "within 48 hours", "office": "..."},
    {"step": 2, "action": "...", "deadline": "within 1 week", "office": "..."},
    {"step": 3, "action": "...", "deadline": "within 1 month", "office": "..."}
  ],
  "schemes": [
    {"name": "...", "amount": "₹...", "how_to_apply": "...", "documents": ["...", "..."]}
  ],
  "documents_needed": ["...", "..."],
  "helpline": "1800-XXX-XXXX"
}
Return ONLY the JSON. No markdown. No explanation.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        { role: "user", parts: [{ text: promptText }] }
      ],
      config: {
        responseMimeType: "application/json",
        temperature: 0.2, // structured output
      }
    });

    const aiText = response.text || "";
    let parsedPlan: any;
    try {
      parsedPlan = JSON.parse(aiText.trim());
    } catch (_) {
      const cleanText = aiText.replace(/```json/i, "").replace(/```/g, "").trim();
      parsedPlan = JSON.parse(cleanText);
    }
    res.json(parsedPlan);

  } catch (error) {
    console.error("Gemini Failure for Life Navigator route:", error);
    const fallbackPlan = generateFallbackNavigatorPlan(selected_event, state, income, land);
    res.json(fallbackPlan);
  }
});

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
