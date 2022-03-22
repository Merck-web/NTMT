import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';


@Module({
  imports: [
      ConfigModule.forRoot({
         envFilePath:'.env.development'
      }),
      // SequelizeModule.forRoot({
      //   dialect: 'postgres',
      //   host: 'localhost',
      //   port: 5432,
      //   username: '',
      //   password: '',
      //   database: '',
      //   models: [],
      //   autoLoadModels: true
      // })
  UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
