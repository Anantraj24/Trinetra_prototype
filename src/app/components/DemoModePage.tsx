import React, { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  AlertTriangle,
  WifiOff,
  Wifi,
  Clock,
  Shield,
  Radio,
  RefreshCw,
  ChevronRight,
  Activity,
  Terminal,
} from "lucide-react";

interface DemomodePageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

type Mode = "nomad" | "watch" | "guardian" | "sentinel";

interface ModeConfig {
  label: string;
  color: string;
  bg: string;
  aiConfidence: number;
  safetyScore: number;
}

const modeConfig: Record<Mode, ModeConfig> = {
  nomad: {
    label: "NOMAD MODE",
    color: "#4CAF7D",
    bg: "rgba(76,175,125,0.12)",
    aiConfidence: 91,
    safetyScore: 91,
  },
  watch: {
    label: "WATCH MODE",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.12)",
    aiConfidence: 68,
    safetyScore: 42,
  },
  guardian: {
    label: "GUARDIAN MODE",
    color: "#E05A2B",
    bg: "rgba(224,90,43,0.12)",
    aiConfidence: 42,
    safetyScore: 28,
  },
  sentinel: {
    label: "SENTINEL MODE",
    color: "#E0362C",
    bg: "rgba(224,54,44,0.12)",
    aiConfidence: 18,
    safetyScore: 12,
  },
};

const allModes: Mode[] = ["nomad", "watch", "guardian", "sentinel"];

function mockTime(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
}

