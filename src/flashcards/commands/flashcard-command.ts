import { Command, CommandContext } from '@src/core/commands/commands'
import { INoteTypeRepository } from '@src/flashcards/ports/repositories'


export abstract class FlashcardCommand<T> extends Command<T> {
  protected noteTypeRepository: INoteTypeRepository

  public execute(context: CommandContext): void {
    this.noteTypeRepository = context.get('noteTypeRepository') as INoteTypeRepository
    this.onExecute()
  }

  public undo(context: CommandContext): void {
    this.noteTypeRepository = context.get('noteTypeRepository') as INoteTypeRepository
    this.onUndo()
  }

  protected abstract onExecute(): void;
  protected abstract onUndo(): void;
}
