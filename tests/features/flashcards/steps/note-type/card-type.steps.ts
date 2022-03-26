import { Identity } from '@src/core/models'
import { NoteTypeId } from '@src/flashcards/models'
import { context, guard } from '@tests/features/flashcards/context'
import { StepDefinitions } from 'jest-cucumber'

export const noteTypeCardTypesSteps: StepDefinitions = ({ when, then }) => {
  const ntr = () => context.noteTypeRepository

  /* -------------------------------------------------------------------------- */
  /*                                    When                                    */
  /* -------------------------------------------------------------------------- */

  when(/^User adds '(.*)' card type to '(.*)' note type$/, guard((name: string, noteType) => {
    context.manageCollection.addCardTypes(noteType, [name])
  }))

  when(/^User adds the following card types to the '(.*)' note type:$/, guard((noteType: string, cardTypes) => {
    context.manageCollection.addCardTypes(noteType, cardTypes.map(x => x['Card Type']))
  }))

  when(/^User removes '(.*)' card type from '(.*)' note type$/, guard((cardTypeName: string, noteTypeName: string) => {
    context.manageCollection.removeCardType(noteTypeName, cardTypeName)
  }))

  when(/^User renames '(.*)' card type to '(.*)' of the '(.*)' note type$/, guard((oldName: string, newCardType: string, noteType: string) => {
    context.manageCollection.renameCardType(noteType, oldName, newCardType)
  }))

  when(/^User changes position of '(.*)' card type of '(.*)' note type to (-?\d+)$/, guard((cardType, noteType, position) => {
    context.manageCollection.changeCardTypePosition(noteType, cardType, parseInt(position))
  }))

  /* -------------------------------------------------------------------------- */
  /*                                    Then                                    */
  /* -------------------------------------------------------------------------- */

  then(/^Note type '(.*)' has '(.*)' card type$/, (noteTypeName, cardTypeName) => {
    const noteType = ntr().get(new Identity(noteTypeName) as NoteTypeId)
    const cardType = noteType.cardTypes.findByName(cardTypeName)
    expect(cardType).toBeDefined()
  })

  then(/^Note type '(.*)' has no '(.*)' card type$/, (noteTypeName, cardTypeName) => {
    const noteType = ntr().get(new Identity(noteTypeName) as NoteTypeId)
    const cardType = noteType.cardTypes.findByName(cardTypeName)
    expect(cardType).toBeUndefined()
  })

  then(/^Note type '(.*)' has the following card types:$/, (noteTypeName, cardTypesTable) => {
    const noteType = ntr().get(new Identity(noteTypeName) as NoteTypeId)
    for (const cardTypeRow of cardTypesTable) {
      const cardType = noteType.cardTypes.findByName(cardTypeRow['Card Type'])
      expect(cardType).toBeDefined()
    }
  })

}
