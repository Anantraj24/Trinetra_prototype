import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { BottomNavigation } from "./BottomNavigation";
import { useNavigation } from "./NavigationContext";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Badge as UIBadge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./ui/ImageWithFallback";
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
import { DestinationDetailModal } from "./DestinationDetailModal";
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
  Settings,
  Search,
  MoreHorizontal,
  ArrowUpRight,
  Mountain,
  Star,
  Menu,
  Home,
  Cloud,
  Sun,
  CloudRain,
  Thermometer,
  Wind,
  Eye,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  StarIcon,
  ThumbsUp,
  Navigation,
  MessageCircle,
  Send,
  Bot,
  Mic,
  Camera,
  Navigation2,
  Coffee,
  Fuel,
  UtensilsCrossed,
  ShoppingBag,
  Compass,
  Siren,
  X,
  Plane,
  CloudSnow,
  AlertCircle,
  Info,
  Gift,
  Languages,
  Route,
  ShieldCheck,
  UserPlus,
  Hotel,
  MessageSquare,
  Globe,
  Download,
  Wifi,
  WifiOff,
  Navigation3,
  Plus,
  BookOpen,
  ArrowRightLeft,
  Volume2
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
    image: 'https://images.unsplash.com/photo-1607712617949-8c993d290809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzU3MTQ4Nzg1fDA&ixlib=rb-4.1.0&q=80&w=1080'
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
    image: 'https://images.unsplash.com/photo-1672560045744-17f136d4a21c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNvcnQlMjBub3J0aGVhc3QlMjBpbmRpYXxlbnwxfHx8fDE3NTcxODQ4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080'
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
    image: 'https://images.unsplash.com/photo-1672560045744-17f136d4a21c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNvcnQlMjBub3J0aGVhc3QlMjBpbmRpYXxlbnwxfHx8fDE3NTcxODQ4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

const hotelsToRate = [
  { 
    id: 1, 
    hotel: 'Blue Pine Resort', 
    location: 'Shillong, Meghalaya',
    stayDate: 'Nov 2024',
    currentRating: 0,
    image: 'https://images.unsplash.com/photo-1607712617949-8c993d290809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNTY3Nzg0ODYwfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  { 
    id: 2, 
    hotel: 'Monastery View Inn', 
    location: 'Tawang, Arunachal Pradesh',
    stayDate: 'Oct 2024',
    currentRating: 4,
    image: 'https://images.unsplash.com/photo-1672560045744-17f136d4a21c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNvcnQlMjBub3J0aGVhc3QlMjBpbmRpYXxlbnwxfHx8fDE3NTcxODQ4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080'
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
    image: 'https://images.unsplash.com/photo-1689947674001-f9a8a08f0480?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVhc3QlMjBpbmRpYSUyMHRlbXBsZXxlbnwxfHx8fDE3NTcxODUxNzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: 'temple'
  },
  { 
    id: 2, 
    name: 'City Cafe', 
    type: 'Restaurant', 
    distance: '0.8 km', 
    rating: 4.5, 
    openStatus: 'Open',
    image: 'https://images.unsplash.com/photo-1592693973461-cbdbcc153064?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwY2FmZXxlbnwxfHx8fDE3NTcxODUxNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: 'restaurant'
  },
  { 
    id: 3, 
    name: 'Shillong Fuel Station', 
    type: 'Fuel Station', 
    distance: '1.2 km', 
    rating: 4.2, 
    openStatus: '24/7',
    image: 'https://images.unsplash.com/photo-1592693973461-cbdbcc153064?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdWVsJTIwc3RhdGlvbnxlbnwxfHx8fDE3NTcxODUxODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: 'fuel'
  },
  { 
    id: 4, 
    name: 'Meghalaya Market', 
    type: 'Shopping', 
    distance: '1.5 km', 
    rating: 4.3, 
    openStatus: 'Open',
    image: 'https://images.unsplash.com/photo-1592693973461-cbdbcc153064?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wcGluZyUyMG1hcmtldHxlbnwxfHx8fDE3NTcxODUxODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
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
  },
  {
    id: 6,
    type: 'info',
    title: 'Local Event',
    message: 'Hornbill Festival starts next week in Nagaland. Book your tickets now!',
    time: '5 hours ago',
    read: true,
    icon: 'info',
    priority: 'medium'
  },
  {
    id: 7,
    type: 'guide',
    title: 'Tour Guide Assigned',
    message: 'Ravi Kumar has been assigned as your guide for the Kaziranga tour.',
    time: '1 day ago',
    read: true,
    icon: 'user',
    priority: 'medium'
  }
];

