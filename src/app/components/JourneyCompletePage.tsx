import React from "react";
import {
  CheckCircle,
  TrendingUp,
  Shield,
  MapPin,
  Clock,
  Flag,
  BarChart2,
} from "lucide-react";

interface JourneyCompletePageProps {
  onNavigate: (page: string) => void;
}

const stats = [
  { label: "Journey Duration", value: "9h 42m" },
  { label: "Distance Covered", value: "14.3 km" },
  { label: "Checkpoints Completed", value: "6/6" },
  { label: "Hazards Encountered", value: "2" },
  { label: "Safety Checks", value: "8" },
  { label: "Final Safety Score", value: "94/100", highlight: true },
];

const highlights = [
  {
    icon: "green",
    text: "All 6 checkpoints confirmed on time",
    desc: "Every checkpoint was reached and verified within the scheduled window.",
  },
  {
    icon: "green",
    text: "Successfully avoided 2 hazard zones",
    desc: "TRINETRA rerouted you around both active risk areas.",
  },
  {
    icon: "amber",
    text: "Guardian Mode activated and resolved safely",
    desc: "An inactivity alert was raised and cleared — you remained safe.",
  },
];

export function JourneyCompletePage({ onNavigate }: JourneyCompletePageProps) {
  const safetyScore = 94;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#111111",
        fontFamily: "Manrope, sans-serif",
        paddingBottom: "40px",
      }}
    >
      <div
        style={{
          padding: "40px 20px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Success State */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "16px",
            paddingBottom: "8px",
          }}
        >
          <div
            style={{
              width: "96px",
              height: "96px",
              borderRadius: "50%",
              backgroundColor: "#4CAF7D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 40px rgba(76,175,125,0.35)",
            }}
          >
            <CheckCircle size={48} color="white" strokeWidth={2} />
          </div>
          <div>
            <h1
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: 700,
                fontSize: "22px",
                color: "#FFFFFF",
                margin: "0 0 8px",
              }}
            >
              Journey Completed Safely
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.55)",
                margin: 0,
                lineHeight: "1.6",
                maxWidth: "280px",
              }}
            >
              You have safely completed your journey. TRINETRA has recorded your
              trip.
            </p>
          </div>
        </div>

        {/* Final Safety Summary */}
        <div
          style={{
            backgroundColor: "#1A1A1A",
            borderRadius: "24px",
            padding: "22px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 2px 16px rgba(0,0,0,0.6)",
          }}
        >
          <div
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              color: "#FFFFFF",
              marginBottom: "6px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <BarChart2 size={17} color="#FF6B00" />
            Final Safety Summary
          </div>

          {/* Route */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "20px",
              paddingTop: "4px",
            }}
          >
            <MapPin size={13} color="rgba(255,255,255,0.6)" />
            <span
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.6)",
                fontWeight: 500,
              }}
            >
              Yuksom{" "}
              <span style={{ color: "rgba(255,255,255,0.6)", margin: "0 4px" }}>→</span>{" "}
              Dzongri
            </span>
          </div>

          {/* Stats Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: stat.highlight ? "rgba(76,175,125,0.1)" : "#222222",
                  borderRadius: "12px",
                  padding: "12px",
                  border: stat.highlight
                    ? "1px solid rgba(76,175,125,0.25)"
                    : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.6)",
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontWeight: 700,
                    fontSize: stat.highlight ? "18px" : "16px",
                    color: stat.highlight ? "#4CAF7D" : "#FFFFFF",
                  }}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Safety Score Progress Bar */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                Safety Score
              </span>
              <span
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#4CAF7D",
                }}
              >
                {safetyScore}%
              </span>
            </div>
            <div
              style={{
                height: "8px",
                backgroundColor: "#222222",
                borderRadius: "100px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${safetyScore}%`,
                  backgroundColor: "#4CAF7D",
                  borderRadius: "100px",
                  transition: "width 0.8s ease",
                }}
              />
            </div>
          </div>
        </div>

        {/* Journey Highlights */}
        <div
          style={{
            backgroundColor: "#1A1A1A",
            borderRadius: "16px",
            padding: "20px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 2px 16px rgba(0,0,0,0.6)",
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
            <Flag size={16} color="#FF6B00" />
            Journey Highlights
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {highlights.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                  padding: "12px",
                  backgroundColor: "#222222",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor:
                      item.icon === "green"
                        ? "rgba(76,175,125,0.2)"
                        : "rgba(245,158,11,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <CheckCircle
                    size={15}
                    color={item.icon === "green" ? "#4CAF7D" : "#F59E0B"}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "13px",
                      color: "#FFFFFF",
                      marginBottom: "3px",
                    }}
                  >
                    {item.text}
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", lineHeight: "1.5" }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <button
            onClick={() => onNavigate("home")}
            style={{
              width: "100%",
              padding: "16px",
              backgroundColor: "#FF6B00",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "14px",
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <Shield size={17} color="#FFFFFF" />
            Return to Dashboard
          </button>
          <button
            onClick={() => alert("Coming soon")}
            style={{
              width: "100%",
              padding: "15px",
              backgroundColor: "transparent",
              color: "#FF6B00",
              border: "1.5px solid rgba(255,107,0,0.4)",
              borderRadius: "14px",
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 600,
              fontSize: "15px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <TrendingUp size={17} color="#FF6B00" />
            View Journey Report
          </button>
        </div>
      </div>
    </div>
  );
}
