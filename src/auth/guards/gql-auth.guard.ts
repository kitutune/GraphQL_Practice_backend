import { ExecutionContext } from '@nestjs/common'; // NestJSの実行コンテキストをインポート
import { GqlExecutionContext } from '@nestjs/graphql'; // NestJSのGraphQL実行コンテキストをインポート
import { AuthGuard } from '@nestjs/passport'; // NestJSのPassportモジュールからAuthGuardをインポート

// GqlAuthGuardは、AuthGuardを継承したクラスであり、GraphQLのコンテキスト内での認証を行います。
export class GqlAuthGuard extends AuthGuard('local') {
  constructor() {
    super(); // AuthGuardのコンストラクタを呼び出す
  }

  // getRequestメソッドはAuthGuardからオーバーライドされ、実行コンテキストからリクエストを取得します。
  // このメソッドは、認証のためのリクエストを提供するものです。
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context); // GraphQLの実行コンテキストを作成
    const request = ctx.getContext(); // GraphQLの実行コンテキストからリクエストを取得
    // ctx.getArgs().signInInputは、GraphQLのクエリやミューテーションから引数を取得します。
    // これをリクエストのボディとして設定しています。これにより、リクエストボディを通じて認証情報を取得することができます。
    request.body = ctx.getArgs().signInInput;
    return request; // リクエストを返す
  }
}
// このGqlAuthGuardクラスは、NestJSの認証ガードの概念を使用しています。認証ガードは、リクエストが特定のルートにアクセスする前に実行される関数で、通常はユーザーがそのルートへのアクセス権を持っているかを確認するために使用されます。

// この特定のガードは、GraphQLのコンテキストに特化しています。通常のHTTPリクエストとは異なり、GraphQLリクエストは単一のエンドポイント（通常は/graphql）に対して行われ、操作（クエリまたはミューテーション）とその操作の引数がリクエストボディの一部として送信されます。このガードはその特性を扱い、GraphQLリクエストから認証情報を適切に取得することができます。
