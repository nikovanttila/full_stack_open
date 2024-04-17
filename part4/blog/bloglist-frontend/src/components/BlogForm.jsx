import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewBlog((prevBlogValues) => ({
      ...prevBlogValues,
      [name]: value,
    }))
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>title:<input onChange={handleInputChange} name='title' value={newBlog.title}/></div>
        <div>author:<input onChange={handleInputChange} name='author' value={newBlog.author}/></div>
        <div>url:<input onChange={handleInputChange} name='url' value={newBlog.url}/></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm