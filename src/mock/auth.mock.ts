import { RegisterUserDto } from 'src/auth/dto/authDto';

const RIGHT_USRNAME = 'Tester';
const RIGHT_EMAIL = 'Test@testing.com';
const RIGHT_PWD = 'tesTing@123';

export const validUserRegisterMock: RegisterUserDto = {
    username: RIGHT_USRNAME,
    email: RIGHT_EMAIL,
    password: RIGHT_PWD,
};

export const wrongEmailUserRegisterMock: RegisterUserDto = {
    username: RIGHT_USRNAME,
    email: 'Testtesting.com',
    password: RIGHT_PWD,
};

export const wrongUsernameUserRegisterMock: RegisterUserDto = {
    username: 'Te',
    email: RIGHT_EMAIL,
    password: RIGHT_PWD,
};
export const wrongPwdUserRegisterMock: RegisterUserDto = {
    username: RIGHT_USRNAME,
    email: RIGHT_EMAIL,
    password: 'test123',
};
