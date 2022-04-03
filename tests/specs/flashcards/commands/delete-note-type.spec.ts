import { CommandContext } from '@src/core/commands/commands'
import { DeleteNoteType } from '@src/flashcards/commands/note-type'
import { NoteType, NoteTypeName } from '@src/flashcards/models'
import { FakeNoteTypeRepository } from '@tests/ports/repositories/fake-note-type-repository'

describe('DeleteNoteType', () => {
  let sut: {
    context: CommandContext,
    repository: FakeNoteTypeRepository,
    noteType: NoteType,
  }

  beforeEach(() => {
    sut = {
      context: new CommandContext(),
      repository: new FakeNoteTypeRepository(true),
      noteType: new NoteType(new NoteTypeName('test'))
    }
    sut.repository.save(sut.noteType)
    sut.context.register('noteTypeRepository', sut.repository)
  })

  it('renames a note type', () => {
    const command = new DeleteNoteType(
      sut.noteType.identity
    )
    command.execute(sut.context)
    expect(sut.repository.exists(sut.noteType.identity)).toBeFalsy()
  })

  it('undo', () => {
    const command = new DeleteNoteType(
      sut.noteType.identity
    )
    command.execute(sut.context)
    command.undo(sut.context)
    expect(sut.repository.exists(sut.noteType.identity)).toBeTruthy()
  })
})