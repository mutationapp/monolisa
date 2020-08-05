import React from 'react'
import { dealWithIt } from 'monolisa.lib'

const DealWithIt: React.FunctionComponent<{ text: string }> = ({ text }) => (
  <div>{dealWithIt(text)}</div>
)

export default DealWithIt
