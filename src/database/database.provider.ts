import { Pool } from 'pg';
import * as process from 'node:process';
import { Scope } from '@nestjs/common';

export const PG_CONNECTION = 'PG_CONNECTION';
export const PG_CLIENT = 'PG_CLIENT';

export const DatabaseConnectionProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT),
  }),
};

export const DatabaseClientProvider = {
  provide: PG_CLIENT,
  useFactory: async (conn: Pool) => await conn.connect(),
  scope: Scope.TRANSIENT,
  inject: [PG_CONNECTION],
};
