import { ExtractedProfileData, UserProfile } from '../types';

export function parseNaturalLanguageInput(rawText: string): ExtractedProfileData {
  const text = rawText.trim();
  const lower = text.toLowerCase();

  let requiredLoanAmount: number | undefined;
  let tradeOrActivity: string | undefined;
  let businessType: ExtractedProfileData['businessType'];
  let businessStage: ExtractedProfileData['businessStage'] = 'New Idea / Startup';
  let socialCategory: ExtractedProfileData['socialCategory'];
  let gender: ExtractedProfileData['gender'];

  const missingFields: string[] = [];

  // 1. Amount Extraction
  // Look for "1 lakh", "1L", "₹1,00,000", "50,000", "50k", "2 lakh", "10 lakhs", etc.
  const lakhMatch = lower.match(/(?:₹|rs\.?|inr)?\s*(\d+(?:\.\d+)?)\s*(?:lakh|lac|l)\b/i);
  const kMatch = lower.match(/(?:₹|rs\.?|inr)?\s*(\d+)\s*(?:k|thousand)\b/i);
  const rawNumMatch = lower.match(/(?:₹|rs\.?|inr)?\s*(\d{1,2}(?:,\d{2,3})*(?:\.\d+)?|\d{4,8})\b/i);

  if (lakhMatch) {
    const val = parseFloat(lakhMatch[1]);
    requiredLoanAmount = Math.round(val * 100000);
  } else if (kMatch) {
    const val = parseFloat(kMatch[1]);
    requiredLoanAmount = Math.round(val * 1000);
  } else if (rawNumMatch) {
    const cleanStr = rawNumMatch[1].replace(/,/g, '');
    const val = parseFloat(cleanStr);
    if (val >= 1000) {
      requiredLoanAmount = Math.round(val);
    }
  }

  // 2. Trade & Activity Extraction
  if (lower.includes('tailor') || lower.includes('darzi') || lower.includes('stitching') || lower.includes('boutique') || lower.includes('cloth') || lower.includes('garment')) {
    tradeOrActivity = 'Tailoring & Garments (Darzi)';
    businessType = 'Traditional Artisan / Craft';
  } else if (lower.includes('carpent') || lower.includes('furniture') || lower.includes('wood')) {
    tradeOrActivity = 'Carpentry & Woodwork (Badhai)';
    businessType = 'Traditional Artisan / Craft';
  } else if (lower.includes('potter') || lower.includes('clay') || lower.includes('kumhaar')) {
    tradeOrActivity = 'Pottery & Terracotta (Kumhaar)';
    businessType = 'Traditional Artisan / Craft';
  } else if (lower.includes('blacksmith') || lower.includes('iron') || lower.includes('lohar')) {
    tradeOrActivity = 'Blacksmith & Metalcraft (Lohar)';
    businessType = 'Traditional Artisan / Craft';
  } else if (lower.includes('street') || lower.includes('vendor') || lower.includes('hawker') || lower.includes('thela') || lower.includes('stall') || lower.includes('cart') || lower.includes('fruit') || lower.includes('vegetable')) {
    tradeOrActivity = 'Street Vending & Micro Hawking';
    businessType = 'Street Vending / Micro Hawkers';
  } else if (lower.includes('kirana') || lower.includes('grocery') || lower.includes('retail') || lower.includes('shop')) {
    tradeOrActivity = 'Retail Kirana / General Store';
    businessType = 'Retail / Trading';
  } else if (lower.includes('tea') || lower.includes('food') || lower.includes('canteen') || lower.includes('snack') || lower.includes('bakery')) {
    tradeOrActivity = 'Food Processing & Small Eatery';
    businessType = 'Manufacturing / Production';
  } else if (lower.includes('repair') || lower.includes('electric') || lower.includes('mobile') || lower.includes('plumb')) {
    tradeOrActivity = 'Technical Repair & Installation Services';
    businessType = 'Services';
  } else if (lower.includes('salon') || lower.includes('beauty') || lower.includes('barber')) {
    tradeOrActivity = 'Personal Care / Salon / Barber (Naai)';
    businessType = 'Services';
  } else if (lower.includes('dairy') || lower.includes('poultry') || lower.includes('cow') || lower.includes('goat') || lower.includes('livestock')) {
    tradeOrActivity = 'Dairy & Allied Animal Husbandry';
    businessType = 'Agriculture Allied';
  } else {
    // Generic activity extraction if words like "start a ... business" appear
    const startMatch = text.match(/(?:start|launch|expand|set up|open)\s+(?:a\s+)?([a-zA-Z\s]{3,25})\s+(?:business|shop|enterprise|unit|work)/i);
    if (startMatch) {
      tradeOrActivity = startMatch[1].trim();
      businessType = 'Manufacturing / Production';
    }
  }

  // 3. Stage Extraction
  if (lower.includes('expand') || lower.includes('grow') || lower.includes('scale')) {
    businessStage = 'Expanding Enterprise (> 3 yrs)';
  } else if (lower.includes('existing') || lower.includes('running') || lower.includes('already have')) {
    businessStage = 'Existing Enterprise (< 3 yrs)';
  } else {
    businessStage = 'New Idea / Startup';
  }

  // 4. Demographic Extraction
  if (lower.includes('woman') || lower.includes('women') || lower.includes('female') || lower.includes('lady') || lower.includes('mahila') || lower.includes('mother')) {
    gender = 'Female';
  }

  if (lower.includes('sc') || lower.includes('scheduled caste') || lower.includes('dalit')) {
    socialCategory = 'SC';
  } else if (lower.includes('st') || lower.includes('scheduled tribe') || lower.includes('adivasi')) {
    socialCategory = 'ST';
  } else if (lower.includes('obc') || lower.includes('backward class')) {
    socialCategory = 'OBC';
  } else if (lower.includes('safai') || lower.includes('sanitation worker') || lower.includes('sweeper')) {
    socialCategory = 'Safai Karamchari';
  }

  // Check missing elements
  if (!requiredLoanAmount) {
    missingFields.push('Required Loan / Project Amount');
  }
  if (!tradeOrActivity) {
    missingFields.push('Specific Business Trade or Activity');
  }
  if (!socialCategory) {
    missingFields.push('Social Category (SC/ST/OBC/General) to check concessional subsidies');
  }
  missingFields.push('State and District location');
  missingFields.push('Own investment / margin contribution');

  let summary = `Identified: `;
  const parts: string[] = [];
  if (tradeOrActivity) parts.push(`Business: ${tradeOrActivity}`);
  if (requiredLoanAmount) parts.push(`Loan Needed: ₹${requiredLoanAmount.toLocaleString('en-IN')}`);
  if (businessStage) parts.push(`Stage: ${businessStage}`);
  if (gender) parts.push(`Gender: ${gender}`);
  if (socialCategory) parts.push(`Category: ${socialCategory}`);

  summary += parts.length > 0 ? parts.join(' | ') : 'General entrepreneurial inquiry';

  return {
    tradeOrActivity,
    businessType,
    businessStage,
    requiredLoanAmount,
    socialCategory,
    gender,
    extractedTextSummary: summary,
    confidenceScore: parts.length >= 2 ? 88 : 65,
    missingFields
  };
}

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionSuggestions?: { label: string; tab: string; payload?: unknown }[];
}

