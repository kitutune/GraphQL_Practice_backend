// NestJS および Prisma クライアントからのインポートを行います。
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'; // NestJS コアモジュールから必要なインポートを行います
import { PrismaClient } from '@prisma/client'; // Prisma クライアントをインポートします

@Injectable() // Injectable デコレータは、このクラスが NestJS 依存性注入システムによって管理されるサービスであることを示します
export class PrismaService extends PrismaClient implements OnModuleInit {
  // PrismaClient を拡張して、NestJS のライフサイクルイベントを利用する PrismaService を作成します

  async onModuleInit() {
    // onModuleInit() メソッドは、NestJS モジュールが初期化されたときに自動的に実行されるライフサイクルメソッドです
    await this.$connect(); // Prisma クライアントをデータベースに接続します
  }

  async enableShutdownHooks(app: INestApplication) {
    // アプリケーションのシャットダウンフックを有効にするメソッド
    this.$on('beforeExit', async () => {
      // 'beforeExit' イベントが発生する前に実行するリスナーを登録します
      await app.close(); // NestJS アプリケーションを正常にシャットダウンします。これにより、すべてのモジュールの onDestroy() メソッドが呼び出されます
    });
  }
}
