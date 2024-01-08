import { useState } from "react"

const BlogForm = ({ addBlog }) => {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')

    const postBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl
        }
        addBlog(blogObject)
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
    }

    return(
      <form onSubmit={postBlog}>
        <div>
          title:
            <input
            type="text"
            value={blogTitle}
            name="BlogTitle"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={blogAuthor}
            name="BlogAuthor"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
            <input
            type="text"
            value={blogUrl}
            name="BlogUrl"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>     
    ) 
}

export default BlogForm 