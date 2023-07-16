import { Company } from 'entities/Company';
import { GraphQLError } from 'graphql';

interface CompanyPayload {
  company: Company;
}

interface EditCompanyPayload extends CompanyPayload {
  id: string;
}

export const companyResolvers = {
  Query: {
    getCompanies: async () => {
      const [data] = await Company.findAndCount({
        take: 20,
        skip: 0
      });

      return data;
    },

    searchCompany: async (_, { query }: { query: string }) => {
      const data = await Company.createQueryBuilder('companies')
        .where('LOWER(companies.companyName) like LOWER(:query)')
        .orWhere('LOWER(city) like LOWER(:query)')
        .orWhere('LOWER(state) like LOWER(:query)')
        .setParameter('query', `%${query?.toLowerCase()}%`)
        .getMany();

      return data;
    },
    getCompanyById: async (_, { id }: { id: string }) => {
      const companyById = await Company.findOne({ where: { id } });

      return companyById;
    }
  },
  Mutation: {
    createCompany: async (_, { company }: CompanyPayload) => {
      try {
        const thisCompany = new Company();

        thisCompany.companyName = company.companyName;
        thisCompany.city = company.city;
        thisCompany.state = company.state;
        thisCompany.email = company.email;
        thisCompany.areaCode = company.areaCode;
        thisCompany.phoneNumber = company.phoneNumber;
        thisCompany.userId = company.userId;

        const data = await thisCompany.save();

        return { ...data };
      } catch (error) {
        console.log(error.detail);
        throw new GraphQLError(error.detail, {
          extensions: {
            http: {
              status: 401
            }
          }
        });
      }
    },
    editCompany: async (_, { id, company }: EditCompanyPayload) => {
      const foundCompany = await Company.findOne({ where: { id } });

      foundCompany.companyName = company.companyName;
      foundCompany.city = company.city;
      foundCompany.state = company.state;
      foundCompany.email = company.email;
      foundCompany.areaCode = company.areaCode;
      foundCompany.phoneNumber = company.phoneNumber;
      foundCompany.userId = company.userId;

      const updatedCompany = await foundCompany.save();

      return updatedCompany;
    },
    deleteCompany: async (_, { id }: { id: string }) => {
      const company = await Company.findOne({ where: { id } });
      try {
        await company.remove();

        return { id, companyName: company.companyName };
      } catch (error) {
        console.log(error);
      }
    }
  }
};
