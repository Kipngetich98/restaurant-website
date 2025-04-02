import React from 'react';

export const metadata = {
  title: 'Savory Delights | Gallery',
  description: 'Explore our photo gallery showcasing our delicious food, restaurant ambiance, and special events.',
  keywords: 'restaurant gallery, food photos, restaurant ambiance, Nairobi restaurant',
};

const galleryImages = [
  {
    id: 1,
    category: 'food',
    title: 'Classic Burger',
    description: 'Our signature burger with all the fixings',
    image: '/images/gallery/food-1.jpg',
  },
  {
    id: 2,
    category: 'food',
    title: 'Margherita Pizza',
    description: 'Fresh mozzarella, tomatoes, and basil',
    image: '/images/gallery/food-2.jpg',
  },
  {
    id: 3,
    category: 'food',
    title: 'Chocolate Brownie',
    description: 'Warm chocolate brownie with vanilla ice cream',
    image: '/images/gallery/food-3.jpg',
  },
  {
    id: 4,
    category: 'venue',
    title: 'Main Dining Area',
    description: 'Our spacious and elegant main dining room',
    image: '/images/gallery/venue-1.jpg',
  },
  {
    id: 5,
    category: 'venue',
    title: 'Outdoor Patio',
    description: 'Enjoy your meal in our beautiful outdoor setting',
    image: '/images/gallery/venue-2.jpg',
  },
  {
    id: 6,
    category: 'venue',
    title: 'Private Dining Room',
    description: 'Perfect for special occasions and private events',
    image: '/images/gallery/venue-3.jpg',
  },
  {
    id: 7,
    category: 'events',
    title: 'Anniversary Celebration',
    description: 'Our 10th anniversary celebration',
    image: '/images/gallery/event-1.jpg',
  },
  {
    id: 8,
    category: 'events',
    title: 'Chef\'s Special Night',
    description: 'Monthly event featuring special menu items',
    image: '/images/gallery/event-2.jpg',
  },
  {
    id: 9,
    category: 'events',
    title: 'Wine Tasting Event',
    description: 'Wine pairing with our signature dishes',
    image: '/images/gallery/event-3.jpg',
  },
  {
    id: 10,
    category: 'food',
    title: 'Fresh Salad',
    description: 'Crisp greens with our house dressing',
    image: '/images/gallery/food-4.jpg',
  },
  {
    id: 11,
    category: 'food',
    title: 'Grilled Salmon',
    description: 'Perfectly grilled salmon with seasonal vegetables',
    image: '/images/gallery/food-5.jpg',
  },
  {
    id: 12,
    category: 'venue',
    title: 'Bar Area',
    description: 'Our well-stocked bar with expert bartenders',
    image: '/images/gallery/venue-4.jpg',
  },
];

export default function Gallery() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Gallery</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take a visual tour of our restaurant, delicious food, and special events. Get a glimpse of the Savory Delights experience.
          </p>
        </div>

        {/* Gallery Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button className="bg-amber-600 text-white px-4 py-2 rounded-full shadow-sm hover:bg-amber-700 transition-colors">
            All
          </button>
          <button className="bg-white px-4 py-2 rounded-full shadow-sm text-gray-700 hover:bg-amber-600 hover:text-white transition-colors">
            Food
          </button>
          <button className="bg-white px-4 py-2 rounded-full shadow-sm text-gray-700 hover:bg-amber-600 hover:text-white transition-colors">
            Venue
          </button>
          <button className="bg-white px-4 py-2 rounded-full shadow-sm text-gray-700 hover:bg-amber-600 hover:text-white transition-colors">
            Events
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
              <div className="relative h-64 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">Image</span>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="text-white text-center p-4">
                    <h3 className="text-lg font-semibold">{image.title}</h3>
                    <p className="text-sm">{image.description}</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{image.title}</h3>
                <p className="text-gray-600 text-sm">{image.category.charAt(0).toUpperCase() + image.category.slice(1)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}
