import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { 
  AlertTriangle,
  Camera,
  MapPin,
  Clock,
  User,
  Phone,
  Mail,
  Send,
  Upload,
  CheckCircle,
  FileText,
  Star,
  MessageSquare,
  ArrowLeft,
  Zap,
  Shield,
  RefreshCw,
  Eye,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface ReportIssuePageProps {
  onBack?: () => void;
}

const issueCategories = [
  {
    id: "safety",
    title: "Safety & Security",
    description: "Report safety concerns or security issues",
    icon: Shield,
    color: "red",
    examples: ["Unsafe conditions", "Security threats", "Emergency situations"]
  },
  {
    id: "service",
    title: "Service Quality",
    description: "Issues with hotels, guides, or services",
    icon: Star,
    color: "yellow", 
    examples: ["Poor service", "Accommodation issues", "Guide problems"]
  },
  {
    id: "transport",
    title: "Transportation",
    description: "Vehicle, road, or transport related issues",
    icon: Zap,
    color: "blue",
    examples: ["Vehicle breakdown", "Road conditions", "Transport delays"]
  },
  {
    id: "booking",
    title: "Booking & Payment",
    description: "Issues with reservations or payments",
    icon: FileText,
    color: "purple",
    examples: ["Booking errors", "Payment issues", "Cancellation problems"]
  },
  {
    id: "other",
    title: "Other Issues",
    description: "Any other concerns or feedback",
    icon: MessageSquare,
    color: "emerald",
    examples: ["General feedback", "Suggestions", "Other concerns"]
  }
];

const recentReports = [
  {
    id: 1,
    title: "Road closure near Tawang",
    category: "Transportation",
    status: "resolved",
    date: "Dec 20, 2024",
    response: "Issue has been forwarded to local authorities. Alternative route suggested."
  },
  {
    id: 2,
    title: "Hotel booking discrepancy",
    category: "Booking & Payment", 
    status: "in-progress",
    date: "Dec 18, 2024",
    response: "Under investigation by our support team."
  },
  {
    id: 3,
    title: "Tourist guide not available",
    category: "Service Quality",
    status: "resolved",
    date: "Dec 15, 2024",
    response: "Replacement guide arranged. Refund processed for inconvenience."
  }
];

export function ReportIssuePage({ onBack }: ReportIssuePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [issueDescription, setIssueDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRecentReports, setShowRecentReports] = useState(false);

  const handleSubmit = async () => {
    if (!selectedCategory || !issueDescription.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert("Issue reported successfully! Our team will review and respond within 24 hours.");
    setSelectedCategory(null);
    setIssueDescription("");
    setIsSubmitting(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">Resolved</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs animate-pulse">In Progress</Badge>;
      case 'pending':
        return <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30 text-xs">Pending</Badge>;
      default:
        return <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30 text-xs">Unknown</Badge>;
    }
  };

  const getCategoryColor = (color: string) => {
    switch (color) {
      case 'red': return 'border-red-500/30 bg-red-500/10 text-red-400';
      case 'yellow': return 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400';
      case 'blue': return 'border-blue-500/30 bg-blue-500/10 text-blue-400';
      case 'purple': return 'border-purple-500/30 bg-purple-500/10 text-purple-400';
      case 'emerald': return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400';
      default: return 'border-slate-500/30 bg-slate-500/10 text-slate-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-red-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-orange-400/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-red-300/15 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="flex flex-col min-h-screen relative z-10">
        {/* Header */}
        <div className="bg-slate-900/60 backdrop-blur-xl border-b border-slate-700/30 px-4 py-4">
          <div className="flex items-center space-x-3 mb-2">
            {onBack && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack}
                className="text-slate-400 hover:text-white p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-red-500/20 border border-red-500/30">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <h1 className="text-xl text-white">Report Issue</h1>
            </div>
          </div>
          <p className="text-slate-400 text-sm">Help us improve your Northeast India experience</p>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 space-y-6">
          {/* Quick Report Options */}
          <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white text-lg">Select Issue Category</CardTitle>
              <CardDescription className="text-slate-400 text-sm">Choose the category that best describes your issue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {issueCategories.map((category) => {
                  const IconComponent = category.icon;
                  const isSelected = selectedCategory === category.id;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-4 rounded-lg border transition-all text-left ${
                        isSelected 
                          ? getCategoryColor(category.color) + ' ring-1 ring-current'
                          : 'border-slate-700/30 bg-slate-800/30 text-slate-300 hover:border-slate-600/50 hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          isSelected ? 'bg-current/20' : 'bg-slate-700/50'
                        }`}>
                          <IconComponent className={`w-4 h-4 ${
                            isSelected ? 'text-current' : 'text-slate-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium mb-1">{category.title}</div>
                          <div className={`text-sm ${
                            isSelected ? 'text-current/80' : 'text-slate-400'
                          }`}>{category.description}</div>
                          <div className={`text-xs mt-2 ${
                            isSelected ? 'text-current/60' : 'text-slate-500'
                          }`}>
                            Examples: {category.examples.join(", ")}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Issue Description */}
          {selectedCategory && (
            <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white text-lg">Describe Your Issue</CardTitle>
                <CardDescription className="text-slate-400 text-sm">Provide detailed information to help us resolve your concern</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Please describe the issue in detail. Include location, time, and any other relevant information..."
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    className="min-h-[120px] bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:ring-emerald-400/20"
                  />
                  
                  <div className="flex items-center space-x-2 text-sm text-slate-400">
                    <MapPin className="w-4 h-4" />
                    <span>Current location: Guwahati, Assam</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                      <Camera className="w-4 h-4 mr-2" />
                      Add Photo
                    </Button>
                    <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                      <Upload className="w-4 h-4 mr-2" />
                      Attach File
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={handleSubmit}
                    disabled={!issueDescription.trim() || isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Report
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Emergency Contact */}
          <Card className="bg-gradient-to-r from-red-900/30 to-red-800/20 border-red-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <Phone className="w-5 h-5 mr-2 text-red-400" />
                Emergency Contact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-red-200 text-sm">
                  For immediate assistance or emergency situations, contact our 24/7 helpline:
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-red-500/20">
                      <Phone className="w-4 h-4 text-red-400" />
                    </div>
                    <div>
                      <div className="text-white">Emergency Helpline</div>
                      <div className="text-red-300 text-sm">+91 1800-XXX-XXXX</div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                    Call Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-lg">Your Recent Reports</CardTitle>
                  <CardDescription className="text-slate-400 text-sm">Track the status of your submitted issues</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRecentReports(!showRecentReports)}
                  className="text-slate-400 hover:text-white p-2"
                >
                  {showRecentReports ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </div>
            </CardHeader>
            {showRecentReports && (
              <CardContent>
                <div className="space-y-3">
                  {recentReports.map((report) => (
                    <div key={report.id} className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="text-white text-sm font-medium">{report.title}</div>
                          <div className="text-slate-400 text-xs">{report.category} • {report.date}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(report.status)}
                          <Button size="sm" variant="ghost" className="p-1 h-auto text-slate-400 hover:text-white">
                            <Eye className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-slate-300 text-xs bg-slate-800/50 p-2 rounded border border-slate-700/30">
                        {report.response}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Contact Info */}
          <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white text-lg">Other Ways to Reach Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <div>
                    <div className="text-white text-sm">Email Support</div>
                    <div className="text-slate-400 text-xs">support@netourism.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-white text-sm">Live Chat</div>
                    <div className="text-slate-400 text-xs">Available 9 AM - 9 PM IST</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <div>
                    <div className="text-white text-sm">Response Time</div>
                    <div className="text-slate-400 text-xs">Within 24 hours for non-emergency issues</div>
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