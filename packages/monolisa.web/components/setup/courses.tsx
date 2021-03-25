import { Flex, Box, Button, Spinner } from '..'
import { BookIcon, CodeIcon, OpenBookIcon } from '../icons'
import React, { useEffect } from 'react'
import { useReducerState } from '../../hooks'
import { useRouter } from 'next/router'

const Courses = () => {
  const router = useRouter()

  const handleNavigate = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setState({ navigating: 'monolisalab' })
  }

  const {
    state: { navigating },
    setState,
  } = useReducerState<{
    navigating?: string
  }>()

  useEffect(() => {
    navigating &&
      setTimeout(() => {
        router.push(`/github/monolisaapp/${navigating}`)
      }, 0)
  }, [navigating])

  return (
    <Box
      shadow
      header={{
        children: 'Courses',
        icon: <CodeIcon />,
      }}
      footer={'💡 Navigate to course to get insights.'}
    >
      <style jsx>{`
        .examples ul {
          margin-top: 10px;
          line-height: 1.5rem;
        }

        li {
          display: flex;
          align-items: center;
        }

        li > div {
          flex: 1;
        }

        .footer p:last-child {
          margin-top: 10px;
        }
      `}</style>

      <div className="examples small">
        <ul>
          <li>
            <div>
              <Flex
                icon={
                  navigating === 'monolisalab' ? <OpenBookIcon /> : <BookIcon />
                }
              >
                <a
                  onClick={handleNavigate}
                  href="/github/monolisaapp/monolisalab"
                >
                  monolisalab
                </a>
              </Flex>
            </div>
            <Button
              size="small"
              icon={navigating === 'monolisalab' ? <Spinner /> : undefined}
              onClick={handleNavigate}
            >
              Details
            </Button>
          </li>
        </ul>
      </div>
    </Box>
  )
}

export default Courses
