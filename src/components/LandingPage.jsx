// File: src/components/LandingPage.jsx
import React, { useState } from "react";
import { logout } from "../firebase";

const LandingPage = ({ onStart, onNavigate, user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const safeNavigate = (page) => {
    if (typeof onNavigate === "function") {
      onNavigate(page);
    }
  };

  const handleLinkClick = (page) => {
    safeNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#0E1020] text-white flex flex-col justify-center items-center font-sans p-8 relative overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-6 z-50">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 0L40 20L20 40L0 20L20 0Z" fill="url(#paint0_linear)" />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="20"
                  y1="0"
                  x2="20"
                  y2="40"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#6C2BFF" />
                  <stop offset="1" stopColor="#A82FFC" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-xl font-bold">Vistara Ai</span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 text-sm font-medium">
            <li>
              <a
                href="#"
                className="hover:text-gray-300 transition-colors"
                onClick={() => handleLinkClick("landing")}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-300 transition-colors"
                onClick={() => handleLinkClick("features")}
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-300 transition-colors"
                onClick={() => handleLinkClick("pricing")}
              >
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Contact
              </a>
            </li>
          </ul>

          {/* Right Side (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <button
                  onClick={() => safeNavigate("login")}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-colors shadow-lg"
                >
                  Login
                </button>
                <button
                  onClick={() => safeNavigate("signup")}
                  className="px-6 py-2 border border-blue-600 text-blue-400 font-bold rounded-full transition-colors hover:bg-blue-600 hover:text-white shadow-lg"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="focus:outline-none"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="profile"
                      className="w-10 h-10 rounded-full border-2 border-gray-700"
                    />
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                      {user.displayName
                        ? user.displayName.charAt(0).toUpperCase()
                        : "U"}
                    </div>
                  )}
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg p-2">
                    <p className="text-sm text-gray-300 px-2 mb-2">
                      {user.displayName || user.email}
                    </p>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 rounded-md hover:bg-red-600 hover:text-white transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Always show Launch App */}
            <button
              onClick={onStart}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-colors shadow-lg"
            >
              Launch App
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-gray-800 shadow-lg py-4 transition-transform duration-300 ease-in-out transform -translate-y-0 z-40">
            <ul className="flex flex-col items-center space-y-4 text-base font-medium">
              <li>
                <a
                  href="#"
                  className="block py-2 hover:text-gray-300 transition-colors"
                  onClick={() => handleLinkClick("landing")}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 hover:text-gray-300 transition-colors"
                  onClick={() => handleLinkClick("features")}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 hover:text-gray-300 transition-colors"
                  onClick={() => handleLinkClick("pricing")}
                >
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 hover:text-gray-300 transition-colors">
                  Contact
                </a>
              </li>

              {/* Auth Buttons or Avatar */}
              {!user ? (
                <>
                  <li>
                    <button
                      onClick={() => handleLinkClick("login")}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-colors shadow-lg mt-2"
                    >
                      Login
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleLinkClick("signup")}
                      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-colors shadow-lg mt-2"
                    >
                      Sign Up
                    </button>
                  </li>
                </>
              ) : (
                <li className="flex flex-col items-center">
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-colors shadow-lg mt-2"
                  >
                    Logout
                  </button>
                </li>
              )}

              {/* Always show Launch App */}
              <li>
                <button
                  onClick={onStart}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-colors shadow-lg mt-2"
                >
                  Launch App
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Background shapes */}
      <div className="absolute inset-0 z-0">
        {/* Purple shape */}
        <svg
          className="absolute w-[400px] h-[400px] top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 opacity-20 animate-pulse-slow"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#8A3FFC"
            d="M42.2,-58.5C53.3,-48.5,60.2,-34.5,66.8,-17.7C73.4,-0.8,79.8,19.3,73.1,34.8C66.3,50.3,46.5,61.1,26.4,65.8C6.3,70.5,-14,69.1,-30,60.8C-46.1,52.4,-57.9,37.1,-63.3,19.9C-68.7,2.8,-67.7,-16.1,-59.8,-30.9C-51.8,-45.8,-36.8,-56.6,-20.9,-63.4C-5,-70.2,10,-72.9,23.3,-69.8C36.6,-66.7,47.9,-57.8,5"
            transform="translate(100 100) scale(1.1)"
          />
        </svg>
        {/* Blue shape */}
        <svg
          className="absolute w-[300px] h-[300px] bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 opacity-20 animate-pulse-slow-reverse"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#2B6BFF"
            d="M50,-42.6C60.5,-32.7,60.8,-16.4,59.3,-1.9C57.8,12.7,54.4,25.4,46.5,37C38.6,48.6,26.2,59.2,12.8,61.9C-0.6,64.5,-15,59.2,-27.2,51.1C-39.4,43,-49.5,32.2,-53.2,18.8C-57,-4.7,-54.4,-21.9,-46.5,-32.8C-38.6,-43.7,-25.4,-48.3,-11.2,-50.2C3,-52.1,16.2,-51.2,28.6,-48.4C41,-45.6,52,-40.8,50,-42.6Z"
            transform="translate(100 100) scale(1.1)"
          />
        </svg>
      </div>

      {/* Hero Section */}
      <main className="relative z-10 text-center max-w-4xl mx-auto space-y-8 mt-20 md:mt-0">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-fade-in-up">
          <span className="block">Your AI Partner in Trading</span>
        </h1>
        <p
          className="xl:text-2xl text-gray-300 animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          Effortlessly analyze market charts with AI-powered insights. Get clear
          trade recommendations and improve your strategy instantly.
        </p>
        <div
          className="flex justify-center space-x-4 animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          <button
            onClick={onStart}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-lg shadow-lg transition-colors transform hover:scale-105"
          >
            Launch Analyzer
          </button>
          <button
            onClick={() => handleLinkClick("features")}
            className="px-8 py-4 border border-blue-600 text-blue-400 font-bold rounded-full text-lg shadow-lg transition-colors hover:bg-blue-600 hover:text-white transform hover:scale-105"
          >
            Learn More
          </button>
        </div>
      </main>

      {/* Footer Disclaimer */}
      <div
        className="absolute bottom-4 text-center text-gray-500 text-sm z-10 animate-fade-in"
        style={{ animationDelay: "1.5s" }}
      >
        Disclaimer: This tool is for informational purposes only. Trading
        involves risk.
      </div>
    </div>
  );
};

export default LandingPage;
