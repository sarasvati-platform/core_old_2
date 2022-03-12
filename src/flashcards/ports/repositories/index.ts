import { IRepository } from '@src/core/persistence'
import { NoteType, NoteTypeId } from '@src/flashcards/models'

/** Note type repository. */
export type INoteTypeRepository = IRepository<NoteTypeId, NoteType>
