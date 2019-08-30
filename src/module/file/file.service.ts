import { CreateFileDto } from './dto/create-file.dto';
import { File } from './file.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class FileService {
  constructor(@InjectModel('File') private readonly fileModule: Model<File>) {}

  async create(createFileDto: CreateFileDto): Promise<File> {
    const createFile = new this.fileModule(createFileDto);
    return await createFile.save();
  }

  async findById(id: string): Promise<File> {
    return await this.fileModule.findOne({ _id: id });
  }
}
