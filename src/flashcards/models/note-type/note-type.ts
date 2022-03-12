import { Entity, Identity } from '@src/core/models'
import { Name, NoteField } from '@src/flashcards/models'
import { Validate } from '@src/core/validation'

export type NoteTypeId = Identity & {'type': 'NoteType'}

/** Note type name */
export class NoteTypeName extends Name {}

/** Note type */
export class NoteType extends Entity<NoteTypeId> {
  protected _name: NoteTypeName
  protected _fields = new NoteFieldsCollection()

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
   * Returns the fields of the note type
   * @returns Fields of the note type
   */
  get fields(): NoteFieldsCollection {
    return this._fields
  }
}


class NoteFieldsCollection {
  private _fields: NoteField[] = []

  get all(): readonly NoteField[] {
    return this._fields
  }

  getByName(name: string): NoteField | undefined {
    return this._fields.find(x => x.name.value === name)
  }

  add(field: NoteField) {
    Validate.shouldNotContain(
      field.name.value.toLocaleLowerCase(),
      this._fields.map(x => x.name.value.toLocaleLowerCase()),
      `Field with name '${field.name.value}' already exists`
    )
    this._fields.push(field)
  }

  remove(field: NoteField) {
    const index = this._fields.indexOf(field)
    if (index !== -1) {
      this._fields.splice(index, 1)
    } else {
      throw new Error('Field does not belong to this instance')
    }
  }

  removeByName(name: string) {
    const field = this.getByName(name)
    if (field) {
      this.remove(field)
    } else {
      throw new Error('Field does not belong to this instance')
    }
  }

  getPositionOf(field: NoteField) : number {
    return this._fields.indexOf(field)
  }

  setPositionOf(field: NoteField) : FieldsPositionChanger {
    return new FieldsPositionChanger(field, this._fields)
  }
}

class FieldsPositionChanger {
  private _fields: NoteField[] = []
  private _of: NoteField

  constructor(of: NoteField, fields: NoteField[]) {
    this._of = of
    this._fields = fields
  }

  toTop() {
    const fromIndex = this._fields.indexOf(this._of)
    const toIndex = 0
    this._fields.splice(fromIndex, 1)
    this._fields.splice(toIndex, 0, this._of)
  }

  toBottom() {
    const fromIndex = this._fields.indexOf(this._of)
    const toIndex = this._fields.length - 1
    this._fields.splice(fromIndex, 1)
    this._fields.splice(toIndex, 0, this._of)
  }

  after(field: NoteField) {
    const fromIndex = this._fields.indexOf(this._of)
    const toIndex = this._fields.indexOf(field)
    this._fields.splice(fromIndex, 1)
    this._fields.splice(toIndex, 0, this._of)
  }

  before(field: NoteField) {
    const fromIndex = this._fields.indexOf(this._of)
    const toIndex = this._fields.indexOf(field)
    this._fields.splice(fromIndex, 1)
    this._fields.splice(toIndex-1, 0, this._of)
  }
}