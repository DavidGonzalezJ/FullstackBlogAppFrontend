import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    writeNotification(state, action) {
      return action.payload
    },
    hideNotification(state, action) {
      return ''
    },
  },
})

export const { writeNotification, hideNotification } = notificationSlice.actions

export const setNotification = (content, seconds) => {
  return (dispatch) => {
    dispatch(writeNotification(content))
    setTimeout(() => dispatch(hideNotification()), seconds * 1000)
  }
}

export default notificationSlice.reducer
