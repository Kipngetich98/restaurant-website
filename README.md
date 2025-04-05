# Savory Delights Restaurant Website

A complete Next.js restaurant website with online food ordering, M-Pesa payment integration, and SMS notifications.

## Features

- Static pages (Home, Menu, About, Contact, Gallery, Special Offers)
- Online ordering system with cart functionality
- M-Pesa payment integration with STK push
- Africa's Talking SMS notification system
- Responsive design with Tailwind CSS

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- SQLite (for development) or PostgreSQL (for production)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Kipngetich98/restaurant-website.git
cd restaurant-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```
# Database
DATABASE_URL="file:./dev.db"

# M-Pesa API
MPESA_CONSUMER_KEY="your_consumer_key"
MPESA_CONSUMER_SECRET="your_consumer_secret"
MPESA_PASSKEY="your_passkey"
MPESA_SHORTCODE="your_shortcode"
MPESA_CALLBACK_URL="your_callback_url"

# Africa's Talking SMS API
AFRICAS_TALKING_API_KEY="your_api_key"
AFRICAS_TALKING_USERNAME="your_username"
AFRICAS_TALKING_SENDER_ID="your_sender_id"

# Restaurant Info
RESTAURANT_PHONE="254712345678"
```

For development purposes, you can use the SQLite database by setting `DATABASE_URL="file:./dev.db"`.

### 4. Generate Prisma client and run migrations

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Seed the database with sample data

```bash
npx prisma db seed
```

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Schema

The project uses Prisma ORM with the following models:
- MenuItem: Restaurant menu items
- Order: Customer orders
- OrderItem: Items in a customer's order
- MpesaTransaction: M-Pesa payment transactions
- SmsNotification: SMS notifications sent to customers and restaurant

## Payment Integration

The website integrates with M-Pesa Daraja API for payments:
- STK push implementation
- Transaction status checking
- Callback processing

## SMS Notifications

SMS notifications are handled through Africa's Talking API:
- Order confirmations
- Payment confirmations
- Order status updates

## Deployment

The project is configured for deployment on Vercel:
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy the application

For production, change the database provider to PostgreSQL in `prisma/schema.prisma` and update the `DATABASE_URL` environment variable.
