import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { RIGHT_PWD, validUserRegisterMock } from 'src/mock/auth.mock';
import { basicUserMock } from 'src/mock/users.mock';
import { UsersService } from 'src/users/service/users.service';
import { RegisterUserDto } from '../dto/authDto';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let usersService: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: {
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        usersService = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('register', () => {
        it('should call create from usersService when calling register', async () => {
            // Arrange
            const toRegisterUser: RegisterUserDto = validUserRegisterMock;
            // Act
            await service.register(toRegisterUser);
            const usersServiceCreateFunc = jest.spyOn(usersService, 'create');
            // Assert
            expect(usersServiceCreateFunc).toHaveBeenCalled();
        });
        it('should call create from usersService with a user with hashedpassword when calling register', async () => {
            // Arrange
            const toRegisterUser: RegisterUserDto = validUserRegisterMock;
            // Act
            const usersServiceCreateFunc = jest.spyOn(usersService, 'create');
            await service.register(toRegisterUser);
            const expectedUser = usersServiceCreateFunc.mock.calls[0][0];
            const passIsHashed = await bcrypt.compare(
                RIGHT_PWD,
                expectedUser.hashedPassword,
            );
            // Assert
            expect(passIsHashed).toBe(true);
        });

        it('should return a basic user as promise as result when calling register', async () => {
            // Arrange
            const toRegisterUser: RegisterUserDto = validUserRegisterMock;
            // Act
            jest.spyOn(usersService, 'create').mockResolvedValue(basicUserMock);
            const res = await service.register(toRegisterUser);
            // Assert
            expect(res).toBe(basicUserMock);
        });
    });
    describe('hashPassword', () => {});
});
