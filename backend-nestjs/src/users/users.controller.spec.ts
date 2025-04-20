import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockCreateUserDto: CreateUserDto = {
    username: 'testuser',
    password: 'plaintext',
  };

  const mockUser = {
    user_id: 'mocked-id',
    username: 'testuser',
    password: 'hashedpassword',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockUser), // Mocking create method
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should create a new user and return the user object', async () => {
      // Call the controller method
      const result = await controller.create(mockCreateUserDto);

      // Check that the result matches the expected mock user
      expect(result).toEqual(mockUser);

      // Ensure the service method was called with the correct DTO
      expect(service.create).toHaveBeenCalledWith(mockCreateUserDto);
    });

    it('should throw an error if user creation fails', async () => {
      // Simulate service error
      service.create = jest
        .fn()
        .mockRejectedValue(new UnauthorizedException('Error'));

      // Expect an error when creating the user
      await expect(controller.create(mockCreateUserDto)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });
});
