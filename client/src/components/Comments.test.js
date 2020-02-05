/* global expect */
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, shallow } from '@testing-library/react'

import Comments from './Comments'

const props = {
  comments: [
    {
      _id: 1,
      content: 'hello comment111',
      createdBy: 'you',
      createdOn: 'today'
    },
    {
      _id: 2,
      content: 'commetn2',
      createdBy: 'you',
      createdOn: 'yesterday'
    }
  ],
  isAuthenticated: true,
  user: {
    permissionsLevel: 3,
    name: 'test-name'
  }
}

describe('<Comments	/>', () => {
  it('renders the settings button on your own profile', () => {
    const { getByText } = render(<Comments {...props} />);

    expect(getByText('hello comment111')).toBeInTheDocument()
  })
})
