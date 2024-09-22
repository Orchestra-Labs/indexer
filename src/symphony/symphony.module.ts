import { Module } from '@nestjs/common';
import { SymphonyService } from './symphony.service';
import {
  CosmosRpcClientProvider,
  SymphonyRpcClientProvider,
} from '@/symphony/symphony.rpc.provider';

@Module({
  providers: [
    SymphonyService,
    SymphonyRpcClientProvider,
    CosmosRpcClientProvider,
  ],
  exports: [SymphonyService],
})
export class SymphonyModule {}
