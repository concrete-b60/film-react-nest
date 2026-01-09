import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  formatMessage(level: string, message: any, ...optionalParams: any[]) {
    const parts: string[] = [];

    parts.push(`level=${level}`);
    parts.push(`message=${this.formatValue(message)}`);

    optionalParams.forEach((param, index) => {
      parts.push(`param${index}=${this.formatValue(param)}`);
    });

    return parts.join('\t');
  }

  formatValue(value: any): string {
    if (value === undefined) return '';
    if (value === null) return 'null';

    if (typeof value === 'object') {
      return JSON.stringify(value).replace(/\t/g, '\\t').replace(/\n/g, '\\n');
    }

    return String(value).replace(/\t/g, '\\t').replace(/\n/g, '\\n');
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }

  fatal(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('fatal', message, optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('error', message, optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('warn', message, optionalParams));
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('debug', message, optionalParams));
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('verbose', message, optionalParams));
  }
}
