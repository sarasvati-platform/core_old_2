import { NoteFieldName, NoteField } from '@src/flashcards/models'

describe('NoteField', () => {

  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */

  describe('constructor', () => {
    test('uses parameters', () => {
      const name = new NoteFieldName('name')
      const field = new NoteField(name)

      expect(field.name).toBe(name)
    })
  })

})
