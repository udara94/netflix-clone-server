import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ResponsePayload<T> {
  statusCode: number;
  data: T;
}
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponsePayload<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponsePayload<T>> {
    return next.handle().pipe(
      map((data: any) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        data,
      })),
    );
  }
}
