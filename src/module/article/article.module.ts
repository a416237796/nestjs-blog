import { FileModule } from './../file/file.module';
import { TagModule } from './../tag/tag.module';
import { ClassifyModule } from './../classify/classify.module';
import { ArticleSchema } from './article.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Article',
        schema: ArticleSchema,
      },
    ]),
    forwardRef(() => ClassifyModule),
    forwardRef(() => TagModule),
    FileModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
