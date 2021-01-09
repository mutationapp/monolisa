import Image, { ImageProps } from 'next/image'

const Img: React.FunctionComponent<ImageProps> = props => {
  const { src, alt, unoptimized } = props

  if (unoptimized) {
    return <img {...{ src, alt }} />
  }

  return <Image {...props} />
}

export default Img
