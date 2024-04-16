const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='success'>
      {message}
    </div>
  )
}

export { Blog, ErrorNotification, SuccessNotification }