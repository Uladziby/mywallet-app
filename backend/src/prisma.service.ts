import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });
    super({ adapter /* log: [{ level: 'query', emit: 'event' }] */ });
  }

  async onModuleInit() {
    await this.$connect();

    this.$on('query', (e) => {
      this.logger.debug(e);
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
