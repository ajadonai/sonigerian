export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, gist } = req.body;

  if (!name || !gist) {
    return res.status(400).json({ error: 'Name and gist are required' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service not configured' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'So Nigerian <onboarding@resend.dev>',
        to: ['oluwadamilarearogundade@gmail.com'],
        subject: `🎙️ New Dilemma from "${name}"`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; background: #1a1917; border-radius: 12px; overflow: hidden;">
            <div style="height: 4px; background: #3FAE5A;"></div>
            <div style="padding: 40px 36px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 28px;">
                <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; color: #3FAE5A;">New Dilemma Submission</span>
              </div>
              
              <div style="background: #242220; border: 1px solid #333; border-radius: 8px; padding: 24px; margin-bottom: 20px;">
                <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #8a8580; margin-bottom: 8px;">From</div>
                <div style="font-size: 18px; font-weight: 700; color: #F4EFE7;">${name}</div>
              </div>
              
              <div style="background: #242220; border: 1px solid #333; border-radius: 8px; padding: 24px;">
                <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #8a8580; margin-bottom: 8px;">Their Gist</div>
                <div style="font-size: 15px; color: #d4cfc9; line-height: 1.7;">${gist.replace(/\n/g, '<br>')}</div>
              </div>
              
              <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #333; text-align: center;">
                <span style="font-size: 11px; color: #5a5550;">Sent from </span>
                <a href="https://sonigerian.com/dilemma" style="font-size: 11px; color: #3FAE5A; text-decoration: none;">sonigerian.com</a>
              </div>
            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(500).json({ error: error.message || 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
