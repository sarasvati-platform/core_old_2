import { RenameField } from '@src/flashcards/commands/note-type'
import { NoteField, NoteFieldName, NoteType, NoteTypeName } from '@src/flashcards/models'
import { Context } from '@tests/specs/flashcards/commands/context'

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
})