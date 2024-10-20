import React from 'react';

interface ContactUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactUsModal: React.FC<ContactUsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@letstalk.com');
    alert('E-mail address copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg p-8 shadow-lg max-w-lg w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 z-50"
          aria-label="Close"
        >
          &#x2715;
        </button>

        {/* Background Image */}
        <div className="absolute inset-0 rounded-lg overflow-hidden opacity-80">
          <img
            src="/images/map.png" // Use the correct image path
            alt="Map Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Say hello to us!</h1>
          <p className="text-gray-800 opacity-0">This is transparent text with Tailwind CSS. Use this if you only want to change the transparency of the text color without affecting other aspects of the element.</p>


          <div className="text-left mb-6">
            <p className="text-gray-800 font-bold">ADDRESS</p>
            <p className="font-bold text-gray-800">Jajmau, Kanpur</p>
          </div>

          <div className="text-left mb-6">
            <p className="text-gray-800 font-bold">PHONE</p>
            <p className="font-bold text-gray-800">+91 8004959778</p>
          </div>

          <div className="text-left mb-6">
            <p className="text-gray-600 font-bold">E-MAIL</p>
            <p className="font-bold text-gray-800">amaaz@flatpur.com</p>
          </div>

          <button
            onClick={handleCopyEmail}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Copy E-mail address
          </button>

          <div className="mt-8 flex justify-center space-x-4">
            <a href="#" className="text-blue-500">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-blue-500">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-blue-500">
              <i className="fab fa-behance"></i>
            </a>
            <div className="flex justify-center space-x-4 mt-4">
            {/* Ensure all icons are of the same size using Tailwind classes */}
            <a href="#"><img src="/images/google.png" alt="Google" className="w-8 h-8 invert" /></a>
            <a href="#"><img src="/images/twitter.png" alt="Twitter" className="w-8 h-8 invert" /></a>
            <a href="https://www.instagram.com/flatpur/profilecard/?igsh=aHJrdzd0amV2Zjc3"><img src="/images/instagram.png" alt="Instagram" className="w-8 h-8 invert" /></a>
            <a href="https://www.youtube.com/@Flatpur"><img src="/images/youtube.png" alt="YouTube" className="w-8 h-8 invert" /></a>
            <a href="#"><img src="/images/github.png" alt="GitHub" className="w-8 h-8 invert" /></a>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsModal;
