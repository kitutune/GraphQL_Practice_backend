import { Field, Int, ObjectType } from '@nestjs/graphql'; // NestJSのGraphQLモジュールから必要なデコレータと型をインポートします
import { Status } from '@prisma/client'; // PrismaクライアントからStatus enumをインポートします

@ObjectType() // ObjectTypeデコレータは、このクラスがGraphQLのオブジェクト型であることを示します。これにより、GraphQLスキーマにこの型が自動的に含まれます
export class Task {
  // このクラスは、GraphQLスキーマで使用するタスクオブジェクトの形状を定義します

  @Field(() => Int) // Fieldデコレータは、このプロパティがGraphQLフィールドであることを示します。ここでは、そのフィールドのGraphQL型をIntに設定しています
  id: number; // このタスクの一意のID

  @Field() // このプロパティもGraphQLフィールドですが、型は自動的に推測されます（この場合、string）
  name: string; // このタスクの名前

  @Field() // このプロパティもGraphQLフィールドです。型は自動的に推測されます（この場合、string）
  dueDate: string; // このタスクの期日

  @Field() // このプロパティもGraphQLフィールドです。型は自動的に推測されます（この場合、Status enum）
  status: Status; // このタスクの現在のステータス

  @Field({ nullable: true }) // このプロパティもGraphQLフィールドですが、nullableオプションがtrueに設定されています。これは、このフィールドがnullであることを許可します
  description: string; // このタスクの説明

  @Field() // このプロパティもGraphQLフィールドです。型は自動的に推測されます（この場合、Date）
  createdAt: Date; // このタスクが作成された日時

  @Field() // このプロパティもGraphQLフィールドです。型は自動的に推測されます（この場合、Date）
  updatedAt: Date; // このタスクが最後に更新された日時
}
