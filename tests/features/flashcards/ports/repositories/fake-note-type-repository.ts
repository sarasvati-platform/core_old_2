import { Identity } from '@src/core/models/identity'
import { NoteType } from '@src/flashcards/models/note-type'
import { INoteTypeRepository } from '@src/flashcards/ports/repositories/note-type-repository'

export class FakeNoteTypeRepository implements INoteTypeRepository {
  private noteTypes: Map<string, NoteType> = new Map()

  public save(noteType: NoteType): void {
    this.noteTypes.set(noteType.identity.value, Object.create(noteType))
  }

  public find(identity: Identity): NoteType | undefined {
    return this.noteTypes.get(identity.value)
  }

  public delete(identity: Identity): void {
    this.noteTypes.delete(identity.value)
  }
}
