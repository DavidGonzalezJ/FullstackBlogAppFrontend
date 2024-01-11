import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('Blog renders title and author but not url or likes by default', () => {
  const blog = {
    title: 'Miguelin Durain',
    author: 'Michael J. Fox',
    url: 'umaite.com/wawawiwa',
    likes: '0'
  }

  const mockHandler = jest.fn()

  const { container } = render (<Blog blog={blog} likeHandler={mockHandler} deleteHandler={mockHandler}/>)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Miguelin Durain')
  expect(div).toHaveTextContent('Michael J. Fox')

  const notShown = container.querySelector('.blogDetails')
  expect(notShown).toHaveStyle('display: none')
  expect(notShown).toHaveTextContent('umaite.com/wawawiwa')
  expect(notShown).toHaveTextContent('0')

})