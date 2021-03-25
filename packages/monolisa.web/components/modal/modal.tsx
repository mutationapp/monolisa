import { Portal, Box } from '..'
import Button from '../button'
import { ReactNode, useEffect, useState, useRef } from 'react'

export type actionType = {
  name: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}
const Modal: React.FunctionComponent<{
  icon?: ReactNode
  header?: string
  actions: actionType[]
}> = ({ icon, header, actions, children }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [, hide] = useState<boolean>()
  const close = e => {
    if (ref?.current?.contains(e?.target)) {
      return
    }

    hide(true)
  }
  useEffect(() => {
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  // TODO: fix this
  // if (hidden) {
  //   return null
  // }

  return (
    <Portal selector="#modalPortal">
      <style jsx>{`
        .wrap {
          position: fixed;
          top: 0;
          left: 0;
          display: flex;
          align-content: center;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          height: 100vh;
          width: 100vw;
          z-index: 1;
        }
        .wrap:after {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          background-color: #000;
          transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          z-index: -1;
          opacity: var(--portal-opacity);
          pointer-events: all;
        }

        .modal {
          max-width: 400px;
        }

        .actions {
          flex: 1;
          display: flex;
          align-items: center;
        }

        .actions li {
          flex: 1;
          display: flex;
          border-right: 1px solid var(--shade-2);
        }

        .actions li:last-child {
          flex: 1;
          border-right: none;
        }
        .actions li :global(button) {
          flex: 1;
        }
      `}</style>
      <div className="wrap">
        <div className="modal" ref={ref}>
          <Box
            shadow
            header={{ children: header, icon }}
            footer={
              <ul className="actions">
                {actions.map(({ name, onClick }) => {
                  return (
                    <li key={name}>
                      <Button onClick={onClick} type="ghost">
                        {name}
                      </Button>
                    </li>
                  )
                })}
              </ul>
            }
          >
            {children}
          </Box>
        </div>
      </div>
    </Portal>
  )
}

export default Modal
