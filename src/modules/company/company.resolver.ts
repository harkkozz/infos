import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CompanyEntity } from './company.entity';
import { CompanyService } from './company.service';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';

@Resolver('Company')
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Query(() => [CompanyEntity], { nullable: true })
  async getCompanies() {
    return await this.companyService.findAll();
  }
  @Query(() => CompanyEntity)
  async getCompanyById(@Args('id', { type: () => String }) id: string) {
    return await this.companyService.findOne(id);
  }

  @Query(() => [CompanyEntity])
  async searchCompany(@Args('query', { type: () => String }) query: string) {
    return await this.companyService.search(query);
  }

  @Mutation(() => CompanyEntity, { name: 'createCompany' })
  async createCompany(@Args('createCompanyInput') createCompanyInput: CreateCompanyInput) {
    const slug = await this.companyService.generateSlug(createCompanyInput.companyName);
    const data = await this.companyService.create({ ...createCompanyInput, slug });

    return data;
  }

  @Mutation(() => CompanyEntity, { name: 'updateCompany', nullable: true })
  async updateCompany(@Args('id') id: string, @Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput) {
    const slug = await this.companyService.generateSlug(updateCompanyInput.companyName);
    await this.companyService.update(id, { ...updateCompanyInput, slug });

    return id;
  }
}
