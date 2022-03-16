import { INoteTypeRepository } from '@src/flashcards/ports/repositories'
import { FakeNoteTypeRepository } from './ports/repositories/fake-note-type-repository'

class Context {
  addError(error: Error) {
    this.errors.push(error)
  }

  get hasErrors(): boolean {
    return this.errors.length > 0
  }

  get lastError(): Error {
    return this.errors[this.errors.length - 1]
  }

  public noteTypeRepository: INoteTypeRepository = new FakeNoteTypeRepository()

  private errors: Error[] = []
}

export const context = new Context()