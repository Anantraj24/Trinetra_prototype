import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./ui/ImageWithFallback";
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
  ArrowDownRight,
  Calendar,
  Filter,
  Mountain,
  TreePine,
  Camera,
  Star
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";

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

const recentBookings = [
  { id: 1, traveler: 'Priya Sharma', destination: 'Kaziranga National Park', status: 'confirmed', time: '5 min ago', duration: '3 days' },
  { id: 2, traveler: 'Rahul Kumar', destination: 'Cherrapunji Waterfalls', status: 'pending', time: '12 min ago', duration: '2 days' },
  { id: 3, traveler: 'Anjali Patel', destination: 'Majuli Island', status: 'confirmed', time: '18 min ago', duration: '4 days' },
  { id: 4, traveler: 'Vikram Singh', destination: 'Tawang Monastery', status: 'cancelled', time: '25 min ago', duration: '5 days' },
];

const popularDestinations = [
  { name: 'Kaziranga National Park', state: 'Assam', rating: 4.8, visitors: 1200 },
  { name: 'Cherrapunji', state: 'Meghalaya', rating: 4.7, visitors: 980 },
  { name: 'Tawang', state: 'Arunachal Pradesh', rating: 4.9, visitors: 756 },
  { name: 'Majuli Island', state: 'Assam', rating: 4.6, visitors: 642 },
];

export function Dashboard() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/10 via-transparent to-teal-900/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.05),transparent_50%)]"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-emerald-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-teal-400/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-emerald-300/15 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-slate-900/60 backdrop-blur-xl border-r border-slate-700/30">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Mountain className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl text-white tracking-tight">TRINETRA</h1>
            </div>
            
            <nav className="space-y-2">
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all">
                <Users className="w-4 h-4" />
                <span>My Profile</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all">
                <Map className="w-4 h-4" />
                <span>Maps</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all">
                <Shield className="w-4 h-4" />
                <span>eKYC</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all">
                <MapPin className="w-4 h-4" />
                <span>Tour Guide</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all">
                <AlertTriangle className="w-4 h-4" />
                <span>Report Issue</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all">
                <Phone className="w-4 h-4" />
                <span>SOS</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all">
                <Heart className="w-4 h-4" />
                <span>My Health</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="bg-slate-900/40 backdrop-blur-xl border-b border-slate-700/30 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl text-white">TRINETRA</h2>
                <p className="text-slate-400">Predict. Verify. Protect. Even Offline.</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="pl-10 pr-4 py-2 bg-slate-800/60 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-500 focus:border-emerald-400 focus:ring-emerald-400/20 focus:ring-1 transition-all w-64"
                  />
                </div>
                
                <Button variant="outline" size="sm" className="bg-slate-800/40 border-slate-600/50 text-slate-200 hover:bg-slate-700/60">
                  <Calendar className="w-4 h-4 mr-2" />
                  Today
                </Button>
                
                <Button variant="outline" size="sm" className="bg-slate-800/40 border-slate-600/50 text-slate-200 hover:bg-slate-700/60">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                
                <Button variant="outline" size="sm" className="bg-slate-800/40 border-slate-600/50 text-slate-200 hover:bg-slate-700/60 relative">
                  <Bell className="w-4 h-4" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full"></div>
                </Button>
                
                <Avatar className="w-8 h-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-emerald-500 text-white text-sm">JD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="p-6 space-y-6">
            {/* Tourism Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                  <CardTitle className="text-sm text-slate-400">Monthly Visitors</CardTitle>
                  <Users className="h-4 w-4 text-emerald-400" />
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-2xl text-white">7,842</div>
                  <div className="flex items-center text-xs text-emerald-400 mt-1">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +24.5% from last month
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-transparent"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                  <CardTitle className="text-sm text-slate-400">Tour Bookings</CardTitle>
                  <MapPin className="h-4 w-4 text-teal-400" />
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-2xl text-white">1,256</div>
                  <div className="flex items-center text-xs text-teal-400 mt-1">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +18.2% from last month
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                  <CardTitle className="text-sm text-slate-400">Destinations</CardTitle>
                  <Mountain className="h-4 w-4 text-emerald-400" />
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-2xl text-white">127</div>
                  <div className="flex items-center text-xs text-emerald-400 mt-1">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +12 new this month
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                  <CardTitle className="text-sm text-slate-400">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-2xl text-white">4.8/5</div>
                  <div className="flex items-center text-xs text-yellow-400 mt-1">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +0.3 from last month
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white">Tourist Visits Trend</CardTitle>
                  <CardDescription className="text-slate-400">Monthly visitor statistics across Northeast India</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={touristVisitsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Area 
                        type="monotone" 
                        dataKey="visitors" 
                        stroke="#10b981" 
                        fill="url(#gradient)" 
                        strokeWidth={2}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white">Weekly Bookings</CardTitle>
                  <CardDescription className="text-slate-400">Tour package bookings this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyBookingsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Bar dataKey="bookings" fill="#0d9488" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Featured Destinations */}
            <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Featured Destinations</CardTitle>
                <CardDescription className="text-slate-400">Discover the hidden gems of Northeast India</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative group cursor-pointer">
                    <div className="aspect-video rounded-lg overflow-hidden bg-slate-800">
                      <ImageWithFallback 
                        src="https://images.unsplash.com/photo-1568644559664-e4a5735c37ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVhc3QlMjBpbmRpYSUyMG1vdW50YWlucyUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTcxODMwNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Northeast India Mountains"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-white font-medium">Arunachal Pradesh</h3>
                        <p className="text-slate-300 text-sm">Pristine Mountains</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group cursor-pointer">
                    <div className="aspect-video rounded-lg overflow-hidden bg-slate-800">
                      <ImageWithFallback 
                        src="https://images.unsplash.com/photo-1685948704813-da5c2f351167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3NhbSUyMHRlYSUyMGdhcmRlbnxlbnwxfHx8fDE3NTcxODMwNzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Assam Tea Gardens"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-white font-medium">Assam</h3>
                        <p className="text-slate-300 text-sm">Tea Gardens & Wildlife</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group cursor-pointer">
                    <div className="aspect-video rounded-lg overflow-hidden bg-slate-800">
                      <ImageWithFallback 
                        src="https://images.unsplash.com/photo-1608884941702-37653a75a725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWdoYWxheWElMjB3YXRlcmZhbGxzfGVufDF8fHx8MTc1NzE4MzA4MXww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Meghalaya Waterfalls"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-white font-medium">Meghalaya</h3>
                        <p className="text-slate-300 text-sm">Living Root Bridges</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">Recent Bookings</CardTitle>
                  <CardDescription className="text-slate-400">Latest tour package bookings</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="bg-slate-800/40 border-slate-600/50 text-slate-200 hover:bg-slate-700/60">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-700/30">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-slate-700 text-slate-300">
                            {booking.traveler.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white">{booking.traveler}</p>
                          <p className="text-sm text-slate-400">{booking.destination}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={booking.status === 'confirmed' ? 'default' : booking.status === 'pending' ? 'secondary' : 'destructive'}
                          className={
                            booking.status === 'confirmed' 
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                              : booking.status === 'pending'
                              ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                              : 'bg-red-500/20 text-red-400 border-red-500/30'
                          }
                        >
                          {booking.status}
                        </Badge>
                        <div className="text-right">
                          <span className="text-white text-sm">{booking.duration}</span>
                          <p className="text-slate-400 text-xs">{booking.time}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}