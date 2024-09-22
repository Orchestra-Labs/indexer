import { Inject, Injectable } from '@nestjs/common';
import { createRPCQueryClient } from '@orchestra-labs/symphonyjs/osmosis/rpc.query';
import { StargateClient } from '@cosmjs/stargate';

@Injectable()
export class SymphonyService {
  constructor(
    @Inject('SYMPHONY_RPC_CLIENT')
    private readonly symphonyRpcClient: Awaited<
      ReturnType<typeof createRPCQueryClient>
    >,
    @Inject('COSMOS_RPC_CLIENT')
    private readonly cosmosRpcClient: StargateClient,
  ) {}

  async getBlockNumber() {
    return await this.cosmosRpcClient.getHeight();
  }

  async getMarketParams() {
    return await this.symphonyRpcClient.osmosis.market.v1beta1.params();
  }

  async getExchangeRequirements() {
    return await this.symphonyRpcClient.osmosis.market.v1beta1.exchangeRequirements();
  }
}
