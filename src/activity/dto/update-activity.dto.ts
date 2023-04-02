import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from 'src/schemas/users.schema';
import { Skill } from 'src/schemas/skill.schema';
import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityDto } from './create-activity.dto';

export class UpdateActivityDto extends PartialType(CreateActivityDto) {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsDateString()
  readonly startdate: Date;

  @IsNotEmpty()
  @IsDateString()
  readonly enddate: Date;

  @IsOptional()
  @IsArray()
  readonly participants: string[];

  @IsOptional()
  @IsArray()
  readonly skills: string[];
}
