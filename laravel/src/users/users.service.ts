import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {BiosModel} from 'src/bios/bios.model';
import {CreateUserDto} from './dto/create-user.dto';
import {UsersRolesModel} from './user-has-roles.model';
import {UsersModel} from './users.model';

enum Enum {
    parent = 1
}

@Injectable()
export class UsersService {
    constructor(@InjectModel(UsersModel) private userRepository: typeof UsersModel) {
    }

    async createUser(dto: CreateUserDto) {
        try {
            // let flura_date = (new Date(Number(dto.flura.split('.')[0]), Number(dto.flura.split('.')[1]), Number(dto.flura.split('.')[2])))
            const user = await UsersModel.create({login: dto.login, password: dto.password, types_id: dto.type})
            const user_bio = await BiosModel.create({
                name: dto.name,
                second_name: dto.second_name,
                patronomyc: dto.patronomyc,
                grant: dto.grant,
                user_id: user.id
            })
            let role: Enum = Enum.parent
            console.log(role)
            const user_has_roles = await UsersRolesModel.create({user_id: user.id, role_id: role})
            return {user, user_bio}
        } catch (e) {
            return e
        }
    }

}
