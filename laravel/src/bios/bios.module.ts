import {forwardRef, Module} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {SequelizeModule} from '@nestjs/sequelize';
import {UsersModule} from 'src/users/users.module';
import {BiosController} from './bios.controller';
import {BiosModel} from './bios.model';
import {BiosService} from './bios.service';

@Module({
    controllers: [BiosController],
    providers: [BiosService],
    imports: [
        SequelizeModule.forFeature([BiosModel]),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'SECRET',
            signOptions: {
                expiresIn: '24h'
            }
        }),
    ]
})
export class BiosModule {
}
