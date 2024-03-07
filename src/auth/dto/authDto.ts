export class RegisterUserDto {
    email: string;
    username: string;
    password: string;
}

export class LoginUserDto {
    username: string;
    password: string;
}

export class ValidRegisteredUserDto {
    email: string;
    username: string;
}
