import { IRepository } from '@src/core/persistence'
import { NoteType } from '@src/flashcards/models/note-type'

/**
 * Note type repository.
 */
export type INoteTypeRepository = IRepository<NoteType>
