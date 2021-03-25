import { ReactNode } from 'react'

const Flex: React.FunctionComponent<{ icon?: ReactNode }> = ({
  children,
  icon,
}) => {
  return (
    <div className="flex">
      <style jsx>{`
        .flex {
          display: flex;
          align-items: center;
        }

        .icon {
          display: inline-flex;
          margin-right: 7px;
        }
      `}</style>
      {icon && <span className="icon">{icon}</span>}
      {children}
    </div>
  )
}

export default Flex
