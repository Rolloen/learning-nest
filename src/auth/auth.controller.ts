import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/authDto';
import { AuthService } from './service/auth.service';

@Controller('auth')
export class AuthController {
    constructor(public authService: AuthService) {}

    @Post('register')
    async register(@Body() userToRegister: RegisterUserDto) {
        await this.authService.register(userToRegister);
        return 'Registered';
    }
}
