"use client"; 
import React from "react"; 
import { FaWhatsapp } from "react-icons/fa";  

interface WhatsAppButtonProps {   
  bottom?: string; // Allows passing a custom bottom position   
  right?: string;  // Allows passing a custom right position 
}  

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({   
  bottom = "135px", // Default bottom position   
  right = "20px",  // Default right position 
}) => {   
  const phoneNumber = "+918004959778"; // Replace with your desired phone number without country code
  
  const handleWhatsAppClick = () => {     
    window.open(`https://wa.me/${phoneNumber}`, "_blank");   
  };    

  return (     
    <div       
      className="fixed z-50"       
      onClick={handleWhatsAppClick}       
      style={{         
        backgroundColor: "#25D366",         
        borderRadius: "50%",         
        padding: "10px",         
        cursor: "pointer",         
        bottom: bottom, // Position based on passed prop or default value         
        right: right,   // Position based on passed prop or default value       
      }}     
    >       
      <FaWhatsapp size={30} color="white" />     
    </div>   
  ); 
};  

export default WhatsAppButton;
