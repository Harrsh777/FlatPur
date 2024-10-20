"use client";
import React, { useState, useEffect } from "react";

const AITextAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Display welcome message when the chat opens
      setMessages((prevMessages) => [
        ...prevMessages,
        "AI: Welcome To FlatPur!! How can I help you?",
        
      ]);
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = `User: ${input}`;
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      setIsTyping(true); // Set typing indicator
      setTimeout(() => {
        const aiResponse = getAIResponse(input);
        setMessages((prevMessages) => [...prevMessages, `AI: ${aiResponse}`]);
        setIsTyping(false); // Stop typing indicator
      }, 2000); // Simulate typing delay of 2 seconds

      setInput('');
    }
  };
  const getAIResponse = (question: string): string => {
    // Define the allowed keys (categories)
    type KeywordCategory = keyof typeof keywords;

    // Define the keywords object explicitly
    const keywords = {
        greeting: ["hi", "hello", "how are you", "hey"],
        name: ["what is your name"],
        houseSearch: ["find a house", "buy a house", "house search"],
        price: ["price", "cost", "how much"],
        propertySearch: ["recommend properties", "best properties", "luxury apartments"],
        customerSupport: ["contact customer support", "call support", "need help"],
        humanSupport: ["talk to a human", "real person"],
        workingHours: ["working hours", "office hours"],
        sellingProperty: ["sell my property", "selling property","sell"],
        rentHouse: ["rent a house", "rent apartment"],
        location: ["properties in kanpur", "best areas in kanpur"],
        commercialProperty: ["commercial property", "shop for sale", "office space"],
        luxuryProperty: ["luxury apartment", "high-end property", "villa"],
        loan: ["home loan", "get loan", "loan for house","loan"],
        stampDuty: ["stamp duty", "registration fee", "legal charges"],
        ecoFriendly: ["eco-friendly", "sustainable property"],
        investment: ["property investment", "invest in real estate", "is property a good investment"],
        newProjects: ["upcoming projects", "new developments", "new construction"],
        availability: ["is property available", "property for sale", "available properties"],
        propertyComparison: ["compare properties", "property comparison", "which property is better"],
        neighborhoodInfo: ["neighborhood information", "area details", "community insights"],
        propertyDocuments: ["documents required", "paperwork for buying", "property registration"],
        propertyTaxes: ["property tax", "property taxes in Kanpur", "annual property tax"],
        realEstateAgent: ["real estate agent", "contact agent", "local property agent"],
        discountsOffers: ["discounts", "offers on property", "festive offers"],
        maintenanceCharges: ["maintenance fees", "maintenance costs", "property upkeep"],
        propertyType: ["different property types", "types of houses", "villa or apartment"],
        resaleProperty: ["resale property", "buying resale", "pre-owned homes"],
        inspection: ["property inspection", "home inspection", "site visit"],
        governmentSchemes: ["government schemes", "housing schemes", "PMAY"],
        BookanAppointment: ["Book an Appointment", "Appointment"]
    };

    // Define the responses object explicitly
    const responses = {
        greeting: "Hello! How can I assist you with your property needs today?",
        name: "I’m your virtual assistant, here to help with all your real estate queries.",
        houseSearch: "Absolutely! I can help you find a house. Where would you like to start?",
        price: "The price range depends on the property type and location. Could you please specify your preferences?",
        propertySearch: "I can recommend properties based on your needs. Please share your budget and location preference.",
        customerSupport: "You can contact our customer support team via phone, email, or by visiting our office.",
        humanSupport: "Sure! Let me connect you with one of our representatives for further assistance.",
        workingHours: "Our working hours are from 9 AM to 6 PM, Monday through Saturday.",
        sellingProperty: "Yes, I can assist you with listing your property on our platform, Kindly Call +91 8004959778 to get in touch with our.",
        rentHouse: "I can help you find rental properties. What location and price range are you looking at?",
        location: "Popular areas for buying property in Kanpur include Swaroop Nagar, Civil Lines, Kalyanpur, and Kidwai Nagar.",
        commercialProperty: "The best areas for commercial properties in Kanpur include Mall Road, Swaroop Nagar, and Kidwai Nagar.",
        luxuryProperty: "Yes, there are luxury apartments and villas available in areas like Swaroop Nagar and Civil Lines.",
        loan: "Yes, we can assist you in obtaining home loans from leading banks and financial institutions.",
        stampDuty: "Stamp duty in Kanpur is usually around 7% of the property value, with an additional 1% registration fee.",
        ecoFriendly: "Yes, we have eco-friendly projects that focus on sustainability and energy efficiency.",
        investment: "Real estate in Kanpur can be a great investment due to the city's growing infrastructure and affordable rates.",
        newProjects: "There are several upcoming residential and commercial projects in Kanpur. Let me know your budget and preferences!",
        availability: "We have multiple properties available for sale and rent. You can filter properties by your desired location and price.",
        propertyComparison: "You can compare properties based on location, price, and amenities to find the best option for you.",
        neighborhoodInfo: "I can provide details about the neighborhood, such as safety, schools, and nearby facilities. Which area are you interested in?",
        propertyDocuments: "You'll need documents like ID proof, sale agreement, and PAN card for property registration. Need more details?",
        propertyTaxes: "The annual property tax in Kanpur varies based on the property type and location. I can assist you with calculating it.",
        realEstateAgent: "Our local real estate agents can help you with property tours, negotiations, and documentation. Here Call the number 00000000",
        discountsOffers: "Flatpur offers seasonal discounts and festive deals. Keep an eye on our promotions page for the latest offers.",
        maintenanceCharges: "Maintenance charges typically depend on the property size and location. Would you like more details on specific properties?",
        propertyType: "We offer a wide range of property types, including apartments, villas, and commercial spaces. What type are you interested in?",
        resaleProperty: "Resale properties can be a good option. I can help you find pre-owned homes in your desired area.",
        inspection: "I can help you schedule a property inspection or a site visit. When would you like to arrange it?",
        governmentSchemes: "You may be eligible for government housing schemes like PMAY. I can help you find more details.",
        BookanAppointment: "Yes i can help you with that, kindly click on the below icon",
        default: "I couldn't understand you, please call this number for queries: +91 8004959778",
    };

    // Find the first matching keyword category
    for (const category in keywords) {
        const keywordList = keywords[category as KeywordCategory];
        if (keywordList.some((keyword) => question.toLowerCase().includes(keyword))) {
          return responses[category as KeywordCategory];
        }
      }
  
      // If no match, return default response
      return responses.default;
    };
  
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSend();
      }
    };
  
    return (
      <div>
        {/* Floating Button */}
        <div style={floatingButtonStyle} onClick={handleToggle}>
        <img
                      src="\images\robot-assistant.png" // Placeholder for bot icon in the chat bubbles (Replace with actual bot icon URL)
                      alt="Bot"
                    />
        </div>
  
        {/* Chat Window */}
        {isOpen && (
          <div style={chatWindowStyle}>
            <div style={chatHeaderStyle}>
              <img
                src="\images\robot-assistant.png" // Placeholder for bot icon (Replace with actual bot icon URL)
                alt="Bot Icon"
                style={botIconStyle}
              />
              <span> FlatBot</span>
              <button style={closeButtonStyle} onClick={handleToggle}>
                X
              </button>
            </div>
            <div style={chatBodyStyle}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={msg.startsWith('User') ? userMessageStyle : aiMessageStyle}
                >
                  {msg.startsWith('AI:') && (
                    <img
                      src="\images\robot-assistant.png" // Placeholder for bot icon in the chat bubbles (Replace with actual bot icon URL)
                      alt="Bot"
                      style={chatIconInsideBubbleStyle} // Updated style for the icon inside chat bubble
                    />
                  )}
                  <span>{msg.replace("AI:", "").replace("User:", "")}</span>
                </div>
              ))}
              {isTyping && <div style={typingIndicatorStyle}>Bot is typing...</div>}
            </div>
            <div style={chatFooterStyle}>
              <input
                style={inputStyle}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
              />
              <button style={sendButtonStyle} onClick={handleSend}>
                ➤
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Correct Inline CSS styles without type casting
  const floatingButtonStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "80px", // Move it a bit up
    right: "20px",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "24px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 9999,
  };
  
  const chatWindowStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "80px",
    right: "20px",
    width: "300px",
    height: "400px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 9999,
  };
  
  const chatHeaderStyle: React.CSSProperties = {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  };
  
  const botIconStyle: React.CSSProperties = {
    borderRadius: "50%",
    marginRight: "10px",
    width: "30px",  // Adjust this to fit inside the header
    height: "30px", // Adjust this to fit inside the header
    objectFit: "cover", // Ensure the image maintains its aspect ratio
  };
  
  const closeButtonStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    border: "none",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  };
  
  const chatBodyStyle: React.CSSProperties = {
    flex: 1,
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
  };
  
  const chatFooterStyle: React.CSSProperties = {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #ccc",
  };
  
  const inputStyle: React.CSSProperties = {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginRight: "10px",
  };
  
  const sendButtonStyle: React.CSSProperties = {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px",
    cursor: "pointer",
  };
  
  const userMessageStyle: React.CSSProperties = {
    alignSelf: "flex-end",
    backgroundColor: "#dcf8c6",
    padding: "8px",
    borderRadius: "10px",
    margin: "5px",
    maxWidth: "80%",
    display: "flex",
    alignItems: "center",
  };
  
  const aiMessageStyle: React.CSSProperties = {
    alignSelf: "flex-start",
    backgroundColor: "#f1f0f0",
    padding: "8px",
    borderRadius: "10px",
    margin: "5px",
    maxWidth: "80%",
    display: "flex",
    alignItems: "center",
  };
  
  // Updated style for the icon inside chat bubble
  const chatIconInsideBubbleStyle: React.CSSProperties = {
    width: "20px",  // Adjust this to fit inside the message bubble
    height: "20px", // Adjust this to fit inside the message bubble
    marginRight: "10px",
    objectFit: "cover", // Ensure the image scales properly inside the message bubble  
  };
  
  const typingIndicatorStyle: React.CSSProperties = {
    alignSelf: "flex-start",
    fontStyle: "italic",
    color: "gray",
    margin: "5px",
  };
  export default AITextAssistant;