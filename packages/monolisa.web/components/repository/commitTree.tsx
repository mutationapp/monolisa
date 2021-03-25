import { CommitIcon, PullRequestIcon, ExternalLinkIcon } from '../icons'
import Link from 'next/link'
import { buildRepositoryUrl } from '../../server/shared'
import { trimCommitNumber } from '../../server/shared/utils/pullRequest.utils'

import { run } from 'monolisa.lib'
import classNames from 'classnames'
import { Fragment, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Spinner } from '..'
import { integrationProviderType } from 'monolisa.model'
import { buildProviderUrl } from '../../server/shared/buildRepositoryUrl'
import { useReducerState } from '../../hooks'

const CommitTree: React.FunctionComponent<{
  owner: string
  repo: string
  provider: integrationProviderType
  pullNumber: string
  mergeCommitSha?: string
  className: string
}> = ({ provider, pullNumber, mergeCommitSha, owner, repo, className }) => {
  const { state, setState } = useReducerState<{
    hoveringCommit?: boolean
    loadingMaster?: boolean
  }>({})
  const { loadingMaster, hoveringCommit: hovering } = state

  useEffect(() => {
    setTimeout(() => {
      loadingMaster && setState({ loadingMaster: false })
    }, 500)
  }, [loadingMaster])

  const { asPath } = useRouter()

  const spinner = <Spinner size={12} />

  return (
    <div className={classNames('tree', className)}>
      <style jsx>{`
        .tree {
          font-weight: normal;
          display: flex;
          align-items: center;
        }
        .tree :global(.number) {
          margin: 0 3px;
        }

        .tree :global(svg) {
          display: flex;
        }
        .seperator {
          color: var(--shade-6);
        }
      `}</style>
      {run(() => {
        if (!pullNumber) {
          return
        }

        const { as: parentAs, href: parentHref } = buildRepositoryUrl({
          provider,
          owner,
          repo,
        })()

        if (parentAs === asPath) {
          return (
            <span className="number">
              {loadingMaster ? spinner : '(master)'}
            </span>
          )
        }

        return (
          <Fragment>
            <Link as={parentAs} href={parentHref}>
              <a
                title="(master)"
                onClick={() => setState({ loadingMaster: false })}
                className="parentCommit"
              >
                master
              </a>
            </Link>
            (
            <PullRequestIcon />
            {run(() => {
              const { as: pullAs, href: pullHref } = buildRepositoryUrl({
                provider,
                owner,
                repo,
                pullNumber,
                mergeCommitSha,
              })()

              const title = 'pullNumber'

              if (asPath === pullAs) {
                return (
                  <span title={title} className="number">
                    {pullNumber}
                  </span>
                )
              }

              return (
                <Link as={pullAs} href={pullHref}>
                  <a title={title} className="number">
                    {pullNumber}
                  </a>
                </Link>
              )
            })}
            {run(() => {
              if (!mergeCommitSha) {
                return
              }

              const compareHref = mergeCommitSha
                ? buildProviderUrl({
                    provider,
                    owner,
                    repo,
                    commitNumber: mergeCommitSha,
                  })('commit')
                : undefined

              return (
                <Fragment>
                  <span className="seperator">:</span>

                  <a
                    title="mergeCommitSha"
                    target="noopener"
                    onMouseEnter={() => {
                      setState({
                        hoveringCommit: true,
                      })
                    }}
                    onMouseLeave={() => {
                      setState({
                        hoveringCommit: false,
                      })
                    }}
                    className="number"
                    href={compareHref}
                  >
                    {trimCommitNumber(mergeCommitSha)}
                  </a>
                  {hovering ? <ExternalLinkIcon /> : <CommitIcon />}
                </Fragment>
              )
            })}
            )
          </Fragment>
        )
      })}
    </div>
  )
}

export default CommitTree
