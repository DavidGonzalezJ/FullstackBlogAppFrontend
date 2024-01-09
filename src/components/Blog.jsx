import { useState } from "react"

const Blog = ({ blog }) => {
  const [fullView, setfullView] = useState(false)

  const hideInFullView = { display: fullView ? 'none' : ''}
  const showInFullView = { display: fullView ? '' : 'none'}

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

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
        <button style={hideInFullView} onClick={toggleFullView}>view</button>
        <button style={showInFullView} onClick={toggleFullView}>hide</button>
        <div style={showInFullView}>
          {blog.url}<br />
          likes {blog.likes} <button style={showInFullView}>like</button> <br />
          {blog.user && blog.user.name}
        </div>
    </div>  
  )
}

export default Blog