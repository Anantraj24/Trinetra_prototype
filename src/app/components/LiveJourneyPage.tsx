import React, { useState, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  Compass,
  Navigation,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  Shield,
  Radio,
  WifiOff,
  Clock,
  MapPin,
  X,
  Activity,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type SafetyMode = "nomad" | "watch" | "guardian" | "sentinel";
type SosPhase = "idle" | "confirm" | "countdown" | "creating" | "active";

interface Props {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MODE_COLORS: Record<SafetyMode, string> = {
  nomad: "#4CAF7D",
  watch: "#F59E0B",
  guardian: "#E05A2B",
  sentinel: "#E0362C",
};

const MODE_BG: Record<SafetyMode, string> = {
  nomad: "rgba(76,175,125,0.12)",
  watch: "rgba(245,158,11,0.12)",
  guardian: "rgba(224,90,43,0.12)",
  sentinel: "rgba(224,54,44,0.12)",
};

const MODE_LABELS: Record<SafetyMode, string> = {
  nomad: "NOMAD MODE",
  watch: "WATCH MODE",
  guardian: "GUARDIAN MODE",
  sentinel: "SENTINEL MODE",
};

const RISK_LEVEL: Record<SafetyMode, { label: string; color: string }> = {
  nomad: { label: "Low Risk", color: "#4CAF7D" },
  watch: { label: "Moderate Risk", color: "#F59E0B" },
  guardian: { label: "High Risk", color: "#E05A2B" },
  sentinel: { label: "Critical Risk", color: "#E0362C" },
};

// ─── SVG Map Component ────────────────────────────────────────────────────────

const JourneyMapSVG: React.FC<{ safetyMode: SafetyMode }> = ({ safetyMode }) => {
  const modeColor = MODE_COLORS[safetyMode];

  // Checkpoint positions along the route
  const checkpoints = [
    { id: "S1", x: 44, y: 168, done: true },
    { id: "S2", x: 80, y: 140, done: true },
    { id: "S3", x: 122, y: 118, done: true },
    { id: "S4", x: 170, y: 98, done: false },
    { id: "S5", x: 222, y: 70, done: false },
    { id: "S6", x: 278, y: 42, done: false },
  ];

  // Current position (just past S3)
  const currentX = 145;
  const currentY = 108;

  // Hazard near S4
  const hazardX = 182;
  const hazardY = 86;

  return (
    <svg
      viewBox="0 0 320 200"
      width="100%"
      height="300"
      style={{ borderRadius: "12px", background: "#0A0A0A", display: "block" }}
    >
      {/* Terrain dot pattern background */}
      <defs>
        <pattern id="terrainDots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="8" cy="8" r="1" fill="rgba(255,107,0,0.05)" />
        </pattern>
        <filter id="shadowBlur">
          <feGaussianBlur stdDeviation="2" />
        </filter>
        {/* Pulse animation for current location */}
        <style>{`
          @keyframes pulseRing {
            0% { r: 8; opacity: 0.7; }
            100% { r: 16; opacity: 0; }
          }
          .pulse-ring {
            animation: pulseRing 1.6s ease-out infinite;
          }
          @keyframes pulseRingOuter {
            0% { r: 12; opacity: 0.4; }
            100% { r: 22; opacity: 0; }
          }
          .pulse-ring-outer {
            animation: pulseRingOuter 1.6s ease-out 0.3s infinite;
          }
        `}</style>
      </defs>

      {/* Background terrain */}
      <rect width="320" height="200" fill="url(#terrainDots)" />

      {/* Terrain contour lines (subtle) */}
      <path d="M 0 180 Q 80 165 160 155 Q 240 145 320 130" stroke="rgba(255,107,0,0.08)" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M 0 145 Q 80 130 160 120 Q 240 110 320 95" stroke="rgba(255,107,0,0.08)" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M 0 110 Q 80 95 160 82 Q 240 69 320 55" stroke="rgba(255,107,0,0.08)" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M 0 75 Q 80 60 160 48 Q 240 36 320 22" stroke="rgba(255,107,0,0.08)" strokeWidth="0.8" fill="none" opacity="0.3" />

      {/* Shadow corridor (secondary dashed path, slightly offset) */}
      <path
        d="M 44 168 C 60 158 72 148 95 136 C 115 126 130 115 155 102 C 180 89 205 68 235 52 C 255 40 268 32 285 24"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="2"
        fill="none"
        strokeDasharray="5 6"
        opacity="0.55"
      />

      {/* Planned route (dashed, light) */}
      <path
        d="M 44 168 C 58 155 70 145 88 134 C 108 122 118 112 140 100 C 162 88 195 72 222 56 C 242 44 258 34 278 22"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="2.5"
        fill="none"
        strokeDasharray="6 4"
      />

      {/* Completed route (solid mode color) */}
      <path
        d="M 44 168 C 58 155 70 145 88 134 C 108 122 118 112 140 100 L 145 108"
        stroke={modeColor}
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Hazard zone tinted area */}
      <ellipse cx={hazardX} cy={hazardY} rx="18" ry="14" fill="rgba(192,57,43,0.12)" stroke="rgba(192,57,43,0.3)" strokeWidth="1" strokeDasharray="3 2" />

      {/* Checkpoint circles */}
      {checkpoints.map((cp) => (
        <g key={cp.id}>
          {cp.done ? (
            <>
              <circle cx={cp.x} cy={cp.y} r="8" fill={modeColor} />
              <text x={cp.x} y={cp.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="5.5" fill="white" fontWeight="bold" fontFamily="Manrope, sans-serif">{cp.id}</text>
            </>
          ) : (
            <>
              <circle cx={cp.x} cy={cp.y} r="8" fill="#1A1A1A" stroke={cp.id === "S4" ? "#E0362C" : "rgba(255,255,255,0.2)"} strokeWidth="1.8" />
              <text x={cp.x} y={cp.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="5.5" fill={cp.id === "S4" ? "#E0362C" : "white"} fontWeight="bold" fontFamily="Manrope, sans-serif">{cp.id}</text>
            </>
          )}
        </g>
      ))}

      {/* Hazard marker */}
      <g transform={`translate(${hazardX - 7}, ${hazardY - 7})`}>
        <polygon points="7,0 14,12 0,12" fill="rgba(192,57,43,0.9)" />
        <text x="7" y="10" textAnchor="middle" dominantBaseline="middle" fontSize="6" fill="white" fontWeight="bold">!</text>
      </g>

      {/* Current location — pulsing rings */}
      <circle className="pulse-ring-outer" cx={currentX} cy={currentY} r="12" fill="none" stroke={modeColor} strokeWidth="1.5" opacity="0.4" />
      <circle className="pulse-ring" cx={currentX} cy={currentY} r="8" fill="none" stroke={modeColor} strokeWidth="2" opacity="0.7" />
      <circle cx={currentX} cy={currentY} r="5.5" fill={modeColor} />
      <circle cx={currentX} cy={currentY} r="2.5" fill="white" />

      {/* Labels */}
      <text x="28" y="186" fontSize="7" fill="rgba(255,255,255,0.5)" fontFamily="Manrope, sans-serif" fontWeight="600">YUKSOM</text>
      <text x="252" y="16" fontSize="7" fill="rgba(255,255,255,0.5)" fontFamily="Manrope, sans-serif" fontWeight="600">DZONGRI</text>

      {/* You are here label */}
      <rect x={currentX + 8} y={currentY - 10} width="42" height="13" rx="4" fill="#1A1A1A" opacity="0.92" />
      <text x={currentX + 29} y={currentY - 3} textAnchor="middle" dominantBaseline="middle" fontSize="6" fill="white" fontWeight="700" fontFamily="Manrope, sans-serif">YOU ARE HERE</text>
    </svg>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const LiveJourneyPage: React.FC<Props> = ({ onBack, onNavigate }) => {
  const [safetyMode, setSafetyMode] = useState<SafetyMode>("watch");
  const [aiConfidence] = useState<number>(68);
  const [safetyScore] = useState<number>(42);
  const [showSOS, setShowSOS] = useState<boolean>(false);
  const [sosCountdown, setSosCountdown] = useState<number>(5);
  const [sosPhase, setSosPhase] = useState<SosPhase>("idle");
  const [showGuardianCheck, setShowGuardianCheck] = useState<boolean>(
    safetyMode === "guardian"
  );
  const [riskExpanded, setRiskExpanded] = useState<boolean>(false);
  const [safetyConfirmed, setSafetyConfirmed] = useState<boolean>(false);

  // Guardian check visibility synced to mode
  useEffect(() => {
    if (safetyMode === "guardian") {
      setShowGuardianCheck(true);
    }
  }, [safetyMode]);

  // SOS countdown
  useEffect(() => {
    if (sosPhase !== "countdown") return;
    if (sosCountdown <= 0) {
      setSosPhase("creating");
      return;
    }
    const timer = setTimeout(() => {
      setSosCountdown((c) => c - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [sosPhase, sosCountdown]);

  // Auto-navigate after "creating" phase
  useEffect(() => {
    if (sosPhase !== "creating") return;
    const timer = setTimeout(() => {
      setSosPhase("active");
      setShowSOS(false);
      onNavigate("rescue-capsule");
    }, 2000);
    return () => clearTimeout(timer);
  }, [sosPhase, onNavigate]);

  const handleSOSPress = useCallback(() => {
    setSosPhase("confirm");
    setShowSOS(true);
  }, []);

  const handleSOSConfirm = useCallback(() => {
    setSosCountdown(5);
    setSosPhase("countdown");
  }, []);

  const handleSOSCancel = useCallback(() => {
    setSosPhase("idle");
    setShowSOS(false);
    setSosCountdown(5);
  }, []);

  const handleGuardianSafe = useCallback(() => {
    setShowGuardianCheck(false);
    setSafetyMode("nomad");
    setSafetyConfirmed(true);
    setTimeout(() => setSafetyConfirmed(false), 3000);
  }, []);

  const handleGuardianHelp = useCallback(() => {
    setShowGuardianCheck(false);
    onNavigate("rescue-capsule");
  }, [onNavigate]);

  const modeColor = MODE_COLORS[safetyMode];
  const modeBg = MODE_BG[safetyMode];
  const riskInfo = RISK_LEVEL[safetyMode];

  const riskFactors = [
    {
      name: "Route Deviation",
      impact: "+18 Risk Impact",
      desc: "You have moved outside your planned safe corridor",
    },
    {
      name: "Verified Hazard Nearby",
      impact: "+16 Risk Impact",
      desc: "You are approaching a verified hazard zone at S4",
    },
    {
      name: "Weak Connectivity",
      impact: "+8 Risk Impact",
      desc: "Location verification is currently limited",
    },
    {
      name: "Missed Check-In",
      impact: "+11 Risk Impact",
      desc: "Your scheduled safety check has not been completed",
    },
  ];

  const modes: SafetyMode[] = ["nomad", "watch", "guardian", "sentinel"];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111111",
        position: "relative",
        fontFamily: "Manrope, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* ── STICKY HEADER ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: "#0D0D0D",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "14px 16px 12px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            color: "rgba(255,255,255,0.6)",
            flexShrink: 0,
          }}
        >
          <ArrowLeft size={22} />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "Be Vietnam Pro, sans-serif",
              fontWeight: 700,
              fontSize: "17px",
              color: "#FFFFFF",
              lineHeight: 1.2,
            }}
          >
            Live Journey
          </div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginTop: "1px" }}>
            Yuksom → Dzongri
          </div>
        </div>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#E0362C",
            fontWeight: 700,
            fontSize: "13px",
            fontFamily: "Manrope, sans-serif",
            padding: "6px 10px",
            flexShrink: 0,
          }}
        >
          End Journey
        </button>
      </div>

      {/* ── SCROLLABLE CONTENT ── */}
      <div
        style={{
          padding: "16px 16px 120px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {/* ── SECTION A: LIVE SAFETY PULSE ── */}
        <div
          style={{
            background: "linear-gradient(160deg, #2A1500, #1A0A00, #0D0D0D)",
            borderRadius: "24px",
            border: "1px solid rgba(255,107,0,0.2)",
            padding: "20px",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              color: "rgba(255,255,255,0.6)",
              marginBottom: "14px",
              fontFamily: "Manrope, sans-serif",
              textTransform: "uppercase",
            }}
          >
            Live Safety Pulse
          </div>

          {/* Score + mode badge row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "12px",
              marginBottom: "4px",
            }}
          >
            <div style={{ lineHeight: 1 }}>
              <span
                style={{
                  fontFamily: "Be Vietnam Pro, sans-serif",
                  fontSize: "52px",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  lineHeight: 1,
                }}
              >
                {safetyScore}
              </span>
              <span
                style={{
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 500,
                  marginLeft: "2px",
                }}
              >
                /100
              </span>
            </div>
            <div style={{ paddingBottom: "8px" }}>
              <span
                style={{
                  background: "rgba(255,107,0,0.15)",
                  color: "#FF8C38",
                  borderRadius: "999px",
                  padding: "4px 12px",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                {MODE_LABELS[safetyMode]}
              </span>
            </div>
          </div>

          {/* Risk level */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "14px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: riskInfo.color,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>
              {riskInfo.label}
            </span>
          </div>

          {/* AI Confidence bar */}
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>AI Confidence</span>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#FFFFFF" }}>
                {aiConfidence}%
              </span>
            </div>
            <div
              style={{
                height: "5px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${aiConfidence}%`,
                  height: "100%",
                  background: "#FF6B00",
                  borderRadius: "999px",
                  transition: "width 0.6s ease",
                }}
              />
            </div>
          </div>

          {/* Mode pills */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {modes.map((m) => {
              const active = m === safetyMode;
              return (
                <button
                  key={m}
                  onClick={() => setSafetyMode(m)}
                  style={{
                    background: active ? MODE_BG[m] : "rgba(255,255,255,0.08)",
                    color: active ? MODE_COLORS[m] : "rgba(255,255,255,0.5)",
                    border: active
                      ? `1px solid ${MODE_COLORS[m]}40`
                      : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "999px",
                    padding: "5px 11px",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                    fontFamily: "Manrope, sans-serif",
                    transition: "all 0.2s",
                  }}
                >
                  {m.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── SECTION B: LIVE JOURNEY MAP ── */}
        <div
          style={{
            background: "#0D0D0D",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "20px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "14px",
            }}
          >
            <Compass size={18} color="#FF6B00" />
            <span
              style={{
                fontFamily: "Be Vietnam Pro, sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                color: "#FFFFFF",
              }}
            >
              Journey Map
            </span>
          </div>

          {/* SVG Map */}
          <JourneyMapSVG safetyMode={safetyMode} />

          {/* Journey stats */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginTop: "14px",
            }}
          >
            {[
              {
                top: "Route",
                content: (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                    }}
                  >
                    <span>Yuksom</span>
                    <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "9px" }}>→</span>
                    <span>Dzongri</span>
                  </div>
                ),
              },
              {
                top: "Next",
                content: (
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 800,
                      color: "#E0362C",
                      fontFamily: "Be Vietnam Pro, sans-serif",
                    }}
                  >
                    S4
                  </span>
                ),
              },
              {
                top: "Remaining",
                content: (
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 800,
                      color: "#FFFFFF",
                      fontFamily: "Be Vietnam Pro, sans-serif",
                    }}
                  >
                    4.2 km
                  </span>
                ),
              },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: "#1A1A1A",
                  borderRadius: "12px",
                  padding: "10px 8px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "9px",
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  {stat.top}
                </div>
                {stat.content}
              </div>
            ))}
          </div>

          {/* Outside safe corridor warning */}
          {(safetyMode === "watch" || safetyMode === "guardian" || safetyMode === "sentinel") && (
            <div
              style={{
                marginTop: "12px",
                background: "rgba(245,158,11,0.1)",
                border: "1px solid rgba(245,158,11,0.3)",
                borderRadius: "10px",
                padding: "10px 12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <AlertTriangle size={14} color="#F59E0B" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: "12px", color: "#F59E0B", fontWeight: 600 }}>
                Current Position: Outside safe corridor
              </span>
            </div>
          )}
        </div>

        {/* ── SECTION C: WHY RISK INCREASED (collapsible) ── */}
        <div
          style={{
            background: "#1A1A1A",
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.08)",
            overflow: "hidden",
          }}
        >
          <button
            onClick={() => setRiskExpanded((v) => !v)}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "18px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              textAlign: "left",
            }}
          >
            <span
              style={{
                fontFamily: "Be Vietnam Pro, sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                color: "#FFFFFF",
              }}
            >
              Why is risk increasing?
            </span>
            {riskExpanded ? (
              <ChevronDown size={18} color="rgba(255,255,255,0.6)" />
            ) : (
              <ChevronRight size={18} color="rgba(255,255,255,0.6)" />
            )}
          </button>

          {riskExpanded && (
            <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {riskFactors.map((factor, i) => (
                <div
                  key={i}
                  style={{
                    background: "#222222",
                    borderRadius: "12px",
                    padding: "13px 14px",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Be Vietnam Pro, sans-serif",
                        fontWeight: 700,
                        fontSize: "13px",
                        color: "#FFFFFF",
                      }}
                    >
                      {factor.name}
                    </span>
                    <span
                      style={{
                        background: "#E0362C",
                        color: "white",
                        borderRadius: "999px",
                        padding: "2px 9px",
                        fontSize: "10px",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {factor.impact}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.6)",
                      fontFamily: "Manrope, sans-serif",
                      lineHeight: 1.5,
                    }}
                  >
                    {factor.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── SECTION D: SHADOW CORRIDOR ── */}
        <div
          style={{
            background: "linear-gradient(135deg, #2A1500, #1A0A00)",
            borderRadius: "16px",
            border: "1px solid rgba(255,107,0,0.3)",
            padding: "18px 20px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "14px",
            }}
          >
            <Navigation size={18} color="rgba(255,255,255,0.8)" />
            <span
              style={{
                fontFamily: "Be Vietnam Pro, sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                color: "#FFFFFF",
              }}
            >
              Shadow Corridor
            </span>
          </div>

          {/* Primary route status */}
          <div
            style={{
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.25)",
              borderRadius: "10px",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "10px",
            }}
          >
            <AlertTriangle size={14} color="#F59E0B" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#F59E0B" }}>
              Primary Route: At Risk
            </span>
          </div>

          {/* Arrow + alternative */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              marginBottom: "14px",
            }}
          >
            <div style={{ fontSize: "20px", color: "rgba(255,255,255,0.6)", lineHeight: 1 }}>↓</div>
            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px",
                padding: "10px 14px",
                width: "100%",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#FFFFFF" }}>
                Shadow Corridor Available
              </span>
            </div>
          </div>

          {/* Checkpoint info */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", marginBottom: "2px" }}>
                Next Checkpoint
              </div>
              <div
                style={{
                  fontFamily: "Be Vietnam Pro, sans-serif",
                  fontWeight: 800,
                  fontSize: "16px",
                  color: "#FFFFFF",
                }}
              >
                S4
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", marginBottom: "2px" }}>
                Distance
              </div>
              <div
                style={{
                  fontFamily: "Be Vietnam Pro, sans-serif",
                  fontWeight: 800,
                  fontSize: "16px",
                  color: "#FFFFFF",
                }}
              >
                1.6 km
              </div>
            </div>
          </div>

          {/* CTA button */}
          <button
            style={{
              width: "100%",
              background: "#FF6B00",
              border: "none",
              borderRadius: "12px",
              padding: "14px",
              color: "white",
              fontFamily: "Be Vietnam Pro, sans-serif",
              fontWeight: 800,
              fontSize: "14px",
              letterSpacing: "0.05em",
              cursor: "pointer",
              textTransform: "uppercase",
            }}
          >
            Start Offline Guidance
          </button>
        </div>
      </div>

      {/* ── FLOATING SOS BUTTON ── */}
      <button
        onClick={handleSOSPress}
        style={{
          position: "fixed",
          bottom: "90px",
          right: "20px",
          zIndex: 40,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "#E0362C",
          border: "none",
          cursor: "pointer",
          color: "white",
          fontFamily: "Be Vietnam Pro, sans-serif",
          fontWeight: 800,
          fontSize: "15px",
          letterSpacing: "0.04em",
          boxShadow: "0 4px 20px rgba(224,54,44,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        SOS
      </button>

      {/* ── GUARDIAN SAFETY CHECK OVERLAY ── */}
      {showGuardianCheck && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 16px",
          }}
        >
          <div
            style={{
              background: "linear-gradient(160deg, #2A1500, #0D0D0D)",
              borderRadius: "24px",
              border: "1px solid rgba(255,107,0,0.3)",
              padding: "28px 24px",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            {/* Shield icon header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Shield size={22} color="rgba(255,255,255,0.9)" />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "Be Vietnam Pro, sans-serif",
                    fontWeight: 800,
                    fontSize: "15px",
                    color: "#FFFFFF",
                  }}
                >
                  TRINETRA Safety Check
                </div>
              </div>
            </div>

            <p
              style={{
                margin: "0 0 6px",
                fontSize: "13px",
                color: "rgba(255,255,255,0.7)",
                fontFamily: "Manrope, sans-serif",
                lineHeight: 1.5,
              }}
            >
              TRINETRA has detected multiple safety concerns.
            </p>
            <p
              style={{
                margin: "0 0 20px",
                fontSize: "13px",
                color: "rgba(255,255,255,0.7)",
                fontFamily: "Manrope, sans-serif",
                lineHeight: 1.5,
              }}
            >
              You are outside your planned journey corridor and your risk
              indicators are increasing.
            </p>

            <div
              style={{
                fontFamily: "Be Vietnam Pro, sans-serif",
                fontWeight: 800,
                fontSize: "22px",
                color: "#FFFFFF",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Are you safe?
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                onClick={handleGuardianSafe}
                style={{
                  width: "100%",
                  background: "#4CAF7D",
                  border: "none",
                  borderRadius: "14px",
                  padding: "16px",
                  color: "white",
                  fontFamily: "Be Vietnam Pro, sans-serif",
                  fontWeight: 800,
                  fontSize: "15px",
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                }}
              >
                YES, I'M SAFE
              </button>
              <button
                onClick={handleGuardianHelp}
                style={{
                  width: "100%",
                  background: "#E0362C",
                  border: "none",
                  borderRadius: "14px",
                  padding: "16px",
                  color: "white",
                  fontFamily: "Be Vietnam Pro, sans-serif",
                  fontWeight: 800,
                  fontSize: "15px",
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                }}
              >
                NO, I NEED HELP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── SOS MODAL ── */}
      {showSOS && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              background: "#1A1A1A",
              borderRadius: "24px 24px 0 0",
              padding: "28px 24px 40px",
              width: "100%",
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            {/* Phase: confirm */}
            {sosPhase === "confirm" && (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Be Vietnam Pro, sans-serif",
                      fontWeight: 800,
                      fontSize: "20px",
                      color: "#FFFFFF",
                      flex: 1,
                      paddingRight: "12px",
                    }}
                  >
                    Do you need emergency help?
                  </div>
                  <button
                    onClick={handleSOSCancel}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "rgba(255,255,255,0.6)",
                      flexShrink: 0,
                    }}
                  >
                    <X size={20} />
                  </button>
                </div>
                <p
                  style={{
                    margin: "0 0 24px",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: "Manrope, sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  Confirming SOS will alert emergency services and your designated contacts with your current location and journey details.
                </p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={handleSOSCancel}
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "2px solid rgba(255,255,255,0.4)",
                      borderRadius: "12px",
                      padding: "14px",
                      color: "rgba(255,255,255,0.6)",
                      fontFamily: "Be Vietnam Pro, sans-serif",
                      fontWeight: 700,
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handleSOSConfirm}
                    style={{
                      flex: 1.5,
                      background: "#E0362C",
                      border: "none",
                      borderRadius: "12px",
                      padding: "14px",
                      color: "white",
                      fontFamily: "Be Vietnam Pro, sans-serif",
                      fontWeight: 800,
                      fontSize: "14px",
                      cursor: "pointer",
                      letterSpacing: "0.04em",
                    }}
                  >
                    CONFIRM SOS
                  </button>
                </div>
              </>
            )}

            {/* Phase: countdown */}
            {sosPhase === "countdown" && (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div
                  style={{
                    fontSize: "80px",
                    fontFamily: "Be Vietnam Pro, sans-serif",
                    fontWeight: 900,
                    color: "#E0362C",
                    lineHeight: 1,
                    marginBottom: "12px",
                  }}
                >
                  {sosCountdown}
                </div>
                <div
                  style={{
                    fontFamily: "Be Vietnam Pro, sans-serif",
                    fontWeight: 700,
                    fontSize: "18px",
                    color: "#FFFFFF",
                    marginBottom: "24px",
                  }}
                >
                  SOS activating in {sosCountdown} second{sosCountdown !== 1 ? "s" : ""}...
                </div>
                <button
                  onClick={handleSOSCancel}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    textDecoration: "underline",
                    letterSpacing: "0.02em",
                  }}
                >
                  TAP TO CANCEL
                </button>
              </div>
            )}

            {/* Phase: creating */}
            {sosPhase === "creating" && (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                {/* Spinner */}
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    border: "4px solid rgba(224,54,44,0.2)",
                    borderTopColor: "#E0362C",
                    margin: "0 auto 20px",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <div
                  style={{
                    fontFamily: "Be Vietnam Pro, sans-serif",
                    fontWeight: 800,
                    fontSize: "18px",
                    color: "#FFFFFF",
                    marginBottom: "8px",
                  }}
                >
                  Creating Rescue Capsule...
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: "Manrope, sans-serif",
                  }}
                >
                  Preparing your emergency package
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── SAFETY CONFIRMED TOAST ── */}
      {safetyConfirmed && (
        <div
          style={{
            position: "fixed",
            bottom: "160px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 60,
            background: "#4CAF7D",
            color: "white",
            borderRadius: "12px",
            padding: "12px 20px",
            fontFamily: "Manrope, sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 16px rgba(76,175,125,0.35)",
          }}
        >
          Safety confirmation received
        </div>
      )}
    </div>
  );
};

export default LiveJourneyPage;
