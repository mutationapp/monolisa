import { buildRepositoryUrlPayloadType } from '../../server/shared'

const RepositoryHeader: React.FunctionComponent<
  { name: string; mergeCommitSha?: string } & buildRepositoryUrlPayloadType
> = ({ name }) => {
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
      {name}?
    </section>
  )
}
export default RepositoryHeader
