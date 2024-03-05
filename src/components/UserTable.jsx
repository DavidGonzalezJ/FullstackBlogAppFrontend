import userService from '../services/users'
import { useState, useEffect } from 'react'

const UserTable = () => {
    const [users, setUsers] = useState([])

    const getlist = async() => {
        const list = await userService.getAll()
        setUsers(list)
    }
    //Had to do that middlestep because it caused errors otherwise
    useEffect(() => {const initUsers = () => getlist()
        initUsers()}, [])

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
                        <td>{user.name}</td>
                        <td>{user.blogs.length}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default UserTable