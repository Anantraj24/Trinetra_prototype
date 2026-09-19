import React, { useState } from "react";
import {
  ArrowLeft,
  Shield,
  User,
  Phone,
  Droplets,
  FileText,
  AlertTriangle,
} from "lucide-react";

type Step = "form" | "pass";

interface FormData {
  fullName: string;
  phone: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  bloodGroup: string;
  medicalInfo: string;
  validity: string;
}

interface SafetyPassPageProps {
  onBack: () => void;
}

function generatePassId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return "TSP-" + result;
}

function QRCodePlaceholder() {
  const size = 80;
  const cellSize = 14;
  const pattern = [
    [1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1],
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ borderRadius: 8 }}
    >
      <rect width={size} height={size} fill="white" rx={8} />
      {pattern.map((row, ri) =>
        row.map((cell, ci) =>
          cell ? (
            <rect
              key={`${ri}-${ci}`}
              x={ci * cellSize + 5}
              y={ri * cellSize + 5}
              width={cellSize - 2}
              height={cellSize - 2}
              fill="#1A1A1A"
              rx={2}
            />
          ) : null
        )
      )}
    </svg>
  );
}

export function SafetyPassPage({ onBack }: SafetyPassPageProps) {
  const [step, setStep] = useState<Step>("form");
  const [passId] = useState(generatePassId);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    fullName: "",
    phone: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    bloodGroup: "",
    medicalInfo: "",
    validity: "30 Days",
  });

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

  const getInputStyle = (field: string) =>
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (
      form.fullName &&
      form.phone &&
      form.emergencyContactName &&
      form.emergencyContactPhone &&
      form.bloodGroup
    ) {
      setStep("pass");
    }
  }

  const validityLabel =
    form.validity === "7 Days"
      ? "7 days from issue"
      : form.validity === "30 Days"
      ? "30 days from issue"
      : form.validity === "90 Days"
      ? "90 days from issue"
      : "1 year from issue";

  if (step === "pass") {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#111111",
          fontFamily: "Manrope, sans-serif",
          padding: "0 0 40px 0",
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
              Safety Pass
            </h1>
            <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
              Your digital emergency credential
            </p>
          </div>
        </div>

        <div style={{ padding: "20px 20px" }}>
          {/* Digital Card */}
          <div
            style={{
              background:
                "linear-gradient(135deg, #1A0A00, #FF6B00, #FF8C38)",
              borderRadius: 24,
              padding: 24,
              boxShadow: "0 2px 16px rgba(0,0,0,0.6)",
              color: "white",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative circle */}
            <div
              style={{
                position: "absolute",
                top: -40,
                right: -40,
                width: 160,
                height: 160,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -30,
                left: -30,
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.04)",
              }}
            />

            {/* Card Header */}
            <div
              className="flex items-center justify-between"
              style={{ marginBottom: 20 }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    fontWeight: 700,
                    opacity: 0.75,
                    fontFamily: "Be Vietnam Pro, sans-serif",
                  }}
                >
                  TRINETRA
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 11,
                    opacity: 0.6,
                    marginTop: 2,
                  }}
                >
                  Safety Pass
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  borderRadius: 10,
                  padding: 8,
                }}
              >
                <Shield size={20} />
              </div>
            </div>

            {/* Name */}
            <p
              style={{
                margin: "0 0 4px 0",
                fontSize: 22,
                fontWeight: 700,
                fontFamily: "Be Vietnam Pro, sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              {form.fullName}
            </p>
            <p
              style={{
                margin: "0 0 20px 0",
                fontSize: 12,
                opacity: 0.65,
                letterSpacing: "0.08em",
              }}
            >
              {passId}
            </p>

            {/* Info Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.12)",
                  borderRadius: 10,
                  padding: "10px 12px",
                }}
              >
                <p
                  style={{
                    margin: "0 0 2px 0",
                    fontSize: 10,
                    opacity: 0.65,
                    letterSpacing: "0.08em",
                  }}
                >
                  BLOOD GROUP
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 16,
                    fontWeight: 700,
                    fontFamily: "Be Vietnam Pro, sans-serif",
                  }}
                >
                  {form.bloodGroup}
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.12)",
                  borderRadius: 10,
                  padding: "10px 12px",
                }}
              >
                <p
                  style={{
                    margin: "0 0 2px 0",
                    fontSize: 10,
                    opacity: 0.65,
                    letterSpacing: "0.08em",
                  }}
                >
                  STATUS
                </p>
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: "rgba(76,175,125,0.8)",
                    color: "white",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "2px 10px",
                    borderRadius: 20,
                    letterSpacing: "0.06em",
                    marginTop: 2,
                  }}
                >
                  ACTIVE
                </span>
              </div>
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.12)",
                  borderRadius: 10,
                  padding: "10px 12px",
                }}
              >
                <p
                  style={{
                    margin: "0 0 2px 0",
                    fontSize: 10,
                    opacity: 0.65,
                    letterSpacing: "0.08em",
                  }}
                >
                  EMERGENCY
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  {form.emergencyContactName}
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.12)",
                  borderRadius: 10,
                  padding: "10px 12px",
                }}
              >
                <p
                  style={{
                    margin: "0 0 2px 0",
                    fontSize: 10,
                    opacity: 0.65,
                    letterSpacing: "0.08em",
                  }}
                >
                  VALID FOR
                </p>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 600 }}>
                  {validityLabel}
                </p>
              </div>
            </div>

            {/* Bottom row: phone + QR */}
            <div
              className="flex items-end justify-between"
              style={{ gap: 12 }}
            >
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    margin: "0 0 2px 0",
                    fontSize: 10,
                    opacity: 0.65,
                    letterSpacing: "0.08em",
                  }}
                >
                  PHONE
                </p>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>
                  {form.phone}
                </p>
                {form.medicalInfo ? (
                  <div style={{ marginTop: 8 }}>
                    <p
                      style={{
                        margin: "0 0 2px 0",
                        fontSize: 10,
                        opacity: 0.65,
                        letterSpacing: "0.08em",
                      }}
                    >
                      MEDICAL NOTES
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 11,
                        opacity: 0.85,
                        lineHeight: 1.4,
                      }}
                    >
                      {form.medicalInfo.length > 60
                        ? form.medicalInfo.slice(0, 60) + "…"
                        : form.medicalInfo}
                    </p>
                  </div>
                ) : null}
              </div>
              <div style={{ textAlign: "center" }}>
                <QRCodePlaceholder />
                <p
                  style={{
                    margin: "6px 0 0 0",
                    fontSize: 9,
                    opacity: 0.6,
                    maxWidth: 80,
                    lineHeight: 1.3,
                    textAlign: "center",
                  }}
                >
                  Encrypted credentials
                </p>
              </div>
            </div>
          </div>

          <p
            style={{
              textAlign: "center",
              fontSize: 11,
              color: "rgba(255,255,255,0.35)",
              margin: "10px 0 20px 0",
            }}
          >
            This QR contains encrypted safety credentials
          </p>

          {/* Action Buttons */}
          <button
            onClick={() => setStep("form")}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#1A1A1A",
              border: "none",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 700,
              color: "#FFFFFF",
              cursor: "pointer",
              fontFamily: "Be Vietnam Pro, sans-serif",
              letterSpacing: "0.04em",
              marginBottom: 12,
              boxSizing: "border-box",
              boxShadow: "0 2px 16px rgba(0,0,0,0.6)",
            }}
          >
            Edit Safety Pass
          </button>
          <button
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#1A1A1A",
              border: "none",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 700,
              color: "#FFFFFF",
              cursor: "pointer",
              fontFamily: "Be Vietnam Pro, sans-serif",
              letterSpacing: "0.06em",
              boxSizing: "border-box",
              boxShadow: "0 2px 16px rgba(0,0,0,0.6)",
            }}
          >
            Share / Download
          </button>
        </div>
      </div>
    );
  }

  // Form state
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
            TRINETRA Safety Pass
          </h1>
          <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
            Your emergency identity credential
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
          <form onSubmit={handleGenerate}>
            {/* Full Name */}
            <div style={fieldWrap}>
              <label style={labelStyle}>
                <span className="flex items-center" style={{ gap: 5 }}>
                  <User size={11} />
                  Full Name *
                </span>
              </label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                onFocus={() => setFocusedField("fullName")}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle("fullName")}
                placeholder="Your full legal name"
                required
              />
            </div>

            {/* Phone */}
            <div style={fieldWrap}>
              <label style={labelStyle}>
                <span className="flex items-center" style={{ gap: 5 }}>
                  <Phone size={11} />
                  Phone Number *
                </span>
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                onFocus={() => setFocusedField("phone")}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle("phone")}
                placeholder="+91 00000 00000"
                required
              />
            </div>

            {/* Emergency Contact Name */}
            <div style={fieldWrap}>
              <label style={labelStyle}>
                <span className="flex items-center" style={{ gap: 5 }}>
                  <User size={11} />
                  Emergency Contact Name *
                </span>
              </label>
              <input
                name="emergencyContactName"
                value={form.emergencyContactName}
                onChange={handleChange}
                onFocus={() => setFocusedField("emergencyContactName")}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle("emergencyContactName")}
                placeholder="Name of your emergency contact"
                required
              />
            </div>

            {/* Emergency Contact Phone */}
            <div style={fieldWrap}>
              <label style={labelStyle}>
                <span className="flex items-center" style={{ gap: 5 }}>
                  <Phone size={11} />
                  Emergency Contact Phone *
                </span>
              </label>
              <input
                name="emergencyContactPhone"
                value={form.emergencyContactPhone}
                onChange={handleChange}
                onFocus={() => setFocusedField("emergencyContactPhone")}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle("emergencyContactPhone")}
                placeholder="+91 00000 00000"
                required
              />
            </div>

            {/* Blood Group */}
            <div style={fieldWrap}>
              <label style={labelStyle}>
                <span className="flex items-center" style={{ gap: 5 }}>
                  <Droplets size={11} />
                  Blood Group *
                </span>
              </label>
              <select
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleChange}
                onFocus={() => setFocusedField("bloodGroup")}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle("bloodGroup")}
                required
              >
                <option value="">Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            {/* Medical Info */}
            <div style={fieldWrap}>
              <label style={labelStyle}>
                <span className="flex items-center" style={{ gap: 5 }}>
                  <FileText size={11} />
                  Critical Medical Information
                </span>
              </label>
              <textarea
                name="medicalInfo"
                value={form.medicalInfo}
                onChange={handleChange}
                onFocus={() => setFocusedField("medicalInfo")}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...getInputStyle("medicalInfo"),
                  resize: "vertical",
                  minHeight: 80,
                }}
                placeholder="Allergies, conditions, medications..."
                rows={3}
              />
            </div>

            {/* Pass Validity */}
            <div style={fieldWrap}>
              <label style={labelStyle}>
                <span className="flex items-center" style={{ gap: 5 }}>
                  <AlertTriangle size={11} />
                  Pass Validity
                </span>
              </label>
              <select
                name="validity"
                value={form.validity}
                onChange={handleChange}
                onFocus={() => setFocusedField("validity")}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle("validity")}
              >
                <option value="7 Days">7 Days</option>
                <option value="30 Days">30 Days</option>
                <option value="90 Days">90 Days</option>
                <option value="1 Year">1 Year</option>
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
              GENERATE SAFETY PASS
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
