import { Name } from '@src/flashcards/models/name'

export class NoteType {
  public readonly name: NoteTypeName

  /**
   * Creates a new instance of the NoteType class
   * @param name Name of the note type
   */
  constructor(name: NoteTypeName | string) {
    if (typeof name === 'string') {
      this.name = new NoteTypeName(name)
    } else {
      this.name = name
    }
  }
}

export class NoteTypeName extends Name {
  constructor(name: string) {
    super(name)
  }
}