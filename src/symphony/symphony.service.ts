import { Inject, Injectable } from '@nestjs/common';
import { createRPCQueryClient } from '@orchestra-labs/symphonyjs/osmosis/rpc.query';
import { StargateClient } from '@cosmjs/stargate';
import { QuerySupplyOfRequest } from '@orchestra-labs/symphonyjs/cosmos/bank/v1beta1/query';

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

  async getTaxRate() {
    return await this.symphonyRpcClient.osmosis.treasury.v1beta1.taxRate();
  }

  async getSupplyOf(denom: string) {
    const request = { denom: denom } as QuerySupplyOfRequest;
    const response =
      await this.symphonyRpcClient.cosmos.bank.v1beta1.supplyOf(request);
    return response;
  }
}
