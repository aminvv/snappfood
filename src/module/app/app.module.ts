import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfig } from 'src/config/typeorm.config';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';


@Module({
  imports: [ConfigModule.forRoot({envFilePath:join(process.cwd(),'.env'),isGlobal:true}),
    TypeOrmModule.forRoot(TypeOrmConfig()),
    AuthModule,
    UserModule,
    CategoryModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
     


