import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";


@Module({
  imports: [
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
