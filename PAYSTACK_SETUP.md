# Paystack Payment Integration Setup

This project now includes Paystack payment integration for table reservations. Follow these steps to complete the setup:

## 1. Environment Variables

Add the following environment variables to your `.env.local` file:

```bash
# Paystack Public Key (for client-side)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx

# Paystack Secret Key (for server-side, stored in Convex)
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
```

### Getting Your Paystack Keys

1. Sign up or log in to [Paystack Dashboard](https://dashboard.paystack.com/)
2. Go to Settings → API Keys & Webhooks
3. Copy your **Public Key** (starts with `pk_test_` for test mode or `pk_live_` for live mode)
4. Copy your **Secret Key** (starts with `sk_test_` for test mode or `sk_live_` for live mode)

### Setting Paystack Secret Key in Convex

The `PAYSTACK_SECRET_KEY` needs to be set in your Convex dashboard:

1. Go to your Convex dashboard
2. Navigate to Settings → Environment Variables
3. Add `PAYSTACK_SECRET_KEY` with your secret key value

Alternatively, you can set it via CLI:
```bash
npx convex env set PAYSTACK_SECRET_KEY sk_test_xxxxxxxxxxxxx
```

## 2. Generate Convex Types

After adding the new Convex functions, you need to regenerate the TypeScript types:

```bash
npm run convex:codegen
```

Or if you're running the dev server:
```bash
npm run convex:dev
```

This will generate the types for the new `payments` and `reservations` functions.

## 3. Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to a club event page (e.g., `/club/waved`)

3. Click on an available table (white icon)

4. Fill in the reservation form:
   - Full Name
   - Email
   - Phone Number

5. Click "Reserve Your Table" - this will open the Paystack payment popup

6. Use Paystack test cards for testing:
   - **Card Number**: 4084084084084081
   - **CVV**: Any 3 digits
   - **Expiry**: Any future date
   - **PIN**: Any 4 digits

## How It Works

1. **User clicks "Reserve Your Table"** → Form appears
2. **User fills in details** → Name, Email, Phone
3. **User submits form** → Payment initialization:
   - Creates a pending reservation in Convex
   - Initializes Paystack payment
   - Opens Paystack payment popup
4. **User completes payment** → Payment verification:
   - Verifies payment with Paystack
   - Updates reservation status to "success"
   - Table is marked as reserved (red icon)
   - Modal closes automatically

## Database Schema

The integration adds a new `reservations` table to your Convex schema with the following fields:

- `eventId`: The event identifier
- `tableNumber`: The table number being reserved
- `customerName`: Customer's full name
- `customerEmail`: Customer's email
- `customerPhone`: Customer's phone number
- `reservationFee`: The reservation fee amount
- `minimumSpendPerSeat`: Minimum spend per seat
- `paymentReference`: Unique Paystack payment reference
- `paymentStatus`: "pending" | "success" | "failed"
- `createdAt`: Timestamp of reservation creation

## Troubleshooting

### "PAYSTACK_SECRET_KEY is not configured"
- Make sure you've set the environment variable in Convex dashboard
- Restart your Convex dev server after setting the variable

### "Property 'initializePayment' does not exist"
- Run `npm run convex:codegen` to regenerate types
- Make sure `convex/payments.ts` is properly saved

### Payment popup doesn't open
- Check that `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` is set in `.env.local`
- Check browser console for errors
- Make sure the Paystack inline script is loading

### Payment succeeds but table doesn't show as reserved
- Check Convex dashboard logs for errors
- Verify the payment verification is completing successfully
- Check that the reservation query is working correctly

