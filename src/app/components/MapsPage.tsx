import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./ui/ImageWithFallback";
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
  MapOff,
  CheckCircle,
  Globe,
  Map,
  Trash2,
  RefreshCw,
  Users,
  AlertCircle
} from "lucide-react";

interface MapsPageProps {
  onBack?: () => void;
}

const offlineAreas = [
  { name: 'Shillong City', size: '45 MB', downloaded: true, lastUpdate: '2 days ago' },
  { name: 'Kaziranga National Park', size: '78 MB', downloaded: true, lastUpdate: '1 week ago' },
  { name: 'Tawang Valley', size: '92 MB', downloaded: false, lastUpdate: 'Not downloaded' },
  { name: 'Cherrapunji Region', size: '56 MB', downloaded: true, lastUpdate: '3 days ago' }
];

const nearbyEmergencyServices = [
  { 
    id: 1, 
    name: 'Civil Hospital Shillong', 
    type: 'Hospital', 
    distance: '1.2 km', 
    phone: '+91 364 2223013',
    available: '24/7',
    icon: 'hospital'
  },
  { 
    id: 2, 
    name: 'Police Station', 
    type: 'Police', 
    distance: '0.8 km', 
    phone: '100',
    available: '24/7',
    icon: 'police'
  },
  { 
    id: 3, 
    name: 'Fire Department', 
    type: 'Fire', 
    distance: '1.5 km', 
    phone: '101',
    available: '24/7',
    icon: 'fire'
  },
  { 
    id: 4, 
    name: 'Tourist Helpline', 
    type: 'Tourist Help', 
    distance: '0.5 km', 
    phone: '1363',
    available: 'Daily 9AM-6PM',
    icon: 'help'
  }
];

const nearbyPlaces = [
  { 
    id: 1, 
    name: 'Kamakhya Temple', 
    type: 'Tourist Attraction', 
    distance: '2.3 km', 
    rating: 4.7, 
    coordinates: '26.1665°N, 91.7045°E',
    openStatus: 'Open',
    category: 'temple'
  },
  { 
    id: 2, 
    name: 'City Cafe', 
    type: 'Restaurant', 
    distance: '0.8 km', 
    rating: 4.5, 
    coordinates: '25.5788°N, 91.8933°E',
    openStatus: 'Open',
    category: 'restaurant'
  },
  { 
    id: 3, 
    name: 'Shillong Fuel Station', 
    type: 'Fuel Station', 
    distance: '1.2 km', 
    rating: 4.2, 
    coordinates: '25.5760°N, 91.8936°E',
    openStatus: '24/7',
    category: 'fuel'
  },
  { 
    id: 4, 
    name: 'Meghalaya Market', 
    type: 'Shopping', 
    distance: '1.5 km', 
    rating: 4.3, 
    coordinates: '25.5744°N, 91.8956°E',
    openStatus: 'Open',
    category: 'shopping'
  }
];

