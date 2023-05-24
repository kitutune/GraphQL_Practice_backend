import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Status } from '@prisma/client';
// デコレータ
// GraphQLスキーマ内でこのクラスをオブジェクト型として認識させるために必要
@ObjectType()
export class Task {
  // GraphQLの型
  @Field(() => Int)
  // typeの型
  id: number;

  @Field()
  name: string;

  @Field()
  dueDate: string;

  @Field()
  // status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  status: Status;
  // null許容
  @Field({ nullable: true })
  description: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
