import { RenderedCard } from '@src/flashcards/models'

describe('RenderedCard', () => {

  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */

  describe('constructor', () => {
    it('uses parameters', () => {
      const renderedCard = new RenderedCard(['section1', 'section2'])
      expect(renderedCard.sections).toEqual(['section1', 'section2'])
    })
  })
})