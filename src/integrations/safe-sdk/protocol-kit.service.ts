import { SafeFactoryService } from './safe-factory.service';

export class ProtocolKitService {
  constructor(private safeFactoryService: SafeFactoryService) {}

  // async getProtocolKit(privateKey: string, safeAccountConfig: any) {
  //   const safeFactory = await this.safeFactoryService.getSafeFactory(privateKey)
  //   return await safeFactory.deploySafe({ safeAccountConfig })
  // }
}