// In HeroSection.jsx (assuming it exists; adjust as needed)
import React from 'react';
import Counter from '../../../commons/reusables/Counter'; // Adjust path based on depth

function HeroSection() {
  return (
    <div>
      <h1>Welcome to Our Website</h1>
      {/* Other hero content */}
      <Counter /> {/* Integrates the counter here */}
    </div>
  );
}

export default HeroSection;
