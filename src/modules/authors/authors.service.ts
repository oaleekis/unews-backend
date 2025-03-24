import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorEntity } from 'src/db/entities/author.entity';

@Injectable()
export class AuthorsService {

  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>
  ) { }

  async create(createAuthorDto: CreateAuthorDto) {
    const authorAlreadyExists = await this.findOneByEmail(createAuthorDto.email);

    if (authorAlreadyExists) {
      throw new ConflictException(`Author with email ${createAuthorDto.email} already exists`);
    }

    const dbAuthor = this.authorRepository.create({
      email: createAuthorDto.email,
      name: createAuthorDto.name,
      password: bcryptHashSync(createAuthorDto.password, 10),
    });

    const createdAuthor = await this.authorRepository.save(dbAuthor);

    return this.mapEntityToDto(createdAuthor);

  }

  async findOneByEmail(email: string): Promise<CreateAuthorDto | null> {
    const authorFound = await this.authorRepository.findOne({
      where: { email }
    })

    if (!authorFound) {
      return null;
    }

    return {

      id: authorFound.id,
      name: authorFound.name,
      email: authorFound.email,
      password: authorFound.password,
      createdAt: authorFound.createdAt,
      updatedAt: authorFound.updatedAt,
      deletedAt: authorFound.deletedAt ? new Date(authorFound.deletedAt) : null
    }
  }

  private mapEntityToDto(authorEntity: AuthorEntity): CreateAuthorDto {
    return {
      id: authorEntity.id,
      name: authorEntity.name,
      email: authorEntity.email,
      password: authorEntity.password,
      createdAt: authorEntity.createdAt,
      updatedAt: authorEntity.updatedAt,
      deletedAt: authorEntity.deletedAt ? new Date(authorEntity.deletedAt) : null
    }
  }

}
