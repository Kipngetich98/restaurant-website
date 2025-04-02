'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '@/lib/cart';

const checkoutSchema = z.object({
  customerName: z.string().min(3, 'Name must be at least 3 characters'),
  customerEmail: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  customerPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
  deliveryAddress: z.string().min(10, 'Address must be at least 10 characters'),
  paymentMethod: z.enum(['mpesa']),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'mpesa',
    },
  });

  React.useEffect(() => {
    if (items.length === 0) {
      router.push('/order/cart');
    }
  }, [items, router]);

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const orderItems = items.map((item) => ({
        menuItemId: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          totalAmount: getTotalPrice(),
          orderItems,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create order');
      }

      const order = await response.json();
      
      router.push(`/order/payment?orderId=${order.id}`);
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Checkout</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete your order by providing your delivery details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Delivery Details</h2>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="customerName" className="block text-gray-700 font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="customerName"
                      {...register('customerName')}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.customerName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Your Full Name"
                    />
                    {errors.customerName && (
                      <p className="text-red-500 text-sm mt-1">{errors.customerName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="customerEmail" className="block text-gray-700 font-medium mb-2">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      id="customerEmail"
                      {...register('customerEmail')}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.customerEmail ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Your Email"
                    />
                    {errors.customerEmail && (
                      <p className="text-red-500 text-sm mt-1">{errors.customerEmail.message}</p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="customerPhone" className="block text-gray-700 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="customerPhone"
                    {...register('customerPhone')}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.customerPhone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Your Phone Number (for delivery and payment)"
                  />
                  {errors.customerPhone && (
                    <p className="text-red-500 text-sm mt-1">{errors.customerPhone.message}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label htmlFor="deliveryAddress" className="block text-gray-700 font-medium mb-2">
                    Delivery Address
                  </label>
                  <textarea
                    id="deliveryAddress"
                    {...register('deliveryAddress')}
                    rows={3}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.deliveryAddress ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Your Full Delivery Address"
                  ></textarea>
                  {errors.deliveryAddress && (
                    <p className="text-red-500 text-sm mt-1">{errors.deliveryAddress.message}</p>
                  )}
                </div>

                <div className="mb-8">
                  <label className="block text-gray-700 font-medium mb-2">Payment Method</label>
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="mpesa"
                        value="mpesa"
                        {...register('paymentMethod')}
                        className="mr-2"
                        checked
                        readOnly
                      />
                      <label htmlFor="mpesa" className="flex items-center cursor-pointer">
                        <span className="font-medium">M-Pesa</span>
                        <span className="ml-2 text-sm text-gray-500">
                          (You'll receive an STK push to complete payment)
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => router.push('/order/cart')}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-medium transition-colors flex items-center"
                  >
                    <FiArrowLeft className="mr-2" /> Back to Cart
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center"
                  >
                    {isSubmitting ? 'Processing...' : 'Continue to Payment'}
                    {!isSubmitting && <FiArrowRight className="ml-2" />}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
