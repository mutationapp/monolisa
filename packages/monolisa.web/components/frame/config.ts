import dedent from 'dedent'
import defaultsDeep from 'lodash.defaultsdeep'
import { repeat } from '../../typography'

export type configType = {
  alt: string[]
  src: string[]
  grid?: string[]
  content?: string[]
  title?: string[]
  minHeight?: string[]
}

export type reducedConfigType = {
  alt: string
  src: string
  grid?: string
  content?: string
  title?: string
  minHeight?: string
}

export type reducedConfigHashTableType = {
  [key: string]: reducedConfigType
}

export type configHashTableType = {
  [key: string]: configType
}

export type configsType = {
  [key: string]: configHashTableType
}

const config: configsType = {
  [`ponyo`]: {
    ['defaults']: {
      alt: ['string'],
      grid: [
        `"${repeat(8)('content')} ${repeat(8)('image')}" / ${repeat(16)(
          '1fr',
        )}`,
      ],
      src: ['/static/srt/00-10-08.191.png'],

      content: [
        'A five-year-old boy develops a relationship with Ponyo, a young goldfish princess who longs to become a human after falling in love with him.',
      ],
      minHeight: ['1/4'],
      title: ['Ponyo (2008)'],
    },
    [`00:10:08,191`]: {
      alt: ['string'],
      grid: [
        `"${repeat(8)('content')} ${repeat(8)('image')}" / ${repeat(16)(
          '1fr',
        )}`,
      ],
      src: ['/static/srt/00-10-08.191.png'],
      content: [
        'A five-year-old boy develops a relationship with Ponyo, a young goldfish princess who longs to become a human after falling in love with him.',
      ],
    },
  },
}

export default config
