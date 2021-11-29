const { gql } = require('apollo-server')
const { prisma } = require('./db')

 

const typeDefs = gql`

  type Meme {
    id: ID!
    name: String

  }

  type Post {
    content: String
    id: ID!
    title: String!
    author: User
  }

  type Query {
    feed: [Post!]!
    post(id: ID!): Post
    memes: [Meme!]!
  }

  type Mutation { 
    createDraft(authorEmail: String, content: String, title: String!): Post! 

    createMeme(name: String): Meme!
  }

 
 
 
`
const resolvers = {
  Query: {
    feed: (parent, args) => {
      return prisma.post.findMany({
        where: { published: true },
      })
    },
    memes: (parten, args) => {
      return prisma.meme.findMany({
        where:  { published: true}
      })
    },
    post: (parent, args) => {
      return prisma.post.findOne({
        where: { id: Number(args.id) },
      })
    },
  },
  Mutation: {
    createDraft: (parent, args) => {
      return prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
          published: false,
          author: args.authorEmail && {
            connect: { email: args.authorEmail },
          },
        },
      })
    },
  
    createMeme: (parent, args) => {
      return prisma.meme.create({
        data: {
          name: args.data.name
        }
      })
    }
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

