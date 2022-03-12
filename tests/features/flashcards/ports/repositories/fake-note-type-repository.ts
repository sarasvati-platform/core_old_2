import { IQuery } from '@src/core/persistence'
import { NoteType, NoteTypeId } from '@src/flashcards/models'
import { INoteTypeRepository } from '@src/flashcards/ports/repositories'
import { Expression, IExpression, Operator } from '@sarasvati-platform/abstract-query'

export class FakeNoteTypeRepository implements INoteTypeRepository {
  private noteTypes: Map<string, NoteType> = new Map()

  public save(noteType: NoteType): void {
    if (noteType.name.value !== noteType.identity.value) {
      // Because we use name as identity, we need to remove old one
      // and add new one
      this.noteTypes.delete(noteType.identity.value)
      this.noteTypes.set(noteType.name.value, Object.create(noteType))
    } else {
      this.noteTypes.set(noteType.identity.value, Object.create(noteType))
    }
  }

  public get(identity: NoteTypeId): NoteType {
    const value = this.noteTypes.get(identity.value)
    if (!value) {
      throw new Error(`Note type '${identity.value}' not found`)
    }
    return value
  }

  public exists(identity: NoteTypeId): boolean {
    return this.noteTypes.has(identity.value)
  }

  public find(query: Expression | Operator): readonly NoteType[] {
    function getFieldValue(f: string, o: NoteType) {
      if (f === 'name') { return o.name.value }
      if (f === 'id') { return o.identity.value }
    }

    function fetch(q: Expression | Operator | IExpression, o: NoteType[]): NoteType[] {
      if (q instanceof Expression) {
        if (q.operator === '=') { return o.filter(x => getFieldValue(q.field, x) === q.value) }
      } else if (q instanceof Operator) {
        if (q.operator === 'and') {
          const arrays = q.expressions.map(e => fetch(e, o))
          return arrays.reduce((a, b) => a.filter(ele => b.includes(ele)))
        } else if (q.operator === 'or') {
          return [...new Set(q.expressions.flatMap(e => fetch(e, o)))]
        }
        // if (q.operator === 'or') { return q.expressions.reduce((a, b) => a.concat(fetch(b, a)), o) }
        // if (q.operator === 'not') { return o.filter(x => !fetch(q.expressions[0], [x]).length) }
      }
      return []
    }

    return fetch(query, Array.from(this.noteTypes.values()))
  }

  public delete(identity: NoteTypeId): void {
    this.noteTypes.delete(identity.value)
  }
}
