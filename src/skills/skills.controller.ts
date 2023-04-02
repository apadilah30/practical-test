import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from 'src/schemas/skill.schema';
import { HelpersService } from 'src/helpers/helpers.service';
import { Role } from 'src/auth/role.decorator';
import { CustomAuthGuard } from 'src/auth/auth.guard';

@Controller('api/v1/skills')
export class SkillsController {
  constructor(
    private readonly skillsService: SkillsService,
    private readonly helpers: HelpersService
  ) {}

  @Post()
  @Role('board')
  @UseGuards(CustomAuthGuard)
  async create(@Body() skill: Skill): Promise<any> {
    try {
      const result = await this.skillsService.create(skill);

      return this.helpers.formatter(
        HttpStatus.OK,
        result,
        this.helpers.SUCCESS
      );
      
    } catch (error) {
      return this.helpers.formatter(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
        this.helpers.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  @Role('any')
  @UseGuards(CustomAuthGuard)
  findAll() {
    return this.skillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skillsService.findOne(id);
  }

  @Patch(':id')
  @Role('board')
  @UseGuards(CustomAuthGuard)
  update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillsService.update(id, updateSkillDto);
  }

  @Delete(':id')
  @Role('board')
  @UseGuards(CustomAuthGuard)
  remove(@Param('id') id: string) {
    return this.skillsService.remove(id);
  }
}
