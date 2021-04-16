import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers";
import { SwapiAPI } from "./datasources/swapi";
import { typeDefs } from "./schema";

// set up any dataSources our resolvers need
const dataSources = (): any => ({
  SwapiAPI: new SwapiAPI(),
});

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  introspection: true,
  playground: true,
});

server.listen().then(() => {
  console.log("Server is running on port 4000");
});
