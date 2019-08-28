import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import * as dayjs from 'dayjs'
@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = 
      exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception.message ||
      exception.message.message ||
      exception.message.error ||
      null;
    Logger.log(message, '错误提示');
    const timestamp = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const errorResponse = {
      status,
      data: message,
      message: '请求失败！',
      code: 1,
      path: request.url,
      method: request.method,
      timestamp,
    };
    Logger.error(
      `${timestamp}: ${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
      'HttpExceptionFilter',
    );
    response
      .status(status)
      .json(errorResponse);
  }
}
