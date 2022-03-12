import { Identity } from '@src/core/models'
import { NoteField, NoteFieldName, NoteType, NoteTypeId, NoteTypeName } from '@src/flashcards/models'

describe('The NoteType instance', () => {

  describe('when initializing', () => {
    test('should generate different identities', () => {
      const noteType1 = new NoteType(new NoteTypeName('name'))
      const noteType2 = new NoteType(new NoteTypeName('name'))
      expect(noteType1.identity).not.toBeNull()
      expect(noteType1.identity.value).not.toEqual(noteType2.identity.value)
    })

    test('should have a name', () => {
      const noteType = new NoteType(new NoteTypeName('name'))
      expect(noteType.name.value).toBe('name')
    })
  })

  describe('when initialized with a name', () => {
    test('should return name by property', () => {
      const nameValue = 'test'
      const noteType = new NoteType(new NoteTypeName(nameValue))
      expect(noteType.name.value).toBe(nameValue)
    })
  })

  describe('when renaming', () => {
    test('should return new name by property', () => {
      const nameValue = 'test'
      const noteType = new NoteType(new NoteTypeName(nameValue))
      const newNameValue = 'new name'
      noteType.rename(new NoteTypeName(newNameValue))
      expect(noteType.name.value).toBe(newNameValue)
    })
  })

  describe('when comparing', () => {
    test('should return true when compared to another instance with the same identity', () => {
      const identity = new Identity() as NoteTypeId
      const noteType1 = new NoteType(new NoteTypeName('name'), identity)
      const noteType2 = new NoteType(new NoteTypeName('name'), identity)
      expect(noteType1.equals(noteType2)).toBe(true)
    })

    test('should return false when compared to another instance with a different identity', () => {
      const identity1 = new Identity() as NoteTypeId
      const identity2 = new Identity() as NoteTypeId
      const noteType1 = new NoteType(new NoteTypeName('name'), identity1)
      const noteType2 = new NoteType(new NoteTypeName('name'), identity2)
      expect(noteType1.equals(noteType2)).toBe(false)
    })
  })

  describe('when adding a new field', () => {
    test('should add field to the instance', () => {
      const noteType = new NoteType(new NoteTypeName('name'))
      const field = new NoteField(new NoteFieldName('field'))

      noteType.fields.add(field)
      expect(noteType.fields.all).toEqual([field])
    })

    test('should throw an error if the field name is already used', () => {
      const noteType = new NoteType(new NoteTypeName('name'))
      const field1 = new NoteField(new NoteFieldName('field1'))
      const field2 = new NoteField(new NoteFieldName('field_same'))
      const field3 = new NoteField(new NoteFieldName('field_same'))

      noteType.fields.add(field1)
      noteType.fields.add(field2)
      expect(() => noteType.fields.add(field3)).toThrow('Field with name \'field_same\' already exists')
      expect(noteType.fields.all.length).toEqual(2)
    })

    test('should return a field by name', () => {
      const noteType = new NoteType(new NoteTypeName('name'))
      const field = new NoteField(new NoteFieldName('field'))
      noteType.fields.add(field)

      expect(noteType.fields.getByName('field')).toEqual(field)
    })
  })

  describe('when removing a field', () => {
    test('should remove field from the instance', () => {
      const noteType = new NoteType(new NoteTypeName('name'))
      const field1 = new NoteField(new NoteFieldName('field1'))
      noteType.fields.add(field1)

      noteType.fields.remove(field1)
      expect(noteType.fields.all.length).toEqual(0)
    })

    test('should throw an exception if field does not belog to the instance', () => {
      const noteType = new NoteType(new NoteTypeName('name'))
      const field1 = new NoteField(new NoteFieldName('field1'))

      expect(() => noteType.fields.remove(field1)).toThrow('Field does not belong to this instance')
    })
  })

  describe('when changing a position of field', () => {
    test('should return a position of field', () => {
      const noteType = new NoteType(new NoteTypeName('name'))
      const field1 = new NoteField(new NoteFieldName('field1'))
      const field2 = new NoteField(new NoteFieldName('field2'))
      noteType.fields.add(field1)
      noteType.fields.add(field2)

      expect(noteType.fields.getPositionOf(field1)).toEqual(0)
      expect(noteType.fields.getPositionOf(field2)).toEqual(1)
    })

    test('should change a position to top', () => {
      const noteType = new NoteType(new NoteTypeName('name'))
      const field1 = new NoteField(new NoteFieldName('field1'))
      const field2 = new NoteField(new NoteFieldName('field2'))
      const field3 = new NoteField(new NoteFieldName('field3'))
      noteType.fields.add(field1)
      noteType.fields.add(field2)
      noteType.fields.add(field3)

      noteType.fields.setPositionOf(field3).toTop()
      expect(noteType.fields.all).toEqual([field3, field1, field2])
    })

    test('should change a position to bottom', () => {
      const noteType = new NoteType(new NoteTypeName('name'))
      const field1 = new NoteField(new NoteFieldName('field1'))
      const field2 = new NoteField(new NoteFieldName('field2'))
      const field3 = new NoteField(new NoteFieldName('field3'))
      noteType.fields.add(field1)
      noteType.fields.add(field2)
      noteType.fields.add(field3)

      noteType.fields.setPositionOf(field1).toBottom()
      expect(noteType.fields.all).toEqual([field2, field3, field1])
    })

    test('should change a position before field', () => {
      const noteType = new NoteType(new NoteTypeName('name'))
      const field1 = new NoteField(new NoteFieldName('field1'))
      const field2 = new NoteField(new NoteFieldName('field2'))
      noteType.fields.add(field1)
      noteType.fields.add(field2)

      noteType.fields.setPositionOf(field2).before(field1)
      expect(noteType.fields.all).toEqual([field2, field1])
    })

    test('should change a position after field', () => {
      const noteType = new NoteType(new NoteTypeName('name'))
      const field1 = new NoteField(new NoteFieldName('field1'))
      const field2 = new NoteField(new NoteFieldName('field2'))
      noteType.fields.add(field1)
      noteType.fields.add(field2)

      noteType.fields.setPositionOf(field1).after(field2)
      expect(noteType.fields.all).toEqual([field2, field1])
    })
  })

})
