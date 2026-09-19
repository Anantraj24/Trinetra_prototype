import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BottomNavigation } from "./BottomNavigation";
import { useNavigation } from "./NavigationContext";
import {
  MapPin,
  Navigation,
  Search,
  Filter,
  Layers,
  Download,
  Wifi,
  WifiOff,
  Phone,
  Shield,
  AlertTriangle,
  Star,
  Clock,
  Navigation2,
  Compass,
  Zap,
  Hospital,
  Car,
  Fuel,
  UtensilsCrossed,
  ShoppingBag,
  Mountain,
  TreePine,
  Camera,
  Plus,
  Minus,
  Target,
  Route,
  FileText,
  Share2,
  ArrowLeft,
  CheckCircle,
  Globe,
  Trash2,
  RefreshCw,
  Users,
  AlertCircle,
  Languages,
  UserPlus,
  MessageSquare,
  Hotel,
  Mic,
  ScanLine
} from "lucide-react";

interface EnhancedMapsPageProps {
  onBack?: () => void;
}

const offlineAreas = [
  { name: 'Shillong City', size: '45 MB', downloaded: true, lastUpdate: '2 days ago' },
  { name: 'Kaziranga National Park', size: '78 MB', downloaded: true, lastUpdate: '1 week ago' },
  { name: 'Tawang Valley', size: '92 MB', downloaded: false, lastUpdate: 'Not downloaded' },
  { name: 'Cherrapunji Region', size: '56 MB', downloaded: true, lastUpdate: '3 days ago' },
  { name: 'Kohima Hills', size: '34 MB', downloaded: false, lastUpdate: 'Not downloaded' },
  { name: 'Imphal Valley', size: '41 MB', downloaded: false, lastUpdate: 'Not downloaded' }
];

const smartRoutes = [
  {
    id: 1,
    destination: 'Tawang Monastery',
    via: 'NH-13',
    duration: '8.5 hours',
    type: 'safe',
    condition: 'Good weather',
    travelers: 234,
    warnings: [],
    safety_score: 9.2
  },
  {
    id: 2,
    destination: 'Kaziranga National Park',
    via: 'NH-37',
    duration: '4.2 hours',
    type: 'fast',
    condition: 'Light traffic',
    travelers: 189,
    warnings: ['Road work at 2 locations'],
    safety_score: 7.8
  },
  {
    id: 3,
    destination: 'Cherrapunji Falls',
    via: 'State Highway 4',
    duration: '2.8 hours',
    type: 'scenic',
    condition: 'Clear roads',
    travelers: 156,
    warnings: ['Heavy rain expected'],
    safety_score: 8.5
  }
];

const localVolunteers = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    location: 'Shillong',
    speciality: 'Emergency Medical',
    distance: '1.2 km',
    rating: 4.8,
    languages: ['English', 'Hindi', 'Khasi'],
    verified: true
  },
  {
    id: 2,
    name: 'Mary Lyngdoh',
    location: 'Cherrapunji',
    speciality: 'Local Guide',
    distance: '2.5 km',
    rating: 4.9,
    languages: ['English', 'Khasi'],
    verified: true
  },
  {
    id: 3,
    name: 'Tenzin Norbu',
    location: 'Tawang',
    speciality: 'Mountain Rescue',
    distance: '3.1 km',
    rating: 4.7,
    languages: ['English', 'Hindi', 'Tibetan'],
    verified: true
  }
];

const recommendedHotels = [
  {
    id: 1,
    name: 'Shillong Heights Resort',
    location: 'Shillong',
    rating: 4.8,
    reviews: 127,
    price: '₹4,500',
    features: ['Mountain View', 'Spa', 'Restaurant'],
    distance: '2.3 km',
    recommended_for: 'Couples and families',
    safety_rating: 9.1
  },
  {
    id: 2,
    name: 'Tawang Valley Lodge',
    location: 'Tawang',
    rating: 4.6,
    reviews: 89,
    price: '₹3,200',
    features: ['Valley View', 'Local Cuisine', 'Monastery Tours'],
    distance: '1.8 km',
    recommended_for: 'Adventure seekers',
    safety_rating: 8.7
  }
];

