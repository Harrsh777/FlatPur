"use client";
import React, { useState } from "react";

const EMICalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(1000000); // Default loan amount
  const [interestRate, setInterestRate] = useState<number>(6.5); // Default interest rate
  const [loanTenure, setLoanTenure] = useState<number>(5); // Default tenure in years

  const calculateEMI = (): number => {
    const monthlyRate = interestRate / 12 / 100;
    const tenureMonths = loanTenure * 12;
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    return Math.round(emi);
  };

  const totalInterest = calculateEMI() * loanTenure * 12 - loanAmount;
  const totalAmount = loanAmount + totalInterest;

  return (
    <div className="p-6 bg-white rounded-md shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Home Loan EMI Calculator</h2>

      {/* Loan Amount Slider */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Loan amount</label>
        <input
          type="range"
          min="100000"
          max="10000000"
          step="10000"
          value={loanAmount}
          onChange={(e) => setLoanAmount(parseInt(e.target.value))}
          className="w-full"
        />
        <p className="mt-2 text-green-600 font-semibold text-right">
          ₹ {loanAmount.toLocaleString()}
        </p>
      </div>

      {/* Interest Rate Slider */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Rate of interest (p.a)</label>
        <input
          type="range"
          min="1"
          max="15"
          step="0.1"
          value={interestRate}
          onChange={(e) => setInterestRate(parseFloat(e.target.value))}
          className="w-full"
        />
        <p className="mt-2 text-green-600 font-semibold text-right">
          {interestRate}%
        </p>
      </div>

      {/* Loan Tenure Slider */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Loan tenure</label>
        <input
          type="range"
          min="1"
          max="30"
          step="1"
          value={loanTenure}
          onChange={(e) => setLoanTenure(parseInt(e.target.value))}
          className="w-full"
        />
        <p className="mt-2 text-green-600 font-semibold text-right">
          {loanTenure} Yr
        </p>
      </div>

      {/* EMI, Principal, and Interest Summary */}
      <div className="text-lg font-semibold">
        <p className="mb-2">Monthly EMI: ₹{calculateEMI().toLocaleString()}</p>
        <p className="mb-2">Principal amount: ₹{loanAmount.toLocaleString()}</p>
        <p className="mb-2">Total interest: ₹{totalInterest.toLocaleString()}</p>
        <p className="mb-2">Total amount: ₹{totalAmount.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default EMICalculator;
