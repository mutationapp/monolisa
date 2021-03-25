import classNames from 'classnames'
import React from 'react'
import Spinner from '../spinner'

type avatarProps = {
  name: string
  size?: number
  className?: string
  processing?: boolean
}

const Avatar = (props: avatarProps) => {
  const { size, name, className, processing } = {
    size: 30,
    ...props,
  }

  const initial = name.substring(0, 1).toUpperCase()

  return (
    <span
      data-initial={processing ? '' : initial}
      className={classNames('avatar', className)}
    >
      <style jsx>{`
        .avatar > :global(img) {
          border-radius: 50%;
        }

        .avatar {
          width: ${size}px;
          height: ${size}px;
          line-height: ${size}px;
          font-size: ${size * 0.5}px;
          display: inline-flex;
          border-radius: 50%;
          text-align: center;
          background-color: var(--foreground);
          color: var(--background);
          align-items: center;
          justify-content: center;
        }
        .avatar:after {
          content: attr(data-initial);
        }

        .processing {
          margin: 0 auto;
        }
      `}</style>
      {processing && <Spinner />}
    </span>
  )
}

export default Avatar
