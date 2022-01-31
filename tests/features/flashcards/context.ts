import { INoteTypeRepository } from '@src/flashcards/ports/repositories/note-type-repository'
import { FakeNoteTypeRepository } from './ports/repositories/fake-note-type-repository'

class Context {
  public noteTypeRepository: INoteTypeRepository = new FakeNoteTypeRepository()
}

export const context = new Context()