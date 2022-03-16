import { Note, NoteField, NoteFieldName, NoteType, NoteTypeName } from '@src/flashcards/models'

describe('Note', () => {
  let sut: { note: Note }

  beforeEach(() => {
    sut = {
      note: new Note(new NoteType(new NoteTypeName('NoteTypeName')))
    }
    sut.note.type.fields.add(new NoteField(new NoteFieldName('NoteFieldName')))
  })

  /* -------------------------------------------------------------------------- */
  /*                                getFieldValue                               */
  /* -------------------------------------------------------------------------- */

  describe('.getFieldValue()', () => {
    it('returns undefined if value is not set', () => {
      expect(sut.note.getFieldValue('NoteFieldName')).toBeUndefined()
    })

    it('returns value of a field', () => {
      sut.note.setFieldValue('NoteFieldName', 'NoteFieldValue')
      expect(sut.note.getFieldValue('NoteFieldName')).toBe('NoteFieldValue')

    })

    it('throws an error if no field found', () => {
      expect(() => sut.note.getFieldValue('NotExistingField')).toThrow('Field \'NotExistingField\' not found')
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                setFieldValue                               */
  /* -------------------------------------------------------------------------- */

  describe('.setFieldValue()', () => {
    it('throws an error if no field found', () => {
      expect(() => sut.note.setFieldValue('NotExistingField', 'NoteFieldValue')).toThrow('Field \'NotExistingField\' not found')
    })
  })
})