import { UpdateClassifyDto } from './dto/update-classify.dto';
import { Classify } from './classify.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ClassifyService {
  constructor(
    @InjectModel('Classify') private readonly classifyModel: Model<Classify>,
  ) {}

  async create(classify: Classify): Promise<Classify> {
    const createClassify = new this.classifyModel(classify);
    return await createClassify.save();
  }

  async findAll(): Promise<Classify[]> {
    return await this.classifyModel.find().sort({ createdAt: -1 });
  }

  async find(id: string): Promise<Classify> {
    return await this.classifyModel.findOne({ _id: id });
  }

  async findByName(name: string): Promise<boolean> {
    const classify = await this.classifyModel.find({ name });
    return classify.length > 0 ? true : false;
  }

  async findByIds(ids: []): Promise<Classify[]> {
    return await this.classifyModel.find({ _id: { $in: ids } });
  }

  async findChildren(id: string): Promise<Classify[]> {
    return await this.classifyModel.find({pid: id});
  }

  async update(
    id: string,
    updateClassify: UpdateClassifyDto,
  ): Promise<Classify> {
    return await this.classifyModel.findByIdAndUpdate(id, updateClassify, {
      new: true,
    });
  }

  async remove(id: string): Promise<Classify> {
    return await this.classifyModel.findByIdAndRemove(id);
  }
}
