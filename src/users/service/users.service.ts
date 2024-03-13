import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/usersDto';
import { User } from '../entity/users.entity';
import { BasicUserInfo } from '../types/user';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(createdUser: CreateUserDto): Promise<BasicUserInfo> {
        const newUser = new User();
        newUser.username = createdUser.username;
        newUser.email = createdUser.email;
        newUser.hashedPassword = createdUser.hashedPassword;
        await this.usersRepository.save(newUser);
        return {
            username: newUser.username,
            email: newUser.email,
        };
    }
}
