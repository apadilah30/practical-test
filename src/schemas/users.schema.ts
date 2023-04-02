import { Document, Schema as Smo } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Skill } from "./skill.schema";
import { IsString, IsNotEmpty, IsEmail, IsEnum } from "class-validator";

export type UserDocument = User & Document;
enum Profile {
  board =  'board',
  trainer =  'trainer',
  experts =  'experts',
  competitor =  'competitor'
}

@Schema()
export class User {
  @Prop({
    type: String,
    required: true
  })
  @IsNotEmpty()
  name: string;
  
  @Prop({
    type: String,
    required: true,
    unique: true
  })
  @IsNotEmpty()
  @IsEmail()
  email: String;

  @Prop({
    type: String,
    required: true,
    unique: true
  })
  @IsNotEmpty()
  username: String;

  @Prop({
    type: String,
    required: true
  })
  @IsNotEmpty()
  password: String;

  @Prop({
    type: String,
    enum: ['board','trainer','experts','competitor']
  })
  @IsNotEmpty()
  @IsEnum(Profile)
  profile: Profile;

  @Prop({ 
    type: Smo.Types.ObjectId, 
    ref: 'Skill' 
  })
  skill: string | Smo.Types.ObjectId | Skill;
}

export const UsersSchema = SchemaFactory.createForClass(User);