import { Injectable } from '@nestjs/common';
import * as bycrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/usersDto';
import { BasicUserInfo } from 'src/users/types/user';
import { UsersService } from '../../users/service/users.service';
import { RegisterUserDto } from '../dto/authDto';

@Injectable()
export class AuthService {
    constructor(public usersService: UsersService) {}

    async register(user: RegisterUserDto): Promise<BasicUserInfo> {
        //hash password
        const createdUser: CreateUserDto = {
            ...user,
            hashedPassword: await this.hashPassword(user.password),
        };

        return this.usersService.create(createdUser);
    }

    private async hashPassword(password: string): Promise<string> {
        const passTohash = password;
        const saltRound = 10;
        return await bycrypt.hash(passTohash, saltRound);
    }
}
