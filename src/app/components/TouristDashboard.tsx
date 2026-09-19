import { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle, Radio, WifiOff, MapPin, Clock, ChevronRight, HelpCircle, Activity } from "lucide-react";

type SafetyMode = "nomad" | "watch" | "guardian" | "sentinel";

interface ModeConfig {
  label: string;
  short: string;
  tagline: string;
  description: string;
  color: string;
  bg: string;
  border: string;
  riskLabel: string;
  safetyScore: number;
  confidence: number;
}

const MODES: Record<SafetyMode, ModeConfig> = {
  nomad: {
    label: "NOMAD MODE",
    short: "Nomad",
    tagline: "Everything appears normal",
    description: "Your journey appears safe. TRINETRA performs low-power, passive safety monitoring in the background. No unnecessary information is shared with responders.",
    color: "#4CAF7D",
    bg: "rgba(76,175,125,0.2)",
    border: "rgba(76,175,125,0.35)",
    riskLabel: "Low",
    safetyScore: 82,
    confidence: 91,
  },
  watch: {
    label: "WATCH MODE",
    short: "Watch",
    tagline: "Something unusual is beginning",
    description: "Something unusual has been detected. TRINETRA is watching your journey more closely. No action needed yet.",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.2)",
    border: "rgba(245,158,11,0.35)",
    riskLabel: "Medium",
    safetyScore: 55,
    confidence: 67,
  },
  guardian: {
    label: "GUARDIAN MODE",
    short: "Guardian",
    tagline: "Your confirmation is needed",
    description: "Several safety indicators require attention. TRINETRA has increased monitoring and needs confirmation from you.",
    color: "#E05A2B",
    bg: "rgba(224,90,43,0.2)",
    border: "rgba(224,90,43,0.35)",
    riskLabel: "High",
    safetyScore: 32,
    confidence: 42,
  },
  sentinel: {
    label: "SENTINEL MODE",
    short: "Sentinel",
    tagline: "Emergency escalation active",
    description: "Strong indicators of a possible emergency have been detected. TRINETRA is preparing the Rescue Capsule and beginning emergency escalation.",
    color: "#E0362C",
    bg: "rgba(224,54,44,0.2)",
    border: "rgba(224,54,44,0.35)",
    riskLabel: "Critical",
    safetyScore: 12,
    confidence: 18,
  },
};

interface InsightFactor {
  id: string;
  name: string;
  impact: "none" | "low" | "moderate" | "high";
  status: string;
  description: string;
  icon: React.ReactNode;
  activeIn: SafetyMode[];
}

const INSIGHT_FACTORS: InsightFactor[] = [
  {
    id: "route",
    name: "Route Deviation",
    impact: "moderate",
    status: "1.2 km off-route",
    description: "You are approximately 1.2 km away from your planned route. Returning to the route may improve your Safety Confidence.",
    icon: <MapPin className="w-4 h-4" />,
    activeIn: ["watch", "guardian", "sentinel"],
  },
  {
    id: "checkpoint",
    name: "Checkpoint Missed",
    impact: "high",
    status: "Wayur Bridge — overdue by 28 min",
    description: "You have not confirmed the expected checkpoint at Wayur Bridge. This checkpoint was due 28 minutes ago.",
    icon: <Clock className="w-4 h-4" />,
    activeIn: ["guardian", "sentinel"],
  },
  {
    id: "connectivity",
    name: "Weak Connectivity",
    impact: "low",
    status: "Signal: 1 bar (EDGE)",
    description: "Poor network connection is reducing the system's confidence in your real-time location and status updates.",
    icon: <WifiOff className="w-4 h-4" />,
    activeIn: ["watch", "guardian", "sentinel"],
  },
  {
    id: "hazard",
    name: "Near Identified Hazard",
    impact: "high",
    status: "Landslide-prone zone — 0.6 km ahead",
    description: "You are approaching a known landslide-prone area. Exercise caution and check for local advisories.",
    icon: <AlertTriangle className="w-4 h-4" />,
    activeIn: ["sentinel"],
  },
  {
    id: "environment",
    name: "Environmental Conditions",
    impact: "moderate",
    status: "Worsening weather detected",
    description: "Weather conditions in your area are deteriorating. Reduced visibility and slippery roads may affect your journey safety.",
    icon: <Activity className="w-4 h-4" />,
    activeIn: ["sentinel"],
  },
];

