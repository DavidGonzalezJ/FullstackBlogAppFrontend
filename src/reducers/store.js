import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer.js'
import notificationTypeReducer from './notificationTypeReducer.js'
//import thunk from 'redux-thunk'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    notificationType: notificationTypeReducer,
  },
})

export default store
