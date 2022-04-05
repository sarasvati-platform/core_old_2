import { DeleteNoteType } from '@src/flashcards/commands/note-type'
import { NoteType, NoteTypeName } from '@src/flashcards/models'
import { Context } from './context'

describe('DeleteNoteType', () => {
  let context: Context
  let noteType: NoteType
  let command: DeleteNoteType

  beforeEach(() => {
    context = new Context()
    noteType = new NoteType(new NoteTypeName('test'))
    command = new DeleteNoteType(noteType.identity)
    context.noteTypeRepository.save(noteType)
  })

  it('.execute()', () => {
    context.execute(command)
    expect(context.noteTypeRepository.exists(noteType.identity)).toBeFalsy()
  })

  it('.undo()', () => {
    context.executeAndUndo(command)
    expect(context.noteTypeRepository.exists(noteType.identity)).toBeTruthy()
  })
})