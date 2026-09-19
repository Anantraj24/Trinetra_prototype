import { Shield, Navigation, FileText, AlertCircle, Bot } from "lucide-react";

interface BottomNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenChatbot: () => void;
  showChatbot?: boolean;
}

export function BottomNavigation({ currentPage, onNavigate, onOpenChatbot, showChatbot = false }: BottomNavigationProps) {
  const items = [
    { icon: Shield, label: "Safety", id: "home", pages: ["home", "safety-pass"], onClick: () => onNavigate("home") },
    { icon: Navigation, label: "Journey", id: "journey", pages: ["start-journey", "live-journey", "journey-complete"], onClick: () => onNavigate("start-journey") },
    { icon: FileText, label: "Contract", id: "contract", pages: ["journey-contract"], onClick: () => onNavigate("journey-contract") },
    { icon: AlertCircle, label: "Emergency", id: "emergency", pages: ["emergency", "rescue-capsule", "emergency-status", "survival-mode"], onClick: () => onNavigate("emergency") },
    { icon: Bot, label: "AI Chat", id: "chat", pages: ["chat"], onClick: () => onOpenChatbot() },
  ];

  const activeId = showChatbot
    ? "chat"
    : items.find(item => item.pages.includes(currentPage))?.id ?? "home";

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-20 px-2 py-2"
      style={{
        background: "#0D0D0D",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.6)",
      }}
    >
      <div className="flex items-center justify-around max-w-sm mx-auto">
        {items.map(({ icon: Icon, label, id, onClick }) => {
          const isActive = id === activeId;
          return (
            <button
              key={id}
              onClick={onClick}
              className="flex flex-col items-center gap-1 py-1 px-3 transition-all duration-200"
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200"
                style={isActive ? { background: "rgba(255,107,0,0.2)" } : { background: "transparent" }}
              >
                <Icon
                  className="w-5 h-5"
                  style={{ color: isActive ? "#FF6B00" : "rgba(255,255,255,0.4)" }}
                />
              </div>
              <span
                className="text-[10px] font-semibold"
                style={{
                  color: isActive ? "#FF6B00" : "rgba(255,255,255,0.4)",
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
