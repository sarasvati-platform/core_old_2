import { CardType, CardSection, CardTypeName } from '@src/flashcards/models'

describe('CardType', () => {
  let sut: CardType

  beforeEach(() => {
    sut = new CardType(new CardTypeName('card type'))
  })

  /* -------------------------------------------------------------------------- */
  /*                                    name                                    */
  /* -------------------------------------------------------------------------- */

  describe('.name', () => {
    it('returns name of the card', () => {
      expect(sut.name.value).toStrictEqual('card type')
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                   rename                                   */
  /* -------------------------------------------------------------------------- */

  describe('.rename()', () => {
    it('name is updated', () => {
      sut.rename(new CardTypeName('new name'))
      expect(sut.name.value).toStrictEqual('new name')
    })
  })


  /* -------------------------------------------------------------------------- */
  /*                                   equals                                   */
  /* -------------------------------------------------------------------------- */

  describe('.equals()', () => {
    it('returns true if names are equal', () => {
      const other = new CardType(new CardTypeName(sut.name.value))
      expect(sut.equals(other)).toBeTruthy()
    })

    it('returns false if names are not equal', () => {
      const other = new CardType(new CardTypeName('other name'))
      expect(sut.equals(other)).toBeFalsy()
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                  sections                                  */
  /* -------------------------------------------------------------------------- */

  describe('.sections', () => {

    /* ------------------------------------------------------------------------ */
    /*                                    all                                   */
    /* ------------------------------------------------------------------------ */

    describe('.all', () => {
      it('returns empty array if there s no sections', () => {
        expect(sut.sections.all).toStrictEqual([])
      })

      it('returns all sections', () => {
        const section = new CardSection('front')
        sut.sections.add(section)
        expect(sut.sections.all).toStrictEqual([section])
      })
    })

    /* ------------------------------------------------------------------------ */
    /*                                   front                                  */
    /* ------------------------------------------------------------------------ */

    describe('.front', () => {
      it('returns undefined if there is no sections', () => {
        expect(sut.sections.front).toStrictEqual(undefined)
      })

      it('returns only first section', () => {
        const sections = [
          new CardSection('front'),
          new CardSection('back')
        ]
        sut.sections.add(sections[0])
        sut.sections.add(sections[1])

        expect(sut.sections.front).toStrictEqual(sections[0])
      })
    })

    /* ------------------------------------------------------------------------ */
    /*                                   back                                   */
    /* ------------------------------------------------------------------------ */

    describe('.back', () => {
      it('returns empty array if there is no sections', () => {
        expect(sut.sections.back).toStrictEqual([])
      })

      it('returns empty array if there is only one section', () => {
        sut.sections.add(new CardSection('front'))
        expect(sut.sections.back).toStrictEqual([])
      })

      it('returns sections except the first one', () => {
        const sections = [
          new CardSection('front'),
          new CardSection('back'),
          new CardSection('additional')
        ]
        sut.sections.add(sections[0])
        sut.sections.add(sections[1])
        sut.sections.add(sections[2])

        expect(sut.sections.back).toStrictEqual([sections[1], sections[2]])
      })
    })
  })
})