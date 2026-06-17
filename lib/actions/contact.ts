'use server';

import { Resend } from 'resend';
import { SITE } from '@/lib/site';
import type { FormState } from '@/lib/form-state';

// Contact form → email via Resend. No DB record (no ContactSubmission table, §7);
// the inbox is a Phase-2 add-on.
export async function sendContact(_prev: FormState, formData: FormData): Promise<FormState> {
  // Honeypot — bots fill hidden fields. Silently "succeed" without sending.
  if (String(formData.get('company') ?? '').trim()) {
    return { success: 'Thanks! We’ll be in touch soon.' };
  }

  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = 'Please tell us your name.';
  if (!email) fieldErrors.email = 'An email is required so we can reply.';
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) fieldErrors.email = 'Enter a valid email.';
  if (!message || message.length < 10) fieldErrors.message = 'Please add a bit more detail (10+ characters).';
  if (Object.keys(fieldErrors).length) return { fieldErrors };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      error: `Our contact form isn’t connected yet. Please email us directly at ${SITE.email}.`,
    };
  }

  const to = process.env.CONTACT_TO_EMAIL || SITE.email;
  const from = process.env.CONTACT_FROM_EMAIL || 'JStarz Website <onboarding@resend.dev>';

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New website enquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        '',
        message,
      ]
        .filter((l) => l !== null)
        .join('\n'),
    });

    if (error) {
      return { error: `Something went wrong sending your message. Please email ${SITE.email}.` };
    }
  } catch {
    return { error: `Something went wrong sending your message. Please email ${SITE.email}.` };
  }

  return { success: 'Thanks! Your message is on its way — we’ll get back to you soon.' };
}
