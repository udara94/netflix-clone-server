import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { INTERNAL_SERVER_ERROR } from 'src/const';
import { QueryFailedError } from 'src/errors';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err: any): any => {
        console.log(err);
        if (err instanceof QueryFailedError) {
          return throwError(
            () =>
              new HttpException(
                INTERNAL_SERVER_ERROR,
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
          );
        }
        if (!(err instanceof HttpException)) {
          return throwError(
            () => new InternalServerErrorException(err.message),
          );
        } else {
          return throwError(() => err);
        }
      }),
    );
  }
}
