import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private static readonly logger = new Logger('ExceptionsHandler');

  catch(exception: HttpException, host: ArgumentsHost) {
    if (exception.getStatus() >= 500) {
      HttpExceptionFilter.logger.error(exception.message, exception.stack);
    } else {
      HttpExceptionFilter.logger.warn(exception.message);
    }
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
