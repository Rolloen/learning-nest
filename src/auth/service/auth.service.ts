import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/usersDto';
import { UsersService } from '../../users/service/users.service';
import { RegisterUserDto, ValidRegisteredUserDto } from '../dto/authDto';

@Injectable()
export class AuthService {
    constructor(public usersService: UsersService) {}

    async register(user: RegisterUserDto): Promise<ValidRegisteredUserDto> {
        //hash password

        const createdUser: CreateUserDto = {
            ...user,
            hashedPassword: 'hashedPassword',
        };

        return this.usersService.create(createdUser);
    }
}
