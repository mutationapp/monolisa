import classNames from 'classnames'
import { BoxIcon } from '../icons'
import { useLoading, useReducerState } from '../../hooks'
import { useEffect } from 'react'
import { Spinner } from '..'

const Logo: React.FunctionComponent<{
  href?: string
  as?: string
  size?: number
  className?: string
  props?: object
}> = ({ className, ...props }) => {
  const {
    state: { loading },
    setState,
  } = useReducerState<{ loading?: boolean }>()

  useLoading(!!loading)

  useEffect(() => {
    ;(async () => {
      loading &&
        setTimeout(async () => {
          window.location.href = href
        }, 0)
    })()
  }, [loading])

  const href = props.href || '/'
  const size = props.size || 24
  const color = 'var(--shade-8)'

  return (
    <a
      title="Home"
      href={href}
      onClick={e => {
        e.preventDefault()
        setState({
          loading: true,
        })
      }}
      className={classNames('logo', className, {
        loading,
      })}
    >
      <style jsx>{`
        .logo {
          display: flex;
          cursor: pointer;
          align-items: center;
          position: relative;
        }

        .spinner {
          position: absolute;
          left: 50%;
          margin-left: -8px;
          color: var(--background);

          display: inline-flex;
        }
      `}</style>
      <BoxIcon
        {...{
          size,
          color,
          fill: color,
        }}
      />
      {loading && (
        <span className="spinner">
          <Spinner />
        </span>
      )}
    </a>
  )
}

export default Logo
