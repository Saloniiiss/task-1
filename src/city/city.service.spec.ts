import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { City } from './schema/city.schema';
import mongoose from 'mongoose';
import { AddCityDto } from './dto/add.city.dto';
import { timeout } from 'rxjs';
import { AnyARecord } from 'dns';
import { AxiosResponse } from 'axios';

import { of, throwError, Observable } from 'rxjs';


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
    
      
    
      
      describe('CityService', () => {
          let service: CityService;
          let httpService: HttpService;
      
          beforeEach(async () => {
              const module: TestingModule = await Test.createTestingModule({
                  providers: [
                      CityService,
                      {
                          provide: getModelToken('City'),
                          useValue: {
                              find: jest.fn(),
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
      
              service = module.get<CityService>(CityService);
              httpService = module.get<HttpService>(HttpService);
          });
      
          describe('getWeather', () => {
            it('should fetch weather data for all cities', async () => {
                const mockCities: AddCityDto[] = [
                    { name: 'City 1' },
                    { name: 'City 2' },
                ];
    
                const mockWeatherData = [
                    { city: 'City 1', temperature: 25 },
                    { city: 'City 2', temperature: 20 },
                ];
    
                const mockGetObservable = (url: string): Observable<any> => {
                    const cityName = url.split('=')[1];
                    const temperature = cityName === 'City 1' ? 25 : 20;
                    return of({ data: { main: { temp: temperature } } });
                };
    
                jest.spyOn(httpService, 'get').mockImplementation(mockGetObservable);
    
                const weatherData = await service.getWeather();
    
                expect(weatherData).toEqual(mockWeatherData);
                expect(service.getAllCities).toHaveBeenCalledTimes(1);
                expect(httpService.get).toHaveBeenCalledTimes(2);
                expect(httpService.get).toHaveBeenCalledWith(expect.stringContaining('City 1'));
                expect(httpService.get).toHaveBeenCalledWith(expect.stringContaining('City 2'));
            });
    

        });
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

            // expect(result).toEqual(mockCities);
            expect(service['cityModel'].find).toHaveBeenCalledTimes(1);
            console.log(result);
        });
    });

    describe('createCity', () => {
        it('should add a new city to mongodb', async () => {
            const mockCity: AddCityDto =  { name: 'New City' };

            jest.spyOn(service['cityModel'], 'create').mockResolvedValueOnce(mockCity as any);

            const result = await service.createCity(mockCity);

            expect(result).toEqual(mockCity);
            expect(service['cityModel'].create).toHaveBeenCalledTimes(1);
            expect(service['cityModel'].create).toHaveBeenCalledWith(mockCity);
        });
    });
      

                afterAll(async () => {
                    await mongoose.connection.close();
                });
            });





































// import { Test, TestingModule } from '@nestjs/testing';
// import { CityService } from './city.service';
// import { MongooseModule, getModelToken } from '@nestjs/mongoose';
// import { HttpService } from '@nestjs/axios';
// import { City } from './schema/city.schema';
// import mongoose from 'mongoose';


// describe('CityService', () => {
//     let service: CityService;
//     let httpService: HttpService;
//     beforeAll(async () => {
//         await mongoose.connect('mongodb://localhost:27017/task-1');
//       });

//     beforeEach(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             providers: [
//                 CityService,
//                 {
//                     provide: getModelToken('City'),
//                     useValue: {
//                         find: jest.fn(),
//                         create: jest.fn(),
//                     },
//                 },
//                 {
//                     provide: HttpService,
//                     useValue: {
//                         get: jest.fn(),
//                     },
//                 },
//             ],
//         }).compile();
//         await mongoose.connect('mongodb://localhost:27017/task-1');
//         service = module.get<CityService>(CityService);
//         httpService = module.get<HttpService>(HttpService);
//     });

//     test('MongoDB Connection Successful', async () => {
//         const isConnected = mongoose.connection.readyState;
//         expect(isConnected).toBe(1);
//       });

//     describe('getAllCities', () => {
//         it('should return all the cities', async () => {
//             const mockCities: City[] = [
//                 { name: 'City 1'},
//             ];

//             jest.spyOn(service['cityModel'], 'find').mockReturnValueOnce({
//                 exec: jest.fn().mockResolvedValueOnce(mockCities),
//             } as any);

//             const result = await service.getAllCities();

//             // expect(result).toEqual(mockCities);
//             expect(service['cityModel'].find).toHaveBeenCalledTimes(1);
//             console.log(result);
//         });
//     });

//     describe('createCity', () => {
//         it('should add a new city to mongodb', async () => {
//             const mockCity: City = { name: 'New City' };

//             jest.spyOn(service['cityModel'], 'create').mockResolvedValueOnce(mockCity as any);

//             const result = await service.createCity(mockCity);

//             expect(result).toEqual(mockCity);
//             expect(service['cityModel'].create).toHaveBeenCalledTimes(1);
//             expect(service['cityModel'].create).toHaveBeenCalledWith(mockCity);
//         });
//     });

//    describe('getWeather', () => {
//     it('should get weather data of a city', async () => {
//         const mockCities = [{ name: 'Jabalpur' }, { name: 'Bhopal' }]; // Replace with your actual city data
//         const mockWeatherData = { City: expect.any(String), 
            
//             Temperature: expect.any(Number)};

//         jest.spyOn(service['cityModel'], 'find').mockResolvedValue(mockCities);

//         const result = await service.getWeather();
//         expect(result.at(0)).toEqual(mockWeatherData);
//        // expect(httpService.get).toHaveBeenCalledWith('https://api.weather.com');
//     });
// });
//     afterAll(async () => {
//         await mongoose.connection.close();
//       });
// });










// import { Test, TestingModule } from '@nestjs/testing';
// import { CityService } from './city.service';
// import { HttpService } from '@nestjs/axios';
// import { Model } from 'mongoose';
// import { City } from './schema/city.schema';

// describe('CityService', () => {
//   let service: CityService;
//   let httpService: HttpService;
//   let cityModel: Model<City>;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         CityService,
//         HttpService,
//         {
//           provide: 'CityModelToken',
//           useValue: {
//             find: jest.fn(),
//             create: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     service = module.get<CityService>(CityService);
//     httpService = module.get<HttpService>(HttpService);
//     cityModel = module.get('CityModelToken') as Model<City>;
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('getAllCities', () => {
//     it('should return an array of cities', async () => {
//       const cities = [
//         { name: 'New York'},
//         { name: 'London'},
//       ];
//       (cityModel.find as jest.Mock).mockResolvedValue(cities);

//       const result = await service.getAllCities();

//       expect(result).toEqual(cities);
//       expect(cityModel.find).toHaveBeenCalled();
//     });
//   });

//   describe('createCity', () => {
//     it('should create a city', async () => {
//       const city = { name: 'New York', country: 'USA' };
//       (cityModel.create as jest.Mock).mockResolvedValue(city);

//       const result = await service.createCity(city);

//       expect(result).toEqual(city);
//       expect(cityModel.create).toHaveBeenCalledWith(city);
//     });
//   });

//   describe('getWeather', () => {
//     it('should return an array of weather data', async () => {
//       const cities = [
//         { name: 'New York' },
//         { name: 'London' },
//       ];
//       (cityModel.find as jest.Mock).mockResolvedValue(cities);

//       const weatherData = [20, 15];
//       const httpGetSpy = jest.spyOn(httpService, 'get');
//       httpGetSpy.mockResolvedValueOnce({ data: { main: { temp: 20 } } });
//       httpGetSpy.mockResolvedValueOnce({ data: { main: { temp: 15 } } });

//       const result = await service.getWeather();

//       //expect(result).toEqual(weatherData);
//       expect(httpGetSpy).toHaveBeenCalledTimes(2);
//       expect(httpGetSpy).toHaveBeenNthCalledWith(1, `http://api.openweathermap.org/data/2.5/weather?q=${cities[0].name}&appid=${process.env.APP_ID}&units=metric`);
//       expect(httpGetSpy).toHaveBeenNthCalledWith(2, `http://api.openweathermap.org/data/2.5/weather?q=${cities[1].name}&appid=${process.env.APP_ID}&units=metric`);
//     });
//   });
// });





