import { createSlice } from '@reduxjs/toolkit'

const notificationTypeSlice = createSlice({
  name: 'notificationType',
  initialState: 'notif',
  reducers: {
    setErrorType(state, action) {
      return 'error'
    },
    setNotificationType(state, action) {
      return 'notif'
    },
  },
})

export const { setErrorType, setNotificationType } =
  notificationTypeSlice.actions

export const setMessageType = (type) => {
  if (type === 'notif')
    return (dispatch) => {
      dispatch(setNotificationType())
    }
  return (dispatch) => {
    dispatch(setErrorType())
  }
}

export default notificationTypeSlice.reducer
