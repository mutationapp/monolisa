import { Fragment } from 'react'
import { useReducerState } from '../../hooks'
import { WizardType } from '.'

const Wizard: React.FunctionComponent<WizardType> = props => {
  const { state, setState } = useReducerState<{
    previous?: WizardType
    next?: WizardType
  }>({})

  const handleClick = (next: WizardType) => {
    setState({ next, previous: props })
  }

  const { actions, children } = state.next || props

  return (
    <Fragment>
      <style jsx>{`
        section {
          display: flex;
          align-items: baseline;
          flex: 1;
        }

        ul {
          display: flex;
          margin: 0 -4px 0 8px;
        }

        ul li {
          margin: 0 4px;
        }

        .children {
          flex: 1;
        }
      `}</style>
      <section>
        <div className="children">{children}</div>
        <ul>
          {actions?.map(action => {
            return (
              <li
                key={action.key}
                onClick={async () => {
                  const { next } = action

                  if (!next) {
                    setState({
                      next: state.previous,
                    })

                    return
                  }
                  if (typeof next === 'function') {
                    await next()
                    return
                  }

                  handleClick(next)
                }}
              >
                {action.children}
              </li>
            )
          })}
        </ul>
      </section>
    </Fragment>
  )
}

export default Wizard
