import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {SequelizeModule} from '@nestjs/sequelize/dist/sequelize.module';
import {RolesModel} from './roles.model';
import {TypesModel} from './types.model';
import {UsersRolesModel} from './user-has-roles.model';
import {UsersController} from './users.controller';
import {UsersModel} from './users.model';
import {UsersService} from './users.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([UsersModel, RolesModel, TypesModel, UsersRolesModel]),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'SECRET',
            signOptions: {
                expiresIn: '24h'
            }
        }),
    ],
    exports: [JwtModule]
})
export class UsersModule {
}
