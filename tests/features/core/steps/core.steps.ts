import { StepDefinitions } from 'jest-cucumber'
import { hello } from '@src/index'

export const coreSteps: StepDefinitions = ({ then }) => {

  /* -------------------------------------------------------------------------- */
  /*                                    When                                    */
  /* -------------------------------------------------------------------------- */

  then(/^Hello function should return name '(.*)' for '(.*)'$/, (result, name) => {
    const actualResult = hello(name)
    expect(actualResult).toEqual(result)
  })

}