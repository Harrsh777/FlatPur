"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const CommercialSpacesSection: React.FC = () => {
  const router = useRouter(); // Initialize the router for navigation

  const handleBuyClick = () => {
    // Navigate to the Lands category
    router.push("/?category=Lands");
  };

  const handleLeaseClick = () => {
    // Navigate to the Under-Construction category
    router.push("/?category=Under-Constructions");
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>COMMERCIAL SPACES</h2>
      <h3 style={subHeaderStyle}>
        Choose from a wide variety of commercial properties
      </h3>
      <div style={cardsContainerStyle}>
        {/* Card for Buy Commercial Use */}
        <div
          style={{
            ...cardStyle,
            backgroundImage: 'url("/images/Commercial.png")',
          }}
        >
          <div style={overlayStyle}>
            <h4 style={cardTitleStyle}>BUY FOR COMMERCIAL USE</h4>
            <h2 style={cardHeadingStyle}>Buy a Commercial property</h2>
            <p style={cardDescriptionStyle}>
              Explore from Office Spaces, Co-working spaces, Retail Shops, Land,
              Factories, and more
            </p>
            <a onClick={handleBuyClick} style={{ textDecoration: "none" }}>
              <button style={buttonStyle}>
                Explore Buying Commercial
              </button>
            </a>
          </div>
        </div>

        {/* Card for Lease Commercial Use */}
        <div
          style={{
            ...cardStyle,
            backgroundImage: 'url("/images/Commercial2.png")',
          }}
        >
          <div style={overlayStyle}>
            <h4 style={cardTitleStyle}>LEASE FOR COMMERCIAL USE</h4>
            <h2 style={cardHeadingStyle}>Lease a Commercial property</h2>
            <p style={cardDescriptionStyle}>
              Explore from Office Spaces, Co-working spaces, Retail Shops, Land,
              Factories, and more
            </p>
            <a onClick={handleLeaseClick} style={{ textDecoration: "none" }}>
              <button style={buttonStyle}>
                Explore Leasing Commercial
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline styles for the component
const containerStyle: React.CSSProperties = {
  padding: "50px 20px",
  backgroundColor: "#ffffff",
  textAlign: "center",
};

const headerStyle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#4a4a4a",
  marginBottom: "10px",
  letterSpacing: "1.2px",
};

const subHeaderStyle: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#1a1a1a",
  marginBottom: "40px",
};

const cardsContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginTop: "20px",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "#f5f5f5",
  borderRadius: "8px",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
  width: "400px",
  height: "350px",
  textAlign: "left",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
  overflow: "hidden",
};

const overlayStyle: React.CSSProperties = {
  backgroundColor: "rgba(255, 255, 255, 0.85)",
  padding: "30px 20px",
  position: "absolute",
  bottom: "0",
  left: "0",
  right: "0",
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#666666",
  marginBottom: "5px",
  fontWeight: "500",
};

const cardHeadingStyle: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: "700",
  color: "#1a1a1a",
  marginBottom: "15px",
};

const cardDescriptionStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#4a4a4a",
  marginBottom: "20px",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#0070f3",
  color: "#ffffff",
  padding: "12px 25px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
};

export default CommercialSpacesSection;
