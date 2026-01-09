export const configProvider = {
  provide: 'CONFIG',
  useValue: <IAppConfig>{
    database: {
      driver: process.env.DATABASE_DRIVER || 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      name: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    },
    logger: {
      type: process.env.LOGGER_TYPE || 'json',
    },
  },
};

export interface IAppConfig {
  database: IAppConfigDatabase;
  logger: IAppConfigLogger;
}

export interface IAppConfigDatabase {
  driver: string;
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
}

export interface IAppConfigLogger {
  type: 'json' | 'tskv';
}
