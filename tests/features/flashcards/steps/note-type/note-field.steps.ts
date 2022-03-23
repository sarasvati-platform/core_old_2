import { Identity } from '@src/core/models'
import { NoteTypeId } from '@src/flashcards/models'
import { addField, changeFieldPosition, removeField, renameField } from '@tests/features/flashcards/commands'
import { context, guard } from '@tests/features/flashcards/context'
import { StepDefinitions } from 'jest-cucumber'


export const noteTypeFieldsSteps: StepDefinitions = ({ when, then }) => {
  const ntr = () => context.noteTypeRepository

  const convertFields = (fields: string[]) => {
    return fields.map(x => x.replace('<newline>', '\n').replace('<tab>', '\t'))
  }

  /* -------------------------------------------------------------------------- */
  /*                                    When                                    */
  /* -------------------------------------------------------------------------- */

  when(/^User adds '(.*)' field to the '(.*)' note type$/, guard((field: string, noteType) => {
    addField(noteType, convertFields([field]))
  }))

  when(/^User adds the following fields to the '(.*)' note type:$/, guard((noteType: string, fields) => {
    addField(noteType, convertFields(fields.map(x => x['Field'])))
  }))

  when(/^User removes '(.*)' field from '(.*)' note type$/, guard((fieldName: string, noteTypeName: string) => {
    removeField(noteTypeName, [fieldName])
  }))

  when(/^User renames '(.*)' field to '(.*)' of the '(.*)' note type$/, guard((oldName: string, newName: string, noteTypeName: string) => {
    renameField(noteTypeName, oldName, newName)
  }))

  when(/^User changes position of '(.*)' field of '(.*)' note type to (-?\d+)$/, guard((field, noteType, position) => {
    changeFieldPosition(noteType, field, parseInt(position))
  }))

  /* -------------------------------------------------------------------------- */
  /*                                    Then                                    */
  /* -------------------------------------------------------------------------- */

  then(/^Note type '(.*)' has '(.*)' field$/, (noteTypeName, fieldName) => {
    const noteType = ntr().get(new Identity(noteTypeName) as NoteTypeId)
    const field = noteType.fields.findByName(fieldName)
    expect(field).toBeDefined()
  })

  then(/^Note type '(.*)' has no '(.*)' field$/, (noteTypeName, fieldName) => {
    const noteType = ntr().get(new Identity(noteTypeName) as NoteTypeId)
    const field = noteType.fields.findByName(fieldName)
    expect(field).toBeUndefined()
  })

  then(/^Note type '(.*)' has the following fields:$/, (noteTypeName: string, fieldsTable) => {
    const noteType = ntr().get(new Identity(noteTypeName) as NoteTypeId)
    for(const fieldRow of fieldsTable) {
      const exist = noteType.fields.findByName(fieldRow['Field'])
      expect(exist).toBeDefined()
    }
  })
}
