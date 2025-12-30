import { TskvLogger } from './tskv.logger';

describe('TskvLogger format', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  it('formats simple message', () => {
    const result = logger.formatMessage('log', 'hello');

    expect(result).toBe('level=log\tmessage=hello');
  });

  it('formats message with params', () => {
    const result = logger.formatMessage('log', 'test', 1, 'abc');

    expect(result).toBe('level=log\tmessage=test\tparam0=1\tparam1=abc');
  });

  it('stringifies object params', () => {
    const result = logger.formatMessage('log', 'obj', { a: 1 });

    expect(result).toBe('level=log\tmessage=obj\tparam0={"a":1}');
  });

  it('escapes tabs and newlines', () => {
    const result = logger.formatMessage('log', 'a\tb\nc');

    expect(result).toBe('level=log\tmessage=a\\tb\\nc');
  });

  it('handles null and undefined', () => {
    const result = logger.formatMessage('log', null, undefined);

    expect(result).toBe('level=log\tmessage=null\tparam0=');
  });
});
