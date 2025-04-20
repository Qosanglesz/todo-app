import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';

jest.mock('bcrypt');

describe('UsersService', () => {
    let service: UsersService;
    let userRepository: jest.Mocked<Repository<User>>;
    let jwtService: JwtService;

    const mockUser = {
        user_id: 'user123',
        username: 'testuser',
        password: 'hashedpassword',
    } as User;

    const mockUserDto = {
        username: 'testuser',
        password: 'plaintext',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                        findOne: jest.fn(),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        signAsync: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        userRepository = module.get(getRepositoryToken(User));
        jwtService = module.get(JwtService);
    });

    describe('create', () => {
        it('should hash the password and save the user', async () => {
            const hashed = 'hashedPassword123';
            (bcrypt.hash as jest.Mock).mockResolvedValue(hashed);

            userRepository.create.mockReturnValue({
                ...mockUserDto,
                password: hashed,
                user_id: 'mocked-id',
                todos: [],
            } as User);
            userRepository.save.mockResolvedValue(mockUser);

            const result = await service.create(mockUserDto);
            expect(result).toEqual(mockUser);
            expect(bcrypt.hash).toHaveBeenCalledWith(mockUserDto.password, 10);
            expect(userRepository.create).toHaveBeenCalledWith({ ...mockUserDto, password: hashed });
        });
    });

    describe('validateUser', () => {
        it('should return user if credentials are valid', async () => {
            userRepository.findOne.mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);

            const result = await service.validateUser('testuser', 'plaintext');
            expect(result).toEqual(mockUser);
        });

        it('should throw if user not found', async () => {
            userRepository.findOne.mockResolvedValue(null);

            await expect(service.validateUser('invalid', 'invalid')).rejects.toThrow(UnauthorizedException);
        });

        it('should throw if password does not match', async () => {
            userRepository.findOne.mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            await expect(service.validateUser('testuser', 'wrongpassword')).rejects.toThrow(UnauthorizedException);
        });
    });

    describe('login', () => {
        it('should return a JWT token if credentials are valid', async () => {
            userRepository.findOne.mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            jest.spyOn(jwtService, 'signAsync').mockResolvedValue('jwt_token');

            const result = await service.login('testuser', 'plaintext');
            expect(result).toEqual({ token: 'jwt_token' });
        });
    });
});
