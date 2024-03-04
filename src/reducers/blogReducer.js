import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import { setMessageType } from './notificationTypeReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    getBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    like(state, action) {
      const id = action.payload
      const blogToUpdate = state.find((b) => b.id === id)
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
      }
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog))
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter((b) => b.id !== id)
    },
  },
})

export const { getBlogs, addBlog, like, deleteBlog } = blogSlice.actions

//This method changes and sets the notification
//type and content in the store, the Notification
//component uses it to render the message
const showNotification = (dispatch, type, content, time) => {
  dispatch(setMessageType(type))
  dispatch(setNotification(content, time))
}

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(getBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const addedBlog = await blogService.create(blog)
      dispatch(addBlog(addedBlog))
      showNotification(
        dispatch,
        'notif',
        `The blog ${addedBlog.title} by ${addedBlog.author} has been added`,
        3,
      )
    } catch (e) {
      showNotification(dispatch, 'error', 'Could not post the blog!', 3)
      console.log(e)
    }
  }
}

export const likeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.like(id)
      dispatch(like(id))
    } catch {
      showNotification(dispatch, 'error', 'Could not process like', 3)
    }
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(id)
      dispatch(deleteBlog(id))
      showNotification(dispatch, 'notif', 'Blog deleted successfully', 3)
    } catch {
      showNotification(dispatch, 'error', 'Could not delete the blog', 3)
    }
  }
}

export default blogSlice.reducer
