import { Name } from '@src/flashcards/models/name'

export class NoteType {
  protected _name: NoteTypeName

  /**
   * Creates a new instance of the NoteType class
   * @param name Name of the note type
   */
  constructor(name: NoteTypeName) {
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