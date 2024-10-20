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
    <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
      {/* Left Side */}
      <div style={{ width: "30%", paddingRight: "20px" }}>
        <h2 style={{ fontSize: "42px", fontWeight: "bold", marginBottom: "10px" }}>
          Questions  &
        </h2>
        <h2 style={{ fontSize: "42px", fontWeight: "bold", marginBottom: "10px" }}>
        Answers
        </h2>
        <p style={{ fontSize: "16px", color: "gray", marginBottom: "20px" }}>
          Don't find the answer? We can help
        </p>
        {/* Horizontal Line */}
        <div style={{ height: "2px", backgroundColor: "#ccc", marginBottom: "20px" }}></div>
        {/* Contact Us Button */}
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
          onClick={() => window.location.href = "mailto:support@example.com"} // Replace with your contact URL
        >
          Contact us
        </button>
      </div>

      {/* FAQ Section */}
      <div style={{ width: "60%" }}>
        {faqData.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
};

const FAQItem: React.FC<FAQItem> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ marginBottom: "15px", borderBottom: "1px solid #e0e0e0" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          textAlign: "left",
          fontSize: "18px",
          padding: "10px",
          cursor: "pointer",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {question}
        <span>{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && (
        <div
          style={{
            padding: "10px",
            borderLeft: "3px solid #007bff",
            marginTop: "5px",
            backgroundColor: "#f9f9f9",
          }}
        >
          {answer}
        </div>
      )}
    </div>
  );
};

export default FAQSection;
