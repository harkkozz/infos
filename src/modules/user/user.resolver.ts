import { Args, Query, Resolver } from '@nestjs/graphql';

import { UserEntity } from './user.entity';
import { UserService } from './user.service';

// import { CreateUserInput } from './dto/create-user.input';
// import { UpdateUserInput } from './dto/update-user.input';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // @Mutation('createUser')
  // create(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   return this.userService.create(createUserInput);
  // }

  @Query(() => [UserEntity])
  async getUsers() {
    return this.userService.findAll();
  }

  @Query(() => UserEntity)
  async getUserById(@Args('userId', { type: () => String }) userId: string) {
    return await this.userService.findOne(userId);
  }

  // @Mutation('updateUser')
  // update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.userService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation('removeUser')
  // remove(@Args('id') id: number) {
  //   return this.userService.remove(id);
  // }
}
