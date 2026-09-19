import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Phone,
  MapPin,
  Shield,
  AlertTriangle,
  Siren,
  Hospital,
  Navigation,
  Clock,
  User,
  Share2,
  Copy,
  MessageSquare,
  Activity,
  Radio,
  Zap,
  ArrowLeft,
  CheckCircle,
  Wifi,
  WifiOff,
  Battery,
  Signal
} from "lucide-react";

interface SOSPageProps {
  onBack?: () => void;
}

const emergencyContacts = [
  {
    id: 1,
    name: "Police Emergency",
    number: "100",
    type: "police",
    description: "General police emergency",
    icon: Shield,
    color: "blue"
  },
  {
    id: 2,
    name: "Medical Emergency",
    number: "108",
    type: "medical",
    description: "Ambulance & medical help",
    icon: Hospital,
    color: "red"
  },
  {
    id: 3,
    name: "Fire Emergency",
    number: "101",
    type: "fire",
    description: "Fire department",
    icon: Zap,
    color: "orange"
  },
  {
    id: 4,
    name: "Tourist Helpline",
    number: "1363",
    type: "tourist",
    description: "Tourism emergency support",
    icon: MapPin,
    color: "emerald"
  },
  {
    id: 5,
    name: "Women Helpline",
    number: "1091",
    type: "women",
    description: "Women safety helpline",
    icon: Shield,
    color: "pink"
  }
];

const quickActions = [
  {
    id: 1,
    title: "Send Location",
    description: "Share current location with emergency contacts",
    icon: MapPin,
    action: "location"
  },
  {
    id: 2,
    title: "Voice Message",
    description: "Record and send emergency voice message",
    icon: Radio,
    action: "voice"
  },
  {
    id: 3,
    title: "Live Tracking",
    description: "Enable real-time location tracking",
    icon: Navigation,
    action: "tracking"
  },
  {
    id: 4,
    title: "Silent Alert",
    description: "Send discrete emergency alert",
    icon: MessageSquare,
    action: "silent"
  }
];