export function MobileDashboard() {
  const { currentPage, setCurrentPage, showChatbot, setShowChatbot } = useNavigation();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedRating, setSelectedRating] = useState<{[key: number]: number}>({});
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState(chatMessages);
  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationList, setNotificationList] = useState(notifications);

  const WeatherIcon = ({ condition }: { condition: string }) => {
    switch (condition) {
      case 'sun': return <Sun className="w-4 h-4 text-yellow-400" />;
      case 'cloud': return <Cloud className="w-4 h-4 text-gray-400" />;
      case 'rain': return <CloudRain className="w-4 h-4 text-blue-400" />;
      default: return <Sun className="w-4 h-4 text-yellow-400" />;
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
              className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
            />
          </button>
        ))}
      </div>
    );
  };

  const PlaceIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'temple': return <Mountain className="w-4 h-4 text-orange-400" />;
      case 'restaurant': return <UtensilsCrossed className="w-4 h-4 text-red-400" />;
      case 'fuel': return <Fuel className="w-4 h-4 text-blue-400" />;
      case 'shopping': return <ShoppingBag className="w-4 h-4 text-purple-400" />;
      default: return <MapPin className="w-4 h-4 text-emerald-400" />;
    }
  };

  const NotificationIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'check': return <CheckCircle className="w-4 h-4 text-primary" />;
      case 'cloud': return <CloudRain className="w-4 h-4 text-blue-400" />;
      case 'gift': return <Gift className="w-4 h-4 text-accent" />;
      case 'plane': return <Plane className="w-4 h-4 text-blue-500" />;
      case 'alert': return <AlertCircle className="w-4 h-4 text-destructive" />;
      case 'info': return <Info className="w-4 h-4 text-blue-400" />;
      case 'user': return <Users className="w-4 h-4 text-primary" />;
      default: return <Bell className="w-4 h-4 text-muted-foreground" />;
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
  if (currentPage === 'profile') {
    return <ProfilePage onBack={() => setCurrentPage('home')} />;
  }
  
  if (currentPage === 'maps') {
    return <EnhancedMapsPage onBack={() => setCurrentPage('home')} />;
  }
  
  if (currentPage === 'guide') {
    return <EnhancedTourGuidePage onBack={() => setCurrentPage('home')} />;
  }
  
  if (currentPage === 'emergency') {
    return <EnhancedEmergencyPage onBack={() => setCurrentPage('home')} />;
  }
  
  if (currentPage === 'travel-groups') {
    return <TravelGroupsPage onBack={() => setCurrentPage('home')} />;
  }
  
  if (currentPage === 'translate') {
    return <TranslatePage onBack={() => setCurrentPage('home')} />;
  }
  
  if (currentPage === 'ekyc') {
    return <EKYCPage onBack={() => setCurrentPage('home')} />;
  }
  
  if (currentPage === 'report') {
    return <ReportIssuePage onBack={() => setCurrentPage('home')} />;
  }
  
  if (currentPage === 'sos') {
    return <SOSPage onBack={() => setCurrentPage('home')} />;
  }
  
  if (currentPage === 'health') {
    return <MyHealthPage onBack={() => setCurrentPage('home')} />;
  }
  
  if (currentPage === 'advanced-security') {
    return <AdvancedSecurityPage onBack={() => setCurrentPage('home')} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
      {/* Stormy Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-slate-600/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(71,85,105,0.3),transparent_70%)]"></div>
      
      {/* Lightning-like Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse shadow-lg shadow-blue-400/20"></div>
        <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-slate-300/50 rounded-full animate-pulse shadow-lg shadow-slate-300/30" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-blue-300/60 rounded-full animate-pulse shadow-lg shadow-blue-300/40" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/6 right-1/3 w-0.5 h-0.5 bg-slate-200/70 rounded-full animate-pulse shadow-lg shadow-slate-200/50" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="flex flex-col min-h-screen relative z-10">
        {/* Mobile Header */}
        <header className="bg-card/60 backdrop-blur-xl border-b border-border px-4 py-3 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-2">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 bg-card/95 backdrop-blur-xl border-border">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">Access different sections of the TRINETRA app</SheetDescription>
                  <div className="flex items-center space-x-2 mb-8 mt-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <Mountain className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <h1 className="text-xl text-foreground tracking-tight">TRINETRA</h1>
                  </div>
                  
                  <nav className="space-y-2">
                    <a href="#" className="flex items-center space-x-3 px-3 py-3 rounded-lg bg-primary/10 text-primary border border-primary/20">
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Overview</span>
                    </a>
                    <button 
                      onClick={() => setCurrentPage('profile')}
                      className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                    >
                      <Users className="w-4 h-4" />
                      <span>My Profile</span>
                    </button>
                    <button 
                      onClick={() => setCurrentPage('maps')}
                      className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                    >
                      <Map className="w-4 h-4" />
                      <span>Maps</span>
                    </button>
                    <button 
                      onClick={() => setCurrentPage('ekyc')}
                      className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                    >
                      <Shield className="w-4 h-4" />
                      <span>eKYC</span>
                    </button>
                    <button 
                      onClick={() => setCurrentPage('guide')}
                      className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>Tour Guide</span>
                    </button>
                    <button 
                      onClick={() => setCurrentPage('travel-groups')}
                      className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                    >
                      <Users className="w-4 h-4" />
                      <span>Travel Groups</span>
                    </button>
                    <button 
                      onClick={() => setCurrentPage('translate')}
                      className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                    >
                      <Languages className="w-4 h-4" />
                      <span>Translate</span>
                    </button>
                    <button 
                      onClick={() => setCurrentPage('report')}
                      className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>Report Issue</span>
                    </button>
                    <button 
                      onClick={() => setCurrentPage('sos')}
                      className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      <span>SOS</span>
                    </button>
                    <button 
                      onClick={() => setCurrentPage('health')}
                      className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                    >
                      <Heart className="w-4 h-4" />
                      <span>My Health</span>
                    </button>
                    <button 
                      onClick={() => setCurrentPage('advanced-security')}
                      className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Advanced Security</span>
                    </button>
                  </nav>
                </SheetContent>
              </Sheet>
              
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-md flex items-center justify-center">
                  <Mountain className="w-3 h-3 text-primary-foreground" />
                </div>
                <h1 className="text-lg text-foreground tracking-tight">TRINETRA</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground hover:text-foreground p-2 relative"
                onClick={() => setShowNotifications(true)}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full"></div>
                )}
              </Button>
              
              {/* Emergency SOS Button */}
              <Button 
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 h-8 text-xs animate-pulse"
                onClick={() => alert('SOS Alert Sent! Emergency services have been notified.')}
              >
                <Phone className="w-4 h-4 mr-1" />
                SOS
              </Button>
              
              <Avatar className="w-8 h-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">A</AvatarFallback>
              </Avatar>
            </div>
          </div>
          
          {/* Mobile Search */}
          <div className="mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search destinations, tours..." 
                className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-ring focus:ring-1 transition-all text-sm"
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 pb-20 space-y-6">
          {/* Welcome Section */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl text-foreground">Welcome, ANANT!</h2>
            <p className="text-muted-foreground text-sm">Predict. Verify. Protect. Even Offline.</p>
          </div>

          {/* Weather Forecast */}
          <Card className="bg-card/60 border-border backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-foreground text-lg flex items-center">
                <Thermometer className="w-5 h-5 mr-2 text-primary" />
                Weather Forecast
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm">Current weather in popular destinations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weatherData.slice(0, 2).map((weather, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <WeatherIcon condition={weather.icon} />
                      </div>
                      <div>
                        <p className="text-foreground font-medium">{weather.location}</p>
                        <p className="text-muted-foreground text-sm">{weather.condition}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-foreground text-xl">{weather.temp}°C</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {weather.humidity}%
                        </div>
                        <div className="flex items-center">
                          <Wind className="w-3 h-3 mr-1" />
                          {weather.windSpeed}km/h
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                View Full Forecast
              </Button>
            </CardContent>
          </Card>

          {/* Nearby Places */}
          <Card className="bg-card/60 border-border backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-foreground text-lg flex items-center">
                <Navigation className="w-5 h-5 mr-2 text-primary" />
                Nearby Places
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm">Discover places around you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nearbyPlaces.map((place) => (
                  <div key={place.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                      <ImageWithFallback 
                        src={place.image} 
                        alt={place.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <PlaceIcon type={place.icon} />
                        <p className="text-foreground font-medium text-sm truncate">{place.name}</p>
                        <Badge className={`text-xs px-2 py-0.5 ${
                          place.openStatus === 'Open' 
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : place.openStatus === '24/7'
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                            : 'bg-red-500/20 text-red-400 border-red-500/30'
                        }`}>
                          {place.openStatus}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <p className="text-muted-foreground text-xs">{place.type} • {place.distance}</p>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-xs text-foreground font-medium">{place.rating}</span>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 text-xs px-2 py-1 h-6"
                        >
                          <Navigation2 className="w-3 h-3 mr-1" />
                          Navigate
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                View All Places
              </Button>
            </CardContent>
          </Card>

          {/* Hotel Bookings */}
          <Card className="bg-card/60 border-border backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-foreground text-lg flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-primary" />
                Hotel Bookings
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm">Your upcoming stays</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {hotelBookings.slice(0, 2).map((booking) => (
                  <div key={booking.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="w-16 h-12 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                      <ImageWithFallback 
                        src={booking.image} 
                        alt={booking.hotel}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-foreground font-medium text-sm">{booking.hotel}</p>
                          <p className="text-muted-foreground text-xs">{booking.location}</p>
                        </div>
                        <UIBadge 
                          className={`text-xs ${
                            booking.status === 'confirmed' 
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                              : booking.status === 'pending'
                              ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                              : 'bg-red-500/20 text-red-400 border-red-500/30'
                          }`}
                        >
                          {booking.status}
                        </UIBadge>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {booking.checkIn} - {booking.checkOut}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {booking.nights} nights
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                View All Bookings
              </Button>
            </CardContent>
          </Card>

          {/* Rate Hotels */}
          <Card className="bg-card/60 border-border backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-foreground text-lg flex items-center">
                <Star className="w-5 h-5 mr-2 text-primary" />
                Rate Your Stays
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm">Help others by rating your recent stays</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hotelsToRate.map((hotel) => (
                  <div key={hotel.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="w-16 h-12 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                      <ImageWithFallback 
                        src={hotel.image} 
                        alt={hotel.hotel}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-foreground font-medium text-sm">{hotel.hotel}</p>
                          <p className="text-muted-foreground text-xs">{hotel.location}</p>
                          <p className="text-muted-foreground text-xs">Stayed in {hotel.stayDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <StarRating 
                          rating={selectedRating[hotel.id] || hotel.currentRating} 
                          onRatingChange={(rating) => setSelectedRating(prev => ({...prev, [hotel.id]: rating}))} 
                          hotelId={hotel.id}
                        />
                        <Button size="sm" variant="outline" className="text-xs px-3 py-1 h-7">
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tourist Analytics */}
          <Card className="bg-card/60 border-border backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-foreground text-lg flex items-center">
                <BarChart className="w-5 h-5 mr-2 text-primary" />
                Tourist Analytics
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm">Monthly visitor trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={touristVisitsData}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis hide />
                  <Area 
                    type="monotone" 
                    dataKey="visitors" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorVisitors)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </main>

        {/* Notifications Sheet */}
        <Sheet open={showNotifications} onOpenChange={setShowNotifications}>
          <SheetContent side="right" className="w-80 bg-card/95 backdrop-blur-xl border-border">
            <SheetTitle className="text-foreground">Notifications</SheetTitle>
            <SheetDescription className="text-muted-foreground text-sm">Stay updated with your travel activities</SheetDescription>
            
            <div className="flex items-center justify-between mt-4 mb-4">
              <p className="text-sm text-muted-foreground">{unreadCount} unread</p>
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                Mark all read
              </Button>
            </div>
            
            <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
              {notificationList.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    notification.read 
                      ? 'bg-muted/30 border-border' 
                      : 'bg-primary/10 border-primary/20'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <NotificationIcon type={notification.icon} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <p className="text-sm text-foreground font-medium">{notification.title}</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-auto p-1 hover:bg-destructive/20 hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* AI Chatbot Sheet */}
        <Sheet open={showChatbot} onOpenChange={setShowChatbot}>
          <SheetContent side="bottom" className="h-[80vh] bg-card/95 backdrop-blur-xl border-border">
            <SheetTitle className="text-foreground">TRINETRA AI Assistant</SheetTitle>
            <SheetDescription className="text-muted-foreground text-sm">Your personal travel companion for Northeast India</SheetDescription>
            
            <div className="flex flex-col h-full mt-4">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-foreground border border-border'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center space-x-2 p-2 border border-border rounded-lg bg-input-background">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about places, weather, hotels..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button 
                  size="sm" 
                  onClick={handleSendMessage}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1 h-8"
                >
                  <Send className="w-4 h-4" />
                </Button>
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