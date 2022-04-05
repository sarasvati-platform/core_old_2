import { RenameField } from '@src/flashcards/commands/note-type'
import { NoteField, NoteFieldName, NoteType, NoteTypeName } from '@src/flashcards/models'
import { Context } from './context'

describe('RenameField', () => {
  let context: Context
  let noteType: NoteType
  let command: RenameField

  beforeEach(() => {
    context = new Context(),
    noteType = new NoteType(new NoteTypeName('test'))
    noteType.fields.add(new NoteField(new NoteFieldName('test')))
    command = new RenameField(
      noteType,
      new NoteFieldName('test'),
      new NoteFieldName('new test')
    )
  })

  it('renames a note type', () => {
    context.execute(command)
    expect(noteType.fields.all[0].name.value).toEqual('new test')
  })

  it('undo', () => {
    context.executeAndUndo(command)
    expect(noteType.fields.all[0].name.value).toEqual('test')
  })

  // it('throws an error if the field does not exist', () => {
  //   const command = new RenameField(
  //     noteType,
  //     new NoteFieldName('not-exist'),
  //     new NoteFieldName('not-exist-new'),
  //   )
  //   expect(() => command.execute(context)).toThrow('Field not-exist not found')
  // })
})