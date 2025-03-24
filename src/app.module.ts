import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './modules/authors/authors.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { NewsModule } from './modules/news/news.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthorsModule,
    AuthModule,
    DbModule,
    NewsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
