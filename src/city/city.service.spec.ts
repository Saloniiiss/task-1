import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { City } from './schema/city.schema';
import mongoose from 'mongoose';
import { AddCityDto } from './dto/add.city.dto';

import  axios from 'axios';



describe('CityService', () => {
    let service: CityService;
    let httpService: HttpService;
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/task-1');
      });

      

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CityService,
                {
                    provide: getModelToken('City'),
                    useValue: {
                        find: jest.fn(),
                        create: jest.fn(),
                    },
                },
                {
                    provide: HttpService,
                    useValue: {
                        get: jest.fn(),
                    },
                },
            ],
        }).compile();
        await mongoose.connect('mongodb://localhost:27017/task-1');
        service = module.get<CityService>(CityService);
        httpService = module.get<HttpService>(HttpService);
    });

    test('MongoDB Connection Successful', async () => {
        const isConnected = mongoose.connection.readyState;
        expect(isConnected).toBe(1);
      });
    
    describe('getAllCities', () => {
        it('should return all the cities', async () => {
            const mockCities: City[] = [
                { name: 'City 1'}
            ];

            jest.spyOn(service['cityModel'], 'find').mockReturnValueOnce({
                exec: jest.fn().mockResolvedValueOnce(mockCities),
            } as any);

            const result = await service.getAllCities();

            expect(result).toEqual(mockCities);
            expect(service['cityModel'].find).toHaveBeenCalledTimes(1);
            console.log(result);
        });
    });

    describe('createCity', () => {
        it('should add a new city to mongodb', async () => {
            const mockCity: AddCityDto =  { name: 'new City' };

            jest.spyOn(service['cityModel'], 'create').mockResolvedValueOnce(mockCity as any);

            const result = await service.createCity(mockCity);

            expect(result).toEqual(mockCity);
            expect(service['cityModel'].create).toHaveBeenCalledTimes(1);
            expect(service['cityModel'].create).toHaveBeenCalledWith(mockCity);
        });
    });
    describe('getWeather', () => {

        it('should get weather data for all cities', async () => {
    
          const cities = [{ name: 'London' },{ name: 'Mumbai' },];

          const mockResponse = {data: {main: {temp: 25,},},};

          jest.spyOn(service, 'getAllCities').mockResolvedValue(cities);
          jest.spyOn(axios, 'get').mockResolvedValue(mockResponse);
          const result = await service.getWeather();
          expect(result.length).toBe(2);
          expect(result).toEqual([
            { city: 'London', temperature: 25 },
            { city: 'Mumbai', temperature: 25 },
          ]);
          expect(axios.get).toHaveBeenCalledTimes(2);
        });
        it('should handle errors when fetching weather data', async () => {
            const cities = [
              { name: 'London' },
              { name: 'Mumbai' },
      ];
      
            jest.spyOn(service, 'getAllCities').mockResolvedValue(cities);
            jest.spyOn(axios, 'get').mockRejectedValue(new Error('Failed to fetch weather data'));

            try {
              await service.getWeather();
            } catch (error) {
              expect(error.message).toBe('Failed to fetch weather data');
            }
          });
        });

    afterAll(async () => {
       await mongoose.connection.close();
     });
 });
