import { config } from 'dotenv';

export default class Config {
  #config;

  constructor({ logger }) {
    const { error, parsed } = config();
    if (error) {
      logger.error('[ConfigService] Failed to read the .env file');
    } else if (parsed) {
      logger.info('[ConfigService] The .env configuration was successfully loaded');
      this.#config = parsed;
    }
  }

  get(key) {
    const result = this.#config[key];
    if (!result) {
      throw new Error(`no such key "${key}"`);
    }
    return result;
  }
}
