import { StepDefinitions } from 'jest-cucumber'
import { Identity } from '@src/core/models'
import { NoteTypeId, } from '@src/flashcards/models'
import { context } from '@tests/features/flashcards/context'
import { createNoteType, deleteNoteType, renameNoteType } from '@tests/features/flashcards/commands'


export const noteTypesSteps: StepDefinitions = ({ when, then }) => {
  const ntr = context.noteTypeRepository
  const g = context.guard

  /* -------------------------------------------------------------------------- */
  /*                                    When                                    */
  /* -------------------------------------------------------------------------- */

  when(/^User creates '(.*)' note type$/, (name) => {
    g(() => createNoteType(name, []))
  })

  when(/^User creates '(.*)' note type with the following fields:$/, (name, fields) => {
    g(() => createNoteType(name, fields.map(x => x['Field'])))
  })

  when(/^User deletes '(.*)' note type$/, (name) => {
    g(() => deleteNoteType(name))
  })

  when(/^User renames '(.*)' note type to '(.*)'$/, (name, newName) => {
    g(() => renameNoteType(name, newName))
  })

  /* -------------------------------------------------------------------------- */
  /*                                    Then                                    */
  /* -------------------------------------------------------------------------- */

  then(/^User has the following note types:$/, (noteTypes) => {
    for (const noteTypeRow of noteTypes) {
      const identity = new Identity(noteTypeRow['Note Type']) as NoteTypeId
      const noteType = ntr.get(identity)

      expect(noteType).toBeDefined()
      expect(noteType?.name.value).toEqual(noteTypeRow['Note Type'])
    }
  })

  then(/^User has no '(.*)' note type$/, (noteTypeName) => {
    const exists = ntr.exists(new Identity(noteTypeName) as NoteTypeId)
    expect(exists).toBeFalsy()
  })
}
