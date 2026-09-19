import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BottomNavigation } from "./BottomNavigation";
import { useNavigation } from "./NavigationContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Settings,
  Edit3,
  Camera,
  Globe,
  Heart,
  Star,
  Plane,
  Clock,
  Users,
  Award,
  ChevronRight,
  Bell,
  Lock,
  HelpCircle,
  LogOut,
  MoreVertical,
  ArrowLeft
} from "lucide-react";

interface ProfilePageProps {
  onBack?: () => void;
}

const profileData = {
  name: "ANANT",
  email: "anant@gmail.com",
  phone: "+91 98765 43210",
  location: "Shillong, Meghalaya",
  joinDate: "March 2023",
  membershipLevel: "Gold Explorer",
  totalTrips: 12,
  favoriteDestination: "Tawang, Arunachal Pradesh",
  languages: ["English", "Hindi", "Khasi"],
  emergencyContact: {
    name: "Priya Sharma",
    relation: "Sister",
    phone: "+91 98765 43211"
  },
  travelStats: {
    destinationsVisited: 8,
    totalNights: 45,
    averageRating: 4.6,
    reviewsGiven: 15
  },
  preferences: {
    accommodation: "Luxury Hotels",
    transportation: "Private Vehicle",
    cuisine: "Local Cuisine",
    activities: "Adventure Sports"
  }
};

