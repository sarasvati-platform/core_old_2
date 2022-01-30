import { StepDefinitions } from 'jest-cucumber'
import { context } from '@tests/features/flashcards/context'

export const nodeTypesManageSteps: StepDefinitions = ({ when, then }) => {

  /* -------------------------------------------------------------------------- */
  /*                                    When                                    */
  /* -------------------------------------------------------------------------- */

  when(/^User creates '(.*)' note type$/, (noteTypeName) => {
    console.log('test')
  })

  /* -------------------------------------------------------------------------- */
  /*                                    Then                                    */
  /* -------------------------------------------------------------------------- */

  then(/^User has( no | )the following note types:$/, (hasOrNot, noteTypeTable) => {
    console.log('test')
  })
}