import { PartnerLocation } from '../types';

export const PARTNER_LOCATIONS: PartnerLocation[] = [
  {
    id: 'partner-1',
    name: 'State Bank of India – Specialized SME & Mudra Hub',
    type: 'Public Sector Bank',
    state: 'Tamil Nadu',
    district: 'Chennai',
    pincode: '600001',
    address: 'No. 22, Rajaji Salai, George Town, Near Collectorate',
    distanceKm: 1.8,
    contactPerson: 'S. Ramanathan (Chief Manager - SME Credit)',
    phone: '+91 44 2522 3410',
    email: 'smehub.chennai@sbi.co.in',
    supportedSchemes: ['pmmy-mudra', 'pm-vishwakarma', 'standup-india', 'pmegp-kvic', 'pm-svanidhi'],
    timings: 'Mon–Fri: 10:00 AM – 4:00 PM | Sat (1st & 3rd): 10:00 AM – 2:00 PM',
    servicesOffered: [
      'Mudra & PMEGP In-principle loan appraisal',
      'PM Vishwakarma Level-3 Banking verification',
      'JanSamarth application biometric processing',
      'Free DPR guidance for loans up to ₹10 Lakh'
    ],
    isDemoData: true
  },
  {
    id: 'partner-2',
    name: 'District Industries Centre (DIC) – MSME Facilitation Desk',
    type: 'District Industries Centre (DIC)',
    state: 'Tamil Nadu',
    district: 'Chennai',
    pincode: '600032',
    address: 'Thiru-Vi-Ka Industrial Estate, Guindy',
    distanceKm: 4.2,
    contactPerson: 'K. Meenakshi Sundaram (General Manager, DIC)',
    phone: '+91 44 2250 1845',
    email: 'gm-dic-chn@tn.gov.in',
    supportedSchemes: ['pmegp-kvic', 'pm-vishwakarma', 'standup-india', 'nsfdc-term-loan'],
    timings: 'Mon–Fri: 9:30 AM – 5:30 PM (Closed 2nd & 4th Sat)',
    servicesOffered: [
      'PMEGP District Task Force screening & forwarding',
      'Free Detailed Project Report (DPR) preparation kiosk',
      'Udyam Registration offline counter & printout',
      'State Capital Subsidy convergence verification'
    ],
    isDemoData: true
  },
  {
    id: 'partner-3',
    name: 'KVIC State Office & Khadi Gramodyog Bhavan',
    type: 'KVIC / KVIB Office',
    state: 'Tamil Nadu',
    district: 'Chennai',
    pincode: '600086',
    address: '326, Avvai Shanmugam Salai, Gopalapuram',
    distanceKm: 3.5,
    contactPerson: 'Arun Kumar Verma (Director, KVIC)',
    phone: '+91 44 2835 1740',
    email: 'kvicchennai@nic.in',
    supportedSchemes: ['pmegp-kvic', 'pm-vishwakarma'],
    timings: 'Mon–Fri: 9:30 AM – 5:00 PM',
    servicesOffered: [
      'PMEGP margin money claim processing',
      'Artisan skill verification & master trainer linkages',
      'Village Industries equipment supplier directory'
    ],
    isDemoData: true
  },
  {
    id: 'partner-4',
    name: 'SIDBI Regional Branch & Stand-Up Mitra Desk',
    type: 'SIDBI Branch',
    state: 'Tamil Nadu',
    district: 'Chennai',
    pincode: '600006',
    address: 'Overseas Towers, 756-L, Anna Salai',
    distanceKm: 3.1,
    contactPerson: 'V. Rajeshwari (DGM - Micro Finance & Standup)',
    phone: '+91 44 2852 4910',
    email: 'chennai_ro@sidbi.in',
    supportedSchemes: ['standup-india', 'pm-svanidhi', 'pmmy-mudra'],
    timings: 'Mon–Fri: 10:00 AM – 5:30 PM',
    servicesOffered: [
      'Stand-Up India handholding & agency matching',
      'SC/ST & Women entrepreneur pre-sanction counseling',
      'PM SVANidhi urban local body grievance desk'
    ],
    isDemoData: true
  },
  {
    id: 'partner-5',
    name: 'Tamil Nadu Adi Dravidar Housing & Dev. Corp (TAHDCO) – District Office',
    type: 'District Industries Centre (DIC)',
    state: 'Tamil Nadu',
    district: 'Chennai',
    pincode: '600007',
    address: 'No. 31, Cenotaph Road, Teynampet',
    distanceKm: 5.0,
    contactPerson: 'M. Anandhi (District Manager)',
    phone: '+91 44 2434 2315',
    email: 'dm.tahdco.chn@tn.gov.in',
    supportedSchemes: ['nsfdc-term-loan', 'nskfdc-swachhta-udyam', 'standup-india'],
    timings: 'Mon–Fri: 10:00 AM – 5:00 PM',
    servicesOffered: [
      'NSFDC concessional 4-6% loan application routing',
      'Safai Karamchari rehabilitation subsidy processing',
      'Special central assistance subsidy verification'
    ],
    isDemoData: true
  },
  {
    id: 'partner-6',
    name: 'Digital Seva Kendra (CSC) – Central Ward 112',
    type: 'CSC / Common Service Centre',
    state: 'Tamil Nadu',
    district: 'Chennai',
    pincode: '600002',
    address: 'Shop 4, Anna Pillai Street, Sowcarpet',
    distanceKm: 0.9,
    contactPerson: 'G. Suresh (VLE Operator)',
    phone: '+91 98402 11983',
    email: 'csc.sowcarpet@cscseva.in',
    supportedSchemes: ['pm-vishwakarma', 'pm-svanidhi', 'pmmy-mudra'],
    timings: 'Mon–Sat: 9:00 AM – 7:30 PM',
    servicesOffered: [
      'Instant PM Vishwakarma biometric enrolment',
      'PM SVANidhi online vendor portal filing',
      'Aadhaar e-KYC document scanning & upload',
      'Free Udyam certificate registration'
    ],
    isDemoData: true
  },
  // Karnataka Partners
  {
    id: 'partner-7',
    name: 'Canara Bank – MSME Sulabh Kendra',
    type: 'Public Sector Bank',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    pincode: '560002',
    address: 'Kempegowda Road Branch, Gandhi Nagar',
    distanceKm: 2.1,
    contactPerson: 'N. Raghavendra (Chief Manager - SME)',
    phone: '+91 80 2226 7714',
    email: 'msmekendra.blr@canarabank.com',
    supportedSchemes: ['pmmy-mudra', 'standup-india', 'pmegp-kvic', 'pm-vishwakarma'],
    timings: 'Mon–Fri: 10:00 AM – 4:30 PM',
    servicesOffered: [
      'Direct Mudra Kishore & Tarun desk',
      'Stand-Up India designated branch counseling',
      'JanSamarth integration counter'
    ],
    isDemoData: true
  },
  {
    id: 'partner-8',
    name: 'Karnataka State Backward Classes Development Corp (D. Devaraj Urs)',
    type: 'District Industries Centre (DIC)',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    pincode: '560001',
    address: 'Millers Tank Bund Road, Vasanth Nagar',
    distanceKm: 3.4,
    contactPerson: 'Smt. Kavitha Gowda (District Officer)',
    phone: '+91 80 2235 6128',
    email: 'durs.blr@karnataka.gov.in',
    supportedSchemes: ['nbcfdc-swarnima', 'pm-vishwakarma'],
    timings: 'Mon–Fri: 10:00 AM – 5:30 PM',
    servicesOffered: [
      'NBCFDC New Swarnima 5% loan applications for women',
      'Caste & Income certificate cross-verification'
    ],
    isDemoData: true
  },
  // Maharashtra Partners
  {
    id: 'partner-9',
    name: 'Bank of Baroda – MSME & Mudra Credit Cell',
    type: 'Public Sector Bank',
    state: 'Maharashtra',
    district: 'Mumbai',
    pincode: '400001',
    address: 'Horniman Circle, Fort, Near Reserve Bank of India',
    distanceKm: 1.4,
    contactPerson: 'P. V. Deshmukh (Lead Bank Officer)',
    phone: '+91 22 2266 1205',
    email: 'leadbank.mumbai@bankofbaroda.co.in',
    supportedSchemes: ['pmmy-mudra', 'pm-svanidhi', 'standup-india', 'pmegp-kvic'],
    timings: 'Mon–Fri: 10:00 AM – 4:00 PM',
    servicesOffered: [
      'Street Vendor SVANidhi fast-track disbursement',
      'Mudra Shishu seed loans with zero processing fee',
      'Women entrepreneur Stand-Up facilitation'
    ],
    isDemoData: true
  },
  {
    id: 'partner-10',
    name: 'Mahatma Phule Backward Class Development Corp',
    type: 'District Industries Centre (DIC)',
    state: 'Maharashtra',
    district: 'Mumbai Suburban',
    pincode: '400051',
    address: 'Bandra-Kurla Complex, Near Social Welfare Directorate',
    distanceKm: 6.2,
    contactPerson: 'Shri Milind Kamble (Regional Manager)',
    phone: '+91 22 2659 4410',
    email: 'mpbcdc.mumbai@maharashtra.gov.in',
    supportedSchemes: ['nsfdc-term-loan', 'nskfdc-swachhta-udyam', 'standup-india'],
    timings: 'Mon–Fri: 9:45 AM – 5:45 PM',
    servicesOffered: [
      'NSFDC Term loan 4%–6% appraisal',
      'Sanitation worker alternative enterprise subsidy desk'
    ],
    isDemoData: true
  },
  // Uttar Pradesh Partners
  {
    id: 'partner-11',
    name: 'Punjab National Bank – Zonal MSME Kendra',
    type: 'Public Sector Bank',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    pincode: '226001',
    address: '1, Ashok Marg, Hazratganj',
    distanceKm: 1.5,
    contactPerson: 'Alok Nath Srivastava (Senior Manager - MSME)',
    phone: '+91 522 228 6412',
    email: 'msme.lko@pnb.co.in',
    supportedSchemes: ['pmmy-mudra', 'pmegp-kvic', 'pm-vishwakarma', 'standup-india'],
    timings: 'Mon–Fri: 10:00 AM – 4:00 PM',
    servicesOffered: [
      'PMEGP Task Force approved case sanctions',
      'Mudra loans for handloom and chikan artisans',
      'PM Vishwakarma Darzi / Tailor credit facilitation'
    ],
    isDemoData: true
  },
  {
    id: 'partner-12',
    name: 'District Industries Centre (DIC) – Lucknow Head Office',
    type: 'District Industries Centre (DIC)',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    pincode: '226004',
    address: 'Kaiserbagh Industrial Campus, Near Collectorate',
    distanceKm: 2.7,
    contactPerson: 'Ram Gopal Yadav (Deputy Commissioner - Industries)',
    phone: '+91 522 262 3190',
    email: 'diclko@up.gov.in',
    supportedSchemes: ['pmegp-kvic', 'pm-vishwakarma', 'nsfdc-term-loan'],
    timings: 'Mon–Fri: 10:00 AM – 5:00 PM',
    servicesOffered: [
      'PMEGP 35% rural subsidy certification',
      'PM Vishwakarma Level-2 screening desk',
      'ODOP (One District One Product) convergence'
    ],
    isDemoData: true
  }
];

export const STATES_AND_DISTRICTS: Record<string, string[]> = {
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Vellore', 'Erode', 'Thanjavur'],
  'Karnataka': ['Bengaluru Urban', 'Bengaluru Rural', 'Mysuru', 'Hubballi-Dharwad', 'Belagavi', 'Mangaluru', 'Kalaburagi', 'Ballari'],
  'Maharashtra': ['Mumbai', 'Mumbai Suburban', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Prayagraj', 'Meerut', 'Gorakhpur', 'Bareilly', 'Aligarh'],
  'Delhi': ['Central Delhi', 'New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam', 'Rangareddy'],
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Tirupati'],
  'Kerala': ['Thiruvananthapuram', 'Ernakulam', 'Kozhikode', 'Thrissur', 'Kollam', 'Palakkad'],
  'West Bengal': ['Kolkata', 'North 24 Parganas', 'South 24 Parganas', 'Howrah', 'Hooghly', 'Darjeeling'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer']
};
