import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCompanyInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  companyName: string;

  @Field(() => String)
  state: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  areaCode: string;

  @Field(() => String)
  phoneNumber: string;

  @Field(() => String, { nullable: true })
  slug: string;
}
