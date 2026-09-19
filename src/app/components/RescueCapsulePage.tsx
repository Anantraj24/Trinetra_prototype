import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Shield,
  Download,
  ChevronRight,
  Radio,
  Battery,
  Wifi,
  MapPin,
  Clock,
} from "lucide-react";

interface RescueCapsulePageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

interface EvidenceItem {
  label: string;
  detail: string;
}

const evidenceItems: EvidenceItem[] = [
  {
    label: "Route deviation detected",
    detail: "+2.1 km off-route",
  },
  {
    label: "Hazard proximity detected",
    detail: "Landslide zone: 180m",
  },
  {
    label: "Network connection lost",
    detail: "Duration: 23 min",
  },
  {
    label: "Missed safety check",
    detail: "Overdue: 47 min",
  },
  {
    label: "Extended inactivity detected",
    detail: "Duration: 31 min",
  },
];

export function RescueCapsulePage({ onBack, onNavigate }: RescueCapsulePageProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#111111",
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      {/* HEADER — deep dark */}
      <div
        style={{
          backgroundColor: "#0D0D0D",
          padding: "16px 20px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
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
            <ArrowLeft size={20} color="#FFFFFF" />
          </button>

          {/* Incident ID badge */}
          <div
            style={{
              backgroundColor: "#FF6B00",
              borderRadius: 999,
              padding: "4px 12px",
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "0.05em",
              }}
            >
              INC-A72851
            </span>
          </div>
        </div>

        <div>
          <div
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 700,
              fontSize: 19,
              color: "#FFFFFF",
              lineHeight: 1.25,
              marginBottom: 4,
            }}
          >
            TRINETRA Rescue Capsule
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
            Emergency Evidence Report
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", gap: 16 }}>

        {/* INCIDENT INFORMATION CARD */}
        <div
          style={{
            backgroundColor: "#1A1A1A",
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.08)",
            borderLeft: "4px solid #E0362C",
            padding: 20,
            overflow: "hidden",
            boxShadow: "0 2px 16px rgba(0,0,0,0.6)",
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.1em",
              marginBottom: 14,
            }}
          >
            INCIDENT INFORMATION
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            {/* Incident ID */}
            <div
              style={{
                backgroundColor: "#222222",
                borderRadius: 10,
                padding: "10px 12px",
              }}
            >
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginBottom: 3, fontWeight: 600 }}>
                Incident ID
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF" }}>
                INC-A72851
              </div>
            </div>

            {/* Severity */}
            <div
              style={{
                backgroundColor: "#222222",
                borderRadius: 10,
                padding: "10px 12px",
              }}
            >
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginBottom: 3, fontWeight: 600 }}>
                Severity
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  backgroundColor: "rgba(224,54,44,0.15)",
                  borderRadius: 999,
                  padding: "2px 10px",
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, color: "#E0362C" }}>HIGH</span>
              </div>
            </div>

            {/* Safety Pulse Score */}
            <div
              style={{
                backgroundColor: "#222222",
                borderRadius: 10,
                padding: "10px 12px",
              }}
            >
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginBottom: 3, fontWeight: 600 }}>
                Safety Pulse Score
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF" }}>
                14{" "}
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>/100</span>
              </div>
            </div>

            {/* AI Confidence */}
            <div
              style={{
                backgroundColor: "#222222",
                borderRadius: 10,
                padding: "10px 12px",
              }}
            >
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginBottom: 3, fontWeight: 600 }}>
                AI Confidence
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF" }}>91%</div>
            </div>

            {/* Journey ID — full width */}
            <div
              style={{
                gridColumn: "1 / -1",
                backgroundColor: "#222222",
                borderRadius: 10,
                padding: "10px 12px",
              }}
            >
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginBottom: 3, fontWeight: 600 }}>
                Journey ID
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF" }}>
                JRN-847291
              </div>
            </div>
          </div>
        </div>

        {/* CURRENT EVIDENCE */}
        <div
          style={{
            backgroundColor: "#1A1A1A",
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.08)",
            padding: 20,
            boxShadow: "0 2px 16px rgba(0,0,0,0.6)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 4,
            }}
          >
            <AlertTriangle size={18} color="#E0362C" />
            <div
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: "#FFFFFF",
              }}
            >
              Current Evidence
            </div>
          </div>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.6)",
              marginBottom: 16,
              marginLeft: 26,
            }}
          >
            Why Emergency Was Escalated
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {evidenceItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: "10px 12px",
                  backgroundColor: "#222222",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <CheckCircle
                  size={16}
                  color="#4CAF7D"
                  style={{ marginTop: 1, flexShrink: 0 }}
                />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF", marginBottom: 1 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LAST SAFE STATE */}
        <div
          style={{
            backgroundColor: "#1A1A1A",
            borderRadius: 24,
            padding: 22,
            boxShadow: "0 2px 16px rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.1em",
              marginBottom: 14,
            }}
          >
            LAST SAFE STATE
          </div>

          {/* Time */}
          <div
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 700,
              fontSize: 42,
              color: "#FF6B00",
              lineHeight: 1,
              marginBottom: 4,
            }}
          >
            18:42
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 18 }}>
            Checkpoint S3
          </div>

          {/* Stats grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                backgroundColor: "#222222",
                borderRadius: 12,
                padding: "10px 8px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
                Risk
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#FFFFFF" }}>17</div>
            </div>
            <div
              style={{
                backgroundColor: "#222222",
                borderRadius: 12,
                padding: "10px 8px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
                Battery
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#FFFFFF" }}>68%</div>
            </div>
            <div
              style={{
                backgroundColor: "#222222",
                borderRadius: 12,
                padding: "10px 8px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
                Signal
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF" }}>Weak</div>
            </div>
          </div>

          {/* Location */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              backgroundColor: "#222222",
              borderRadius: 10,
              padding: "8px 12px",
            }}
          >
            <MapPin size={12} color="rgba(255,255,255,0.6)" />
            <span
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.6)",
                fontFamily: "monospace",
                letterSpacing: "0.02em",
              }}
            >
              31.208°N, 77.142°E
            </span>
          </div>
        </div>

        {/* WHY ESCALATED EXPLANATION */}
        <div
          style={{
            backgroundColor: "#1A1A1A",
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.08)",
            padding: 20,
            boxShadow: "0 2px 16px rgba(0,0,0,0.6)",
          }}
        >
          <div
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: "#FFFFFF",
              marginBottom: 10,
            }}
          >
            Why was emergency declared?
          </div>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            TRINETRA detected 5 simultaneous risk indicators that crossed the emergency threshold.
            Multiple factors including route deviation, hazard proximity, connectivity loss, and
            inactivity triggered automatic escalation to protect your safety.
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: 24 }}>
          <button
            style={{
              width: "100%",
              padding: "15px",
              backgroundColor: "#FF6B00",
              border: "none",
              borderRadius: 14,
              cursor: "pointer",
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: "#FFFFFF",
              letterSpacing: "0.05em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Download size={16} color="#FFFFFF" />
            DOWNLOAD CAPSULE
          </button>

          <button
            onClick={() => onNavigate("emergency-status")}
            style={{
              width: "100%",
              padding: "15px",
              backgroundColor: "transparent",
              border: "1.5px solid rgba(255,107,0,0.4)",
              borderRadius: 14,
              cursor: "pointer",
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: "#FF6B00",
              letterSpacing: "0.05em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            VIEW EMERGENCY STATUS
            <ChevronRight size={16} color="#FF6B00" />
          </button>
        </div>
      </div>
    </div>
  );
}
