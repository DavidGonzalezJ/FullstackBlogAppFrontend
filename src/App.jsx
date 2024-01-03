import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')


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
      console.log('GOT CORRECT USER')
    } catch (exception) {
      console.log('Wrong credentials')
    }
  }

  const handleLogout = async(event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    console.log('LOGGED OUT')
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
      console.log('BLOG POSTED')
    } catch (exception) {
      console.log(exception)
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