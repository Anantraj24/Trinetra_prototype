import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Shield,
  Camera,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Upload,
  Scan,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  Download,
  RefreshCw,
  ArrowLeft,
  Eye,
  Lock,
  Zap
} from "lucide-react";

interface EKYCPageProps {
  onBack?: () => void;
}

const verificationSteps = [
  {
    id: 1,
    title: "Personal Information",
    description: "Basic details verification",
    status: "completed",
    icon: User,
    progress: 100
  },
  {
    id: 2,
    title: "Document Upload",
    description: "Aadhaar & PAN verification",
    status: "completed",
    icon: FileText,
    progress: 100
  },
  {
    id: 3,
    title: "Biometric Verification",
    description: "Face recognition & fingerprint",
    status: "in-progress",
    icon: Scan,
    progress: 65
  },
  {
    id: 4,
    title: "Address Verification",
    description: "Location & address confirmation",
    status: "pending",
    icon: MapPin,
    progress: 0
  }
];

const documents = [
  {
    id: 1,
    type: "Aadhaar Card",
    status: "verified",
    uploadDate: "Dec 15, 2024",
    expiryDate: "N/A",
    icon: CreditCard
  },
  {
    id: 2,
    type: "PAN Card",
    status: "verified",
    uploadDate: "Dec 15, 2024",
    expiryDate: "N/A",
    icon: CreditCard
  },
  {
    id: 3,
    type: "Passport",
    status: "pending",
    uploadDate: "Not uploaded",
    expiryDate: "2030",
    icon: FileText
  }
];

