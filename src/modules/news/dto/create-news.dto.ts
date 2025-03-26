import { IsString, IsUUID, IsOptional, IsDateString, MinLength, MaxLength } from 'class-validator';

export interface FindAllParameters {
  title?: string;
  authorId?: string;
  page?: number;
  limit?: number;
}

export class NewsRouteParameters {
  @IsUUID()
  id: string;
 }

export class CreateNewsDto {

  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(512)
  content?: string;


  authorId?: string;

  @IsDateString()
  @IsOptional()
  createdAt?: string;

  @IsDateString()
  @IsOptional()
  updatedAt?: string;

  @IsDateString()
  @IsOptional()
  deletedAt?: string;
}
