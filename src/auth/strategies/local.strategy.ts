import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy } from 'passport-local'; // Passportのローカルストラテジーをインポート
import { AuthService } from '../auth.service';

@Injectable() // NestJSの依存注入システムにより、このクラスのインスタンスが必要なときに自動的に生成されるように指定
export class LocalStrategy extends PassportStrategy(Strategy) {
  // Passportのローカルストラテジーを継承
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' }); // スーパークラスのコンストラクタを呼び出し、ユーザー名フィールドを'email'に設定
  }

  // validateメソッドは、ユーザーが入力した情報（この場合はemailとpassword）を検証するために使われます。
  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email, password); // AuthServiceを使ってユーザー情報を検証
    if (!user) {
      throw new UnauthorizedException(); // ユーザーが存在しない場合、UnauthorizedExceptionをスロー
    }
    return user; // ユーザー情報を返す
  }
}
