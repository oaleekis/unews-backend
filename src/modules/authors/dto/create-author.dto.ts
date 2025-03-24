import { IsString, IsEmail, IsDateString, IsOptional, IsUUID, MinLength, MaxLength } from 'class-validator';

export class CreateAuthorDto {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsString()
    @MinLength(3)
    @MaxLength(256)
    name: string;

    @IsEmail()
    @MinLength(3)
    @MaxLength(256)
    email?: string;

    @MinLength(3)
    @MaxLength(256)
    password: string;

    @IsDateString()
    @IsOptional()
    createdAt: Date;

    @IsDateString()
    @IsOptional()
    updatedAt: Date;

    @IsOptional()
    deletedAt?: Date;
}
