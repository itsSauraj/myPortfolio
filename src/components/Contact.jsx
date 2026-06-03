import { useState, useRef } from "react"
import { motion } from "framer-motion"
import emailjs from '@emailjs/browser'

import { styles } from "../styles"
import { SectionWrapper } from "../hoc"
import { fadeIn } from "../utils/motion"

// Config is read from environment (VITE_*). The EmailJS public key is
// publishable by design; see .env.example. Set the same vars in Cloudflare.
const EMAILJS = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL
const CONTACT_NAME = import.meta.env.VITE_CONTACT_NAME || "Saurabh"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const Contact = () => {
    const formRef = useRef()
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null) // { type: 'success' | 'error', message }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((f) => ({ ...f, [name]: value }))
        if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
    }

    const validate = () => {
        const next = {}
        if (form.name.trim().length < 2) next.name = "Please enter your name."
        if (!EMAIL_RE.test(form.email.trim())) next.email = "Enter a valid email address."
        if (form.message.trim().length < 10) next.message = "Message should be at least 10 characters."
        setErrors(next)
        return Object.keys(next).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setStatus(null)

        if (!validate()) return

        if (!EMAILJS.serviceId || !EMAILJS.templateId || !EMAILJS.publicKey) {
            setStatus({
                type: 'error',
                message: "The contact form isn't configured yet. Please reach me via the links in the footer.",
            })
            return
        }

        setLoading(true)
        emailjs
            .send(
                EMAILJS.serviceId,
                EMAILJS.templateId,
                {
                    from_name: form.name,
                    to_name: CONTACT_NAME,
                    from_email: form.email,
                    to_email: CONTACT_EMAIL,
                    message: form.message,
                },
                EMAILJS.publicKey
            )
            .then(() => {
                setLoading(false)
                setStatus({
                    type: 'success',
                    message: "Thanks! I'll get back to you as soon as possible.",
                })
                setForm({ name: '', email: '', message: '' })
            })
            .catch((error) => {
                console.error("EmailJS error:", error)
                setLoading(false)
                setStatus({
                    type: 'error',
                    message: "Something went wrong. Please try again, or email me directly.",
                })
            })
    }

    return (
        <div className="flex justify-center overflow-hidden">
            <motion.div
                variants={fadeIn('up', 'tween', 0.2, 1)}
                className="panel w-full max-w-2xl p-8 sm:p-10"
            >
                <p className={styles.sectionSubText}>Get in touch</p>
                <h3 className={styles.sectionHeadText}>Contact</h3>

                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    noValidate
                    className='mt-10 flex flex-col gap-6'
                >
                    <label className='flex flex-col'>
                        <span className='field-label'>Your Name</span>
                        <input
                            type='text'
                            name='name'
                            value={form.name}
                            onChange={handleChange}
                            placeholder="What's your name?"
                            className='field'
                            aria-invalid={!!errors.name}
                        />
                        {errors.name && (
                            <span className='mt-2 font-mono text-[12px] text-accent-rose'>{errors.name}</span>
                        )}
                    </label>

                    <label className='flex flex-col'>
                        <span className='field-label'>Your Email</span>
                        <input
                            type='email'
                            name='email'
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Where can I reach you?"
                            className='field'
                            aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                            <span className='mt-2 font-mono text-[12px] text-accent-rose'>{errors.email}</span>
                        )}
                    </label>

                    <label className='flex flex-col'>
                        <span className='field-label'>Your Message</span>
                        <textarea
                            rows={7}
                            name='message'
                            value={form.message}
                            onChange={handleChange}
                            placeholder='What would you like to build together?'
                            className='field resize-none'
                            aria-invalid={!!errors.message}
                        />
                        {errors.message && (
                            <span className='mt-2 font-mono text-[12px] text-accent-rose'>{errors.message}</span>
                        )}
                    </label>

                    <button type='submit' disabled={loading} className='btn-accent w-fit'>
                        {loading ? "Sending…" : "Send it →"}
                    </button>

                    {status && (
                        <div
                            role='status'
                            aria-live='polite'
                            className={`rounded-xl border p-4 font-mono text-[13px] ${
                                status.type === 'success'
                                    ? 'border-accent-mint/50 bg-accent-mint/10 text-accent-mint'
                                    : 'border-accent-rose/50 bg-accent-rose/10 text-accent-rose'
                            }`}
                        >
                            {status.message}
                        </div>
                    )}
                </form>
            </motion.div>
        </div>
    )
}

export default SectionWrapper(Contact, 'contact')
