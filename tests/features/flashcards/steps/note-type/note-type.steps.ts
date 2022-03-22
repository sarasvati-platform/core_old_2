import { StepDefinitions } from 'jest-cucumber'
import { Identity } from '@src/core/models'
import { NoteField, NoteFieldName, NoteType, NoteTypeId, NoteTypeName } from '@src/flashcards/models'
import { context } from '@tests/features/flashcards/context'

export const noteTypesSteps: StepDefinitions = ({ when, then }) => {

  /* -------------------------------------------------------------------------- */
  /*                                   Helpers                                  */
  /* -------------------------------------------------------------------------- */

  const ntr = context.noteTypeRepository

  const createNoteType = (name: string, fields: string[]) => {
    const noteType = new NoteType(
      new NoteTypeName(name),
      new Identity(name) as NoteTypeId
    )
    for(const field of fields) {
      noteType.fields.add(
        new NoteField(new NoteFieldName(field))
      )
    }
    ntr.save(noteType)
  }

  const deleteNoteType = (name: string) => {
    ntr.delete(new Identity(name) as NoteTypeId)
  }

  const renameNoteType = (name: string, newName: string) => {
    const noteType = ntr.get(new Identity(name) as NoteTypeId)
    noteType.rename(new NoteTypeName(newName))
    ntr.save(noteType)
  }

  /* -------------------------------------------------------------------------- */
  /*                                    When                                    */
  /* -------------------------------------------------------------------------- */

  when(/^User creates '(.*)' note type$/, (name) => {
    createNoteType(name, [])
  })

  when(/^User creates '(.*)' note type with the following fields:$/, (name, fields) => {
    createNoteType(name, fields.map(x => x['Field']))
  })

  when(/^User deletes '(.*)' note type$/, (name) => {
    deleteNoteType(name)
  })

  when(/^User renames '(.*)' note type to '(.*)'$/, (name, newName) => {
    renameNoteType(name, newName)
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
