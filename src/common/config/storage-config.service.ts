import { Injectable } from '@nestjs/common';
import { EnvironmentConfigService } from './environment-config.service';

@Injectable()
export class StorageConfigService {
  constructor(
    private environmentConfigService: EnvironmentConfigService
  ) {
  }
  get storage(): Storage {
    const storageJsonFile = this.environmentConfigService.storageJsonFile;
    return {
      storageJsonFile: storageJsonFile,
    }
  }
}
interface Storage {
  storageJsonFile: string;
}
