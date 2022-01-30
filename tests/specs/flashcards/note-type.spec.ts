import { NoteType } from '@src/flashcards/models/note-type'

describe('The NoteType instance', () => {

  describe('when initialized', () => {
    test('should throw an error if the name is an empty string', () => {
      const errorMessage = 'The name must be a non-empty string'
      expect(() => new NoteType('')).toThrow(errorMessage)
    })

    test('should return name by property', () => {
      const name = 'test'
      const noteType = new NoteType(name)
      expect(noteType.name).toBe(name)
    })
  })
})
