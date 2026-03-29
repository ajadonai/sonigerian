// Sign up at https://www.emailjs.com (free tier = 200 emails/month)
// 1. Add an email service (Gmail, Outlook, etc.) → get SERVICE_ID
// 2. Create an email template → get TEMPLATE_ID  
// 3. Copy your Public Key from Account → General

export const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
};
