import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle,
  Circle,
  MapPin,
  Clock,
  Compass,
  Navigation,
  Wifi,
} from "lucide-react";

interface JourneyForm {
  origin: string;
  destination: string;
  startTime: string;
  returnTime: string;
  checkinFrequency: string;
  safeCorridor: string;
}

interface ChecklistItem {
  label: string;
  loadingText: string;
  doneText: string;
}

const CHECKLIST: ChecklistItem[] = [
  { label: "Offline Map", loadingText: "downloading...", doneText: "CACHED" },
  { label: "Hazard Zones", loadingText: "loading...", doneText: "LOADED" },
  {
    label: "Safe Checkpoints",
    loadingText: "mapping...",
    doneText: "READY",
  },
  {
    label: "Emergency Points",
    loadingText: "locating...",
    doneText: "LOCATED",
  },
  {
    label: "Primary Route",
    loadingText: "calculating...",
    doneText: "CALCULATED",
  },
  {
    label: "Shadow Corridor",
    loadingText: "preparing...",
    doneText: "READY",
  },
  {
    label: "Regional Emergency Info",
    loadingText: "fetching...",
    doneText: "READY",
  },
];

interface StartJourneyPageProps {
  onBack: () => void;
  onStartJourney: () => void;
}

export function StartJourneyPage({
  onBack,
  onStartJourney,
}: StartJourneyPageProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [completedItems, setCompletedItems] = useState(0);
  const [form, setForm] = useState<JourneyForm>({
    origin: "",
    destination: "",
    startTime: "",
    returnTime: "",
    checkinFrequency: "Every 30 min",
    safeCorridor: "500m",
  });

  // Auto-advance checklist when on step 2
  useEffect(() => {
    if (step !== 2) return;
    if (completedItems >= CHECKLIST.length) return;

    const delay = completedItems === 0 ? 600 : 900;
    const timer = setTimeout(() => {
      setCompletedItems((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [step, completedItems]);

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    backgroundColor: "#222222",
    border: "1.5px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    fontSize: 14,
    fontFamily: "Manrope, sans-serif",
    color: "#FFFFFF",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const inputFocused: React.CSSProperties = {
    ...inputBase,
    border: "1.5px solid #FF6B00",
  };

  const getInputStyle = (field: string): React.CSSProperties =>
    focusedField === field ? inputFocused : inputBase;

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 6,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    fontFamily: "Manrope, sans-serif",
  };

  const fieldWrap: React.CSSProperties = { marginBottom: 16 };

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCompletedItems(0);
    setStep(2);
  }

  const allDone = completedItems >= CHECKLIST.length;

  if (step === 2) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#111111",
          fontFamily: "Manrope, sans-serif",
          paddingBottom: 40,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "20px 20px 16px",
            backgroundColor: "#0D0D0D",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <button
            onClick={() => {
              setStep(1);
              setCompletedItems(0);
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ArrowLeft size={22} />
          </button>
          <div className="flex items-center" style={{ gap: 10 }}>
            <h1
              style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 700,
                color: "#FFFFFF",
                fontFamily: "Be Vietnam Pro, sans-serif",
              }}
            >
              TRINETRA Preparing
            </h1>
            {/* Pulsing dot */}
            <PulsingDot />
          </div>
        </div>

        <div style={{ padding: "16px 20px" }}>
          {/* Journey Summary Card */}
          <div
            style={{
              backgroundColor: "#1A1A1A",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              padding: "16px 18px",
              marginBottom: 20,
              boxShadow: "0 2px 16px rgba(0,0,0,0.6)",
            }}
          >
            <div className="flex items-center" style={{ gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div className="flex items-center" style={{ gap: 6 }}>
                  <MapPin size={14} style={{ color: "#FF6B00" }} />
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#FFFFFF",
                    }}
                  >
                    {form.origin || "Origin"}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>→</span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#FFFFFF",
                    }}
                  >
                    {form.destination || "Destination"}
                  </span>
                </div>
                <div
                  className="flex items-center"
                  style={{ gap: 12, marginTop: 6 }}
                >
                  <div className="flex items-center" style={{ gap: 4 }}>
                    <Clock size={12} style={{ color: "rgba(255,255,255,0.6)" }} />
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
                      {form.startTime || "--:--"}
                    </span>
                  </div>
                  <div className="flex items-center" style={{ gap: 4 }}>
                    <Clock size={12} style={{ color: "rgba(255,255,255,0.6)" }} />
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
                      {form.returnTime || "--:--"}
                    </span>
                  </div>
                </div>
              </div>
              <Compass size={22} style={{ color: "#FF6B00", flexShrink: 0 }} />
            </div>
          </div>

          {/* Checklist */}
          <div
            style={{
              background: "linear-gradient(160deg, #2A1500 0%, #1A0A00 50%, #111111 100%)",
              border: "1px solid rgba(255,107,0,0.2)",
              borderRadius: 14,
              overflow: "hidden",
              marginBottom: 20,
              boxShadow: "0 2px 16px rgba(0,0,0,0.6)",
            }}
          >
            <div
              style={{
                padding: "14px 18px 10px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontFamily: "Be Vietnam Pro, sans-serif",
                }}
              >
                Preparation Checklist
              </p>
            </div>

            {CHECKLIST.map((item, index) => {
              const isDone = index < completedItems;
              const isActive = index === completedItems;

              return (
                <div
                  key={item.label}
                  className="flex items-center"
                  style={{
                    padding: "13px 18px",
                    gap: 14,
                    borderBottom:
                      index < CHECKLIST.length - 1
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "none",
                    opacity: !isDone && !isActive ? 0.4 : 1,
                    transition: "opacity 0.4s",
                  }}
                >
                  {/* Icon */}
                  <div style={{ flexShrink: 0 }}>
                    {isDone ? (
                      <CheckCircle
                        size={20}
                        style={{ color: "#4CAF7D" }}
                      />
                    ) : isActive ? (
                      <SpinnerCircle />
                    ) : (
                      <Circle size={20} style={{ color: "rgba(255,255,255,0.3)" }} />
                    )}
                  </div>

                  {/* Label */}
                  <span
                    style={{
                      flex: 1,
                      fontSize: 14,
                      fontWeight: isDone ? 700 : 600,
                      color: isDone ? "#FFFFFF" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {item.label}
                  </span>

                  {/* Status */}
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: isDone ? "#4CAF7D" : "rgba(255,255,255,0.5)",
                      fontFamily: "Be Vietnam Pro, sans-serif",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {isDone
                      ? `${item.doneText} ✓`
                      : isActive
                      ? item.loadingText
                      : "—"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Start Journey Button (appears when done) */}
          {allDone && (
            <button
              onClick={onStartJourney}
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: "#4CAF7D",
                border: "none",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 700,
                color: "white",
                cursor: "pointer",
                fontFamily: "Be Vietnam Pro, sans-serif",
                letterSpacing: "0.08em",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Navigation size={16} />
              START JOURNEY
            </button>
          )}
        </div>
      </div>
    );
  }

  // Step 1 — Form
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#111111",
        fontFamily: "Manrope, sans-serif",
        paddingBottom: 40,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "20px 20px 16px",
          backgroundColor: "#0D0D0D",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowLeft size={22} />
        </button>
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              color: "#FFFFFF",
              fontFamily: "Be Vietnam Pro, sans-serif",
            }}
          >
            Start Journey
          </h1>
          <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
            Create your Safety Contract
          </p>
        </div>
      </div>

      <div style={{ padding: "16px 20px" }}>
        <div
          style={{
            backgroundColor: "#1A1A1A",
            borderRadius: 16,
            padding: "20px 16px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Origin */}
            <div style={fieldWrap}>
              <label style={labelStyle}>
                <span className="flex items-center" style={{ gap: 5 }}>
                  <MapPin size={11} />
                  Origin
                </span>
              </label>
              <input
                name="origin"
                value={form.origin}
                onChange={handleChange}
                onFocus={() => setFocusedField("origin")}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle("origin")}
                placeholder="Where are you starting from?"
                required
              />
            </div>

            {/* Destination */}
            <div style={fieldWrap}>
              <label style={labelStyle}>
                <span className="flex items-center" style={{ gap: 5 }}>
                  <MapPin size={11} />
                  Destination
                </span>
              </label>
              <input
                name="destination"
                value={form.destination}
                onChange={handleChange}
                onFocus={() => setFocusedField("destination")}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle("destination")}
                placeholder="Where are you headed?"
                required
              />
            </div>

            {/* Journey Start Time */}
            <div style={fieldWrap}>
              <label style={labelStyle}>
                <span className="flex items-center" style={{ gap: 5 }}>
                  <Clock size={11} />
                  Journey Start Time
                </span>
              </label>
              <input
                type="time"
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
                onFocus={() => setFocusedField("startTime")}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle("startTime")}
                required
              />
            </div>

            {/* Expected Return Time */}
            <div style={fieldWrap}>
              <label style={labelStyle}>
                <span className="flex items-center" style={{ gap: 5 }}>
                  <Clock size={11} />
                  Expected Return Time
                </span>
              </label>
              <input
                type="time"
                name="returnTime"
                value={form.returnTime}
                onChange={handleChange}
                onFocus={() => setFocusedField("returnTime")}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle("returnTime")}
                required
              />
            </div>

            {/* Check-in Frequency */}
            <div style={fieldWrap}>
              <label style={labelStyle}>
                <span className="flex items-center" style={{ gap: 5 }}>
                  <Wifi size={11} />
                  Check-in Frequency
                </span>
              </label>
              <select
                name="checkinFrequency"
                value={form.checkinFrequency}
                onChange={handleChange}
                onFocus={() => setFocusedField("checkinFrequency")}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle("checkinFrequency")}
              >
                <option value="Every 30 min">Every 30 min</option>
                <option value="Every 45 min">Every 45 min</option>
                <option value="Every 60 min">Every 60 min</option>
                <option value="Every 90 min">Every 90 min</option>
                <option value="Every 2 hours">Every 2 hours</option>
              </select>
            </div>

            {/* Safe Corridor */}
            <div style={fieldWrap}>
              <label style={labelStyle}>
                <span className="flex items-center" style={{ gap: 5 }}>
                  <Compass size={11} />
                  Safe Corridor
                </span>
              </label>
              <select
                name="safeCorridor"
                value={form.safeCorridor}
                onChange={handleChange}
                onFocus={() => setFocusedField("safeCorridor")}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle("safeCorridor")}
              >
                <option value="200m">200m</option>
                <option value="300m">300m</option>
                <option value="500m">500m</option>
                <option value="750m">750m</option>
                <option value="1 km">1 km</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: "#FF6B00",
                border: "none",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 700,
                color: "white",
                cursor: "pointer",
                fontFamily: "Be Vietnam Pro, sans-serif",
                letterSpacing: "0.08em",
                marginTop: 8,
                boxSizing: "border-box",
              }}
            >
              CREATE JOURNEY CONTRACT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Small pulsing dot component
function PulsingDot() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "#FF6B00",
        animation: "pulse 1.2s ease-in-out infinite",
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.7); }
        }
      `}</style>
    </span>
  );
}

// Spinner circle for in-progress item
function SpinnerCircle() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 20,
        height: 20,
        borderRadius: "50%",
        border: "2.5px solid rgba(255,107,0,0.2)",
        borderTopColor: "#FF6B00",
        animation: "spin 0.8s linear infinite",
        flexShrink: 0,
      }}
    >
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </span>
  );
}
