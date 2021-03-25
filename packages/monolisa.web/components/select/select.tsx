import { ScrollIcon, CheckIcon, FailIcon } from '../icons'
import Spinner from '../spinner'
import { run } from 'monolisa.lib'
import classNames from 'classnames'

export type selectOptionType = {
  text: string
  value?: string
  selected?: boolean
}

const Select: React.FunctionComponent<{
  options: selectOptionType[]
  onChange?: (value: string) => void | Promise<void>
  processing?: boolean
  success?: boolean
  error?: boolean
  disabled?: boolean
  value?: string
}> = ({ options, onChange, value: defaultValue, ...rest }) => {
  const { disabled, processing, success, error } = rest

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value)
  }

  const isDisabled = disabled || processing || success || error

  return (
    <div
      className={classNames('container', {
        disabled: Boolean(isDisabled),
        processing: Boolean(processing),
      })}
    >
      <style jsx>{`
        select {
          appearance: none;
          text-rendering: auto;
          width: 100%;
          border-radius: var(--geist-radius);
          border: none;
          background: none;
          padding: 0;
          padding-right: 0px;
          outline: none;

          color: var(--secondary);
          font-size: 0.875rem;
        }

        .container:not(.disabled):hover,
        .container:not(.disabled):hover {
          background: var(--background);
          border-color: var(--foreground);
          box-shadow: var(--shadow);
          color: var(--foreground);
        }

        .container:not(.disabled):hover select,
        .container:not(.disabled):hover select {
          color: var(--foreground);
        }

        .container:not(.disabled):hover select {
          cursor: pointer;
        }

        .container {
          border-radius: var(--radius);
          display: inline-flex;
          align-items: center;
          border: 1px solid var(--foreground);
          padding: 1px 8px;

          background: var(--background);
          border-color: var(--shade-2);
          color: var(--secondary);

          background: var(--foreground);
          color: var(--background);
        }

        .container select {
          color: var(--background);
        }

        .container.secondary {
          background: var(--background);
          border-color: var(--shade-2);
          color: var(--secondary);
        }

        .icon {
          display: inline-flex;
          font-size: 0.875rem;
        }
      `}</style>
      <select
        value={defaultValue}
        disabled={isDisabled}
        onChange={handleChange}
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>
            {o.text}
          </option>
        ))}
      </select>
      <span className="icon">
        {run(() => {
          const size = '0.875em'

          if (error) {
            return <FailIcon size={size} />
          }

          if (success) {
            return <CheckIcon size={size} />
          }

          return processing ? (
            <Spinner size={size} />
          ) : (
            <ScrollIcon size={size} />
          )
        })}
      </span>
    </div>
  )
}
export default Select
