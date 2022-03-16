import { Name } from '@src/flashcards/models'

describe('Name', () => {

  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */

  describe('constructor', () => {
    it('throws an error if the name is an empty string', () => {
      const errorMessage = 'The name must be a non-empty string'
      expect(() => new Name('')).toThrow(errorMessage)
    })

    it('throws an error if the name is a string with spaces only', () => {
      const errorMessage = 'The name must be a non-empty string'
      expect(() => new Name(' ')).toThrow(errorMessage)
    })

    it('throws an error if name is a string with new line', () => {
      const errorMessage = 'The name must not contain new line'
      expect(() => new Name('\n')).toThrow(errorMessage)
    })

    it('throws an error if the name is a string with caret return', () => {
      const errorMessage = 'The name must not contain caret return'
      expect(() => new Name('\r')).toThrow(errorMessage)
    })

    it('throws an error if the name is a string with tabs', () => {
      const errorMessage = 'The name must not contain tabs'
      expect(() => new Name('\t')).toThrow(errorMessage)
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                    value                                   */
  /* -------------------------------------------------------------------------- */

  describe('.value', () => {
    it('returns value', () => {
      const nameValue = 'test'
      const name = new Name(nameValue)
      expect(name.value).toBe(nameValue)
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                   equals                                   */
  /* -------------------------------------------------------------------------- */

  describe('.equals()', () => {
    it('returns true if the names are equal', () => {
      const name1 = new Name('test')
      const name2 = new Name('test')
      expect(name1.equals(name2)).toBe(true)
    })

    it('returns false if the names are not equal', () => {
      const name1 = new Name('test')
      const name2 = new Name('test2')
      expect(name1.equals(name2)).toBe(false)
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                  toString                                  */
  /* -------------------------------------------------------------------------- */

  describe('.toString()', () => {
    it('returns the name as a string', () => {
      const nameValue = 'test'
      const name = new Name(nameValue)
      expect(name.toString()).toBe(nameValue)
    })
  })
})
