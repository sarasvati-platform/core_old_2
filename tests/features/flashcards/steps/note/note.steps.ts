import { Identity } from '@src/core/models'
import { IQuery } from '@src/core/persistence'
import { NoteId } from '@src/flashcards/models'
import { ofNote } from '@src/flashcards/models/card/queries'
import { fieldValueContains } from '@src/flashcards/models/note/queries'
import { CardsGenerationService } from '@src/flashcards/services/cards-generation-service'
import { context, guard } from '@tests/features/flashcards/context'
import { StepDefinitions } from 'jest-cucumber'

export const noteSteps: StepDefinitions = ({ when, then }) => {
  const nr = () => context.noteRepository

  /* -------------------------------------------------------------------------- */
  /*                                    When                                    */
  /* -------------------------------------------------------------------------- */

  when(/^User creates '(.*)' note:$/, guard((noteTypeName, fieldsTable) => {
    context.manageCollection.createNote(noteTypeName, fieldsTable.map(x => [x['Field'], x['Value']]))
  }))

  when(/^User deletes '(.*)' note$/, guard((noteId) => {
    context.manageCollection.deleteNote(noteId)
  }))

  /* -------------------------------------------------------------------------- */
  /*                                    Then                                    */
  /* -------------------------------------------------------------------------- */

  then(/^Note '(.*)' has the following cards:$/, (noteId, cardsTable) => {
    const note = nr().get(new Identity(noteId) as NoteId)
    const cardsGenerator = new CardsGenerationService(context.cardsRepository)
    cardsGenerator.generate(note)
    const cards = context.cardsRepository.find(ofNote(note) as IQuery)
    for(const cardRow of cardsTable) {
      const card = cards.find(x => x.type.name.value === cardRow['Card Type'])
      expect(card).toBeDefined()
    }
  })

  then(/^User can find note by '(.*)'$/, (text) => {
    const notes = nr().find(fieldValueContains(text))
    expect(notes.length).toBeGreaterThanOrEqual(1)
  })

  then(/^User can't find note by '(.*)'$/, (noteId) => {
    const exists = nr().exists(new Identity(noteId) as NoteId)
    expect(exists).toBeFalsy()
  })
}
