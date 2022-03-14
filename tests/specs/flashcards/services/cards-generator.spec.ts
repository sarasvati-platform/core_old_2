import { Note, NoteType, CardType, CardTypeName, NoteTypeName, NoteField, NoteFieldName, CardSection } from '@src/flashcards/models'
import { CardsGenerator } from '@src/flashcards/services/cards-generator'
import { CardRenderer } from '@src/flashcards/services/card-renderer'

describe('The CardsGenerator instance', () => {
  let sut: { note: Note, generator: CardsGenerator, renderer: CardRenderer }

  beforeEach(() => {
    const note = new Note(new NoteType(new NoteTypeName('geography')))
    sut = {
      note,
      generator: new CardsGenerator(note),
      renderer: new CardRenderer(),
    }
  })

  describe('when generating', () => {
    test('returns an empty array in no card types were added', () => {
      const result = sut.generator.generate()
      expect(result).toStrictEqual([])
    })

    test('returns an array of cards', () => {
      sut.note.type.fields.add(new NoteField(new NoteFieldName('country')))
      sut.note.type.fields.add(new NoteField(new NoteFieldName('capital')))

      sut.note.setFieldValue('country', 'Ukraine')
      sut.note.setFieldValue('capital', 'Kiev')

      sut.note.type.cardTypes.add(
        new CardType(
          new CardTypeName('country -> capital'), [
            new CardSection('{{country}}'),
            new CardSection('{{capital}}'),
          ]
        )
      )

      sut.note.type.cardTypes.add(
        new CardType(
          new CardTypeName('capital -> contry'), [
            new CardSection('{{capital}}'),
            new CardSection('{{country}}'),
          ]
        )
      )

      const result = sut.generator.generate()
      expect(result.length).toEqual(2)

      const card1 = sut.renderer.render(result[0])
      const card2 = sut.renderer.render(result[1])

      expect(card1.sections).toStrictEqual(['Ukraine', 'Kiev'])
      expect(card2.sections).toStrictEqual(['Kiev', 'Ukraine'])
    })
  })
})
