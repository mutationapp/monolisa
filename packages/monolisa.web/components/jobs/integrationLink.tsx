import {
  buildProviderPullRequestUrl,
  buildProviderUrl,
} from '../../server/shared/buildRepositoryUrl'
import { integrationProviderType } from 'monolisa.model'
import { getIntegrationProviderIcon, ExternalLinkIcon } from '../icons'
import classNames from 'classnames'
import { useReducerState } from '../../hooks'
import { run } from 'monolisa.lib'
import Spinner from '../spinner'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { providerUrlPathType } from '../../server/shared'

export type IntegrationLinkCommitType = {
  sha: string
  path: string
  type: providerUrlPathType
}
const IntegrationLink: React.FunctionComponent<{
  owner: string
  repo: string
  className?: string
  provider: integrationProviderType
  pullNumber?: string
  commit?: IntegrationLinkCommitType
  showLoaderOnRouteChange?: boolean
}> = ({
  showLoaderOnRouteChange,
  provider,
  repo,
  owner,
  commit,
  pullNumber,
  className,
}) => {
  const { state, setState } = useReducerState<{
    hovering?: boolean
    processing?: boolean
  }>({})
  const router = useRouter()

  const { hovering, processing } = state

  const handleprocessingEnd = (f?: () => void) => {
    setTimeout(() => {
      setState({
        processing: false,
      })
      f?.()
    }, 300)
  }
  const handleprocessingStart = (f?: () => void) => {
    setState({
      processing: true,
    })

    return () => handleprocessingEnd(f)
  }

  useEffect(() => {
    if (!showLoaderOnRouteChange) {
      return
    }

    router.events.on('routeChangeStart', () => handleprocessingStart())
    ;['routeChangeComplete', 'routeChangeError'].forEach(event =>
      router.events.on(event, () => handleprocessingEnd()),
    )
  }, [])

  const base = { provider, repo, owner }

  const integrationUrl = (() => {
    if (pullNumber) {
      return buildProviderPullRequestUrl({
        ...base,
        pullNumber,
      })(provider)
    }

    if (commit) {
      return buildProviderUrl({
        ...base,
        path: commit.path,
        commitNumber: commit.sha,
      })(commit.type)
    }

    return buildProviderUrl(base)('repository')
  })()

  const target = 'noopener'

  return (
    <a
      title={`Open in ${provider}`}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        handleprocessingStart(() => window.open(integrationUrl, target))()
      }}
      onMouseEnter={() => {
        setState({
          hovering: true,
        })
      }}
      onMouseLeave={() => {
        setState({
          hovering: false,
        })
      }}
      target={target}
      className={classNames('integrationUrl', className, {
        hover: Boolean(hovering),
        processing: Boolean(processing),
      })}
      href={integrationUrl}
    >
      <style jsx>{`
        .hover {
          color: var(--shade-5);
        }
        .processing {
          color: var(--shade-5);
        }
      `}</style>
      {run(() => {
        if (processing) {
          return <Spinner />
        }
        if (hovering) {
          return <ExternalLinkIcon />
        }

        return getIntegrationProviderIcon(provider)
      })}
    </a>
  )
}
export default IntegrationLink
