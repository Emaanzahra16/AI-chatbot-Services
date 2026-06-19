export async function sendSlackAlert(lead: any) {
  if (!process.env.SLACK_WEBHOOK_URL) return;

  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `🔥 HOT LEAD\nName: ${lead.name}\nEmail: ${lead.email}\nMessage: ${lead.message}`,
    }),
  });
}