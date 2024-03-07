import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, likeHandler, deleteHandler, user }) => {
  const [fullView, setfullView] = useState(false)

  const hideInFullView = { display: fullView ? 'none' : '' }
  const showInFullView = { display: fullView ? '' : 'none' }
  const showDeleteButton = blog.user && user.username === blog.user.username

  const toggleFullView = () => {
    setfullView(!fullView)
  }

  /*const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }*/

  const deleteButtonStyle = {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  }

  const thisLikeHandler = () => {
    likeHandler(blog.id)
  }

  const thisDeleteHandler = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
      deleteHandler(blog.id)
  }

  return (
    <tr className="blog" key={blog.id}>
      <td>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        <div style={showInFullView} className="blogDetails">
          {blog.url}
          <br />
          likes {blog.likes}{' '}
          <Button
            style={showInFullView}
            id="like-button"
            onClick={thisLikeHandler}
          >
            like
          </Button>{' '}
          <br />
          {blog.user && blog.user.name} <br />
          {showDeleteButton && (
            <Button
              variant="primary"
              style={deleteButtonStyle}
              onClick={thisDeleteHandler}
            >
              remove
            </Button>
          )}
        </div>
      </td>
      <td>{blog.author}</td>
      <td>
        <Button
          style={hideInFullView}
          onClick={toggleFullView}
          id="view-button"
        >
          view
        </Button>
        <Button
          variant="secondary"
          style={showInFullView}
          onClick={toggleFullView}
          id="hide-button"
        >
          hide
        </Button>
      </td>
    </tr>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
}

export default Blog
