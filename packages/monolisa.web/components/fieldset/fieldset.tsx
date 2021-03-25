import { Button, Box } from '..'
import { useState, useEffect, Fragment, ReactNode, useRef } from 'react'
import classNames from 'classnames'
import { somethingWentWrong, run, dealWithIt } from 'monolisa.lib'
import { validate, validatePayloadType } from 'monolisa.lib/validation'
import fetcher from '../../hooks/fetcher'
import { useRouter } from 'next/router'

const FieldSet: React.FunctionComponent<{
  name: string
  value?: string
  url: string
  method: 'POST' | 'PATCH'
  title?: string
  description?: string | ReactNode
  placeHolder?: string
  validation?: validatePayloadType
  push?: boolean
  focus?: boolean
  shadow?: boolean
  onSuccess?: (payload: {
    response: unknown
    value: string
  }) => Promise<void> | void
  successRoute?: {
    getUrl: (value: string) => { href: string; as?: string }
    message: string
  }
}> = ({
  name,
  onSuccess,
  successRoute,
  title,
  description,
  url,
  method,
  placeHolder,
  validation,
  value: inital,
  push,
  focus,
  shadow,
}) => {
  const router = useRouter()

  const inputRef = useRef<HTMLInputElement>(null)

  const [value, setValue] = useState<string>(inital || '')
  const [inProgress, setInProgress] = useState<boolean>()
  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState<string>()
  const [validationError, setValidationError] = useState<string>()

  const disabled = Boolean(
    validationError || inProgress || value === inital || !value,
  )

  const handleSave = async value => {
    const invalid = validation && validate(validation, value)
    if (invalid) {
      setValidationError(invalid)
      return
    }

    try {
      setInProgress(true)

      const response = await fetcher<{ [key: string]: string }>(url, {
        method,
        body: JSON.stringify({ [name]: value }),
      })

      await onSuccess?.({ value, response })
      successRoute ? setSuccess(successRoute.message) : setSuccess('Saved.')
    } catch (error) {
      const message = error.message || somethingWentWrong

      setError(dealWithIt(message))
      setSuccess(undefined)
    } finally {
      setInProgress(false)
    }
  }

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (document.activeElement !== inputRef.current) {
      return
    }

    if (e.keyCode !== 13) {
      return
    }

    const inputValue = inputRef.current?.value || ''

    setValue(inputValue)

    if (inputValue === inital) {
      return
    }

    await handleSave(inputValue)
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    setTimeout(() => {
      error && setError(undefined)

      if (!success) {
        return
      }

      if (!successRoute) {
        setSuccess(undefined)
        return
      }

      const { href, as } = successRoute.getUrl(value)

      router.push(href, as)
    }, 2000)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [success, error])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setValue(value)
    validation && setValidationError(validate(validation, value))
  }

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    await handleSave(value)
  }

  return (
    <Box
      shadow={shadow}
      push={push}
      className="FieldSet"
      footer={
        <section className="footer">
          {inProgress}
          {run(() => {
            return (
              <Fragment>
                <span
                  className={classNames('placeHolder', {
                    error: validationError || error,
                    success: success,
                  })}
                >
                  {error || success || validationError || placeHolder}
                </span>
                <Button
                  processing={
                    Boolean(inProgress) || Boolean(error) || Boolean(success)
                  }
                  disabled={disabled}
                  onClick={handleClick}
                >
                  Save
                </Button>
              </Fragment>
            )
          })}
        </section>
      }
    >
      <style jsx>{`
        .title {
          margin-bottom: 10px;
        }
        .description {
          margin-bottom: 5px;
          font-size: 0.875rem;
        }
        input.text {
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
        input.text:focus,
        input.text:hover {
          box-shadow: var(--shadow);
          border: 1px solid var(--shade-5);
        }
        .footer {
          width: 100%;
          display: flex;
          color: var(--shade-6);
          align-items: center;
        }
        .placeHolder {
          flex: 1;
        }
        .placeHolder.error {
          color: var(--accent-0);
        }
        .placeHolder.success {
          color: var(--accent-6);
        }
      `}</style>
      {run(() => {
        if (!title) {
          return
        }
        return <h4 className="title">{title}</h4>
      })}
      {run(() => {
        if (!description) {
          return
        }
        return <div className="description">{description}</div>
      })}
      <input
        ref={inputRef}
        autoFocus={focus}
        className="text"
        type="text"
        value={value}
        onChange={handleChange}
      />
    </Box>
  )
}
export default FieldSet
