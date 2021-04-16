export const resolvers = {
  Query: {
    charactersList: async (_, { page = 1 }, { dataSources }) => {
      if (page < 1) page = 1;
      const {
        characters,
        next,
        previous,
      } = await dataSources.SwapiAPI.getAllCharacter({ page });
      return { characters, previous, next };
    },

    character: (_, { id }, { dataSources }) =>
      dataSources.SwapiAPI.getCharacterById({ characterId: id }),
  },
};
