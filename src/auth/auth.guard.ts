import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class CustomAuthGuard extends AuthGuard('basic') {
    constructor(
        private readonly authService: AuthService,
        private reflector: Reflector,
    ) {
        super();
    }

    async canActivate(
        context: ExecutionContext
    ) {
        try {
            const req = context.switchToHttp().getRequest();
            const res = context.switchToHttp().getResponse();
    
            const token = req.query.token;
    
            const accessToken = await this.authService.verifyToken(token);
            
            if (!accessToken) {
                return false;
            }

            const user = accessToken.userId;
            
            res.header('x-request-uid', user.username);
            
            const roles = this.reflector.get<string[]>('roles', context.getHandler());
            console.log(roles, user.profile)
            if (!roles || roles.some(role => role.toLowerCase() === 'any') || roles.some(role => user.profile.includes(role))){
                return true;
            } 
                
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}