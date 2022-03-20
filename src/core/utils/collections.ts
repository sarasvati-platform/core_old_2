
/**
 * An ordered map is a data structure that allows amortized O(1) for access and
 * mutation just like a map, but the elements maintain their order.
 */
export class OrderedMap<TKey, TItem> {
  private readonly _items: [TKey, TItem][] = []
  private readonly _comparer: (a: TKey, b: TKey) => boolean

  /**
   * Initializes a new instance of the OrderedMap class.
   * @param comparer A function that compares two keys.
   */
  constructor(
    comparer: (a: TKey, b: TKey) => boolean = KeyComparers.Default
  ) {
    this._comparer = comparer
  }

  /**
   * Returns an array of all the items in the map.
   * @returns An array of all the items in the map.
   */
  get values(): readonly TItem[] {
    return this._items.map(x => x[1])
  }

  /**
   * Finds an item by its key.
   * @param key Key of the item to find
   * @returns Item with the specified key or undefined if not found
   */
  find(key: TKey): TItem | undefined {
    const item = this._items.find(x => this._comparer(x[0], key))
    if (item) { return item[1] }
    return undefined
  }

  /**
   * Adds an item to the map.
   * @param key Key of the item to add.
   * @param item Item to add.
   */
  add(key: TKey, item: TItem) : void {
    if (this.find(key)) {
      throw new Error(`Item '${key}' already exists`)
    }
    this._items.push([key, item])
  }

  /**
   * Removes an item from the map.
   * @param key Key of the item to remove.
   */
  remove(key: TKey) {
    const index = this.getPositionOf(key)
    if (index >= 0) {
      this._items.splice(index, 1)
    } else {
      throw new Error(`Item '${key}' not found`)
    }
  }

  /**
   * Returns the position of an item in the map.
   * @param key Key of the item to find.
   * @returns The position of the item in the map or -1 if not found.
   */
  getPositionOf(key: TKey) : number {
    return this._items.findIndex(x => this._comparer(x[0], key))
  }

  /**
   * Sets the position of an item in the map.
   * @param key Key of the item to set position for.
   * @returns Change position interface.
   */
  setPositionOf(key: TKey) : OrderedMapItemMover<TKey, TItem> {
    return new OrderedMapItemMover(key, this._items)
  }
}

/**
 * Order map item mover.
 */
export class OrderedMapItemMover<TKey, TItem> {
  private _items: [TKey, TItem][] = []
  private _key: TKey

  /**
   * Initializes a new instance of the OrderedMapItemMover class.
   * @param key Key of the item to move.
   * @param items Items.
   */
  constructor(key: TKey, items: [TKey, TItem][]) {
    this._key = key
    this._items = items
  }

  /** Moves the item to the top of the collection. */
  toTop() {
    this.to(0)
  }

  /** Moves the item to the bottom of the collection. */
  toBottom() {
    this.to(this._items.length)
  }

  /** Moves the item to the specified position. */
  after(key: TKey) {
    this.to(this.indexOf(key) + 1)
  }

  /** Moves the item to the specified position. */
  before(key: TKey) {
    this.to(this.indexOf(key))
  }

  /** Moves the item to the specified position. */
  to(index: number) {
    if (index < 0 || index > this._items.length) {
      throw new Error('Index is out of range')
    }
    const fromIndex = this.indexOf(this._key)
    const element = this._items[fromIndex]
    this._items.splice(fromIndex, 1)
    this._items.splice(index, 0, element)
  }

  /** Returns the index of the item. */
  private indexOf(key: TKey): number {
    return this._items.map(item => item[0]).indexOf(key)
  }
}

export const KeyComparers = Object.freeze({
  Default: <T>(a: T, b: T): boolean => a === b,
  LocaleCaseInsensitive: (a: string, b: string): boolean => {
    if (a === undefined || a === undefined) { return false }
    if (b === undefined || b === undefined) { return false }
    return a.toLocaleLowerCase() === b.toLocaleLowerCase()
  }
})
