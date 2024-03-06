import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { userRegisterMock } from 'src/mock/users.mock';

describe('UsersService', () => {
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersService],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('users auth', () => {
        it('should return the registered user when the user is successfully registered', () => {
            //GIVEN
            const userToRegister = userRegisterMock;
            //WHEN
        });
    });
});
