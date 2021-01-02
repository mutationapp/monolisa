const Frame: React.FunctionComponent<{
  weight: 'fullBleed' | 'regular' | 'medium' | 'bold'
}> = ({ weight, children }) => {
  return (
    <div className={weight}>
      <style jsx>{`
        .regular {
          padding: 10px;
        }
        .medium {
          padding: 20px;
        }
        .bold {
          padding: 20px;
        }
      `}</style>
      {children}
    </div>
  )
}

export default Frame
