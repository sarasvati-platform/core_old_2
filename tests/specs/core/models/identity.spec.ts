import { Identity } from '@src/core/models'

describe('Identity', () => {

  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */

  describe('constructor', () => {
    it('generates id by default', () => {
      const identity = new Identity()
      expect(identity.value).toBeDefined()
    })

    it('generates different ids', () => {
      const identity1 = new Identity()
      const identity2 = new Identity()
      expect(identity1.value).not.toEqual(identity2.value)
    })

    it('uses passed id', () => {
      const identity = new Identity('123')
      expect(identity.value).toBe('123')
    })

    it('throws an error if whitespaces passed', () => {
      const id = '  '
      expect(() => new Identity(id)).toThrow('Identity cannot be empty string')
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                   equals                                   */
  /* -------------------------------------------------------------------------- */

  describe('.equals()', () => {
    it('returns true when the id is equal to the other id', () => {
      const id1 = new Identity('123')
      const id2 = new Identity('123')
      expect(id1.equals(id2)).toBeTruthy()
    })

    it('returns false when the id is not equal to the other id', () => {
      const id1 = new Identity('123')
      const id2 = new Identity('456')
      expect(id1.equals(id2)).toBeFalsy()
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                  toString                                  */
  /* -------------------------------------------------------------------------- */

  describe('.toString()', () => {
    it('should return the id', () => {
      const id = new Identity('123')
      expect(id.toString()).toBe('123')
    })
  })
})