import { ArticleModule } from './../article/article.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TagSchema } from './tag.schema';

@Module({
  imports: [
    ArticleModule,
    MongooseModule.forFeature([
      {
        name: 'Tag',
        schema: TagSchema,
      },
    ]),
  ],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
