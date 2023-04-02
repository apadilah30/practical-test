import { Controller, Get, Post, Body, Request, Headers, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { HelpersService } from './helpers/helpers.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './schemas/users.schema';
import { CustomAuthGuard } from './auth/auth.guard';
import { UsersService } from './users/users.service';
import * as crypto from 'crypto';
import { Role } from './auth/role.decorator';

@Controller("api/v1")
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly helpers: HelpersService,
    private readonly userService: UsersService
  ) {}

  @Post("/generate-board")
  @UseGuards(AuthGuard('basic'))
  @Role('board')
  @UseGuards(CustomAuthGuard)
  async registerBoard(@Body() user: User, @Body('skill') skillId: string) {
    try {
      const createdUser = await this.authService.registerBoard(user, skillId);
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
        "Board account generated"
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

  @Post("/auth/login")
  @UseGuards(AuthGuard('basic'))
  async login(@Body() body: any) {
    try {
      const { username, password } = body;
      const user = await this.authService.login(username, password);

      if(!user){
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      
      const buffer = crypto.randomBytes(10);
      const token = buffer.toString('hex');
      
      const generate_token = await this.authService.setToken(user._id, token);

      const result = {
        token: generate_token.token,
        profile: user.profile
      }
      
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

  @Get("/auth/profile")
  @UseGuards(AuthGuard('basic'))
  @Role('any')
  @UseGuards(CustomAuthGuard)
  async profile(@Headers() headers: any) {
    try {
      const uid = headers['x-request-uid'];
      const user = await this.userService.findOne(uid);

      if(!user){
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const result = {
        name: user.name,
        email: user.email,
        username: user.username,
        profile: user.profile,
        skill: user.skill
      };

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
}
