import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import {
  AUTHORIZATION_HEADER_MISSING,
  INVALID_TOKEN,
  TOKEN_EXPIRED,
  TOKEN_IS_MISSING,
} from 'src/const';
import { ExtractedUser } from 'src/types/interfaces';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.headers.authorization) {
      const token = request.headers.authorization.split(/\s+/)[1];
      try {
        const decoded: string | jwt.JwtPayload = jwt.verify(
          token,
          process.env.JWT_SECRET,
        );

        if (typeof decoded === 'string') {
          throw new ForbiddenException(INVALID_TOKEN);
        }
        if (!decoded.userId) {
          throw new ForbiddenException(INVALID_TOKEN);
        }

        const user: ExtractedUser = {
          token: token,
          userId: decoded.userId,
        };
        request.user = user;
      } catch (error: any) {
        if (error instanceof TokenExpiredError) {
          throw new ForbiddenException(TOKEN_EXPIRED);
        }
        throw new ForbiddenException(INVALID_TOKEN);
      }
      if (!token) {
        throw new ForbiddenException(TOKEN_IS_MISSING);
      }
    } else {
      throw new ForbiddenException(AUTHORIZATION_HEADER_MISSING);
    }
    return true;
  }
}
