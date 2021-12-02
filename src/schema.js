const { gql } = require('apollo-server')
const { prisma } = require('./db')

const typeDefs = gql`
  type Meme {
    id: ID!
    name: String!
    button_normal: String!
    button_pressed: String!
  }
 

  type Query {
    memes: [Meme!]!
  }

  type Mutation {
    createMeme(data: MemeCreateInput!): Meme! 

  }

  input MemeCreateInput {
    name: String!
    button_normal: String!
    button_pressed: String!
  } 

`

const resolvers = {
  Query: {
    memes: (parent, args, ctx, info) => {
      return prisma.meme.findMany()
    }
  },
  Mutation: {
    createMeme: (parent, args, ctx, info) => {
      return prisma.meme.create({
        data: {
          name: args.name,
          button_normal: args.button_normal,
          button_pressed: args.button_pressed
        },
      })
    },
  }
}

module.exports = {
  resolvers,
  typeDefs,
}