import { CommandContext } from '@src/core/commands/commands'
import { RemoveField } from '@src/flashcards/commands/note-type'
import { NoteField, NoteFieldName, NoteType, NoteTypeName } from '@src/flashcards/models'
import { FakeNoteTypeRepository } from '@tests/ports/repositories/fake-note-type-repository'

describe('RemoveField', () => {
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
    sut.noteType.fields.add(new NoteField(new NoteFieldName('test')))
    sut.repository.save(sut.noteType)
    sut.context.register('noteTypeRepository', sut.repository)
  })

  it('renames a note type', () => {
    const command = new RemoveField(
      sut.noteType,
      new NoteFieldName('test')
    )
    command.execute(sut.context)
    expect(sut.noteType.fields.all.length).toEqual(0)
  })

  it('undo', () => {
    const command = new RemoveField(
      sut.noteType,
      new NoteFieldName('test')
    )
    command.execute(sut.context)
    command.undo(sut.context)
    expect(sut.noteType.fields.all.length).toEqual(1)
  })

  // it('throws an error if the field does not exist', () => {
  //   const command = new RemoveField(
  //     sut.noteType,
  //     new NoteFieldName('not-exist')
  //   )
  //   expect(() => command.execute(sut.context)).toThrow('Field not-exist not found')
  // })
})