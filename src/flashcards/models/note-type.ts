import { Identity } from '@src/core/models/identity'
import { Name } from '@src/flashcards/models/name'

export class NoteType {
  protected _name: NoteTypeName
  protected _identity: Identity

  /**
   * Creates a new instance of the NoteType class
   * @param name Name of the note type
   */
  constructor(id: Identity, name: NoteTypeName) {
    this._identity = id
    this._name = name
  }

  get identity(): Identity {
    return this._identity
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