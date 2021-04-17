"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapiAPI = void 0;
const { RESTDataSource } = require("apollo-datasource-rest");
class SwapiAPI extends RESTDataSource {
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
    getAllCharacter({ page }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { results, previous, next } = yield this.get(`people?page=${page}`);
                // transform the raw launches to a more friendly
                const characters = Array.isArray(results)
                    ? results.map((item) => this.characterReducer(item))
                    : [];
                return {
                    characters,
                    previous: previous ? previous.match(/(\d+)/)[0] : "",
                    next: next ? next.match(/(\d+)/)[0] : "",
                };
            }
            catch (err) {
                throw err;
            }
        });
    }
    getCharacterById({ characterId }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get character
                const res = yield this.get(`people/${characterId}`);
                //get film's title
                res.films = Array.isArray(res.films)
                    ? res.films.map((filmUrl) => __awaiter(this, void 0, void 0, function* () {
                        const film = yield this.get(filmUrl);
                        return film.title;
                    }))
                    : [];
                //get homeworld
                if (res.homeworld) {
                    const home = yield this.get(res.homeworld);
                    res.homeworld = home.name;
                }
                return this.characterReducer(res);
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.SwapiAPI = SwapiAPI;
//# sourceMappingURL=swapi.js.map