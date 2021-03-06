import { Event } from '@src/core/models'
import { Name, CardSection } from '@src/flashcards/models'

/** Note type name */
export class CardTypeName extends Name {}

/** Note type */
export class CardType {
  private _sections = new CardSectionsCollection()
  protected _name: CardTypeName
  private _renamed: Event<Name> = new Event<Name>()

  /**
   * Creates a new instance of the CardType class.
   * @param name Name of the note type.
   * @param sections List of the sections.
   */
  constructor(
    name: CardTypeName,
    sections: CardSection[] = [],
  ) {
    this._name = name
    sections.forEach(x => this._sections.add(x))
  }

  get renamed(): Event<Name> { return this._renamed }

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
    this._renamed.notify(name)
    this._name = name
  }

  /**
   * Compares the CardType to another CardType.
   * @param other Other card type.
   * @returns True if the card types are equal.
   */
  equals(other: CardType) {
    return this.name.equals(other.name)
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

  /**
   * Adds a new section to the collection
   * @param section Section to add
   */
  public add(section: CardSection) {
    this._sections.push(section)
  }

  public remove(index: number) {
    this._sections.splice(index, 1)
  }

  /**
   * Returns all sections
   * @returns List of the sections
   */
  get all(): readonly CardSection[] {
    return this._sections
  }
}