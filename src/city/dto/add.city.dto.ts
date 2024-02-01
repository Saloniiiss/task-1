import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';
export class AddCityDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'London', description: 'The name of the city' })
    name: string;


   // @IsOptional() // Make _id property optional
    //id?: ObjectId;
   /* @ApiProperty({ example: 'John', description: 'The name of the user' })
    username: string;
    @ApiProperty({ example: 'Ahdgfr@356', description: 'Keep a complex passwprd' })
    password: string;*/
    }