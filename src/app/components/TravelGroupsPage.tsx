import { useState } from "react";
import {
  Users,
  ArrowLeft,
  Plus,
  MapPin,
  Calendar,
  MessageCircle,
  Search,
  Filter,
  Star,
  UserPlus,
  Settings,
  Navigation,
  Clock,
  Heart,
  Share2,
  Map,
  Camera,
  Coffee,
  Mountain,
  Badge,
  Crown,
  Globe,
  Route,
  Compass,
  Bell,
  Check,
  X,
  UserCheck,
  Users2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge as UIBadge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";
import { ImageWithFallback } from "./ui/ImageWithFallback";

interface TravelGroupsPageProps {
  onBack: () => void;
}

const travelGroups = [
  {
    id: 1,
    name: "Northeast Explorer Squad",
    route: "Guwahati → Shillong → Cherrapunji",
    members: 4,
    maxMembers: 6,
    startDate: "Dec 20, 2024",
    duration: "5 days",
    budget: "₹15,000-20,000",
    leader: {
      name: "Priya Sharma",
      avatar: "",
      rating: 4.8,
      trips: 12
    },
    tags: ["Adventure", "Photography", "Cultural"],
    description: "Exploring the breathtaking landscapes and rich culture of Meghalaya. Perfect for adventure enthusiasts and photographers!",
    image: "https://images.unsplash.com/photo-1608884941702-37653a75a725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWdoYWxheWElMjB3YXRlcmZhbGxzfGVufDF8fHx8MTc1NzE4MzA4MXww&ixlib=rb-4.1.0&q=80&w=1080",
    status: "open",
    isVerified: true,
    genderPreference: "mixed",
    ageGroup: "all"
  },
  {
    id: 2,
    name: "Kaziranga Safari Group",
    route: "Guwahati → Kaziranga → Majuli",
    members: 3,
    maxMembers: 8,
    startDate: "Jan 15, 2025",
    duration: "4 days",
    budget: "₹12,000-18,000",
    leader: {
      name: "Rahul Kumar",
      avatar: "",
      rating: 4.9,
      trips: 18
    },
    tags: ["Wildlife", "Nature", "Photography"],
    description: "Wildlife safari adventure in Kaziranga National Park followed by cultural immersion in Majuli island.",
    image: "https://images.unsplash.com/photo-1685948704813-da5c2f351167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3NhbSUyMHRlYSUyMGdhcmRlbnxlbnwxfHx8fDE3NTcxODMwNzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    status: "open",
    isVerified: true,
    genderPreference: "male-only",
    ageGroup: "25-35"
  },
  {
    id: 3,
    name: "Arunachal Monastery Trail",
    route: "Tezpur → Tawang → Bomdila",
    members: 2,
    maxMembers: 5,
    startDate: "Feb 10, 2025",
    duration: "7 days",
    budget: "₹25,000-30,000",
    leader: {
      name: "Tenzin Dorji",
      avatar: "",
      rating: 4.7,
      trips: 8
    },
    tags: ["Spiritual", "Mountain", "Cultural"],
    description: "Spiritual journey through ancient monasteries with stunning Himalayan views. Moderate trekking involved.",
    image: "https://images.unsplash.com/photo-1568644559664-e4a5735c37ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVhc3QlMjBpbmRpYSUyMG1vdW50YWlucyUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTcxODMwNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    status: "filling_fast",
    isVerified: false,
    genderPreference: "mixed",
    ageGroup: "30-45"
  },
  {
    id: 4,
    name: "Hornbill Festival Crew",
    route: "Dimapur → Kohima → Tuophema",
    members: 6,
    maxMembers: 6,
    startDate: "Dec 1, 2024",
    duration: "6 days",
    budget: "₹18,000-22,000",
    leader: {
      name: "Maya Ao",
      avatar: "",
      rating: 4.9,
      trips: 15
    },
    tags: ["Festival", "Cultural", "Food"],
    description: "Experience the vibrant Hornbill Festival in Nagaland with traditional music, dance, and authentic Naga cuisine.",
    image: "https://images.unsplash.com/photo-1689947674001-f9a8a08f0480?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVhc3QlMjBpbmRpYSUyMHRlbXBsZXxlbnwxfHx8fDE3NTcxODUxNzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    status: "full",
    isVerified: true,
    genderPreference: "female-only",
    ageGroup: "20-30"
  },
  {
    id: 5,
    name: "Young Adventurers Sikkim",
    route: "Gangtok → Pelling → Yuksam",
    members: 2,
    maxMembers: 6,
    startDate: "Mar 5, 2025",
    duration: "5 days",
    budget: "₹14,000-18,000",
    leader: {
      name: "Anjali Singh",
      avatar: "",
      rating: 4.6,
      trips: 6
    },
    tags: ["Youth", "Backpacking", "Adventure"],
    description: "Budget-friendly backpacking trip for young travelers exploring Sikkim's natural beauty and monasteries.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWtraW0lMjBtb3VudGFpbnN8ZW58MXx8fHwxNzU3MTgzMDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    status: "open",
    isVerified: true,
    genderPreference: "mixed",
    ageGroup: "18-25"
  },
  {
    id: 6,
    name: "Ladies Leisure Darjeeling",
    route: "NJP → Darjeeling → Kalimpong",
    members: 3,
    maxMembers: 5,
    startDate: "Jan 25, 2025",
    duration: "4 days",
    budget: "₹16,000-22,000",
    leader: {
      name: "Sunita Rai",
      avatar: "",
      rating: 4.8,
      trips: 11
    },
    tags: ["Leisure", "Tea Gardens", "Shopping"],
    description: "Relaxing trip for women featuring tea garden visits, heritage toy train rides, and local shopping experiences.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJqZWVsaW5nJTIwdGVhJTIwZ2FyZGVufGVufDF8fHx8MTc1NzE4MzA3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    status: "open",
    isVerified: true,
    genderPreference: "female-only",
    ageGroup: "35-50"
  }
];

const myGroups = [
  {
    id: 5,
    name: "Weekend Warriors",
    route: "Shillong → Dawki → Mawlynnong",
    members: 3,
    role: "member",
    nextTrip: "Dec 25, 2024",
    lastActivity: "Planning accommodation in Dawki",
    unreadMessages: 3
  },
  {
    id: 6,
    name: "Backpacker Brigade",
    route: "Multiple Routes",
    members: 8,
    role: "admin",
    nextTrip: "Jan 2025",
    lastActivity: "New member joined",
    unreadMessages: 0
  }
];

export function TravelGroupsPage({ onBack }: TravelGroupsPageProps) {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    budget: 'all',
    duration: 'all',
    gender: 'all',
    ageGroup: 'all',
    tags: [] as string[]
  });

  const handleJoinGroup = (groupId: number) => {
    // Simulate joining group
    alert(`Request sent to join group! Group leader will review your request.`);
  };

  const handleCreateGroup = () => {
    setShowCreateGroup(true);
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const statusConfig = {
      open: { style: { backgroundColor: 'rgba(76,175,125,0.2)', color: '#4CAF7D', border: '1px solid rgba(76,175,125,0.4)' }, text: 'Open' },
      filling_fast: { style: { backgroundColor: 'rgba(245,158,11,0.2)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.4)' }, text: 'Filling Fast' },
      full: { style: { backgroundColor: 'rgba(224,54,44,0.2)', color: '#E0362C', border: '1px solid rgba(224,54,44,0.4)' }, text: 'Full' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.open;

    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" style={config.style}>
        {config.text}
      </span>
    );
  };

  const filteredGroups = travelGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesBudget = filters.budget === 'all' ||
      (filters.budget === 'budget' && group.budget.includes('12,000')) ||
      (filters.budget === 'mid' && group.budget.includes('15,000')) ||
      (filters.budget === 'premium' && group.budget.includes('25,000'));

    const matchesDuration = filters.duration === 'all' ||
      (filters.duration === 'short' && parseInt(group.duration) <= 4) ||
      (filters.duration === 'medium' && parseInt(group.duration) >= 5 && parseInt(group.duration) <= 6) ||
      (filters.duration === 'long' && parseInt(group.duration) >= 7);

    const matchesGender = filters.gender === 'all' ||
      group.genderPreference === 'mixed' ||
      group.genderPreference === filters.gender;

    const matchesAgeGroup = filters.ageGroup === 'all' ||
      group.ageGroup === 'all' ||
      group.ageGroup === filters.ageGroup;

    return matchesSearch && matchesBudget && matchesDuration && matchesGender && matchesAgeGroup;
  });

  const inputStyle: React.CSSProperties = {
    backgroundColor: '#222222',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#FFFFFF',
    borderRadius: '8px',
  };

  const filterBtnActive: React.CSSProperties = {
    backgroundColor: '#FF6B00',
    color: '#FFFFFF',
    border: '1px solid #FF6B00',
    borderRadius: '8px',
    padding: '6px 12px',
    fontSize: '12px',
    cursor: 'pointer',
  };

  const filterBtnInactive: React.CSSProperties = {
    backgroundColor: '#222222',
    color: 'rgba(255,255,255,0.5)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '8px',
    padding: '6px 12px',
    fontSize: '12px',
    cursor: 'pointer',
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#111111' }}>
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="px-4 py-3 sticky top-0 z-30" style={{ backgroundColor: '#0D0D0D', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                style={{ color: '#FFFFFF' }}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-medium" style={{ color: '#FFFFFF' }}>Travel Groups</h1>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Connect with fellow travelers</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCreateGroup}
                className="flex items-center px-3 py-1.5 rounded-xl text-sm font-medium transition-colors hover:opacity-90"
                style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}
              >
                <Plus className="w-4 h-4 mr-1" />
                Create
              </button>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="px-4 py-3" style={{ backgroundColor: '#0D0D0D', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('discover')}
              className="flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              style={activeTab === 'discover'
                ? { backgroundColor: '#FF6B00', color: '#FFFFFF' }
                : { backgroundColor: '#222222', color: 'rgba(255,255,255,0.5)' }}
            >
              <Globe className="w-4 h-4 mr-1" />
              Discover
            </button>
            <button
              onClick={() => setActiveTab('my-groups')}
              className="flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors relative"
              style={activeTab === 'my-groups'
                ? { backgroundColor: '#FF6B00', color: '#FFFFFF' }
                : { backgroundColor: '#222222', color: 'rgba(255,255,255,0.5)' }}
            >
              <Users className="w-4 h-4 mr-1" />
              My Groups
              {myGroups.reduce((total, group) => total + group.unreadMessages, 0) > 0 && (
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ backgroundColor: '#FF6B00' }}></div>
              )}
            </button>
          </div>
        </div>

        <main className="p-4 pb-20 space-y-4">
          {activeTab === 'discover' && (
            <>
              {/* Search and Filters */}
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} />
                  <input
                    type="text"
                    placeholder="Search groups by destination, route, or interests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm focus:outline-none transition-all"
                    style={{ ...inputStyle, outline: 'none' }}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Sheet open={showFilters} onOpenChange={setShowFilters}>
                    <SheetTrigger asChild>
                      <button
                        className="flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                        style={{ backgroundColor: '#222222', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        <Filter className="w-4 h-4 mr-1" />
                        Filters
                      </button>
                    </SheetTrigger>
                    <SheetContent side="bottom" style={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px 16px 0 0' }}>
                      <SheetTitle style={{ color: '#FFFFFF' }}>Filter Groups</SheetTitle>
                      <SheetDescription style={{ color: 'rgba(255,255,255,0.55)' }}>Find groups that match your preferences</SheetDescription>
                      <div className="py-4 space-y-4">
                        <div>
                          <label className="text-sm font-medium" style={{ color: '#FFFFFF' }}>Budget Range</label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {[
                              { id: 'all', label: 'All' },
                              { id: 'budget', label: 'Budget (₹12K-15K)' },
                              { id: 'mid', label: 'Mid (₹15K-20K)' },
                              { id: 'premium', label: 'Premium (₹25K+)' }
                            ].map((option) => (
                              <button
                                key={option.id}
                                onClick={() => setFilters(prev => ({ ...prev, budget: option.id }))}
                                style={filters.budget === option.id ? filterBtnActive : filterBtnInactive}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium" style={{ color: '#FFFFFF' }}>Duration</label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {[
                              { id: 'all', label: 'All' },
                              { id: 'short', label: 'Short (1-4 days)' },
                              { id: 'medium', label: 'Medium (5-6 days)' },
                              { id: 'long', label: 'Long (7+ days)' }
                            ].map((option) => (
                              <button
                                key={option.id}
                                onClick={() => setFilters(prev => ({ ...prev, duration: option.id }))}
                                style={filters.duration === option.id ? filterBtnActive : filterBtnInactive}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium" style={{ color: '#FFFFFF' }}>Gender Preference</label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {[
                              { id: 'all', label: 'All Groups', icon: Users },
                              { id: 'mixed', label: 'Mixed Groups', icon: Users2 },
                              { id: 'male-only', label: 'Male Only', icon: UserCheck },
                              { id: 'female-only', label: 'Female Only', icon: UserCheck }
                            ].map((option) => (
                              <button
                                key={option.id}
                                onClick={() => setFilters(prev => ({ ...prev, gender: option.id }))}
                                style={filters.gender === option.id ? { ...filterBtnActive, display: 'flex', alignItems: 'center' } : { ...filterBtnInactive, display: 'flex', alignItems: 'center' }}
                              >
                                <option.icon className="w-3 h-3 mr-1" />
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium" style={{ color: '#FFFFFF' }}>Age Group</label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {[
                              { id: 'all', label: 'All Ages' },
                              { id: '18-25', label: '18-25 years' },
                              { id: '25-35', label: '25-35 years' },
                              { id: '30-45', label: '30-45 years' },
                              { id: '35-50', label: '35-50 years' },
                              { id: '45+', label: '45+ years' }
                            ].map((option) => (
                              <button
                                key={option.id}
                                onClick={() => setFilters(prev => ({ ...prev, ageGroup: option.id }))}
                                style={filters.ageGroup === option.id ? filterBtnActive : filterBtnInactive}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>

                  <div className="flex items-center space-x-1 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    <span>{filteredGroups.length} groups found</span>
                  </div>
                </div>
              </div>

              {/* Featured Groups */}
              <div className="space-y-3">
                {filteredGroups.map((group) => (
                  <div
                    key={group.id}
                    className="overflow-hidden"
                    style={{ backgroundColor: '#1A1A1A', borderRadius: '16px', boxShadow: '0 2px 16px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="relative">
                      <div className="h-40 overflow-hidden">
                        <ImageWithFallback
                          src={group.image}
                          alt={group.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>

                      <div className="absolute top-3 left-3 flex items-center space-x-2 flex-wrap gap-1">
                        <StatusBadge status={group.status} />
                        {group.isVerified && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: 'rgba(91,154,245,0.25)', color: '#5B9AF5', border: '1px solid rgba(91,154,245,0.3)' }}>
                            <Check className="w-3 h-3 mr-1" />
                            Verified
                          </span>
                        )}
                        {group.genderPreference !== 'mixed' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: 'rgba(255,107,0,0.15)', color: '#FF8C38', border: '1px solid rgba(255,107,0,0.3)' }}>
                            <UserCheck className="w-3 h-3 mr-1" />
                            {group.genderPreference === 'male-only' ? 'Men Only' : 'Women Only'}
                          </span>
                        )}
                        {group.ageGroup !== 'all' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: 'rgba(245,158,11,0.2)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.3)' }}>
                            <Users className="w-3 h-3 mr-1" />
                            {group.ageGroup}
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white font-medium mb-1">{group.name}</h3>
                        <div className="flex items-center text-white/80 text-sm">
                          <Route className="w-4 h-4 mr-1" />
                          {group.route}
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="space-y-3">
                        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{group.description}</p>

                        {/* Group Details */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center" style={{ color: 'rgba(255,255,255,0.55)' }}>
                            <Calendar className="w-4 h-4 mr-2" />
                            <div>
                              <p style={{ color: '#FFFFFF' }}>{group.startDate}</p>
                              <p className="text-xs">{group.duration}</p>
                            </div>
                          </div>
                          <div className="flex items-center" style={{ color: 'rgba(255,255,255,0.55)' }}>
                            <Users className="w-4 h-4 mr-2" />
                            <div>
                              <p style={{ color: '#FFFFFF' }}>{group.members}/{group.maxMembers} members</p>
                              <p className="text-xs">{group.budget}</p>
                            </div>
                          </div>
                        </div>

                        {/* Group Leader */}
                        <div className="flex items-center space-x-3 p-3 rounded-xl" style={{ backgroundColor: '#2A2A2A' }}>
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold" style={{ backgroundColor: '#FF6B00' }}>
                            {group.leader.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-medium" style={{ color: '#FFFFFF' }}>{group.leader.name}</p>
                              <Crown className="w-3 h-3" style={{ color: '#FF6B00' }} />
                            </div>
                            <div className="flex items-center space-x-2 text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
                              <div className="flex items-center">
                                <Star className="w-3 h-3 mr-1" style={{ color: '#FF6B00', fill: '#FF6B00' }} />
                                {group.leader.rating}
                              </div>
                              <span>•</span>
                              <span>{group.leader.trips} trips</span>
                            </div>
                          </div>
                          <button
                            className="flex items-center px-2 py-1.5 rounded-lg text-xs transition-colors hover:opacity-80"
                            style={{ backgroundColor: 'rgba(255,107,0,0.12)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,107,0,0.3)' }}
                          >
                            <MessageCircle className="w-3 h-3 mr-1" />
                            Chat
                          </button>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {group.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full text-xs"
                              style={{ backgroundColor: 'rgba(255,107,0,0.15)', color: '#FF8C38', border: '1px solid rgba(255,107,0,0.3)' }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2 pt-2">
                          <button
                            className="flex-1 flex items-center justify-center py-2 rounded-xl text-sm font-medium transition-colors hover:opacity-90 disabled:opacity-50"
                            onClick={() => handleJoinGroup(group.id)}
                            disabled={group.status === 'full'}
                            style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}
                          >
                            <UserPlus className="w-4 h-4 mr-2" />
                            {group.status === 'full' ? 'Full' : 'Join Group'}
                          </button>
                          <button
                            className="p-2 rounded-xl transition-colors hover:opacity-80"
                            style={{ backgroundColor: 'rgba(255,107,0,0.12)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,107,0,0.3)' }}
                          >
                            <Heart className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 rounded-xl transition-colors hover:opacity-80"
                            style={{ backgroundColor: 'rgba(255,107,0,0.12)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,107,0,0.3)' }}
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'my-groups' && (
            <div className="space-y-4">
              {/* My Groups */}
              <div className="space-y-3">
                {myGroups.map((group) => (
                  <div
                    key={group.id}
                    className="p-4"
                    style={{ backgroundColor: '#1A1A1A', borderRadius: '16px', boxShadow: '0 2px 16px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium" style={{ color: '#FFFFFF' }}>{group.name}</h3>
                          {group.role === 'admin' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: 'rgba(255,107,0,0.15)', color: '#FF8C38', border: '1px solid rgba(255,107,0,0.3)' }}>
                              <Crown className="w-3 h-3 mr-1" />
                              Admin
                            </span>
                          )}
                        </div>

                        <div className="space-y-1 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                          <div className="flex items-center">
                            <Route className="w-4 h-4 mr-2" />
                            {group.route}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            {group.members} members
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            Next trip: {group.nextTrip}
                          </div>
                        </div>

                        <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                          Last activity: {group.lastActivity}
                        </p>
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        {group.unreadMessages > 0 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}>
                            {group.unreadMessages} new
                          </span>
                        )}

                        <div className="flex space-x-1">
                          <button
                            className="p-1.5 rounded-lg transition-colors hover:opacity-80"
                            style={{ backgroundColor: 'rgba(255,107,0,0.12)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,107,0,0.3)' }}
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1.5 rounded-lg transition-colors hover:opacity-80"
                            style={{ backgroundColor: 'rgba(255,107,0,0.12)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,107,0,0.3)' }}
                          >
                            <Settings className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div
                style={{ backgroundColor: '#1A1A1A', borderRadius: '16px', boxShadow: '0 2px 16px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="px-4 pt-4 pb-3">
                  <h3 className="text-lg font-medium" style={{ color: '#FFFFFF' }}>Quick Actions</h3>
                </div>
                <div className="px-4 pb-4">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Plus, label: 'Create Group' },
                      { icon: Search, label: 'Find Groups' },
                      { icon: Bell, label: 'Notifications' },
                      { icon: Settings, label: 'Settings' },
                    ].map(({ icon: Icon, label }) => (
                      <button
                        key={label}
                        className="flex items-center px-3 py-2.5 rounded-xl text-sm transition-colors hover:opacity-80"
                        style={{ backgroundColor: '#222222', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Create Group Modal */}
        {showCreateGroup && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
            <div className="w-full max-h-[80vh] rounded-t-2xl" style={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="p-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium" style={{ color: '#FFFFFF' }}>Create Travel Group</h3>
                  <button
                    onClick={() => setShowCreateGroup(false)}
                    className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                <div>
                  <label className="text-sm font-medium" style={{ color: '#FFFFFF' }}>Group Name</label>
                  <input
                    type="text"
                    placeholder="Enter group name..."
                    className="w-full mt-1 px-3 py-2 text-sm focus:outline-none"
                    style={{ ...inputStyle, borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium" style={{ color: '#FFFFFF' }}>Travel Route</label>
                  <input
                    type="text"
                    placeholder="e.g., Guwahati → Shillong → Cherrapunji"
                    className="w-full mt-1 px-3 py-2 text-sm focus:outline-none"
                    style={{ ...inputStyle, borderRadius: '8px' }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium" style={{ color: '#FFFFFF' }}>Start Date</label>
                    <input
                      type="date"
                      className="w-full mt-1 px-3 py-2 text-sm focus:outline-none"
                      style={{ ...inputStyle, borderRadius: '8px' }}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium" style={{ color: '#FFFFFF' }}>Duration</label>
                    <input
                      type="text"
                      placeholder="e.g., 5 days"
                      className="w-full mt-1 px-3 py-2 text-sm focus:outline-none"
                      style={{ ...inputStyle, borderRadius: '8px' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium" style={{ color: '#FFFFFF' }}>Description</label>
                  <textarea
                    placeholder="Describe your trip plans, interests, and what you're looking for in travel companions..."
                    rows={3}
                    className="w-full mt-1 px-3 py-2 text-sm focus:outline-none resize-none"
                    style={{ ...inputStyle, borderRadius: '8px' }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium" style={{ color: '#FFFFFF' }}>Max Members</label>
                    <input
                      type="number"
                      placeholder="6"
                      min="2"
                      max="20"
                      className="w-full mt-1 px-3 py-2 text-sm focus:outline-none"
                      style={{ ...inputStyle, borderRadius: '8px' }}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium" style={{ color: '#FFFFFF' }}>Budget Range</label>
                    <input
                      type="text"
                      placeholder="₹15,000-20,000"
                      className="w-full mt-1 px-3 py-2 text-sm focus:outline-none"
                      style={{ ...inputStyle, borderRadius: '8px' }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium" style={{ color: '#FFFFFF' }}>Gender Preference</label>
                    <select
                      className="w-full mt-1 px-3 py-2 text-sm focus:outline-none"
                      style={{ ...inputStyle, borderRadius: '8px' }}
                    >
                      <option value="mixed">Mixed Group</option>
                      <option value="male-only">Male Only</option>
                      <option value="female-only">Female Only</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium" style={{ color: '#FFFFFF' }}>Age Group</label>
                    <select
                      className="w-full mt-1 px-3 py-2 text-sm focus:outline-none"
                      style={{ ...inputStyle, borderRadius: '8px' }}
                    >
                      <option value="all">All Ages</option>
                      <option value="18-25">18-25 years</option>
                      <option value="25-35">25-35 years</option>
                      <option value="30-45">30-45 years</option>
                      <option value="35-50">35-50 years</option>
                      <option value="45+">45+ years</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 rounded-xl" style={{ backgroundColor: '#222222', border: '1px solid rgba(255,107,0,0.2)' }}>
                  <div className="flex items-start space-x-3">
                    <Users className="w-4 h-4 mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#FFFFFF' }}>Group Preferences</p>
                      <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>
                        Setting gender or age preferences helps create more comfortable group dynamics.
                        These are optional and you can always create mixed groups open to all travelers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex space-x-3">
                  <button
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors hover:opacity-80"
                    style={{ backgroundColor: 'rgba(255,107,0,0.12)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,107,0,0.3)' }}
                    onClick={() => setShowCreateGroup(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors hover:opacity-90"
                    style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}
                    onClick={() => {
                      setShowCreateGroup(false);
                      alert('Group created successfully! Other travelers can now find and join your group.');
                    }}
                  >
                    Create Group
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
