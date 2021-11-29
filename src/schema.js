const { gql } = require('apollo-server')
const { prisma } = require('./db')

 

const typeDefs = gql`
 

  type Meme {
    content: String
    id: ID!
    published: Boolean!
    title: String!
    author: User
  }

  type Query {
    feed: [Meme!]!
    meme(id: ID!): Meme 
  }

  type Mutation { 
    createDraft(authorEmail: String, content: String, title: String!): Meme! 
 
  }

 
 
 
`
const resolvers = {
  Query: {
    feed: (parent, args) => {
      return prisma.meme.findMany({
        where: { published: true },
      })
    },
    memes: (parten, args) => {
      return prisma.meme.findMany({
        where:  { published: true}
      })
    },
  },
  Mutation: {
    createDraft: (parent, args) => {
      return prisma.meme.create({
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
   
  },
  Meme: {
    author: (parent, args) => {
      return prisma.meme
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

