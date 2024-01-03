import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({type,message}) => {
  if(message === null) return null
  let messageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (type === 'error'){
    messageStyle.color = 'red'
  }
  return(
    <div style={messageStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [msg, setMsg] = useState(null)
  const [notificationType, setNotificationType] = useState('notif')


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

  const handleLogin = async(event) =>{
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationType('notif')
      setMsg(`${user.name} logged in!`)
      setTimeout(() =>{
        setMsg(null)
      }, 5000)
    } catch (exception) {
      setNotificationType('error')
      setMsg(`Wrong username or password`)
      setTimeout(() =>{
        setMsg(null)
      }, 5000)
    }
  }

  const handleLogout = async(event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setNotificationType('notif')
      setMsg(`Succesfully logged out!`)
      setTimeout(() =>{
        setMsg(null)
      }, 5000)
  }

  const handleBlogPost = async(event) => {
    event.preventDefault()
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    try {
      await blogService.create(blogObject)
      setBlogAuthor('')
      setBlogTitle('')
      setBlogUrl('')
      getBlogs()
      setNotificationType('notif')
      setMsg(`The blog ${blogObject.title} by ${blogObject.author} has been added`)
      setTimeout(() =>{
        setMsg(null)
      }, 5000)
    } catch (exception) {
      setNotificationType('error')
      setMsg(`Could not post the blog!`)
      setTimeout(() =>{
        setMsg(null)
      }, 5000)
    }
  }


  const blogList = () => {
      return blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />)
  }

  const loginForm = () => {
    return(
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>     
    ) 
  }

  const newBlogForm = () => {
    return(
      <form onSubmit={handleBlogPost}>
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

  return (
    <div>
      <h2>blogs</h2>
      <Notification message = {msg} type = {notificationType}/>
      { user !== null && <div>
        <p>{user.name} logged in
        <button onClick={handleLogout}>
          logout</button>
          </p>
      </div> }
      { user !== null && newBlogForm()}
      <br/>
      { user === null ?
        loginForm() :
        blogList()
      }
    </div>
  )
}

export default App