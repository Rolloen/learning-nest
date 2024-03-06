import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { RegisterUserDto } from './dto/userDto';
import { UsersService } from './service/users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('register')
    async register(
        @Body() userToRegister: RegisterUserDto,
        @Res() res: Response,
    ) {
        const user = await this.usersService.register(userToRegister);
        res.status(201).send(user);
    }
}
