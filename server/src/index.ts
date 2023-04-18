import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import  prisma from '../src/prisma/client.js';

const typeDefs = readFileSync('./src/schema.graphql', { encoding: 'utf-8' })


const resolvers = {
  Query: {
    getBoards: () => {
      return prisma.board.findMany()
    }
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