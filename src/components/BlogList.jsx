import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ handleLike, handleDelete }) => {
  //Gets from the store the blog list
  const list = useSelector((state) => state.blogs)

  const listToShow = [...list]
  listToShow.sort((a, b) => b.likes - a.likes)

  return listToShow.map((blog) => (
    <Blog
      key={blog.id}
      blog={blog}
      likeHandler={handleLike}
      deleteHandler={handleDelete}
      user={blog.user}
    />
  ))
}

export default BlogList
