import { Name } from '@src/flashcards/models'

/**
 * A name for a note field
 */
export class NoteFieldName extends Name {
  /**
   * Initializes a new instance of the NoteFieldName class
   * @param name Name of the note field
   */
  constructor(name: string) {
    if (name.includes('{') || name.includes('}')) {
      throw new Error('The name must not contain { or }')
    }
    super(name)
  }
}

/**
 * The NoteField class represents a field of a note type
 */
export class NoteField {
  private _name: NoteFieldName

  /**
   * Initializes a new instance of the NoteField class
   * @param name Name of the field
   */
  constructor(name: NoteFieldName) {
    this._name = name
  }

  /**
   * Returns the name of the field
   */
  get name(): NoteFieldName {
    return this._name
  }
}
