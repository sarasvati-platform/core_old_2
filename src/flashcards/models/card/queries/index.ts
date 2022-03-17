import { eq } from '@sarasvati-platform/abstract-query'
import { Note } from '@src/flashcards/models'

export enum CardFields {
  NoteId = 'note.id',
}

/** Returns cards of the specified note */
export const ofNote = (note: Note) => eq(CardFields.NoteId, note.identity.value)