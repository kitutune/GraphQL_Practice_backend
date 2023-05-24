import { Field, InputType, Int } from '@nestjs/graphql';
import { Status } from '@prisma/client';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateTaskInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  // 空文字を入れられないようにする
  @IsNotEmpty()
  // 値が存在しない場合にもバリデーションが行われてしまうので
  // @IsOptionalで値が存在する時だけバリデーションを行うようにセットする
  // 実質{ nullable: true }とセット
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @Field({ nullable: true })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @Field({ nullable: true })
  description?: string;
}
