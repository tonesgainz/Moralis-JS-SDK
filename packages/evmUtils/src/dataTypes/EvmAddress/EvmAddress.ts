import {
  MoralisCore,
  MoralisCoreProvider,
  EvmAddressFormat,
  Config,
  CoreErrorCode,
  MoralisCoreError,
  MoralisData,
} from '@moralisweb3/core';
import { getAddress, isAddress } from '@ethersproject/address';
import { EvmUtilsConfig } from '../../config/EvmUtilsConfig';

export type InputEvmAddress = string;
export type EvmAddressish = EvmAddress | InputEvmAddress;

/**
 * The EvmAddress class is a MoralisData that references to a EVM address
 * A new instance can be created via `EvmAddress.create(address)`, where the provided chain can be a valid address (in lowercase or checksum)
 */
export class EvmAddress implements MoralisData {
  public static create(address: EvmAddressish, core?: MoralisCore) {
    if (address instanceof EvmAddress) {
      return address;
    }
    const finalCore = core || MoralisCoreProvider.getDefault();
    return new EvmAddress(address, finalCore.config);
  }

  // Checksum address
  private _value: string;

  public static get ZERO_ADDRESS() {
    return EvmAddress.create('0x0000000000000000000000000000000000000000');
  }

  public constructor(address: InputEvmAddress, private readonly config: Config) {
    this._value = EvmAddress.parse(address);
  }

  /**
   * Parse the input to a value that is compatible with the internal _value
   */
  static parse(address: InputEvmAddress) {
    if (!isAddress(address)) {
      throw new MoralisCoreError({
        code: CoreErrorCode.INVALID_ARGUMENT,
        message: 'Invalid address provided',
      });
    }
    return getAddress(address);
  }

  get checksum() {
    return this._value;
  }

  get lowercase() {
    return this._value.toLowerCase();
  }

  static equals(addressA: EvmAddressish, addressB: EvmAddressish) {
    return EvmAddress.create(addressA)._value === EvmAddress.create(addressB)._value;
  }

  equals(address: EvmAddressish) {
    return EvmAddress.equals(this, address);
  }

  format(_formatStyle?: EvmAddressFormat) {
    const formatStyle = _formatStyle ?? this.config.get(EvmUtilsConfig.formatEvmAddress);

    if (formatStyle === 'checksum') {
      return this.checksum;
    }

    if (formatStyle === 'lowercase') {
      return this.lowercase;
    }

    throw new MoralisCoreError({
      code: CoreErrorCode.INVALID_ARGUMENT,
      message: 'Cannot format address, invalid config.formatAddress',
    });
  }
}
