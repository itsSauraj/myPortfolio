import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const buildHtml = (name, email, message) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Portfolio Contact</title>
</head>
<body style="margin:0;padding:40px 20px;background:#050816;font-family:Consolas,Monaco,'Courier New',monospace;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td align="center">
<table width="700" cellpadding="0" cellspacing="0" border="0" style="background:#070b1d;border:1px solid rgba(167,139,250,0.25);max-width:700px;">

    <!-- Header -->
    <tr>
        <td style="padding:32px 40px;border-bottom:1px solid rgba(167,139,250,0.15);background:#060918;">
            <div style="color:#A78BFA;font-size:12px;letter-spacing:4px;text-transform:uppercase;margin-bottom:12px;">Contact Transmission</div>
            <div style="color:#FFFFFF;font-size:48px;font-weight:700;text-transform:uppercase;line-height:1;margin-bottom:16px;">New Message</div>
            <div style="width:80px;height:2px;background:#A78BFA;"></div>
        </td>
    </tr>

    <!-- Content -->
    <tr>
        <td style="padding:40px;">
            <div style="color:#A78BFA;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin-bottom:12px;">Sender Information</div>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(167,139,250,0.15);background:rgba(167,139,250,0.03);margin-bottom:32px;">
                <tr>
                    <td style="padding:24px;">
                        <div style="color:#FFFFFF;font-size:20px;margin-bottom:10px;">${name}</div>
                        <div style="color:#9CA3AF;font-size:14px;">${email}</div>
                    </td>
                </tr>
            </table>
            <div style="color:#A78BFA;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin-bottom:12px;">Message Payload</div>
            <div style="border-left:3px solid #A78BFA;background:rgba(167,139,250,0.03);padding:24px;color:#D1D5DB;line-height:1.9;font-size:15px;white-space:pre-wrap;">${message}</div>
        </td>
    </tr>

    <!-- Divider -->
    <tr><td style="padding:0 40px;"><div style="height:1px;background:rgba(167,139,250,0.15);"></div></td></tr>

    <!-- Footer -->
    <tr>
        <td style="padding:30px 40px;">
            <div style="color:#6B7280;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin-bottom:12px;">Portfolio Contact System</div>
            <div style="color:#A78BFA;font-size:14px;margin-bottom:6px;">Saurabh Yadav</div>
            <div style="color:#9CA3AF;font-size:13px;">Full Stack Engineer • Python • Django • FastAPI • React</div>
        </td>
    </tr>

</table>
</td></tr>
</table>
</body>
</html>`

export async function POST(request) {
    try {
        const { name, email, message } = await request.json()

        if (!name?.trim() || !email?.trim() || !message?.trim()) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
        }

        const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!EMAIL_RE.test(email.trim())) {
            return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
        }

        const result = await resend.emails.send({
            from: 'Portfolio Contact <contact@saurabh-yadav.me>',
            to: [process.env.CONTACT_TO_EMAIL],
            replyTo: email.trim(),
            subject: `New message from ${name.trim()}`,
            html: buildHtml(name.trim(), email.trim(), message.trim()),
        })

        if (result.error) {
            console.error('Resend API error:', result.error)
            return NextResponse.json({ error: result.error.message }, { status: 500 })
        }

        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error('Contact API error:', error)
        return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
    }
}
