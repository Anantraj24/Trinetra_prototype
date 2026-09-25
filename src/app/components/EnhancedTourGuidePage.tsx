import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ImageWithFallback } from "./ui/ImageWithFallback";
import { BottomNavigation } from "./BottomNavigation";
import { useNavigation } from "./NavigationContext";
import {
  Bot,
  Send,
  Mic,
  Camera,
  Languages,
  Wifi,
  WifiOff,
  MapPin,
  Clock,
  Star,
  Users,
  AlertTriangle,
  CheckCircle,
  Info,
  Heart,
  Route,
  Mountain,
  TreePine,
  Compass,
  Download,
  MessageSquare,
  Volume2,
  VolumeX,
  Settings,
  ArrowLeft,
  Phone,
  Shield,
  Hotel,
  UtensilsCrossed,
  Fuel,
  Hospital,
  Navigation2,
  Globe,
  BookOpen,
  Map,
  Weather
} from "lucide-react";

interface EnhancedTourGuidePageProps {
  onBack?: () => void;
}

interface ChatMessage {
  id: number;
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
  category?: 'general' | 'emergency' | 'recommendation' | 'translation' | 'safety';
  hasAudio?: boolean;
  suggestions?: string[];
}

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    type: 'bot',
    message: "Namaste! I'm your AI-powered TRINETRA travel and safety assistant. I work both online and offline to help you explore Northeast India safely. How can I assist you today?",
    timestamp: new Date(),
    category: 'general',
    suggestions: ['Best places to visit', 'Emergency help', 'Local cuisine', 'Weather updates', 'Translate phrases']
  }
];

const offlineKnowledge = {
  destinations: [
    {
      name: 'Kaziranga National Park',
      location: 'Assam',
      description: 'Home to two-thirds of the world\'s great one-horned rhinoceroses',
      bestTime: 'November to April',
      activities: ['Wildlife Safari', 'Bird Watching', 'Elephant Rides'],
      safety: 'High - well-protected park with guides'
    },
    {
      name: 'Tawang Monastery',
      location: 'Arunachal Pradesh',
      description: 'Largest monastery in India and second largest in the world',
      bestTime: 'April to October',
      activities: ['Monastery Tour', 'Cultural Experience', 'Mountain Views'],
      safety: 'Medium - high altitude, check weather conditions'
    },
    {
      name: 'Shillong',
      location: 'Meghalaya',
      description: 'Scotland of the East with beautiful hills and waterfalls',
      bestTime: 'October to June',
      activities: ['Elephant Falls', 'Ward\'s Lake', 'Don Bosco Museum'],
      safety: 'High - well-developed tourist infrastructure'
    }
  ],
  emergencyPhrases: {
    'Help me': {
      hindi: 'मेरी मदद करो (Meri madad karo)',
      assamese: 'মোক সহায় কৰক (Mok sohay korok)',
      bengali: 'আমাকে সাহায্য করুন (Amake sahajyo korun)'
    },
    'I need a doctor': {
      hindi: 'मुझे डॉक्टर चाहिए (Mujhe doctor chahiye)',
      assamese: 'মোৰ ডাক্তৰৰ প্ৰয়োজন (Mor daktor r proyojon)',
      bengali: 'আমার ডাক্তার দরকার (Amar daktar dorkar)'
    },
    'Where is the hospital?': {
      hindi: 'अस्पताल कहाँ है? (Aspatal kahan hai?)',
      assamese: 'চিকিৎসালয় ক\'ত আছে? (Chikitsaloy kot ase?)',
      bengali: 'হাসপাতাল কোথায়? (Hospital kothay?)'
    }
  },
  safetyTips: [
    'Always inform someone about your travel plans',
    'Carry emergency contact numbers',
    'Keep copies of important documents',
    'Stay hydrated and carry water purification tablets',
    'Respect local customs and traditions',
    'Check weather conditions before traveling to hilly areas'
  ]
};

const quickActions = [
  { icon: MapPin, label: 'Nearby Places', action: 'nearby' },
  { icon: Route, label: 'Safe Routes', action: 'routes' },
  { icon: Languages, label: 'Translate', action: 'translate' },
  { icon: Shield, label: 'Emergency', action: 'emergency' },
  { icon: Hotel, label: 'Hotels', action: 'hotels' },
  { icon: UtensilsCrossed, label: 'Food', action: 'food' }
];

