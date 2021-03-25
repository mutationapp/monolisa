import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const Portal: React.FunctionComponent<{
  selector: string
}> = ({ children, selector }) => {
  const ref = useRef<Element>()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const el = document.querySelector(selector)
    if (!el) {
      return
    }

    ref.current = el
    setMounted(true)
  }, [selector])

  return mounted && ref.current ? createPortal(children, ref.current) : null
}

export default Portal
