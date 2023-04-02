import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity } from 'src/schemas/activity.schema';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { UsersService } from 'src/users/users.service';
import { SkillsService } from 'src/skills/skills.service';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name) private readonly activityModel: Model<Activity>,
    private readonly userService: UsersService,
    private readonly skillService: SkillsService,
  ) {}

  async create(activityDto: CreateActivityDto): Promise<Activity> {
    const participants = [];
    for (const participantId of activityDto.participants) {
      const participant = await this.userService.findOne(participantId);
      participants.push(participant);
    }

    const skills = [];
    for (const skillId of activityDto.skills) {
      const skill = await this.skillService.findOne(skillId);
      skills.push(skill);
    }
  
    const activity = new this.activityModel({
      title: activityDto.title,
      description: activityDto.description,
      startdate: activityDto.startdate,
      enddate: activityDto.enddate,
      participants,
      skills,
    });

    const savedActivity = await activity.save();
    
    const result = await this.activityModel.findById(savedActivity.id)
      .populate('participants','name email')
      .populate('skills', 'name')
      .exec();

    return result;
  }

  async findAll(): Promise<Activity[]> {
    return this.activityModel.find().populate('participants','name email').populate('skills','name').exec();
  }

  async findBySkill(id: string): Promise<Activity[]> {
    const result = await this.activityModel.find({ 'skills': id }).populate('participants','name email').populate('skills','name').exec();
    
    return result;
  }

  async findOne(id: string): Promise<Activity> {
    return this.activityModel.findById(id).populate('participants').populate('skills').exec();
  }

  async update(id: string, activityDto: UpdateActivityDto): Promise<Activity> {
    const result = await this.activityModel.findByIdAndUpdate(id, activityDto, { new: true })
        .populate('participants','name email')
        .populate('skills','name').exec();

    return result;
  }

  async delete(id: string): Promise<Activity> {
    return this.activityModel.findByIdAndDelete(id).exec();
  }
}
