import { PagenationArticle } from './pagenation-article.interface';
import { PagenationArticleDto } from './dto/pagenation-article.dto';
import { Article } from './article.interface';
import { ArticleService } from './article.service';
import { ClassifyService } from './../classify/classify.service';
import { TagService } from './../tag/tag.service';
import { FileService } from './../file/file.service';
import { Controller, Post, Body, Get, Put } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import * as dayjs from 'dayjs';

@Controller('article')
export class ArticleController {
  constructor(
    private readonly fileService: FileService,
    private readonly tagService: TagService,
    private readonly classifyService: ClassifyService,
    private readonly articleService: ArticleService,
  ) {}

  @Post()
  async CreateArticle(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    const { classify, tag, cover } = createArticleDto;
    const classifyIds: string[] = classify.split(',');
    const tagNames: string[] = tag.split(',');
    const classifyes = await this.classifyService.findByIds(classifyIds);
    let tags = await this.tagService.findByNames(tagNames);
    if (tags.length < tagNames.length) {
      const oldTags = tags.map(item => item.name);
      const newTags = tagNames
        .concat(oldTags)
        .filter(v => !tagNames.includes(v) || !oldTags.includes(v));
      const newTagsArr = newTags.map(item => {
        return {
          name: item,
          createdAt: dayjs().valueOf(),
          updatedAt: dayjs().valueOf(),
        };
      });
      const newTagsArrRes = await this.tagService.createMany(newTagsArr);
      tags = tags.concat(newTagsArrRes);
    }
    const fileData = await this.fileService.findById(cover);
    const articleData = {
      ...createArticleDto,
      reads: 0,
      recommends: 0,
      classify: classifyes,
      tag: tags,
      cover: fileData,
      createdAt: dayjs().valueOf(),
      updatedAt: dayjs().valueOf(),
    };
    return await this.articleService.create(articleData);
  }

  @Get()
  getArticles(@Body() pagnation: PagenationArticleDto): Promise<PagenationArticle> {
    return this.articleService.pagenationArticle(pagnation);
  }

}
