export class Controller {
  #routes = [];

  constructor(logger) {
    this.logger = logger;
  }

  addRoutes(routes) {
    this.#routes.push(...routes);
  }

  _registerRoutes(instance, opts, done) {
    for (const { method, url, config, schema, preHandler, handler } of this.#routes) {
      const bindPreHandler = preHandler?.map((el) => el.execute.bind(el));
      const { prefix } = instance.route({
        method,
        url,
        config,
        schema,
        preHandler: bindPreHandler,
        handler: async (request, reply) => {
          const result = await handler.call(this, request, reply);
          if (result !== undefined) {
            return this.#ok(result);
          }
        },
      });
      this.logger.info(`[${method}] ${prefix}${url}`);
    }
    done();
  }

  #ok(result) {
    return {
      statusCode: 200,
      message: '',
      result,
      timestamp: Date.now(),
    };
  }
}
