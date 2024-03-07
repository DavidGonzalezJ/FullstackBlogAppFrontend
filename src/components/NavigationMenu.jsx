import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navbar, Nav, Button } from 'react-bootstrap'

const NavigationMenu = ({ handleLogout }) => {
  const user = useSelector((state) => state.user)

  const padding = {
    padding: 5,
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">
              blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">
              users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {user && (
              <>
                <em style={padding}>{user.name} logged in</em>
                <Button variant="secondary" onClick={handleLogout}>
                  logout
                </Button>
              </>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )

  /*return (
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
  )*/
}

export default NavigationMenu
