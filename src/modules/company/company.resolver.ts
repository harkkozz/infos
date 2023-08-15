import { Args, Query, Resolver } from '@nestjs/graphql';

import { CompanyEntity } from './company.entity';
import { CompanyService } from './company.service';

@Resolver('Company')
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Query(() => CompanyEntity)
  async getCompanies() {
    return await this.companyService.getCompanies();
  }
  @Query(() => CompanyEntity, {})
  async getCompanyById(@Args('id', { type: () => String }) id: string) {
    return await this.companyService.getCompanyById(id);
  }

  @Query(() => CompanyEntity)
  async searchCompany(@Args('query', { type: () => String }) query: string) {
    return await this.companyService.searchCompany(query);
  }
}