export function generateAssistantReply(
  query: string,
  userProfile?: UserProfile
): { reply: string; actionSuggestions?: { label: string; tab: string; payload?: unknown }[] } {
  const q = query.toLowerCase();

  if (q.includes('which scheme') || q.includes('suit') || q.includes('best for me') || q.includes('recommend')) {
    if (userProfile && userProfile.requiredLoanAmount > 0) {
      return {
        reply: `Based on your profile requirement of ₹${userProfile.requiredLoanAmount.toLocaleString('en-IN')} for ${userProfile.tradeOrActivity || 'your enterprise'}:

1. If you are an artisan or tailor: **PM Vishwakarma Scheme** offers a concessional 5% interest rate, skill training stipend, and a ₹15,000 digital toolkit voucher.
2. For general retail or services: **Pradhan Mantri Mudra Yojana (PMMY)** provides collateral-free loans across Shishu (up to ₹50,000), Kishore (₹50k–₹5L), and Tarun (₹5L–₹10L) categories.
3. For rural manufacturing/services: **PMEGP** provides up to 35% non-repayable capital subsidy for marginalized categories.

*Important Note: Government schemes do not guarantee automatic approval; sanction is subject to bank verification.*`,
        actionSuggestions: [
          { label: 'View Matched Schemes', tab: 'scheme-results' },
          { label: 'Check Eligibility Details', tab: 'find-scheme' }
        ]
      };
    }
    return {
      reply: `To identify which scheme suits you, our platform checks 4 main criteria:
1. **Activity Type**: Traditional artisans (PM Vishwakarma), street vendors (PM SVANidhi), manufacturing/services (PMEGP, PMMY).
2. **Ticket Size**: Micro (up to ₹50k), medium (up to ₹5L), or large greenfield (up to ₹1 Crore under Stand-Up India).
3. **Category Priority**: Special subsidies are reserved for SC, ST, OBC, and Women entrepreneurs.

Would you like to complete our 2-minute "Find My Scheme" wizard?`,
      actionSuggestions: [
        { label: 'Start Find My Scheme', tab: 'find-scheme' },
        { label: 'Explore All 8 Schemes', tab: 'scheme-results' }
      ]
    };
  }

  if (q.includes('why am i eligible') || q.includes('why eligible') || q.includes('match score')) {
    return {
      reply: `ArthSetu AI uses a **hybrid evaluation model**:
- **NLP Layer**: Understands your business activity, project cost, and background.
- **Statutory Rule Engine**: Evaluates statutory criteria (age, ceiling limits, target trades, greenfield norms).
- **Explanation Layer**: Generates an audit trail showing:
  ✓ Criteria matching your profile
  ⚠ Conditions needing bank or document verification
  ℹ Missing items (like Udyam registration or quotations)

We never declare "Approved" because all loans require branch verification and credit checks under RBI guidelines.`,
      actionSuggestions: [
        { label: 'View Match Explanations', tab: 'scheme-results' }
      ]
    };
  }

  if (q.includes('document') || q.includes('papers') || q.includes('proof')) {
    return {
      reply: `Standard documentation required across most Indian government credit schemes:
1. **Identity & Age**: Aadhaar Card (biometric-linked), PAN Card, or Voter ID.
2. **Address Proof**: Ration Card, Electricity Bill, or Gram Panchayat residence certificate.
3. **Category Proof (if claiming subsidy)**: Caste certificate for SC/ST/OBC from Tehsildar or SDM.
4. **Business & Trade**: Trade quotation / machinery estimate, artisan declaration (for PM Vishwakarma), or Certificate of Vending (for PM SVANidhi).
5. **Bank Details**: Bank passbook copy or 6 months statement of active savings account.

You can inspect and tick off each document in our interactive Document Checklist!`,
      actionSuggestions: [
        { label: 'Open Document Checklist', tab: 'documents' }
      ]
    };
  }

  if (q.includes('emi') || q.includes('calculat') || q.includes('repay') || q.includes('interest')) {
    return {
      reply: `EMI (Equated Monthly Installment) is calculated using standard reducing balance:
EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]

Key points for government schemes:
- **Moratorium Period**: Most schemes provide 6 to 12 months grace period where you only pay simple interest or defer principal repayment until production starts.
- **Interest Subventions**: Under PM Vishwakarma, MoMSME pays 8% subvention directly to the bank, so you only pay net 5% p.a.
- **Capital Subsidy**: Under PMEGP, 25%–35% of the project cost is granted as back-ended subsidy, reducing your net principal!

You can run custom scenarios on our Financial Calculator.`,
      actionSuggestions: [
        { label: 'Open Financial Calculator', tab: 'calculator' }
      ]
    };
  }

  if (q.includes('where can i apply') || q.includes('apply') || q.includes('partner') || q.includes('bank') || q.includes('centre')) {
    return {
      reply: `Authorized application routes:
1. **Online Digital Portals**:
   - **JanSamarth Portal** (jansamarth.in) for PMMY Mudra loans.
   - **KVIC PMEGP e-Portal** (kviconline.gov.in) for 15-35% subsidy.
   - **PM Vishwakarma Portal** (pmvishwakarma.gov.in) via Common Service Centres.
2. **Grassroots Physical Facilitation**:
   - Nearest Public Sector Bank (SBI, Canara, PNB, BoB) MSME counter.
   - District Industries Centre (DIC) at your district collectorate.
   - Common Service Centres (CSC / Digital Seva Kendra) in your ward.

Find authorized centers nearest to you in our Partner Locator!`,
      actionSuggestions: [
        { label: 'Find Nearest Partners', tab: 'partners' },
        { label: 'Read Application Guidance', tab: 'guidance' }
      ]
    };
  }

  // Fallback polite government-grade response
  return {
    reply: `Welcome to ArthSetu AI Support. I am your guide for government credit schemes under SIH26092.

You can ask me questions such as:
• "Which scheme may suit my business?"
• "Why am I eligible for PM Vishwakarma or Mudra?"
• "What documents do I need to prepare?"
• "How does the moratorium and EMI work?"
• "Where is the nearest DIC or partner bank branch?"`,
    actionSuggestions: [
      { label: 'Find My Scheme', tab: 'find-scheme' },
      { label: 'Calculate Repayment', tab: 'calculator' },
      { label: 'Locate Partner', tab: 'partners' }
    ]
  };
}
