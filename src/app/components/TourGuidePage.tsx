import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BottomNavigation } from "./BottomNavigation";
import { useNavigation } from "./NavigationContext";
import { 
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Clock,
  Plus,
  Minus,
  Star,
  Camera,
  Mountain,
  TreePine,
  Compass,
  Route,
  FileText,
  Send,
  CheckCircle,
  AlertCircle,
  Info,
  Heart,
  Share2,
  Download,
  Edit3,
  Trash2,
  Navigation,
  ArrowLeft
} from "lucide-react";

interface TourGuidePageProps {
  onBack?: () => void;
}

const suggestedDestinations = [
  {
    id: 1,
    name: 'Kaziranga National Park',
    state: 'Assam',
    duration: '2-3 days',
    difficulty: 'Easy',
    bestTime: 'Nov-Apr',
    highlights: ['One-horned Rhinoceros', 'Tiger Safari', 'Bird Watching'],
    estimatedCost: '₹8,000-12,000',
    image: 'https://images.unsplash.com/photo-1685948704813-da5c2f351167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3NhbSUyMHRlYSUyMGdhcmRlbnxlbnwxfHx8fDE3NTcxODMwNzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    category: 'wildlife'
  },
  {
    id: 2,
    name: 'Tawang Monastery',
    state: 'Arunachal Pradesh',
    duration: '3-4 days',
    difficulty: 'Moderate',
    bestTime: 'Mar-Oct',
    highlights: ['Largest Monastery', 'Mountain Views', 'Cultural Experience'],
    estimatedCost: '₹15,000-20,000',
    image: 'https://images.unsplash.com/photo-1568644559664-e4a5735c37ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVhc3QlMjBpbmRpYSUyMG1vdW50YWlucyUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTcxODMwNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    category: 'cultural'
  },
  {
    id: 3,
    name: 'Living Root Bridges',
    state: 'Meghalaya',
    duration: '2-3 days',
    difficulty: 'Challenging',
    bestTime: 'Oct-Mar',
    highlights: ['Double Decker Bridge', 'Trekking', 'Natural Wonder'],
    estimatedCost: '₹6,000-10,000',
    image: 'https://images.unsplash.com/photo-1608884941702-37653a75a725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWdoYWxheWElMjB3YXRlcmZhbGxzfGVufDF8fHx8MTc1NzE4MzA4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.7,
    category: 'adventure'
  }
];

const plannedTours = [
  {
    id: 1,
    title: 'Northeast Cultural Circuit',
    duration: 10,
    budget: 25000,
    travelers: 2,
    destinations: ['Shillong', 'Tawang', 'Kaziranga'],
    status: 'planning',
    createdDate: '2024-12-06',
    progress: 65
  }
];

