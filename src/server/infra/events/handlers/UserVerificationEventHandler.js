import Queue from 'bull';

export default class UserVerificationEventHandler extends Queue {
  constructor({ logger, config }) {
    super('userVerificationEventHandler', config.get('REDIS_URL'));
    this.logger = logger;
    this.process(this.execute);
  }

  async execute({ data }, done) {
    this.logger.info(`${data.email} some send`);
    done();
  }
}
