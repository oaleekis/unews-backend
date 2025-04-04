import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNewsDto, FindAllParameters } from './dto/create-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from 'src/db/entities/news.entity';
import { FindOptionsWhere, Repository, Like } from 'typeorm';

@Injectable()
export class NewsService {

  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
  ) { }

  async create(createNewsDto: CreateNewsDto, authorId): Promise<CreateNewsDto> {
    const newsToSave: NewsEntity = {
      title: createNewsDto.title,
      content: createNewsDto.content,
      authorId: authorId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null
    };

    const createdNews = await this.newsRepository.save(newsToSave);

    return this.mapEntityToDto(createdNews);
  }


  async findById(id: string): Promise<CreateNewsDto> {
    const foundNews = await this.newsRepository.findOne({ where: { id } });

    if (!foundNews) {
      throw new HttpException('News not found', HttpStatus.NOT_FOUND);
    }

    const newsDto = this.mapEntityToDto(foundNews);

    return newsDto;
  }

  async findAll(params: FindAllParameters) {
    const { title, authorId, page = 1, limit = 5 } = params;
    const searchParams: FindOptionsWhere<NewsEntity> = { authorId };
  
    if (title) {
      searchParams.title = Like(`%${title}%`);
    }
  
    const [news, total] = await this.newsRepository.findAndCount({
      where: { ...searchParams, deletedAt: null },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: "DESC" },
    });
  
    return {
      data: news.map(this.mapEntityToDto),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
  

  async update(id: string, createNewsDto: CreateNewsDto) {
    const newsFound = await this.newsRepository.findOne({ where: { id } });
  
    if (!newsFound) {
      throw new HttpException('News not found', HttpStatus.BAD_REQUEST);
    }
  
    const newsToUpdate = this.newsRepository.create({
      ...newsFound,
      ...createNewsDto,
    });
  
    await this.newsRepository.save(newsToUpdate);
  
    return newsToUpdate;
  }

  async remove(id: string) {
    const newsFound = await this.newsRepository.findOne({ where: { id } });
  
    if (!newsFound) {
      throw new HttpException('News not found', HttpStatus.BAD_REQUEST);
    }
  
    newsFound.deletedAt = new Date().toISOString();
    await this.newsRepository.save(newsFound);
  }

  private mapEntityToDto(newsEntity: NewsEntity): CreateNewsDto {
    return {
      id: newsEntity.id,
      title: newsEntity.title,
      content: newsEntity.content,
      authorId: newsEntity.authorId,
      createdAt: newsEntity.createdAt,
      updatedAt: newsEntity.updatedAt,
      deletedAt: newsEntity.deletedAt
    }
  }

  private mapDtoToEntity(createNewsDto: CreateNewsDto): Partial<NewsEntity> {
    return {
      title: createNewsDto.title,
      content: createNewsDto.content,
      authorId: createNewsDto.authorId,
      createdAt: createNewsDto.createdAt,
      updatedAt: createNewsDto.updatedAt,
      deletedAt: createNewsDto.deletedAt
    }
  }
}
