import React, { useState, useEffect } from "react";
import { 
  Lock, ShieldAlert, CheckCircle, RefreshCw, LogOut, Trash2, 
  Edit3, PlusCircle, Bookmark, FileText, Globe, Info, Clock, 
  Sliders, Plus, Delete, X, ExternalLink, Calendar, HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DocumentMetadata, DOCUMENTS_DATABASE } from "../data/documentsDatabase";

export interface Scheme {
  id: string;
  name: string;
  tagline: string;
  category: string;
  state: string;
  benefitDescription: string;
  approximateValue: number;
  documentsRequired: string[];
  description: string;
  officialPortal: string;
  helpline: string;
  responsibleMinistry: string;
  rejectionReasons: { reason: string; correction: string; timeline: string }[];
  rules: {
    minAge?: number;
    maxAge?: number;
    maxIncome?: number;
    occupations?: string[];
    genders?: string[];
    categories?: string[];
    states?: string[];
  };
}

interface AdminPanelProps {
  onClose: () => void;
  onRefreshSchemes: () => void;
  schemesList: Scheme[];
  language: string;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  onClose, 
  onRefreshSchemes, 
  schemesList,
  language 
}) => {
  // Authentication status
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [adminUser, setAdminUser] = useState<string>("");
  
  // Auth Form State
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<"list" | "form" | "audit">("list");
  const [editingScheme, setEditingScheme] = useState<Scheme | null>(null);
  const [auditLogs, setAuditLogs] = useState<Array<{ date: string; action: string; username: string }>>([]);
  const [isRefreshingLogs, setIsRefreshingLogs] = useState<boolean>(false);

  // Toast notifications inside panel
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // Form states for scheme insertion / edition
  const [formName, setFormName] = useState("");
  const [formTagline, setFormTagline] = useState("");
  const [formCategory, setFormCategory] = useState("Welfare");
  const [formState, setFormState] = useState("All India");
  const [formDescription, setFormDescription] = useState("");
  const [formBenefitDesc, setFormBenefitDesc] = useState("");
  const [formApproxValue, setFormApproxValue] = useState<number>(12000);
  const [formPortal, setFormPortal] = useState("");
  const [formHelpline, setFormHelpline] = useState("");
  const [formMinistry, setFormMinistry] = useState("");
  
  // Form Rules
  const [ruleMinAge, setRuleMinAge] = useState<string>("");
  const [ruleMaxAge, setRuleMaxAge] = useState<string>("");
  const [ruleMaxIncome, setRuleMaxIncome] = useState<string>("");
  const [ruleGenders, setRuleGenders] = useState<string[]>([]);
  const [ruleOccupations, setRuleOccupations] = useState<string[]>([]);

  // Form Rejection reasons
  const [formRejections, setFormRejections] = useState<Array<{ reason: string; correction: string; timeline: string }>>([]);
  const [newRejectionReason, setNewRejectionReason] = useState("");
  const [newRejectionCorrection, setNewRejectionCorrection] = useState("");
  const [newRejectionTimeline, setNewRejectionTimeline] = useState("");

  // Form Documents Required
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);

  // Load session from local storage upon mount to avoid login wipeouts on standard reloads
  useEffect(() => {
    const savedToken = sessionStorage.getItem("haqqdar_admin_token");
    const savedUser = sessionStorage.getItem("haqqdar_admin_user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setAdminUser(savedUser);
      setIsAuthenticated(true);
      showToast("Access restored via active browser session certificate.", "success");
    }
  }, []);

  // Sync audit logs if authenticated and active tab changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchAuditLogs();
    }
  }, [isAuthenticated, activeTab]);

  // Session timeout auto-logout: 30 minutes limit
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const timeout = setTimeout(() => {
      handleLogout();
      showToast("Administrative session expired (30-Minute safety threshold).", "info");
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearTimeout(timeout);
  }, [isAuthenticated]);

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsLoggingIn(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        setToken(data.token);
        setAdminUser(data.username);
        sessionStorage.setItem("haqqdar_admin_token", data.token);
        sessionStorage.setItem("haqqdar_admin_user", data.username);
        showToast("Administrative login granted. Session initialized.", "success");
        // Clear password fields
        setPassword("");
      } else {
        setAuthError(data.error || "Incorrect credentials");
      }
    } catch (e) {
      setAuthError("Failed to establish server connection. Check API status.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: adminUser })
      });
    } catch (_) {}

    setIsAuthenticated(false);
    setToken("");
    setAdminUser("");
    sessionStorage.removeItem("haqqdar_admin_token");
    sessionStorage.removeItem("haqqdar_admin_user");
    showToast("Session closed correctly.", "info");
  };

  const fetchAuditLogs = async () => {
    setIsRefreshingLogs(true);
    try {
      const response = await fetch("/api/admin/audit-logs");
      if (response.ok) {
        const data = await response.json();
        setAuditLogs(data);
      }
    } catch (err) {
      showToast("Could not retrieve audit chronicles.", "error");
    } finally {
      setIsRefreshingLogs(false);
    }
  };

  // Populate form with existing scheme for editing
  const initFormForEdit = (scheme: Scheme) => {
    setEditingScheme(scheme);
    setFormName(scheme.name);
    setFormTagline(scheme.tagline || "");
    setFormCategory(scheme.category);
    setFormState(scheme.state || "All India");
    setFormDescription(scheme.description || "");
    setFormBenefitDesc(scheme.benefitDescription || "");
    setFormApproxValue(scheme.approximateValue || 12000);
    setFormPortal(scheme.officialPortal || "");
    setFormHelpline(scheme.helpline || "");
    setFormMinistry(scheme.responsibleMinistry || "");
    
    // Set rules
    setRuleMinAge(scheme.rules?.minAge?.toString() || "");
    setRuleMaxAge(scheme.rules?.maxAge?.toString() || "");
    setRuleMaxIncome(scheme.rules?.maxIncome?.toString() || "");
    setRuleGenders(scheme.rules?.genders || []);
    setRuleOccupations(scheme.rules?.occupations || []);
    
    setFormRejections(scheme.rejectionReasons || []);
    setSelectedDocs(scheme.documentsRequired || []);
    
    setActiveTab("form");
  };

  // Clear Form parameters for pristine creation
  const initFormForCreate = () => {
    setEditingScheme(null);
    setFormName("");
    setFormTagline("");
    setFormCategory("Welfare");
    setFormState("All India");
    setFormDescription("");
    setFormBenefitDesc("");
    setFormApproxValue(12000);
    setFormPortal("");
    setFormHelpline("");
    setFormMinistry("");
    setRuleMinAge("");
    setRuleMaxAge("");
    setRuleMaxIncome("");
    setRuleGenders([]);
    setRuleOccupations([]);
    setFormRejections([]);
    setSelectedDocs([]);
    
    setActiveTab("form");
  };

  const handleGenderToggle = (gender: string) => {
    if (ruleGenders.includes(gender)) {
      setRuleGenders(ruleGenders.filter(g => g !== gender));
    } else {
      setRuleGenders([...ruleGenders, gender]);
    }
  };

  const handleOccupationToggle = (occupation: string) => {
    if (ruleOccupations.includes(occupation)) {
      setRuleOccupations(ruleOccupations.filter(o => o !== occupation));
    } else {
      setRuleOccupations([...ruleOccupations, occupation]);
    }
  };

  const handleDocToggle = (docName: string) => {
    if (selectedDocs.includes(docName)) {
      setSelectedDocs(selectedDocs.filter(d => d !== docName));
    } else {
      setSelectedDocs([...selectedDocs, docName]);
    }
  };

  const addRejectionReason = () => {
    if (!newRejectionReason.trim() || !newRejectionCorrection.trim()) {
      showToast("Reason and Correction fields are required.", "error");
      return;
    }
    setFormRejections([
      ...formRejections,
      {
        reason: newRejectionReason.trim(),
        correction: newRejectionCorrection.trim(),
        timeline: newRejectionTimeline.trim() || "15 Days"
      }
    ]);
    setNewRejectionReason("");
    setNewRejectionCorrection("");
    setNewRejectionTimeline("");
    showToast("Rejection audit criteria appended.", "success");
  };

  const removeRejectionReason = (index: number) => {
    setFormRejections(formRejections.filter((_, i) => i !== index));
  };

  // Submit creation or edits
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Direct url validation prior to sending to keep network lean
    if (!formPortal.startsWith("http://") && !formPortal.startsWith("https://")) {
      showToast("Official Website must begin with http:// or https://", "error");
      return;
    }
    if (!formPortal.includes(".")) {
      showToast("Official Website must have a valid top-level domain.", "error");
      return;
    }

    const payloadScheme: Partial<Scheme> = {
      name: formName.trim(),
      tagline: formTagline.trim(),
      category: formCategory,
      state: formState,
      description: formDescription.trim(),
      benefitDescription: formBenefitDesc.trim(),
      approximateValue: Number(formApproxValue) || 12000,
      officialPortal: formPortal.trim(),
      helpline: formHelpline.trim(),
      responsibleMinistry: formMinistry.trim(),
      documentsRequired: selectedDocs,
      rejectionReasons: formRejections,
      rules: {
        minAge: ruleMinAge ? Number(ruleMinAge) : undefined,
        maxAge: ruleMaxAge ? Number(ruleMaxAge) : undefined,
        maxIncome: ruleMaxIncome ? Number(ruleMaxIncome) : undefined,
        genders: ruleGenders.length > 0 ? ruleGenders : undefined,
        occupations: ruleOccupations.length > 0 ? ruleOccupations : undefined
      }
    };

    try {
      const url = editingScheme ? `/api/schemes/${editingScheme.id}` : "/api/schemes";
      const method = editingScheme ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scheme: payloadScheme,
          adminUsername: adminUser
        })
      });

      const data = await response.json();

      if (response.ok) {
        showToast(
          editingScheme 
            ? `Scheme "${formName}" successfully edited in state ledger.` 
            : `Scheme "${formName}" safely added as a live nationwide entitlement.`,
          "success"
        );
        onRefreshSchemes();
        setActiveTab("list");
      } else {
        showToast(data.error || "A database constraint failure occurred.", "error");
      }
    } catch (err) {
      showToast("Failed to transmit administrative logs. Retry.", "error");
    }
  };

  const handleDeleteScheme = async (id: string, name: string) => {
    if (!window.confirm(`CRITICAL WARNING: Are you sure you want to permanently delete the "${name}" scheme? This action is logged & irreversible.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/schemes/${id}?adminUsername=${encodeURIComponent(adminUser)}`, {
        method: "DELETE"
      });

      if (response.ok) {
        showToast(`Permanently purged "${name}" from registry archives.`, "success");
        onRefreshSchemes();
      } else {
        const data = await response.json();
        showToast(data.error || "Failed to execute delete operation.", "error");
      }
    } catch (err) {
      showToast("Network failure blocking administrative deletion.", "error");
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black/85 backdrop-blur-lg flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="relative bg-zinc-950 border border-zinc-800 text-white w-full max-w-5xl rounded-3xl overflow-hidden flex flex-col max-h-[92vh] shadow-2xl animate-scaleUp"
        id="administrator-master-panel"
      >
        
        {/* PANEL HEADER */}
        <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h2 className="font-serif font-black text-lg tracking-tight uppercase bg-gradient-to-r from-orange-400 via-white to-emerald-400 bg-clip-text text-transparent">
                Haqqdar Entitlements Registry
              </h2>
              <p className="text-[10px] text-zinc-500 font-mono">
                ADMIN CONSOLE • MULTI-ROLE COMPLIANT GATEWAY
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
            id="close-admin-form-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* TOAST SYSTEM */}
        <AnimatePresence>
          {toast && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`absolute top-16 left-6 right-6 z-[1010] p-3 rounded-xl border flex items-start gap-2.5 shadow-lg ${
                toast.type === "success" 
                  ? "bg-emerald-950/90 text-emerald-400 border-emerald-800" 
                  : toast.type === "error"
                  ? "bg-red-950/90 text-red-400 border-red-800"
                  : "bg-zinc-900/90 text-amber-500 border-zinc-700"
              }`}
            >
              <Info className="w-4.5 h-4.5 shrink-0 mt-0.5" />
              <span className="text-xs font-bold">{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NOT AUTHENTICATED PANEL */}
        {!isAuthenticated ? (
          <div className="flex-1 p-8 py-16 flex flex-col items-center justify-center font-sans max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-orange-400 shrink-0">
              <Lock className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-xl">Sign in as Administrator</h3>
              <p className="text-xs text-zinc-400">
                Authorized officials only. Security audit credentials required. All actions are catalogued under legal jurisdiction.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-4" id="admin-auth-form">
              <div className="text-left space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-zinc-500 font-mono block">Username</label>
                <input 
                  type="text" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. admin"
                  id="admin-username-input"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-orange-500/60 placeholder-zinc-700 font-mono"
                />
              </div>

              <div className="text-left space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-zinc-500 font-mono block">Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••"
                  id="admin-password-input"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-orange-500/60 placeholder-zinc-700 font-mono"
                />
              </div>

              {authError && (
                <div className="bg-red-950/40 border border-red-900/60 text-red-400 p-2.5 rounded-xl text-xs font-bold text-left flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoggingIn}
                id="admin-login-submit-btn"
                className="w-full bg-gradient-to-r from-orange-400 to-amber-600 text-black py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-opacity duration-150 hover:opacity-90 cursor-pointer flex items-center justify-center gap-1"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Verify Credentials</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED PANEL MAIN VIEW */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-[500px]">
            
            {/* PANEL SIDEBAR NAVIGATION */}
            <div className="w-full md:w-56 bg-zinc-900/60 border-r border-zinc-800 p-4 flex flex-col justify-between gap-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 p-2.5 rounded-xl">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <div className="truncate">
                    <p className="text-[10px] text-zinc-500 font-mono uppercase">Role: Super Admin</p>
                    <p className="text-xs font-bold text-white truncate font-mono">{adminUser}</p>
                  </div>
                </div>

                <nav className="flex flex-col gap-1">
                  {[
                    { id: "list", label: "Ledger Directory", icon: Bookmark },
                    { id: "form", label: editingScheme ? "Edit Scheme Specs" : "Add Live Scheme", icon: PlusCircle, click: editingScheme ? undefined : initFormForCreate },
                    { id: "audit", label: "Audit Chronicles", icon: Clock }
                  ].map(tab => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          if (tab.click) tab.click();
                          else { setEditingScheme(null); setActiveTab(tab.id as any); }
                        }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-left transition-colors ${
                          activeTab === tab.id 
                            ? "bg-zinc-800 text-white border border-zinc-700/80" 
                            : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-3 py-2.5 border border-zinc-850 bg-red-950/20 hover:bg-red-950/40 text-red-400 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                id="admin-logout-btn"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Secure Sign Out</span>
              </button>
            </div>

            {/* TAB CONTAINER VIEWPORT */}
            <div className="flex-1 p-6 overflow-y-auto bg-zinc-950/40">
              
              {/* TAB 1: SCHEME LEDGER LIST VIEW */}
              {activeTab === "list" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <div>
                      <h3 className="font-serif font-black text-md">Scheme Index List</h3>
                      <p className="text-[10px] text-zinc-500 font-mono">
                        TOTAL RE-EVALUATION SPECS: {schemesList.length} SCHEMES
                      </p>
                    </div>
                    <button
                      onClick={initFormForCreate}
                      className="bg-orange-500 hover:bg-orange-600 text-black px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                      id="create-new-scheme-btn"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Entitlement</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {schemesList.map((scheme) => (
                      <div 
                        key={scheme.id}
                        className="bg-zinc-900 border border-zinc-850 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-zinc-700 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-black text-white font-serif">{scheme.name}</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 bg-zinc-800 text-zinc-400 border border-zinc-700 rounded-md">
                              {scheme.category}
                            </span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 bg-emerald-950/40 text-emerald-400 border border-emerald-900/60 rounded-md">
                              {scheme.state || "All India"}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 italic max-w-xl">{scheme.tagline}</p>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-zinc-500 font-mono">
                            <span>Portal: <span className="text-zinc-400 truncate">{scheme.officialPortal}</span></span>
                            <span>Value: <span className="text-emerald-500 font-bold">₹{scheme.approximateValue?.toLocaleString("en-IN")}</span></span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => initFormForEdit(scheme)}
                            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-colors cursor-pointer flex items-center gap-1 border border-zinc-700/50"
                            title="Modify Scheme Data"
                          >
                            <Edit3 className="w-3 h-3 text-[#FF9933]" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteScheme(scheme.id, scheme.name)}
                            className="bg-red-950/20 hover:bg-red-950/55 text-red-400 hover:text-red-300 px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-colors cursor-pointer flex items-center gap-1 border border-red-950/60"
                            title="Delete Scheme permanently"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Purge</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: SCHEME CREATION / EDITION FORM */}
              {activeTab === "form" && (
                <form onSubmit={handleFormSubmit} className="space-y-6 animate-fadeIn" id="scheme-action-form">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <div>
                      <h3 className="font-serif font-black text-md">
                        {editingScheme ? `Update Specs for "${editingScheme.name}"` : "Register New Government Entitlement"}
                      </h3>
                      <p className="text-[10px] text-zinc-500 font-mono">
                        VERIFIED METADATA SCHEMA SYNTAX GUARANTEED
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab("list")}
                      className="text-xs text-zinc-400 hover:text-white underline cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  {/* FORM SECTIONS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* FIELD 1: NAME */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-zinc-500 font-mono block">Scheme Name *</label>
                      <input 
                        type="text" 
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. PM-KISAN Samman Nidhi"
                        id="form-scheme-name"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500/60 font-medium"
                      />
                    </div>

                    {/* FIELD 2: TAGLINE */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-zinc-500 font-mono block">Brief Slogan / Tagline</label>
                      <input 
                        type="text" 
                        value={formTagline}
                        onChange={(e) => setFormTagline(e.target.value)}
                        placeholder="e.g. Direct Support for Marginal Landholder Families"
                        id="form-scheme-tagline"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500/60"
                      />
                    </div>

                    {/* FIELD 3: CATEGORY */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-zinc-500 font-mono block">Category *</label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        id="form-scheme-category"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500/60 cursor-pointer font-bold"
                      >
                        {["Agriculture", "Housing", "Health", "Business", "Education", "Welfare", "Pensions", "Citizen ID"].map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    {/* FIELD 4: STATE OPERABILITY */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-zinc-500 font-mono block">Geography / State Bounds *</label>
                      <select
                        value={formState}
                        onChange={(e) => setFormState(e.target.value)}
                        id="form-scheme-state"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500/60 cursor-pointer"
                      >
                        <option value="All India">All India (Central Scale)</option>
                        <option value="Northeast Only">Northeast Only (Regional)</option>
                        {["Assam", "Meghalaya", "Mizoram", "Nagaland", "Sikkim", "Manipur", "Arunachal Pradesh", "Tripura", "Bihar", "Uttar Pradesh", "West Bengal", "Karnataka", "Maharashtra"].map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>

                    {/* FIELD 5: MINISTRY */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-zinc-500 font-mono block">Ministry in Charge</label>
                      <input 
                        type="text" 
                        value={formMinistry}
                        onChange={(e) => setFormMinistry(e.target.value)}
                        placeholder="e.g. Ministry of Agriculture & Farmers Welfare"
                        id="form-scheme-ministry"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500/60"
                      />
                    </div>

                    {/* FIELD 6: VALUATION */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-zinc-500 font-mono block">Approximate Value (₹ Annual Cash Support Equivalent) *</label>
                      <input 
                        type="number" 
                        required
                        value={formApproxValue}
                        onChange={(e) => setFormApproxValue(Number(e.target.value) || 0)}
                        placeholder="e.g. 6000"
                        id="form-scheme-value"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500/60 font-bold"
                      />
                    </div>

                    {/* FIELD 7: OFFICIAL PORTAL WEBSITE */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-zinc-500 font-mono block">Official Website Portal (Full URL starting with https://) *</label>
                      <input 
                        type="text" 
                        required
                        value={formPortal}
                        onChange={(e) => setFormPortal(e.target.value)}
                        placeholder="https://pmkisan.gov.in"
                        id="form-scheme-portal"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500/60 font-mono text-[#FF9933] font-bold"
                      />
                    </div>

                    {/* FIELD 8: SUPPORT HELPLINE */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-zinc-500 font-mono block">Official Helpline Number</label>
                      <input 
                        type="text" 
                        value={formHelpline}
                        onChange={(e) => setFormHelpline(e.target.value)}
                        placeholder="155261"
                        id="form-scheme-helpline"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500/60"
                      />
                    </div>
                  </div>

                  {/* FIELD 9: DETAILED DESCRIPTION */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-zinc-500 font-mono block">General Description *</label>
                    <textarea 
                      required
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      placeholder="Input complete summary, constitutional goals and scope of this benefit..."
                      rows={3}
                      id="form-scheme-desc"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500/60"
                    />
                  </div>

                  {/* FIELD 10: BENEFITS EXPLANATIVE DESCRIPTION */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-zinc-500 font-mono block">Exact Benefits Description</label>
                    <textarea 
                      value={formBenefitDesc}
                      onChange={(e) => setFormBenefitDesc(e.target.value)}
                      placeholder="e.g. Transmitted directly in 3 installments of ₹2000 each in April, August, and December via DBTs..."
                      rows={2}
                      id="form-scheme-benefit-desc"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500/60"
                    />
                  </div>

                  {/* SYSTEM ELIGIBILITY CONSTRAINTS (Rules) */}
                  <div className="p-4 bg-zinc-900/60 border border-zinc-850 rounded-2xl space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#FF9933] flex items-center gap-1.5 font-mono">
                      <Sliders className="w-4 h-4" />
                      <span>Citizen Eligibility Requirements (Automated Filtering Engine)</span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-zinc-500 font-mono">Min Age requirement</label>
                        <input 
                          type="number" 
                          value={ruleMinAge}
                          onChange={(e) => setRuleMinAge(e.target.value)}
                          placeholder="e.g. 18"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-zinc-500 font-mono">Max Age requirement</label>
                        <input 
                          type="number" 
                          value={ruleMaxAge}
                          onChange={(e) => setRuleMaxAge(e.target.value)}
                          placeholder="e.g. 60"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-zinc-500 font-mono">Income Ceiling (Max Annual Income)</label>
                        <input 
                          type="number" 
                          value={ruleMaxIncome}
                          onChange={(e) => setRuleMaxIncome(e.target.value)}
                          placeholder="e.g. 250000"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                      {/* Gender Selector checkboxes */}
                      <div className="space-y-2">
                        <span className="text-[9px] uppercase font-bold text-zinc-500 font-mono block">Allowed Genders (Leave empty for All)</span>
                        <div className="flex gap-3">
                          {["Male", "Female", "Other"].map(g => {
                            const isCheck = ruleGenders.includes(g);
                            return (
                              <button
                                key={g}
                                type="button"
                                onClick={() => handleGenderToggle(g)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                  isCheck ? "bg-orange-500/20 text-orange-400 border border-orange-500/50" : "bg-zinc-950 text-zinc-400 border border-zinc-850"
                                }`}
                              >
                                {g}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Occupation Selector checkboxes */}
                      <div className="space-y-2">
                        <span className="text-[9px] uppercase font-bold text-zinc-500 font-mono block">Ascribed Occupations</span>
                        <div className="flex flex-wrap gap-2">
                          {["Farmer", "Student", "Business Owner", "Unemployed", "Artisan", "Physically Challenged"].map(o => {
                            const isCheck = ruleOccupations.includes(o);
                            return (
                              <button
                                key={o}
                                type="button"
                                onClick={() => handleOccupationToggle(o)}
                                className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all ${
                                  isCheck ? "bg-[#138808]/20 text-[#22c55e] border border-[#138808]/50" : "bg-zinc-950 text-zinc-400 border border-zinc-850"
                                }`}
                              >
                                {o}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SCHEME REJECTION DEFINITION SCENARIOS */}
                  <div className="p-4 bg-zinc-900/60 border border-zinc-850 rounded-2xl space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-wider text-red-400 flex items-center gap-1.5 font-mono">
                      <ShieldAlert className="w-4 h-4" />
                      <span>Rejection & Recovery Map Scenario Builders</span>
                    </h4>

                    {formRejections.length > 0 && (
                      <div className="space-y-2.5">
                        {formRejections.map((rej, idx) => (
                          <div key={idx} className="bg-zinc-950 p-3 rounded-xl border border-zinc-850 flex items-start justify-between gap-3 text-xs">
                            <div className="space-y-1.5 flex-1">
                              <p className="text-red-400 font-bold font-serif">CRITERIA {idx+1}: {rej.reason}</p>
                              <p className="text-zinc-400 text-[11px] leading-relaxed"><strong>Correction Steps:</strong> {rej.correction}</p>
                              <p className="text-zinc-500 text-[10px] font-mono">Expected Timeline: {rej.timeline}</p>
                            </div>
                            <button 
                              type="button"
                              onClick={() => removeRejectionReason(idx)}
                              className="text-red-500 hover:text-red-400 font-bold text-xs"
                            >
                              Purge Link
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="bg-zinc-950/40 p-3.5 border border-zinc-850 rounded-xl space-y-3">
                      <p className="text-[10px] uppercase font-bold text-zinc-500 font-mono">Add Rejection & Recovery Steps Scenario Profile</p>
                      
                      <div className="space-y-2">
                        <input 
                          type="text"
                          placeholder="Primary Rejection Reason scenario (e.g. spelling mismatch, mutation missing)..."
                          value={newRejectionReason}
                          onChange={(e) => setNewRejectionReason(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                        <textarea 
                          placeholder="Actionable, verified exact correction roadmap steps for the citizen to solve it..."
                          value={newRejectionCorrection}
                          onChange={(e) => setNewRejectionCorrection(e.target.value)}
                          rows={2}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                        <div className="flex gap-2">
                          <input 
                            type="text"
                            placeholder="Resolution Timeline (e.g. 15 Days, 1 Month)"
                            value={newRejectionTimeline}
                            onChange={(e) => setNewRejectionTimeline(e.target.value)}
                            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                          <button
                            type="button"
                            onClick={addRejectionReason}
                            className="bg-indigo-600/15 text-indigo-400 border border-indigo-800 hover:bg-zinc-800 px-4 py-1.5 rounded-lg text-xs font-bold"
                          >
                            Add Scenario
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* REQUIRED DOCUMENT CRITERIA SELECTOR GRID */}
                  <div className="p-4 bg-zinc-900/60 border border-zinc-850 rounded-2xl space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 font-mono">
                      <FileText className="w-4 h-4" />
                      <span>Required Document Checklist Mapping *</span>
                    </h4>
                    <p className="text-[10px] text-zinc-500 font-medium">
                      Select which credentials a citizen must present inside their ledger pack to claim this benefit successfully.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-2">
                      {DOCUMENTS_DATABASE.map(doc => {
                        const isSelected = selectedDocs.includes(doc.name);
                        return (
                          <button
                            key={doc.id}
                            type="button"
                            onClick={() => handleDocToggle(doc.name)}
                            className={`flex items-center text-left gap-2 p-2 rounded-xl text-[10px] font-bold border transition-all ${
                              isSelected 
                                ? "bg-emerald-950/40 text-emerald-300 border-emerald-850" 
                                : "bg-zinc-950 text-zinc-500 border-zinc-900 hover:border-zinc-800 hover:text-zinc-300"
                            }`}
                          >
                            <span className={`w-2.4 h-2.4 rounded-full ${isSelected ? "bg-emerald-400" : "bg-zinc-800"}`} />
                            <span className="truncate">{doc.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* SUBMISSION BUTTON */}
                  <div className="flex justify-end gap-3 border-t border-zinc-800 pt-4">
                    <button
                      type="button"
                      onClick={() => setActiveTab("list")}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Close Form
                    </button>
                    <button
                      type="submit"
                      id="admin-form-submit"
                      className="bg-orange-500 hover:bg-orange-600 text-black px-6 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-150 shadow-md transform hover:scale-[1.01]"
                    >
                      {editingScheme ? "Update Registry Details" : "Publish Entitlement Online"}
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: ADMIN AUDIT LOG CHRONICLES */}
              {activeTab === "audit" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <div>
                      <h3 className="font-serif font-black text-md">System Audit Logs</h3>
                      <p className="text-[10px] text-zinc-500 font-mono">
                        CRYPTOGRAPHIC ACTIONS PROTOCOL HISTORY
                      </p>
                    </div>
                    <button
                      onClick={fetchAuditLogs}
                      disabled={isRefreshingLogs}
                      className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className={`w-3 h-3 ${isRefreshingLogs ? "animate-spin" : ""}`} />
                      <span>Refresh</span>
                    </button>
                  </div>

                  {/* Audit Logs Scrolling Box */}
                  <div className="bg-zinc-900/60 border border-zinc-850 rounded-2xl p-4 overflow-y-auto max-h-[440px] font-mono text-[11px] space-y-2">
                    {auditLogs.map((log, idx) => (
                      <div key={idx} className="border-b border-zinc-850 pb-2 flex items-start gap-4">
                        <span className="text-zinc-600 shrink-0 select-none">[{new Date(log.date).toLocaleString()}]</span>
                        <span className="text-[#FF9933] shrink-0 font-bold uppercase select-none">&lt;@{log.username}&gt;</span>
                        <span className="text-zinc-300">{log.action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
};
