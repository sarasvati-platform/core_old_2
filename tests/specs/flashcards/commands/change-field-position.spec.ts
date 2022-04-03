import { CommandContext } from '@src/core/commands/commands'
import { ChangeFieldPosition } from '@src/flashcards/commands/note-type'
import { NoteField, NoteFieldName, NoteType, NoteTypeName } from '@src/flashcards/models'
import { FakeNoteTypeRepository } from '@tests/ports/repositories/fake-note-type-repository'

describe('ChangeFieldPosition', () => {
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
    sut.noteType.fields.add(new NoteField(new NoteFieldName('test0')))
    sut.noteType.fields.add(new NoteField(new NoteFieldName('test1')))
    sut.noteType.fields.add(new NoteField(new NoteFieldName('test2')))
    sut.repository.save(sut.noteType)
    sut.context.register('noteTypeRepository', sut.repository)
  })

  it('renames a note type', () => {
    const command = new ChangeFieldPosition(
      sut.noteType,
      new NoteFieldName('test0'),
      2
    )
    command.execute(sut.context)
    expect(sut.noteType.fields.all[2].name.value).toEqual('test0')
  })

  it('undo', () => {
    const command = new ChangeFieldPosition(
      sut.noteType,
      new NoteFieldName('test0'),
      2
    )
    command.execute(sut.context)
    command.undo(sut.context)
    expect(sut.noteType.fields.all[0].name.value).toEqual('test0')
  })

  // it('throws an error if the field does not exist', () => {
  //   const command = new ChangeFieldPosition(
  //     sut.noteType,
  //     new NoteFieldName('not-exist'),
  //     0
  //   )
  //   expect(() => command.execute(sut.context)).toThrow('Field not-exist not found')
  // })

})