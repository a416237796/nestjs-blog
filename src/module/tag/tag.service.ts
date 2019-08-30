import { UpdateTagDto } from './dto/update-tag.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './tag.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TagService {
  constructor(@InjectModel('Tag') private readonly tagModel: Model<Tag>) {}

  async findAll(): Promise<Tag[]> {
    return await this.tagModel.find().sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<Tag> {
    return await this.tagModel.findOne({ _id: id });
  }

  async findByIds(ids: []): Promise<Tag[]> {
    return await this.tagModel.find({ _id: { $in: ids } });
  }

  async create(createTagDto: Tag): Promise<Tag> {
    const createTag = new this.tagModel(createTagDto);
    return await createTag.save();
  }

  async createMany(createTagDto: Tag[]): Promise<Tag> {
    return await this.tagModel.insertMany(createTagDto);
  }

  async findByName(name: string): Promise<boolean> {
    const tags = await this.tagModel.find({ name });
    return tags.length > 0 ? true : false;
  }

  async findByNames(names: string[]): Promise<Tag[]> {
    return this.tagModel.find({name: {$in: names}});
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    return await this.tagModel.findByIdAndUpdate(id, updateTagDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<Tag> {
    return await this.tagModel.findByIdAndRemove(id);
  }
}
