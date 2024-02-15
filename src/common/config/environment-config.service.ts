import Joi from 'joi';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvironmentConfigService {
    constructor(private configService: ConfigService) {}
    get port(): string {
        return this.configService.get<string>('PORT', '3000');
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
    get contractLastCheckedBlock(): string {
        return this.configService.get<string>('CONTRACT_LAST_CHECKED_BLOCK', '');
    }
}

export const envValidator = Joi.object({
    PORT: Joi.string().default(3000),
    RPC_URL: Joi.string().default('http://localhost:8545'),
    CHAIN_ID: Joi.string().default(1),
    CONTRACT_ADDRESS: Joi.string().default(''),
    CONTRACT_ABI_ROOT: Joi.any().default(''),
    CONTRACT_LAST_CHECKED_BLOCK: Joi.string().default(''),
});
