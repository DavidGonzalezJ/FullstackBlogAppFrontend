import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UserTable from './components/UserTable'
import User from './components/User'
import BlogDetails from './components/BlogDetails'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { setMessageType } from './reducers/notificationTypeReducer'
import { setUser } from './reducers/userReducer'
import {
  initBlogs,
  createBlog,
  likeBlog,
  removeBlog,
  comment,
} from './reducers/blogReducer'
import BlogList from './components/BlogList'
import NavigationMenu from './components/NavigationMenu'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  //This method changes and sets the notification
  //type and content in the store, the Notification
  //component uses it to render the message
  const showNotification = (type, content, time) => {
    dispatch(setMessageType(type))
    dispatch(setNotification(content, time))
  }

  //Initializes the blog list for the first time
  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  //Tries to load from the page the already logged user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
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
      dispatch(setUser(user))
      showNotification('notif', `${user.name} logged in!`, 3)
    } catch (exception) {
      showNotification('error', 'Wrong username or password', 3)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
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

  const handleComment = (id, content) => {
    dispatch(comment(id, content))
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

  const homeContent = () => {
    if (user)
      return (
        <>
          {blogForm()}
          <br />
          {blogList(handleLike, handleDelete)}
        </>
      )
    else return loginForm()
  }

  return (
    <div className="container">
      <Router>
        <NavigationMenu handleLogout={handleLogout} />
        <h2>blogs</h2>
        <Notification />
        <Routes>
          <Route path="/" element={homeContent()} />
          <Route path="/users" element={<UserTable />} />
          <Route path="/users/:id" element={<User />} />
          <Route
            path="/blogs/:id"
            element={
              <BlogDetails
                likeHandler={handleLike}
                commentHandler={handleComment}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
