import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { setMessageType } from './reducers/notificationTypeReducer'
import {
  initBlogs,
  createBlog,
  likeBlog,
  removeBlog,
} from './reducers/blogReducer'
import BlogList from './components/BlogList'

const App = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)

  //This method changes and sets the notification
  //type and content in the store, the Notification
  //component uses it to render the message
  const showNotification = (type, content, time) => {
    dispatch(setMessageType(type))
    dispatch(setNotification(content, time))
  }

  useEffect(() => {
    dispatch(initBlogs())
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

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    showNotification('notif', 'Succesfully logged out!', 3)
  }

  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
  }

  const handleLike = (id) => {
    dispatch(likeBlog(id))
  }

  const handleDelete = (id) => {
    dispatch(removeBlog(id))
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
    )
  }

  const blogList = (likeHandler, deleteHandler) => {
    return <BlogList handleLike={likeHandler} handleDelete={deleteHandler} />
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
      {user === null ? loginForm() : blogList(handleLike, handleDelete)}
    </div>
  )
}

export default App
