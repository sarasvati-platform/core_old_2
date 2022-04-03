import { Identity } from '@src/core/models'
import { CreateNoteType, DeleteNoteType, RenameNoteType } from '@src/flashcards/commands/note-type'
import { NoteField, NoteFieldName, NoteTypeId, NoteTypeName } from '@src/flashcards/models'
import { context, ex } from '@tests/features/flashcards/context'
import { StepDefinitions } from 'jest-cucumber'

export const noteTypesSteps: StepDefinitions = ({ when, then }) => {
  const ntr = () => context.noteTypeRepository

  /* -------------------------------------------------------------------------- */
  /*                                    When                                    */
  /* -------------------------------------------------------------------------- */

  when(/^User creates '(.*)' note type$/, ex((name) => {
    return new CreateNoteType(
      new NoteTypeName(name), [],
      new Identity(name) as NoteTypeId
    )
  }))

  when(/^User creates '(.*)' note type with the following fields:$/, ex((name, fields) => {
    return new CreateNoteType(
      new NoteTypeName(name),
      fields.map(f => new NoteField(new NoteFieldName(f['Field']))),
      new Identity(name) as NoteTypeId
    )
  }))

  when(/^User deletes '(.*)' note type$/, ex((name) => {
    return new DeleteNoteType(new Identity(name) as NoteTypeId)
  }))

  when(/^User renames '(.*)' note type to '(.*)'$/, ex((name, newName) => {
    const noteType = ntr().get(new Identity(name) as NoteTypeId)
    return new RenameNoteType(noteType, new NoteTypeName(newName))
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
