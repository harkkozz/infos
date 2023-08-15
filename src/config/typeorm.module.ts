import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyEntity } from 'modules/company/company.entity';
import { UserEntity } from 'modules/user/user.entity';

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
        port: parseInt(configService.get('DB_PORT'), 10),
        synchronize: false,
        ssl: false,
        entities: [CompanyEntity, UserEntity],
        migrations: ['config/db/migrations/**/*.ts']
      })
    })
  ]
})
export class TOrmModule {}
