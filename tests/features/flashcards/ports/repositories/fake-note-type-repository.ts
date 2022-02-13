import { Identity } from '@src/core/models/identity'
import { IQuery } from '@src/core/persistence'
import { NoteType } from '@src/flashcards/models/note-type'
import { INoteTypeRepository } from '@src/flashcards/ports/repositories/note-type-repository'

export class FakeNoteTypeRepository implements INoteTypeRepository {
  private noteTypes: Map<string, NoteType> = new Map()

  public save(noteType: NoteType): void {
    if (noteType.name.value !== noteType.identity.value) {
      // Because we use name as identity, we need to remove old one
      // and add new one
      this.noteTypes.delete(noteType.identity.value)
      this.noteTypes.set(noteType.name.value, Object.create(noteType))
    } else {
      this.noteTypes.set(noteType.identity.value, Object.create(noteType))
    }
  }

  public get(identity: Identity): NoteType | undefined {
    return this.noteTypes.get(identity.value)
  }

  public find(query: IQuery): readonly NoteType[] {
    throw new Error('Method not implemented.')
    // return [...this.noteTypes.values()]
  }

  public delete(identity: Identity): void {
    this.noteTypes.delete(identity.value)
  }
}