export function SOSPage({ onBack }: SOSPageProps) {
  const [sosActivated, setSosActivated] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isConnected, setIsConnected] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(85);

  const handleSOSActivation = () => {
    setSosActivated(true);
    // Simulate countdown and emergency alert
    let count = 5;
    const timer = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count === 0) {
        clearInterval(timer);
        alert("SOS ALERT SENT! Emergency services have been notified. Help is on the way.");
        setSosActivated(false);
        setCountdown(5);
      }
    }, 1000);
  };

  const getContactColor = (color: string) => {
    switch (color) {
      case 'blue': return 'border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20';
      case 'red': return 'border-red-500/30 bg-red-500/10 hover:bg-red-500/20';
      case 'orange': return 'border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20';
      case 'emerald': return 'border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20';
      case 'pink': return 'border-pink-500/30 bg-pink-500/10 hover:bg-pink-500/20';
      default: return 'border-slate-500/30 bg-slate-500/10 hover:bg-slate-500/20';
    }
  };

  const getContactTextColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-400';
      case 'red': return 'text-red-400';
      case 'orange': return 'text-orange-400';
      case 'emerald': return 'text-emerald-400';
      case 'pink': return 'text-pink-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-red-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-red-500/20 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-red-300/25 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="flex flex-col min-h-screen relative z-10">
        {/* Header */}
        <div className="bg-red-900/70 backdrop-blur-xl border-b border-red-700/30 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {onBack && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onBack}
                  className="text-red-400 hover:text-red-300 p-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              )}
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-red-500/30 border border-red-500/50">
                  <Siren className="w-5 h-5 text-red-400 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-xl text-white">Emergency SOS</h1>
                  <p className="text-red-200 text-sm">Immediate help & safety</p>
                </div>
              </div>
            </div>
            
            {/* Status Indicators */}
            <div className="flex items-center space-x-2 text-xs">
              <div className="flex items-center space-x-1">
                {isConnected ? (
                  <Wifi className="w-3 h-3 text-emerald-400" />
                ) : (
                  <WifiOff className="w-3 h-3 text-red-400" />
                )}
                <Signal className="w-3 h-3 text-emerald-400" />
                <Battery className="w-3 h-3 text-yellow-400" />
                <span className="text-slate-300">{batteryLevel}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 space-y-6">
          {/* SOS Button */}
          <Card className="bg-gradient-to-r from-red-900/40 to-red-800/30 border-red-500/30 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="text-white mb-2">
                  <div className="text-lg font-medium">Emergency SOS</div>
                  <div className="text-red-200 text-sm">Press and hold for 3 seconds</div>
                </div>
                
                <div className="relative">
                  <button
                    onMouseDown={handleSOSActivation}
                    onTouchStart={handleSOSActivation}
                    disabled={sosActivated}
                    className={`w-32 h-32 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                      sosActivated 
                        ? 'bg-red-500 border-red-400 animate-pulse scale-110'
                        : 'bg-red-600 hover:bg-red-500 border-red-500 hover:scale-105 active:scale-95'
                    }`}
                  >
                    {sosActivated ? (
                      <div className="text-center text-white">
                        <Siren className="w-8 h-8 mx-auto animate-pulse" />
                        <div className="text-2xl font-bold">{countdown}</div>
                      </div>
                    ) : (
                      <div className="text-center text-white">
                        <Siren className="w-8 h-8 mx-auto" />
                        <div className="text-sm font-medium mt-1">SOS</div>
                      </div>
                    )}
                  </button>
                  
                  {sosActivated && (
                    <div className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping"></div>
                  )}
                </div>
                
                <div className="text-red-200 text-xs max-w-xs mx-auto">
                  This will immediately alert emergency services and your emergency contacts with your location
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Location */}
          <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-emerald-400" />
                Current Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-emerald-400 text-sm font-medium">Location Detected</div>
                      <div className="text-emerald-300 text-xs">Guwahati, Assam, India</div>
                      <div className="text-emerald-300 text-xs">26.1445° N, 91.7362° E</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                        <Share2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="text-slate-400 text-xs">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Last updated: Just now
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Emergency Actions */}
          <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
              <CardDescription className="text-slate-400 text-sm">Instant emergency assistance options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => {
                  const IconComponent = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={() => alert(`${action.title} activated!`)}
                      className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all text-left"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-lg bg-slate-700/50">
                          <IconComponent className="w-4 h-4 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-sm font-medium">{action.title}</div>
                          <div className="text-slate-400 text-xs">{action.description}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white text-lg">Emergency Contacts</CardTitle>
              <CardDescription className="text-slate-400 text-sm">Quick dial emergency numbers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {emergencyContacts.map((contact) => {
                  const IconComponent = contact.icon;
                  return (
                    <button
                      key={contact.id}
                      onClick={() => alert(`Calling ${contact.name} at ${contact.number}`)}
                      className={`w-full p-3 rounded-lg border transition-all text-left ${getContactColor(contact.color)}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-current/20">
                            <IconComponent className={`w-4 h-4 ${getContactTextColor(contact.color)}`} />
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">{contact.name}</div>
                            <div className="text-slate-400 text-xs">{contact.description}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`text-lg font-bold ${getContactTextColor(contact.color)}`}>
                            {contact.number}
                          </div>
                          <Phone className={`w-4 h-4 ${getContactTextColor(contact.color)}`} />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts Personal */}
          <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white text-lg">Personal Emergency Contacts</CardTitle>
              <CardDescription className="text-slate-400 text-sm">Your designated emergency contacts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-white text-sm">Priya Sharma</div>
                      <div className="text-slate-400 text-xs">Sister • Primary Contact</div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Phone className="w-3 h-3 mr-1" />
                    Call
                  </Button>
                </div>
                
                <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-800">
                  Add Emergency Contact
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Safety Tips */}
          <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
                Safety Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="text-yellow-300 text-sm">
                    Keep your phone charged and carry a power bank when traveling
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-blue-300 text-sm">
                    Share your travel itinerary with family and friends
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="text-emerald-300 text-sm">
                    Know the local emergency numbers for your travel destination
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}