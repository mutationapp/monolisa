import { Fragment } from 'react'
import { Header } from '../components'

const Index = () => {
  return (
    <Fragment>
      <Header kind="h1" text={'H1 Title'} />
      <Header kind="h2" text={'H2 Title'} />
      <Header kind="h3" text={'H3 Title'} />
      <Header kind="h4" text={'H4 Title'} />
      <Header kind="h5" text={'H5 Title'} />
      <Header kind="h6" text={'H6 Title'} />
    </Fragment>
  )
}

export default Index
