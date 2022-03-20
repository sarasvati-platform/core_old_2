import { StepDefinitions } from 'jest-cucumber'
import { Identity } from '@src/core/models'
import { NoteTypeId, CardTypeName, CardType, CardSection } from '@src/flashcards/models'
import { context } from '@tests/features/flashcards/context'

export const noteTypeCardTypeSectionsSteps: StepDefinitions = ({ when, then }) => {
  const ntr = context.noteTypeRepository

  /* -------------------------------------------------------------------------- */
  /*                                    When                                    */
  /* -------------------------------------------------------------------------- */

  when(/^User adds '(.*)' card type to the '(.*)' note type with the following sections:$/, (cardTypeName: string, noteTypeName, sectionsTable) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    const name = new CardTypeName(cardTypeName)
    const cardType = new CardType(name)
    noteType.cardTypes.add(cardType)
    for (const sectionRow of sectionsTable) {
      cardType.sections.add(new CardSection(sectionRow['Section']))
    }
  })

  when(/^User adds the following sections to the '(.*)' card type of the '(.*)' note type:$/, (cardTypeName: string, noteTypeName, sectionsTable) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    const cardType = noteType.cardTypes.findByName(cardTypeName)
    if (!cardType) { throw new Error(`Card type ${cardTypeName} not found in note type ${noteTypeName}`) }
    for (const sectionRow of sectionsTable) {
      cardType.sections.add(new CardSection(sectionRow['Section']))
    }
  })

  when(/^User deletes (\d) section from '(.*)' card type of '(.*)' note type$/, (index: number, cardTypeName: string, noteTypeName) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    const cardType = noteType.cardTypes.findByName(cardTypeName)
    if (!cardType) { throw new Error(`Card type ${cardTypeName} not found in note type ${noteTypeName}`) }
    cardType.sections.remove(index-1)
  })

  /* -------------------------------------------------------------------------- */
  /*                                    Then                                    */
  /* -------------------------------------------------------------------------- */

  then(/^Card type '(.*)' of the '(.*)' note type has the following sections:$/, (cardTypeName, noteTypeName, sectionsTable) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    const cardType = noteType.cardTypes.findByName(cardTypeName)
    if (!cardType) { throw new Error(`Card type ${cardTypeName} not found in note type ${noteTypeName}`) }

    for (const [i, sectionRow] of sectionsTable.entries()) {
      const section = cardType.sections.all[i]
      expect(section.template).toStrictEqual(sectionRow['Section'])
    }
  })

}
