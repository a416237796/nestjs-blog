import { PagenationArticleDto } from './dto/pagenation-article.dto';
import { Tag } from './../tag/tag.interface';
import { Classify } from './../classify/classify.interface';
import { Article } from './article.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PagenationArticle } from './pagenation-article.interface';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
  ) {}

  async findByClassifyId(id: string): Promise<Article[]> {
    return await this.articleModel.find({ classify: { _id: id } });
  }

  async updateClassify(id: string, classify: Classify): Promise<Article[]> {
    return await this.articleModel.update(
      { classify: { _id: id } },
      { $set: classify },
      { multi: true },
    );
  }

  async updateTag(id: string, tag: Tag): Promise<Article[]> {
    return await this.articleModel.update(
      { tag: { _id: id } },
      { $set: tag },
      { multi: true },
    );
  }

  async findByTagId(id: string): Promise<Article[]> {
    return await this.articleModel.find({ tag: { _id: id } });
  }

  async pagenationArticle(
    pagenation: PagenationArticleDto,
  ): Promise<PagenationArticle> {
    const {
      pageSize = 2,
      pageNumber = 1,
      tag = '',
      classify = '',
      keywords = '',
    } = pagenation;
    const or = keywords
      ? [
          { title: { $regex: new RegExp(keywords) } },
          { content: { $regex: new RegExp(keywords) } },
        ]
      : '';
    const findSql = {
      $or: or,
      'classify.name': classify,
      'tag.name': tag,
    };
    Object.keys(findSql).map(item => {
      if (!findSql[item]) {
        delete findSql[item];
      }
    });
    const lists = await this.articleModel
    .find(findSql)
    .limit(pageSize)
    .skip((pageNumber - 1) * pageSize);
    const total = await this.articleModel
    .find(findSql).count();
    return {
      lists,
      pageSize,
      pageNumber,
      total
    };
  }

  async create(article: Article): Promise<Article> {
    const createArticle = new this.articleModel(article);
    return await createArticle.save();
  }
}
