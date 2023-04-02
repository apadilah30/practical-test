import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/schemas/users.schema';
import { AuthTokensSchema } from 'src/schemas/auth-token.schema';
import { UsersService } from 'src/users/users.service';
import { SkillsModule } from 'src/skills/skills.module';

@Module({
  imports: [
    UsersModule,
    SkillsModule,
    MongooseModule.forFeature([
      { name: 'User', schema: UsersSchema },
      { name: 'AuthToken', schema: AuthTokensSchema }
    ]),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule {}
