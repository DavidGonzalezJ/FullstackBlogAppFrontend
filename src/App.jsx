import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  
  const notificationRef = useRef()
  
  const notification = () => {
    return(
      <Notification ref={ notificationRef }/>
    )
  }

  async function getBlogs(){
    const blogs = await blogService.getAll()
    setBlogs( blogs )
  }

  useEffect(() => {
    getBlogs()
  }, [])
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async(username, password) =>{
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      notificationRef.current.invokeNotification('notif', `${user.name} logged in!`)
    } catch (exception) {
      notificationRef.current.invokeNotification('error', `Wrong username or password`)
    }
  }

  const handleLike = async(id) => {
    try {
      await blogService.like(id)
      getBlogs()
    }catch {
      notificationRef.current.invokeNotification('error', `Could not process like`)
    }
  }

  const handleDelete = async(id) => {
    try {
      await blogService.deleteBlog(id)
      getBlogs()
      notificationRef.current.invokeNotification('notif', `Blog deleted successfully`)
    }catch {
      notificationRef.current.invokeNotification('error', `Could not delete the blog`)
    }
  }
  
  const handleLogout = async(event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    notificationRef.current.invokeNotification('notif', `Succesfully logged out!`)
  }


  const blogFormRef = useRef()

  const blogForm = () => {
    return (
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <BlogForm addBlog={addBlog}/>
      </Togglable>
    )
  }
  
  const addBlog = async(blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      await blogService.create(blogObject)
      getBlogs()
      notificationRef.current.invokeNotification('notif', `The blog ${blogObject.title} by ${blogObject.author} has been added`)
    } catch (exception) {
      notificationRef.current.invokeNotification('error', `Could not post the blog!`)
    }
  }

  const blogList = () => {
      blogs.sort((a, b) => b.likes - a.likes)
      console.log(user)
      return blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeHandler={handleLike}
        deleteHandler={handleDelete} user={user}/>)
  }

  const loginForm = () => {
    return (
      <LoginForm logIn={handleLogin}/>
    )
  }


  return (
    <div>
      <h2>blogs</h2>
      { notification() }
      { user !== null && <div>
        <p>{user.name} logged in
        <button onClick={handleLogout}>
          logout</button>
          </p>
      </div> }
      { user !== null && blogForm()}
      <br/>
      { user === null ?
        loginForm() :
        blogList()
      }
    </div>
  )
}

export default App