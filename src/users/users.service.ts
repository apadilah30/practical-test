import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/users.schema';
import { Skill } from 'src/schemas/skill.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(  
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Skill') private readonly skillModel: Model<Skill>,
  ) {}

  async create(user: User, skillId: String): Promise<User> {
    const skill = await this.skillModel.findById(skillId);
    user.skill = skill.id;

    const createdUser = new this.userModel(user);
    const savedUser = await createdUser.save();

    const result = this.userModel.findById(savedUser.id).populate('skill', 'name').exec();
    
    return result;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).populate('skill', 'name').exec(); 
    
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = this.userModel.findOne({ username }).exec(); 
    
    return user;
  }
  
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
