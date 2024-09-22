import { createRPCQueryClient as symphonyRpcClient } from '@orchestra-labs/symphonyjs/osmosis/rpc.query';
import { cosmos, osmosis } from '@orchestra-labs/symphonyjs';
import { StargateClient } from '@cosmjs/stargate';

export const SymphonyRpcClientProvider = {
  provide: 'SYMPHONY_RPC_CLIENT',
  useFactory: async () =>
    (await osmosis.ClientFactory.createRPCQueryClient({
      rpcEndpoint: 'https://symphony-rpc.kleomedes.network',
    })) as unknown as ReturnType<typeof symphonyRpcClient>,
};

export const CosmosRpcClientProvider = {
  provide: 'COSMOS_RPC_CLIENT',
  useFactory: async () =>
    await StargateClient.connect('https://symphony-rpc.kleomedes.network'),
};
