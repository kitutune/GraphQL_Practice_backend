import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TaskModule } from './task/task.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      // nodeが実行されている箇所までのフルパスの結果をsrc/schema.gqlへ
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    // 自動で入る
    TaskModule,
    PrismaModule,
    UserModule,
    AuthModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
