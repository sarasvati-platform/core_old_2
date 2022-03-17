import { Note, NoteType, CardType, CardTypeName, NoteTypeName, NoteField, NoteFieldName, CardSection } from '@src/flashcards/models'
import { CardsGenerationService, CardsGenerationActionType } from '@src/flashcards/services/cards-generation-service'
import { FakeCardsRepository } from '@tests/ports/repositories/fake-note-type-repository'

describe('CardsGenerationService', () => {
  let sut: {
    note: Note,
    generator: CardsGenerationService,
    cardsRepository: FakeCardsRepository
  }

  beforeEach(() => {
    const noteType = new NoteType(new NoteTypeName('geography'))
    noteType.fields.add(new NoteField(new NoteFieldName('country')))
    noteType.fields.add(new NoteField(new NoteFieldName('capital')))

    const cardType1 = new CardType(
      new CardTypeName('country -> capital'), [
        new CardSection('{{country}}'),
        new CardSection('{{capital}}'),
      ]
    )
    const cardType2 = new CardType(
      new CardTypeName('capital -> contry'), [
        new CardSection('{{capital}}'),
        new CardSection('{{country}}'),
      ]
    )

    noteType.cardTypes.add(cardType1)
    noteType.cardTypes.add(cardType2)

    const note = new Note(noteType)
    note.setFieldValue('country', 'Ukraine')
    note.setFieldValue('capital', 'Kiev')

    const cardsRepository = new FakeCardsRepository()

    sut = {
      note,
      generator: new CardsGenerationService(
        cardsRepository
      ),
      cardsRepository
    }
  })

  /* -------------------------------------------------------------------------- */
  /*                                  generate                                  */
  /* -------------------------------------------------------------------------- */

  describe('.generate()', () => {
    it('returns an empty array in no card types were added', () => {
      const note = new Note(new NoteType(new NoteTypeName('geography')))
      const result = sut.generator.generate(note)
      expect(result).toStrictEqual([])
    })

    it('returns an array of cards', () => {
      const cards = sut.generator.generate(sut.note)
      expect(cards.length).toEqual(2)
      expect(cards[0].card.identity.value).not.toEqual(cards[1].card.identity.value)
      expect(cards[0].card.note.identity.value).toEqual(sut.note.identity.value)
      expect(cards[1].card.note.identity.value).toEqual(sut.note.identity.value)
      expect(cards[0].card.type.name.value).toEqual('country -> capital')
      expect(cards[1].card.type.name.value).toEqual('capital -> contry')
    })

    it('updates existing cards', () => {
      sut.generator.generate(sut.note)
      const result = sut.generator.generate(sut.note)
      expect(result.length).toEqual(2)
      expect(result.filter(x => x.action === CardsGenerationActionType.Update).length).toEqual(2)
    })

    it('deletes if card type deleted', () => {
      sut.generator.generate(sut.note)
      sut.note.type.cardTypes.remove(sut.note.type.cardTypes.all[0])

      const result = sut.generator.generate(sut.note)
      expect(result.length).toEqual(2)
      expect(result.filter(x => x.action === CardsGenerationActionType.Remove).length).toEqual(1)
    })

  })
})
