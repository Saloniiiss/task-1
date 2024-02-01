import { CityService } from './city.service';
import { City } from './schema/city.schema';
import { AddCityDto } from './dto/add.city.dto';
export declare class CityController {
    private readonly cityService;
    constructor(cityService: CityService);
    createCity(city: AddCityDto): Promise<City>;
    getAllCities(): Promise<City[]>;
    getWeather(): Promise<any>;
}
