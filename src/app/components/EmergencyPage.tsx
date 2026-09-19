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
  ArrowLeft
} from "lucide-react";

interface EmergencyPageProps {
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
    description: 'Fire emergencies and rescue operations',
    icon: 'fire',
    color: 'red'
  },
  { 
    service: 'Ambulance', 
    number: '108', 
    description: 'Medical emergencies and hospital transport',
    icon: 'medical',
    color: 'green'
  },
  { 
    service: 'Tourist Helpline', 
    number: '1363', 
    description: 'Tourist assistance and information',
    icon: 'help',
    color: 'orange'
  },
  { 
    service: 'Disaster Management', 
    number: '1077', 
    description: 'Natural disasters and emergency rescue',
    icon: 'disaster',
    color: 'purple'
  }
];

const nearbyEmergencyServices = [
  { 
    name: 'Civil Hospital Shillong', 
    type: 'Hospital', 
    distance: '1.2 km', 
    phone: '+91 364 2223013',
    address: 'Nongrim Hills, Shillong',
    available: '24/7',
    specialties: ['Emergency', 'Trauma', 'ICU']
  },
  { 
    name: 'Shillong Police Station', 
    type: 'Police', 
    distance: '0.8 km', 
    phone: '+91 364 2222033',
    address: 'Police Bazaar, Shillong',
    available: '24/7',
    specialties: ['Tourist Police', 'Crime', 'Traffic']
  },
  { 
    name: 'Fire Station Shillong', 
    type: 'Fire Department', 
    distance: '1.5 km', 
    phone: '+91 364 2222101',
    address: 'Laitumkhrah, Shillong',
    available: '24/7',
    specialties: ['Fire', 'Rescue', 'Emergency Response']
  }
];

const emergencyPhrases = [
  { english: 'Help me!', local: 'Nga ki jingsngewbha!' },
  { english: 'I need a doctor', local: 'Nga la dak doctor' },
  { english: 'Call police', local: 'Police ke call koro' },
  { english: 'Where is hospital?', local: 'Hospital kamno ka lei?' },
  { english: 'I am lost', local: 'Nga la long ka jingim' }
];

