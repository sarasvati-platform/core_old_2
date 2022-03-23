import { StepDefinitions } from 'jest-cucumber'
import { Identity } from '@src/core/models'
import { NoteTypeId } from '@src/flashcards/models'
import { context } from '@tests/features/flashcards/context'
import { addCardTypes, changeCardTypePosition, removeCardType, renameCardType } from '@tests/features/flashcards/commands'

export const noteTypeCardTypesSteps: StepDefinitions = ({ when, then }) => {
  const ntr = context.noteTypeRepository
  const g = context.guard

  /* -------------------------------------------------------------------------- */
  /*                                    When                                    */
  /* -------------------------------------------------------------------------- */

  when(/^User adds '(.*)' card type to '(.*)' note type$/, (name: string, noteType) => {
    g(() => addCardTypes(noteType, [name]))
  })

  when(/^User adds the following card types to the '(.*)' note type:$/, (noteType: string, cardTypes) => {
    g(() => addCardTypes(noteType, cardTypes.map(x => x['Card Type'])))
  })

  when(/^User removes '(.*)' card type from '(.*)' note type$/, (cardTypeName: string, noteTypeName: string) => {
    g(() => removeCardType(noteTypeName, cardTypeName))
  })

  when(/^User renames '(.*)' card type to '(.*)' of the '(.*)' note type$/, (oldName: string, newCardType: string, noteType: string) => {
    g(() => renameCardType(noteType, oldName, newCardType))
  })

  when(/^User changes position of '(.*)' card type of '(.*)' note type to (-?\d+)$/, (cardType, noteType, position) => {
    g(() => changeCardTypePosition(noteType, cardType, parseInt(position)))
  })

  /* -------------------------------------------------------------------------- */
  /*                                    Then                                    */
  /* -------------------------------------------------------------------------- */

  then(/^Note type '(.*)' has '(.*)' card type$/, (noteTypeName, cardTypeName) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    const cardType = noteType.cardTypes.findByName(cardTypeName)
    expect(cardType).toBeDefined()
  })

  then(/^Note type '(.*)' has no '(.*)' card type$/, (noteTypeName, cardTypeName) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    const cardType = noteType.cardTypes.findByName(cardTypeName)
    expect(cardType).toBeUndefined()
  })

  then(/^Note type '(.*)' has the following card types:$/, (noteTypeName, cardTypesTable) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    for (const cardTypeRow of cardTypesTable) {
      const cardType = noteType.cardTypes.findByName(cardTypeRow['Card Type'])
      expect(cardType).toBeDefined()
    }
  })

}
