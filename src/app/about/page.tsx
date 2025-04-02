import React from 'react';
import { FiClock, FiAward, FiUsers } from 'react-icons/fi';

export const metadata = {
  title: 'Savory Delights | About Us',
  description: 'Learn about the history and story of Savory Delights Restaurant. Our journey, values, and commitment to quality.',
  keywords: 'restaurant history, about us, restaurant story, Nairobi restaurant',
};

export default function About() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Story</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Discover the journey of Savory Delights, from a small family kitchen to one of the most beloved restaurants in Nairobi.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Beginning</h2>
              <p className="text-gray-600 mb-4">
                Savory Delights was founded in 2010 by Chef James Mwangi, whose passion for cooking began in his grandmother's kitchen. After years of culinary training and working in prestigious restaurants across Africa and Europe, Chef Mwangi returned to his homeland with a vision to create a dining experience that celebrates local ingredients with international techniques.
              </p>
              <p className="text-gray-600">
                What started as a small café with just five tables has grown into one of Nairobi's most beloved dining destinations. Despite our growth, we remain committed to the same principles that guided us from day one: quality ingredients, authentic flavors, and exceptional service.
              </p>
            </div>
            <div className="bg-gray-300 h-64 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Restaurant Image</span>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward className="text-amber-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-gray-600">
                We source the freshest ingredients from local farmers and suppliers, ensuring that every dish meets our high standards.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="text-amber-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">
                We believe in supporting our local community through partnerships with local producers and participation in community events.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiClock className="text-amber-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tradition</h3>
              <p className="text-gray-600">
                While we embrace innovation, we honor traditional cooking methods and recipes that have been passed down through generations.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-300 h-64 flex items-center justify-center">
                <span className="text-gray-500">Chef Image</span>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold mb-1">James Mwangi</h3>
                <p className="text-amber-600 mb-2">Founder & Head Chef</p>
                <p className="text-gray-600 text-sm">
                  With over 20 years of culinary experience, Chef Mwangi brings his passion for authentic flavors to every dish.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-300 h-64 flex items-center justify-center">
                <span className="text-gray-500">Chef Image</span>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold mb-1">Sarah Ochieng</h3>
                <p className="text-amber-600 mb-2">Executive Chef</p>
                <p className="text-gray-600 text-sm">
                  Chef Sarah specializes in fusion cuisine, blending traditional African flavors with international techniques.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-300 h-64 flex items-center justify-center">
                <span className="text-gray-500">Manager Image</span>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold mb-1">David Kamau</h3>
                <p className="text-amber-600 mb-2">Restaurant Manager</p>
                <p className="text-gray-600 text-sm">
                  With his keen attention to detail and commitment to customer satisfaction, David ensures a memorable dining experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Our Milestones</h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 font-bold text-amber-600 mb-2 md:mb-0">2010</div>
                <div className="md:w-3/4">
                  <h3 className="font-semibold mb-2">Savory Delights Opens Its Doors</h3>
                  <p className="text-gray-600">
                    Our first location opened with just five tables and a small menu of family recipes.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 font-bold text-amber-600 mb-2 md:mb-0">2013</div>
                <div className="md:w-3/4">
                  <h3 className="font-semibold mb-2">Expansion to Current Location</h3>
                  <p className="text-gray-600">
                    Due to growing popularity, we moved to our current, larger location to accommodate more guests.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 font-bold text-amber-600 mb-2 md:mb-0">2016</div>
                <div className="md:w-3/4">
                  <h3 className="font-semibold mb-2">Best Restaurant Award</h3>
                  <p className="text-gray-600">
                    Savory Delights was recognized as the "Best Restaurant in Nairobi" by the National Culinary Association.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 font-bold text-amber-600 mb-2 md:mb-0">2020</div>
                <div className="md:w-3/4">
                  <h3 className="font-semibold mb-2">10th Anniversary & Online Ordering</h3>
                  <p className="text-gray-600">
                    We celebrated our 10th anniversary and launched our online ordering system to better serve our customers.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 font-bold text-amber-600 mb-2 md:mb-0">2023</div>
                <div className="md:w-3/4">
                  <h3 className="font-semibold mb-2">Sustainable Dining Initiative</h3>
                  <p className="text-gray-600">
                    We implemented eco-friendly practices and committed to sourcing 80% of our ingredients from local, sustainable farms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