export function EnhancedTourGuidePage({ onBack }: EnhancedTourGuidePageProps) {
  const { currentPage, setCurrentPage, showChatbot, setShowChatbot } = useNavigation();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isOffline, setIsOffline] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [language, setLanguage] = useState('english');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): ChatMessage => {
    const lowerMessage = userMessage.toLowerCase();

    // Emergency responses
    if (lowerMessage.includes('emergency') || lowerMessage.includes('help') || lowerMessage.includes('sos')) {
      return {
        id: Date.now(),
        type: 'bot',
        message: "🚨 Emergency assistance activated! I can help you with:\n\n• Call emergency services (108 for ambulance, 100 for police)\n• Find nearest hospital or police station\n• Contact local volunteers\n• Share your location with emergency contacts\n\nWhat specific help do you need?",
        timestamp: new Date(),
        category: 'emergency',
        suggestions: ['Call ambulance', 'Find hospital', 'Contact volunteers', 'Share location']
      };
    }

    // Translation requests
    if (lowerMessage.includes('translate') || lowerMessage.includes('language')) {
      return {
        id: Date.now(),
        type: 'bot',
        message: "I can help you translate essential phrases into local languages! Here are some emergency phrases:\n\n🆘 **Help me**\n• Hindi: मेरी मदद करो (Meri madad karo)\n• Assamese: মোক সহায় কৰক (Mok sohay korok)\n\n🏥 **Where is hospital?**\n• Hindi: अस्पताल कहाँ है? (Aspatal kahan hai?)\n• Assamese: চিকিৎসালয় ক'ত আছে? (Chikitsaloy kot ase?)\n\nWhat would you like to translate?",
        timestamp: new Date(),
        category: 'translation',
        hasAudio: true,
        suggestions: ['More phrases', 'Different language', 'Practice pronunciation']
      };
    }

    // Destination recommendations
    if (lowerMessage.includes('place') || lowerMessage.includes('visit') || lowerMessage.includes('destination')) {
      const randomDestination = offlineKnowledge.destinations[Math.floor(Math.random() * offlineKnowledge.destinations.length)];
      return {
        id: Date.now(),
        type: 'bot',
        message: `🏔️ I recommend **${randomDestination.name}** in ${randomDestination.location}!\n\n${randomDestination.description}\n\n📅 **Best time:** ${randomDestination.bestTime}\n🎯 **Activities:** ${randomDestination.activities.join(', ')}\n🛡️ **Safety:** ${randomDestination.safety}\n\nWould you like more details or other recommendations?`,
        timestamp: new Date(),
        category: 'recommendation',
        suggestions: ['More destinations', 'Travel routes', 'Hotel recommendations', 'Local food']
      };
    }

    // Safety information
    if (lowerMessage.includes('safe') || lowerMessage.includes('security')) {
      return {
        id: Date.now(),
        type: 'bot',
        message: "🛡️ Here are essential safety tips for Northeast India:\n\n• Always inform someone about your travel plans\n• Carry emergency contact numbers\n• Keep copies of important documents\n• Stay hydrated and carry water purification tablets\n• Respect local customs and traditions\n• Check weather conditions before traveling to hilly areas\n\nNeed specific safety information for your destination?",
        timestamp: new Date(),
        category: 'safety',
        suggestions: ['Emergency contacts', 'Weather updates', 'Local customs', 'Health tips']
      };
    }

    // Weather requests
    if (lowerMessage.includes('weather')) {
      return {
        id: Date.now(),
        type: 'bot',
        message: "🌤️ Current weather in popular destinations:\n\n**Shillong:** 18°C, Cloudy\n**Guwahati:** 24°C, Partly cloudy\n**Tawang:** 12°C, Light rain expected\n**Kohima:** 16°C, Clear\n\n⚠️ **Weather Alert:** Light rain expected in Tawang tomorrow. Pack accordingly!\n\nWhich location's weather would you like to know more about?",
        timestamp: new Date(),
        category: 'general',
        suggestions: ['Extended forecast', 'Packing tips', 'Best travel times']
      };
    }

    // Default response
    return {
      id: Date.now(),
      type: 'bot',
      message: "I'm here to help with your Northeast India travel needs! I can assist with:\n\n🗺️ Destination recommendations\n🛡️ Safety information and emergency help\n🌐 Language translation\n🏨 Hotel and restaurant suggestions\n🌤️ Weather updates\n📍 Route planning\n\nWhat would you like to know about?",
      timestamp: new Date(),
      category: 'general',
      suggestions: ['Popular destinations', 'Emergency help', 'Local cuisine', 'Weather updates']
    };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    let message = "";
    switch (action) {
      case 'nearby':
        message = "Show me nearby places to visit";
        break;
      case 'routes':
        message = "I need safe route recommendations";
        break;
      case 'translate':
        message = "Help me translate phrases";
        break;
      case 'emergency':
        message = "I need emergency assistance";
        break;
      case 'hotels':
        message = "Show me hotel recommendations";
        break;
      case 'food':
        message = "Tell me about local cuisine";
        break;
    }
    setInputMessage(message);
    handleSendMessage();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    handleSendMessage();
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#111111' }}>
      <div className="flex flex-col min-h-screen relative z-10">
        {/* Header */}
        <header
          className="px-4 py-3 sticky top-0 z-30"
          style={{ backgroundColor: '#0D0D0D', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  style={{ color: '#FFFFFF' }}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div className="flex items-center space-x-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #FF6B00, #CC5500)' }}
                >
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-medium" style={{ color: '#FFFFFF' }}>AI Tour Guide</h1>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>Smart • Offline Capable</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs"
                style={isOffline
                  ? { backgroundColor: 'rgba(245,158,11,0.2)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.35)' }
                  : { backgroundColor: 'rgba(76,175,125,0.2)', color: '#4CAF7D', border: '1px solid rgba(76,175,125,0.35)' }
                }
              >
                {isOffline ? <WifiOff className="w-3 h-3 mr-1" /> : <Wifi className="w-3 h-3 mr-1" />}
                {isOffline ? 'Offline' : 'Online'}
              </span>
              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </header>

        {/* Quick Actions */}
        <div className="p-4" style={{ backgroundColor: '#0D0D0D', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex space-x-2 overflow-x-auto pb-1">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.action)}
                className="flex-shrink-0 flex items-center text-xs px-3 py-1.5 rounded-full transition-colors hover:opacity-80"
                style={{ backgroundColor: 'rgba(255,107,0,0.12)', color: '#FF8C38', border: '1px solid rgba(255,107,0,0.3)' }}
              >
                <action.icon className="w-3 h-3 mr-1" />
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <main className="flex-1 p-4 pb-32 overflow-y-auto" style={{ backgroundColor: '#111111' }}>
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  {message.type === 'bot' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #FF6B00, #CC5500)' }}
                      >
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>AI Guide</span>
                      {message.category && (
                        <span
                          className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs"
                          style={
                            message.category === 'emergency'
                              ? { backgroundColor: 'rgba(224,54,44,0.2)', color: '#E0362C', border: '1px solid rgba(224,54,44,0.3)' }
                              : message.category === 'safety'
                              ? { backgroundColor: 'rgba(245,158,11,0.2)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.3)' }
                              : message.category === 'translation'
                              ? { backgroundColor: 'rgba(255,107,0,0.15)', color: '#FF8C38', border: '1px solid rgba(255,107,0,0.3)' }
                              : message.category === 'recommendation'
                              ? { backgroundColor: 'rgba(76,175,125,0.2)', color: '#4CAF7D', border: '1px solid rgba(76,175,125,0.3)' }
                              : { backgroundColor: 'rgba(255,107,0,0.12)', color: '#FF8C38', border: '1px solid rgba(255,107,0,0.25)' }
                          }
                        >
                          {message.category}
                        </span>
                      )}
                      {message.hasAudio && (
                        <button
                          className="p-1 rounded hover:bg-black/10 transition-colors"
                          style={{ color: 'rgba(255,255,255,0.35)' }}
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  )}

                  <div
                    className="p-3 rounded-xl"
                    style={
                      message.type === 'user'
                        ? { backgroundColor: '#FF6B00', color: '#FFFFFF' }
                        : { backgroundColor: '#222222', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.08)' }
                    }
                  >
                    <div className="whitespace-pre-wrap text-sm">{message.message}</div>
                    {message.type === 'user' && (
                      <div className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    )}
                  </div>

                  {/* Suggestions */}
                  {message.type === 'bot' && message.suggestions && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs px-2.5 py-1 rounded-full transition-colors hover:opacity-80"
                          style={{ backgroundColor: 'rgba(255,107,0,0.12)', color: '#FF8C38', border: '1px solid rgba(255,107,0,0.3)' }}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2 mb-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #FF6B00, #CC5500)' }}
                  >
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: '#222222', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}></div>
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'rgba(255,255,255,0.5)', animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'rgba(255,255,255,0.5)', animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input Area */}
        <div
          className="fixed bottom-20 left-0 right-0 p-4"
          style={{ backgroundColor: '#0D0D0D', borderTop: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)' }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Ask me anything about Northeast India..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="w-full pr-20 pl-4 py-2.5 text-sm rounded-xl focus:outline-none transition-all"
                  style={{
                    backgroundColor: '#222222',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#FFFFFF',
                  }}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <button
                    onClick={() => setIsListening(!isListening)}
                    className="p-1 h-8 w-8 rounded flex items-center justify-center transition-colors hover:bg-white/10"
                    style={isListening
                      ? { color: '#E0362C' }
                      : { color: 'rgba(255,255,255,0.4)' }
                    }
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                  <button
                    className="p-1 h-8 w-8 rounded flex items-center justify-center hover:bg-white/10 transition-colors"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="p-2 h-10 w-10 rounded-xl flex items-center justify-center hover:opacity-90 transition-colors disabled:opacity-50"
                style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onOpenChatbot={() => setShowChatbot(true)}
        showChatbot={showChatbot}
      />
    </div>
  );
}
