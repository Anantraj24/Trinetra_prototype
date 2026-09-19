import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Languages,
  ArrowRightLeft,
  Mic,
  MicOff,
  Volume2,
  Copy,
  BookOpen,
  Wifi,
  WifiOff,
  RefreshCcw,
  Star,
  MessageCircle,
  Phone,
  MapPin,
  Utensils,
  Bed,
  Car,
  AlertTriangle,
  Heart,
  Info,
  Globe,
  Zap,
  Download,
  StopCircle,
  Play
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface TranslatePageProps {
  onBack: () => void;
}

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'mni', name: 'Manipuri', nativeName: 'মৈতৈলোন্' },
  { code: 'nag', name: 'Nagamese', nativeName: 'Nagamese' },
  { code: 'kha', name: 'Khasi', nativeName: 'Khasi' },
  { code: 'grt', name: 'Garo', nativeName: 'A·chik' },
  { code: 'lus', name: 'Mizo', nativeName: 'Mizo ṭawng' },
  { code: 'trp', name: 'Tripuri', nativeName: 'Kokborok' },
  { code: 'brx', name: 'Bodo', nativeName: 'बर\'' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली' }
];

const commonPhrases = {
  greeting: {
    en: "Hello, how are you?",
    hi: "नमस्ते, आप कैसे हैं?",
    as: "নমস্কাৰ, আপুনি কেনে আছে?",
    bn: "নমস্কার, আপনি কেমন আছেন?",
    mni: "খুরুমজরী, নহাক কেমদোউরিবনো?",
    nag: "Namaskar, kineka ase?",
    kha: "Kumno, phi kyrteng na?",
    grt: "Mitanchi, chanchi mande na?",
    lus: "Chibai, i dam em?",
    trp: "Ngo, nangno khamani?",
    brx: "আদাব, নোংখৰেমন মানো না?",
    ne: "नमस्ते, तपाईं कस्तो हुनुहुन्छ?"
  },
  help: {
    en: "Can you help me?",
    hi: "क्या आप मेरी मदद कर सकते हैं?",
    as: "আপুনি মোক সহায় কৰিব পাৰিবনে?",
    bn: "আপনি কি আমাকে সাহায্য করতে পারেন?",
    mni: "ঐবু মতেঙ পাংবা ঙম্বরা?",
    nag: "Ami ke madot koribo paribo ne?",
    kha: "Phi nga ki jingialang ha?",
    grt: "Anga ke upayani chana ma?",
    lus: "Min pui thei ang em?",
    trp: "Ang ke upayani kok ma?",
    brx: "নোংআংখোঁ সহায়নায় হাবা খালামো না?",
    ne: "तपाईं मलाई मद्दत गर्न सक्नुहुन्छ?"
  },
  emergency: {
    en: "I need help! Emergency!",
    hi: "मुझे मदद चाहिए! आपातकाल!",
    as: "মোক সহায় লাগে! জৰুৰী!",
    bn: "আমার সাহায্য দরকার! জরুরি!",
    mni: "ঐনা মতেঙ পাম্লি! তুরেল!",
    nag: "Ami ke madot lagise! Emergency!",
    kha: "Nga ki jingialang bun! Emergency!",
    grt: "Anga ke upay lagani! Emergency!",
    lus: "Puihna ka mamawh! Emergency!",
    trp: "Ang ke upay ma! Emergency!",
    brx: "আংখোঁ সহায়নায় লাগোঁ! আপাতকাল!",
    ne: "मलाई मद्दत चाहिएको छ! आपतकाल!"
  },
  direction: {
    en: "Where is the nearest hospital?",
    hi: "सबसे नजदीकी अस्पताल कहाँ है?",
    as: "আটাইতকৈ ওচৰৰ চিকিৎসালয় ক'ত আছে?",
    bn: "নিকটতম হাসপাতাল কোথায়?",
    mni: "খ্বাইদগী নক্নবা শফুবা মফম কদাইদা লৈরিবনো?",
    nag: "Sobse usor hospital kote ase?",
    kha: "Kitu la ka hospital u pyrthei?",
    grt: "Kanggipa hospital bae ong'a?",
    lus: "Hospital nakin ber chu khawi nge a awm?",
    trp: "Sobose nahar hospital bai dong?",
    brx: "গাহায়নি বোৰো দাক্তাৰখানানি বাহাগো?"
  },
  food: {
    en: "What local food do you recommend?",
    hi: "आप कौन सा स्थानीय खाना सुझाएंगे?",
    as: "আপুনি কি স্থানীয় খাদ্য পৰামৰ্শ দিব?",
    bn: "আপনি কোন স্থানীয় খাবার সুপারিশ করবেন?",
    mni: "নখোয়না করিগী চিঞ্জাক কদায় খঙহল্লিবনো?",
    nag: "Apni ki local khana recommend koribo?",
    kha: "Phi ban ka bynta ka jingkynmaw kine?",
    grt: "Kanggipa janma chako recommend ang'a?",
    lus: "Local ei leh in eng nge i recommend?",
    trp: "Nono khamani local kha recommend kha?",
    brx: "নোং জায়গানি বিখা আৰো ৰায়জো খালামনি ৰাজো?"
  },
  accommodation: {
    en: "I need a place to stay",
    hi: "मुझे रुकने की जगह चाहिए",
    as: "মোক থাকিবলৈ ঠাই লাগে",
    bn: "আমার থাকার জায়গা দরকার",
    mni: "ঐনা লৈবগী মফম অমা পাম্মি",
    nag: "Ami ke thakiboloi jaga lagise",
    kha: "Nga ki jingpynmih kyrta ka jingjop",
    grt: "Anga ke songgipa jaga lagani",
    lus: "Chenna tur hmun ka mamawh",
    trp: "Ang ke thakno bai jaga lagwi",
    brx: "আংখোঁ দাজাবনায়াও জায়গা লাগোঁ"
  }
};

