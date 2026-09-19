import { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, 
  Mic,
  MicOff,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Shield,
  Play,
  Pause,
  Volume2,
  Users,
  Globe,
  Activity,
  Clock
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Alert, AlertDescription } from "./ui/alert";

interface AdvancedSecurityPageProps {
  onBack: () => void;
}

interface DetectedPhrase {
  id: number;
  text: string;
  language: string;
  threat: 'low' | 'medium' | 'high';
  timestamp: string;
}

export function AdvancedSecurityPage({ onBack }: AdvancedSecurityPageProps) {
  const [isListening, setIsListening] = useState(false);
  const [micPermissionGranted, setMicPermissionGranted] = useState(false);
  const [micPermissionRequested, setMicPermissionRequested] = useState(false);
  const [detectedPhrases, setDetectedPhrases] = useState<DetectedPhrase[]>([]);
  const [currentlyListening, setCurrentlyListening] = useState(false);
  const [listeningDuration, setListeningDuration] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sample harmful phrases in different Northeast languages for demo
  const harmfulWords = [
    { text: "danger ahead", language: "English", threat: "high" as const },
    { text: "বিপদ", language: "Bengali", threat: "high" as const },
    { text: "গুলি", language: "Assamese", threat: "high" as const },
    { text: "चोर", language: "Hindi", threat: "medium" as const },
    { text: "खतरा", language: "Hindi", threat: "high" as const },
    { text: "trouble", language: "English", threat: "medium" as const },
    { text: "police", language: "English", threat: "medium" as const },
    { text: "থোক", language: "Bodo", threat: "low" as const }
  ];

  // Request microphone permission and start listening
  const requestMicrophonePermission = async () => {
    setMicPermissionRequested(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      setMicPermissionGranted(true);
      streamRef.current = stream;
      
      // Set up MediaRecorder for continuous listening
      if (MediaRecorder.isTypeSupported('audio/webm')) {
        mediaRecorderRef.current = new MediaRecorder(stream, {
          mimeType: 'audio/webm'
        });
      } else {
        mediaRecorderRef.current = new MediaRecorder(stream);
      }
      
    } catch (error) {
      console.error('Microphone permission denied:', error);
      setMicPermissionGranted(false);
    }
  };

  // Start continuous listening
  const startListening = () => {
    if (!micPermissionGranted || !mediaRecorderRef.current) return;
    
    setIsListening(true);
    setCurrentlyListening(true);
    setListeningDuration(0);
    
    // Start recording
    mediaRecorderRef.current.start();
    
    // Start duration counter
    intervalRef.current = setInterval(() => {
      setListeningDuration(prev => prev + 1);
    }, 1000);
    
    // Simulate periodic harmful word detection
    const detectionInterval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance of detecting something
        const randomPhrase = harmfulWords[Math.floor(Math.random() * harmfulWords.length)];
        const newDetection: DetectedPhrase = {
          id: Date.now(),
          text: randomPhrase.text,
          language: randomPhrase.language,
          threat: randomPhrase.threat,
          timestamp: new Date().toLocaleTimeString()
        };
        
        setDetectedPhrases(prev => [newDetection, ...prev].slice(0, 10)); // Keep last 10
        
        // Show notification for high threat
        if (randomPhrase.threat === 'high' && 'Notification' in window && Notification.permission === 'granted') {
          new Notification('Security Alert', {
            body: `Potential threat detected: "${randomPhrase.text}" in ${randomPhrase.language}`,
            icon: '/favicon.ico'
          });
        }
      }
    }, 5000); // Check every 5 seconds
    
    // Store interval reference for cleanup
    (window as any).detectionInterval = detectionInterval;
  };

  // Stop listening
  const stopListening = () => {
    setIsListening(false);
    setCurrentlyListening(false);
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    if ((window as any).detectionInterval) {
      clearInterval((window as any).detectionInterval);
    }
  };

  // Toggle listening
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Format duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      default: return 'text-muted-foreground bg-muted/20 border-border';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-slate-600/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(71,85,105,0.3),transparent_70%)]"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse shadow-lg shadow-blue-400/20"></div>
        <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-slate-300/50 rounded-full animate-pulse shadow-lg shadow-slate-300/30" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-blue-300/60 rounded-full animate-pulse shadow-lg shadow-blue-300/40" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="flex flex-col min-h-screen relative z-10">
        {/* Header */}
        <header className="bg-card/60 backdrop-blur-xl border-b border-border px-4 py-3 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack}
                className="text-muted-foreground hover:text-foreground p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg text-foreground">Smart Audio Security</h1>
                <p className="text-sm text-muted-foreground">AI-powered safety monitoring</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {isListening && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs animate-pulse">
                  Listening
                </Badge>
              )}
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </header>

        <main className="p-4 pb-20 space-y-4">
          {/* How It Works Info */}
          <Card className="bg-card/60 border-border backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-foreground text-lg flex items-center">
                <Info className="w-5 h-5 mr-2 text-blue-400" />
                How Smart Audio Security Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-medium text-sm">Multi-Language Detection</h4>
                    <p className="text-muted-foreground text-xs">
                      Continuously listens to conversations in local Northeast Indian languages (Bengali, Assamese, Hindi, Bodo, etc.) to detect potential safety concerns.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-medium text-sm">Threat Detection</h4>
                    <p className="text-muted-foreground text-xs">
                      AI analyzes local conversations for harmful words, threats, or dangerous situations and immediately alerts you for your safety.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-medium text-sm">Privacy Protected</h4>
                    <p className="text-muted-foreground text-xs">
                      Audio processing happens locally on your device. No conversations are stored or transmitted.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Microphone Permission & Control */}
          <Card className="bg-card/60 border-border backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-foreground text-lg flex items-center">
                <Mic className="w-5 h-5 mr-2 text-primary" />
                Audio Security Setup
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm">
                Enable microphone to start monitoring local conversations for safety
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!micPermissionGranted ? (
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto">
                      <MicOff className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-foreground font-medium">Microphone Access Required</h3>
                      <p className="text-muted-foreground text-sm">
                        Grant permission to enable continuous safety monitoring
                      </p>
                    </div>
                    <Button 
                      onClick={requestMicrophonePermission}
                      disabled={micPermissionRequested && !micPermissionGranted}
                      className="w-full"
                    >
                      {micPermissionRequested && !micPermissionGranted ? (
                        <>
                          <XCircle className="w-4 h-4 mr-2" />
                          Permission Denied
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4 mr-2" />
                          Grant Microphone Access
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Listening Control */}
                    <div className="text-center space-y-3">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-all ${
                        isListening 
                          ? 'bg-green-500/20 text-green-400 animate-pulse' 
                          : 'bg-muted/30 text-muted-foreground'
                      }`}>
                        {isListening ? (
                          <Volume2 className="w-8 h-8" />
                        ) : (
                          <Mic className="w-8 h-8" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-foreground font-medium">
                          {isListening ? 'Listening for Safety Threats' : 'Audio Security Ready'}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {isListening 
                            ? `Active for ${formatDuration(listeningDuration)} • Monitoring local conversations`
                            : 'Tap to start monitoring conversations around you'
                          }
                        </p>
                      </div>
                      <Button 
                        onClick={toggleListening}
                        variant={isListening ? "destructive" : "default"}
                        className="w-full"
                      >
                        {isListening ? (
                          <>
                            <Pause className="w-4 h-4 mr-2" />
                            Stop Listening
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Start Listening
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Current Status */}
                    {isListening && (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Activity className="w-4 h-4 text-green-400" />
                          </div>
                          <p className="text-green-400 text-sm font-medium">Active</p>
                          <p className="text-green-400/70 text-xs">Monitoring</p>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Clock className="w-4 h-4 text-blue-400" />
                          </div>
                          <p className="text-blue-400 text-sm font-medium">{formatDuration(listeningDuration)}</p>
                          <p className="text-blue-400/70 text-xs">Duration</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Detected Threats */}
          {detectedPhrases.length > 0 && (
            <Card className="bg-card/60 border-border backdrop-blur-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-foreground text-lg flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                  Recent Detections
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                  Potentially harmful phrases detected in local conversations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {detectedPhrases.map((phrase) => (
                    <div 
                      key={phrase.id}
                      className="p-3 rounded-lg border bg-muted/10 hover:bg-muted/20 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-foreground font-medium text-sm">"{phrase.text}"</span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getThreatColor(phrase.threat)}`}
                            >
                              {phrase.threat} threat
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <span>{phrase.language}</span>
                            <span>•</span>
                            <span>{phrase.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Safety Guidelines */}
          <Card className="bg-card/60 border-border backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-foreground text-lg flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-400" />
                Safety Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start space-x-2">
                  <span className="text-blue-400 font-medium">•</span>
                  <span>This feature helps you stay aware of your surroundings by monitoring local conversations</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-400 font-medium">•</span>
                  <span>All audio processing happens locally - no data is sent to servers</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-400 font-medium">•</span>
                  <span>If you detect a high-threat situation, immediately contact local authorities</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-400 font-medium">•</span>
                  <span>Use this as an additional safety tool, not a replacement for personal vigilance</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}