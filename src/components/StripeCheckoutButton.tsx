'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { redirectToCheckout } from '@/lib/stripe';

interface StripeCheckoutButtonProps {
  plan: 'basic' | 'pro' | 'ultimate';
  variant?: 'default' | 'featured';
}

export default function StripeCheckoutButton({
  plan,
  variant = 'default',
}: StripeCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      await redirectToCheckout(plan);
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonText = () => {
    switch (plan) {
      case 'basic':
        return 'Choose Basic';
      case 'pro':
        return 'Choose Pro';
      case 'ultimate':
        return 'Choose Ultimate';
      default:
        return 'Subscribe Now';
    }
  };

  const getButtonClassName = () => {
    if (variant === 'featured') {
      return 'w-full bg-red-600 hover:bg-red-700';
    }
    return 'w-full';
  };

  return (
    <Button
      className={getButtonClassName()}
      onClick={handleCheckout}
      disabled={isLoading}
    >
      {isLoading ? 'Processing...' : getButtonText()}
    </Button>
  );
}
