import { CommandContext, IService } from '@src/core/commands/commands'

class DummyService implements IService {}

describe('The CommandContext instance', () => {
  let sut: CommandContext = new CommandContext()

  beforeEach(() => {
    sut = new CommandContext()
  })

  describe('when register service', () => {
    it('should register any service', () => {
      sut.register('DummyService', new DummyService())
      expect(sut.get('DummyService')).toBeDefined()
    })

    it('should throw an exception if service with same type already registered', () => {
      const register = () =>  sut.register('DummyService', new DummyService())

      register()
      expect(() => register()).toThrow('Service with type DummyService already registered')
    })
  })

  describe('when get service', () => {
    it('should rise an exception if no service found', () => {
      expect(() => sut.get('DummyService')).toThrow('Service with type DummyService not found')
    })

  })
})
