const dummy = (blogs) => {
  const blog = 1
  return blog
}

const totalLikes = (blogs) => {
  let sum = 0
  for (let i = 0; i < blogs.length; i++) {
    sum += blogs[i].likes
  }
  return sum
}

const favoriteBlog = (blogs) => {
  let favourite = { title: '', author: '', likes: 0 }
  for (let i = 0; i < blogs.length; i++) {
    current = blogs[i]
    if (current.likes >= favourite.likes) {
      favourite.title = current.title
      favourite.author = current.author
      favourite.likes = current.likes
    }
  }
  return favourite
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}