import axios from 'axios';

const SMS_CONFIG = {
  apiKey: process.env.AFRICAS_TALKING_API_KEY || 'your-api-key',
  username: process.env.AFRICAS_TALKING_USERNAME || 'sandbox',
  senderId: process.env.AFRICAS_TALKING_SENDER_ID || '',
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
};

const BASE_URL = SMS_CONFIG.environment === 'production'
  ? 'https://api.africastalking.com/version1'
  : 'https://api.sandbox.africastalking.com/version1';

export async function sendSMS(phoneNumber: string, message: string) {
  try {
    if (phoneNumber.startsWith('0')) {
      phoneNumber = '254' + phoneNumber.substring(1);
    }
    if (!phoneNumber.startsWith('+')) {
      phoneNumber = '+' + phoneNumber;
    }

    const data = {
      username: SMS_CONFIG.username,
      to: phoneNumber,
      message,
      from: SMS_CONFIG.senderId || undefined,
    };

    const response = await axios({
      method: 'post',
      url: `${BASE_URL}/messaging`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'apiKey': SMS_CONFIG.apiKey,
      },
      data: new URLSearchParams(data as Record<string, string>),
    });

    return response.data;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw new Error('Failed to send SMS');
  }
}

export const SMS_TEMPLATES = {
  orderConfirmation: (orderNumber: string, amount: number) => 
    `Thank you for your order #${orderNumber} at Savory Delights. Your order is being prepared and will be delivered soon. Total: KES ${amount}`,
  
  paymentConfirmation: (orderNumber: string, amount: number, transactionId: string) => 
    `Payment of KES ${amount} for order #${orderNumber} has been received. Transaction ID: ${transactionId}. Thank you for choosing Savory Delights!`,
  
  orderReady: (orderNumber: string) => 
    `Good news! Your order #${orderNumber} from Savory Delights is ready and on its way to you. Enjoy your meal!`,
  
  orderDelivered: (orderNumber: string) => 
    `Your order #${orderNumber} has been delivered. We hope you enjoy your meal! Please rate your experience with Savory Delights.`,
  
  newOrder: (orderNumber: string, amount: number, items: number, customerPhone: string) => 
    `New order #${orderNumber} received. Amount: KES ${amount}, Items: ${items}. Customer phone: ${customerPhone}. Please prepare the order.`,
  
  paymentReceived: (orderNumber: string, amount: number) => 
    `Payment of KES ${amount} received for order #${orderNumber}. Order is ready to be processed.`,
};

export async function processSMSQueue() {
  try {
    
    console.log('Processing SMS queue...');
    
    return {
      success: true,
      processed: 0,
      failed: 0,
    };
  } catch (error) {
    console.error('Error processing SMS queue:', error);
    throw new Error('Failed to process SMS queue');
  }
}

export function validatePhoneNumber(phoneNumber: string) {
  if (!phoneNumber) {
    return false;
  }
  
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  
  if (digitsOnly.startsWith('254') && digitsOnly.length === 12) {
    return true;
  }
  
  if (digitsOnly.startsWith('0') && digitsOnly.length === 10) {
    return true;
  }
  
  if (digitsOnly.length === 9 && !digitsOnly.startsWith('0')) {
    return true;
  }
  
  return false;
}

export default {
  sendSMS,
  SMS_TEMPLATES,
  processSMSQueue,
  validatePhoneNumber,
};
