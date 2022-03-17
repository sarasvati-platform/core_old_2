import { IRepository } from '@src/core/persistence'
import { Card, CardId, NoteType, NoteTypeId } from '@src/flashcards/models'

/** Note type repository. */
export type INoteTypeRepository = IRepository<NoteTypeId, NoteType>
export type ICardRepository = IRepository<CardId, Card>
