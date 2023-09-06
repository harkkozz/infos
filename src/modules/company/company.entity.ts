import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity, // BeforeInsert,
  // BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { UserEntity } from 'modules/User/user.entity';

@Entity('companies')
@ObjectType('Company')
export class CompanyEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field()
  companyName: string;

  @Column()
  @Field()
  state: string;

  @Column()
  @Field()
  city: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  phoneNumber: string;

  @Column({ nullable: true })
  @Field()
  areaCode: string;

  @ManyToOne(() => UserEntity, (user) => user.company)
  @Field(() => UserEntity)
  user: UserEntity;

  @Column({ nullable: true })
  @Field()
  slug?: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
