const Text: React.FunctionComponent<{ content: string; of?: 'h1' | 'h2' }> = ({
  content,
}) => {
  return (
    <div className="text">
      <style jsx>{`
        .text {
          font-size: 1.6rem;
          line-height: 2.4rem;
        }

        @media screen and (min-width: 600px) {
          .text {
            font-size: 1.8rem;
            line-height: 2.7rem;
          }
        }

        @media screen and (min-width: 900px) {
          .text {
            font-size: 1.8rem;
            line-height: 2.7rem;
          }
        }

        @media screen and (min-width: 1200px) {
          .text {
            font-size: 2rem;
            line-height: 3rem;
          }
        }

        @media screen and (min-width: 1600px) {
          .text {
            font-size: 2.5rem;
            line-height: 3.7rem;
          }
        }
      `}</style>
      {content}
    </div>
  )
}

export default Text
