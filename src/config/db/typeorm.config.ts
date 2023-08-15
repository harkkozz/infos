import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';

import { CompanyEntity } from 'modules/company/company.entity';
import { UserEntity } from 'modules/user/user.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  database: configService.get('DB_NAME'),
  host: configService.get('DB_HOST'),
  password: configService.get('DB_PASSWORD'),
  username: configService.get('DB_USERNAME'),
  port: parseInt(configService?.get('DB_PORT') ?? '8000', 10),
  synchronize: false,
  ssl: false,
  entities: [UserEntity, CompanyEntity],
  migrations: [join(__dirname, '..', 'db', 'migrations/**/*.ts')]
});
