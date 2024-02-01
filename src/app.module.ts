// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//import { UserModule } from './user/user.module';
//import { AuthModule } from './auth/auth.module';
import { CityModule } from './city/city.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/task-1', {}),
    AuthModule,
    CityModule,
  ],
})
export class AppModule {}
