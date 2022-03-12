import { Entity, Identity } from '@src/core/models'
import { Name, NoteField } from '@src/flashcards/models'
import { Validate } from '@src/core/validation'

export type NoteTypeId = Identity & {'type': 'NoteType'}

/** Note type name */
export class NoteTypeName extends Name {}

/** Note type */
export class NoteType extends Entity<NoteTypeId> {
  protected _name: NoteTypeName
  protected _fields: NoteField[] = []

  /**
   * Creates a new instance of the NoteType class
   * @param name Name of the note type
   * @param identity Identity of the note type. Optional.
   */
  constructor(
    name: NoteTypeName,
    identity: NoteTypeId = new Identity() as NoteTypeId,
  ) {
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
   * Adds a new field to the note type. Field name should be unique.
   * @param field Field to add
   */
  addField(field: NoteField) {
    Validate.shouldNotContain(
      field.name.value.toLocaleLowerCase(),
      this._fields.map(x => x.name.value.toLocaleLowerCase()),
      `Field with name '${field.name.value}' already exists`
    )
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


