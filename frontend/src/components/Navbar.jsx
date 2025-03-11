import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get current route

  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'Players', path: '/players' },
    { title: 'Squad', path: '/squad' },
  ];

  const handleNavigation = (href) => {
    if (href) {
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <nav 
      className="fixed w-full z-50 border-b-2 border-blue-600/50 backdrop-blur-sm transition-colors duration-300 bg-black/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-blue-800 font-bold text-3xl transition duration-300">
              Squadify
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map(({ title, path }) => (
                  <Link 
                    key={title} 
                    to={path} 
                    className={`transition-colors duration-200 text-xl ${
                      location.pathname === path ? "text-blue-800 font-bold" : "text-gray-200 hover:text-white"
                    }`}
                  >
                    {title}
                  </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/80 backdrop-blur-sm border-t border-blue-600/30">
            {navItems.map(({ title, path}) => (
                <Link 
                  key={title} 
                  to={path} 
                  onClick={() => setIsOpen(false)}
                  className={`block w-full text-left px-3 py-2 hover:text-white transition-colors duration-200  ${
                    location.pathname === path ? "text-blue-800 font-bold" : "text-gray-300"
                  }`}
                >
                  {title}
                </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
