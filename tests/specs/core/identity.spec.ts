import { Identity } from '@src/core/models/identity'

describe('The Identity instance', () => {
  describe('when initializing', () => {
    test('should generate id if not provided', () => {
      const id = new Identity()
      expect(id.value).toBeDefined()
    })

    test('should use provided id', () => {
      const id = new Identity('123')
      expect(id.value).toEqual('123')
    })
  })

  describe('when comparing', () => {
    it('should return true when the id is equal to the other id', () => {
      const id1 = new Identity('123')
      const id2 = new Identity('123')
      expect(id1.equals(id2)).toBeTruthy()
    })

    it('should return false when the id is not equal to the other id', () => {
      const id1 = new Identity('123')
      const id2 = new Identity('456')
      expect(id1.equals(id2)).toBeFalsy()
    })
  })

  describe('when converting to a string', () => {
    it('should return the id', () => {
      const id = new Identity('123')
      expect(id.toString()).toBe('123')
    })
  })
})
