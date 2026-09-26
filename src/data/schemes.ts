import { Scheme } from '../types';

export const OFFICIAL_SCHEMES: Scheme[] = [
  {
    id: 'pm-vishwakarma',
    code: 'PM-VISHWAKARMA',
    name: 'PM Vishwakarma Scheme',
    shortName: 'PM Vishwakarma',
    ministry: 'Ministry of Micro, Small and Medium Enterprises & MoSDE',
    nodalAgency: 'SIDBI, Scheduled Commercial Banks & District Implementation Committee',
    tagline: 'End-to-end holistic support for traditional artisans and craftspeople',
    categoryTag: 'Artisan & Craft',
    shortDescription: 'Collateral-free enterprise loan at concessional 5% interest rate, skill training stipend, and ₹15,000 digital e-voucher for modern toolkits.',
    overview: 'Central Sector Scheme dedicated to uplift traditional artisans and craftspeople engaged in 18 notified family crafts (including Tailor/Darzi, Carpenter, Blacksmith, Cobbler, Potter, Basket/Mat Maker, etc.). Provides recognition through PM Vishwakarma Certificate & ID, basic & advanced training with ₹500/day stipend, modern tool voucher, and collateral-free credit in two tranches.',
    minLoanAmount: 10000,
    maxLoanAmount: 300000, // 1st tranche up to 1L, 2nd tranche up to 2L
    assistanceType: 'Collateral-free Enterprise Term Loan',
    subsidyInfo: {
      hasSubsidy: true,
      percentageText: 'Up to 8% Interest Subvention + ₹15k Tool Voucher',
      description: 'Government pays interest subvention up to 8% directly to lending institutions, reducing beneficiary cost to an effective 5% p.a.'
    },
    interestRate: {
      min: 5.0,
      max: 5.0,
      subsidizedRate: 5.0,
      displayText: '5.0% Fixed (Concessional)',
      note: 'MoMSME provides 8% interest subvention to lender; beneficiary pays net 5%.'
    },
    moratoriumPeriod: 'Up to 6 months',
    repaymentTenure: 'Tranche 1: 18 months | Tranche 2: 30 months',
    eligibility: {
      targetAudience: ['Traditional Artisans', 'Craftspeople in 18 trades', 'Darzi / Tailoring', 'Carpentry', 'Pottery', 'Leathercraft'],
      allowedCategories: ['SC', 'ST', 'OBC', 'General', 'Minority', 'Safai Karamchari', 'Other'],
      minAge: 18,
      collateralRequired: false,
      allowedBusinessTypes: ['Traditional Artisan / Craft', 'Manufacturing / Production', 'Services'],
      specialRequirements: [
        'Engaged in one of the 18 notified traditional trades on the date of application',
        'Applicant should not have availed credit under similar credit-based schemes (like PMMY, PMEGP) with overdue balances in past 5 years',
        'Registration is restricted to one member per family (husband, wife, and unmarried children)'
      ]
    },
    benefits: [
      'PM Vishwakarma Certificate and ID Card providing official artisan recognition',
      'Basic skill training (5-7 days) with ₹500 daily stipend',
      '₹15,000 grant via digital e-voucher for modern quality toolkit purchase',
      'Collateral-free credit support: 1st Tranche up to ₹1,00,000 at 5% interest',
      '2nd Tranche up to ₹2,00,000 on prompt repayment of 1st tranche',
      'Incentive for digital transactions: ₹1 per transaction up to 100 transactions/month'
    ],
    keyHighlights: [
      '5% fixed interest rate with MoMSME subvention',
      'No third-party guarantee or hypothecation required',
      'Specialized support for Darzi (Tailors), Carpenters, Cobblers, Weavers'
    ],
    documents: [
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card (Biometric-linked)',
        category: 'Identity',
        description: 'Primary identification proof linked with active mobile number for OTP/Biometric.',
        mandatory: true,
        howToObtain: 'UIDAI official portal or nearest Aadhaar Seva Kendra'
      },
      {
        id: 'doc-trade-proof',
        name: 'Artisan Trade Declaration & CSC Verification',
        category: 'Business / Project',
        description: 'Declaration of practicing traditional trade, authenticated at Gram Panchayat or Urban Local Body level.',
        mandatory: true,
        howToObtain: 'Facilitated via Common Service Centre (CSC) portal during enrolment'
      },
      {
        id: 'doc-bank',
        name: 'Bank Passbook / Account Details',
        category: 'Bank',
        description: 'Active savings account copy with IFSC code for DBT stipend and toolkit incentive.',
        mandatory: true,
        howToObtain: 'From your home bank branch'
      },
      {
        id: 'doc-ration',
        name: 'Ration Card / Family Proof',
        category: 'Address',
        description: 'Verification of family unit to ensure one beneficiary per family norm.',
        mandatory: true,
        howToObtain: 'State Food & Civil Supplies Department'
      }
    ],
    applicationRoute: 'Hybrid (Portal + Branch Verification)',
    applicationSteps: [
      'Step 1: Enrolment at nearest Common Service Centre (CSC) with biometric verification',
      'Step 2: Gram Panchayat / Urban Local Body (ULB) Level-1 verification',
      'Step 3: District Implementation Committee (DIC) Level-2 screening',
      'Step 4: Screening Committee approval & issuance of digital PM Vishwakarma ID',
      'Step 5: Completion of 5-day basic training & credit sanction by partner bank'
    ],
    channelPartners: [
      {
        type: 'Common Service Centres (CSC)',
        description: 'Frontline village & ward level digital enrolment kiosks assisting with document scanning.',
        examples: ['Digital Seva Kendras in every GP and municipal ward']
      },
      {
        type: 'Public Sector & Regional Rural Banks',
        description: 'Authorized lenders sanctioning and disbursing 5% loans.',
        examples: ['State Bank of India', 'Punjab National Bank', 'Canara Bank', 'Prathama UP Gramin Bank']
      },
      {
        type: 'District Industries Centres (DIC)',
        description: 'Nodal verification and grievance redressal authority at the district administration level.',
        examples: ['District Industries Centre in your district collectorate']
      }
    ],
    officialPortalUrl: 'https://pmvishwakarma.gov.in',
    officialGuidelineUrl: 'https://msme.gov.in/pm-vishwakarma-guidelines',
    importantNotes: [
      'Government does not charge any application fee. CSC enrolment fee is borne by the central government.',
      'Loan repayment creates positive credit history under Credit Guarantee Scheme for Micro and Small Enterprises.'
    ],
    lastUpdated: 'February 2026'
  },
  {
    id: 'pmmy-mudra',
    code: 'PMMY-MUDRA',
    name: 'Pradhan Mantri Mudra Yojana (PMMY)',
    shortName: 'PMMY (MUDRA Loan)',
    ministry: 'Ministry of Finance, Department of Financial Services',
    nodalAgency: 'Micro Units Development and Refinance Agency (MUDRA) & Commercial Banks',
    tagline: 'Funding the unfunded micro enterprises with collateral-free credit',
    categoryTag: 'Micro Enterprise',
    shortDescription: 'Collateral-free business loans up to ₹10 Lakhs (and up to ₹20 Lakhs for Tarun Plus) across Shishu, Kishore, and Tarun tiers for small shops, services, and manufacturers.',
    overview: 'Pradhan Mantri Mudra Yojana facilitates seamless institutional credit to non-corporate, non-farm small and micro enterprises. Three categories: Shishu (up to ₹50,000 for early stage ventures), Kishore (₹50,001 to ₹5,00,000 for buying equipment/materials), and Tarun (₹5,00,001 to ₹10,00,000, extended to ₹20L under Budget 2024-25 for established businesses).',
    minLoanAmount: 15000,
    maxLoanAmount: 1000000,
    assistanceType: 'Collateral-free Composite / Term Loan / CC',
    subsidyInfo: {
      hasSubsidy: false,
      description: 'Zero collateral, guaranteed under Credit Guarantee Fund for Micro Units (CGFMU). No margin money required for loans up to ₹50,000.'
    },
    interestRate: {
      min: 8.4,
      max: 11.5,
      displayText: '8.40% – 11.50% p.a.',
      note: 'Linked to Bank MCLR / EBLR without arbitrary risk markups for micro loans.'
    },
    moratoriumPeriod: 'Up to 6 months',
    repaymentTenure: '36 to 60 months (3–5 years)',
    eligibility: {
      targetAudience: ['Micro Entrepreneurs', 'Small Shopkeepers', 'Tailors', 'Repair Workshops', 'Food Vendors', 'Transport Operators', 'Artisans'],
      allowedCategories: ['SC', 'ST', 'OBC', 'General', 'Minority', 'Safai Karamchari', 'Other'],
      minAge: 18,
      maxAge: 65,
      collateralRequired: false,
      allowedBusinessTypes: ['Manufacturing / Production', 'Services', 'Retail / Trading', 'Traditional Artisan / Craft', 'Street Vending / Micro Hawkers', 'Agriculture Allied'],
      specialRequirements: [
        'Non-farm business activity generating income',
        'Applicant should not be a defaulter to any bank or financial institution',
        'Udyam registration beneficial (can be obtained free of charge)'
      ]
    },
    benefits: [
      'No collateral security or third-party guarantee required',
      'MUDRA Card issued for working capital withdrawals from ATMs/PoS',
      'Three progressive stages allowing repeat higher-limit financing',
      'Zero processing fee for Shishu and Kishore loans up to ₹5 Lakh'
    ],
    keyHighlights: [
      'Shishu tier covers seed requirements up to ₹50,000 with minimal paperwork',
      'Kishore tier covers machinery & workspace expansion up to ₹5,00,000',
      'Credit guarantee provided by National Credit Guarantee Trustee Company (NCGTC)'
    ],
    documents: [
      {
        id: 'doc-aadhaar-pmmy',
        name: 'Aadhaar Card / Voter ID / PAN',
        category: 'Identity',
        description: 'Official valid KYC document for identity and date of birth proof.',
        mandatory: true,
        howToObtain: 'UIDAI or Election Commission of India'
      },
      {
        id: 'doc-address-pmmy',
        name: 'Address Proof (Electricity Bill / Ration Card / Rent Deed)',
        category: 'Address',
        description: 'Document evidencing residential and commercial operating address.',
        mandatory: true,
        howToObtain: 'Utility provider / local authority'
      },
      {
        id: 'doc-bank-pmmy',
        name: 'Bank Account Statement (Last 6 Months)',
        category: 'Bank',
        description: 'Statement showing existing financial transactions or savings track record.',
        mandatory: true,
        howToObtain: 'From your home bank branch or internet banking'
      },
      {
        id: 'doc-project-pmmy',
        name: 'Quotations of Machinery / Equipment to be purchased',
        category: 'Business / Project',
        description: 'Vendor estimates or invoice quotations for sewing machines, inventory, or tools.',
        mandatory: true,
        howToObtain: 'Authorized suppliers or machine dealers'
      },
      {
        id: 'doc-udyam',
        name: 'Udyam Registration Certificate',
        category: 'Business / Project',
        description: 'Self-declaration MSME identification certificate.',
        mandatory: false,
        howToObtain: 'udyamregistration.gov.in (free self-registration)'
      }
    ],
    applicationRoute: 'Online Portal',
    applicationSteps: [
      'Step 1: Determine loan requirement tier (Shishu up to ₹50k, Kishore up to ₹5L, Tarun up to ₹10L)',
      'Step 2: Register on JanSamarth Portal or apply directly at any commercial / RRB / SFB bank branch',
      'Step 3: Submit business profile, equipment quotation, and KYC',
      'Step 4: Bank conducts brief unit appraisal or verification',
      'Step 5: Sanction letter issued and MUDRA Card / loan account activated'
    ],
    channelPartners: [
      {
        type: 'Public & Private Sector Banks',
        description: 'All 12 PSBs and leading commercial banks have designated Mudra desks.',
        examples: ['State Bank of India', 'Bank of Baroda', 'Union Bank of India', 'HDFC Bank']
      },
      {
        type: 'Small Finance Banks & Microfinance Institutions',
        description: 'Specialized grassroots lenders with high rural and semi-urban outreach.',
        examples: ['Equitas Small Finance Bank', 'Ujjivan SFB', 'Bandhan Bank', 'NABARD supported RRBs']
      }
    ],
    officialPortalUrl: 'https://www.mudra.org.in',
    officialGuidelineUrl: 'https://jansamarth.in',
    importantNotes: [
      'Do not pay any agent fees. JanSamarth portal and bank branches process applications directly.',
      'Banks cannot demand collateral or fixed deposits as condition for Mudra loans.'
    ],
    lastUpdated: 'January 2026'
  },
  {
    id: 'pmegp-kvic',
    code: 'PMEGP-KVIC',
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    shortName: 'PMEGP Scheme',
    ministry: 'Ministry of Micro, Small and Medium Enterprises',
    nodalAgency: 'Khadi and Village Industries Commission (KVIC), DIC & Coir Board',
    tagline: 'Credit-linked capital subsidy for self-employment generation',
    categoryTag: 'Subsidized Capital',
    shortDescription: 'Generous credit-linked capital subsidy (15% to 35% margin money) for new micro-enterprises in manufacturing (up to ₹50 Lakh) and service sectors (up to ₹20 Lakh).',
    overview: 'Flagship credit-linked subsidy programme to generate self-employment opportunities through establishment of micro-enterprises in non-farm sectors. Provides back-ended capital subsidy of up to 35% of project cost for rural entrepreneurs belonging to SC, ST, OBC, Women, and Minority communities.',
    minLoanAmount: 100000,
    maxLoanAmount: 5000000, // Up to 50L for Manufacturing, 20L for Services
    assistanceType: 'Composite Loan & Back-Ended Capital Subsidy',
    subsidyInfo: {
      hasSubsidy: true,
      percentageText: '15% to 35% Capital Margin Money Subsidy',
      description: 'Special category (SC, ST, OBC, Women, PwD, Minorities): 25% subsidy in Urban areas, 35% subsidy in Rural areas. General category: 15% Urban, 25% Rural.'
    },
    interestRate: {
      min: 8.5,
      max: 10.5,
      displayText: '8.50% – 10.50% p.a.',
      note: 'Normal banking interest applies to term loan; capital subsidy credited into 3-year TDR deposit interest-free.'
    },
    moratoriumPeriod: 'Bank determines based on gestation period (typically 6–12 months)',
    repaymentTenure: '3 to 7 years after moratorium',
    eligibility: {
      targetAudience: ['New Micro Entrepreneurs', 'Rural Artisans', 'Manufacturing Units', 'Service Centres', 'Women Self-Help Groups'],
      allowedCategories: ['SC', 'ST', 'OBC', 'General', 'Minority', 'Safai Karamchari', 'Other'],
      minAge: 18,
      collateralRequired: false, // Up to 10L strictly zero collateral; CGTMSE covers up to 50L
      allowedBusinessTypes: ['Manufacturing / Production', 'Services', 'Traditional Artisan / Craft', 'Agriculture Allied'],
      specialRequirements: [
        'Only applicable for setting up NEW micro enterprises (existing units not eligible)',
        'For projects above ₹10 Lakh in manufacturing and above ₹5 Lakh in services: applicant must have passed at least 8th standard',
        'Beneficiary contribution: 5% for Special Categories (SC/ST/OBC/Women/PwD), 10% for General Category'
      ]
    },
    benefits: [
      'Highest government capital subsidy in India (up to 35% rural / 25% urban)',
      'Low promoter margin money requirement (only 5% of project cost for marginalized groups)',
      'Free Entrepreneurship Development Programme (EDP) training through RSETIs / online portal',
      'Covered under CGTMSE for collateral-free sanction up to ₹50 Lakh'
    ],
    keyHighlights: [
      '35% non-repayable grant for rural marginalized entrepreneurs',
      'Promoter pays only 5% of project cost from own pocket',
      'Administered transparently via online KVIC PMEGP e-Portal'
    ],
    documents: [
      {
        id: 'doc-aadhaar-pmegp',
        name: 'Aadhaar Card and PAN Card',
        category: 'Identity',
        description: 'Mandatory identity documents for KYC and subsidy ledger.',
        mandatory: true,
        howToObtain: 'UIDAI / NSDL'
      },
      {
        id: 'doc-caste-pmegp',
        name: 'Caste / Special Category Certificate',
        category: 'Category / Caste',
        description: 'Competent revenue authority certificate for SC, ST, OBC, Ex-Servicemen, or PwD status to claim 25-35% subsidy.',
        mandatory: true,
        howToObtain: 'Tehsildar / Sub-Divisional Magistrate / District Collectorate'
      },
      {
        id: 'doc-ed-pmegp',
        name: 'Education Certificate (8th Pass or higher)',
        category: 'Business / Project',
        description: 'Required if project cost exceeds ₹10 Lakh in manufacturing or ₹5 Lakh in service sector.',
        mandatory: false,
        howToObtain: 'School leaving certificate or board marksheet'
      },
      {
        id: 'doc-dpr-pmegp',
        name: 'Detailed Project Report (DPR)',
        category: 'Business / Project',
        description: 'Structured proposal describing machinery, working capital, raw material source, and expected revenue.',
        mandatory: true,
        howToObtain: 'ArthSetu DPR template or local DIC / KVIC assistance desk'
      },
      {
        id: 'doc-rural-pmegp',
        name: 'Rural Area Population Certificate',
        category: 'Address',
        description: 'Issued by Gram Panchayat or Block Development Officer to authenticate rural address for 35% subsidy.',
        mandatory: false,
        howToObtain: 'Gram Panchayat Secretary / BDO office'
      }
    ],
    applicationRoute: 'Online Portal',
    applicationSteps: [
      'Step 1: Prepare Detailed Project Report (DPR) with equipment cost estimates',
      'Step 2: Submit online application on KVIC PMEGP e-Portal choosing implementing agency (DIC, KVIC, or KVIB)',
      'Step 3: District Task Force Committee (DTFC) reviews and forwards to designated bank branch',
      'Step 4: Bank sanctions loan under CGTMSE without collateral requirement',
      'Step 5: Complete mandatory EDP training and claim Margin Money subsidy'
    ],
    channelPartners: [
      {
        type: 'District Industries Centre (DIC)',
        description: 'State department nodal point processing district proposals.',
        examples: ['General Manager, DIC in each district headquarter']
      },
      {
        type: 'Khadi & Village Industries Commission (KVIC)',
        description: 'Central nodal agency managing subsidy disbursement and training.',
        examples: ['State / Divisional KVIC offices']
      },
      {
        type: 'All Public Sector & Cooperative Commercial Banks',
        description: 'Authorized lending institutions for credit sanctioning.',
        examples: ['State Bank of India', 'Canara Bank', 'Bank of India']
      }
    ],
    officialPortalUrl: 'https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp',
    officialGuidelineUrl: 'https://msme.gov.in/prime-ministers-employment-generation-programme-pmegp',
    importantNotes: [
      'Capital subsidy is credited into a Term Deposit Receipt (TDR) for 3 years without interest; adjusted upon successful verification.',
      'Unit must not be closed or transferred within 3 years of disbursement.'
    ],
    lastUpdated: 'February 2026'
  },
  {
    id: 'standup-india',
    code: 'STANDUP-INDIA',
    name: 'Stand-Up India Scheme',
    shortName: 'Stand-Up India',
    ministry: 'Ministry of Finance, Department of Financial Services',
    nodalAgency: 'SIDBI, Scheduled Commercial Banks',
    tagline: 'Empowering SC, ST, and Women entrepreneurs for greenfield ventures',
    categoryTag: 'Women / SC / ST',
    shortDescription: 'Composite bank loans from ₹10 Lakh to ₹100 Lakh (₹1 Crore) to at least one SC/ST borrower and at least one Woman borrower per bank branch for greenfield enterprises.',
    overview: 'Stand-Up India is a targeted initiative facilitating bank loans between ₹10 Lakh and ₹1 Crore to Scheduled Caste (SC), Scheduled Tribe (ST), and/or Women entrepreneurs for setting up Greenfield enterprise in manufacturing, services, agri-allied activities, or the trading sector.',
    minLoanAmount: 1000000,
    maxLoanAmount: 10000000,
    assistanceType: 'Composite Loan (Term Loan + Working Capital)',
    subsidyInfo: {
      hasSubsidy: false,
      description: 'Concessional interest rate and credit guarantee under Stand Up India Credit Guarantee Scheme (CGFSI). Borrower margin money is only 15% (can be converged with state subsidies).'
    },
    interestRate: {
      min: 7.9,
      max: 9.8,
      displayText: '7.90% – 9.80% p.a.',
      note: 'Lowest applicable rate of the bank: Base Rate / MCLR + 3% + Tenor Premium.'
    },
    moratoriumPeriod: 'Up to 18 months',
    repaymentTenure: 'Up to 7 years',
    eligibility: {
      targetAudience: ['SC Entrepreneurs', 'ST Entrepreneurs', 'Women Entrepreneurs (any category)'],
      allowedCategories: ['SC', 'ST', 'General', 'OBC', 'Minority', 'Safai Karamchari', 'Other'],
      allowedGenders: ['Female', 'Male', 'Transgender'], // If male, must be SC or ST
      minAge: 18,
      collateralRequired: false, // Covered by Credit Guarantee Scheme for Stand Up India (CGFSI)
      allowedBusinessTypes: ['Manufacturing / Production', 'Services', 'Retail / Trading', 'Agriculture Allied'],
      specialRequirements: [
        'Enterprise must be a Greenfield venture (first-time venture of beneficiary in the manufacturing, services, or trading sector)',
        'In case of non-individual enterprises (partnership/pvt ltd), at least 51% of shareholding and controlling stake must be held by SC/ST and/or Women',
        'Applicant should not be in default to any bank or financial institution'
      ]
    },
    benefits: [
      'Substantial scale financing up to ₹1 Crore for scalable enterprises',
      'Up to 18 months moratorium to establish production and market reach',
      'SIDBI handholding support through designated connect centers and financial literacy',
      'Low margin money requirement (15% of project cost, converged with state schemes)'
    ],
    keyHighlights: [
      'Mandatory quota of at least 2 loans per commercial bank branch',
      'Strictly dedicated to SC, ST, and Women business builders',
      'Handholding support network across 8,000+ branch touchpoints'
    ],
    documents: [
      {
        id: 'doc-aadhaar-su',
        name: 'Aadhaar Card and PAN Card of Promoter(s)',
        category: 'Identity',
        description: 'Proof of identity and PAN for institutional loan assessment.',
        mandatory: true,
        howToObtain: 'UIDAI / NSDL'
      },
      {
        id: 'doc-caste-su',
        name: 'SC / ST Caste Certificate (if applicable)',
        category: 'Category / Caste',
        description: 'Mandatory for male SC/ST applicants; women of any social category qualify.',
        mandatory: false,
        howToObtain: 'Tehsildar / Sub-Divisional Magistrate office'
      },
      {
        id: 'doc-dpr-su',
        name: 'Detailed Project & Feasibility Report',
        category: 'Business / Project',
        description: 'Technical and economic feasibility report detailing capital machinery, cashflow, and break-even.',
        mandatory: true,
        howToObtain: 'Chartered Accountant / DIC handholding consultant'
      },
      {
        id: 'doc-lease-su',
        name: 'Proof of Business Premises / Industrial Lease',
        category: 'Address',
        description: 'Registered lease agreement or ownership documents of factory / office unit.',
        mandatory: true,
        howToObtain: 'Registrar office / State Industrial Development Corporation'
      }
    ],
    applicationRoute: 'Online Portal',
    applicationSteps: [
      'Step 1: Register on Stand-Up Mitra portal (standupmitra.in) as a trainee borrower or ready borrower',
      'Step 2: Choose preferred scheduled commercial bank branch or lead district manager',
      'Step 3: Upload Detailed Project Report and promoter profile',
      'Step 4: Branch manager conducts techno-economic appraisal',
      'Step 5: Loan sanctioned under CGFSI guarantee with up to 18-month moratorium'
    ],
    channelPartners: [
      {
        type: 'SIDBI Branches & Connect Centres',
        description: 'Providing pre-loan handholding, project preparation, and mentorship.',
        examples: ['SIDBI regional offices and DIC linkage cells']
      },
      {
        type: 'Scheduled Commercial Banks',
        description: 'Every commercial bank branch is mandated to support at least 1 SC/ST and 1 Woman borrower.',
        examples: ['State Bank of India', 'Bank of Baroda', 'Canara Bank', 'Punjab National Bank']
      }
    ],
    officialPortalUrl: 'https://www.standupmitra.in',
    officialGuidelineUrl: 'https://financialservices.gov.in/stand-up-india-scheme',
    importantNotes: [
      'Greenfield means the applicant must not have previously established a similar formal corporate unit.',
      'Margin money requirement can be met in convergence with state subsidy schemes.'
    ],
    lastUpdated: 'January 2026'
  },
  {
    id: 'pm-svanidhi',
    code: 'PM-SVANIDHI',
    name: "PM Street Vendor's AtmaNirbhar Nidhi (PM SVANidhi)",
    shortName: 'PM SVANidhi',
    ministry: 'Ministry of Housing and Urban Affairs (MoHUA)',
    nodalAgency: 'SIDBI, Urban Local Bodies (ULBs) & Lending Institutions',
    tagline: 'Special micro-credit facility empowering urban street vendors',
    categoryTag: 'Street Vendor',
    shortDescription: 'Affordable working capital collateral-free loans in tranches of ₹10,000, ₹20,000, and ₹50,000 with 7% interest subsidy and digital cashback up to ₹1,200/year.',
    overview: 'MoHUA scheme providing formal institutional working capital loans to urban street vendors, hawkers, thelawalas, and small service providers whose livelihood suffered during economic disruptions. Offers graduated credit limits upon timely repayments with a lucrative 7% interest subsidy directly credited to beneficiary bank accounts quarterly.',
    minLoanAmount: 5000,
    maxLoanAmount: 50000, // 1st: 10k, 2nd: 20k, 3rd: 50k
    assistanceType: 'Collateral-free Working Capital Micro Credit',
    subsidyInfo: {
      hasSubsidy: true,
      percentageText: '7.0% Interest Subsidy + ₹1,200 Annual Cashback',
      description: 'Interest subsidy of 7% per annum is credited directly into bank account on quarterly basis for timely repayments. Zero penalty on early repayment.'
    },
    interestRate: {
      min: 7.0,
      max: 10.0,
      subsidizedRate: 2.5,
      displayText: 'Effective 2.0% – 3.0% (after 7% subvention)',
      note: 'Normal bank rate is subsidized by 7% by MoHUA; borrower net cost is minimal.'
    },
    moratoriumPeriod: 'Nil (Working capital facility)',
    repaymentTenure: '1st Tranche: 12 months | 2nd: 18 months | 3rd: 36 months',
    eligibility: {
      targetAudience: ['Street Vendors', 'Hawkers', 'Fruit & Vegetable Sellers', 'Tea Stall Owners', 'Pavement Cobblers', 'Artisans on streets'],
      allowedCategories: ['SC', 'ST', 'OBC', 'General', 'Minority', 'Safai Karamchari', 'Other'],
      minAge: 18,
      collateralRequired: false,
      allowedBusinessTypes: ['Street Vending / Micro Hawkers', 'Retail / Trading', 'Services'],
      specialRequirements: [
        'Engaged in street vending in urban, peri-urban, or rural market areas',
        'Possession of Certificate of Vending (CoV) / Identity Card issued by Urban Local Body (ULB) OR Letter of Recommendation (LoR) from Town Vending Committee'
      ]
    },
    benefits: [
      'Accessible starting capital of ₹10,000 without collateral or guarantee',
      'Step-up credit to ₹20,000 and ₹50,000 upon timely repayment',
      '7% annual interest subsidy credited via Direct Benefit Transfer (DBT)',
      'Digital transaction cashback of up to ₹100 per month (₹1,200 annually)',
      'Free enrolment into PM Suraksha Bima Yojana & PM Jeevan Jyoti Bima Yojana under SVANidhi se Samriddhi'
    ],
    keyHighlights: [
      'No collateral, no processing charges, no foreclosure penalty',
      'Fast-track digital sanction via PM SVANidhi Mobile App',
      'Comprehensive family socio-economic profiling under SVANidhi se Samriddhi'
    ],
    documents: [
      {
        id: 'doc-aadhaar-svanidhi',
        name: 'Aadhaar Card',
        category: 'Identity',
        description: 'Mandatory identification linked with active mobile number.',
        mandatory: true,
        howToObtain: 'UIDAI'
      },
      {
        id: 'doc-vending-proof',
        name: 'Certificate of Vending (CoV) / Letter of Recommendation (LoR)',
        category: 'Business / Project',
        description: 'Official street vendor identity card or Town Vending Committee survey recommendation.',
        mandatory: true,
        howToObtain: 'Municipality / Urban Local Body (ULB) office or local TVC'
      },
      {
        id: 'doc-bank-svanidhi',
        name: 'Bank Account Passbook / UPI QR code proof',
        category: 'Bank',
        description: 'Savings account details for disbursement and digital merchant cashback.',
        mandatory: true,
        howToObtain: 'Bank branch or Payment Bank (Paytm/IPPB/Airtel)'
      }
    ],
    applicationRoute: 'Online Portal',
    applicationSteps: [
      'Step 1: Obtain Certificate of Vending or apply for Letter of Recommendation at Municipal Corporation',
      'Step 2: Apply via PM SVANidhi web portal or mobile app with Aadhaar e-KYC',
      'Step 3: Select nearest lending institution (Public Sector Bank, RRB, or MFI)',
      'Step 4: Bank verifies ULB list and approves within 7–10 days',
      'Step 5: Funds disbursed directly to savings account; UPI QR code setup for cashback'
    ],
    channelPartners: [
      {
        type: 'Urban Local Bodies (Municipal Corporations & Municipalities)',
        description: 'Issuing Certificate of Vending and Letters of Recommendation.',
        examples: ['Local Municipal Corporation Ward Offices', 'Town Vending Committees']
      },
      {
        type: 'Scheduled Commercial Banks & Regional Rural Banks',
        description: 'Processing micro loans and enabling digital merchant UPI.',
        examples: ['State Bank of India', 'Indian Bank', 'Punjab National Bank']
      }
    ],
    officialPortalUrl: 'https://pmsvanidhi.mohua.gov.in',
    officialGuidelineUrl: 'https://mohua.gov.in/pmsvanidhi-guidelines',
    importantNotes: [
      'Repaying the first ₹10,000 loan on time automatically unlocks ₹20,000 second tranche.',
      'Promotes cashless digital transactions among street vendors with real cashback.'
    ],
    lastUpdated: 'February 2026'
  },
  {
    id: 'nsfdc-term-loan',
    code: 'NSFDC-LOAN',
    name: 'National Scheduled Castes Finance & Development Corporation (NSFDC)',
    shortName: 'NSFDC Term & Micro Credit',
    ministry: 'Ministry of Social Justice and Empowerment',
    nodalAgency: 'NSFDC & State Channelising Agencies (SCAs) / RRBs',
    tagline: 'Concessional credit for socio-economic empowerment of SC entrepreneurs',
    categoryTag: 'SC/ST Special',
    shortDescription: 'Concessional term loans and micro-credit up to ₹15 Lakhs at very low interest rates (4% to 6% p.a.) for SC entrepreneurs with annual household income criteria.',
    overview: 'Apex corporation under Ministry of Social Justice and Empowerment providing concessional financial assistance to eligible persons from Scheduled Castes living below double poverty line / specified income ceiling. Schemes include Term Loan Scheme, Micro Credit Scheme (up to ₹60,000 at 5% p.a.), and Mahila Samriddhi Yojana for women.',
    minLoanAmount: 25000,
    maxLoanAmount: 1500000,
    assistanceType: 'Concessional Term Loan / Micro Credit',
    subsidyInfo: {
      hasSubsidy: true,
      percentageText: 'Up to ₹10,000 – ₹50,000 Capital Subsidy via SCAs',
      description: 'State Channelising Agencies provide capital subsidy component in convergence with Special Central Assistance to Scheduled Caste Sub Plan (SCA to SCSP).'
    },
    interestRate: {
      min: 4.0,
      max: 6.0,
      displayText: '4.00% – 6.00% p.a.',
      note: 'Highly concessional rate fixed by government: 4% for micro-credit, 6% for general term loan.'
    },
    moratoriumPeriod: '6 months',
    repaymentTenure: 'Up to 5 years (Micro credit: up to 3 years)',
    eligibility: {
      targetAudience: ['Scheduled Caste (SC) Entrepreneurs', 'SC Women Self Help Groups', 'SC Artisans & Small Traders'],
      allowedCategories: ['SC'],
      minAge: 18,
      maxAge: 55,
      maxAnnualIncome: 300000, // Up to ₹3 Lakh annual family income
      collateralRequired: false, // Up to specified limits through SCAs
      allowedBusinessTypes: ['Manufacturing / Production', 'Services', 'Retail / Trading', 'Traditional Artisan / Craft', 'Agriculture Allied'],
      specialRequirements: [
        'Applicant must belong to the Scheduled Caste community (verified by government certificate)',
        'Annual family income should be within the prescribed limits (rural/urban ceiling up to ₹3,00,000 p.a.)'
      ]
    },
    benefits: [
      'Extremely low interest rate (4% to 6% per annum) protected against market fluctuations',
      'Special focus on women entrepreneurs under Mahila Samriddhi Yojana',
      'Convergence with state-level capital subsidies',
      'Skill upgradation training sponsored by NSFDC'
    ],
    keyHighlights: [
      'Subsidized 4-6% interest rate designed for marginalized SC families',
      'Mahila Samriddhi Yojana provides micro-finance up to ₹1,40,000 at 4% for women',
      'Implemented through dedicated State Channelising Agencies (SCAs)'
    ],
    documents: [
      {
        id: 'doc-aadhaar-nsfdc',
        name: 'Aadhaar Card and Voter Card',
        category: 'Identity',
        description: 'Proof of identity and resident status.',
        mandatory: true,
        howToObtain: 'UIDAI'
      },
      {
        id: 'doc-caste-nsfdc',
        name: 'SC Caste Certificate issued by Competent Authority',
        category: 'Category / Caste',
        description: 'Valid revenue authority caste certificate validating Scheduled Caste status.',
        mandatory: true,
        howToObtain: 'Tehsildar / District Revenue Office'
      },
      {
        id: 'doc-income-nsfdc',
        name: 'Income Certificate (Family Income < ₹3,00,000)',
        category: 'Income',
        description: 'Issued by Revenue Authority verifying annual household income.',
        mandatory: true,
        howToObtain: 'Tehsildar / Village Administrative Officer (VAO)'
      },
      {
        id: 'doc-project-nsfdc',
        name: 'Simple Business Scheme Profile & Cost Estimate',
        category: 'Business / Project',
        description: '1-2 page outline of the proposed trade, equipment cost, and expected earnings.',
        mandatory: true,
        howToObtain: 'State Channelising Agency desk or ArthSetu template'
      }
    ],
    applicationRoute: 'Bank Branch / Nodal Office',
    applicationSteps: [
      'Step 1: Obtain application form from State Channelising Agency (SCA) district office or RRB',
      'Step 2: Attach SC caste certificate, income certificate, and business quotation',
      'Step 3: Screening by District Selection Committee',
      'Step 4: Nodal recommendation forwarded to lending channel partner bank',
      'Step 5: Concessional disbursement at 4%–6% per annum'
    ],
    channelPartners: [
      {
        type: 'State Scheduled Castes Development Corporations (SCAs)',
        description: 'State government corporations executing NSFDC schemes at district level.',
        examples: ['TAHDCO in Tamil Nadu', 'Mahatma Phule BC Development Corp in Maharashtra', 'UP SC Finance Corp']
      },
      {
        type: 'Public Sector Banks & Regional Rural Banks',
        description: 'Channelising lenders disbursing credit under NSFDC credit line.',
        examples: ['Punjab National Bank', 'Central Bank of India', 'State Regional Rural Banks']
      }
    ],
    officialPortalUrl: 'https://nsfdc.nic.in',
    officialGuidelineUrl: 'https://socialjustice.gov.in',
    importantNotes: [
      'Beneficiaries who have already repaid loans can apply for expansion term loans.',
      'Training stipends are paid during NSFDC vocational upskilling programs.'
    ],
    lastUpdated: 'February 2026'
  },
  {
    id: 'nbcfdc-swarnima',
    code: 'NBCFDC-SWARNIMA',
    name: 'NBCFDC New Swarnima Scheme for Women & OBCs',
    shortName: 'NBCFDC New Swarnima',
    ministry: 'Ministry of Social Justice and Empowerment',
    nodalAgency: 'National Backward Classes Finance & Development Corporation (NBCFDC)',
    tagline: 'Social and financial empowerment for backward classes and women',
    categoryTag: 'Women / SC / ST',
    shortDescription: 'Concessional financial assistance up to ₹2,00,000 at 5% per annum for women belonging to Other Backward Classes (OBC) living below double poverty line.',
    overview: 'Special scheme by NBCFDC to inculcate the spirit of self-reliance among women entrepreneurs belonging to Backward Classes. Loan amount up to ₹2,00,000 is provided at a concessional interest rate of only 5% per annum without complex collateral demands.',
    minLoanAmount: 20000,
    maxLoanAmount: 200000,
    assistanceType: 'Term Loan / Micro Finance',
    subsidyInfo: {
      hasSubsidy: false,
      description: 'Concessional interest rate of 5% p.a. provides indirect financial relief compared to commercial rates.'
    },
    interestRate: {
      min: 5.0,
      max: 5.0,
      displayText: '5.00% p.a. Fixed',
      note: 'NBCFDC lends to SCA at 2%; SCA lends to beneficiary woman entrepreneur at 5%.'
    },
    moratoriumPeriod: '6 months',
    repaymentTenure: 'Up to 5 years (Quarterly installments)',
    eligibility: {
      targetAudience: ['OBC Women Entrepreneurs', 'Rural Women Artisans', 'Small Dairy / Tailoring / Boutique Owners'],
      allowedCategories: ['OBC'],
      allowedGenders: ['Female'],
      minAge: 18,
      maxAge: 55,
      maxAnnualIncome: 300000,
      collateralRequired: false,
      allowedBusinessTypes: ['Manufacturing / Production', 'Services', 'Retail / Trading', 'Traditional Artisan / Craft', 'Agriculture Allied'],
      specialRequirements: [
        'Applicant must be a woman belonging to Other Backward Classes (OBC)',
        'Annual family income must be less than ₹3,00,000'
      ]
    },
    benefits: [
      'Affordable 5% per annum fixed interest rate for women',
      'No complicated mortgage or commercial collateral required for micro limits',
      'Flexible quarterly repayment installments matching business cash flows',
      'Support for traditional, rural, and home-based micro businesses'
    ],
    keyHighlights: [
      '100% targeted at OBC women micro-entrepreneurs',
      '5% fixed concessional rate with 6-month moratorium',
      'Direct convergence with State Backward Classes Development Corporations'
    ],
    documents: [
      {
        id: 'doc-aadhaar-nbcfdc',
        name: 'Aadhaar Card of Applicant',
        category: 'Identity',
        description: 'Identity proof.',
        mandatory: true,
        howToObtain: 'UIDAI'
      },
      {
        id: 'doc-obc-caste',
        name: 'OBC Caste Certificate (Non-Creamy Layer)',
        category: 'Category / Caste',
        description: 'Issued by Revenue Authority verifying OBC category status.',
        mandatory: true,
        howToObtain: 'Tehsildar office / Sub-Divisional Officer'
      },
      {
        id: 'doc-obc-income',
        name: 'Annual Household Income Certificate (< ₹3,00,000)',
        category: 'Income',
        description: 'Verifies annual household income below threshold.',
        mandatory: true,
        howToObtain: 'Revenue Inspector / Tehsildar'
      },
      {
        id: 'doc-bank-nbcfdc',
        name: 'Bank Account Passbook Copy',
        category: 'Bank',
        description: 'Account copy in the name of the woman applicant.',
        mandatory: true,
        howToObtain: 'Bank branch'
      }
    ],
    applicationRoute: 'Bank Branch / Nodal Office',
    applicationSteps: [
      'Step 1: Contact district office of State Channelising Agency (SCA) for Backward Classes',
      'Step 2: Submit filled New Swarnima application with OBC and income certificates',
      'Step 3: Verification by SCA field officer',
      'Step 4: Sanction and fund release through partner bank at 5% rate',
      'Step 5: Commencement of micro enterprise with quarterly repayments'
    ],
    channelPartners: [
      {
        type: 'State Backward Classes Development Corporations (SCAs)',
        description: 'Channelising partner in each state managing NBCFDC credit programs.',
        examples: ['State OBC Welfare Corporations in all States and UTs']
      },
      {
        type: 'Public Sector Banks & Regional Rural Banks',
        description: 'Lending channel partners executing institutional micro financing.',
        examples: ['Canara Bank', 'Indian Overseas Bank', 'Baroda UP Bank']
      }
    ],
    officialPortalUrl: 'https://nbcfdc.gov.in',
    officialGuidelineUrl: 'https://nbcfdc.gov.in/schemes',
    importantNotes: [
      'Loans are distributed on first-come-first-served basis according to state target allocations.',
      'Prompt repayment enables eligibility for second-stage business scaling loans up to ₹5,00,000.'
    ],
    lastUpdated: 'February 2026'
  },
  {
    id: 'nskfdc-swachhta-udyam',
    code: 'NSKFDC-SUY',
    name: 'National Safai Karamcharis Finance & Development Corporation (NSKFDC)',
    shortName: 'NSKFDC Udyam Scheme',
    ministry: 'Ministry of Social Justice and Empowerment',
    nodalAgency: 'NSKFDC & Channelising Agencies',
    tagline: 'Liberating and rehabilitating sanitation workers with dignity',
    categoryTag: 'SC/ST Special',
    shortDescription: 'Concessional loans up to ₹5 Lakh at 4% to 6% p.a. for Safai Karamcharis, manual scavengers, and their dependents for sustainable alternative livelihood enterprises.',
    overview: 'Apex body providing concessional financial assistance to Safai Karamcharis, manual scavengers, waste pickers, and their dependents for economic rehabilitation and sustainable self-employment in alternative viable commercial activities (small transport, trading, services, equipment).',
    minLoanAmount: 25000,
    maxLoanAmount: 500000,
    assistanceType: 'Concessional Term Loan / Capital Subsidy',
    subsidyInfo: {
      hasSubsidy: true,
      percentageText: 'Capital Subsidy up to ₹40,000 for identified workers',
      description: 'Identified manual scavengers and sanitation workers are eligible for one-time cash assistance and capital subsidy on loans.'
    },
    interestRate: {
      min: 4.0,
      max: 6.0,
      displayText: '4.00% – 6.00% p.a.',
      note: 'Concessional 4% for women beneficiaries, 5-6% for others.'
    },
    moratoriumPeriod: '6 months',
    repaymentTenure: 'Up to 5 years',
    eligibility: {
      targetAudience: ['Safai Karamcharis', 'Sanitation Workers', 'Waste Pickers', 'Dependents of sanitation workers'],
      allowedCategories: ['Safai Karamchari', 'SC', 'ST', 'OBC', 'General'],
      minAge: 18,
      maxAge: 60,
      collateralRequired: false,
      allowedBusinessTypes: ['Manufacturing / Production', 'Services', 'Retail / Trading', 'Traditional Artisan / Craft'],
      specialRequirements: [
        'Applicant or family member must be a Safai Karamchari / Sanitation worker verified by local body / municipal authority certificate'
      ]
    },
    benefits: [
      'Very low interest rate (4% for women, 5-6% for men)',
      'Direct alternative livelihood financing with dignity',
      'Capital subsidy support in convergence with rehabilitation acts',
      'Zero collateral requirement for loans up to ₹5 Lakh'
    ],
    keyHighlights: [
      'Specific statutory empowerment for sanitation workers and dependents',
      '4% concessional interest rate for women beneficiaries',
      'Comprehensive rehabilitation with skill training stipend'
    ],
    documents: [
      {
        id: 'doc-aadhaar-nskfdc',
        name: 'Aadhaar Card',
        category: 'Identity',
        description: 'Identity proof.',
        mandatory: true,
        howToObtain: 'UIDAI'
      },
      {
        id: 'doc-safai-cert',
        name: 'Safai Karamchari / Sanitation Worker Certificate',
        category: 'Category / Caste',
        description: 'Certificate issued by Municipality, Municipal Corporation, or Gram Panchayat confirming sanitation work engagement.',
        mandatory: true,
        howToObtain: 'Municipal Health Officer / Panchayat Executive Officer'
      },
      {
        id: 'doc-bank-nskfdc',
        name: 'Bank Passbook Copy',
        category: 'Bank',
        description: 'Active savings account details.',
        mandatory: true,
        howToObtain: 'Home bank branch'
      }
    ],
    applicationRoute: 'Bank Branch / Nodal Office',
    applicationSteps: [
      'Step 1: Obtain sanitation worker confirmation certificate from local municipality',
      'Step 2: Fill NSKFDC application through State Channelising Agency or designated RRB',
      'Step 3: Verification of proposed alternative business',
      'Step 4: Sanction and disbursement at 4%–6% concessional interest',
      'Step 5: Regular repayments with 6-month initial moratorium'
    ],
    channelPartners: [
      {
        type: 'State Scheduled Castes & Safai Karamchari Development Corporations',
        description: 'State level execution agencies in district headquarters.',
        examples: ['State SC & Safai Karamchari Development Corporations']
      },
      {
        type: 'Regional Rural Banks & Public Sector Banks',
        description: 'Grassroots financial institutions operating NSKFDC credit lines.',
        examples: ['State Bank of India', 'Aryavart Bank', 'Baroda Rajasthan Kshetriya Gramin Bank']
      }
    ],
    officialPortalUrl: 'https://nskfdc.nic.in',
    officialGuidelineUrl: 'https://socialjustice.gov.in',
    importantNotes: [
      'No income certificate ceiling required for sanitation workers seeking alternative dignified livelihoods.',
      'Training stipends provided during transition courses.'
    ],
    lastUpdated: 'February 2026'
  }
];
