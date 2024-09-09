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
    const statusCode = exception.getStatus();

    if (statusCode >= 500) {
      HttpExceptionFilter.logger.error(exception.message, exception.stack);
    } else {
      HttpExceptionFilter.logger.warn(exception.message);
    }
    const ctx = host.switchToHttp();
    const expressResponse = ctx.getResponse<Response>();
    const exceptionResponse = exception.getResponse();
    const request = ctx.getRequest<Request>();

    expressResponse.status(statusCode).json({
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exceptionResponse?.['message'] || exceptionResponse,
    });
  }
}
