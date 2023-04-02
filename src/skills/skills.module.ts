import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillSchema } from 'src/schemas/skill.schema';
import { HelpersModule } from 'src/helpers/helpers.module';
import { UsersSchema } from 'src/schemas/users.schema';
import { AuthTokensSchema } from 'src/schemas/auth-token.schema';
import { AuthService } from 'src/auth/auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Skill', schema: SkillSchema },
      { name: 'User', schema: UsersSchema },
      { name: 'AuthToken', schema: AuthTokensSchema },
    ]),
    HelpersModule,
    UsersModule,
  ],
  controllers: [SkillsController],
  providers: [SkillsService, AuthService],
  exports: [SkillsService]
})
export class SkillsModule {}
