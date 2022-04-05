import { Command, CommandContext } from '@src/core/commands/commands'
import { INoteTypeRepository, INoteRepository, ICardRepository } from '@src/flashcards/ports/repositories'
import { FakeNoteTypeRepository, FakeNoteRepository, FakeCardRepository } from '@tests/ports/repositories/fake-note-type-repository'
import { ManageCollectionStructure } from './commands'

class Context {
  clear() {
    this.errors = []
    this.commands = []
    this.noteTypeRepository = new FakeNoteTypeRepository()
    this.noteRepository = new FakeNoteRepository()
    this.cardsRepository = new FakeCardRepository()
    this.manageCollection = new ManageCollectionStructure(
      this.noteTypeRepository,
      this.noteRepository
    )
  }

  execute<T>(command: Command<T>): T {
    const ec = new CommandContext()
    ec.register('noteTypeRepository', this.noteTypeRepository)
    try { command.execute(ec) } catch (e) { this.addError(e) }
    this.commands.push(command)
    return command.result as T
  }

  undo() {
    const ec = new CommandContext()
    ec.register('noteTypeRepository', this.noteTypeRepository)
    this.commands.pop()?.undo(ec)
  }

  addError(error: Error) {
    this.errors.push(error)
  }

  get hasErrors(): boolean {
    return this.errors.length > 0
  }

  get lastError(): Error {
    return this.errors[this.errors.length - 1]
  }

  guard(func) {
    try { func() } catch (e) { this.addError(e) }
  }

  public noteTypeRepository: INoteTypeRepository
  public noteRepository: INoteRepository
  public cardsRepository: ICardRepository
  public manageCollection: ManageCollectionStructure

  private errors: Error[] = []
  private commands: Command<any>[] = []
}

export const context = new Context()
/* eslint-disable @typescript-eslint/no-explicit-any */
export const guard = (fn: (...args: any[]) => any) => {
  return function(...args: any[]): any {
    try { return fn(...args) } catch (e) { context.addError(e) }
  }
}

export const ex = (fn: (...args: any[]) => Command<any> | Command<any>[]) => {
  return function(...args: any[]): any {
    try {
      const cmd = fn(...args)
      if (Array.isArray(cmd)) {
        cmd.forEach(c => context.execute(c))
      } else {
        return context.execute(cmd)
      }
    } catch (e) { context.addError(e) }
  }
}