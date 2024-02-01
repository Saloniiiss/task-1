import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { CityService } from './city.service';
import { City } from './schema/city.schema';
import { AddCityDto } from './dto/add.city.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
//import { AuthGuard } from '../auth/auth.gaurd';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiBasicAuth } from '@nestjs/swagger';


@Controller('city')
@ApiTags('city')

export class CityController {
    constructor(private readonly cityService:CityService) {}
    @ApiOperation({ summary: 'Create an city' })
    @ApiResponse({ status: 200, description: 'The city has been successfully created.'})
    @UseGuards(AuthGuard('basic'))
    @ApiBasicAuth()
    @Post('add')
    async createCity(@Body (new ValidationPipe()) city: AddCityDto): Promise<City> {
    return this.cityService.createCity(city);
  }
    
  @ApiOperation({ summary: 'Get all cities' })
  @ApiResponse({ status: 201, description: 'The city have been successfully retrieved.' })
  
  @Get('getcities')
    async getAllCities(): Promise<City []> {
        return this.cityService.getAllCities();
    }
    @ApiOperation({ summary: 'Fetch Weather' })
    @ApiResponse({ status: 201, description: 'Fetch weather of all cities' })
    @Get('getweather')
    async getWeather(): Promise<any> {
        return this.cityService.getWeather();
    }
}

