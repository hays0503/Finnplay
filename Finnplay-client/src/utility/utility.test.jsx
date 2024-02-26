import { describe, expect, it } from 'vitest';
import sortfunc from './sortfunc'
import searchBySubstring from './searchBySubstring'

describe('sortfunc', () => {
  it('should return -1 when a is less than b', () => {
    /**
     * The result of the sortfunc function.
     * @type {number}
     */
    const result = sortfunc(1, 2);
    expect(result).toBe(-1);
  });

  it('should return 1 when a is greater than b', () => {
    const result = sortfunc(2, 1);
    expect(result).toBe(1);
  });

  it('should return 0 when a is equal to b', () => {
    const result = sortfunc(1, 1);
    expect(result).toBe(0);
  });
});

describe('searchBySubstring', () => {
  it('should return an empty array when the list is empty', () => {
    const list = [];
    const substring = 'test';
    const result = searchBySubstring(list, substring);
    expect(result).toEqual([]);
  });

  it('should return an empty array when no item matches the substring', () => {
    const list = [
      { name: 'apple' },
      { name: 'banana' },
      { name: 'orange' },
    ];
    const substring = 'grape';
    const result = searchBySubstring(list, substring);
    expect(result).toEqual([]);
  });

  it('should return an array with matching items when there are matches', () => {
    /**
     * Represents a list of items.
     * @type {Array<{name: string}>}
     */
    const list = [
      { name: 'apple' },
      { name: 'banana' },
      { name: 'orange' },
    ];
    const substring = 'an';
    const result = searchBySubstring(list, substring);
    expect(result).toEqual([{ name: 'banana' },{ name: 'orange' }]);
  });

  it('should be case-insensitive', () => {
    const list = [
      { name: 'apple' },
      { name: 'banana' },
      { name: 'orange' },
    ];
    const substring = 'A';
    const result = searchBySubstring(list, substring);
    expect(result.sort()).toEqual(list.sort());
  });
});