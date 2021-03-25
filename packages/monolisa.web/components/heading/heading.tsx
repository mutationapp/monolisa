import Wrapper from '../wrapper'

const Heading: React.FunctionComponent = ({ children }) => {
  return (
    <div className="heading">
      <style jsx>{`
        .heading {
          border-bottom: 1px solid var(--shade-2);
          padding: 30px 0;
        }
      `}</style>
      <Wrapper>{children}</Wrapper>
    </div>
  )
}

export default Heading
