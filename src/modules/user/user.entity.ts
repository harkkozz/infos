import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity, // BeforeInsert,
  // BeforeUpdate,
  Column,
  Entity, // Like,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { CompanyEntity } from 'modules/Company/company.entity';

@Entity('users')
@ObjectType('User')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column({ nullable: true })
  @Field()
  slug: string;

  @OneToMany(() => CompanyEntity, (company) => company.user)
  @Field(() => [CompanyEntity])
  company: CompanyEntity[];
}
