import { Identity, Entity } from '@src/core/models'
import { NoteType } from '@src/flashcards/models'

/** Identity for [note]{@link Note} */
export type NoteId = Identity & {'type': 'Note'}

/**
 * Contains the information you want to study.
 */
export class Note extends Entity<NoteId> {
  private fieldValues = {}

  /**
   * Initializes a new instance of the Note class using the specified id and type
   * @param type Type of a Note
   * @param identity Id of a Note
   */
  constructor(
    public readonly type: NoteType,
    identity: NoteId = new Identity() as NoteId,
  ) {
    super(identity)
  }

  /**
   * Returns value of the specified field
   * @param fieldName Name of a field
   * @returns Value of a field
   * @throws {SarasvatiError} If no field found
   */
  getFieldValue(fieldName: string): string {
    this.throwIfNoFieldFound(fieldName)
    return this.fieldValues[fieldName]
  }

  /**
   * Sets value of the specified field
   * @param fieldName Name of a field
   * @param value New value
   * @throws {SarasvatiError} If no field found
   */
  setFieldValue(fieldName: string, value: string) {
    this.throwIfNoFieldFound(fieldName)
    this.fieldValues[fieldName] = value
  }

  private throwIfNoFieldFound(fieldName: string) {
    const field = this.type.fields.findByName(fieldName)
    if (!field) { throw new Error('No field found') }
  }
}