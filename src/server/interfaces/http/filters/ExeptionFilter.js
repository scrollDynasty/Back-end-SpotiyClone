export default class ExeptionFilter {
  constructor({ logger }) {
    this.logger = logger;
  }

  async catch(error, { ip, url }, reply) {
    const { statusCode = 500, message, stack } = error;
    this.logger.error(`${ip} [${url}] ${statusCode}: ${message} ${stack}`);
    reply.status(statusCode).send({ statusCode, message, result: {}, timestamp: Date.now() });
  }
}
