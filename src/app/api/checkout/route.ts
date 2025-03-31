import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16', // Use the latest API version
});

export async function POST(request: Request) {
  try {
    const { plan } = await request.json();

    // Define pricing plans and their Stripe price IDs
    const plans = {
      basic: {
        name: 'Basic Plan',
        price_id: process.env.STRIPE_PRICE_BASIC,
        amount: 999, // €9.99 in cents
      },
      pro: {
        name: 'Pro Plan',
        price_id: process.env.STRIPE_PRICE_PRO,
        amount: 1499, // €14.99 in cents
      },
      ultimate: {
        name: 'Ultimate Plan',
        price_id: process.env.STRIPE_PRICE_ULTIMATE,
        amount: 1999, // €19.99 in cents
      },
    };

    // Get the selected plan
    const selectedPlan = plans[plan as keyof typeof plans];

    if (!selectedPlan || !selectedPlan.price_id) {
      return NextResponse.json(
        { error: 'Invalid plan or price ID not configured' },
        { status: 400 }
      );
    }

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: selectedPlan.price_id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
