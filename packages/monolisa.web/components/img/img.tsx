import { css } from '@emotion/css'
import Image, { ImageProps } from 'next/image'

const Img: React.FunctionComponent<ImageProps> = props => {
  const { src, alt, unoptimized } = props

  // if (unoptimized) {
  //   return <img {...{ src, alt }} />
  // }

  return (
    // <div {...{ className: css({ position: 'relative' }) }}>
    <img
      {...{
        src,
        alt,
        className: css({
          display: 'block',
          width: '100%',
          top: 0,
        }),
      }}
    />
    // </div>
  )

  return <Image {...props} />
}

export default Img
