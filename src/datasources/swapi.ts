const { RESTDataSource } = require("apollo-datasource-rest");

export class SwapiAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://swapi.dev/api/";
  }

  // leaving this inside the class to make the class easier to test
  characterReducer(character) {
    return {
      id: character.url.match(/(\d+)/)[0] || "",
      name: character.name,
      height: character.height,
      mass: character.mass,
      gender: character.gender,
      hair_color: character.hair_color,
      skin_color: character.skin_color,
      eye_color: character.eye_color,
      birth_year: character.birth_year,
      films: character.films,
      homeworld: character.homeworld,
    };
  }

  async getAllCharacter({ page }) {
    try {
      const { results, previous, next } = await this.get(`people?page=${page}`);

      // transform the raw launches to a more friendly
      const characters = Array.isArray(results)
        ? results.map((item) => this.characterReducer(item))
        : [];
      return {
        characters,
        previous: previous ? previous.match(/(\d+)/)[0] : "", // extract page number from URL
        next: next ? next.match(/(\d+)/)[0] : "",
      };
    } catch (err) {
      throw err;
    }
  }

  async getCharacterById({ characterId }) {
    try {
      // get character
      const res = await this.get(`people/${characterId}`);

      //get film's title
      res.films = Array.isArray(res.films)
        ? res.films.map(async (filmUrl) => {
            const film = await this.get(filmUrl);
            return film.title;
          })
        : [];

      //get homeworld
      if (res.homeworld) {
        const home = await this.get(res.homeworld);
        res.homeworld = home.name;
      }

      return this.characterReducer(res);
    } catch (err) {
      throw err;
    }
  }
}
