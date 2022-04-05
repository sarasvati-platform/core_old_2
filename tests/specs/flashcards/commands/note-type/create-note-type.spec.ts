import { Identity } from '@src/core/models'
import { CreateNoteType } from '@src/flashcards/commands/note-type'
import { NoteTypeId, NoteTypeName } from '@src/flashcards/models'
import { Context } from '@tests/specs/flashcards/commands/context'

describe('CreateNoteType', () => {
  let context: Context
  let identity: NoteTypeId
  let command: CreateNoteType

  beforeEach(() => {
    identity = new Identity() as NoteTypeId
    context = new Context()
    command = new CreateNoteType(
      new NoteTypeName('test'), [], identity
    )
  })

  it('.execute()', () => {
    context.execute(command)
    expect(command.result).toBeDefined()
    expect(context.noteTypeRepository.exists(identity)).toBeTruthy()
  })

  it('.undo()', () => {
    context.executeAndUndo(command)
    expect(context.noteTypeRepository.exists(identity)).toBeFalsy()
  })
})