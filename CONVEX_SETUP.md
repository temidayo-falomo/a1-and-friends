# Convex Setup Instructions

This project has been configured to use Convex for data management. Follow these steps to complete the setup:

## 1. Initialize Convex

Run the following command to initialize your Convex project:

```bash
npx convex dev
```

This will:
- Create a Convex account (if you don't have one)
- Set up your project
- Generate the `_generated` folder with TypeScript types
- Create a `.env.local` file with your `NEXT_PUBLIC_CONVEX_URL`

## 2. Seed the Database

After Convex is initialized, you need to seed the database with the existing data. You can do this by:

1. Opening the Convex dashboard (URL will be shown in the terminal)
2. Going to the Functions tab
3. Running the `migrations.seedEvents` mutation
4. Running the `migrations.seedEventPricing` mutation

Alternatively, you can use the Convex CLI:

```bash
npx convex run migrations:seedEvents
npx convex run migrations:seedEventPricing
```

## 3. Verify Setup

Once the data is seeded, your application should work as before, but now using Convex for data storage.

## Available Scripts

- `npm run convex:dev` - Start Convex development server
- `npm run convex:codegen` - Generate TypeScript types from your Convex schema

## Data Migration

The following data has been migrated to Convex:

- **Events**: All event data from `data/events.ts`
- **Event Pricing**: All pricing data from `data/club-pricing.ts`

The old data files (`data/events.ts` and `data/club-pricing.ts`) are still present but are no longer used by the application. You can remove them after verifying everything works correctly.

