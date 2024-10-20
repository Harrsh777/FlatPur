// app/contact/page.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import Navbar from '@/components/base/Navbar';

const ContactUs: React.FC = () => {
  return (
    <div
      className="flex flex-col items-center justify-center p-6"
      style={{
        backgroundImage: 'url("/path/to/your/background-image.jpg")',
        backgroundSize: 'cover',
        height: '100vh',
      }}
    >
      <h1 className="text-black text-4xl font-bold" style={{ marginTop: '0cm' }}>
        Contact Our Team
      </h1>
      <p className="text-gray-600 text-center mt-2">
        Got any questions about the product or scaling on our platform? We're here to help.
      </p>
      <p className="text-gray-600 text-center mt-2">
        Chat to our friendly team 24/7 and get onboard in less than 5 minutes.
      </p>

      <div className="mt-4 flex w-full max-w-5xl"> {/* Adjusted container for form and contact sections */}
        <div className="w-3/5">
          <form>
            <div className="grid grid-cols-1 gap-3"> {/* Reduced gap for compactness */}
              <div className="flex justify-between items-center">
                <label className="text-s font-bold">First Name</label>
                <label className="text-s font-bold align-left">Last Name</label>
              </div>
              <div className="flex justify-between">
                <input
                  type="text-s font-bold"
                  placeholder="First name"
                  className="p-2.5 border border-gray-300 rounded w-1/2 mr-1 text-xs" // Reduced padding and font size
                  required
                />
                <input
                  type="text-s font-bold"
                  placeholder="Last name"
                  className="p-2.5 border border-gray-300 rounded w-1/2 text-xs" // Reduced padding and font size
                  required
                />
              </div>
              <label className="text-s font-bold">Email</label>
              <input
                type="email"
                placeholder="you@company.com"
                className="p-2.5 border border-gray-300 rounded text-xs" // Reduced padding and font size
                required
              />
              <label className="text-s font-bold">Phone Number</label>
              <input
                type="tel"
                placeholder="US +1 (555) 000-0000"
                className="p-2.5 border border-gray-300 rounded text-xs" // Reduced padding and font size
                required
              />
              <label className="text-s font-bold">Message</label>
              <textarea
                placeholder="Leave us a message..."
                className="p-2.5 border border-gray-300 rounded h-24 text-xs" // Reduced padding and font size
                required
              />
            </div>

            <div className="mt-2">
              <h2 className="text-xs font-semibold">Services</h2>
              <div className="grid grid-cols-3 gap-2 mt-1"> {/* Adjusted to 3 columns */}
                <label className="flex items-center">
                  <input type="checkbox" className="mr-1" /> Buy
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-1" /> Sell
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-1" /> Rent
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-1" /> Residential
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-1" /> Commercial
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-1" /> Other
                </label>
              </div>
            </div>
            
            <button type="submit" className="bg-black text-white mt-4 p-2.5 rounded w-full text-s">
              Send Message
            </button>
          </form>
        </div>

        <div className="w-2/5 flex flex-col ml-4"> {/* Right section for chat and contact info */}
          <div className="text-center">
            <h2 className="text-s font-bold mt-2">Chat with us</h2>
            <p className="font-bold text-xs">Speak to our friendly team via live chat.</p>
            <p><button className="font-bold mt-2 text-blue-500 text-xs">Call Us</button></p>
            <p> <button className="font-bold mt-2 text-blue-500 text-xs">Shoot us an email</button></p>
            <p> <button className="font-bold mt-2 text-blue-500 text-xs">Message us on Instagram</button></p>
          </div>

          <div className="text-center mt-4">
            <h2 className="text-s font-bold mt-2">Call us</h2>
            <p className="font-bold text-xs">Call our team Mon-Fri from 8am to 5pm.</p>
            <p className="font-bold text-blue-500 text-xs">+91 8004959778</p>
          </div>

          <div className="text-center mt-4">
            <h2 className="text-s font-bold mt-2">Visit us</h2>
            <p className="font-bold text-xs">Chat to us in person at our Jajmau, Kanpur Office</p>
            <p className="font-bold text-blue-500 text-xs">Defence ave, defence colony, jajmau, kanpur, uttar pradesh</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
