import { MongooseModule } from '@nestjs/mongoose';
import { Module, BadRequestException } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as dayjs from 'dayjs';
import { FileSchema } from './file.schema';
import * as nuid from 'nuid';
import { checkDirAndCreate } from '../../common/utils/util';

const image = ['gif', 'png', 'jpg', 'jpeg', 'bmp', 'webp'];
const video = ['mp4', 'webm'];
const audio = ['mp3', 'wav', 'ogg'];

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'File',
        schema: FileSchema,
      },
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          const mimetype = file.mimetype.split('/')[0];
          let temp = 'other';
          image.filter(item => item === mimetype).length > 0
            ? (temp = 'image')
            : '';
          video.filter(item => item === mimetype).length > 0
            ? (temp = 'video')
            : '';
          audio.filter(item => item === mimetype).length > 0
            ? (temp = 'audio')
            : '';
          const filePath = `public/uploads/${temp}/${dayjs().format(
            'YYYY-MM-DD',
          )}`;
          checkDirAndCreate(filePath);
          return cb(null, `./${filePath}`);
        },
        filename: (req, file, cb) => {
          const fileType = file.originalname.split('.');
          const filename = `${nuid.next()}.${fileType[fileType.length - 1]}`;
          return cb(null, filename);
        },
      }),
      fileFilter(req, file, cb) {
        const mimetype = file.mimetype.split('/')[1];
        let temp = 'other';
        image.filter(item => item === mimetype).length > 0
          ? (temp = 'image')
          : '';
        video.filter(item => item === mimetype).length > 0
          ? (temp = 'video')
          : '';
        audio.filter(item => item === mimetype).length > 0
          ? (temp = 'audio')
          : '';
        if (temp === 'other') {
          return cb(new BadRequestException('文件格式错误！'), false);
        }
        return cb(null, true);
      },
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService]
})
export class FileModule {}
