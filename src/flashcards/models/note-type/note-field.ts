import { Event } from '@src/core/models'
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
    super(name)
    if (name.includes('{') || name.includes('}')) {
      throw new Error('The name must not contain { or }')
    }
  }
}

/**
 * The NoteField class represents a field of a note type
 */
export class NoteField {
  private _name: NoteFieldName
  private _renamed: Event<NoteFieldName> = new Event<NoteFieldName>()

  /**
   * Initializes a new instance of the NoteField class
   * @param name Name of the field
   */
  constructor(name: NoteFieldName) {
    this._name = name
  }

  /**
   * Raises when the field is renamed.
   * @returns Event instance.
   */
  get renamed(): Event<NoteFieldName> { return this._renamed }

  /**
   * Returns the name of the field
   */
  get name(): NoteFieldName {
    return this._name
  }

  /**
   * Renames the field.
   * @param name New name of the field.
   */
  rename(name: NoteFieldName) {
    this._renamed.notify(name)
    this._name = name
  }
}
