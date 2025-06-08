import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '@/lib/payments/stripe'
import { z } from 'zod'

const schema = z.object({
  amount: z.number().min(1),
})

export async function POST(request: Request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    // Get the form data
    const formData = await request.formData();
    const amountStr = formData.get('amount') as string;
    const amountInCents = Math.round(parseFloat(amountStr) * 100);
    
    const validatedFields = schema.safeParse({ amount: amountInCents })
    if (!validatedFields.success) {
      return NextResponse.json({ error: 'Invalid fields' }, { status: 400 })
    }

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donation',
            },
            unit_amount: validatedFields.data.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate/?canceled=true`,
    });
    return NextResponse.redirect(session.url || '', 303)
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'An unknown error occurred' },
      { status: err instanceof Error ? 500 : 400 }
    )
  }
}