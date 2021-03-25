import ReactMarkdown from 'markdown-to-jsx'
import React from 'react'
import { t } from '../../styles/typography'

const { h1, content } = t

const Markdown: React.FunctionComponent<{ children: string }> = ({
  children,
}) => {
  return (
    <ReactMarkdown
      options={{
        overrides: {
          h1: {
            component: props => <h1 {...props} style={h1} />,
            // props: {
            //   className: "foo",
            // },
          },
          p: {
            component: props => <p {...props} style={content} />,
          },
          ul: {
            component: props => (
              <ul {...props} style={{ ...content, lineHeight: 1.8 }}>
                {props.children}
              </ul>
            ),
          },
        },
      }}
    >
      {children}
    </ReactMarkdown>
  )
}

export { Markdown as default }
