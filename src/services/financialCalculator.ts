import { FinancialCalculationResult, AmortizationMonth } from '../types';

export function calculateRepayment(
  loanAmount: number,
  annualInterestRate: number,
  tenureYears: number,
  moratoriumMonths: number = 0
): FinancialCalculationResult {
  const principal = Math.max(1000, loanAmount);
  const annualRate = Math.max(0.1, annualInterestRate);
  const monthlyRate = annualRate / 12 / 100;
  const totalMonths = Math.max(6, Math.round(tenureYears * 12));
  const effectiveMoratorium = Math.min(moratoriumMonths, Math.floor(totalMonths / 2));
  const repaymentMonths = Math.max(1, totalMonths - effectiveMoratorium);

  // Interest accumulated during moratorium (Simple interest standard for micro/MSME loans)
  const interestDuringMoratorium = principal * (annualRate / 100) * (effectiveMoratorium / 12);

  // In government concessional schemes, during moratorium simple interest is serviced or added to principal
  // Standard EMI calculation on Principal over repaymentMonths
  let monthlyEmi = 0;
  if (monthlyRate === 0) {
    monthlyEmi = principal / repaymentMonths;
  } else {
    monthlyEmi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, repaymentMonths)) /
      (Math.pow(1 + monthlyRate, repaymentMonths) - 1);
  }

  // Generate schedule (sample first 12 months + summaries)
  const schedule: AmortizationMonth[] = [];
  let currentBalance = principal;
  let totalInterest = interestDuringMoratorium;

  // Moratorium period
  for (let m = 1; m <= effectiveMoratorium; m++) {
    const monthlyMoratInt = (principal * (annualRate / 100)) / 12;
    schedule.push({
      month: m,
      emi: 0,
      principal: 0,
      interest: Math.round(monthlyMoratInt),
      remainingBalance: Math.round(currentBalance),
      isMoratorium: true
    });
  }

  // Active repayment period
  for (let m = 1; m <= repaymentMonths; m++) {
    const interestPart = currentBalance * monthlyRate;
    const principalPart = monthlyEmi - interestPart;
    currentBalance = Math.max(0, currentBalance - principalPart);
    totalInterest += interestPart;

    schedule.push({
      month: effectiveMoratorium + m,
      emi: Math.round(monthlyEmi),
      principal: Math.round(principalPart),
      interest: Math.round(interestPart),
      remainingBalance: Math.round(currentBalance),
      isMoratorium: false
    });
  }

  const totalRepayment = principal + totalInterest;

  return {
    loanAmount: Math.round(principal),
    annualInterestRate: parseFloat(annualRate.toFixed(2)),
    tenureMonths: totalMonths,
    moratoriumMonths: effectiveMoratorium,
    monthlyEmi: Math.round(monthlyEmi),
    totalInterest: Math.round(totalInterest),
    totalRepayment: Math.round(totalRepayment),
    interestDuringMoratorium: Math.round(interestDuringMoratorium),
    effectiveCostPerMonth: Math.round(totalRepayment / totalMonths),
    schedule
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatNumberINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(amount);
}
