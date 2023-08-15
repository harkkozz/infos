import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity, // BeforeInsert,
  // BeforeUpdate,
  Column,
  Entity, // Like,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { CompanyEntity } from 'modules/company/company.entity';

@Entity('users')
@ObjectType('user')
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

  @OneToMany(() => CompanyEntity, (company) => company)
  @Field(() => [CompanyEntity])
  company: CompanyEntity[];

  // @BeforeInsert()
  // @BeforeUpdate()
  // async setSlug() {
  //   const u = await User.find({
  //     where: { slug: Like(`${slugify(this.name, { lower: true })}%`) }
  //   });
  //   const slugifiedName = slugify(this.name, { lower: true });
  //   const slugSuffix = u.length > 0 ? `-${u.length}` : '';

  //   this.slug = `${slugifiedName}${slugSuffix}`;
  // }
}
