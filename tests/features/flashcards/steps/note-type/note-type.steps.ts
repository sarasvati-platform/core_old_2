import { Identity } from '@src/core/models'
import { NoteTypeId } from '@src/flashcards/models'
import { createNoteType, deleteNoteType, renameNoteType } from '@tests/features/flashcards/commands'
import { context, guard } from '@tests/features/flashcards/context'
import { StepDefinitions } from 'jest-cucumber'

export const noteTypesSteps: StepDefinitions = ({ when, then }) => {
  const ntr = () => context.noteTypeRepository

  /* -------------------------------------------------------------------------- */
  /*                                    When                                    */
  /* -------------------------------------------------------------------------- */

  when(/^User creates '(.*)' note type$/, guard((name) => {
    createNoteType(name, [])
  }))

  when(/^User creates '(.*)' note type with the following fields:$/, guard((name, fields) => {
    createNoteType(name, fields.map(x => x['Field']))
  }))

  when(/^User deletes '(.*)' note type$/, guard((name) => {
    deleteNoteType(name)
  }))

  when(/^User renames '(.*)' note type to '(.*)'$/, guard((name, newName) => {
    renameNoteType(name, newName)
  }))

  /* -------------------------------------------------------------------------- */
  /*                                    Then                                    */
  /* -------------------------------------------------------------------------- */

  then(/^User has the following note types:$/, (noteTypes) => {
    for (const noteTypeRow of noteTypes) {
      const identity = new Identity(noteTypeRow['Note Type']) as NoteTypeId
      const noteType = ntr().get(identity)

      expect(noteType).toBeDefined()
      expect(noteType?.name.value).toEqual(noteTypeRow['Note Type'])
    }
  })

  then(/^User has no '(.*)' note type$/, (noteTypeName) => {
    const exists = ntr().exists(new Identity(noteTypeName) as NoteTypeId)
    expect(exists).toBeFalsy()
  })
}
