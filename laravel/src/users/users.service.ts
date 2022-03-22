import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {BiosModel} from 'src/bios/bios.model';
import {UsersModel} from './users.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel(UsersModel) private userRepository: typeof UsersModel) {
    }

    async createUser(dto) {
        try {
            const user = await UsersModel.create({login: dto.login, password: dto.password, types_id: dto.type})
            return user
        } catch (e) {
            return e
        }
    }

}
