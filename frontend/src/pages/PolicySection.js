import React from "react";
import { FaTruck, FaUndo, FaGlobe, FaClipboardList } from "react-icons/fa";

const PolicySection = () => {
  return (
    <div className="bg-white py-10 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {/* Free Shipping */}
        <div className="flex flex-col items-center">
          <FaTruck className="text-3xl mb-2" />
          <p className="text-gray-800 font-semibold">FREE SHIPPING</p>
        </div>

        {/* Easy Returns */}
        <div className="flex flex-col items-center">
          <FaUndo className="text-3xl mb-2" />
          <p className="text-gray-800 font-semibold">EASY RETURNS</p>
        </div>

        {/* Shipping Globally */}
        <div className="flex flex-col items-center">
          <FaGlobe className="text-3xl mb-2" />
          <p className="text-gray-800 font-semibold">
            SHIPPING GLOBALLY
          </p>
        </div>

        {/* Custom Fitting */}
        <div className="flex flex-col items-center">
          <FaClipboardList className="text-3xl mb-2" />
          <p className="text-gray-800 font-semibold">CUSTOM FITTING</p>
        </div>
      </div>
    </div>
  );
};

export default PolicySection;
