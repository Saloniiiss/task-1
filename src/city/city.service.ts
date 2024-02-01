import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import * as mongoose from 'mongoose';
import { City, CityDocument } from './schema/city.schema';
import { HttpService } from '@nestjs/axios';
import { AddCityDto } from './dto/add.city.dto';

@Injectable()
export class CityService {
  constructor(@InjectModel(City.name) private readonly cityModel: Model<City>,private readonly httpService: HttpService) {}

  
  async getAllCities() {
    const cities: City[] =await this.cityModel.find();
    return cities;
  }
  async createCity(city: AddCityDto): Promise<City> {

    // const createdCity = new this.cityModel(city);
    // return createdCity.save();
    return this.cityModel.create(city);
  }
  async getWeather() {
    const cities = await this.getAllCities();
    console.log(cities);

    const weatherData = []; // Array to store city names and temperatures
    
    // Iterate over each city and fetch weather data
    for (const city of cities) {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${process.env.APP_ID}&units=metric`;
    
      try {
        const response = await axios.get(url);
        const temperature = response.data.main.temp;
        console.log(`Temperature for ${city.name}: ${temperature}°C`);
        weatherData.push({ city: city.name, temperature }); // Push city name and temperature to array
      } catch (error) {
        console.error(`Error fetching weather data for ${city.name}: ${error.message}`);
        // Omit this city from the weather data array if an error occurs
      }


    // const weatherData = await Promise.all(weatherDataPromises);
    // return weatherDataPromises;
  }
  return weatherData;

}
}




    // console.log("CALLED")
  //   const cities = await this.getAllCities();
  //   console.log(cities)
  //   const weatherDataPromises = cities.map( async city =>{

  //     const url = `http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${process.env.APP_ID}&units=metric`;
  //     const temp =  await  axios.get(url)
  //     .then(response => {
        
  //       const temperature = response.data.main.temp;
  //       console.log(temperature);
  //       return temperature;
  //     })});

  //     return weatherDataPromises;
  //   }
  // }



















    //   console.log(city.name);
    //  const some =  this.httpService
    //   .get(`http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${process.env.APP_ID}&units=metric`)
      

    //   return {
    //     Temperature: some.data.main.temp,
    //   };
    

    // const weatherData = await Promise.all(weatherDataPromises);

 