import { NoteFieldName } from '@src/flashcards/models'

describe('NoteFieldName', () => {

  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */

  describe('constructor', () => {
    test('throws an error if the name contains { or }', () => {
      const errorMessage = 'The name must not contain { or }'
      expect(() => new NoteFieldName('{')).toThrow(errorMessage)
      expect(() => new NoteFieldName('}')).toThrow(errorMessage)
    })
  })

})
