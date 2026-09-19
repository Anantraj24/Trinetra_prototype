import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { BottomNavigation } from "./BottomNavigation";
import { useNavigation } from "./NavigationContext";
import {
  Phone,
  AlertTriangle,
  Shield,
  Zap,
  Hospital,
  Navigation,
  MapPin,
  Clock,
  User,
  FileText,
  Send,
  Copy,
  Share2,
  Heart,
  Activity,
  Siren,
  Radio,
  Camera,
  Mic,
  MessageSquare,
  Users,
  Target,
  Compass,
  ScanLine,
  ArrowLeft,
  UserPlus,
  CheckCircle,
  Star,
  Languages,
  MessageCircle,
  Navigation2,
  Timer,
  AlertCircle,
  LifeBuoy,
  UserCheck,
  Smartphone,
  Globe,
  Wifi,
  WifiOff,
  Lock,
  FileCheck,
  Satellite
} from "lucide-react";

interface EnhancedEmergencyPageProps {
  onBack?: () => void;
}

const emergencyContacts = [
  {
    service: 'Police',
    number: '100',
    description: 'For crime, theft, or security issues',
    icon: 'police',
    color: 'blue'
  },
  {
    service: 'Fire Department',
    number: '101',
    description: 'For fire emergencies and rescue',
    icon: 'fire',
    color: 'red'
  },
  {
    service: 'Ambulance',
    number: '108',
    description: 'Medical emergencies and accidents',
    icon: 'ambulance',
    color: 'green'
  },
  {
    service: 'Tourist Helpline',
    number: '1363',
    description: '24x7 Tourist helpline',
    icon: 'help',
    color: 'purple'
  },
  {
    service: 'Disaster Management',
    number: '1070',
    description: 'Natural disasters and evacuation',
    icon: 'disaster',
    color: 'orange'
  },
  {
    service: 'Women Helpline',
    number: '1091',
    description: 'Women safety and support',
    icon: 'women',
    color: 'pink'
  }
];

const localVolunteers = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    speciality: 'Emergency Medical',
    location: 'Shillong, Meghalaya',
    distance: '1.2 km',
    rating: 4.8,
    responseTime: '5-8 min',
    languages: ['English', 'Hindi', 'Khasi'],
    verified: true,
    available: true,
    expertise: ['First Aid', 'CPR', 'Emergency Medicine'],
    phone: '+91 98765 43210',
    lastActive: '2 min ago'
  },
  {
    id: 2,
    name: 'Mary Lyngdoh',
    speciality: 'Local Guide & Rescue',
    location: 'Cherrapunji, Meghalaya',
    distance: '2.5 km',
    rating: 4.9,
    responseTime: '10-15 min',
    languages: ['English', 'Khasi', 'Bengali'],
    verified: true,
    available: true,
    expertise: ['Local Navigation', 'Weather Safety', 'Cave Rescue'],
    phone: '+91 98765 43211',
    lastActive: '5 min ago'
  },
  {
    id: 3,
    name: 'Tenzin Norbu',
    speciality: 'Mountain Rescue',
    location: 'Tawang, Arunachal Pradesh',
    distance: '3.1 km',
    rating: 4.7,
    responseTime: '15-20 min',
    languages: ['English', 'Hindi', 'Tibetan'],
    verified: true,
    available: false,
    expertise: ['High Altitude Rescue', 'Mountaineering', 'Snow Safety'],
    phone: '+91 98765 43212',
    lastActive: '1 hour ago'
  },
  {
    id: 4,
    name: 'Priya Sharma',
    speciality: 'Women Safety Advocate',
    location: 'Guwahati, Assam',
    distance: '1.8 km',
    rating: 4.9,
    responseTime: '5-10 min',
    languages: ['English', 'Hindi', 'Assamese'],
    verified: true,
    available: true,
    expertise: ['Women Safety', 'Legal Support', 'Crisis Counseling'],
    phone: '+91 98765 43213',
    lastActive: '1 min ago'
  },
  {
    id: 5,
    name: 'James Mawlong',
    speciality: 'Vehicle Assistance',
    location: 'Shillong, Meghalaya',
    distance: '0.8 km',
    rating: 4.6,
    responseTime: '10-15 min',
    languages: ['English', 'Khasi'],
    verified: true,
    available: true,
    expertise: ['Vehicle Repair', 'Towing Service', 'Road Assistance'],
    phone: '+91 98765 43214',
    lastActive: '3 min ago'
  }
];

