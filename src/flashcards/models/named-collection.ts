import { Event } from '@src/core/models'
import { OrderedMap, KeyComparers, OrderedMapItemMover } from '@src/core/utils/collections'
import { Name } from '@src/flashcards/models/name'

export interface IHasName {
  get name(): Name
  get renamed(): Event<Name>
}

export class NamedCollection<TItem extends IHasName> {
  private items: OrderedMap<string, TItem> = new OrderedMap<string, TItem>(KeyComparers.LocaleCaseInsensitive)

  /**
   * Returns all items in collection.
   * @returns {TItem[]} Array of items.
   */
  public get all(): readonly TItem[] {
    return this.items.values
  }

  /**
   * Adds item to collection.
   * @param item Item to add.
   * @throws {Error} If item with same name already exists.
   */
  public add(item: TItem) {
    item.renamed.subscribe((name: Name) => {
      const value = this.findByName(name.value)
      if (value) { throw new Error(`Item '${name.value}' already exists`) }
      this.items.remove(item.name.value)
      this.items.add(name.value, item)
    })

    this.items.add(item.name.value, item)
  }

  /**
   * Removes item from collection.
   * @param item Item to remove.
   * @throws {Error} If item not found.
   */
  public remove(item: TItem) {
    this.items.remove(item.name.value)
  }

  /**
   * Finds item by name.
   * @param name Name of item to find.
   * @returns Item with specified name or undefined if not found.
   */
  public findByName(name: string): TItem | undefined {
    return this.items.find(name)
  }

  /**
   * Finds item by name.
   * @param name Name of item to find.
   * @returns Item with specified name or undefined if not found.
   */
  public getByName(name: string): TItem {
    const item = this.findByName(name)
    if (!item) { throw new Error(`Item '${name}' not found`) }
    return item
  }

  getPositionOf(item: TItem): number {
    return this.items.getPositionOf(item.name.value)
  }

  setPositionOf(item: TItem) : OrderedMapItemMover<string, TItem> {
    return this.items.setPositionOf(item.name.value)
  }
}
