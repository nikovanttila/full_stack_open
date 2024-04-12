const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Modularity in the Design of Complex Engineering Systems',
        author: 'Carliss Y. Baldwin and Kim B. Clark',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/BaldwinClark06.pdf',
        likes: 3,
    },
    {
        title: 'Programming Pearls',
        author: 'Jon Bentley',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/BentleyEtAl86.pdf',
        likes: 1,
    },
    {
        title: 'The Library Scaling Problem and the Limits of Concrete Component Reuse',
        author: 'Ted J. Biggerstaff',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Biggerstaff94.pdf',
        likes: 6,
    },
    {
        title: 'Real-World CONCURRENCY',
        author: 'Bryan Cantrill and Jeff Bonwick',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/CantrillBonwick08.pdf',
        likes: 3,
    },
    {
        title: 'On Understanding Data Abstraction, Revisited',
        author: 'William R. Cook',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Cook09.pdf',
        likes: 7,
    },
  ]

  const initialUsers = [
    {
        username: 'root',
        name: 'Superuser',
        password: 'validpassword'
    },
    {
        username: 'artohellas',
        name: 'Arto Hellas',
        password: 'validpassword'
    }
  ]

const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()
  
    return blog._id.toString()
}
  
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
  
module.exports = {
    initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb,
}