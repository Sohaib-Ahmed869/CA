import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/certifiedAustralia.png";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-800 text-white py-2 fixed w-full bottom-0">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex flex-col sm:flex-row items-center">
          <p className="text-SM font-semibold mt-5 sm:mt-0 sm:ml-5">
            &copy; 2024. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-5 mt-5 sm:mt-0">
          <Link to="/about" className="text-sm font-semibold">
            About Us
          </Link>
          <Link to="/contact" className="text-sm font-semibold">
            Contact Us
          </Link>
          <Link to="/faq" className="text-sm font-semibold">
            FAQ
          </Link>
          <Link to="/terms" className="text-sm font-semibold">
            Terms & Conditions
          </Link>
          <Link to="/privacy" className="text-sm font-semibold">
            Privacy Policy
          </Link>
        </div>
        <div className="flex items-center gap-5 mt-5 sm:mt-0">
          <FaFacebook className="text-2xl" />
          <FaTwitter className="text-2xl" />
          <FaInstagram className="text-2xl" />
          <FaLinkedin className="text-2xl" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
