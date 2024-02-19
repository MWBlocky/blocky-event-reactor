import fs from 'fs';
import path from 'path';
import { Injectable, Logger } from '@nestjs/common';
import { StorageConfigService } from '../common/config/storage-config.service';
import { StorageData } from './storage.interface';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  storagePath: string;
  constructor(private storageConfigService: StorageConfigService) {
    this.storagePath = this.storageConfigService.storage.storageJsonFile;
  }
  async readStorage() {
    try {
      const dataPath: string = path.resolve(__dirname, this.storagePath);
      return JSON.parse(fs.readFileSync(dataPath, { encoding: 'utf8' }));
    } catch (err) {
      this.logger.error(`Error reading storage.json file: ${err}`);
    }
  }
  async saveStorage(data: StorageData) {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      const dataPath: string = path.resolve(__dirname, this.storagePath);
      fs.writeFileSync(dataPath, jsonData, 'utf8');
    } catch (err) {
      this.logger.error(`Error writing to storage.json file: ${err}`);
    }
  }
}
