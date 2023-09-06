import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { CompanyEntity } from './company.entity';
import { CreateCompanyInput } from './dto/create-company.input';
import slugify from 'slugify';
import { UpdateCompanyInput } from './dto/update-company.input';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>
  ) {}

  async findAll(): Promise<CompanyEntity[]> {
    return await this.companyRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<CompanyEntity> {
    return await this.companyRepository.findOne({
      where: { id }
    });
  }

  async search(query: string): Promise<CompanyEntity[]> {
    const data = await this.companyRepository
      .createQueryBuilder('companies')
      .where('LOWER(companies.companyName) like LOWER(:query)')
      .orWhere('LOWER(city) like LOWER(:query)')
      .orWhere('LOWER(state) like LOWER(:query)')
      .setParameter('query', `%${query?.toLowerCase()}%`)
      .getMany();

    return data;
  }

  async create(createCompanyInput: CreateCompanyInput) {
    try {
      await this.companyRepository
        .createQueryBuilder()
        .insert()
        .into(CompanyEntity)
        .values(createCompanyInput)
        .execute();
    } catch (error) {
      throw new Error(error);
    }

    return createCompanyInput;
  }

  async update(id: string, updateCompanyInput?: UpdateCompanyInput) {
    try {
      if (id) {
        const slug = await this.generateSlug(updateCompanyInput.companyName);
        const companyInput: UpdateCompanyInput = { ...updateCompanyInput, slug };
        await this.companyRepository
          .createQueryBuilder()
          .update(CompanyEntity)
          .set({ ...companyInput })
          .where('id = :id', { id })
          .execute();
      }
    } catch (error) {
      throw new Error(error);
    }

    return updateCompanyInput;
  }

  async generateSlug(companyName: string): Promise<string> {
    const slug = slugify(companyName, { lower: true });
    const existingCompanies = await this.companyRepository.find({
      where: { slug: Like(`${slug}%`) }
    });

    return `${slug}-${existingCompanies?.length ?? 0}`;
  }
}
