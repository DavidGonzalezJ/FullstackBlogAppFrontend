import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { setMessageType } from './reducers/notificationTypeReducer'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  //This method changes and sets the notification
  //type and content in the store, the Notification
  //component uses it to render the message
  const showNotification = (type, content, time) => {
    dispatch(setMessageType(type))
    dispatch(setNotification(content, time))
  }

  async function getBlogs() {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      showNotification('notif', `${user.name} logged in!`, 3)
    } catch (exception) {
      showNotification('error', 'Wrong username or password', 3)
    }
  }

  const handleLike = async (id) => {
    try {
      await blogService.like(id)
      getBlogs()
    } catch {
      showNotification('error', 'Could not process like', 3)
    }
  }

  const handleDelete = async (id) => {
    try {
      await blogService.deleteBlog(id)
      getBlogs()
      showNotification('notif', 'Blog deleted successfully', 3)
    } catch {
      showNotification('error', 'Could not delete the blog', 3)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    showNotification('notif', 'Succesfully logged out!', 3)
  }

  const blogFormRef = useRef()

  const blogForm = () => {
    return (
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
    )
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      await blogService.create(blogObject)
      getBlogs()
      showNotification(
        'notif',
        `The blog ${blogObject.title} by ${blogObject.author} has been added`,
        3,
      )
    } catch (exception) {
      showNotification('notif', 'Could not post the blog!', 3)
    }
  }

  const blogList = () => {
    blogs.sort((a, b) => b.likes - a.likes)
    return blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        likeHandler={handleLike}
        deleteHandler={handleDelete}
        user={user}
      />
    ))
  }

  const loginForm = () => {
    return <LoginForm logIn={handleLogin} />
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user !== null && (
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
        </div>
      )}
      {user !== null && blogForm()}
      <br />
      {user === null ? loginForm() : blogList()}
    </div>
  )
}

export default App
