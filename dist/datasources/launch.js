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
exports.LaunchAPI = void 0;
const { RESTDataSource } = require("apollo-datasource-rest");
class LaunchAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://api.spacexdata.com/v2/";
    }
    // leaving this inside the class to make the class easier to test
    launchReducer(launch) {
        return {
            id: launch.flight_number || 0,
            cursor: `${launch.launch_date_unix}`,
            site: launch.launch_site && launch.launch_site.site_name,
            mission: {
                name: launch.mission_name,
                missionPatchSmall: launch.links.mission_patch_small,
                missionPatchLarge: launch.links.mission_patch,
            },
            rocket: {
                id: launch.rocket.rocket_id,
                name: launch.rocket.rocket_name,
                type: launch.rocket.rocket_type,
            },
        };
    }
    getAllLaunches() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.get("launches");
            // transform the raw launches to a more friendly
            return Array.isArray(response)
                ? response.map((launch) => this.launchReducer(launch))
                : [];
        });
    }
    getLaunchById({ launchId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.get("launches", { flight_number: launchId });
            return this.launchReducer(res[0]);
        });
    }
    getLaunchesByIds({ launchIds }) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(launchIds.map((launchId) => this.getLaunchById({ launchId })));
        });
    }
}
exports.LaunchAPI = LaunchAPI;
//# sourceMappingURL=launch.js.map