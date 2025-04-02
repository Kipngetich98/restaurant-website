import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    if (!data.customerName || !data.customerPhone || !data.deliveryAddress || !data.totalAmount || !data.orderItems || data.orderItems.length === 0) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        id: uuidv4(),
        customerName: data.customerName,
        customerEmail: data.customerEmail || null,
        customerPhone: data.customerPhone,
        deliveryAddress: data.deliveryAddress,
        totalAmount: data.totalAmount,
        status: 'pending',
        paymentMethod: data.paymentMethod || 'mpesa',
        paymentStatus: 'pending',
        orderItems: {
          create: data.orderItems.map((item: any) => ({
            id: uuidv4(),
            quantity: item.quantity,
            price: item.price,
            menuItemId: item.menuItemId,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });

    const mpesaTransaction = await prisma.mpesaTransaction.create({
      data: {
        id: uuidv4(),
        orderId: order.id,
        phoneNumber: data.customerPhone,
        amount: data.totalAmount,
        status: 'pending',
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { message: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('id');

    if (orderId) {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          orderItems: {
            include: {
              menuItem: true,
            },
          },
        },
      });

      if (!order) {
        return NextResponse.json(
          { message: 'Order not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(order);
    } else {
      const orders = await prisma.order.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          orderItems: true,
        },
      });

      return NextResponse.json(orders);
    }
  } catch (error) {
    console.error('Order fetch error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
