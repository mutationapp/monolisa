import Link from 'next/link'

import { Avatar, ImportRepositoryButton } from '../..'
import { GithubIcon } from '../../icons'
import { run } from 'monolisa.lib'
import { installationType } from 'monolisa.model'
import { useAppContext } from '../../../hooks'
import getUrl from '../../../server/shared/getUrl'

const UserInfoHeading: React.FunctionComponent<{
  installations?: installationType[]
}> = ({ installations }) => {
  const { user } = useAppContext()

  if (!user) return null

  return (
    <div className="userHeading">
      <style jsx>{`
        .userHeading {
          display: flex;
          padding-bottom: 20px;
        }
        .userCard {
          flex: 1;
          display: flex;
          line-height: 2;
        }
        .userInfo {
          margin-left: 20px;
        }
        .userInfo .name {
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
        a.installation .userName {
          margin-left: 5px;
        }

        @media screen and (max-width: 600px) {
          .userInfo .name {
            font-size: 18px;
          }
        }
      `}</style>
      <div className="userCard">
        <Avatar name={user.name} size={90} />
        <div className="userInfo">
          <span className="name">{user.name}</span>
          {run(() => {
            if (!installations?.length) {
              return
            }

            return (
              <section className="installations">
                {installations
                  .filter(i => i.userId === user.id)
                  .map(installation => {
                    return (
                      <Link
                        key={installation.login}
                        {...getUrl(user.slug)('installations')}
                      >
                        <a className="installation">
                          <GithubIcon />
                          <span className="userName">{installation.login}</span>
                        </a>
                      </Link>
                    )
                  })}
              </section>
            )
          })}
        </div>
      </div>
      <div className="userActions">
        <ImportRepositoryButton />
      </div>
    </div>
  )
}

export default UserInfoHeading
