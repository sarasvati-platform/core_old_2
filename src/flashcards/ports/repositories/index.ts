import { IRepository } from '@src/core/persistence'
import { Card, CardId, NoteType, NoteTypeId, NoteId, Note } from '@src/flashcards/models'

/** Note type repository. */
export type INoteTypeRepository = IRepository<NoteTypeId, NoteType>
export type INoteRepository = IRepository<NoteId, Note>
export type ICardRepository = IRepository<CardId, Card>
