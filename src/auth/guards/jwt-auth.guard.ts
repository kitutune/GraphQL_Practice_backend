// NestJS の ExecutionContext をインポートします。これはリクエストの実行コンテキストを提供します。
import { ExecutionContext } from '@nestjs/common';
// NestJS の GqlExecutionContext をインポートします。これは GraphQL のリクエストの実行コンテキストを提供します。
import { GqlExecutionContext } from '@nestjs/graphql';
// NestJS の Passport モジュールから AuthGuard をインポートします。これは Passport.js の認証を NestJS で扱うためのガードです。
import { AuthGuard } from '@nestjs/passport';

// AuthGuard を継承して新しいガードを作成します。このガードは 'jwt' ストラテジーを使用します。
export class JwtAuthGuard extends AuthGuard('jwt') {
  // AuthGuard から getRequest メソッドをオーバーライドします。このメソッドはリクエストオブジェクトを返すものです。
  // これが AuthGuard 内部で認証のために使われます。
  getRequest(context: ExecutionContext) {
    // GraphQL の実行コンテキストを作成します。これにより ExecutionContext を GqlExecutionContext に変換します。
    const ctx = GqlExecutionContext.create(context);
    // GraphQL の実行コンテキストからリクエストオブジェクトを取得します。GqlExecutionContext の getContext メソッドは、
    // GraphQL のリクエストコンテキストを返します。このコンテキストには req プロパティ（Express のリクエストオブジェクト）が含まれています。
    return ctx.getContext().req;
  }
}
