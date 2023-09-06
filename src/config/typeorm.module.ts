import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyEntity } from 'modules/Company/company.entity';
import { UserEntity } from 'modules/User/user.entity';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.get('DB_NAME'),
        host: configService.get('DB_HOST'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        port: 5432,
        synchronize: false,
        ssl: false,
        entities: [CompanyEntity, UserEntity],
        migrations: [join(__dirname, '..', 'db', 'migrations/**/*.ts')]
      })
    })
  ]
})
export class TOrmModule {}
