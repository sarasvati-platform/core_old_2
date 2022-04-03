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

    it('return an item with locale comarer', () => {
      const map = new OrderedMap<string, NamedItem>(KeyComparers.LocaleCaseInsensitive)
      map.add('item', sut.external)
      expect(map.find('ITeM')).toEqual(sut.external)
    })

    it('returns undefined if no field found', () => {
      const found = sut.collection.find('field 999')
      expect(found).toBeUndefined()
    })

    it('does not throw if undefined with locale comparer', () => {
      const map = new OrderedMap<string, NamedItem>(KeyComparers.LocaleCaseInsensitive)
      map.add('item', sut.external)
      const any: any = undefined // eslint-disable-line
      expect(() => map.find(any)).not.toThrow()
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
  /*                                  changeKey                                 */
  /* -------------------------------------------------------------------------- */

  describe('.changeKey()', () => {
    it('changes key', () => {
      sut.collection.changeKey('item0', 'itemX')
      expect(sut.collection.find('itemX')).toEqual(sut.items[0])
      expect(sut.collection.find('item0')).toBeUndefined()
    })

    it('throws an exception if key not found', () => {
      expect(() => sut.collection.changeKey('not-found', 'itemX')).toThrow('Item \'not-found\' not found')
    })

    it('throws an exception if new key already exists', () => {
      expect(() => sut.collection.changeKey('item1', 'item0')).toThrow('Item \'item0\' already exists')
    })

    it('throws an exception if new key already exists with locale comparer', () => {
      const map = new OrderedMap<string, NamedItem>(KeyComparers.LocaleCaseInsensitive)
      map.add('item', sut.external)
      expect(() => map.changeKey('ITEM', 'item')).toThrow('Item \'item\' already exists')
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

    describe('.to()', () => {
      it('throws if index is invalid', () => {
        expect(() => sut.collection.setPositionOf('item0').to(3)).toThrow('Index 3 is out of range')
        expect(() => sut.collection.setPositionOf('item0').to(-1)).toThrow('Index -1 is out of range')
      })

      it('throws if index is invalid', () => {
        const expected = [sut.items[1], sut.items[2], sut.items[0]]
        sut.collection.setPositionOf('item0').to(2)
        expect(sut.collection.values).toEqual(expected)
      })

    })
  })
})

describe('KeyComparers', () => {
  describe('LocaleCaseInsensitive', () => {
    it('compares strings', () => {
      const comparer = KeyComparers.LocaleCaseInsensitive as (a: string, b: string) => boolean
      expect(comparer('a', 'b')).toBeFalsy()
      expect(comparer('b', 'a')).toBeFalsy()
      expect(comparer('a', 'a')).toBeTruthy()
    })

    it('compares undefined', () => {
      const comparer = KeyComparers.LocaleCaseInsensitive as (a: string, b: string) => boolean
      const any: any = undefined // eslint-disable-line

      expect(comparer('a', any)).toBeFalsy()
      expect(comparer(any, 'a')).toBeFalsy()
      expect(comparer(any, any)).toBeTruthy()
    })
  })
})