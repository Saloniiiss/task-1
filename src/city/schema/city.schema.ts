import { Schema,Prop,SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';

export type CityDocument = City & Document;

@Schema({timestamps: true})
export class City {
    @Prop()
    name: string;


   //@Prop({ type: Types.ObjectId, required: true })
  //id: Types.ObjectId;
}   

export const CitySchema = SchemaFactory.createForClass(City);