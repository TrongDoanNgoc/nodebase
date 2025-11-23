import { betterAuth } from 'better-auth';
import prisma from '@/lib/db';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { polar, checkout, portal, usage, webhooks } from '@polar-sh/better-auth';
import { polarClient } from '@/lib/polar';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: 'c4d68b33-b3b7-4884-be51-4bcefe916894',
              slug: 'pro',
            },
          ],
          successUrl: process.env.POLAR_SUCCESS_URL,
          authenticatedUsersOnly: true,
        }),
        portal(),
      ],
    }),
  ],
});
