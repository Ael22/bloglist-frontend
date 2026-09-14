import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [currentBlog, setCurrentBlog] = useState(blog)
  const [view, setView] = useState(false)

  const handleViewBlog = () => {
    setView(!view)
  }

  const addLike = async (event) => {
    event.preventDefault()
    const newObject = {
      ...currentBlog,
      likes: currentBlog.likes + 1,
      user: currentBlog.user.id
    }
    const updatedBlog = await blogService.increaseLike(newObject)
    setCurrentBlog(updatedBlog)
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${currentBlog.title} by ${currentBlog.author}`)) {
      await blogService.deleteBlog(currentBlog.id)
    } else {
      return
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {currentBlog.title} {view ? '' : currentBlog.author} <button onClick={handleViewBlog}>{view ? 'hide' : 'view'}</button>
      {
        view
          ? <>
            <br />
            {currentBlog.url} <br />
            likes {currentBlog.likes} <button onClick={addLike}>like</button> <br />
            {currentBlog.author} <br />
            {
              JSON.parse(localStorage.getItem('loggedBloglistUser')).username === currentBlog.user.username
                ? <button onClick={handleDelete}>delete</button>
                : ''
            }
          </>
          : ''
      }
    </div>
  )
}



export default Blog