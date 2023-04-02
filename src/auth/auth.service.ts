import { Injectable, BadRequestException, HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthToken } from 'src/schemas/auth-token.schema';
import { User } from 'src/schemas/users.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('AuthToken') private readonly authTokenModel: Model<AuthToken>,
    ) {}

    async authBasic(username: string, pass: string) : Promise<any> {
        if(username === "admin" && pass === "12341234"){
            return true;
        }

        return false;
    }

    async login(username: string, password: string): Promise<any> {
        return this.userModel.findOne({ username, password }).exec();
    }

    async setToken(id: string,token: string): Promise<any> {
        const authToken = new this.authTokenModel({
            userId: id,
            token,
        });
        
        await authToken.save();

        return authToken;
    }
    
    async verifyToken(token: string): Promise<any> {
        const result = await this.authTokenModel.findOne({ token }).populate('userId');

        if(!result) {
            throw new HttpException("Invalid token credentials", HttpStatus.UNAUTHORIZED);
        }

        return result;
    }

    async registerBoard(data: any, skillId: string){
        const user = await this.userService.create(data, skillId);

        if (user) {
            return user;
        }

        throw new BadRequestException();
      
    }
}
