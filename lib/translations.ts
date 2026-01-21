"use client"

import { useEffect, useState } from "react"

export const translations = {
  en: {
    // Navigation
    home: "Home",
    connect: "Connect",
    events: "Events",
    messages: "Messages",
    settings: "Settings",
    profile: "Profile",
    dashboard: "Dashboard",
    createEvent: "Create Event",
    manageEvents: "Manage Events",
    organization: "Organization",
    users: "Users",

    // Authentication
    login: "Login",
    signup: "Sign Up",
    welcomeBack: "Welcome Back",
    joinVyvahaar: "Join Vyvahaar",
    enterPhone: "Enter your phone number",
    enterOTP: "Enter OTP",
    verifyOTP: "Verify OTP",
    resendOTP: "Resend OTP",
    otpSent: "OTP sent to your phone",
    otpVerified: "Phone number verified successfully",
    selectRole: "Select your role",
    userRole: "User - Join events and connect with others",
    adminRole: "Admin - Create events and manage organization",
    phoneNumber: "Phone Number",
    otpCode: "OTP Code",
    continueBtn: "Continue",
    verifyBtn: "Verify",

    // Home Page
    welcomeTitle: "The Perfect Gift for Our Parents & Grandparents",
    welcomeDescription:
      "Vyvahaar is India's first networking platform designed exclusively for senior citizens. We help our elders build meaningful connections, create lasting memories, and live their golden years with joy and companionship instead of loneliness.",
    joinToday: "Join Vyvahaar Today",
    learnMore: "Learn More",
    featuresTitle: "Features Designed for You",
    connectPeers: "Connect with Peers",
    connectPeersDesc: "Find and connect with like-minded senior citizens in your area",
    videoVoice: "Video & Voice Calls",
    videoVoiceDesc: "Stay connected with high-quality video and voice calling",
    eventsActivities: "Events & Activities",
    eventsActivitiesDesc: "Discover and join local events, workshops, and social gatherings",
    locationBased: "Location-Based",
    locationBasedDesc: "Connect with people nearby and discover local communities",
    voiceAssistant: "AI Voice Assistant",
    voiceAssistantDesc: "Navigate the platform easily with our multilingual voice assistant",
    safeTrusted: "Safe & Trusted",
    safeTrustedDesc: "A secure platform designed specifically for senior citizens",

    // Premium
    premiumTitle: "Vyvahaar Premium Events",
    premiumDesc: "Subscribe for just ₹99/month to attend all premium events and activities",
    subscribeNow: "Subscribe Now",
    getLifetime: "Get Lifetime",
    perMonth: "per month",
    lifetime: "lifetime",

    // Voice Assistant
    listening: "Listening...",
    clickMicrophone: "Click the microphone to start",
    voiceCommands: "Voice Commands",
    permissionRequired: "Permission Required",
    microphoneAccess: "Microphone access is required for voice commands",
    allowAccess: "Allow Access",

    // Common
    search: "Search",
    filter: "Filter",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    upload: "Upload",
    call: "Call",
    videoCall: "Video Call",
    message: "Message",
    support: "Support",
  },
  hi: {
    // Navigation
    home: "होम",
    connect: "जुड़ें",
    events: "कार्यक्रम",
    messages: "संदेश",
    settings: "सेटिंग्स",
    profile: "प्रोफाइल",
    dashboard: "डैशबोर्ड",
    createEvent: "कार्यक्रम बनाएं",
    manageEvents: "कार्यक्रम प्रबंधन",
    organization: "संगठन",
    users: "उपयोगकर्ता",

    // Authentication
    login: "लॉगिन",
    signup: "साइन अप",
    welcomeBack: "वापस स्वागत है",
    joinVyvahaar: "व्यवहार में शामिल हों",
    enterPhone: "अपना फोन नंबर दर्ज करें",
    enterOTP: "ओटीपी दर्ज करें",
    verifyOTP: "ओटीपी सत्यापित करें",
    resendOTP: "ओटीपी दोबारा भेजें",
    otpSent: "आपके फोन पर ओटीपी भेजा गया",
    otpVerified: "फोन नंबर सफलतापूर्वक सत्यापित",
    selectRole: "अपनी भूमिका चुनें",
    userRole: "उपयोगकर्ता - कार्यक्रमों में शामिल हों और दूसरों से जुड़ें",
    adminRole: "व्यवस्थापक - कार्यक्रम बनाएं और संगठन प्रबंधित करें",
    phoneNumber: "फोन नंबर",
    otpCode: "ओटीपी कोड",
    continueBtn: "जारी रखें",
    verifyBtn: "सत्यापित करें",

    // Home Page
    welcomeTitle: "हमारे माता-पिता और दादा-दादी के लिए सबसे अच्छा उपहार",
    welcomeDescription:
      "व्यवहार भारत का पहला नेटवर्किंग प्लेटफॉर्म है जो विशेष रूप से वरिष्ठ नागरिकों के लिए डिज़ाइन किया गया है। हम अपने बुजुर्गों को अकेलेपन के बजाय खुशी और साहचर्य के साथ अपने सुनहरे वर्षों को जीने में मदद करते हैं।",
    joinToday: "आज ही व्यवहार में शामिल हों",
    learnMore: "और जानें",
    featuresTitle: "आपके लिए डिज़ाइन की गई सुविधाएं",
    connectPeers: "साथियों से जुड़ें",
    connectPeersDesc: "अपने क्षेत्र में समान विचारधारा वाले वरिष्ठ नागरिकों को खोजें और उनसे जुड़ें",
    videoVoice: "वीडियो और आवाज कॉल",
    videoVoiceDesc: "उच्च गुणवत्ता वाले वीडियो और आवाज कॉलिंग के साथ जुड़े रहें",
    eventsActivities: "कार्यक्रम और गतिविधियां",
    eventsActivitiesDesc: "स्थानीय कार्यक्रमों, कार्यशालाओं और सामाजिक सभाओं की खोज करें और उनमें शामिल हों",
    locationBased: "स्थान आधारित",
    locationBasedDesc: "आस-पास के लोगों से जुड़ें और स्थानीय समुदायों की खोज करें",
    voiceAssistant: "एआई आवाज सहायक",
    voiceAssistantDesc: "हमारे बहुभाषी आवाज सहायक के साथ प्लेटफॉर्म को आसानी से नेविगेट करें",
    safeTrusted: "सुरक्षित और भरोसेमंद",
    safeTrustedDesc: "विशेष रूप से वरिष्ठ नागरिकों के लिए डिज़ाइन किया गया एक सुरक्षित प्लेटफॉर्म",

    // Premium
    premiumTitle: "व्यवहार प्रीमियम कार्यक्रम",
    premiumDesc: "सभी प्रीमियम कार्यक्रमों और गतिविधियों में भाग लेने के लिए केवल ₹99/माह की सदस्यता लें",
    subscribeNow: "अभी सदस्यता लें",
    getLifetime: "जीवनभर पाएं",
    perMonth: "प्रति माह",
    lifetime: "जीवनभर",

    // Voice Assistant
    listening: "सुन रहा है...",
    clickMicrophone: "शुरू करने के लिए माइक्रोफोन पर क्लिक करें",
    voiceCommands: "आवाज कमांड",
    permissionRequired: "अनुमति आवश्यक",
    microphoneAccess: "आवाज कमांड के लिए माइक्रोफोन की पहुंच आवश्यक है",
    allowAccess: "पहुंच की अनुमति दें",

    // Common
    search: "खोजें",
    filter: "फिल्टर",
    save: "सेव करें",
    cancel: "रद्द करें",
    edit: "संपादित करें",
    delete: "हटाएं",
    upload: "अपलोड करें",
    call: "कॉल करें",
    videoCall: "वीडियो कॉल",
    message: "संदेश",
    support: "सहायता",
  },
  pa: {
    // Navigation
    home: "ਘਰ",
    connect: "ਜੁੜੋ",
    events: "ਸਮਾਗਮ",
    messages: "ਸੁਨੇਹੇ",
    settings: "ਸੈਟਿੰਗਾਂ",
    profile: "ਪ੍ਰੋਫਾਈਲ",
    dashboard: "ਡੈਸ਼ਬੋਰਡ",
    createEvent: "ਸਮਾਗਮ ਬਣਾਓ",
    manageEvents: "ਸਮਾਗਮ ਪ੍ਰਬੰਧਨ",
    organization: "ਸੰਸਥਾ",
    users: "ਵਰਤੋਂਕਾਰ",

    // Authentication
    login: "ਲਾਗਇਨ",
    signup: "ਸਾਈਨ ਅਪ",
    welcomeBack: "ਵਾਪਸ ਜੀ ਆਇਆਂ ਨੂੰ",
    joinVyvahaar: "ਵਿਵਹਾਰ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ",
    enterPhone: "ਆਪਣਾ ਫੋਨ ਨੰਬਰ ਦਾਖਲ ਕਰੋ",
    enterOTP: "ਓਟੀਪੀ ਦਾਖਲ ਕਰੋ",
    verifyOTP: "ਓਟੀਪੀ ਤਸਦੀਕ ਕਰੋ",
    resendOTP: "ਓਟੀਪੀ ਦੁਬਾਰਾ ਭੇਜੋ",
    otpSent: "ਤੁਹਾਡੇ ਫੋਨ 'ਤੇ ਓਟੀਪੀ ਭੇਜਿਆ ਗਿਆ",
    otpVerified: "ਫੋਨ ਨੰਬਰ ਸਫਲਤਾਪੂਰਵਕ ਤਸਦੀਕ ਹੋਇਆ",
    selectRole: "ਆਪਣੀ ਭੂਮਿਕਾ ਚੁਣੋ",
    userRole: "ਵਰਤੋਂਕਾਰ - ਸਮਾਗਮਾਂ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ ਅਤੇ ਦੂਜਿਆਂ ਨਾਲ ਜੁੜੋ",
    adminRole: "ਪ੍ਰਸ਼ਾਸਕ - ਸਮਾਗਮ ਬਣਾਓ ਅਤੇ ਸੰਸਥਾ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ",
    phoneNumber: "ਫੋਨ ਨੰਬਰ",
    otpCode: "ਓਟੀਪੀ ਕੋਡ",
    continueBtn: "ਜਾਰੀ ਰੱਖੋ",
    verifyBtn: "ਤਸਦੀਕ ਕਰੋ",

    // Home Page
    welcomeTitle: "ਸਾਡੇ ਮਾਤਾ-ਪਿਤਾ ਅਤੇ ਦਾਦਾ-ਦਾਦੀ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਤੋਹਫਾ",
    welcomeDescription:
      "ਵਿਵਹਾਰ ਭਾਰਤ ਦਾ ਪਹਿਲਾ ਨੈੱਟਵਰਕਿੰਗ ਪਲੇਟਫਾਰਮ ਹੈ ਜੋ ਵਿਸ਼ੇਸ਼ ਤੌਰ 'ਤੇ ਸੀਨੀਅਰ ਸਿਟੀਜ਼ਨਾਂ ਲਈ ਡਿਜ਼ਾਈਨ ਕੀਤਾ ਗਿਆ ਹੈ। ਅਸੀਂ ਆਪਣੇ ਬਜ਼ੁਰਗਾਂ ਨੂੰ ਇਕੱਲਤਾ ਦੀ ਬਜਾਏ ਖੁਸ਼ੀ ਅਤੇ ਸਾਥ ਨਾਲ ਆਪਣੇ ਸੁਨਹਿਰੀ ਸਾਲ ਜੀਣ ਵਿੱਚ ਮਦਦ ਕਰਦੇ ਹਾਂ।",
    joinToday: "ਅੱਜ ਹੀ ਵਿਵਹਾਰ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ",
    learnMore: "ਹੋਰ ਜਾਣੋ",
    featuresTitle: "ਤੁਹਾਡੇ ਲਈ ਡਿਜ਼ਾਈਨ ਕੀਤੀਆਂ ਸੁਵਿਧਾਵਾਂ",
    connectPeers: "ਸਾਥੀਆਂ ਨਾਲ ਜੁੜੋ",
    connectPeersDesc: "ਆਪਣੇ ਖੇਤਰ ਵਿੱਚ ਸਮਾਨ ਸੋਚ ਵਾਲੇ ਸੀਨੀਅਰ ਸਿਟੀਜ਼ਨਾਂ ਨੂੰ ਲੱਭੋ ਅਤੇ ਉਨ੍ਹਾਂ ਨਾਲ ਜੁੜੋ",
    videoVoice: "ਵੀਡੀਓ ਅਤੇ ਆਵਾਜ਼ ਕਾਲਾਂ",
    videoVoiceDesc: "ਉੱਚ ਗੁਣਵੱਤਾ ਵਾਲੇ ਵੀਡੀਓ ਅਤੇ ਆਵਾਜ਼ ਕਾਲਿੰਗ ਨਾਲ ਜੁੜੇ ਰਹੋ",
    eventsActivities: "ਸਮਾਗਮ ਅਤੇ ਗਤੀਵਿਧੀਆਂ",
    eventsActivitiesDesc: "ਸਥਾਨਕ ਸਮਾਗਮਾਂ, ਵਰਕਸ਼ਾਪਾਂ ਅਤੇ ਸਮਾਜਿਕ ਇਕੱਠਾਂ ਦੀ ਖੋਜ ਕਰੋ ਅਤੇ ਉਨ੍ਹਾਂ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ",
    locationBased: "ਸਥਾਨ ਆਧਾਰਿਤ",
    locationBasedDesc: "ਨੇੜੇ ਦੇ ਲੋਕਾਂ ਨਾਲ ਜੁੜੋ ਅਤੇ ਸਥਾਨਕ ਭਾਈਚਾਰਿਆਂ ਦੀ ਖੋਜ ਕਰੋ",
    voiceAssistant: "ਏਆਈ ਆਵਾਜ਼ ਸਹਾਇਕ",
    voiceAssistantDesc: "ਸਾਡੇ ਬਹੁਭਾਸ਼ੀ ਆਵਾਜ਼ ਸਹਾਇਕ ਨਾਲ ਪਲੇਟਫਾਰਮ ਨੂੰ ਆਸਾਨੀ ਨਾਲ ਨੈਵੀਗੇਟ ਕਰੋ",
    safeTrusted: "ਸੁਰੱਖਿਅਤ ਅਤੇ ਭਰੋਸੇਮੰਦ",
    safeTrustedDesc: "ਵਿਸ਼ੇਸ਼ ਤੌਰ 'ਤੇ ਸੀਨੀਅਰ ਸਿਟੀਜ਼ਨਾਂ ਲਈ ਡਿਜ਼ਾਈਨ ਕੀਤਾ ਗਿਆ ਇੱਕ ਸੁਰੱਖਿਅਤ ਪਲੇਟਫਾਰਮ",

    // Premium
    premiumTitle: "ਵਿਵਹਾਰ ਪ੍ਰੀਮੀਅਮ ਸਮਾਗਮ",
    premiumDesc: "ਸਾਰੇ ਪ੍ਰੀਮੀਅਮ ਸਮਾਗਮਾਂ ਅਤੇ ਗਤੀਵਿਧੀਆਂ ਵਿੱਚ ਹਿੱਸਾ ਲੈਣ ਲਈ ਸਿਰਫ਼ ₹99/ਮਹੀਨਾ ਦੀ ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਲਓ",
    subscribeNow: "ਹੁਣੇ ਸਬਸਕ੍ਰਾਈਬ ਕਰੋ",
    getLifetime: "ਜੀਵਨ ਭਰ ਪਾਓ",
    perMonth: "ਪ੍ਰਤੀ ਮਹੀਨਾ",
    lifetime: "ਜੀਵਨ ਭਰ",

    // Voice Assistant
    listening: "ਸੁਣ ਰਿਹਾ ਹੈ...",
    clickMicrophone: "ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਮਾਈਕ੍ਰੋਫੋਨ 'ਤੇ ਕਲਿੱਕ ਕਰੋ",
    voiceCommands: "ਆਵਾਜ਼ ਕਮਾਂਡ",
    permissionRequired: "ਇਜਾਜ਼ਤ ਦੀ ਲੋੜ",
    microphoneAccess: "ਆਵਾਜ਼ ਕਮਾਂਡ ਲਈ ਮਾਈਕ੍ਰੋਫੋਨ ਦੀ ਪਹੁੰਚ ਦੀ ਲੋੜ ਹੈ",
    allowAccess: "ਪਹੁੰਚ ਦੀ ਇਜਾਜ਼ਤ ਦਿਓ",

    // Common
    search: "ਖੋਜੋ",
    filter: "ਫਿਲਟਰ",
    save: "ਸੇਵ ਕਰੋ",
    cancel: "ਰੱਦ ਕਰੋ",
    edit: "ਸੰਪਾਦਨ",
    delete: "ਮਿਟਾਓ",
    upload: "ਅਪਲੋਡ ਕਰੋ",
    call: "ਕਾਲ ਕਰੋ",
    videoCall: "ਵੀਡੀਓ ਕਾਲ",
    message: "ਸੁਨੇਹਾ",
    support: "ਸਹਾਇਤਾ",
  },
}

export function useTranslation() {
  const [currentLanguage, setCurrentLanguage] = useState("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("vyvahaar_language") || "en"
    setCurrentLanguage(savedLanguage)

    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail)
    }

    window.addEventListener("languageChange", handleLanguageChange as EventListener)
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener)
  }, [])

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[currentLanguage as keyof typeof translations]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || translations.en[key as keyof typeof translations.en] || key
  }

  return { t, currentLanguage }
}
