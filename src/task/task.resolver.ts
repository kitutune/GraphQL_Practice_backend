// NestJS のデコレータと機能をインポートします
import { UseGuards } from '@nestjs/common'; // UseGuards はルートの実行前に実行されるガードを指定するためのデコレータです
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'; // GraphQL のリゾルバ、クエリ、ミューテーション、引数に関連するデコレータと型をインポートします
import { Task } from '@prisma/client'; // Prisma から生成された Task タイプをインポートします
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'; // JWT 認証ガードをインポートします
import { CreateTaskInput } from './dto/createTask.input'; // タスク作成の入力型をインポートします
import { UpdateTaskInput } from './dto/updateTask.input'; // タスク更新の入力型をインポートします
import { Task as TaskModel } from './models/task.model'; // GraphQL のタスクモデルをインポートします
import { TaskService } from './task.service'; // タスクに関するビジネスロジックを含むサービスをインポートします

@Resolver() // Resolver デコレータは、このクラスが GraphQL リゾルバであることを示します
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {} // 依存性注入を使用して TaskService をインスタンス化します

  @Query(() => [TaskModel], { nullable: 'items' }) // Query デコレータは、このメソッドが GraphQL クエリであることを示します
  @UseGuards(JwtAuthGuard) // UseGuards デコレータは、このクエリが JwtAuthGuard によって保護されることを示します
  async getTasks(
    @Args('userId', { type: () => Int }) userId: number, // Args デコレータは、クエリの引数を取得します。ここでは、userId を引数として取得します
  ): Promise<Task[]> {
    return await this.taskService.getTasks(userId); // TaskService の getTasks メソッドを呼び出して結果を返します
  }

  @Mutation(() => TaskModel) // Mutation デコレータは、このメソッドが GraphQL ミューテーションであることを示します
  @UseGuards(JwtAuthGuard) // UseGuards デコレータは、このミューテーションが JwtAuthGuard によって保護されることを示します
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput, // Args デコレータは、ミューテーションの引数を取得します。ここでは、createTaskInput を引数として取得します
  ): Promise<Task> {
    return await this.taskService.createTask(createTaskInput); // TaskService の createTask メソッドを呼び出して結果を返します
  }

  @Mutation(() => TaskModel) // Mutation デコレータは、このメソッドが GraphQL ミューテーションであることを示します
  @UseGuards(JwtAuthGuard) // UseGuards デコレータは、このミューテーションが JwtAuthGuard によって保護されることを示します
  async updateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput, // Args デコレータは、ミューテーションの引数を取得します。ここでは、updateTaskInput を引数として取得します
  ): Promise<Task> {
    return await this.taskService.updateTask(updateTaskInput); // TaskService の updateTask メソッドを呼び出して結果を返します
  }

  @Mutation(() => TaskModel) // Mutation デコレータは、このメソッドが GraphQL ミューテーションであることを示します
  @UseGuards(JwtAuthGuard) // UseGuards デコレータは、このミューテーションが JwtAuthGuard によって保護されることを示します
  async deleteTask(@Args('id', { type: () => Int }) id: number): Promise<Task> {
    // Args デコレータは、ミューテーションの引数を取得します。ここでは、id を引数として取得します
    return await this.taskService.deleteTask(id); // TaskService の deleteTask メソッドを呼び出して結果を返します
  }
}
