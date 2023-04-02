import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, forwardRef, Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/schemas/users.schema';
import { HelpersService } from 'src/helpers/helpers.service';
import { Role } from 'src/auth/role.decorator';
import { CustomAuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('api/v1/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly helpers: HelpersService
  ) {}

  @Post()
  @Role('board')
  @UseGuards(CustomAuthGuard)
  async create(@Body() user: User, @Body('skill') skillId: string): Promise<any> {
    try {
      const createdUser = await this.usersService.create(user, skillId);

      if(!createdUser) {
        return this.helpers.formatter(
          HttpStatus.UNPROCESSABLE_ENTITY,
          null,
          "Data cannot be processed"
        );
      }

      const result = {
        name: createdUser.name,
        email: createdUser.email,
        username: createdUser.username,
        profile: createdUser.profile,
        skill: createdUser.skill
      };

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

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Role('board')
  @UseGuards(CustomAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Role('board')
  @UseGuards(CustomAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
