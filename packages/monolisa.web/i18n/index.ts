const locales = {
  'en-GB': 'en-GB',
  'en-US': 'en-US',
}

import PonyoEN_US from '../public/static/srt/ponyo.srt.en-US.json'

const captions = {
  'ponyo.en-US': {
    data: PonyoEN_US,
  },
}

export type localesType = keyof typeof locales

export type srtType = {
  startTime: string
  endTime: string
  text: string
  next?: srtType
}

export type getSrtResponseType = { captions: srtType[] }

const getSrt = (locale: localesType = 'en-GB') => (
  name: string,
): getSrtResponseType => {
  const key = `${name}.${locale}`

  return captions[key]?.data
}

const i18n = (locale: localesType = 'en-GB') => {
  const inject = (locale: localesType) => (name: string) => (payload: {
    startTime: string
    endTime: string
  }) => {
    const { startTime, endTime } = payload

    const data = getSrt(locale)(name) as getSrtResponseType | undefined
    if (!data) return null

    const captions = data.captions

    const start = captions?.find(x => x.startTime === startTime)
    if (!start) {
      return
    }

    const end = captions?.find(x => x.endTime === endTime)
    if (!end) {
      return
    }

    return captions
      .concat()
      .slice(captions.indexOf(start), captions.indexOf(end))
  }

  return {
    getSrt: (name: string) => inject(locale)(name),
  }
}

export default i18n
