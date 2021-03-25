import React from 'react'

const FieldSets: React.FunctionComponent = ({ children }) => {
  return (
    <ul>
      {React.Children.map(children, child => (
        <li className="FieldSet">{child}</li>
      ))}
      <style jsx>{`
        ul {
          margin: 0;
          padding: 0;
          list-style-type: none;
        }
        li {
          margin-bottom: 20px;
        }
      `}</style>
    </ul>
  )
}
export default FieldSets
