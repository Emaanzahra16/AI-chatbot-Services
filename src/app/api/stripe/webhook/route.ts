import Stripe from 'stripe';
import { headers } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new Response(`Webhook Error: ${(err as Error).message}`, {
      status: 400,
    });
  }

  // 🎯 PAYMENT SUCCESS
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const organizationId = session.client_reference_id;
    const plan = session.metadata?.plan;

    if (!organizationId) {
      return new Response('No organization ID', { status: 400 });
    }

    // ✅ UPDATE ORGANIZATION PLAN
    await supabase
      .from('organizations')
      .update({
        plan,
        is_active: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', organizationId);
  }

  return new Response('OK', { status: 200 });
}