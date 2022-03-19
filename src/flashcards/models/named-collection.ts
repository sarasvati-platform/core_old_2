import { OrderedMap, KeyComparers } from '@src/core/utils/collections'
import { Name } from '@src/flashcards/models/name'


export interface IHasName { get name(): Name }

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
}
