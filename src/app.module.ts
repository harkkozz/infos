import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GQLModule } from 'config/graphql.module';
import { TOrmModule } from 'config/typeorm.module';
import { CompanyModule } from 'modules/Company/company.module';
import { UserModule } from 'modules/User/user.module';

@Module({
  imports: [ConfigModule.forRoot(), TOrmModule, GQLModule, CompanyModule, UserModule]
})
export class AppModule {}
