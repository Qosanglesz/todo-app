import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { Response } from 'express';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let service: UsersService;
  let res: Response;

  const mockUser = {
    user_id: 'user123',
    username: 'testuser',
    password: 'hashedpassword',
  };

  const mockToken = 'mock-jwt-token';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            login: jest.fn().mockResolvedValue({ token: mockToken }), // Mock login method
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<UsersService>(UsersService);
    res = { cookie: jest.fn(), clearCookie: jest.fn() } as any; // Mocking response object
  });

  describe('login', () => {
    it('should return a success message and set a cookie', async () => {
      const body = { username: 'testuser', password: 'password123' };

      const result = await controller.login(body, res);

      // Check that the result contains a success message
      expect(result).toEqual({ message: 'Login successful' });

      // Ensure the service login method was called with the correct username and password
      expect(service.login).toHaveBeenCalledWith(body.username, body.password);

      // Ensure the cookie was set with the JWT token
      expect(res.cookie).toHaveBeenCalledWith(
        'jwt',
        mockToken,
        expect.objectContaining({
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 1000 * 60 * 60 * 24,
        }),
      );
    });

    it('should throw an UnauthorizedException if login fails', async () => {
      service.login = jest
        .fn()
        .mockRejectedValue(new UnauthorizedException('Invalid credentials'));

      const body = { username: 'wronguser', password: 'wrongpassword' };

      await expect(controller.login(body, res)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('logout', () => {
    it('should clear the cookie and return a success message', () => {
      const result = controller.logout(res);

      // Check that the response message is correct
      expect(result).toEqual({ message: 'Logout successful' });

      // Ensure the cookie was cleared
      expect(res.clearCookie).toHaveBeenCalledWith('jwt');
    });
  });

  describe('getMe', () => {
    it('should return user information when authenticated', () => {
      const req = { user: { username: 'testuser' } };

      const result = controller.getMe(req);

      // Check that the response contains the correct user information
      expect(result).toEqual({ username: 'testuser' });
    });
  });
});
