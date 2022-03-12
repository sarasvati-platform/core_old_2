import { StepDefinitions } from 'jest-cucumber'
import { Identity } from '@src/core/models'
import { NoteType, NoteTypeId, NoteTypeName } from '@src/flashcards/models'
import { NoteField, NoteFieldName } from '@src/flashcards/models'
import { context } from '@tests/features/flashcards/context'

export const nodeTypesManageSteps: StepDefinitions = ({ when, then }) => {

  /* -------------------------------------------------------------------------- */
  /*                                    When                                    */
  /* -------------------------------------------------------------------------- */

  when(/^User creates '(.*)' note type$/, (noteTypeName) => {
    const noteType = new NoteType(
      new NoteTypeName(noteTypeName),
      new Identity(noteTypeName) as NoteTypeId
    )
    context.noteTypeRepository.save(noteType)
  })

  when(/^User deletes '(.*)' note type$/, (noteTypeName) => {
    context.noteTypeRepository.delete(new Identity(noteTypeName) as NoteTypeId)
  })

  when(/^User renames '(.*)' note type to '(.*)'$/, (noteTypeName, newNoteTypeName) => {
    const noteType = context.noteTypeRepository.get(new Identity(noteTypeName) as NoteTypeId)
    if (!noteType) { throw new Error(`Note type '${noteTypeName}' not found`) }

    noteType.rename(new NoteTypeName(newNoteTypeName))
    context.noteTypeRepository.save(noteType)
  })

  when(/^User adds '(.*)' field to '(.*)' note type$/, (fieldName: string, noteTypeName) => {
    const noteType = context.noteTypeRepository.get(new Identity(noteTypeName) as NoteTypeId)

    try {
      fieldName = fieldName.replace('<newline>', '\n').replace('<tab>', '\t')
      noteType.addField(
        new NoteField(new NoteFieldName(fieldName))
      )
    } catch (e) {
      context.addError(e)
    }
  })

  /* -------------------------------------------------------------------------- */
  /*                                    Then                                    */
  /* -------------------------------------------------------------------------- */

  then(/^User has the following note types:$/, (noteTypeTable) => {
    for (const noteTypeRow of noteTypeTable) {
      const identity = new Identity(noteTypeRow['Note Type']) as NoteTypeId
      const noteType = context.noteTypeRepository.get(identity)

      expect(noteType).toBeDefined()
      expect(noteType?.name.value).toEqual(noteTypeRow['Note Type'])
    }
  })

  then(/^User has no '(.*)' note type$/, (noteTypeName) => {
    const exists = context.noteTypeRepository.exists(new Identity(noteTypeName) as NoteTypeId)
    expect(exists).toBeFalsy()
  })

  then(/^Note type '(.*)' has '(.*)' field$/, (noteTypeName, fieldName) => {
    const noteType = context.noteTypeRepository.get(new Identity(noteTypeName) as NoteTypeId)

    const count = noteType.fields.filter(field => field.name.value === fieldName).length
    expect(count).toEqual(1)
  })

}