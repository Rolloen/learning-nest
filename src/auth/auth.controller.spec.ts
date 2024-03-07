import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/users/service/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { userRegisterMock } from 'src/mock/users.mock';

describe('AuthController', () => {
    let controller: AuthController;
    let authService: AuthService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                {
                    module: class FakeUsersModule {},
                    providers: [{ provide: UsersService, useValue: {} }],
                    exports: [UsersService],
                },
            ],
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        register: jest.fn().mockImplementation(() => {
                            return Promise.resolve(userRegisterMock);
                        }),
                    },
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should call register from authService', async () => {
        // Arrange
        // Act
        await controller.register(userRegisterMock);
        const registerFunc = jest.spyOn(authService, 'register');
        // Assert
        expect(registerFunc).toHaveBeenCalled();
    });

    // it('should return ', async () => {
    //     // Arrange
    //     // Act
    //     await controller.register(userRegisterMock);
    //     const registerFunc = jest.spyOn(authService, 'register');
    //     // Assert
    //     expect(registerFunc).toHaveBeenCalled();
    // });
});
