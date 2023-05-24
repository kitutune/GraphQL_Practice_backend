import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskInput } from './dto/createTask.input';
import { Task as TaskModel } from './models/task.model';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';

@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  //   GraphQLから取得する旨を記述
  // なのでこのQueryの中はGraphQL仕様の型になる
  @Query(() => [TaskModel], { nullable: `items` })
  async getTasks(): Promise<Task[]> {
    return await this.taskService.getTasks();
  }

  @Mutation(() => TaskModel)
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): Promise<Task> {
    return await this.taskService.createTask(createTaskInput);
  }
}
