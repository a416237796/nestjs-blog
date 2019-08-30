import { ArticleModule } from './../article/article.module';
import { ClassifySchema } from './classify.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { ClassifyController } from './classify.controller';
import { ClassifyService } from './classify.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Classify',
        schema: ClassifySchema,
      },
    ]),
    forwardRef(() => ArticleModule),
  ],
  controllers: [ClassifyController],
  providers: [ClassifyService],
  exports: [ClassifyService],
})
export class ClassifyModule {}
