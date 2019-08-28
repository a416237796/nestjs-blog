import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassifyModule } from './module/classify/classify.module';
import { ArticleModule } from './module/article/article.module';
import { UserModule } from './module/user/user.module';
import { FileModule } from './module/file/file.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import database from './config/database';

@Module({
  imports: [
    MongooseModule.forRoot(database.mongodbUrl),
    ClassifyModule,
    ArticleModule,
    UserModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
