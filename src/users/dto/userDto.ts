import { PartialType } from '@nestjs/mapped-types';

export class RegisterUserDto {
    email: string;
    username: string;
    password: string;
}

export class LoginUserDto {
    username: string;
    password: string;
}

export class CreateUserDto {
    email: string;
    username: string;
    password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
