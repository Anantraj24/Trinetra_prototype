import { useState } from "react";
import { ArrowLeft, MapPin, Clock, AlertTriangle, CheckCircle, ChevronRight, Flag, Navigation, Circle, AlertCircle } from "lucide-react";

interface JourneyContractPageProps {
  onBack: () => void;
}

type CheckpointState = "completed" | "upcoming" | "missed" | "delayed";
type HazardSeverity = "low" | "medium" | "high";

interface Checkpoint {
  id: number;
  name: string;
  location: string;
  expectedTime: string;
  state: CheckpointState;
  completedAt?: string;
  distanceFromStart: string;
}

interface Hazard {
  id: number;
  type: string;
  location: string;
  area: string;
  severity: HazardSeverity;
  description: string;
}

const checkpoints: Checkpoint[] = [
  {
    id: 1,
    name: "Guwahati Bus Terminal",
    location: "Guwahati, Assam",
    expectedTime: "07:30 AM",
    state: "completed",
    completedAt: "07:28 AM",
    distanceFromStart: "Start",
  },
  {
    id: 2,
    name: "Jorabat Junction",
    location: "Jorabat, Meghalaya",
    expectedTime: "08:15 AM",
    state: "completed",
    completedAt: "08:18 AM",
    distanceFromStart: "18 km",
  },
  {
    id: 3,
    name: "Nongpoh Rest Area",
    location: "Nongpoh, Meghalaya",
    expectedTime: "09:30 AM",
    state: "delayed",
    distanceFromStart: "52 km",
  },
  {
    id: 4,
    name: "Wayur Bridge Checkpoint",
    location: "Wayur, Meghalaya",
    expectedTime: "10:45 AM",
    state: "missed",
    distanceFromStart: "78 km",
  },
  {
    id: 5,
    name: "Shillong City Center",
    location: "Shillong, Meghalaya",
    expectedTime: "11:30 AM",
    state: "upcoming",
    distanceFromStart: "101 km",
  },
  {
    id: 6,
    name: "Umiam Lake Viewpoint",
    location: "Umiam, Meghalaya",
    expectedTime: "12:00 PM",
    state: "upcoming",
    distanceFromStart: "84 km",
  },
];

const hazards: Hazard[] = [
  {
    id: 1,
    type: "Landslide-Prone Zone",
    location: "NH-6, near Nongpoh",
    area: "km 48–54",
    severity: "high",
    description: "This stretch is known for landslides during monsoon season. Proceed with caution. Check local alerts before passing.",
  },
  {
    id: 2,
    type: "Road Construction",
    location: "Jorabat–Shillong Expressway",
    area: "km 22–30",
    severity: "medium",
    description: "Active road construction causing single-lane traffic. Expect 15–30 minute delays. Follow traffic marshal instructions.",
  },
  {
    id: 3,
    type: "Extreme Weather Zone",
    location: "Upper Shillong ridge",
    area: "1,400–1,600 m altitude",
    severity: "medium",
    description: "Rapid weather changes expected at high altitude. Dense fog possible in early morning and late evening. Drive slow.",
  },
  {
    id: 4,
    type: "Wildlife Crossing Area",
    location: "Umiam Wildlife Corridor",
    area: "km 80–88",
    severity: "low",
    description: "Animals may cross the road in this area. Reduce speed and avoid honking. Do not exit the vehicle.",
  },
];

