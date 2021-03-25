import classNames from 'classnames'

const Wrapper: React.FunctionComponent<{
  className?: string
}> = ({ className, children }) => {
  return (
    <div className={classNames('outer', className)}>
      <style jsx>{`
        .wrapper {
          max-width: 1040px;
          min-width: 500px;
          margin: 0 auto;
          padding: 0 20px;
        }
        @media screen and (max-width: 600px) {
          .wrapper {
            display: block;
          }
        }
      `}</style>
      <div className={classNames('wrapper')}>
        {/* 1040 960 600 */}
        {children}
      </div>
    </div>
  )
}

export default Wrapper
