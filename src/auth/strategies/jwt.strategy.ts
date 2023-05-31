import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from '../types/jwtPayload.type';

// NestJSの依存性注入システムを利用するためのInjectableデコレータを使用します。
@Injectable()
// PassportStrategyを継承し、ここではJWT認証ストラテジー（Strategy）を使用します。
export class JwtStrategy extends PassportStrategy(Strategy) {
  // UserServiceを依存性注入します。これは後でユーザー情報を取得するために使用します。
  constructor(private readonly userService: UserService) {
    // スーパークラスのコンストラクタを呼び出し、JWT認証ストラテジーの設定をします。
    super({
      // HTTPリクエストからJWTをどのように抽出するかを指定します。ここではHTTPヘッダーのAuthorizationフィールドからBearerトークンとして取得します。
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // このオプションがfalseに設定されているため、JWTの有効期限が過ぎていたら認証は失敗します。
      ignoreExpiration: false,
      // JWTの署名検証に使用する秘密鍵を指定します。ここでは環境変数から取得します。
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // validateメソッドはJWTの署名と有効期限の検証後に呼び出されます。このメソッドのパラメータは、JWTのペイロード（署名と有効期限検証後に残った部分）です。
  // このメソッドは認証が成功したユーザー情報を返すか、認証が失敗した場合はnullを返す必要があります。
  // ここでは、JWTペイロードからユーザーのメールアドレスを取得し、それをもとにUserServiceを使ってユーザー情報を取得します。
  async validate(payload: JwtPayload): Promise<User | null> {
    return await this.userService.getUser(payload.email);
  }
}
