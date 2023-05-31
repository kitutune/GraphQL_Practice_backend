import { Module } from '@nestjs/common'; // NestJSのモジュールデコレータをインポートします。モジュールは、アプリケーションの一部を分離し、関連するコンポーネントを組織する方法です。
import { AuthResolver } from './auth.resolver'; // 認証に関連するGraphQLリゾルバをインポートします。リゾルバは、特定のGraphQLクエリやミューテーションがデータをどのように取得または変更するかを定義します。
import { AuthService } from './auth.service'; // AuthServiceは、認証に関連するビジネスロジックを含むサービスをインポートします。
import { UserModule } from 'src/user/user.module'; // UserModuleは、ユーザーに関連する機能を含むNestJSモジュールをインポートします。
import { PassportModule } from '@nestjs/passport'; // PassportModuleは、Passport.jsの機能をNestJSで使うためのモジュールをインポートします。Passport.jsは、ユーザー認証を扱うためのNode.jsミドルウェアです。
import { JwtModule } from '@nestjs/jwt'; // JWTモジュールは、JWTの生成と検証を行うためのNestJSモジュールをインポートします。
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    // 他のモジュールからエクスポートされたプロバイダを含むモジュールのリスト
    UserModule, // UserModuleをインポートします。これにより、このモジュール内の他のプロバイダでUserModuleのプロバイダを使用することができます。
    PassportModule.register({ defaultStrategy: 'jwt' }), // Passportモジュールを設定し、JWTをデフォルトの認証ストラテジーとして登録します。
    JwtModule.register({
      // JWTモジュールを設定します。シークレットキーとトークンの有効期限を指定します。
      secret: process.env.JWT_SECRET, // 環境変数からJWTの秘密鍵を取得します。この秘密鍵は、JWTの署名と検証に使用されます。
      signOptions: { expiresIn: '1h' }, // JWTの有効期限を1時間に設定します。この時間が過ぎると、トークンは無効になります。
    }),
  ],
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy], // このモジュールが提供するプロバイダのリスト。プロバイダは、他のクラスに注入できる依存関係です。
})
export class AuthModule {} // AuthModuleという名前のNestJSモジュールをエクスポートします。
