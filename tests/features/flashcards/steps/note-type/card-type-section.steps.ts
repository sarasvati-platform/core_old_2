import { StepDefinitions } from 'jest-cucumber'
import { Identity } from '@src/core/models'
import { NoteTypeId } from '@src/flashcards/models'
import { context } from '@tests/features/flashcards/context'
import { addCardType, addSections, deleteSection } from '@tests/features/flashcards/commands'

export const noteTypeCardTypeSectionsSteps: StepDefinitions = ({ when, then }) => {
  const ntr = context.noteTypeRepository
  const g = context.guard

  /* -------------------------------------------------------------------------- */
  /*                                    When                                    */
  /* -------------------------------------------------------------------------- */

  when(/^User adds '(.*)' card type to the '(.*)' note type with the following sections:$/, (cardType: string, noteType, sections) => {
    g(() => addCardType(noteType, cardType, sections.map(x => x['Section'])))
  })

  when(/^User adds the following sections to the '(.*)' card type of the '(.*)' note type:$/, (cardType: string, noteType, sections) => {
    g(() => addSections(noteType, cardType, sections.map(x => x['Section'])))
  })

  when(/^User deletes (\d) section from '(.*)' card type of '(.*)' note type$/, (index: number, cardType: string, noteType) => {
    g(() => deleteSection(noteType, cardType, index))
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
