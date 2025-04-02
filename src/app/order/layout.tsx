'use client';

import React from 'react';
import { CartProvider } from '../../components/order/CartProvider';

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CartProvider>{children}</CartProvider>;
}
