"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const { gql } = require("apollo-server");
exports.typeDefs = gql `
  type Query {
    charactersList(page: Int): CharacterConnection!
    character(id: ID!): Character
  }

  type CharacterConnection {
    next: String
    previous: String
    characters: [Character]!
  }

  type Character {
    id: ID!
    name: String
    height: String
    mass: String
    gender: String
    hair_color: String
    skin_color: String
    eye_color: String
    birth_year: String
    films: [String]
    homeworld: String
  }
`;
//# sourceMappingURL=schema.js.map