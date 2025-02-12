import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { title: 'Home', href: '#' },
    { title: 'Features', href: '#features' },
    { title: 'Technology', href: '#' },
    { title: 'About', href: '#' },
  ];

  return (
    <nav className="fixed w-full bg-black/80 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
          <a 
            href="#" 
            className="text-purple-600 font-bold text-3xl transition duration-300" style={{ textShadow: '0px 0px 8px rgba(128, 0, 128, 0.8)'}}>
              Squadify
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-xl"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/80 backdrop-blur-sm">
            {navItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;