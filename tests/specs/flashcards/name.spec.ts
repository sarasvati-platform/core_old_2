import { Name } from '@src/flashcards/models'

describe('The Name instance', () => {

  describe('when initializing', () => {
    test('should throw an error if the name is an empty string', () => {
      const errorMessage = 'The name must be a non-empty string'
      expect(() => new Name('')).toThrow(errorMessage)
    })

    test('should throw an error if the name is a string with spaces only', () => {
      const errorMessage = 'The name must be a non-empty string'
      expect(() => new Name(' ')).toThrow(errorMessage)
    })

    test('should throw an error if name is a string with new line', () => {
      const errorMessage = 'The name must not contain new line'
      expect(() => new Name('\n')).toThrow(errorMessage)
    })

    test('should throw an error if the name is a string with caret return', () => {
      const errorMessage = 'The name must not contain caret return'
      expect(() => new Name('\r')).toThrow(errorMessage)
    })

    test('should throw an error if the name is a string with tabs', () => {
      const errorMessage = 'The name must not contain tabs'
      expect(() => new Name('\t')).toThrow(errorMessage)
    })
  })

  describe('when initialized', () => {
    test('should return name by property', () => {
      const nameValue = 'test'
      const name = new Name(nameValue)
      expect(name.value).toBe(nameValue)
    })
  })

  describe('when compared', () => {
    test('should return true if the names are equal', () => {
      const name1 = new Name('test')
      const name2 = new Name('test')
      expect(name1.equals(name2)).toBe(true)
    })

    test('should return false if the names are not equal', () => {
      const name1 = new Name('test')
      const name2 = new Name('test2')
      expect(name1.equals(name2)).toBe(false)
    })
  })

  describe('when converted to string', () => {
    test('should return the name as a string', () => {
      const nameValue = 'test'
      const name = new Name(nameValue)
      expect(name.toString()).toBe(nameValue)
    })
  })
})
