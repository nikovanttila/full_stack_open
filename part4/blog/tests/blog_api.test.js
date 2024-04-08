const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test.only('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test.only('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test.only('blogs contain unique identifier called id', async () => {
  const response = await api.get('/api/blogs')
  
  response.body.forEach(blog => assert.strictEqual(blog.hasOwnProperty('id'), true))
})

test.only('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Aspect-Oriented Programming is Quantification and Obliviousness',
    author: 'Robert E. Filman and Daniel P. Friedman',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/FilmanFriedman00.pdf',
    likes: 1,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  const authors = blogsAtEnd.map(blog => blog.author)
  const urls = blogsAtEnd.map(blog => blog.url)
  assert(titles.includes('Aspect-Oriented Programming is Quantification and Obliviousness'))
  assert(authors.includes('Robert E. Filman and Daniel P. Friedman'))
  assert(urls.includes('https://homepages.cwi.nl/~storm/teaching/reader/FilmanFriedman00.pdf'))
})

test.only('value of likes will default to zero when missing', async () => {
  const newBlog = {
    title: 'Design Pattern Implementation in Java and AspectJ',
    author: 'Jan Hannemann and Gregor Kiczales',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/HannemannKiczales02.pdf'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  addedBlog = blogsAtEnd.filter(blog => blog.title === 'Design Pattern Implementation in Java and AspectJ')
  assert.strictEqual(addedBlog[0].likes, 0)
})

after(async () => {
  await mongoose.connection.close()
})