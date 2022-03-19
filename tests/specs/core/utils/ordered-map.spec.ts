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
    it('adds item', () => {
      sut.collection.add('itemX', sut.external)
      expect(sut.collection.values).toContain(sut.external)
    })

    it('throws if key is used', () => {
      const addAction = () => sut.collection.add('item1', sut.external)
      expect(addAction).toThrow('Item \'item1\' already exists')
      expect(sut.collection.values).toEqual(sut.items)
    })

    it('throws if key is used with different comarer', () => {
      const map = new OrderedMap<string, NamedItem>(KeyComparers.LocaleCaseInsensitive)
      const addAction = (key: string) => map.add(key, sut.external)
      addAction('item1')
      expect(() => addAction('ITEM1')).toThrow('Item \'ITEM1\' already exists')
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                    find                                    */
  /* -------------------------------------------------------------------------- */

  describe('.find()', () => {
    it('returns an item by key', () => {
      const found = sut.collection.find('item1')
      expect(found).toEqual(sut.items[1])
    })

    it('return an item with different comarer', () => {
      const map = new OrderedMap<string, NamedItem>(KeyComparers.LocaleCaseInsensitive)
      map.add('item', sut.external)
      expect(map.find('ITeM')).toEqual(sut.external)
    })

    it('returns undefined if no field found', () => {
      const found = sut.collection.find('field 999')
      expect(found).toBeUndefined()
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                       remove                               */
  /* -------------------------------------------------------------------------- */

  describe('.remove()', () => {
    it('removes item', () => {
      sut.collection.remove('item0')
      sut.collection.remove('item1')
      sut.collection.remove('item2')
      expect(sut.collection.values).toEqual([])
    })

    it('throws an exception if key not found', () => {
      expect(() => sut.collection.remove('not-found')).toThrow('Item \'not-found\' not found')
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                   getPositionOf                            */
  /* -------------------------------------------------------------------------- */

  describe('.getPositionOf()', () => {
    it('returns index', () => {
      expect(sut.collection.getPositionOf('item0')).toEqual(0)
      expect(sut.collection.getPositionOf('item1')).toEqual(1)
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                setPositionOf                               */
  /* -------------------------------------------------------------------------- */

  describe('.setPositionOf()', () => {
    it('.toTop()', () => {
      const expected = [sut.items[2], sut.items[0], sut.items[1]]
      sut.collection.setPositionOf('item2').toTop()
      expect(sut.collection.values).toEqual(expected)
    })

    it('.toBottom()', () => {
      const expected = [sut.items[1], sut.items[2], sut.items[0]]
      sut.collection.setPositionOf('item0').toBottom()
      expect(sut.collection.values).toEqual(expected)
    })

    it('.before()', () => {
      const expected = [sut.items[0], sut.items[2], sut.items[1]]
      sut.collection.setPositionOf('item2').before(sut.items[1].name)
      expect(sut.collection.values).toEqual(expected)
    })

    it('.after()', () => {
      const expected = [sut.items[1], sut.items[2], sut.items[0]]
      sut.collection.setPositionOf('item0').after(sut.items[2].name)
      expect(sut.collection.values).toEqual(expected)
    })
  })
})
