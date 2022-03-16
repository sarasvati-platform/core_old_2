import { Identity } from '@src/core/models'
import { NoteField, NoteFieldName, NoteType, NoteTypeId, NoteTypeName } from '@src/flashcards/models'

describe('NoteType', () => {
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
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */

  describe('constructor', () => {
    test('uses parameters', () => {
      expect(sut.noteType.name.value).toBe('name')
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                   rename                                   */
  /* -------------------------------------------------------------------------- */

  describe('.rename()', () => {
    test('renames note type', () => {
      sut.noteType.rename(new NoteTypeName('new name'))
      expect(sut.noteType.name.value).toBe('new name')
    })
  })
})
