import { StepDefinitions } from 'jest-cucumber'
import { Identity } from '@src/core/models'
import { NoteField, NoteFieldName, NoteType, NoteTypeId, NoteTypeName } from '@src/flashcards/models'
import { context } from '@tests/features/flashcards/context'

export const noteTypesSteps: StepDefinitions = ({ when, then }) => {
  const ntr = context.noteTypeRepository

  /* -------------------------------------------------------------------------- */
  /*                                    When                                    */
  /* -------------------------------------------------------------------------- */

  when(/^User creates '(.*)' note type$/, (noteTypeName) => {
    const noteType = new NoteType(
      new NoteTypeName(noteTypeName),
      new Identity(noteTypeName) as NoteTypeId
    )
    ntr.save(noteType)
  })

  when(/^User creates '(.*)' note type with the following fields:$/, (noteTypeName, fieldsTable) => {
    const noteType = new NoteType(new NoteTypeName(noteTypeName), new Identity(noteTypeName) as NoteTypeId)
    for(const fieldRow of fieldsTable) {
      noteType.fields.add(new NoteField(new NoteFieldName(fieldRow['Field'])))
    }
    ntr.save(noteType)
  })

  when(/^User deletes '(.*)' note type$/, (noteTypeName) => {
    ntr.delete(new Identity(noteTypeName) as NoteTypeId)
  })

  when(/^User renames '(.*)' note type to '(.*)'$/, (noteTypeName, newNoteTypeName) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    noteType.rename(new NoteTypeName(newNoteTypeName))
    ntr.save(noteType)
  })

  /* -------------------------------------------------------------------------- */
  /*                                    Then                                    */
  /* -------------------------------------------------------------------------- */

  then(/^User has the following note types:$/, (noteTypeTable) => {
    for (const noteTypeRow of noteTypeTable) {
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
