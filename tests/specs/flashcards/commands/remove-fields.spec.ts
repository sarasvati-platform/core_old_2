import { RemoveField } from '@src/flashcards/commands/note-type'
import { NoteField, NoteFieldName, NoteType, NoteTypeName } from '@src/flashcards/models'
import { Context } from './context'

describe('RemoveField', () => {
  let context: Context
  let noteType: NoteType
  let command: RemoveField

  beforeEach(() => {
    context = new Context()
    noteType = new NoteType(new NoteTypeName('test'))
    command = new RemoveField(
      noteType,
      new NoteFieldName('test')
    )
    noteType.fields.add(new NoteField(new NoteFieldName('test')))
    context.noteTypeRepository.save(noteType)
  })

  it('.execute()', () => {
    context.execute(command)
    expect(noteType.fields.all.length).toEqual(0)
  })

  it('.undo()', () => {
    context.executeAndUndo(command)
    expect(noteType.fields.all.length).toEqual(1)
  })

  // it('throws an error if the field does not exist', () => {
  //   const command = new RemoveField(
  //     noteType,
  //     new NoteFieldName('not-exist')
  //   )
  //   expect(() => command.execute(context)).toThrow('Field not-exist not found')
  // })
})