import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NavigationMenu = ({ handleLogout }) => {
  const user = useSelector((state) => state.user)

  const padding = {
    padding: 5,
  }

  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user && (
        <>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </>
      )}
    </div>
  )
}

export default NavigationMenu
