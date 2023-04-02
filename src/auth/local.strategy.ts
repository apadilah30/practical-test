import { BasicStrategy } from "passport-http";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(BasicStrategy) {

    constructor(
        private authService : AuthService
    ) {
        super();
    }

    async validate(username: string, pass: string) : Promise<any> {
        const user = await this.authService.authBasic(username, pass);
        if(user) {
            return user;
        }

        throw new UnauthorizedException("Invalid basic token");
    }

}