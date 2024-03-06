import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/userDto';
import { User } from '../entity/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async register(user: CreateUserDto): Promise<User> {
        const newUser = new User();
        newUser.username = user.username;
        newUser.email = user.email;
        newUser.password = user.password;
        return this.usersRepository.save(newUser);
    }
}
