import { incl, Expression } from '@sarasvati-platform/abstract-query'

export enum NoteFields {
  FieldsValue = 'note.fields.value',
}

/** Returns cards of the specified note */
export const fieldValueContains = (value: string) : Expression => incl(NoteFields.FieldsValue, value, ['ci', 'like']) as Expression