export function DemoModePage({ onBack, onNavigate }: DemomodePageProps) {
  const [currentMode, setCurrentMode] = useState<Mode>("nomad");
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const appendLog = (msg: string) => {
    setSimulationLog((prev) => [`[${mockTime()}] ${msg}`, ...prev].slice(0, 8));
  };

  const config = modeConfig[currentMode];

  const scenarios = [
    {
      id: "route-deviation",
      icon: <MapPin size={18} color="#7B6FD8" />,
      name: "Route Deviation",
      desc: "Simulate moving 1.2km off planned route",
      onClick: () => {
        appendLog("Route deviation detected — 1.2 km from planned path.");
        setCurrentMode("watch");
        setActiveScenario("route-deviation");
        setIsSimulating(true);
      },
    },
    {
      id: "approach-hazard",
      icon: <AlertTriangle size={18} color="#C4713A" />,
      name: "Approach Hazard",
      desc: "Enter verified hazard zone boundary",
      onClick: () => {
        appendLog("Hazard zone boundary entered — elevation risk detected.");
        if (currentMode === "watch") setCurrentMode("guardian");
        setActiveScenario("approach-hazard");
        setIsSimulating(true);
      },
    },
    {
      id: "lose-connectivity",
      icon: <WifiOff size={18} color="rgba(255,255,255,0.5)" />,
      name: "Lose Connectivity",
      desc: "Drop network connection",
      onClick: () => {
        appendLog("Network connection lost — switching to offline survival mode.");
        onNavigate("survival-mode");
      },
    },
    {
      id: "simulate-inactivity",
      icon: <Clock size={18} color="#7B6FD8" />,
      name: "Simulate Inactivity",
      desc: "30 min with no device movement",
      onClick: () => {
        appendLog("Inactivity timer triggered — no movement for 30 minutes.");
        setIsSimulating(true);
      },
    },
    {
      id: "miss-safety-check",
      icon: <Shield size={18} color="#C49A3C" />,
      name: "Miss Safety Check",
      desc: "Scheduled check-in not completed",
      onClick: () => {
        appendLog("Scheduled safety check-in missed — escalating risk level.");
        if (currentMode === "watch") setCurrentMode("guardian");
        setActiveScenario("miss-safety-check");
        setIsSimulating(true);
      },
    },
    {
      id: "trigger-sos",
      icon: <Radio size={18} color="#E0362C" />,
      name: "Trigger SOS",
      desc: "Manually trigger emergency protocol",
      onClick: () => {
        appendLog("SOS triggered — activating Rescue Capsule protocol.");
        onNavigate("rescue-capsule");
      },
    },
    {
      id: "restore-connectivity",
      icon: <Wifi size={18} color="#5B8A5C" />,
      name: "Restore Connectivity",
      desc: "Restore network connection",
      onClick: () => {
        appendLog("Network restored — re-syncing with TRINETRA servers.");
        onNavigate("survival-mode");
      },
    },
    {
      id: "reset-scenario",
      icon: <RefreshCw size={18} color="rgba(255,255,255,0.4)" />,
      name: "Reset Scenario",
      desc: "Reset all risk to Nomad state",
      isReset: true,
      onClick: () => {
        setCurrentMode("nomad");
        setActiveScenario(null);
        setIsSimulating(false);
        setSimulationLog([]);
      },
    },
  ];

  const modeOrder: Mode[] = ["nomad", "watch", "guardian", "sentinel"];
  const modeColors: Record<Mode, string> = {
    nomad: "#4CAF7D",
    watch: "#F59E0B",
    guardian: "#E05A2B",
    sentinel: "#E0362C",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#111111",
        fontFamily: "Manrope, sans-serif",
        paddingBottom: "40px",
      }}
    >
      <style>{`
        @keyframes blink-badge {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        .blink-live {
          animation: blink-badge 1.2s ease-in-out infinite;
        }
      `}</style>

      {/* Sticky Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "#0D0D0D",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "14px 20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ArrowLeft size={22} color="rgba(255,255,255,0.8)" />
          </button>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: 700,
                fontSize: "17px",
                color: "#FFFFFF",
              }}
            >
              Demo Mode
            </div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", marginTop: "1px" }}>
              SIH 2024 Prototype
            </div>
          </div>
          <span
            style={{
              backgroundColor: "rgba(255,140,56,0.15)",
              color: "#FF8C38",
              fontSize: "11px",
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: "20px",
              letterSpacing: "0.5px",
            }}
          >
            DEMO
          </span>
        </div>
      </div>

      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: "16px" }}>

        {/* Warning Banner */}
        <div
          style={{
            backgroundColor: "rgba(255,107,0,0.1)",
            border: "1px solid #FF8C38",
            borderRadius: "14px",
            padding: "14px 16px",
            display: "flex",
            gap: "10px",
            alignItems: "flex-start",
          }}
        >
          <AlertTriangle size={16} color="#FF8C38" style={{ marginTop: "1px", flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: "12px", color: "#FF8C38", lineHeight: "1.55" }}>
            This panel is for demonstration purposes only. It does not appear in
            the tourist-facing experience.
          </p>
        </div>

        {/* Current State Display — HERO GRADIENT */}
        <div
          style={{
            background: "linear-gradient(160deg, #2A1500, #1A0A00, #0D0D0D)",
            borderRadius: "24px",
            padding: "22px",
            border: "1px solid rgba(255,107,0,0.2)",
            boxShadow: "0 2px 16px rgba(0,0,0,0.6)",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "1px",
              marginBottom: "8px",
            }}
          >
            CURRENT STATE
          </div>

          <div
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 800,
              fontSize: "26px",
              color: "#FFFFFF",
              marginBottom: "16px",
            }}
          >
            {config.label}
          </div>

          {/* AI Confidence + Safety Score */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            {[
              { label: "AI Confidence", value: config.aiConfidence },
              { label: "Safety Score", value: config.safetyScore },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  backgroundColor: "rgba(255,107,0,0.1)",
                  borderRadius: "12px",
                  padding: "12px",
                }}
              >
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", fontWeight: 600, marginBottom: "4px" }}>
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontWeight: 700,
                    fontSize: "20px",
                    color: config.color,
                  }}
                >
                  {item.value}
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
                    /100
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Mode Pills */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {allModes.map((m) => {
              const isActive = m === currentMode;
              const mc = modeConfig[m];
              return (
                <div
                  key={m}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "20px",
                    fontSize: "11px",
                    fontWeight: 700,
                    backgroundColor: isActive ? mc.color : "rgba(255,255,255,0.08)",
                    color: isActive ? "white" : "rgba(255,255,255,0.6)",
                    border: isActive
                      ? `1px solid ${mc.color}`
                      : "1px solid transparent",
                    transition: "all 0.2s ease",
                  }}
                >
                  {m.toUpperCase()}
                </div>
              );
            })}
          </div>
        </div>

        {/* Simulation Controls */}
        <div>
          <div
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              color: "#FFFFFF",
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Activity size={16} color="#FF6B00" />
            Simulate Risk Scenarios
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={scenario.onClick}
                style={{
                  backgroundColor: "#1A1B4B",
                  border: "1px solid rgba(123,111,216,0.15)",
                  borderRadius: "14px",
                  padding: "14px",
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  boxShadow: "0 2px 16px rgba(20,21,63,0.3)",
                  transition: "background-color 0.15s ease",
                }}
              >
                <div>{scenario.icon}</div>
                <div
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontWeight: 700,
                    fontSize: "12px",
                    color: (scenario as any).isReset ? "rgba(255,255,255,0.4)" : "#FFFFFF",
                    lineHeight: "1.3",
                  }}
                >
                  {scenario.name}
                </div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", lineHeight: "1.4" }}>
                  {scenario.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Escalation Flow Visualization */}
        <div
          style={{
            backgroundColor: "#1A1B4B",
            borderRadius: "16px",
            padding: "20px",
            border: "1px solid rgba(123,111,216,0.15)",
            boxShadow: "0 2px 16px rgba(20,21,63,0.3)",
          }}
        >
          <div
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              color: "#FFFFFF",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Terminal size={15} color="#7B6FD8" />
            Risk Escalation Flow
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              flexWrap: "wrap",
            }}
          >
            {modeOrder.map((m, i) => {
              const isActive = m === currentMode;
              const isPast =
                modeOrder.indexOf(m) < modeOrder.indexOf(currentMode);
              const isFuture =
                modeOrder.indexOf(m) > modeOrder.indexOf(currentMode);
              return (
                <React.Fragment key={m}>
                  <div
                    style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: 700,
                      backgroundColor: isActive
                        ? "#7B6FD8"
                        : isPast
                        ? "#21266A"
                        : "rgba(255,255,255,0.15)",
                      color: isActive ? "white" : isPast ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)",
                      border: isActive
                        ? "2px solid #7B6FD8"
                        : "2px solid transparent",
                      transition: "all 0.25s ease",
                    }}
                  >
                    {m.toUpperCase()}
                  </div>
                  {i < modeOrder.length - 1 && (
                    <ChevronRight size={13} color="rgba(255,255,255,0.4)" />
                  )}
                </React.Fragment>
              );
            })}
            <ChevronRight size={13} color="rgba(255,255,255,0.4)" />
            <div
              style={{
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "11px",
                fontWeight: 700,
                backgroundColor: "rgba(224,54,44,0.12)",
                color: "#E0362C",
              }}
            >
              RESCUE
            </div>
          </div>

          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", margin: "12px 0 0", lineHeight: "1.5" }}>
            Risk levels escalate automatically based on AI analysis. The active
            step is highlighted.
          </p>
        </div>

        {/* Simulation Log */}
        <div
          style={{
            backgroundColor: "#1A1B4B",
            borderRadius: "16px",
            padding: "20px",
            border: "1px solid rgba(123,111,216,0.15)",
            boxShadow: "0 2px 16px rgba(20,21,63,0.3)",
          }}
        >
          <div
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              color: "#FFFFFF",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Terminal size={15} color="#7B6FD8" />
            Simulation Log
            <span
              className="blink-live"
              style={{
                marginLeft: "auto",
                fontSize: "10px",
                fontWeight: 700,
                backgroundColor: "#E0362C",
                color: "white",
                padding: "2px 8px",
                borderRadius: "20px",
                letterSpacing: "0.5px",
              }}
            >
              LIVE
            </span>
          </div>

          <div
            style={{
              maxHeight: "220px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "0",
            }}
          >
            {simulationLog.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "28px 0",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "13px",
                }}
              >
                No events yet. Start a simulation.
              </div>
            ) : (
              simulationLog.map((entry, i) => (
                <div
                  key={i}
                  style={{
                    padding: "10px 0",
                    borderBottom:
                      i < simulationLog.length - 1
                        ? "1px solid rgba(123,111,216,0.2)"
                        : "none",
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: i === 0 ? config.color : "rgba(255,255,255,0.15)",
                      marginTop: "5px",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#7B6FD8",
                      lineHeight: "1.5",
                      fontFamily: "monospace",
                    }}
                  >
                    {entry}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
