import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HelpersModule } from './helpers/helpers.module';
import { SkillsModule } from './skills/skills.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [
    AuthModule, 
    UsersModule, 
    HelpersModule, 
    SkillsModule, 
    ActivityModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/practical_test')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