const safetyChecklist = [
  'Share your live location with emergency contacts',
  'Take photos of your situation (if safe to do so)',
  'Keep your phone charged and in signal range',
  'Stay calm and follow volunteer instructions',
  'Have important documents ready (ID, medical info)',
  'Know basic local emergency phrases'
];

const evidenceTimeline = [
  { time: '18:42', label: 'Normal', detail: 'All sensors nominal — route tracking active', status: 'normal' },
  { time: '18:49', label: 'Route deviation', detail: 'Unexpected path change detected', status: 'warning' },
  { time: '18:53', label: 'Hazard detected', detail: 'Environmental hazard flagged ahead', status: 'warning' },
  { time: '18:57', label: 'Connectivity lost', detail: 'Network signal dropped below threshold', status: 'critical' },
  { time: '19:02', label: 'Safety check', detail: 'Automated check-in triggered', status: 'warning' },
  { time: '19:03', label: 'No response', detail: 'User did not respond to safety check', status: 'critical' },
  { time: '19:07', label: 'SENTINEL activated', detail: 'Emergency protocol initiated automatically', status: 'critical' },
  { time: '19:09', label: 'SOS transmitted', detail: 'Rescue capsule sent to responders', status: 'critical' },
];

// Shared card style constants — premium dark + orange theme
const cardStyle: React.CSSProperties = {
  background: '#1A1A1A',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '12px',
  boxShadow: '0 2px 16px rgba(0,0,0,0.6)',
};

const sectionItemStyle: React.CSSProperties = {
  background: '#222222',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '10px',
};

