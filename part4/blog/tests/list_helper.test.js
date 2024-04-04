const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithZeroBlogs = []
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]
  const listWithMultipleBlogs = [
    {
      _id: '6602aa09a7e7e036cad0152f',
      title: 'first test',
      author: 'first author',
      url: 'http://localhost:3003',
      likes: 1,
      __v: 0
    },
    {
      _id: '6602b24b89302c1ee0538c9d',
      title: 'second test',
      author: 'second author',
      url: 'http://localhost:3003',
      likes: 2,
      __v: 0
    },
    {
      _id: '6602d1371824b877f91298b7',
      title: 'third test',
      author: 'third author',
      url: 'http://localhost:3003',
      likes: 3,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(listWithZeroBlogs)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    assert.strictEqual(result, 6)
  })
})

describe('most likes', () => {
  const listWithMultipleBlogs = [
    {
      _id: '6602aa09a7e7e036cad0152f',
      title: 'first test',
      author: 'first author',
      url: 'http://localhost:3003',
      likes: 1,
      __v: 0
    },
    {
      _id: '6602b24b89302c1ee0538c9d',
      title: 'second test',
      author: 'second author',
      url: 'http://localhost:3003',
      likes: 2,
      __v: 0
    },
    {
      _id: '6602d1371824b877f91298b7',
      title: 'third test',
      author: 'third author',
      url: 'http://localhost:3003',
      likes: 3,
      __v: 0
    }
  ]

  test('of a bigger list of blogs is favourite blog', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    assert.deepStrictEqual(result, { title: 'third test', author: 'third author', likes: 3 })
  })
})