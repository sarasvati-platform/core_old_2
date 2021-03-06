import { NoteFieldName, NoteField } from '@src/flashcards/models'

describe('NoteField', () => {

  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */

  describe('constructor', () => {
    it('uses parameters', () => {
      const name = new NoteFieldName('name')
      const field = new NoteField(name)

      expect(field.name).toBe(name)
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                   rename                                   */
  /* -------------------------------------------------------------------------- */

  describe('.rename()', () => {
    it('renames field', () => {
      const name = new NoteFieldName('name')
      const field = new NoteField(name)
      field.rename(new NoteFieldName('new name'))
      expect(field.name.value).toBe('new name')
    })
  })
})
