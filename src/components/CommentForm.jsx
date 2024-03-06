import { useState } from 'react'

const CommentForm = ({ addComment }) => {
  const [comment, setComment] = useState('')

  const postComment = (event) => {
    event.preventDefault()
    /*const commentObject = {
        content: comment
      }*/
    addComment(comment)
    setComment('')
  }

  return (
    <form onSubmit={postComment}>
      <input
        type="text"
        value={comment}
        name="Comment"
        id="comment"
        onChange={({ target }) => setComment(target.value)}
      />
      <button id="comment-submit" type="submit">
        add comment
      </button>
    </form>
  )
}

export default CommentForm
