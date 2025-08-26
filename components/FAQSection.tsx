"use client";
import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do I determine the right price to list my property?",
    answer: "Consult a professional appraisal and comparative market analysis to set a competitive price.",
  },
  {
    question: "What are the steps involved in buying a home?",
    answer: "Get pre-approved, search listings, make an offer, conduct inspections, finalize financing, and close.",
  },
  {
    question: "What are the benefits of investing in real estate?",
    answer: "Real estate offers appreciation, passive income, tax advantages, diversification, and leverage opportunities.",
  },
  {
    question: "How can I make my property more attractive to buyers?",
    answer: "Enhance curb appeal, declutter, make repairs, stage the home, and use professional photography.",
  },
  {
    question: "What should I consider when choosing a neighborhood to buy in?",
    answer: "Consider proximity to work, schools, amenities, safety, future development, and the community vibe.",
  }
];

const FAQSection: React.FC = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Questions &
            </h2>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Answers
            </h2>
            <p className="mt-4 text-gray-600 text-sm sm:text-base">
              Don't find the answer? We can help
            </p>
            <div className="my-6 h-px bg-gray-200" />
            <button
              className="inline-flex items-center rounded-lg bg-green-600 text-white px-5 py-3 text-sm sm:text-base font-medium shadow-sm hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              onClick={() => (window.location.href = "mailto:support@example.com")}
            >
              Contact us
            </button>
          </div>

          {/* Right */}
          <div className="lg:col-span-2 divide-y divide-gray-200 rounded-xl ring-1 ring-gray-100 bg-white">
            {faqData.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQItem: React.FC<FAQItem> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-5">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="text-base sm:text-lg font-semibold">{question}</span>
        <span className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700">
          {isOpen ? "-" : "+"}
        </span>
      </button>
      <div
        className={`${isOpen ? 'mt-3' : 'mt-0'} overflow-hidden transition-[max-height,margin] duration-300 ease-in-out`}
        style={{ maxHeight: isOpen ? 500 : 0 }}
      >
        <div className="pl-0 sm:pl-2 border-l-0 sm:border-l-2 border-green-500 bg-gray-50 rounded-lg sm:rounded-none mt-2">
          <p className="p-4 text-sm sm:text-base text-gray-700">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
