import { Avatar, ImportRepositoryButton } from '../..'

import { GithubIcon } from '../../icons'
import Link from 'next/link'
import { run } from 'monolisa.lib'
import { getTeamUrl } from '../../../server/shared'
import { useAppContext } from '../../../hooks'

const TeamInfoHeading: React.FunctionComponent = () => {
  const { team } = useAppContext()
  if (!team) {
    return null
  }

  const { installations, name: teamSlug } = team

  return (
    <div className="teamHeading">
      <style jsx>{`
        .teamHeading {
          display: flex;
          padding-bottom: 20px;
        }
        .teamCard {
          flex: 1;
          display: flex;
          line-height: 2;
        }
        .teamInfo {
          margin-left: 20px;
        }
        .teamInfo .name {
          font-size: 22px;
          font-weight: bold;
        }
        .installations {
          display: flex;
          font-size: 0.875rem;
          flex-direction: column;
        }
        .installations header {
          color: var(--secondary);
          font-size: 12px;
          font-weight: bold;
        }
        a.installation {
          display: flex;
          align-items: center;
          color: inherit;
        }
        a.installation .teamSlug {
          margin-left: 5px;
        }
      `}</style>
      <div className="teamCard">
        <Avatar name={teamSlug} size={90} />
        <div className="teamInfo">
          <span className="name">{teamSlug}</span>
          {run(() => {
            if (!installations?.length) {
              return
            }

            return (
              <section className="installations">
                {installations.map(installation => (
                  <Link
                    key={installation.id}
                    {...getTeamUrl(teamSlug)('installations')}
                  >
                    <a className="installation">
                      <GithubIcon />
                      <span className="teamSlug">{installation.login}</span>
                    </a>
                  </Link>
                ))}
              </section>
            )
          })}
        </div>
      </div>
      <div className="teamActions">
        <ImportRepositoryButton />
      </div>
    </div>
  )
}

export default TeamInfoHeading
