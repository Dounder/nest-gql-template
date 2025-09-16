import { Injectable, Logger } from '@nestjs/common';
import { HealthDto } from './dto';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  get(): HealthDto {
    this.logger.log('Health check invoked');
    return { message: 'OK' };
  }
}
