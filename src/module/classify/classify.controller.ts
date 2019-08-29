import { ArticleService } from './../article/article.service';
import { UpdateClassifyDto } from './dto/update-classify.dto';
import { CreateClassifyDto } from './dto/create-classify.dto';
import { Classify } from './classify.interface';
import { ClassifyService } from './classify.service';
import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import * as dayjs from 'dayjs';

@Controller('classify')
export class ClassifyController {
  constructor(
    private readonly classifyService: ClassifyService,
    private readonly articleService: ArticleService,
  ) {}

  @Get()
  classifies(): Promise<Classify[]> {
    return this.classifyService.findAll();
  }

  @Post()
  async createClassify(@Body() createClassify: CreateClassifyDto) {
    const classify = {
      ...createClassify,
      createdAt: dayjs().valueOf(),
      updatedAt: dayjs().valueOf(),
    };
    const oldClassify = await this.classifyService.findByName(classify.name);
    if (oldClassify) {
      throw new BadRequestException('分类已存在！');
    } else {
      return this.classifyService.create(classify);
    }
  }

  @Get(':id')
  classify(@Param('id') id: string): Promise<Classify> {
    return this.classifyService.find(id);
  }

  @Put(':id')
  async updateClassify(
    @Param('id') id: string,
    @Body() updateClassify: UpdateClassifyDto,
  ): Promise<Classify> {
    const classify = {
      ...updateClassify,
      updatedAt: dayjs().valueOf(),
    };
    const classifies = await this.classifyService.findByName(classify.name);
    if (classifies) {
      throw new BadRequestException('分类已存在！');
    } else {
      const newClassify = await this.classifyService.update(id, classify);
      await this.articleService.updateClassify(id, newClassify);
      return newClassify;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const articles = await this.articleService.findByClassifyId(id);
    if (articles.length > 0) {
      throw new BadRequestException('分类下有文章存在，禁止删除分类！');
    }
    const classifies = await this.classifyService.findChildren(id);
    if (classifies.length > 0) {
      throw new BadRequestException('分类下有子分类存在，禁止删除分类！');
    }
    return this.classifyService.remove(id);
  }
}