const checkpointStyle: Record<CheckpointState, { color: string; bg: string; label: string; icon: React.ReactNode }> = {
  completed: {
    color: "#4CAF7D",
    bg: "rgba(76,175,125,0.2)",
    label: "Completed",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  upcoming: {
    color: "rgba(255,255,255,0.25)",
    bg: "#222222",
    label: "Upcoming",
    icon: <Circle className="w-4 h-4" />,
  },
  missed: {
    color: "#E0362C",
    bg: "rgba(224,54,44,0.15)",
    label: "Missed",
    icon: <AlertCircle className="w-4 h-4" />,
  },
  delayed: {
    color: "#FF6B00",
    bg: "rgba(255,107,0,0.15)",
    label: "Delayed",
    icon: <Clock className="w-4 h-4" />,
  },
};

const hazardStyle: Record<HazardSeverity, { color: string; bg: string; borderColor: string; label: string }> = {
  high: { color: "#E0362C", bg: "rgba(224,54,44,0.12)", borderColor: "#E0362C", label: "High Risk" },
  medium: { color: "#F59E0B", bg: "rgba(245,158,11,0.12)", borderColor: "#F59E0B", label: "Medium Risk" },
  low: { color: "#4CAF7D", bg: "rgba(76,175,125,0.12)", borderColor: "#4CAF7D", label: "Low Risk" },
};

// Journey progress: 2 of 5 active waypoints completed → 40%
const journeyProgress = 40;
const completedCount = checkpoints.filter(c => c.state === "completed").length;
const missedCount = checkpoints.filter(c => c.state === "missed").length;
const totalCount = checkpoints.length;

export function JourneyContractPage({ onBack }: JourneyContractPageProps) {
  const [activeSection, setActiveSection] = useState<"overview" | "hazards" | "checkpoints">("overview");

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#111111" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-20 px-4 py-4"
        style={{
          backgroundColor: "#0D0D0D",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-95"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: "rgba(255,255,255,0.8)" }} />
          </button>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Manrope', sans-serif" }}>TRINETRA</p>
            <h1 className="text-base font-bold leading-tight" style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>Journey Safety Contract</h1>
          </div>
        </div>

        {/* Section tabs */}
        <div className="flex gap-2 mt-4" style={{ background: "#1A1A1A" }}>
          {(["overview", "hazards", "checkpoints"] as const).map(s => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className="flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-all"
              style={{
                background: activeSection === s ? "#FF6B00" : "#222222",
                color: activeSection === s ? "white" : "rgba(255,255,255,0.5)",
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              {s === "overview" ? "Overview" : s === "hazards" ? `Hazards (${hazards.length})` : `Checkpoints (${totalCount})`}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 px-4 py-5 pb-24 space-y-4">

        {/* ── OVERVIEW SECTION ── */}
        {activeSection === "overview" && (
          <>
            {/* Journey route card */}
            <div
              className="rounded-3xl p-5"
              style={{
                backgroundColor: "#1A1A1A",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.6)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Navigation className="w-4 h-4" style={{ color: "#FF6B00" }} />
                <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Manrope', sans-serif" }}>Journey Route</p>
              </div>

              {/* Visual route */}
              <div className="flex items-stretch gap-3">
                <div className="flex flex-col items-center gap-0">
                  <div className="w-4 h-4 rounded-full border-2 flex-shrink-0" style={{ borderColor: "#FF6B00", background: "#FF6B00" }} />
                  <div className="flex-1 w-0.5 my-1" style={{ background: "linear-gradient(to bottom, #FF6B00, #E0362C)", minHeight: 80 }} />
                  <div className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center" style={{ borderColor: "#E0362C" }}>
                    <Flag className="w-2.5 h-2.5" style={{ color: "#E0362C" }} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="pb-4">
                    <p className="text-sm font-bold" style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>Guwahati, Assam</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Manrope', sans-serif" }}>LGBI Airport / Bus Terminal · Departure point</p>
                  </div>
                  <div className="pt-4" style={{ borderTop: "1px dashed rgba(255,255,255,0.08)" }}>
                    <p className="text-sm font-bold" style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>Shillong, Meghalaya</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Manrope', sans-serif" }}>Police Bazaar · Final destination</p>
                  </div>
                </div>
              </div>

              {/* Route stats */}
              <div className="flex gap-3 mt-4">
                {[
                  { label: "Distance", value: "101 km" },
                  { label: "Via", value: "NH-6" },
                  { label: "Waypoints", value: `${totalCount}` },
                ].map(s => (
                  <div key={s.label} className="flex-1 text-center p-2 rounded-xl" style={{ background: "#222222" }}>
                    <p className="text-sm font-bold" style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>{s.value}</p>
                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Manrope', sans-serif" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Journey time */}
            <div
              className="rounded-3xl p-5"
              style={{
                backgroundColor: "#1A1A1A",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.6)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4" style={{ color: "#FF6B00" }} />
                <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Manrope', sans-serif" }}>Journey Time</p>
              </div>
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.6)" }}>Departed</p>
                  <p className="text-lg font-bold" style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>07:28 AM</p>
                  <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>Today, 20 Aug</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.6)" }}>Expected Arrival</p>
                  <p className="text-lg font-bold" style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>11:30 AM</p>
                  <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>≈ 4h 2min journey</p>
                </div>
              </div>
              {/* Progress bar */}
              <div>
                <div className="flex justify-between mb-1.5">
                  <p className="text-[10px] font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>Journey Progress</p>
                  <p className="text-[10px] font-bold" style={{ color: "#FF6B00" }}>{journeyProgress}%</p>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#222222" }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${journeyProgress}%`, background: "#FF6B00", transition: "width 0.6s ease" }}
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>Guwahati</p>
                  <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>Shillong</p>
                </div>
              </div>

              {/* Duration stats */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[
                  { label: "Elapsed", value: "1h 38m" },
                  { label: "Remaining", value: "≈ 2h 24m" },
                  { label: "Checkpoints", value: `${completedCount}/${totalCount}` },
                ].map(s => (
                  <div key={s.label} className="text-center p-2 rounded-xl" style={{ background: "#222222" }}>
                    <p className="text-sm font-bold" style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>{s.value}</p>
                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Manrope', sans-serif" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hazard summary callout */}
            {hazards.filter(h => h.severity === "high").length > 0 && (
              <button
                onClick={() => setActiveSection("hazards")}
                className="w-full flex items-center gap-3 p-4 rounded-2xl text-left transition-all active:scale-[0.98]"
                style={{ background: "rgba(224,54,44,0.08)", border: "1px solid rgba(224,54,44,0.2)" }}
              >
                <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: "#E0362C" }} />
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                    {hazards.filter(h => h.severity === "high").length} high-risk hazard{hazards.filter(h => h.severity === "high").length > 1 ? "s" : ""} on your route
                  </p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>Tap to view hazard details</p>
                </div>
                <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "#E0362C" }} />
              </button>
            )}

            {/* Missed checkpoint callout */}
            {missedCount > 0 && (
              <button
                onClick={() => setActiveSection("checkpoints")}
                className="w-full flex items-center gap-3 p-4 rounded-2xl text-left transition-all active:scale-[0.98]"
                style={{ background: "rgba(224,54,44,0.08)", border: "1px solid rgba(224,54,44,0.2)" }}
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: "#E0362C" }} />
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                    {missedCount} checkpoint{missedCount > 1 ? "s" : ""} missed
                  </p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>This is affecting your Safety Confidence score</p>
                </div>
                <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "#E0362C" }} />
              </button>
            )}
          </>
        )}

        {/* ── HAZARDS SECTION ── */}
        {activeSection === "hazards" && (
          <div className="space-y-3">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Manrope', sans-serif" }}>
              {hazards.length} known hazards have been identified along your route. TRINETRA monitors these in real-time.
            </p>
            {hazards.map(h => {
              const hs = hazardStyle[h.severity];
              return (
                <div
                  key={h.id}
                  className="rounded-2xl p-4"
                  style={{
                    backgroundColor: "#1A1B4B",
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    borderRight: "1px solid rgba(255,255,255,0.08)",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    borderLeft: `4px solid ${hs.borderColor}`,
                    boxShadow: "0 2px 16px rgba(20,21,63,0.3)",
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: hs.bg }}>
                        <AlertTriangle className="w-4 h-4" style={{ color: hs.color }} />
                      </div>
                      <p className="text-sm font-bold" style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>{h.type}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: hs.bg, color: hs.color, fontFamily: "'Manrope', sans-serif" }}>
                      {hs.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: "rgba(255,255,255,0.6)" }} />
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Manrope', sans-serif" }}>{h.location} · {h.area}</p>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Manrope', sans-serif" }}>{h.description}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* ── CHECKPOINTS SECTION ── */}
        {activeSection === "checkpoints" && (
          <div>
            <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Manrope', sans-serif" }}>
              {completedCount} of {totalCount} checkpoints completed · {missedCount} missed
            </p>
            <div className="space-y-0">
              {checkpoints.map((cp, i) => {
                const cs = checkpointStyle[cp.state];
                const isLast = i === checkpoints.length - 1;
                return (
                  <div key={cp.id} className="flex gap-3">
                    {/* Timeline connector */}
                    <div className="flex flex-col items-center">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: cs.bg, color: cs.color, border: `1.5px solid ${cs.color}` }}
                      >
                        <div className="scale-75">{cs.icon}</div>
                      </div>
                      {!isLast && (
                        <div
                          className="w-0.5 flex-1 my-1"
                          style={{ background: cp.state === "completed" ? "#4CAF7D" : "rgba(255,255,255,0.08)", minHeight: 20 }}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div
                      className={`flex-1 rounded-2xl p-3 ${isLast ? "mb-0" : "mb-2"}`}
                      style={{
                        backgroundColor: "#1A1B4B",
                        border: `1px solid ${cp.state === "missed" ? "rgba(224,54,44,0.2)" : "rgba(255,255,255,0.08)"}`,
                        boxShadow: "0 2px 16px rgba(20,21,63,0.3)",
                      }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="text-sm font-bold" style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>{cp.name}</p>
                          <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Manrope', sans-serif" }}>{cp.location}</p>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: cs.bg, color: cs.color, fontFamily: "'Manrope', sans-serif" }}>
                          {cs.label}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" style={{ color: "rgba(255,255,255,0.6)" }} />
                          <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Manrope', sans-serif" }}>
                            {cp.state === "completed" && cp.completedAt ? `Arrived ${cp.completedAt}` : `Expected ${cp.expectedTime}`}
                          </p>
                        </div>
                        <p className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Manrope', sans-serif" }}>{cp.distanceFromStart}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
