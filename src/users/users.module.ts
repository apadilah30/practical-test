import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/schemas/users.schema';
import { HelpersModule } from 'src/helpers/helpers.module';
import { SkillSchema } from 'src/schemas/skill.schema';
import { AuthTokensSchema } from 'src/schemas/auth-token.schema';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UsersSchema },
      { name: 'Skill', schema: SkillSchema },
      { name: 'AuthToken', schema: AuthTokensSchema },
    ]),
    HelpersModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService],
})
export class UsersModule {}
