import { StepDefinitions } from 'jest-cucumber'
import { Identity } from '@src/core/models'
import { NoteTypeId, NoteField, NoteFieldName } from '@src/flashcards/models'
import { context } from '@tests/features/flashcards/context'

export const noteTypeFieldsSteps: StepDefinitions = ({ when, then }) => {

  /* -------------------------------------------------------------------------- */
  /*                                   Helpers                                  */
  /* -------------------------------------------------------------------------- */

  const ntr = context.noteTypeRepository

  const guard = (func) => {
    try { func() } catch (e) { context.addError(e) }
  }

  const convertFields = (fields: string[]) => {
    return fields.map(x => x.replace('<newline>', '\n').replace('<tab>', '\t'))
  }

  const addField = (noteTypeId: string, fields: string[]) =>{
    const noteType = ntr.get(new Identity(noteTypeId) as NoteTypeId)
    for(const field of fields) {
      const name = new NoteFieldName(field)
      noteType.fields.add(new NoteField(name))
    }
    ntr.save(noteType)
  }

  const removeField = (noteTypeId: string, fields: string[]) => {
    const noteType = ntr.get(new Identity(noteTypeId) as NoteTypeId)
    for(const field of fields) {
      const f = noteType.fields.getByName(field)
      noteType.fields.remove(f)
    }
    ntr.save(noteType)
  }

  const renameField = (noteTypeId: string, field: string, newName: string) => {
    const noteType = ntr.get(new Identity(noteTypeId) as NoteTypeId)
    const f = noteType.fields.getByName(field)
    f.rename(new NoteFieldName(newName))
    ntr.save(noteType)
  }

  const changePosition = (noteTypeId: string, field: string, index: number) => {
    const noteType = ntr.get(new Identity(noteTypeId) as NoteTypeId)
    const f = noteType.fields.getByName(field)
    noteType.fields.setPositionOf(f).to(index)
  }

  /* -------------------------------------------------------------------------- */
  /*                                    When                                    */
  /* -------------------------------------------------------------------------- */

  when(/^User adds '(.*)' field to the '(.*)' note type$/, (field: string, noteType) => {
    guard(() => addField(noteType, convertFields([field])))
  })

  when(/^User adds the following fields to the '(.*)' note type:$/, (noteType: string, fields) => {
    guard(() => addField(noteType, convertFields(fields.map(x => x['Field']))))
  })

  when(/^User removes '(.*)' field from '(.*)' note type$/, (fieldName: string, noteTypeName: string) => {
    guard(() => removeField(noteTypeName, [fieldName]))
  })

  when(/^User renames '(.*)' field to '(.*)' of the '(.*)' note type$/, (oldName: string, newName: string, noteTypeName: string) => {
    guard(() => renameField(noteTypeName, oldName, newName))
  })

  when(/^User changes position of '(.*)' field of '(.*)' note type to (-?\d+)$/, (field, noteType, position) => {
    guard(() => changePosition(noteType, field, parseInt(position)))
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
