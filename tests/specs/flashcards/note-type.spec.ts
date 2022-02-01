import { Identity } from '@src/core/models/identity'
import { NoteField, NoteFieldName, NoteType, NoteTypeName } from '@src/flashcards/models'

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

  describe('when adding a new field', () => {
    test('should add field to the instance', () => {
      const noteType = new NoteType(new Identity(), new NoteTypeName('name'))
      const field = new NoteField(new NoteFieldName('field'))

      noteType.addField(field)
      expect(noteType.fields).toEqual([field])
    })

    test('should throw an error if the field name is already used', () => {
      const noteType = new NoteType(new Identity(), new NoteTypeName('name'))
      const field1 = new NoteField(new NoteFieldName('field1'))
      const field2 = new NoteField(new NoteFieldName('field_same'))
      const field3 = new NoteField(new NoteFieldName('field_same'))

      noteType.addField(field1)
      noteType.addField(field2)
      expect(() => noteType.addField(field3)).toThrow('Field with name \'field_same\' already exists')
      expect(noteType.fields.length).toEqual(2)
    })
  })
})
