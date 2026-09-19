import { useState, useEffect } from "react";
import {
  ArrowLeft,
  WifiOff,
  Wifi,
  Shield,
  Radio,
  Clock,
  AlertTriangle,
  Navigation,
  CheckCircle,
  X,
  RefreshCw,
  Database,
  Map,
  FileText,
} from "lucide-react";

interface SurvivalModePageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

interface OfflineEvent {
  id: number;
  name: string;
  time: string;
  icon: React.ReactNode;
  urgent?: boolean;
}

const offlineEvents: OfflineEvent[] = [
  {
    id: 1,
    name: "Location update saved",
    time: "09:14",
    icon: <Clock size={16} color="rgba(255,255,255,0.6)" />,
  },
  {
    id: 2,
    name: "Hazard interaction recorded",
    time: "09:22",
    icon: <AlertTriangle size={16} color="rgba(255,255,255,0.6)" />,
  },
  {
    id: 3,
    name: "Safety check pending sync",
    time: "09:31",
    icon: <Shield size={16} color="rgba(255,255,255,0.6)" />,
  },
  {
    id: 4,
    name: "Emergency event queued",
    time: "09:44",
    icon: <Radio size={16} color="#E0362C" />,
    urgent: true,
  },
];

interface StatusItem {
  icon: React.ReactNode;
  name: string;
  status: string;
  statusColor: string;
  statusBg: string;
}

