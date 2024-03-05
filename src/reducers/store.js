import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer.js'
import notificationTypeReducer from './notificationTypeReducer.js'
import blogReducer from './blogReducer.js'
import userReducer from './userReducer.js'
import userListReducer from './userListReducer.js'
//import thunk from 'redux-thunk'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    notificationType: notificationTypeReducer,
    blogs: blogReducer,
    user: userReducer,
    userList: userListReducer,
  },
})

export default store
