import { NoteType, NoteTypeName } from '@src/flashcards/models/note-type'

describe('The NoteType instance', () => {

  describe('when initialized', () => {
    test('should throw an error if the name is an empty string', () => {
      const errorMessage = 'The name must be a non-empty string'
      expect(() => new NoteType('')).toThrow(errorMessage)
    })

    test('should return name by property', () => {
      const nameValue = 'test'
      const noteType = new NoteType(nameValue)
      expect(noteType.name.value).toBe(nameValue)
    })

    test('should be constructed with Name class', () => {
      const nameValue = 'test'
      const noteType = new NoteType(new NoteTypeName(nameValue))
      expect(noteType.name.value).toBe(nameValue)
    })
  })
})
