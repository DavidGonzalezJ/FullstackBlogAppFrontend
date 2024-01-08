import { useState } from "react"

const LoginForm = ({ logIn }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler = (event) => {
        event.preventDefault()
        logIn(username, password)
        setUsername('')
        setPassword('')
    }

    return(
    <form onSubmit={loginHandler}>
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

export default LoginForm