const impactConfig = {
  none: { label: "No impact", color: "#4CAF7D", bg: "rgba(76,175,125,0.2)" },
  low: { label: "Low impact", color: "#F59E0B", bg: "rgba(245,158,11,0.2)" },
  moderate: { label: "Moderate impact", color: "#E05A2B", bg: "rgba(224,90,43,0.2)" },
  high: { label: "High impact", color: "#E0362C", bg: "rgba(224,54,44,0.2)" },
};

const darkCardStyle = {
  background: "#1A1A1A",
  borderRadius: 16,
  boxShadow: "0 2px 16px rgba(0,0,0,0.6)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const heroCardStyle = {
  background: "linear-gradient(160deg, #2A1500 0%, #1A0A00 50%, #0D0D0D 100%)",
  borderRadius: 20,
  boxShadow: "0 2px 16px rgba(0,0,0,0.6)",
  border: "1px solid rgba(255,107,0,0.2)",
};

interface TouristDashboardProps {
  onNavigate: (page: string) => void;
}

export function TouristDashboard({ onNavigate }: TouristDashboardProps) {
  const [mode, setMode] = useState<SafetyMode>("nomad");
  const [safeResponse, setSafeResponse] = useState<"safe" | "help" | null>(null);
  const [pulseAnim, setPulseAnim] = useState(false);
  const [showInsights, setShowInsights] = useState(true);

  const cfg = MODES[mode];
  const activeFactors = INSIGHT_FACTORS.filter(f => f.activeIn.includes(mode));
  const confidence = cfg.confidence;
  const riskScore = 100 - cfg.safetyScore;

  // Pulse animation trigger on mode change
  useEffect(() => {
    setPulseAnim(true);
    const t = setTimeout(() => setPulseAnim(false), 800);
    return () => clearTimeout(t);
  }, [mode]);

  // SVG ring math — ring fill represents risk score (low risk = small fill)
  const radius = 68;
  const circ = 2 * Math.PI * radius;
  const riskOffset = circ - (riskScore / 100) * circ;

  const modeOrder: SafetyMode[] = ["nomad", "watch", "guardian", "sentinel"];

  return (
    <div className="flex flex-col gap-5 pb-4" style={{ background: "#111111", minHeight: "100vh" }}>

      {/* ── GUARDIAN CONFIRMATION CARD ── */}
      {mode === "guardian" && safeResponse === null && (
        <div
          className="mx-0 p-5"
          style={{
            borderRadius: 12,
            background: "linear-gradient(160deg, #2A1500, #1A0A00, #0D0D0D)",
            border: "1px solid rgba(255,107,0,0.3)",
          }}
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
              <HelpCircle className="w-5 h-5" style={{ color: "white" }} />
            </div>
            <div>
              <p className="font-bold text-base" style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>Are you safe?</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Manrope', sans-serif" }}>TRINETRA needs confirmation. Multiple safety indicators require your attention.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setSafeResponse("safe"); setMode("nomad"); }}
              className="flex-1 py-3 rounded-xl font-semibold text-sm text-white transition-all active:scale-95"
              style={{ background: "#4CAF7D", fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >
              YES, I AM SAFE
            </button>
            <button
              onClick={() => { setSafeResponse("help"); setMode("sentinel"); }}
              className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
              style={{ background: "#E0362C", color: "white", fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >
              NO — HELP ME
            </button>
          </div>
        </div>
      )}

      {/* ── SENTINEL ALERT ── */}
      {mode === "sentinel" && (
        <div
          className="p-5"
          style={{ borderRadius: 12, background: "#E0362C", border: "none" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
              <Radio className="w-5 h-5" style={{ color: "white" }} />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: "white", fontFamily: "'Be Vietnam Pro', sans-serif" }}>Emergency Escalation Active</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'Manrope', sans-serif" }}>Rescue Capsule is being prepared. Responders are being notified.</p>
            </div>
          </div>
          <button
            onClick={() => { setSafeResponse("safe"); setMode("nomad"); }}
            className="w-full py-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
            style={{ background: "#4CAF7D", color: "white", fontFamily: "'Be Vietnam Pro', sans-serif" }}
          >
            I AM SAFE — CANCEL ESCALATION
          </button>
        </div>
      )}

      {/* ── SAFETY PULSE ── */}
      <div className="p-5" style={heroCardStyle}>

        {/* Card header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Manrope', sans-serif" }}>Safety Pulse</p>
            <p className="text-sm font-bold mt-0.5" style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>TRINETRA is monitoring</p>
          </div>
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: "rgba(255,107,0,0.15)", color: "#FF8C38", fontFamily: "'Manrope', sans-serif" }}
          >
            {cfg.short}
          </span>
        </div>

        {/* Ring — centered, shows risk score */}
        <div className="flex flex-col items-center">

          <div className="relative flex-shrink-0" style={{ width: 156, height: 156 }}>
            {/* Outer glow pulse for high-alert modes */}
            {(mode === "guardian" || mode === "sentinel") && (
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{ background: cfg.color, opacity: 0.08 }}
              />
            )}
            <svg width="156" height="156" viewBox="0 0 156 156">
              {/* Track */}
              <circle cx="78" cy="78" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
              {/* Risk progress — fills proportionally to risk score */}
              <circle
                cx="78" cy="78" r={radius}
                fill="none"
                stroke={cfg.color}
                strokeWidth="10"
                strokeDasharray={circ}
                strokeDashoffset={riskOffset}
                strokeLinecap="round"
                transform="rotate(-90 78 78)"
                style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1), stroke 0.4s ease" }}
              />
            </svg>
            {/* Center: risk number + label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold leading-none" style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>{riskScore}</p>
              <p className="text-[10px] font-semibold mt-1 tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Manrope', sans-serif" }}>Risk Score</p>
            </div>
          </div>

          {/* Risk status badge */}
          <span
            className="mt-3 text-xs font-bold px-4 py-1.5 rounded-full"
            style={{ background: cfg.bg, color: "white", border: `1px solid ${cfg.border}`, fontFamily: "'Manrope', sans-serif" }}
          >
            {cfg.riskLabel.toUpperCase()} RISK
          </span>

          {/* AI Confidence — separate section */}
          <div className="w-full mt-5">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Manrope', sans-serif" }}>
                AI Confidence
              </p>
              <p className="text-xs font-bold" style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                {confidence}%
              </p>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${confidence}%`,
                  background: "#FF6B00",
                  transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
                }}
              />
            </div>
            <p className="text-[10px] mt-1.5" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Manrope', sans-serif" }}>
              How confident TRINETRA is in this assessment
            </p>
          </div>

          {/* Mode + Status row */}
          <div className="w-full mt-4 flex items-center gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Manrope', sans-serif" }}>Mode</p>
            <span
              className="text-[10px] font-bold px-3 py-1 rounded-full"
              style={{ background: "rgba(255,107,0,0.15)", color: "#FF8C38", fontFamily: "'Manrope', sans-serif" }}
            >
              {cfg.short.toUpperCase()}
            </span>
          </div>
          <div className="w-full mt-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Manrope', sans-serif" }}>Status</p>
            <p className="text-xs mt-0.5 leading-snug" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Manrope', sans-serif" }}>{cfg.tagline}</p>
          </div>
        </div>

        {/* Mode description */}
        <div className="mt-4 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
          <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Manrope', sans-serif" }}>{cfg.description}</p>
        </div>
      </div>

      {/* ── SAFETY MODES PROGRESSION ── */}
      <div className="p-5" style={darkCardStyle}>
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#FFFFFF", fontFamily: "'Manrope', sans-serif" }}>Operating Mode</p>
        <div className="flex gap-2">
          {modeOrder.map((m, i) => {
            const mc = MODES[m];
            const isActive = m === mode;
            const isPast = modeOrder.indexOf(mode) > i;
            return (
              <button
                key={m}
                onClick={() => { setMode(m); setSafeResponse(null); }}
                className="flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-xl transition-all active:scale-95"
                style={{
                  background: isActive ? "#FF6B00" : "#222222",
                  border: `1.5px solid ${isActive ? "#FF6B00" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: 12,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: isActive || isPast ? mc.color : "rgba(255,255,255,0.3)" }}
                />
                <p
                  className="text-[9px] font-bold tracking-wider leading-tight text-center"
                  style={{ color: isActive ? "white" : "rgba(255,255,255,0.5)", fontFamily: "'Manrope', sans-serif" }}
                >
                  {mc.short.toUpperCase()}
                </p>
              </button>
            );
          })}
        </div>
        {/* Connector line */}
        <div className="flex items-center mt-3 px-4">
          {modeOrder.map((m, i) => (
            <div key={m} className="flex-1 flex items-center">
              <div
                className="h-0.5 flex-1"
                style={{ background: modeOrder.indexOf(mode) >= i ? MODES[m].color : "rgba(255,255,255,0.08)", transition: "background 0.3s" }}
              />
              {i < modeOrder.length - 1 && (
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: modeOrder.indexOf(mode) > i ? MODES[modeOrder[i]].color : "rgba(255,255,255,0.08)" }}
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-[10px] text-center mt-2" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Manrope', sans-serif" }}>Tap a mode to preview · TRINETRA escalates automatically</p>
      </div>

      {/* ── EXPLAINABLE AI — SAFETY INSIGHTS ── */}
      <div className="p-5" style={darkCardStyle}>
        <button
          className="flex items-center justify-between w-full mb-1"
          onClick={() => setShowInsights(v => !v)}
        >
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-left" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Manrope', sans-serif" }}>Safety Insights</p>
            <p className="text-sm font-bold text-left" style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>Why is my score affected?</p>
          </div>
          <div className="flex items-center gap-1">
            {activeFactors.length > 0 && (
              <span className="text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full" style={{ background: MODES[mode].bg, color: MODES[mode].color }}>
                {activeFactors.length}
              </span>
            )}
            <ChevronRight className="w-4 h-4 transition-transform" style={{ color: "rgba(255,255,255,0.4)", transform: showInsights ? "rotate(90deg)" : "rotate(0deg)" }} />
          </div>
        </button>

        {showInsights && (
          <div className="mt-4 space-y-3">
            {activeFactors.length === 0 ? (
              <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: "rgba(76,175,125,0.15)", border: "1px solid rgba(76,175,125,0.3)" }}>
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#4CAF7D" }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>All factors normal</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Manrope', sans-serif" }}>No safety concerns detected. TRINETRA is quietly monitoring your journey.</p>
                </div>
              </div>
            ) : (
              activeFactors.map(factor => {
                const ic = impactConfig[factor.impact];
                return (
                  <div
                    key={factor.id}
                    className="p-4 rounded-2xl"
                    style={{ background: "#222222", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: ic.bg, color: ic.color }}>
                          {factor.icon}
                        </div>
                        <div>
                          <p className="text-sm font-semibold leading-tight" style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>{factor.name}</p>
                          <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Manrope', sans-serif" }}>{factor.status}</p>
                        </div>
                      </div>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: ic.bg, color: ic.color, fontFamily: "'Manrope', sans-serif" }}
                      >
                        ⚠ {ic.label}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Manrope', sans-serif" }}>{factor.description}</p>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* ── QUICK ACTIONS ── */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate("journey-contract")}
          className="p-4 flex items-start gap-3 transition-all active:scale-95"
          style={{ background: "#1A1A1A", borderRadius: 14, boxShadow: "0 2px 16px rgba(0,0,0,0.6)", border: "1px solid rgba(255,107,0,0.2)" }}
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,107,0,0.15)" }}>
            <CheckCircle className="w-4 h-4" style={{ color: "#FF6B00" }} />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold" style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>Journey Contract</p>
            <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Manrope', sans-serif" }}>Route, checkpoints & hazards</p>
          </div>
        </button>
        <button
          onClick={() => onNavigate("emergency")}
          className="p-4 flex items-start gap-3 transition-all active:scale-95"
          style={{ background: "#E0362C", borderRadius: 14, boxShadow: "0 2px 16px rgba(0,0,0,0.6)", border: "none" }}
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
            <AlertTriangle className="w-4 h-4" style={{ color: "white" }} />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold" style={{ color: "white", fontFamily: "'Be Vietnam Pro', sans-serif" }}>Emergency</p>
            <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Manrope', sans-serif" }}>SOS & responder contacts</p>
          </div>
        </button>
      </div>
    </div>
  );
}
