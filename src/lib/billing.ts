export async function subscribe(plan: 'starter' | 'pro' | 'enterprise') {
  const res = await fetch('/api/stripe/create-checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ plan }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to create checkout session');
  }

  if (data.url) {
    window.location.href = data.url;
  }
}