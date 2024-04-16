import { useState, useEffect, useRef } from 'react'
import { Blog, SuccessNotification, ErrorNotification } from './components/Blog'
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
          setBlogs(blogs.concat(returnedBlog))
        })
      .catch(error => {
          setErrorMessage(`Invalid blog parameters!`)
          setTimeout(() => { setErrorMessage(null) }, 5000)
        })
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
          {user.name} logged-in
          <button onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App