export function SurvivalModePage({ onBack, onNavigate }: SurvivalModePageProps) {
  const [isConnectivityRestored, setIsConnectivityRestored] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [showSyncAnimation, setShowSyncAnimation] = useState(false);
  const [syncComplete, setSyncComplete] = useState(false);

  useEffect(() => {
    if (isConnectivityRestored) {
      setShowSyncAnimation(true);
      setSyncProgress(0);
      setSyncComplete(false);

      const interval = setInterval(() => {
        setSyncProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setSyncComplete(true);
            return 100;
          }
          return prev + 5;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isConnectivityRestored]);

  const statusItems: StatusItem[] = [
    {
      icon: <Shield size={14} color="#4CAF7D" />,
      name: "TRINETRA Core",
      status: "ACTIVE",
      statusColor: "#4CAF7D",
      statusBg: "rgba(76,175,125,0.12)",
    },
    {
      icon: <FileText size={14} color="#4CAF7D" />,
      name: "Journey Contract",
      status: "CACHED",
      statusColor: "#4CAF7D",
      statusBg: "rgba(76,175,125,0.12)",
    },
    {
      icon: <AlertTriangle size={14} color="#4CAF7D" />,
      name: "Hazard Pack",
      status: "CACHED",
      statusColor: "#4CAF7D",
      statusBg: "rgba(76,175,125,0.12)",
    },
    {
      icon: <Map size={14} color="#4CAF7D" />,
      name: "Offline Map",
      status: "AVAILABLE",
      statusColor: "#4CAF7D",
      statusBg: "rgba(76,175,125,0.12)",
    },
    {
      icon: <Navigation size={14} color="#4CAF7D" />,
      name: "Shadow Corridor",
      status: "AVAILABLE",
      statusColor: "#4CAF7D",
      statusBg: "rgba(76,175,125,0.12)",
    },
    {
      icon: <Shield size={14} color="#4CAF7D" />,
      name: "Safety Pass",
      status: "AVAILABLE",
      statusColor: "#4CAF7D",
      statusBg: "rgba(76,175,125,0.12)",
    },
    {
      icon: <Radio size={14} color="#4CAF7D" />,
      name: "Emergency Queue",
      status: "ACTIVE",
      statusColor: "#4CAF7D",
      statusBg: "rgba(76,175,125,0.12)",
    },
    {
      icon: <Database size={14} color="#F59E0B" />,
      name: "Cloud Sync",
      status: "UNAVAILABLE",
      statusColor: "#F59E0B",
      statusBg: "rgba(245,158,11,0.12)",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#111111",
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "#0D0D0D",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              display: "flex",
              alignItems: "center",
            }}
          >
            <ArrowLeft size={20} color="rgba(255,255,255,0.7)" />
          </button>
          <div>
            <div
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: 700,
                fontSize: 17,
                color: "#FFFFFF",
                lineHeight: 1.2,
              }}
            >
              Survival Mode
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 1 }}>
              Network Status
            </div>
          </div>
        </div>

        {/* Status pill */}
        {isConnectivityRestored ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              backgroundColor: "rgba(76,175,125,0.1)",
              border: "1px solid rgba(76,175,125,0.3)",
              borderRadius: 999,
              padding: "5px 12px",
            }}
          >
            <Wifi size={12} color="#4CAF7D" />
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#4CAF7D",
                letterSpacing: "0.05em",
              }}
            >
              CONNECTED
            </span>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              backgroundColor: "rgba(224,54,44,0.12)",
              border: "1px solid rgba(224,54,44,0.3)",
              borderRadius: 999,
              padding: "5px 12px",
            }}
          >
            <WifiOff size={12} color="#E0362C" />
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#E0362C",
                letterSpacing: "0.05em",
              }}
            >
              OFFLINE
            </span>
          </div>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* TOP BANNER */}
        {isConnectivityRestored ? (
          <div
            style={{
              backgroundColor: "rgba(76,175,125,0.1)",
              border: "1px solid rgba(76,175,125,0.3)",
              borderRadius: 20,
              padding: 24,
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 999,
                backgroundColor: "rgba(76,175,125,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <Wifi size={28} color="#4CAF7D" />
            </div>
            <div
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: 700,
                fontSize: 20,
                color: "#4CAF7D",
                letterSpacing: "0.04em",
                marginBottom: 4,
              }}
            >
              CONNECTIVITY RESTORED
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#4CAF7D",
                marginBottom: 16,
              }}
            >
              {syncComplete ? "4 Events Successfully Synced" : "Synchronizing Offline Events..."}
            </div>

            {/* Progress bar */}
            {!syncComplete && (
              <div>
                <div
                  style={{
                    height: 8,
                    backgroundColor: "#222222",
                    borderRadius: 999,
                    overflow: "hidden",
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${syncProgress}%`,
                      backgroundColor: "#4CAF7D",
                      borderRadius: 999,
                      transition: "width 0.1s linear",
                    }}
                  />
                </div>
                <div style={{ fontSize: 12, color: "#4CAF7D", textAlign: "right" }}>
                  {syncProgress}%
                </div>
              </div>
            )}

            {syncComplete && (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {offlineEvents.map((ev) => (
                  <div
                    key={ev.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      backgroundColor: "rgba(76,175,125,0.1)",
                      borderRadius: 10,
                      padding: "7px 12px",
                    }}
                  >
                    <CheckCircle size={14} color="#4CAF7D" />
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>
                      {ev.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "rgba(224,54,44,0.12)",
              border: "1px solid rgba(224,54,44,0.3)",
              borderRadius: 20,
              padding: 24,
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 999,
                backgroundColor: "rgba(224,54,44,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <WifiOff size={28} color="#E0362C" />
            </div>
            <div
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: 700,
                fontSize: 22,
                color: "#E0362C",
                letterSpacing: "0.04em",
                marginBottom: 4,
              }}
            >
              NETWORK LOST
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#E0362C",
                marginBottom: 12,
                letterSpacing: "0.02em",
              }}
            >
              SURVIVAL MODE ACTIVE
            </div>
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.6,
                margin: 0,
                maxWidth: 300,
                marginInline: "auto",
              }}
            >
              TRINETRA continues monitoring your journey locally. Your essential
              safety information remains available even without internet access.
            </p>
          </div>
        )}

        {/* SYSTEM STATUS CARDS */}
        <div>
          <div
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "#FFFFFF",
              marginBottom: 12,
            }}
          >
            System Status
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
            }}
          >
            {statusItems.map((item, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#1A1A1A",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14,
                  padding: "12px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {item.icon}
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#FFFFFF",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.name}
                  </span>
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    alignSelf: "flex-start",
                    backgroundColor: item.statusBg,
                    borderRadius: 999,
                    padding: "2px 8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: item.statusColor,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OFFLINE EVENTS */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: "#FFFFFF",
              }}
            >
              Offline Activity
            </div>
            <div
              style={{
                backgroundColor: "rgba(245,158,11,0.15)",
                borderRadius: 999,
                padding: "3px 10px",
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: "#F59E0B" }}>
                4 Events Waiting to Sync
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {offlineEvents.map((ev) => (
              <div
                key={ev.id}
                style={{
                  backgroundColor: "#1A1A1A",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderLeft: ev.urgent
                    ? "3px solid #E0362C"
                    : "3px solid #F59E0B",
                  borderRadius: 16,
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 999,
                      backgroundColor: ev.urgent
                        ? "rgba(224,54,44,0.12)"
                        : "rgba(245,158,11,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {ev.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: ev.urgent ? "#E0362C" : "#FFFFFF",
                        marginBottom: 2,
                      }}
                    >
                      {ev.name}
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{ev.time}</div>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: ev.urgent
                      ? "rgba(224,54,44,0.15)"
                      : "rgba(245,158,11,0.12)",
                    borderRadius: 999,
                    padding: "3px 9px",
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: ev.urgent ? "#E0362C" : "#C49A3C",
                      letterSpacing: "0.03em",
                    }}
                  >
                    Pending Sync
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SHADOW CORRIDOR SECTION */}
        <div
          style={{
            background: "linear-gradient(135deg, #2A1500, #1A0A00)",
            border: "1px solid rgba(255,107,0,0.3)",
            borderRadius: 20,
            padding: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
            }}
          >
            <Navigation size={18} color="rgba(255,255,255,0.8)" />
            <div
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: "#FFFFFF",
              }}
            >
              Shadow Corridor
            </div>
          </div>

          {/* Primary route unavailable */}
          <div
            style={{
              backgroundColor: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.3)",
              borderRadius: 12,
              padding: "10px 14px",
              marginBottom: 10,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: "#F59E0B", letterSpacing: "0.04em", marginBottom: 2 }}>
              PRIMARY ROUTE
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
              Unavailable due to identified hazard.
            </div>
          </div>

          {/* Arrow */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M3 8l4 4 4-4" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Shadow corridor available */}
          <div
            style={{
              backgroundColor: "rgba(76,175,125,0.12)",
              border: "1px solid rgba(76,175,125,0.25)",
              borderRadius: 12,
              padding: "10px 14px",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#4CAF7D",
                letterSpacing: "0.04em",
                marginBottom: 4,
              }}
            >
              SHADOW CORRIDOR AVAILABLE
            </div>
            <div style={{ fontSize: 12, color: "#FFFFFF", fontWeight: 500 }}>
              Next Safe Checkpoint: S4 — Distance: 1.6 km
            </div>
          </div>

          <button
            onClick={() => onNavigate("shadow-corridor")}
            style={{
              width: "100%",
              padding: "13px",
              backgroundColor: "#FF6B00",
              border: "none",
              borderRadius: 12,
              cursor: "pointer",
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              color: "white",
              letterSpacing: "0.04em",
            }}
          >
            START OFFLINE GUIDANCE
          </button>
        </div>

        {/* DEMO CONTROL */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 16,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {!isConnectivityRestored ? (
            <button
              onClick={() => setIsConnectivityRestored(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                color: "#FF6B00",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
              }}
            >
              <RefreshCw size={13} color="#FF6B00" />
              Simulate: Restore Connectivity
            </button>
          ) : (
            <button
              onClick={() => {
                setIsConnectivityRestored(false);
                setSyncProgress(0);
                setShowSyncAnimation(false);
                setSyncComplete(false);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                color: "rgba(255,255,255,0.55)",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
              }}
            >
              <X size={13} color="#6B6B9A" />
              Reset to Offline
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
