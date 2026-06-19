import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, phone, message, source } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    console.log('New lead:', { name, email, company, source });

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const notifyEmail = process.env.LEAD_NOTIFICATION_EMAIL || gmailUser;

    if (!gmailUser || !gmailPass) {
      console.warn('[leads] GMAIL_USER or GMAIL_APP_PASSWORD not set — emails skipped.');
      return NextResponse.json({ success: true });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: gmailUser, pass: gmailPass },
    });

    // ── 1. Notification email → business ────────────────────────────────
    try {
      await transporter.sendMail({
        from: `"AI Services" <${gmailUser}>`,
        to: notifyEmail,
        subject: `🚀 Nuevo lead: ${name}${company ? ` — ${company}` : ''}`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
            <div style="background:linear-gradient(135deg,#7c3aed,#06b6d4);padding:24px 28px">
              <h2 style="color:#fff;margin:0;font-size:20px">📩 Nuevo contacto desde la web</h2>
              <p style="color:rgba(255,255,255,.8);margin:4px 0 0;font-size:14px">AI Services — formulario de contacto</p>
            </div>
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr><td style="padding:12px 20px;background:#f9fafb;font-weight:600;width:130px;color:#374151">Nombre</td><td style="padding:12px 20px;color:#111827">${name}</td></tr>
              <tr><td style="padding:12px 20px;background:#f3f4f6;font-weight:600;color:#374151">Email</td><td style="padding:12px 20px"><a href="mailto:${email}" style="color:#7c3aed">${email}</a></td></tr>
              ${company ? `<tr><td style="padding:12px 20px;background:#f9fafb;font-weight:600;color:#374151">Empresa</td><td style="padding:12px 20px;color:#111827">${company}</td></tr>` : ''}
              ${phone ? `<tr><td style="padding:12px 20px;background:#f3f4f6;font-weight:600;color:#374151">Teléfono</td><td style="padding:12px 20px"><a href="tel:${phone}" style="color:#7c3aed">${phone}</a></td></tr>` : ''}
              ${message ? `<tr><td style="padding:12px 20px;background:#f9fafb;font-weight:600;color:#374151;vertical-align:top">Mensaje</td><td style="padding:12px 20px;color:#111827;white-space:pre-wrap">${message}</td></tr>` : ''}
              <tr><td style="padding:12px 20px;background:#f3f4f6;font-weight:600;color:#374151">Fuente</td><td style="padding:12px 20px;color:#111827">${source || 'web'}</td></tr>
              <tr><td style="padding:12px 20px;background:#f9fafb;font-weight:600;color:#374151">Fecha</td><td style="padding:12px 20px;color:#111827">${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}</td></tr>
            </table>
            <div style="padding:16px 20px;background:#f9fafb;border-top:1px solid #e5e7eb">
              <a href="mailto:${email}" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600">
                Responder a ${name} →
              </a>
            </div>
          </div>
        `,
      });
      console.log('[leads] Business notification sent to', notifyEmail);
    } catch (e) {
      console.error('[leads] Business email error:', e);
    }

    // ── 2. Confirmation email → form filler ─────────────────────────────
    try {
      const firstName = name.split(' ')[0];
      await transporter.sendMail({
        from: `"AI Services" <${gmailUser}>`,
        to: email,
        subject: `✅ Hemos recibido tu solicitud, ${firstName}!`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">

            <!-- Header -->
            <div style="background:linear-gradient(135deg,#7c3aed,#06b6d4);padding:32px 28px;text-align:center">
              <h1 style="color:#fff;margin:0;font-size:24px;font-weight:700">AI Services</h1>
              <p style="color:rgba(255,255,255,.85);margin:6px 0 0;font-size:15px">Soluciones de Inteligencia Artificial para empresas</p>
            </div>

            <!-- Body -->
            <div style="padding:32px 28px;background:#fff">
              <h2 style="margin:0 0 16px;font-size:20px;color:#111827">¡Hola, ${firstName}! 👋</h2>
              <p style="color:#374151;line-height:1.7;margin:0 0 16px">
                Gracias por contactar con <strong>AI Services</strong>. Hemos recibido tu solicitud y nos pondremos en contacto contigo en menos de <strong>2 horas</strong> en horario laboral (L–V, 9:00–18:00 CET).
              </p>
              <p style="color:#374151;line-height:1.7;margin:0 0 24px">
                Mientras tanto, aquí tienes un resumen de lo que enviaste:
              </p>

              <!-- Summary box -->
              <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:20px;margin-bottom:24px;font-size:14px;color:#374151">
                <div style="margin-bottom:8px"><strong>Nombre:</strong> ${name}</div>
                ${company ? `<div style="margin-bottom:8px"><strong>Empresa:</strong> ${company}</div>` : ''}
                ${phone ? `<div style="margin-bottom:8px"><strong>Teléfono:</strong> ${phone}</div>` : ''}
                ${message ? `<div><strong>Mensaje:</strong><br><span style="white-space:pre-wrap;color:#6b7280">${message}</span></div>` : ''}
              </div>

              <!-- What happens next -->
              <h3 style="font-size:16px;color:#111827;margin:0 0 12px">¿Qué pasa ahora?</h3>
              <ol style="color:#374151;line-height:1.8;padding-left:20px;margin:0 0 28px">
                <li>Nuestro equipo revisará tu solicitud</li>
                <li>Te contactaremos para conocer tu proyecto en detalle</li>
                <li>Prepararemos una propuesta personalizada sin coste</li>
              </ol>

              <!-- CTA -->
              <div style="text-align:center;margin-bottom:8px">
                <a href="https://wa.me/34624280211?text=Hola%2C%20acabo%20de%20enviar%20un%20formulario%20y%20quiero%20saber%20más"
                   style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-size:15px;font-weight:600">
                  💬 ¿Prefieres hablar ahora? WhatsApp
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="padding:20px 28px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center">
              <p style="color:#9ca3af;font-size:12px;margin:0">
                AI Services · Barcelona, España<br>
                <a href="mailto:ai.servicios.chatbot@gmail.com" style="color:#7c3aed">ai.servicios.chatbot@gmail.com</a> · 
                <a href="https://wa.me/34624280211" style="color:#7c3aed">+34 624 280 211</a>
              </p>
            </div>
          </div>
        `,
      });
      console.log('[leads] Confirmation sent to', email);
    } catch (e) {
      console.error('[leads] Confirmation email error:', e);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[leads] Error:', err);
    return NextResponse.json({ error: 'Failed to capture lead' }, { status: 500 });
  }
}
