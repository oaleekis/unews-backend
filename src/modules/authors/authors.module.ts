import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from 'src/db/entities/author.entity';

@Module({
  controllers: [AuthorsController],
  imports: [TypeOrmModule.forFeature([AuthorEntity])],
  exports: [AuthorsService],
  providers: [AuthorsService],
})
export class AuthorsModule { }
