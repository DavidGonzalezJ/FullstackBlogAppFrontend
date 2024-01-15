import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeHandler, deleteHandler, user }) => {
  const [fullView, setfullView] = useState(false)

  const hideInFullView = { display: fullView ? 'none' : '' }
  const showInFullView = { display: fullView ? '' : 'none' }
  const showDeleteButton = blog.user && user.username === blog.user.username

  const toggleFullView = () => {
    setfullView(!fullView)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteButtonStyle = {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer'
  }

  const thisLikeHandler = () => {
    likeHandler(blog.id)
  }

  const thisDeleteHandler = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
      deleteHandler(blog.id)
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button style={hideInFullView} onClick={toggleFullView} id='view-button'>view</button>
      <button style={showInFullView} onClick={toggleFullView} id='hide-button'>hide</button>
      <div style={showInFullView} className='blogDetails'>
        {blog.url}<br />
          likes {blog.likes} <button style={showInFullView}
          id='like-button' onClick={thisLikeHandler}>like</button> <br />
        {blog.user && blog.user.name} <br />
        {showDeleteButton && <button style={deleteButtonStyle} onClick={thisDeleteHandler}>remove</button>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired
}

export default Blog