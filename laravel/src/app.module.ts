import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from './users/users.module';
import { BiosModule } from './bios/bios.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env.development'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            models: [],
            autoLoadModels: true
        }),
        UsersModule,
        BiosModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
