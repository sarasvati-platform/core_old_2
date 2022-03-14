import { CardType, CardSection, CardTypeName } from '@src/flashcards/models'

describe('The CardType instance', () => {
  let sut: CardType

  beforeEach(() => {
    sut = new CardType(new CardTypeName('card type'))
  })

  test('name returns name of the card', () => {
    expect(sut.name.value).toStrictEqual('card type')
  })

  describe('when renaming', () => {
    test('name is updated', () => {
      sut.rename(new CardTypeName('new name'))
      expect(sut.name.value).toStrictEqual('new name')
    })
  })


  describe('sections', () => {
    test('returns and empty array', () => {
      expect(sut.sections).toStrictEqual([])
    })

    test('returns and array of section', () => {
      const section = new CardSection('template')
      sut.sections.push(section)

      expect(sut.sections).toStrictEqual([section])
    })

    test('frontSection returns undefined array if there is no sections', () => {
      expect(sut.frontSection).toStrictEqual(undefined)
    })

    test('frontSection returns only first section', () => {
      const sections = [
        new CardSection('front'),
        new CardSection('back')
      ]
      sut.sections.push(sections[0])
      sut.sections.push(sections[1])

      expect(sut.frontSection).toStrictEqual(sections[0])
    })

    test('backSections returns empty array if there is no sections', () => {
      expect(sut.backSections).toStrictEqual([])
    })

    test('backSections returns empty array if there is only one section', () => {
      sut.sections.push(new CardSection('front'))
      expect(sut.backSections).toStrictEqual([])
    })

    test('backSections returns sections except the first one', () => {
      const sections = [
        new CardSection('front'),
        new CardSection('back'),
        new CardSection('additional')
      ]
      sut.sections.push(sections[0])
      sut.sections.push(sections[1])
      sut.sections.push(sections[2])

      expect(sut.backSections).toStrictEqual([sections[1], sections[2]])
    })

    test('backSections returns empty array if there is only one section', () => {
      sut.sections.push(new CardSection('front'))
      expect(sut.backSections).toStrictEqual([])
    })

    test('backSections returns empty array if there is no sections', () => {
      expect(sut.backSections).toStrictEqual([])
    })
  })
})