export function EmergencyPage({ onBack }: EmergencyPageProps) {
  const { currentPage, setCurrentPage, showChatbot, setShowChatbot } = useNavigation();
  const [emergencyType, setEmergencyType] = useState('');
  const [emergencyDetails, setEmergencyDetails] = useState('');
  const [location, setLocation] = useState('Getting location...');
  const [showSOSForm, setShowSOSForm] = useState(false);

  const getServiceIcon = (iconType: string) => {
    switch (iconType) {
      case 'police': return <Shield className="w-6 h-6" />;
      case 'fire': return <Zap className="w-6 h-6" />;
      case 'medical': return <Hospital className="w-6 h-6" />;
      case 'help': return <Phone className="w-6 h-6" />;
      case 'disaster': return <Siren className="w-6 h-6" />;
      default: return <AlertTriangle className="w-6 h-6" />;
    }
  };

  const getServiceColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-600 hover:bg-blue-700';
      case 'red': return 'bg-red-600 hover:bg-red-700';
      case 'green': return 'bg-green-600 hover:bg-green-700';
      case 'orange': return 'bg-orange-600 hover:bg-orange-700';
      case 'purple': return 'bg-purple-600 hover:bg-purple-700';
      default: return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  const handleEmergencyCall = (number: string, service: string) => {
    if (confirm(`Call ${service} at ${number}?`)) {
      alert(`Calling ${service} at ${number}...`);
    }
  };

  const handleSOSAlert = () => {
    if (confirm('Send SOS alert to emergency services and emergency contacts?')) {
      alert('SOS Alert sent! Emergency services have been notified with your location.');
      setShowSOSForm(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-red-950 via-orange-950 to-slate-950">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-red-900/10 via-transparent to-orange-900/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.05),transparent_50%)]"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-red-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-orange-400/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-red-300/15 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="flex flex-col min-h-screen relative z-10">
        {/* Header */}
        <div className="bg-red-900/60 backdrop-blur-xl border-b border-red-700/30 px-4 py-4">
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
              <div>
                <h1 className="text-xl text-white flex items-center">
                  <Siren className="w-6 h-6 mr-2 text-red-400 animate-pulse" />
                  Emergency Services
                </h1>
                <p className="text-red-200 text-sm">Immediate assistance and safety resources</p>
              </div>
            </div>
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
              <Activity className="w-3 h-3 mr-1" />
              Active
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 pb-20 space-y-4">
          {/* SOS Button */}
          <Card className="bg-red-900/40 border-red-700/50 backdrop-blur-xl">
            <CardContent className="p-6 text-center">
              <Button 
                size="lg"
                className="w-full h-16 bg-red-600 hover:bg-red-700 text-white text-xl font-bold animate-pulse"
                onClick={() => setShowSOSForm(true)}
              >
                <Siren className="w-8 h-8 mr-3" />
                EMERGENCY SOS
              </Button>
              <p className="text-red-200 text-sm mt-3">
                Press for immediate emergency assistance
              </p>
            </CardContent>
          </Card>

          {/* SOS Form Modal */}
          {showSOSForm && (
            <Card className="bg-red-900/60 border-red-700/30 backdrop-blur-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                  Emergency Alert Details
                </CardTitle>
                <CardDescription className="text-red-200 text-sm">
                  Provide details to help emergency services respond effectively
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-red-200 text-sm mb-1">Type of Emergency</label>
                  <select 
                    value={emergencyType}
                    onChange={(e) => setEmergencyType(e.target.value)}
                    className="w-full bg-slate-800/60 border border-red-600/50 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="">Select emergency type</option>
                    <option value="medical">Medical Emergency</option>
                    <option value="accident">Accident</option>
                    <option value="crime">Crime/Security</option>
                    <option value="fire">Fire</option>
                    <option value="lost">Lost/Stranded</option>
                    <option value="disaster">Natural Disaster</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-red-200 text-sm mb-1">Emergency Details</label>
                  <Textarea
                    placeholder="Describe the emergency situation..."
                    value={emergencyDetails}
                    onChange={(e) => setEmergencyDetails(e.target.value)}
                    className="bg-slate-800/60 border-red-600/50 text-white placeholder:text-slate-400 min-h-[80px]"
                  />
                </div>
                
                <div>
                  <label className="block text-red-200 text-sm mb-1">Current Location</label>
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Getting location..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="flex-1 bg-slate-800/60 border-red-600/50 text-white placeholder:text-slate-400"
                    />
                    <Button 
                      size="sm"
                      variant="outline"
                      className="bg-slate-800/40 border-red-600/50 text-red-200 hover:bg-slate-700/60"
                    >
                      <Navigation className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline"
                    onClick={() => setShowSOSForm(false)}
                    className="flex-1 bg-slate-800/40 border-slate-600/50 text-slate-200 hover:bg-slate-700/60"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSOSAlert}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    disabled={!emergencyType}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send SOS Alert
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Emergency Contacts */}
          <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center">
                <Phone className="w-5 h-5 mr-2 text-emerald-400" />
                Emergency Numbers
              </CardTitle>
              <CardDescription className="text-slate-400 text-sm">Quick access to emergency services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-700/30">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${getServiceColor(contact.color)} text-white`}>
                        {getServiceIcon(contact.icon)}
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{contact.service}</h3>
                        <p className="text-slate-400 text-sm">{contact.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(contact.number)}
                        className="bg-slate-800/40 border-slate-600/50 text-slate-200 hover:bg-slate-700/60 px-2"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleEmergencyCall(contact.number, contact.service)}
                        className={`${getServiceColor(contact.color)} text-white font-bold px-4`}
                      >
                        {contact.number}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Nearby Emergency Services */}
          <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-emerald-400" />
                Nearby Emergency Services
              </CardTitle>
              <CardDescription className="text-slate-400 text-sm">Emergency facilities around your location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nearbyEmergencyServices.map((service, index) => (
                  <div key={index} className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/30">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-white font-medium text-sm">{service.name}</h3>
                        <p className="text-slate-400 text-xs">{service.address}</p>
                        <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
                          <span>{service.distance}</span>
                          <span>•</span>
                          <span>{service.available}</span>
                        </div>
                      </div>
                      <Badge 
                        className={`text-xs ${
                          service.type === 'Hospital' 
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : service.type === 'Police'
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                            : 'bg-red-500/20 text-red-400 border-red-500/30'
                        }`}
                      >
                        {service.type}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {service.specialties.map((specialty, idx) => (
                        <Badge key={idx} className="bg-slate-700/50 text-slate-300 border-slate-600/50 text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm"
                        className="bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs flex-1"
                        onClick={() => alert(`Calling ${service.name} at ${service.phone}`)}
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="bg-slate-800/40 border-slate-600/50 text-slate-200 hover:bg-slate-700/60 text-xs flex-1"
                      >
                        <Navigation className="w-3 h-3 mr-1" />
                        Navigate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Tools */}
          <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center">
                <ScanLine className="w-5 h-5 mr-2 text-emerald-400" />
                Emergency Tools
              </CardTitle>
              <CardDescription className="text-slate-400 text-sm">Useful tools for emergency situations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline"
                  className="bg-slate-800/40 border-slate-600/50 text-slate-200 hover:bg-slate-700/60 p-4 h-auto flex-col"
                >
                  <Camera className="w-6 h-6 mb-2 text-blue-400" />
                  <span className="text-xs">Photo Evidence</span>
                </Button>
                
                <Button 
                  variant="outline"
                  className="bg-slate-800/40 border-slate-600/50 text-slate-200 hover:bg-slate-700/60 p-4 h-auto flex-col"
                >
                  <Mic className="w-6 h-6 mb-2 text-red-400" />
                  <span className="text-xs">Voice Record</span>
                </Button>
                
                <Button 
                  variant="outline"
                  className="bg-slate-800/40 border-slate-600/50 text-slate-200 hover:bg-slate-700/60 p-4 h-auto flex-col"
                >
                  <Share2 className="w-6 h-6 mb-2 text-green-400" />
                  <span className="text-xs">Share Location</span>
                </Button>
                
                <Button 
                  variant="outline"
                  className="bg-slate-800/40 border-slate-600/50 text-slate-200 hover:bg-slate-700/60 p-4 h-auto flex-col"
                >
                  <Radio className="w-6 h-6 mb-2 text-purple-400" />
                  <span className="text-xs">Emergency Radio</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Phrases */}
          <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-emerald-400" />
                Emergency Phrases (Local Language)
              </CardTitle>
              <CardDescription className="text-slate-400 text-sm">Essential phrases in Khasi language</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {emergencyPhrases.map((phrase, index) => (
                  <div key={index} className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{phrase.english}</p>
                        <p className="text-emerald-400 text-sm">{phrase.local}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(phrase.local)}
                        className="text-slate-400 hover:text-white p-2"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Safety Tips */}
          <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center">
                <Shield className="w-5 h-5 mr-2 text-emerald-400" />
                Safety Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                  <Target className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-medium">Stay Calm</p>
                    <p className="text-slate-400 text-xs">Keep calm and assess the situation before taking action</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                  <Navigation className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-medium">Share Location</p>
                    <p className="text-slate-400 text-xs">Always share your location with emergency contacts</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                  <Users className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-medium">Stay in Groups</p>
                    <p className="text-slate-400 text-xs">Travel with companions when exploring remote areas</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

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