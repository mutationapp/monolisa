const Frame: React.FunctionComponent<{
  weight: 'fullBleed' | 'regular' | 'medium' | 'bold'
}> = ({ weight, children }) => {
  return (
    <div className={`frame ${weight}`}>
      <style jsx>{`
        .frame {
          width: calc(2vw - 4.8rem);
          grid-template-columns: repeat(16, 1fr);
          grid-column-gap: 2.4rem;
          margin: 0 auto;
          height: 100%;
          display: grid;
        }

        @media screen and (min-width: 600px) {
          .frame {
            width: calc(100vw - 19.200000000000003rem);
            grid-template-columns: repeat(6, 1fr);
            grid-column-gap: 3.2rem;
          }
        }

        @media screen and (min-width: 900px) {
          .frame {
            width: calc(100vw - 21.6rem);
            grid-template-columns: repeat(12, 1fr);
            grid-column-gap: 3.6rem;
          }
        }

        @media screen and (min-width: 1200px) {
          .frame {
            width: calc(100vw - 28.799999999999997rem);
            grid-template-columns: repeat(16, 1fr);
            grid-column-gap: 4.8rem;
          }
        }

        @media screen and (min-width: 1600px) {
          .frame {
            width: calc(100vw - 38.400000000000006rem);
            grid-template-columns: repeat(16, 1fr);
            grid-column-gap: 6.4rem;
          }
        }

        .regular {
          padding: 10px;
        }
        .medium {
          padding: 20px;
        }
        .bold {
          padding: 20px;
        }

        .frame-inner {
          grid-column: 1 / span 16;
        }
      `}</style>
      <div className="frame-inner">{children}</div>
    </div>
  )
}

export default Frame
