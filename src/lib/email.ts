import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

type Lead = {
  name: string;
  email: string;
  company?: string;
  message: string;
  lead_strength?: number;
  priority?: 'hot' | 'warm' | 'cold';
};

export async function sendLeadEmail(lead: Lead) {
  await resend.emails.send({
    from: 'Altivora AI <onboarding@resend.dev>',
    to: process.env.LEAD_NOTIFICATION_EMAIL!,
    subject:
      lead.priority === 'hot'
        ? `🔥 HOT LEAD ALERT: ${lead.name}`
        : `New Lead from ${lead.name}`,

    html: `
      <div style="font-family: Arial; padding: 10px;">
        <h2 style="color: ${lead.priority === 'hot' ? 'red' : 'black'};">
          ${lead.priority === 'hot' ? '🔥 HOT LEAD DETECTED' : 'New Lead Received'}
        </h2>

        <p><b>Name:</b> ${lead.name}</p>
        <p><b>Email:</b> ${lead.email}</p>
        <p><b>Company:</b> ${lead.company || 'N/A'}</p>

        <hr />

        <p><b>Message:</b></p>
        <p>${lead.message}</p>

        ${
          lead.lead_strength
            ? `<p><b>AI Score:</b> ${lead.lead_strength}</p>`
            : ''
        }
      </div>
    `,
  });
}