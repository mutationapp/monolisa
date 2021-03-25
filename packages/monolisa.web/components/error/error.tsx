import { run, dealWithIt } from 'monolisa.lib'
import { MainLayout } from '../layouts'

const Error: React.FunctionComponent<{ statusCode: number }> = ({
  statusCode,
}) => {
  return (
    <MainLayout pageTitle={`Error: ${statusCode}`}>
      <style jsx>{`
        h1 {
          background-color: var(--foreground);
          color: var(--background);
          display: inline-block;
          padding: 5px 15px;
          font-size: 3.25rem;
        }
        p {
          font-size: 0.775rem;
          margin-top: 10px;
          display: flex;
          align-items: center;
          color: var(--accent-7);
        }

        .icon {
          display: inline-flex;
          margin-left: 5px;
        }
      `}</style>
      <h1>{statusCode}</h1>
      <p>
        {run(() => {
          const message = (() => {
            if (statusCode === 404) {
              return 'Not found'
            }

            if (statusCode === 401) {
              return 'Not authorized'
            }

            return statusCode
              ? `An error ${statusCode} occurred on server`
              : 'An error occurred on client'
          })()

          return dealWithIt(message)
        })}
      </p>
    </MainLayout>
  )
}

export default Error
