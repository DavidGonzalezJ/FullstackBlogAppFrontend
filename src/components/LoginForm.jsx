import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ logIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginHandler = (event) => {
    event.preventDefault()
    logIn(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={loginHandler}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  logIn: PropTypes.func.isRequired,
}

export default LoginForm
