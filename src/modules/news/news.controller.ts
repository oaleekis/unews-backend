import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, Query, BadRequestException } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto, FindAllParameters, NewsRouteParameters } from './dto/create-news.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req, @Body() createNewsDto: CreateNewsDto): Promise<CreateNewsDto> {
    const authorId = req.author?.sub;

    if (!authorId) {
      throw new BadRequestException("Author ID inválido");
    }

    return await this.newsService.create(createNewsDto, authorId);
  }

  @Get()
  async findAll(@Query() params: FindAllParameters): Promise<{ data: CreateNewsDto[]; total: number; page: number; totalPages: number; }> {
    return this.newsService.findAll({ ...params });
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  async findMyNews(@Request() req, @Query() params: FindAllParameters): Promise<{ data: CreateNewsDto[]; total: number; page: number; totalPages: number; }> {
    const authorId = req.author.sub;
    return this.newsService.findAll({ ...params, authorId: authorId });
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async findById(@Param('id') id: string): Promise<CreateNewsDto> {
    return this.newsService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  async update(@Param() params: NewsRouteParameters, @Body() createNewsDto: CreateNewsDto) {
    return this.newsService.update(params.id, createNewsDto);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}
