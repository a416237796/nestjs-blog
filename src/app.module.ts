import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassifyModule } from './classify/classify.module';
import { ArticleModule } from './article/article.module';
import { UserModule } from './module/user/user.module';
import { FileModule } from './module/file/file.module';

@Module({
  imports: [ClassifyModule, ArticleModule, UserModule, FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
