import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivitySchema } from 'src/schemas/activity.schema';
import { HelpersModule } from 'src/helpers/helpers.module';
import { UsersModule } from 'src/users/users.module';
import { SkillsModule } from 'src/skills/skills.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersSchema } from 'src/schemas/users.schema';
import { SkillSchema } from 'src/schemas/skill.schema';
import { AuthTokensSchema } from 'src/schemas/auth-token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Activity', schema: ActivitySchema },
      { name: 'Skill', schema: SkillSchema },
      { name: 'User', schema: UsersSchema },
      { name: 'AuthToken', schema: AuthTokensSchema },
    ]),
    HelpersModule,
    UsersModule,
    SkillsModule
  ],
  controllers: [ActivityController],
  providers: [ActivityService, AuthService]
})
export class ActivityModule {}
