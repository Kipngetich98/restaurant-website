import axios from 'axios';

const MPESA_CONFIG = {
  consumerKey: process.env.MPESA_CONSUMER_KEY || 'your-consumer-key',
  consumerSecret: process.env.MPESA_CONSUMER_SECRET || 'your-consumer-secret',
  passKey: process.env.MPESA_PASS_KEY || 'your-pass-key',
  shortCode: process.env.MPESA_SHORT_CODE || '174379', // Safaricom test shortcode
  callbackUrl: process.env.MPESA_CALLBACK_URL || 'https://example.com/api/mpesa',
  transactionType: 'CustomerPayBillOnline',
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
};

const BASE_URL = MPESA_CONFIG.environment === 'production'
  ? 'https://api.safaricom.co.ke'
  : 'https://sandbox.safaricom.co.ke';

export async function getAccessToken() {
  try {
    const auth = Buffer.from(`${MPESA_CONFIG.consumerKey}:${MPESA_CONFIG.consumerSecret}`).toString('base64');
    
    const response = await axios({
      method: 'get',
      url: `${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
      headers: {
        'Authorization': `Basic ${auth}`,
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error generating M-Pesa access token:', error);
    throw new Error('Failed to generate M-Pesa access token');
  }
}

export async function initiateSTKPush(phoneNumber: string, amount: number, accountReference: string, transactionDesc: string = 'Payment for order') {
  try {
    if (phoneNumber.startsWith('0')) {
      phoneNumber = '254' + phoneNumber.substring(1);
    }
    if (!phoneNumber.startsWith('254')) {
      phoneNumber = '254' + phoneNumber;
    }

    const accessToken = await getAccessToken();

    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    
    const password = Buffer.from(
      `${MPESA_CONFIG.shortCode}${MPESA_CONFIG.passKey}${timestamp}`
    ).toString('base64');

    const data = {
      BusinessShortCode: MPESA_CONFIG.shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: MPESA_CONFIG.transactionType,
      Amount: Math.round(amount),
      PartyA: phoneNumber,
      PartyB: MPESA_CONFIG.shortCode,
      PhoneNumber: phoneNumber,
      CallBackURL: MPESA_CONFIG.callbackUrl,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc,
    };

    const response = await axios({
      method: 'post',
      url: `${BASE_URL}/mpesa/stkpush/v1/processrequest`,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data,
    });

    return response.data;
  } catch (error) {
    console.error('Error initiating STK push:', error);
    throw new Error('Failed to initiate M-Pesa payment');
  }
}

export async function checkTransactionStatus(checkoutRequestId: string) {
  try {
    const accessToken = await getAccessToken();

    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    
    const password = Buffer.from(
      `${MPESA_CONFIG.shortCode}${MPESA_CONFIG.passKey}${timestamp}`
    ).toString('base64');

    const data = {
      BusinessShortCode: MPESA_CONFIG.shortCode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId,
    };

    const response = await axios({
      method: 'post',
      url: `${BASE_URL}/mpesa/stkpushquery/v1/query`,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data,
    });

    return response.data;
  } catch (error) {
    console.error('Error checking transaction status:', error);
    throw new Error('Failed to check M-Pesa transaction status');
  }
}

export function processCallback(callbackData: any) {
  try {
    const { Body } = callbackData;
    
    if (!Body || !Body.stkCallback) {
      throw new Error('Invalid callback data structure');
    }
    
    const { ResultCode, ResultDesc, CallbackMetadata } = Body.stkCallback;
    
    const isSuccessful = ResultCode === 0;
    
    let transactionDetails: any = null;
    
    if (isSuccessful && CallbackMetadata && CallbackMetadata.Item) {
      const items = CallbackMetadata.Item;
      
      transactionDetails = {
        amount: items.find((item: any) => item.Name === 'Amount')?.Value,
        mpesaReceiptNumber: items.find((item: any) => item.Name === 'MpesaReceiptNumber')?.Value,
        transactionDate: items.find((item: any) => item.Name === 'TransactionDate')?.Value,
        phoneNumber: items.find((item: any) => item.Name === 'PhoneNumber')?.Value,
      };
    }
    
    return {
      isSuccessful,
      resultCode: ResultCode,
      resultDesc: ResultDesc,
      transactionDetails,
    };
  } catch (error) {
    console.error('Error processing M-Pesa callback:', error);
    throw new Error('Failed to process M-Pesa callback data');
  }
}

export function validateTransaction(transaction: any) {
  if (!transaction) {
    return {
      isValid: false,
      error: 'Transaction not found',
    };
  }
  
  if (transaction.status !== 'completed') {
    return {
      isValid: false,
      error: `Transaction status is ${transaction.status}`,
    };
  }
  
  if (!transaction.transactionId) {
    return {
      isValid: false,
      error: 'Transaction does not have a valid receipt number',
    };
  }
  
  return {
    isValid: true,
  };
}

export default {
  getAccessToken,
  initiateSTKPush,
  checkTransactionStatus,
  processCallback,
  validateTransaction,
};
