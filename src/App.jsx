import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function getBlogs(){
      const blogs = await blogService.getAll()
      setBlogs( blogs )
    }
    getBlogs()
  }, [])

  const handleLogin = async(event) =>{
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      /*window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )*/
      //noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('GOT GOOD USER')
    } catch (exception) {
      console.log('Wrong credentials')
    }
  }


  const blogList = () => {
    if (Array.isArray(blogs))
      return blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )
  }

  const loginForm = () => (
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

  return (
    <div>
      <h2>blogs</h2>
      { user === null ?
        loginForm() :
        blogList()
      }
    </div>
  )
}

export default App