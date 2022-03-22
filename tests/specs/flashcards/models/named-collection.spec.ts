import { Event } from '@src/core/models'
import { NamedCollection, Name } from '@src/flashcards/models'
import { IHasName } from '@src/flashcards/models/named-collection'

class Item implements IHasName {
  private _renamed: Event<Name> = new Event<Name>()
  constructor(public readonly name: Name) { }
  get renamed(): Event<Name> { return this._renamed }
}

describe('NamedCollection', () => {
  let sut: {
    collection: NamedCollection<Item>,
    item1: Item, item2: Item,
    item3: Item, item4: Item
  }

  beforeEach(() => {
    sut = {
      collection: new NamedCollection<Item>(),
      item1: new Item(new Name('field 1')),
      item2: new Item(new Name('field 2')),
      item3: new Item(new Name('field 3')),
      item4: new Item(new Name('field 4')),
    }
    sut.collection.add(sut.item1)
    sut.collection.add(sut.item2)
    sut.collection.add(sut.item3)
  })

  /* -------------------------------------------------------------------------- */
  /*                                     all                                    */
  /* -------------------------------------------------------------------------- */

  describe('.all', () => {
    it('returns empty array if no items added', () => {
      expect(new NamedCollection().all).toEqual([])
    })

    it('returns all items', () => {
      expect(sut.collection.all).toEqual([sut.item1, sut.item2, sut.item3])
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                     add                                    */
  /* -------------------------------------------------------------------------- */

  describe('.add()', () => {
    it('adds item', () => {
      sut.collection.add(sut.item4)
      expect(sut.collection.all).toEqual([sut.item1, sut.item2, sut.item3, sut.item4])
    })

    it('throws if item with same name already exists', () => {
      expect(() => sut.collection.add(sut.item1)).toThrowError(
        `Item '${sut.item1.name.value}' already exists`
      )
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                   remove                                   */
  /* -------------------------------------------------------------------------- */

  describe('.remove()', () => {
    it('removes item', () => {
      sut.collection.remove(sut.item2)
      expect(sut.collection.all).toEqual([sut.item1, sut.item3])
    })

    it('throws if item not found', () => {
      const item = new Item(new Name('not-found'))
      expect(() => sut.collection.remove(item)).toThrow(`Item '${item.name.value}' not found`)
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                 findByName                                 */
  /* -------------------------------------------------------------------------- */

  describe('.findByName()', () => {
    it('finds field by name', () => {
      expect(sut.collection.findByName(sut.item2.name.value)).toBe(sut.item2)
    })

    it('returns undefined if field is not found', () => {
      expect(sut.collection.findByName('not-found')).toBeUndefined()
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                  getByName                                 */
  /* -------------------------------------------------------------------------- */

  describe('.getByName()', () => {
    it('gets field by name', () => {
      expect(sut.collection.getByName(sut.item2.name.value)).toBe(sut.item2)
    })

    it('throws if field is not found', () => {
      expect(() => sut.collection.getByName('not-found')).toThrow()
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                   getPositionOf                            */
  /* -------------------------------------------------------------------------- */

  describe('.getPositionOf()', () => {
    it('returns index', () => {
      expect(sut.collection.getPositionOf(sut.item1)).toEqual(0)
      expect(sut.collection.getPositionOf(sut.item3)).toEqual(2)
    })
  })
})