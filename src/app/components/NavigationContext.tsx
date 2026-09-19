import { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  showChatbot: boolean;
  setShowChatbot: (show: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState('home');
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <NavigationContext.Provider value={{
      currentPage,
      setCurrentPage,
      showChatbot,
      setShowChatbot,
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}