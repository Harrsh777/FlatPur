"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter

const PropertySection = () => {
  const router = useRouter(); // Initialize the router

  const handlePostPropertyClick = () => {
    router.push("/contact"); // Redirect to the contact page
  };

  return (
    <section
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start", // Align items to the start
        padding: "40px",
        backgroundColor: "#faf4e9",
        borderRadius: "10px", // Add left margin for the section
      }}
    >
      <div style={{ flex: 1, paddingRight: "0px" }}>
        <h3
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            color: "#888",
            marginBottom: "10px",
          }}
        >
          SELL OR RENT YOUR PROPERTY
        </h3>
        <h1
          style={{
            fontSize: "34px",
            fontWeight: "bold",
            color: "#12264f",
            marginBottom: "20px",
          }}
        >
          Register to post your property for{" "}
          <span
            style={{
              color: "#00a855",
              fontWeight: "bold",
              padding: "2px 6px",
              backgroundColor: "#d5f5e3",
              borderRadius: "5px",
            }}
          >
            FREE
          </span>
        </h1>
        <p style={{ fontSize: "20px", marginBottom: "20px" }}>
          Post your residential / Commercial property
        </p>
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "42px",
                fontWeight: "bold",
                color: "#12264f",
              }}
            >
              20K+
            </h2>
            <p style={{ fontSize: "14px", color: "#888" }}>Property Listings</p>
          </div>
          <div>
            <h2
              style={{
                fontSize: "42px",
                fontWeight: "bold",
                color: "#12264f",
              }}
            >
              45K+
            </h2>
            <p style={{ fontSize: "14px", color: "#888" }}>Monthly Searches</p>
          </div>
          <div>
            <h2
              style={{
                fontSize: "42px",
                fontWeight: "bold",
                color: "#12264f",
              }}
            >
              10K+
            </h2>
            <p style={{ fontSize: "14px", color: "#888" }}>
              Owners advertise monthly
            </p>
          </div>
        </div>
        <button
          style={{
            backgroundColor: "#007bff",
            color: "white",
            marginBottom: "5px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = "#0056b3";
          }}
          onMouseOut={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = "#007bff";
          }}
          onClick={handlePostPropertyClick} // Attach click handler
        >
          Post your property for FREE
        </button>

        <p style={{ fontSize: "14px", color: "#888", marginTop: "10px" }}>
          Or post via{" "}
          <span style={{ color: "#25d366", fontWeight: "bold" }}>Whatsapp</span>, send a “hi” to +91 7428197035
        </p>
      </div>
      <div style={{ margin: "2cm" }}> {/* Added margin for the image container */}
        <img
          src="/images/PostProperty.png"
          alt="Post Property"
          style={{
            height: "10cm", // Ensure height is set
            width: "15cm",  // Ensure width is set // Margin from all sides for the image
        
          }}
        />
      </div>
    </section>
  );
};

export default PropertySection;
