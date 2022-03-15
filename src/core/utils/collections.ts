import { Validate } from './validation'

export class CollectionItemMover<TItem> {
  private _array: TItem[] = []
  private _item: TItem

  constructor(item: TItem, array: TItem[]) {
    this._item = item
    this._array = array
  }

  toTop() {
    this.to(0)
  }

  toBottom() {
    this.to(this._array.length)
  }

  after(item: TItem) {
    this.to(this._array.indexOf(item) + 1)
  }

  before(item: TItem) {
    this.to(this._array.indexOf(item))
  }

  to(index: number) {
    const fromIndex = this._array.indexOf(this._item)
    const element = this._array[fromIndex]
    this._array.splice(fromIndex, 1)
    this._array.splice(index, 0, element)
  }
}

export interface IHasName {
  get name(): { value: string }
}

/**
 * A collection of items with a name.
 */
export class NamedCollection<TItem extends IHasName> {
  private _items: TItem[] = []

  get all(): readonly TItem[] {
    return this._items
  }

  findByName(name: string): TItem | undefined {
    return this._items.find(x => x.name.value === name)
  }

  add(field: TItem) {
    Validate.shouldNotContain(
      field.name.value.toLocaleLowerCase(),
      this._items.map(x => x.name.value.toLocaleLowerCase()),
      `Field with name '${field.name.value}' already exists`
    )
    this._items.push(field)
  }

  remove(field: TItem) {
    const index = this._items.indexOf(field)
    if (index !== -1) {
      this._items.splice(index, 1)
    } else {
      throw new Error('Field does not belong to this instance')
    }
  }

  getPositionOf(field: TItem) : number {
    return this._items.indexOf(field)
  }

  setPositionOf(field: TItem) : CollectionItemMover<TItem> {
    return new CollectionItemMover(field, this._items)
  }
}
