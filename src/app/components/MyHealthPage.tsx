import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  Heart,
  Activity,
  Thermometer,
  Droplets,
  Moon,
  Calendar,
  Pill,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  MapPin,
  Phone,
  FileText,
  Plus,
  Edit3,
  ArrowLeft,
  Zap,
  Shield,
  Target,
  BarChart3,
  User,
  Camera,
  Download,
  RefreshCw
} from "lucide-react";

interface MyHealthPageProps {
  onBack?: () => void;
}

const healthMetrics = [
  {
    id: 1,
    name: "Heart Rate",
    value: "72",
    unit: "bpm",
    status: "normal",
    icon: Heart,
    color: "red",
    trend: "stable",
    lastUpdated: "2 min ago"
  },
  {
    id: 2,
    name: "Blood Pressure",
    value: "120/80",
    unit: "mmHg",
    status: "normal",
    icon: Activity,
    color: "blue",
    trend: "stable",
    lastUpdated: "1 hour ago"
  },
  {
    id: 3,
    name: "Body Temperature",
    value: "98.6",
    unit: "°F",
    status: "normal",
    icon: Thermometer,
    color: "orange",
    trend: "stable",
    lastUpdated: "3 hours ago"
  },
  {
    id: 4,
    name: "Hydration",
    value: "78",
    unit: "%",
    status: "good",
    icon: Droplets,
    color: "blue",
    trend: "up",
    lastUpdated: "30 min ago"
  }
];

const medications = [
  {
    id: 1,
    name: "Altitude Sickness Prevention",
    dosage: "125mg",
    frequency: "Twice daily",
    nextDose: "2:00 PM",
    pillsLeft: 14,
    status: "active"
  },
  {
    id: 2,
    name: "Vitamin D3",
    dosage: "1000 IU",
    frequency: "Once daily",
    nextDose: "8:00 AM",
    pillsLeft: 28,
    status: "active"
  },
  {
    id: 3,
    name: "Travel Insurance",
    dosage: "As needed",
    frequency: "Emergency only",
    nextDose: "N/A",
    pillsLeft: 0,
    status: "standby"
  }
];

const healthAlerts = [
  {
    id: 1,
    type: "reminder",
    title: "Medication Reminder",
    message: "Time for your altitude sickness medication",
    time: "2 min ago",
    priority: "medium"
  },
  {
    id: 2,
    type: "warning",
    title: "High Altitude Alert",
    message: "You're traveling to high altitude areas. Monitor for symptoms.",
    time: "1 hour ago",
    priority: "high"
  },
  {
    id: 3,
    type: "tip",
    title: "Hydration Reminder",
    message: "Stay hydrated! Aim for 8 glasses of water today.",
    time: "3 hours ago",
    priority: "low"
  }
];

const fitnessGoals = [
  { name: "Daily Steps", current: 8500, target: 10000, unit: "steps" },
  { name: "Active Minutes", current: 45, target: 60, unit: "min" },
  { name: "Water Intake", current: 6, target: 8, unit: "glasses" },
  { name: "Sleep", current: 7.5, target: 8, unit: "hours" }
];

