import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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

        await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: [process.env.CONTACT_TO_EMAIL],
            replyTo: email.trim(),
            subject: `New message from ${name.trim()}`,
            html: `
                <p><strong>Name:</strong> ${name.trim()}</p>
                <p><strong>Email:</strong> ${email.trim()}</p>
                <hr />
                <p>${message.trim().replace(/\n/g, '<br />')}</p>
            `,
        })

        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error('Contact API error:', error)
        return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
    }
}
