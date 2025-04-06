'use client';

import React from 'react';
import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useCart } from '../../lib/cart';
import { convertToKES } from '../../lib/utils';
import MenuItemCard from '../../components/order/MenuItemCard';


const menuCategories = [
  {
    id: 'appetizers',
    name: 'Appetizers',
    items: [
      {
        id: 1,
        name: 'Chicken Wings',
        description: 'Crispy wings tossed in your choice of sauce: BBQ, Buffalo, or Honey Garlic',
        price: 10.99,
        image: '/images/menu/chicken-wings.jpg',
      },
      {
        id: 2,
        name: 'Garlic Bread',
        description: 'Freshly baked bread with garlic butter and herbs',
        price: 6.99,
        image: '/images/menu/garlic-bread.jpg',
      },
      {
        id: 3,
        name: 'Mozzarella Sticks',
        description: 'Breaded mozzarella sticks served with marinara sauce',
        price: 8.99,
        image: '/images/menu/mozzarella-sticks.jpg',
      },
    ],
  },
  {
    id: 'burgers',
    name: 'Burgers',
    items: [
      {
        id: 4,
        name: 'Classic Burger',
        description: 'Juicy beef patty with lettuce, tomato, and our special sauce',
        price: 12.99,
        image: '/images/menu/classic-burger.jpg',
      },
      {
        id: 5,
        name: 'Veggie Burger',
        description: 'Plant-based patty with avocado, sprouts, and vegan mayo',
        price: 14.99,
        image: '/images/menu/veggie-burger.jpg',
      },
      {
        id: 6,
        name: 'Cheese Burger',
        description: 'Beef patty with cheddar cheese, pickles, and caramelized onions',
        price: 13.99,
        image: '/images/menu/cheese-burger.jpg',
      },
    ],
  },
  {
    id: 'pizzas',
    name: 'Pizzas',
    items: [
      {
        id: 7,
        name: 'Margherita Pizza',
        description: 'Fresh mozzarella, tomatoes, and basil on our homemade crust',
        price: 16.99,
        image: '/images/menu/margherita-pizza.jpg',
      },
      {
        id: 8,
        name: 'Pepperoni Pizza',
        description: 'Classic pepperoni and cheese on our homemade crust',
        price: 18.99,
        image: '/images/menu/pepperoni-pizza.jpg',
      },
      {
        id: 9,
        name: 'Vegetarian Pizza',
        description: 'Bell peppers, mushrooms, onions, olives, and cheese',
        price: 17.99,
        image: '/images/menu/vegetarian-pizza.jpg',
      },
    ],
  },
  {
    id: 'salads',
    name: 'Salads',
    items: [
      {
        id: 10,
        name: 'Caesar Salad',
        description: 'Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing',
        price: 8.99,
        image: '/images/menu/caesar-salad.jpg',
      },
      {
        id: 11,
        name: 'Greek Salad',
        description: 'Mixed greens, feta cheese, olives, tomatoes, and cucumber with olive oil dressing',
        price: 9.99,
        image: '/images/menu/greek-salad.jpg',
      },
    ],
  },
  {
    id: 'desserts',
    name: 'Desserts',
    items: [
      {
        id: 12,
        name: 'Chocolate Brownie',
        description: 'Warm chocolate brownie served with vanilla ice cream',
        price: 7.99,
        image: '/images/menu/chocolate-brownie.jpg',
      },
      {
        id: 13,
        name: 'Cheesecake',
        description: 'New York style cheesecake with berry compote',
        price: 8.99,
        image: '/images/menu/cheesecake.jpg',
      },
    ],
  },
  {
    id: 'drinks',
    name: 'Drinks',
    items: [
      {
        id: 14,
        name: 'Soda',
        description: 'Your choice of Coke, Sprite, or Fanta',
        price: 2.99,
        image: '/images/menu/soda.jpg',
      },
      {
        id: 15,
        name: 'Fresh Juice',
        description: 'Freshly squeezed orange, apple, or pineapple juice',
        price: 4.99,
        image: '/images/menu/fresh-juice.jpg',
      },
    ],
  },
];

export default function Menu() {
  const router = useRouter();
  
  const { addItem } = useCart();
  
  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id.toString(),
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image || undefined,
    });
    
    alert('Item added to cart!');
  };
  
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Menu</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our diverse menu featuring fresh ingredients and authentic flavors. Each dish is crafted with care by our experienced chefs.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {menuCategories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="bg-white px-4 py-2 rounded-full shadow-sm text-amber-600 hover:bg-amber-600 hover:text-white transition-colors"
            >
              {category.name}
            </a>
          ))}
        </div>

        {/* Menu Categories */}
        <div className="space-y-16">
          {menuCategories.map((category) => (
            <div key={category.id} id={category.id} className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6 text-center">{category.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((item) => (
                  <MenuItemCard 
                    key={item.id} 
                    item={{
                      id: item.id.toString(),
                      name: item.name,
                      description: item.description,
                      price: item.price,
                      image: item.image
                    }} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
