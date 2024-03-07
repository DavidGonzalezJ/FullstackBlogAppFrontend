import { useSelector } from 'react-redux'
import Blog from './Blog'
import { Table } from 'react-bootstrap'

const BlogList = ({ handleLike, handleDelete }) => {
  //Gets from the store the blog list
  const list = useSelector((state) => state.blogs)

  const listToShow = [...list]
  listToShow.sort((a, b) => b.likes - a.likes)

  return (
    <Table striped>
      <tbody>
        {listToShow.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeHandler={handleLike}
            deleteHandler={handleDelete}
            user={blog.user}
          />
        ))}
      </tbody>
    </Table>
  )
}

export default BlogList
