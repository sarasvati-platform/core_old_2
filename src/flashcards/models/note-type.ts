export class NoteType {
  /**
   * Creates a new instance of the NoteType class
   * @param name Name of the note type
   */
  constructor(public name: string) {
    if (!name) {
      throw new Error('The name must be a non-empty string')
    }
  }
}