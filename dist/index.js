"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const resolvers_1 = require("./resolvers");
const swapi_1 = require("./datasources/swapi");
const schema_1 = require("./schema");
// set up any dataSources our resolvers need
const dataSources = () => ({
    SwapiAPI: new swapi_1.SwapiAPI(),
});
// Set up Apollo Server
const server = new apollo_server_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: resolvers_1.resolvers,
    dataSources,
    introspection: true,
    playground: true,
});
server.listen().then(() => {
    console.log("GraphServer is running on port 4000");
});
//# sourceMappingURL=index.js.map