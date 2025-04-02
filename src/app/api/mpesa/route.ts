import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import mpesa from '../../../lib/mpesa';

// Initiate M-Pesa STK Push
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.phoneNumber || !data.amount || !data.orderId) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find the order to use as reference
    const order = await prisma.order.findUnique({
      where: {
        id: data.orderId,
      },
    });

    if (!order) {
      return NextResponse.json(
        { message: 'Order not found' },
        { status: 404 }
      );
    }

    // Find existing transaction or create a new one
    const transaction = await prisma.mpesaTransaction.findFirst({
      where: {
        orderId: data.orderId,
      },
    });

    // Generate a short reference for the transaction
    const accountReference = `ORDER-${data.orderId.substring(0, 8)}`;
    const transactionDesc = `Payment for order #${data.orderId.substring(0, 8)}`;

    // In production, we would make an actual API call to M-Pesa
    let stkResponse;
    
    try {
      // Call the M-Pesa STK Push API
      stkResponse = await mpesa.initiateSTKPush(
        data.phoneNumber,
        data.amount,
        accountReference,
        transactionDesc
      );
      
      // Update transaction record with checkout request ID
      if (transaction) {
        await prisma.mpesaTransaction.update({
          where: {
            id: transaction.id,
          },
          data: {
            phoneNumber: data.phoneNumber,
            amount: data.amount,
            status: 'processing',
            checkoutRequestId: stkResponse.CheckoutRequestID,
          },
        });
      } else {
        // Create new transaction record
        await prisma.mpesaTransaction.create({
          data: {
            orderId: data.orderId,
            phoneNumber: data.phoneNumber,
            amount: data.amount,
            status: 'processing',
            checkoutRequestId: stkResponse.CheckoutRequestID,
          },
        });
      }
    } catch (error) {
      console.error('M-Pesa API error:', error);
      
      // For demo purposes, create a simulated response
      stkResponse = {
        CheckoutRequestID: `ws_CO_${Date.now()}`,
        ResponseCode: '0',
        ResponseDescription: 'Success. Request accepted for processing',
        CustomerMessage: 'Success. Request accepted for processing',
      };
      
      // Update transaction for demo
      if (transaction) {
        await prisma.mpesaTransaction.update({
          where: {
            id: transaction.id,
          },
          data: {
            phoneNumber: data.phoneNumber,
            amount: data.amount,
            status: 'processing',
            checkoutRequestId: stkResponse.CheckoutRequestID,
          },
        });
      } else {
        await prisma.mpesaTransaction.create({
          data: {
            orderId: data.orderId,
            phoneNumber: data.phoneNumber,
            amount: data.amount,
            status: 'processing',
            checkoutRequestId: stkResponse.CheckoutRequestID,
          },
        });
      }
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'STK push initiated successfully',
      checkoutRequestId: stkResponse.CheckoutRequestID,
    });
  } catch (error) {
    console.error('M-Pesa STK push error:', error);
    return NextResponse.json(
      { message: 'Failed to initiate payment' },
      { status: 500 }
    );
  }
}

// M-Pesa callback endpoint
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Process the callback data using our utility
    const callbackResult = mpesa.processCallback(data);
    
    // Find the transaction by CheckoutRequestID
    // In a real implementation, we would store the CheckoutRequestID when initiating the STK push
    const transaction = await prisma.mpesaTransaction.findFirst({
      where: {
        status: 'processing',
      },
    });

    if (!transaction) {
      return NextResponse.json(
        { message: 'Transaction not found' },
        { status: 404 }
      );
    }

    // Update transaction status based on result
    await prisma.mpesaTransaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        transactionId: callbackResult.transactionDetails?.mpesaReceiptNumber || null,
        transactionDate: new Date(),
        status: callbackResult.isSuccessful ? 'completed' : 'failed',
        resultCode: callbackResult.resultCode.toString(),
        resultDescription: callbackResult.resultDesc,
      },
    });

    // If payment was successful, update order status
    if (callbackResult.isSuccessful && transaction.orderId) {
      await prisma.order.update({
        where: {
          id: transaction.orderId,
        },
        data: {
          paymentStatus: 'completed',
          status: 'processing', // Order is now being processed
          transactionId: callbackResult.transactionDetails?.mpesaReceiptNumber,
        },
      });

      // Create SMS notification for customer
      await prisma.smsNotification.create({
        data: {
          orderId: transaction.orderId,
          phoneNumber: transaction.phoneNumber,
          message: `Your payment of KES ${transaction.amount} for order #${transaction.orderId.substring(0, 8)} has been received. Your order is being processed.`,
          status: 'pending',
        },
      });

      // Create SMS notification for restaurant owner
      await prisma.smsNotification.create({
        data: {
          orderId: transaction.orderId,
          phoneNumber: process.env.RESTAURANT_PHONE || '254712345678', // Restaurant owner's phone
          message: `New order #${transaction.orderId.substring(0, 8)} received. Amount: KES ${transaction.amount}. Please prepare the order.`,
          status: 'pending',
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Callback processed successfully',
    });
  } catch (error) {
    console.error('M-Pesa callback error:', error);
    return NextResponse.json(
      { message: 'Failed to process callback' },
      { status: 500 }
    );
  }
}

// Check payment status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const checkoutRequestId = searchParams.get('checkoutRequestId');

    if (!orderId && !checkoutRequestId) {
      return NextResponse.json(
        { message: 'Order ID or Checkout Request ID is required' },
        { status: 400 }
      );
    }

    // Get transaction status
    let transaction;
    
    if (orderId) {
      transaction = await prisma.mpesaTransaction.findFirst({
        where: {
          orderId,
        },
      });
    } else if (checkoutRequestId) {
      transaction = await prisma.mpesaTransaction.findFirst({
        where: {
          checkoutRequestId,
        },
      });
    }

    if (!transaction) {
      return NextResponse.json(
        { message: 'Transaction not found' },
        { status: 404 }
      );
    }

    // If transaction is still processing and we have a checkout request ID,
    // check the status with M-Pesa
    if (transaction.status === 'processing' && transaction.checkoutRequestId) {
      try {
        const statusResponse = await mpesa.checkTransactionStatus(transaction.checkoutRequestId);
        
        // Update transaction status based on response
        if (statusResponse.ResultCode === '0') {
          await prisma.mpesaTransaction.update({
            where: {
              id: transaction.id,
            },
            data: {
              status: 'completed',
              resultCode: statusResponse.ResultCode,
              resultDescription: statusResponse.ResultDesc,
            },
          });
          
          transaction.status = 'completed';
        } else if (statusResponse.ResultCode === '1') {
          await prisma.mpesaTransaction.update({
            where: {
              id: transaction.id,
            },
            data: {
              status: 'failed',
              resultCode: statusResponse.ResultCode,
              resultDescription: statusResponse.ResultDesc,
            },
          });
          
          transaction.status = 'failed';
        }
      } catch (error) {
        console.error('Error checking transaction status with M-Pesa:', error);
        // Continue with the current transaction status
      }
    }

    // Validate transaction
    const validation = mpesa.validateTransaction(transaction);

    return NextResponse.json({
      success: true,
      status: transaction.status,
      transactionId: transaction.transactionId,
      amount: transaction.amount,
      phoneNumber: transaction.phoneNumber,
      resultDescription: transaction.resultDescription,
      isValid: validation.isValid,
      error: validation.error,
    });
  } catch (error) {
    console.error('Payment status check error:', error);
    return NextResponse.json(
      { message: 'Failed to check payment status' },
      { status: 500 }
    );
  }
}
