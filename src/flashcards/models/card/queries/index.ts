import { eq } from '@sarasvati-platform/abstract-query'
import { IQuery } from '@src/core/persistence'
import { Note } from '@src/flashcards/models'

export enum CardFields {
  NoteId = 'note.id',
}

/** Returns cards of the specified note */
export const ofNote = (note: Note) : IQuery => eq(CardFields.NoteId, note.identity.value) as IQuery