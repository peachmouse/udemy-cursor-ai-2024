import { loadStripe } from '@stripe/stripe-js';

// Load the Stripe instance once and reuse it
let stripePromise: ReturnType<typeof loadStripe> | null = null;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
    );
  }
  return stripePromise;
};

export const redirectToCheckout = async (
  plan: 'basic' | 'pro' | 'ultimate'
) => {
  try {
    // Get Stripe.js instance
    const stripe = await getStripe();

    if (!stripe) {
      throw new Error('Stripe failed to initialize');
    }

    // Make a request to the API route to create a checkout session
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plan }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'An error occurred with the payment');
    }

    const { url } = await response.json();

    // Redirect to checkout
    if (url) {
      window.location.href = url;
      return;
    }

    throw new Error('No checkout URL returned');
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    alert('Something went wrong with the payment process. Please try again.');
  }
};
