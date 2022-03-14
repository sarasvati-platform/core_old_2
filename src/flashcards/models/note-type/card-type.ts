import { Name, CardSection } from '@src/flashcards/models'

/** Note type name */
export class CardTypeName extends Name {}

/** Note type */
export class CardType {
  private _sections = new CardSectionsCollection()
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
   * Returns list of the sections
   * @returns List of the sections
   */
  get sections(): CardSectionsCollection {
    return this._sections
  }

  /**
   * Renames note type
   * @param name New name of the note type
   */
  rename(name: CardTypeName) {
    this._name = name
  }
}


class CardSectionsCollection {
  private _sections: CardSection[] = []

  /**
   * Returns first section that can be used as a question
   * @returns First section
   */
  get front(): CardSection | undefined {
    return this._sections[0]
  }

  /**
   * Returns sections that can be used as an answer
   * @returns List of the sections except first one
   */
  get back(): CardSection[] {
    return this._sections.slice(1)
  }

  public add(section: CardSection) {
    this._sections.push(section)
  }
}