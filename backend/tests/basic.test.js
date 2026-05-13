test('basic math', () => {
  expect(1 + 1).toBe(2);
});

test('string operations', () => {
  expect('hello ' + 'world').toBe('hello world');
});

test('array operations', () => {
  const arr = [1, 2, 3];
  expect(arr.length).toBe(3);
  expect(arr.includes(2)).toBe(true);
});
