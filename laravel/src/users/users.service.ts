import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {InjectModel} from '@nestjs/sequelize';
import {BiosModel} from 'src/bios/bios.model';
import {CreateUserDto} from './dto/create-user.dto';
import {UsersRolesModel} from './user-has-roles.model';
import {UsersModel} from './users.model';
import * as bcrypt from 'bcryptjs'
import {LoginDto} from './dto/login.dto';

enum Enum {
    parent = 1,
    teacher,
    student
}

@Injectable()
export class UsersService {
    constructor(@InjectModel(UsersModel) private userRepository: typeof UsersModel, private jwtService: JwtService,) {
    }

    async createUser(dto: CreateUserDto) {
        try {
            // let flura_date = (new Date(Number(dto.flura.split('.')[0]), Number(dto.flura.split('.')[1]), Number(dto.flura.split('.')[2])))
            const hashPassword = await bcrypt.hash(dto.password, 5)
            const user = await UsersModel.create({login: dto.login, password: hashPassword, types_id: dto.type})
            const user_bio = await BiosModel.create({
                name: dto.name,
                second_name: dto.second_name,
                patronomyc: dto.patronomyc,
                grant: dto.grant,
                user_id: user.id
            })
            let user_has_roles
            if (dto.role == 'parent') {
                let role: Enum = Enum.parent
                user_has_roles = await UsersRolesModel.create({user_id: user.id, role_id: role})
            } else if (dto.role == 'teacher') {
                let role: Enum = Enum.teacher
                user_has_roles = await UsersRolesModel.create({user_id: user.id, role_id: role})
            } else if (dto.role == 'student') {
                let role: Enum = Enum.teacher
                user_has_roles = await UsersRolesModel.create({user_id: user.id, role_id: role})
            }
            return {user, user_bio, user_has_roles}
        } catch (e) {
            return e
        }
    }

    async login(dto: LoginDto) {
        try {
            console.log('зашле')
            const candidate = await UsersModel.findOne({where: {login: dto.login}})
            console.log(candidate)
            const password = await bcrypt.compare(dto.password, candidate.password)
            if (password && candidate) {
                const payload = {id: candidate.id}
                return {token: this.jwtService.sign(payload)}
            }

        } catch (e) {
            return e
        }

    }
}
