import { CardSchedule } from '@src/flashcards/models'

describe('CardSchedule', () => {

  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */

  describe('constructor', () => {
    it('uses parameters', () => {
      const date = new Date()
      const schedule = new CardSchedule(date)
      expect(schedule.due).toStrictEqual(date)
    })
  })
})