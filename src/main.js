import { createContainer, asClass, Lifetime } from 'awilix';

async function bootstrap() {
  const container = createContainer();
  await container.loadModules(
    [
      'src/server/Cluster.js',
      'src/server/app/**/!(*.spec).js',
      'src/common/**/!(*.spec).js',
      ['src/server/infra/**/!(*.spec).js', Lifetime.SINGLETON],
      ['src/server/interfaces/**/!(*.spec).js', Lifetime.SINGLETON],
    ],
    {
      formatName: 'camelCase',
      resolverOptions: {
        lifetime: Lifetime.TRANSIENT,
        register: asClass,
      },
      esModules: true,
    },
  );

  const cluster = container.resolve('cluster');
  await cluster.init();
}

export const boot = bootstrap();
