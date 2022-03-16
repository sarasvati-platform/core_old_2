import { Identity } from '@src/core/models'
import { Card, CardId, CardType, CardTypeName, Note, NoteType, NoteTypeName } from '@src/flashcards/models'

describe('Card', () => {

  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */

  describe('constructor', () => {
    it('uses parameters', () => {
      const card = new Card(
        new CardType(new CardTypeName('CardType')),
        new Note(new NoteType(new NoteTypeName('Note'))),
        new Identity('123') as CardId
      )

      expect(card.type.name.value).toBe('CardType')
      expect(card.note.type.name.value).toBe('Note')
      expect(card.identity.value).toBe('123')
    })
  })
})