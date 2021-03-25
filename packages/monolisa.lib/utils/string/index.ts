export const truncate: (
  until: number,
) => (value?: string) => string | undefined = until => value => {
  if (!value) {
    return value
  }
  const { length } = value
  if (!length) {
    return value
  }

  if (until >= length) {
    return value
  }

  return value.slice(0, until)
}

export const capitalizeFirstLetter = (value?: string) => {
  if (!value) {
    return value
  }

  return value.charAt(0).toUpperCase() + value.slice(1)
}

export const removeFileExtension = (fileName: string) => {
  return fileName.replace(/\.[^/.]+$/, '')
}

export const replaceAll = (value: string) => (
  search: string,
  replacement: string,
) => {
  return value.split(search).join(replacement)
}

export const toJSON = (text?: string, throws?: boolean) => {
  if (!text) {
    if (throws) throw new Error('text is empty')

    return
  }

  try {
    return JSON.parse(text.trim())
  } catch (error) {
    if (throws) throw error
  }
}
