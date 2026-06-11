import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendFollowUp(email: string, name: string) {
  await resend.emails.send({
    from: 'Altivora AI <onboarding@resend.dev>',
    to: email,
    subject: 'Still need your AI demo? 🚀',
    html: `
      <h2>Hi ${name}</h2>
      <p>Just checking in — your AI demo is still available.</p>
      <p>We can deploy it in 24 hours for your business.</p>
    `,
  });
}