export function TourGuidePage({ onBack }: TourGuidePageProps) {
  const { currentPage, setCurrentPage, showChatbot, setShowChatbot } = useNavigation();
  const [tourForm, setTourForm] = useState({
    title: '',
    duration: '',
    budget: '',
    travelers: '',
    interests: '',
    startDate: '',
    preferences: ''
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedDestinations, setSelectedDestinations] = useState<number[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setTourForm(prev => ({ ...prev, [field]: value }));
  };

  const handleGeneratePlan = () => {
    if (tourForm.title && tourForm.duration && tourForm.budget && tourForm.travelers) {
      setShowSuggestions(true);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'moderate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'challenging': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'wildlife': return <TreePine className="w-4 h-4" />;
      case 'cultural': return <Mountain className="w-4 h-4" />;
      case 'adventure': return <Compass className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

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
          <div className="flex items-center space-x-3 mb-2">
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
            <h1 className="text-xl text-foreground">AI Tour Guide</h1>
          </div>
          <p className="text-muted-foreground text-sm">Plan your perfect adventure with TRINETRA</p>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 pb-20 space-y-4">
          {/* My Planned Tours */}
          {plannedTours.length > 0 && (
            <Card className="bg-card/60 border-border backdrop-blur-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-card-foreground text-lg flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-primary" />
                  My Planned Tours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {plannedTours.map((tour) => (
                    <div key={tour.id} className="p-4 rounded-lg bg-secondary/30 border border-border">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-card-foreground font-medium text-sm">{tour.title}</h3>
                          <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-1">
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {tour.duration} days
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="w-3 h-3 mr-1" />
                              ₹{tour.budget.toLocaleString()}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-3 h-3 mr-1" />
                              {tour.travelers} travelers
                            </div>
                          </div>
                        </div>
                        <Badge 
                          className={`text-xs ${
                            tour.status === 'planning' 
                              ? 'bg-accent/20 text-accent-foreground border-accent/30'
                              : 'bg-primary/20 text-primary-foreground border-primary/30'
                          }`}
                        >
                          {tour.status === 'planning' ? 'Planning' : 'Ready'}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {tour.destinations.map((dest, index) => (
                          <Badge key={index} className="bg-slate-700/50 text-slate-300 border-slate-600/50 text-xs">
                            {dest}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-3">
                          <div className="w-full bg-slate-700/50 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all" 
                              style={{ width: `${tour.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">{tour.progress}% complete</p>
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white p-1 h-6">
                            <Edit3 className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white p-1 h-6">
                            <Share2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Create New Tour Plan */}
          <Card className="bg-card/60 border-border backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-card-foreground text-lg flex items-center">
                <Plus className="w-5 h-5 mr-2 text-primary" />
                Create New Tour Plan
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm">Tell us your preferences and get personalized recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-foreground text-sm mb-1">Tour Title</label>
                  <Input
                    placeholder="e.g., Northeast Adventure Tour"
                    value={tourForm.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="bg-input-background border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-foreground text-sm mb-1">Duration (days)</label>
                    <Input
                      type="number"
                      placeholder="7"
                      value={tourForm.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      className="bg-input-background border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-foreground text-sm mb-1">Travelers</label>
                    <Input
                      type="number"
                      placeholder="2"
                      value={tourForm.travelers}
                      onChange={(e) => handleInputChange('travelers', e.target.value)}
                      className="bg-input-background border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-foreground text-sm mb-1">Budget (₹)</label>
                    <Input
                      type="number"
                      placeholder="20000"
                      value={tourForm.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      className="bg-input-background border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-foreground text-sm mb-1">Start Date</label>
                    <Input
                      type="date"
                      value={tourForm.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="bg-input-background border-border text-foreground"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-foreground text-sm mb-1">Interests & Activities</label>
                  <Textarea
                    placeholder="e.g., Wildlife photography, Cultural experiences, Adventure sports, Local cuisine..."
                    value={tourForm.interests}
                    onChange={(e) => handleInputChange('interests', e.target.value)}
                    className="bg-input-background border-border text-foreground placeholder:text-muted-foreground min-h-[80px]"
                  />
                </div>
                
                <div>
                  <label className="block text-foreground text-sm mb-1">Special Preferences</label>
                  <Textarea
                    placeholder="e.g., Luxury accommodation, Local homestays, Eco-friendly travel, Accessibility needs..."
                    value={tourForm.preferences}
                    onChange={(e) => handleInputChange('preferences', e.target.value)}
                    className="bg-input-background border-border text-foreground placeholder:text-muted-foreground min-h-[60px]"
                  />
                </div>
              </div>
              
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleGeneratePlan}
                disabled={!tourForm.title || !tourForm.duration || !tourForm.budget || !tourForm.travelers}
              >
                <Send className="w-4 h-4 mr-2" />
                Generate AI Tour Plan
              </Button>
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          {showSuggestions && (
            <Card className="bg-gradient-to-r from-blue-900/20 to-slate-900/20 border-blue-700/30 backdrop-blur-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg flex items-center">
                  <Star className="w-5 h-5 mr-2 text-blue-400" />
                  AI Recommended Destinations
                </CardTitle>
                <CardDescription className="text-slate-400 text-sm">
                  Based on your {tourForm.duration} day trip for {tourForm.travelers} travelers with ₹{tourForm.budget} budget
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suggestedDestinations.map((destination) => (
                    <div key={destination.id} className="rounded-lg bg-slate-800/30 border border-slate-700/30 overflow-hidden">
                      <div className="flex">
                        <div className="w-20 h-20 bg-slate-700">
                          <ImageWithFallback 
                            src={destination.image}
                            alt={destination.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-3">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="text-white text-sm font-medium truncate">{destination.name}</h3>
                                <div className="flex items-center">
                                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                  <span className="text-yellow-400 text-xs ml-1">{destination.rating}</span>
                                </div>
                              </div>
                              <p className="text-slate-400 text-xs">{destination.state} • {destination.duration}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge className={getDifficultyColor(destination.difficulty)}>
                                  {destination.difficulty}
                                </Badge>
                                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                                  {getCategoryIcon(destination.category)}
                                  <span className="ml-1 capitalize">{destination.category}</span>
                                </Badge>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant={selectedDestinations.includes(destination.id) ? "default" : "outline"}
                              onClick={() => {
                                if (selectedDestinations.includes(destination.id)) {
                                  setSelectedDestinations(prev => prev.filter(id => id !== destination.id));
                                } else {
                                  setSelectedDestinations(prev => [...prev, destination.id]);
                                }
                              }}
                              className={`text-xs px-2 py-1 h-6 ml-2 ${
                                selectedDestinations.includes(destination.id)
                                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                  : 'bg-slate-800/40 border-slate-600/50 text-slate-200 hover:bg-slate-700/60'
                              }`}
                            >
                              {selectedDestinations.includes(destination.id) ? (
                                <>
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Added
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3 h-3 mr-1" />
                                  Add
                                </>
                              )}
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 mb-2">
                            <div>Best Time: {destination.bestTime}</div>
                            <div>Est. Cost: {destination.estimatedCost}</div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {destination.highlights.slice(0, 2).map((highlight, index) => (
                              <Badge key={index} className="bg-slate-700/50 text-slate-300 border-slate-600/50 text-xs">
                                {highlight}
                              </Badge>
                            ))}
                            {destination.highlights.length > 2 && (
                              <Badge className="bg-slate-700/50 text-slate-300 border-slate-600/50 text-xs">
                                +{destination.highlights.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {selectedDestinations.length > 0 && (
                  <div className="mt-4 p-3 rounded-lg bg-blue-900/20 border border-blue-700/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-400 text-sm font-medium">
                          {selectedDestinations.length} destinations selected
                        </p>
                        <p className="text-slate-400 text-xs">
                          Estimated total: ₹{(parseInt(tourForm.budget) * 0.8).toLocaleString()} - ₹{parseInt(tourForm.budget).toLocaleString()}
                        </p>
                      </div>
                      <Button 
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <FileText className="w-3 h-3 mr-1" />
                        Create Itinerary
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Travel Tips */}
          <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center">
                <Info className="w-5 h-5 mr-2 text-blue-400" />
                Northeast Travel Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                  <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-medium">Permits Required</p>
                    <p className="text-slate-400 text-xs">Inner Line Permit (ILP) needed for Arunachal Pradesh, Nagaland, and Mizoram</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                  <Calendar className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-medium">Best Time to Visit</p>
                    <p className="text-slate-400 text-xs">October to April for most destinations. Avoid monsoon season (June-September)</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                  <Heart className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-medium">Local Culture</p>
                    <p className="text-slate-400 text-xs">Respect local customs, dress modestly near religious sites, and try local cuisine</p>
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