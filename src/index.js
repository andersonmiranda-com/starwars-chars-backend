const { ApolloServer } = require("apollo-server");

const typeDefs = require("./schema.graphql");
const resolvers = require("./resolvers");

const SwapiAPI = require("./datasources/swapi");

// set up any dataSources our resolvers need
const dataSources = () => ({
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

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== "test") {
  server.listen().then(() => {
    console.log(`
      Server is running!
      Listening on port 4000
      Query at https://studio.apollographql.com/dev
    `);
  });
}
