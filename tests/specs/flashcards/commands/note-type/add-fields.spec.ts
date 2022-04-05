import { AddField } from '@src/flashcards/commands/note-type'
import { NoteFieldName, NoteType, NoteTypeName } from '@src/flashcards/models'
import { Context } from '@tests/specs/flashcards/commands/context'

describe('AddField', () => {
  let context: Context
  let noteType: NoteType
  let command: AddField

  beforeEach(() => {
    noteType = new NoteType(new NoteTypeName('test'))
    context = new Context(),
    command = new AddField(
      noteType, new NoteFieldName('test')
    )
    context.noteTypeRepository.save(noteType)
  })

  it('.execute()', () => {
    context.execute(command)
    expect(noteType.fields.all.length).toEqual(1)
  })

  it('.undo()', () => {
    context.executeAndUndo(command)
    expect(noteType.fields.all.length).toEqual(0)
  })
})