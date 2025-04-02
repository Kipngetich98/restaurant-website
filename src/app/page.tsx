import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiStar, FiClock, FiMapPin } from 'react-icons/fi';

export const metadata = {
  title: 'Savory Delights | Home',
  description: 'Experience exceptional dining at Savory Delights. Fresh ingredients, authentic flavors, and a warm atmosphere.',
  keywords: 'restaurant, dining, food, cuisine, Nairobi, Kenya',
};

const featuredItems = [
  {
    id: 1,
    name: 'Classic Burger',
    description: 'Juicy beef patty with lettuce, tomato, and our special sauce',
    price: 12.99,
    image: '/images/menu/classic-burger.jpg',
  },
  {
    id: 2,
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella, tomatoes, and basil on our homemade crust',
    price: 16.99,
    image: '/images/menu/margherita-pizza.jpg',
  },
  {
    id: 3,
    name: 'Chicken Wings',
    description: 'Crispy wings tossed in your choice of sauce: BBQ, Buffalo, or Honey Garlic',
    price: 10.99,
    image: '/images/menu/chicken-wings.jpg',
  },
  {
    id: 4,
    name: 'Fresh Juice',
    description: 'Freshly squeezed orange, apple, or pineapple juice',
    price: 4.99,
    image: '/images/menu/fresh-juice.jpg',
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative h-full bg-gray-300">
          <div className="container mx-auto px-4 h-full flex items-center relative z-20">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Experience Authentic Flavors
              </h1>
              <p className="text-xl mb-8">
                Savory Delights offers a unique dining experience with fresh ingredients and authentic recipes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/menu"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center"
                >
                  View Menu <FiArrowRight className="ml-2" />
                </Link>
                <Link
                  href="/order"
                  className="bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Order Online
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At Savory Delights, we pride ourselves on providing exceptional dining experiences with attention to every detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiStar className="text-amber-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Ingredients</h3>
              <p className="text-gray-600">
                We source the freshest ingredients from local suppliers to ensure the highest quality in every dish.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiClock className="text-amber-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Service</h3>
              <p className="text-gray-600">
                Our efficient team ensures prompt service without compromising on the quality of your dining experience.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMapPin className="text-amber-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Prime Location</h3>
              <p className="text-gray-600">
                Conveniently located in the heart of the city, making it easy for you to enjoy our delicious meals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Items */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Menu Items</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our chef's special selections that have become customer favorites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48 bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">Image</span>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <span className="text-amber-600 font-medium">${item.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  <Link
                    href={`/order?item=${item.id}`}
                    className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/menu"
              className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium"
            >
              View Full Menu <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our valued customers have to say about their dining experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center text-amber-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The food was absolutely delicious! The service was excellent, and the ambiance was perfect for our anniversary dinner."
              </p>
              <div className="font-medium">Sarah M.</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center text-amber-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "I ordered online and the food arrived hot and fresh. The flavors were amazing, and the portions were generous."
              </p>
              <div className="font-medium">John D.</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center text-amber-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The best restaurant in town! The menu has something for everyone, and the staff is always friendly and attentive."
              </p>
              <div className="font-medium">Emily K.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Our Delicious Food?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Order online for pickup or delivery, or make a reservation for a dine-in experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/order"
              className="bg-white text-amber-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Order Online
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
