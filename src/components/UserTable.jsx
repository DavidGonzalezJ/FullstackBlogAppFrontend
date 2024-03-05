import { initUserList } from '../reducers/userListReducer'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const UserTable = () => {
  const users = useSelector((state) => state.userList)
  const dispatch = useDispatch()

  //Had to make a middlestep to avoid a warning
  useEffect(() => {
    const init = () => dispatch(initUserList())
    init()
  }, [])

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default UserTable
