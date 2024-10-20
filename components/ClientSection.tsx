"use client";
import React from "react";
import { FaUserTie, FaHeadset, FaDollarSign, FaBuilding } from "react-icons/fa"; // Example icons

const ClientSection: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "3cm 2cm",
        backgroundColor: "#f9f9f9", // Optional background to match the look
      }}
    >
      {/* Left Side */}
      <div style={{ width: "40%", paddingRight: "40px" }}>
        <h2
          style={{
            fontSize: "48px", // Increased font size
            fontWeight: "bold",
            marginBottom: "10px",
            lineHeight: "1.2",
          }}
        >
          15k+ clients base & growing.
        </h2>
        <p
          style={{
            fontSize: "20px", // Increased font size
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Your success is our mission. As business advisors, we offer expert
          guidance, unlocking your potential for growth and profitability.
        </p>
        {/* Request a Callback Button */}
        <button
          style={{
            padding: "12px 30px",
            backgroundColor: "Green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "18px", // Increased button font size
          }}
          onClick={() => alert("Callback request sent! We will contact you soon.")} // Simulating a working button
        >
          Request a Callback →
        </button>
      </div>

      {/* Right Side (Features) */}
      <div
        style={{
          width: "60%",
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          alignItems: "flex-start",
        }}
      >
        <FeatureBox
          icon={<FaUserTie size={32} color="black" />}
          title="Expert Advisor"
          description="Eli este cillum dolore eu fugiat nulla pariatur"
        />
        <FeatureBox
          icon={<FaHeadset size={32} color="black" />}
          title="Effective Support"
          description="Quis nostrud exerci ullamco ea nisi ut aliquip com dolor"
        />
        <FeatureBox
          icon={<FaDollarSign size={32} color="black" />}
          title="Low Fees"
          description="Cupidatat non proident, sunt in culpa qui officia deserunt"
        />
        <FeatureBox
          icon={<FaBuilding size={32} color="black" />}
          title="Loan Facility"
          description="Quis nostrud exerci ullamco ea nisi ut aliquip com dolor"
        />
      </div>
    </div>
  );
};

interface FeatureBoxProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({ icon, title, description }) => {
  return (
    <div style={{ width: "45%" }}>
      <div style={{ marginBottom: "10px" }}>{icon}</div> {/* Icon above the title */}
      <h3
        style={{
          fontSize: "22px", // Slightly increased the title font size
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: "18px", color: "#666" }}>{description}</p>
    </div>
  );
};

export default ClientSection;
