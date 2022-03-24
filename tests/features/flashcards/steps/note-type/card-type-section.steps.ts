import { Identity } from '@src/core/models'
import { NoteTypeId } from '@src/flashcards/models'
import { context, guard } from '@tests/features/flashcards/context'
import { StepDefinitions } from 'jest-cucumber'

export const noteTypeCardTypeSectionsSteps: StepDefinitions = ({ when, then }) => {
  const ntr = () => context.noteTypeRepository

  /* -------------------------------------------------------------------------- */
  /*                                    When                                    */
  /* -------------------------------------------------------------------------- */

  when(/^User adds '(.*)' card type to the '(.*)' note type with the following sections:$/, guard((cardType: string, noteType, sections) => {
    context.manageCollection.addCardType(noteType, cardType, sections.map(x => x['Section']))
  }))

  when(/^User adds the following sections to the '(.*)' card type of the '(.*)' note type:$/, guard((cardType: string, noteType, sections) => {
    context.manageCollection.addSections(noteType, cardType, sections.map(x => x['Section']))
  }))

  when(/^User deletes (\d) section from '(.*)' card type of '(.*)' note type$/, guard((index: number, cardType: string, noteType) => {
    context.manageCollection.deleteSection(noteType, cardType, index)
  }))

  /* -------------------------------------------------------------------------- */
  /*                                    Then                                    */
  /* -------------------------------------------------------------------------- */

  then(/^Card type '(.*)' of the '(.*)' note type has the following sections:$/, (cardTypeName, noteTypeName, sectionsTable) => {
    const noteType = ntr().get(new Identity(noteTypeName) as NoteTypeId)
    const cardType = noteType.cardTypes.findByName(cardTypeName)
    if (!cardType) { throw new Error(`Card type ${cardTypeName} not found in note type ${noteTypeName}`) }

    for (const [i, sectionRow] of sectionsTable.entries()) {
      const section = cardType.sections.all[i]
      expect(section.template).toStrictEqual(sectionRow['Section'])
    }
  })

}
