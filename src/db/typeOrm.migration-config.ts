import { ConfigService } from '@nestjs/config';
import {config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AuthorEntity } from './entities/author.entity';

config();

const configService = new ConfigService();

const dataSourcesOptions: DataSourceOptions = {
    type: 'mysql',
    host: configService.get<string>('DB_HOST'),
    port: +configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [AuthorEntity],
    migrations: [__dirname + '/migrations/*.ts'],
    synchronize: false,
}

export default new DataSource(dataSourcesOptions);