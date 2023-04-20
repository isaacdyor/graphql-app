import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import  prisma from '../src/prisma/client.js';

const typeDefs = readFileSync('./src/schema.graphql', { encoding: 'utf-8' })


const resolvers = {
  Query: {
    getBoards: () => {
      return prisma.board.findMany()
    },
    getPosts: () => {
      return prisma.post.findMany({
        include: {
          author: true,
        },
      })
    },
    getUsers: () => {
      return prisma.user.findMany({
        include: {
          posts: true,
        },
      })
    },
    getUser: (_: any, { id } : { id: string} ) => {
      return prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
          posts: true,
        },
      });
    },
    getPost: (_: any, { id } : { id: string} ) => {
      return prisma.post.findUnique({
        where: {
          id: id,
        },
        include: {
          author: true,
        },
      });
    },
  },
  Mutation: {
    createBoard: (_: any, { input } : any ) => {
      return prisma.board.create({
        data: {
          title: input.title,
          description: input.description,
          path: input.path
        },
      });
    },
    updateBoard: (_: any, { input } : any ) => {
      return prisma.board.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
          path: input.path
        },
      });
    },
    deleteBoard: (_: any, { input } : any ) => {
      return prisma.board.delete({
        where: {
          id: input.id,
        },
      });
    },
    createPost: (_: any, { input } : any ) => {
      return prisma.post.create({
        data: {
          title: input.title,
          description: input.description,
          author: { connect: { id: input.authorId } },
        },
      });
    },
  }
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);