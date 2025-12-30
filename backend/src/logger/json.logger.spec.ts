import { JsonLogger } from './json.logger';

describe('JsonLogger formatMessage', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  it('formats simple message', () => {
    const result = logger.formatMessage('log', 'hello');

    expect(result).toBe(
      JSON.stringify({
        level: 'log',
        message: 'hello',
        optionalParams: [],
      }),
    );
  });

  it('formats message with params', () => {
    const result = logger.formatMessage('log', 'test', 1, 'abc');

    expect(result).toBe(
      JSON.stringify({
        level: 'log',
        message: 'test',
        optionalParams: [1, 'abc'],
      }),
    );
  });

  it('formats object param', () => {
    const result = logger.formatMessage('log', 'obj', { a: 1 });

    expect(result).toBe(
      JSON.stringify({
        level: 'log',
        message: 'obj',
        optionalParams: [{ a: 1 }],
      }),
    );
  });

  it('handles null and undefined', () => {
    const result = logger.formatMessage('log', null, undefined);

    expect(result).toBe(
      JSON.stringify({
        level: 'log',
        message: null,
        optionalParams: [undefined],
      }),
    );
  });
});
