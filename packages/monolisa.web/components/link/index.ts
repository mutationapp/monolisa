import { LinkProps } from 'next/link'

export const blank = {
  target: '_blank',
  rel: 'noreferrer',
}

// https://blog.logrocket.com/dealing-with-links-in-next-js/
export type linkType = string | LinkProps
