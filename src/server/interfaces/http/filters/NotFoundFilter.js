export default class NotFoundFilter {
  constructor({ logger }) {
    this.logger = logger;
  }

  catch({ ip, url, method }, reply) {
    this.logger.error(`${ip} [${url}] 404: not found`);
    reply.status(404).send({
      statusCode: 404,
      message: `route ${method}:${url} not found`,
      result: {},
      timestamp: Date.now(),
    });
  }
}
