import { IQuery } from '@src/core/persistence'
import { NoteType, NoteTypeId } from '@src/flashcards/models'
import { INoteTypeRepository } from '@src/flashcards/ports/repositories'

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

  public get(identity: NoteTypeId): NoteType {
    const value = this.noteTypes.get(identity.value)
    if (!value) {
      throw new Error(`Note type '${identity.value}' not found`)
    }
    return value
  }

  public exists(identity: NoteTypeId): boolean {
    return this.noteTypes.has(identity.value)
  }

  public find(query: IQuery): readonly NoteType[] {
    throw new Error('Method not implemented.')
  }

  public delete(identity: NoteTypeId): void {
    this.noteTypes.delete(identity.value)
  }
}
