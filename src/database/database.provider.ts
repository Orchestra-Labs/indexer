import { Pool } from 'pg';

export const PG_CONNECTION = 'PG_CONNECTION';
export const PG_CLIENT = 'PG_CLIENT';

export const DatabaseConnectionProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: 'indexer',
    host: 'localhost',
    database: 'symphony',
    password: 'password',
    port: 5432,
  }),
};

export const DatabaseClientProvider = {
  provide: PG_CLIENT,
  useFactory: async (conn: Pool) => await conn.connect(),
  inject: [PG_CONNECTION],
};
