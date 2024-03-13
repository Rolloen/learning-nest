import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
    email: string;
    username: string;
    hashedPassword: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