export function EKYCPage({ onBack }: EKYCPageProps) {
  const overallProgress = 70;

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

  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" style={{ color: '#4CAF7D' }} />;
      case 'in-progress': return <Clock className="w-4 h-4 animate-pulse" style={{ color: '#F59E0B' }} />;
      case 'pending': return <AlertTriangle className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.35)' }} />;
      case 'verified': return <CheckCircle className="w-4 h-4" style={{ color: '#4CAF7D' }} />;
      default: return <Clock className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.35)' }} />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
      case 'verified':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: 'rgba(76,175,125,0.2)', color: '#4CAF7D', border: '1px solid rgba(76,175,125,0.35)' }}>
            Verified
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs animate-pulse" style={{ backgroundColor: 'rgba(245,158,11,0.2)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.35)' }}>
            In Progress
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.12)' }}>
            Pending
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.12)' }}>
            Unknown
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#111111' }}>
      <div className="flex flex-col min-h-screen relative z-10">
        {/* Header */}
        <div className="px-4 py-4" style={{ backgroundColor: '#0D0D0D', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center space-x-3 mb-2">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                style={{ color: '#FFFFFF' }}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.3)' }}>
                <Shield className="w-5 h-5" style={{ color: '#FF8C38' }} />
              </div>
              <h1 className="text-xl font-medium" style={{ color: '#FFFFFF' }}>eKYC Verification</h1>
            </div>
          </div>
          <p className="text-sm ml-1" style={{ color: 'rgba(255,255,255,0.55)' }}>Secure identity verification for tourism services</p>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 space-y-6">
          {/* Overall Progress */}
          <div style={cardStyle} className="overflow-hidden">
            <div className="px-4 pt-4 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium" style={{ color: '#FFFFFF' }}>Verification Progress</h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Complete all steps for full access</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold" style={{ color: '#FF6B00' }}>{overallProgress}%</div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>Complete</div>
                </div>
              </div>
            </div>
            <div className="px-4 pb-4">
              <div className="w-full rounded-full h-2 mb-4" style={{ backgroundColor: '#222222' }}>
                <div className="h-2 rounded-full transition-all" style={{ width: `${overallProgress}%`, backgroundColor: '#FF6B00' }}></div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span style={{ color: 'rgba(255,255,255,0.55)' }}>3 of 4 steps completed</span>
                <span style={{ color: '#4CAF7D' }}>Almost done!</span>
              </div>
            </div>
          </div>

          {/* Verification Steps */}
          <div style={cardStyle} className="overflow-hidden">
            <div className="px-4 pt-4 pb-3">
              <h3 className="text-lg font-medium" style={{ color: '#FFFFFF' }}>Verification Steps</h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Follow these steps to complete your eKYC</p>
            </div>
            <div className="px-4 pb-4">
              <div className="space-y-4">
                {verificationSteps.map((step) => {
                  const IconComponent = step.icon;
                  return (
                    <div key={step.id} className="flex items-center space-x-4 p-3 rounded-xl" style={innerStyle}>
                      <div className="flex-shrink-0">
                        <div
                          className="p-2 rounded-lg"
                          style={
                            step.status === 'completed'
                              ? { backgroundColor: 'rgba(255,107,0,0.15)', border: '1px solid rgba(255,107,0,0.35)' }
                              : step.status === 'in-progress'
                              ? { backgroundColor: 'rgba(255,140,56,0.2)', border: '1px solid rgba(255,140,56,0.4)', animation: 'pulse 2s infinite' }
                              : { backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }
                          }
                        >
                          <IconComponent
                            className="w-4 h-4"
                            style={{
                              color: step.status === 'completed' ? '#FF6B00'
                                : step.status === 'in-progress' ? '#FF8C38'
                                : 'rgba(255,255,255,0.35)'
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div style={{ color: '#FFFFFF' }}>{step.title}</div>
                          <StatusIcon status={step.status} />
                        </div>
                        <div className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.55)' }}>{step.description}</div>
                        <div className="w-full rounded-full h-1" style={{ backgroundColor: '#2A2A2A' }}>
                          <div
                            className="h-1 rounded-full transition-all"
                            style={{
                              width: `${step.progress}%`,
                              backgroundColor: step.status === 'completed' ? '#FF6B00'
                                : step.status === 'in-progress' ? '#FF8C38'
                                : 'rgba(255,255,255,0.1)'
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Current Step - Biometric Verification */}
          <div
            className="overflow-hidden"
            style={{
              backgroundColor: '#1A1A1A',
              borderRadius: '16px',
              boxShadow: '0 2px 16px rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,107,0,0.3)',
              background: 'linear-gradient(135deg, rgba(255,107,0,0.08), #1A1A1A)',
            }}
          >
            <div className="px-4 pt-4 pb-3">
              <h3 className="text-lg font-medium flex items-center" style={{ color: '#FFFFFF' }}>
                <Scan className="w-5 h-5 mr-2" style={{ color: '#FF8C38' }} />
                Next: Biometric Verification
              </h3>
              <p className="text-sm mt-1" style={{ color: '#FF8C38' }}>Complete face recognition to proceed</p>
            </div>
            <div className="px-4 pb-4">
              <div className="space-y-4">
                <div className="flex items-center justify-center p-8 rounded-xl" style={{ backgroundColor: '#222222', border: '1px solid rgba(255,107,0,0.2)' }}>
                  <div className="text-center space-y-4">
                    <div
                      className="w-20 h-20 mx-auto rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(255,107,0,0.1)', border: '2px solid rgba(255,107,0,0.35)' }}
                    >
                      <Camera className="w-8 h-8" style={{ color: '#FF8C38' }} />
                    </div>
                    <div>
                      <div className="font-medium" style={{ color: '#FFFFFF' }}>Facial Recognition Required</div>
                      <div className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>Position your face within the frame</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    className="flex items-center justify-center py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-colors"
                    style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Start Scan
                  </button>
                  <button
                    className="flex items-center justify-center py-2.5 rounded-xl text-sm font-medium hover:opacity-80 transition-colors"
                    style={{ backgroundColor: 'rgba(255,107,0,0.12)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,107,0,0.3)' }}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Uploaded Documents */}
          <div style={cardStyle} className="overflow-hidden">
            <div className="px-4 pt-4 pb-3">
              <h3 className="text-lg font-medium" style={{ color: '#FFFFFF' }}>Document Status</h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Your uploaded documents and verification status</p>
            </div>
            <div className="px-4 pb-4">
              <div className="space-y-3">
                {documents.map((doc) => {
                  const IconComponent = doc.icon;
                  return (
                    <div key={doc.id} className="flex items-center justify-between p-3 rounded-xl" style={innerStyle}>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: '#2A2A2A' }}>
                          <IconComponent className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.55)' }} />
                        </div>
                        <div>
                          <div className="text-sm" style={{ color: '#FFFFFF' }}>{doc.type}</div>
                          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                            {doc.status === 'verified' ? `Uploaded: ${doc.uploadDate}` : doc.uploadDate}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {getStatusBadge(doc.status)}
                        {doc.status === 'verified' && (
                          <button
                            className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                            style={{ color: 'rgba(255,255,255,0.35)' }}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <button
                  className="w-full flex items-center justify-center py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-colors"
                  style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Additional Document
                </button>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div style={cardStyle} className="overflow-hidden">
            <div className="px-4 pt-4 pb-3">
              <h3 className="text-lg font-medium flex items-center" style={{ color: '#FFFFFF' }}>
                <Lock className="w-5 h-5 mr-2" style={{ color: '#FF8C38' }} />
                Security & Privacy
              </h3>
            </div>
            <div className="px-4 pb-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-xl" style={{ backgroundColor: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.2)' }}>
                  <Shield className="w-5 h-5 flex-shrink-0" style={{ color: '#FF8C38' }} />
                  <div>
                    <div className="text-sm font-medium" style={{ color: '#FF8C38' }}>Bank-grade encryption</div>
                    <div className="text-xs mt-0.5" style={{ color: 'rgba(255,140,56,0.8)' }}>Your data is protected with 256-bit encryption</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-xl" style={{ backgroundColor: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.2)' }}>
                  <Zap className="w-5 h-5 flex-shrink-0" style={{ color: '#FF8C38' }} />
                  <div>
                    <div className="text-sm font-medium" style={{ color: '#FF8C38' }}>Instant verification</div>
                    <div className="text-xs mt-0.5" style={{ color: 'rgba(255,140,56,0.8)' }}>Real-time document processing and validation</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-xl" style={{ backgroundColor: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.2)' }}>
                  <Lock className="w-5 h-5 flex-shrink-0" style={{ color: '#FF8C38' }} />
                  <div>
                    <div className="text-sm font-medium" style={{ color: '#FF8C38' }}>Data privacy</div>
                    <div className="text-xs mt-0.5" style={{ color: 'rgba(255,140,56,0.8)' }}>Documents stored securely and never shared</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
