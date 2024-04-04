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
  
module.exports = {
  dummy,
  totalLikes
}