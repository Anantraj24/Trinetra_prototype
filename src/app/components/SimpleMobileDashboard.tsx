import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { BottomNavigation } from "./BottomNavigation";
import { useNavigation } from "./NavigationContext";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Badge as UIBadge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";
import { ProfilePage } from "./ProfilePage";
import { EnhancedMapsPage } from "./EnhancedMapsPage";
import { EnhancedTourGuidePage } from "./EnhancedTourGuidePage";
import { EnhancedEmergencyPage } from "./EnhancedEmergencyPage";
import { TravelGroupsPage } from "./TravelGroupsPage";
import { TranslatePage } from "./TranslatePage";
import { EKYCPage } from "./EKYCPage";
import { ReportIssuePage } from "./ReportIssuePage";
import { SOSPage } from "./SOSPage";
import { MyHealthPage } from "./MyHealthPage";
import { AdvancedSecurityPage } from "./AdvancedSecurityPage";
import { TouristDashboard } from "./TouristDashboard";
import { JourneyContractPage } from "./JourneyContractPage";
import { SafetyPassPage } from "./SafetyPassPage";
import { StartJourneyPage } from "./StartJourneyPage";
import { LiveJourneyPage } from "./LiveJourneyPage";
import { SurvivalModePage } from "./SurvivalModePage";
import { RescueCapsulePage } from "./RescueCapsulePage";
import { EmergencyStatusPage } from "./EmergencyStatusPage";
import { JourneyCompletePage } from "./JourneyCompletePage";
import { DemoModePage } from "./DemoModePage";
import {
  LayoutDashboard,
  Users,
  Map,
  Shield,
  MapPin,
  AlertTriangle,
  Phone,
  Heart,
  Bell,
  Search,
  Mountain,
  Star,
  Menu,
  Sun,
  Cloud,
  CloudRain,
  Thermometer,
  Wind,
  Eye,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  Navigation,
  Send,
  Coffee,
  Fuel,
  UtensilsCrossed,
  ShoppingBag,
  Navigation2,
  X,
  Plane,
  AlertCircle,
  Info,
  Gift,
  Languages,
  ShieldCheck,
  FileText,
  Activity
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from "recharts";

const touristVisitsData = [
  { name: 'Jan', visitors: 2800 },
  { name: 'Feb', visitors: 3200 },
  { name: 'Mar', visitors: 4100 },
  { name: 'Apr', visitors: 5500 },
  { name: 'May', visitors: 6200 },
  { name: 'Jun', visitors: 7800 },
];

const weeklyBookingsData = [
  { name: 'Mon', bookings: 45 },
  { name: 'Tue', bookings: 52 },
  { name: 'Wed', bookings: 68 },
  { name: 'Thu', bookings: 41 },
  { name: 'Fri', bookings: 78 },
  { name: 'Sat', bookings: 92 },
  { name: 'Sun', bookings: 65 },
];

const weatherData = [
  { location: 'Shillong', temp: 18, condition: 'Cloudy', humidity: 78, windSpeed: 12, icon: 'cloud' },
  { location: 'Guwahati', temp: 24, condition: 'Partly Cloudy', humidity: 65, windSpeed: 8, icon: 'sun' },
  { location: 'Tawang', temp: 12, condition: 'Light Rain', humidity: 85, windSpeed: 15, icon: 'rain' },
  { location: 'Kohima', temp: 16, condition: 'Clear', humidity: 60, windSpeed: 6, icon: 'sun' }
];

const hotelBookings = [
  {
    id: 1,
    hotel: 'Royal Heritage Shillong',
    location: 'Shillong, Meghalaya',
    checkIn: 'Dec 15, 2024',
    checkOut: 'Dec 18, 2024',
    status: 'confirmed',
    roomType: 'Deluxe Suite',
    nights: 3,
    image: 'https://images.unsplash.com/photo-1607712617949-8c993d290809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzU3MTQ4Nzg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 2,
    hotel: 'Tawang Resort & Spa',
    location: 'Tawang, Arunachal Pradesh',
    checkIn: 'Dec 22, 2024',
    checkOut: 'Dec 25, 2024',
    status: 'pending',
    roomType: 'Mountain View',
    nights: 3,
    image: 'https://images.unsplash.com/photo-1672560045744-17f136d4a21c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNvcnQlMjBub3J0aGVhc3QlMjBpbmRpYXxlbnwxfHx8fDE3NTcxODQ4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 3,
    hotel: 'Kaziranga Golf Resort',
    location: 'Kaziranga, Assam',
    checkIn: 'Jan 5, 2025',
    checkOut: 'Jan 8, 2025',
    status: 'cancelled',
    roomType: 'Safari Lodge',
    nights: 3,
    image: 'https://images.unsplash.com/photo-1672560045744-17f136d4a21c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNvcnQlMjBub3J0aGVhc3QlMjBpbmRpYXxlbnwxfHx8fDE3NTcxODQ4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

const hotelsToRate = [
  {
    id: 1,
    hotel: 'Blue Pine Resort',
    location: 'Shillong, Meghalaya',
    stayDate: 'Nov 2024',
    currentRating: 0,
    image: 'https://images.unsplash.com/photo-1607712617949-8c993d290809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNTY3Nzg0ODYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 2,
    hotel: 'Monastery View Inn',
    location: 'Tawang, Arunachal Pradesh',
    stayDate: 'Oct 2024',
    currentRating: 4,
    image: 'https://images.unsplash.com/photo-1672560045744-17f136d4a21c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNvcnQlMjBub3J0aGVhc3QlMjBpbmRpYXxlbnwxfHx8fDE3NTcxODQ4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

const nearbyPlaces = [
  {
    id: 1,
    name: 'Kamakhya Temple',
    type: 'Temple',
    distance: '2.3 km',
    rating: 4.7,
    openStatus: 'Open',
    image: 'https://images.unsplash.com/photo-1689947674001-f9a8a08f0480?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVhc3QlMjBpbmRpYSUyMHRlbXBsZXxlbnwxfHx8fDE3NTcxODUxNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: 'temple'
  },
  {
    id: 2,
    name: 'City Cafe',
    type: 'Restaurant',
    distance: '0.8 km',
    rating: 4.5,
    openStatus: 'Open',
    image: 'https://images.unsplash.com/photo-1592693973461-cbdbcc153064?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwY2FmZXxlbnwxfHx8fDE3NTcxODUxNzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: 'restaurant'
  },
  {
    id: 3,
    name: 'Shillong Fuel Station',
    type: 'Fuel Station',
    distance: '1.2 km',
    rating: 4.2,
    openStatus: '24/7',
    image: 'https://images.unsplash.com/photo-1592693973461-cbdbcc153064?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdWVsJTIwc3RhdGlvbnxlbnwxfHx8fDE3NTcxODUxODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: 'fuel'
  },
  {
    id: 4,
    name: 'Meghalaya Market',
    type: 'Shopping',
    distance: '1.5 km',
    rating: 4.3,
    openStatus: 'Open',
    image: 'https://images.unsplash.com/photo-1592693973461-cbdbcc153064?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wcGluZyUyMG1hcmtldHxlbnwxfHx8fDE3NTcxODUxODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: 'shopping'
  }
];

const chatMessages = [
  { id: 1, type: 'bot', message: "Hello! I'm your TRINETRA travel and safety assistant. How can I help you?" },
  { id: 2, type: 'user', message: 'What are the best places to visit in Shillong?' },
  { id: 3, type: 'bot', message: "Great question! Shillong offers amazing attractions like Elephant Falls, Shillong Peak, Ward's Lake, and the Don Bosco Museum. Would you like detailed information about any of these?" }
];

const notifications = [
  {
    id: 1,
    type: 'booking',
    title: 'Booking Confirmed',
    message: 'Your stay at Royal Heritage Shillong has been confirmed for Dec 15-18, 2024.',
    time: '2 min ago',
    read: false,
    icon: 'check',
    priority: 'high'
  },
  {
    id: 2,
    type: 'weather',
    title: 'Weather Alert',
    message: 'Light rain expected in Tawang tomorrow. Pack accordingly for your trip.',
    time: '15 min ago',
    read: false,
    icon: 'cloud',
    priority: 'medium'
  },
  {
    id: 3,
    type: 'offer',
    title: 'Special Offer',
    message: 'Get 20% off on your next booking! Limited time offer ending soon.',
    time: '1 hour ago',
    read: false,
    icon: 'gift',
    priority: 'low'
  },
  {
    id: 4,
    type: 'travel',
    title: 'Flight Reminder',
    message: 'Your flight to Guwahati is tomorrow at 10:30 AM. Check-in is now open.',
    time: '2 hours ago',
    read: true,
    icon: 'plane',
    priority: 'high'
  },
  {
    id: 5,
    type: 'alert',
    title: 'Road Closure Update',
    message: 'NH-40 near Kohima is temporarily closed due to construction. Use alternate route.',
    time: '3 hours ago',
    read: true,
    icon: 'alert',
    priority: 'high'
  }
];

export function SimpleMobileDashboard() {
  const { currentPage, setCurrentPage, showChatbot, setShowChatbot } = useNavigation();
  const [selectedRating, setSelectedRating] = useState<{[key: number]: number}>({});
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState(chatMessages);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationList, setNotificationList] = useState(notifications);

  const WeatherIcon = ({ condition }: { condition: string }) => {
    switch (condition) {
      case 'sun': return <Sun className="w-4 h-4" style={{ color: "#FF8C38" }} />;
      case 'cloud': return <Cloud className="w-4 h-4" style={{ color: "rgba(255,255,255,0.55)" }} />;
      case 'rain': return <CloudRain className="w-4 h-4" style={{ color: "#60a5fa" }} />;
      default: return <Sun className="w-4 h-4" style={{ color: "#FF8C38" }} />;
    }
  };

  const StarRating = ({ rating, onRatingChange, hotelId }: { rating: number, onRatingChange?: (rating: number) => void, hotelId?: number }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRatingChange && onRatingChange(star)}
            disabled={!onRatingChange}
            className={`${onRatingChange ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-all`}
          >
            <Star
              className="w-4 h-4"
              style={star <= rating ? { color: '#FF6B00', fill: '#FF6B00' } : { color: 'rgba(255,255,255,0.3)' }}
            />
          </button>
        ))}
      </div>
    );
  };

  const PlaceIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'temple': return <Mountain className="w-4 h-4" style={{ color: "#FF8C38" }} />;
      case 'restaurant': return <UtensilsCrossed className="w-4 h-4" style={{ color: "#f87171" }} />;
      case 'fuel': return <Fuel className="w-4 h-4" style={{ color: "#60a5fa" }} />;
      case 'shopping': return <ShoppingBag className="w-4 h-4" style={{ color: "#c084fc" }} />;
      default: return <MapPin className="w-4 h-4" style={{ color: "#4CAF7D" }} />;
    }
  };

  const NotificationIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'check': return <CheckCircle className="w-4 h-4" style={{ color: "#4CAF7D" }} />;
      case 'cloud': return <CloudRain className="w-4 h-4" style={{ color: "#60a5fa" }} />;
      case 'gift': return <Gift className="w-4 h-4" style={{ color: "#FF8C38" }} />;
      case 'plane': return <Plane className="w-4 h-4" style={{ color: "#60a5fa" }} />;
      case 'alert': return <AlertCircle className="w-4 h-4" style={{ color: "#E0362C" }} />;
      case 'info': return <Info className="w-4 h-4" style={{ color: "#60a5fa" }} />;
      case 'user': return <Users className="w-4 h-4" style={{ color: "#FF6B00" }} />;
      default: return <Bell className="w-4 h-4" style={{ color: "rgba(255,255,255,0.55)" }} />;
    }
  };

  const markAsRead = (notificationId: number) => {
    setNotificationList(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (notificationId: number) => {
    setNotificationList(prev =>
      prev.filter(notif => notif.id !== notificationId)
    );
  };

  const unreadCount = notificationList.filter(notif => !notif.read).length;

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      const newMessage = { id: messages.length + 1, type: 'user', message: chatInput };
      setMessages([...messages, newMessage]);
      setChatInput('');

      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          type: 'bot',
          message: "Thanks for your question! I'm here to help you explore destinations safely with TRINETRA. Ask me about safety conditions, hazards, journey planning, or travel tips."
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  // Render different pages based on current page
  if (currentPage === 'journey-contract') {
    return (
      <div>
        <JourneyContractPage onBack={() => setCurrentPage('home')} />
        <BottomNavigation currentPage={currentPage} onNavigate={setCurrentPage} onOpenChatbot={() => setShowChatbot(true)} showChatbot={showChatbot} />
      </div>
    );
  }

  if (currentPage === 'safety-pass') {
    return (
      <div>
        <SafetyPassPage onBack={() => setCurrentPage('home')} />
        <BottomNavigation currentPage={currentPage} onNavigate={setCurrentPage} onOpenChatbot={() => setShowChatbot(true)} showChatbot={showChatbot} />
      </div>
    );
  }

  if (currentPage === 'start-journey') {
    return (
      <div>
        <StartJourneyPage onBack={() => setCurrentPage('home')} onStartJourney={() => setCurrentPage('live-journey')} />
      </div>
    );
  }

  if (currentPage === 'live-journey') {
    return (
      <div>
        <LiveJourneyPage onBack={() => setCurrentPage('home')} onNavigate={setCurrentPage} />
        <BottomNavigation currentPage={currentPage} onNavigate={setCurrentPage} onOpenChatbot={() => setShowChatbot(true)} showChatbot={showChatbot} />
      </div>
    );
  }

  if (currentPage === 'survival-mode') {
    return (
      <div>
        <SurvivalModePage onBack={() => setCurrentPage('live-journey')} onNavigate={setCurrentPage} />
        <BottomNavigation currentPage={currentPage} onNavigate={setCurrentPage} onOpenChatbot={() => setShowChatbot(true)} showChatbot={showChatbot} />
      </div>
    );
  }

  if (currentPage === 'rescue-capsule') {
    return (
      <div>
        <RescueCapsulePage onBack={() => setCurrentPage('live-journey')} onNavigate={setCurrentPage} />
      </div>
    );
  }

  if (currentPage === 'emergency-status') {
    return (
      <div>
        <EmergencyStatusPage onBack={() => setCurrentPage('rescue-capsule')} onNavigate={setCurrentPage} />
      </div>
    );
  }

  if (currentPage === 'journey-complete') {
    return (
      <div>
        <JourneyCompletePage onNavigate={setCurrentPage} />
      </div>
    );
  }

  if (currentPage === 'demo-mode') {
    return (
      <div>
        <DemoModePage onBack={() => setCurrentPage('home')} onNavigate={setCurrentPage} />
        <BottomNavigation currentPage={currentPage} onNavigate={setCurrentPage} onOpenChatbot={() => setShowChatbot(true)} showChatbot={showChatbot} />
      </div>
    );
  }

  if (currentPage === 'profile') {
    return (
      <div>
        <ProfilePage onBack={() => setCurrentPage('home')} />
        <BottomNavigation
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onOpenChatbot={() => setShowChatbot(true)}
          showChatbot={showChatbot}
        />
      </div>
    );
  }

  if (currentPage === 'maps') {
    return (
      <div>
        <EnhancedMapsPage onBack={() => setCurrentPage('home')} />
        <BottomNavigation
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onOpenChatbot={() => setShowChatbot(true)}
          showChatbot={showChatbot}
        />
      </div>
    );
  }

  if (currentPage === 'guide') {
    return (
      <div>
        <EnhancedTourGuidePage onBack={() => setCurrentPage('home')} />
        <BottomNavigation
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onOpenChatbot={() => setShowChatbot(true)}
          showChatbot={showChatbot}
        />
      </div>
    );
  }

  if (currentPage === 'emergency') {
    return (
      <div>
        <EnhancedEmergencyPage onBack={() => setCurrentPage('home')} />
        <BottomNavigation
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onOpenChatbot={() => setShowChatbot(true)}
          showChatbot={showChatbot}
        />
      </div>
    );
  }

  if (currentPage === 'travel-groups') {
    return (
      <div>
        <TravelGroupsPage onBack={() => setCurrentPage('home')} />
        <BottomNavigation
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onOpenChatbot={() => setShowChatbot(true)}
          showChatbot={showChatbot}
        />
      </div>
    );
  }

  if (currentPage === 'translate') {
    return (
      <div>
        <TranslatePage onBack={() => setCurrentPage('home')} />
        <BottomNavigation
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onOpenChatbot={() => setShowChatbot(true)}
          showChatbot={showChatbot}
        />
      </div>
    );
  }

  if (currentPage === 'ekyc') {
    return (
      <div>
        <EKYCPage onBack={() => setCurrentPage('home')} />
        <BottomNavigation
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onOpenChatbot={() => setShowChatbot(true)}
          showChatbot={showChatbot}
        />
      </div>
    );
  }

  if (currentPage === 'report') {
    return (
      <div>
        <ReportIssuePage onBack={() => setCurrentPage('home')} />
        <BottomNavigation
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onOpenChatbot={() => setShowChatbot(true)}
          showChatbot={showChatbot}
        />
      </div>
    );
  }

  if (currentPage === 'sos') {
    return (
      <div>
        <SOSPage onBack={() => setCurrentPage('home')} />
        <BottomNavigation
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onOpenChatbot={() => setShowChatbot(true)}
          showChatbot={showChatbot}
        />
      </div>
    );
  }

  if (currentPage === 'health') {
    return (
      <div>
        <MyHealthPage onBack={() => setCurrentPage('home')} />
        <BottomNavigation
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onOpenChatbot={() => setShowChatbot(true)}
          showChatbot={showChatbot}
        />
      </div>
    );
  }

  if (currentPage === 'advanced-security') {
    return (
      <div>
        <AdvancedSecurityPage onBack={() => setCurrentPage('home')} />
        <BottomNavigation
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onOpenChatbot={() => setShowChatbot(true)}
          showChatbot={showChatbot}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#111111", minHeight: "100vh" }}>
      <div className="flex flex-col min-h-screen">

        {/* ── HEADER ── */}
        <header className="sticky top-0 z-30 px-4 py-3" style={{ background: "#0D0D0D", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Sidebar trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <button className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <Menu className="w-5 h-5" style={{ color: "#FFFFFF" }} />
                  </button>
                </SheetTrigger>

                {/* ── SIDEBAR ── */}
                <SheetContent side="left" className="w-72 border-0 p-0 overflow-y-auto" style={{ background: "#0D0D0D" }}>
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">Access different sections of the TRINETRA app</SheetDescription>

                  {/* Profile header */}
                  <div className="flex items-center gap-3 px-5 pt-10 pb-6" style={{ background: "#1A1A1A" }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white flex-shrink-0" style={{ background: "#FF6B00", fontFamily: "'Be Vietnam Pro', sans-serif" }}>A</div>
                    <div>
                      <p className="font-semibold" style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>Hi ANANT</p>
                      <button className="text-xs mt-1 px-3 py-0.5 rounded-full" style={{ color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.15)" }}>Edit Profile</button>
                    </div>
                  </div>

                  <nav className="px-3 pb-6 space-y-0.5">
                    {/* Safety section */}
                    <p className="text-[10px] font-semibold tracking-widest uppercase px-4 pt-2 pb-1" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Manrope', sans-serif" }}>Safety</p>
                    <button onClick={() => setCurrentPage('home')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all" style={{ background: "rgba(255,107,0,0.15)", color: "#FF6B00" }}>
                      <Shield className="w-5 h-5" style={{ color: "#FF6B00" }} /><span className="text-sm font-semibold" style={{ fontFamily: "'Manrope', sans-serif" }}>Safety Pulse</span>
                    </button>
                    <button onClick={() => setCurrentPage('safety-pass')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all" style={{ color: "rgba(255,255,255,0.8)" }} onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,107,0,0.1)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <FileText className="w-5 h-5 opacity-80" /><span className="text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>Safety Pass</span>
                    </button>
                    <button onClick={() => setCurrentPage('start-journey')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all" style={{ color: "rgba(255,255,255,0.8)" }} onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,107,0,0.1)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <Navigation className="w-5 h-5 opacity-80" /><span className="text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>Start Journey</span>
                    </button>
                    <button onClick={() => setCurrentPage('live-journey')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all" style={{ color: "rgba(255,255,255,0.8)" }} onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,107,0,0.1)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <Eye className="w-5 h-5 opacity-80" /><span className="text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>Live Journey</span>
                    </button>
                    <button onClick={() => setCurrentPage('journey-contract')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all" style={{ color: "rgba(255,255,255,0.8)" }} onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,107,0,0.1)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <CheckCircle className="w-5 h-5 opacity-80" /><span className="text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>Journey Contract</span>
                    </button>
                    <button onClick={() => setCurrentPage('maps')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all" style={{ color: "rgba(255,255,255,0.8)" }} onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,107,0,0.1)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <Map className="w-5 h-5 opacity-80" /><span className="text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>Maps & Route</span>
                    </button>

                    {/* Divider */}
                    <div className="my-3 mx-2 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

                    {/* Explore section */}
                    <p className="text-[10px] font-semibold tracking-widest uppercase px-4 pt-2 pb-1" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Manrope', sans-serif" }}>Explore</p>
                    <button onClick={() => setCurrentPage('guide')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all" style={{ color: "rgba(255,255,255,0.8)" }} onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,107,0,0.1)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <MapPin className="w-5 h-5 opacity-80" /><span className="text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>Tour Guide</span>
                    </button>
                    <button onClick={() => setCurrentPage('travel-groups')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all" style={{ color: "rgba(255,255,255,0.8)" }} onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,107,0,0.1)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <Users className="w-5 h-5 opacity-80" /><span className="text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>Travel Groups</span>
                    </button>
                    <button onClick={() => setCurrentPage('translate')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all" style={{ color: "rgba(255,255,255,0.8)" }} onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,107,0,0.1)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <Languages className="w-5 h-5 opacity-80" /><span className="text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>Translate</span>
                    </button>
                    <button onClick={() => setCurrentPage('ekyc')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all" style={{ color: "rgba(255,255,255,0.8)" }} onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,107,0,0.1)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <Shield className="w-5 h-5 opacity-80" /><span className="text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>eKYC</span>
                    </button>
                    <button onClick={() => setCurrentPage('profile')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all" style={{ color: "rgba(255,255,255,0.8)" }} onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,107,0,0.1)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <Users className="w-5 h-5 opacity-80" /><span className="text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>My Profile</span>
                    </button>

                    {/* Divider */}
                    <div className="my-3 mx-2 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

                    {/* Emergency section */}
                    <p className="text-[10px] font-semibold tracking-widest uppercase px-4 pt-2 pb-1" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Manrope', sans-serif" }}>Emergency</p>
                    <button onClick={() => setCurrentPage('report')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all" style={{ color: "rgba(255,255,255,0.8)" }} onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,107,0,0.1)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <AlertTriangle className="w-5 h-5 opacity-80" /><span className="text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>Report Issue</span>
                    </button>
                    <button onClick={() => setCurrentPage('sos')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all" style={{ color: "#E0362C" }} onMouseEnter={e => (e.currentTarget.style.background = "rgba(224,54,44,0.1)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <Phone className="w-5 h-5" style={{ color: "#E0362C" }} /><span className="text-sm font-semibold" style={{ fontFamily: "'Manrope', sans-serif" }}>SOS</span>
                    </button>
                    <button onClick={() => setCurrentPage('rescue-capsule')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all" style={{ color: "rgba(255,255,255,0.8)" }} onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,107,0,0.1)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <AlertCircle className="w-5 h-5 opacity-80" /><span className="text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>Rescue Capsule</span>
                    </button>
                    <button onClick={() => setCurrentPage('survival-mode')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all" style={{ color: "rgba(255,255,255,0.8)" }} onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,107,0,0.1)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <AlertTriangle className="w-5 h-5 opacity-80" /><span className="text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>Survival Mode</span>
                    </button>
                    <button onClick={() => setCurrentPage('health')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all" style={{ color: "rgba(255,255,255,0.8)" }} onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,107,0,0.1)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <Heart className="w-5 h-5 opacity-80" /><span className="text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>My Health</span>
                    </button>
                    <button onClick={() => setCurrentPage('advanced-security')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all" style={{ color: "rgba(255,255,255,0.8)" }} onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,107,0,0.1)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <ShieldCheck className="w-5 h-5 opacity-80" /><span className="text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>Advanced Security</span>
                    </button>

                    {/* Divider */}
                    <div className="my-3 mx-2 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

                    {/* Demo section */}
                    <button onClick={() => setCurrentPage('demo-mode')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all" style={{ color: "#FF8C38" }} onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,107,0,0.1)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <Activity className="w-5 h-5" style={{ color: "#FF8C38" }} /><span className="text-sm font-semibold" style={{ fontFamily: "'Manrope', sans-serif" }}>Demo Mode</span>
                      <span className="text-[9px] ml-auto px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(255,107,0,0.2)", color: "#FF8C38" }}>SIH</span>
                    </button>
                  </nav>
                </SheetContent>
              </Sheet>

              {/* App title */}
              <div>
                <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "#FFFFFF", fontFamily: "'Manrope', sans-serif" }}>TRINETRA</p>
                <h1 className="text-base font-bold leading-tight" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Be Vietnam Pro', sans-serif" }}>Tourist Dashboard</h1>
              </div>
            </div>

            {/* Header actions */}
            <div className="flex items-center gap-2">
              <button
                className="w-9 h-9 rounded-xl flex items-center justify-center relative"
                style={{ background: "rgba(255,255,255,0.06)" }}
                onClick={() => setShowNotifications(true)}
              >
                <Bell className="w-4 h-4" style={{ color: "#FFFFFF" }} />
                {unreadCount > 0 && (
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "#E0362C" }} />
                )}
              </button>
              <button
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-white"
                style={{ background: "#E0362C", fontFamily: "'Be Vietnam Pro', sans-serif" }}
                onClick={() => setCurrentPage('sos')}
              >
                SOS
              </button>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: "#FF6B00", fontFamily: "'Be Vietnam Pro', sans-serif" }}>A</div>
            </div>
          </div>
        </header>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 px-4 pt-5 pb-24">
          {/* Welcome strip */}
          <div className="mb-5">
            <h2 className="text-2xl font-bold" style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>
              Welcome, <span style={{ color: "#FF6B00" }}>ANANT!</span>
            </h2>
            <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Manrope', sans-serif" }}>TRINETRA is monitoring your journey</p>
          </div>

          {/* Tourist Dashboard — Safety Pulse + Modes + Insights */}
          <TouristDashboard onNavigate={setCurrentPage} />

          {/* ── SECONDARY CONTENT: Weather + Nearby ── */}
          <div className="mt-5 space-y-4">
            {/* Weather strip */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Thermometer className="w-4 h-4" style={{ color: "#FF6B00" }} />
                <h3 className="text-sm font-semibold" style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>Weather Forecast</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {weatherData.slice(0, 2).map((weather, index) => (
                  <div key={index} className="p-4 rounded-2xl" style={index === 0 ? { background: "linear-gradient(135deg, #1A1A1A, #222222)", border: "1px solid rgba(255,107,0,0.2)" } : { background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex items-center justify-between mb-2">
                      <WeatherIcon condition={weather.icon} />
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={index === 0 ? { background: "rgba(255,255,255,0.12)", color: "white" } : { background: "rgba(255,107,0,0.1)", color: "#FF8C38" }}>
                        {weather.condition}
                      </span>
                    </div>
                    <p className="text-xs font-medium" style={{ color: "white", fontFamily: "'Be Vietnam Pro', sans-serif" }}>{weather.location}</p>
                    <p className="text-xl font-bold mt-0.5" style={{ color: index === 0 ? "#FF8C38" : "white", fontFamily: "'Be Vietnam Pro', sans-serif" }}>{weather.temp}°<span className="text-sm font-normal" style={{ color: "rgba(255,255,255,0.55)" }}>C</span></p>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby places */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" style={{ color: "#FF6B00" }} />
                  <h3 className="text-sm font-semibold" style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>Nearby Places</h3>
                </div>
                <button className="text-xs font-medium" style={{ color: "#FF6B00" }}>See All ›</button>
              </div>
              <div className="space-y-2">
                {nearbyPlaces.slice(0, 3).map(place => (
                  <div key={place.id} className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                      <ImageWithFallback src={place.image} alt={place.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: "#FF8C38", fontFamily: "'Manrope', sans-serif" }}>{place.type}</p>
                      <p className="text-sm font-semibold truncate" style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>{place.name}</p>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" style={{ color: "rgba(255,255,255,0.5)" }} />
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{place.distance}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5" style={{ color: "#FF6B00", fill: "#FF6B00" }} />
                      <span className="text-xs font-medium" style={{ color: "#FFFFFF" }}>{place.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* ── NOTIFICATIONS SHEET ── */}
        <Sheet open={showNotifications} onOpenChange={setShowNotifications}>
          <SheetContent side="right" className="w-80 border-l" style={{ background: "#1A1A1A", borderColor: "rgba(255,255,255,0.08)" }}>
            <SheetTitle style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>Notifications</SheetTitle>
            <SheetDescription className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Stay updated with your journey</SheetDescription>

            <div className="flex items-center justify-between mt-4 mb-4">
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>{unreadCount} unread</p>
              <button onClick={markAllAsRead} className="text-xs font-medium" style={{ color: "#FF6B00" }}>Mark all read</button>
            </div>

            <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
              {notificationList.map(notification => (
                <div
                  key={notification.id}
                  className="p-3 rounded-2xl cursor-pointer transition-all"
                  style={{ background: notification.read ? "rgba(255,255,255,0.03)" : "#222222", border: `1px solid ${notification.read ? "rgba(255,255,255,0.06)" : "rgba(255,107,0,0.3)"}` }}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5"><NotificationIcon type={notification.icon} /></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-semibold" style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>{notification.title}</p>
                        <button className="p-1 hover:opacity-70" onClick={e => { e.stopPropagation(); deleteNotification(notification.id); }} style={{ color: "rgba(255,255,255,0.4)" }}>
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-xs mt-1 line-clamp-2" style={{ color: "rgba(255,255,255,0.6)" }}>{notification.message}</p>
                      <p className="text-xs mt-1.5" style={{ color: "rgba(255,255,255,0.45)" }}>{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* ── AI CHATBOT SHEET ── */}
        <Sheet open={showChatbot} onOpenChange={setShowChatbot}>
          <SheetContent side="bottom" className="h-[80vh] border-t" style={{ background: "#1A1A1A", borderColor: "rgba(255,255,255,0.08)" }}>
            <SheetTitle style={{ color: "#FFFFFF", fontFamily: "'Be Vietnam Pro', sans-serif" }}>TRINETRA AI Assistant</SheetTitle>
            <SheetDescription className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Your travel companion for Northeast India</SheetDescription>

            <div className="flex flex-col h-full mt-4">
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {messages.map(message => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className="max-w-[80%] p-3 rounded-2xl" style={message.type === 'user' ? { background: "#FF6B00", color: "white" } : { background: "#222222", color: "white" }}>
                      <p className="text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 p-3 rounded-2xl" style={{ background: "#222222", border: "1.5px solid rgba(255,255,255,0.06)" }}>
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Ask about places, weather, hotels..."
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: "#FFFFFF", fontFamily: "'Manrope', sans-serif" }}
                  onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={handleSendMessage} className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#FF6B00" }}>
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Bottom Navigation */}
        <BottomNavigation
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onOpenChatbot={() => setShowChatbot(true)}
          showChatbot={showChatbot}
        />
      </div>
    </div>
  );
}
