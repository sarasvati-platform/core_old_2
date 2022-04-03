import { CommandContext } from '@src/core/commands/commands'
import { AddFields } from '@src/flashcards/commands/note-type'
import { NoteFieldName, NoteType, NoteTypeName } from '@src/flashcards/models'
import { FakeNoteTypeRepository } from '@tests/ports/repositories/fake-note-type-repository'

describe('AddFields', () => {
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
    const command = new AddFields(
      sut.noteType,
      [new NoteFieldName('test')]
    )
    command.execute(sut.context)
    expect(sut.noteType.fields.all.length).toEqual(1)
  })

  it('undo', () => {
    const command = new AddFields(
      sut.noteType,
      [new NoteFieldName('test')]
    )
    command.execute(sut.context)
    command.undo(sut.context)
    expect(sut.noteType.fields.all.length).toEqual(0)
  })
})