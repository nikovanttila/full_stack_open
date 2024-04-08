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

test.only('a valid blog  can be added ', async () => {
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

  const contents = blogsAtEnd.map(n => n.title)
  assert(contents.includes('Aspect-Oriented Programming is Quantification and Obliviousness'))
})

after(async () => {
  await mongoose.connection.close()
})