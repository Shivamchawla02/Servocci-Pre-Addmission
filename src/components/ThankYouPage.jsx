import React from 'react';

const ThankYouPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Thank you for submitting the form!</h1>
      <p>We appreciate your interest. Our team will get in touch with you soon.</p>
      <a 
        href="https://servocci.com" 
        style={{ 
          marginTop: "20px", 
          display: "inline-block", 
          padding: "10px 20px", 
          backgroundColor: "#001b48", 
          color: "white", 
          borderRadius: "8px", 
          textDecoration: "none"
        }}
      >
        Go to Servocci Counsellors Website
      </a>
    </div>
  );
};

export default ThankYouPage;
