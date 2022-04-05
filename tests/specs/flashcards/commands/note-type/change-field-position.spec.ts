import { ChangeFieldPosition } from '@src/flashcards/commands/note-type'
import { NoteField, NoteFieldName, NoteType, NoteTypeName } from '@src/flashcards/models'
import { Context } from '@tests/specs/flashcards/commands/context'

describe('ChangeFieldPosition', () => {
  let context: Context
  let noteType: NoteType
  let command: ChangeFieldPosition

  beforeEach(() => {
    noteType = new NoteType(new NoteTypeName('test'))
    context = new Context()
    command = new ChangeFieldPosition(
      noteType,
      new NoteFieldName('test0'),
      2
    )
    noteType.fields.add(new NoteField(new NoteFieldName('test0')))
    noteType.fields.add(new NoteField(new NoteFieldName('test1')))
    noteType.fields.add(new NoteField(new NoteFieldName('test2')))
    context.noteTypeRepository.save(noteType)
  })

  it('.execute()', () => {
    context.execute(command)
    expect(noteType.fields.all[2].name.value).toEqual('test0')
  })

  it('.undo()', () => {
    context.executeAndUndo(command)
    expect(noteType.fields.all[0].name.value).toEqual('test0')
  })
})