export function MapsPage({ onBack }: MapsPageProps) {
  const { currentPage, setCurrentPage, showChatbot, setShowChatbot } = useNavigation();
  const [isOfflineMode, setIsOfflineMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showEmergencyPanel, setShowEmergencyPanel] = useState(false);

  const CategoryIcon = ({ category }: { category: string }) => {
    switch (category) {
      case 'temple': return <Mountain className="w-4 h-4 text-orange-400" />;
      case 'restaurant': return <UtensilsCrossed className="w-4 h-4 text-red-400" />;
      case 'fuel': return <Fuel className="w-4 h-4 text-blue-400" />;
      case 'shopping': return <ShoppingBag className="w-4 h-4 text-purple-400" />;
      case 'hospital': return <Hospital className="w-4 h-4 text-red-500" />;
      case 'police': return <Shield className="w-4 h-4 text-blue-500" />;
      case 'fire': return <Zap className="w-4 h-4 text-orange-500" />;
      case 'help': return <Phone className="w-4 h-4 text-green-500" />;
      default: return <MapPin className="w-4 h-4 text-emerald-400" />;
    }
  };

  const filteredPlaces = nearbyPlaces.filter(place => 
    selectedCategory === 'all' || place.category === selectedCategory
  ).filter(place => 
    place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    place.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        {/* Header */}
        <div className="bg-card/60 backdrop-blur-xl border-b border-border px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {onBack && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onBack}
                  className="text-muted-foreground hover:text-foreground p-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              )}
              <h1 className="text-xl text-foreground">TRINETRA Maps</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Badge 
                className={`text-xs ${
                  isOfflineMode 
                    ? 'bg-accent/20 text-accent-foreground border-accent/30'
                    : 'bg-destructive/20 text-destructive-foreground border-destructive/30'
                }`}
              >
                {isOfflineMode ? <WifiOff className="w-3 h-3 mr-1" /> : <Wifi className="w-3 h-3 mr-1" />}
                {isOfflineMode ? 'Offline' : 'Online'}
              </Badge>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsOfflineMode(!isOfflineMode)}
                className="text-muted-foreground hover:text-foreground p-2"
              >
                <Layers className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search places, services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
            />
          </div>

          {/* Category Filters */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {[
              { id: 'all', label: 'All', icon: MapPin },
              { id: 'temple', label: 'Temples', icon: Mountain },
              { id: 'restaurant', label: 'Food', icon: UtensilsCrossed },
              { id: 'fuel', label: 'Fuel', icon: Fuel },
              { id: 'shopping', label: 'Shopping', icon: ShoppingBag }
            ].map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 text-xs ${
                  selectedCategory === category.id
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                    : 'bg-secondary/40 border-border text-secondary-foreground hover:bg-secondary/60'
                }`}
              >
                <category.icon className="w-3 h-3 mr-1" />
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 pb-20 space-y-4">
          {/* Emergency Quick Access */}
          <Card className="bg-destructive/20 border-destructive/30 backdrop-blur-xl">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-card-foreground text-lg flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-destructive" />
                  Emergency Services
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowEmergencyPanel(!showEmergencyPanel)}
                  className="text-destructive hover:text-destructive/80"
                >
                  {showEmergencyPanel ? 'Hide' : 'Show'} All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <Button 
                  size="sm"
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                  onClick={() => alert('Emergency call to 108')}
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Ambulance (108)
                </Button>
                <Button 
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => alert('Emergency call to 100')}
                >
                  <Shield className="w-4 h-4 mr-1" />
                  Police (100)
                </Button>
              </div>
              
              {showEmergencyPanel && (
                <div className="space-y-2">
                  {nearbyEmergencyServices.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-secondary/50">
                          <CategoryIcon category={service.icon} />
                        </div>
                        <div>
                          <p className="text-card-foreground text-sm font-medium">{service.name}</p>
                          <p className="text-muted-foreground text-xs">{service.type} • {service.distance}</p>
                          <p className="text-muted-foreground/80 text-xs">{service.available}</p>
                        </div>
                      </div>
                      <Button 
                        size="sm"
                        className="bg-primary/80 hover:bg-primary text-primary-foreground text-xs px-2 py-1 h-6"
                        onClick={() => alert(`Calling ${service.phone}`)}
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Interactive Map Placeholder */}
          <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-lg flex items-center">
                  <Compass className="w-5 h-5 mr-2 text-blue-400" />
                  Interactive Map
                </CardTitle>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white p-2">
                    <Target className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white p-2">
                    <Route className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white p-2">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-800">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1551179231-dc26ffae5fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVhc3QlMjBpbmRpYSUyMG1hcHxlbnwxfHx8fDE3NTcxODg2NTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Northeast India Map"
                  className="w-full h-full object-cover"
                />
                
                {/* Map Overlay Controls */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2">
                  <Button size="sm" className="w-8 h-8 bg-slate-900/80 hover:bg-slate-800 text-white p-0">
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="w-8 h-8 bg-slate-900/80 hover:bg-slate-800 text-white p-0">
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Current Location Indicator */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                </div>
                
                {/* Map Legend */}
                <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm rounded-lg p-2">
                  <p className="text-white text-xs">📍 You are here</p>
                  <p className="text-slate-300 text-xs">Shillong, Meghalaya</p>
                </div>
              </div>
              
              {/* Map Controls */}
              <div className="flex items-center justify-between mt-3">
                <Button 
                  size="sm"
                  className="bg-blue-600/80 hover:bg-blue-600 text-white"
                >
                  <Navigation2 className="w-4 h-4 mr-1" />
                  My Location
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-slate-800/40 border-slate-600/50 text-slate-200 hover:bg-slate-700/60"
                >
                  <FileText className="w-4 h-4 mr-1" />
                  Directions
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Offline Maps */}
          <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center">
                <Download className="w-5 h-5 mr-2 text-blue-400" />
                Offline Maps
              </CardTitle>
              <CardDescription className="text-slate-400 text-sm">Download areas for offline navigation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {offlineAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-white text-sm font-medium">{area.name}</h3>
                        {area.downloaded && (
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                            Downloaded
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-slate-400">
                        <span>{area.size}</span>
                        <span>•</span>
                        <span>{area.lastUpdate}</span>
                      </div>
                    </div>
                    <Button 
                      size="sm"
                      variant={area.downloaded ? "outline" : "default"}
                      className={area.downloaded 
                        ? "bg-slate-800/40 border-slate-600/50 text-slate-200 hover:bg-slate-700/60 text-xs"
                        : "bg-blue-600/80 hover:bg-blue-600 text-white text-xs"
                      }
                    >
                      {area.downloaded ? (
                        <>
                          <FileText className="w-3 h-3 mr-1" />
                          Update
                        </>
                      ) : (
                        <>
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Nearby Places */}
          <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center">
                <Navigation className="w-5 h-5 mr-2 text-blue-400" />
                Nearby Places ({filteredPlaces.length})
              </CardTitle>
              <CardDescription className="text-slate-400 text-sm">Discover places around your location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredPlaces.map((place) => (
                  <div key={place.id} className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                    <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center">
                      <CategoryIcon category={place.category} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-white text-sm font-medium truncate">{place.name}</h3>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-yellow-400 text-xs ml-1">{place.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
                        <span>{place.type}</span>
                        <span>•</span>
                        <span>{place.distance}</span>
                      </div>
                      <p className="text-slate-500 text-xs font-mono">{place.coordinates}</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        className={`text-xs mb-2 ${
                          place.openStatus === 'Open' || place.openStatus === '24/7'
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                            : 'bg-red-500/20 text-red-400 border-red-500/30'
                        }`}
                      >
                        {place.openStatus}
                      </Badge>
                      <Button 
                        size="sm"
                        className="bg-blue-600/80 hover:bg-blue-600 text-white text-xs px-2 py-1 h-6"
                      >
                        <Navigation2 className="w-3 h-3 mr-1" />
                        Navigate
                      </Button>
                    </div>
                  </div>
                ))}
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