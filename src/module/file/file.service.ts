import { File } from './file.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class FileService {
  constructor(@InjectModel('File') private readonly fileModule: Model<File>) {}

  async create(file: File): Promise<File> {
    const createFile = new this.fileModule(file);
    return await createFile.save();
  }

  async findByMd5(md5: string): Promise<boolean> {
    return await this.fileModule.findOne({ md5 });
  }
}
