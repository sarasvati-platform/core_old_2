import { Identity } from '@src/core/models/identity'
import { NoteType, NoteTypeName } from '@src/flashcards/models/note-type'

describe('The NoteType instance', () => {

  describe('when initializing', () => {
    test('should have a name', () => {
      const noteType = new NoteType(new Identity(), new NoteTypeName('name'))
      expect(noteType.name.value).toBe('name')
    })
  })

  describe('when initialized with a name', () => {
    test('should return name by property', () => {
      const nameValue = 'test'
      const noteType = new NoteType(new Identity(), new NoteTypeName(nameValue))
      expect(noteType.name.value).toBe(nameValue)
    })
  })

  describe('when renaming', () => {
    test('should return new name by property', () => {
      const nameValue = 'test'
      const noteType = new NoteType(new Identity(), new NoteTypeName(nameValue))
      const newNameValue = 'new name'
      noteType.rename(new NoteTypeName(newNameValue))
      expect(noteType.name.value).toBe(newNameValue)
    })
  })

  describe('when comparing', () => {
    test('should return true when compared to another instance with the same identity', () => {
      const identity = new Identity()
      const noteType1 = new NoteType(identity, new NoteTypeName('name'))
      const noteType2 = new NoteType(identity, new NoteTypeName('name'))
      expect(noteType1.equals(noteType2)).toBe(true)
    })

    test('should return false when compared to another instance with a different identity', () => {
      const identity1 = new Identity()
      const identity2 = new Identity()
      const noteType1 = new NoteType(identity1, new NoteTypeName('name'))
      const noteType2 = new NoteType(identity2, new NoteTypeName('name'))
      expect(noteType1.equals(noteType2)).toBe(false)
    })
  })
})
