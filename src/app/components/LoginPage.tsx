import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { Lock, User, AlertCircle } from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check credentials
    if (username === "anant" && password === "Anant@123") {
      onLogin();
    } else {
      setError("Invalid username or password. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center p-4"
      style={{ background: "#111111" }}
    >
      {/* Subtle dark background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%)" }}></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(255,107,0,0.04) 0%, transparent 70%)" }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div
          className="w-full"
          style={{
            background: "#1A1A1A",
            borderRadius: "24px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div className="px-8 pt-10 pb-6 text-center">
            {/* TRINETRA Logo / Title */}
            <h1
              className="text-4xl font-bold tracking-widest mb-1"
              style={{
                color: "#FFFFFF",
                fontFamily: "'Be Vietnam Pro', sans-serif",
                letterSpacing: "0.18em",
              }}
            >
              TRINETRA
            </h1>

            {/* Tagline */}
            <p
              className="text-sm mt-2 mb-1"
              style={{ color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}
            >
              Predict. Verify. Protect. Even Offline.
            </p>

            {/* Full name */}
            <p
              className="text-xs mt-2 leading-snug"
              style={{ color: "rgba(255,255,255,0.5)", maxWidth: "280px", margin: "8px auto 0" }}
            >
              Tourist Risk Intelligence Network for Emergency Triage, Response &amp; Assistance
            </p>
          </div>

          {/* Form content */}
          <div className="px-8 pb-10 space-y-6">
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Username */}
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium tracking-wide"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  Username
                </Label>
                <div className="relative group">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="pl-10 h-12 rounded-xl transition-all duration-300"
                    style={{
                      background: "#222222",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "white",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.border = "1px solid #FF6B00";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,107,0,0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    required
                  />
                </div>
                <p className="text-xs pl-1" style={{ color: "rgba(255,255,255,0.3)" }}>username: anant</p>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium tracking-wide"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  Password
                </Label>
                <div className="relative group">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 h-12 rounded-xl transition-all duration-300"
                    style={{
                      background: "#222222",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "white",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.border = "1px solid #FF6B00";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,107,0,0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    required
                  />
                </div>
                <p className="text-xs pl-1" style={{ color: "rgba(255,255,255,0.3)" }}>password: Anant@123</p>
              </div>

              {/* Error */}
              {error && (
                <div
                  className="flex items-center space-x-2 p-3 rounded-lg"
                  style={{ background: "rgba(220,38,38,0.07)", border: "1px solid rgba(220,38,38,0.18)" }}
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#DC2626" }} />
                  <p className="text-sm" style={{ color: "#DC2626" }}>{error}</p>
                </div>
              )}

              {/* Remember me / Forgot */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 rounded"
                    style={{ accentColor: "#FF6B00" }}
                  />
                  <Label htmlFor="remember" className="text-sm tracking-wide" style={{ color: "rgba(255,255,255,0.7)" }}>
                    Remember me
                  </Label>
                </div>
                <a
                  href="#"
                  className="text-sm transition-all duration-300 hover:underline underline-offset-4"
                  style={{ color: "#FF6B00" }}
                >
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 font-semibold tracking-wide transition-all duration-300 hover:opacity-90 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ background: "#FF6B00", color: "white", borderRadius: "12px" }}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* Demo Credentials */}
            <div
              className="p-3 rounded-lg"
              style={{ background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.3)" }}
            >
              <p className="text-sm mb-1 font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>Demo Credentials:</p>
              <div className="space-y-0.5 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                <p><span style={{ color: "#FFFFFF" }}>Username:</span> anant</p>
                <p><span style={{ color: "#FFFFFF" }}>Password:</span> Anant@123</p>
              </div>
            </div>

            {/* Separator */}
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full" style={{ height: "1px", background: "rgba(255,255,255,0.1)" }}></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span
                  className="px-4 py-1 rounded-full text-xs"
                  style={{
                    background: "#1A1A1A",
                    color: "rgba(255,255,255,0.5)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google / Gmail Button */}
            <button
              type="button"
              className="w-full h-12 flex items-center justify-center gap-3 font-medium transition-all duration-300 hover:shadow-md"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white",
                borderRadius: "12px",
              }}
            >
              {/* Google SVG Logo */}
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                  <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                </g>
              </svg>
              Continue with Gmail
            </button>

            {/* Sign up link */}
            <div className="text-center text-sm pt-1" style={{ color: "rgba(255,255,255,0.6)" }}>
              Don't have an account?{" "}
              <a
                href="#"
                className="font-medium transition-all duration-300 hover:underline underline-offset-4"
                style={{ color: "#FF6B00" }}
              >
                Sign up
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>
            &copy; 2024 TRINETRA. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
