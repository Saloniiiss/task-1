import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { CitySchema } from './schema/city.schema';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth/auth.module';
//import { jwtConstants } from '../auth/constants';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'City', schema: CitySchema }]),HttpModule, AuthModule],
  controllers: [CityController],
  providers: [CityService],

})
export class CityModule {}
