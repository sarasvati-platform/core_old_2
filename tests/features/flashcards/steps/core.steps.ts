import { StepDefinitions } from 'jest-cucumber'
import { context } from '@tests/features/flashcards/context'

export const coreSteps: StepDefinitions = ({ when, then }) => {

  /* -------------------------------------------------------------------------- */
  /*                                    When                                    */
  /* -------------------------------------------------------------------------- */

  when(/^Empty deck$/, () => {
    context.clear()
  })

  /* -------------------------------------------------------------------------- */
  /*                                    Then                                    */
  /* -------------------------------------------------------------------------- */

  then(/^User sees an error (?:'|")(.*)(?:'|")$/, (errorMessage) => {
    expect(context.hasErrors).toBeDefined()
    expect(context.lastError?.message).toEqual(errorMessage)
  })

  then(/^User sees no error$/, () => {
    expect(context.hasErrors).toBeFalsy()
    expect(context.lastError).toBeUndefined()
  })
}