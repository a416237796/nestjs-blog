import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as dayjs from 'dayjs';
import { FileSchema } from './file.schema';
import * as nuid from 'nuid';

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
        destination: `./public/uploads/${dayjs().format('YYYY-MM-DD')}`,
        filename: (req, file, cb) => {
          const filename = `${nuid.next()}.${file.mimetype.split('/')[1]}`;
          return cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
