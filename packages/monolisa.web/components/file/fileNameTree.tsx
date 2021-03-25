import { ReactNode } from 'react'
import { buildRepositoryUrl } from '../../server/shared'
import Link from 'next/link'
import { removeLeadingSlashes } from 'monolisa.lib/utils/url'
import { integrationProviderType } from 'monolisa.model'

const FileNameTree: React.FunctionComponent<{
  provider: integrationProviderType
  name: string
  owner: string
  repo: string
  pullNumber: string
  mergeCommitSha?: string
}> = ({ provider, name, owner, repo, pullNumber, mergeCommitSha }) => {
  return (
    <div className="tree">
      <style jsx>{`
        .folder:after {
          content: '/';
          margin: 0 3px;
          color: var(--shade-3);
        }
      `}</style>
      {removeLeadingSlashes(name)
        ?.split('/')
        .reduce<Array<ReactNode>>((acc, name, index, array) => {
          const isLast = index === array.length - 1

          if (isLast) {
            return acc.concat(
              <span key={name} className="last">
                {name}
              </span>,
            )
          }

          const until = array.slice(0, index + 1).join('/')

          const { as, href } = buildRepositoryUrl({
            provider,
            owner,
            repo,
            pullNumber,
            path: until,
            mergeCommitSha,
          })('tree')

          return acc.concat(
            <Link key={name} href={href} as={as}>
              <a className="folder">{name}</a>
            </Link>,
          )
        }, [])}
    </div>
  )
}

export default FileNameTree
