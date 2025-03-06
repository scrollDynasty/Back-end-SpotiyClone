import jwt from 'jsonwebtoken';

export default class JWT {
  #secretToken;

  constructor({ config }) {
    this.#secretToken = config.get('JWT_SECRET');
  }

  decode(token) {
    return jwt.decode(token);
  }

  sign(data, ttl = 3600) {
    return jwt.sign({ ...data }, this.#secretToken, { expiresIn: ttl });
  }

  verify(token) {
    return jwt.verify(token, this.#secretToken);
  }
}
