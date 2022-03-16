import { NamedCollection, Name } from '@src/flashcards/models'
import { IHasName } from '@src/flashcards/models/named-collection'

class Item implements IHasName {
  constructor(public readonly name: Name) {}
}

describe('NamedCollection', () => {
  let sut: {
    collection: NamedCollection<Item>,
    field1: Item,
    field2: Item,
    field3: Item,
    field4: Item
  }

  beforeEach(() => {
    sut = {
      collection: new NamedCollection<Item>(),
      field1: new Item(new Name('field 1')),
      field2: new Item(new Name('field 2')),
      field3: new Item(new Name('field 3')),
      field4: new Item(new Name('field 4')),
    }
    sut.collection.add(sut.field1)
    sut.collection.add(sut.field2)
    sut.collection.add(sut.field3)
  })

  /* -------------------------------------------------------------------------- */
  /*                                     all                                    */
  /* -------------------------------------------------------------------------- */

  describe('.all', () => {
    it('returns empty array if no items added', () => {
      expect(new NamedCollection().all).toEqual([])
    })

    it('returns all fields', () => {
      expect(sut.collection.all).toEqual([sut.field1, sut.field2, sut.field3])
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                     add                                    */
  /* -------------------------------------------------------------------------- */

  describe('.add()', () => {
    test('adds field', () => {
      sut.collection.add(sut.field4)
      expect(sut.collection.all).toEqual([sut.field1, sut.field2, sut.field3, sut.field4])
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                   remove                                   */
  /* -------------------------------------------------------------------------- */

  describe('.remove()', () => {
    test('removes field', () => {
      sut.collection.remove(sut.field2)
      expect(sut.collection.all).toEqual([sut.field1, sut.field3])
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                 findByName                                 */
  /* -------------------------------------------------------------------------- */

  describe('.findByName()', () => {
    test('finds field by name', () => {
      expect(sut.collection.findByName(sut.field2.name.value)).toBe(sut.field2)
    })

    test('returns undefined if field is not found', () => {
      expect(sut.collection.findByName('not-found')).toBeUndefined()
    })
  })
})