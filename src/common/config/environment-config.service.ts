import Joi from 'joi';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvironmentConfigService {
    constructor(private configService: ConfigService) {}
    get port(): string {
        return this.configService.get<string>('PORT', '3000');
    }
    get botPrivateKey(): string {
        return this.configService.get<string>('BOT_PRIVATE_KEY', '');
    }
    get rpcUrl(): string {
        return this.configService.get<string>('RPC_URL', 'http://localhost:8545');
    }
    get chainId(): string {
        return this.configService.get<string>('CHAIN_ID', '1');
    }
    get contractAddress(): string {
        return this.configService.get<string>('CONTRACT_ADDRESS', '');
    }
    get contractAbi(): any {
        return this.configService.get<any>('CONTRACT_ABI_ROOT', '');
    }
    get safeAddress(): string {
        return this.configService.get<string>('SAFE_ADDRESS', '');
    }
    get storageJsonFile(): string {
        return this.configService.get<string>('STORAGE_JSON_FILE_ROOT', '');
    }
}

export const envValidator = Joi.object({
    PORT: Joi.string().default(3000),
    BOT_PRIVATE_KEY: Joi.string().default(''),
    RPC_URL: Joi.string().default('http://localhost:8545'),
    CHAIN_ID: Joi.string().default(1),
    CONTRACT_ADDRESS: Joi.string().default(''),
    CONTRACT_ABI_ROOT: Joi.any().default(''),
    SAFE_ADDRESS: Joi.string().default(''),
    STORAGE_JSON_FILE_ROOT: Joi.string().default(''),
});
