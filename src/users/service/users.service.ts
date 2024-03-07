import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/users.entity';
import { CreateUserDto, BasicUserDto } from '../dto/usersDto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(createdUser: CreateUserDto): Promise<BasicUserDto> {
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
