import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
    email: string;
    username: string;
    hashedPassword: string;
}

export class BasicUserDto {
    email: string;
    username: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
