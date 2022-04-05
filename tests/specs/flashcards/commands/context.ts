import { ICommand, CommandContext } from '@src/core/commands/commands'
import { FakeNoteTypeRepository } from '@tests/ports/repositories/fake-note-type-repository'

export class Context {
  constructor(
    public readonly noteTypeRepository = new FakeNoteTypeRepository(true),
    public readonly commandContext = new CommandContext(),
  ) {
    this.commandContext.register('noteTypeRepository', this.noteTypeRepository)
  }

  execute<T>(command: ICommand<T>) {
    command.execute(this.commandContext)
  }

  executeAndUndo<T>(command: ICommand<T>) {
    command.execute(this.commandContext)
    command.undo(this.commandContext)
  }
}