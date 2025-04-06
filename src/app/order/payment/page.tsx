'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiCheck, FiAlertTriangle, FiClock, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../../../lib/cart';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { clearCart } = useCart();
  
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed' | 'failed'>('pending');
  const [countdown, setCountdown] = useState(120); // 2 minutes countdown

  useEffect(() => {
    if (!orderId) {
      router.push('/order/cart');
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders?id=${orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        const data = await response.json();
        setOrder(data);
        setPaymentStatus(data.paymentStatus === 'completed' ? 'completed' : 'pending');
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();

    const timer = setTimeout(() => {
      setPaymentStatus('processing');
      
      setTimeout(() => {
        setPaymentStatus('completed');
        clearCart(); // Clear cart on successful payment
      }, 5000);
    }, 3000);

    return () => clearTimeout(timer);
  }, [orderId, router, clearCart]);

  useEffect(() => {
    if (paymentStatus === 'pending' || paymentStatus === 'processing') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            if (paymentStatus === 'pending' || paymentStatus === 'processing') {
              setPaymentStatus('failed');
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [paymentStatus]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleRetry = async () => {
    setPaymentStatus('pending');
    setCountdown(120);
    
    setTimeout(() => {
      setPaymentStatus('processing');
      
      setTimeout(() => {
        setPaymentStatus('completed');
        clearCart(); // Clear cart on successful payment
      }, 5000);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="bg-gray-50 py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-bold mb-2">Loading Payment Details</h2>
            <p className="text-gray-600">Please wait while we prepare your payment...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <div className="bg-red-100 p-3 rounded-full inline-flex items-center justify-center mb-4">
                <FiAlertTriangle className="text-red-600 text-2xl" />
              </div>
              <h2 className="text-xl font-bold mb-2">Error</h2>
              <p className="text-gray-600">{error}</p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => router.push('/order/cart')}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center"
              >
                <FiArrowLeft className="mr-2" /> Return to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="text-center mb-8">
              {paymentStatus === 'pending' && (
                <>
                  <div className="bg-amber-100 p-3 rounded-full inline-flex items-center justify-center mb-4">
                    <FiClock className="text-amber-600 text-2xl" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Waiting for Payment</h2>
                  <p className="text-gray-600 mb-4">
                    Please check your phone for the M-Pesa payment request and complete the payment.
                  </p>
                  <div className="bg-gray-100 rounded-full px-4 py-2 inline-block">
                    <span className="font-medium">Time remaining: {formatTime(countdown)}</span>
                  </div>
                </>
              )}

              {paymentStatus === 'processing' && (
                <>
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
                  <h2 className="text-xl font-bold mb-2">Processing Payment</h2>
                  <p className="text-gray-600">
                    We're confirming your payment. This will only take a moment...
                  </p>
                </>
              )}

              {paymentStatus === 'completed' && (
                <>
                  <div className="bg-green-100 p-3 rounded-full inline-flex items-center justify-center mb-4">
                    <FiCheck className="text-green-600 text-2xl" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Payment Successful!</h2>
                  <p className="text-gray-600 mb-4">
                    Your order has been confirmed and is being prepared.
                  </p>
                  <div className="bg-gray-100 rounded-md p-4 inline-block text-left">
                    <p className="font-medium">Order ID: {orderId}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      You will receive an SMS confirmation shortly.
                    </p>
                  </div>
                </>
              )}

              {paymentStatus === 'failed' && (
                <>
                  <div className="bg-red-100 p-3 rounded-full inline-flex items-center justify-center mb-4">
                    <FiAlertTriangle className="text-red-600 text-2xl" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Payment Failed</h2>
                  <p className="text-gray-600 mb-4">
                    We couldn't confirm your payment. Please try again or choose a different payment method.
                  </p>
                  <button
                    onClick={handleRetry}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                  >
                    Try Again
                  </button>
                </>
              )}
            </div>

            {order && (
              <div>
                <h3 className="font-semibold mb-3 border-b pb-2">Order Summary</h3>
                <div className="space-y-2 mb-4">
                  {order.orderItems.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.menuItem?.name || 'Item'} x {item.quantity}
                      </span>
                      <span>KES {(item.price * item.quantity * 150).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>KES {(order.totalAmount * 150).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-center">
            {paymentStatus === 'completed' ? (
              <button
                onClick={() => router.push('/')}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Return to Home
              </button>
            ) : (
              <button
                onClick={() => router.push('/order/cart')}
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                <FiArrowLeft className="inline mr-2" /> Return to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
