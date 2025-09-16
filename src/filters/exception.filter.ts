import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { GraphQLError } from 'graphql';

interface ValidationErrorResponse {
  message: string[];
  error: string;
  statusCode: number;
}

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(`Exception caught: ${JSON.stringify(exception)}`);

    if (exception instanceof GraphQLError) {
      const { message, extensions } = exception;
      const { code = 500 } = extensions || {};
      throw new GraphQLError(message, {
        extensions: { status: code, timestamp: new Date().toISOString() },
      });
    }

    if (exception instanceof BadRequestException) {
      const response = exception.getResponse() as ValidationErrorResponse | string;
      const errors = typeof response === 'string' ? [response] : response.message || [];
      const message = errors.length > 1 ? 'Validation failed' : exception.message;
      throw new GraphQLError(message, {
        extensions: {
          status: HttpStatus.BAD_REQUEST,
          timestamp: new Date().toISOString(),
          errors: errors,
        },
      });
    }

    throw new GraphQLError('Internal Server Error', {
      extensions: {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
      },
    });
  }
}
