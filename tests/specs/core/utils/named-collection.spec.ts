import { IHasName, NamedCollection } from '@src/core/utils/collections'

class NamedItem implements IHasName {
  private _name: string

  constructor(name: string) {
    this._name = name
  }

  get name(): { value: string } {
    return { value: this._name }
  }
}

describe('The collection instance', () => {
  let sut: {
    collection: NamedCollection<NamedItem>,
    item1: NamedItem,
    item2: NamedItem,
    item3: NamedItem,
    item4: NamedItem
  }

  beforeEach(() => {
    sut = {
      collection: new NamedCollection(),
      item1: new NamedItem('item1'),
      item2: new NamedItem('item2'),
      item3: new NamedItem('item3'),
      item4: new NamedItem('item4'),
    }
    sut.collection.add(sut.item1)
    sut.collection.add(sut.item2)
    sut.collection.add(sut.item3)
  })

  describe('when adding a new field', () => {
    test('should return fields by propert', () => {
      expect(sut.collection.all).toEqual([sut.item1, sut.item2, sut.item3])
    })

    test('should add field to the instance', () => {
      sut.collection.add(sut.item4)
      expect(sut.collection.all).toContain(sut.item4)
    })

    test('should throw an error if the field name is already used', () => {
      const fieldWithSameName = new NamedItem(sut.item1.name.value)
      expect(() => sut.collection.add(fieldWithSameName)).toThrow('Field with name \'item1\' already exists')
      expect(sut.collection.all).toEqual([sut.item1, sut.item2, sut.item3])
    })

    test('should return a field by name', () => {
      const found = sut.collection.findByName('item1')
      expect(found).toEqual(sut.item1)
    })

    test('should return undefined if no field found', () => {
      const found = sut.collection.findByName('field 999')
      expect(found).toBeUndefined()
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                Remove fields                               */
  /* -------------------------------------------------------------------------- */

  describe('when removing a field', () => {
    test('should remove field from the instance', () => {
      sut.collection.remove(sut.item1)
      sut.collection.remove(sut.item2)
      sut.collection.remove(sut.item3)
      expect(sut.collection.all).toEqual([])
    })

    test('should throw an exception if field does not belog to the instance', () => {
      const externalField = new NamedItem('item1')
      expect(() => sut.collection.remove(externalField)).toThrow('Field does not belong to this instance')
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                             Position of a field                            */
  /* -------------------------------------------------------------------------- */

  describe('when changing a position of field', () => {
    test('should return a position of field', () => {
      expect(sut.collection.getPositionOf(sut.item1)).toEqual(0)
      expect(sut.collection.getPositionOf(sut.item2)).toEqual(1)
    })

    test('should change a position to top', () => {
      sut.collection.setPositionOf(sut.item3).toTop()
      expect(sut.collection.all).toEqual([sut.item3, sut.item1, sut.item2])
    })

    test('should change a position to bottom', () => {
      sut.collection.setPositionOf(sut.item1).toBottom()
      expect(sut.collection.all).toEqual([sut.item2, sut.item3, sut.item1])
    })

    test('should change a position before field', () => {
      sut.collection.setPositionOf(sut.item3).before(sut.item2)
      expect(sut.collection.all).toEqual([sut.item1, sut.item3, sut.item2])
    })

    test('should change a position after field', () => {
      sut.collection.setPositionOf(sut.item1).after(sut.item3)
      expect(sut.collection.all).toEqual([sut.item2, sut.item3, sut.item1])
    })
  })

})
