import { StepDefinitions } from 'jest-cucumber'
import { Identity } from '@src/core/models'
import { NoteTypeId, NoteField, NoteFieldName } from '@src/flashcards/models'
import { context } from '@tests/features/flashcards/context'

export const noteTypeFieldsSteps: StepDefinitions = ({ when, then }) => {
  const ntr = context.noteTypeRepository

  /* -------------------------------------------------------------------------- */
  /*                                    When                                    */
  /* -------------------------------------------------------------------------- */

  when(/^User adds '(.*)' field to the '(.*)' note type$/, (fieldName: string, noteTypeName) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    try {
      fieldName = fieldName.replace('<newline>', '\n').replace('<tab>', '\t')
      const name = new NoteFieldName(fieldName)
      noteType.fields.add(new NoteField(name))
    } catch (e) {
      context.addError(e)
    }
  })

  when(/^User adds the following fields to the '(.*)' note type:$/, (noteTypeName: string, fieldsTable) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    try {
      for(const fieldRow of fieldsTable) {
        const fieldName = fieldRow['Field'].replace('<newline>', '\n').replace('<tab>', '\t')
        const name = new NoteFieldName(fieldName)
        noteType.fields.add(new NoteField(name))
      }
    } catch (e) {
      context.addError(e)
    }
  })

  when(/^User removes '(.*)' field from '(.*)' note type$/, (fieldName: string, noteTypeName: string) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    const field = noteType.fields.findByName(fieldName)
    if (!field) { throw new Error(`Field '${fieldName}' not found`) }
    noteType.fields.remove(field)
  })

  when(/^User renames '(.*)' field to '(.*)' of the '(.*)' note type$/, (oldFieldName: string, newFieldName: string, noteTypeName: string) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    const field = noteType.fields.findByName(oldFieldName)
    if (!field) { throw new Error(`Field '${oldFieldName}' not found`) }
    try {
      field.rename(new NoteFieldName(newFieldName))
    } catch (e) {
      context.addError(e)
    }
  })
  when(/^User changes position of '(.*)' field of '(.*)' note type to (-?\d+)$/, (fieldName, noteTypeName, position) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    const field = noteType.fields.findByName(fieldName)
    if (!field) { throw new Error(`Field '${fieldName}' not found`) }
    try {
      noteType.fields.setPositionOf(field).to(parseInt(position))
    } catch (e) {
      context.addError(e)
    }
  })

  /* -------------------------------------------------------------------------- */
  /*                                    Then                                    */
  /* -------------------------------------------------------------------------- */

  then(/^Note type '(.*)' has '(.*)' field$/, (noteTypeName, fieldName) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    const field = noteType.fields.findByName(fieldName)
    expect(field).toBeDefined()
  })

  then(/^Note type '(.*)' has no '(.*)' field$/, (noteTypeName, fieldName) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    const field = noteType.fields.findByName(fieldName)
    expect(field).toBeUndefined()
  })

  then(/^Note type '(.*)' has the following fields:$/, (noteTypeName: string, fieldsTable) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    for(const fieldRow of fieldsTable) {
      const exist = noteType.fields.findByName(fieldRow['Field'])
      expect(exist).toBeDefined()
    }
  })
}
