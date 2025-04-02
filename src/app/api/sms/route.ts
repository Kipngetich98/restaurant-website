import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import sms from '../../../lib/sms';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    if (!data.phoneNumber || !data.message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!sms.validatePhoneNumber(data.phoneNumber)) {
      return NextResponse.json(
        { message: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    let phoneNumber = data.phoneNumber;
    if (phoneNumber.startsWith('0')) {
      phoneNumber = '254' + phoneNumber.substring(1);
    }
    if (!phoneNumber.startsWith('254')) {
      phoneNumber = '254' + phoneNumber;
    }

    const notification = await prisma.smsNotification.create({
      data: {
        id: data.id || undefined,
        orderId: data.orderId || undefined,
        phoneNumber,
        message: data.message,
        status: 'pending', // Set as pending until sent
      },
    });

    try {
      const response = await sms.sendSMS(phoneNumber, data.message);
      
      await prisma.smsNotification.update({
        where: {
          id: notification.id,
        },
        data: {
          status: 'sent',
          metadata: JSON.stringify(response),
        },
      });
    } catch (error) {
      console.error('SMS API error:', error);
      
      await prisma.smsNotification.update({
        where: {
          id: notification.id,
        },
        data: {
          status: 'failed',
          metadata: JSON.stringify({ error: (error as Error).message }),
        },
      });
      
    }

    return NextResponse.json({
      success: true,
      message: 'SMS sent successfully',
      notificationId: notification.id,
    });
  } catch (error) {
    console.error('SMS sending error:', error);
    return NextResponse.json(
      { message: 'Failed to send SMS' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const status = searchParams.get('status');

    const where: any = {};
    
    if (orderId) {
      where.orderId = orderId;
    }
    
    if (status) {
      where.status = status;
    }

    const notifications = await prisma.smsNotification.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: 100, // Limit to 100 most recent
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.error('SMS fetch error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch SMS notifications' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const pendingNotifications = await prisma.smsNotification.findMany({
      where: {
        status: 'pending',
      },
      take: 10, // Process in batches
    });

    if (pendingNotifications.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No pending notifications to process',
        processed: 0,
      });
    }

    let processed = 0;
    let failed = 0;

    for (const notification of pendingNotifications) {
      try {
        const response = await sms.sendSMS(
          notification.phoneNumber,
          notification.message
        );

        await prisma.smsNotification.update({
          where: {
            id: notification.id,
          },
          data: {
            status: 'sent',
            metadata: JSON.stringify(response),
          },
        });

        processed++;
      } catch (error) {
        console.error(`Failed to send SMS ${notification.id}:`, error);
        
        await prisma.smsNotification.update({
          where: {
            id: notification.id,
          },
          data: {
            status: 'failed',
            metadata: JSON.stringify({ error: (error as Error).message }),
          },
        });

        failed++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${processed} notifications, ${failed} failed`,
      processed,
      failed,
    });
  } catch (error) {
    console.error('SMS processing error:', error);
    return NextResponse.json(
      { message: 'Failed to process SMS notifications' },
      { status: 500 }
    );
  }
}
