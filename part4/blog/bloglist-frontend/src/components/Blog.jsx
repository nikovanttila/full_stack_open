import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, deleteBlog, authorized }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showWhenAuthorized = { display: authorized ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = (event) => {
    event.preventDefault()
    likeBlog(blog.id)
  }

  const removeBlog = (event) => {
    event.preventDefault()
    deleteBlog(blog.id)
  }

  return (
    <div style={blogStyle}>
      <div>
        <div style={hideWhenVisible}>
          {blog.title + ' '}
          <button onClick={toggleVisibility}>view</button>
        </div>
        <div style={showWhenVisible}>
          {blog.title + ' '}
          <button onClick={toggleVisibility}>cancel</button>
          <div>
            <div>{blog.url}</div>
            <div>
              likes {blog.likes + ' '}
              <button onClick={addLike}>like</button>
            </div>
            <div>{blog.author}</div>
          </div>
          <div style={showWhenAuthorized}>
            <button onClick={removeBlog}>remove</button>
          </div>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  authorized: PropTypes.bool.isRequired
}

export default Blog