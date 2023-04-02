import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from './users.schema';
import { Skill } from './skill.schema';

@Schema()
export class Activity extends Document {
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  description: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsDateString()
  startdate: Date;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsDateString()
  enddate: Date;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'User', default: [] }] })
  @IsOptional()
  @IsArray()
  participants: string[];

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Skill', default: [] }] })
  @IsOptional()
  @IsArray()
  skills: string[];
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
