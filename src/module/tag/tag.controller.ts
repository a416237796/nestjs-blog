import { UpdateTagDto } from './dto/update-tag.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './tag.interface';
import { ArticleService } from './../article/article.service';
import { TagService } from './tag.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  BadRequestException,
  Put,
  Delete,
} from '@nestjs/common';
import * as dayjs from 'dayjs';

@Controller('tag')
export class TagController {
  constructor(
    private readonly tagService: TagService,
    private readonly articleService: ArticleService,
  ) {}

  @Get()
  findAllTags(): Promise<Tag[]> {
    return this.tagService.findAll();
  }

  @Get(':id')
  findTag(@Param('id') id: string): Promise<Tag> {
    return this.tagService.findById(id);
  }

  @Post()
  async create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    const newTag = {
      ...createTagDto,
      createdAt: dayjs().valueOf(),
      updatedAt: dayjs().valueOf(),
    };
    const oldTag = await this.tagService.findByName(newTag.name);
    if (oldTag) {
      throw new BadRequestException('标签已存在！');
    } else {
      return this.tagService.create(newTag);
    }
  }

  @Put(':id')
  async updateTag(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto): Promise<Tag> {
    const oldTag = await this.tagService.findByName(updateTagDto.name);
    if (oldTag) {
      throw new BadRequestException('标签已存在！');
    } else {
      const newTag = await this.tagService.update(id, updateTagDto);
      await this.articleService.updateTag(id, newTag);
      return newTag;
    }
  }

  @Delete(':id')
  async removeTagById(@Param('id') id: string): Promise<Tag> {
    const articles = await this.articleService.findByTagId(id);
    if (articles.length > 0) {
      throw new BadRequestException('有文章正在使用此标签，禁止删除标签！');
    }
    return this.tagService.remove(id);
  }
}
