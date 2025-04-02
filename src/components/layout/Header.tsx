import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX, FiShoppingCart } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import React from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/special-offers', label: 'Special Offers' },
    { href: '/order', label: 'Order Online' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-amber-600">
          Savory Delights
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-gray-700 hover:text-amber-600 transition-colors ${
                pathname === link.href ? 'font-semibold text-amber-600' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link href="/order/cart" className="text-gray-700 hover:text-amber-600">
            <FiShoppingCart className="text-2xl" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-amber-600"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-3 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-gray-700 hover:text-amber-600 transition-colors ${
                    pathname === link.href ? 'font-semibold text-amber-600' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/order/cart"
                className="text-gray-700 hover:text-amber-600 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiShoppingCart className="mr-2" /> Cart
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
