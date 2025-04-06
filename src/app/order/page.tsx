'use client';

import React, { useEffect, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../lib/cart';
import { convertToKES } from '../../lib/utils';
import MenuItemCard from '../../components/order/MenuItemCard';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string | null;
}

export default function OrderPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  
  useEffect(() => {
    const demoMenuItems: MenuItem[] = [
      {
        id: '1',
        name: 'Chicken Wings',
        description: 'Crispy wings tossed in your choice of sauce: BBQ, Buffalo, or Honey Garlic',
        price: 10.99,
        category: 'Appetizers',
        image: null
      },
      {
        id: '2',
        name: 'Garlic Bread',
        description: 'Freshly baked bread with garlic butter and herbs',
        price: 6.99,
        category: 'Appetizers',
        image: null
      },
      {
        id: '3',
        name: 'Mozzarella Sticks',
        description: 'Breaded mozzarella sticks served with marinara sauce',
        price: 8.99,
        category: 'Appetizers',
        image: null
      },
      {
        id: '4',
        name: 'Classic Burger',
        description: 'Juicy beef patty with lettuce, tomato, and our special sauce',
        price: 12.99,
        category: 'Burgers',
        image: null
      },
      {
        id: '5',
        name: 'Veggie Burger',
        description: 'Plant-based patty with avocado, sprouts, and vegan mayo',
        price: 14.99,
        category: 'Burgers',
        image: null
      },
      {
        id: '6',
        name: 'Margherita Pizza',
        description: 'Fresh mozzarella, tomatoes, and basil on our homemade crust',
        price: 16.99,
        category: 'Pizzas',
        image: null
      }
    ];
    
    setMenuItems(demoMenuItems);
    setLoading(false);
  }, []);
  
  const handleAddToCart = (item: MenuItem) => {
    console.log('Adding item to cart:', item);
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image || undefined,
    });
    
    alert('Item added to cart!');
  };
  
  const categories = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Order Online</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our menu and place your order for delivery or pickup. All orders are prepared fresh when you order.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(categories).map((category) => (
            <a
              key={category}
              href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-white px-4 py-2 rounded-full shadow-sm text-amber-600 hover:bg-amber-600 hover:text-white transition-colors"
            >
              {category}
            </a>
          ))}
        </div>

        {/* Menu Categories */}
        <div className="space-y-16">
          {Object.entries(categories).map(([category, items]) => (
            <div key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item) => (
                  <MenuItemCard 
                    key={item.id} 
                    item={{
                      id: item.id,
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
