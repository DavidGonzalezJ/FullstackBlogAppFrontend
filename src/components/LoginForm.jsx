import { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

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
    <Form onSubmit={loginHandler}>
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
      <Button id="login-button" type="submit">
        login
      </Button>
    </Form>
  )
}

LoginForm.propTypes = {
  logIn: PropTypes.func.isRequired,
}

export default LoginForm
