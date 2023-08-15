import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// import { CreateCompanyInput } from './dto/create-company.input';
// import { UpdateCompanyInput } from './dto/update-company.input';
import { CompanyEntity } from './company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>
  ) {}
  // create(createCompanyInput: CreateCompanyInput) {
  //   return 'This action adds a new company';
  // }

  async getCompanies(): Promise<Partial<CompanyEntity[]>> {
    return await this.companyRepository.find();
  }

  async getCompanyById(id: string): Promise<CompanyEntity> {
    return await this.companyRepository.findOne({
      where: { id }
    });
  }

  async searchCompany(query: string): Promise<CompanyEntity[]> {
    const data = await this.companyRepository
      .createQueryBuilder('company')
      .where('LOWER(companies.companyName) like LOWER(:query)')
      .orWhere('LOWER(city) like LOWER(:query)')
      .orWhere('LOWER(state) like LOWER(:query)')
      .setParameter('query', `%${query?.toLowerCase()}%`)
      .getMany();

    return data;
  }
}
