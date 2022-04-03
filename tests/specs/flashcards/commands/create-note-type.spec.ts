import { CommandContext } from '@src/core/commands/commands'
import { Identity } from '@src/core/models'
import { CreateNoteType } from '@src/flashcards/commands/note-type'
import { NoteTypeId, NoteTypeName } from '@src/flashcards/models'
import { FakeNoteTypeRepository } from '@tests/ports/repositories/fake-note-type-repository'

describe('CreateNoteType', () => {
  let sut: {
    context: CommandContext,
    repository: FakeNoteTypeRepository,
  }

  beforeEach(() => {
    sut = {
      context: new CommandContext(),
      repository: new FakeNoteTypeRepository(true),
    }
    sut.context.register('noteTypeRepository', sut.repository)
  })

  it('creates a note type', () => {
    const identity = new Identity() as NoteTypeId
    const command = new CreateNoteType(
      new NoteTypeName('test'), [], identity
    )
    command.execute(sut.context)
    expect(command.result).toBeDefined()
    expect(sut.repository.exists(identity)).toBeTruthy()
  })

  it('undo', () => {
    const identity = new Identity() as NoteTypeId
    const command = new CreateNoteType(
      new NoteTypeName('test'),
      [], identity
    )
    command.execute(sut.context)
    command.undo(sut.context)
    expect(sut.repository.exists(identity)).toBeFalsy()
  })
})