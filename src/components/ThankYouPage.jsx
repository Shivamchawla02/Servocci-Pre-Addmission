import React from 'react';

const ThankYouPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-[#001b48] to-[#ff4f00]">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-xl transition-transform duration-300 hover:scale-105 text-center">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png"
            alt="Servocci Logo"
            className="w-24 h-24 object-contain"
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#430000] mb-4">
          Thank you for submitting the form!
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          We appreciate your interest. Our team will get in touch with you soon.
        </p>

        <a 
          href="https://servocci.com" 
          className="inline-block px-6 py-3 bg-gradient-to-r from-[#ff4f00] to-[#ff7f1a] hover:from-[#e63f00] hover:to-[#e66a00] text-white font-bold rounded-full shadow-lg transition-all duration-300"
        >
          Go to Servocci Counsellors Website
        </a>
      </div>
    </div>
  );
};

export default ThankYouPage;