export function ProfilePage({ onBack }: ProfilePageProps) {
  const { currentPage, setCurrentPage, showChatbot, setShowChatbot } = useNavigation();

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#1A1A1A',
    borderRadius: '16px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.6)',
    border: '1px solid rgba(255,255,255,0.06)',
  };

  const innerStyle: React.CSSProperties = {
    backgroundColor: '#222222',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.08)',
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#111111' }}>
      <div className="flex flex-col min-h-screen relative z-10">
        {/* Profile Header — dark orange hero gradient */}
        <div
          className="px-4 py-6"
          style={{
            background: 'linear-gradient(160deg, #2A1500 0%, #1A0A00 50%, #0D0D0D 100%)',
            borderBottom: '1px solid rgba(255,107,0,0.2)',
          }}
        >
          <div className="flex items-center justify-between mb-6">
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
              <h1 className="text-xl font-medium" style={{ color: '#FFFFFF' }}>My Profile</h1>
            </div>
            <button
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Photo & Basic Info */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-semibold text-white"
                style={{
                  background: 'linear-gradient(135deg, #FF8C38, #FF6B00)',
                  border: '3px solid #FF6B00',
                  boxShadow: '0 0 16px rgba(255,107,0,0.4)',
                }}
              >
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </div>
              <button
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center hover:opacity-90 transition-colors"
                style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}
              >
                <Camera className="w-3 h-3" />
              </button>
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-medium" style={{ color: '#FFFFFF' }}>{profileData.name}</h2>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{profileData.location}</p>
              <div className="flex items-center space-x-2 mt-2 flex-wrap gap-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: 'rgba(255,107,0,0.2)', color: '#FF8C38', border: '1px solid rgba(255,107,0,0.35)' }}>
                  <Award className="w-3 h-3 mr-1" />
                  {profileData.membershipLevel}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <Calendar className="w-3 h-3 mr-1" />
                  Member since {profileData.joinDate}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div
              className="text-center p-3 rounded-xl"
              style={{ backgroundColor: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.2)' }}
            >
              <div className="text-lg font-semibold" style={{ color: '#FF6B00' }}>{profileData.totalTrips}</div>
              <div className="text-xs" style={{ color: '#FFFFFF' }}>Total Trips</div>
            </div>
            <div
              className="text-center p-3 rounded-xl"
              style={{ backgroundColor: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.2)' }}
            >
              <div className="text-lg font-semibold" style={{ color: '#FF6B00' }}>{profileData.travelStats.destinationsVisited}</div>
              <div className="text-xs" style={{ color: '#FFFFFF' }}>Destinations</div>
            </div>
            <div
              className="text-center p-3 rounded-xl"
              style={{ backgroundColor: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.2)' }}
            >
              <div className="text-lg font-semibold" style={{ color: '#FF6B00' }}>{profileData.travelStats.averageRating}</div>
              <div className="text-xs" style={{ color: '#FFFFFF' }}>Avg Rating</div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <main className="flex-1 p-4 space-y-4">
          {/* Personal Information */}
          <div style={cardStyle} className="overflow-hidden">
            <div className="px-4 pt-4 pb-3 flex items-center justify-between">
              <h3 className="text-lg font-medium flex items-center" style={{ color: '#FFFFFF' }}>
                <User className="w-5 h-5 mr-2" style={{ color: '#FF8C38' }} />
                Personal Information
              </h3>
              <button
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            <div className="px-4 pb-4 space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-xl" style={innerStyle}>
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#FF8C38' }} />
                <div className="flex-1">
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Email Address</p>
                  <p style={{ color: '#FFFFFF' }}>{profileData.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-xl" style={innerStyle}>
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#FF8C38' }} />
                <div className="flex-1">
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Phone Number</p>
                  <p style={{ color: '#FFFFFF' }}>{profileData.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-xl" style={innerStyle}>
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#E0362C' }} />
                <div className="flex-1">
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Current Location</p>
                  <p style={{ color: '#FFFFFF' }}>{profileData.location}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-xl" style={innerStyle}>
                <Globe className="w-4 h-4 flex-shrink-0" style={{ color: '#FF8C38' }} />
                <div className="flex-1">
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Languages</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profileData.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 rounded-full text-xs"
                        style={{ backgroundColor: 'rgba(255,107,0,0.15)', color: '#FF8C38', border: '1px solid rgba(255,107,0,0.3)' }}
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Travel Preferences */}
          <div style={cardStyle} className="overflow-hidden">
            <div className="px-4 pt-4 pb-3 flex items-center justify-between">
              <h3 className="text-lg font-medium flex items-center" style={{ color: '#FFFFFF' }}>
                <Heart className="w-5 h-5 mr-2" style={{ color: '#FF8C38' }} />
                Travel Preferences
              </h3>
              <button
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            <div className="px-4 pb-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl" style={innerStyle}>
                  <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Accommodation</p>
                  <p className="text-sm" style={{ color: '#FFFFFF' }}>{profileData.preferences.accommodation}</p>
                </div>
                <div className="p-3 rounded-xl" style={innerStyle}>
                  <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Transportation</p>
                  <p className="text-sm" style={{ color: '#FFFFFF' }}>{profileData.preferences.transportation}</p>
                </div>
                <div className="p-3 rounded-xl" style={innerStyle}>
                  <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Cuisine</p>
                  <p className="text-sm" style={{ color: '#FFFFFF' }}>{profileData.preferences.cuisine}</p>
                </div>
                <div className="p-3 rounded-xl" style={innerStyle}>
                  <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Activities</p>
                  <p className="text-sm" style={{ color: '#FFFFFF' }}>{profileData.preferences.activities}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl" style={innerStyle}>
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-4 h-4" style={{ color: '#FF6B00', fill: '#FF6B00' }} />
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Favorite Destination</p>
                </div>
                <p style={{ color: '#FFFFFF' }}>{profileData.favoriteDestination}</p>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div style={cardStyle} className="overflow-hidden">
            <div className="px-4 pt-4 pb-3 flex items-center justify-between">
              <h3 className="text-lg font-medium flex items-center" style={{ color: '#FFFFFF' }}>
                <Shield className="w-5 h-5 mr-2" style={{ color: '#FF8C38' }} />
                Emergency Contact
              </h3>
              <button
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            <div className="px-4 pb-4">
              <div className="p-4 rounded-xl" style={innerStyle}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium" style={{ color: '#FFFFFF' }}>{profileData.emergencyContact.name}</h3>
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{profileData.emergencyContact.relation}</p>
                  </div>
                  <button
                    className="flex items-center px-3 py-1.5 rounded-xl text-sm font-medium hover:opacity-90 transition-colors"
                    style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </button>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.55)' }}>{profileData.emergencyContact.phone}</p>
              </div>
            </div>
          </div>

          {/* Travel Statistics */}
          <div style={cardStyle} className="overflow-hidden">
            <div className="px-4 pt-4 pb-3">
              <h3 className="text-lg font-medium flex items-center" style={{ color: '#FFFFFF' }}>
                <Plane className="w-5 h-5 mr-2" style={{ color: '#FF8C38' }} />
                Travel Statistics
              </h3>
            </div>
            <div className="px-4 pb-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 rounded-xl" style={innerStyle}>
                  <Clock className="w-5 h-5 mx-auto mb-2" style={{ color: '#FF8C38' }} />
                  <div className="text-lg font-semibold" style={{ color: '#FF6B00' }}>{profileData.travelStats.totalNights}</div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>Total Nights</div>
                </div>
                <div className="text-center p-3 rounded-xl" style={innerStyle}>
                  <Users className="w-5 h-5 mx-auto mb-2" style={{ color: '#FF8C38' }} />
                  <div className="text-lg font-semibold" style={{ color: '#FF6B00' }}>{profileData.travelStats.reviewsGiven}</div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>Reviews Given</div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div style={cardStyle} className="overflow-hidden">
            <div className="px-4 pt-4 pb-3">
              <h3 className="text-lg font-medium flex items-center" style={{ color: '#FFFFFF' }}>
                <Settings className="w-5 h-5 mr-2" style={{ color: '#FF8C38' }} />
                Account Settings
              </h3>
            </div>
            <div className="px-4 pb-4 space-y-2">
              {[
                { icon: Bell, label: 'Notifications', iconColor: '#FF8C38' },
                { icon: Lock, label: 'Privacy & Security', iconColor: '#E0362C' },
                { icon: HelpCircle, label: 'Help & Support', iconColor: '#FF8C38' },
                { icon: LogOut, label: 'Sign Out', iconColor: '#E0362C' },
              ].map(({ icon: Icon, label, iconColor }) => (
                <button
                  key={label}
                  className="w-full flex items-center justify-between p-3 rounded-xl transition-colors hover:opacity-80"
                  style={{ backgroundColor: '#222222', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" style={{ color: iconColor }} />
                    <span style={{ color: '#FFFFFF' }}>{label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.35)' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Spacing for Navigation */}
          <div className="h-20"></div>
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
