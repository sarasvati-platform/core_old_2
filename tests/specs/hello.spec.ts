import { hello } from '@src/index'

describe('hello', () => {
  test('returns name', () => {
    const actual = hello('John')
    expect(actual).toStrictEqual('hello, John')
  })
})
