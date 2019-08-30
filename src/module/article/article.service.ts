import { Tag } from './../tag/tag.interface';
import { Classify } from './../classify/classify.interface';
import { Article } from './article.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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

  async create(article: Article): Promise<Article> {
    const createArticle = new this.articleModel(article);
    return await createArticle.save();
  }
}
