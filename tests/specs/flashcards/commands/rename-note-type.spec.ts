import { RenameNoteType } from '@src/flashcards/commands/note-type'
import { NoteType, NoteTypeName } from '@src/flashcards/models'
import { Context } from './context'

describe('RenameNoteType', () => {
  let context: Context
  let noteType: NoteType
  let command: RenameNoteType

  beforeEach(() => {
    context = new Context()
    noteType = new NoteType(new NoteTypeName('test'))
    command = new RenameNoteType(
      noteType, new NoteTypeName('new name')
    )
  })

  it('.execute()', () => {
    context.execute(command)
    expect(noteType.name.value).toEqual('new name')
  })

  it('.undo()', () => {
    context.executeAndUndo(command)
    expect(noteType.name.value).toEqual('test')
  })
})