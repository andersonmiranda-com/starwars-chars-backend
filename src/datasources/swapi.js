const { RESTDataSource } = require("apollo-datasource-rest");

class SwapiAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://swapi.dev/api/";
  }

  // leaving this inside the class to make the class easier to test
  peopleReducer(people) {
    return {
      id: people.url.match(/(\d+)/)[0],
      cursor: people.url.match(/(\d+)/)[0],
      name: people.name,
      height: people.height,
      mass: people.mass,
      gender: people.gender,
    };
  }

  async getAllPeople() {
    const { results } = await this.get("people");

    // transform the raw launches to a more friendly
    return Array.isArray(results)
      ? results.map((item) => this.peopleReducer(item))
      : [];
  }

  async getPeopleById({ peopleId }) {
    const res = await this.get(`people/${peopleId}`);
    console.log(res.url.match(/(\d+)/)[0]);
    return this.peopleReducer(res);
  }
}

module.exports = SwapiAPI;
