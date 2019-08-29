import { ArticleModule } from './../article/article.module';
import { ClassifySchema } from './classify.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
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
    ArticleModule,
  ],
  controllers: [ClassifyController],
  providers: [ClassifyService],
})
export class ClassifyModule {}
