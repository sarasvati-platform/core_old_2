import { Entity } from '@src/core/models/entity'
import { Identity } from '@src/core/models/identity'
import { Name } from '@src/flashcards/models/name'

export class NoteType extends Entity {
  protected _name: NoteTypeName

  /**
   * Creates a new instance of the NoteType class
   * @param name Name of the note type
   */
  constructor(identity: Identity, name: NoteTypeName) {
    super(identity)
    this._name = name
  }

  /**
   * Returns the name of the note type
   */
  get name(): NoteTypeName {
    return this._name
  }

  /**
   * Renames note type
   * @param name New name of the note type
   */
  rename(name: NoteTypeName) {
    this._name = name
  }
}

export class NoteTypeName extends Name {
  constructor(name: string) {
    super(name)
  }
}
