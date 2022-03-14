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
})
