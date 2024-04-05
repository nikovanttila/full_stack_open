const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[3])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[4])
  await blogObject.save()
})

test.only('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test.only('there are five blogs', async () => {
  const response = await api.get('/api/blogs')
  
  assert.strictEqual(response.body.length, initialBlogs.length)
})

after(async () => {
  await mongoose.connection.close()
})