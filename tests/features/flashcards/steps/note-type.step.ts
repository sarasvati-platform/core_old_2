import { StepDefinitions } from 'jest-cucumber'
import { Identity } from '@src/core/models/identity'
import { NoteType, NoteTypeName } from '@src/flashcards/models/note-type'
import { context } from '@tests/features/flashcards/context'
import { NoteField, NoteFieldName } from '@src/flashcards/models'

export const nodeTypesManageSteps: StepDefinitions = ({ when, then }) => {

  /* -------------------------------------------------------------------------- */
  /*                                    When                                    */
  /* -------------------------------------------------------------------------- */

  when(/^User creates '(.*)' note type$/, (noteTypeName) => {
    const noteType = new NoteType(new Identity(noteTypeName), new NoteTypeName(noteTypeName))
    context.noteTypeRepository.save(noteType)
  })

  when(/^User deletes '(.*)' note type$/, (noteTypeName) => {
    context.noteTypeRepository.delete(new Identity(noteTypeName))
  })

  when(/^User renames '(.*)' note type to '(.*)'$/, (noteTypeName, newNoteTypeName) => {
    const noteType = context.noteTypeRepository.get(new Identity(noteTypeName))
    if (!noteType) { throw new Error(`Note type '${noteTypeName}' not found`) }

    noteType.rename(new NoteTypeName(newNoteTypeName))
    context.noteTypeRepository.save(noteType)
  })

  when(/^User adds '(.*)' field to '(.*)' note type$/, (fieldName, noteTypeName) => {
    const noteType = context.noteTypeRepository.get(new Identity(noteTypeName))
    if (!noteType) { throw new Error(`Note type '${noteTypeName}' not found`) }

    const field = new NoteField(new NoteFieldName(fieldName))
    noteType.addField(field)
    context.noteTypeRepository.save(noteType)
  })

  /* -------------------------------------------------------------------------- */
  /*                                    Then                                    */
  /* -------------------------------------------------------------------------- */

  then(/^User has the following note types:$/, (noteTypeTable) => {
    for (const noteTypeRow of noteTypeTable) {
      const identity = new Identity(noteTypeRow['Note Type'])
      const noteType = context.noteTypeRepository.get(identity)

      expect(noteType).toBeDefined()
      expect(noteType?.name.value).toEqual(noteTypeRow['Note Type'])
    }
  })

  then(/^User has no '(.*)' note type$/, (noteTypeName) => {
    const noteType = context.noteTypeRepository.get(new Identity(noteTypeName))
    expect(noteType).toBeUndefined()
  })

  then(/^Note type '(.*)' has '(.*)' field$/, (noteTypeName, fieldName) => {
    const noteType = context.noteTypeRepository.get(new Identity(noteTypeName))
    if (!noteType) { throw new Error(`Note type '${noteTypeName}' not found`) }

    const count = noteType.fields.filter(field => field.name.value === fieldName).length
    expect(count).toEqual(1)
  })

}