# @moralisweb3/auth

## 2.0.1

### Patch Changes

- Updated dependencies [[`30f69c3`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/30f69c3d6aa75641945e0af611d84756ae002edf)]:
  - @moralisweb3/evm-utils@2.0.1
  - @moralisweb3/core@2.0.1
  - @moralisweb3/api-utils@2.0.1

## 2.0.0

### Major Changes

- [`639053e`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/639053e543a93a9d173405463bc4162dcf5af072) Thanks [@ErnoW](https://github.com/ErnoW)! - # Release of v2.0

  This release contains many breaking changes as it moves from a Javascript SDK (for react-native, browser, and NodeJs) to a NodeJs-only SDK.

  Note: we will still support the v1.x version as a `moralis-v1` package (see https://github.com/MoralisWeb3/Moralis-JS-SDK-v1).

  These changes are to focus on Backend-only features, to facilitate self-hosted servers. Below you will find an overview of removed features and how to replace them:

  - Plugins: plugins in Moralis are mostly a wrapper around an API, where the API secret is managed on the moralis backend. When using the moralis sdk in NodeJs, you can safely implement your API secret, and implement any api (opensea/pinata etc.) directly without the need of utilities in the moralis sdk
  - Connecting to EVM: If you want to connect to EVM chains client-side, then this sdk is not suitable anymore. There are other open-source libraries that will have lots of utilities that can help you with this (web3js, ethers, wagmi, useDapp, web3-react)
  - Server interaction: interacting with the server can be done by installing the parse-server sdk (parse).

  ## Features

  The new sdk comes with the following featurs:

  - `Moralis.EvmApi`: A set of methods to interact and read from EVM chains
  - `Moralis.SolApi`: A set of methods to interact and read from Solana networks
  - `Moralis.Auth`: Utilities to implement web3 authentication in NodeJs

  ## Get started

  To get started, simply call

  ```
  Moralis.start({
    apiKey: 'YOUR_API_KEY'
  })
  ```

  Then you can access the apis via

  - `Moralis.EvmApi.account.getNFTs(options)`
  - `Moralis.SolApi.account.getNFTs(options)`
  - `Moralis.Auth.requestMessage(options)`

  ## More info

  For more info see the docs: http://docs.moralis.io
  Or reach out in our forums: https://forum.moralis.io

### Minor Changes

- [#560](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/560) [`d413073`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d4130736a22b5e28da767864d57be8d2abcf5981) Thanks [@ErnoW](https://github.com/ErnoW)! - Improve Erc20Value logic by:

  - geters for Erc20 for: `token.decimals`, `token.name`, `token.symbol`, `token.contractAddress`, `token.chain`, `token.logo`, `token.logoHash` and `token.thumbnail`,
  - adding an optional token reference for `Erc20Value`. This can be used by calling `Erc20Value.create(amount, { token })`
  - fixes and additions for output of `Erc20Value`:
    - `erc20Value.value` now returns the value in a decimal string `"123.567"`
    - `erc20Value.amount` returns the Bignumber value withtout taking decimals into account
    - `erc20Value.decimals` returns the decimals
    - `erc20Value.toNumber()` returns the value in a decimal number (or throws an error if the value is too big): `123.456`
    - `erc20Value.display()` returns the value in a readable string with the token symbol if available: `"123.456 LINK"` (or `"123.456"`)
  - `Moralis.EvmApi.getTokenBalances()` now returns an `Erc20Value` object with associated token information.

* [#510](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/510) [`7f0fc3f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/7f0fc3f21e60494e4bed2798ca931ce10cb45146) Thanks [@ErnoW](https://github.com/ErnoW)! - Add Moralis.Auth package to handle authentication via the Moralis Authentication Api. And add a demo project for parse-server

- [#522](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/522) [`b26d56b`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/b26d56b3ef30b50a0dd5292fd5e30ba9b992a149) Thanks [@ErnoW](https://github.com/ErnoW)! - Update endpoints for evm Authentication in Moralis.Auth to reflect api changes

### Patch Changes

- [#562](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/562) [`4683492`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/4683492c4152779d8175e37075f8d1168c990188) Thanks [@ErnoW](https://github.com/ErnoW)! - Update type definition and resolvers after changes in the Evm Api

* [#521](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/521) [`61b8759`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/61b8759fcc80185a51758606ce2c4c5e9868a22d) Thanks [@ErnoW](https://github.com/ErnoW)! - Moved all Evm logic to @moralisweb3/evm-utils

- [#539](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/539) [`70e6227`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/70e62273da34dc0227d47842d06247ed771ba085) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Multi-tenancy support.

* [#535](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/535) [`279507c`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/279507c33c3ae172aa0257663cfcfdedd790f829) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Replaced BigNumber from @ethersproject by own implementation.

* Updated dependencies [[`6eae2a9`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/6eae2a9f6c6266f6e7dfe327a4343d1ada5e8752), [`0c47bae`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/0c47baed6a4ef1b7d17f27888c458806cb9affce), [`ed75131`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/ed75131d7b98bb11789a5e51c113fa222222ad74), [`d413073`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d4130736a22b5e28da767864d57be8d2abcf5981), [`639053e`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/639053e543a93a9d173405463bc4162dcf5af072), [`30b7f4b`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/30b7f4b9dd81a67ee6f6ceb006a0b7eec0cb825d), [`4683492`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/4683492c4152779d8175e37075f8d1168c990188), [`7f0fc3f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/7f0fc3f21e60494e4bed2798ca931ce10cb45146), [`61b8759`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/61b8759fcc80185a51758606ce2c4c5e9868a22d), [`81effa1`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/81effa1a4f9afc4a7e8a3c39eaa4ff2d9103b60a), [`fa082b6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/fa082b613fd3b317072ee66e8ca1361fd51f34f4), [`d10214e`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d10214e86bb3611ede818e9e990554b05ac827d1), [`d525351`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d525351da98b8b1dec6a7559c953c5b921d7b913), [`36dd9a9`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/36dd9a99e4be82350ae8df947d41d06f889b1421), [`9e67989`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/9e67989c33f965bccb5dede53785a55fb1933316), [`fa082b6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/fa082b613fd3b317072ee66e8ca1361fd51f34f4), [`01b7480`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/01b74801dfcbf64be054c16d88fd45195ea1b725), [`d450294`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d450294f52e23aacd590c40fd4e332bda22f4438), [`70e6227`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/70e62273da34dc0227d47842d06247ed771ba085), [`51e0446`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/51e04465b803d89bdc3bc72d749e1152139a8534), [`279507c`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/279507c33c3ae172aa0257663cfcfdedd790f829)]:
  - @moralisweb3/api-utils@2.0.0
  - @moralisweb3/core@2.0.0
  - @moralisweb3/evm-utils@2.0.0

## 2.0.0-beta.11

### Patch Changes

- Updated dependencies [[`fa082b6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/fa082b613fd3b317072ee66e8ca1361fd51f34f4), [`fa082b6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/fa082b613fd3b317072ee66e8ca1361fd51f34f4)]:
  - @moralisweb3/evm-utils@2.0.0-beta.11
  - @moralisweb3/core@2.0.0-beta.11
  - @moralisweb3/api-utils@2.0.0-beta.11

## 2.0.0-beta.10

### Patch Changes

- Updated dependencies [[`51e0446`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/51e04465b803d89bdc3bc72d749e1152139a8534)]:
  - @moralisweb3/core@2.0.0-beta.10
  - @moralisweb3/evm-utils@2.0.0-beta.10
  - @moralisweb3/api-utils@2.0.0-beta.10

## 2.0.0-beta.9

### Patch Changes

- [#562](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/562) [`4683492`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/4683492c4152779d8175e37075f8d1168c990188) Thanks [@ErnoW](https://github.com/ErnoW)! - Update type definition and resolvers after changes in the Evm Api

- Updated dependencies [[`4683492`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/4683492c4152779d8175e37075f8d1168c990188)]:
  - @moralisweb3/api-utils@2.0.0-beta.9
  - @moralisweb3/core@2.0.0-beta.9
  - @moralisweb3/evm-utils@2.0.0-beta.9

## 2.0.0-beta.8

### Minor Changes

- [#560](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/560) [`d413073`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d4130736a22b5e28da767864d57be8d2abcf5981) Thanks [@ErnoW](https://github.com/ErnoW)! - Improve Erc20Value logic by:

  - geters for Erc20 for: `token.decimals`, `token.name`, `token.symbol`, `token.contractAddress`, `token.chain`, `token.logo`, `token.logoHash` and `token.thumbnail`,
  - adding an optional token reference for `Erc20Value`. This can be used by calling `Erc20Value.create(amount, { token })`
  - fixes and additions for output of `Erc20Value`:
    - `erc20Value.value` now returns the value in a decimal string `"123.567"`
    - `erc20Value.amount` returns the Bignumber value withtout taking decimals into account
    - `erc20Value.decimals` returns the decimals
    - `erc20Value.toNumber()` returns the value in a decimal number (or throws an error if the value is too big): `123.456`
    - `erc20Value.display()` returns the value in a readable string with the token symbol if available: `"123.456 LINK"` (or `"123.456"`)
  - `Moralis.EvmApi.getTokenBalances()` now returns an `Erc20Value` object with associated token information.

### Patch Changes

- Updated dependencies [[`d413073`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d4130736a22b5e28da767864d57be8d2abcf5981)]:
  - @moralisweb3/api-utils@2.0.0-beta.8
  - @moralisweb3/core@2.0.0-beta.8
  - @moralisweb3/evm-utils@2.0.0-beta.8

## 2.0.0-beta.7

### Patch Changes

- Updated dependencies [[`0c47bae`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/0c47baed6a4ef1b7d17f27888c458806cb9affce)]:
  - @moralisweb3/api-utils@2.0.0-beta.7
  - @moralisweb3/core@2.0.0-beta.7
  - @moralisweb3/evm-utils@2.0.0-beta.7

## 2.0.0-beta.6

### Minor Changes

- [#555](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/555) [`3f511ed`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/3f511edbf70f2f167c5b53c6d95e2cb19d8884d0) Thanks [@ErnoW](https://github.com/ErnoW)! - Include all files from `/lib` in npm builds. This fixes a bug where only the index.js file and .d.ts files were included in builds.

### Patch Changes

- Updated dependencies [[`36dd9a9`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/36dd9a99e4be82350ae8df947d41d06f889b1421), [`3f511ed`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/3f511edbf70f2f167c5b53c6d95e2cb19d8884d0)]:
  - @moralisweb3/core@2.0.0-beta.6
  - @moralisweb3/api-utils@2.0.0-beta.6
  - @moralisweb3/evm-utils@2.0.0-beta.6

## 2.0.0-beta.5

### Major Changes

- [`2948339`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/29483391b453a9e9b9d26c7d973d7aa5b3f96d07) Thanks [@ErnoW](https://github.com/ErnoW)! - Beta release

### Patch Changes

- Updated dependencies [[`2948339`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/29483391b453a9e9b9d26c7d973d7aa5b3f96d07)]:
  - @moralisweb3/api-utils@2.0.0-beta.5
  - @moralisweb3/core@2.0.0-beta.5
  - @moralisweb3/evm-utils@2.0.0-beta.5

## 2.0.0-alpha.4

### Patch Changes

- [#552](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/552) [`81effa1`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/81effa1a4f9afc4a7e8a3c39eaa4ff2d9103b60a) Thanks [@ErnoW](https://github.com/ErnoW)! - Fix Typescript reference between the packages in production builds

* [#539](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/539) [`70e6227`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/70e62273da34dc0227d47842d06247ed771ba085) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Multi-tenancy support.

* Updated dependencies [[`81effa1`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/81effa1a4f9afc4a7e8a3c39eaa4ff2d9103b60a), [`81effa1`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/81effa1a4f9afc4a7e8a3c39eaa4ff2d9103b60a), [`70e6227`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/70e62273da34dc0227d47842d06247ed771ba085)]:
  - @moralisweb3/api-utils@2.0.0-alpha.4
  - @moralisweb3/core@2.0.0-alpha.4
  - @moralisweb3/evm-utils@2.0.0-alpha.4

## 2.0.0-alpha.3

### Minor Changes

- [#510](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/510) [`7f0fc3f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/7f0fc3f21e60494e4bed2798ca931ce10cb45146) Thanks [@ErnoW](https://github.com/ErnoW)! - Add Moralis.Auth package to handle authentication via the Moralis Authentication Api. And add a demo project for parse-server

* [#522](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/522) [`b26d56b`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/b26d56b3ef30b50a0dd5292fd5e30ba9b992a149) Thanks [@ErnoW](https://github.com/ErnoW)! - Update endpoints for evm Authentication in Moralis.Auth to reflect api changes

### Patch Changes

- [#521](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/521) [`61b8759`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/61b8759fcc80185a51758606ce2c4c5e9868a22d) Thanks [@ErnoW](https://github.com/ErnoW)! - Moved all Evm logic to @moralisweb3/evm-utils

* [#535](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/535) [`279507c`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/279507c33c3ae172aa0257663cfcfdedd790f829) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Replaced BigNumber from @ethersproject by own implementation.

* Updated dependencies [[`6eae2a9`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/6eae2a9f6c6266f6e7dfe327a4343d1ada5e8752), [`ed75131`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/ed75131d7b98bb11789a5e51c113fa222222ad74), [`30b7f4b`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/30b7f4b9dd81a67ee6f6ceb006a0b7eec0cb825d), [`7f0fc3f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/7f0fc3f21e60494e4bed2798ca931ce10cb45146), [`61b8759`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/61b8759fcc80185a51758606ce2c4c5e9868a22d), [`d10214e`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d10214e86bb3611ede818e9e990554b05ac827d1), [`01b7480`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/01b74801dfcbf64be054c16d88fd45195ea1b725), [`d450294`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d450294f52e23aacd590c40fd4e332bda22f4438), [`279507c`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/279507c33c3ae172aa0257663cfcfdedd790f829)]:
  - @moralisweb3/api-utils@2.0.0-alpha.3
  - @moralisweb3/core@2.0.0-alpha.3
  - @moralisweb3/evm-utils@2.0.0-alpha.3
