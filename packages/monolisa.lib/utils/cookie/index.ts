export const parseCookie = (cookie?: string) =>
  cookie
    ? Object.fromEntries(
        cookie.split(/; */).map(c => {
          const [key, ...v] = c.split('=')
          return [key, decodeURIComponent(v.join('='))]
        }),
      )
    : undefined