export function EnhancedEmergencyPage({ onBack }: EnhancedEmergencyPageProps) {
  const { currentPage, setCurrentPage, showChatbot, setShowChatbot } = useNavigation();
  const [activeTab, setActiveTab] = useState<'emergency' | 'volunteers' | 'safety'>('emergency');
  const [selectedVolunteer, setSelectedVolunteer] = useState<typeof localVolunteers[0] | null>(null);
  const [emergencyType, setEmergencyType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [filterAvailable, setFilterAvailable] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  const handleEmergencyCall = (number: string) => {
    alert(`Calling ${number}...`);
  };

  const handleVolunteerContact = (volunteer: typeof localVolunteers[0], method: 'call' | 'chat') => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      if (method === 'call') {
        alert(`Calling ${volunteer.name} at ${volunteer.phone}...`);
      } else {
        alert(`Starting chat with ${volunteer.name}...`);
      }
    }, 2000);
  };

  const handleSendSOS = () => {
    alert('SOS signal sent to all nearby volunteers and emergency services!');
  };

  const filteredVolunteers = filterAvailable
    ? localVolunteers.filter(v => v.available)
    : localVolunteers;

  const getContactIconBg = (color: string) => {
    const map: Record<string, string> = {
      blue: '#2563EB',
      red: '#E0362C',
      green: '#4CAF7D',
      purple: '#7B6FD8',
      orange: '#FF6B00',
      pink: '#DB2777',
    };
    return map[color] ?? '#FF6B00';
  };

  const getContactButtonBg = (color: string) => getContactIconBg(color);

  const timelineDotColor = (status: string) => {
    if (status === 'normal') return 'rgba(255,255,255,0.3)';
    if (status === 'warning') return '#F59E0B';
    return '#E0362C';
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: '#111111', fontFamily: "'Manrope', sans-serif" }}
    >
      <div className="flex flex-col min-h-screen relative z-10">
        {/* Header */}
        <header
          style={{
            background: '#0D0D0D',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
          className="px-4 py-3"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              {onBack && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                  className="p-2 hover:bg-transparent"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              )}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#FF6B00' }}>
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1
                    className="text-lg font-semibold"
                    style={{ color: '#FFFFFF', fontFamily: "'Be Vietnam Pro', sans-serif" }}
                  >
                    TRINETRA Emergency
                  </h1>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>24/7 Help & Local Volunteers</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className="flex items-center text-xs px-2 py-1 rounded-full font-medium"
                style={
                  isOffline
                    ? { background: 'rgba(245,158,11,0.15)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.3)' }
                    : { background: 'rgba(76,175,125,0.15)', color: '#4CAF7D', border: '1px solid rgba(76,175,125,0.3)' }
                }
              >
                {isOffline ? <WifiOff className="w-3 h-3 mr-1" /> : <Wifi className="w-3 h-3 mr-1" />}
                {isOffline ? 'Offline' : 'Online'}
              </span>
            </div>
          </div>

          {/* Emergency SOS Button — RED for emergency communication */}
          <button
            onClick={handleSendSOS}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-lg mb-3 transition-opacity hover:opacity-90 active:scale-95"
            style={{
              background: '#E0362C',
              fontFamily: "'Be Vietnam Pro', sans-serif",
              letterSpacing: '0.04em',
              boxShadow: '0 4px 14px rgba(224,54,44,0.4)',
            }}
          >
            <Siren className="w-5 h-5 animate-pulse" />
            SEND SOS SIGNAL
          </button>

          {/* Tab Navigation */}
          <div
            className="flex space-x-1 p-1 rounded-xl"
            style={{ background: '#1A1A1A' }}
          >
            {(['emergency', 'volunteers', 'safety'] as const).map((tab) => {
              const active = activeTab === tab;
              const labels: Record<string, { label: string; Icon: any }> = {
                emergency: { label: 'Emergency', Icon: Phone },
                volunteers: { label: 'Volunteers', Icon: UserPlus },
                safety: { label: 'Safety', Icon: Shield },
              };
              const { label, Icon } = labels[tab];
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="flex-1 flex items-center justify-center gap-1 text-xs py-1.5 rounded-lg font-medium transition-all"
                  style={
                    active
                      ? {
                          background: '#FF6B00',
                          color: '#FFFFFF',
                          fontFamily: "'Be Vietnam Pro', sans-serif",
                        }
                      : {
                          background: '#222222',
                          color: 'rgba(255,255,255,0.5)',
                          fontFamily: "'Be Vietnam Pro', sans-serif",
                        }
                  }
                >
                  <Icon className="w-3 h-3" />
                  {label}
                </button>
              );
            })}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 pb-24 space-y-4">

          {/* ── Emergency Contacts Tab ── */}
          {activeTab === 'emergency' && (
            <>
              {/* Emergency Contacts Card */}
              <div style={cardStyle} className="overflow-hidden">
                <div className="px-4 pt-4 pb-2">
                  <h2
                    className="text-base font-semibold flex items-center gap-2"
                    style={{ color: '#FFFFFF', fontFamily: "'Be Vietnam Pro', sans-serif" }}
                  >
                    <Phone className="w-5 h-5" style={{ color: '#E0362C' }} />
                    Emergency Contacts
                  </h2>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Tap to call emergency services immediately
                  </p>
                </div>
                <div className="px-4 pb-4 space-y-2">
                  {emergencyContacts.map((contact, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-xl"
                      style={sectionItemStyle}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: getContactIconBg(contact.color) }}
                        >
                          {contact.icon === 'police' && <Shield className="w-5 h-5 text-white" />}
                          {contact.icon === 'fire' && <Zap className="w-5 h-5 text-white" />}
                          {contact.icon === 'ambulance' && <Hospital className="w-5 h-5 text-white" />}
                          {contact.icon === 'help' && <LifeBuoy className="w-5 h-5 text-white" />}
                          {contact.icon === 'disaster' && <AlertTriangle className="w-5 h-5 text-white" />}
                          {contact.icon === 'women' && <Heart className="w-5 h-5 text-white" />}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium" style={{ color: '#FFFFFF' }}>{contact.service}</h3>
                          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{contact.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleEmergencyCall(contact.number)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-white text-sm font-semibold transition-opacity hover:opacity-90"
                        style={{ background: getContactButtonBg(contact.color), fontFamily: "'Be Vietnam Pro', sans-serif" }}
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {contact.number}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Emergency Actions */}
              <div style={cardStyle} className="overflow-hidden">
                <div className="px-4 pt-4 pb-2">
                  <h2
                    className="text-base font-semibold flex items-center gap-2"
                    style={{ color: '#FFFFFF', fontFamily: "'Be Vietnam Pro', sans-serif" }}
                  >
                    <Zap className="w-5 h-5" style={{ color: '#F59E0B' }} />
                    Quick Emergency Actions
                  </h2>
                </div>
                <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                  {[
                    { Icon: Navigation2, label: 'Share Location', color: '#5B9AF5', bg: 'rgba(91,154,245,0.12)', border: 'rgba(91,154,245,0.25)' },
                    { Icon: Camera, label: 'Photo Evidence', color: '#4CAF7D', bg: 'rgba(76,175,125,0.12)', border: 'rgba(76,175,125,0.25)' },
                    { Icon: MessageSquare, label: 'Text Alert', color: '#FF8C38', bg: 'rgba(255,107,0,0.12)', border: 'rgba(255,107,0,0.25)' },
                    { Icon: Mic, label: 'Voice Record', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)' },
                  ].map(({ Icon, label, color, bg, border }) => (
                    <button
                      key={label}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
                      style={{ background: bg, color, border: `1px solid ${border}`, fontFamily: "'Manrope', sans-serif" }}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* TRINETRA Rescue Capsule — gradient featured card */}
              <div
                style={{
                  background: 'linear-gradient(160deg, #2A1500 0%, #1A0A00 50%, #0D0D0D 100%)',
                  border: '1px solid rgba(255,107,0,0.25)',
                  borderRadius: '12px',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.6)',
                  overflow: 'hidden',
                }}
              >
                <div
                  className="px-4 pt-4 pb-3 flex items-center justify-between"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(255,107,0,0.2)' }}
                    >
                      <Satellite className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2
                        className="text-sm font-bold"
                        style={{ color: '#FFFFFF', fontFamily: "'Be Vietnam Pro', sans-serif" }}
                      >
                        TRINETRA Rescue Capsule
                      </h2>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>Tamper-proof emergency data packet</p>
                    </div>
                  </div>
                  <span
                    className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(76,175,125,0.2)', color: '#4CAF7D', border: '1px solid rgba(76,175,125,0.4)' }}
                  >
                    <Lock className="w-3 h-3" />
                    Digitally Signed
                  </span>
                </div>

                <div className="px-4 py-3 grid grid-cols-2 gap-3">
                  {[
                    { label: 'Incident ID', value: 'TRN-2024-08742' },
                    { label: 'Risk Score', value: '87 / 100' },
                    { label: 'Confidence', value: '94.2%' },
                    { label: 'Last Safe Location', value: 'NH 6, Km 142' },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="p-2.5 rounded-xl"
                      style={{ background: 'rgba(255,107,0,0.08)', borderRadius: '10px' }}
                    >
                      <p className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>{label}</p>
                      <p className="text-sm font-semibold" style={{ color: '#FFFFFF', fontFamily: "'Be Vietnam Pro', sans-serif" }}>{value}</p>
                    </div>
                  ))}
                </div>

                <div
                  className="mx-4 mb-4 flex items-center justify-between px-3 py-2 rounded-xl"
                  style={{ background: 'rgba(255,107,0,0.08)', border: '1px solid rgba(255,107,0,0.15)' }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#4CAF7D' }}></div>
                    <span className="text-xs font-medium" style={{ color: '#FFFFFF' }}>Status: Ready to transmit</span>
                  </div>
                  <button
                    className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-90"
                    style={{ background: '#FF6B00' }}
                  >
                    <Send className="w-3 h-3" />
                    Transmit
                  </button>
                </div>
              </div>

              {/* Evidence Timeline */}
              <div style={cardStyle} className="overflow-hidden">
                <div className="px-4 pt-4 pb-2">
                  <h2
                    className="text-base font-semibold flex items-center gap-2"
                    style={{ color: '#FFFFFF', fontFamily: "'Be Vietnam Pro', sans-serif" }}
                  >
                    <FileCheck className="w-5 h-5" style={{ color: '#FF6B00' }} />
                    Evidence Timeline
                  </h2>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>Automated event log from SENTINEL</p>
                </div>
                <div className="px-4 pb-4">
                  <div className="relative pl-6">
                    {/* vertical track */}
                    <div
                      className="absolute left-2 top-2 bottom-2 w-0.5"
                      style={{ background: 'rgba(255,255,255,0.1)' }}
                    />
                    <div className="space-y-0">
                      {evidenceTimeline.map((event, i) => {
                        const dotColor = timelineDotColor(event.status);
                        return (
                          <div key={i} className="relative flex items-start gap-3 py-2">
                            {/* dot */}
                            <div
                              className="absolute -left-4 top-3 w-3 h-3 rounded-full border-2 flex-shrink-0"
                              style={{ background: dotColor, borderColor: '#1A1A1A', boxShadow: `0 0 0 2px ${dotColor}33` }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span
                                  className="text-xs font-bold tabular-nums"
                                  style={{ color: '#FF8C38', fontFamily: "'Be Vietnam Pro', sans-serif" }}
                                >
                                  {event.time}
                                </span>
                                <span
                                  className="text-xs font-semibold"
                                  style={{
                                    color: event.status === 'normal' ? '#FFFFFF' : event.status === 'warning' ? '#F59E0B' : '#E0362C',
                                    fontFamily: "'Be Vietnam Pro', sans-serif",
                                  }}
                                >
                                  {event.label}
                                </span>
                              </div>
                              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>{event.detail}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── Local Volunteers Tab ── */}
          {activeTab === 'volunteers' && (
            <>
              {/* Filter Bar */}
              <div style={cardStyle} className="overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold" style={{ color: '#FFFFFF', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                      Local Emergency Volunteers
                    </h3>
                    <button
                      onClick={() => setFilterAvailable(!filterAvailable)}
                      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
                      style={
                        filterAvailable
                          ? { background: '#4CAF7D', color: '#FFFFFF' }
                          : { background: '#222222', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }
                      }
                    >
                      <UserCheck className="w-3 h-3" />
                      Available Only
                    </button>
                  </div>
                  <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Verified local helpers ready to assist in emergencies
                  </p>
                </div>
              </div>

              {/* Volunteer Cards */}
              <div className="space-y-3">
                {filteredVolunteers.map((volunteer) => (
                  <div key={volunteer.id} style={cardStyle} className="overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3">
                          <div className="relative flex-shrink-0">
                            <div
                              className="w-12 h-12 rounded-full flex items-center justify-center"
                              style={{ background: 'rgba(255,107,0,0.15)' }}
                            >
                              <span className="text-sm font-semibold" style={{ color: '#FF8C38', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                                {volunteer.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div
                              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2"
                              style={{ background: volunteer.available ? '#4CAF7D' : 'rgba(255,255,255,0.3)', borderColor: '#1A1A1A' }}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1 flex-wrap gap-1">
                              <h3 className="text-sm font-semibold" style={{ color: '#FFFFFF', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                                {volunteer.name}
                              </h3>
                              {volunteer.verified && (
                                <span
                                  className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
                                  style={{ background: 'rgba(255,107,0,0.15)', color: '#FF8C38', border: '1px solid rgba(255,107,0,0.3)' }}
                                >
                                  <CheckCircle className="w-3 h-3" />
                                  Verified
                                </span>
                              )}
                            </div>
                            <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{volunteer.speciality}</p>
                            <div className="flex items-center space-x-2 text-xs mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                              <MapPin className="w-3 h-3 flex-shrink-0" />
                              <span>{volunteer.location}</span>
                              <span>•</span>
                              <span>{volunteer.distance}</span>
                            </div>
                            <div className="flex items-center space-x-3 text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 fill-current" style={{ color: '#E8A838' }} />
                                <span style={{ color: '#E8A838' }}>{volunteer.rating}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Timer className="w-3 h-3" />
                                <span>{volunteer.responseTime}</span>
                              </div>
                              <div className="flex items-center space-x-1" style={{ color: '#4CAF7D' }}>
                                <Clock className="w-3 h-3" />
                                <span>{volunteer.lastActive}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                          style={
                            volunteer.available
                              ? { background: 'rgba(76,175,125,0.15)', color: '#4CAF7D', border: '1px solid rgba(76,175,125,0.3)' }
                              : { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)' }
                          }
                        >
                          {volunteer.available ? 'Available' : 'Busy'}
                        </span>
                      </div>

                      {/* Expertise Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {volunteer.expertise.map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{ background: '#222222', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.08)' }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Languages */}
                      <div className="flex items-center space-x-1 text-xs mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        <Languages className="w-3 h-3" />
                        <span>Speaks: {volunteer.languages.join(', ')}</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        <button
                          disabled={!volunteer.available || isConnecting}
                          onClick={() => handleVolunteerContact(volunteer, 'call')}
                          className="flex items-center justify-center gap-1 text-xs flex-1 py-2 rounded-xl font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                          style={{ background: '#4CAF7D', fontFamily: "'Be Vietnam Pro', sans-serif" }}
                        >
                          <Phone className="w-3 h-3" />
                          {isConnecting ? 'Connecting...' : 'Call Now'}
                        </button>
                        <button
                          disabled={!volunteer.available || isConnecting}
                          onClick={() => handleVolunteerContact(volunteer, 'chat')}
                          className="flex items-center justify-center gap-1 text-xs flex-1 py-2 rounded-xl font-semibold transition-opacity hover:opacity-90 disabled:opacity-40"
                          style={{ background: 'transparent', color: '#FF6B00', border: '1px solid rgba(255,107,0,0.4)', fontFamily: "'Be Vietnam Pro', sans-serif" }}
                        >
                          <MessageCircle className="w-3 h-3" />
                          Chat
                        </button>
                        <button
                          onClick={() => setSelectedVolunteer(volunteer)}
                          className="flex items-center justify-center p-2 rounded-xl transition-opacity hover:opacity-80"
                          style={{ background: '#222222', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                          <User className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── Safety Tips Tab ── */}
          {activeTab === 'safety' && (
            <>
              {/* Safety Checklist */}
              <div style={cardStyle} className="overflow-hidden">
                <div className="px-4 pt-4 pb-2">
                  <h2
                    className="text-base font-semibold flex items-center gap-2"
                    style={{ color: '#FFFFFF', fontFamily: "'Be Vietnam Pro', sans-serif" }}
                  >
                    <Shield className="w-5 h-5" style={{ color: '#FF6B00' }} />
                    Emergency Safety Checklist
                  </h2>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>Follow these steps during an emergency</p>
                </div>
                <div className="px-4 pb-4 space-y-2">
                  {safetyChecklist.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-xl" style={sectionItemStyle}>
                      <div
                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: '#FF6B00' }}
                      >
                        <span className="text-xs font-semibold text-white">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm" style={{ color: '#FFFFFF' }}>{item}</p>
                      </div>
                      <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#4CAF7D' }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Essential Emergency Phrases */}
              <div style={cardStyle} className="overflow-hidden">
                <div className="px-4 pt-4 pb-2">
                  <h2
                    className="text-base font-semibold flex items-center gap-2"
                    style={{ color: '#FFFFFF', fontFamily: "'Be Vietnam Pro', sans-serif" }}
                  >
                    <Languages className="w-5 h-5" style={{ color: '#FF6B00' }} />
                    Essential Emergency Phrases
                  </h2>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>Key phrases in local languages</p>
                </div>
                <div className="px-4 pb-4 space-y-2">
                  {[
                    {
                      title: '"Help me" / "मेरी मदद करो"',
                      lines: ['Hindi: Meri madad karo', 'Assamese: Mok sohay korok', 'Bengali: Amake sahajyo korun'],
                    },
                    {
                      title: '"I need a doctor" / "मुझे डॉक्टर चाहिए"',
                      lines: ['Hindi: Mujhe doctor chahiye', 'Assamese: Mor daktor r proyojon', 'Bengali: Amar daktar dorkar'],
                    },
                  ].map(({ title, lines }) => (
                    <div key={title} className="p-3 rounded-xl" style={sectionItemStyle}>
                      <h4 className="text-sm font-semibold mb-2" style={{ color: '#FF6B00', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                        {title}
                      </h4>
                      <div className="space-y-0.5">
                        {lines.map((line) => (
                          <p key={line} className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advanced Safety Features */}
              <div style={cardStyle} className="overflow-hidden">
                <div className="px-4 pt-4 pb-2">
                  <h2
                    className="text-base font-semibold flex items-center gap-2"
                    style={{ color: '#FFFFFF', fontFamily: "'Be Vietnam Pro', sans-serif" }}
                  >
                    <Smartphone className="w-5 h-5" style={{ color: '#FF6B00' }} />
                    Advanced Safety Features
                  </h2>
                </div>
                <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                  {[
                    { Icon: Radio, label: 'Emergency Beacon', color: '#E0362C', bg: 'rgba(224,54,44,0.12)', border: 'rgba(224,54,44,0.25)' },
                    { Icon: Target, label: 'Location Tracker', color: '#5B9AF5', bg: 'rgba(91,154,245,0.12)', border: 'rgba(91,154,245,0.25)' },
                    { Icon: MessageSquare, label: 'Silent Alert', color: '#4CAF7D', bg: 'rgba(76,175,125,0.12)', border: 'rgba(76,175,125,0.25)' },
                    { Icon: Activity, label: 'Health Monitor', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)' },
                  ].map(({ Icon, label, color, bg, border }) => (
                    <button
                      key={label}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
                      style={{ background: bg, color, border: `1px solid ${border}`, fontFamily: "'Manrope', sans-serif" }}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
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
