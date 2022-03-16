import { OrderedMap, KeyComparers } from '@src/core/utils/collections'
import { Name } from '@src/flashcards/models/name'


export interface IHasName { get name(): Name }

export class NamedCollection<TItem extends IHasName> {
  private items: OrderedMap<string, TItem> = new OrderedMap<string, TItem>(KeyComparers.LocaleCaseInsensitive)

  public get all(): readonly TItem[] {
    return this.items.values
  }

  public add(item: TItem) {
    this.items.add(item.name.value, item)
  }

  public remove(item: TItem) {
    this.items.remove(item.name.value)
  }

  public findByName(name: string): TItem | undefined {
    return this.items.find(name)
  }
}
