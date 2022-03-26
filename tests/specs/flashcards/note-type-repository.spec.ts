import { FakeRepository } from '@tests/ports/repositories/fake-note-type-repository'
import { eq, and, or } from '@sarasvati-platform/abstract-query'
import { Entity, Identity } from '@src/core/models'


class TestObject extends Entity<Identity> {
  constructor(
    public name: string,
    public age: number,
    public isAdult: boolean,
    public address: string
  ) {
    super(new Identity(name))
  }
}

class TestRepository extends FakeRepository<Identity, TestObject> {
  getFieldValue(f: string, o: TestObject) {
    return o[f]
  }
}

describe('The FakeRepository instance', () => {
  const repository = new TestRepository()
  const user1 = new TestObject('John', 10, false, 'London')
  const user2 = new TestObject('Jane', 20, false, 'Paris')
  const user3 = new TestObject('Jack', 30, true, 'Berlin')
  const user4 = new TestObject('Jill', 40, true, 'Rome')
  repository.save(user1)
  repository.save(user2)
  repository.save(user3)
  repository.save(user4)

  it('eq', () => {
    const res = repository.find(eq('age', 20))
    expect(res.length).toBe(1)
    expect(res[0].identity).toEqual(user2.identity)
  })

  it('or eq', () => {
    const res = repository.find(or(eq('age', 20), eq('isAdult', true)))
    expect(res.length).toBe(3)
    expect(res[0].identity).toEqual(user2.identity)
    expect(res[1].identity).toEqual(user3.identity)
    expect(res[2].identity).toEqual(user4.identity)
  })

  it('and eq', () => {
    const res = repository.find(and(eq('age', 30), eq('isAdult', true)))
    expect(res.length).toBe(1)
    expect(res[0].identity).toEqual(user3.identity)
  })

  it('and or eq', () => {
    const res = repository.find(
      or(
        eq('address', 'Rome'),
        eq('address', 'Berlin'),
        and(
          eq('age', 10),
          eq('isAdult', false)
        )
      )
    )
    expect(res.length).toBe(3)
    expect(res.map(x => x.identity)).toEqual(expect.arrayContaining([user1.identity, user3.identity, user4.identity]))
  })
})
