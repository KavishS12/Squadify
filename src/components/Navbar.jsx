import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import PropTypes from 'prop-types'; 

const Navbar = ({ page, setPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { title: 'Home', page: 'landing' },
    { title: 'Players', page: 'players' },
    { title: 'Features', page: 'landing', href: '#features' },
    { title: 'Technology', page: 'landing', href: '#technology' },
  ];

  const handleNavigation = (page, href) => {
    setPage(page);

    setTimeout(() => {
      if (href) {
        // Scroll to a specific section if href exists
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // Scroll to top for any page change without href
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100); // Slight delay to ensure page update
  };

  return (
    <nav 
      className={`fixed w-full z-50 border-b-2 border-purple-600/50 backdrop-blur-sm transition-colors duration-300 ${
        page === "landing" ? "bg-black/80" : "bg-purple-950/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <button 
              onClick={() => handleNavigation('landing')}
              className="text-purple-700 font-bold text-3xl transition duration-300" 
              style={{ textShadow: '0px 0px 8px rgba(128, 0, 128, 0.8)' }}
            >
              Squadify
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.title}
                  onClick={() => handleNavigation(item.page, item.href)}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-xl"
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/80 backdrop-blur-sm border-t border-purple-600/30">
            {navItems.map((item) => (
              <button
                key={item.title}
                onClick={() => {
                  handleNavigation(item.page, item.href);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  page: PropTypes.string.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default Navbar;