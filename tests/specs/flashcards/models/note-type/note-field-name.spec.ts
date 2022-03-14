import { NoteFieldName } from '@src/flashcards/models'

describe('The NoteFieldName instance', () => {

  describe('when initializing', () => {
    test('should throw an error if the name contains { or }', () => {
      const errorMessage = 'The name must not contain { or }'
      expect(() => new NoteFieldName('{')).toThrow(errorMessage)
      expect(() => new NoteFieldName('}')).toThrow(errorMessage)
    })
  })

})
