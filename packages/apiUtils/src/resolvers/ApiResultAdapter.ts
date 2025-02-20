import { ApiErrorCode, MoralisApiError, MoralisData, MoralisDataObject } from '@moralisweb3/core';

// TODO: make part of core config? The challenge in that case is to make sure it is Typed correctly
export enum ApiFormatType {
  // Return the data directly, as is provided by the API
  RAW = 'raw',
  // Return the formatted result of all moralis DataTypes
  JSON = 'JSON',
  // Return class with moralis DataTypes and format functions
  NORMAL = 'normal',
}

export type InputApiResult<Value extends object = object> =
  | {
      [key in keyof Value]: string | boolean | number | null | undefined | InputApiResult;
    }
  | InputApiResult[];

export type AdaptedApiResult<Value extends object = object> =
  | {
      [key in keyof Value]: string | boolean | number | null | MoralisData | MoralisDataObject | AdaptedApiResult;
    }
  | AdaptedApiResult[];

export type JSONApiResult<Value extends object = object> =
  | {
      [key in keyof Value]: string | boolean | number | null | JSONApiResult;
    }
  | JSONApiResult[];

export class ApiResultAdapter<Data, AdaptedData, JSONData, Params> {
  protected _data: Data;
  protected _adapter: (data: Data, params: Params) => AdaptedData;
  protected _jsonAdapter: (data: AdaptedData) => JSONData;
  protected _params: Params;

  constructor(
    data: Data,
    adapter: (data: Data, params: Params) => AdaptedData,
    jsonAdapter: (data: AdaptedData) => JSONData,
    params: Params,
  ) {
    this._data = data;
    this._adapter = adapter;
    this._jsonAdapter = jsonAdapter;
    this._params = params;
  }

  get raw() {
    return this._data;
  }

  get result(): AdaptedData {
    return this._adapter(this._data, this._params);
  }

  // TODO:  Cast all to primitive types
  toJSON() {
    return this._jsonAdapter(this.result);
  }

  format(formatType: ApiFormatType.RAW): Data;
  // WIP: add type
  format(formatType: ApiFormatType.JSON): unknown;
  format(formatType: ApiFormatType.NORMAL): AdaptedData;
  format(formatType: ApiFormatType) {
    if (formatType === ApiFormatType.RAW) {
      return this.raw;
    }

    if (formatType === ApiFormatType.JSON) {
      return this.toJSON();
    }

    if (formatType === ApiFormatType.NORMAL) {
      return this.result;
    }

    throw new MoralisApiError({
      code: ApiErrorCode.GENERIC_API_ERROR,
      message: 'provided formatType not supported',
    });
  }
}
