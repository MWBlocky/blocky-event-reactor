import SafeApiKit from '@safe-global/api-kit';

export class ApiKitService {
  getApiKit(chainId: bigint) {
    return new SafeApiKit({
      chainId
    })
  }
}