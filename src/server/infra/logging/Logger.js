import { pino } from 'pino';
import cluster from 'node:cluster';

export default class Logger {
  #clusterId = cluster.worker?.id;
  #logger = pino();

  constructor() {
    this.#logger = pino();
  }

  get logger() {
    return this.#logger;
  }

  info(message) {
    this.#logger.info(this.#createMessage(message));
  }

  error(message) {
    this.#logger.error(this.#createMessage(message));
  }

  warn(message) {
    this.#logger.warn(this.#createMessage(message));
  }

  #createMessage(message) {
    return this.#clusterId ? `[Cluster ${this.#clusterId}] ${message}` : message;
  }
}
