import { Fragment } from 'react'
import headerStyles from './header.styles'

const Header: React.FunctionComponent<{
  text: string
  kind: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}> = ({ kind, text }) => {
  const baseProps = {
    className: kind,
  }

  return (
    <Fragment>
      <style jsx>{headerStyles}</style>
      {(() => {
        if (kind === 'h1') {
          return <h1 {...baseProps}>{text}</h1>
        }

        if (kind === 'h2') {
          return <h2 {...baseProps}>{text}</h2>
        }

        if (kind === 'h3') {
          return <h3 {...baseProps}>{text}</h3>
        }

        if (kind === 'h4') {
          return <h4 {...baseProps}>{text}</h4>
        }

        if (kind === 'h5') {
          return <h5 {...baseProps}>{text}</h5>
        }

        if (kind === 'h6') {
          return <h6 {...baseProps}>{text}</h6>
        }

        return <header {...baseProps}>{text}</header>
      })()}
    </Fragment>
  )
}

export default Header
