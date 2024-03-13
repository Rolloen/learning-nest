import { IsEmail, Length, Matches } from 'class-validator';

const PWD_REGEX =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export class RegisterUserDto {
    @IsEmail()
    email: string;
    @Length(3, 20)
    username: string;
    @Length(8, 20)
    @Matches(PWD_REGEX)
    password: string;
}

export class LoginUserDto {
    username: string;
    password: string;
}
