import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 shadow-md shadow-gray-100 py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        {/* Left: Company Description */}
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h2 className="text-lg font-semibold text-gray-800">Job Hunt</h2>
          <p className="text-sm text-gray-600">
            Empowering your career journey. Find your dream job with ease.
          </p>
        </div>

        {/* Right: Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="text-gray-600 hover:text-blue-600 transition">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-400 transition">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-700 transition">
            <FaLinkedinIn size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
