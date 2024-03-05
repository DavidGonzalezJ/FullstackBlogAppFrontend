import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const userListSlice = createSlice({
  name: 'userList',
  initialState: [],
  reducers: {
    setUserList(state, action) {
      return action.payload
    },
  },
})

export const { setUserList } = userListSlice.actions

export const initUserList = () => {
    return async dispatch => {
        const users = await usersService.getAll()
        dispatch(setUserList(users))
    }
}

export default userListSlice.reducer