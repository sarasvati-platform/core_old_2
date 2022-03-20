import { StepDefinitions } from 'jest-cucumber'
import { Identity } from '@src/core/models'
import { NoteTypeId, CardTypeName, CardType } from '@src/flashcards/models'
import { context } from '@tests/features/flashcards/context'

export const noteTypeCardTypesSteps: StepDefinitions = ({ when, then }) => {
  const ntr = context.noteTypeRepository

  /* -------------------------------------------------------------------------- */
  /*                                    When                                    */
  /* -------------------------------------------------------------------------- */

  when(/^User adds '(.*)' card type to '(.*)' note type$/, (cardTypeName: string, noteTypeName) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    const name = new CardTypeName(cardTypeName)
    try {
      noteType.cardTypes.add(new CardType(name))
    } catch (e) {
      context.addError(e)
    }
  })

  when(/^User removes '(.*)' card type from '(.*)' note type$/, (cardTypeName: string, noteTypeName: string) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    const cardType = noteType.cardTypes.findByName(cardTypeName)
    if (!cardType) { throw new Error(`Card type '${cardTypeName}' not found`) }
    noteType.cardTypes.remove(cardType)
  })

  when(/^User adds the following card types to the '(.*)' note type:$/, (noteTypeName: string, cardTypesTable) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    for (const cardTypeRow of cardTypesTable) {
      const name = new CardTypeName(cardTypeRow['Card Type'])
      noteType.cardTypes.add(new CardType(name))
    }
  })

  when(/^User renames '(.*)' card type to '(.*)' of the '(.*)' note type$/, (oldCardTypeName: string, newCardTypeName: string, noteTypeName: string) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    const cardType = noteType.cardTypes.findByName(oldCardTypeName)
    if (!cardType) { throw new Error(`Card type '${oldCardTypeName}' not found`) }
    try {
      cardType.rename(new CardTypeName(newCardTypeName))
    } catch (e) {
      context.addError(e)
    }
  })
  when(/^User changes position of '(.*)' card type of '(.*)' note type to (-?\d+)$/, (cardTypeName, noteTypeName, position) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    const cardType = noteType.cardTypes.findByName(cardTypeName)
    if (!cardType) { throw new Error(`Card type '${cardTypeName}' not found`) }
    try {
      noteType.cardTypes.setPositionOf(cardType).to(parseInt(position))
    } catch (e) {
      context.addError(e)
    }
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
