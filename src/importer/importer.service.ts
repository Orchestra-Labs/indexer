import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ImporterService {
  private readonly logger = new Logger(ImporterService.name);

  @OnEvent('block.new')
  test() {
    this.logger.log('ImporterService.test()');
  }
}
