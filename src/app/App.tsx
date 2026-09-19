import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { SimpleMobileDashboard } from "./components/SimpleMobileDashboard";
import { NavigationProvider } from "./components/NavigationContext";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <NavigationProvider>
      <div>
        {isLoggedIn ? (
          <SimpleMobileDashboard />
        ) : (
          <LoginPage onLogin={handleLogin} />
        )}
      </div>
    </NavigationProvider>
  );
}