import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/certifiedAustralia.png";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-800 text-white py-2 fixed w-full bottom-0">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center">
        <div className="flex items-center gap-5 mt-5 sm:mt-0">
          <Link
            to="https://certifiedaustralia.com.au/"
            className="text-sm font-semibold"
          >
            Home
          </Link>
          <Link
            to="https://certifiedaustralia.com.au/about-us/"
            className="text-sm font-semibold"
          >
            About Us
          </Link>
          <Link
            to="https://certifiedaustralia.com.au/industry/"
            className="text-sm font-semibold"
          >
            Industry
          </Link>
          <Link
            to="https://certifiedaustralia.com.au/contact-us/"
            className="text-sm font-semibold"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
