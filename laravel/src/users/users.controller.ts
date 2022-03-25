import {Body, Controller, Post} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {LoginDto} from './dto/login.dto';
import {UsersService} from './users.service'

@Controller('users')
export class UsersController {

    constructor(private UsersService: UsersService) {
    }

    @Post('/create-user')
    createUser(@Body() dto: CreateUserDto) {
        return this.UsersService.createUser(dto)
    }

    @Post('/login')
    login(@Body() dto: LoginDto) {
        return this.UsersService.login(dto)
    }
}
