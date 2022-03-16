import { StepDefinitions } from 'jest-cucumber'
import { context } from '@tests/features/flashcards/context'

export const coreSteps: StepDefinitions = ({ then }) => {

  /* -------------------------------------------------------------------------- */
  /*                                    Then                                    */
  /* -------------------------------------------------------------------------- */

  then(/^User sees an error (?:'|")(.*)(?:'|")$/, (errorMessage) => {
    expect(context.hasErrors).toBeDefined()
    expect(context.lastError.message).toEqual(errorMessage)
  })
}