import React from 'react';
import Link from 'next/link';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Restaurant Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Savory Delights</h3>
            <p className="mb-4">Serving delicious meals since 2010. Our mission is to provide exceptional dining experiences with fresh ingredients and authentic flavors.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-500">
                <FiFacebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-500">
                <FiInstagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-500">
                <FiTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-amber-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-gray-300 hover:text-amber-500 transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-amber-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-amber-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-amber-500 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/special-offers" className="text-gray-300 hover:text-amber-500 transition-colors">
                  Special Offers
                </Link>
              </li>
              <li>
                <Link href="/order" className="text-gray-300 hover:text-amber-500 transition-colors">
                  Order Online
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <FiMapPin className="mt-1 mr-3 text-amber-500" />
                <p>123 Restaurant Street, Nairobi, Kenya</p>
              </div>
              <div className="flex items-center">
                <FiPhone className="mr-3 text-amber-500" />
                <p>+254 712 345 678</p>
              </div>
              <div className="flex items-center">
                <FiMail className="mr-3 text-amber-500" />
                <p>info@savorydelights.com</p>
              </div>
              <div>
                <h4 className="font-medium mb-1 mt-4">Hours of Operation</h4>
                <p>Monday - Friday: 10:00 AM - 10:00 PM</p>
                <p>Saturday - Sunday: 11:00 AM - 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Savory Delights. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
