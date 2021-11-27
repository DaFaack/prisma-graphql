const { gql } = require('apollo-server')
const { prisma } = require('./db')

 

const typeDefs = gql`
  type User {
    email: String!
    id: ID!
    name: String
    posts: [Post!]!
  }

  type Meme {
    id: ID!
    name: String
    button_normal: String
    button_pressed: String
    sound: String
    is_active: Boolean
  }

  type Post {
    content: String
    id: ID!
    published: Boolean!
    title: String!
    author: User
  }

  type Query {
    feed: [Post!]!
    post(id: ID!): Post
    memes: [Meme!]!
  }

  type Mutation {
    createUser(data: UserCreateInput!): User!
    createDraft(authorEmail: String, content: String, title: String!): Post!
    publish(id: ID!): Post

    createMeme(data: MemeCreateInput!): Meme!
  }

  input MemeCreateInput {
    name: String
    button_normal: String
    button_pressed: String
    sound: String
    is_active: Boolean
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
    createMeme: (parent, args) => {
      return prisma.meme.create({
        data: {
          name: args.data.name,
          button_normal: args.data.button_normal,
          button_pressed: args.data.button_pressed,
          sound: args.data.sound,
          published: args.data.published
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

