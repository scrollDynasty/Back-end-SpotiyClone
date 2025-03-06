import { PrismaClient } from '@prisma/client';

export default class Prisma {
  #client = new PrismaClient();

  constructor({ logger }) {
    this.logger = logger;
  }

  get client() {
    return this.#client;
  }

  async connect() {
    try {
      await this.#client.$connect();
      this.logger.info('[PrismaService] Successfully connected to the database');
    } catch (error) {
      this.logger.error(`[PrismaService] Error connecting to database: ${error.message}`);
    }
  }

  async disconnect() {
    await this.#client.$disconnect();
    this.logger.info('[PrismaService] Disconnected from the database');
  }
}
