import { useState } from 'react'
import i18n, { localesType } from '../../i18n'

const useI18nContext = () => {
  const [locale] = useState<localesType>('en-US')

  return {
    locale,
    i18n: i18n(locale),
  }
}

export default useI18nContext
