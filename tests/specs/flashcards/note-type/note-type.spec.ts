import { Identity } from '@src/core/models'
import { NoteField, NoteFieldName, NoteType, NoteTypeId, NoteTypeName } from '@src/flashcards/models'

describe('The NoteType instance', () => {
  let sut: {
    noteType: NoteType,
    field1: NoteField,
    field2: NoteField,
    field3: NoteField,
    field4: NoteField
  }

  beforeEach(() => {
    sut = {
      noteType: new NoteType(
        new NoteTypeName('name'),
        new Identity('note-type-id') as NoteTypeId
      ),
      field1: new NoteField(new NoteFieldName('field 1')),
      field2: new NoteField(new NoteFieldName('field 2')),
      field3: new NoteField(new NoteFieldName('field 3')),
      field4: new NoteField(new NoteFieldName('field 4')),
    }
    sut.noteType.fields.add(sut.field1)
    sut.noteType.fields.add(sut.field2)
    sut.noteType.fields.add(sut.field3)
  })

  /* -------------------------------------------------------------------------- */
  /*                               Initialization                               */
  /* -------------------------------------------------------------------------- */

  describe('when initializing', () => {
    test('should generate different identities', () => {
      const noteType1 = new NoteType(new NoteTypeName('name'))
      const noteType2 = new NoteType(new NoteTypeName('name'))
      expect(noteType1.identity).not.toBeNull()
      expect(noteType1.identity.value).not.toEqual(noteType2.identity.value)
    })

    test('should return name by property', () => {
      expect(sut.noteType.name.value).toBe('name')
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                              Rename note type                              */
  /* -------------------------------------------------------------------------- */

  describe('when renaming', () => {
    test('should return new name by property', () => {
      sut.noteType.rename(new NoteTypeName('new name'))
      expect(sut.noteType.name.value).toBe('new name')
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                               Add fields                                   */
  /* -------------------------------------------------------------------------- */

  describe('when adding a new field', () => {
    test('should return fields by propert', () => {
      expect(sut.noteType.fields.all).toEqual([sut.field1, sut.field2, sut.field3])
    })

    test('should add field to the instance', () => {
      sut.noteType.fields.add(sut.field4)
      expect(sut.noteType.fields.all).toContain(sut.field4)
    })

    test('should throw an error if the field name is already used', () => {
      const fieldWithSameName = new NoteField(new NoteFieldName(sut.field1.name.value))
      expect(() => sut.noteType.fields.add(fieldWithSameName)).toThrow('Field with name \'field 1\' already exists')
      expect(sut.noteType.fields.all).toEqual([sut.field1, sut.field2, sut.field3])
    })

    test('should return a field by name', () => {
      const found = sut.noteType.fields.findByName('field 1')
      expect(found).toEqual(sut.field1)
    })

    test('should return undefined if no field found', () => {
      const found = sut.noteType.fields.findByName('field 999')
      expect(found).toBeUndefined()
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                Remove fields                               */
  /* -------------------------------------------------------------------------- */

  describe('when removing a field', () => {
    test('should remove field from the instance', () => {
      sut.noteType.fields.remove(sut.field1)
      sut.noteType.fields.remove(sut.field2)
      sut.noteType.fields.remove(sut.field3)
      expect(sut.noteType.fields.all).toEqual([])
    })

    test('should throw an exception if field does not belog to the instance', () => {
      const externalField = new NoteField(new NoteFieldName('field1'))
      expect(() => sut.noteType.fields.remove(externalField)).toThrow('Field does not belong to this instance')
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                             Position of a field                            */
  /* -------------------------------------------------------------------------- */

  describe('when changing a position of field', () => {
    test('should return a position of field', () => {
      expect(sut.noteType.fields.getPositionOf(sut.field1)).toEqual(0)
      expect(sut.noteType.fields.getPositionOf(sut.field2)).toEqual(1)
    })

    test('should change a position to top', () => {
      sut.noteType.fields.setPositionOf(sut.field3).toTop()
      expect(sut.noteType.fields.all).toEqual([sut.field3, sut.field1, sut.field2])
    })

    test('should change a position to bottom', () => {
      sut.noteType.fields.setPositionOf(sut.field1).toBottom()
      expect(sut.noteType.fields.all).toEqual([sut.field2, sut.field3, sut.field1])
    })

    test('should change a position before field', () => {
      sut.noteType.fields.setPositionOf(sut.field3).before(sut.field2)
      expect(sut.noteType.fields.all).toEqual([sut.field1, sut.field3, sut.field2])
    })

    test('should change a position after field', () => {
      sut.noteType.fields.setPositionOf(sut.field1).after(sut.field3)
      expect(sut.noteType.fields.all).toEqual([sut.field2, sut.field3, sut.field1])
    })
  })

})
