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

  findByName(name: string): NoteField | undefined {
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

  getPositionOf(field: NoteField) : number {
    return this._fields.indexOf(field)
  }

  setPositionOf(field: NoteField) : ArrayItemPositionChanger<NoteField> {
    return new ArrayItemPositionChanger(field, this._fields)
  }
}

class ArrayItemPositionChanger<TItemType> {
  private _array: TItemType[] = []
  private _item: TItemType

  constructor(item: TItemType, array: TItemType[]) {
    this._item = item
    this._array = array
  }

  toTop() {
    this.to(0)
  }

  toBottom() {
    this.to(this._array.length)
  }

  after(item: TItemType) {
    this.to(this._array.indexOf(item) + 1)
  }

  before(item: TItemType) {
    this.to(this._array.indexOf(item))
  }

  to(index: number) {
    const fromIndex = this._array.indexOf(this._item)
    const element = this._array[fromIndex]
    this._array.splice(fromIndex, 1)
    this._array.splice(index, 0, element)
  }
}