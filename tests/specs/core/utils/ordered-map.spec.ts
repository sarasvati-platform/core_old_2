import { KeyComparers, OrderedMap } from '@src/core/utils/collections'

class NamedItem {
  constructor(public readonly name: string) { }
}

describe('OrderedMap', () => {
  let sut: {
    collection: OrderedMap<string, NamedItem>,
    items: NamedItem[], external: NamedItem
  }

  beforeEach(() => {
    sut = {
      collection: new OrderedMap(),
      items: [
        new NamedItem('item0'), new NamedItem('item1'), new NamedItem('item2'),
      ],
      external: new NamedItem('itemX'),
    }
    sut.collection.add('item0', sut.items[0])
    sut.collection.add('item1', sut.items[1])
    sut.collection.add('item2', sut.items[2])
  })

  /* -------------------------------------------------------------------------- */
  /*                                     add                                    */
  /* -------------------------------------------------------------------------- */

  describe('.add()', () => {
    test('adds item', () => {
      sut.collection.add('itemX', sut.external)
      expect(sut.collection.values).toContain(sut.external)
    })

    test('throws if key is used', () => {
      const addAction = () => sut.collection.add('item1', sut.external)
      expect(addAction).toThrow('Item with name \'item1\' already exists')
      expect(sut.collection.values).toEqual(sut.items)
    })

    test('throws if key is used with different comarer', () => {
      const map = new OrderedMap<string, NamedItem>(KeyComparers.LocaleCaseInsensitive)
      const addAction = (key: string) => map.add(key, sut.external)
      addAction('item1')
      expect(() => addAction('ITEM1')).toThrow('Item with name \'ITEM1\' already exists')
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                    find                                    */
  /* -------------------------------------------------------------------------- */

  describe('.find()', () => {
    test('returns an item by key', () => {
      const found = sut.collection.find('item1')
      expect(found).toEqual(sut.items[1])
    })

    test('return an item with different comarer', () => {
      const map = new OrderedMap<string, NamedItem>(KeyComparers.LocaleCaseInsensitive)
      map.add('item', sut.external)
      expect(map.find('ITeM')).toEqual(sut.external)
    })

    test('returns undefined if no field found', () => {
      const found = sut.collection.find('field 999')
      expect(found).toBeUndefined()
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                       remove                               */
  /* -------------------------------------------------------------------------- */

  describe('.remove()', () => {
    test('removes item', () => {
      sut.collection.remove('item0')
      sut.collection.remove('item1')
      sut.collection.remove('item2')
      expect(sut.collection.values).toEqual([])
    })

    test('throws an exception if key not found', () => {
      expect(() => sut.collection.remove('not-found')).toThrow('Item not found')
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                   getPositionOf                            */
  /* -------------------------------------------------------------------------- */

  describe('.getPositionOf()', () => {
    test('returns index', () => {
      expect(sut.collection.getPositionOf('item0')).toEqual(0)
      expect(sut.collection.getPositionOf('item1')).toEqual(1)
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                setPositionOf                               */
  /* -------------------------------------------------------------------------- */

  describe('.setPositionOf()', () => {
    test('.toTop()', () => {
      const expected = [sut.items[2], sut.items[0], sut.items[1]]
      sut.collection.setPositionOf('item2').toTop()
      expect(sut.collection.values).toEqual(expected)
    })

    test('.toBottom()', () => {
      const expected = [sut.items[1], sut.items[2], sut.items[0]]
      sut.collection.setPositionOf('item0').toBottom()
      expect(sut.collection.values).toEqual(expected)
    })

    test('.before()', () => {
      const expected = [sut.items[0], sut.items[2], sut.items[1]]
      sut.collection.setPositionOf('item2').before(sut.items[1].name)
      expect(sut.collection.values).toEqual(expected)
    })

    test('.after()', () => {
      const expected = [sut.items[1], sut.items[2], sut.items[0]]
      sut.collection.setPositionOf('item0').after(sut.items[2].name)
      expect(sut.collection.values).toEqual(expected)
    })
  })
})
