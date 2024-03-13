import { Test, TestingModule } from '@nestjs/testing';
import { validUserRegisterMock } from 'src/mock/auth.mock';
import { UsersService } from 'src/users/service/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';

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
                            return Promise.resolve(validUserRegisterMock);
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

    it('should call register from authService when calling Register route', async () => {
        // Arrange
        // Act
        await controller.register(validUserRegisterMock);
        const registerFunc = jest.spyOn(authService, 'register');
        // Assert
        expect(registerFunc).toHaveBeenCalled();
    });

    it('should return "Registered" if user is valid when calling Register route', async () => {
        // Arrange
        // Act
        const controllerRes = await controller.register(validUserRegisterMock);
        // Assert
        expect(controllerRes).toBe('Registered');
    });
});
