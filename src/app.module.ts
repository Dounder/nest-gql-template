import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HttpStatus, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { HealthModule } from './modules';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      useGlobalPrefix: true,
      path: '/v1/gql',
      formatError: (error) => {
        const { message, extensions } = error;
        const {
          status = HttpStatus.BAD_REQUEST,
          timestamp = new Date().toISOString(),
          errors = [],
        } = extensions || {};
        return { message, errors, status, timestamp };
      },
    }),
    HealthModule,
  ],
})
export class AppModule {}
