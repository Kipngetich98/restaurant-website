import React from 'react';
import { FiShoppingCart, FiPlus, FiMinus } from 'react-icons/fi';
import { MenuItem } from '@prisma/client';
import { useCart } from '../../lib/cart';

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 bg-gray-300 flex items-center justify-center">
        <span className="text-gray-500">Image</span>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <span className="text-amber-600 font-medium">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        <button
          onClick={handleAddToCart}
          className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          <FiShoppingCart className="mr-2" /> Add to Cart
        </button>
      </div>
    </div>
  );
}
