import { Fragment } from 'react'
import classNames from 'classnames'

const TextBox: React.FunctionComponent<{
  autoFocus?: boolean
  value?: string
  readOnly?: boolean
  grow?: boolean
  onChange?: (value: string) => void
}> = ({ autoFocus, value, onChange, readOnly, grow }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) {
      e.preventDefault()
      e.target.select()
      return
    }

    const { value } = e.target
    onChange?.(value)
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!readOnly) {
      return
    }

    e.target.select()
  }
  return (
    <Fragment>
      <style jsx>{`
        input {
          margin: 10px 0 5px 0;
          color: var(--foreground);
          background-color: transparent;
          border: 1px solid var(--shade-2);
          border-radius: var(--radius);
          padding: 7px 7px;
          outline: none;
          font-size: 0.875rem;
          min-width: 50%;
        }
        input.grow {
          width: 100%;
        }
        input.:focus,
        input.text:hover {
          box-shadow: var(--shadow);
          border: 1px solid var(--shade-5);
        }
      `}</style>
      <input
        onFocus={handleFocus}
        autoFocus={autoFocus}
        className={classNames({ grow })}
        type="text"
        value={value}
        onChange={handleChange}
      />
    </Fragment>
  )
}

export default TextBox
