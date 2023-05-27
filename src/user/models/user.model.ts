// NestJSのGraphQLモジュールから必要なデコレータと型をインポート
import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';

// ObjectTypeデコレータを使用してGraphQLのオブジェクトタイプを定義
@ObjectType()
export class User {
  // フィールドデコレータを使用して、このプロパティがGraphQLオブジェクトタイプのフィールドであることを示す
  // Int型であることを示す
  @Field(() => Int)
  id: number;

  // nameフィールドがクエリ可能であることを示す
  @Field()
  name: string;

  // emailフィールドがクエリ可能であることを示す
  @Field()
  email: string;

  // passwordフィールドをGraphQLスキーマから隠す
  // このフィールドはクライアントからクエリできない
  @HideField()
  password: string;

  // createdAtフィールドがクエリ可能であることを示す
  // Date型はGraphQLのDateTime型としてマッピングされる
  @Field()
  createdAt: Date;

  // updatedAtフィールドがクエリ可能であることを示す
  // Date型はGraphQLのDateTime型としてマッピングされる
  @Field()
  updatedAt: Date;
}
