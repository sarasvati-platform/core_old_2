import { CommandContext } from '@src/core/commands/commands'
import { RenameNoteType } from '@src/flashcards/commands/note-type'
import { NoteType, NoteTypeName } from '@src/flashcards/models'
import { FakeNoteTypeRepository } from '@tests/ports/repositories/fake-note-type-repository'

describe('RenameNoteType', () => {
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
    const command = new RenameNoteType(
      sut.noteType,
      new NoteTypeName('new name')
    )
    command.execute(sut.context)
    expect(sut.noteType.name.value).toEqual('new name')
  })

  it('undo', () => {
    const command = new RenameNoteType(
      sut.noteType,
      new NoteTypeName('new name')
    )
    command.execute(sut.context)
    command.undo(sut.context)
    expect(sut.noteType.name.value).toEqual('test')
  })
})