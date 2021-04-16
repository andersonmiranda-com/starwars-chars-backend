const { paginateResults } = require("./utils");

const resolver = {
  Query: {
    peoples: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allPeople = await dataSources.SwapiAPI.getAllPeople();

      const people = paginateResults({
        after,
        pageSize,
        results: allPeople,
      });

      return {
        people,
        cursor: people.length ? people[people.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: people.length
          ? people[people.length - 1].cursor !==
            allPeople[allPeople.length - 1].cursor
          : false,
      };
    },

    people: (_, { id }, { dataSources }) =>
      dataSources.SwapiAPI.getPeopleById({ peopleId: id }),
  },
};

module.exports = resolver;
