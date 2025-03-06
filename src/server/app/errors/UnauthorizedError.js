export class UnauthorizedError extends Error {
  constructor(context = {}) {
    super('invalid email or password');
    this.statusCode = 401;
    this.context = context;
  }
}
