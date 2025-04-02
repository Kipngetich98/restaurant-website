import React from 'react';
import Link from 'next/link';
import { FiCalendar, FiClock, FiTag, FiArrowRight } from 'react-icons/fi';

export const metadata = {
  title: 'Savory Delights | Special Offers',
  description: 'Discover our latest promotions, deals, and special offers at Savory Delights Restaurant.',
  keywords: 'restaurant promotions, special offers, food deals, Nairobi restaurant',
};

const specialOffers = [
  {
    id: 1,
    title: 'Happy Hour',
    description: 'Enjoy 50% off on selected drinks and appetizers every weekday from 4 PM to 7 PM.',
    image: '/images/special-offers/happy-hour.jpg',
    validUntil: 'Ongoing',
    type: 'Daily Special',
    code: 'HAPPY50',
  },
  {
    id: 2,
    title: 'Family Feast',
    description: 'Feed the whole family with our special family package. Includes 2 large pizzas, 1 appetizer platter, and 4 drinks for just $49.99.',
    image: '/images/special-offers/family-feast.jpg',
    validUntil: 'December 31, 2025',
    type: 'Package Deal',
    code: 'FAMILY50',
  },
  {
    id: 3,
    title: 'Weekend Brunch',
    description: 'Join us for a special weekend brunch menu with complimentary mimosa. Available every Saturday and Sunday from 10 AM to 2 PM.',
    image: '/images/special-offers/weekend-brunch.jpg',
    validUntil: 'Ongoing',
    type: 'Weekend Special',
    code: 'BRUNCH25',
  },
  {
    id: 4,
    title: 'Birthday Special',
    description: 'Celebrate your birthday with us and receive a complimentary dessert and a 20% discount on your meal. Valid ID required.',
    image: '/images/special-offers/birthday-special.jpg',
    validUntil: 'Ongoing',
    type: 'Celebration',
    code: 'BIRTHDAY20',
  },
  {
    id: 5,
    title: 'Lunch Express',
    description: 'In a hurry? Try our Lunch Express menu - your meal guaranteed in 15 minutes or it\'s free! Available weekdays from 12 PM to 2 PM.',
    image: '/images/special-offers/lunch-express.jpg',
    validUntil: 'Ongoing',
    type: 'Weekday Special',
    code: 'EXPRESS15',
  },
  {
    id: 6,
    title: 'First-Time Order Discount',
    description: 'New to Savory Delights? Get 15% off on your first online order with us.',
    image: '/images/special-offers/first-time.jpg',
    validUntil: 'Ongoing',
    type: 'New Customer',
    code: 'WELCOME15',
  },
];

export default function SpecialOffers() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Special Offers</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take advantage of our limited-time promotions and special deals. Don't miss out on these exclusive offers!
          </p>
        </div>

        {/* Featured Offer */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gray-300 h-64 md:h-auto flex items-center justify-center">
              <span className="text-gray-500">Featured Offer Image</span>
            </div>
            <div className="p-8">
              <div className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                Limited Time Offer
              </div>
              <h2 className="text-2xl font-bold mb-4">Buy One, Get One Free Pizza</h2>
              <p className="text-gray-600 mb-6">
                For a limited time, buy any large pizza and get a second pizza of equal or lesser value for free! Valid for dine-in, takeout, and delivery.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <FiCalendar className="mr-2" />
                  <span>Valid until April 30, 2025</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiTag className="mr-2" />
                  <span>Use code: BOGO25</span>
                </div>
              </div>
              <Link
                href="/order"
                className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Order Now <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* All Offers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialOffers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-300 h-48 flex items-center justify-center">
                <span className="text-gray-500">Offer Image</span>
              </div>
              <div className="p-6">
                <div className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  {offer.type}
                </div>
                <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
                <div className="flex flex-wrap gap-y-2 gap-x-4 mb-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <FiCalendar className="mr-2" />
                    <span>{offer.validUntil}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiTag className="mr-2" />
                    <span>Code: {offer.code}</span>
                  </div>
                </div>
                <Link
                  href="/order"
                  className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium text-sm"
                >
                  Redeem Offer <FiArrowRight className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-amber-600 text-white rounded-lg shadow-md p-8 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Never Miss an Offer</h2>
              <p className="mb-0">
                Subscribe to our newsletter to stay updated on our latest promotions and special offers.
              </p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="flex-grow px-4 py-3 rounded-md focus:outline-none text-gray-800"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-amber-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold mb-2">Terms and Conditions</h3>
          <p className="text-gray-600 text-sm max-w-3xl mx-auto">
            All offers are subject to availability. Cannot be combined with other promotions or discounts unless specified.
            Savory Delights reserves the right to modify or cancel any promotion without prior notice.
            Please mention the offer code when ordering to avail the discount.
          </p>
        </div>
      </div>
    </div>
  );
}
