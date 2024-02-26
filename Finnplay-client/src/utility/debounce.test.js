const debounce = require('./debounce');

test('debounce function should delay the execution of the provided function', () => {
  jest.useFakeTimers();

  const mockFn = jest.fn();
  const debouncedFn = debounce(mockFn, 1000);

  debouncedFn();

  expect(mockFn).not.toBeCalled();

  jest.advanceTimersByTime(500);

  debouncedFn();

  expect(mockFn).not.toBeCalled();

  jest.advanceTimersByTime(500);

  expect(mockFn).toBeCalled();
  expect(mockFn).toHaveBeenCalledTimes(1);
});

test('debounce function should execute the provided function with the latest arguments', () => {
  jest.useFakeTimers();

  const mockFn = jest.fn();
  const debouncedFn = debounce(mockFn, 1000);

  debouncedFn('argument1');
  debouncedFn('argument2');

  jest.advanceTimersByTime(1000);

  expect(mockFn).toBeCalled();
  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(mockFn).toHaveBeenCalledWith('argument2');
});