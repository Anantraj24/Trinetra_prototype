import React, { useState } from "react";
import {
  ArrowLeft,
  Radio,
  Clock,
  CheckCircle,
  AlertTriangle,
  MapPin,
  Shield,
  Phone,
  User,
  ChevronRight,
} from "lucide-react";

interface EmergencyStatusPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const timelineSteps = [
  { id: 1, label: "INCIDENT CREATED", time: "18:47", status: "completed" },
  { id: 2, label: "EMERGENCY RECEIVED", time: "18:48", status: "completed" },
  { id: 3, label: "RESPONDER ASSIGNED", time: "18:51", status: "current" },
  { id: 4, label: "RESCUE IN PROGRESS", time: "Pending", status: "pending" },
  { id: 5, label: "RESOLVED", time: "Pending", status: "pending" },
];

const liveUpdates = [
  { time: "18:51", message: "Responder MR-04 dispatched from base camp" },
  {
    time: "18:49",
    message: "Emergency coordinates transmitted to rescue network",
  },
  { time: "18:47", message: "Rescue Capsule INC-A72851 created" },
];

export function EmergencyStatusPage({
  onBack,
  onNavigate,
}: EmergencyStatusPageProps) {
  const [, setTick] = useState(0);

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
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.35); }
        }
        .pulsing-dot {
          animation: pulse-dot 1.4s ease-in-out infinite;
        }
      `}</style>

      {/* Sticky Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "#0D0D0D",
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
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
            }}
          >
            <ArrowLeft size={22} color="#FFFFFF" />
          </button>
          <span
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              color: "#FFFFFF",
              flex: 1,
            }}
          >
            Emergency Status
          </span>
          <span
            style={{
              backgroundColor: "#E0362C",
              color: "white",
              fontSize: "11px",
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: "20px",
              letterSpacing: "0.5px",
            }}
          >
            EMERGENCY ACTIVE
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Radio size={13} color="rgba(255,255,255,0.6)" />
          <span
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.6)",
              fontFamily: "Manrope, sans-serif",
            }}
          >
            Incident ID:{" "}
            <span style={{ color: "#FFFFFF", fontWeight: 600 }}>
              INC-A72851
            </span>
          </span>
        </div>
      </div>

      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Top Status Card */}
        <div
          style={{
            backgroundColor: "#1A1A1A",
            borderRadius: "24px",
            padding: "22px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderLeftWidth: "4px",
            borderLeftColor: "#E0362C",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "1px",
              marginBottom: "6px",
            }}
          >
            CURRENT STATUS
          </div>
          <div
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 800,
              fontSize: "22px",
              color: "#4CAF7D",
              marginBottom: "16px",
            }}
          >
            RESPONDER ASSIGNED
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <User size={15} color="rgba(255,255,255,0.6)" />
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
                  Responder
                </span>
              </div>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#FFFFFF",
                }}
              >
                Mountain Rescue MR-04
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Clock size={15} color="rgba(255,255,255,0.6)" />
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
                  Estimated Arrival
                </span>
              </div>
              <span
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontWeight: 800,
                  fontSize: "20px",
                  color: "#E0362C",
                }}
              >
                11 Minutes
              </span>
            </div>
          </div>

          {/* Recommended Action */}
          <div
            style={{
              backgroundColor: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.35)",
              borderRadius: "12px",
              padding: "14px",
              display: "flex",
              gap: "10px",
              alignItems: "flex-start",
            }}
          >
            <AlertTriangle size={16} color="#F59E0B" style={{ marginTop: "1px", flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: "13px", color: "#F59E0B", lineHeight: "1.5" }}>
              Remain near <strong>Safe Checkpoint S4</strong>. Do not attempt to
              move until responder makes contact.
            </p>
          </div>
        </div>

        {/* Rescue Timeline */}
        <div
          style={{
            backgroundColor: "#1A1A1A",
            borderRadius: "24px",
            padding: "22px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              color: "#FFFFFF",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Radio size={17} color="#FF6B00" />
            Rescue Timeline
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {timelineSteps.map((step, index) => {
              const isLast = index === timelineSteps.length - 1;
              const isCompleted = step.status === "completed";
              const isCurrent = step.status === "current";
              const isPending = step.status === "pending";

              const circleColor = isCompleted
                ? "#4CAF7D"
                : isCurrent
                ? "#FF6B00"
                : "#222222";

              return (
                <div key={step.id} style={{ display: "flex", gap: "14px" }}>
                  {/* Left indicator column */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "20px",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        backgroundColor: circleColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "2px",
                        flexShrink: 0,
                      }}
                      className={isCurrent ? "pulsing-dot" : ""}
                    >
                      {isCompleted && (
                        <CheckCircle size={11} color="white" />
                      )}
                    </div>
                    {!isLast && (
                      <div
                        style={{
                          width: "2px",
                          flex: 1,
                          minHeight: "28px",
                          backgroundColor: isCompleted ? "#4CAF7D" : "rgba(255,255,255,0.08)",
                          margin: "4px 0",
                        }}
                      />
                    )}
                  </div>

                  {/* Step content */}
                  <div style={{ paddingBottom: isLast ? "0" : "16px", flex: 1 }}>
                    <div
                      style={{
                        fontWeight: isCurrent ? 700 : 600,
                        fontSize: "13px",
                        color: isPending ? "rgba(255,255,255,0.4)" : "#FFFFFF",
                        letterSpacing: "0.3px",
                      }}
                    >
                      {step.label}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: isCurrent ? "#FF6B00" : isPending ? "rgba(255,255,255,0.4)" : "#4CAF7D",
                        fontWeight: isCurrent ? 600 : 400,
                        marginTop: "2px",
                      }}
                    >
                      {isCurrent ? `${step.time} · In Progress` : step.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Responder Info Card */}
        <div
          style={{
            backgroundColor: "#1A1A1A",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.08)",
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
            <User size={16} color="#FF6B00" />
            Your Responder
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                color: "#FFFFFF",
              }}
            >
              Mountain Rescue MR-04
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { icon: <Shield size={14} color="rgba(255,255,255,0.6)" />, label: "Team", value: "State Mountain Rescue, Sikkim" },
                { icon: <Phone size={14} color="rgba(255,255,255,0.6)" />, label: "Contact", value: "Dispatched via TRINETRA Emergency Network" },
                { icon: <MapPin size={14} color="rgba(255,255,255,0.6)" />, label: "Equipment", value: "First Aid, GPS Tracker, Communication Relay" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                    backgroundColor: "#222222",
                    borderRadius: "10px",
                    padding: "10px 12px",
                  }}
                >
                  <div style={{ marginTop: "2px" }}>{item.icon}</div>
                  <div>
                    <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>
                      {item.label}:{" "}
                    </span>
                    <span style={{ fontSize: "13px", color: "#FFFFFF" }}>
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: "4px",
                fontSize: "12px",
                color: "rgba(255,255,255,0.6)",
                lineHeight: "1.5",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                paddingTop: "12px",
              }}
            >
              A trained rescue professional is on their way. Stay calm and follow
              the instructions below.
            </div>
          </div>
        </div>

        {/* While You Wait Card — gradient featured */}
        <div
          style={{
            background: "linear-gradient(135deg, #2A1500, #1A0A00)",
            borderRadius: "16px",
            padding: "20px",
            border: "1px solid rgba(255,107,0,0.2)",
            boxShadow: "0 2px 16px rgba(0,0,0,0.6)",
          }}
        >
          <div
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              color: "#FFFFFF",
              marginBottom: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Clock size={16} color="#FFFFFF" />
            While You Wait
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              {
                num: 1,
                title: "Stay at Safe Checkpoint S4",
                desc: "Do not move from your current position",
              },
              {
                num: 2,
                title: "Conserve phone battery",
                desc: "Enable battery saver mode immediately",
              },
              {
                num: 3,
                title: "Wave or signal if nearby",
                desc: "If you hear the rescue team, signal them visually",
              },
            ].map((item) => (
              <div key={item.num} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,107,0,0.15)",
                    color: "#FFFFFF",
                    fontSize: "12px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {item.num}
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "13px",
                      color: "#FFFFFF",
                    }}
                  >
                    {item.title}
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.65)", marginTop: "2px" }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Updates */}
        <div
          style={{
            backgroundColor: "#1A1A1A",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.08)",
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
            <Radio size={16} color="#FF6B00" />
            Live Updates
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {liveUpdates.map((update, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                  paddingBottom: index < liveUpdates.length - 1 ? "14px" : "0",
                  marginBottom: index < liveUpdates.length - 1 ? "14px" : "0",
                  borderBottom:
                    index < liveUpdates.length - 1
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "none",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#FF8C38",
                    minWidth: "38px",
                    paddingTop: "2px",
                  }}
                >
                  {update.time}
                </span>
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: index === 0 ? "#4CAF7D" : "#222222",
                    marginTop: "6px",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: "13px", color: "#FFFFFF", lineHeight: "1.5" }}>
                  {update.message}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
