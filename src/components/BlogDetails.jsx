import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CommentForm from './CommentForm'

const BlogDetails = ({ likeHandler, commentHandler }) => {
  const blogId = useParams().id
  const blogList = useSelector((state) => state.blogs)
  const blog = blogList.find((b) => b.id === blogId)

  const thisLikeHandler = () => {
    likeHandler(blog.id)
  }

  const thisCommentHandler = (comment) => {
    commentHandler(blog.id, comment)
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
      <h3>comments</h3>
      <CommentForm addComment={thisCommentHandler} />
      <ul>
        {blog.comments.map((c) => (
          <li key={c.id}>{c.content}</li>
        ))}
      </ul>
    </>
  )
}

export default BlogDetails
