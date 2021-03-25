import { CommitTree } from '.'
import { run } from 'monolisa.lib'
import { buildRepositoryUrlPayloadType } from '../../server/shared'

const RepositoryHeader: React.FunctionComponent<
  { name: string; mergeCommitSha?: string } & buildRepositoryUrlPayloadType
> = ({ provider, name, pullNumber, mergeCommitSha, owner, repo }) => {
  return (
    <section className="title">
      <style jsx>{`
        .title {
          position: relative;
          display: flex;
          align-items: center;
        }
        .title :global(.commitTree) {
          margin-left: 10px;
          font-size: 0.875rem;
        }
      `}</style>
      {name}
      {run(() => {
        if (!pullNumber) {
          return
        }
        return (
          <CommitTree
            className="commitTree"
            provider={provider}
            pullNumber={pullNumber}
            mergeCommitSha={mergeCommitSha}
            owner={owner}
            repo={repo}
          />
        )
      })}
    </section>
  )
}
export default RepositoryHeader
