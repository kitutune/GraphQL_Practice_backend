import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CreateUserInput } from './dto/createUser.input';
import { UserService } from './user.service';
import { User as UserModel } from './models/user.model';
import { GetUserArgs } from './dto/getUser.args';
// import { GetUserArgs } from './dto/getUser.args';
// import { UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserModel)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.createUser(createUserInput);
  }

  //登録されていないemailの場合はnullを返すようにする;
  @Query(() => UserModel, { nullable: true })
  // @UseGuards(JwtAuthGuard)
  // インプット項目が@ArgsTypeの場合は@Args()の中に何も指定しない
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
    return await this.userService.getUser(getUserArgs.email);
  }
}