export function MyHealthPage({ onBack }: MyHealthPageProps) {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
      case 'good':
        return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
      case 'warning':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'critical':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      default:
        return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getMetricColor = (color: string) => {
    switch (color) {
      case 'red': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'blue': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'orange': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'emerald': return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getAlertColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500/30 bg-red-500/10';
      case 'medium': return 'border-yellow-500/30 bg-yellow-500/10';
      case 'low': return 'border-blue-500/30 bg-blue-500/10';
      default: return 'border-slate-500/30 bg-slate-500/10';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'reminder': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'tip': return <CheckCircle className="w-4 h-4 text-blue-400" />;
      default: return <AlertTriangle className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-emerald-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-teal-400/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-emerald-300/15 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
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
              <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                <Heart className="w-5 h-5 text-emerald-400" />
              </div>
              <h1 className="text-xl text-white">My Health</h1>
            </div>
          </div>
          <p className="text-slate-400 text-sm">Monitor your health while exploring Northeast India</p>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 space-y-6">
          {/* Health Overview */}
          <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-lg">Health Overview</CardTitle>
                  <CardDescription className="text-slate-400 text-sm">Today's vital signs and metrics</CardDescription>
                </div>
                <Button size="sm" variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Sync
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {healthMetrics.map((metric) => {
                  const IconComponent = metric.icon;
                  return (
                    <div
                      key={metric.id}
                      className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 transition-all cursor-pointer"
                      onClick={() => setSelectedMetric(metric.id.toString())}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-1.5 rounded-lg border ${getMetricColor(metric.color)}`}>
                          <IconComponent className="w-3 h-3" />
                        </div>
                        <div className="flex items-center space-x-1">
                          {metric.trend === 'up' && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                          {metric.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-400" />}
                          {metric.trend === 'stable' && <div className="w-3 h-0.5 bg-slate-400 rounded"></div>}
                        </div>
                      </div>
                      <div className="text-white text-lg font-medium">
                        {metric.value} <span className="text-xs text-slate-400">{metric.unit}</span>
                      </div>
                      <div className="text-slate-400 text-xs">{metric.name}</div>
                      <div className={`inline-block px-2 py-0.5 rounded text-xs border mt-1 ${getStatusColor(metric.status)}`}>
                        {metric.status}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Health Alerts */}
          <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
                Health Alerts
              </CardTitle>
              <CardDescription className="text-slate-400 text-sm">Important health notifications and reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {healthAlerts.map((alert) => (
                  <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.priority)}`}>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{alert.title}</div>
                        <div className="text-slate-300 text-xs">{alert.message}</div>
                        <div className="text-slate-400 text-xs mt-1">{alert.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Goals */}
          <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <Target className="w-5 h-5 mr-2 text-emerald-400" />
                Today's Goals
              </CardTitle>
              <CardDescription className="text-slate-400 text-sm">Track your daily health and fitness targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fitnessGoals.map((goal, index) => {
                  const percentage = (goal.current / goal.target) * 100;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-white text-sm">{goal.name}</div>
                        <div className="text-slate-400 text-xs">
                          {goal.current} / {goal.target} {goal.unit}
                        </div>
                      </div>
                      <Progress value={percentage} className="h-2" />
                      <div className="text-slate-400 text-xs">
                        {percentage.toFixed(0)}% complete
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Medications */}
          <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <Pill className="w-5 h-5 mr-2 text-blue-400" />
                Medications & Supplements
              </CardTitle>
              <CardDescription className="text-slate-400 text-sm">Track your medications and supplements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {medications.map((med) => (
                  <div key={med.id} className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-white text-sm font-medium">{med.name}</div>
                        <div className="text-slate-400 text-xs">{med.dosage} • {med.frequency}</div>
                      </div>
                      <Badge className={med.status === 'active' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-slate-500/20 text-slate-400 border-slate-500/30'}>
                        {med.status}
                      </Badge>
                    </div>
                    
                    {med.status === 'active' && (
                      <div className="flex items-center justify-between text-xs">
                        <div className="text-slate-400">
                          Next dose: <span className="text-yellow-400">{med.nextDose}</span>
                        </div>
                        <div className="text-slate-400">
                          Pills left: <span className={med.pillsLeft < 5 ? 'text-red-400' : 'text-emerald-400'}>{med.pillsLeft}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-800">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Medication
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Medical Info */}
          <Card className="bg-gradient-to-r from-red-900/30 to-red-800/20 border-red-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <Shield className="w-5 h-5 mr-2 text-red-400" />
                Emergency Medical Info
              </CardTitle>
              <CardDescription className="text-red-200 text-sm">Important medical information for emergencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <div className="text-red-400 text-sm">Blood Type</div>
                    <div className="text-white text-lg">O+</div>
                  </div>
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <div className="text-red-400 text-sm">Medical ID</div>
                    <div className="text-white text-lg">MED123456</div>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="text-red-400 text-sm mb-1">Allergies</div>
                  <div className="text-white text-sm">No known allergies</div>
                </div>
                
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="text-red-400 text-sm mb-1">Emergency Contact</div>
                  <div className="text-white text-sm">Priya Sharma - +91 98765 43211</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Emergency
                  </Button>
                  <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                    <FileText className="w-4 h-4 mr-2" />
                    Medical Records
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Tips for Travel */}
          <Card className="bg-slate-900/60 border-slate-700/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                Travel Health Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-blue-300 text-sm">
                    <strong>High Altitude:</strong> Drink plenty of water and avoid alcohol for the first 24 hours
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="text-emerald-300 text-sm">
                    <strong>Weather Changes:</strong> Pack layers and monitor weather conditions regularly
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="text-yellow-300 text-sm">
                    <strong>Food Safety:</strong> Eat at reputable places and avoid raw or undercooked foods
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