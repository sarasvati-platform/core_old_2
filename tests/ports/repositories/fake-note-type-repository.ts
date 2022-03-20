import { IRepository } from '@src/core/persistence'
import { Entity, Identity } from '@src/core/models'
import { Card, CardId, NoteType, NoteTypeId, NoteId, Note } from '@src/flashcards/models'
import { Expression, Operator } from '@sarasvati-platform/abstract-query'
import { CardFields } from '@src/flashcards/models/card/queries'

export abstract class FakeRepository<
  TIdentity extends Identity,
  TEntity extends Entity<TIdentity>
> implements IRepository<TIdentity, TEntity> {
  protected noteTypes: Map<string, TEntity> = new Map()

  public save(noteType: TEntity): void {
    this.noteTypes.set(noteType.identity.value, Object.create(noteType))
  }

  public get(identity: TIdentity): TEntity {
    const value = this.noteTypes.get(identity.value)
    if (!value) {
      throw new Error(`Entity '${identity.value}' not found`)
    }
    return value
  }

  public exists(identity: TIdentity): boolean {
    return this.noteTypes.has(identity.value)
  }

  public find(query: Expression | Operator): readonly TEntity[] {
    const o = Array.from(this.noteTypes.values())

    if (query instanceof Expression) {
      if (query.operator === '=') { return o.filter(x => this.getFieldValue(query.field, x) === query.value) }
    } else if (query instanceof Operator) {
      if (query.operator === 'and') {
        const arrays = query.expressions.map(e => this.find(e as Expression))
        return arrays.reduce((a, b) => a.filter(ele => b.includes(ele)))
      } else if (query.operator === 'or') {
        return [...new Set(query.expressions.flatMap(e => this.find(e as Expression)))]
      }
      // if (q.operator === 'or') { return q.expressions.reduce((a, b) => a.concat(fetch(b, a)), o) }
      // if (q.operator === 'not') { return o.filter(x => !fetch(q.expressions[0], [x]).length) }
    }
    return []

    // return fetch(query, Array.from(this.noteTypes.values()))
  }

  public delete(identity: TIdentity): void {
    this.noteTypes.delete(identity.value)
  }

  protected abstract getFieldValue(f: string, o: TEntity)
}


export class FakeNoteTypeRepository extends FakeRepository<NoteTypeId, NoteType> {
  public override save(noteType: NoteType): void {
    if (noteType.name.value !== noteType.identity.value) {
      // Because we use name as identity, we need to remove old one
      // and add new one
      this.noteTypes.delete(noteType.identity.value)
      this.noteTypes.set(noteType.name.value, Object.create(noteType))
    } else {
      this.noteTypes.set(noteType.identity.value, Object.create(noteType))
    }
  }
  getFieldValue(f: string, o: NoteType) {
    if (f === 'name') { return o.name.value }
    if (f === 'id') { return o.identity.value }
  }
}

export class FakeCardRepository extends FakeRepository<CardId, Card> {
  getFieldValue(f: string, o: Card) {
    if (f === CardFields.NoteId) { return o.note.identity.value }
    // if (f === 'type.name') { return o.type.name.value }
  }
}


export class FakeNoteRepository extends FakeRepository<NoteId, Note> {
  getFieldValue(f: string, o: Note) {
    if (f === 'id') { return o.identity.value }
  }
}
