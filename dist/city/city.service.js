"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const axios_1 = require("axios");
const city_schema_1 = require("./schema/city.schema");
const axios_2 = require("@nestjs/axios");
let CityService = class CityService {
    constructor(cityModel, httpService) {
        this.cityModel = cityModel;
        this.httpService = httpService;
    }
    async getAllCities() {
        const cities = await this.cityModel.find();
        return cities;
    }
    async createCity(city) {
        return this.cityModel.create(city);
    }
    async getWeather() {
        const cities = await this.getAllCities();
        console.log(cities);
        const weatherData = [];
        const promises = cities.map(async (city) => {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${process.env.APP_ID}&units=metric`;
            try {
                const response = await axios_1.default.get(url);
                const temperature = response.data.main.temp;
                console.log(`Temperature for ${city.name}: ${temperature}°C`);
                weatherData.push({ city: city.name, temperature });
            }
            catch (error) {
                console.error(`Error fetching weather data for ${city.name}: ${error.message}`);
            }
        });
        await Promise.all(promises);
        return weatherData;
    }
};
exports.CityService = CityService;
exports.CityService = CityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(city_schema_1.City.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, axios_2.HttpService])
], CityService);
//# sourceMappingURL=city.service.js.map