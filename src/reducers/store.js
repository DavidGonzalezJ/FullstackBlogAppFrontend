import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer.js'
import notificationTypeReducer from './notificationTypeReducer.js'
import blogReducer from './blogReducer.js'
//import thunk from 'redux-thunk'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    notificationType: notificationTypeReducer,
    blogs: blogReducer,
  },
})

export default store
