import { Name } from '@src/flashcards/models'

/** Note type name */
export class CardTypeName extends Name {}

/** Note type */
export class CardType {
  protected _name: CardTypeName

  /**
   * Creates a new instance of the CardType class
   * @param name Name of the note type
   */
  constructor(
    name: CardTypeName,
  ) {
    this._name = name
  }

  /**
   * Returns the name of the note type
   */
  get name(): CardTypeName {
    return this._name
  }

  /**
   * Renames note type
   * @param name New name of the note type
   */
  rename(name: CardTypeName) {
    this._name = name
  }
}
