const { gql } = require('apollo-server')
const { prisma } = require('./db')

const typeDefs = gql`
  type User {
    email: String!
    id: ID!
    name: String
    posts: [Post!]!
  }

  type Post {
    content: String
    id: ID!
    published: Boolean!
    title: String!
    author: User
    button_normal: String
    button_pressed: String
  }

  type Query {
    feed: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    createUser(data: UserCreateInput!): User!
    createMeme(authorEmail: String, content: String, title: String!, published: Boolean, button_normal: String, button_pressed: String): Post!
    publish(id: ID!): Post
  }

  input UserCreateInput {
    email: String!
    name: String
    posts: [PostCreateWithoutAuthorInput!]
  }

  input PostCreateWithoutAuthorInput {
    content: String
    published: Boolean
    title: String!
  }
`

const resolvers = {
  Query: {
    feed: (parent, args) => {
      return prisma.post.findMany({
        where: { published: true },
      })
    },
    post: (parent, args) => {
      return prisma.post.findOne({
        where: { id: Number(args.id) },
      })
    },
  },
  Mutation: {
    createMeme: (parent, args) => {
      return prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
          published: args.published,
          author: args.authorEmail && {
            connect: { email: args.authorEmail },
          },
          button_normal: args.button_normal,
          button_pressed: args.button_pressed
        },
      })
    },
    publish: (parent, args) => {
      return prisma.post.update({
        where: { id: Number(args.id) },
        data: {
          published: true,
        },
      })
    },
    createUser: (parent, args) => {
      return prisma.user.create({
        data: {
          email: args.data.email,
          name: args.data.name,
          posts: {
            create: args.data.posts,
          },
        },
      })
    },
  },
  User: {
    posts: (parent, args) => {
      return prisma.user
        .findOne({
          where: { id: parent.id },
        })
        .posts()
    },
  },
  Post: {
    author: (parent, args) => {
      return prisma.post
        .findOne({
          where: { id: parent.id },
        })
        .author()
    },
  },
}

module.exports = {
  resolvers,
  typeDefs,
}