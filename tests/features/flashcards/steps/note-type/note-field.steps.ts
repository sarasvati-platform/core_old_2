import { StepDefinitions } from 'jest-cucumber'
import { Identity } from '@src/core/models'
import { NoteTypeId } from '@src/flashcards/models'
import { context } from '@tests/features/flashcards/context'
import { addField, changeFieldPosition, removeField, renameField } from '@tests/features/flashcards/commands'


export const noteTypeFieldsSteps: StepDefinitions = ({ when, then }) => {
  const ntr = context.noteTypeRepository
  const g = context.guard

  const convertFields = (fields: string[]) => {
    return fields.map(x => x.replace('<newline>', '\n').replace('<tab>', '\t'))
  }

  /* -------------------------------------------------------------------------- */
  /*                                    When                                    */
  /* -------------------------------------------------------------------------- */

  when(/^User adds '(.*)' field to the '(.*)' note type$/, (field: string, noteType) => {
    g(() => addField(noteType, convertFields([field])))
  })

  when(/^User adds the following fields to the '(.*)' note type:$/, (noteType: string, fields) => {
    g(() => addField(noteType, convertFields(fields.map(x => x['Field']))))
  })

  when(/^User removes '(.*)' field from '(.*)' note type$/, (fieldName: string, noteTypeName: string) => {
    g(() => removeField(noteTypeName, [fieldName]))
  })

  when(/^User renames '(.*)' field to '(.*)' of the '(.*)' note type$/, (oldName: string, newName: string, noteTypeName: string) => {
    g(() => renameField(noteTypeName, oldName, newName))
  })

  when(/^User changes position of '(.*)' field of '(.*)' note type to (-?\d+)$/, (field, noteType, position) => {
    g(() => changeFieldPosition(noteType, field, parseInt(position)))
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
