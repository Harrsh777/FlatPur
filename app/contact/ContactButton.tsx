// components/ui/ContactButton.tsx
"use client"; // Ensure this component can use client-side features

import { useRouter } from "next/navigation";

const ContactButton: React.FC = () => {
  const router = useRouter();

  const handleContactClick = () => {
    router.push("/contact"); // Redirect to the Contact Us page
  };

  return (
    <button
      onClick={handleContactClick}
      style={buttonStyle}
    >
      Post Your Property
    </button>
  );
};

// Define the button styles
const buttonStyle: React.CSSProperties = {
  backgroundColor: "green", // Change this color as per your design
  color: "#ffffff",
  padding: "12px 25px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "600",
  marginTop: "20px", // Adjust margin as needed
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
};

export default ContactButton;
