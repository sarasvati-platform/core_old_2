import { Entity, Identity } from '@src/core/models'
import { NoteField } from '@src/flashcards/models'
import { Name } from '@src/flashcards/models'

export class NoteType extends Entity {
  protected _name: NoteTypeName
  protected _fields: NoteField[] = []

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

  /**
   * Adds a new field to the note type
   * @param field Field to add
   */
  addField(field: NoteField) {
    const isExistWithSameName = this._fields.some(
      f => f.name.value.toLocaleLowerCase() === field.name.value.toLocaleLowerCase()
    )
    if (isExistWithSameName) {
      throw new Error(`Field with name '${field.name.value}' already exists`)
    }

    this._fields.push(field)
  }

  /**
   * Returns the fields of the note type
   * @returns Fields of the note type
   */
  get fields(): readonly NoteField[] {
    return this._fields
  }
}

/**
 * Note type name
 */
export class NoteTypeName extends Name {
  /**
   * Initializes a new instance of the NoteTypeName class
   * @param name Name of the note type
   */
  constructor(name: string) {
    super(name)
  }
}
