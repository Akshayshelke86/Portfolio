export const formspreeId = import.meta.env.VITE_FORMSPREE_ID as string | undefined

export const formspreeEndpoint = formspreeId ? `https://formspree.io/f/${formspreeId}` : undefined