// Design tokens — dark + orange premium theme
const colors = {
  pageBg: '#111111',
  cardBg: '#1A1A1A',
  cardBorder: '1px solid rgba(255,255,255,0.06)',
  cardShadow: '0 2px 16px rgba(0,0,0,0.6)',
  primary: '#FF6B00',
  primaryLight: '#FF8C38',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.55)',
  textMuted: 'rgba(255,255,255,0.35)',
  inputBg: '#222222',
  green: '#4CAF7D',
  amber: '#F59E0B',
  red: '#E0362C',
  blue: '#5B9AF5',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#1A1A1A',
  border: '1px solid rgba(255,255,255,0.06)',
  boxShadow: '0 2px 16px rgba(0,0,0,0.6)',
  borderRadius: '16px',
};

const innerItemStyle: React.CSSProperties = {
  backgroundColor: '#222222',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '10px',
};

export function EnhancedMapsPage({ onBack }: EnhancedMapsPageProps) {
  const { currentPage, setCurrentPage, showChatbot, setShowChatbot } = useNavigation();
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showVolunteers, setShowVolunteers] = useState(false);
  const [showHotelReviews, setShowHotelReviews] = useState(false);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: colors.pageBg }}
    >
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header
          className="px-4 py-3 sticky top-0 z-30"
          style={{
            backgroundColor: '#0D0D0D',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
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
              <h1
                className="text-xl font-semibold"
                style={{ color: '#FFFFFF', letterSpacing: '0.02em' }}
              >
                TRINETRA Maps
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className="inline-flex items-center text-xs px-2 py-0.5 rounded-full border"
                style={isOfflineMode
                  ? { backgroundColor: 'rgba(76,175,125,0.15)', color: colors.green, borderColor: 'rgba(76,175,125,0.3)' }
                  : { backgroundColor: 'rgba(91,154,245,0.15)', color: colors.blue, borderColor: 'rgba(91,154,245,0.3)' }
                }
              >
                {isOfflineMode ? <WifiOff className="w-3 h-3 mr-1" /> : <Wifi className="w-3 h-3 mr-1" />}
                {isOfflineMode ? 'Offline' : 'Online'}
              </span>
              <button
                onClick={() => setIsOfflineMode(!isOfflineMode)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                <Layers className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-3">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            />
            <input
              type="text"
              placeholder="Search places, services, routes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl focus:outline-none transition-all"
              style={{
                backgroundColor: '#222222',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#FFFFFF',
              }}
            />
          </div>

          {/* Feature Toggle Buttons */}
          <div className="flex space-x-2 overflow-x-auto pb-1">
            <button
              onClick={() => setShowVolunteers(!showVolunteers)}
              className="flex-shrink-0 flex items-center text-xs px-3 py-1.5 rounded-full border transition-colors"
              style={{
                backgroundColor: showVolunteers ? '#FF6B00' : '#222222',
                color: showVolunteers ? '#FFFFFF' : 'rgba(255,255,255,0.55)',
                borderColor: showVolunteers ? '#FF6B00' : 'rgba(255,255,255,0.08)',
              }}
            >
              <UserPlus className="w-3 h-3 mr-1" />
              Local Volunteers
            </button>
            <button
              onClick={() => setShowHotelReviews(!showHotelReviews)}
              className="flex-shrink-0 flex items-center text-xs px-3 py-1.5 rounded-full border transition-colors"
              style={{
                backgroundColor: showHotelReviews ? '#FF6B00' : '#222222',
                color: showHotelReviews ? '#FFFFFF' : 'rgba(255,255,255,0.55)',
                borderColor: showHotelReviews ? '#FF6B00' : 'rgba(255,255,255,0.08)',
              }}
            >
              <Hotel className="w-3 h-3 mr-1" />
              Hotel Reviews
            </button>
            <button
              className="flex-shrink-0 flex items-center text-xs px-3 py-1.5 rounded-full border transition-colors"
              style={{
                backgroundColor: '#222222',
                color: 'rgba(255,255,255,0.55)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              <Languages className="w-3 h-3 mr-1" />
              Translate
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 pb-20 space-y-4">

          {/* Shadow Corridor Section — dark orange gradient featured card */}
          <div
            className="p-4"
            style={{
              background: 'linear-gradient(135deg, #2A1500, #1A0A00)',
              border: '1px solid rgba(255,107,0,0.2)',
              boxShadow: '0 2px 16px rgba(0,0,0,0.6)',
              borderRadius: '16px',
              borderLeft: `4px solid ${colors.amber}`,
            }}
          >
            <div className="flex items-start space-x-3 mb-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(245,158,11,0.18)' }}
              >
                <AlertTriangle className="w-5 h-5" style={{ color: colors.amber }} />
              </div>
              <div>
                <h2 className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                  Shadow Corridor
                </h2>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Primary route has an active hazard. Recommended fallback available.
                </p>
              </div>
            </div>
            <div
              className="flex items-center space-x-2 px-3 py-2 rounded-lg mb-3"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: colors.green }} />
              <span className="text-xs" style={{ color: '#FFFFFF' }}>
                Safe Point S4 · 1.6 km · Available Offline
              </span>
            </div>
            <button
              className="w-full flex items-center justify-center text-xs px-3 py-2 rounded-lg border transition-colors hover:bg-white/10"
              style={{
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                borderColor: 'rgba(255,107,0,0.4)',
                fontWeight: 600,
              }}
            >
              <Navigation2 className="w-3.5 h-3.5 mr-1.5" />
              Navigate to Safe Point
            </button>
          </div>

          {/* Enhanced Offline Maps */}
          <div style={cardStyle} className="overflow-hidden">
            <div className="px-4 pt-4 pb-3">
              <div className="flex items-center mb-0.5">
                <Compass className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
                <h2 className="text-base font-semibold" style={{ color: '#FFFFFF' }}>
                  Offline Maps & Storage
                </h2>
              </div>
              <p className="text-xs ml-7" style={{ color: colors.textSecondary }}>
                Download areas for offline navigation
              </p>
            </div>
            <div className="px-4 pb-4">
              {/* Storage Status */}
              <div className="mb-4 p-3 rounded-xl" style={innerItemStyle}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium" style={{ color: '#FFFFFF' }}>Storage Used</span>
                  <span className="text-xs" style={{ color: colors.textSecondary }}>271 MB / 1 GB</span>
                </div>
                {/* Storage bar: track #222222, fill #FF6B00 */}
                <div className="w-full rounded-full h-2" style={{ backgroundColor: '#222222' }}>
                  <div
                    className="h-2 rounded-full"
                    style={{ width: '27%', backgroundColor: '#FF6B00' }}
                  ></div>
                </div>
              </div>

              {/* Offline Areas */}
              <div className="space-y-2">
                {offlineAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl" style={innerItemStyle}>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-sm font-medium" style={{ color: '#FFFFFF' }}>{area.name}</h3>
                        {area.downloaded && (
                          <span
                            className="inline-flex items-center text-xs px-1.5 py-0.5 rounded-full"
                            style={{
                              backgroundColor: 'rgba(76,175,125,0.15)',
                              color: colors.green,
                              border: '1px solid rgba(76,175,125,0.3)',
                            }}
                          >
                            <CheckCircle className="w-3 h-3 mr-0.5" />
                            Downloaded
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1.5 text-xs" style={{ color: colors.textMuted }}>
                        <span>{area.size}</span>
                        <span>·</span>
                        <span>{area.lastUpdate}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-3">
                      {area.downloaded && (
                        <button
                          className="p-1.5 rounded-lg border transition-colors hover:bg-white/10"
                          style={{
                            backgroundColor: 'transparent',
                            borderColor: 'rgba(255,255,255,0.08)',
                            color: colors.textMuted,
                          }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                      <button
                        className="flex items-center text-xs px-2.5 py-1.5 rounded-lg border transition-colors hover:opacity-80"
                        style={
                          area.downloaded
                            ? {
                                backgroundColor: 'transparent',
                                borderColor: 'rgba(255,107,0,0.3)',
                                color: colors.primary,
                              }
                            : {
                                backgroundColor: '#FF6B00',
                                borderColor: '#FF6B00',
                                color: '#FFFFFF',
                              }
                        }
                      >
                        {area.downloaded ? (
                          <>
                            <RefreshCw className="w-3 h-3 mr-1" />
                            Update
                          </>
                        ) : (
                          <>
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Smart Route Recommendations */}
          <div style={cardStyle} className="overflow-hidden">
            <div className="px-4 pt-4 pb-3">
              <div className="flex items-center mb-0.5">
                <Route className="w-5 h-5 mr-2" style={{ color: colors.green }} />
                <h2 className="text-base font-semibold" style={{ color: '#FFFFFF' }}>
                  Smart Route Recommendations
                </h2>
              </div>
              <p className="text-xs ml-7" style={{ color: colors.textSecondary }}>
                AI-powered safe and efficient route suggestions
              </p>
            </div>
            <div className="px-4 pb-4">
              <div className="space-y-2">
                {smartRoutes.map((route) => (
                  <div key={route.id} className="p-3 rounded-xl" style={innerItemStyle}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium" style={{ color: '#FFFFFF' }}>{route.destination}</span>
                      <div className="flex items-center space-x-2">
                        <span
                          className="inline-flex items-center text-xs px-1.5 py-0.5 rounded-full border"
                          style={
                            route.type === 'safe'
                              ? { backgroundColor: 'rgba(76,175,125,0.15)', color: colors.green, borderColor: 'rgba(76,175,125,0.3)' }
                              : route.type === 'fast'
                              ? { backgroundColor: 'rgba(91,154,245,0.15)', color: colors.blue, borderColor: 'rgba(91,154,245,0.3)' }
                              : { backgroundColor: 'rgba(255,107,0,0.15)', color: colors.primary, borderColor: 'rgba(255,107,0,0.3)' }
                          }
                        >
                          {route.type === 'safe' && <Shield className="w-3 h-3 mr-0.5" />}
                          {route.type === 'fast' && <Zap className="w-3 h-3 mr-0.5" />}
                          {route.type === 'scenic' && <Mountain className="w-3 h-3 mr-0.5" />}
                          {route.type.charAt(0).toUpperCase() + route.type.slice(1)}
                        </span>
                        <span className="text-xs" style={{ color: colors.textMuted }}>
                          Safety: {route.safety_score}/10
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1.5 text-xs mb-2" style={{ color: colors.textMuted }}>
                      <span>{route.via}</span>
                      <span>·</span>
                      <span>{route.duration}</span>
                      <span>·</span>
                      <span>{route.condition}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1 text-xs" style={{ color: colors.textMuted }}>
                          <Users className="w-3 h-3" />
                          <span>{route.travelers} travelers</span>
                        </div>
                        {route.warnings.length > 0 && (
                          <div className="flex items-center space-x-1 text-xs" style={{ color: colors.amber }}>
                            <AlertCircle className="w-3 h-3" />
                            <span>{route.warnings[0]}</span>
                          </div>
                        )}
                      </div>
                      <button
                        className="flex items-center text-xs px-2.5 py-1.5 rounded-lg hover:opacity-90 transition-colors"
                        style={{
                          backgroundColor: '#FF6B00',
                          color: '#FFFFFF',
                        }}
                      >
                        <Navigation2 className="w-3 h-3 mr-1" />
                        Use Route
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Local Volunteers (when enabled) */}
          {showVolunteers && (
            <div style={cardStyle} className="overflow-hidden">
              <div className="px-4 pt-4 pb-3">
                <div className="flex items-center mb-0.5">
                  <UserPlus className="w-5 h-5 mr-2" style={{ color: colors.green }} />
                  <h2 className="text-base font-semibold" style={{ color: '#FFFFFF' }}>
                    Local Emergency Volunteers
                  </h2>
                </div>
                <p className="text-xs ml-7" style={{ color: colors.textSecondary }}>
                  Connect with verified local helpers for emergencies
                </p>
              </div>
              <div className="px-4 pb-4">
                <div className="space-y-2">
                  {localVolunteers.map((volunteer) => (
                    <div key={volunteer.id} className="p-3 rounded-xl" style={innerItemStyle}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: '#FF6B00' }}
                          >
                            <span className="text-white text-sm font-semibold">
                              {volunteer.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium" style={{ color: '#FFFFFF' }}>{volunteer.name}</h3>
                            <p className="text-xs" style={{ color: colors.textMuted }}>
                              {volunteer.speciality} · {volunteer.location}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center mb-1" style={{ color: '#FF6B00' }}>
                            <Star className="w-3 h-3 mr-0.5 fill-current" />
                            <span className="text-xs">{volunteer.rating}</span>
                          </div>
                          <span
                            className="inline-flex items-center text-xs px-1.5 py-0.5 rounded-full border"
                            style={{
                              backgroundColor: 'rgba(76,175,125,0.15)',
                              color: colors.green,
                              borderColor: 'rgba(76,175,125,0.3)',
                            }}
                          >
                            <CheckCircle className="w-3 h-3 mr-0.5" />
                            Verified
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5 text-xs" style={{ color: colors.textMuted }}>
                          <span>{volunteer.distance} away</span>
                          <span>·</span>
                          <Languages className="w-3 h-3" />
                          <span>{volunteer.languages.join(', ')}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            className="flex items-center text-xs px-2.5 py-1.5 rounded-lg border hover:opacity-80 transition-colors"
                            style={{
                              backgroundColor: 'transparent',
                              borderColor: 'rgba(255,107,0,0.3)',
                              color: colors.primary,
                            }}
                          >
                            <MessageSquare className="w-3 h-3 mr-1" />
                            Chat
                          </button>
                          <button
                            className="flex items-center text-xs px-2.5 py-1.5 rounded-lg hover:opacity-90 transition-colors"
                            style={{
                              backgroundColor: colors.green,
                              color: '#FFFFFF',
                            }}
                          >
                            <Phone className="w-3 h-3 mr-1" />
                            Call
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Hotel Reviews & Recommendations (when enabled) */}
          {showHotelReviews && (
            <div style={cardStyle} className="overflow-hidden">
              <div className="px-4 pt-4 pb-3">
                <div className="flex items-center mb-0.5">
                  <Hotel className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
                  <h2 className="text-base font-semibold" style={{ color: '#FFFFFF' }}>
                    Hotel Reviews & Recommendations
                  </h2>
                </div>
                <p className="text-xs ml-7" style={{ color: colors.textSecondary }}>
                  Curated recommendations based on safety and reviews
                </p>
              </div>
              <div className="px-4 pb-4">
                <div className="space-y-2">
                  {recommendedHotels.map((hotel) => (
                    <div key={hotel.id} className="p-3 rounded-xl" style={innerItemStyle}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: 'rgba(255,107,0,0.12)' }}
                          >
                            <Hotel className="w-5 h-5" style={{ color: colors.primary }} />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium" style={{ color: '#FFFFFF' }}>{hotel.name}</h3>
                            <p className="text-xs" style={{ color: colors.textMuted }}>
                              {hotel.location} · {hotel.distance}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center mb-1" style={{ color: '#FF6B00' }}>
                            <Star className="w-3 h-3 mr-0.5 fill-current" />
                            <span className="text-xs">{hotel.rating}</span>
                          </div>
                          <span className="text-xs font-medium" style={{ color: colors.primary }}>
                            {hotel.price}/night
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {hotel.features.map((feature, index) => (
                          <span
                            key={index}
                            className="inline-flex text-xs px-2 py-0.5 rounded-full border"
                            style={{
                              backgroundColor: 'rgba(255,107,0,0.08)',
                              color: 'rgba(255,255,255,0.55)',
                              borderColor: 'rgba(255,107,0,0.2)',
                            }}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs mb-2 italic" style={{ color: '#FFFFFF' }}>
                        "{hotel.recommended_for}"
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5 text-xs" style={{ color: colors.textMuted }}>
                          <span>{hotel.reviews} reviews</span>
                          <span>·</span>
                          <Shield className="w-3 h-3" style={{ color: colors.green }} />
                          <span style={{ color: colors.green }}>Safety: {hotel.safety_rating}/10</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            className="flex items-center text-xs px-2.5 py-1.5 rounded-lg border hover:opacity-80 transition-colors"
                            style={{
                              backgroundColor: 'transparent',
                              borderColor: 'rgba(255,255,255,0.08)',
                              color: 'rgba(255,255,255,0.55)',
                            }}
                          >
                            <MessageSquare className="w-3 h-3 mr-1" />
                            Reviews
                          </button>
                          <button
                            className="flex items-center text-xs px-2.5 py-1.5 rounded-lg hover:opacity-90 transition-colors"
                            style={{
                              backgroundColor: '#FF6B00',
                              color: '#FFFFFF',
                            }}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Travel Groups Formation */}
          <div style={cardStyle} className="overflow-hidden">
            <div className="px-4 pt-4 pb-3">
              <div className="flex items-center mb-0.5">
                <Users className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
                <h2 className="text-base font-semibold" style={{ color: '#FFFFFF' }}>
                  Travel Groups
                </h2>
              </div>
              <p className="text-xs ml-7" style={{ color: colors.textSecondary }}>
                Join or create travel groups for similar routes
              </p>
            </div>
            <div className="px-4 pb-4">
              <div className="space-y-3">
                <div className="p-3 rounded-xl" style={innerItemStyle}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium" style={{ color: '#FFFFFF' }}>
                      Tawang Adventure Group
                    </h3>
                    <span
                      className="inline-flex items-center text-xs px-1.5 py-0.5 rounded-full border"
                      style={{
                        backgroundColor: 'rgba(255,107,0,0.15)',
                        color: '#FF8C38',
                        borderColor: 'rgba(255,107,0,0.3)',
                      }}
                    >
                      3/6 members
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs mb-2" style={{ color: colors.textMuted }}>
                    <span>Dec 22-25</span>
                    <span>·</span>
                    <span>Shillong → Tawang</span>
                    <span>·</span>
                    <span>Adventure & Culture</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center -space-x-2">
                      {['A', 'M', 'R'].map((letter, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-medium border-2"
                          style={{
                            backgroundColor: i === 0 ? colors.blue : i === 1 ? colors.green : colors.primary,
                            borderColor: '#1A1A1A',
                          }}
                        >
                          {letter}
                        </div>
                      ))}
                    </div>
                    <button
                      className="flex items-center text-xs px-2.5 py-1.5 rounded-lg hover:opacity-90 transition-colors"
                      style={{
                        backgroundColor: '#FF6B00',
                        color: '#FFFFFF',
                      }}
                    >
                      Join Group
                    </button>
                  </div>
                </div>

                <button
                  className="w-full flex items-center justify-center text-xs px-3 py-2.5 rounded-xl border transition-colors hover:opacity-80"
                  style={{
                    backgroundColor: 'rgba(255,107,0,0.1)',
                    borderColor: 'rgba(255,107,0,0.3)',
                    color: colors.primary,
                    fontWeight: 600,
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Travel Group
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Safety Features */}
          <div style={cardStyle} className="overflow-hidden">
            <div className="px-4 pt-4 pb-3">
              <div className="flex items-center mb-0.5">
                <Shield className="w-5 h-5 mr-2" style={{ color: colors.red }} />
                <h2 className="text-base font-semibold" style={{ color: '#FFFFFF' }}>
                  Advanced Safety Features
                </h2>
              </div>
              <p className="text-xs ml-7" style={{ color: colors.textSecondary }}>
                Enhanced safety tools for secure travel
              </p>
            </div>
            <div className="px-4 pb-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: AlertTriangle, label: 'Atithi Shield', color: colors.red, bg: 'rgba(224,54,44,0.12)', border: 'rgba(224,54,44,0.25)' },
                  { icon: MessageSquare, label: 'Smart Check-in', color: colors.blue, bg: 'rgba(91,154,245,0.12)', border: 'rgba(91,154,245,0.25)' },
                  { icon: Phone, label: 'Atithi Connect', color: colors.primary, bg: 'rgba(255,107,0,0.12)', border: 'rgba(255,107,0,0.25)' },
                  { icon: Mic, label: 'Smart Audio', color: colors.amber, bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)' },
                ].map(({ icon: Icon, label, color, bg, border }) => (
                  <button
                    key={label}
                    className="flex items-center text-xs px-3 py-2.5 rounded-xl border transition-colors hover:opacity-80"
                    style={{
                      backgroundColor: bg,
                      borderColor: border,
                      color,
                      fontWeight: 600,
                    }}
                  >
                    <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    </div>
  );
}
