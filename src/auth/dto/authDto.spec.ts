import { plainToInstance } from 'class-transformer';
import {
    validUserRegisterMock,
    wrongEmailUserRegisterMock,
    wrongPwdUserRegisterMock,
    wrongUsernameUserRegisterMock,
} from 'src/mock/auth.mock';
import { RegisterUserDto } from './authDto';
import { validate } from 'class-validator';

describe('Auth DTO tests', () => {
    describe('Register DTO', () => {
        it('should return no  error if given userDto is valid ', async () => {
            //arrange
            const userDto = plainToInstance(
                RegisterUserDto,
                validUserRegisterMock,
            );
            //act
            const validationErrors = await validate(userDto);
            //assert
            expect(validationErrors).toHaveLength(0);
        });
        it('should return error if given userDto has invalid email ', async () => {
            //arrange
            const userDto = plainToInstance(
                RegisterUserDto,
                wrongEmailUserRegisterMock,
            );
            //act
            const validationErrors = await validate(userDto);
            //assert
            expect(validationErrors).toHaveLength(1);
            expect(validationErrors[0].constraints).toHaveProperty('isEmail');
        });

        it('should return error if given userDto has invalid username length ', async () => {
            //arrange
            const userDto = plainToInstance(
                RegisterUserDto,
                wrongUsernameUserRegisterMock,
            );
            //act
            const validationErrors = await validate(userDto);
            //assert
            expect(validationErrors).toHaveLength(1);
            expect(validationErrors[0].constraints).toHaveProperty('isLength');
        });

        it('should return 2 errors (length and invalid format) if given userDto has invalid password ', async () => {
            //arrange
            const userDto = plainToInstance(
                RegisterUserDto,
                wrongPwdUserRegisterMock,
            );
            //act
            const validationErrors = await validate(userDto);
            //assert
            expect(validationErrors).toHaveLength(1);
            expect(validationErrors[0].constraints).toHaveProperty('isLength');
            expect(validationErrors[0].constraints).toHaveProperty('matches');
        });
    });
});
