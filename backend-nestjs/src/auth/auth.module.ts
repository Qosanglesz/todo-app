import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from "../users/entities/user.entity";
import {UserService} from "../users/user.service";
import {JwtStrategy} from "./jwt.strategy";
import {UsersModule} from "../users/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jwt-secret',
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [UserService, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}