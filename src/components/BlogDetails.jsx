import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const BlogDetails = ({ likeHandler }) => {
  const blogId = useParams().id
  const blogList = useSelector((state) => state.blogs)
  const blog = blogList.find((b) => b.id === blogId)

  const thisLikeHandler = () => {
    likeHandler(blog.id)
  }

  if (!blog) return null

  return (
    <>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes
        <button onClick={thisLikeHandler} id="like-button">
          like
        </button>
      </p>
      {blog.user && <p>added by {blog.user.name}</p>}
    </>
  )
}

export default BlogDetails
