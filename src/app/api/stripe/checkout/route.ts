import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { getToken } from 'next-auth/jwt';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { plan } = await req.json();

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const userId = token?.sub;

    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: org } = await supabase
      .from('organization_members')
      .select('organization_id')
      .eq('user_id', userId)
      .single();

    let priceId = '';

    if (plan === 'starter') priceId = process.env.STRIPE_PRICE_STARTER!;
    if (plan === 'pro') priceId = process.env.STRIPE_PRICE_PRO!;
    if (plan === 'enterprise') priceId = process.env.STRIPE_PRICE_ENTERPRISE!;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,

      // ✅ IMPORTANT FIX
      client_reference_id: org?.organization_id,
      metadata: {
        plan,
      },
    });

    return Response.json({ url: session.url });
  } catch (err) {
    return Response.json({ error: 'Stripe error' }, { status: 500 });
  }
}