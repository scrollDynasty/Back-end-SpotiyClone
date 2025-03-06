import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import multipart from '@fastify/multipart';
import { swaggerOptions } from './constants/swagger.js';

export default class App {
  constructor(opts) {
    this.app = fastify({
      trustProxy: true,
      loggerInstance: opts.logger.logger,
      ajv: { plugins: [multipart.ajvFilePlugin] },
    });
    this.config = {
      port: +opts.config.get('PORT'),
      host: opts.config.get('HOST'),
      nodeEnv: opts.config.get('NODE_ENV'),
    };
    this.routes = {
      auth: opts.authController,
    };
    this.filters = {
      notFound: opts.notFoundFilter,
      exeption: opts.exeptionFilter,
    };
    this.prisma = opts.prisma;
  }

  async #useHooks() {
    this.app.register(cors, { credentials: true, origin: '*' });
    this.app.register(helmet, { global: true });
    this.app.register(multipart, {
      attachFieldsToBody: true,
      limits: { fileSize: 100000000 },
    });

    if (this.config.nodeEnv !== 'PRODUCTION') {
      this.app.register(swagger, swaggerOptions);
      this.app.register(swaggerUI, {
        prefix: '/docs',
        staticCSP: true,
      });
    }

    for (const key in this.plugins) {
      this.app.register(this.plugins[key].execute());
    }
  }

  #useRoutes() {
    for (const key in this.routes) {
      this.app.register(this.routes[key]._registerRoutes.bind(this.routes[key]), {
        prefix: key,
      });
    }
  }

  #useFilters() {
    this.app.setNotFoundHandler({}, this.filters.notFound.catch.bind(this.filters.notFound));
    this.app.setErrorHandler(this.filters.exeption.catch.bind(this.filters.exeption));
  }

  async init() {
    await this.prisma.connect();
    await this.#useHooks();
    this.#useRoutes();
    this.#useFilters();
    await this.app.listen({ port: this.config.port, host: this.config.host });
  }

  async close() {
    await this.app.close();
  }

  async ready() {
    await this.app.ready();
  }
}
