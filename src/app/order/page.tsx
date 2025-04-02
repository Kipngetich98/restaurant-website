import React from 'react';
import { prisma } from '../../lib/db';
import MenuItemCard from '../../components/order/MenuItemCard';

export const metadata = {
  title: 'Savory Delights | Order Online',
  description: 'Order your favorite meals online from Savory Delights Restaurant. Fast delivery and easy checkout.',
  keywords: 'food ordering, online order, restaurant delivery, Nairobi restaurant',
};

export default async function OrderPage() {
  const menuItems = await prisma.menuItem.findMany({
    orderBy: {
      category: 'asc',
    },
  });

  const categories = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);

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
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
