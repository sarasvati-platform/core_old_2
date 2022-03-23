import { INoteTypeRepository, INoteRepository, ICardRepository } from '@src/flashcards/ports/repositories'
import { FakeNoteTypeRepository, FakeNoteRepository, FakeCardRepository } from '@tests/ports/repositories/fake-note-type-repository'

class Context {
  clear() {
    this.errors = []
    this.noteTypeRepository = new FakeNoteTypeRepository()
    this.noteRepository = new FakeNoteRepository()
    this.cardsRepository = new FakeCardRepository()
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
    try { func() } catch (e) { context.addError(e) }
  }

  public noteTypeRepository: INoteTypeRepository = new FakeNoteTypeRepository()
  public noteRepository: INoteRepository = new FakeNoteRepository()
  public cardsRepository: ICardRepository = new FakeCardRepository()

  private errors: Error[] = []
}

export const context = new Context()