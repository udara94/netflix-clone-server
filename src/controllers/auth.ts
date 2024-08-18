import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/entities/user';
import { UserService } from 'src/services';
import * as bcryptjs from 'bcryptjs';
import { LoginDTO, RefreshTokenDTO } from 'src/entities';
import {
  ACCESS_DENIED,
  BEARER,
  INVALID_EMAIL_OR_PASSWORD,
  INVALID_REFRESH_TOKEN,
  TOKEN_EXPIRE_IN_MINUTES,
} from 'src/const';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async registerUser(@Body() createUserDTO: CreateUserDTO) {
    const existingUser = await this.userService.getUserByEmail(
      createUserDTO.email,
    );

    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    const hashPassword = await bcryptjs.hash(createUserDTO.password, 10);

    createUserDTO.password = hashPassword;

    const result = await this.userService.createUser(createUserDTO);

    return result;
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.userService.getUserForLogin(loginDTO.email);

    if (!user) {
      throw new HttpException(INVALID_EMAIL_OR_PASSWORD, HttpStatus.NOT_FOUND);
    }

    const isPasswordMatch = await bcryptjs.compare(
      loginDTO.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new HttpException(
        INVALID_EMAIL_OR_PASSWORD,
        HttpStatus.BAD_REQUEST,
      );
    }

    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    const response = {
      token: accessToken,
      refreshToken: refreshToken,
      userId: user.id,
    };
    return response;
  }

  @Post('refreshToken')
  @UsePipes(new ValidationPipe())
  async refreshToken(@Body() refreshTokenDTO: RefreshTokenDTO) {
    const refreshToken = refreshTokenDTO.refreshToken;
    if (!refreshToken) {
      throw new HttpException(ACCESS_DENIED, HttpStatus.UNAUTHORIZED);
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    if (typeof decoded === 'string') {
      throw new HttpException(INVALID_REFRESH_TOKEN, HttpStatus.UNAUTHORIZED);
    }

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      },
    );

    const response = {
      token: accessToken,
      tokenType: BEARER,
      expiresIn: TOKEN_EXPIRE_IN_MINUTES,
    };
    return response;
  }
}
