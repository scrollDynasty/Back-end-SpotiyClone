import os from 'os';
import cluster from 'cluster';

export default class Cluster {
  constructor({ app, logger, config }) {
    this.app = app;
    this.logger = logger;
    this.nodeEnv = config.get('NODE_ENV');
  }

  async init() {
    if (this.nodeEnv !== 'PRODUCTION') {
      return await this.worker();
    }
    if (cluster.isPrimary) {
      this.master();
    } else {
      await this.worker();
    }
  }

  master() {
    for (let i = 0; i < os.cpus().length; i++) {
      cluster.fork();
    }
    cluster.on('online', ({ process }) => {
      this.logger.info(`Worker is listening ${process.pid}`);
    });
    cluster.on('exit', ({ process }) => {
      this.logger.info(`Worker died ${process.pid}`);
      cluster.fork();
    });
  }

  async worker() {
    await this.app.init();
    await this.app.ready();
  }
}
