import { UseGuards } from '@nestjs/common'; // NestJSが提供するGuardを使うためのデコレータ
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'; // NestJSのGraphQLモジュールが提供するデコレータと関数
import { AuthService } from './auth.service'; // AuthServiceをインポート
import { SignInInput } from './dto/signIn.input'; // signInメソッドに必要な引数の型を定義したものをインポート
import { SignInResponse } from './dto/signInResponse'; // signInメソッドの返り値の型を定義したものをインポート
import { GqlAuthGuard } from './guards/gql-auth.guard'; // GraphQL用の認証ガードをインポート

// Resolverデコレータは、このクラスがGraphQLのリゾルバであることを示す
@Resolver()
export class AuthResolver {
  // コンストラクタでAuthServiceを注入
  constructor(private readonly authService: AuthService) {}

  // Mutationデコレータは、このメソッドがGraphQLのミューテーションであることを示す
  // UseGuardsデコレータは、このミューテーションがGqlAuthGuardによって保護されることを示す
  @Mutation(() => SignInResponse)
  @UseGuards(GqlAuthGuard)
  async signIn(
    // Argsデコレータは、GraphQLミューテーションの引数を取得する
    // 'signInInput'は引数の名前で、SignInInput型のsignInInput引数として取得する
    @Args('signInInput') signInInput: SignInInput,
    // Contextデコレータは、リクエストのコンテキストを取得する
    // ここでは、コンテキスト内のユーザー情報が必要である
    @Context() context: any,
  ) {
    // AuthServiceのsignInメソッドを呼び出して結果を返す
    // context.userはGqlAuthGuardによって提供され、認証されたユーザー情報を含む
    return await this.authService.signIn(context.user);
  }
}
