import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: ""
  });

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBlog((prevBlogValues) => ({
      ...prevBlogValues,
      [name]: value,
    }));
  };

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = newBlog
    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNewBlog({title: "", author: "", url: ""})
        })
      .catch(error => {
          setErrorMessage(
            `Invalid parameters`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
  }

  const blogForm = () => (
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

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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
      <div>
        <p>
          {user.name} logged-in
          <button onClick={handleLogout}>logout</button>
        </p>
        {blogForm()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App