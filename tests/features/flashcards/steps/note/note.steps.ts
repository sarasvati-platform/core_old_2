import { StepDefinitions } from 'jest-cucumber'
import { Identity } from '@src/core/models'
import { Note, NoteTypeId, NoteId } from '@src/flashcards/models'
import { context } from '@tests/features/flashcards/context'
import { CardsGenerationService } from '@src/flashcards/services/cards-generation-service'
import { ofNote } from '@src/flashcards/models/card/queries'
import { IQuery } from '@src/core/persistence'

export const noteSteps: StepDefinitions = ({ when, then }) => {
  const ntr = context.noteTypeRepository
  const nr = context.noteRepository

  /* -------------------------------------------------------------------------- */
  /*                                    When                                    */
  /* -------------------------------------------------------------------------- */

  when(/^User creates '(.*)' note:$/, (noteTypeName, fieldsTable) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    const note = new Note(noteType, new Identity(fieldsTable[0]['Value']) as NoteId)
    try {
      for (const fieldRow of fieldsTable) {
        note.setFieldValue(fieldRow['Field'], fieldRow['Value'])
      }
      nr.save(note)
    } catch (e) {
      context.addError(e)
    }
  })

  when(/^User deletes '(.*)' note$/, (noteId) => {
    nr.delete(new Identity(noteId) as NoteId)
  })

  when(/^User can find note by '(.*)'$/, (noteId) => {
    const note = nr.get(new Identity(noteId) as NoteId)
    expect(note).toBeDefined()
  })

  when(/^User can't find note by '(.*)'$/, (noteId) => {
    const exists = nr.exists(new Identity(noteId) as NoteId)
    expect(exists).toBeFalsy()
  })

  /* -------------------------------------------------------------------------- */
  /*                                    Then                                    */
  /* -------------------------------------------------------------------------- */

  then(/^Note '(.*)' has the following cards:$/, (noteId, cardsTable) => {
    const note = nr.get(new Identity(noteId) as NoteId)
    const cardsGenerator = new CardsGenerationService(context.cardsRepository)
    cardsGenerator.generate(note)
    const cards = context.cardsRepository.find(ofNote(note) as IQuery)
    for(const cardRow of cardsTable) {
      const card = cards.find(x => x.type.name.value === cardRow['Card Type'])
      expect(card).toBeDefined()
    }
  })
}