const categoryIcons = {
  greeting: MessageCircle,
  help: Heart,
  emergency: AlertTriangle,
  direction: MapPin,
  food: Utensils,
  accommodation: Bed
};

export function TranslatePage({ onBack }: TranslatePageProps) {
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('hi');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState('translate');
  const [selectedCategory, setSelectedCategory] = useState('greeting');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsTranslating(true);

    // Simulate translation delay
    setTimeout(() => {
      // Mock translation - in real app, this would call an API
      if (inputText.toLowerCase().includes('hello')) {
        setOutputText(commonPhrases.greeting[toLang as keyof typeof commonPhrases.greeting] || "Translation not available");
      } else if (inputText.toLowerCase().includes('help')) {
        setOutputText(commonPhrases.help[toLang as keyof typeof commonPhrases.help] || "Translation not available");
      } else {
        setOutputText(`[Translated to ${languages.find(l => l.code === toLang)?.name}]: ${inputText}`);
      }
      setIsTranslating(false);
    }, 1500);
  };

  const handleSwapLanguages = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setInputText(outputText);
    setOutputText('');
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add toast notification here
  };

  // Voice recording timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
        // Simulate audio level fluctuation
        setAudioLevel(Math.random() * 100);
      }, 100);
    } else {
      setRecordingTime(0);
      setAudioLevel(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleVoiceInput = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setHasRecorded(true);

      // Simulate voice recognition delay
      setTimeout(() => {
        const voiceTexts = [
          "Hello, how are you?",
          "Can you help me find a hotel?",
          "Where is the nearest restaurant?",
          "I need directions to the airport",
          "What time does the bus arrive?"
        ];
        const randomText = voiceTexts[Math.floor(Math.random() * voiceTexts.length)];
        setInputText(randomText);
        setHasRecorded(false);
      }, 1500);
    } else {
      // Start recording
      setIsRecording(true);
      setInputText('');
      setOutputText('');
    }
  };

  const handleVoiceOutput = (text: string) => {
    if ('speechSynthesis' in window) {
      // Try to use actual speech synthesis if available
      const utterance = new SpeechSynthesisUtterance(text);
      const lang = languages.find(l => l.code === toLang);
      if (lang) {
        utterance.lang = lang.code === 'en' ? 'en-US' :
                        lang.code === 'hi' ? 'hi-IN' :
                        lang.code === 'bn' ? 'bn-IN' : 'en-US';
      }
      speechSynthesis.speak(utterance);
    } else {
      // Fallback for browsers without speech synthesis
      alert(`Speaking: "${text}" (Text-to-speech not supported in this browser)`);
    }
  };

  const formatRecordingTime = (time: number) => {
    const seconds = Math.floor(time / 10);
    const deciseconds = time % 10;
    return `${seconds}.${deciseconds}s`;
  };

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

  const inputStyle: React.CSSProperties = {
    backgroundColor: '#222222',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#FFFFFF',
    borderRadius: '8px',
  };

  const renderPhrase = (categoryKey: string, phrase: any) => {
    const IconComponent = categoryIcons[categoryKey as keyof typeof categoryIcons];
    return (
      <div key={categoryKey} style={cardStyle} className="p-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(255,107,0,0.12)' }}>
            <IconComponent className="w-5 h-5" style={{ color: '#FF8C38' }} />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <p className="font-medium capitalize" style={{ color: '#FFFFFF' }}>{categoryKey.replace(/([A-Z])/g, ' $1')}</p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>From {languages.find(l => l.code === fromLang)?.name}</p>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#222222' }}>
                <div className="flex items-center justify-between">
                  <p className="text-sm" style={{ color: '#FFFFFF' }}>{phrase[fromLang]}</p>
                  <button
                    className="p-1 rounded hover:bg-white/10 transition-colors"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                    onClick={() => handleVoiceOutput(phrase[fromLang])}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-lg" style={{ backgroundColor: '#2A2A2A', border: '1px solid rgba(255,107,0,0.2)' }}>
                <div className="flex items-center justify-between">
                  <p className="text-sm" style={{ color: '#FFFFFF' }}>{phrase[toLang]}</p>
                  <div className="flex space-x-1">
                    <button
                      className="p-1 rounded hover:bg-white/10 transition-colors"
                      style={{ color: 'rgba(255,255,255,0.55)' }}
                      onClick={() => handleVoiceOutput(phrase[toLang])}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1 rounded hover:bg-white/10 transition-colors"
                      style={{ color: 'rgba(255,255,255,0.55)' }}
                      onClick={() => handleCopy(phrase[toLang])}
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
                <h1 className="text-lg font-medium" style={{ color: '#FFFFFF' }}>Translate</h1>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Northeast India languages</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs"
                style={isOnline
                  ? { backgroundColor: 'rgba(76,175,125,0.2)', color: '#4CAF7D', border: '1px solid rgba(76,175,125,0.35)' }
                  : { backgroundColor: 'rgba(224,54,44,0.2)', color: '#E0362C', border: '1px solid rgba(224,54,44,0.35)' }
                }
              >
                {isOnline ? (
                  <><Wifi className="w-3 h-3 mr-1" />Online</>
                ) : (
                  <><WifiOff className="w-3 h-3 mr-1" />Offline</>
                )}
              </span>
              <button
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                style={{ color: 'rgba(255,255,255,0.55)' }}
                onClick={() => setIsOnline(!isOnline)}
              >
                <RefreshCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 pb-20 space-y-4">
          {/* Floating Voice Button */}
          {activeTab === 'translate' && (
            <div className="fixed bottom-24 right-4 z-40">
              <button
                onClick={handleVoiceInput}
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
                style={isRecording
                  ? { backgroundColor: '#E0362C', color: '#FFFFFF', boxShadow: '0 4px 20px rgba(224,54,44,0.4)' }
                  : { backgroundColor: '#FF6B00', color: '#FFFFFF', boxShadow: '0 4px 20px rgba(255,107,0,0.4)' }
                }
              >
                {isRecording ? (
                  <StopCircle className="w-6 h-6" />
                ) : (
                  <Mic className="w-6 h-6" />
                )}
              </button>
              {isRecording && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                  <div className="px-3 py-1 rounded-lg" style={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <p className="text-xs whitespace-nowrap" style={{ color: '#FFFFFF' }}>
                      Recording: {formatRecordingTime(recordingTime)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Voice Input Quick Access */}
          {!isRecording && !hasRecorded && (
            <div className="p-4" style={{ ...cardStyle, background: 'linear-gradient(135deg, rgba(255,107,0,0.1), rgba(255,140,56,0.08))', border: '1px solid rgba(255,107,0,0.2)' }}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium" style={{ color: '#FFFFFF' }}>Voice Translation</h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Tap the mic to start speaking</p>
                </div>
                <button
                  onClick={handleVoiceInput}
                  className="flex items-center px-3 py-1.5 rounded-xl text-sm font-medium hover:opacity-90 transition-colors"
                  style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Start Voice
                </button>
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div>
            {/* Custom tab bar */}
            <div className="flex rounded-xl overflow-hidden mb-4" style={{ backgroundColor: '#222222' }}>
              {[
                { value: 'translate', icon: Languages, label: 'Translate' },
                { value: 'phrases', icon: BookOpen, label: 'Phrases' },
                { value: 'offline', icon: Download, label: 'Offline' },
              ].map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  onClick={() => setActiveTab(value)}
                  className="flex-1 flex items-center justify-center space-x-2 py-2.5 text-sm font-medium transition-colors"
                  style={activeTab === value
                    ? { backgroundColor: '#FF6B00', color: '#FFFFFF', borderRadius: '10px' }
                    : { color: 'rgba(255,255,255,0.5)' }
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {activeTab === 'translate' && (
              <div className="space-y-4">
                {/* Language Selection */}
                <div className="p-4" style={cardStyle}>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1">
                      <Select value={fromLang} onValueChange={setFromLang}>
                        <SelectTrigger style={{ backgroundColor: '#222222', border: '1px solid rgba(255,255,255,0.08)', color: '#FFFFFF' }}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent style={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)' }}>
                          {languages.map((lang) => (
                            <SelectItem key={lang.code} value={lang.code} style={{ color: '#FFFFFF' }}>
                              <div className="flex items-center space-x-2">
                                <span>{lang.name}</span>
                                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>({lang.nativeName})</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <button
                      onClick={handleSwapLanguages}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      style={{ backgroundColor: 'rgba(255,107,0,0.12)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,107,0,0.3)' }}
                    >
                      <ArrowRightLeft className="w-4 h-4" />
                    </button>

                    <div className="flex-1">
                      <Select value={toLang} onValueChange={setToLang}>
                        <SelectTrigger style={{ backgroundColor: '#222222', border: '1px solid rgba(255,255,255,0.08)', color: '#FFFFFF' }}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent style={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)' }}>
                          {languages.map((lang) => (
                            <SelectItem key={lang.code} value={lang.code} style={{ color: '#FFFFFF' }}>
                              <div className="flex items-center space-x-2">
                                <span>{lang.name}</span>
                                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>({lang.nativeName})</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Translation Interface */}
                <div className="space-y-3">
                  {/* Input */}
                  <div className="p-4" style={cardStyle}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium" style={{ color: '#FFFFFF' }}>
                          From {languages.find(l => l.code === fromLang)?.name}
                        </label>
                        <div className="flex items-center space-x-2">
                          {isRecording && (
                            <div className="flex items-center space-x-2 px-2 py-1 rounded-lg" style={{ backgroundColor: 'rgba(224,54,44,0.2)', border: '1px solid rgba(224,54,44,0.3)' }}>
                              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#E0362C' }}></div>
                              <span className="text-xs font-medium" style={{ color: '#E0362C' }}>
                                {formatRecordingTime(recordingTime)}
                              </span>
                            </div>
                          )}
                          <button
                            onClick={handleVoiceInput}
                            className="p-1.5 rounded-lg transition-colors"
                            style={isRecording
                              ? { color: '#E0362C', backgroundColor: 'rgba(224,54,44,0.1)' }
                              : { color: 'rgba(255,255,255,0.55)' }
                            }
                          >
                            {isRecording ? (
                              <StopCircle className="w-4 h-4" />
                            ) : hasRecorded ? (
                              <Play className="w-4 h-4" />
                            ) : (
                              <Mic className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Voice Recording Visual Feedback */}
                      {isRecording && (
                        <div className="p-4 rounded-lg" style={{ backgroundColor: '#222222', border: '1px solid rgba(255,107,0,0.2)' }}>
                          <div className="flex items-center justify-center space-x-1 mb-3">
                            <div className="flex items-center space-x-1">
                              {[...Array(20)].map((_, i) => (
                                <div
                                  key={i}
                                  className="w-1 rounded-full transition-all duration-150"
                                  style={{
                                    height: `${Math.max(4, Math.min(24, (audioLevel + Math.random() * 20) * 0.8))}px`,
                                    backgroundColor: '#FF6B00',
                                    opacity: audioLevel > i * 5 ? 1 : 0.3
                                  }}
                                ></div>
                              ))}
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-sm mb-1" style={{ color: '#FFFFFF' }}>Listening...</p>
                            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>Speak clearly in {languages.find(l => l.code === fromLang)?.name}</p>
                          </div>
                        </div>
                      )}

                      {hasRecorded && (
                        <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(76,175,125,0.1)', border: '1px solid rgba(76,175,125,0.3)' }}>
                          <div className="flex items-center justify-center space-x-2" style={{ color: '#4CAF7D' }}>
                            <Mic className="w-4 h-4" />
                            <span className="text-sm">Processing voice input...</span>
                          </div>
                        </div>
                      )}

                      <textarea
                        placeholder={isRecording ? "Recording audio..." : hasRecorded ? "Processing..." : "Enter text to translate or use voice input..."}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        disabled={isRecording || hasRecorded}
                        rows={4}
                        className="w-full px-3 py-2.5 text-sm focus:outline-none resize-none"
                        style={{ ...inputStyle, opacity: (isRecording || hasRecorded) ? 0.5 : 1 }}
                      />
                      <button
                        onClick={handleTranslate}
                        disabled={isTranslating || !inputText.trim()}
                        className="w-full flex items-center justify-center py-2.5 rounded-xl text-sm font-medium transition-colors hover:opacity-90 disabled:opacity-50"
                        style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}
                      >
                        {isTranslating ? (
                          <>
                            <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                            Translating...
                          </>
                        ) : (
                          <>
                            <Languages className="w-4 h-4 mr-2" />
                            Translate
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Output */}
                  {outputText && (
                    <div className="p-4" style={cardStyle}>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium" style={{ color: '#FFFFFF' }}>
                            To {languages.find(l => l.code === toLang)?.name}
                          </label>
                          <div className="flex space-x-2">
                            <button
                              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                              style={{ color: 'rgba(255,255,255,0.55)' }}
                              onClick={() => handleVoiceOutput(outputText)}
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                            <button
                              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                              style={{ color: 'rgba(255,255,255,0.55)' }}
                              onClick={() => handleCopy(outputText)}
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg" style={{ backgroundColor: '#2A2A2A', border: '1px solid rgba(255,107,0,0.2)' }}>
                          <p style={{ color: '#FFFFFF' }}>{outputText}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'phrases' && (
              <div className="space-y-4">
                {/* Category Selection */}
                <div className="p-4" style={cardStyle}>
                  <h3 className="text-lg font-medium mb-1" style={{ color: '#FFFFFF' }}>Common Travel Phrases</h3>
                  <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    Essential phrases for traveling in Northeast India
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.keys(commonPhrases).map((category) => {
                      const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
                      return (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className="flex items-center px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                          style={selectedCategory === category
                            ? { backgroundColor: '#FF6B00', color: '#FFFFFF' }
                            : { backgroundColor: '#222222', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.08)' }
                          }
                        >
                          <IconComponent className="w-4 h-4 mr-2" />
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Language Selection for Phrases */}
                <div className="p-4" style={cardStyle}>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1">
                      <Select value={fromLang} onValueChange={setFromLang}>
                        <SelectTrigger style={{ backgroundColor: '#222222', border: '1px solid rgba(255,255,255,0.08)', color: '#FFFFFF' }}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent style={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)' }}>
                          {languages.map((lang) => (
                            <SelectItem key={lang.code} value={lang.code} style={{ color: '#FFFFFF' }}>
                              {lang.name} ({lang.nativeName})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <button
                      onClick={handleSwapLanguages}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      style={{ backgroundColor: 'rgba(255,107,0,0.12)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,107,0,0.3)' }}
                    >
                      <ArrowRightLeft className="w-4 h-4" />
                    </button>

                    <div className="flex-1">
                      <Select value={toLang} onValueChange={setToLang}>
                        <SelectTrigger style={{ backgroundColor: '#222222', border: '1px solid rgba(255,255,255,0.08)', color: '#FFFFFF' }}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent style={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)' }}>
                          {languages.map((lang) => (
                            <SelectItem key={lang.code} value={lang.code} style={{ color: '#FFFFFF' }}>
                              {lang.name} ({lang.nativeName})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Phrases Display */}
                <div className="space-y-3">
                  {Object.entries(commonPhrases).map(([categoryKey, phrase]) =>
                    selectedCategory === categoryKey && renderPhrase(categoryKey, phrase)
                  )}
                </div>
              </div>
            )}

            {activeTab === 'offline' && (
              <div className="space-y-4">
                {/* Offline Features */}
                <div style={cardStyle} className="overflow-hidden">
                  <div className="px-4 pt-4 pb-3">
                    <div className="flex items-center mb-1">
                      <Download className="w-5 h-5 mr-2" style={{ color: '#FF8C38' }} />
                      <h3 className="text-lg font-medium" style={{ color: '#FFFFFF' }}>Offline Translation</h3>
                    </div>
                    <p className="text-sm ml-7" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      Download language packs for offline use
                    </p>
                  </div>
                  <div className="px-4 pb-4">
                    <div className="space-y-3">
                      {languages.slice(0, 6).map((lang) => (
                        <div key={lang.code} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#222222', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF6B00, #CC5500)' }}>
                              <Globe className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium" style={{ color: '#FFFFFF' }}>{lang.name}</p>
                              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{lang.nativeName}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: 'rgba(76,175,125,0.2)', color: '#4CAF7D', border: '1px solid rgba(76,175,125,0.35)' }}>
                              Downloaded
                            </span>
                            <button
                              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                              style={{ color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.08)' }}
                            >
                              <RefreshCcw className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {languages.slice(6).map((lang) => (
                        <div key={lang.code} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#222222', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#2A2A2A' }}>
                              <Globe className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.35)' }} />
                            </div>
                            <div>
                              <p className="font-medium" style={{ color: '#FFFFFF' }}>{lang.name}</p>
                              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{lang.nativeName}</p>
                            </div>
                          </div>
                          <button
                            className="flex items-center px-3 py-1.5 rounded-xl text-sm font-medium hover:opacity-90 transition-colors"
                            style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Voice Features */}
                <div style={cardStyle} className="overflow-hidden">
                  <div className="px-4 pt-4 pb-3">
                    <div className="flex items-center mb-1">
                      <Mic className="w-5 h-5 mr-2" style={{ color: '#FF8C38' }} />
                      <h3 className="text-lg font-medium" style={{ color: '#FFFFFF' }}>Voice Capabilities</h3>
                    </div>
                    <p className="text-sm ml-7" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      Voice recognition and text-to-speech features
                    </p>
                  </div>
                  <div className="px-4 pb-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#222222', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4CAF7D, #3a9a6b)' }}>
                            <Mic className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium" style={{ color: '#FFFFFF' }}>Voice Input</p>
                            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Speech-to-text recognition</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: 'rgba(76,175,125,0.2)', color: '#4CAF7D', border: '1px solid rgba(76,175,125,0.35)' }}>
                          Available
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#222222', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #5B9AF5, #3a7ad4)' }}>
                            <Volume2 className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium" style={{ color: '#FFFFFF' }}>Voice Output</p>
                            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Text-to-speech synthesis</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: 'rgba(76,175,125,0.2)', color: '#4CAF7D', border: '1px solid rgba(76,175,125,0.35)' }}>
                          Available
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#222222', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF6B00, #CC5500)' }}>
                            <MessageCircle className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium" style={{ color: '#FFFFFF' }}>Conversation Mode</p>
                            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Real-time voice translation</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: 'rgba(245,158,11,0.2)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.35)' }}>
                          Premium
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Storage Info */}
                <div style={cardStyle} className="overflow-hidden">
                  <div className="px-4 pt-4 pb-3">
                    <div className="flex items-center mb-1">
                      <Info className="w-5 h-5 mr-2" style={{ color: '#FF8C38' }} />
                      <h3 className="text-lg font-medium" style={{ color: '#FFFFFF' }}>Storage Usage</h3>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Downloaded languages</span>
                        <span style={{ color: '#FFFFFF' }}>6 languages</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Voice models</span>
                        <span style={{ color: '#FFFFFF' }}>3 models</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Storage used</span>
                        <span style={{ color: '#FFFFFF' }}>450 MB</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Available space</span>
                        <span style={{ color: '#FFFFFF' }}>2.1 GB</span>
                      </div>
                      <div className="w-full rounded-full h-2" style={{ backgroundColor: '#222222' }}>
                        <div className="h-2 rounded-full" style={{ width: '18%', backgroundColor: '#FF6B00' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
