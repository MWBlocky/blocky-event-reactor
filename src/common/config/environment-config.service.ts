import Joi from 'joi';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvironmentConfigService {
    constructor(private configService: ConfigService) {}
    get host(): string {
        return this.configService.get<string>('HOST', 'localhost');
    }
    get port(): string {
        return this.configService.get<string>('PORT', '3000');
    }
}

export const envValidator = Joi.object({
    HOST: Joi.string().default('localhost'),
    PORT: Joi.string().default(5010),
});
