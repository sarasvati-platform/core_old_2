import { IRepository } from '@src/core/persistence'
import { Entity, Identity } from '@src/core/models'
import { Card, CardId, NoteType, NoteTypeId, NoteId, Note } from '@src/flashcards/models'
import { Predicate, Operator } from '@sarasvati-platform/abstract-query'
import { CardFields } from '@src/flashcards/models/card/queries'
import { NoteFields } from '@src/flashcards/models/note/queries'

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

  public find(query: Predicate | Operator): readonly TEntity[] {
    const o = Array.from(this.noteTypes.values())

    if (query instanceof Predicate) {
      if (query.operator === '=') { return o.filter(x => this.getFieldValue(query.field, x) === query.value) }
      if (query.operator === 'in') {
        const getRealValues = (f, e) => {
          const options = (query as Predicate).options
          let values = this.getFieldValue(f, e)
          if (options.includes('ci'))   { values = values.map(x => x?.toLowerCase()) }
          if (options.includes('like')) { values = values.flatMap(x => x?.split(' ')) }
          return values
        }
        const getRealQueryValue = (v) => {
          if (query.options.includes('ci')) { return v?.toLowerCase() }
        }
        const qv = getRealQueryValue(query.value)
        return o.filter(x => getRealValues(query.field, x).includes(qv))
      }
    } else if (query instanceof Operator) {
      if (query.operator === 'and') {
        const arrays = query.expressions.map(e => this.find(e as Predicate))
        return arrays.reduce((a, b) => a.filter(ele => b.includes(ele)))
      } else if (query.operator === 'or') {
        return [...new Set(query.expressions.flatMap(e => this.find(e as Predicate)))]
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
    if (f === NoteFields.FieldsValue) {
      return o.type.fields.all.map(x => o.getFieldValue(x.name.value))
    }
  }
}
