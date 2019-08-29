import { FileService } from './file.service';
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    return file;
    // const oldFile = await this.fileService.findByMd5(file.md5);
    // if (oldFile) {
    //   return oldFile;
    // } else {
    //   const newFile = await this.fileService.create(file);
    //   return newFile;
    // }
  }
}
