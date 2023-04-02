import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, UseGuards } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Activity } from 'src/schemas/activity.schema';
import { HelpersService } from 'src/helpers/helpers.service';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/auth/role.decorator';
import { CustomAuthGuard } from 'src/auth/auth.guard';

@Controller('api/v1/activity')
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService,
    private readonly helpers: HelpersService,
  ) {}

  @Post()
  @Role('experts')
  @UseGuards(CustomAuthGuard)
  async create(@Body() activityDto: CreateActivityDto): Promise<any> {
    try {
      const result = await this.activityService.create(activityDto);

      return this.helpers.formatter(
        HttpStatus.OK,
        result,
        this.helpers.SUCCESS
      );

    } catch (error) {
      console.log(error)
      return this.helpers.formatter(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
        this.helpers.INTERNAL_SERVER_ERROR
      );
      
    }
  }

  @Get()
  @Role('any')
  @UseGuards(CustomAuthGuard)
  async findAll(): Promise<any> {
    try {
      const result = await this.activityService.findAll();
      
      return this.helpers.formatter(
        HttpStatus.OK,
        result,
        this.helpers.SUCCESS
      );

    } catch (error) {
      return this.helpers.formatter(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
        this.helpers.INTERNAL_SERVER_ERROR
      );
      
    }
  }
  
  @Get(':skillId')
  @Role('any')
  @UseGuards(CustomAuthGuard)
  async findBySkill(@Param('skillId') skillId: string): Promise<any> {
    try {
      const result = await this.activityService.findBySkill(skillId);

      return this.helpers.formatter(
        HttpStatus.OK,
        result,
        this.helpers.SUCCESS
      );

    } catch (error) {
      return this.helpers.formatter(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
        this.helpers.INTERNAL_SERVER_ERROR
      );
      
    }
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<Activity> {
  //   return this.activityService.findOne(id);
  // }

  @Put(':id')
  @Role('experts')
  @UseGuards(CustomAuthGuard)
  async update(@Param('id') id: string, @Body() activityDto: CreateActivityDto): Promise<any> {
    try {
      const result = await this.activityService.update(id, activityDto);
      
      if(result) {
        return this.helpers.formatter(
          HttpStatus.OK,
          result,
          this.helpers.SUCCESS
        )
      } else {
        return this.helpers.formatter(
          HttpStatus.NOT_FOUND,
          null,
          this.helpers.NOT_FOUND
        )
      }

    } catch (error) {
      return this.helpers.formatter(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
        this.helpers.INTERNAL_SERVER_ERROR
      );
      
    }
  }

  @Delete(':id')
  @Role('experts')
  @UseGuards(CustomAuthGuard)
  async delete(@Param('id') id: string): Promise<any> {
    try {
      const result = await this.activityService.delete(id);

      if(result) {
        return this.helpers.formatter(
          HttpStatus.OK,
          result,
          this.helpers.SUCCESS
        )
      } else {
        return this.helpers.formatter(
          HttpStatus.NOT_FOUND,
          null,
          this.helpers.NOT_FOUND
        )
      }

    } catch (error) {
      return this.helpers.formatter(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
        this.helpers.INTERNAL_SERVER_ERROR
      );
      
    }
  }
}
