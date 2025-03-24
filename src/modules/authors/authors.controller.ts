import { Controller, Post, Body} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) { }

  @Post()
  async create(@Body() CreateAuthorDto: CreateAuthorDto): Promise<CreateAuthorDto> {
    return await this.authorsService.create(CreateAuthorDto);
  }

}
