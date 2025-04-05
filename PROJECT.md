# Savory Delights Restaurant Website - Project Overview

## Project Description

Savory Delights Restaurant Website is a comprehensive Next.js application that combines static content with dynamic functionality for online food ordering. The website serves as both an informational platform for the restaurant and a fully functional e-commerce system for customers to order food online.

## Technical Architecture

### Frontend
- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS for responsive design
- **State Management**: Zustand for cart state management
- **Components**: React components with 'use client' directives where needed

### Backend
- **API Routes**: Next.js API routes for handling orders, payments, and SMS
- **Database**: Prisma ORM with SQLite (development) or PostgreSQL (production)
- **Authentication**: Guest checkout (no login required)

### Integrations
- **Payment Processing**: M-Pesa Daraja API with STK push
- **Notifications**: Africa's Talking SMS API

## Key Features

### Static Pages
- **Home Page**: Restaurant showcase with hero section and featured items
- **Menu Page**: Complete menu with categories, photos, and descriptions
- **About Us**: Restaurant history and story
- **Contact**: Location map, contact form, and hours of operation
- **Gallery**: Photo gallery of food and venue
- **Special Offers**: Current promotions and deals

### Online Ordering System
- **Menu Browsing**: Filter and browse menu items by category
- **Cart Management**: Add, remove, and update quantities
- **Checkout Process**: Delivery details and payment information
- **Order Confirmation**: Order summary with unique ID
- **Order Tracking**: Check order status

### Payment System
- **M-Pesa Integration**: STK push for mobile payments
- **Transaction Handling**: Process payment callbacks
- **Status Checking**: Verify payment status
- **Error Handling**: Handle failed payments and timeouts

### Notification System
- **Customer Notifications**: Order confirmation and status updates
- **Restaurant Notifications**: New order alerts
- **SMS Templates**: Different templates for various notification types

## Database Schema

### Models
1. **MenuItem**
   - Properties: id, name, description, price, image, category, featured
   - Relationships: Has many OrderItems

2. **Order**
   - Properties: id, customerName, customerEmail, customerPhone, deliveryAddress, totalAmount, status, paymentMethod, paymentStatus, transactionId
   - Relationships: Has many OrderItems

3. **OrderItem**
   - Properties: id, quantity, price
   - Relationships: Belongs to Order and MenuItem

4. **MpesaTransaction**
   - Properties: id, orderId, phoneNumber, amount, transactionId, transactionDate, status, resultCode, resultDescription
   - Relationships: Associated with an Order

5. **SmsNotification**
   - Properties: id, orderId, phoneNumber, message, status, messageId, metadata
   - Relationships: Associated with an Order

## Setup and Deployment

### Local Development
1. Clone the repository
2. Install dependencies with `npm install`
3. Set up environment variables in `.env` file
4. Generate Prisma client with `npx prisma generate`
5. Run migrations with `npx prisma migrate dev`
6. Seed the database with `npx prisma db seed`
7. Start the development server with `npm run dev`

### Production Deployment
1. Configure PostgreSQL database
2. Update environment variables for production
3. Deploy to Vercel or similar platform
4. Set up webhook URLs for M-Pesa callbacks

## Security Considerations
- Secure storage of API keys in environment variables
- Data validation and sanitization for all inputs
- CSRF protection for form submissions
- Rate limiting for payment endpoints
- Logging for payment transactions

## Future Enhancements
- User authentication and accounts
- Order history for returning customers
- Admin dashboard for restaurant management
- Real-time order tracking
- Integration with delivery services
- Multiple payment options
