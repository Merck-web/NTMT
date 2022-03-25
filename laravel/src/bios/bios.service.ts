import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';

import {InjectModel} from '@nestjs/sequelize';
import {BiosModel} from './bios.model';

@Injectable()
export class BiosService {
    constructor(@InjectModel(BiosModel) private userRepository: typeof BiosModel,
                private jwtService: JwtService) {
    }

    async getBios(headers) {
        try {
            const token = headers.authorization.split(' ')[1]
            const decoded = this.jwtService.verify(token)
            console.log(decoded)
            const bio = BiosModel.findOne({where: {user_id: decoded.id}})
            return bio
        } catch (e) {
            return e
        }
    }
}
