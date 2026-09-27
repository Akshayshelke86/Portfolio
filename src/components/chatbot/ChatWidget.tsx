import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, RotateCcw, Send, Sparkles, X } from 'lucide-react'
import { matchIntent, suggestedPrompts } from '@/data/chatbotKnowledge'
import { personal } from '@/data/site'

interface Message {
  role: 'bot' | 'user'
  text: string
}

function initialMessages(): Message[] {
  return [
    {
      role: 'bot',
      text: `Hi, I'm a portfolio assistant. Ask me anything about ${personal.name}'s skills, projects, or experience — I only answer from what's actually on this site.`,
    },
  ]
}

function renderText(text: string) {
  return text.split('\n').map((line, i) => (
    <p key={i} className={i > 0 ? 'mt-1.5' : ''}>
      {tokenize(line)}
    </p>
  ))
}

// Supports **bold** and [label](url) — the small markdown subset the bot's
// canned responses use for things like linking to a live demo or resume.
function tokenize(line: string) {
  const tokens = line.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
  return tokens.map((token, j) => {
    const bold = token.match(/^\*\*([^*]+)\*\*$/)
    if (bold) {
      return (
        <strong key={j} className="font-semibold text-(--color-text)">
          {bold[1]}
        </strong>
      )
    }
    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      const [, label, url] = link
      const isExternal = /^https?:\/\//.test(url)
      return (
        <a
          key={j}
          href={url}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noreferrer' : undefined}
          className="font-medium text-(--color-accent) underline underline-offset-2 hover:text-(--color-accent-hover)"
        >
          {label}
        </a>
      )
    }
    return <span key={j}>{token}</span>
  })
}

function TypingIndicator() {
  return (
    <div className="flex w-fit items-center gap-1 rounded-xl bg-(--color-bg-elevated) px-3.5 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-(--color-text-faint)"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isOpen, isTyping])

  useEffect(() => {
    if (!isOpen) return
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 250)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node
      const insidePanel = panelRef.current?.contains(target)
      const onToggleButton = toggleRef.current?.contains(target)
      if (!insidePanel && !onToggleButton) {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [isOpen])

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }])
    setInput('')
    setIsTyping(true)
    window.setTimeout(() => {
      const reply = matchIntent(trimmed)
      setMessages((prev) => [...prev, { role: 'bot', text: reply }])
      setIsTyping(false)
    }, 450)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    send(input)
  }

  function restart() {
    setMessages(initialMessages())
    setInput('')
    inputRef.current?.focus()
  }

  return (
    <>
      <motion.button
        ref={toggleRef}
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 20 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-(--color-accent) text-white shadow-[0_8px_24px_rgba(255,107,0,0.4)]"
        style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            role="dialog"
            aria-label="Portfolio chat assistant"
            className="fixed bottom-24 right-5 z-50 flex h-[min(32rem,70vh)] w-[min(23rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-surface) shadow-(--shadow-card-hover)"
          >
            <div className="flex items-center gap-2.5 border-b border-(--color-border) bg-(--color-bg-elevated) px-4 py-3.5">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--color-accent-soft) text-(--color-accent)">
                <Sparkles className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-(--color-text)">Portfolio Assistant</p>
                <p className="text-xs text-(--color-text-faint)">Answers from this site only</p>
              </div>
              <button
                type="button"
                onClick={restart}
                aria-label="Restart conversation"
                title="Restart conversation"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-(--color-text-faint) hover:bg-(--color-surface-hover) hover:text-(--color-text)"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'ml-auto bg-(--color-accent) text-white'
                      : 'bg-(--color-bg-elevated) text-(--color-text-muted)'
                  }`}
                >
                  {renderText(msg.text)}
                </div>
              ))}

              {isTyping && <TypingIndicator />}

              {messages.length === 1 && !isTyping && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => send(prompt)}
                      className="rounded-full border border-(--color-accent)/40 px-3 py-1.5 text-xs font-medium text-(--color-accent) hover:bg-(--color-accent-soft)"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-(--color-border) p-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, projects…"
                aria-label="Type your question"
                disabled={isTyping}
                className="flex-1 rounded-lg border border-(--color-border) bg-(--color-bg-elevated) px-3 py-2 text-sm text-(--color-text) placeholder:text-(--color-text-faint) outline-none focus:border-(--color-accent) disabled:opacity-60"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--color-accent) text-white transition-transform hover:scale-105 disabled:opacity-40 disabled:pointer-events-none"
                disabled={!input.trim() || isTyping}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
