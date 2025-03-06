import { Controller } from '#common/interfaces/Controller.js';
import { authLoginSchema, authRegisterSchema } from '../schemes/AuthSchemes.js';

export default class AuthController extends Controller {
  constructor({ logger, authFactory }) {
    super(logger);
    this.addRoutes([
      {
        method: 'POST',
        url: '/register',
        schema: authRegisterSchema,
        handler: this.auth,
      },
      {
        method: 'POST',
        url: '/login',
        schema: authLoginSchema,
        handler: this.login,
      },
    ]);
    this.authFactory = authFactory;
  }

  async auth({ body }) {
    return this.authFactory.getCommand('registration').execute(body);
  }

  async login({ body }) {
    return this.authFactory.getCommand('login').execute(body);
  }
}
