import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./ui/ImageWithFallback";
import { 
  X,
  Star,
  MapPin,
  Calendar,
  Clock,
  Thermometer,
  Camera,
  Heart,
  Share2,
  Navigation,
  Phone,
  Globe,
  Mountain,
  TreePine,
  Car,
  Plane,
  Train,
  Utensils,
  Hotel,
  ShoppingBag,
  Info,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface DestinationDetailModalProps {
  destination: {
    name: string;
    state: string;
    image: string;
    description?: string;
    rating?: number;
    category?: string;
  };
  onClose: () => void;
}

const destinationDetails = {
  "Arunachal Pradesh": {
    description: "Known as the 'Land of the Rising Sun', Arunachal Pradesh is India's northeastern frontier state offering pristine landscapes, ancient monasteries, and diverse tribal cultures.",
    bestTime: "March to October",
    temperature: "5°C to 25°C",
    attractions: [
      "Tawang Monastery - Largest monastery in India",
      "Sela Pass - High altitude mountain pass",
      "Bumla Pass - Indo-China border viewing point",
      "Jaswant Garh War Memorial",
      "Madhuri Lake - Crystal clear alpine lake"
    ],
    activities: [
      "Monastery visits and meditation",
      "High altitude trekking",
      "Photography tours",
      "Cultural interactions with Monpa tribe",
      "Adventure camping"
    ],
    howToReach: {
      air: "Nearest airport: Lokpriya Gopinath Bordoloi International Airport, Guwahati (320 km)",
      rail: "Nearest railway station: Rangapara North (276 km)",
      road: "Well connected by NH-27 from Guwahati via Tezpur"
    },
    accommodation: [
      "Tawang Inn - Budget friendly",
      "Hotel Pemaling - Mid-range",
      "Dragon Hotel - Luxury option",
      "Homestays available in villages"
    ],
    localCuisine: [
      "Thukpa - Tibetan noodle soup",
      "Momos - Steamed dumplings",
      "Gundruk - Fermented leafy greens",
      "Butter tea - Traditional drink"
    ],
    permits: "Inner Line Permit (ILP) required for non-Arunachal residents",
    tips: [
      "Carry warm clothing even in summer",
      "Respect local customs and traditions",
      "Avoid alcohol near monasteries",
      "Keep permits handy for checking"
    ]
  },
  "Assam": {
    description: "Famous for its tea gardens, wildlife sanctuaries, and the mighty Brahmaputra River. Assam is the gateway to Northeast India with rich biodiversity and cultural heritage.",
    bestTime: "November to April",
    temperature: "15°C to 35°C",
    attractions: [
      "Kaziranga National Park - One-horned rhinoceros",
      "Majuli Island - World's largest river island",
      "Kamakhya Temple - Shakti Peetha",
      "Tea Gardens of Jorhat and Dibrugarh",
      "Sivasagar - Ahom kingdom capital"
    ],
    activities: [
      "Wildlife safari in Kaziranga",
      "River cruise on Brahmaputra",
      "Tea plantation tours",
      "Traditional dance performances",
      "Angling and fishing"
    ],
    howToReach: {
      air: "Lokpriya Gopinath Bordoloi International Airport, Guwahati",
      rail: "Guwahati Railway Station - major junction",
      road: "NH-27, NH-37 connect major cities"
    },
    accommodation: [
      "Wild Grass Lodge - Eco-resort",
      "Hotel Dynasty - Guwahati",
      "Tea estate bungalows",
      "River cruise boats"
    ],
    localCuisine: [
      "Assam Laksa - Fish curry with rice noodles",
      "Pitha - Traditional rice cakes",
      "Duck curry with black sesame",
      "Assam tea - World famous"
    ],
    permits: "No special permits required",
    tips: [
      "Carry mosquito repellent",
      "Book safari in advance",
      "Try local tea varieties",
      "Respect wildlife guidelines"
    ]
  },
  "Meghalaya": {
    description: "The 'Abode of Clouds' is famous for its living root bridges, waterfalls, and being one of the wettest places on Earth. Home to unique Khasi and Garo cultures.",
    bestTime: "October to March",
    temperature: "10°C to 25°C",
    attractions: [
      "Living Root Bridges of Cherrapunji",
      "Nohkalikai Falls - Tallest plunge waterfall",
      "Mawlynnong Village - Cleanest village in Asia",
      "Elephant Falls near Shillong",
      "Dawki River - Crystal clear waters"
    ],
    activities: [
      "Trekking to root bridges",
      "Waterfall rappelling",
      "Cave exploration",
      "Village tourism",
      "Photography expeditions"
    ],
    howToReach: {
      air: "Shillong Airport (under construction), use Guwahati airport (100 km)",
      rail: "Guwahati Railway Station (100 km from Shillong)",
      road: "Well connected via NH-6 from Guwahati"
    },
    accommodation: [
      "Hotel Centre Point - Shillong",
      "Cherrapunji Holiday Resort",
      "Eco-lodges and homestays",
      "Camping sites near waterfalls"
    ],
    localCuisine: [
      "Jadoh - Rice and meat dish",
      "Tungrymbai - Fermented soybean curry",
      "Dohneiiong - Pork with black sesame",
      "Kyat - Rice beer"
    ],
    permits: "No special permits required",
    tips: [
      "Carry rain gear year-round",
      "Wear proper trekking shoes",
      "Respect local customs",
      "Start early for long treks"
    ]
  }
};

export function DestinationDetailModal({ destination, onClose }: DestinationDetailModalProps) {
  const details = destinationDetails[destination.name as keyof typeof destinationDetails];
  
  if (!details) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl max-h-[90vh] bg-slate-900/95 backdrop-blur-xl border border-slate-700/30 rounded-2xl overflow-hidden">
        {/* Header Image */}
        <div className="relative h-48">
          <ImageWithFallback 
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* Close Button */}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full w-8 h-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
          
          {/* Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl text-white font-bold">{destination.name}</h2>
                <p className="text-slate-300">{destination.state}</p>
              </div>
              {destination.rating && (
                <div className="flex items-center space-x-1 bg-black/40 rounded-lg px-2 py-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-sm">{destination.rating}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(90vh-12rem)] overflow-y-auto">
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="flex space-x-2">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1">
                <Heart className="w-4 h-4 mr-1" />
                Save
              </Button>
              <Button size="sm" variant="outline" className="bg-slate-800/40 border-slate-600/50 text-slate-200 hover:bg-slate-700/60 flex-1">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
              <Button size="sm" variant="outline" className="bg-slate-800/40 border-slate-600/50 text-slate-200 hover:bg-slate-700/60 flex-1">
                <Navigation className="w-4 h-4 mr-1" />
                Navigate
              </Button>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-white font-medium mb-2">About</h3>
              <p className="text-slate-300 text-sm">{details.description}</p>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                <div className="flex items-center space-x-2 mb-1">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span className="text-slate-300 text-sm">Best Time</span>
                </div>
                <p className="text-white text-sm">{details.bestTime}</p>
              </div>
              
              <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                <div className="flex items-center space-x-2 mb-1">
                  <Thermometer className="w-4 h-4 text-red-400" />
                  <span className="text-slate-300 text-sm">Temperature</span>
                </div>
                <p className="text-white text-sm">{details.temperature}</p>
              </div>
            </div>

            {/* Permits Alert */}
            {details.permits !== "No special permits required" && (
              <div className="p-3 rounded-lg bg-yellow-900/20 border border-yellow-700/30">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 text-sm font-medium">Permit Required</span>
                </div>
                <p className="text-yellow-200 text-sm mt-1">{details.permits}</p>
              </div>
            )}

            {/* Top Attractions */}
            <div>
              <h3 className="text-white font-medium mb-3 flex items-center">
                <Camera className="w-4 h-4 mr-2 text-emerald-400" />
                Top Attractions
              </h3>
              <div className="space-y-2">
                {details.attractions.map((attraction, index) => (
                  <div key={index} className="flex items-start space-x-2 p-2 rounded-lg bg-slate-800/30">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{attraction}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div>
              <h3 className="text-white font-medium mb-3 flex items-center">
                <Mountain className="w-4 h-4 mr-2 text-emerald-400" />
                Activities
              </h3>
              <div className="flex flex-wrap gap-2">
                {details.activities.map((activity, index) => (
                  <Badge key={index} className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                    {activity}
                  </Badge>
                ))}
              </div>
            </div>

            {/* How to Reach */}
            <div>
              <h3 className="text-white font-medium mb-3 flex items-center">
                <Navigation className="w-4 h-4 mr-2 text-emerald-400" />
                How to Reach
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                  <Plane className="w-4 h-4 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-slate-300 text-sm font-medium">By Air</p>
                    <p className="text-slate-400 text-xs">{details.howToReach.air}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                  <Train className="w-4 h-4 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-slate-300 text-sm font-medium">By Rail</p>
                    <p className="text-slate-400 text-xs">{details.howToReach.rail}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                  <Car className="w-4 h-4 text-purple-400 mt-0.5" />
                  <div>
                    <p className="text-slate-300 text-sm font-medium">By Road</p>
                    <p className="text-slate-400 text-xs">{details.howToReach.road}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accommodation */}
            <div>
              <h3 className="text-white font-medium mb-3 flex items-center">
                <Hotel className="w-4 h-4 mr-2 text-emerald-400" />
                Where to Stay
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {details.accommodation.map((hotel, index) => (
                  <div key={index} className="p-2 rounded-lg bg-slate-800/30 border border-slate-700/30">
                    <span className="text-slate-300 text-sm">{hotel}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Local Cuisine */}
            <div>
              <h3 className="text-white font-medium mb-3 flex items-center">
                <Utensils className="w-4 h-4 mr-2 text-emerald-400" />
                Local Cuisine
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {details.localCuisine.map((dish, index) => (
                  <div key={index} className="p-2 rounded-lg bg-slate-800/30 border border-slate-700/30">
                    <span className="text-slate-300 text-sm">{dish}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Tips */}
            <div>
              <h3 className="text-white font-medium mb-3 flex items-center">
                <Info className="w-4 h-4 mr-2 text-emerald-400" />
                Travel Tips
              </h3>
              <div className="space-y-2">
                {details.tips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-2 p-2 rounded-lg bg-slate-800/30">
                    <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="p-4 rounded-lg bg-emerald-900/20 border border-emerald-700/30">
              <h3 className="text-emerald-400 font-medium mb-2 flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Need Help Planning?
              </h3>
              <p className="text-emerald-200 text-sm mb-2">Contact our tourism experts</p>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Phone className="w-3 h-3 mr-1" />
                Call Tourism Helpline
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}