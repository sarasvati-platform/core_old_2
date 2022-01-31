import { Identity } from '@src/core/models/identity'
import { NoteType } from '@src/flashcards/models/note-type'

/**
 * Note type repository.
 */
export interface INoteTypeRepository {
  /**
   * Saves the note type
   * @param noteType Note type to add
   */
  save(noteType: NoteType): void

  /**
   * Gets the note type by identity
   * @param identity Identity of the note type
   * @returns Note type or undefined if not found
   */
  find(identity: Identity): NoteType | undefined
}
