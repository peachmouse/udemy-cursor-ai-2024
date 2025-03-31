# SciFi Flix - Streaming Platform

This is a modern streaming platform for science fiction content built with [Next.js](https://nextjs.org).

## Features

- 🎬 Curated science fiction movie streaming
- 🌓 Dark/Light mode support
- 💳 Multiple subscription tiers
- 🎨 Modern, responsive UI
- 🔍 Advanced movie browsing and filtering
- 📱 Cross-device compatibility

## Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/UI
- **Typography:** Geist Font
- **Language:** TypeScript

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                # Next.js app directory
├── components/         # Reusable UI components
│   └── ui/            # Base UI components
├── lib/               # Utility functions
└── seed-data/         # Movie, actor, and genre data
```

## UI Components

The application uses a custom component library built on top of Shadcn/UI, including:

- Custom Button variants
- Card components
- Navigation elements
- Typography components

## Styling

- Tailwind CSS for utility-first styling
- CSS variables for theming
- Custom color system with dark mode support
- Responsive design patterns

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/UI](https://ui.shadcn.com)
- [TypeScript](https://www.typescriptlang.org/docs)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Stripe Configuration Instructions

1. **Create a Stripe Account**:

   - Sign up at [stripe.com](https://stripe.com) if you don't have an account

2. **Get API Keys**:

   - Go to Developers > API keys in your Stripe Dashboard
   - Copy your **Publishable key** and **Secret key**
   - Add these to your `.env.local` file:
     ```
     STRIPE_SECRET_KEY=sk_test_...
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
     ```

3. **Create Products and Pricing Plans**:

   - Go to Products > Add Product in your Stripe Dashboard
   - Create the following products with recurring prices:
     - Basic Plan: €9.99/month
     - Pro Plan: €14.99/month
     - Ultimate Plan: €19.99/month
   - For each product, set a recurring price with monthly billing
   - Copy the **Price ID** for each plan (starts with "price\_")
   - Add these IDs to your `.env.local` file:
     ```
     STRIPE_PRICE_BASIC=price_...
     STRIPE_PRICE_PRO=price_...
     STRIPE_PRICE_ULTIMATE=price_...
     ```

4. **Set Your Domain**:

   - Add the base URL to your `.env.local` file:
     ```
     NEXT_PUBLIC_BASE_URL=http://localhost:3000
     ```
   - For production, change this to your actual domain

5. **Test The Integration**:
   - Use Stripe test cards like `4242 4242 4242 4242` with any future expiry date and any CVC
   - Check successful payments in your Stripe Dashboard under Payments
