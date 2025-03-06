export class ConflictError extends Error {
  constructor(message, context = {}) {
    super(message);
    this.statusCode = 409;
    this.context = context;
  }
}
