import Avatar from './avatar'
import React from 'react'
import { shallow } from 'enzyme'

test.each([
  {
    processing: true,
  },
  {
    processing: false,
  },
])('Renders', ({ processing }) => {
  expect(
    shallow(<Avatar name="avatar" processing={processing} />),
  ).toMatchSnapshot()
})
