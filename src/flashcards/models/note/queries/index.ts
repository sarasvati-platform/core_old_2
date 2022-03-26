import { incl } from '@sarasvati-platform/abstract-query'
import { IQuery } from '@src/core/persistence'

export enum NoteFields {
  FieldsValue = 'note.fields.value',
}

/** Returns cards of the specified note */
export const fieldValueContains = (value: string) : IQuery => incl(NoteFields.FieldsValue, value, ['ci', 'like']) as IQuery