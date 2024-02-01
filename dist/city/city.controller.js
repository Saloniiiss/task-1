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
exports.CityController = void 0;
const common_1 = require("@nestjs/common");
const city_service_1 = require("./city.service");
const add_city_dto_1 = require("./dto/add.city.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const swagger_2 = require("@nestjs/swagger");
let CityController = class CityController {
    constructor(cityService) {
        this.cityService = cityService;
    }
    async createCity(city) {
        return this.cityService.createCity(city);
    }
    async getAllCities() {
        return this.cityService.getAllCities();
    }
    async getWeather() {
        return this.cityService.getWeather();
    }
};
exports.CityController = CityController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create an city' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The city has been successfully created.' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('basic')),
    (0, swagger_2.ApiBasicAuth)(),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_city_dto_1.AddCityDto]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "createCity", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all cities' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The city have been successfully retrieved.' }),
    (0, common_1.Get)('getcities'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CityController.prototype, "getAllCities", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Fetch Weather' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Fetch weather of all cities' }),
    (0, common_1.Get)('getweather'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CityController.prototype, "getWeather", null);
exports.CityController = CityController = __decorate([
    (0, common_1.Controller)('city'),
    (0, swagger_1.ApiTags)('city'),
    __metadata("design:paramtypes", [city_service_1.CityService])
], CityController);
//# sourceMappingURL=city.controller.js.map