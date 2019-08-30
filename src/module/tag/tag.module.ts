import { ArticleModule } from './../article/article.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TagSchema } from './tag.schema';

@Module({
  imports: [
    forwardRef(() => ArticleModule),
    MongooseModule.forFeature([
      {
        name: 'Tag',
        schema: TagSchema,
      },
    ]),
  ],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService],
})
export class TagModule {}
