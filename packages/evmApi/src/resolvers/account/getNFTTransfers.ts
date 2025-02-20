import { Camelize, toCamelCase } from '@moralisweb3/core';
import { EvmChainish, EvmAddressish, EvmAddress, EvmNative, EvmNftTransfer } from '@moralisweb3/evm-utils';
import { operations } from '../../generated/types';
import { BASE_URL } from '../../EvmApi';
import { createPaginatedEndpointFactory, createPaginatedEndpoint, PaginatedParams } from '@moralisweb3/api-utils';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getNFTTransfers';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>>, PaginatedParams {
  chain?: EvmChainish;
  address: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getNFTTransfers = createPaginatedEndpointFactory((core) =>
  createPaginatedEndpoint({
    name: 'getNFTTransfers',
    urlParams: ['address'],
    getUrl: (params: Params) => `${BASE_URL}/${params.address}/nft/transfers`,
    apiToResult: (data: ApiResult, params: Params) =>
      (data.result ?? []).map((transfer) =>
        EvmNftTransfer.create({
          ...toCamelCase(transfer),
          chain: EvmChainResolver.resolve(params.chain, core),
          tokenAddress: EvmAddress.create(transfer.to_address),
          toAddress: EvmAddress.create(transfer.to_address),
          operator: transfer.operator ? EvmAddress.create(transfer.operator, core) : null,
          fromAddress: transfer.from_address ? EvmAddress.create(transfer.from_address, core) : null,
          value: transfer.value ? EvmNative.create(transfer.value) : null,
          blockTimestamp: new Date(transfer.block_timestamp),
        }),
      ),
    resultToJson: (data) => data.map((transaction) => transaction.toJSON()),
    parseParams: (params: Params): ApiParams => ({
      ...params,
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      address: EvmAddress.create(params.address, core).lowercase,
    }),
  }),
);
