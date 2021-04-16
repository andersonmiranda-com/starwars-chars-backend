"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema.graphql");
const resolvers = require("./resolvers");
const launch_1 = require("./datasources/launch");
// set up any dataSources our resolvers need
const dataSources = () => ({
    launchAPI: new launch_1.LaunchAPI(),
});
// Set up Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    introspection: true,
    playground: true,
    //   engine: {
    //     apiKey: process.env.ENGINE_API_KEY,
    //     ...internalEngineDemo,
    //   },
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
//# sourceMappingURL=index.js.map