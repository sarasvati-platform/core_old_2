import { Identity } from '@src/core/models/identity'
import { NoteType } from '@src/flashcards/models/note-type'

export interface INoteTypeRepository {
  save(noteType: NoteType): void
  find(identity: Identity): NoteType | undefined
}
