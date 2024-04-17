import { useState, useEffect, useRef } from 'react'
import { SuccessNotification, ErrorNotification } from './components/Notification'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials!')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.clear()
      blogService.setToken(null)
      setUser(null)
    } catch (exception) {
      setErrorMessage('Logout failed')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setSuccessMessage(`A new blog: ${returnedBlog.title}, by author: ${returnedBlog.author} added.`)
        setTimeout(() => { setSuccessMessage(null) }, 5000)
        let returnedBlogNew = { ...returnedBlog, ['user']: { ['username']: user.username, ['name']: user.name } }
        setBlogs(blogs.concat(returnedBlogNew))
      })
      .catch(error => {
        setErrorMessage('Invalid blog parameters!')
        setTimeout(() => { setErrorMessage(null) }, 5000)
      })
  }

  const addLike = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        setErrorMessage('Like failed!')
        setTimeout(() => { setErrorMessage(null) }, 5000)
      })
  }

  const removeBlog = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    if (window.confirm(`Remove blog: ${blog.title}, by author: ${blog.author}?`)) {
      blogService
        .remove(id)
        .then(deletedBlog => {
          setBlogs(blogs.filter(blog => blog.id !== id))
        })
        .catch(error => {
          setErrorMessage('Removing failed!')
          setTimeout(() => { setErrorMessage(null) }, 5000)
        })
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <ErrorNotification message={errorMessage} />
        <SuccessNotification message={successMessage} />
        <form onSubmit={handleLogin}>
          <div>username<input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/></div>
          <div>password<input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/></div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      <div>
        <p>
          {user.name} logged-in {' '}
          <button onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} likeBlog={addLike} deleteBlog={removeBlog} authorized={(user.username === blog.user.username)} />
        )}
      </div>
    </div>
  )
}

export default App