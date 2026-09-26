import { UserProfile, Scheme, SchemeMatchResult } from '../types';
import { OFFICIAL_SCHEMES } from '../data/schemes';
import { formatINR } from './financialCalculator';

export function evaluateSchemeEligibility(
  scheme: Scheme,
  profile: UserProfile
): SchemeMatchResult {
  const matchingCriteria: string[] = [];
  const verificationRequired: string[] = [];
  const missingInformation: string[] = [];

  let score = 50; // base potential match for exploration

  // 1. Amount Check
  if (profile.requiredLoanAmount >= scheme.minLoanAmount && profile.requiredLoanAmount <= scheme.maxLoanAmount) {
    score += 25;
    matchingCriteria.push(
      `Required loan amount (${formatINR(profile.requiredLoanAmount)}) is within the eligible range (${formatINR(scheme.minLoanAmount)} to ${formatINR(scheme.maxLoanAmount)}).`
    );
  } else if (profile.requiredLoanAmount > scheme.maxLoanAmount) {
    score -= 20;
    verificationRequired.push(
      `Requested amount (${formatINR(profile.requiredLoanAmount)}) exceeds this scheme's upper ceiling of ${formatINR(scheme.maxLoanAmount)}. Loan amount would need to be capped at ${formatINR(scheme.maxLoanAmount)}.`
    );
  } else if (profile.requiredLoanAmount < scheme.minLoanAmount) {
    score -= 10;
    verificationRequired.push(
      `Requested amount (${formatINR(profile.requiredLoanAmount)}) is below the standard minimum ticket size of ${formatINR(scheme.minLoanAmount)}.`
    );
  }

  // 2. Business Type & Trade Activity
  const tradeLower = (profile.tradeOrActivity + ' ' + profile.businessDescription).toLowerCase();

  if (scheme.id === 'pm-vishwakarma') {
    const isCraftOrTailor =
      tradeLower.includes('tailor') ||
      tradeLower.includes('darzi') ||
      tradeLower.includes('stitching') ||
      tradeLower.includes('garment') ||
      tradeLower.includes('carpent') ||
      tradeLower.includes('blacksmith') ||
      tradeLower.includes('potter') ||
      tradeLower.includes('artisan') ||
      tradeLower.includes('craft') ||
      tradeLower.includes('cobbler') ||
      tradeLower.includes('barber') ||
      tradeLower.includes('sculpt') ||
      tradeLower.includes('weaver');

    if (isCraftOrTailor) {
      score += 25;
      matchingCriteria.push(
        `Activity "${profile.tradeOrActivity || 'Craft/Tailoring'}" matches one of the 18 notified traditional artisan crafts eligible for 5% concessional credit & ₹15,000 tool voucher.`
      );
    } else {
      score -= 25;
      verificationRequired.push(
        `PM Vishwakarma is strictly restricted to 18 traditional family trades. Your trade ("${profile.tradeOrActivity || 'Unspecified'}") must be verified against notified artisan categories.`
      );
    }
  } else if (scheme.id === 'pm-svanidhi') {
    const isStreetVendor =
      tradeLower.includes('vendor') ||
      tradeLower.includes('hawker') ||
      tradeLower.includes('street') ||
      tradeLower.includes('stall') ||
      tradeLower.includes('cart') ||
      tradeLower.includes('thela') ||
      tradeLower.includes('food stall') ||
      tradeLower.includes('tea stall') ||
      profile.businessType === 'Street Vending / Micro Hawkers';

    if (isStreetVendor) {
      score += 25;
      matchingCriteria.push(
        `Urban / street vending nature of the venture directly matches PM SVANidhi micro-credit priorities.`
      );
    } else {
      score -= 20;
      verificationRequired.push(
        `Requires possession of Certificate of Vending (CoV) or Letter of Recommendation from local Urban Local Body.`
      );
    }
  } else if (scheme.id === 'pmegp-kvic') {
    if (profile.businessStage === 'New Idea / Startup') {
      score += 20;
      matchingCriteria.push(
        `Applicant is launching a NEW enterprise, which is a mandatory requirement under PMEGP guidelines.`
      );
    } else {
      score -= 20;
      verificationRequired.push(
        `PMEGP strictly finances new micro enterprises. Existing units are not eligible for first-phase capital subsidy.`
      );
    }

    if (profile.locationType === 'Rural') {
      score += 15;
      matchingCriteria.push(
        `Rural location qualifies the applicant for the maximum 35% margin money capital subsidy.`
      );
    } else {
      matchingCriteria.push(
        `Urban location qualifies the applicant for 25% special category / 15% general category margin money subsidy.`
      );
    }
  } else if (scheme.id === 'standup-india') {
    const isWoman = profile.gender === 'Female';
    const isScSt = profile.socialCategory === 'SC' || profile.socialCategory === 'ST';

    if (isWoman || isScSt) {
      score += 25;
      matchingCriteria.push(
        `Applicant profile (${isScSt ? profile.socialCategory + ' Category' : ''}${isWoman && isScSt ? ' & ' : ''}${isWoman ? 'Woman Entrepreneur' : ''}) meets mandatory Stand-Up India borrower criteria.`
      );
    } else {
      score -= 40;
      verificationRequired.push(
        `Stand-Up India is exclusively earmarked for Scheduled Caste (SC), Scheduled Tribe (ST), and/or Women entrepreneurs. Non-SC/ST male applicants do not meet individual eligibility.`
      );
    }

    if (profile.businessStage === 'New Idea / Startup') {
      matchingCriteria.push(`Greenfield first-time enterprise structure fulfills scheme stipulations.`);
    }
  } else if (scheme.id === 'nsfdc-term-loan') {
    if (profile.socialCategory === 'SC') {
      score += 30;
      matchingCriteria.push(
        `Scheduled Caste (SC) category background satisfies NSFDC statutory mandate for 4%–6% concessional credit.`
      );
    } else {
      score -= 50;
      verificationRequired.push(
        `NSFDC assistance is statutorily restricted to individuals belonging to Scheduled Castes (SC).`
      );
    }

    if (profile.annualHouseholdIncome <= 300000) {
      score += 10;
      matchingCriteria.push(
        `Annual household income (${formatINR(profile.annualHouseholdIncome)}) is within the ₹3,00,000 ceiling.`
      );
    } else {
      verificationRequired.push(
        `Annual family income exceeds typical NSFDC income ceiling. Requires special authorization from State Channelising Agency.`
      );
    }
  } else if (scheme.id === 'nbcfdc-swarnima') {
    const isObc = profile.socialCategory === 'OBC';
    const isWoman = profile.gender === 'Female';

    if (isObc && isWoman) {
      score += 35;
      matchingCriteria.push(
        `OBC Category Woman Entrepreneur directly satisfies New Swarnima 5% interest rate criteria.`
      );
    } else if (isObc && !isWoman) {
      score += 10;
      matchingCriteria.push(`OBC applicant is eligible under General NBCFDC term loan schemes (not New Swarnima women-specific).`);
    } else {
      score -= 40;
      verificationRequired.push(`NBCFDC is dedicated specifically to Other Backward Classes (OBC) beneficiaries.`);
    }
  } else if (scheme.id === 'nskfdc-swachhta-udyam') {
    if (profile.socialCategory === 'Safai Karamchari') {
      score += 35;
      matchingCriteria.push(
        `Directly aligns with NSKFDC mandate for dignified economic rehabilitation of sanitation workers.`
      );
    } else {
      score -= 30;
      verificationRequired.push(
        `Requires local authority certificate confirming Safai Karamchari / sanitation worker dependent status.`
      );
    }
  } else if (scheme.id === 'pmmy-mudra') {
    // PMMY is broad and universal for non-corporate micro enterprises
    score += 25;
    matchingCriteria.push(
      `Non-corporate micro business profile is eligible for collateral-free credit under MUDRA credit guarantee.`
    );
    if (profile.requiredLoanAmount <= 50000) {
      matchingCriteria.push(`Fits 'Shishu' category (up to ₹50,000) with zero processing fees and instant appraisal.`);
    } else if (profile.requiredLoanAmount <= 500000) {
      matchingCriteria.push(`Fits 'Kishore' category (₹50,001 to ₹5,00,000) for machinery and inventory purchase.`);
    } else {
      matchingCriteria.push(`Fits 'Tarun' category (₹5,00,001 to ₹10,00,000) for business expansion.`);
    }
  }

  // 3. Age Check
  if (profile.age >= (scheme.eligibility.minAge || 18)) {
    matchingCriteria.push(`Applicant age (${profile.age} years) satisfies the minimum age threshold (18 years).`);
  } else {
    score -= 30;
    verificationRequired.push(`Applicant is below the minimum legal adult age of 18 years.`);
  }

  // 4. Missing Information Audit
  if (!profile.hasUdyamRegistration) {
    missingInformation.push(
      `Udyam Registration Certificate: Recommended for MSME status recognition (can be generated free on udyamregistration.gov.in).`
    );
  }
  if (!profile.tradeOrActivity) {
    missingInformation.push(
      `Specific trade or machinery description: Needed to prepare equipment quotation for lender appraisal.`
    );
  }
  if (profile.annualHouseholdIncome === 0) {
    missingInformation.push(
      `Annual Household Income Certificate: Required to verify concessional category ceilings where applicable.`
    );
  }

  // Common verification points for any government scheme
  verificationRequired.push(
    `Valid biometric Aadhaar authentication linked with active mobile number for DBT/JanSamarth processing.`
  );
  verificationRequired.push(
    `Verification that the applicant has no active willful default records in past institutional bank loans.`
  );

  // Normalize score between 15% and 98% (Never 100% since official sanction requires bank verification)
  const finalScore = Math.min(96, Math.max(20, score));

  let matchLevel: 'High Profile Match' | 'Moderate Profile Match' | 'Specialized Category Match' = 'Moderate Profile Match';
  if (finalScore >= 80) {
    matchLevel = 'High Profile Match';
  } else if (
    (scheme.id === 'pm-vishwakarma' && (tradeLower.includes('tailor') || tradeLower.includes('darzi'))) ||
    (scheme.id === 'standup-india' && (profile.gender === 'Female' || profile.socialCategory === 'SC' || profile.socialCategory === 'ST')) ||
    (scheme.id === 'pm-svanidhi' && profile.businessType === 'Street Vending / Micro Hawkers')
  ) {
    matchLevel = 'Specialized Category Match';
  }

  let estimatedSubsidyAmount: number | undefined;
  if (scheme.id === 'pmegp-kvic') {
    const rate = profile.locationType === 'Rural' ? 0.35 : 0.25;
    estimatedSubsidyAmount = Math.round(profile.requiredLoanAmount * rate);
  }

  return {
    scheme,
    matchScore: finalScore,
    matchLevel,
    matchingCriteria,
    verificationRequired,
    missingInformation,
    estimatedSubsidyAmount
  };
}

export function matchSchemes(profile: UserProfile): SchemeMatchResult[] {
  const results = OFFICIAL_SCHEMES.map(scheme => evaluateSchemeEligibility(scheme, profile));
  // Sort descending by match score
  results.sort((a, b) => b.matchScore - a.matchScore);
  return results;
}
