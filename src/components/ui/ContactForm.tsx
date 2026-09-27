import { useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formspreeEndpoint } from '@/utils/contactConfig'
import { personal } from '@/data/site'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const inputClasses =
  'w-full rounded-lg border border-(--color-border) bg-(--color-bg-elevated) px-4 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-faint) outline-none transition-colors focus:border-(--color-accent)'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formspreeEndpoint) {
      const subject = encodeURIComponent(`Portfolio contact from ${name || 'website visitor'}`)
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
      window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (res.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-(--color-border) bg-(--color-surface) p-10 text-center shadow-(--shadow-card)">
        <CheckCircle2 className="h-10 w-10 text-(--color-success)" aria-hidden="true" />
        <p className="text-base font-semibold text-(--color-text)">Message sent</p>
        <p className="text-sm text-(--color-text-muted)">Thanks for reaching out — I&apos;ll get back to you soon.</p>
        <Button variant="ghost" size="sm" onClick={() => setStatus('idle')} type="button">
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-(--color-border) bg-(--color-surface) p-6 shadow-(--shadow-card) sm:p-8"
    >
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-(--color-text)">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClasses}
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-(--color-text)">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClasses}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-(--color-text)">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClasses} resize-none`}
          placeholder="What would you like to talk about?"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-500">Something went wrong. Please try again or email me directly.</p>
      )}

      <Button type="submit" disabled={status === 'submitting'} icon={status === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}>
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  )
}
