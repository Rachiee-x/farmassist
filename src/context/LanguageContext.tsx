import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ml';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Header
    home: 'Home',
    govSchemes: 'Govt Schemes',
    weather: 'Weather',
    aiAssistant: 'AI Assistant',
    about: 'About',
    
    // Hero Section
    heroTitle: 'AI-Powered Personal Farming Assistant',
    heroSubtitle: 'Empowering Kerala Farmers with Smart Technology',
    heroDescription: 'Get personalized farming advice, weather updates, and government scheme information tailored for Kerala farmers.',
    askAiAssistant: 'Ask AI Assistant',
    
    // Weather
    weatherTitle: 'Today\'s Weather',
    weatherLocation: 'Kerala, India',
    
    // Government Schemes
    govSchemesTitle: 'Government Schemes for Kerala Farmers (2025)',
    scheme1Title: 'PM-KISAN Scheme',
    scheme1Desc: 'Direct income support of ₹6,000 per year to eligible farmer families.',
    scheme2Title: 'Kerala Krishi Bhavan Initiative',
    scheme2Desc: 'Comprehensive support for modern farming techniques and equipment.',
    scheme3Title: 'Crop Insurance Scheme',
    scheme3Desc: 'Protection against crop loss due to natural calamities and pests.',
    learnMore: 'Learn More',
    viewAllSchemes: 'View All Schemes',
    schemesDescription: 'Discover government initiatives designed to support and empower farmers across Kerala with financial assistance, training, and resources.',
    
    // Features
    featuresTitle: 'How We Help Kerala Farmers',
    aiSuggestionsTitle: 'AI-Powered Crop Suggestions',
    aiSuggestionsDesc: 'Get personalized recommendations for crop selection, planting schedules, and yield optimization based on Kerala\'s climate.',
    
    faqTitle: 'Most Asked by Farmers',
    faq1: 'When is the best time to plant rice in Kerala?',
    faq2: 'How to prevent fungal diseases in coconut trees?',
    faq3: 'What are the best organic fertilizers for spices?',
    faq4: 'How to get subsidies for farming equipment?',
    
    // Chatbot
    chatbotTitle: 'Farm Assistant',
    chatPlaceholder: 'Ask about farming, weather, or government schemes...',
    send: 'Send',
    voiceTooltip: 'Click to speak',
    
    // Footer
    contactInfo: 'Contact Information',
    farmerHelplines: 'Farmer Helplines',
    kisamHelpline: 'Kisan Helpline: 1800-180-1551',
    weatherHelpline: 'Weather Helpline: 1800-419-0149',
    usefulLinks: 'Useful Links',
    keralaAgriculture: 'Kerala Agriculture Department',
    indianMeteorology: 'Indian Meteorological Department',
    
    // Common
    loading: 'Loading...',
    error: 'Something went wrong. Please try again.',
    searchPlaceholder: 'Search farming tips, weather, schemes...',
    temperatureLabel: 'Temperature',
    humidityLabel: 'Humidity',
    windSpeedLabel: 'Wind Speed',
  aiAdviceTitle: 'AI-Powered Farming Advice',
    viewAllFAQs: 'View All FAQs',
    featureRotation: 'Crop rotation recommendations',
    featureYield: 'Yield optimization strategies',
    featurePest: 'Pest and disease prediction',
    chatWelcome: "Hello! I'm your farming assistant. How can I help you today?",
    typing: 'Typing...',
    online: 'Online',
    aboutTitle: 'About FarmAssist',
    aboutDescription: "Empowering Kerala's farming community with cutting-edge AI technology and comprehensive agricultural support.",
    whyChooseTitle: 'Why Choose FarmAssist?',
    aiPoweredAssistance: 'AI-Powered Assistance',
    realTimeWeather: 'Real-time Weather Data',
    governmentSchemes: 'Government Schemes',
    multilingualSupport: 'Multilingual Support',
    uploadLeaf: 'Upload Leaf Image',
    awaitingImageUpload: 'Awaiting Image Upload',
    modelLoading: 'Loading Model...',
    modelReady: 'ML Engine Ready! Upload a leaf image.',
    imageForAnalysis: 'Image for Analysis',
    diagnosisRemedy: 'Diagnosis & Remedy',
    actionableAdvice: 'Actionable Advice',
    confidenceLabel: 'Confidence',
    processing: 'Processing complex leaf imagery data...',
  translateToMalayalam: 'Translate to Malayalam',
  translating: 'Translating...',
  translateError: 'Translation failed. Please set an API key or try again.',
    // Disease names
    disease_0: 'Healthy Leaf',
    disease_1: 'Tomato Leaf Mold',
    disease_2: 'Potato Early Blight',
    disease_3: 'Grape Black Rot',
    healthyFallback: 'Great job! Continue monitoring and maintain optimal soil moisture and nutrient levels.',
    // Remedy placeholders
    remedy_tomato_fetching: 'Fetching the latest fungal treatment guidelines for Tomato Leaf Mold...',
    remedy_potato_fetching: 'Analyzing best practices for seasonal rotation and nutrient management for Potato Early Blight...',
    remedy_grape_fetching: 'Consulting experts for the most effective fungicide and pruning schedules for Grape Black Rot...',
    remedy_default_fetching: 'Consulting dynamic knowledge base for a solution...',
    // Detector UI
    detectorTitle: 'Agri-Smart Disease Detector',
    detectorSubtitle: 'Upload a leaf image for instant, AI-powered disease diagnosis.',
  },
  ml: {
    // Header
    home: 'ഹോം',
    govSchemes: 'സർക്കാർ പദ്ധതികൾ',
    weather: 'കാലാവസ്ഥ',
    aiAssistant: 'എഐ സഹായി',
    about: 'വിവരങ്ങൾ',
    
    // Hero Section
    heroTitle: 'എഐ നയിക്കുന്ന വ്യക്തിഗത കാർഷിക സഹായി',
    heroSubtitle: 'സ്മാർട്ട് ടെക്നോളജി ഉപയോഗിച്ച് കേരള കർഷകരെ ശാക്തീകരിക്കുന്നു',
    heroDescription: 'കേരള കർഷകർക്കായി പ്രത്യേകം രൂപകൽപ്പന ചെയ്ത കാർഷിക ഉപദേശം, കാലാവസ്ഥാ വിവരങ്ങൾ, സർക്കാർ പദ്ധതി വിവരങ്ങൾ എന്നിവ നേടുക.',
    askAiAssistant: 'എഐ സഹായിയോട് ചോദിക്കുക',
    
    // Weather
    weatherTitle: 'ഇന്നത്തെ കാലാവസ്ഥ',
    weatherLocation: 'കേരളം, ഇന്ത്യ',
    
    // Government Schemes
    govSchemesTitle: 'കേരള കർഷകർക്കുള്ള സർക്കാർ പദ്ധതികൾ (2025)',
    scheme1Title: 'പ്രധാനമന്ത്രി-കിസാൻ പദ്ധതി',
    scheme1Desc: 'യോഗ്യതയുള്ള കർഷക കുടുംബങ്ങൾക്ക് പ്രതിവർഷം ₹6,000 നേരിട്ടുള്ള വരുമാന സഹായം.',
    scheme2Title: 'കേരള കൃഷി ഭവൻ സംരംഭം',
    scheme2Desc: 'ആധുനിക കാർഷിക സാങ്കേതിക വിദ്യകൾക്കും ഉപകരണങ്ങൾക്കുമുള്ള സമഗ്ര സഹായം.',
    scheme3Title: 'വിള ഇൻഷുറൻസ് പദ്ധതി',
    scheme3Desc: 'പ്രാകൃതിക ദുരന്തങ്ങളും കീടങ്ങളും മൂലമുള്ള വിള നഷ്ടത്തിൽ നിന്നുള്ള സംരക്ഷണം.',
    learnMore: 'കൂടുതൽ അറിയുക',
    viewAllSchemes: 'എല്ലാ പദ്ധതികളും കാണുക',
    schemesDescription: 'കേരളത്തിലുടനീളമുള്ള കർഷകരെ സാമ്പത്തിക സഹായം, പരിശീലനം, വിഭവങ്ങൾ എന്നിവയിലൂടെ പിന്തുണയ്ക്കാനും ശാക്തീകരിക്കാനും രൂപകൽപ്പന ചെയ്ത സർക്കാർ സംരംഭങ്ങൾ കണ്ടെത്തുക.',
    
    // Features
    featuresTitle: 'ഞങ്ങൾ കേരള കർഷകരെ എങ്ങനെ സഹായിക്കുന്നു',
    aiSuggestionsTitle: 'എഐ നയിക്കുന്ന വിള നിർദ്ദേശങ്ങൾ',
    aiSuggestionsDesc: 'കേരളത്തിന്റെ കാലാവസ്ഥയെ അടിസ്ഥാനമാക്കി വിള തിരഞ്ഞെടുപ്പ്, നടീൽ ഷെഡ്യൂൾ, വിളവ് ഒപ്റ്റിമൈസേഷൻ എന്നിവയ്ക്കായി വ്യക്തിഗത ശുപാർശകൾ നേടുക.',
    
    faqTitle: 'കർഷകർ ഏറ്റവും കൂടുതൽ ചോദിക്കുന്നവ',
    faq1: 'കേരളത്തിൽ നെല്ല് നടാനുള്ള ഏറ്റവും നല്ല സമയം എപ്പോഴാണ്?',
    faq2: 'തെങ്ങിൻ മരങ്ങളിലെ ഫംഗൽ രോഗങ്ങൾ എങ്ങനെ തടയാം?',
    faq3: 'സുഗന്ധവ്യഞ്ജനങ്ങൾക്ക് ഏറ്റവും നല്ല ജൈവവളം ഏത്?',
    faq4: 'കാർഷിക ഉപകരണങ്ങൾക്ക് സബ്സിഡി എങ്ങനെ നേടാം?',
    
    // Chatbot
    chatbotTitle: 'കാർഷിക സഹായി',
    chatPlaceholder: 'കൃഷി, കാലാവസ്ഥ, അല്ലെങ്കിൽ സർക്കാർ പദ്ധതികളെക്കുറിച്ച് ചോദിക്കുക...',
    send: 'അയയ്ക്കുക',
    voiceTooltip: 'സംസാരിക്കാൻ ക്ലിക്ക് ചെയ്യുക',
    
    // Footer
    contactInfo: 'ബന്ധപ്പെടാനുള്ള വിവരങ്ങൾ',
    farmerHelplines: 'കർഷക ഹെൽപ്പ്ലൈനുകൾ',
    kisamHelpline: 'കിസാൻ ഹെൽപ്പ്ലൈൻ: 1800-180-1551',
    weatherHelpline: 'കാലാവസ്ഥാ ഹെൽപ്പ്ലൈൻ: 1800-419-0149',
    usefulLinks: 'ഉപയോഗപ്രദമായ ലിങ്കുകൾ',
    keralaAgriculture: 'കേരള കൃഷി വകുപ്പ്',
    indianMeteorology: 'ഇന്ത്യൻ കാലാവസ്ഥാ വകുപ്പ്',
    
    // Common
    loading: 'ലോഡുചെയ്യുന്നു...',
    error: 'എന്തോ പിശക് സംഭവിച്ചു. ദയവായി വീണ്ടും ശ്രമിക്കുക.',
    searchPlaceholder: 'കൃഷി ടിപ്പുകൾ, കാലാവസ്ഥ, പദ്ധതികൾ കണ്ടെത്തുക...',
    temperatureLabel: 'താപനില',
    humidityLabel: 'ആദ്രത',
    windSpeedLabel: 'കാറ്റിന്റെ വേഗം',
  aiAdviceTitle: 'എഐ-ശക്തിയേകിച്ച കാർഷിക ഉപദേശം',
    viewAllFAQs: 'എല്ലാ ചോദ്യങ്ങളും കാണുക',
    featureRotation: 'ഫലചക്രീകരണം - വിളകളുടെ തിരിച്ചിരുത്തലുകൾ',
    featureYield: 'വളർച്ച മെച്ചപ്പെടുത്തൽ തന്ത്രങ്ങൾ',
    featurePest: 'ഷേമങ്ങളും രോഗ പ്രവചനങ്ങളും',
    chatWelcome: '\u0d39\u0d32\u0d4b! \u0d1e\u0d3e\u0d7b \u0d28\u0d3f\u0d19\u0d4d\u0d19\u0d33\u0d41\u0d1f\u0d46 \u0d15\u0d3e\u0d7c\u0d37\u0d3f\u0d15 \u0d38\u0d39\u0d3e\u0d2f\u0d3f\u0d2f\u0d3e\u0d23\u0d4d. \u0d0e\u0d19\u0d4d\u0d19\u0d28\u0d46 \u0d38\u0d39\u0d3e\u0d2f\u0d3f\u0d15\u0d4d\u0d15\u0d3e\u0d02?',
    typing: '\u0d24\u0d4d\u0d2f\u0d3f\u0d2a\u0d4d\u0d2a\u0d3f\u0d02...',
    online: 'ഓൺലൈൻ',
    aboutTitle: 'FarmAssist കുറിച്ച്',
    aboutDescription: 'കെട്ടുകൾകേന്ദ്രകരമായി AI സാങ്കേതിക വിദ്യയും വ്യാപക കാർഷിക പിന്തുണയും ഉപയോഗിച്ച് കേരള കർഷകരെ ശക്തിപ്പെടുത്തുന്നു.',
    whyChooseTitle: 'FarmAssist തിരഞ്ഞെടുക്കേണ്ടതെന്തുകൊണ്ട്?',
    aiPoweredAssistance: 'എഐ-സഹായം',
    realTimeWeather: 'യഥാർത്ഥ സമയം കാലാവസ്ഥാ ഡാറ്റ',
    governmentSchemes: 'സർക്കാർ പദ്ധതികൾ',
    multilingualSupport: 'ബഹുഭാഷാ പിന്തുണ',
    uploadLeaf: 'ഇലയുടെ ചിത്രം അപ്ലോഡ് ചെയ്യുക',
    awaitingImageUpload: 'ചിത്രം അപ്ളോഡിന് കാത്തിരിക്കുന്നു',
    modelLoading: 'മോഡൽ ലോഡിംഗ്...',
    modelReady: 'എംഎൽ എന്‍ജിൻ റെഡി! ഇലയുടെ ചിത്രം അപ്ലോഡ് ചെയ്യുക.',
    imageForAnalysis: 'വിശകലനത്തിനുള്ള ചിത്രം',
    diagnosisRemedy: 'രോഗനിദാനവും ചികിത്സയും',
    actionableAdvice: 'പ്രായോഗിക ഉപദേശം',
    confidenceLabel: 'നിഷ്കർമ്മം',
    processing: 'സങ്കീർണ്ണമായ ഇലാ ചിത്രങ്ങൾ പ്രോസസ് ചെയ്യുന്നു...',
  translateToMalayalam: 'മലയാളത്തിലേക്ക് പരിഭാഷപ്പെടുത്തുക',
  translating: 'പരിഭാഷപ്പെടുത്തുന്നു...',
  translateError: 'പരിഭാഷേൽ പരാജയപ്പെട്ടു. ദയവായി ഒരു API കീ സജ്ജമാക്കിയോ വീണ്ടും ശ്രമിക്കോ.',
    // Disease names
    disease_0: 'ആരോഗ്യമുള്ള ഇല',
    disease_1: 'തക്കാളി ഇല ഫംഗസ്',
    disease_2: 'ഉരുളകിഴങ്ങ് പ്രാരംഭ ബ്ലൈറ്റ്',
    disease_3: 'ദ്രാക്ഷി ബ്ലാക്ക് റോട്ട്',
    healthyFallback: 'നല്ല ജോലി! നിരീക്ഷണം തുടരുക; മണ്ണിലെ ഈർപ്പം, പോഷക നില എന്നിവ പരിചയപ്പെടുത്തുക.',
    // Remedy placeholders
    remedy_tomato_fetching: 'തക്കാളി ഇല ഫംഗസിന് ഏറ്റവും പുതിയ ഫംഗൽ ചികിത്സാ മാർഗ്ഗനിർദ്ദേശങ്ങൾ ശേഖരിക്കുന്നു...',
    remedy_potato_fetching: 'ഉരുളകിഴങ്ങ് പ്രാരംഭ ബ്ലൈറ്റിനുള്ള സീസണൽ റോട്ടേഷൻ, പോഷക ക്രമീകരണം എന്നിവ വിശകലനം ചെയ്യുന്നു...',
    remedy_grape_fetching: 'ദ്രാക്ഷി ബ്ലാക്ക് റോട്ടിന്റെ ഫംഗിസൈഡ് ഉപയോഗവും ഷെഡ്യൂളിംഗും സംബന്ധിച്ച വിദഗ്ധ നിർദ്ദേശങ്ങൾ അന്വേഷിക്കുന്നു...',
    remedy_default_fetching: 'ഡൈനാമിക് അറിവ് വിഭവശേഖരണം പുരോഗമിക്കുന്നു...',
    // Detector UI
    detectorTitle: 'Agri-Smart രോഗം കണ്ടെത്തൽ ഉപകരണം',
    detectorSubtitle: 'ശീഘ്രം, എഐ-ശക്തിയേകിച്ച രോഗനിർണയം ലഭിക്കുന്നതിനായി ഒരു ഇലയുടെ ചിത്രം അപ്ലോഡ് ചെയ്യുക.',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};