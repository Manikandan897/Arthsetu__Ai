export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flagCode: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flagCode: 'IN' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flagCode: 'TN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flagCode: 'HI' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flagCode: 'TE' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flagCode: 'KN' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flagCode: 'ML' }
];

export interface TranslationDictionary {
  tagline: string;
  findMyScheme: string;
  exploreSchemes: string;
  heroHeadline: string;
  heroSubheadline: string;
  howItWorks: string;
  eligibility: string;
  whyThisScheme: string;
  compare: string;
  financialCalculator: string;
  partnerLocator: string;
  documentChecklist: string;
  applicationGuidance: string;
  askAssistant: string;
  officialPortal: string;
  estimatedEMI: string;
  disclaimer: string;
}

export const TRANSLATIONS: Record<string, TranslationDictionary> = {
  en: {
    tagline: 'Bridging Entrepreneurs with the Right Opportunity',
    findMyScheme: 'Find My Scheme',
    exploreSchemes: 'Explore All Schemes',
    heroHeadline: 'Find the Right Government Scheme for Your Entrepreneurial Journey',
    heroSubheadline: 'Official AI-driven scheme matching, rule-verified eligibility, repayment estimation, and authorized channel partner routing for marginalized Indian entrepreneurs.',
    howItWorks: 'How It Works',
    eligibility: 'Eligibility Check',
    whyThisScheme: 'Why This Scheme?',
    compare: 'Compare Schemes',
    financialCalculator: 'Financial Calculator',
    partnerLocator: 'Partner Locator',
    documentChecklist: 'Document Checklist',
    applicationGuidance: 'Application Guidance',
    askAssistant: 'Ask ArthSetu AI',
    officialPortal: 'Official Government Portal',
    estimatedEMI: 'Estimated Monthly Repayment (EMI)',
    disclaimer: 'Official Information & Verified Rules. This platform provides recommendations and guidance; final sanctions are subject to lending institution verification.'
  },
  ta: {
    tagline: 'தொழில்முனைவோரை சரியான வாய்ப்புடன் இணைக்கிறது',
    findMyScheme: 'எனக்கான திட்டத்தைக் கண்டறிக',
    exploreSchemes: 'அனைத்து திட்டங்களையும் ஆராய்க',
    heroHeadline: 'உங்கள் தொழில்முனைவு பயணத்திற்கான சரியான அரசு திட்டத்தைக் கண்டறியுங்கள்',
    heroSubheadline: 'விளிம்புநிலை தொழில்முனைவோருக்கான AI அடிப்படையிலான திட்ட பொருத்தம், விதி-சரிபார்க்கப்பட்ட தகுதி மற்றும் அங்கீகரிக்கப்பட்ட கடன் கூட்டாளர்கள்.',
    howItWorks: 'எவ்வாறு செயல்படுகிறது',
    eligibility: 'தகுதி சரிபார்ப்பு',
    whyThisScheme: 'இந்த திட்டம் ஏன்?',
    compare: 'திட்டங்களை ஒப்பிடுக',
    financialCalculator: 'நிதி கணக்கீடு',
    partnerLocator: 'வங்கி & மையங்கள்',
    documentChecklist: 'ஆவண சரிபார்ப்புப் பட்டியல்',
    applicationGuidance: 'விண்ணப்ப வழிகாட்டுதல்',
    askAssistant: 'அர்த்தசேதுவிடம் கேட்க',
    officialPortal: 'அதிகாரப்பூர்வ அரசு தளம்',
    estimatedEMI: 'மதிப்பிடப்பட்ட மாதாந்திர தவணை (EMI)',
    disclaimer: 'அதிகாரப்பூர்வ தகவல்கள் மற்றும் சரிபார்க்கப்பட்ட விதிகள் மட்டுமே. வங்கி வழிகாட்டுதல் சார்ந்தது.'
  },
  hi: {
    tagline: 'उद्यमियों को सही अवसर से जोड़ना',
    findMyScheme: 'मेरी योजना खोजें',
    exploreSchemes: 'सभी योजनाएं देखें',
    heroHeadline: 'अपनी उद्यमशीलता यात्रा के लिए सही सरकारी योजना खोजें',
    heroSubheadline: 'वंचित उद्यमियों के लिए एआई-संचालित योजना मिलान, नियम-सत्यापित पात्रता, ऋण पुनर्भुगतान अनुमान और अधिकृत चैनल पार्टनर लोकेटर।',
    howItWorks: 'यह कैसे कार्य करता है',
    eligibility: 'पात्रता सत्यापन',
    whyThisScheme: 'यही योजना क्यों?',
    compare: 'योजना तुलना',
    financialCalculator: 'वित्तीय कैलकुलेटर',
    partnerLocator: 'सहयोगी केंद्र खोजें',
    documentChecklist: 'दस्तावेज़ चेकलिस्ट',
    applicationGuidance: 'आवेदन मार्गदर्शन',
    askAssistant: 'अर्थसेतु से पूछें',
    officialPortal: 'आधिकारिक सरकारी पोर्टल',
    estimatedEMI: 'अनुमानित मासिक किस्त (EMI)',
    disclaimer: 'आधिकारिक जानकारी एवं सत्यापित नियम। अंतिम स्वीकृति बैंक एवं नोडल एजेंसियों के सत्यापन पर निर्भर है।'
  },
  te: {
    tagline: 'వ్యవస్థాపకులను సరైన అవకాశంతో అనుసంధానించడం',
    findMyScheme: 'నా పథకాన్ని కనుగొనండి',
    exploreSchemes: 'అన్ని పథకాలను చూడండి',
    heroHeadline: 'మీ వ్యవస్థాపక ప్రయాణానికి సరైన ప్రభుత్వ పథకాన్ని కనుగొనండి',
    heroSubheadline: 'నిరుపేద వ్యవస్థాపకుల కోసం AI-ఆధారిత పథక ఎంపిక, నియమ-ధృవీకరించబడిన అర్హత మరియు అధీకృత భాగస్వామి లొకేటర్.',
    howItWorks: 'ఇది ఎలా పనిచేస్తుంది',
    eligibility: 'అర్హత తనిఖీ',
    whyThisScheme: 'ఈ పథకం ఎందుకు?',
    compare: 'పథకాలను సరిపోల్చండి',
    financialCalculator: 'ఆర్థిక కాలిక్యులేటర్',
    partnerLocator: 'సహాయక కేంద్రాలు',
    documentChecklist: 'పత్రాల చెక్‌లిస్ట్',
    applicationGuidance: 'దరఖాస్తు మార్గదర్శకత్వం',
    askAssistant: 'అర్థసేతును అడగండి',
    officialPortal: 'అధికారిక ప్రభుత్వ పోర్టల్',
    estimatedEMI: 'అంచనా వేసిన నెలవారీ వాయిదా (EMI)',
    disclaimer: 'అధికారిక సమాచారం మరియు ధృవీకరించబడిన నిబంధనలు.'
  },
  kn: {
    tagline: 'ಉದ್ಯಮಿಗಳನ್ನು ಸರಿಯಾದ ಅವಕಾಶದೊಂದಿಗೆ ಜೋಡಿಸುವುದು',
    findMyScheme: 'ನನ್ನ ಯೋಜನೆಯನ್ನು ಹುಡುಕಿ',
    exploreSchemes: 'ಎಲ್ಲಾ ಯೋಜನೆಗಳನ್ನು ನೋಡಿ',
    heroHeadline: 'ನಿಮ್ಮ ಉದ್ಯಮಶೀಲತೆಯ ಪಯಣಕ್ಕೆ ಸೂಕ್ತವಾದ ಸರ್ಕಾರಿ ಯೋಜನೆಯನ್ನು ಹುಡುಕಿ',
    heroSubheadline: 'ವಂಚಿತ ಉದ್ಯಮಿಗಳಿಗೆ AI ಆಧಾರಿತ ಯೋಜನೆ ಆಯ್ಕೆ, ನಿಯಮ ಪರಿಶೀಲಿಸಿದ ಅರ್ಹತೆ ಮತ್ತು ಅಧಿಕೃತ ಪಾಲುದಾರರ ಮಾಹಿತಿ.',
    howItWorks: 'ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ',
    eligibility: 'ಅರ್ಹತೆ ಪರಿಶೀಲನೆ',
    whyThisScheme: 'ಈ ಯೋಜನೆ ಏಕೆ?',
    compare: 'ಯೋಜನೆಗಳನ್ನು ಹೋಲಿಕೆ ಮಾಡಿ',
    financialCalculator: 'ಹಣಕಾಸು ಕ್ಯಾಲ್ಕುಲೇಟರ್',
    partnerLocator: 'ಪಾಲುದಾರ ಶಾಖೆಗಳು',
    documentChecklist: 'ದಾಖಲೆಗಳ ಪಟ್ಟಿ',
    applicationGuidance: 'ಅರ್ಜಿ ಮಾರ್ಗದರ್ಶನ',
    askAssistant: 'ಅರ್ಥಸೇತುವನ್ನು ಕೇಳಿ',
    officialPortal: 'ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್',
    estimatedEMI: 'ಅಂದಾಜು ಮಾಸಿಕ ಕಂತು (EMI)',
    disclaimer: 'ಅಧಿಕೃತ ಮಾಹಿತಿ ಮತ್ತು ಪರಿಶೀಲಿಸಿದ ನಿಯಮಗಳು.'
  },
  ml: {
    tagline: 'സംരംഭകരെ ശരിയായ അവസരവുമായി ബന്ധിപ്പിക്കുന്നു',
    findMyScheme: 'എന്റെ പദ്ധതി കണ്ടെത്തുക',
    exploreSchemes: 'പദ്ധതികൾ കാണുക',
    heroHeadline: 'നിങ്ങളുടെ സംരംഭക യാത്രയ്ക്കുള്ള ശരിയായ സർക്കാർ പദ്ധതി കണ്ടെത്തുക',
    heroSubheadline: 'പിന്നാക്ക സംരംഭകർക്കായി AI അധിഷ്ഠിത സ്കീം മാച്ചിംഗ്, നിബന്ധനകൾക്കനുസൃതമായ യോഗ്യത പരിശോധന.',
    howItWorks: 'ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു',
    eligibility: 'യോഗ്യതാ പരിശോധന',
    whyThisScheme: 'എന്തുകൊണ്ട് ഈ പദ്ധതി?',
    compare: 'പദ്ധതികൾ താരതമ്യം ചെയ്യുക',
    financialCalculator: 'സാമ്പത്തിക കാൽക്കുലേറ്റർ',
    partnerLocator: 'സഹായ കേന്ദ്രങ്ങൾ',
    documentChecklist: 'രേഖകളുടെ പട്ടിക',
    applicationGuidance: 'അപേക്ഷാ മാർഗ്ഗനിർദ്ദേശം',
    askAssistant: 'അർത്ഥസേതുവിനോട് ചോദിക്കുക',
    officialPortal: 'ഔദ്യോഗിക സർക്കാർ പോർട്ടൽ',
    estimatedEMI: 'കണക്കാക്കിയ പ്രതിമാസ തവണ (EMI)',
    disclaimer: 'ഔദ്യോഗിക വിവരങ്ങളും സ്ഥിരീകരിച്ച നിയമങ്ങളും.'
  }
};
