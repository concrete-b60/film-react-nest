import { Provider } from '@nestjs/common';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';
import { IAppConfig } from './app.config.provider';

export const loggerProvider: Provider = {
  provide: 'APP_LOGGER',
  inject: ['CONFIG'],
  useFactory: (config: IAppConfig) => {
    return config.logger.type === 'tskv' ? new TskvLogger() : new JsonLogger();
  },
};
