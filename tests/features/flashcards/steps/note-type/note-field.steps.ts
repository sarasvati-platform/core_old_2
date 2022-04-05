import { Identity } from '@src/core/models'
import { AddField, ChangeFieldPosition, RemoveField, RenameField } from '@src/flashcards/commands/note-type'
import { NoteFieldName, NoteTypeId } from '@src/flashcards/models'
import { context, ex } from '@tests/features/flashcards/context'
import { StepDefinitions } from 'jest-cucumber'

export const noteTypeFieldsSteps: StepDefinitions = ({ when, then }) => {
  const ntr = () => context.noteTypeRepository
  const getNoteType = (name: string) => ntr().get(new Identity(name) as NoteTypeId)

  const convertField = (name: string) : NoteFieldName => {
    return new NoteFieldName(name.replace('<newline>', '\n').replace('<tab>', '\t'))
  }

  /* -------------------------------------------------------------------------- */
  /*                                    When                                    */
  /* -------------------------------------------------------------------------- */

  when(/^User adds '(.*)' field to the '(.*)' note type$/, ex((field: string, noteType) => {
    return new AddField(getNoteType(noteType), convertField(field))
  }))

  when(/^User adds the following fields to the '(.*)' note type:$/, ex((noteType: string, fields) => {
    return fields.map(x => new AddField(getNoteType(noteType), convertField(x['Field'])))
  }))

  when(/^User removes '(.*)' field from '(.*)' note type$/, ex((fieldName: string, noteType: string) => {
    return new RemoveField(getNoteType(noteType), new NoteFieldName(fieldName))
  }))

  when(/^User renames '(.*)' field to '(.*)' of the '(.*)' note type$/, ex((oldName: string, newName: string, noteType: string) => {
    return new RenameField(getNoteType(noteType), new NoteFieldName(oldName), new NoteFieldName(newName))
  }))

  when(/^User changes position of '(.*)' field of '(.*)' note type to (-?\d+)$/, ex((field, noteType, position) => {
    return new ChangeFieldPosition(getNoteType(noteType), new NoteFieldName(field), position - 1)
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
